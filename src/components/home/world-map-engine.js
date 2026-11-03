/* PiEEG worldwide map. Ported from Final_MAp.html into a mount/cleanup module. */
import { select } from "d3-selection";
import { zoom as d3zoom, zoomIdentity } from "d3-zoom";
import "d3-transition";
import { timer } from "d3-timer";
import {
  geoNaturalEarth1, geoOrthographic, geoPath, geoGraticule10, geoCentroid, geoDistance,
} from "d3-geo";
import { feature } from "topojson-client";

// Relative tier per country (1 = fewer, 4 = more). Only tiers are stored, no counts.
// Key = ISO 3166-1 numeric code (as used by world-atlas); Kosovo has no code in the atlas, so it is keyed by name.
const BRAND = '<span class="pm-brand"><span class="pm-pi">Pi</span><span class="pm-eeg">EEG</span>';
const VIEWS = {
  server: {
    title: "Researchers using " + BRAND + " Server</span><br>around the world",
    continents: 6,
    tiers: {
      "356":4,"840":4,"826":4,"156":4,"724":4,"276":4,"124":4,"050":4,  // India, United States of America, United Kingdom, People's Republic of China, Spain, Germany, Canada, Bangladesh
      "368":4,"360":4,  // Iraq, Indonesia
      "392":3,"704":3,"250":3,"504":3,"528":3,"036":3,"380":3,"032":3,  // Japan, Vietnam, France, Morocco, Netherlands, Australia, Italy, Argentina
      "620":3,"702":3,"792":3,"012":3,"076":3,"616":3,"410":3,"818":3,  // Portugal, Singapore, Türkiye, Algeria, Brazil, Poland, South Korea, Egypt
      "344":3,"608":3,"586":3,"158":3,  // Hong Kong, Philippines, Pakistan, Taiwan
      "524":2,"300":2,"756":2,"784":2,"376":2,"152":2,"170":2,"031":2,  // Nepal, Greece, Switzerland, United Arab Emirates, Israel, Chile, Colombia, Azerbaijan
      "458":2,"604":2,"752":2,"191":2,"484":2,"566":2,"642":2,"764":2,  // Malaysia, Peru, Sweden, Croatia, Mexico, Nigeria, Romania, Thailand
      "246":2,"348":2,"372":2,"400":2,"643":2,"862":2,"051":2,"040":2,  // Finland, Hungary, Ireland, Jordan, Russian Federation, Venezuela, Armenia, Austria
      "214":2,"788":2,"056":2,"203":2,"233":2,"231":2,  // Dominican Republic, Tunisia, Belgium, Czech Republic, Estonia, Ethiopia
      "288":1,"428":1,"100":1,"116":1,"398":1,"418":1,"442":1,"634":1,  // Ghana, Latvia, Bulgaria, Cambodia, Kazakhstan, Lao People's Democratic Republic, Luxembourg, Qatar
      "682":1,"804":1,"384":1,"208":1,"218":1,"404":1,"417":1,"144":1,  // Saudi Arabia, Ukraine, Côte d'Ivoire, Denmark, Ecuador, Kenya, Kyrgyzstan, Sri Lanka
      "222":1,"858":1,"710":1,"008":1,"196":1,"364":1,"422":1,"434":1,  // El Salvador, Uruguay, South Africa, Albania, Cyprus, Islamic Republic of Iran, Lebanon, Libya
      "558":1,"554":1,"591":1,"688":1,"112":1,"120":1,"234":1,"266":1,  // Nicaragua, New Zealand, Panama, Serbia, Belarus, Cameroon, Faroe Islands, Gabon
      "320":1,"340":1,"332":1,"414":1,"440":1,"498":1,"104":1,"562":1,  // Guatemala, Honduras, Haiti, Kuwait, Lithuania, Moldova, Myanmar, Niger
      "578":1,"275":1,"729":1,"703":1,"686":1,"Kosovo":1,  // Norway, State of Palestine, Sudan, Slovakia, Senegal, Kosovo
    },
  },
  hardware: {
    title: "Delivering " + BRAND + "</span><br>Brain-Computer Interfaces",
    continents: 6,
    tiers: {
      "840":4,"156":4,"276":4,"826":4,"124":4,"392":4,                       // US CN DE GB CA JP
      "036":3,"250":3,"356":3,"724":3,"642":3,"410":3,"380":3,"756":3,       // AU FR IN ES RO KR IT CH
      "300":2,"616":2,"032":2,"360":2,"208":2,"528":2,"040":2,"348":2,"170":2,"702":2,"158":2,"578":2,"620":2,"704":2,"344":2,"076":2,"203":2, // GR PL AR ID DK NL AT HU CO SG TW NO PT VN HK BR CZ
      "152":1,"705":1,"764":1,"056":1,"376":1,"100":1,"818":1,"784":1,"804":1,"752":1,"484":1,"233":1,"442":1,"214":1,"554":1,"792":1,"428":1,"191":1, // CL SI TH BE IL BG EG AE UA SE MX EE LU DO NZ TR LV HR
    },
  },
};

