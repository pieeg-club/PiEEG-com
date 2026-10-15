import Link from "next/link";
import {
  Activity,
  Brain,
  BookOpen,
  Lock,
  ShieldCheck,
  Bot,
  Server,
  ExternalLink,
  Plug,
  Cpu,
  MessageSquare,
} from "lucide-react";

const TOOL_COLLECTIONS = [
  {
    title: "NeuralTools · Live Cascade Senses",
    badge: "Always On · Read-Only",
    accent: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-500/25",
    icon: Activity,
    description:
      "Side-effect-free reads over the 60-second PerceptionCascade ring buffer. Never blocks LSL ingestion.",
    tools: [
      {
        name: "get_neural_state",
        summary: "Smoothed ~1 Hz focus, relax, and engagement (0..1 within-session), dominant band, quality, and warming_up flag.",
      },
      {
        name: "get_band_powers",
        summary: "Relative δ, θ, α, β, γ distribution across the headset and per-channel breakdown.",
      },
      {
        name: "get_channel_quality",
        summary: "Per-channel verdict (good, flat, rail, noisy, line) with RMS amplitude (µV) and 50/60 Hz line ratio.",
      },
      {
        name: "get_recent_events",
        summary: "Hysteresis-debounced state transitions (0.70/0.30 thresholds, 2.0s dwell, 0.50 quality floor).",
      },
      {
        name: "summarize_last",
        summary: "Compact natural-language status line summarizing the latest window.",
      },
    ],
  },
  {
    title: "DecodeTools · Classifiers, PSD & Connectivity",
    badge: "Stateful · PatternStore",
    accent: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/25",
    icon: Brain,
    description:
      "Taps the cascade at 8 Hz to train L2 + group-lasso detectors, compute spectral biomarkers, and measure coupling.",
    tools: [
      {
        name: "start / record_segment / finish_pattern_training",
        summary: "Capture contrastive REST vs ACTIVE reps (1-20s, 2-8 reps) and fit an L2 + group-lasso classifier.",
      },
      {
        name: "list / detect / explain / forget_pattern",
        summary: "Inspect LORO-CV balanced accuracy, live PatternBank probabilities, and per-electrode importance weights.",
      },
      {
        name: "analyze_spectrum",
        summary: "Individual Alpha Frequency (IAF), aperiodic 1/f slope, θ/β ratio, spectral entropy, and frontal α asymmetry.",
      },
      {
        name: "connectivity",
        summary: "Cross-channel Pearson r over log band-power envelopes (256-frame rolling history) with hub ranking.",
      },
      {
        name: "find_artifacts",
        summary: "Recent single/double eye blinks, jaw clenches, and high-amplitude motion transients.",
      },
    ],
  },
  {
    title: "Session, Notebook & Literature Tools",
    badge: "Reproducible Science",
    accent: "text-violet-600 dark:text-violet-400",
    border: "border-violet-500/25",
    icon: BookOpen,
    description:
      "Record labelled experiment blocks, compute within-session effect sizes, and export executable Jupyter notebooks.",
    tools: [
      {
        name: "record / list / analyze_session",
        summary: "Capture a 2 to 120s labelled window with full band statistics, state trajectories, and quality summary.",
      },
      {
        name: "compare_sessions",
        summary: "Contrast any two recorded sessions using within-session Cohen's d standardized mean differences.",
      },
      {
        name: "create_jupyter_notebook",
        summary: "Generate a ready-to-run .ipynb notebook with ROC curves, confusion matrices, and band evolution plots.",
      },
      {
        name: "search_web & fetch_url",
        summary: "Query PubMed and Wikipedia or fetch from trusted scientific publisher domains.",
      },
      {
        name: "search_docs & fetch_doc",
        summary: "Search and retrieve official PiEEG hardware and software documentation.",
      },
    ],
  },
  {
    title: "ActuatorTools · Gated Device Control",
    badge: "Opt-In · ActionGate",
    accent: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/25",
    icon: Lock,
    description:
      "Absent by default. Exposed as dry-run previews with --allow-actions, and executed only with --execute.",
    tools: [
      {
        name: "server_status & list_webhooks",
        summary: "Read-only inspection of sample rate, active filter corners, LSL/recording state, and webhook rules.",
      },
      {
        name: "set_filter",
        summary: "Enable/disable or retune Butterworth bandpass (strictly validates 0 < lowcut < highcut <= 125 Hz).",
      },
      {
        name: "start_recording & stop_recording",
        summary: "Start or stop timestamped CSV recording on pieeg-server.",
      },
      {
        name: "apply_register_preset",
        summary: "Switch ADS1299 channels between 'normal', 'internal_short', 'test_signal', or 'temp_sensor' (no raw hex writes).",
      },
      {
        name: "configure_osc",
        summary: "Enable or retarget the server's VRChat / TouchDesigner UDP OSC bridge ('chatbox', 'parameters', 'both').",
      },
    ],
  },
];

