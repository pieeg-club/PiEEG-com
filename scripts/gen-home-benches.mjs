import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const home = path.join(root, "src/components/home");

function prefixIds(code, prefix, ids) {
  const sorted = [...ids].sort((a, b) => b.length - a.length);
  for (const id of sorted) {
    code = code.replaceAll(`$('#${id}')`, `$('#${prefix}${id}')`);
    code = code.replaceAll(`$("#${id}")`, `$("#${prefix}${id}")`);
    code = code.replaceAll(`url(#${id})`, `url(#${prefix}${id})`);
    code = code.replaceAll(`href="#${id}"`, `href="#${prefix}${id}"`);
    code = code.replaceAll(`id="${id}"`, `id="${prefix}${id}"`);
    code = code.replaceAll(`id=\\"${id}\\"`, `id=\\"${prefix}${id}\\"`);
  }
  return code;
}

function scopeDom(code) {
  code = code.replaceAll(
    "document.documentElement.style.setProperty",
    "root.style.setProperty"
  );
  code = code.replaceAll("document.querySelectorAll", "root.querySelectorAll");
  code = code.replaceAll("document.querySelector", "root.querySelector");
  code = code.replace(
    "const $=s=>root.querySelector(s);",
    "const $=s=>root.querySelector(s);"
  );
  code = code.replace(
    "const $=s=>document.querySelector(s);",
    "const $=s=>root.querySelector(s);"
  );
  return code;
}

