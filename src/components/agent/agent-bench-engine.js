/* Interactive AI & Agent Architecture Bench - follows the home-bench instrument design. */

export function mountAgentBench(root) {
  if (!root) return () => {};
  let raf = 0;
  let stopped = false;
  let visible = true;

  const FAMILY = {
    cascade: "#22d3ee",
    mcp: "#a78bfa",
    decode: "#34d399",
    gate: "#f59e0b",
    browser: "#38bdf8",
  };

  const LK = {
    wire: { c: "#7fb2ff", name: "In-process / Ring Buffer" },
    net: { c: "#45dd8b", name: "LSL / WebSocket / MCP" },
    ai: { c: "#c58bff", name: "LLM / Tool Dispatch" },
    gate: { c: "#ffae42", name: "Gated Actuator Path" },
  };

  const PARTS = [
    {
      id: "cascade",
      name: "Perception Cascade",
      meta: "T0 → T1 → T2 → T3 → T4",
      badge: "Core Engine",
      fam: "cascade",
      tagline: "Solving the rate mismatch between 250 Hz EEG and ~1 Hz LLM reasoning",
      filters: ["core", "decode"],
      summary:
        "Streaming 2,000 to 4,000 raw microvolt floats per second into an LLM context window is slow, expensive, and statistically meaningless. The Perception Cascade runs a dedicated non-blocking LSL intake thread into a 60-second ring buffer and compresses the signal across four semantic tiers before the model ever pulls a tool.",
      caption:
        "LSL Inlet (250 Hz) → 60s Ring Buffer (T0) → 8 Hz FFT & Quality (T1) → 1 Hz State (T2) → Sparse Events (T3)",
      scene: {
        nodes: [
          { id: "lsl", c: 1, t: "LSL / BLE Stream", s: "250-500 Hz float32 µV", ic: "chip", part: "source" },
          { id: "t0", c: 2, t: "T0 · Ring Buffer", s: "60s window, 0 drops", ic: "disk", part: "runtime", core: true },
          { id: "t1", c: 3, t: "T1 · Features (8 Hz)", s: "FFT δθαβγ + quality", ic: "wave", part: "runtime" },
          { id: "t2", c: 3, t: "T2 · State (1 Hz)", s: "10m rolling normalize", ic: "wave", part: "runtime" },
          { id: "t3", c: 3, t: "T3 · Events (Sparse)", s: "2s dwell + artifacts", ic: "code", part: "runtime" },
          { id: "t4", c: 4, t: "T4 · NeuralTools", s: "pulled on query only", ic: "plug", part: "out", go: "mcp" },
          { id: "pat", c: 4, t: "DecodeTools Tap", s: "on_frame @ 8 Hz", ic: "robot", part: "out", go: "patterns" },
        ],
        links: [
          ["lsl", "t0", "250 Hz", "net"],
          ["t0", "t1", "8 Hz", "wire"],
          ["t1", "t2", "1 Hz", "wire"],
          ["t2", "t3", "debounce", "wire"],
          ["t2", "t4", "pull", "ai"],
          ["t3", "t4", "events", "ai"],
          ["t1", "pat", "features", "wire"],
        ],
      },
      rows: [
        ["source", "T0 Raw", "250-500 Hz <code>float32</code> µV in a 60-second ring buffer (<code>PIEEG_RING_SECONDS=60</code>); never sent to LLM"],
        ["runtime", "T1 Features", "8 Hz Hann-windowed FFT band powers (δ θ α β γ) and per-channel status (<code>good/flat/rail/noisy/line</code>)"],
        ["runtime", "T2 State", "1 Hz smoothed <code>focus</code>, <code>relax</code>, and <code>engagement</code> normalized to the session's rolling 10-minute range"],
        ["runtime", "T3 Events", "Hysteresis-gated transitions (0.70 high / 0.30 low, 2.0s minimum dwell, 0.50 quality floor) plus blink/jaw/motion"],
        ["out", "T4 Reason", "Read-only tool dispatch (<code>get_neural_state</code>, <code>get_band_powers</code>, <code>get_channel_quality</code>, <code>get_recent_events</code>)"],
      ],
      gets: [
        "Dedicated LSL ingestion thread never blocks on network or LLM latency",
        "Warm-up protection (~ prefix / warming_up flag) until sufficient session variance is established",
        "Quality floor (0.50) suppresses spurious state transitions during electrode motion or jaw clenches",
        "Identical cascade architecture powers both Python PiEEG Agent and browser-native Buddy",
      ],
      note: {
        h: "Pull, never push",
        p: "The model is never streamed raw voltage arrays. It pulls compact JSON verdicts through tools when you ask a question.",
      },
      panel: {
        mode: "bands",
        title: "T1 & T2 live cascade readout",
        note: "Relative band powers (8 Hz) and session-normalized state indices (1 Hz)",
      },
      links: [
        { t: "Agent Architecture Docs", h: "https://docs.pieeg.com/software/integrations/pieeg-agent/#architecture", ext: true, primary: true },
        { t: "GitHub: perceive/", h: "https://github.com/pieeg-club/PiEEG-agent", ext: true },
      ],
    },
    {
      id: "mcp",
      name: "MCP Server",
      meta: "pieeg-agent mcp",
      badge: "Model Context Protocol",
      fam: "mcp",
      tagline: "Expose live EEG analysis tools to Claude, Cursor, VS Code, or Codex",
      filters: ["mcp", "core"],
      summary:
        "Run pieeg-agent mcp to publish the full NeuralTools and DecodeTools surface over the official MCP Python SDK v2. The process loads no LLM and requires no API key: your existing IDE or desktop copilot calls in over streamable-HTTP (:8765/mcp), SSE, or stdio.",
      caption:
        "PerceptionCascade + DecodeTools → MCPServer (:8765/mcp or stdio) → Claude / Cursor / VS Code / Codex",
      scene: {
        nodes: [
          { id: "cas", c: 1, t: "PerceptionCascade", s: "live LSL ring buffer", ic: "wave", part: "source", go: "cascade" },
          { id: "dec", c: 1, t: "DecodeTools Bank", s: "patterns, sessions, PSD", ic: "disk", part: "source", go: "patterns" },
          { id: "srv", c: 2, t: "pieeg-agent mcp", s: "MCP SDK v2, no LLM", ic: "plug", part: "runtime", core: true },
          { id: "http", c: 3, t: "Streamable HTTP", s: "127.0.0.1:8765/mcp", ic: "net", part: "runtime" },
          { id: "stdio", c: 3, t: "stdio / SSE", s: "--transport stdio|sse", ic: "code", part: "runtime" },
          { id: "ide", c: 4, t: "Cursor & VS Code", s: ".cursor / .vscode mcp.json", ic: "browser", part: "out" },
          { id: "dsk", c: 4, t: "Claude & Codex", s: "Claude Code, Desktop, CLI", ic: "robot", part: "out" },
        ],
        links: [
          ["cas", "srv", "read", "wire"],
          ["dec", "srv", "decode", "wire"],
          ["srv", "http", "stateless", "net"],
          ["srv", "stdio", "spawn", "wire"],
          ["http", "ide", "JSON-RPC", "ai"],
          ["http", "dsk", "JSON-RPC", "ai"],
          ["stdio", "dsk", "stdin/out", "ai"],
        ],
      },
      rows: [
        ["source", "Command", "<code>pieeg-agent mcp</code> (or <code>pip install -e \".[mcp]\"</code>)"],
        ["runtime", "HTTP Endpoint", "<code>http://127.0.0.1:8765/mcp</code> (streamable-HTTP, stateless per call)"],
        ["runtime", "Alt Transports", "<code>--transport stdio</code> (host spawns process) or <code>--transport sse</code> (<code>:8765/sse</code>)"],
        ["out", "Supported Hosts", "Cursor, VS Code Copilot, Claude Code, Claude Desktop, ChatGPT Desktop, Codex, OpenClaw, Hermes"],
        ["out", "Actuator Gate", "Device tools are hidden unless started with <code>--allow-actions</code> (preview) or <code>--execute</code>"],
      ],
      gets: [
        "No API key needed in PiEEG Agent: your MCP host uses its own model and credentials",
        "Stay in the editor thread where you are writing experiment code and pull live signal numbers inline",
        "Prints ready-to-paste host configuration snippet to stderr on startup",
        "Hardware control remains strictly off unless explicitly enabled at launch",
      ],
      note: {
        h: "Localhost security boundary",
        p: "Cloud web tabs (claude.ai or chatgpt.com in a browser) cannot reach 127.0.0.1:8765. Connect from a desktop app, IDE, or CLI running on the same machine.",
      },
      panel: {
        mode: "console",
        title: "MCP JSON-RPC tool traffic (:8765/mcp)",
        note: "Simulated host tool calls and stateless responses",
        gen: "mcp",
      },
      links: [
        { t: "Jump to Host Configs", h: "#host-configs", ext: false, primary: true },
        { t: "MCP Docs", h: "https://docs.pieeg.com/software/integrations/pieeg-agent/#mcp", ext: true },
      ],
    },
    {
      id: "patterns",
      name: "Pattern Trainer",
      meta: "L2 + Group-Lasso · LORO-CV",
      badge: "Machine Learning",
      fam: "decode",
      tagline: "Teach custom mental-state classifiers by conversation with spatial sparsity",
      filters: ["decode"],
      summary:
        "Train a binary detector for any reproducible state (eyes-closed alpha, motor imagery, subvocal jaw tension, focus) through guided REST vs ACTIVE repetitions. PatternTrainer fits an L2 + group-lasso logistic model that drives uninformative electrodes to zero and scores readiness with trial-grouped Leave-One-Rep-Out cross-validation.",
      caption:
        "Guided REST/ACTIVE Reps → 8 Hz Feature Tap → L2 + Group-Lasso Fit → LORO-CV Score & Live PatternBank",
      scene: {
        nodes: [
          { id: "rep", c: 1, t: "Contrastive Reps", s: "REST vs ACTIVE (1-20s)", ic: "wave", part: "source" },
          { id: "ext", c: 2, t: "extract_frame()", s: "per-ch band + time feats", ic: "code", part: "runtime" },
          { id: "fit", c: 3, t: "L2 + Group-Lasso", s: "spatial electrode sparsity", ic: "chip", part: "runtime", core: true },
          { id: "cv", c: 3, t: "LORO-CV Audit", s: "splits by rep, not sample", ic: "disk", part: "runtime" },
          { id: "bnk", c: 4, t: "Live PatternBank", s: "scored every 8 Hz frame", ic: "robot", part: "out" },
          { id: "exp", c: 4, t: "explain_pattern()", s: "channel ★ importance", ic: "browser", part: "out" },
        ],
        links: [
          ["rep", "ext", "segments", "wire"],
          ["ext", "fit", "feature matrix", "wire"],
          ["ext", "cv", "rep groups", "wire"],
          ["fit", "bnk", "persist JSON", "wire"],
          ["fit", "exp", "group norms", "ai"],
          ["cv", "exp", "balanced acc", "ai"],
        ],
      },
      rows: [
        ["source", "Training Flow", "<code>start_pattern_training</code> → <code>record_segment(rest|active)</code> (2-8 reps) → <code>finish_pattern_training</code>"],
        ["runtime", "Regularization", "L2 ridge + group-lasso penalty across each channel's feature block so unhelpful electrodes zero out"],
        ["runtime", "Validation", "Leave-One-Rep-Out CV (<code>LORO-CV</code>) holds out entire recording repetitions to prevent temporal autocorrelation leakage"],
        ["out", "Metric", "Reports <strong>balanced accuracy</strong> (mean of sensitivity and specificity), immune to class imbalance"],
        ["out", "Live Scoring", "<code>PatternBank</code> scores all saved patterns in real time on every 8 Hz cascade frame"],
      ],
      gets: [
        "Per-channel importance ranking (e.g. O1★★★ O2★★★ C3★) shows which electrodes drive the prediction",
        "Persisted automatically in PatternStore so trained detectors reload across sessions",
        "Accessible via web UI, terminal chat, MCP tools, or inside browser-native Buddy",
      ],
      note: {
        h: "Why LORO-CV matters on EEG",
        p: "Adjacent 125 ms windows within the same 4-second hold share slow drift and autocorrelation. Splitting by repetition rather than random samples prevents inflated accuracy.",
      },
      panel: {
        mode: "console",
        title: "Pattern training & LORO-CV trace",
        note: "Guided contrastive recording and group-lasso fit",
        gen: "patterns",
      },
      links: [
        { t: "Pattern Training Docs", h: "https://docs.pieeg.com/software/integrations/pieeg-agent/#2-pattern-training", ext: true, primary: true },
        { t: "Try in Buddy", h: "https://buddy.pieeg.com/", ext: true },
      ],
    },
    {
      id: "spectral",
      name: "Spectral & Connectivity",
      meta: "IAF · 1/f · Pearson r",
      badge: "Signal Analysis",
      fam: "decode",
      tagline: "On-demand frequency biomarkers and cross-channel amplitude coupling",
      filters: ["decode"],
      summary:
        "Beyond basic band bars, DecodeTools maintains a 256-frame (~32s) rolling band-power history and computes publication-standard spectral biomarkers and functional connectivity matrices on demand.",
      caption:
        "Rolling 32s History (256 frames @ 8 Hz) → Welch PSD & Envelope Correlation → IAF, 1/f Slope & Network Hubs",
      scene: {
        nodes: [
          { id: "buf", c: 1, t: "60s Ring + 32s Hist", s: "250 Hz raw + 8 Hz envelopes", ic: "disk", part: "source", go: "cascade" },
          { id: "psd", c: 2, t: "analyze_spectrum()", s: "Welch PSD parametrization", ic: "wave", part: "runtime", core: true },
          { id: "con", c: 2, t: "connectivity()", s: "log-power Pearson r", ic: "net", part: "runtime", core: true },
          { id: "iaf", c: 3, t: "IAF & 1/f Slope", s: "peak Hz + aperiodic exponent", ic: "code", part: "out" },
          { id: "asy", c: 3, t: "Entropy & Asymmetry", s: "Shannon entropy + F4/F3 α", ic: "code", part: "out" },
          { id: "hub", c: 4, t: "Coupling Matrix", s: "strongest pairs (e.g. C3↔C4)", ic: "globe", part: "out" },
        ],
        links: [
          ["buf", "psd", "window", "wire"],
          ["buf", "con", "256 frames", "wire"],
          ["psd", "iaf", "8-13 Hz peak", "ai"],
          ["psd", "asy", "log-log fit", "ai"],
          ["con", "hub", "N×N matrix", "ai"],
        ],
      },
      rows: [
        ["runtime", "Alpha Peak (IAF)", "Detects Individual Alpha Frequency peak within 8-13 Hz per channel or montage average"],
        ["runtime", "Aperiodic 1/f Slope", "Log-log linear regression slope reflecting background excitation/inhibition balance"],
        ["runtime", "Ratios & Entropy", "Theta/Beta ratio (vigilance/load), spectral Shannon entropy, and frontal alpha asymmetry"],
        ["out", "Connectivity", "Cross-channel Pearson correlation over log band-power envelopes in any selected band (δ θ α β γ)"],
        ["out", "Topology Output", "Returns mean network correlation, strongest electrode pairs, and most/least connected hubs"],
      ],
      gets: [
        "Inspect single electrodes (e.g. O1) or full-cap summaries in a single tool call",
        "Quantify bilateral motor synchrony (C3↔C4) or occipital alpha coherence live",
        "Combine with search_web (PubMed / Wikipedia) to cross-reference findings in literature",
      ],
      note: {
        h: "Volume conduction caveat",
        p: "Zero-lag amplitude envelope correlations can reflect volume conduction from shared sources as well as true cortical coupling. Interpret topology alongside electrode spacing.",
      },
      panel: {
        mode: "console",
        title: "Spectral & connectivity tool output",
        note: "Live output of analyze_spectrum and connectivity",
        gen: "spectral",
      },
      links: [
        { t: "Spectral & Connectivity Docs", h: "https://docs.pieeg.com/software/integrations/pieeg-agent/#3-spectral-analysis", ext: true, primary: true },
      ],
    },
    {
      id: "sessions",
      name: "Sessions & Notebooks",
      meta: "Cohen's d · .ipynb export",
      badge: "Lab Notebook",
      fam: "decode",
      tagline: "Capture labelled windows, compute effect sizes, and generate Jupyter notebooks",
      filters: ["decode", "core"],
      summary:
        "PiEEG Agent acts as a structured experiment log. Capture named sessions (2 to 120 seconds), compare any two blocks with within-session Cohen's d effect sizes, and auto-generate executable .ipynb Jupyter notebooks populated with your session data and trained classifiers.",
      caption:
        "record_session (2-120s) → SessionStore → compare_sessions (Cohen's d) & create_jupyter_notebook (.ipynb)",
      scene: {
        nodes: [
          { id: "rec", c: 1, t: "record_session()", s: "labelled 2-120s capture", ic: "wave", part: "source" },
          { id: "str", c: 2, t: "SessionStore", s: "band stats, quality, events", ic: "disk", part: "runtime", core: true },
          { id: "cmp", c: 3, t: "compare_sessions()", s: "within-session Cohen's d", ic: "code", part: "runtime" },
          { id: "nb", c: 3, t: "Notebook Builder", s: "create_jupyter_notebook", ic: "code", part: "runtime", core: true },
          { id: "eff", c: 4, t: "Effect Size Report", s: "Δα, Δβ, Δrelax in SD units", ic: "browser", part: "out" },
          { id: "ipy", c: 4, t: "Generated .ipynb", s: "ROC, confusion, PSD plots", ic: "disk", part: "out" },
        ],
        links: [
          ["rec", "str", "save JSON", "wire"],
          ["str", "cmp", "block A vs B", "wire"],
          ["str", "nb", "inject data", "wire"],
          ["cmp", "eff", "Cohen's d", "ai"],
          ["nb", "ipy", "write .ipynb", "wire"],
        ],
      },
      rows: [
        ["source", "Capture", "<code>record_session(name, duration_s)</code> logs band powers, state trajectories, quality, and artifacts"],
        ["runtime", "Comparison", "<code>compare_sessions(a, b)</code> computes standardized mean differences (within-session Cohen's <em>d</em>)"],
        ["out", "Notebook Gen", "<code>create_jupyter_notebook</code> writes self-contained <code>.ipynb</code> files with matplotlib/seaborn cells"],
        ["out", "Templates", "Session summary, pattern ROC &amp; confusion matrix, connectivity heatmaps, and spectral evolution"],
      ],
      gets: [
        "Move from a conversational experiment to a reproducible Python notebook in one sentence",
        "Explicitly labels Cohen's d as within-session descriptive, preventing over-claiming",
        "Includes literature tools (search_web for PubMed/Wikipedia and search_docs for PiEEG docs)",
      ],
      note: {
        h: "Descriptive within-session effect sizes",
        p: "Cohen's d compares variance across two blocks recorded in the same session and electrode montage. It does not claim cross-subject or cross-day generalization.",
      },
      panel: {
        mode: "console",
        title: "Session comparison & notebook generation",
        note: "Comparing two blocks and exporting an analysis .ipynb",
        gen: "sessions",
      },
      links: [
        { t: "Session & Notebook Docs", h: "https://docs.pieeg.com/software/integrations/pieeg-agent/#5-session-recording--comparison", ext: true, primary: true },
      ],
    },
    {
      id: "gate",
      name: "Safety & Action Gate",
      meta: "--allow-actions · --execute",
      badge: "Hardware Safety",
      fam: "gate",
      tagline: "Looking is not driving: 4-stage policy gate between the LLM and the amplifier",
      filters: ["gate", "core"],
      summary:
        "By default, PiEEG Agent is 100% observational: actuator tools are not even registered. Passing --allow-actions exposes a curated set of control tools in dry-run preview mode. Only with --allow-actions --execute can commands reach pieeg-server, after passing an allowlist, per-action cooldown, parameter bounds check, and JSONL audit log.",
      caption:
        "LLM Tool Call → ActionGate (Allowlist → Bounds → Cooldown → Dry-Run Check → Audit Log) → pieeg-server :1616",
      scene: {
        nodes: [
          { id: "llm", c: 1, t: "Copilot / MCP Host", s: "requests device action", ic: "robot", part: "source" },
          { id: "alw", c: 2, t: "1 · Allowlist & Bounds", s: "0 < lowcut < highcut <= 125", ic: "code", part: "runtime" },
          { id: "cld", c: 2, t: "2 · Cooldown Timer", s: "prevents command spam", ic: "clock", part: "runtime" },
          { id: "dry", c: 3, t: "3 · Dry-Run Gate", s: "preview unless --execute", ic: "plug", part: "runtime", core: true },
          { id: "aud", c: 3, t: "4 · Audit Logger", s: "~/.pieeg-agent/audit.jsonl", ic: "disk", part: "runtime" },
          { id: "srv", c: 4, t: "pieeg-server :1616", s: "filter, record, preset, OSC", ic: "server", part: "out" },
        ],
        links: [
          ["llm", "alw", "call", "ai"],
          ["alw", "cld", "valid", "gate"],
          ["cld", "dry", "rate ok", "gate"],
          ["dry", "aud", "log envelope", "wire"],
          ["dry", "srv", "--execute", "gate"],
        ],
      },
      rows: [
        ["source", "Mode 0 (Default)", "<code>pieeg-agent web</code> or <code>mcp</code>: read-only. Actuator tools are absent from the tool registry"],
        ["runtime", "Mode 1 (Preview)", "<code>--allow-actions</code>: exposes actuator tools in dry-run mode; returns what <em>would</em> happen without touching hardware"],
        ["runtime", "Mode 2 (Execute)", "<code>--allow-actions --execute</code>: forwards validated commands to <code>ws://localhost:1616</code>"],
        ["out", "Curated Actions", "<code>set_filter</code>, <code>start_recording</code>, <code>stop_recording</code>, <code>apply_register_preset</code>, <code>configure_osc</code>"],
        ["out", "Hard Locks", "Raw ADS1299 register writes (<code>CONFIG1-3</code>) are never exposed to the LLM"],
      ],
      gets: [
        "Every attempted action (executed, previewed, or denied) is appended to ~/.pieeg-agent/audit.jsonl",
        "Register changes are restricted to safe named presets (normal, internal_short, test_signal, temp_sensor)",
        "Filter corners are strictly validated (0 < lowcut < highcut <= 125 Hz) before reaching the server",
      ],
      note: {
        h: "Why raw register writes are excluded",
        p: "An LLM should never be able to alter reference buffers or sample rate registers mid-experiment. Hardware control is restricted to human-meaningful presets.",
      },
      panel: {
        mode: "console",
        title: "ActionGate policy evaluation & audit.jsonl",
        note: "Comparing default, --allow-actions (dry-run), and --execute envelopes",
        gen: "gate",
      },
      links: [
        { t: "Device Control Docs", h: "https://docs.pieeg.com/software/integrations/pieeg-agent/#device-control", ext: true, primary: true },
        { t: "Read MCP Safety Note", h: "/news/pieeg-agent-mcp", ext: false },
      ],
    },
    {
      id: "buddy",
      name: "Buddy (Browser Sibling)",
      meta: "buddy.pieeg.com",
      badge: "Zero Install",
      fam: "browser",
      tagline: "The same perception cascade and tool loop running 100% inside a Chromium tab",
      filters: ["browser", "core"],
      summary:
        "Buddy is the browser-native sibling of PiEEG Agent. It connects to IronBCI (8/16 ch), Octopus 16, or IronBCI-32 directly over Web Bluetooth or Web Serial, runs the BuddyEngine cascade and L2 + group-lasso pattern trainer client-side, and calls your chosen LLM provider directly from the tab.",
      caption:
        "Web Bluetooth / Serial → BuddyEngine Cascade (in-tab) → 10 Read-Only Tools → Direct LLM Call or Local Ollama",
      scene: {
        nodes: [
          { id: "hw", c: 1, t: "BLE / USB Board", s: "or 8/16ch synthetic demo", ic: "chip", part: "source" },
          { id: "eng", c: 2, t: "BuddyEngine", s: "T0-T3 cascade in JS", ic: "cloud", part: "runtime", core: true },
          { id: "ui", c: 3, t: "Live Brain Panel", s: "quality, bands, r matrix", ic: "wave", part: "out" },
          { id: "loop", c: 3, t: "Tool-Calling Loop", s: "10 read-only tools", ic: "robot", part: "runtime", core: true },
          { id: "cld", c: 4, t: "Cloud LLM (BYO Key)", s: "Anthropic, OpenAI, Groq…", ic: "net", part: "out" },
          { id: "loc", c: 4, t: "Ollama / LM Studio", s: "100% local, or Echo demo", ic: "server", part: "out" },
        ],
        links: [
          ["hw", "eng", "WebBLE/USB", "net"],
          ["eng", "ui", "60 fps", "wire"],
          ["eng", "loop", "tools", "wire"],
          ["loop", "cld", "HTTPS direct", "ai"],
          ["loop", "loc", "localhost", "ai"],
        ],
      },
      rows: [
        ["runtime", "URL", "<code>https://buddy.pieeg.com/</code> (runs in Chrome, Edge, Brave, Opera)"],
        ["source", "Hardware", "IronBCI-8, IronBCI-16, Octopus 16 (Web Bluetooth), IronBCI-32 (Web Serial), or built-in Demo"],
        ["runtime", "Tools", "<code>get_neural_state</code>, <code>get_band_powers</code>, <code>analyze_spectrum</code>, <code>find_artifacts</code>, <code>get_channel_quality</code>, <code>connectivity</code>, <code>list/detect/explain_pattern</code>"],
        ["out", "Providers", "Anthropic, OpenAI, Groq, Together AI, local Ollama, LM Studio, or keyless Echo mode"],
        ["out", "Privacy", "Raw EEG stays in the tab; API key and tool facts go straight from your browser to your provider"],
      ],
      gets: [
        "Zero Python, LSL, or terminal setup required: open the URL, pair a board, and start asking questions",
        "Live Brain Panel renders state meters, quality grid, connectivity matrix, and pattern ticker alongside chat",
        "Supports 100% offline/local inference when pointed at a local Ollama or LM Studio server",
      ],
      note: {
        h: "When to pick Buddy vs Python Agent",
        p: "Use Buddy for instant browser pairing and live Q&A. Use Python PiEEG Agent when you need MCP (:8765/mcp), Raspberry Pi SPI shields, LSL network streams, or .ipynb generation.",
      },
      panel: {
        mode: "chat",
        title: "Live Buddy session (buddy.pieeg.com)",
        note: "Multi-turn tool-grounded conversation in the browser",
        script: "buddy",
      },
      links: [
        { t: "Launch Buddy", h: "https://buddy.pieeg.com/", ext: true, primary: true },
        { t: "Buddy Documentation", h: "https://docs.pieeg.com/cloud/buddy/", ext: true },
      ],
    },
  ];

  const SW = 1040,
    SH = 500,
    NW = 192,
    NH = 68,
    TOPCAP = 34;
  const $ = (s) => root.querySelector(s);
  const svg = $("#agent-scene");

  const ICONS = {
    chip: "M4,4h10v10H4Z M6.5,1.5v2.5 M11.5,1.5v2.5 M6.5,14v2.5 M11.5,14v2.5 M1.5,6.5h2.5 M1.5,11.5h2.5 M14,6.5h2.5 M14,11.5h2.5",
    server: "M2,3h14v4.5H2Z M2,10.5h14V15H2Z M5,5.2h0.01 M5,12.7h0.01",
    browser: "M2,3h14v12H2Z M2,6.5h14 M4.3,4.75h0.01 M6.3,4.75h0.01",
    cloud: "M5.2,14a3.7,3.7 0 0 1 0.4,-7.4a4.6,4.6 0 0 1 8.7,1.5a3,3 0 0 1 -0.6,5.9Z",
    plug: "M6,2v4 M12,2v4 M3.5,6h11v3a5.5,5.5 0 0 1 -11,0Z M9,14.5V17",
    code: "M6.5,5.5L2.5,9l4,3.5 M11.5,5.5L15.5,9l-4,3.5",
    wave: "M1.5,9q2.2,-6 4.4,0t4.4,0t4.4,0",
    net: "M9,2.5a2,2 0 1 1 0,0.01 M3.5,14a2,2 0 1 1 0,0.01 M14.5,14a2,2 0 1 1 0,0.01 M8,4.4L4.4,11.9 M10,4.4L13.6,11.9 M5.6,15h6.8",
    disk: "M2.5,3.5h13v11h-13Z M5.5,3.5v4h7v-4 M9,10.5a2,2 0 1 1 0,0.01",
    robot: "M9,1.5v2 M4,3.5h10a1.5,1.5 0 0 1 1.5,1.5v7a1.5,1.5 0 0 1 -1.5,1.5H4a1.5,1.5 0 0 1 -1.5,-1.5V5A1.5,1.5 0 0 1 4,3.5Z M6.3,7.8h0.01 M11.7,7.8h0.01 M6.5,11h5",
    globe: "M9,1.5a7.5,7.5 0 1 1 0,15a7.5,7.5 0 1 1 0,-15Z M1.5,9h15 M9,1.5q3.4,3.6 0,15 M9,1.5q-3.4,3.6 0,15",
    clock: "M9,1.5a7.5,7.5 0 1 1 0,15a7.5,7.5 0 1 1 0,-15Z M9,5v4.5l3,2",
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
    $("#agent-lCap").innerHTML = `<text x="28" y="26" class="t-cap">${part.caption}</text>`;

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
    $("#agent-lLinks").innerHTML = lh;

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
    $("#agent-lNodes").innerHTML = nh;

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
    $("#agent-legend").innerHTML =
      kinds.map((k) => `<span><i style="background:${LK[k].c}"></i>${LK[k].name}</span>`).join("") +
      `<span class="hint" style="margin-left:auto;color:var(--dim)">Hover a spec row to trace it. Boxes with an arrow switch subsystem.</span>`;
  }

  const tip = $("#agent-tip");
  function showTip(n, g) {
    if (!n) {
      tip.classList.remove("show");
      return;
    }
    tip.innerHTML = n.go
      ? `<b>${n.t}</b> <span>- inspect this subsystem</span>`
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
    frameN = 9400;

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

  const f2 = (v) => v.toFixed(2);

  const GEN = {
    mcp: (t) => {
      const s = sim(t),
        k = frameN++ % 6;
      if (k === 0)
        return `<span class="c">POST /mcp</span>  {<span class="k">"method"</span>: <span class="s">"tools/call"</span>, <span class="k">"name"</span>: <span class="hl">"get_channel_quality"</span>}`;
      if (k === 1)
        return `<span class="c">← 200 OK</span>   {<span class="k">"quality"</span>: <span class="n">0.97</span>, <span class="k">"good"</span>: <span class="n">16</span>, <span class="k">"bad_channels"</span>: []}`;
      if (k === 2)
        return `<span class="c">POST /mcp</span>  {<span class="k">"method"</span>: <span class="s">"tools/call"</span>, <span class="k">"name"</span>: <span class="hl">"get_neural_state"</span>}`;
      if (k === 3)
        return `<span class="c">← 200 OK</span>   {<span class="k">"focus"</span>: <span class="n">${f2(s.focus)}</span>, <span class="k">"relax"</span>: <span class="n">${f2(s.relax)}</span>, <span class="k">"dominant"</span>: <span class="s">"alpha"</span>}`;
      if (k === 4)
        return `<span class="c">POST /mcp</span>  {<span class="k">"method"</span>: <span class="s">"tools/call"</span>, <span class="k">"name"</span>: <span class="hl">"explain_pattern"</span>, <span class="k">"pattern"</span>: <span class="s">"meditation"</span>}`;
      return `<span class="c">← 200 OK</span>   {<span class="k">"loro_cv"</span>: <span class="n">0.89</span>, <span class="k">"top_channels"</span>: [<span class="s">"O1"</span>, <span class="s">"O2"</span>]}`;
    },
    patterns: (t) => {
      const s = sim(t),
        k = frameN++ % 6;
      if (k === 0)
        return `<span class="hl">start_pattern_training</span>({ name: <span class="s">"meditation"</span> })`;
      if (k === 1)
        return `<span class="k">record_segment</span>({ kind: <span class="s">"rest"</span>, duration_s: <span class="n">4.0</span> })   <span class="c">→ 32 frames, q=0.95</span>`;
      if (k === 2)
        return `<span class="k">record_segment</span>({ kind: <span class="s">"active"</span>, duration_s: <span class="n">4.0</span> }) <span class="c">→ 32 frames, q=0.97</span>`;
      if (k === 3)
        return `<span class="hl">finish_pattern_training</span>() <span class="c">→ fitting L2 + group-lasso (3 reps)…</span>`;
      if (k === 4)
        return `<span class="c">LORO-CV balanced_accuracy:</span> <span class="n">0.89</span>  <span class="c">weights: O1(0.38) O2(0.34) Pz(0.14)</span>`;
      return `<span class="k">detect_patterns</span>() <span class="c">→</span> <span class="s">"meditation"</span> p=<span class="n">${f2(0.65 + s.Alpha * 0.28)}</span> <span class="c">[ACTIVE]</span>`;
    },
    spectral: (t) => {
      const s = sim(t),
        k = frameN++ % 5;
      if (k === 0)
        return `<span class="hl">analyze_spectrum</span>({ channel: <span class="s">"O1"</span> })`;
      if (k === 1)
        return `<span class="c">←</span> IAF: <span class="n">${(10.0 + s.Alpha * 0.6).toFixed(2)}</span> Hz  1/f slope: <span class="n">-1.18</span>  entropy: <span class="n">0.67</span>`;
      if (k === 2)
        return `<span class="c">←</span> theta/beta: <span class="n">${(1.25 + s.Theta).toFixed(2)}</span>  frontal_alpha_asymmetry: <span class="n">-0.04</span>`;
      if (k === 3)
        return `<span class="hl">connectivity</span>({ band: <span class="s">"alpha"</span> }) <span class="c">→ 256-frame envelope Pearson r</span>`;
      return `<span class="c">←</span> mean_r: <span class="n">0.35</span>  strongest: <span class="s">C3↔C4</span> (<span class="n">r=0.72</span>)  hub: <span class="s">C3</span>`;
    },
    sessions: () => {
      const k = frameN++ % 5;
      if (k === 0)
        return `<span class="hl">record_session</span>({ name: <span class="s">"eyes_closed"</span>, duration_s: <span class="n">60</span> }) <span class="c">→ saved</span>`;
      if (k === 1)
        return `<span class="hl">compare_sessions</span>({ a: <span class="s">"eyes_closed"</span>, b: <span class="s">"eyes_open_task"</span> })`;
      if (k === 2)
        return `<span class="c">← Cohen's d (within-session):</span> alpha <span class="n">+0.92 SD</span>, beta <span class="n">-0.54 SD</span>, relax <span class="n">+0.71 SD</span>`;
      if (k === 3)
        return `<span class="hl">create_jupyter_notebook</span>({ pattern: <span class="s">"meditation"</span>, sessions: [<span class="s">"eyes_closed"</span>] })`;
      return `<span class="c">← wrote</span> <span class="s">meditation_analysis.ipynb</span> <span class="c">(ROC, LORO confusion, PSD, stats)</span>`;
    },
    gate: () => {
      const k = frameN++ % 6;
      if (k === 0)
        return `<span class="c"># Mode 0 (default): actuator tools not registered</span>`;
      if (k === 1)
        return `<span class="hl">set_filter</span>({ enabled: <span class="n">true</span>, lowcut: <span class="n">1.0</span>, highcut: <span class="n">40.0</span> })`;
      if (k === 2)
        return `<span class="c"># Mode 1 (--allow-actions):</span> status=<span class="s">"preview"</span> (dry-run, not sent)`;
      if (k === 3)
        return `<span class="c"># Mode 2 (--allow-actions --execute):</span> allowlist ✓ · bounds ✓ · cooldown ✓`;
      if (k === 4)
        return `<span class="c">→ ws://localhost:1616</span>  {<span class="k">"cmd"</span>: <span class="s">"set_filter"</span>, <span class="k">"lowcut"</span>: <span class="n">1.0</span>, <span class="k">"highcut"</span>: <span class="n">40.0</span>}`;
      return `<span class="c">audit.jsonl ←</span> {<span class="k">"action"</span>: <span class="s">"set_filter"</span>, <span class="k">"executed"</span>: <span class="n">true</span>, <span class="k">"status"</span>: <span class="s">"ok"</span>}`;
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
      ["you", "how is my signal quality across the cap?"],
      ["Buddy", "All 16 channels read good (mean quality 0.97, 50/60 Hz line ratio 1.8%). Trustworthy stream."],
      ["you", "what does my alpha spectrum look like right now?"],
      ["Buddy", "Individual alpha peak (IAF) is 10.2 Hz on O1/O2. Relative alpha power is 0.69 (dominant), 1/f slope is -1.15, spectral entropy is 0.65."],
      ["you", "is my meditation pattern active?"],
      ["Buddy", "Yes — \"meditation\" is firing (p = 0.88). Trained with 3-fold LORO-CV balanced accuracy 0.89, reading primarily O1 and O2."],
    ],
  };

  let panel = { mode: null },
    conLines = [],
    conTimer = 0,
    chatState = null;

  function buildPanel(p) {
    const b = $("#agent-panelBody");
    panel = { mode: p.panel.mode, cfg: p.panel };
    $("#agent-panelTitle").textContent = p.panel.title;
    $("#agent-panelNote").textContent = p.panel.note;
    conLines = [];
    conTimer = 0;
    frameN = 9400;

    if (p.panel.mode === "console") {
      b.innerHTML = `<div class="console" id="agent-con"></div>`;
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
          <div class="foot">Normalized to rolling 10-min session range. Descriptive, not clinical.</div>
        </div></div>`;
      tickBands();
    } else {
      b.innerHTML = `<div class="chat" id="agent-chat"></div>`;
      chatState = { script: SCRIPTS[p.panel.script], i: 0, chars: 0, wait: 0.35, node: null };
    }
  }

  function paintConsole() {
    const c = $("#agent-con");
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
    const box = $("#agent-chat");
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
    cs.chars += dt * 54;
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
    const rail = $("#agent-rail");
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
    cascade: "Dedicated Python thread (LSL) or BuddyEngine in browser tab",
    mcp: "Stateless streamable-HTTP (:8765/mcp), SSE, or stdio subprocess",
    patterns: "DecodeTools bank (Python) or Buddy pattern trainer (browser)",
    spectral: "On-demand Welch PSD & 256-frame envelope correlation engine",
    sessions: "Local ~/.pieeg-agent store + Jupyter .ipynb template engine",
    gate: "4-stage ActionGate sitting before ws://localhost:1616",
    buddy: "100% client-side Chromium tab at buddy.pieeg.com",
  };

  const LAYERS = [
    ["all", "Everything", "#d6dae0"],
    ["source", "Signal input", "#9aa2ad"],
    ["runtime", "Engine stage", "#d6dae0"],
    ["out", "Tool / output", "#7fb2ff"],
  ];

  function renderBar(p) {
    $("#agent-layers").innerHTML = LAYERS.map(([k, label, c]) => {
      const col = k === "source" ? FAMILY[p.fam] : c;
      return `<button data-layer="${k}" aria-pressed="${(state.layer || "all") === k}" style="--c:${col}"><i></i>${label}</button>`;
    }).join("");
    $("#agent-layers")
      .querySelectorAll("button")
      .forEach((b) =>
        b.addEventListener("click", () => {
          state.layer = b.dataset.layer === "all" ? null : b.dataset.layer;
          $("#agent-layers")
            .querySelectorAll("button")
            .forEach((x) => x.setAttribute("aria-pressed", x === b));
          state.focus = state.layer;
          applyFocus();
        }),
      );
    $("#agent-hostWrap").innerHTML = `<span class="seg-label">Runs on</span><span class="lock">${HOST[p.id]}</span>`;
  }

  function renderSpec(p) {
    const pc = { source: FAMILY[p.fam], runtime: "#d6dae0", out: "#7fb2ff", link: "#45dd8b" };
    $("#agent-spec").innerHTML = `
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
            `<a class="docs${l.primary ? " primary" : ""}" href="${l.h}"${l.ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${l.t}</a>`,
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

  $("#agent-pause").addEventListener("click", (e) => {
    state.paused = !state.paused;
    e.target.textContent = state.paused ? "Resume" : "Pause";
  });

  function tickFlow() {
    root.querySelectorAll(".flow").forEach((p) => {
      p.style.strokeDashoffset = (-((simT * 32) / 1.15) % 32).toFixed(2);
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
  select("cascade");

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