const PROVIDERS = [
  { name: "Anthropic", kind: "Cloud", env: "ANTHROPIC_API_KEY", note: "Claude Sonnet / Opus via Messages API" },
  { name: "OpenAI", kind: "Cloud", env: "OPENAI_API_KEY", note: "GPT-4o / o-series via Chat Completions" },
  { name: "Groq", kind: "Cloud", env: "GROQ_API_KEY", note: "Low-latency Llama / Mixtral tool calling" },
  { name: "Together AI", kind: "Cloud", env: "TOGETHER_API_KEY", note: "Open-weights hosted models" },
  { name: "Ollama", kind: "Local (Offline)", env: "None", note: "100% local inference on your machine" },
  { name: "LM Studio", kind: "Local (Offline)", env: "None", note: "Local OpenAI-compatible server" },
  { name: "Echo", kind: "Built-in Debug", env: "None", note: "Deterministic tool exerciser, zero keys" },
];

const AGENT_VS_BUDDY = [
  {
    dim: "Runtime",
    agent: "Python 3.10+ process (FastAPI + prebuilt React UI on :8000, CLI, and MCP server on :8765)",
    buddy: "100% client-side in a Chromium browser tab at buddy.pieeg.com (zero install)",
  },
  {
    dim: "Signal Source",
    agent: "Any Lab Streaming Layer (LSL) outlet: pieeg-server --lsl (SPI, BLE, USB), OpenBCI, Muse, or --mock",
    buddy: "Direct Web Bluetooth (IronBCI 8/16, Octopus 16), Web Serial (IronBCI-32), or in-tab synthetic demo",
  },
  {
    dim: "MCP Server (:8765/mcp)",
    agent: "Yes — serves tools over streamable-HTTP, SSE, or stdio to Cursor, VS Code, Claude, and Codex",
    buddy: "No — self-contained browser copilot and live brain panel",
  },
  {
    dim: "Pattern Training & Senses",
    agent: "Full T0-T3 cascade, L2 + group-lasso LORO-CV patterns, IAF/1/f spectrum, connectivity",
    buddy: "Same T0-T3 cascade, L2 + group-lasso LORO-CV patterns, IAF/1/f spectrum, connectivity in JS",
  },
  {
    dim: "Sessions & .ipynb Export",
    agent: "Persistent ~/.pieeg-agent store, Cohen's d session comparison, and auto-generated .ipynb notebooks",
    buddy: "Patterns persisted in browser localStorage; live session trend charts in the brain panel",
  },
  {
    dim: "Hardware Control",
    agent: "Optional behind 4-stage ActionGate (--allow-actions preview / --execute)",
    buddy: "Strictly read-only (observes and explains; never mutates hardware)",
  },
];