function stripHash(code) {
  code = code.replace(/try\{ history\.replaceState\([^;]+; \}catch\(e\)\{\}/g, "");
  code = code.replace(/history\.replaceState\([^;]+;/g, "");
  code = code.replace(/window\.addEventListener\('hashchange',[^\n]+\n/g, "");
  code = code.replace(
    /const initial=\(location\.hash\|\|''\)\.slice\(1\);\n/g,
    ""
  );
  return code;
}

function wrap(name, body, extraCleanup) {
  return `/* Generated from tmp/new pages prototypes. Do not edit by hand. */
export function ${name}(root) {
  if (!root) return () => {};
  let raf = 0;
  let stopped = false;
  let visible = true;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

${body}

  function startLoop() {
    if (stopped || raf) return;
    lastNow = 0;
    raf = requestAnimationFrame(function tick(now) {
      raf = 0;
      if (stopped) return;
      if (!visible) return;
      frame(now);
      raf = requestAnimationFrame(tick);
    });
  }

  const io = new IntersectionObserver((entries) => {
    visible = entries.some((e) => e.isIntersecting);
    if (visible) startLoop();
  }, { threshold: 0.08, rootMargin: "80px" });
  io.observe(root);
  startLoop();

  return () => {
    stopped = true;
    cancelAnimationFrame(raf);
    raf = 0;
    io.disconnect();
    ${extraCleanup}
  };
}
`;
}

/* ---------- hardware ---------- */
const HW_IDS = [
  "sceneTitle","scene","rail","modes","gelWrap","lMap","lDesk","lPeriph",
  "lFigure","lWear","lBundle","lLeads","lElectrodes","lBodyDev","lAir",
  "legend","tip","spec","traces","pause","sigNote","skinHead","skin",
  "fadeDown","bodyFade","deskGrad","capClip","capShape","gel"
];

let hw = fs.readFileSync(path.join(home, "_hw-raw.js"), "utf8");
hw = hw.replace(
  /const reduce = matchMedia\('\(prefers-reduced-motion: reduce\)'\)\.matches;\n/,
  ""
);
hw = prefixIds(hw, "hw-", HW_IDS);
hw = scopeDom(hw);
hw = stripHash(hw);
hw = hw.replace(
  "const DOCS_BASE = 'https://github.com/pieeg-club/PiEEG-docs/tree/main/pages/hardware/devices/';",
  `const PAGE = {pieeg:'/hardware/pieeg','pieeg-16':'/hardware/pieeg-16',ironbci:'/hardware/ironbci','ironbci-32':'/hardware/ironbci-32','pieeg-xr':'/xr','octopus-16':'/hardware/octopus-16',jneeg:'/hardware/jneeg',ardeeg:'/hardware/ardeeg',microbci:'/hardware/microbci'};`
);
hw = hw.replace(
  `href="\${DOCS_BASE}\${d.docs}" target="_blank" rel="noopener"`,
  `href="\${PAGE[d.id]||'/hardware'}"`
);
hw = hw.replace("Open the ${d.name} setup guide", "View ${d.name}");
hw = hw.replace(
  `const PRODUCT_PHOTOS = {"pieeg":"images/image-57b5a0ae12740951.png","pieeg-16":"images/image-5119f64831431366.jpg","ironbci":"images/image-1f9227aeddf23344.png","ironbci-32":"images/image-f7e9cfdfa8851adb.png","pieeg-xr":"images/image-967101064f3fb405.png","octopus-16":"images/image-5a34eec346349c03.png","jneeg":"images/image-d90f6ca913bcca31.png","ardeeg":"images/image-08f74676ebca26fa.png","microbci":"images/image-eb28c315e4c7b6c1.png","cap8-dry":"images/image-84d82aea472912b5.png","cap8-wet":"images/image-261151729d8100b1.jpg","cap16":"images/image-98f6d1aafcdfe7c9.png","cap32-wet":"images/image-beb61d253937ed49.webp"};`,
  `const PRODUCT_PHOTOS = {"pieeg":"/products/pieeg.png","pieeg-16":"/products/pieeg16.jpg","ironbci":"/products/ironbci.jpg","ironbci-32":"/products/ironbci-32-main.png","pieeg-xr":"/xr/xr-headset-main.png","octopus-16":"/products/octopus16.png","jneeg":"/products/jneeg.png","ardeeg":"/products/ardeeg.png","microbci":"/products/microbci.png","cap8-dry":"/products/cap8-dry.png","cap8-wet":"/products/cap8-wet.jpg","cap16":"/products/cap16.png","cap32-wet":"/products/cap32-wet.webp"};`
);
hw = hw.replace(
  `href="images/image-644b4323c1410057.png"`,
  `href="/home/body-figure.png"`
);
hw = hw.replace(
  "const MODE_COLOR = {EEG:'#0071e3', EMG:'#ad6500', ECG:'#d72e50', EOG:'#8653bc'};",
  "const MODE_COLOR = {EEG:'#22d3ee', EMG:'#f59e0b', ECG:'#f43f5e', EOG:'#a78bfa'};"
);
hw = hw.replace(
  "const C = {power:'#248a3d', data:'#0071e3', neutral:'#86868b'};",
  "const C = {power:'#34d399', data:'#38bdf8', neutral:'#a1a1aa'};"
);
hw = hw.replace(
  "host:'Meta Quest 3, PICO and other headsets'",
  "host:'A VR headset'"
);
hw = hw.replace(
  "safety:'Each mask and enclosure is shaped for one headset model. A Quest 3 unit fits only a Quest 3.'",
  "safety:'Each mask and enclosure is shaped for one headset model. Use the unit made for yours.'"
);
hw = hw.replace(
  "cx.fillStyle = hi===r? '#1d1d1f' : dim? '#b4b4b9' : '#6e6e73';",
  "cx.fillStyle = hi===r? '#f4f4f5' : dim? '#52525b' : '#a1a1aa';"
);
hw = hw.replace(
  "cx.strokeStyle='rgba(0,0,0,.055)';",
  "cx.strokeStyle='rgba(255,255,255,.06)';"
);
hw = hw.replace(
  "selectDevice(DEVICES.some(d=>d.id===initial)?initial:'pieeg', false);",
  "selectDevice('pieeg', false);"
);
hw = hw.replace("requestAnimationFrame(frame);\n", "");
hw = hw.replace(
  "window.addEventListener('resize',sizeCanvas);",
  "window.addEventListener('resize',sizeCanvas);"
);

const hwBody = hw
  .split("\n")
  .filter((line) => !line.includes("requestAnimationFrame(frame)"))
  .join("\n");

fs.writeFileSync(
  path.join(home, "hardware-bench-engine.js"),
  wrap("mountHardwareBench", hwBody, "window.removeEventListener('resize', sizeCanvas);")
);

/* ---------- platform ---------- */
const PLAT_IDS = [
  "sceneTitle","scene","rail","layers","hostWrap","lCap","lLinks","lNodes",
  "legend","tip","spec","panelTitle","panelNote","panelBody","pause","con","chat"
];

let plat = fs.readFileSync(path.join(home, "_plat-raw.js"), "utf8");
plat = plat.replace(
  /const reduce = window\.matchMedia\('\(prefers-reduced-motion: reduce\)'\)\.matches;\n/,
  ""
);
plat = prefixIds(plat, "plat-", PLAT_IDS);
plat = scopeDom(plat);
plat = stripHash(plat);
plat = plat.replace(
  "const FAMILY = {core:'#3fc8ff', browser:'#45dd8b', ai:'#b690ff', stream:'#ffae42', build:'#7fb2ff'};",
  "const FAMILY = {core:'#22d3ee', browser:'#34d399', ai:'#a78bfa', stream:'#f59e0b', build:'#38bdf8'};"
);
plat = plat.replace(
  "select(PARTS.some(p=>p.id===initial)?initial:'server');",
  "select('server');"
);
plat = plat.replace(
  "${p.links.map(l=>`<a class=\"docs${l.primary?' primary':''}\" href=\"${l.ext?l.h:DOCS+l.h}\" target=\"_blank\" rel=\"noopener\">${l.t}</a>`).join('')}",
  "${p.links.map(l=>`<a class=\"docs${l.primary?' primary':''}\" href=\"${hrefFor(l)}\"${external(l)?' target=\"_blank\" rel=\"noopener\"':''}>${l.t}</a>`).join('')}"
);
plat = plat.replace(
  "const DOCS = 'https://docs.pieeg.com';",
  `const DOCS = 'https://docs.pieeg.com';
const SITE = {
  server:'/server', dashboard:'/server', cloud:'/cloud', buddy:'https://buddy.pieeg.com/',
  agent:'/agent', chrome:'/browser', experiences:'/examples', sdk:'/browser'
};
function hrefFor(l){
  if(l.ext) return l.h;
  if(l.h==='/cloud') return '/cloud';
  const p = state.part && SITE[state.part.id];
  if(l.primary && p && p.startsWith('/')) return p;
  return DOCS+l.h;
}
function external(l){ const h=hrefFor(l); return /^https?:/.test(h); }`
);

const platBody = plat
  .split("\n")
  .filter((line) => !line.includes("requestAnimationFrame(frame)"))
  .join("\n");

fs.writeFileSync(
  path.join(home, "platform-bench-engine.js"),
  wrap("mountPlatformBench", platBody, "")
);

console.log("wrote engines", {
  hw: fs.statSync(path.join(home, "hardware-bench-engine.js")).size,
  plat: fs.statSync(path.join(home, "platform-bench-engine.js")).size,
});
