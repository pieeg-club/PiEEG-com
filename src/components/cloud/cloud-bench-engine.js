/* Interactive Cloud Architecture Bench - follows the home-bench instrument design. */

export function mountCloudBench(root) {
  if (!root) return () => {};
  let raf = 0;
  let stopped = false;
  let visible = true;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const FAMILY = {
    core: "#22d3ee",
    lab: "#34d399",
    stream: "#f59e0b",
    ai: "#a78bfa",
    build: "#38bdf8",
  };

  const LK = {
    wire: { c: "#7fb2ff", name: "In-tab memory / Worker" },
    air: { c: "#b690ff", name: "Web Bluetooth / Serial" },
    net: { c: "#45dd8b", name: "HTTPS / WebRTC / WS" },
    osc: { c: "#ffae42", name: "OSC over UDP (local)" },
    ai: { c: "#c58bff", name: "BYO LLM API call" },
  };

  const PARTS = [
    {
      id: "dashboard",
      name: "Live Dashboard",
      meta: "Ring buffers, 60 fps",
      badge: "Core Workspace",
      fam: "core",
      tagline: "Decoupled ingestion and rendering at 250-500 Hz",
      filters: ["acquire", "analyze"],
      summary:
        "Incoming packets write directly into pre-allocated Float32Array ring buffers held in React refs. Canvas 2D waveform loops and the Three.js 3D head map read those refs at 60 fps without triggering React state re-renders per sample.",
      caption:
        "Web Bluetooth / Serial / WS → Float32Array ring (refs) → Worker FFT & 60 fps Canvas / WebGL",
      scene: {
        nodes: [
          { id: "ble", c: 1, t: "BLE & Serial", s: "8 to 48 ch, in-tab", ic: "chip", part: "source" },
          { id: "ws", c: 1, t: "WebSocket / Demo", s: "server or synthetic", ic: "plug", part: "source", go: "mock" },
          { id: "dsp", c: 2, t: "In-Tab DSP Chain", s: "Hampel → IIR → Notch", ic: "wave", part: "runtime" },
          { id: "ring", c: 3, t: "Float32Array Ring", s: "useRef, zero GC", ic: "server", part: "runtime", core: true },
          { id: "wave", c: 4, t: "Channel Canvases", s: "staggered 30/60 fps", ic: "wave", part: "out" },
          { id: "fft", c: 4, t: "FFT Web Worker", s: "256-pt Cooley-Tukey", ic: "code", part: "out" },
          { id: "topo", c: 4, t: "3D Head Topomap", s: "geodesic RBF shader", ic: "globe", part: "out", go: "calibration" },
        ],
        links: [
          ["ble", "dsp", "BLE/USB", "air"],
          ["ws", "ring", "JSON", "net"],
          ["dsp", "ring", "µV", "wire"],
          ["ring", "wave", "refs", "wire"],
          ["ring", "fft", "12th frame", "wire"],
          ["fft", "topo", "bands", "wire"],
        ],
      },
      rows: [
        ["source", "Transports", "Web Bluetooth (IronBCI 8/16, XR, Octopus-16, Aura VR), Web Serial (IronBCI-32, Kraken-48), or WebSocket"],
        ["runtime", "Ingestion", "Pre-allocated <code>Float32Array</code> per channel; React header stats throttled to 2 Hz (500 ms)"],
        ["runtime", "DSP Chain", "Hampel median spike filter, 4th-order Butterworth bandpass (1-40 Hz), 50/60 Hz IIR notch"],
        ["out", "Spectrum", "256-point Hanning-windowed radix-2 FFT offloaded to a dedicated Web Worker"],
        ["out", "3D Topomap", "Volumetric geodesic Gaussian interpolation on GPU; fades honestly where no electrode covers"],
      ],
      gets: [
        "Staggered 30 fps grid rendering (60 fps when a channel is expanded) with DPR capping",
        "Adaptive quality downgrade (1500 → 800 → 400 max points) if frame times exceed 14 ms",
        "Client-side CSV recorder with timestamped annotations when running without a Python server",
        "Press P at any time to inspect live FPS, frame time, and heap usage",
      ],
      note: {
        h: "Sparse montages stay honest",
        p: "The 3D head shader computes coverage per vertex from angular distance to active electrodes. Bare scalp regions fade to neutral rather than fabricating interpolated heat.",
      },
      panel: {
        mode: "bands",
        title: "Live spectral & state readout",
        note: "Simulated band powers and within-session indices",
      },
      links: [
        { t: "Open Dashboard Lobby", h: "https://cloud.pieeg.com/lobby", ext: true, primary: true },
        { t: "Dashboard Architecture", h: "https://docs.pieeg.com/software/features/dashboard", ext: true },
      ],
    },
    {
      id: "livelab",
      name: "Live Lab (Bio-Pen)",
      meta: "cloud.pieeg.com/lab",
      badge: "15 Hz JS Workbench",
      fam: "lab",
      tagline: "Multi-stage JavaScript DSP and ML cells on the live ring buffer",
      filters: ["build", "analyze"],
      summary:
        "Live Lab extracts the latest 2-second multichannel window from the 250 Hz ring buffer and posts it to a sandboxed Web Worker at 15 Hz. Each stage returns a scalar, array, PSD, matrix, or classifier prediction that auto-plots on its canvas.",
      caption:
        "2s Ring Window → 15 Hz Worker Sandbox (Stage 1 → Stage k) → Auto-Plot, Decoder Arena & /lab/:id",
      scene: {
        nodes: [
          { id: "ring", c: 1, t: "2s Ring Window", s: "win[ch] @ 250 Hz", ic: "wave", part: "source", go: "dashboard" },
          { id: " epoch", c: 1, t: "Session Dataset", s: "labelled 2s reps", ic: "disk", part: "source" },
          { id: "wk", c: 2, t: "Worker Sandbox", s: "15 Hz tick, 450ms debounce", ic: "code", part: "runtime", core: true },
          { id: "bio", c: 3, t: "bio Primitives", s: "car, psd, lda, loroCV", ic: "chip", part: "runtime" },
          { id: "plot", c: 4, t: "Auto-Visualizer", s: "trace, PSD, heatmap", ic: "browser", part: "out" },
          { id: "arena", c: 4, t: "Decoder Arena", s: "LORO-CV vs k-fold", ic: "wave", part: "out" },
          { id: "pen", c: 4, t: "Bio-Pen Share", s: "/lab/:id or .biopen.json", ic: "net", part: "out", go: "relay" },
        ],
        links: [
          ["ring", "wk", "15 Hz", "wire"],
          [" epoch", "wk", "X, y, reps", "wire"],
          ["wk", "bio", "strict scope", "wire"],
          ["bio", "plot", "return", "wire"],
          ["bio", "arena", "loroCV", "wire"],
          ["wk", "pen", "Ctrl+S", "net"],
        ],
      },
      rows: [
        ["source", "Tick Payload", "<code>win[ch][sample]</code> (2s in µV), <code>EEG</code>, <code>bands</code>, <code>focus</code>, <code>relax</code>, <code>dataset</code>, <code>state</code>"],
        ["runtime", "DSP & Stats", "<code>car(win)</code>, <code>bipolar</code>, <code>detrend</code>, <code>zscore</code>, <code>rms</code>, <code>lineLength</code>, <code>fft</code>, <code>psd</code>, <code>bandpower</code>, <code>cohensD</code>"],
        ["runtime", "ML & CV", "<code>lda(X,y,shrinkage)</code>, <code>logreg(X,y)</code>, trial-grouped <code>loroCV(X,y,reps)</code>, and <code>crossValScore</code>"],
        ["out", "Freeze 2s", "Snapshots the current 2-second multichannel window so filters and classifiers can be debugged deterministically"],
        ["out", "Sharing", "One-click <code>/lab/:id</code> cloud permalinks (with guest <code>X-Pen-Token</code>), inline base64 URLs, or <code>.biopen.json</code>"],
      ],
      gets: [
        "Return-driven auto-visualizer: numbers draw sparklines, arrays draw traces or bar charts, matrices draw heatmaps",
        "Decoder Arena benchmarks your pipeline side-by-side against Shrinkage-LDA and L2 Logistic Regression",
        "Exposes sample-split k-fold inflation vs trial-grouped Leave-One-Rep-Out (LORO-CV) balanced accuracy",
        "Optional 10 Hz output forwarding from the final stage to Local Bridge (/pieeg/lab/*)",
      ],
      note: {
        h: "Within-session diagnostics",
        p: "Within-session Cohen's d and LORO-CV balanced accuracy measure separation for the current electrode placement and session. They are not cross-subject or cross-day generalisation claims.",
      },
      panel: {
        mode: "console",
        title: "Live Lab worker execution trace",
        note: "15 Hz stage evaluation and LORO-CV audit",
        gen: "livelab",
      },
      links: [
        { t: "Open Live Lab", h: "https://cloud.pieeg.com/lab", ext: true, primary: true },
        { t: "Live Lab Docs", h: "https://docs.pieeg.com/cloud/live-lab/", ext: true },
      ],
    },
    {
      id: "neuralstream",
      name: "Neural Stream & Bridge",
      meta: "WebRTC P2P → OSC",
      badge: "Creative & XR",
      fam: "stream",
      tagline: "Stream the headset as named OSC channels over loopback/LAN",
      filters: ["stream"],
      summary:
        "PiEEG Cloud has no local UDP socket access inside the browser sandbox. To reach TouchDesigner, Max/MSP, Ableton, or VRChat, the tab opens a DTLS-encrypted WebRTC P2P data channel to the 5 MB Rust Local Bridge on your machine.",
      caption:
        "Cloud Tab → WebRTC P2P DataChannel (DTLS) → pieeg-local-bridge (Rust) → UDP OSC on 127.0.0.1",
      scene: {
        nodes: [
          { id: "ns", c: 1, t: "Neural Stream", s: "10-60 Hz signal tree", ic: "wave", part: "source" },
          { id: "lab", c: 1, t: "Live Lab / Exp", s: "custom stage output", ic: "code", part: "source", go: "livelab" },
          { id: "rtc", c: 2, t: "WebRTC P2P", s: "6-char code, DTLS", ic: "net", part: "runtime" },
          { id: "br", c: 3, t: "Local Bridge", s: "Rust binary, :47800", ic: "server", part: "runtime", core: true },
          { id: "td", c: 4, t: "TouchDesigner", s: "single OSC In CHOP", ic: "globe", part: "out" },
          { id: "max", c: 4, t: "Max/MSP & Ableton", s: "[udpreceive] port 7000", ic: "wave", part: "out" },
          { id: "vrc", c: 4, t: "VRChat Avatars", s: "/avatar/parameters/*", ic: "game", part: "out" },
        ],
        links: [
          ["ns", "rtc", "batch", "wire"],
          ["lab", "rtc", "JSON", "wire"],
          ["rtc", "br", "P2P DTLS", "net"],
          ["br", "td", "OSC", "osc"],
          ["br", "max", "OSC", "osc"],
          ["br", "vrc", "OSC", "osc"],
        ],
      },
      rows: [
        ["source", "Addresses", "<code>/pieeg/focus</code>, <code>/pieeg/alpha</code>..<code>gamma</code>, <code>/pieeg/blink</code>, <code>/pieeg/chN/level</code>, <code>/pieeg/chN/{band}</code>"],
        ["runtime", "Pairing", "Run <code>pieeg-local-bridge</code> (~5 MB Rust app), copy the 6-character share code (e.g. <code>A3K9M2</code>), paste in Cloud"],
        ["runtime", "Transport", "Cloud relays only the one-time HTTPS SDP/ICE handshake; all signal frames flow over local loopback/LAN"],
        ["out", "Budget", "Up to 128 OSC parameters per tick at 10, 20, 30, or 60 Hz; per-channel signals truncate first if over budget"],
        ["out", "Discovery", "Automatic mDNS (<code>_osc._udp</code>) scan for local OSC listeners plus one-click address list copy"],
      ],
      gets: [
        "Zero per-address wiring in TouchDesigner: one OSC In CHOP explodes the whole tree into named channels",
        "Explicit OSC envelope mode ({ osc: { address, args } }) or recursive JSON path flattening",
        "Built-in diagnostics report for checking background tab timer throttling and dropped frames",
        "Standalone binaries for Windows, macOS (Apple Silicon & Intel), and Linux",
      ],
      note: {
        h: "Background tab throttling",
        p: "When TouchDesigner or a full-screen app takes focus, Chromium throttles background tab timers. PiEEG Cloud includes a wake-lock keep-alive, or you can launch Chrome with --disable-background-timer-throttling.",
      },
      panel: {
        mode: "console",
        title: "OSC tree leaving the Local Bridge",
        note: "Simulated Neural Stream frames on 127.0.0.1:7000",
        gen: "neuralstream",
      },
      links: [
        { t: "Download Local Bridge", h: "https://github.com/pieeg-club/PiEEG-local-bridge/releases/latest", ext: true, primary: true },
        { t: "TouchDesigner Guide", h: "/tutorials/neural-stream-touchdesigner-osc" },
      ],
    },
    {
      id: "calibration",
      name: "Calibration & Quality",
      meta: "SNR, Line, µVpp",
      badge: "Signal Integrity",
      fam: "core",
      tagline: "Per-electrode contact diagnostics and 3D montage mapping",
      filters: ["acquire", "analyze"],
      summary:
        "Before training a decoder or recording a dataset, the Calibration bench evaluates every active channel in real time: in-band SNR (dB), 50/60 Hz mains line-noise ratio, peak-to-peak amplitude (µVpp), and rail/flatline detection.",
      caption:
        "Raw Channel Buffers → SNR / Mains Line / Peak-to-Peak Evaluator → Pad Glow & 3D Montage",
      scene: {
        nodes: [
          { id: "raw", c: 1, t: "Active Channels", s: "8, 16, 32, or 48 ch", ic: "chip", part: "source" },
          { id: " cal", c: 2, t: "Contact Evaluator", s: "SNR, 50/60 Hz, µVpp", ic: "wave", part: "runtime", core: true },
          { id: "lay", c: 3, t: "Device Layouts", s: "10-20, XR mask, Octopus", ic: "globe", part: "runtime" },
          { id: "pad", c: 4, t: "Pad Status Map", s: "good / marginal / rail", ic: "browser", part: "out" },
          { id: "reg", c: 4, t: "ADS1299 Registers", s: "input short noise test", ic: "server", part: "out" },
        ],
        links: [
          ["raw", " cal", "window", "wire"],
          [" cal", "lay", "status", "wire"],
          ["lay", "pad", "SVG glow", "wire"],
          ["raw", "reg", "SPI/WS", "net"],
        ],
      },
      rows: [
        ["source", "Metrics", "In-band SNR (dB), mains pickup at 50 or 60 Hz, RMS amplitude, and peak-to-peak (µVpp)"],
        ["runtime", "States", "Each electrode pad resolves to <code>good</code>, <code>marginal</code>, <code>noisy</code>, <code>flat</code>, or <code>railed</code>"],
        ["runtime", "Montages", "Auto-selects 10-20 scalp, Octopus-16 occipital cluster, PiEEG XR 8-ch face mask, or XR-16 face + occipital"],
        ["out", "3D Editor", "Custom electrode placement editor persists per montage family and channel count in <code>localStorage</code>"],
        ["out", "Hardware Test", "When backed by <code>pieeg-server</code>, run a 3-second ADS1299 internal-short noise floor diagnostic"],
      ],
      gets: [
        "Immediate visual cue for which dry pin or wet cup needs reseating or conductive gel",
        "Dedicated back-of-head 2D inset when using 16-channel XR + occipital configurations",
        "Prevents garbage-in calibration before launching P300, Face Trainer, or Live Lab",
      ],
      note: {
        h: "Check contact before interpreting bands",
        p: "A loose electrode or mains hum inflates broadband power. Always verify green contact status and low line-noise ratio before reading spectral indices.",
      },
      panel: {
        mode: "console",
        title: "Live contact & noise diagnostic",
        note: "Per-channel SNR, line ratio, and peak-to-peak readout",
        gen: "calibration",
      },
      links: [
        { t: "Open Cloud Lobby", h: "https://cloud.pieeg.com/lobby", ext: true, primary: true },
        { t: "Signal Quality Guide", h: "https://docs.pieeg.com/hardware/signal-quality/noise-elimination/", ext: true },
      ],
    },
    {
      id: "mock",
      name: "Mock Studio",
      meta: "cloud.pieeg.com/mock",
      badge: "No Hardware Needed",
      fam: "build",
      tagline: "Scriptable synthetic EEG generator with deterministic timing",
      filters: ["acquire", "build"],
      summary:
        "Compose a synthetic multichannel board from draggable signal layers or a line-oriented rule script. Stack background rhythms (δ θ α β γ), pink-ish noise, slow drift, periodic frontal blinks, SSVEP tones, or EMG bursts, then stream into the exact same pipeline as physical hardware.",
      caption:
        "Starters & Rule Script → Layer Stack (blink, band, tone, EMG, mains) → demo:program @ 250 Hz",
      scene: {
        nodes: [
          { id: "st", c: 1, t: "Starter Presets", s: "blink, alpha, SSVEP, mains", ic: "disk", part: "source" },
          { id: "ed", c: 1, t: "Rule Script Editor", s: "line-oriented DSL", ic: "code", part: "source" },
          { id: "stk", c: 2, t: "Layer Compositor", s: "bg + transient layers", ic: "wave", part: "runtime" },
          { id: "gen", c: 3, t: "Mock Engine", s: "demo:program (µV)", ic: "chip", part: "runtime", core: true },
          { id: "dash", c: 4, t: "Dashboard & Lab", s: "identical ingest path", ic: "browser", part: "out", go: "dashboard" },
          { id: "exp", c: 4, t: "35+ Experiences", s: "test detectors offline", ic: "game", part: "out" },
        ],
        links: [
          ["st", "stk", "load", "wire"],
          ["ed", "stk", "parse", "wire"],
          ["stk", "gen", "stack", "wire"],
          ["gen", "dash", "250 Hz", "wire"],
          ["gen", "exp", "ring", "wire"],
        ],
      },
      rows: [
        ["source", "Layer Kinds", "<code>blink</code>, <code>pulse</code>, <code>tone</code>, <code>band</code> (δ θ α β γ), <code>emg</code>, <code>mains</code> (50/60 Hz), <code>noise</code>, <code>drift</code>"],
        ["runtime", "Targeting", "Route any layer to <code>all</code>, <code>frontal</code> (first channels), <code>occipital</code> (last channels), or explicit channel indices"],
        ["runtime", "Connect ID", "Runs in-tab under <code>demo:program</code> alongside quick <code>demo:8</code>, <code>demo:16</code>, <code>demo:32</code>, and <code>demo:auravr</code>"],
        ["out", "Persistence", "Custom mock programs save locally in the browser and round-trip cleanly to text rules"],
      ],
      gets: [
        "Verify filter frequency responses and notch rejection against known 50/60 Hz mains injection",
        "Test blink and refractory gates against exact amplitude and period specifications",
        "Build and debug classroom exercises or BCI games before physical boards arrive",
      ],
      note: {
        h: "Known timing, not a volume conductor",
        p: "Mock Studio synthesizes exact waveforms and additive layers for pipeline verification. It is not a finite-element head model or recorded physiology.",
      },
      panel: {
        mode: "console",
        title: "Mock Studio rule script & output",
        note: "Rules compiled into live µV frames on demo:program",
        gen: "mock",
      },
      links: [
        { t: "Open Mock Studio", h: "https://cloud.pieeg.com/mock", ext: true, primary: true },
        { t: "Try 8-ch Demo", h: "https://cloud.pieeg.com/lobby", ext: true },
      ],
    },
    {
      id: "relay",
      name: "Cloud Library & Relay",
      meta: "/library & /live/:id",
      badge: "Opt-In Sharing",
      fam: "stream",
      tagline: "Ephemeral live relay and dataset repository with embargo controls",
      filters: ["stream", "analyze"],
      summary:
        "Everything in PiEEG Cloud stays local by default. When you explicitly choose to share, Live Relay broadcasts your live stream to a /live/:relayId link (in-transit only, never stored), and Cloud Library hosts uploaded CSV sessions with visibility and embargo controls.",
      caption:
        "Local Session → Opt-In Relay (/live/:id) or Library Upload → Browser Visualizer & Citations",
      scene: {
        nodes: [
          { id: "loc", c: 1, t: "Local Session", s: "live stream or CSV", ic: "disk", part: "source", go: "dashboard" },
          { id: "otp", c: 2, t: "Passwordless Auth", s: "email 6-digit OTP", ic: "plug", part: "runtime" },
          { id: "rel", c: 3, t: "Live Relay", s: "/live/:relayId (transit)", ic: "net", part: "runtime", core: true },
          { id: "lib", c: 3, t: "Cloud Library", s: "public / unlisted / embargo", ic: "cloud", part: "runtime", core: true },
          { id: "vw", c: 4, t: "Remote Viewers", s: "live waveforms + FFT", ic: "browser", part: "out" },
          { id: "col", c: 4, t: "Collections & Replay", s: "in-browser SessionViewer", ic: "wave", part: "out" },
        ],
        links: [
          ["loc", "otp", "opt-in", "net"],
          ["otp", "rel", "stream", "net"],
          ["otp", "lib", "upload CSV", "net"],
          ["rel", "vw", "WS broadcast", "net"],
          ["lib", "col", "HTTPS", "net"],
        ],
      },
      rows: [
        ["source", "Default State", "Offline-first: acquisition, DSP, ML, and local CSV downloads never touch PiEEG servers"],
        ["runtime", "Live Relay", "Forwards frames in transit to <code>/live/:relayId</code> (up to 30 min); frames are discarded immediately, never logged"],
        ["runtime", "Cloud Library", "Browse public recordings without signing in; passwordless 6-digit email OTP unlocks uploads"],
        ["out", "Access Control", "Per-session visibility (<code>private</code>, <code>unlisted</code>, <code>public</code>), embargo dates, and collections"],
        ["out", "Deletion", "Permanent, immediate deletion of any uploaded session or Bio-Pen at any time"],
      ],
      gets: [
        "Stream a live experiment to a classroom or remote colleague via a single URL with live viewer count",
        "Inspect channel count, sample rate, duration, tags, and annotations in the browser before downloading",
        "Replay any cloud or local CSV session at 0.5× to 2× speed with full spectral and topomap views",
      ],
      note: {
        h: "Transit vs storage",
        p: "Live Relay (Fly.io London) is strictly pass-through in RAM. Uploaded Library sessions are stored on DigitalOcean Spaces (London) only when you explicitly upload them.",
      },
      panel: {
        mode: "console",
        title: "Relay & Library activity",
        note: "Opt-in session publishing and live relay state",
        gen: "relay",
      },
      links: [
        { t: "Browse Cloud Library", h: "https://cloud.pieeg.com/library", ext: true, primary: true },
        { t: "Privacy Architecture", h: "https://cloud.pieeg.com/privacy", ext: true },
      ],
    },
    {
      id: "buddy",
      name: "Buddy AI Agent",
      meta: "buddy.pieeg.com",
      badge: "Browser AI Copilot",
      fam: "ai",
      tagline: "Read-only tool-calling agent over your client-side neural cascade",
      filters: ["ai", "analyze"],
      summary:
        "Buddy pairs a live brain panel with a 100% browser-based LLM loop. A 4-tier perception cascade reduces 250 Hz µV samples into language-sized facts. The model queries 10 read-only tools on demand using your own API key (or local Ollama / LM Studio).",
      caption:
        "250 Hz Stream → 4-Tier Cascade (T0-T3) → 10 Read-Only Tools → Direct LLM Call (BYO Key / Local)",
      scene: {
        nodes: [
          { id: "str", c: 1, t: "Board or Demo", s: "BLE, Serial, or synth", ic: "chip", part: "source" },
          { id: "cas", c: 2, t: "Perception Cascade", s: "T0 raw → T3 events", ic: "wave", part: "runtime" },
          { id: "tl", c: 3, t: "10 Read-Only Tools", s: "state, spectrum, LORO", ic: "robot", part: "runtime", core: true },
          { id: "llm", c: 4, t: "Your LLM Provider", s: "Anthropic, OpenAI, Ollama", ic: "net", part: "out" },
          { id: "pat", c: 4, t: "Pattern Trainer", s: "L2 + group-lasso CV", ic: "code", part: "out" },
        ],
        links: [
          ["str", "cas", "250 Hz", "air"],
          ["cas", "tl", "1 Hz facts", "wire"],
          ["tl", "llm", "JSON tools", "ai"],
          ["cas", "pat", "epochs", "wire"],
        ],
      },
      rows: [
        ["source", "Rate Bridge", "Solves the mismatch between 250-500 Hz EEG and ~1 Hz LLM reasoning; raw samples are never sent to the model"],
        ["runtime", "Tools", "<code>get_neural_state</code>, <code>get_band_powers</code>, <code>analyze_spectrum</code>, <code>find_artifacts</code>, <code>get_channel_quality</code>, <code>connectivity</code>, <code>explain_pattern</code>"],
        ["runtime", "Pattern ML", "Contrastive rest vs active training with L2 + group-lasso electrode sparsity and Leave-One-Rep-Out CV"],
        ["out", "Providers", "Anthropic, OpenAI, Groq, Together AI, local Ollama, local LM Studio, or built-in no-key Echo mode"],
        ["out", "Privacy", "API requests go directly from your browser tab to your chosen provider; zero PiEEG server hop"],
      ],
      gets: [
        "Individual alpha peak (IAF), 1/f aperiodic slope, spectral entropy, and frontal alpha asymmetry on query",
        "Cross-channel amplitude coupling (Pearson r over log band-power envelopes)",
        "Explicit warming_up flag and channel quality checks before the agent draws any conclusion",
      ],
      note: {
        h: "Observational by design",
        p: "Every tool in Buddy is read-only. It inspects and explains within-session state, quality, and trained patterns; it never mutates hardware registers.",
      },
      panel: {
        mode: "chat",
        title: "Buddy tool-grounded dialogue",
        note: "Simulated multi-turn tool call in buddy.pieeg.com",
        script: "buddy",
      },
      links: [
        { t: "Open Buddy", h: "https://buddy.pieeg.com/", ext: true, primary: true },
        { t: "Buddy Documentation", h: "https://docs.pieeg.com/cloud/buddy/", ext: true },
      ],
    },
    {
      id: "sdk",
      name: "pieeg.js & bioIDE",
      meta: "Zero-dep Browser SDK",
      badge: "Developer SDK",
      fam: "build",
      tagline: "Single-file Web Bluetooth/Serial SDK and in-browser JS IDE",
      filters: ["build", "acquire"],
      summary:
        "Want to build your own web app outside the Cloud dashboard? pieeg.js is a zero-dependency JavaScript library that pairs IronBCI, Octopus-16, or IronBCI-32 from a user gesture and runs the identical Hampel + Butterworth + FFT chain.",
      caption:
        "Hardware or Mock → pieeg.js (1 file, 0 deps) → Your Web App or ide.pieeg.com",
      scene: {
        nodes: [
          { id: "hw", c: 1, t: "BLE / USB Boards", s: "IronBCI, Octopus, 32-ch", ic: "chip", part: "source" },
          { id: "sdk", c: 2, t: "pieeg.js", s: "connectBLE / connectSerial", ic: "code", part: "runtime", core: true },
          { id: "flt", c: 3, t: "Built-in DSP", s: "Hampel → IIR → 256 FFT", ic: "wave", part: "runtime" },
          { id: "app", c: 4, t: "Your Web App", s: "React, Vue, vanilla JS", ic: "browser", part: "out" },
          { id: "ide", c: 4, t: "bioIDE", s: "ide.pieeg.com + TF.js", ic: "code", part: "out" },
        ],
        links: [
          ["hw", "sdk", "gesture", "air"],
          ["sdk", "flt", "samples", "wire"],
          ["flt", "app", "onBandPowers", "wire"],
          ["flt", "ide", "EEG, bio, tf", "wire"],
        ],
      },
      rows: [
        ["source", "Devices", "<code>ironbci-8</code>, <code>ironbci-16</code>, <code>octopus-16</code> (Web Bluetooth), <code>ironbci-32</code> (Web Serial)"],
        ["runtime", "Install", "Single CDN <code>&lt;script&gt;</code> tag from jsDelivr or <code>npm install pieeg-club/PiEEG-server</code>"],
        ["runtime", "Callbacks", "<code>onData(samples)</code>, <code>onBandPowers(bands)</code>, <code>getFocusIndex()</code>, <code>getRelaxationIndex()</code>"],
        ["out", "bioIDE", "<code>ide.pieeg.com</code> injects <code>EEG</code>, <code>bio</code>, TensorFlow.js (<code>tf</code>), and <code>plot()</code> in a Worker"],
      ],
      gets: [
        "Matches the PiEEG Server and Cloud dashboard filter chain out of the box",
        "Live runtime reconfiguration via setBandpass(), setNotch(), and setHampel()",
        "Zero build step required for static HTML demos, hackathon prototypes, or classroom labs",
      ],
      note: {
        h: "User gesture required",
        p: "Browsers enforce that connectBLE() and connectSerial() run inside a click handler. Calling them on page load throws a SecurityError.",
      },
      panel: {
        mode: "console",
        title: "pieeg.js browser session",
        note: "Connecting Octopus-16 and streaming band powers",
        gen: "sdk",
      },
      links: [
        { t: "JavaScript SDK Docs", h: "https://docs.pieeg.com/software/api/javascript-sdk/", ext: true, primary: true },
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
  const svg = $("#cloud-scene");

  const ICONS = {
    chip: "M4,4h10v10H4Z M6.5,1.5v2.5 M11.5,1.5v2.5 M6.5,14v2.5 M11.5,14v2.5 M1.5,6.5h2.5 M1.5,11.5h2.5 M14,6.5h2.5 M14,11.5h2.5",
    server: "M2,3h14v4.5H2Z M2,10.5h14V15H2Z M5,5.2h0.01 M5,12.7h0.01",
    browser: "M2,3h14v12H2Z M2,6.5h14 M4.3,4.75h0.01 M6.3,4.75h0.01",
    cloud: "M5.2,14a3.7,3.7 0 0 1 0.4,-7.4a4.6,4.6 0 0 1 8.7,1.5a3,3 0 0 1 -0.6,5.9Z",
    plug: "M6,2v4 M12,2v4 M3.5,6h11v3a5.5,5.5 0 0 1 -11,0Z M9,14.5V17",
    code: "M6.5,5.5L2.5,9l4,3.5 M11.5,5.5L15.5,9l-4,3.5",
    wave: "M1.5,9q2.2,-6 4.4,0t4.4,0t4.4,0",
    game: "M2.5,6.5h13a2,2 0 0 1 2,2v3a2,2 0 0 1 -2,2h-2l-1.6,-2h-5.8L4.5,13.5h-2a2,2 0 0 1 -2,-2v-3a2,2 0 0 1 2,-2Z",
    net: "M9,2.5a2,2 0 1 1 0,0.01 M3.5,14a2,2 0 1 1 0,0.01 M14.5,14a2,2 0 1 1 0,0.01 M8,4.4L4.4,11.9 M10,4.4L13.6,11.9 M5.6,15h6.8",
    disk: "M2.5,3.5h13v11h-13Z M5.5,3.5v4h7v-4 M9,10.5a2,2 0 1 1 0,0.01",
    robot: "M9,1.5v2 M4,3.5h10a1.5,1.5 0 0 1 1.5,1.5v7a1.5,1.5 0 0 1 -1.5,1.5H4a1.5,1.5 0 0 1 -1.5,-1.5V5A1.5,1.5 0 0 1 4,3.5Z M6.3,7.8h0.01 M11.7,7.8h0.01 M6.5,11h5",
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
    $("#cloud-lCap").innerHTML = `<text x="28" y="26" class="t-cap">${part.caption}</text>`;

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
    $("#cloud-lLinks").innerHTML = lh;

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
    $("#cloud-lNodes").innerHTML = nh;

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
    $("#cloud-legend").innerHTML =
      kinds.map((k) => `<span><i style="background:${LK[k].c}"></i>${LK[k].name}</span>`).join("") +
      `<span class="hint" style="margin-left:auto;color:var(--dim)">Hover a spec row to trace it. Boxes with an arrow switch surface.</span>`;
  }

  const tip = $("#cloud-tip");
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
  const f2 = (v) => v.toFixed(2),
    f3 = (v) => v.toFixed(3);

  const GEN = {
    livelab: (t) => {
      const s = sim(t),
        k = frameN++ % 6;
      if (k === 0)
        return `<span class="c">// Stage 1: Spatial CAR + detrend (15 Hz worker tick)</span>`;
      if (k === 1)
        return `<span class="hl">const</span> clean = <span class="k">car</span>(win); <span class="k">check</span>(Math.abs(<span class="k">mean</span>(clean[0])) &lt; 1e-3, <span class="s">"DC ~ 0 uV"</span>);`;
      if (k === 2)
        return `<span class="c">stage 2 →</span> <span class="k">psd</span>(clean[0], <span class="n">250</span>, <span class="n">45</span>)  peakHz: <span class="n">${(9.8 + s.Alpha * 1.4).toFixed(1)}</span> Hz`;
      if (k === 3)
        return `<span class="c">stage 3 →</span> <span class="k">lda</span>(dataset.X, dataset.y, <span class="n">0.25</span>)  pred: <span class="s">"active"</span> (<span class="n">${f2(0.72 + s.Alpha * 0.2)}</span>)`;
      if (k === 4)
        return `<span class="hl">loroCV</span>(X, y, reps)  balancedAcc: <span class="n">0.88</span>  <span class="c">(sample k-fold: 0.96, leakage +0.08)</span>`;
      return `<span class="c">saved →</span> <span class="s">https://cloud.pieeg.com/lab/8f3a9c12</span>  <span class="c">[X-Pen-Token stored]</span>`;
    },
    neuralstream: (t) => {
      const s = sim(t),
        k = frameN++ % 6;
      if (k === 0)
        return `<span class="c">bridge P2P</span>  code <span class="hl">A3K9M2</span>  DTLS <span class="n">connected</span>  <span class="c">→ 127.0.0.1:7000</span>`;
      if (k === 1)
        return `<span class="s">/pieeg/focus</span>       <span class="n">${f3(s.focus)}</span>   <span class="s">/pieeg/relax</span>   <span class="n">${f3(s.relax)}</span>`;
      if (k === 2)
        return `<span class="s">/pieeg/alpha</span>       <span class="n">${f3(s.Alpha)}</span>   <span class="s">/pieeg/beta</span>    <span class="n">${f3(s.Beta)}</span>`;
      if (k === 3)
        return `<span class="s">/pieeg/ch1/level</span>   <span class="n">${(11 + s.Beta * 18).toFixed(2)}</span>   <span class="s">/pieeg/ch1/alpha</span> <span class="n">${f3(s.Alpha * 1.05)}</span>`;
      if (k === 4)
        return `<span class="s">/pieeg/blink</span>       <span class="n">${k % 3 === 0 ? "1" : "0"}</span>       <span class="c">rate 20 Hz · 24/128 params</span>`;
      return `<span class="c">TouchDesigner OSC In CHOP: 24 channels active, 0 dropped</span>`;
    },
    calibration: (t) => {
      const s = sim(t),
        k = frameN++ % 5;
      if (k === 0)
        return `<span class="c">montage</span> <span class="hl">Octopus-16</span> (occipital)  fs=<span class="n">250</span> Hz  notch=<span class="n">60</span> Hz`;
      if (k === 1)
        return `<span class="n">●</span> O1   status=<span class="s">good</span>      SNR=<span class="n">${(14.2 + s.Alpha * 4).toFixed(1)}</span> dB  line=<span class="n">1.8</span>%  pp=<span class="n">34</span> µV`;
      if (k === 2)
        return `<span class="n">●</span> O2   status=<span class="s">good</span>      SNR=<span class="n">${(13.8 + s.Alpha * 3).toFixed(1)}</span> dB  line=<span class="n">2.1</span>%  pp=<span class="n">31</span> µV`;
      if (k === 3)
        return `<span class="s">●</span> Pz   status=<span class="s">marginal</span>  SNR=<span class="n">6.4</span> dB   line=<span class="n">8.9</span>%  pp=<span class="n">78</span> µV <span class="c">(reseat pin)</span>`;
      return `<span class="c">15/16 pads green · 3D geodesic field coverage 0.94</span>`;
    },
    mock: (t) => {
      const k = frameN++ % 6;
      if (k === 0) return `<span class="c"># Mock Studio rule program (demo:program)</span>`;
      if (k === 1) return `<span class="k">board</span> <span class="n">16</span>ch <span class="n">250</span>Hz`;
      if (k === 2)
        return `<span class="k">bg</span>  delta <span class="n">12</span>  theta <span class="n">9</span>  alpha <span class="n">18</span>  noise <span class="n">6</span>  drift <span class="n">5</span>`;
      if (k === 3)
        return `<span class="hl">blink</span> every <span class="n">2.5</span>s  duration <span class="n">240</span>ms  amp <span class="n">160</span>  frontal`;
      if (k === 4)
        return `<span class="hl">band</span> alpha  amp <span class="n">25</span>  occipital`;
      const ch = [0, 1, 2].map((i) => `<span class="n">${uv(t, i)}</span>`).join(", ");
      return `<span class="c">emit →</span> {<span class="k">"n"</span>: <span class="n">${frameN}</span>, <span class="k">"channels"</span>: [${ch}, <span class="c">… 13 more</span>]} µV`;
    },
    relay: (t) => {
      const k = frameN++ % 5;
      if (k === 0)
        return `<span class="c">default</span>  raw EEG stays in browser memory  <span class="n">0</span> bytes uploaded`;
      if (k === 1)
        return `<span class="hl">startRelay()</span> → <span class="s">https://cloud.pieeg.com/live/r_9k2m4p</span> <span class="c">(transit only)</span>`;
      if (k === 2)
        return `<span class="c">relay status</span>  running=<span class="n">true</span>  viewers=<span class="n">4</span>  stored=<span class="n">false</span>`;
      if (k === 3)
        return `<span class="hl">uploadRecording()</span>  16ch · 250 Hz · 180s  visibility=<span class="s">"unlisted"</span>`;
      return `<span class="c">library</span>  session <span class="s">ses_41f8</span> ready for in-browser replay &amp; CSV export`;
    },
    sdk: (t) => {
      const s = sim(t),
        k = frameN++ % 6;
      if (k === 0)
        return `<span class="hl">const</span> pieeg = <span class="hl">new</span> <span class="k">PiEEG</span>({ filter: { notch: <span class="n">60</span> } });`;
      if (k === 1)
        return `<span class="hl">await</span> pieeg.<span class="k">connectBLE</span>({ device: <span class="s">'octopus-16'</span> });`;
      if (k === 2)
        return `<span class="c">// Connected: Octopus 16 · 16 ch @ 250 Hz · Hampel + 1-40 Hz IIR</span>`;
      if (k === 3)
        return `pieeg.<span class="k">onBandPowers</span>(b =&gt; console.log(b.Alpha, pieeg.<span class="k">getFocusIndex</span>()));`;
      return `Alpha <span class="n">${f2(s.Alpha)}</span>  Beta <span class="n">${f2(s.Beta)}</span>   focus <span class="n">${f2(s.focus)}</span>  relax <span class="n">${f2(s.relax)}</span>`;
    },
  };

  const BANDS = [
    ["Delta", "δ", "#8b5cf6", "0.5-4 Hz"],
    ["Theta", "θ", "#06b6d4", "4-8 Hz"],
    ["Alpha", "α", "#22c55e", "8-13 Hz"],
    ["Beta", "β", "#f59e0b", "13-30 Hz"],
    ["Gamma", "γ", "#ef4444", "30-100 Hz"],
  ];

  const SCRIPTS = {
    buddy: [
      ["you", "how is my signal on the occipital channels?"],
      ["Buddy", "All 16 channels read good (quality 0.96, line ratio 1.9%). O1 and O2 are clean."],
      ["you", "analyze my alpha rhythm right now"],
      ["Buddy", "IAF: 10.3 Hz · relative alpha: 0.68 (dominant) · 1/f slope: -1.14 · spectral entropy: 0.64. Within-session reading, not clinical."],
      ["you", "is my trained pattern firing?"],
      ["Buddy", "\"eyes_closed_calm\" is active (p = 0.89). Trained with LORO-CV balanced accuracy 0.91; top group-lasso weights on O1 and O2."],
    ],
  };

  let panel = { mode: null },
    conLines = [],
    conTimer = 0,
    chatState = null;

  function buildPanel(p) {
    const b = $("#cloud-panelBody");
    panel = { mode: p.panel.mode, cfg: p.panel };
    $("#cloud-panelTitle").textContent = p.panel.title;
    $("#cloud-panelNote").textContent = p.panel.note;
    conLines = [];
    conTimer = 0;
    frameN = 18400;

    if (p.panel.mode === "console") {
      b.innerHTML = `<div class="console" id="cloud-con"></div>`;
      for (let i = 0; i < 6; i++) {
        conLines.push(GEN[p.panel.gen](simT - 1 + i * 0.15));
      }
      paintConsole();
    } else if (p.panel.mode === "bands") {
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
    } else {
      b.innerHTML = `<div class="chat" id="cloud-chat"></div>`;
      chatState = { script: SCRIPTS[p.panel.script], i: 0, chars: 0, wait: 0.35, node: null };
      if (reduce) {
        chatState = null;
        b.querySelector("#cloud-chat").innerHTML = SCRIPTS[p.panel.script]
          .map(
            ([who, tx]) => `<div class="msg ${who === "you" ? "you" : "bot"}"><span class="who">${who}</span>${tx}</div>`,
          )
          .join("");
      }
    }
  }

  function paintConsole() {
    const c = $("#cloud-con");
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

  function tickChat(dt) {
    const box = $("#cloud-chat");
    if (!box || !chatState || state.paused) return;
    const cs = chatState;
    if (cs.wait > 0) {
      cs.wait -= dt;
      return;
    }
    if (cs.i >= cs.script.length) {
      cs.wait = 3.4;
      cs.i = 0;
      box.innerHTML = "";
      return;
    }
    const [who, text] = cs.script[cs.i];
    if (!cs.node) {
      const d = document.createElement("div");
      d.className = "msg " + (who === "you" ? "you" : "bot");
      d.innerHTML = `<span class="who">${who}</span><span class="tx"></span><span class="caret"></span>`;
      box.appendChild(d);
      while (box.children.length > 3) box.removeChild(box.firstChild);
      cs.node = d.querySelector(".tx");
      cs.chars = 0;
    }
    cs.chars += dt * (reduce ? 9999 : 54);
    const shown = text.slice(0, Math.floor(cs.chars));
    cs.node.textContent = shown;
    if (shown.length >= text.length) {
      const car = cs.node.parentElement.querySelector(".caret");
      if (car) car.remove();
      cs.node = null;
      cs.i++;
      cs.wait = 0.9;
    }
  }

  const state = { part: null, filter: "all", focus: null, layer: null, paused: false };

  function renderRail() {
    const rail = $("#cloud-rail");
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
    dashboard: "Chromium tab (Web Bluetooth / Web Serial) or any browser via WebSocket",
    livelab: "Dedicated Web Worker at 15 Hz inside cloud.pieeg.com/lab",
    neuralstream: "Browser WebRTC P2P data channel → Local Bridge on your machine",
    calibration: "In-tab signal quality evaluator & Three.js geodesic head shader",
    mock: "In-tab synthetic waveform compositor (cloud.pieeg.com/mock)",
    relay: "Opt-in Fly.io transit relay & DigitalOcean Spaces session store",
    buddy: "100% browser tab at buddy.pieeg.com with your own LLM API key",
    sdk: "Any web page importing pieeg.js or inside ide.pieeg.com",
  };

  const LAYERS = [
    ["all", "Everything", "#d6dae0"],
    ["source", "Signal input", "#9aa2ad"],
    ["runtime", "In-tab runtime", "#d6dae0"],
    ["out", "Output surface", "#7fb2ff"],
  ];

  function renderBar(p) {
    $("#cloud-layers").innerHTML = LAYERS.map(([k, label, c]) => {
      const col = k === "source" ? FAMILY[p.fam] : c;
      return `<button data-layer="${k}" aria-pressed="${(state.layer || "all") === k}" style="--c:${col}"><i></i>${label}</button>`;
    }).join("");
    $("#cloud-layers")
      .querySelectorAll("button")
      .forEach((b) =>
        b.addEventListener("click", () => {
          state.layer = b.dataset.layer === "all" ? null : b.dataset.layer;
          $("#cloud-layers")
            .querySelectorAll("button")
            .forEach((x) => x.setAttribute("aria-pressed", x === b));
          state.focus = state.layer;
          applyFocus();
        }),
      );
    $("#cloud-hostWrap").innerHTML = `<span class="seg-label">Runs in</span><span class="lock">${HOST[p.id]}</span>`;
  }

  function renderSpec(p) {
    const pc = { source: FAMILY[p.fam], runtime: "#d6dae0", out: "#7fb2ff", link: "#45dd8b" };
    $("#cloud-spec").innerHTML = `
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

  $("#cloud-pause").addEventListener("click", (e) => {
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
    } else if (panel.mode === "chat") tickChat(dt);
  }

  renderRail();
  select("dashboard");
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
