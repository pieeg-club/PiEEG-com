/* IronBCI-32 store guide: interactive engine (vanilla JS, no dependencies).
 * mountIronBCI32StoreGuide(root) starts the demos on the guide's root element and
 * returns a cleanup function that stops the animation loop, timers, observers and
 * window/document listeners (called by React on unmount). */
export function mountIronBCI32StoreGuide(root) {
  'use strict';
  var R = root;
  if (!R) return function () {};
  var stopped = false, rafId = 0, io = null, globals = [], timers = [];
  function onGlobal(target, type, fn) { target.addEventListener(type, fn); globals.push([target, type, fn]); }
  function later(fn, ms) { var id = setTimeout(function () { if (!stopped) fn(); }, ms); timers.push(id); return id; }
  var $ = function (s, r) { return (r || R).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || R).querySelectorAll(s)); };
  var REDUCE = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var visible = true;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }); io.observe(R);
  }
  function isDark() { return document.documentElement.classList.contains('dark'); }

  /* ------------------------------------------------------------ use cases */
  var USES = {
    maps: {
      sig: 'EEG, all 32 channels', title: 'High-density brain maps',
      lead: 'Thirty-two points cover the scalp closely enough to see real shapes: alpha pooling at the back of the head when the eyes close, beta spreading over the front and centre during effort.',
      ctl: [['eyes', 'Close eyes', 'E'], ['math', 'Do mental math', 'M']],
      chips: ['Dashboard topographic map', '3D and 2D views', 'Placement editor'],
      ch: ['Fz', 'Cz', 'Pz', 'Oz'], hi: null, ro: 'topo',
      cap: '<b>Thirty-two positions</b> on the 10-20 system, wet Ag/AgCl, with reference and bias on the ears.'
    },
    p300: {
      sig: 'EEG, centro-parietal', title: 'P300 selection',
      lead: 'A rare, attended stimulus makes the brain answer with a positive wave about 300 ms later, strongest over Pz. Average a handful of flashes and the target stands out from everything else: the basis of P300 spellers.',
      ctl: [['target', 'Flash target', 'T'], ['other', 'Flash other', 'O']],
      chips: ['P300 speller', 'Event markers', 'Epoch averaging'],
      ch: ['Fz', 'Cz', 'Pz', 'Oz'], hi: ['Fz', 'FC1', 'FC2', 'Cz', 'CP1', 'CP2', 'P3', 'Pz', 'P4', 'PO3', 'PO4', 'O1', 'Oz', 'O2'], ro: 'erp',
      cap: '<b>Centro-parietal sites</b> carry the P300. The rest of the cap gives context and catches artifacts.'
    },
    ica: {
      sig: 'EEG, frontal and central', title: 'Remove artifacts with ICA',
      lead: 'With 32 channels, independent component analysis can isolate a blink as its own component and subtract it, leaving the brain signal underneath intact. With only a few channels this barely works.',
      ctl: [['blink', 'Blink', 'B'], ['ica', 'Remove eye component', 'I']],
      chips: ['MNE-Python ICA', 'EEGLAB', 'Artifact marking'],
      ch: ['Fp1', 'Fp2', 'Fz', 'Cz'], hi: ['Fp1', 'Fp2', 'AF3', 'AF4', 'F7', 'F3', 'Fz', 'F4', 'F8'], ro: 'ica',
      cap: '<b>Blinks are strongest on the forehead</b> (Fp1, Fp2) and fade towards the back of the head.'
    },
    multi: {
      sig: 'EEG + EOG + EMG + ECG', title: 'EEG, EOG, EMG and ECG together',
      lead: 'Any input can take a body electrode. Record brain, eye movement, muscle and heart on the same clock, so every event lines up sample by sample across all four signals.',
      ctl: [['blink', 'Blink', 'B'], ['clench', 'Clench fist', 'C']],
      chips: ['Synchronised streams', 'Sleep and fatigue studies', 'Biofeedback'],
      ch: ['EEG Cz', 'EOG', 'EMG', 'ECG'], hi: null, ro: 'multi', body: true,
      cap: '<b>One board, one clock:</b> scalp, eye, forearm and chest electrodes share the same sample counter.'
    },
    browser: {
      sig: 'Web Serial, Chrome or Edge', title: 'Straight into a browser',
      lead: 'Open cloud.pieeg.com in Chrome or Edge, choose IronBCI-32 and pick the serial port. Live waveforms, spectra and topographic maps appear in the tab, with nothing to install.',
      ctl: [], chips: ['PiEEG Cloud', 'Web Serial', 'JavaScript SDK'],
      ch: ['Fz', 'Cz', 'Pz', 'Oz'], hi: null, ro: 'browser',
      cap: '<b>All 32 channels</b> stream into the browser over USB serial at 921,600 baud.'
    },
    brainflow: {
      sig: 'BrainFlow, board ID 65', title: 'BrainFlow pipelines',
      lead: 'IronBCI-32 is a native BrainFlow board, IRONBCI_32_BOARD. The same API works in Python, C++, Java, C#, Julia, R and MATLAB, with filters, band power and ML helpers built in.',
      ctl: [], chips: ['Python', 'C++, Java, C#', 'MNE-Python'],
      ch: ['Fz', 'Cz', 'Pz', 'Oz'], hi: null, ro: 'brainflow',
      cap: '<b>Every channel</b> arrives as a row in BrainFlow’s data array, ready for NumPy or MNE.'
    }
  };
  var mode = 'maps';
  var state = { eyes: false, math: false, ica: false, clench: 0, band: 'alpha' };
  var events = [];          // {t, type}
  var erp = { target: 0, other: 0 };
  var T = 0;                // simulated time in seconds

  var ro = $('#readout');
  var ROTOPO = ro ? ro.innerHTML : '';

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function setMode(id, focus) {
    if (!USES[id]) return;
    mode = id; var u = USES[id];
    $$('#useList button').forEach(function (b) {
      var on = b.getAttribute('data-id') === id;
      b.setAttribute('aria-selected', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    });
    $('#demoSig').innerHTML = '<i></i>' + esc(u.sig);
    $('#demoTitle').textContent = u.title;
    $('#demoLead').textContent = u.lead;
    $('#bodyCap').innerHTML = u.cap;
    var c = $('#controls');
    c.innerHTML = u.ctl.map(function (k) {
      var tog = (k[0] === 'eyes' || k[0] === 'math' || k[0] === 'ica');
      return '<button class="ctl" data-k="' + k[0] + '"' + (tog ? ' aria-pressed="' + (!!state[k[0]]) + '"' : '') + '>' + k[1] + ' <span class="k">' + k[2] + '</span></button>';
    }).join('');
    c.style.display = u.ctl.length ? '' : 'none';
    $('#with').innerHTML = '<span>Use it with</span>' + u.chips.map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join('');
    // electrodes on the head
    $$('#bodyEls .hel').forEach(function (g) {
      g.setAttribute('opacity', !u.hi || u.hi.indexOf(g.getAttribute('data-n')) >= 0 ? '1' : '.22');
    });
    // body view
    var body = $('#body');
    if (u.body) {
      body.setAttribute('viewBox', '60 42 540 640');
      $('#mannequin').style.display = ''; $('#topHead').style.display = 'none'; $('#bodyEls').style.display = 'none';
      ensureBodyMarkers().style.display = '';
    } else {
      body.setAttribute('viewBox', '1010 30 380 400');
      $('#mannequin').style.display = 'none'; $('#topHead').style.display = ''; $('#bodyEls').style.display = '';
      if (bodyMarks) bodyMarks.style.display = 'none';
    }
    events = []; refill();
    renderReadout();
  }

  var bodyMarks = null;
  function ensureBodyMarkers() {
    if (bodyMarks) return bodyMarks;
    var NS = 'http://www.w3.org/2000/svg';
    bodyMarks = document.createElementNS(NS, 'g');
    var pts = [
      ['EEG', '#0071e3', [[330, 96]], 330, 80],
      ['EOG', '#9468c7', [[294, 152], [365, 152]], 400, 140],
      ['ECG', '#e5484d', [[246, 290], [416, 290], [388, 500]], 452, 290],
      ['EMG', '#bd7b18', [[190, 528], [186, 556]], 150, 590]
    ];
    var h = '';
    pts.forEach(function (p) {
      p[2].forEach(function (q) {
        h += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="11" fill="' + p[1] + '" fill-opacity=".22"/>' +
             '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="6.5" fill="#12151a" stroke="' + p[1] + '" stroke-width="2.2"/>' +
             '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="2.6" fill="' + p[1] + '"/>';
      });
      h += '<text x="' + p[3] + '" y="' + p[4] + '" text-anchor="middle" fill="' + p[1] + '" style="font-size:17px;font-weight:700">' + p[0] + '</text>';
    });
    bodyMarks.innerHTML = h;
    $('#body').appendChild(bodyMarks);
    return bodyMarks;
  }

  function renderReadout() {
    if (!ro) return;
    var r = USES[mode].ro;
    if (r === 'topo') {
      ro.innerHTML = ROTOPO;
      $$('.bandseg button', ro).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-b') === state.band ? 'true' : 'false'); });
      updateMapNote(); drawTopo();
    } else if (r === 'erp') {
      ro.innerHTML = '<div class="ro-stat"><b id="erpN">' + erp.target + ' target · ' + erp.other + ' other</b>Average response at Pz, 0 to 800 ms after each flash. Press T a few times, then O, and watch the target curve (orange) rise near 300 ms.</div>' +
        '<canvas id="erpCanvas" width="520" height="140" style="width:100%;max-width:520px;height:auto;margin-top:8px;display:block"></canvas>';
      drawErp();
    } else if (r === 'ica') {
      ro.innerHTML = '<div class="ro-stat"><b id="icaState">' + (state.ica ? 'Eye component removed' : 'Raw signal') + '</b>' +
        'ICA unmixes the 32 channels into independent sources. One of them is almost pure blink; zero it and project the rest back to the channels.</div>' +
        '<pre class="mini-code" style="margin-top:10px">ica = mne.preprocessing.ICA(n_components=20)\nica.fit(raw.copy().filter(1, None))\nica.exclude = ica.find_bads_eog(raw, ch_name="Fp1")[0]\nclean = ica.apply(raw.copy())</pre>';
    } else if (r === 'multi') {
      ro.innerHTML = '<div class="ro-stat"><b>4 signals · 1 clock</b>Put EOG beside the eyes, EMG over the forearm and ECG on the chest, using any free inputs. Blink and clench to see each stream react on its own trace.</div>';
    } else if (r === 'browser') {
      ro.innerHTML = '<div class="ro-stat"><b>No install</b>1. Open <a href="https://cloud.pieeg.com" target="_blank" rel="noopener" style="color:var(--sig)">cloud.pieeg.com</a> in Chrome or Edge &nbsp;2. PiEEG Devices → IronBCI-32 &nbsp;3. Pick the serial port</div>' +
        '<pre class="mini-code" style="margin-top:10px"><span class="c">// or from your own page with the JavaScript SDK</span>\nconst dev = await connectSerial({ device: \'ironbci-32\' });</pre>';
    } else if (r === 'brainflow') {
      ro.innerHTML = '<pre class="mini-code">from brainflow.board_shim import BoardShim, BrainFlowInputParams, BoardIds\n\np = BrainFlowInputParams(); p.serial_port = "COM3"   <span class="c"># or /dev/ttyACM0</span>\nboard = BoardShim(BoardIds.IRONBCI_32_BOARD, p)\nboard.prepare_session(); board.start_stream()\ndata = board.get_board_data()                 <span class="c"># 32 EEG rows</span></pre>';
    }
  }

  function updateMapNote() {
    var n = $('#mapNote'); if (!n) return;
    if (state.band === 'alpha') n.textContent = state.eyes ? 'Eyes closed: alpha pools over the back of the head.' : 'Close your eyes and watch the back of the head.';
    else n.textContent = state.math ? 'Mental effort: beta spreads over the front and centre.' : 'Start some mental math and watch the front of the head.';
  }

  function press(k) {
    var btn = $('#controls [data-k="' + k + '"]');
    if (k === 'eyes' || k === 'math' || k === 'ica') {
      state[k] = !state[k];
      if (btn) btn.setAttribute('aria-pressed', state[k] ? 'true' : 'false');
      if (k === 'eyes' && state.eyes && state.band !== 'alpha') { state.band = 'alpha'; renderReadout(); }
      if (k === 'math' && state.math && state.band !== 'beta') { state.band = 'beta'; renderReadout(); }
      if (k === 'ica') { var s = $('#icaState'); if (s) s.textContent = state.ica ? 'Eye component removed' : 'Raw signal'; }
      updateMapNote(); drawTopo();
    } else {
      if (btn) { btn.classList.remove('flash'); void btn.offsetWidth; btn.classList.add('flash'); }
      if (k === 'clench') state.clench = T + 1.2;
      else events.push({ t: T, type: k });
      if (k === 'target' || k === 'other') { erp[k]++; later(drawErp, 850); }
    }
  }

  $('#useList').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-id]'); if (b) setMode(b.getAttribute('data-id'));
  });
  $('#useList').addEventListener('keydown', function (e) {
    var ids = Object.keys(USES), i = ids.indexOf(mode);
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); setMode(ids[(i + 1) % ids.length], true); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); setMode(ids[(i + ids.length - 1) % ids.length], true); }
  });
  $('#controls').addEventListener('click', function (e) {
    var b = e.target.closest('.ctl'); if (b) press(b.getAttribute('data-k'));
  });
  ro && ro.addEventListener('click', function (e) {
    var b = e.target.closest('.bandseg button'); if (!b) return;
    state.band = b.getAttribute('data-b');
    $$('.bandseg button', ro).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    updateMapNote(); drawTopo();
  });
  onGlobal(document, 'keydown', function (e) {
    if (!visible || e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target; if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    var key = (e.key || '').toUpperCase();
    var hit = USES[mode].ctl.filter(function (k) { return k[2] === key; })[0];
    if (hit) { e.preventDefault(); press(hit[0]); }
  });

  /* ------------------------------------------------------------ signal model */
  function rng(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  var rand = rng(20261110);
  var NOISE = [];
  for (var k = 0; k < 6; k++) {
    var comps = [];
    for (var j = 0; j < 14; j++) { var f = 0.6 + rand() * 38; comps.push([f, rand() * 6.283, 4.2 / Math.sqrt(f)]); }
    NOISE.push(comps);
  }
  function bg(k, t) {
    var c = NOISE[k], s = 0;
    for (var i = 0; i < c.length; i++) s += c[i][2] * Math.sin(6.283 * c[i][0] * t + c[i][1]);
    return s + (Math.random() - 0.5) * 2.2;
  }
  function g(x, w) { return Math.exp(-0.5 * (x / w) * (x / w)); }
  var POST = { Fz: .15, Cz: .35, Pz: .75, Oz: 1, Fp1: .05, Fp2: .05 };
  var FRONT = { Fz: 1, Cz: .7, Pz: .3, Oz: .15, Fp1: .8, Fp2: .8 };
  var P3W = { Fz: .35, Cz: .75, Pz: 1, Oz: .55 };
  var BLW = { Fp1: 1, Fp2: 1, Fz: .42, Cz: .14 };
  var amp = { a: 0, b: 0 };   // smoothed alpha / beta drive
  function ecg(t) {
    var ph = (t % 0.83) / 0.83;
    return 6 * g(ph - .16, .025) - 9 * g(ph - .245, .009) + 48 * g(ph - .27, .011) - 14 * g(ph - .295, .01) + 12 * g(ph - .5, .045);
  }
  function value(lane, t) {
    var u = USES[mode], name = u.ch[lane];
    var v = bg(lane, t);
    var alpha = (POST[name] !== undefined ? POST[name] : .3) * amp.a, beta = (FRONT[name] !== undefined ? FRONT[name] : .3) * amp.b;
    v += (3 + 15 * alpha) * Math.sin(6.283 * 10.2 * t + lane) * (0.75 + 0.25 * Math.sin(6.283 * 0.7 * t + lane));
    v += 6 * beta * (Math.sin(6.283 * 19 * t + lane * 2) + 0.6 * Math.sin(6.283 * 23.5 * t));
    if (mode === 'multi') {
      if (lane === 1) v = bg(1, t) * .5;
      if (lane === 2) v = (Math.random() - .5) * (T < state.clench ? 80 : 4);
      if (lane === 3) v = 1.5 * ecg(t) + bg(3, t) * .15;
    }
    for (var i = 0; i < events.length; i++) {
      var e = events[i], d = t - e.t;
      if (d < -0.05 || d > 1.2) continue;
      if (e.type === 'target' || e.type === 'other') {
        var w = P3W[name] || .4;
        v += -5 * g(d - .1, .025) * w;
        if (e.type === 'target') v += 22 * w * g(d - .32, .075);
      } else if (e.type === 'blink') {
        var bw = mode === 'multi' ? (lane === 1 ? 1.1 : lane === 0 ? .12 : 0) : (BLW[name] || .05);
        if (mode === 'ica' && state.ica) bw *= .04;
        v += 95 * bw * g(d - .18, .085);
      }
    }
    return v;
  }
  function autoBlinks() {
    if ((mode === 'ica' || mode === 'multi') && rand() < 0.0042) events.push({ t: T, type: 'blink' });
    if (events.length > 60) events = events.filter(function (e) { return T - e.t < 6; });
  }

  /* ------------------------------------------------------------ demo canvas */
  var cv = $('#demoCanvas'), ctx = cv && cv.getContext('2d');
  var W = 0, H = 0, DPR = 1, buf = [[], [], [], []], acc = 0, PX_PER_S = 0;
  function sizeCanvas() {
    if (!cv) return;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    var r = cv.getBoundingClientRect(); W = Math.max(200, Math.round(r.width)); H = 190;
    cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    PX_PER_S = (W - 48) / 4;
    refill();
  }
  function refill() {
    if (!PX_PER_S) return;
    buf = [[], [], [], []];
    var n = W - 48;
    for (var x = 0; x < n; x++) { var tt = T - (n - x) / PX_PER_S; for (var l = 0; l < 4; l++) buf[l].push(value(l, tt)); }
  }
  function drawDemo(dt) {
    if (!ctx) return;
    amp.a += ((mode === 'maps' && state.eyes ? 1 : 0) - amp.a) * Math.min(1, dt * 2.2);
    amp.b += ((mode === 'maps' && state.math ? 1 : 0) - amp.b) * Math.min(1, dt * 2.2);
    acc += dt * PX_PER_S;
    var n = W - 48, steps = Math.floor(acc); acc -= steps;
    for (var s = 0; s < steps; s++) {
      var tt = T - (steps - 1 - s) / PX_PER_S; if (s % 4 === 0) autoBlinks();
      for (var l = 0; l < 4; l++) { buf[l].push(value(l, tt)); if (buf[l].length > n) buf[l].shift(); }
    }
    var dark = isDark();
    ctx.clearRect(0, 0, W, H);
    var lane = H / 4, x0 = 44;
    ctx.font = '600 11px ui-sans-serif, system-ui, sans-serif'; ctx.textBaseline = 'middle';
    ctx.strokeStyle = dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.06)'; ctx.lineWidth = 1;
    for (var gx = x0; gx < W; gx += PX_PER_S) { ctx.beginPath(); ctx.moveTo(gx + .5, 6); ctx.lineTo(gx + .5, H - 6); ctx.stroke(); }
    var u = USES[mode];
    var cols = mode === 'multi' ? ['#0071e3', '#9468c7', '#bd7b18', '#e5484d'] : ['#0071e3', '#0071e3', '#0071e3', '#0071e3'];
    for (var l2 = 0; l2 < 4; l2++) {
      var cy = lane * l2 + lane / 2, b = buf[l2];
      ctx.fillStyle = dark ? '#8e8e93' : '#86868b'; ctx.fillText(u.ch[l2].split(' ')[0], 10, cy);
      var sc = (lane * 0.42) / (mode === 'multi' && l2 >= 2 ? 45 : 30);
      ctx.strokeStyle = cols[l2]; ctx.lineWidth = 1.3; ctx.beginPath();
      for (var i = 0; i < b.length; i++) {
        var y = cy - Math.max(-lane * .62, Math.min(lane * .62, b[i] * sc));
        if (i === 0) ctx.moveTo(x0 + i, y); else ctx.lineTo(x0 + i, y);
      }
      ctx.stroke();
    }
    // event markers
    events.forEach(function (e) {
      if (e.type !== 'target' && e.type !== 'other') return;
      var x = x0 + n - (T - e.t) * PX_PER_S; if (x < x0) return;
      ctx.strokeStyle = e.type === 'target' ? 'rgba(255,159,10,.9)' : 'rgba(142,142,147,.6)';
      ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(x, 4); ctx.lineTo(x, H - 4); ctx.stroke(); ctx.setLineDash([]);
    });
  }

  /* ------------------------------------------------------------ topography */
  var EL = $$('#bodyEls .hel').map(function (gp) {
    var c = gp.querySelector('circle:not(.gel):not(.hc)') || gp.querySelector('circle');
    return { n: gp.getAttribute('data-n'), x: (+c.getAttribute('cx') - 1200) / 150, y: (+c.getAttribute('cy') - 235) / 150 };
  });
  var lastTopo = 0;
  function cmap(v) {
    var stops = [[0, [238, 244, 255]], [.4, [142, 193, 255]], [.75, [0, 113, 227]], [1, [255, 159, 10]]];
    for (var i = 1; i < stops.length; i++) if (v <= stops[i][0]) {
      var a = stops[i - 1], b = stops[i], f = (v - a[0]) / (b[0] - a[0]);
      return [0, 1, 2].map(function (k) { return a[1][k] + (b[1][k] - a[1][k]) * f; });
    }
    return stops[3][1];
  }
  function drawTopo() {
    var c = $('#topo'); if (!c || mode !== 'maps') return;
    var x = c.getContext('2d'), N = 100, img = x.createImageData(N, N), now = performance.now() / 1000;
    var vals = EL.map(function (e, i) {
      var post = Math.max(0, e.y), front = Math.max(0, -e.y) + .35 * (1 - Math.abs(e.x));
      var v = state.band === 'alpha' ? .22 + (state.eyes ? .78 * post * post + .1 : .12 * post) : .2 + (state.math ? .7 * Math.min(1, front) : .1 * front);
      return Math.max(0, Math.min(1, v + .05 * Math.sin(now * 1.3 + i)));
    });
    for (var j = 0; j < N; j++) for (var i = 0; i < N; i++) {
      var px = (i / (N - 1)) * 2 - 1, py = (j / (N - 1)) * 2 - 1, o = (j * N + i) * 4;
      if (px * px + py * py > 1) { img.data[o + 3] = 0; continue; }
      var sw = 0, sv = 0;
      for (var e = 0; e < EL.length; e++) {
        var dx = px - EL[e].x, dy = py - EL[e].y, w = Math.exp(-(dx * dx + dy * dy) / 0.06) + 1e-9;
        sw += w; sv += w * vals[e];
      }
      var col = cmap(sv / sw);
      img.data[o] = col[0]; img.data[o + 1] = col[1]; img.data[o + 2] = col[2]; img.data[o + 3] = 255;
    }
    var off = document.createElement('canvas'); off.width = N; off.height = N; off.getContext('2d').putImageData(img, 0, 0);
    var S = c.width; x.clearRect(0, 0, S, S); x.imageSmoothingEnabled = true;
    x.save(); x.beginPath(); x.arc(S / 2, S / 2, S / 2 - 8, 0, 6.283); x.clip();
    x.drawImage(off, 8, 8, S - 16, S - 16); x.restore();
    x.strokeStyle = isDark() ? '#52525b' : '#c5c5cb'; x.lineWidth = 1.5;
    x.beginPath(); x.arc(S / 2, S / 2, S / 2 - 8, 0, 6.283); x.stroke();
    x.beginPath(); x.moveTo(S / 2 - 9, 9); x.lineTo(S / 2, 1); x.lineTo(S / 2 + 9, 9); x.stroke();
    x.fillStyle = 'rgba(18,21,26,.75)';
    EL.forEach(function (e) { x.beginPath(); x.arc(8 + (e.x + 1) / 2 * (S - 16), 8 + (e.y + 1) / 2 * (S - 16), 1.8, 0, 6.283); x.fill(); });
  }

  /* ------------------------------------------------------------ ERP average */
  function drawErp() {
    var c = $('#erpCanvas'); if (!c) return;
    var x = c.getContext('2d'), Wc = c.width, Hc = c.height, dark = isDark();
    x.clearRect(0, 0, Wc, Hc);
    x.strokeStyle = dark ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.1)'; x.beginPath(); x.moveTo(24, Hc - 26); x.lineTo(Wc - 6, Hc - 26); x.stroke();
    x.fillStyle = dark ? '#8e8e93' : '#86868b'; x.font = '10px ui-sans-serif, system-ui, sans-serif';
    [0, 200, 400, 600, 800].forEach(function (ms) { var px = 24 + ms / 800 * (Wc - 30); x.fillText(ms + '', px - (ms === 800 ? 16 : 6), Hc - 12); });
    x.fillText('ms', Wc - 18, Hc - 2);
    function curve(n, isT, col) {
      if (!n) return;
      var r2 = rng(isT ? 7 : 11); x.strokeStyle = col; x.lineWidth = 2; x.beginPath();
      for (var i = 0; i <= 120; i++) {
        var d = i / 120 * .8, v = -5 * g(d - .1, .025) + (isT ? 22 * g(d - .32, .075) : 0) + (Math.sin(d * 37 + n) + Math.sin(d * 61 + 2 * n) + (r2() - .5)) * 4 / Math.sqrt(n);
        var px = 24 + i / 120 * (Wc - 30), py = Hc - 26 - 18 - v * 2.6;
        if (i === 0) x.moveTo(px, py); else x.lineTo(px, py);
      }
      x.stroke();
    }
    curve(erp.other, false, '#a1a1a6'); curve(erp.target, true, '#ff9f0a');
    var n = $('#erpN'); if (n) n.textContent = erp.target + ' target · ' + erp.other + ' other';
  }

  /* ------------------------------------------------------------ setup steps */
  // 1 kit checklist
  var kit = $$('#kit input');
  function kitUpdate() {
    var n = kit.filter(function (i) { return i.checked; }).length;
    $('#kitProgress').innerHTML = '<b>' + n + ' of ' + kit.length + '</b> ready';
    $('#s1').classList.toggle('done', n === kit.length);
  }
  kit.forEach(function (i) { i.addEventListener('change', kitUpdate); });

  // 2 cable
  var CABLE = {
    charge: {
      wires: [['VBUS', '#e5484d'], ['GND', '#1b1d21']],
      out: ['#ff8a8f', 'Nothing appears', 'no data lines to talk over'],
      verdict: ['bad', '<b>Two wires.</b> Only power and ground, so the laptop never sees the board. Swap it for a data cable.']
    },
    data: {
      wires: [['VBUS', '#e5484d'], ['D−', '#f5f5f7'], ['D+', '#45dd8b'], ['GND', '#1b1d21']],
      out: ['#45dd8b', 'COM3 appears', 'USB serial port, ready to stream'],
      verdict: ['good', '<b>Four wires.</b> Power, ground and the two data lines. The laptop finds a new serial port as soon as the board is powered.']
    }
  };
  function setCable(k) {
    var c = CABLE[k], svg = $('#cable'), n = c.wires.length, gap = 38, x0 = 115 - (n - 1) * gap / 2, h = '';
    h += '<rect x="20" y="70" width="190" height="80" rx="40" fill="#15171a" stroke="rgba(255,255,255,.2)"></rect>';
    h += '<text x="115" y="176" text-anchor="middle" fill="#9aa2ad" style="font-size:12.5px">Cross-section</text>';
    c.wires.forEach(function (w, i) {
      var cx = x0 + i * gap;
      h += '<circle cx="' + cx + '" cy="110" r="14" fill="' + w[1] + '" stroke="rgba(255,255,255,.35)"></circle>';
      h += '<text x="' + cx + '" y="58" text-anchor="middle" fill="#cfd4da" style="font-size:12px;font-weight:600">' + w[0] + '</text>';
    });
    h += '<path d="M210,110 H300" stroke="' + (k === 'data' ? '#7fb2ff' : '#2a2e35') + '" stroke-width="' + (k === 'data' ? 4 : 10) + '"></path>';
    h += '<rect x="300" y="80" width="200" height="60" rx="8" fill="#0b0d10" stroke="#3a3f47"></rect>';
    h += '<text x="400" y="106" text-anchor="middle" fill="' + c.out[0] + '" style="font-size:14px;font-weight:700">' + c.out[1] + '</text>';
    h += '<text x="400" y="126" text-anchor="middle" fill="#9aa2ad" style="font-size:12px">' + c.out[2] + '</text>';
    svg.innerHTML = h;
    var v = $('#cableVerdict'); v.className = 'verdict ' + c.verdict[0]; v.innerHTML = c.verdict[1];
    $$('#cableSeg button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-c') === k ? 'true' : 'false'); });
    $('#s2').classList.toggle('done', k === 'data');
  }
  $('#cableSeg').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) setCable(b.getAttribute('data-c')); });

  // 3 mains vs battery
  var mains = true;
  var isoMains = $$('#iso > *').filter(function (el) {
    var s = (el.getAttribute('stroke') || '') + (el.getAttribute('fill') || '');
    return /ff5a74|ff8a8f|2a1519/i.test(s);
  });
  function setMains(k) {
    mains = k === 'mains';
    isoMains.forEach(function (el) { el.style.display = mains ? '' : 'none'; });
    var v = $('#isoVerdict');
    v.className = 'verdict ' + (mains ? 'bad' : 'good');
    v.innerHTML = mains ? '<b>Not isolated.</b> The laptop links the person to the grid, and every channel hums at 50 or 60 Hz. Unplug the charger.'
                        : '<b>Isolated.</b> Board and laptop both run on batteries, so nothing connects the person to the mains, and the hum is gone.';
    $$('#mainsSeg button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-m') === k ? 'true' : 'false'); });
    $('#s3').classList.toggle('done', !mains);
  }
  $('#mainsSeg').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) setMains(b.getAttribute('data-m')); });
  var hum = $('#humCanvas'), hctx = hum && hum.getContext('2d'), hbuf = [], hW = 0;
  function sizeHum() { if (!hum) return; var r = hum.getBoundingClientRect(); hW = Math.max(200, Math.round(r.width)); hum.width = hW * DPR; hum.height = 90 * DPR; hctx.setTransform(DPR, 0, 0, DPR, 0, 0); hbuf = []; }
  var hacc = 0;
  function drawHum(dt) {
    if (!hctx) return;
    hacc += dt * hW / 2; var steps = Math.floor(hacc); hacc -= steps;
    for (var s = 0; s < steps; s++) {
      var tt = T - (steps - 1 - s) * 2 / hW;
      hbuf.push(bg(4, tt) * .9 + (mains ? 26 * Math.sin(6.283 * 50 * tt * 0.12) * (0.8 + 0.2 * Math.sin(tt * 3)) + (Math.random() - .5) * 26 : 0));
      if (hbuf.length > hW - 16) hbuf.shift();
    }
    hctx.clearRect(0, 0, hW, 90);
    hctx.fillStyle = '#6b7280'; hctx.font = '600 10.5px ui-sans-serif, system-ui, sans-serif'; hctx.fillText('Oz', 10, 16);
    hctx.fillStyle = mains ? '#ff8a8f' : '#45dd8b'; hctx.fillText(mains ? '50/60 Hz hum' : 'clean EEG', hW - 92, 16);
    hctx.strokeStyle = mains ? '#ff5a74' : '#45dd8b'; hctx.lineWidth = 1.2; hctx.beginPath();
    for (var i = 0; i < hbuf.length; i++) { var y = 50 - Math.max(-34, Math.min(34, hbuf[i])); if (i) hctx.lineTo(8 + i, y); else hctx.moveTo(8 + i, y); }
    hctx.stroke();
  }

  // 4 & 7 code tabs + copy
  var CODE = {
    port: {
      Windows: '<span class="c"># Device Manager → Ports (COM &amp; LPT)</span>\n<span class="c"># look for the new COM port, for example COM3</span>',
      Linux: 'ls /dev/ttyACM*\n<span class="c"># → /dev/ttyACM0</span>\n\n<span class="c"># permission denied? add yourself to dialout, then log in again</span>\nsudo usermod -aG dialout $USER',
      macOS: 'ls /dev/tty.usbmodem*\n<span class="c"># → /dev/tty.usbmodem…</span>'
    },
    tab: {
      'PiEEG Server': 'pip install "pieeg-server[ironbci32]"\n\n<span class="p">pieeg-server</span> --device ironbci32 --serial-port COM3          <span class="c"># Windows</span>\n<span class="p">pieeg-server</span> --device ironbci32 --serial-port /dev/ttyACM0  <span class="c"># Linux, macOS</span>\n\n<span class="c"># add --lsl, --osc or --record session.csv as needed</span>\n<span class="c"># dashboard: http://localhost:1617</span>',
      BrainFlow: 'pip install brainflow\n\n<span class="p">from</span> brainflow.board_shim <span class="p">import</span> BoardShim, BrainFlowInputParams, BoardIds\n\nparams = BrainFlowInputParams()\nparams.serial_port = "COM3"          <span class="c"># or /dev/ttyACM0</span>\nboard = BoardShim(BoardIds.IRONBCI_32_BOARD, params)\nboard.prepare_session(); board.start_stream()\ndata = board.get_board_data()        <span class="c"># rows = channels</span>',
      Browser: '<span class="c"># nothing to install</span>\n1. Open https://cloud.pieeg.com in Chrome or Edge\n2. Session Lobby → PiEEG Devices → IronBCI-32\n3. Pick the serial port in the browser window'
    }
  };
  function wireTabs(tabsSel, preSel, key) {
    var tabs = $$(tabsSel + ' button');
    function sel(i) {
      tabs.forEach(function (t, j) { t.setAttribute('aria-selected', i === j ? 'true' : 'false'); t.tabIndex = i === j ? 0 : -1; });
      $(preSel).innerHTML = CODE[key][tabs[i].textContent.trim()];
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { sel(i); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { sel((i + 1) % tabs.length); tabs[(i + 1) % tabs.length].focus(); }
        if (e.key === 'ArrowLeft') { sel((i + tabs.length - 1) % tabs.length); tabs[(i + tabs.length - 1) % tabs.length].focus(); }
      });
    });
    sel(0);
  }
  wireTabs('#portTabs', '#code-port', 'port');
  wireTabs('#codeTabs', '#code-tab', 'tab');
  $$('.copy').forEach(function (b) {
    b.addEventListener('click', function () {
      var pre = $('#code-' + b.getAttribute('data-copy'));
      var txt = pre.textContent.split('\n').filter(function (l) { return l.trim() && l.trim().charAt(0) !== '#' && !/^\d\./.test(l.trim()); }).join('\n') || pre.textContent;
      function ok() { b.textContent = 'Copied'; later(function () { b.textContent = 'Copy'; }, 1400); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, ok);
      else { var ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} ta.remove(); ok(); }
    });
  });

  // 5 banks hover
  var wire = $('#wire');
  function hiBank(b) {
    wire.classList.toggle('hl', b !== null);
    $$('#wire .wd, #wire .bk').forEach(function (g) { g.classList.toggle('on', b !== null && g.getAttribute('data-b') === b); });
    $$('#bankList > div').forEach(function (d) { d.classList.toggle('on', b !== null && d.getAttribute('data-b') === b); });
  }
  $$('#bankList > div').forEach(function (d) {
    d.tabIndex = 0;
    ['mouseenter', 'focus'].forEach(function (ev) { d.addEventListener(ev, function () { hiBank(d.getAttribute('data-b')); }); });
    ['mouseleave', 'blur'].forEach(function (ev) { d.addEventListener(ev, function () { hiBank(null); }); });
  });
  $$('#wire .bk').forEach(function (g) {
    g.addEventListener('mouseenter', function () { hiBank(g.getAttribute('data-b')); });
    g.addEventListener('mouseleave', function () { hiBank(null); });
  });

  // 6 gel map
  var BANKC = ['#268aff', '#32947b', '#9468c7', '#bd7b18'];
  var gels = $$('#gelMap .gd');
  function paintGel(gp, on) {
    var i = +gp.getAttribute('data-i'), col = BANKC[Math.floor(i / 8)], c = gp.querySelector('circle'), t = gp.querySelector('text');
    gp.setAttribute('aria-pressed', on ? 'true' : 'false');
    c.setAttribute('fill', on ? col : '#2a1519'); c.setAttribute('stroke', on ? '#ffffff' : '#ff5a74');
    c.setAttribute('stroke-opacity', on ? '.55' : '1');
    t.setAttribute('fill', on ? '#ffffff' : '#ffb4c0');
  }
  function gelCount() {
    var n = gels.filter(function (g) { return g.getAttribute('aria-pressed') === 'true'; }).length;
    $('#gelProgress').innerHTML = '<b>' + n + ' of ' + gels.length + '</b> gelled';
    $('#s6').classList.toggle('done', n === gels.length);
  }
  gels.forEach(function (gp) {
    function tog() { paintGel(gp, gp.getAttribute('aria-pressed') !== 'true'); gelCount(); }
    gp.addEventListener('click', tog);
    gp.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } });
  });
  $$('#gelCtl .ctl').forEach(function (b, i) {
    b.addEventListener('click', function () {
      if (i < 4) gels.forEach(function (gp) { if (Math.floor(+gp.getAttribute('data-i') / 8) === i) paintGel(gp, true); });
      else gels.forEach(function (gp) { paintGel(gp, false); });
      gelCount();
    });
  });

  /* ------------------------------------------------------------ loop */
  var last = performance.now();
  function frame(now) {
    var dt = Math.min(0.1, (now - last) / 1000); last = now;
    if (visible) {
      T += dt; drawDemo(dt); drawHum(dt);
      if (mode === 'maps' && now - lastTopo > 180) { lastTopo = now; drawTopo(); }
    }
    if (!stopped) rafId = requestAnimationFrame(frame);
  }
  function init() {
    sizeCanvas(); sizeHum(); setMode('maps'); setCable('charge'); setMains('mains'); kitUpdate(); gelCount();
    if (REDUCE) { drawDemo(0); drawHum(0); } else rafId = requestAnimationFrame(frame);
  }
  var rs; onGlobal(window, 'resize', function () { clearTimeout(rs); rs = setTimeout(function () { if (!stopped) { sizeCanvas(); sizeHum(); } }, 150); });
  init();

  return function cleanup() {
    stopped = true;
    cancelAnimationFrame(rafId);
    clearTimeout(rs);
    timers.forEach(clearTimeout);
    if (io) io.disconnect();
    globals.forEach(function (g) { g[0].removeEventListener(g[1], g[2]); });
  };
}
