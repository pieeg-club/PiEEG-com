/* Interactive PiEEG XR Architecture Bench - follows the home-bench instrument design. */

/**
 * @param {HTMLElement | null} root
 * @returns {() => void}
 */
export function mountXrBench(root) {
  if (!root) return () => {};
  let raf = 0;
  let stopped = false;
  let visible = true;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const FAMILY = {
    hardware: "#a78bfa",
    decode: "#22d3ee",
    avatar: "#34d399",
    osc: "#f59e0b",
    scene: "#38bdf8",
  };

  const LK = {
    skin: { c: "#34d399", name: "Dry Ag/AgCl contact" },
    spi: { c: "#7fb2ff", name: "Internal SPI / DMA" },
    air: { c: "#b690ff", name: "BLE 5 (250 SPS)" },
    wire: { c: "#38bdf8", name: "In-tab / Worker DSP" },
    osc: { c: "#ffae42", name: "UDP OSC / WebRTC" },
  };

  const PARTS = [
    {
      id: "gasket",
      name: "Mask & IronBCI AFE",
      meta: "10 Ag/AgCl · BLE 5",
      badge: "Hardware Layer",
      fam: "hardware",
      tagline: "Silicone facial gasket + strap-mounted 24-bit ADS1299 / STM32WB box",
      filters: ["hardware"],
      summary:
        "The silicone mask replaces the headset's facial interface and places ten flat dry silver-silver chloride (Ag/AgCl) pads against the forehead, temples, and cheeks (8 active + REF + BIAS). A compact box under the head strap houses the IronBCI analog front-end and streams 24-bit samples at 250 SPS over Bluetooth LE 5.",
      caption:
        "10 Dry Ag/AgCl Pads → ADS1299 (24-bit, 1.0 µVpp) → STM32WB Dual-Core BLE 5 → Cloud / Server / Headset",
      scene: {
        nodes: [
          { id: "pads", c: 1, t: "10 Ag/AgCl Pads", s: "8 active + REF + BIAS", ic: "chip", part: "source" },
          { id: "pwr", c: 1, t: "5 V Battery USB-C", s: "isolated supply only", ic: "plug", part: "source" },
          { id: "ads", c: 2, t: "ADS1299 AFE", s: "24-bit · 250 SPS · 1 µVpp", ic: "chip", part: "runtime", core: true },
          { id: "mcu", c: 3, t: "STM32WB MCU", s: "Cortex-M4 + M0+ BLE 5", ic: "server", part: "runtime" },
          { id: "cloud", c: 4, t: "PiEEG Cloud", s: "Web Bluetooth in-tab", ic: "browser", part: "out", go: "facetrainer" },
          { id: "srv", c: 4, t: "pieeg-server", s: "--device ironbci8", ic: "server", part: "out", go: "osc" },
          { id: "bp", c: 4, t: "BodyPress XR", s: "native headset BLE", ic: "game", part: "out", go: "webxr" },
        ],
        links: [
          ["pads", "ads", "biopotential", "skin"],
          ["pwr", "ads", "5 V DC", "spi"],
          ["ads", "mcu", "SPI DRDY", "spi"],
          ["mcu", "cloud", "BLE 5", "air"],
          ["mcu", "srv", "BLE 5", "air"],
          ["mcu", "bp", "BLE 5", "air"],
        ],
      },
      rows: [
        ["source", "Electrodes", "10 flat dry Ag/AgCl pads on silicone gasket (forehead Fp1/Fp2, temples, zygomatic cheeks, REF, BIAS)"],
        ["runtime", "Converter", "Texas Instruments <code>ADS1299</code>, 24-bit simultaneous sampling at 250 SPS, <code>1.0 µVpp</code> input-referred noise"],
        ["runtime", "Wireless MCU", "<code>STM32WB</code> dual-core ARM Cortex-M4 (application) + Cortex-M0+ (dedicated BLE 5 radio stack)"],
        ["out", "Advertised Name", "Broadcasts as <code>PiEEG XR</code> (8-ch) or <code>PiEEG XR-16</code> (16-ch) over Bluetooth Low Energy"],
        ["out", "Power Isolation", "Powered strictly from a 5 V USB-C battery bank or the headset battery; never connect to mains wall power"],
      ],
      gets: [
        "Four-buckle snap-in replacement for the stock facial interface (or removable silicone insert)",
        "Captures three signal families simultaneously: frontal EEG, corneal-retinal EOG blinks, and facial surface EMG",
        "ST-Link programmer included in kit for SWD firmware updates via STM32CubeProgrammer",
        "Open-source hardware docs, firmware, and 3D-printable enclosure (Thingiverse thing:7392535)",
      ],
      note: {
        h: "Blink sanity check",
        p: "Before launching any decoder, run a 1-second hard blink test. Forehead pads should show a clear 100-300 µV deflection; if all channels drift together, reseat the REF and BIAS pads first.",
      },
      panel: {
        mode: "console",
        title: "BLE 5 packet & contact telemetry",
        note: "Simulated 250 SPS frames from the strap-mounted IronBCI box",
        gen: "gasket",
      },
      links: [
        { t: "PiEEG XR Hardware & Guide", h: "/hardware/pieeg-xr", primary: true },
        { t: "Hardware GitHub Repo", h: "https://github.com/pieeg-club/PiEEG_XR_Hardware", ext: true },
      ],
    },
    {
      id: "facetrainer",
      name: "Face Trainer v2 (fEMG)",
      meta: "CAR · 40-D · LORO-CV",
      badge: "Expression Decoder",
      fam: "decode",
      tagline: "Placement-agnostic facial EMG classifier with per-electrode importance",
      filters: ["decode", "avatar"],
      summary:
        "No two masks sit identically on every face. Face Trainer v2 applies Common-Average Reference across all 8 channels, extracts 5 time/spectral features per channel (40-D vector at 12 Hz), and fits a per-expression L2 + group-lasso logistic detector evaluated with Leave-One-Rep-Out cross-validation.",
      caption:
        "8-ch Raw µV → Common-Average Reference → 40-D Feature Window (200 ms @ 12 Hz) → L2 + Group-Lasso → Blendshapes",
      scene: {
        nodes: [
          { id: "raw", c: 1, t: "8-ch Mask Stream", s: "250 SPS µV", ic: "wave", part: "source", go: "gasket" },
          { id: "car", c: 2, t: "Spatial CAR", s: "removes global common mode", ic: "wave", part: "runtime" },
          { id: "feat", c: 2, t: "40-D Features", s: "5 metrics × 8 ch @ 12 Hz", ic: "code", part: "runtime", core: true },
          { id: "gl", c: 3, t: "L2 + Group-Lasso", s: "sparse channel weights", ic: "chip", part: "runtime" },
          { id: "loro", c: 3, t: "LORO-CV Audit", s: "split by rep, not sample", ic: "disk", part: "runtime" },
          { id: "imp", c: 4, t: "Channel Importance", s: "L2 norm per electrode", ic: "browser", part: "out" },
          { id: "vrm", c: 4, t: "Live Blendshapes", s: "additive FREE mode", ic: "game", part: "out", go: "avatar" },
        ],
        links: [
          ["raw", "car", "250 Hz", "wire"],
          ["car", "feat", "200 ms win", "wire"],
          ["feat", "gl", "40-D", "wire"],
          ["feat", "loro", "rep folds", "wire"],
          ["gl", "imp", "||w_ch||₂", "wire"],
          ["gl", "vrm", "posterior p", "wire"],
        ],
      },
      rows: [
        ["source", "Protocol", "Guided reps (rest 1.5s → ramp → HOLD 2.0s → rest); HOLD windows = positive class, quiet baseline = negative"],
        ["runtime", "5 Features / Ch", "Log RMS, log variance, log line-length, slope-sign-change rate, and log high-band RMS (5 × 8 = 40-D)"],
        ["runtime", "Regularisation", "Ridge (L2) keeps weights well-conditioned; Group-Lasso sums L2 norm per 5-feature channel block"],
        ["out", "LORO-CV Score", "Splits strictly by repetition to prevent temporal autocorrelation leakage; reports balanced accuracy"],
        ["out", "Explainability", "Displays per-electrode importance bars so you see which pads drive smile, brow raise, wink, or clench"],
      ],
      gets: [
        "Adapts to wherever the 8 dry electrodes make contact on the wearer's face",
        "Drives unhelpful channels to zero rather than overfitting background noise",
        "Readiness bar color-coded by LORO-CV balanced accuracy (<0.70 red, 0.70-0.85 amber, ≥0.85 green)",
        "Trains in under 500 ms in TypeScript inside the browser tab with localStorage persistence",
      ],
      note: {
        h: "Why LORO-CV instead of random k-fold",
        p: "Adjacent 200 ms windows within the same 2-second muscle hold share slow drift and envelope state. Splitting by repetition gives an honest within-session readiness score.",
      },
      panel: {
        mode: "console",
        title: "Face Trainer v2 calibration & live decode",
        note: "Simulated 40-D group-lasso fit and LORO-CV audit",
        gen: "facetrainer",
      },
      links: [
        { t: "Launch Face Trainer v2", h: "https://cloud.pieeg.com/experiences/face-trainer-v2", ext: true, primary: true },
        { t: "Open Cloud Experiences", h: "https://cloud.pieeg.com/experiences", ext: true },
      ],
    },
    {
      id: "avatar",
      name: "Avatar Neurofeedback v2",
      meta: "Spectral + Artifact",
      badge: "Affective Studio",
      fam: "avatar",
      tagline: "Contrastive Cohen's d feature ranking and Figma-style link editor",
      filters: ["decode", "avatar"],
      summary:
        "Avatar Foundation v2 fuses two parallel pipelines: a 256-sample FFT spectral pipeline (log δ θ α β γ band powers) and a time-domain artifact envelope pipeline (rectified + smoothed transients for blinks and jaw). A two-state contrastive trainer ranks all channel × band pairs by within-session Cohen's d.",
      caption:
        "256-pt FFT + Envelope → Contrastive Trainer (Welford Cohen's d) → Link Studio → VRM Avatar & OSC",
      scene: {
        nodes: [
          { id: "fft", c: 1, t: "Spectral Pipeline", s: "256-pt FFT log δθαβγ", ic: "wave", part: "source" },
          { id: "env", c: 1, t: "Artifact Envelope", s: "rectified + EMA", ic: "wave", part: "source" },
          { id: "cal", c: 2, t: "Contrastive Trainer", s: "20s baseline vs 20s active", ic: "code", part: "runtime", core: true },
          { id: "link", c: 3, t: "Mapping Studio", s: "gain, EMA, invert, range", ic: "plug", part: "runtime" },
          { id: "vrm", c: 4, t: "3D VRM Avatar", s: "blendshapes + aura glow", ic: "game", part: "out" },
          { id: "osc", c: 4, t: "VRChat OSC Out", s: "/avatar/parameters/*", ic: "net", part: "out", go: "osc" },
        ],
        links: [
          ["fft", "cal", "Welford", "wire"],
          ["env", "cal", "SNR rank", "wire"],
          ["cal", "link", "Cohen's d", "wire"],
          ["link", "vrm", "[0..1]", "wire"],
          ["link", "osc", "UDP / P2P", "osc"],
        ],
      },
      rows: [
        ["source", "Dual Pipelines", "Spectral log band power (<code>useChannelBandPowers</code>) + time-domain envelope (<code>useArtifactEnvelopes</code>)"],
        ["runtime", "Contrastive Rank", "Online Welford mean/variance over 20s quiet baseline vs 20s target state; ranks all features by <code>|d|</code>"],
        ["runtime", "Linear Mapping", "<code>(x - μ_base) / (μ_active - μ_base)</code> clamped to <code>[0, 1]</code> with per-link gain, inversion, and EMA smoothing"],
        ["out", "Targets", "Drives VRM facial blendshapes in-browser or forwards normalized floats to VRChat over OSC"],
      ],
      gets: [
        "Auto-selects the highest effect-size channel/band for your specific headset fit",
        "Hybrid links let slow alpha/theta state modulate aura glow while fast EOG/fEMG drives winks and smiles",
        "Explicitly labels Cohen's d as a within-session descriptive metric, not a cross-day generalisation claim",
      ],
      note: {
        h: "Within-session calibration",
        p: "Dry electrode impedance settles over the first few minutes of wear. Re-running a 40-second contrastive pair re-centers the baseline and active means immediately.",
      },
      panel: {
        mode: "bands",
        title: "Live spectral & affective link state",
        note: "Simulated band powers and normalized avatar parameters",
      },
      links: [
        { t: "VRChat Avatar Tutorial", h: "/tutorials/brain-reactive-vrchat-avatar", primary: true },
        { t: "Open in PiEEG Cloud", h: "https://cloud.pieeg.com/experiences", ext: true },
      ],
    },
    {
      id: "osc",
      name: "VRChat OSC & Local Bridge",
      meta: "UDP :9000 · Regions",
      badge: "Social VR",
      fam: "osc",
      tagline: "Stream global or per-region band powers and expressions into VRChat",
      filters: ["avatar", "scene"],
      summary:
        "Drive any VRChat avatar on PC VR or standalone headset over LAN. Choose either Path A (PiEEG Cloud → WebRTC P2P Local Bridge → UDP :9000) or Path B (pieeg-server --osc direct UDP). Supports both global parameters and custom brain-region channel groups.",
      caption:
        "Cloud (WebRTC P2P) or pieeg-server (--osc) → UDP :9000 → /avatar/parameters/EEG_* & /chatbox/input",
      scene: {
        nodes: [
          { id: "cld", c: 1, t: "Path A · Cloud", s: "Neural Stream / Studio", ic: "browser", part: "source", go: "avatar" },
          { id: "srv", c: 1, t: "Path B · Server", s: "pieeg-server --osc", ic: "server", part: "source" },
          { id: "br", c: 2, t: "Local Bridge", s: "5 MB Rust WebRTC→UDP", ic: "plug", part: "runtime" },
          { id: "reg", c: 2, t: "Region Groups", s: "Frontal, Occipital, Mask", ic: "code", part: "runtime", core: true },
          { id: "udp", c: 3, t: "OSC UDP :9000", s: "127.0.0.1 or headset LAN", ic: "net", part: "runtime" },
          { id: "prm", c: 4, t: "Avatar Parameters", s: "EEG_Alpha, EEG_Frontal_*", ic: "game", part: "out" },
          { id: "box", c: 4, t: "VRChat Chatbox", s: "/chatbox/input bubble", ic: "browser", part: "out" },
        ],
        links: [
          ["cld", "br", "P2P DTLS", "osc"],
          ["br", "udp", "OSC", "osc"],
          ["srv", "reg", "bands", "wire"],
          ["reg", "udp", "OSC", "osc"],
          ["udp", "prm", "float [0..1]", "osc"],
          ["udp", "box", "template", "osc"],
        ],
      },
      rows: [
        ["source", "Standard Params", "<code>/avatar/parameters/EEG_Delta</code> .. <code>EEG_Gamma</code>, <code>EEG_Focus</code>, <code>EEG_Relax</code>"],
        ["runtime", "Region Mode", "Group channels (e.g. Frontal ch0-1, Zygomatic ch4-5) → emits <code>/avatar/parameters/EEG_Frontal_Alpha</code>"],
        ["runtime", "Normalization", "Rolling 5-minute maximum normalizes each band or region to <code>[0, 1]</code> for Unity Animator blend trees"],
        ["out", "Update Rate", "Configurable <code>--osc-interval</code> (down to <code>0.016s</code> / 60 Hz for expression parameters; 1.5s for chatbox)"],
      ],
      gets: [
        "Works with standalone VRChat on headset by pointing --osc-host (or Local Bridge target) at the headset LAN IP",
        "Interactive --osc-regions-setup CLI wizard and in-dashboard VRChat OSC · Brain Regions experience",
        "Also feeds TouchDesigner, Max/MSP, Ableton, and Unity/Unreal OSC receivers",
      ],
      note: {
        h: "Two interchangeable paths",
        p: "Use Cloud + Local Bridge when you want zero Python install and visual training in the browser. Use pieeg-server --osc when you want a headless daemon or Raspberry Pi relay.",
      },
      panel: {
        mode: "console",
        title: "Live VRChat OSC packet stream",
        note: "Simulated UDP :9000 parameters and region groups",
        gen: "osc",
      },
      links: [
        { t: "Brain-Reactive VRChat Guide", h: "/tutorials/brain-reactive-vrchat-avatar", primary: true },
        { t: "Download Local Bridge", h: "https://github.com/pieeg-club/PiEEG-local-bridge/releases/latest", ext: true },
      ],
    },
    {
      id: "webxr",
      name: "WebXR, Focus & BodyPress",
      meta: "Immersive · Native BLE",
      badge: "In-Headset Apps",
      fam: "scene",
      tagline: "Run inside the headset via WebXR, floating spatial panels, or native BodyPress",
      filters: ["scene", "decode"],
      summary:
        "Inside the headset, PiEEG XR drives three classes of applications: immersive WebXR scenes (Neural Flight, 360° Premeditatio Malorum, XR Wave View), Focus-to-Action scene shaders (melt, explode, transform), and the native BodyPress VR app that pairs directly over the headset's Bluetooth stack.",
      caption:
        "PiEEG XR Stream → Focus / Calm / Blink Detectors → WebXR Scene, Floating Dashboard, or BodyPress VR",
      scene: {
        nodes: [
          { id: "ble", c: 1, t: "PiEEG XR BLE", s: "8 or 16 ch @ 250 SPS", ic: "chip", part: "source", go: "gasket" },
          { id: "det", c: 2, t: "Client Detectors", s: "useFocus, useRelax, useBlink", ic: "wave", part: "runtime", core: true },
          { id: "act", c: 3, t: "Focus-to-Action", s: "threshold + hold accumulator", ic: "code", part: "runtime" },
          { id: "flt", c: 4, t: "Neural Flight", s: "WebXR VR/AR · focus = lift", ic: "game", part: "out" },
          { id: "mlt", c: 4, t: "Melt / Transform", s: "object deformation API", ic: "globe", part: "out" },
          { id: "bp", c: 4, t: "BodyPress VR", s: "native offline headset app", ic: "browser", part: "out" },
        ],
        links: [
          ["ble", "det", "samples", "air"],
          ["det", "act", "β/(α+θ)", "wire"],
          ["act", "flt", "lift", "wire"],
          ["act", "mlt", "intensity", "wire"],
          ["ble", "bp", "direct BLE", "air"],
        ],
      },
      rows: [
        ["source", "Detectors", "Shared hooks: <code>useBandPowers</code>, <code>useFocus</code>, <code>useRelax</code>, and <code>useBlink</code>"],
        ["runtime", "Focus-to-Action", "Sustained focus index above threshold accumulates energy to deform, melt, or trigger target objects"],
        ["out", "WebXR Scenes", "Neural Flight (focus controls altitude in VR/AR), Premeditatio Malorum (360° stoic biofeedback), XRWaveView"],
        ["out", "BodyPress VR", "Native headset app (<500 MB, 100% local processing) with 3D spatial EEG monitoring and electrode health"],
      ],
      gets: [
        "Pin the PiEEG dashboard or BodyPress as a floating spatial window alongside any VR game",
        "Zero cloud dependency in BodyPress VR: all BLE decoding and visualization stay on the headset",
        "Published preprint: El Abbassi & Rakhmatulin (2026), WebXR BCI Platform for Neural-Adaptive Avatar Control",
      ],
      note: {
        h: "Stock headset browser vs Chromium",
        p: "The stock headset browser blocks Web Bluetooth. Either open http://<pc-ip>:1617 from pieeg-server in the stock browser, use BodyPress natively, or sideload ARM64 Chromium for in-headset Web Bluetooth.",
      },
      panel: {
        mode: "console",
        title: "Focus-to-Action & WebXR loop",
        note: "Simulated focus accumulator and scene state",
        gen: "webxr",
      },
      links: [
        { t: "4 Ways to Run in Headset", h: "/tutorials/run-pieeg-xr-meta-quest", primary: true },
        { t: "Sideload Chromium BLE Guide", h: "/tutorials/ble-quest-chromium-pieeg-xr" },
      ],
    },
    {
      id: "xr16",
      name: "PiEEG XR-16 (+8 Occipital)",
      meta: "8 Face + 8 Visual Cortex",
      badge: "16-Ch Edition",
      fam: "hardware",
      tagline: "Combine facial EMG & frontal EEG with 8 posterior visual-cortex electrodes",
      filters: ["hardware", "decode"],
      summary:
        "PiEEG XR-16 adds eight rear strap electrodes over the occipital and parietal cortex to the 8-channel facial gasket. Dual daisy-chained ADS1299 converters sample all 16 channels simultaneously at 24-bit / 250 SPS over BLE 5.",
      caption:
        "8 Facial Gasket Pads + 8 Occipital Strap Sensors → Dual ADS1299 (16 ch) → BLE 5 as 'PiEEG XR-16'",
      scene: {
        nodes: [
          { id: "face", c: 1, t: "8 Face Electrodes", s: "forehead, temple, cheek", ic: "chip", part: "source", go: "gasket" },
          { id: "occ", c: 1, t: "8 Occipital Sensors", s: "O1, O2, Oz, POz, P3, P4…", ic: "chip", part: "source" },
          { id: "dual", c: 2, t: "Dual ADS1299", s: "16 ch · 24-bit · 250 SPS", ic: "server", part: "runtime", core: true },
          { id: "cal", c: 3, t: "Split Montage UI", s: "face mask + rear 2D inset", ic: "browser", part: "runtime" },
          { id: "vis", c: 4, t: "Visual Cortex EEG", s: "alpha reactivity, SSVEP, P300", ic: "wave", part: "out" },
          { id: "emg", c: 4, t: "Facial EMG + EOG", s: "expressions + gaze/blinks", ic: "game", part: "out", go: "facetrainer" },
        ],
        links: [
          ["face", "dual", "ch 1-8", "skin"],
          ["occ", "dual", "ch 9-16", "skin"],
          ["dual", "cal", "BLE 5", "air"],
          ["cal", "vis", "posterior", "wire"],
          ["cal", "emg", "anterior", "wire"],
        ],
      },
      rows: [
        ["source", "Anterior (1-8)", "Same 8 facial gasket locations as PiEEG XR for fEMG micro-expressions, EOG blinks, and frontal EEG"],
        ["source", "Posterior (9-16)", "8 rear sensors positioned over visual and parietal cortex under the rear head strap"],
        ["runtime", "ADC Path", "Dual <code>ADS1299</code> converters clocked synchronously; advertises over BLE 5 as <code>PiEEG XR-16</code>"],
        ["out", "Calibration View", "PiEEG Cloud automatically renders the XR face mask alongside a dedicated back-of-head occipital inset"],
      ],
      gets: [
        "Enables true occipital alpha eyes-closed/open tests and visual evoked paradigms (P300, SSVEP) in VR",
        "Simultaneous anterior fEMG avatar control and posterior cortical monitoring in a single stream",
        "Same 5 V USB-C battery power and four-buckle gasket mount as the 8-channel PiEEG XR",
      ],
      note: {
        h: "When to choose XR-16 over XR-8",
        p: "Choose XR-8 for facial expression decoding, EOG, and frontal focus neurofeedback. Choose XR-16 when your protocol requires posterior alpha, visual cortex ERPs, or 16-channel spatial mapping.",
      },
      panel: {
        mode: "console",
        title: "XR-16 anterior + occipital diagnostic",
        note: "Simulated 16-channel face + visual cortex stream",
        gen: "xr16",
      },
      links: [
        { t: "View PiEEG XR-16", h: "/hardware/xr-16", primary: true },
        { t: "Compare with PiEEG XR (8-ch)", h: "/hardware/pieeg-xr" },
      ],
    },
  ];

  const SW = 1040,
    SH = 500,
    NW = 192,
    NH = 68,
    TOPCAP = 34;
  const $ = (s) => root.querySelector(s);
  const svg = $("#xr-scene");

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
    $("#xr-lCap").innerHTML = `<text x="28" y="26" class="t-cap">${part.caption}</text>`;

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
    $("#xr-lLinks").innerHTML = lh;

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
    $("#xr-lNodes").innerHTML = nh;

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
    $("#xr-legend").innerHTML =
      kinds.map((k) => `<span><i style="background:${LK[k].c}"></i>${LK[k].name}</span>`).join("") +
      `<span class="hint" style="margin-left:auto;color:var(--dim)">Hover a spec row to trace it. Boxes with an arrow switch surface.</span>`;
  }

  const tip = $("#xr-tip");
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
    frameN = 24100;

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
    gasket: (t) => {
      const k = frameN++ % 6;
      if (k === 0) return `<span class="c">BLE 5</span>  dev=<span class="s">"PiEEG XR"</span>  mcu=<span class="hl">STM32WB</span>  afe=<span class="hl">ADS1299</span> (24-bit)`;
      if (k === 1) return `<span class="k">pads</span>  Fp1 Fp2 F7 F8 ZyL ZyR T3 T4 + <span class="n">REF/BIAS</span> (dry Ag/AgCl)`;
      if (k === 2) return `<span class="c">noise</span>  input-referred=<span class="n">1.0</span> µVpp  rate=<span class="n">250</span> SPS  supply=<span class="s">5V battery</span>`;
      if (k === 3) return `<span class="hl">blink_check</span>  Fp1/Fp2 peak=<span class="n">184</span> µV  status=<span class="s">pass</span>`;
      if (k === 4) return `<span class="c">contact</span>  8/8 pads green  line_50_60=<span class="n">1.7</span>%`;
      const ch = [0, 1, 2, 3].map((i) => `<span class="n">${uv(t, i)}</span>`).join(", ");
      return `<span class="c">pkt</span>  n=<span class="n">${24100 + Math.floor(t * 250)}</span>  [${ch}, …] µV`;
    },
    facetrainer: (t) => {
      const s = sim(t),
        k = frameN++ % 6;
      if (k === 0) return `<span class="c">// Face Trainer v2 · 200 ms window @ 12 Hz · CAR enabled</span>`;
      if (k === 1) return `<span class="hl">features</span>  5 × 8 ch = <span class="n">40</span>-D  [logRMS, logVar, logLL, SSC, hiRMS]`;
      if (k === 2) return `<span class="k">fit</span>  expr=<span class="s">"smile"</span>  penalty=<span class="hl">L2 + group_lasso</span>  reps=<span class="n">6</span>`;
      if (k === 3) return `<span class="hl">loroCV</span>  balanced_acc=<span class="n">0.91</span>  <span class="c">(ready ≥ 0.85)</span>`;
      if (k === 4) return `<span class="k">importance</span>  ZyL=<span class="n">0.44</span>  ZyR=<span class="n">0.41</span>  F7=<span class="n">0.09</span>  Fp1=<span class="n">0.00</span> (sparsified)`;
      return `<span class="c">live →</span>  p(smile)=<span class="n">${f2(0.74 + s.Beta * 0.2)}</span>  p(brow_raise)=<span class="n">0.06</span>`;
    },
    osc: (t) => {
      const s = sim(t),
        k = frameN++ % 6;
      if (k === 0) return `<span class="c">OSC target</span>  <span class="s">127.0.0.1:9000</span>  mode=<span class="hl">regions + parameters</span>`;
      if (k === 1) return `<span class="s">/avatar/parameters/EEG_Frontal_Beta</span>    <span class="n">${f3(s.Beta)}</span>`;
      if (k === 2) return `<span class="s">/avatar/parameters/EEG_Frontal_Alpha</span>   <span class="n">${f3(s.Alpha)}</span>`;
      if (k === 3) return `<span class="s">/avatar/parameters/XR_Smile</span>            <span class="n">${f3(0.18 + s.focus * 0.7)}</span>`;
      if (k === 4) return `<span class="s">/avatar/parameters/XR_Blink</span>            <span class="n">${k % 2 === 0 ? "0" : "1"}</span>`;
      return `<span class="c">/chatbox/input</span>  <span class="s">"🧠 Focus ${(s.focus * 100).toFixed(0)}% · α/β ${f2(s.Alpha / (s.Beta + 0.05))}"</span>`;
    },
    webxr: (t) => {
      const s = sim(t),
        k = frameN++ % 5;
      if (k === 0) return `<span class="c">WebXR session</span>  mode=<span class="hl">immersive-vr</span>  fps=<span class="n">72</span>`;
      if (k === 1) return `<span class="k">useFocus()</span>  score=<span class="n">${f2(s.focus)}</span>  threshold=<span class="n">0.62</span>`;
      if (k === 2) return `<span class="hl">FocusToAction</span>  target=<span class="s">"obsidian_cube"</span>  charge=<span class="n">${Math.min(100, Math.round(s.focus * 135))}%</span>`;
      if (k === 3) return `<span class="k">NeuralFlight</span>  climb_rate=<span class="n">+${(s.focus * 4.2).toFixed(1)}</span> m/s  bank=<span class="n">0.0°</span>`;
      return `<span class="c">BodyPress BLE</span>  offline=true  8 ch healthy  latency=<span class="n">12</span> ms`;
    },
    xr16: (t) => {
      const s = sim(t),
        k = frameN++ % 5;
      if (k === 0) return `<span class="c">BLE 5</span>  dev=<span class="s">"PiEEG XR-16"</span>  dual ADS1299  <span class="n">16</span> ch @ <span class="n">250</span> SPS`;
      if (k === 1) return `<span class="k">ch 1-8 (face)</span>    ZyL/ZyR fEMG=<span class="n">active</span>  Fp1/Fp2 EOG=<span class="n">clean</span>`;
      if (k === 2) return `<span class="k">ch 9-16 (occip)</span>  O1/O2/Oz alpha peak=<span class="n">${(10.1 + s.Alpha * 0.6).toFixed(1)}</span> Hz  SNR=<span class="n">15.4</span> dB`;
      if (k === 3) return `<span class="hl">alpha_reactivity</span>  eyes_closed / eyes_open ratio=<span class="n">2.4×</span>`;
      return `<span class="c">montage</span>  16/16 pads green · face + occipital inset synced`;
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
    const b = $("#xr-panelBody");
    panel = { mode: p.panel.mode, cfg: p.panel };
    $("#xr-panelTitle").textContent = p.panel.title;
    $("#xr-panelNote").textContent = p.panel.note;
    conLines = [];
    conTimer = 0;
    frameN = 24100;

    if (p.panel.mode === "console") {
      b.innerHTML = `<div class="console" id="xr-con"></div>`;
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
    const c = $("#xr-con");
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
    const rail = $("#xr-rail");
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
    gasket: "Strap-mounted STM32WB + ADS1299 box powered from 5 V USB-C battery",
    facetrainer: "In-tab TypeScript / Worker pipeline at cloud.pieeg.com or local dashboard",
    avatar: "In-tab Welford contrastive trainer + VRM blendshape / OSC runtime",
    osc: "Local Bridge (Rust P2P→UDP) or pieeg-server --osc on port 9000",
    webxr: "Headset browser (WebXR), PC VR Link, or native BodyPress app",
    xr16: "Dual daisy-chained ADS1299 converters streaming 16 ch over BLE 5",
  };

  const LAYERS = [
    ["all", "Everything", "#d6dae0"],
    ["source", "Signal input", "#9aa2ad"],
    ["runtime", "Processing", "#d6dae0"],
    ["out", "XR output", "#7fb2ff"],
  ];

  function renderBar(p) {
    $("#xr-layers").innerHTML = LAYERS.map(([k, label, c]) => {
      const col = k === "source" ? FAMILY[p.fam] : c;
      return `<button data-layer="${k}" aria-pressed="${(state.layer || "all") === k}" style="--c:${col}"><i></i>${label}</button>`;
    }).join("");
    $("#xr-layers")
      .querySelectorAll("button")
      .forEach((b) =>
        b.addEventListener("click", () => {
          state.layer = b.dataset.layer === "all" ? null : b.dataset.layer;
          $("#xr-layers")
            .querySelectorAll("button")
            .forEach((x) => x.setAttribute("aria-pressed", x === b));
          state.focus = state.layer;
          applyFocus();
        }),
      );
    $("#xr-hostWrap").innerHTML = `<span class="seg-label">Runs in</span><span class="lock">${HOST[p.id]}</span>`;
  }

  function renderSpec(p) {
    const pc = { source: FAMILY[p.fam], runtime: "#d6dae0", out: "#7fb2ff", link: "#45dd8b" };
    $("#xr-spec").innerHTML = `
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

  $("#xr-pause").addEventListener("click", (e) => {
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
  select("gasket");
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
