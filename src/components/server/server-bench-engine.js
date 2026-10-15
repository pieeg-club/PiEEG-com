/* Interactive pieeg-server architecture bench - follows the home-bench instrument design. */

/**
 * @param {HTMLElement | null} root
 * @returns {() => void}
 */
export function mountServerBench(root) {
  if (!root) return () => {};
  let raf = 0;
  let stopped = false;
  let visible = true;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const FAMILY = {
    acquire: "#22d3ee",
    stream: "#38bdf8",
    dash: "#a78bfa",
    dsp: "#34d399",
    outlet: "#f59e0b",
    sdk: "#c58bff",
  };

  const LK = {
    wire: { c: "#7fb2ff", name: "In-process / ring" },
    spi: { c: "#45dd8b", name: "SPI / GPIO" },
    air: { c: "#b690ff", name: "Bluetooth LE" },
    usb: { c: "#38bdf8", name: "USB serial" },
    net: { c: "#45dd8b", name: "WebSocket / HTTP" },
    osc: { c: "#ffae42", name: "LSL / OSC / HTTP" },
  };

  const PARTS = [
    {
      id: "acquire",
      name: "Acquisition Loop",
      meta: "SPI · BLE · USB · mock",
      badge: "Hardware Intake",
      fam: "acquire",
      tagline: "One process, four transports, identical sample clock",
      filters: ["acquire"],
      summary:
        "pieeg-server owns the ADC clock. PiEEG-8/16 and JNEEG read ADS1299 over SPI. IronBCI-8 arrives over Bluetooth LE. IronBCI-32 arrives over USB serial at 921,600 baud. --mock synthesizes alpha, drift, noise, and blink artifacts on the same path so clients never branch on 'no board'.",
      caption:
        "SPI / BLE / USB / Mock → AcquisitionLoop (250-500 Hz) → shared sample ring",
      scene: {
        nodes: [
          { id: "spi", c: 1, t: "PiEEG / JNEEG", s: "ADS1299 over SPI", ic: "chip", part: "source" },
          { id: "ble", c: 1, t: "IronBCI-8", s: "Bluetooth LE", ic: "plug", part: "source" },
          { id: "usb", c: 1, t: "IronBCI-32", s: "USB 921,600 baud", ic: "server", part: "source" },
          { id: "mock", c: 1, t: "--mock", s: "synthetic EEG", ic: "wave", part: "source" },
          { id: "loop", c: 2, t: "AcquisitionLoop", s: "250-500 Hz float32", ic: "server", part: "runtime", core: true },
          { id: "ring", c: 3, t: "Sample Ring", s: "µV, t, n", ic: "disk", part: "runtime" },
          { id: "ws", c: 4, t: "WebSocket :1616", s: "JSON per sample", ic: "net", part: "out", go: "websocket" },
        ],
        links: [
          ["spi", "loop", "SPI", "spi"],
          ["ble", "loop", "BLE", "air"],
          ["usb", "loop", "serial", "usb"],
          ["mock", "loop", "synth", "wire"],
          ["loop", "ring", "µV", "wire"],
          ["ring", "ws", "frame", "net"],
        ],
      },
      rows: [
        ["source", "Default device", "<code>pieeg16</code> (16-ch SPI). Also <code>pieeg8</code>, <code>jneeg</code>, <code>ironbci8</code>, <code>ironbci32</code>"],
        ["source", "Profiles", "<code>--profile auto|pi4|pi5|jetson-nano</code> from <code>/proc/device-tree</code>; GPIO chip default <code>/dev/gpiochip4</code>"],
        ["runtime", "Sample rate", "250 Hz on SPI shields; IronBCI-32 firmware-fixed ~500 SPS"],
        ["runtime", "Doctor", "<code>pieeg-server doctor</code> checks SPI, BLE, serial, and config before you debug the client"],
        ["out", "Same path", "Mock frames use the same <code>{t, n, channels}</code> contract as hardware"],
      ],
      gets: [
        "Auto-detects board profile on Raspberry Pi and Jetson",
        "Direct BLE connect via --ble-address skips the scan",
        "install.sh enables SPI, installs the package, and can register a systemd unit",
      ],
      note: {
        h: "One loop, many boards",
        p: "Clients should not special-case mock vs hardware. If a frame arrives, it is a sample. Device selection is a server flag, not a protocol change.",
      },
      panel: {
        mode: "console",
        title: "Acquisition startup",
        note: "Simulated pieeg-server boot and first samples",
        gen: "acquire",
      },
      links: [
        { t: "CLI Reference", h: "https://github.com/pieeg-club/PiEEG-server#cli-reference", ext: true, primary: true },
        { t: "Install on Pi", h: "#install-cli" },
      ],
    },
    {
      id: "websocket",
      name: "WebSocket API",
      meta: "JSON · :1616",
      badge: "Wire Contract",
      fam: "stream",
      tagline: "Plain JSON. No SDK required on the wire.",
      filters: ["stream"],
      summary:
        "Every sample is one JSON object: Unix time t, monotonic sample index n, and channels as microvolts. Any language with a WebSocket client can subscribe. The same socket accepts command objects for filter, record, registers, LSL, OSC, and webhooks.",
      caption:
        "Sample ring → JSON frame {t, n, channels} → ws://host:1616 → any client",
      scene: {
        nodes: [
          { id: "ring", c: 1, t: "Sample Ring", s: "float32 µV", ic: "disk", part: "source", go: "acquire" },
          { id: "enc", c: 2, t: "JSON Encoder", s: "one object / sample", ic: "code", part: "runtime", core: true },
          { id: "cmd", c: 2, t: "Command Bus", s: "client → server", ic: "plug", part: "runtime" },
          { id: "port", c: 3, t: ":1616", s: "ws / wss", ic: "net", part: "runtime" },
          { id: "py", c: 4, t: "Python client", s: "websockets + json", ic: "code", part: "out" },
          { id: "js", c: 4, t: "Browser client", s: "WebSocket API", ic: "browser", part: "out", go: "dashboard" },
          { id: "any", c: 4, t: "Any language", s: "no binary protocol", ic: "globe", part: "out" },
        ],
        links: [
          ["ring", "enc", "µV", "wire"],
          ["enc", "port", "JSON", "net"],
          ["cmd", "port", "cmd", "net"],
          ["port", "py", "ws", "net"],
          ["port", "js", "ws", "net"],
          ["port", "any", "ws", "net"],
        ],
      },
      rows: [
        ["source", "Frame", "<code>{\"t\": 1711234567.123, \"n\": 42, \"channels\": [12.34, -5.67, …]}</code>"],
        ["runtime", "Bind", "<code>--host 0.0.0.0 --port 1616</code> (default). Dashboard is a separate HTTP port."],
        ["runtime", "Commands", "<code>set_filter</code>, <code>start_record</code> / <code>stop_record</code>, <code>reg_read</code> / <code>reg_write</code>, <code>lsl_*</code>, <code>osc_*</code>, webhook rules"],
        ["out", "Auth", "Optional <code>--auth</code>: 6-digit code, rate limit, HMAC timing-safe verify, HttpOnly cookie"],
      ],
      gets: [
        "No protobuf, no custom framing: JSON text frames",
        "Commands and samples share one socket",
        "LAN and mDNS URLs printed at startup (hostname.local:1616)",
      ],
      note: {
        h: "Protocol is the SDK",
        p: "If you can parse JSON and hold a WebSocket, you already have a client. pieeg.js is convenience, not a requirement.",
      },
      panel: {
        mode: "console",
        title: "Live WebSocket frames",
        note: "Simulated JSON samples on :1616",
        gen: "websocket",
      },
      links: [
        { t: "WebSocket API", h: "https://github.com/pieeg-club/PiEEG-server#websocket-api", ext: true, primary: true },
        { t: "Frame examples", h: "#ws-contract" },
      ],
    },
    {
      id: "dashboard",
      name: "React Dashboard",
      meta: "HTTP :1617",
      badge: "Local UI",
      fam: "dash",
      tagline: "Prebuilt Vite UI shipped inside the pip package",
      filters: ["dashboard"],
      summary:
        "The dashboard is the same React 19 + Vite 6 surface as PiEEG Cloud, served from the Python process. Pip users do not need Node: the production build is committed to pieeg_server/static/dashboard/. Incoming packets write Float32Array rings; canvases read those refs at 60 fps.",
      caption:
        "WS :1616 → Float32Array rings → 60 fps canvases, Worker FFT, spectrogram, register panel",
      scene: {
        nodes: [
          { id: "ws", c: 1, t: "WebSocket", s: ":1616 JSON", ic: "net", part: "source", go: "websocket" },
          { id: "http", c: 1, t: "HTTP :1617", s: "static + /auth", ic: "browser", part: "source" },
          { id: "ring", c: 2, t: "useRef Rings", s: "zero GC per sample", ic: "disk", part: "runtime", core: true },
          { id: "fft", c: 3, t: "FFT Worker", s: "256-pt Cooley-Tukey", ic: "wave", part: "runtime" },
          { id: "ui", c: 4, t: "Wave / Gram / State", s: "60 fps canvases", ic: "browser", part: "out" },
          { id: "reg", c: 4, t: "ADS1299 Panel", s: "reg_read / noise_test", ic: "chip", part: "out", go: "dsp" },
        ],
        links: [
          ["ws", "ring", "frames", "net"],
          ["http", "ui", "HTML", "net"],
          ["ring", "fft", "12th frame", "wire"],
          ["ring", "ui", "refs", "wire"],
          ["fft", "ui", "bands", "wire"],
          ["ui", "reg", "cmd", "wire"],
        ],
      },
      rows: [
        ["source", "Disable", "<code>--no-dashboard</code> if you only want the WebSocket"],
        ["runtime", "Ingestion", "Pre-allocated Float32Array per channel; React header stats throttled"],
        ["runtime", "Build", "<code>cd dashboard && npm run build</code> writes into <code>pieeg_server/static/dashboard/</code>"],
        ["out", "Shortcuts", "Space pause, R record, F FFT, G spectrogram, W webhooks, N registers, P perf"],
      ],
      gets: [
        "Same UI as cloud.pieeg.com when pointed at a local :1616 socket",
        "Experiences gallery (P300, Avatar Foundation, OSC, webhook wizard) ships with the dashboard",
        "Optional 6-digit --auth gate before the UI mounts",
      ],
      note: {
        h: "Node is optional at runtime",
        p: "The pip wheel already contains the built dashboard. Node is only needed if you are editing dashboard/src.",
      },
      panel: {
        mode: "bands",
        title: "Dashboard spectral readout",
        note: "Simulated band powers as the local UI would plot them",
      },
      links: [
        { t: "Open Cloud Demo UI", h: "https://cloud.pieeg.com/", ext: true, primary: true },
        { t: "Dashboard README", h: "https://github.com/pieeg-club/PiEEG-server/tree/main/dashboard", ext: true },
      ],
    },
    {
      id: "dsp",
      name: "Filter, Record, Registers",
      meta: "IIR · CSV · ADS1299",
      badge: "Signal Path",
      fam: "dsp",
      tagline: "Optional server-side DSP, CSV with annotations, live register I/O",
      filters: ["acquire", "stream"],
      summary:
        "Bandpass is off until you pass --filter or send set_filter. Notch rejects 50/60 Hz with per-channel IIR state. Recording writes timestamped CSV plus a sidecar .annotations.json. Register commands talk to the ADS1299: read, write, presets, and a 3-second internal-short noise test.",
      caption:
        "Raw samples → optional Butterworth / notch → CSV recorder and ADS1299 register bus",
      scene: {
        nodes: [
          { id: "raw", c: 1, t: "Raw Samples", s: "ADC µV", ic: "wave", part: "source", go: "acquire" },
          { id: "iir", c: 2, t: "Bandpass IIR", s: "1-40 Hz SOS", ic: "wave", part: "runtime", core: true },
          { id: "notch", c: 2, t: "Notch 50/60", s: "per-channel state", ic: "wave", part: "runtime" },
          { id: "csv", c: 3, t: "CSV Recorder", s: "start_record / stop", ic: "disk", part: "out" },
          { id: "ann", c: 3, t: "Annotations", s: ".annotations.json", ic: "code", part: "out" },
          { id: "ads", c: 4, t: "ADS1299", s: "reg_read / noise_test", ic: "chip", part: "out" },
        ],
        links: [
          ["raw", "iir", "µV", "wire"],
          ["iir", "notch", "SOS", "wire"],
          ["notch", "csv", "rows", "wire"],
          ["csv", "ann", "sidecar", "wire"],
          ["raw", "ads", "SPI", "spi"],
        ],
      },
      rows: [
        ["runtime", "Filter flags", "<code>--filter --lowcut 1.0 --highcut 40.0</code>; live <code>{\"cmd\":\"set_filter\",\"enabled\":true,\"lowcut\":1.0,\"highcut\":40.0}</code>"],
        ["runtime", "Rust path", "Optional pieeg-core wheel for the bandpass (same coefficients, faster inner loop)"],
        ["out", "Record", "<code>--record FILE</code> and optional <code>--record-duration SEC</code>; also start/stop over WebSocket"],
        ["out", "Presets", "<code>normal</code>, <code>internal_short</code>, <code>test_signal</code>, <code>temp_sensor</code>"],
      ],
      gets: [
        "Noise test returns RMS per channel plus a pass/fail verdict",
        "Terminal monitor (--monitor) draws per-channel sparklines over SSH",
        "Filter state is per-channel so enable/disable does not glitch the whole montage",
      ],
      note: {
        h: "Filter is opt-in",
        p: "Default streaming is raw ADC microvolts. Turn the bandpass on from the CLI or a WebSocket command when you want it.",
      },
      panel: {
        mode: "console",
        title: "Filter / record / register traffic",
        note: "Simulated command responses",
        gen: "dsp",
      },
      links: [
        { t: "Register commands", h: "https://github.com/pieeg-club/PiEEG-server#ads1299-register-configuration", ext: true, primary: true },
      ],
    },
    {
      id: "outlets",
      name: "LSL, OSC, Webhooks",
      meta: "Lab · VRChat · HTTP",
      badge: "Outlets",
      fam: "outlet",
      tagline: "The same samples, three outbound protocols",
      filters: ["integrate"],
      summary:
        "LSL pushes raw samples onto the local network for OpenViBE, MNE-LSL, BCI2000, NeuroPype, and LabRecorder. OSC sends band powers to 127.0.0.1:9000 for VRChat chatbox and avatar parameters, including per-region groups. Webhooks fire HTTP callbacks when a band, ratio, or amplitude rule matches.",
      caption:
        "Sample ring → LSL outlet · OSC UDP :9000 · HTTP webhook rules",
      scene: {
        nodes: [
          { id: "ring", c: 1, t: "Sample Ring", s: "shared loop", ic: "disk", part: "source", go: "acquire" },
          { id: "fft", c: 2, t: "Band Powers", s: "for OSC / rules", ic: "wave", part: "runtime" },
          { id: "lsl", c: 3, t: "LSL Outlet", s: "pylsl, --lsl", ic: "net", part: "out" },
          { id: "osc", c: 3, t: "VRChat OSC", s: "UDP :9000", ic: "game", part: "out" },
          { id: "hook", c: 3, t: "Webhooks", s: "HTTP callbacks", ic: "globe", part: "out" },
          { id: "lab", c: 4, t: "LabRecorder / MNE", s: "discover on LAN", ic: "server", part: "out" },
          { id: "vrc", c: 4, t: "Avatar params", s: "/avatar/parameters/*", ic: "game", part: "out" },
        ],
        links: [
          ["ring", "lsl", "raw", "osc"],
          ["ring", "fft", "window", "wire"],
          ["fft", "osc", "bands", "osc"],
          ["fft", "hook", "rule", "osc"],
          ["lsl", "lab", "LSL", "osc"],
          ["osc", "vrc", "UDP", "osc"],
        ],
      },
      rows: [
        ["runtime", "LSL", "<code>pip install pieeg-server[lsl]</code> then <code>pieeg-server --lsl</code>. Groups become <code>{Name}_PiEEG</code> streams."],
        ["runtime", "OSC", "<code>--osc --osc-host 127.0.0.1 --osc-port 9000 --osc-mode both|chatbox|parameters</code>"],
        ["runtime", "Regions", "Named channel groups emit <code>EEG_Frontal_Alpha</code> etc.; values normalized to a rolling 5-minute max"],
        ["out", "Webhooks", "Rules in webhooks.json or via <code>webhook_create</code>; IFTTT / Zapier recipes in the dashboard wizard"],
      ],
      gets: [
        "Empty LSL groups keep a single default stream named PiEEG",
        "OSC interval default 0.25 s; --osc-regions-setup writes groups interactively",
        "--no-webhooks disables the HTTP callback engine",
      ],
      note: {
        h: "Outlets are optional",
        p: "LSL requires the extra extra. OSC and webhooks are flags. The WebSocket still runs if none of them are enabled.",
      },
      panel: {
        mode: "console",
        title: "Outlet traffic",
        note: "Simulated LSL, OSC, and webhook events",
        gen: "outlets",
      },
      links: [
        { t: "LSL docs", h: "https://github.com/pieeg-club/PiEEG-server#lab-streaming-layer", ext: true, primary: true },
        { t: "VRChat OSC tutorial", h: "/tutorials/brain-reactive-vrchat-avatar" },
      ],
    },
    {
      id: "sdk",
      name: "pieeg.js",
      meta: "Zero-dep browser SDK",
      badge: "MIT SDK",
      fam: "sdk",
      tagline: "One file. Web Bluetooth or Web Serial. Same filter chain.",
      filters: ["sdk"],
      summary:
        "pieeg.js is a zero-dependency library in the same MIT repository. From a user gesture it pairs IronBCI / Octopus-16 over Web Bluetooth or IronBCI-32 over Web Serial, then runs Hampel, Butterworth, notch, and a 256-point FFT in the page.",
      caption:
        "User gesture → connectBLE / connectSerial → onData / onBandPowers",
      scene: {
        nodes: [
          { id: "hw", c: 1, t: "BLE / USB board", s: "user gesture", ic: "chip", part: "source" },
          { id: "js", c: 2, t: "pieeg.js", s: "1 file, 0 deps", ic: "code", part: "runtime", core: true },
          { id: "dsp", c: 3, t: "In-page DSP", s: "Hampel → IIR → FFT", ic: "wave", part: "runtime" },
          { id: "app", c: 4, t: "Your page", s: "onBandPowers", ic: "browser", part: "out" },
          { id: "ide", c: 4, t: "bioIDE", s: "ide.pieeg.com", ic: "code", part: "out" },
        ],
        links: [
          ["hw", "js", "gesture", "air"],
          ["js", "dsp", "samples", "wire"],
          ["dsp", "app", "bands", "wire"],
          ["dsp", "ide", "EEG", "wire"],
        ],
      },
      rows: [
        ["source", "CDN", "<code>&lt;script src=\"https://cdn.jsdelivr.net/gh/pieeg-club/PiEEG-server@main/pieeg.js\"&gt;</code>"],
        ["runtime", "Connect", "<code>connectBLE()</code> / <code>connectSerial()</code> must run inside a click handler"],
        ["out", "Callbacks", "<code>onData</code>, <code>onBandPowers</code>, <code>getFocusIndex()</code>, <code>getRelaxationIndex()</code>"],
      ],
      gets: [
        "Matches the server/cloud filter chain by default",
        "setBandpass(), setNotch(), setHampel() at runtime",
        "Same MIT license as pieeg-server",
      ],
      note: {
        h: "User gesture required",
        p: "Browsers throw SecurityError if connectBLE() or connectSerial() run on page load. Bind them to a click.",
      },
      panel: {
        mode: "console",
        title: "pieeg.js session",
        note: "Simulated connect and band-power callbacks",
        gen: "sdk",
      },
      links: [
        { t: "JavaScript SDK docs", h: "https://docs.pieeg.com/software/api/javascript-sdk/", ext: true, primary: true },
        { t: "Open bioIDE", h: "https://ide.pieeg.com", ext: true },
      ],
    },
  ];

  const SW = 1040,
    SH = 500,
    NW = 192,
    NH = 68,
    TOPCAP = 34;
  const $ = (s) => root.querySelector(s);
  const svg = $("#server-scene");

  const ICONS = {
    chip: "M4,4h10v10H4Z M6.5,1.5v2.5 M11.5,1.5v2.5 M6.5,14v2.5 M11.5,14v2.5 M1.5,6.5h2.5 M1.5,11.5h2.5 M14,6.5h2.5 M14,11.5h2.5",
    server: "M2,3h14v4.5H2Z M2,10.5h14V15H2Z M5,5.2h0.01 M5,12.7h0.01",
    browser: "M2,3h14v12H2Z M2,6.5h14 M4.3,4.75h0.01 M6.3,4.75h0.01",
    plug: "M6,2v4 M12,2v4 M3.5,6h11v3a5.5,5.5 0 0 1 -11,0Z M9,14.5V17",
    code: "M6.5,5.5L2.5,9l4,3.5 M11.5,5.5L15.5,9l-4,3.5",
    wave: "M1.5,9q2.2,-6 4.4,0t4.4,0t4.4,0",
    game: "M2.5,6.5h13a2,2 0 0 1 2,2v3a2,2 0 0 1 -2,2h-2l-1.6,-2h-5.8L4.5,13.5h-2a2,2 0 0 1 -2,-2v-3a2,2 0 0 1 2,-2Z",
    net: "M9,2.5a2,2 0 1 1 0,0.01 M3.5,14a2,2 0 1 1 0,0.01 M14.5,14a2,2 0 1 1 0,0.01 M8,4.4L4.4,11.9 M10,4.4L13.6,11.9 M5.6,15h6.8",
    disk: "M2.5,3.5h13v11h-13Z M5.5,3.5v4h7v-4 M9,10.5a2,2 0 1 1 0,0.01",
    globe: "M9,1.5a7.5,7.5 0 1 1 0,15a7.5,7.5 0 1 1 0,-15Z M1.5,9h15 M9,1.5q3.4,3.6 0,15 M9,1.5q-3.4,3.6 0,15",
  };

  function icon(k, x, y, color) {
    return `<g transform="translate(${x},${y})" fill="none" stroke="${color}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity=".92">
      <path d="${ICONS[k] || ICONS.code}"/></g>`;
  }

  function layoutScene(sc) {
    const cols = [...new Set(sc.nodes.map((n) => n.c))].sort((a, b) => a - b);
    const span = (SW - 56) / cols.length;
    cols.forEach((c, ci) => {
      const list = sc.nodes.filter((n) => n.c === c);
      const cx = 28 + span * (ci + 0.5),
        k = list.length;
      const sp = Math.min(112, (SH - TOPCAP - 40) / k);
      list.forEach((n, i) => {
        n._cx = cx;
        n._cy = TOPCAP + (SH - TOPCAP) / 2 + (i - (k - 1) / 2) * sp;
        n._x = cx - NW / 2;
        n._y = n._cy - NH / 2;
      });
    });
  }

  function curve(a, b) {
    const x1 = a._x + NW,
      y1 = a._cy,
      x2 = b._x,
      y2 = b._cy,
      dx = Math.max(26, (x2 - x1) * 0.45);
    return {
      d: `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`,
      mx: (x1 + x2) / 2,
      my: (y1 + y2) / 2,
    };
  }

  function drawScene(part) {
    const sc = part.scene,
      acc = FAMILY[part.fam];
    layoutScene(sc);
    const byId = Object.fromEntries(sc.nodes.map((n) => [n.id, n]));
    $("#server-lCap").innerHTML = `<text x="28" y="26" class="t-cap">${part.caption}</text>`;

    let lh = "";
    sc.links.forEach(([f, t, label, kind]) => {
      const a = byId[f],
        b = byId[t];
      if (!a || !b) return;
      const col = LK[kind || "wire"].c,
        q = curve(a, b);
      lh += `<g data-part="link" class="fade-in">
        <path d="${q.d}" fill="none" stroke="${col}" stroke-opacity=".26" stroke-width="1.6"/>
        <path class="flow" d="${q.d}" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>
        ${
          label
            ? `<g transform="translate(${q.mx},${q.my - 11})">
          <rect x="${-(label.length * 3.6 + 8)}" y="-9" width="${label.length * 7.2 + 16}" height="18" rx="9" fill="#0b0d11" stroke="${col}" stroke-opacity=".3"/>
          <text x="0" y="4" text-anchor="middle" style="font-size:11px;font-weight:500" fill="${col}">${label}</text></g>`
            : ""
        }
      </g>`;
    });
    $("#server-lLinks").innerHTML = lh;

    let nh = "";
    sc.nodes.forEach((n) => {
      const isCore = !!n.core;
      const stroke = isCore ? acc : "rgba(255,255,255,.13)";
      const fill = isCore ? `color-mix(in srgb,${acc} 11%, #0c0e12)` : "#0c0e12";
      const icCol = isCore ? acc : "#8b93a1";
      const tmax = n.go ? 16 : 19;
      const ts = Math.max(11.2, 13 * Math.min(1, tmax / n.t.length));
      const ss = Math.max(9.4, 11 * Math.min(1, 23 / n.s.length));
      nh += `<g class="node${isCore ? " core" : ""}${n.go ? " link-out" : ""}" data-part="${n.part}" data-id="${n.id}" ${n.go ? `data-go="${n.go}"` : ""}>
        <rect class="plate" x="${n._x}" y="${n._y}" width="${NW}" height="${NH}" rx="15" fill="${fill}" stroke="${stroke}" stroke-width="${isCore ? 1.6 : 1}"/>
        ${icon(n.ic, n._x + 15, n._y + NH / 2 - 9, icCol)}
        <text class="t-main" x="${n._x + 42}" y="${n._y + 29}" style="font-size:${ts.toFixed(1)}px">${n.t}</text>
        <text class="t-sub" x="${n._x + 42}" y="${n._y + 46}" style="font-size:${ss.toFixed(1)}px">${n.s}</text>
        ${n.go ? `<path d="M${n._x + NW - 17},${n._y + 14} l5,5 l-5,5" fill="none" stroke="#626973" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>` : ""}
        <rect x="${n._x}" y="${n._y}" width="${NW}" height="${NH}" rx="15" fill="transparent"/>
      </g>`;
    });
    $("#server-lNodes").innerHTML = nh;

    svg.querySelectorAll(".node").forEach((g) => {
      const n = byId[g.dataset.id];
      g.addEventListener("pointerenter", () => showTip(n, g));
      g.addEventListener("pointerleave", () => showTip(null));
      if (g.dataset.go) {
        g.addEventListener("click", () => select(g.dataset.go));
        g.setAttribute("tabindex", "0");
        g.setAttribute("role", "link");
        g.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            select(g.dataset.go);
          }
        });
      }
    });

    const kinds = [...new Set(sc.links.map((l) => l[3] || "wire"))];
    $("#server-legend").innerHTML =
      kinds.map((k) => `<span><i style="background:${LK[k].c}"></i>${LK[k].name}</span>`).join("") +
      `<span class="hint" style="margin-left:auto;color:var(--dim)">Hover a spec row to trace it. Boxes with an arrow switch surface.</span>`;
  }

  const tip = $("#server-tip");
  function showTip(n, g) {
    if (!n) {
      tip.classList.remove("show");
      return;
    }
    tip.innerHTML = n.go
      ? `<b>${n.t}</b> <span>- inspect this surface</span>`
      : `<b>${n.t}</b> <span>${n.s}</span>`;
    const box = $(".stage").getBoundingClientRect(),
      r = g.getBoundingClientRect();
    tip.style.left = r.left + r.width / 2 - box.left + "px";
    tip.style.top = r.top - box.top + "px";
    tip.classList.add("show");
  }

  function applyFocus() {
    const p = state.focus;
    svg.classList.toggle("focusing", !!p);
    svg.querySelectorAll("[data-part]").forEach((n) =>
      n.classList.toggle("on", !!p && n.getAttribute("data-part") === p),
    );
    root.querySelectorAll(".row").forEach((r) => r.classList.toggle("on", r.dataset.part === p));
  }

  let simT = 0,
    lastNow = 0,
    frameN = 18400;

  function sim(t) {
    const d = 0.16 + 0.07 * Math.sin(t * 0.13),
      th = 0.15 + 0.08 * Math.sin(t * 0.21 + 2),
      a = 0.3 + 0.22 * Math.sin(t * 0.31 + 1),
      b = 0.19 + 0.1 * Math.sin(t * 0.47 + 3),
      g = 0.07 + 0.04 * Math.sin(t * 0.71 + 4);
    const s = d + th + a + b + g;
    const o = { Delta: d / s, Theta: th / s, Alpha: a / s, Beta: b / s, Gamma: g / s };
    o.focus = Math.max(0.04, Math.min(0.97, ((o.Beta + o.Gamma) / (o.Alpha + o.Theta + o.Delta)) * 1.45));
    o.relax = Math.max(0.04, Math.min(0.97, o.Alpha * 1.45));
    o.engage = Math.max(0.04, Math.min(0.97, (o.Beta * 1.6 + o.focus) * 0.62));
    return o;
  }

  const uv = (t, i) =>
    (Math.sin(t * 6.4 + i * 1.7) * 9 + Math.sin(t * 64 + i) * 3.4 + Math.sin(t * 20.3 + i * 0.6) * 5).toFixed(2);
  const f2 = (v) => v.toFixed(2);
  const f3 = (v) => v.toFixed(3);

  const GEN = {
    acquire: (t) => {
      const k = frameN++ % 6;
      if (k === 0) return `<span class="c">$ pieeg-server --device pieeg16</span>`;
      if (k === 1) return `<span class="hl">profile</span> pi5  <span class="k">SPI</span> /dev/spidev0.0  gpiochip4`;
      if (k === 2) return `<span class="c">WebSocket</span>  ws://raspberrypi.local:<span class="n">1616</span>`;
      if (k === 3) return `<span class="c">Dashboard</span>  http://raspberrypi.local:<span class="n">1617</span>`;
      if (k === 4) return `<span class="k">acq</span>  16 ch @ <span class="n">250</span> Hz  first sample n=<span class="n">0</span>`;
      const ch = [0, 1, 2].map((i) => `<span class="n">${uv(t, i)}</span>`).join(", ");
      return `<span class="c">sample</span>  n=<span class="n">${18400 + Math.floor(t * 250)}</span>  [${ch}, …] µV`;
    },
    websocket: (t) => {
      const n = 18400 + Math.floor(t * 250);
      const k = frameN++ % 5;
      if (k === 0)
        return `<span class="c">connected</span>  ws://127.0.0.1:<span class="n">1616</span>  device=<span class="s">pieeg16</span>`;
      if (k === 3)
        return `<span class="hl">{"cmd":"set_filter","enabled":true,"lowcut":1.0,"highcut":40.0}</span>`;
      const ch = [0, 1, 2, 3].map((i) => uv(t, i)).join(", ");
      return `<span class="c">←</span> {<span class="k">"t"</span>: <span class="n">${(1711234567 + t).toFixed(3)}</span>, <span class="k">"n"</span>: <span class="n">${n}</span>, <span class="k">"channels"</span>: [${ch}, …]}`;
    },
    dsp: (t) => {
      const k = frameN++ % 5;
      if (k === 0) return `<span class="hl">set_filter</span>  enabled=<span class="n">true</span>  1.0-40.0 Hz SOS`;
      if (k === 1) return `<span class="hl">start_record</span>  → <span class="s">session_2026-04-11.csv</span>`;
      if (k === 2) return `<span class="c">reg_read</span>  CH1SET=0x00  CONFIG1=0x96  <span class="n">ok</span>`;
      if (k === 3)
        return `<span class="hl">noise_test</span>  3.0s  max_rms=<span class="n">1.8</span> µV  verdict=<span class="s">pass</span>`;
      return `<span class="c">recording</span>  n=<span class="n">${1200 + Math.floor(t * 250) % 8000}</span>  annotations=<span class="n">2</span>`;
    },
    outlets: (t) => {
      const s = sim(t),
        k = frameN++ % 6;
      if (k === 0) return `<span class="c">LSL</span>  stream=<span class="s">PiEEG</span>  16 ch @ 250 Hz  samples=${(t * 250) | 0}`;
      if (k === 1) return `<span class="s">/avatar/parameters/EEG_Alpha</span>  <span class="n">${f3(s.Alpha)}</span>`;
      if (k === 2) return `<span class="s">/avatar/parameters/EEG_Beta</span>   <span class="n">${f3(s.Beta)}</span>`;
      if (k === 3) return `<span class="c">OSC</span>  127.0.0.1:<span class="n">9000</span>  mode=both  interval=0.25s`;
      if (k === 4)
        return `<span class="hl">webhook</span>  band_ratio_above beta/theta <span class="n">${f2((s.Beta + 0.01) / (s.Theta + 0.08))}</span>  → POST`;
      return `<span class="c">outlets</span>  lsl=on  osc=on  webhooks=on`;
    },
    sdk: (t) => {
      const s = sim(t),
        k = frameN++ % 5;
      if (k === 0) return `<span class="hl">const</span> pieeg = <span class="hl">new</span> <span class="k">PiEEG</span>();`;
      if (k === 1) return `<span class="hl">await</span> pieeg.<span class="k">connectBLE</span>(); <span class="c">// user gesture</span>`;
      if (k === 2) return `<span class="c">connected</span>  8 ch @ 250 Hz  Hampel + 1-40 Hz IIR`;
      if (k === 3)
        return `pieeg.<span class="k">onBandPowers</span>(b =&gt; …)  Alpha <span class="n">${f2(s.Alpha)}</span>`;
      return `focus <span class="n">${f2(s.focus)}</span>  relax <span class="n">${f2(s.relax)}</span>`;
    },
  };

  const BANDS = [
    ["Delta", "δ", "#8b5cf6"],
    ["Theta", "θ", "#06b6d4"],
    ["Alpha", "α", "#22c55e"],
    ["Beta", "β", "#f59e0b"],
    ["Gamma", "γ", "#ef4444"],
  ];

  let panel = { mode: null },
    conLines = [],
    conTimer = 0;

  function buildPanel(p) {
    const b = $("#server-panelBody");
    panel = { mode: p.panel.mode, cfg: p.panel };
    $("#server-panelTitle").textContent = p.panel.title;
    $("#server-panelNote").textContent = p.panel.note;
    conLines = [];
    conTimer = 0;
    frameN = 18400;

    if (p.panel.mode === "console") {
      b.innerHTML = `<div class="console" id="server-con"></div>`;
      for (let i = 0; i < 6; i++) {
        conLines.push(GEN[p.panel.gen](simT - 1 + i * 0.15));
      }
      paintConsole();
    } else {
      b.innerHTML = `<div class="bands">
        <div class="barwrap">${BANDS.map(
          ([k, gl, c]) =>
            `<div class="bar"><div class="fill" data-b="${k}" style="background:${c};height:20%"></div><div class="lb"><b style="color:${c}">${gl}</b>${k}</div></div>`,
        ).join("")}</div>
        <div class="meters">
          ${["focus", "relax", "engage"]
            .map(
              (m) =>
                `<div class="meter"><div class="mh"><span>${m === "engage" ? "engagement" : m}</span><b data-m="${m}">0.00</b></div><div class="track"><div class="val" data-v="${m}" style="width:20%"></div></div></div>`,
            )
            .join("")}
          <div class="foot">0 to 1 within this session. Descriptive, not clinical.</div>
        </div></div>`;
      tickBands();
    }
  }

  function paintConsole() {
    const c = $("#server-con");
    if (!c) return;
    c.innerHTML = conLines.map((l) => `<div>${l}</div>`).join("");
  }

  function tickConsole(dt) {
    if (state.paused) return;
    conTimer -= dt;
    if (conTimer <= 0) {
      conTimer = 0.65;
      conLines.push(GEN[panel.cfg.gen](simT));
      if (conLines.length > 9) conLines.shift();
      paintConsole();
    }
  }

  function tickBands() {
    const s = sim(simT);
    BANDS.forEach(([k]) => {
      const el = root.querySelector(`[data-b="${k}"]`);
      if (el) el.style.height = 6 + s[k] * 180 + "%";
    });
    ["focus", "relax", "engage"].forEach((m) => {
      const v = s[m];
      const t = root.querySelector(`[data-m="${m}"]`),
        bar = root.querySelector(`[data-v="${m}"]`);
      if (t) t.textContent = f2(v);
      if (bar) bar.style.width = v * 100 + "%";
    });
  }

  const state = { part: null, filter: "all", focus: null, layer: null, paused: false };

  function renderRail() {
    const rail = $("#server-rail");
    rail.innerHTML = "";
    PARTS.forEach((p) => {
      const b = document.createElement("button");
      b.className = "dev";
      b.dataset.id = p.id;
      b.innerHTML = `<b>${p.name}</b><span>${p.meta}</span>`;
      b.addEventListener("click", () => select(p.id));
      rail.appendChild(b);
    });
    syncRail();
  }

  function syncRail() {
    root.querySelectorAll(".dev").forEach((b) => {
      const p = PARTS.find((x) => x.id === b.dataset.id);
      b.setAttribute("aria-pressed", p === state.part);
      b.hidden = !(state.filter === "all" || p.filters.includes(state.filter)) && p !== state.part;
    });
  }

  root.querySelectorAll(".filters button").forEach((b) =>
    b.addEventListener("click", () => {
      state.filter = b.dataset.filter;
      root.querySelectorAll(".filters button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      const vis = PARTS.filter((p) => state.filter === "all" || p.filters.includes(state.filter));
      if (!vis.includes(state.part) && vis[0]) select(vis[0].id);
      else syncRail();
    }),
  );

  const HOST = {
    acquire: "Python 3.10+ process on Pi, Jetson, Linux, macOS, or Windows",
    websocket: "TCP WebSocket bound to --host/--port (default 0.0.0.0:1616)",
    dashboard: "HTTP :1617 serving the committed Vite build from the pip package",
    dsp: "Same process as AcquisitionLoop; optional pieeg-core Rust wheel",
    outlets: "LSL on LAN, OSC UDP to --osc-host, HTTP callbacks from rules",
    sdk: "Any page that loads pieeg.js (CDN or git install)",
  };

  const LAYERS = [
    ["all", "Everything", "#d6dae0"],
    ["source", "Signal input", "#9aa2ad"],
    ["runtime", "Server runtime", "#d6dae0"],
    ["out", "Output surface", "#7fb2ff"],
  ];

  function renderBar(p) {
    $("#server-layers").innerHTML = LAYERS.map(([k, label, c]) => {
      const col = k === "source" ? FAMILY[p.fam] : c;
      return `<button data-layer="${k}" aria-pressed="${(state.layer || "all") === k}" style="--c:${col}"><i></i>${label}</button>`;
    }).join("");
    $("#server-layers")
      .querySelectorAll("button")
      .forEach((b) =>
        b.addEventListener("click", () => {
          state.layer = b.dataset.layer === "all" ? null : b.dataset.layer;
          $("#server-layers")
            .querySelectorAll("button")
            .forEach((x) => x.setAttribute("aria-pressed", x === b));
          state.focus = state.layer;
          applyFocus();
        }),
      );
    $("#server-hostWrap").innerHTML = `<span class="seg-label">Runs in</span><span class="lock">${HOST[p.id]}</span>`;
  }

  function renderSpec(p) {
    const pc = { source: FAMILY[p.fam], runtime: "#d6dae0", out: "#7fb2ff", link: "#45dd8b" };
    $("#server-spec").innerHTML = `
      ${p.badge ? `<span class="badge" style="background:linear-gradient(90deg,${FAMILY[p.fam]},#ffffff55);color:#04121a">${p.badge}</span>` : ""}
      <h2>${p.name}</h2>
      <p class="tagline">${p.tagline}</p>
      <p class="summary">${p.summary}</p>
      <dl class="rows">${p.rows
        .map(
          ([part, k, v]) =>
            `<div class="row" tabindex="0" data-part="${part}" style="--pc:${pc[part]}"><dt>${k}</dt><dd>${v}</dd></div>`,
        )
        .join("")}</dl>
      <div class="need"><h3>Capabilities</h3><ul>${p.gets.map((g) => `<li>${g}</li>`).join("")}</ul></div>
      <div class="note"><h3>${p.note.h}</h3><p>${p.note.p}</p></div>
      ${p.links
        .map(
          (l) =>
            `<a class="docs${l.primary ? " primary" : ""}" href="${l.h}"${
              l.ext ? ' target="_blank" rel="noopener noreferrer"' : ""
            }>${l.t}</a>`,
        )
        .join("")}`;

    root.querySelectorAll(".row").forEach((r) => {
      const on = () => {
          state.focus = r.dataset.part;
          applyFocus();
        },
        off = () => {
          state.focus = state.layer;
          applyFocus();
        };
      r.addEventListener("pointerenter", on);
      r.addEventListener("pointerleave", off);
      r.addEventListener("focus", on);
      r.addEventListener("blur", off);
    });
  }

  function select(id) {
    const p = PARTS.find((x) => x.id === id);
    if (!p || p === state.part) return;
    state.part = p;
    state.focus = state.layer;
    root.style.setProperty("--mode", FAMILY[p.fam]);
    syncRail();
    drawScene(p);
    renderBar(p);
    renderSpec(p);
    buildPanel(p);
    applyFocus();
  }

  $("#server-pause").addEventListener("click", (e) => {
    state.paused = !state.paused;
    e.target.textContent = state.paused ? "Resume" : "Pause";
  });

  function tickFlow() {
    root.querySelectorAll(".flow").forEach((p) => {
      p.style.strokeDashoffset = (-((simT * 28) % 32)).toFixed(2);
    });
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - (lastNow || now)) / 1000);
    lastNow = now;
    if (!state.paused) simT += dt;
    tickFlow();
    if (panel.mode === "console") tickConsole(dt);
    else if (panel.mode === "bands") {
      if (!state.paused) tickBands();
    }
  }

  renderRail();
  select("acquire");
  if (reduce) tickBands();

  function startLoop() {
    if (stopped || raf) return;
    lastNow = 0;
    raf = requestAnimationFrame(function tick(now) {
      raf = 0;
      if (stopped) return;
      if (visible) frame(now);
      raf = requestAnimationFrame(tick);
    });
  }

  const io = new IntersectionObserver(
    (entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) startLoop();
    },
    { threshold: 0.08, rootMargin: "80px" },
  );
  io.observe(root);
  startLoop();

  return () => {
    stopped = true;
    cancelAnimationFrame(raf);
    raf = 0;
    io.disconnect();
  };
}