export default function AgentToolsAndScience() {
  return (
    <>
      {/* ── Section 04: 22 Tool Contracts & 3-Tier Safety Gate ─────────────── */}
      <section
        id="agent-tools"
        className="scroll-mt-20 py-14 sm:py-16 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/25"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3">
              [04 · TOOL CONTRACTS &amp; HARDWARE SAFETY GATE]
            </p>
            <h2 className="title-section text-zinc-900 dark:text-zinc-50">
              Every claim grounded in a typed tool call. Hardware locked by default.
            </h2>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-3xl">
              Whether accessed from the web UI, terminal CLI, or an external MCP host, the agent reasons exclusively
              through four modular tool collections. Unknown tool names or invalid parameters return structured JSON
              errors rather than crashing the loop.
            </p>
          </div>

          {/* 4 Tool Collection Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
            {TOOL_COLLECTIONS.map((col) => {
              const Icon = col.icon;
              return (
                <div
                  key={col.title}
                  className={`p-6 rounded-2xl border ${col.border} bg-white dark:bg-zinc-900/70 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-5 h-5 ${col.accent}`} />
                        <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                          {col.title}
                        </h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                        {col.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                      {col.description}
                    </p>
                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                      {col.tools.map((t) => (
                        <div key={t.name} className="py-2.5 first:pt-0 last:pb-0">
                          <code className={`text-xs font-mono font-semibold ${col.accent} block`}>
                            {t.name}
                          </code>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed">
                            {t.summary}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3-Tier Safety Gate Banner */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/15 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  ActionGate Policy (pieeg_agent/server/gate.py)
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Three explicit permission tiers for hardware control
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                Audit log: ~/.pieeg-agent/audit.jsonl
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">1. Default (Observational)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">
                    Read-Only
                  </span>
                </div>
                <code className="block font-mono text-[11px] text-zinc-500 mb-2">
                  $ pieeg-agent web / mcp
                </code>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  ActuatorTools are not registered in the toolset. The model can inspect quality, state, spectra,
                  connectivity, and patterns, but cannot see or call any device command.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">2. Dry-Run Preview</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-[10px]">
                    Preview Only
                  </span>
                </div>
                <code className="block font-mono text-[11px] text-zinc-500 mb-2">
                  $ pieeg-agent web --allow-actions
                </code>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Exposes curated actuator tools, validates arguments against the allowlist and frequency bounds, logs
                  the intent, and returns a dry-run preview envelope without sending packets to the board.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">3. Gated Execution</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-[10px]">
                    Allowlist + Cooldown
                  </span>
                </div>
                <code className="block font-mono text-[11px] text-zinc-500 mb-2">
                  $ pieeg-agent web --allow-actions --execute
                </code>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Commands pass Allowlist → Parameter Bounds → Per-Rule Cooldown → Dry-Run Check → Audit Log before
                  reaching <code className="font-mono">ws://localhost:1616</code>. Raw register writes remain locked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 05: PiEEG Agent vs Buddy + Provider Matrix + Video ────── */}
      <section
        id="agent-vs-buddy"
        className="scroll-mt-20 py-14 sm:py-16 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
              [05 · DEPLOYMENT MODES &amp; LLM PROVIDERS]
            </p>
            <h2 className="title-section text-zinc-900 dark:text-zinc-50">
              One architecture, two runtimes: Python Server Agent vs Browser Buddy
            </h2>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-3xl">
              Run <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">buddy.pieeg.com</code> for
              instant zero-install Web Bluetooth/Serial pairing in a browser tab, or run{" "}
              <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">pieeg-agent</code> alongside{" "}
              <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">pieeg-server --lsl</code> for
              MCP hosting, Raspberry Pi SPI shields, and Jupyter notebook generation.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 overflow-hidden mb-12">
            <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
                <Server className="w-4 h-4 text-violet-500" />
                PiEEG Agent (Python + LSL + MCP) vs Buddy (Browser-Native)
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Shared PerceptionCascade &amp; LORO-CV Classifier Design
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 font-mono text-xs">
                    <th className="py-3 px-4 sm:px-5 font-semibold">Capability</th>
                    <th className="py-3 px-4 sm:px-5 font-semibold text-violet-600 dark:text-violet-400">
                      PiEEG Agent (Python / LSL / MCP)
                    </th>
                    <th className="py-3 px-4 sm:px-5 font-semibold text-cyan-600 dark:text-cyan-400">
                      Buddy (buddy.pieeg.com)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {AGENT_VS_BUDDY.map((r) => (
                    <tr key={r.dim}>
                      <td className="py-3.5 px-4 sm:px-5 font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                        {r.dim}
                      </td>
                      <td className="py-3.5 px-4 sm:px-5 text-zinc-600 dark:text-zinc-300">
                        {r.agent}
                      </td>
                      <td className="py-3.5 px-4 sm:px-5 text-zinc-600 dark:text-zinc-300">
                        {r.buddy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Provider Matrix + Video Demo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 6 cols: Provider matrix */}
            <div className="lg:col-span-6 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-500" />
                  7 Supported LLM Providers (Stdlib HTTP, Zero Vendor SDKs)
                </h3>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                Both PiEEG Agent and Buddy normalize tool calls across Anthropic Messages and OpenAI-compatible Chat
                Completions without heavy third-party SDK dependencies. Use a cloud key, run 100% offline with Ollama
                or LM Studio, or test with the built-in Echo simulator.
              </p>
              <div className="divide-y divide-zinc-200/70 dark:divide-zinc-800 text-xs">
                {PROVIDERS.map((p) => (
                  <div key={p.name} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">{p.name}</span>
                      <span className="ml-2 text-zinc-500 dark:text-zinc-400">{p.note}</span>
                    </div>
                    <code className="px-2 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 shrink-0">
                      {p.env}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 6 cols: Video walkthrough */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl aspect-video bg-zinc-950">
                <iframe
                  src="https://www.youtube.com/embed/-rpmChKZnUA"
                  title="PiEEG Agent live walkthrough"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono text-center">
                Video: Live pattern training, spectral inspection, and natural-language Q&amp;A in PiEEG Agent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 px-4 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="title-section text-zinc-900 dark:text-zinc-50 mb-3">
            Start in the browser or attach your MCP host
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 mb-7 max-w-2xl mx-auto">
            Open Buddy at <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">buddy.pieeg.com</code> for
            zero-install browser pairing, or install <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">pieeg-agent</code> to
            expose live EEG tools to Cursor, Claude, and VS Code.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://buddy.pieeg.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-colors shadow-md shadow-violet-500/20"
            >
              <Bot className="w-4 h-4" />
              Open Buddy (Browser)
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
            <a
              href="https://github.com/pieeg-club/PiEEG-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Plug className="w-4 h-4 text-cyan-500" />
              PiEEG-agent on GitHub
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
            <a
              href="https://docs.pieeg.com/software/integrations/pieeg-agent/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-emerald-500" />
              Agent &amp; MCP Docs
            </a>
            <a
              href="https://discord.gg/neJ45FR6Sv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-amber-500" />
              Discord Community
            </a>
          </div>

          <p className="mt-6 text-xs font-mono text-zinc-400 dark:text-zinc-500">
            // Research and UX prototyping tool. Not a medical device. All state indices are within-session relative.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
            <Link href="/cloud" className="hover:underline">
              PiEEG Cloud →
            </Link>
            <Link href="/server" className="hover:underline">
              PiEEG Server →
            </Link>
            <Link href="/news/pieeg-agent-mcp" className="hover:underline">
              MCP Release Note →
            </Link>
            <Link href="/news/meet-buddy-ai-copilot" className="hover:underline">
              Buddy Release Note →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