const WORLD_URL = "/data/countries-50m.json";

export function mountWorldMap(box) {
  if (!box) return () => {};
  let destroyed = false;
  const cleanups = [];

  const svg  = select(box).select("svg");
  const tip  = box.querySelector(".pm-tip");
  const hint = box.querySelector(".pm-hint");
  const wrap = box.querySelector(".pm-mapwrap");
  const h2   = box.querySelector("h2");
  const btns = box.querySelectorAll(".pm-switch button");
  const key  = (d) => d.id || d.properties.name;
  const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Two projections: flat map and rotating globe
  const W = 960, H = 500, GLOBE_R = 235, START_ROT = [-20, -18];
  const flatProj  = geoNaturalEarth1().scale(170).translate([480, 270]);
  const globeProj = geoOrthographic().scale(GLOBE_R).translate([480, 250]).clipAngle(90).rotate(START_ROT);
  const path = geoPath(flatProj);

  let current = "server", mode = "flat", shown = false, inView = false;
  let g, sphere, grat, paths, dots, countries, tinyKeys = new Set(), centroids = new Map();
  let k = 1, last = zoomIdentity, dragging = false, lastTouch = 0, spin = null;
  const timeouts = new Set();
  const later = (fn, ms) => { const id = setTimeout(() => { timeouts.delete(id); fn(); }, ms); timeouts.add(id); };

  const zoom = d3zoom()
    .scaleExtent([1, 8])
    .translateExtent([[0, 0], [W, H]])
    .filter((ev) => (ev.type !== "wheel" || ev.ctrlKey || ev.metaKey) && !ev.button)
    .wheelDelta((ev) => -ev.deltaY * (ev.deltaMode === 1 ? 0.05 : ev.deltaMode ? 1 : 0.002) * (ev.ctrlKey && Math.abs(ev.deltaY) < 10 ? 6 : 1.5))
    .on("start", (ev) => { if (ev.sourceEvent) { dragging = true; svg.classed("dragging", true); } })
    .on("zoom", onZoom)
    .on("end", () => { dragging = false; lastTouch = Date.now(); svg.classed("dragging", false); });

  const on = (el, type, fn, opts) => { el.addEventListener(type, fn, opts); cleanups.push(() => el.removeEventListener(type, fn, opts)); };

  fetch(WORLD_URL)
    .then((r) => r.json())
    .then((world) => {
      if (destroyed) return;
      countries = feature(world, world.objects.countries).features
        .filter((f) => f.properties.name !== "Antarctica");
      countries.forEach((d) => {
        centroids.set(key(d), geoCentroid(d));
        if (path.area(d) < 6) tinyKeys.add(key(d)); // tiny countries get a dot so they stay visible
      });

      g      = svg.append("g");
      sphere = g.append("path").attr("class", "pm-sphere").datum({ type: "Sphere" });
      grat   = g.append("path").attr("class", "pm-grat").datum(geoGraticule10());
      paths  = g.append("g").selectAll("path").data(countries).join("path").attr("class", "pm-country");
      dots   = g.append("g");
      redraw();
      svg.call(zoom).on("dblclick.zoom", null);

      // Show hint if someone scrolls over the map without Ctrl
      on(svg.node(), "wheel", (ev) => {
        if (ev.ctrlKey || ev.metaKey) return;
        hint.style.opacity = 1; clearTimeout(hint._t); hint._t = setTimeout(() => (hint.style.opacity = 0), 1400);
      }, { passive: true });

      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((e) => {
          inView = e[0].isIntersecting;
          if (inView && !shown) { shown = true; render(true); }
        }, { threshold: 0.25 });
        io.observe(box);
        cleanups.push(() => io.disconnect());
      } else { shown = inView = true; render(true); }
    })
    .catch(() => {});

  // Server / Hardware switch
  btns.forEach((b) => on(b, "click", () => {
    if (b.dataset.view === current) return;
    current = b.dataset.view;
    btns.forEach((x) => x.setAttribute("aria-pressed", x === b));
    setTitle();
    if (paths && shown) render(false);
  }));

  // Map / Globe switch
  const projBtns = box.querySelectorAll("[data-proj]");
  projBtns.forEach((b) => on(b, "click", () => {
    if (b.dataset.proj === mode || !paths) return;
    mode = b.dataset.proj;
    projBtns.forEach((x) => x.setAttribute("aria-pressed", x === b));
    zoom.translateExtent(mode === "flat" ? [[0, 0], [W, H]] : [[-Infinity, -Infinity], [Infinity, Infinity]]);
    globeProj.scale(GLOBE_R).rotate(START_ROT);
    svg.call(zoom.transform, zoomIdentity);
    g.style("opacity", 0).transition().duration(400).style("opacity", 1);
    if (mode === "globe") startSpin(); else stopSpin();
  }));

  // Zoom buttons
  box.querySelectorAll("[data-zoom]").forEach((b) => on(b, "click", () => {
    if (!paths) return;
    const z = b.dataset.zoom, t = svg.transition().duration(350);
    if (z === "in") t.call(zoom.scaleBy, 1.6);
    else if (z === "out") t.call(zoom.scaleBy, 1 / 1.6);
    else {
      if (mode === "globe") globeProj.rotate(START_ROT);
      t.call(zoom.transform, zoomIdentity);
    }
  }));

  function onZoom(ev) {
    const t = ev.transform;
    k = t.k;
    if (mode === "flat") {
      g.attr("transform", t);
    } else {
      g.attr("transform", null);
      // Dragging (not zooming) rotates the globe
      if (ev.sourceEvent && t.k === last.k) {
        const r = globeProj.rotate(), s = 0.25 / t.k;
        globeProj.rotate([r[0] + (t.x - last.x) * s, Math.max(-80, Math.min(80, r[1] - (t.y - last.y) * s)), r[2]]);
      }
      globeProj.scale(GLOBE_R * t.k);
    }
    last = t;
    redraw();
  }

  function redraw() {
    const globe = mode === "globe";
    path.projection(globe ? globeProj : flatProj);
    sphere.attr("d", globe ? path : null);
    grat.attr("d", globe ? path : null);
    paths.attr("d", path);
    positionDots();
  }

  function positionDots() {
    const globe = mode === "globe", proj = globe ? globeProj : flatProj;
    const r = globeProj.rotate(), front = [-r[0], -r[1]];
    dots.selectAll("circle").each(function (d) {
      const c = centroids.get(key(d)), p = proj(c);
      const hidden = globe && geoDistance(c, front) > Math.PI / 2;
      if (hidden) this.setAttribute("display", "none"); else this.removeAttribute("display");
      this.setAttribute("cx", p[0]); this.setAttribute("cy", p[1]);
      this.setAttribute("r", globe ? 3.2 : 3.2 / k);
    });
  }

  // Slow automatic rotation on the globe; pauses while dragging, for 3 s after, and when off screen
  function startSpin() {
    if (reduceMotion || spin) return;
    let prev = 0;
    spin = timer((el) => {
      const dt = el - prev; prev = el;
      if (!inView || dragging || Date.now() - lastTouch < 3000) return;
      const r = globeProj.rotate();
      globeProj.rotate([r[0] + dt * 0.006, r[1], r[2]]);
      redraw();
    });
  }
  function stopSpin() { if (spin) { spin.stop(); spin = null; } }

  function setTitle() { h2.innerHTML = VIEWS[current].title; }
  setTitle();

  function render(stagger) {
    const v = VIEWS[current], T = v.tiers;
    paths.each(function (d) {
      const t = T[key(d)], el = this;
      const apply = () => { el.setAttribute("class", "pm-country" + (t ? " on t" + t : "")); };
      if (stagger && t) later(apply, 200 + Math.random() * 900); else apply();
    });
    dots.selectAll("circle").data(countries.filter((d) => T[key(d)] && tinyKeys.has(key(d))), key)
      .join("circle")
      .attr("class", (d) => "pm-country pm-dot on t" + T[key(d)]);
    positionDots();
    countUp(box.querySelector('[data-count="countries"]'), Object.keys(T).length, "+");
    countUp(box.querySelector('[data-count="continents"]'), v.continents);
    bindTips();
  }

  // Tooltip: country name only
  function bindTips() {
    g.selectAll(".pm-country")
      .on("mousemove", function (ev, d) {
        if (!this.classList.contains("on") || dragging) { tip.style.opacity = 0; return; }
        const r = wrap.getBoundingClientRect();
        tip.textContent = d.properties.name;
        tip.style.left = ev.clientX - r.left + "px";
        tip.style.top  = ev.clientY - r.top + "px";
        tip.style.opacity = 1;
      })
      .on("mouseleave", () => (tip.style.opacity = 0));
  }

  function countUp(el, target, suffix = "") {
    const t0 = performance.now(), dur = 900;
    (function step(t) {
      if (destroyed) return;
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  return () => {
    destroyed = true;
    stopSpin();
    timeouts.forEach(clearTimeout);
    clearTimeout(hint._t);
    cleanups.forEach((fn) => fn());
    svg.interrupt().on(".zoom", null);
    svg.selectAll("*").remove();
  };
}
