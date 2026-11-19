/* eslint-disable */
/* Hardware bench (home page): device picker, person model, electrodes, wiring and live signals.
   Person update: weight shifting, blinking, shirtless ECG mode, T-shirt for EEG/EMG/EOG, improved cap fit. */
function mountHardwareBench(e) {
  if (!e) return () => {
  };
  let t = 0, n = false, r = true, o = { pieeg: "/hardware/pieeg", "pieeg-16": "/hardware/pieeg-16", ironbci: "/hardware/ironbci", "ironbci-32": "/hardware/ironbci-32", "pieeg-xr": "/xr", "octopus-16": "/hardware/octopus-16", jneeg: "/hardware/jneeg", ardeeg: "/hardware/ardeeg", microbci: "/hardware/microbci" }, a = { EEG: "#22d3ee", EMG: "#f59e0b", ECG: "#f43f5e", EOG: "#a78bfa" }, i = { EEG: "brain", EMG: "muscle", ECG: "heart", EOG: "eye movement" }, s = { power: "#34d399", data: "#38bdf8", neutral: "#a1a1aa" }, u = [{ id: "pieeg", name: "PiEEG-8", meta: "8 ch, Pi 3/4/5", badge: "Most popular", tagline: "8-channel Raspberry Pi shield", filters: ["rpi", "8"], ch: 8, summary: "Plugs onto the Raspberry Pi GPIO header and turns it into a biosignal lab. PiEEG Server streams and records the data.", modes: ["EEG", "EMG", "ECG"], electrodes: ["dry", "wet"], rig: "shield-monitor", host: "rpi", shield: "#e9a526", rate: 250, docs: "pieeg", spec: { board: "ADS1299, 24-bit, gain 1 to 24", host: "Raspberry Pi 3, 4 or 5", link: "SPI through the 40-pin GPIO header. PiEEG Server streams over WebSocket, LSL and OSC.", rate: "250 SPS to 16 kSPS", power: "5 V power bank, at least 3 A, up to 10,000 mAh" }, need: ["Raspberry Pi 3, 4 or 5 with a microSD card", "5 V power bank, 3 A or more", "8 electrodes and 2 ear clips", "EEG cap", "Keyboard, mouse and a portable monitor"], safety: "Run everything from the power bank. Keep the Pi and the monitor off mains power while electrodes are on the body." }, { id: "pieeg-16", name: "PiEEG-16", meta: "16 ch, Pi 5", tagline: "16-channel Raspberry Pi shield", filters: ["rpi", "16"], ch: 16, summary: "Two ADS1299 chips in a daisy chain double the channel count for fuller scalp coverage and denser EMG.", modes: ["EEG", "EMG", "ECG"], electrodes: ["dry", "wet"], rig: "shield-monitor", host: "rpi", shield: "#c4449f", rate: 250, docs: "pieeg-16", spec: { board: "Two ADS1299 in daisy chain, 24-bit", host: "Raspberry Pi 5", link: "SPI through the 40-pin GPIO header. PiEEG Server streams over WebSocket, LSL and OSC.", rate: "250 SPS to 16 kSPS", power: "5 V power bank, at least 3 A, up to 10,000 mAh" }, need: ["Raspberry Pi 5 with a microSD card", "5 V power bank, 3 A or more", "16 electrodes and 2 ear clips", "EEG cap", "Keyboard, mouse and a portable monitor"], safety: "Run everything from the power bank. Keep the Pi and the monitor off mains power while electrodes are on the body." }, { id: "ironbci", name: "IronBCI", meta: "8 ch, Bluetooth LE", tagline: "8-channel wearable over Bluetooth LE", filters: ["wireless", "8"], ch: 8, summary: "A standalone board you wear. No Raspberry Pi needed: it runs on a small LiPo and streams to a laptop or phone over Bluetooth LE.", modes: ["EEG", "EMG", "ECG", "EOG"], electrodes: ["dry", "wet"], rig: "body-ble", body: "ironbci", rate: 250, docs: "ironbci", spec: { board: "ADS1299, 24-bit", host: "None. Streams to a laptop, phone or tablet", link: "Bluetooth LE to PiEEG Server, the Android app or the Python SDK", rate: "250 SPS", power: "LiPo battery, 200 mAh, 2.0 mm JST. Charges over Micro USB" }, need: ["LiPo battery, 200 mAh with a 2.0 mm JST plug", "8 electrodes and 2 ear clips", "EEG cap, arm band or chest strap", "Laptop or Android phone with Bluetooth"], safety: "Check the battery polarity before the first connection: a reversed JST plug damages the board. Don\u2019t record while charging. To charge, set switch 1 on and switch 2 off." }, { id: "ironbci-32", name: "IronBCI-32", meta: "32 ch, USB serial", tagline: "32-channel high-density EEG", filters: ["16"], ch: 32, summary: "The highest channel count in the family. Full-scalp coverage with wet electrodes, streamed to a laptop over USB and ready for BrainFlow.", modes: ["EEG", "EMG", "ECG", "EOG"], electrodes: ["wet"], rig: "usb-box", rate: 500, docs: "ironbci-32", spec: { board: "Four AD7771 converters with an STM32H7, 24-bit", host: "Laptop or desktop, running on battery", link: "USB serial at 921,600 baud, FreeEEG frames. Works with BrainFlow and PiEEG Server.", rate: "500 SPS", power: "5 V USB power bank on its own cable. Mains power is not allowed." }, need: ["5 V USB power bank", "Two Micro USB cables: one for power, one full data cable", "32 wet Ag/AgCl electrodes, conductive gel and 2 ear clips", "EEG cap", "Laptop running on its battery"], safety: "Power the board from the 5 V battery only, and unplug the laptop from mains before you connect it. This keeps the body isolated from the grid and removes 50/60 Hz noise." }, { id: "pieeg-xr", name: "PiEEG XR", meta: "8 ch, VR mask", tagline: "Neural face interface for VR", filters: ["wireless", "8"], ch: 8, summary: "A silicone face mask with ten flat dry electrodes replaces your headset\u2019s facial interface. Expressions and focus flow into WebXR or VRChat over OSC.", modes: ["EMG", "EEG"], electrodes: ["dry"], rig: "xr", rate: 250, docs: "PiEEG_XR", spec: { board: "Dual ADS1299 with an STM32WB, 1.0 \xB5Vpp noise", host: "A VR headset", link: "Bluetooth LE 5. Advertises as \u201CPiEEG XR\u201D. OSC bridge for VRChat.", power: "5 V USB-C power bank, or the headset\u2019s own battery" }, need: ["A supported VR headset", "5 V USB-C power bank (a USB-C to USB-A cable works best)", "The mask and enclosure made for your headset model"], safety: "Each mask and enclosure is shaped for one headset model. Use the unit made for yours." }, { id: "octopus-16", name: "Octopus 16", meta: "16 ch, ESP32-S3", tagline: "16-channel wearable on a Seeed XIAO ESP32-S3", filters: ["wireless", "16"], ch: 16, summary: "Spring-loaded pogo pins press straight onto the scalp, so there are no loose electrode cables. Worn over the visual cortex.", modes: ["EEG", "EMG", "ECG"], electrodes: ["dry"], rig: "body-ble", body: "octopus", rate: 250, docs: "Octopus_16", spec: { board: "Two ADS131M08, 24-bit", host: "Seeed Studio XIAO ESP32-S3 on the board", link: "Bluetooth LE to PiEEG Server or the browser SDK", rate: "250 SPS", power: "Small 5 V power bank, up to 300 mAh, 2 A max" }, need: ["Seeed Studio XIAO ESP32-S3 with its BLE antenna", "Small 5 V power bank, up to 300 mAh", "A belt or band to hold it over the back of the head"], safety: "Keep the pogo pins clean with 90% isopropyl alcohol. Never use oil or grease on them." }, { id: "jneeg", name: "JNEEG", meta: "8 ch, Jetson Nano", tagline: "8-channel shield for NVIDIA Jetson Nano", filters: ["8"], ch: 8, summary: "The PiEEG shield on a Jetson Nano, so you can run machine-learning models on the GPU right next to the signal.", modes: ["EEG", "EMG", "ECG"], electrodes: ["dry", "wet"], rig: "shield-monitor", host: "jetson", shield: "#2f86d6", rate: 250, docs: "jneeg", spec: { board: "ADS1299, 24-bit", host: "NVIDIA Jetson Nano", link: "SPI through the Jetson GPIO header. PiEEG Server runs with the jneeg profile.", rate: "250 SPS", power: "5 V power bank, at least 3 A, up to 10,000 mAh" }, need: ["Jetson Nano with a microSD card", "5 V power bank, 3 A or more", "8 electrodes and 2 ear clips", "EEG cap", "Keyboard, mouse and a portable monitor"], safety: "Run everything from the power bank. Keep the Jetson and the monitor off mains power while electrodes are on the body." }, { id: "ardeeg", name: "ardEEG", meta: "8 ch, Arduino R4", tagline: "8-channel shield for Arduino UNO R4", filters: ["8"], ch: 8, summary: "The lowest-cost way in. The Arduino sends data over Wi-Fi to a Python script on your computer.", modes: ["EEG", "EMG", "ECG"], electrodes: ["dry", "wet"], rig: "shield-wireless", host: "arduino", shield: "#d9642b", air: "wifi", rate: 250, docs: "ardeeg", spec: { board: "ADS1299, 24-bit", host: "Arduino UNO R4", link: "Wi-Fi to a Python script on a computer on the same network", power: "Small 5 V power bank, 1 A max, up to 1,000 mAh" }, need: ["Arduino UNO R4", "Small 5 V power bank, 1 A max", "8 electrodes and 2 ear clips", "EEG cap", "A computer on the same Wi-Fi network"], safety: "Upload the sketch over USB, then unplug it. During measurement the Arduino runs from the power bank only, never from a PC port or wall adapter." }, { id: "microbci", name: "MicroBCI", meta: "8 ch, STM32", tagline: "8-channel shield for NUCLEO-WB55", filters: ["wireless", "8"], ch: 8, summary: "Brings EEG to the STM32WB Nucleo board, with Bluetooth firmware, a mobile SDK and a Python SDK.", modes: ["EEG", "EMG"], electrodes: ["dry", "wet"], rig: "shield-wireless", host: "nucleo", shield: "#37a36f", air: "ble", rate: 250, docs: "microbci", spec: { board: "ADS1299, 24-bit", host: "STM32 NUCLEO-WB55", link: "Bluetooth LE to the mobile SDK or the Python SDK", power: "Small 5 V power bank, up to 1 A" }, need: ["NUCLEO-WB55 board and a Micro USB cable", "Small 5 V power bank", "8 electrodes and 2 ear clips", "EEG cap or EMG kit"], safety: "Keep the board fully isolated from mains during measurement. A 5 V battery is the only allowed supply." }], h = { cx: 330, cy: 139, R: 51 }, c = 51, d = { Fp1: [-0.31, 0.95], Fp2: [0.31, 0.95], AF3: [-0.33, 0.76], AF4: [0.33, 0.76], F7: [-0.81, 0.59], F3: [-0.4, 0.53], Fz: [0, 0.5], F4: [0.4, 0.53], F8: [0.81, 0.59], FC5: [-0.72, 0.28], FC1: [-0.24, 0.25], FC2: [0.24, 0.25], FC6: [0.72, 0.28], T7: [-1, 0], C3: [-0.5, 0], Cz: [0, 0], C4: [0.5, 0], T8: [1, 0], CP5: [-0.72, -0.28], CP1: [-0.24, -0.25], CP2: [0.24, -0.25], CP6: [0.72, -0.28], P7: [-0.81, -0.59], P3: [-0.4, -0.53], Pz: [0, -0.5], P4: [0.4, -0.53], P8: [0.81, -0.59], PO3: [-0.33, -0.76], PO4: [0.33, -0.76], O1: [-0.31, -0.95], Oz: [0, -1], O2: [0.31, -0.95] }, p = { 8: ["Fp1", "Fp2", "C3", "C4", "P7", "P8", "O1", "O2"], 16: ["Fp1", "Fp2", "F7", "F3", "F4", "F8", "T7", "C3", "C4", "T8", "P7", "P3", "P4", "P8", "O1", "O2"], 32: ["Fp1", "Fp2", "AF3", "AF4", "F7", "F3", "Fz", "F4", "F8", "FC5", "FC1", "FC2", "FC6", "T7", "C3", "Cz", "C4", "T8", "CP5", "CP1", "CP2", "CP6", "P7", "P3", "Pz", "P4", "P8", "PO3", "PO4", "O1", "Oz", "O2"], occ16: ["C3", "C4", "CP5", "CP1", "CP2", "CP6", "P7", "P3", "Pz", "P4", "P8", "PO3", "PO4", "O1", "Oz", "O2"] };
  function w(l, f) {
    let g = Math.hypot(l, f), y = g * Math.PI / 2, M = Math.atan2(-l, f), _ = Math.sin(y) * Math.sin(M), L = Math.sin(y) * Math.cos(M), fe = Math.cos(y);
    return { x: h.cx + c * _, y: h.cy - c * fe, front: L };
  }
  let x = (l, f, g) => l + (f - l) * g;
  function O(l, f, g, y) {
    let M = f[0] - l[0], _ = f[1] - l[1], L = Math.hypot(M, _);
    return { x: l[0] + M * g + -_ / L * y, y: l[1] + _ * g + M / L * y };
  }
  let T = [[455, 448], [470, 560]], P = [[447, 392], [455, 440]];
  function q(l) {
    let f = [], g = l > 8 ? 5 : 4;
    for (let y = 0; y < g; y++) for (let M of [-7.5, 7.5]) f.push({ ...O(T[0], T[1], 0.14 + y * (0.66 / (g - 1)), M), label: `Forearm ${f.length + 1}` });
    if (l > 8) {
      let y = 1;
      for (let M = 0; M < 3; M++) for (let _ of [-8, 8]) f.push({ ...O(P[0], P[1], 0.34 + M * 0.24, _), label: `Upper arm ${y++}` });
    }
    return f.slice(0, Math.min(l, 16));
  }
  let C = [{ x: 390, y: 318, label: "Lead I" }, { x: 398, y: 482, label: "Lead II" }, { x: 378, y: 404, label: "V4" }], F = [{ x: 304, y: 152, label: "Right canthus" }, { x: 356, y: 152, label: "Left canthus" }, { x: 345, y: 140, label: "Above left eye" }, { x: 345, y: 168, label: "Below left eye" }], U = [{ x: 296, y: 146, label: "Forehead R2" }, { x: 318, y: 144, label: "Forehead R1" }, { x: 342, y: 144, label: "Forehead L1" }, { x: 364, y: 146, label: "Forehead L2" }, { x: 273, y: 170, label: "Temple right" }, { x: 387, y: 170, label: "Temple left" }, { x: 298, y: 197, label: "Cheek right" }, { x: 362, y: 197, label: "Cheek left" }], V = { x: 319, y: 188, label: "Reference, mask" }, oe = { x: 341, y: 188, label: "Bias, mask" }, J = { EEG: { x: 402, y: 188 }, EOG: { x: 402, y: 188 }, EMG: { x: 492, y: 560 }, ECG: { x: 430, y: 505 } }, ee = { EEG: { x: 414, y: 118 }, EOG: { x: 414, y: 118 }, EMG: { x: 455, y: 328 }, ECG: { x: 330, y: 452 } };
  function ae(l, f) {
    let g = { ch: [], ref: null, bias: null, leads: 0.55, note: "", mapShown: false };
    if (l.rig === "xr") return g.ch = U.map((y, M) => ({ ...y, x: 330 + (y.x - 330) * 0.76, y: y.y - 20, visible: true })), g.ref = { ...V, x: 322, y: 168 }, g.bias = { ...oe, x: 338, y: 168 }, g.leads = 0, g.collector = { x: 414, y: 160 }, g.note = f === "EMG" ? "Ten flat dry Ag/AgCl pads sit inside the silicone mask: eight channels plus reference and bias. Smiles, frowns and brow raises show up as facial EMG." : "The same forehead pads pick up frontal EEG, the basis for focus and relaxation scores in XR.", g;
    if (f === "EEG") {
      let y = l.id === "octopus-16" ? p.occ16 : p[l.ch];
      g.ch = y.map((_) => {
        let L = w(...d[_]);
        return { x: L.x, y: L.y, label: _, visible: L.front > -0.03, topo: d[_] };
      }), g.ref = { x: 373, y: 177, label: "Reference, left ear clip" }, g.bias = { x: 287, y: 177, label: "Bias, right ear clip" }, g.leads = 0, g.mapShown = true;
      let M = g.ch.filter((_) => !_.visible).length;
      g.note = l.id === "octopus-16" ? "Pogo pins cover the back of the head, over the visual cortex. The map shows all 16 positions." : `${y.length} positions on the 10-20 system. The model shows the front half; ${M} more sit on the back of the head.`;
    } else if (f === "EMG") {
      g.ch = q(l.ch).map((M) => ({ ...M, visible: true })), g.ref = { x: 478, y: 447, label: "Reference, elbow" }, g.bias = { x: 478, y: 575, label: "Bias, wrist" };
      let y = g.ch.length;
      g.note = `${y} channels along the forearm${y > 8 ? " and upper arm" : ""}, over the flexor and extensor muscles. Reference on the elbow bone, bias on the wrist.` + (l.ch > y ? ` ${l.ch - y} channels stay free for other muscles.` : "");
    } else f === "ECG" ? (g.ch = C.map((y) => ({ ...y, visible: true })), g.ref = { x: 270, y: 318, label: "Reference, below right collarbone" }, g.bias = { x: 262, y: 482, label: "Bias, lower right ribs" }, g.note = `Three channels: Lead I, Lead II and chest lead V4. Reference below the right collarbone, bias on the lower right ribs.${l.ch > 3 ? ` ${l.ch - 3} channels stay free.` : ""}`) : f === "EOG" && (g.ch = F.map((y) => ({ ...y, visible: true })), g.ref = { x: 373, y: 177, label: "Reference, left ear clip" }, g.bias = { x: 287, y: 177, label: "Bias, right ear clip" }, g.note = `Electrodes at the outer corners of the eyes track left-right gaze. Above and below one eye they catch blinks. Uses 4 of ${l.ch} channels.`);
    return g.collector = l.rig === "body-ble" ? { ...ee[f] } : { ...J[f] }, l.rig === "body-ble" && f === "EEG" && l.id === "octopus-16" && (g.collector = { x: 394, y: 98 }), g;
  }
  let K = "http://www.w3.org/2000/svg", j = (l) => e.querySelector(l), se = j("#hw-scene"), v = window.matchMedia("(prefers-reduced-motion: reduce)"), b = true, S = 0, R, B, G = { x: 0, y: 0, angle: 0 }, Q = (l) => window.PIEEG_ASSETS?.[l] || l;
  function D(l, f = {}, g) {
    let y = document.createElementNS(K, l);
    for (let M in f) y.setAttribute(M, f[M]);
    return g && g.appendChild(y), y;
  }
  function ie(l, f) {
    let g = l.split(" "), y = [], M = "";
    for (let _ of g) (M + " " + _).trim().length > f ? (y.push(M.trim()), M = _) : M += " " + _;
    return M.trim() && y.push(M.trim()), y;
  }
  function pe(l, f, g, y = "t-sub", M = 17, _ = "start") {
    return `<text x="${l}" y="${f}" text-anchor="${_}" class="${y}">${g.map((L, fe) => `<tspan x="${l}" dy="${fe ? M : 0}">${L}</tspan>`).join("")}</text>`;
  }
  function te(l, f, g, y, M = "start") {
    return `<text x="${l}" y="${f}" text-anchor="${M}"><tspan class="t-main" x="${l}">${g}</tspan>${y ? `<tspan class="t-sub" x="${l}" dy="17">${y}</tspan>` : ""}</text>`;
  }
  let me = { pieeg: "/products/pieeg.png", "pieeg-16": "/products/pieeg16.jpg", ironbci: "/products/ironbci.jpg", "ironbci-32": "/products/ironbci-32-main.png", "pieeg-xr": "/xr/xr-headset-main.png", "octopus-16": "/products/octopus16.png", jneeg: "/products/jneeg.png", ardeeg: "/products/ardeeg.png", microbci: "/products/microbci.png", "cap8-dry": "/products/cap8-dry.png", "cap8-wet": "/products/cap8-wet.jpg", cap16: "/products/cap16.png", "cap32-wet": "/products/cap32-wet.webp" };
  function ve(l, f, g, y, M, _ = "device") {
    return `<image class="product-photo" data-part="${_}" x="${f}" y="${g}" width="${y}" height="${M}" preserveAspectRatio="xMidYMid meet" href="${Q(me[l])}"/>`;
  }
  function Ae(l) {
    return m.mode !== "EEG" || l.rig === "xr" || l.id === "octopus-16" ? null : l.ch === 32 ? "cap32-wet" : l.ch === 16 ? "cap16" : m.gel === "wet" ? "cap8-wet" : "cap8-dry";
  }
  function _e(l) {
    return l.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g, (f, g, y) => `${660 - parseFloat(g)},${y}`);
  }
  let De = "M252,300 C226,298 208,312 204,338 C198,380 192,410 190,440 C186,480 181,522 177,566 L205,568 C208,530 214,490 218,452 C222,420 230,390 236,356 Z", Ne = "M177,564 C170,584 172,606 182,617 C192,623 205,616 207,600 C209,588 207,576 205,566 Z";
  function kt() {
    let l = j("#hw-lFigure");
    l.innerHTML = `
    <defs>
      <linearGradient id="hw-lidSkin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#bc927a"/><stop offset=".5" stop-color="#cfa98e"/><stop offset="1" stop-color="#b18a73"/>
      </linearGradient>
      <linearGradient id="hw-capFabric" x1="0" y1="0" x2="1" y2=".6">
        <stop offset="0" stop-color="#1b3b78"/><stop offset=".45" stop-color="#2356a3"/><stop offset="1" stop-color="#16366d"/>
      </linearGradient>
      <clipPath id="hw-shirtArea"><rect x="55" y="232" width="550" height="450"/></clipPath>
    </defs>
    <image x="60" y="42" width="540" height="640" preserveAspectRatio="none" href="${Q("/home/body-figure.png")}"/>
    <image id="hw-shirt" clip-path="url(#hw-shirtArea)" x="60" y="42" width="540" height="640" preserveAspectRatio="none" href="${Q("/home/body-shirt.png")}"/>
    <g id="hw-eyelids" opacity="0" aria-hidden="true">
      <g transform="translate(313.1 151.2)"><path d="M-8,0 Q0,-5 8,0 Q0,4 -8,0Z" fill="url(#hw-lidSkin)"/><path d="M-7,1 Q0,3 7,1" stroke="#664b40" stroke-width=".65" fill="none"/></g>
      <g transform="translate(346.1 151.2)"><path d="M-8,0 Q0,-5 8,0 Q0,4 -8,0Z" fill="url(#hw-lidSkin)"/><path d="M-7,1 Q0,3 7,1" stroke="#664b40" stroke-width=".65" fill="none"/></g>
    </g>`, B = j("#hw-eyelids"), R = D("g", { id: "hw-person" }, se);
    for (let f of ["hw-lFigure", "hw-lWear", "hw-lLeads", "hw-lElectrodes", "hw-lBodyDev"]) R.appendChild(j("#" + f));
    se.insertBefore(R, j("#hw-lAir")), D("g", { id: "hw-lProducts" }, se), j("#hw-capShape").setAttribute("d", "M284 154 C281 137 283 116 293 102 C302 88 315 82 330 82 C348 82 362 93 371 111 C378 127 378 142 375 154 C362 145 346 139 330 139 C313 139 297 145 284 154Z");
  }
  function ue(l) {
    let f = G.angle * Math.PI / 180, g = Math.cos(f), y = Math.sin(f);
    return { x: 330 + (l.x - 330) * g - (l.y - 530) * y + G.x, y: 530 + (l.x - 330) * y + (l.y - 530) * g + G.y };
  }
  function W(l) {
    b && !m.paused && (S += l);
    let f = S * Math.PI * 2 / 6.8;
    G.x = b ? Math.sin(f) * 4.2 : 0, G.y = b ? Math.cos(f * 2) * 0.6 : 0, G.angle = b ? Math.sin(f - 0.25) * 0.72 : 0, R.setAttribute("transform", `translate(${G.x.toFixed(3)} ${G.y.toFixed(3)}) rotate(${G.angle.toFixed(3)} 330 530)`);
    let g = S % 20, y = 0;
    if (b) for (let M of [2.4, 6.6, 11.2, 11.53, 16.4]) {
      let _ = (g - M) / 0.2;
      _ > 0 && _ < 1 && (y = Math.max(y, Math.sin(Math.PI * _)));
    }
    B.setAttribute("opacity", y.toFixed(3)), B.querySelectorAll("g").forEach((M, _) => M.setAttribute("transform", `translate(${_ ? 346.1 : 313.1} 151.2) scale(1 ${Math.max(0.02, y).toFixed(3)})`));
  }
  function Z(l, f) {
    let g = j("#hw-lWear"), y = "";
    if (l.rig === "xr") y += `<g data-part="device" class="fade-in" transform="translate(79.2 -20) scale(.76 1)">
      <path d="M262,150 C250,146 244,160 250,172 M398,150 C410,146 416,160 410,172" stroke="#2b3038" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M256,142 C256,132 268,130 330,130 C392,130 404,132 404,142 L404,196 C404,210 388,214 372,210 C356,206 350,192 330,192 C310,192 304,206 288,210 C272,214 256,210 256,196 Z" fill="rgba(34,38,46,.55)" stroke="#8b93a1" stroke-opacity=".6" stroke-width="1.5"/>
      <path d="M262,138 L398,138" stroke="rgba(255,255,255,.12)"/>
      <rect x="402" y="140" width="26" height="36" rx="6" fill="#20242b" stroke="#5a616d"/>
      <circle cx="415" cy="150" r="2.4" fill="${s.data}"/>
    </g>
    <g data-part="electrodes">${te(440, 214, "Silicone mask", "Seen through the headset")}</g>
    `;
    else if (f === "EEG" && l.id !== "octopus-16") {
      let L = "";
      for (let fe of [0.25, 0.5, 0.75]) {
        let le = "";
        for (let xe = -90; xe <= 90; xe += 6) {
          let Ce = xe * Math.PI / 180, Te = w(fe * Math.sin(Ce), fe * Math.cos(Ce));
          le += (le ? "L" : "M") + Te.x.toFixed(1) + "," + Te.y.toFixed(1);
        }
        L += `<path d="${le}"/>`;
      }
      for (let fe of [-60, -30, 0, 30, 60]) {
        let le = "";
        for (let xe = 0; xe <= 1.02; xe += 0.06) {
          let Ce = fe * Math.PI / 180, Te = w(xe * Math.sin(Ce), xe * Math.cos(Ce));
          le += (le ? "L" : "M") + Te.x.toFixed(1) + "," + Te.y.toFixed(1);
        }
        L += `<path d="${le}"/>`;
      }
      y += `<g data-part="electrodes" class="fade-in">
      <use href="#hw-capShape" fill="url(#hw-capFabric)" stroke="#1b3e79" stroke-width="1.2"/>
      <g clip-path="url(#hw-capClip)" fill="none" stroke="var(--mode)" stroke-opacity=".16" stroke-width="1">${L}</g>
      <path d="M281,159 C286,190 305,221 330,229 C355,221 374,190 379,159" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="2" stroke-dasharray="1 4"/>
    </g>`;
    } else f === "EEG" && l.id === "octopus-16" && (y += '<g class="fade-in"><path d="M266,120 C290,104 370,104 394,120" stroke="#2b3038" stroke-width="6" fill="none"/></g>');
    l.rig === "body-ble" && (f === "EMG" && (y += '<path class="fade-in" d="M424,330 C440,338 470,338 486,330" stroke="#2b3038" stroke-width="9" fill="none" stroke-linecap="round"/>'), f === "ECG" && (y += '<path class="fade-in" d="M241,452 C300,462 360,462 419,452" stroke="#2b3038" stroke-width="8" fill="none"/>'), (f === "EEG" || f === "EOG") && l.id !== "octopus-16" && (y += '<path class="fade-in" d="M268,112 C300,98 360,98 392,112" stroke="#2b3038" stroke-width="5" fill="none"/>'));
    let M = Ae(l), _ = `<g class="fade-in" aria-label="${l.name} product photograph">${ve(l.id, 558, 60, 230, 166)}</g>`;
    M && (_ += `<g class="fade-in" aria-label="EEG cap product photograph">${ve(M, 800, 50, 166, 190, "electrodes")}</g>`, M === "cap8-dry" && (y += `<g clip-path="url(#hw-capClip)" data-part="electrodes"><image x="248" y="69" width="171" height="151" preserveAspectRatio="none" href="${Q(me[M])}"/></g>`), M === "cap16" && (y += `<g clip-path="url(#hw-capClip)" data-part="electrodes">${ve(M, 235, 53, 190, 202, "electrodes")}</g>`), y += '<path d="M284 153 C299 143 314 139 330 139 C346 139 361 144 375 153" fill="none" stroke="#173567" stroke-width="1.5" data-part="electrodes"/>'), g.innerHTML = y, j("#hw-lProducts").innerHTML = _;
  }
  function A(l, f, g, y, M, _, L, fe) {
    return `<rect x="${l}" y="${f - y}" width="${g}" height="${y}" fill="${fe}"/><path d="M${l},${f - y} L${l + g},${f - y} L${l + g + M},${f - y + _} L${l + M},${f - y + _} Z" fill="${L}"/>`;
  }
  function $(l, f) {
    let g = parseInt(l.slice(1), 16), y = g >> 16, M = g >> 8 & 255, _ = g & 255;
    return y = Math.round(y * f), M = Math.round(M * f), _ = Math.round(_ * f), `rgb(${Math.min(255, y)},${Math.min(255, M)},${Math.min(255, _)})`;
  }
  function I(l, f, g) {
    return ve(g.id, l - 4, f - 76, 180, 76, "device host");
  }
  function z(l, f, g = 104, y = "5 V power bank", M = "") {
    return `<g data-part="power">
    <rect x="${l}" y="${f - 30}" width="${g}" height="30" rx="8" fill="#1d2127" stroke="rgba(255,255,255,.12)"/>
    <rect x="${l + 6}" y="${f - 21}" width="7" height="12" rx="1.5" fill="#0c0e11"/>
    ${[0, 1, 2, 3].map((_) => `<circle cx="${l + g - 40 + _ * 9}" cy="${f - 15}" r="2.4" fill="${_ < 3 ? s.power : "#2b3a31"}"/>`).join("")}
    ${te(l, f + 24, y, M)}
  </g>`;
  }
  function N(l, f) {
    return `<g data-part="host">
    <rect x="${l}" y="${f}" width="140" height="92" rx="7" fill="#0b0d10" stroke="#3a3f47" stroke-width="2"/>
    <g class="screen" data-x="${l + 10}" data-y="${f + 10}" data-w="120" data-h="72"></g>
    <rect x="${l + 64}" y="${f + 92}" width="12" height="${520 - f - 96}" fill="#2a2e35"/>
    <rect x="${l + 38}" y="516" width="64" height="5" rx="2" fill="#2a2e35"/>
  </g>`;
  }
  function Y(l, f, g = {}) {
    return `<g data-part="host">
    <rect x="${l}" y="${f}" width="144" height="92" rx="7" fill="#0b0d10" stroke="#3a3f47" stroke-width="2"/>
    <g class="screen" data-x="${l + 10}" data-y="${f + (g.battery ? 20 : 10)}" data-w="124" data-h="${g.battery ? 62 : 72}"></g>
    ${g.battery ? `<g><rect x="${l + 104}" y="${f + 8}" width="22" height="10" rx="2" fill="none" stroke="${s.power}"/><rect x="${l + 106}" y="${f + 10}" width="13" height="6" fill="${s.power}"/><rect x="${l + 126}" y="${f + 11}" width="2" height="4" fill="${s.power}"/></g>` : ""}
    <path d="M${l - 14},520 L${l + 158},520 L${l + 148},${f + 96} L${l - 4},${f + 96} Z" fill="#23272e" stroke="#3a3f47"/>
  </g>`;
  }
  function we(l, f) {
    return `<g data-part="host">
    <rect x="${l}" y="${f}" width="40" height="76" rx="8" fill="#0b0d10" stroke="#3a3f47" stroke-width="2"/>
    <g class="screen" data-x="${l + 5}" data-y="${f + 10}" data-w="30" data-h="54"></g>
    <path d="M${l + 6},${f + 76} L${l + 2},520 M${l + 34},${f + 76} L${l + 38},520" stroke="#2a2e35" stroke-width="3"/>
  </g>`;
  }
  function Le(l, f) {
    return `<g data-part="power">
    <g stroke="#8b93a1" stroke-width="2" fill="none" stroke-linecap="round">
      <path d="M${l},${f - 10} v-8 M${l + 10},${f - 10} v-8"/><rect x="${l - 5}" y="${f - 10}" width="20" height="14" rx="3" fill="#1d2127"/><path d="M${l + 5},${f + 4} v10"/>
    </g>
    <path d="M${l - 10},${f + 14} L${l + 20},${f - 22}" stroke="#ff5a74" stroke-width="2.4" stroke-linecap="round"/>
  </g>`;
  }
  function Ie(l, f, g, y = false, M = 2.2) {
    return `<g data-part="${g}"><path d="${l}" fill="none" stroke="${f}" stroke-opacity=".38" stroke-width="${M}" stroke-linecap="round"/>${y ? `<path class="flow" d="${l}" stroke="${f}" stroke-width="${M}" stroke-linecap="round"/>` : ""}</g>`;
  }
  function Me(l) {
    let f = { html: "", port: null, air: [], airFrom: null }, g = '<g data-part="desk"><path d="M548,520 L992,520" stroke="rgba(255,255,255,.14)"/><rect x="548" y="520" width="444" height="60" fill="url(#hw-deskGrad)"/></g>';
    if (l.rig === "shield-monitor") {
      let y = l.host === "jetson" ? "Jetson Nano" : "Raspberry Pi";
      f.html = g + Ie("M786,505 C760,505 748,510 736,512", s.power, "power") + Ie("M890,505 C908,505 912,500 916,492", s.power, "power") + Ie("M718,470 C760,450 800,440 846,430", "#8b93a1", "host", false, 2) + I(578, 520, l) + z(786, 520, 104, "5 V power bank", "3 A, up to 10,000 mAh") + N(846, 328) + `<g data-part="device">${te(578, 420, l.name, "on " + y + ", GPIO header")}</g><g data-part="host">${te(846, 300, "Portable monitor", "Same power bank")}</g>`, f.port = { x: 592, y: 482 };
    } else if (l.rig === "shield-wireless") {
      let y = { arduino: "Arduino UNO R4", nucleo: "NUCLEO-WB55" }[l.host];
      f.html = g + Ie("M740,505 C730,505 728,510 726,512", "#45dd8b", "power") + I(572, 520, l) + z(740, 520, 80, "5 V bank", "1 A max") + Y(846, 390) + `<g data-part="device">${te(572, 420, l.name, "on " + y)}</g><g data-part="host">${te(988, 546, "Your computer", l.air === "wifi" ? "Python script, same Wi-Fi" : "Python SDK or mobile app", "end")}</g>`, f.port = { x: 586, y: 482 }, f.airFrom = { x: 690, y: 470 }, f.air = [{ to: { x: 916, y: 414 }, kind: l.air }];
    } else l.rig === "body-ble" ? (f.html = g + we(646, 420) + Y(820, 410) + `<g data-part="host">${te(636, 546, "Phone", "Android app")}${te(820, 546, "Laptop", "PiEEG Server or SDK")}</g>`, f.airFrom = "body", f.air = [{ to: { x: 666, y: 426 }, kind: "ble" }, { to: { x: 892, y: 418 }, kind: "ble" }]) : l.rig === "usb-box" ? (f.html = g + Ie("M700,500 C712,500 716,506 726,508", "#45dd8b", "power", false, 2.6) + Ie("M690,480 C740,440 800,480 846,470", s.data, "link", true, 2.6) + `<g data-part="device">${ve("ironbci-32", 574, 444, 150, 78)}
        <text x="596" y="500" class="t-dim" style="font-weight:600;fill:#aab2bd;paint-order:stroke;stroke:#fff;stroke-width:2">IronBCI-32</text>
      </g>` + z(726, 520, 92, "5 V power bank", "Its own USB cable") + Y(846, 390, { battery: true }) + Le(958, 532) + `<g data-part="device">${te(582, 420, "IronBCI-32", "Two Micro USB cables")}</g><g data-part="host">${te(846, 372, "Laptop on battery", "Unplugged from mains")}</g><g data-part="link"><text x="770" y="448" class="t-sub" style="fill:${s.data}">USB data</text></g>`, f.port = { x: 590, y: 474 }) : l.rig === "xr" && (f.html = g + Ie("M428,172 C470,210 520,380 560,508", s.power, "power", false, 2.4) + z(560, 520, 100, "USB-C power bank", "Or the headset battery") + Y(820, 410) + `<g data-part="host">${te(988, 546, "PC or headset browser", "OSC to VRChat, WebXR", "end")}</g>`, f.airFrom = { x: 415, y: 152 }, f.air = [{ to: { x: 892, y: 418 }, kind: "ble" }]);
    return f;
  }
  function Tn(l) {
    let f = ve(l.id, -25, -24, 50, 48);
    return l.body === "ironbci" ? f + `
    <g data-part="power">
      <path d="M-4,20 C-4,24 0,24 4,28" stroke="#ff5a74" stroke-width="1.4" fill="none"/>
      <rect x="-2" y="26" width="30" height="18" rx="3" fill="#b9bfc7" stroke="#e1e5ea"/>
      <path d="M2,31 h22 M2,35 h22" stroke="#8e959e" stroke-width=".8"/>
    </g>` : f + `<g data-part="power"><rect x="28" y="-6" width="24" height="14" rx="3" fill="#1d2127" stroke="rgba(255,255,255,.2)"/><circle cx="46" cy="1" r="1.8" fill="${s.power}"/></g>`;
  }
  let k = { ironbci: { EEG: [18, -62, "end"], EOG: [18, -62, "end"], EMG: [-40, -8, "end"], ECG: [0, 64, "middle"] }, octopus: { EEG: [-30, -40, "end"], EMG: [-40, -8, "end"], ECG: [0, 52, "middle"] } };
  function E(l, f) {
    let [g, y, M] = k[l.body][f];
    return l.body === "ironbci" ? te(g, y, "IronBCI", "LiPo 200 mAh, JST 2.0 mm", M) : te(g, y, "Octopus 16", f === "EEG" ? "Pins over the visual cortex" : "Pins against the skin", M);
  }
  let m = { dev: u[0], mode: "EEG", gel: "dry", filter: "all", hover: null, focus: null, paused: false }, X = [], ne = null, he = { x: 402, y: 188, fx: 402, fy: 188, tx: 402, ty: 188 }, ye = { t0: 0, dur: 0, active: false }, H = null, Ee = null;
  function Se() {
    let l = j("#hw-lElectrodes"), f = j("#hw-lLeads");
    for (let g = 0; g < 34; g++) {
      let y = g < 32 ? "ch" : g === 32 ? "ref" : "bias", M = D("g", { class: "el", "data-i": g }, l);
      D("circle", { class: "gelc", r: 14, fill: "url(#hw-gel)" }, M), y === "ch" ? (D("circle", { class: "body", r: 7 }, M), D("circle", { class: "core", r: 3 }, M)) : (D("path", { class: "body", d: "M0,-8 L8,0 L0,8 L-8,0 Z" }, M), y === "bias" && D("circle", { class: "core", r: 2.4 }, M)), D("circle", { class: "hit", r: 11 }, M);
      let _ = D("path", { fill: "none", "stroke-width": 1.1 }, f), L = { i: g, kind: y, g: M, lead: _, x: 402, y: 188, fx: 402, fy: 188, tx: 402, ty: 188, o: 0, fo: 0, to: 0, label: "", delay: 0 };
      M.addEventListener("pointerenter", (fe) => Rn(L, fe)), M.addEventListener("pointerleave", () => Rn(null)), X.push(L);
    }
  }
  function it(l = true) {
    let f = m.dev, g = m.mode;
    e.dataset.signal = g, j("#hw-shirt").style.display = g === "ECG" ? "none" : "", j("#hw-sceneTitle").textContent = `${f.name}: ${g} electrode placement. ${g === "ECG" ? "Bare chest for ECG." : "Model wearing a T-shirt."}`, e.style.setProperty("--mode", a[g]);
    let y = ae(f, g);
    H = y;
    let M = a[g], _ = y.ch.length > 16;
    X.forEach((L, fe) => {
      let le;
      L.kind === "ch" ? le = y.ch[fe] : le = L.kind === "ref" ? y.ref : y.bias, L.fx = L.x, L.fy = L.y, L.fo = L.o, le ? (L.tx = le.x, L.ty = le.y, L.to = le.visible === false ? 0 : 1, L.label = le.label, L.active = true, L.visible = le.visible !== false) : (L.tx = y.collector.x, L.ty = y.collector.y, L.to = 0, L.active = false, L.visible = false), L.delay = l ? L.kind === "ch" ? fe * 14 : 60 : 0;
      let xe = m.gel === "wet", Ce = L.kind === "ch" ? _ ? 5.6 : 7.2 : 7, Te = L.g.querySelector(".body"), Ve = L.g.querySelector(".core"), Gn = L.g.querySelector(".gelc");
      Gn.setAttribute("r", xe ? Ce * 2 : 0), Gn.style.opacity = xe ? 1 : 0, L.kind === "ch" ? (Te.setAttribute("r", Ce), Te.setAttribute("fill", "#12151a"), Te.setAttribute("stroke", M), Te.setAttribute("stroke-width", 1.8), Ve.setAttribute("r", Ce * 0.42), Ve.setAttribute("fill", xe ? "#e8f4ff" : "#aeb6c0")) : (Te.setAttribute("fill", "#12151a"), Te.setAttribute("stroke", "#e8ebef"), Te.setAttribute("stroke-width", 1.6), Ve && Ve.setAttribute("fill", "#e8ebef")), L.g.setAttribute("pointer-events", L.to > 0 ? "all" : "none"), L.lead.setAttribute("stroke", L.kind === "ch" ? M : "#e8ebef"), L.R = Ce;
    }), he.fx = he.x, he.fy = he.y, he.tx = y.collector.x, he.ty = y.collector.y, ye = { t0: performance.now(), dur: l ? 760 : 0, active: true }, Z(f, g), Ls(y), yt(), Gs(), Rs(), Is(), Os(), Ns();
  }
  function yt() {
    let l = m.dev;
    if (yt.devId !== l.id) {
      Ee = Me(l), yt.devId = l.id;
      let f = j("#hw-lPeriph");
      f.innerHTML = `<g class="fade-in">${Ee.html}</g>`;
      let g = j("#hw-lBodyDev");
      if (g.innerHTML = "", ne = null, l.rig === "body-ble") {
        let y = D("g", {}, g);
        y.innerHTML = Tn(l) + '<g class="bcall" data-part="device"></g>';
        let M = ee[m.mode];
        ne = { g: y, x: M.x, y: M.y };
      }
      Et = [...se.querySelectorAll(".screen")].map((y) => {
        let M = [0, 1, 2].map(() => D("path", { fill: "none", "stroke-width": 1.3 }, y));
        return { x: +y.dataset.x, y: +y.dataset.y, w: +y.dataset.w, h: +y.dataset.h, paths: M };
      });
    }
    if (ne) {
      let f = ne.g.querySelector(".bcall");
      f.innerHTML = `<g class="fade-in" style="animation-delay:.5s">${E(l, m.mode)}</g>`;
    }
    if (j("#hw-lAir").innerHTML = "", st = Ee.air.map((f) => {
      let g = D("g", { "data-part": "link" }, j("#hw-lAir")), y = D("path", { fill: "none", stroke: s.data, "stroke-opacity": 0.22, "stroke-width": 1.4, "stroke-dasharray": "2 6" }, g), M = D("path", { class: "air", stroke: s.data, "stroke-width": 3 }, g), _ = D("g", {}, g);
      _.innerHTML = `<circle r="12" fill="#0b1422" stroke="${s.data}" stroke-opacity=".6"/>` + (f.kind === "ble" ? `<path d="M-3.5,-4.5 L3.5,2.5 L0,6 L0,-6 L3.5,-2.5 L-3.5,4.5" fill="none" stroke="${s.data}" stroke-width="1.6" stroke-linejoin="round"/>` : `<g fill="none" stroke="${s.data}" stroke-width="1.6" stroke-linecap="round"><path d="M-6,-1 Q0,-7 6,-1"/><path d="M-3.5,2 Q0,-1.5 3.5,2"/></g><circle cy="5" r="1.4" fill="${s.data}"/>`);
      let L = D("text", { class: "t-sub", "text-anchor": "middle", fill: s.data }, g);
      return L.style.fill = s.data, L.textContent = f.kind === "ble" ? m.dev.rig === "xr" ? "Bluetooth LE 5" : `Bluetooth LE, ${m.dev.rate} SPS` : "Wi-Fi", { a: f, base: y, flow: M, lab: _, t: L, showLabel: f === Ee.air[Ee.air.length - 1] };
    }), j("#hw-lBundle").innerHTML = "", We = null, Ee.port) {
      let f = D("g", { "data-part": "link" }, j("#hw-lBundle"));
      We = { base: D("path", { fill: "none", stroke: "#3a4049", "stroke-width": 5, "stroke-linecap": "round" }, f), flow: D("path", { class: "flow slow", stroke: a[m.mode], "stroke-width": 2.2, "stroke-linecap": "round" }, f) };
    }
    en();
  }
  let Et = [], st = [], We = null, Jo = (l) => l < 0.5 ? 4 * l * l * l : 1 - Math.pow(-2 * l + 2, 3) / 2;
  function _s(l) {
    if (!ye.active) return false;
    let f = true;
    for (let M of X) {
      let _ = ye.dur ? Math.min(1, Math.max(0, (l - ye.t0 - M.delay) / ye.dur)) : 1;
      _ < 1 && (f = false);
      let L = Jo(_);
      M.x = x(M.fx, M.tx, L), M.y = x(M.fy, M.ty, L), M.o = x(M.fo, M.to, L);
    }
    let g = ye.dur ? Math.min(1, (l - ye.t0) / ye.dur) : 1, y = Jo(g);
    return he.x = x(he.fx, he.tx, y), he.y = x(he.fy, he.ty, y), ne && (ne.x = he.x, ne.y = he.y), f && g >= 1 && (ye.active = false), true;
  }
  function Nt() {
    let l = H;
    for (let f of X) {
      let g = 0.35 + 0.65 * f.o, y = m.hover === f;
      f.g.setAttribute("transform", `translate(${f.x.toFixed(1)},${f.y.toFixed(1)}) scale(${(y ? 1.35 : g).toFixed(3)})`), f.g.style.opacity = f.o.toFixed(3);
      let M = f.o * l.leads;
      if (M > 0.01) {
        let _ = he.x, L = he.y, fe = (f.x + _) / 2, le = L < 250 ? Math.min(f.y, L) - 42 : Math.max(f.y, L) + 18;
        f.lead.setAttribute("d", `M${f.x.toFixed(1)},${f.y.toFixed(1)} Q${fe.toFixed(1)},${le.toFixed(1)} ${_.toFixed(1)},${L.toFixed(1)}`), f.lead.style.opacity = (M * (m.hover && !y ? 0.35 : 1)).toFixed(3);
      } else f.lead.style.opacity = 0;
    }
    if (ne && ne.g.setAttribute("transform", `translate(${ne.x.toFixed(1)},${ne.y.toFixed(1)})`), We) {
      let f = ue(he), g = Ee.port, y = `M${f.x.toFixed(1)},${f.y.toFixed(1)} C${(f.x + 110).toFixed(1)},${(f.y + 20).toFixed(1)} ${g.x - 70},${g.y - 60} ${g.x},${g.y}`;
      We.base.setAttribute("d", y), We.flow.setAttribute("d", y);
    }
    for (let f of st) {
      let g = Ee.airFrom === "body" ? ue({ x: he.x + (m.dev.body === "ironbci" ? -13 : 0), y: he.y - 8 }) : m.dev.rig === "xr" ? ue(Ee.airFrom) : Ee.airFrom, y = f.a.to, M = (g.x + y.x) / 2, _ = Math.min(g.y, y.y, 330) - 90, L = `M${g.x.toFixed(1)},${g.y.toFixed(1)} Q${M.toFixed(1)},${_.toFixed(1)} ${y.x},${y.y}`;
      f.base.setAttribute("d", L), f.flow.setAttribute("d", L);
      let fe = (g.x + 2 * M + y.x) / 4, le = (g.y + 2 * _ + y.y) / 4;
      f.lab.setAttribute("transform", `translate(${fe.toFixed(1)},${le.toFixed(1)})`), f.t.setAttribute("x", fe.toFixed(1)), f.t.setAttribute("y", (le - 20).toFixed(1)), f.t.style.display = f.showLabel ? "" : "none";
    }
  }
  function Ls(l) {
    let f = j("#hw-lMap"), g = 124, y = 126, M = 80, _ = "";
    if (l.mapShown) _ += `<g class="fade-in" data-part="electrodes">
      <circle cx="${g}" cy="${y}" r="${M + 8}" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.14)"/>
      <path d="M${g - 9},${y - M - 7} L${g},${y - M - 19} L${g + 9},${y - M - 7}" fill="none" stroke="rgba(255,255,255,.2)"/>
      <path d="M${g - M - 8},${y - 12} q-9,12 0,24 M${g + M + 8},${y - 12} q9,12 0,24" fill="none" stroke="rgba(255,255,255,.2)"/>
      <circle cx="${g}" cy="${y}" r="${M / 2}" fill="none" stroke="rgba(255,255,255,.05)"/>
      <path d="M${g - M - 8},${y} H${g + M + 8} M${g},${y - M - 8} V${y + M + 8}" stroke="rgba(255,255,255,.05)"/>`, l.ch.forEach((L, fe) => {
      let le = g + L.topo[0] * M, xe = y - L.topo[1] * M;
      _ += `<g class="mapdot" data-i="${fe}"><circle cx="${le}" cy="${xe}" r="${L.visible ? 4.2 : 3.6}" fill="${L.visible ? "var(--mode)" : "#12151a"}" stroke="var(--mode)" stroke-width="1.4"/><text x="${le}" y="${xe + (l.ch.length > 16 ? 11 : 13)}" text-anchor="middle" class="t-dim" style="font-size:${l.ch.length > 16 ? 8 : 9.5}px;fill:#8e96a0">${L.label}</text></g>`;
    }), _ += `<path d="M${g - M - 26},${y} l6,-6 l6,6 l-6,6 Z" fill="#12151a" stroke="#e8ebef" stroke-width="1.2"/>
        <path d="M${g + M + 14},${y} l6,-6 l6,6 l-6,6 Z" fill="#12151a" stroke="#e8ebef" stroke-width="1.2"/><circle cx="${g + M + 20}" cy="${y}" r="1.8" fill="#e8ebef"/>
        <text x="${g}" y="${y + M + 32}" text-anchor="middle" class="t-dim">Top view, nose up, left on left</text></g>`, _ += pe(26, y + M + 62, ie(l.note, 27), "t-sub", 17);
    else {
      let L = m.dev.rig === "xr" ? m.mode === "EMG" ? "Facial EMG" : "Frontal EEG" : { EMG: "Forearm EMG", ECG: "Chest ECG", EOG: "Eye movement" }[m.mode];
      _ += `<g class="fade-in"><text x="26" y="64" class="t-main" style="font-size:18px">${L}</text>
      ${pe(26, 92, ie(l.note, 28), "t-sub", 18)}</g>`;
    }
    f.innerHTML = _, f.querySelectorAll(".mapdot").forEach((L) => {
      let fe = X[+L.dataset.i];
      L.addEventListener("pointerenter", (le) => Rn(fe, le, L)), L.addEventListener("pointerleave", () => Rn(null)), L.style.cursor = "pointer";
    });
  }
  let Qt = j("#hw-tip");
  function Rn(l, f, g) {
    if (m.hover = l, l) {
      let y = l.kind === "ch", M = y ? l.i + 1 : null;
      Qt.innerHTML = y ? `<b>${l.label}</b> <span>channel ${M}${l.visible ? "" : ", back of head"}</span>` : `<b>${l.kind === "ref" ? "Reference" : "Bias"}</b> <span>${l.label.split(", ")[1] || ""}</span>`;
      let _ = j(".stage").getBoundingClientRect(), L = (g || l.g).getBoundingClientRect();
      Qt.style.left = L.left + L.width / 2 - _.left + "px", Qt.style.top = L.top - _.top + "px", Qt.classList.add("show");
    } else Qt.classList.remove("show");
    e.querySelectorAll(".mapdot").forEach((y) => y.style.opacity = l ? +y.dataset.i === l.i && l.kind === "ch" ? 1 : 0.35 : 1), Nt();
  }
  function en() {
    let l = m.focus;
    se.classList.toggle("focusing", !!l), se.querySelectorAll("[data-part]").forEach((f) => f.classList.toggle("on", !!l && f.getAttribute("data-part").split(" ").includes(l))), e.querySelectorAll(".row").forEach((f) => f.classList.toggle("on", f.dataset.part === l));
  }
  se.addEventListener("pointerover", (l) => {
    let f = l.target.closest("[data-part]");
    if (!f || f.closest("#lElectrodes") || f.closest("#lMap")) return;
    let g = f.getAttribute("data-part").split(" ")[0];
    g !== "desk" && m.focus !== g && (m.focus = g, en());
  }), se.addEventListener("pointerleave", () => {
    m.focus = null, en();
  });
  function Ts() {
    let l = j("#hw-rail");
    l.innerHTML = "", u.forEach((f) => {
      let g = document.createElement("button");
      g.className = "dev", g.dataset.id = f.id, g.innerHTML = `<b>${f.name}</b><span>${f.meta}</span>`, g.addEventListener("click", () => Or(f.id)), l.appendChild(g);
    }), Ir();
  }
  function Ir() {
    e.querySelectorAll(".dev").forEach((l) => {
      let f = u.find((g) => g.id === l.dataset.id);
      l.setAttribute("aria-pressed", f === m.dev), l.hidden = !(m.filter === "all" || f.filters.includes(m.filter)) && f !== m.dev;
    });
  }
  e.querySelectorAll(".filters button").forEach((l) => l.addEventListener("click", () => {
    m.filter = l.dataset.filter, e.querySelectorAll(".filters button").forEach((g) => g.setAttribute("aria-pressed", g === l));
    let f = u.filter((g) => m.filter === "all" || g.filters.includes(m.filter));
    !f.includes(m.dev) && f[0] ? Or(f[0].id) : Ir();
  }));
  function Rs() {
    let l = j("#hw-modes");
    l.innerHTML = "", ["EEG", "EMG", "ECG", "EOG"].forEach((f) => {
      let g = m.dev.modes.includes(f), y = document.createElement("button");
      y.style.setProperty("--c", a[f]), y.innerHTML = `<i></i>${f}`, y.setAttribute("aria-pressed", m.mode === f), g ? (y.title = `Measure ${i[f]} signals`, y.addEventListener("click", () => {
        m.mode !== f && (m.mode = f, it());
      })) : (y.setAttribute("aria-disabled", "true"), y.title = `${f} is not listed in the ${m.dev.name} spec`), l.appendChild(y);
    });
  }
  function Is() {
    let l = j("#hw-gelWrap");
    if (m.dev.electrodes.length === 1) {
      let g = m.dev.id === "octopus-16" ? "Dry pogo pins" : m.dev.rig === "xr" ? "Flat dry Ag/AgCl pads" : "Wet Ag/AgCl with gel";
      l.innerHTML = `<span class="seg-label">Electrodes</span><span class="lock">${g}</span>`;
      return;
    }
    l.innerHTML = `<span class="seg-label">Electrodes</span><div class="seg" role="group" aria-label="Electrode type">
    <button data-g="dry" aria-pressed="${m.gel === "dry"}" style="--c:#aeb6c0"><i></i>Dry</button>
    <button data-g="wet" aria-pressed="${m.gel === "wet"}" style="--c:#8fd3ff"><i></i>Wet with gel</button></div>`, l.querySelectorAll("button").forEach((g) => g.addEventListener("click", () => {
      m.gel = g.dataset.g, it(false);
    }));
  }
  function Os() {
    let l = m.dev, f = H, g = [];
    (f.leads > 0 || Ee.port) && g.push([a[m.mode], "Electrode leads"]), (Ee.air.length || l.rig === "usb-box") && g.push([s.data, l.rig === "usb-box" ? "USB data" : "Wireless data"]), g.push([s.power, "Power"]), j("#hw-legend").innerHTML = g.map(([y, M]) => `<span><i style="background:${y}"></i>${M}</span>`).join("") + '<span class="hint" style="margin-left:auto;color:var(--dim)">Hover a part or a spec row to trace it</span>';
  }
  function Gs() {
    let l = m.dev, f = l.spec, g = l.electrodes.length === 2 ? m.gel === "wet" ? "Wet Ag/AgCl with conductive gel. Dry electrodes fit the same 2.54 mm headers." : "Dry, no gel needed. Wet Ag/AgCl fits the same 2.54 mm headers." : l.id === "octopus-16" ? "Spring-loaded pogo pins, dry" : l.rig === "xr" ? "10 flat dry Ag/AgCl pads in a silicone mask" : "Wet Ag/AgCl with conductive gel, 2.54 mm headers", y = [["electrodes", "Signals", l.modes.join(", ")], ["electrodes", "Channels", `${l.ch}, plus reference and bias`], ["electrodes", "Electrodes", g], ["device", "Board", f.board], ["host", "Host", f.host], ["link", "Data link", f.link], f.rate ? ["link", "Sample rate", f.rate] : null, ["power", "Power", f.power]].filter(Boolean), M = { electrodes: a[m.mode], device: s.neutral, host: "#8b93a1", link: s.data, power: s.power };
    j("#hw-spec").innerHTML = `
    ${l.badge ? `<span class="badge">${l.badge}</span>` : ""}
    <h2>${l.name}</h2>
    <p class="tagline">${l.tagline}</p>
    <p class="summary">${l.summary}</p>
    <dl class="rows">${y.map(([_, L, fe]) => `<div class="row" tabindex="0" data-part="${_}" style="--pc:${M[_]}"><dt>${L}</dt><dd>${fe}</dd></div>`).join("")}</dl>
    <div class="need"><h3>What you need</h3><ul>${l.need.map((_) => `<li>${_}</li>`).join("")}</ul></div>
    <div class="safety"><h3>Safety</h3><p>${l.safety}</p></div>
    <a class="docs" href="${o[l.id] || "/hardware"}">View ${l.name}</a>`, e.querySelectorAll(".row").forEach((_) => {
      let L = () => {
        m.focus = _.dataset.part, en();
      }, fe = () => {
        m.focus = null, en();
      };
      _.addEventListener("pointerenter", L), _.addEventListener("pointerleave", fe), _.addEventListener("focus", L), _.addEventListener("blur", fe);
    });
  }
  function Or(l, f = true) {
    let g = u.find((y) => y.id === l);
    g && (m.dev = g, g.modes.includes(m.mode) || (m.mode = g.modes[0]), g.electrodes.includes(m.gel) || (m.gel = g.electrodes[0]), Ir(), it(f));
  }
  function Ft(l) {
    let f = Math.sin(l * 127.1) * 43758.5453;
    return (f - Math.floor(f)) * 2 - 1;
  }
  let Mt = (l, f, g) => {
    let y = (l - f) / g;
    return Math.exp(-y * y);
  }, wt = [];
  function Ns() {
    let l = H, f = m.dev, g = m.mode;
    wt = l.ch.map((M, _) => {
      let L = f.id.length * 97 + g.charCodeAt(0) * 13 + _ * 19 >>> 0, fe = M.topo ? M.topo[1] : 0;
      return { label: M.label, i: _, p0: L * 0.017, p1: L * 0.031, alphaW: M.topo ? Math.max(0.15, 0.4 - fe * 0.55) : 0.3, blinkW: M.topo ? Math.max(0, (fe - 0.55) * 2.4) : f.rig === "xr" && _ < 4 ? 0.9 : 0, lag: _ % 5 * 0.11, gain: 0.7 + _ % 4 * 0.1, group: f.rig === "xr" ? _ < 4 ? 0 : _ < 6 ? 1 : 2 : _ % 3 };
    });
    let y = wt.length;
    j("#hw-sigNote").textContent = `${y} channel${y > 1 ? "s" : ""}, ${i[g]} signal, ${f.rate} SPS on the real device, 4 s window`, In();
  }
  function Fs(l, f) {
    let g = Math.sin(51.5206 * l + f.p0) * 0.35 + Math.sin(77.90920000000001 * l + f.p1) * 0.22 + Math.sin(25.7603 * l + f.i) * 0.18, y = 0.55 + 0.45 * Math.sin(6.283 * 0.18 * l + f.p0), M = f.alphaW * y * Math.sin(6.283 * 10.2 * l + f.p1), _ = l % 4.3 - 1.2, L = f.blinkW * (Mt(_, 0, 0.1) * 1.6);
    return g + M * 1.4 + L;
  }
  function Bs(l, f) {
    let y = (l + f.lag * (f.group + 1) * 0.4) % 2.6, M = Math.min(1, Math.max(0, (y - 0.5) / 0.12)) * Math.min(1, Math.max(0, (1.5 - y) / 0.18));
    return (Ft(Math.floor(l * 700) + f.i * 7919) * 0.7 + Ft(Math.floor(l * 700) * 3 + f.i) * 0.3) * (0.08 + M * f.gain * 1.05);
  }
  function qs(l, f) {
    let y = (l + 0.1) * 1.18 % 1, M = [0.72, 1, 1.25][f.i] || 1, _ = [0.28, 0.34, 0.45][f.i] || 0.3;
    return ((0.12 * Mt(y, 0.16, 0.028) - 0.12 * Mt(y, 0.27, 9e-3) + 1 * Mt(y, 0.29, 0.011) - 0.28 * Mt(y, 0.312, 0.011) + _ * Mt(y, 0.53, 0.05)) * M - 0.12) * 1.5 + 0.05 * Math.sin(6.283 * 0.23 * l) + Ft(Math.floor(l * 500) + f.i) * 0.02;
  }
  function zs(l) {
    let f = Math.floor(l / 1.25), g = l / 1.25 - f, y = [-1, -0.35, 0.4, 1], M = y[Math.floor((Ft(f) + 1) * 2) % 4], _ = y[Math.floor((Ft(f + 1) + 1) * 2) % 4];
    return g < 0.9 ? M : x(M, _, Math.min(1, (g - 0.9) / 0.06));
  }
  function Ds(l, f) {
    let g = zs(l) * 0.8, y = l % 3.1 - 2.2, M = Mt(y, 0, 0.09) * 1.5, _ = Ft(Math.floor(l * 300) + f.i * 31) * 0.03;
    return [g, -g, M + g * 0.08, -M * 0.55 + g * 0.05][f.i] + _;
  }
  function Qo(l, f) {
    let g = m.mode;
    return g === "EEG" ? Fs(l, f) * 0.55 : g === "EMG" ? Bs(l, f) : g === "ECG" ? qs(l, f) * 0.8 : Ds(l, f) * 0.8;
  }
  let ct = j("#hw-traces"), $e = ct.getContext("2d"), Bt = 0, tn = 0, nn = 1, qt = 30;
  function In() {
    let l = Math.max(1, wt.length);
    qt = l > 24 ? 15 : l > 12 ? 21 : l > 6 ? 30 : 50, nn = Math.min(2, window.devicePixelRatio || 1), Bt = Math.max(320, ct.clientWidth || ct.parentElement?.clientWidth || 640), tn = Math.max(120, l * qt + 16), ct.width = Bt * nn, ct.height = tn * nn, ct.style.height = tn + "px", $e.setTransform(nn, 0, 0, nn, 0, 0);
  }
  window.addEventListener("resize", In);
  let On = 0, Gr = 0;
  function Hs() {
    Bt || In();
    let l = wt.length, f = a[m.mode], g = Bt < 520 ? 84 : 118, y = Math.max(40, Bt - g - 10), M = 4;
    $e.clearRect(0, 0, Bt, tn);
    let _ = m.hover && m.hover.kind === "ch" ? m.hover.i : -1, L = qt * 0.42;
    $e.font = `${l > 24 ? 10.5 : 12.5}px -apple-system, BlinkMacSystemFont, sans-serif`, $e.textBaseline = "middle", $e.strokeStyle = "rgba(255,255,255,.06)", $e.lineWidth = 1;
    for (let le = 0; le <= M; le++) {
      let xe = g + y * le / M;
      $e.beginPath(), $e.moveTo(xe, 6), $e.lineTo(xe, tn - 6), $e.stroke();
    }
    let fe = Math.min(360, Math.max(80, Math.floor(y)));
    for (let le = 0; le < l; le++) {
      let xe = wt[le], Ce = 8 + qt * le + qt / 2, Te = _ >= 0 && _ !== le;
      $e.fillStyle = _ === le ? "#f4f4f5" : Te ? "#52525b" : "#a1a1aa", $e.fillText(xe.label.length > 15 ? xe.label.slice(0, 14) + "\u2026" : xe.label, 10, Ce), $e.strokeStyle = f, $e.globalAlpha = Te ? 0.22 : _ === le ? 1 : 0.85, $e.lineWidth = _ === le ? 1.8 : l > 24 ? 1 : 1.3, $e.beginPath();
      for (let Ve = 0; Ve <= fe; Ve++) {
        let Gn = On - M + M * Ve / fe, Br = Qo(Gn, xe);
        Br = Math.max(-1.6, Math.min(1.6, Br));
        let ra = g + y * Ve / fe, oa = Ce - Br * L;
        Ve ? $e.lineTo(ra, oa) : $e.moveTo(ra, oa);
      }
      $e.stroke(), $e.globalAlpha = 1;
    }
  }
  function Ws() {
    let l = a[m.mode];
    for (let f of Et) f.paths.forEach((g, y) => {
      let M = wt[y % Math.max(1, wt.length)];
      if (!M) return;
      let _ = f.paths.length, L = f.y + f.h * (y + 0.5) / _, fe = f.h / _ * 0.4, le = "", xe = 40;
      for (let Ce = 0; Ce <= xe; Ce++) {
        let Te = On - 2 + 2 * Ce / xe, Ve = Math.max(-1.5, Math.min(1.5, Qo(Te, M)));
        le += (Ce ? "L" : "M") + (f.x + f.w * Ce / xe).toFixed(1) + "," + (L - Ve * fe).toFixed(1);
      }
      g.setAttribute("d", le), g.setAttribute("stroke", l), g.setAttribute("stroke-opacity", 0.9);
    });
  }
  ct.addEventListener("pointermove", (l) => {
    let f = ct.getBoundingClientRect(), g = Math.floor((l.clientY - f.top - 8) / qt), y = g >= 0 && g < wt.length ? X[g] : null;
    y !== m.hover && (m.hover = y, e.querySelectorAll(".mapdot").forEach((M) => M.style.opacity = y ? +M.dataset.i === y.i ? 1 : 0.35 : 1), Nt());
  }), ct.addEventListener("pointerleave", () => {
    m.hover = null, e.querySelectorAll(".mapdot").forEach((l) => l.style.opacity = 1), Nt();
  });
  let Nr = j("#hw-pause");
  Nr.textContent = "Pause", Nr.addEventListener("click", () => {
    m.paused = !m.paused, Nr.textContent = m.paused ? "Resume" : "Pause";
  });
  function Vs() {
    e.querySelectorAll(".flow, .air").forEach((l) => {
      let f = l.classList.contains("slow") ? 2 : l.classList.contains("air") ? 1.4 : 1.15;
      l.style.strokeDashoffset = (-(On * 32 / f % 32)).toFixed(2);
    });
  }
  function Us(l) {
    let f = Math.min(0.05, (l - (Gr || l)) / 1e3);
    Gr = l, m.paused || (On += f), Vs(), _s(l), W(f), Nt(), Hs(), Ws();
  }
  kt(), Se(), Ts(), Or("pieeg", false);
  let bt = document.createElement("button");
  bt.type = "button", bt.id = "hw-motion", bt.className = "ghost";
  function Fr() {
    bt.textContent = b ? "Motion on" : "Motion off", bt.setAttribute("aria-pressed", String(b)), bt.setAttribute("aria-label", b ? "Pause body movement and blinking" : "Play body movement and blinking");
  }
  bt.addEventListener("click", () => {
    b = !b, Fr(), W(0), Nt();
  }), j(".stage-bar").appendChild(bt), Fr();
  let ea = () => {
    b = !v.matches, Fr(), W(0), Nt();
  };
  /* motion starts on for everyone; visitors can stop it with the Motion button */
  function ta(l) {
    n || (r && Us(l), t = requestAnimationFrame(ta));
  }
  t = requestAnimationFrame(ta);
  let na = new IntersectionObserver((l) => {
    r = l.some((f) => f.isIntersecting), Gr = 0;
  }, { threshold: 0.08, rootMargin: "80px" });
  return na.observe(e), () => {
    n = true, cancelAnimationFrame(t), t = 0, na.disconnect(), window.removeEventListener("resize", In), v.removeEventListener("change", ea);
  };
}
export {
  mountHardwareBench
};
