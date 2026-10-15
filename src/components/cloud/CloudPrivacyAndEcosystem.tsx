import Link from "next/link";
import {
  Brain,
  ScanFace,
  Mic,
  Fingerprint,
  Shield,
  GraduationCap,
  Camera,
  Database,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  HardDrive,
  Server,
  Rocket,
  Bot,
  BookOpen,
  Users,
} from "lucide-react";

const CLOUD_EXP_BASE = "https://cloud.pieeg.com/experiences";

const FEATURED_EXPERIENCES = [
  {
    slug: "mushroom-body-decoder",
    name: "Mushroom Body Decoder",
    tag: "BCI / Connectome",
    Icon: Brain,
    gradient: "from-orange-500 to-pink-600",
    desc: "Live EEG band powers drive projection-neuron inputs of the Drosophila mushroom body (~2,000 Kenyon cells, 5% sparse coding, trained KC-to-MBON readout).",
  },
  {
    slug: "silent-speech",
    name: "Silent Speech Interface",
    tag: "sEMG / LORO-CV",
    Icon: Mic,
    gradient: "from-violet-500 to-cyan-500",
    desc: "Placement-agnostic subvocal sEMG word decoder. Epoched on muscle onset, fit with per-word L2 + group-lasso logistic classifiers and LORO-CV readiness.",
  },
  {
    slug: "face-trainer-v2",
    name: "Face Trainer v2",
    tag: "fEMG / Sparsity",
    Icon: ScanFace,
    gradient: "from-cyan-400 to-emerald-500",
    desc: "Common-Average Reference + 40-D time/spectral features across 8 channels. Group-lasso exposes per-electrode importance bars for every expression.",
  },
  {
    slug: "octo-auth",
    name: "octoAuth",
    tag: "16-ch Biometric",
    Icon: Fingerprint,
    gradient: "from-emerald-500 to-sky-500",
    desc: "Octopus-16 neck sEMG challenge-response demo: verifies unpredictable isometric action liveness and person-specific sternocleidomastoid spatial maps.",
  },
  {
    slug: "octo-captcha",
    name: "octoCaptcha",
    tag: "EOG / Liveness",
    Icon: Shield,
    gradient: "from-teal-500 to-cyan-600",
    desc: "Issues a random blink-count nonce after a GO cue and verifies corneal-retinal Fp1/Fp2 morphology, bilateral coherence, and human inter-blink jitter.",
  },
  {
    slug: "signal-lab",
    name: "Signal Lab",
    tag: "Interactive DSP Course",
    Icon: GraduationCap,
    gradient: "from-blue-500 to-violet-500",
    desc: "Three-world DSP curriculum (Time Domain, Cleaning, Frequency Domain) where every lesson runs a live interactive sandbox on your real EEG stream.",
  },
  {
    slug: "biopose-recorder",
    name: "BioPose Recorder",
    tag: "Pose + Bio",
    Icon: Camera,
    gradient: "from-cyan-500 to-indigo-500",
    desc: "Aligns webcam body-stick keypoints alongside live multichannel biosignal traces for review, timeline marking, and JSON/CSV export (camera pixels never stored).",
  },
  {
    slug: "rorschach-recorder",
    name: "Rorschach Recorder & Dataset Labs",
    tag: "Multimodal Dataset",
    Icon: Database,
    gradient: "from-amber-500 to-purple-600",
    desc: "Guided trial protocols (Rorschach Recorder, Aura Dataset Lab) that package native-rate EEG/sEMG, trial tables, and multimodal Excel/CSV archives.",
  },
];

const COMPARISON_ROWS = [
  {
    dim: "Installation",
    cloud: "None: open cloud.pieeg.com in Chrome, Edge, Brave, or Opera",
    server: "pip install pieeg-server (Python 3.10+ on Pi, Jetson, Linux, macOS, Windows)",
  },
  {
    dim: "Hardware Input",
    cloud: "IronBCI 8/16, PiEEG XR 8/16, Octopus-16, Aura VR (Web Bluetooth); IronBCI-32, Kraken-48 (Web Serial)",
    server: "All BLE & USB Serial boards + Raspberry Pi / Jetson GPIO SPI shields (PiEEG-8, PiEEG-16, JNEEG)",
  },
  {
    dim: "DSP & FFT",
    cloud: "Client-side in the browser tab (Hampel, Butterworth IIR, 256-pt Worker FFT)",
    server: "Server-side Python or optional pieeg-core Rust wheel (~1057× faster bandpass)",
  },
  {
    dim: "Local App Output",
    cloud: "WebRTC P2P to Local Bridge (5 MB Rust app) → UDP OSC for TouchDesigner, Max/MSP, VRChat",
    server: "Native Lab Streaming Layer (--lsl), VRChat UDP OSC (--osc), and HTTP webhooks",
  },
  {
    dim: "AI Copilot",
    cloud: "Buddy (buddy.pieeg.com): 100% in-tab, 10 read-only tools, BYO LLM key or local Ollama",
    server: "PiEEG Agent (pieeg-agent): LSL perception cascade, Jupyter notebook generator, MCP server",
  },
];

export default function CloudPrivacyAndEcosystem() {
  return (
    <>
      {/* ── Featured Experiences & Architectural Rigor ─────────────────────── */}
      <section className="py-14 sm:py-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
                [35+ BROWSER-NATIVE EXPERIENCES]
              </p>
              <h2 className="title-section text-zinc-900 dark:text-zinc-50">
                Browser-first ML. Explainable weights. Honest cross-validation.
              </h2>
              <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-3xl">
                Every experience in <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">cloud.pieeg.com/experiences</code> is
                lazy-loaded into its own JS chunk, reads ring buffers via refs to preserve 60 fps, explains its protocol
                and sensor limits up front, and reports trial-grouped cross-validation rather than inflated sample splits.
              </p>
            </div>
            <Link
              href="/examples"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shrink-0 self-start md:self-auto"
            >
              View All 35+ Experiences
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_EXPERIENCES.map((exp) => {
              const Icon = exp.Icon;
              return (
                <a
                  key={exp.slug}
                  href={`${CLOUD_EXP_BASE}/${exp.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-900 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-9 h-9 rounded-lg bg-linear-to-br ${exp.gradient} flex items-center justify-center text-white`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                        {exp.tag}
                      </span>
                    </div>
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {exp.name}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2.5 border-t border-zinc-200/60 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    <span>Launch in Cloud</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 05: Data & Privacy Architecture + Cloud vs Self-Hosted ─── */}
      <section
        id="privacy-contract"
        className="scroll-mt-20 py-14 sm:py-16 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/25"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3">
              [05 · DATA ARCHITECTURE &amp; DEPLOYMENT MODES]
            </p>
            <h2 className="title-section text-zinc-900 dark:text-zinc-50">
              What stays in your tab, and the three opt-in paths that touch a server
            </h2>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-3xl">
              PiEEG Cloud is a static web application. Acquisition, filtering, spike rejection, spectral analysis,
              on-device classifiers, and local CSV recording run on your machine with no background upload.
            </p>
          </div>

          {/* Privacy Architecture Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/15">
              <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-2">
                <HardDrive className="w-4 h-4 text-emerald-500" />
                Default: Local to Your Device
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Web Bluetooth and Web Serial streams, DSP, FFT, 3D head maps, trained pattern weights (in{" "}
                <code className="font-mono">localStorage</code>), Local Bridge WebRTC P2P frames, and local CSV downloads
                never talk to PiEEG servers.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70">
              <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-2">
                <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  Opt-In 1
                </span>
                Live Relay
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                When you start a relay, frames pass through our Fly.io (London) relay in transit to whoever holds your{" "}
                <code className="font-mono">/live/:relayId</code> link and are immediately discarded. Relay signal data is
                not recorded or logged.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70">
              <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-2">
                <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  Opt-In 2
                </span>
                Session &amp; Bio-Pen Sharing
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Recordings stay on your disk until you explicitly upload one to Cloud Library (DigitalOcean Spaces, London)
                or save a <code className="font-mono">/lab/:id</code> Bio-Pen. Visibility (private, unlisted, public),
                embargo date, and permanent deletion are under your control.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70">
              <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-2">
                <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  Opt-In 3
                </span>
                Cloud OTP Sign-In
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Signing in to manage uploaded sessions uses your email and a 6-digit one-time code (MongoDB, Dublin). No
                passwords are stored. This is separate from the local 6-digit <code className="font-mono">--auth</code>{" "}
                code verified by a self-hosted <code className="font-mono">pieeg-server</code>.
              </p>
            </div>
          </div>

          {/* Browser-Native Cloud vs Self-Hosted PiEEG Server Table */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
                <Server className="w-4 h-4 text-cyan-500" />
                Browser-Native Cloud vs Self-Hosted PiEEG Server
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Same React 19 + Vite 6 dashboard UI · MIT Licensed
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 font-mono text-xs">
                    <th className="py-3 px-4 sm:px-5 font-semibold">Layer</th>
                    <th className="py-3 px-4 sm:px-5 font-semibold text-cyan-600 dark:text-cyan-400">
                      PiEEG Cloud (cloud.pieeg.com)
                    </th>
                    <th className="py-3 px-4 sm:px-5 font-semibold text-violet-600 dark:text-violet-400">
                      Self-Hosted (pieeg-server)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {COMPARISON_ROWS.map((r) => (
                    <tr key={r.dim}>
                      <td className="py-3.5 px-4 sm:px-5 font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                        {r.dim}
                      </td>
                      <td className="py-3.5 px-4 sm:px-5 text-zinc-600 dark:text-zinc-300">
                        {r.cloud}
                      </td>
                      <td className="py-3.5 px-4 sm:px-5 text-zinc-600 dark:text-zinc-400">
                        {r.server}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="title-section text-zinc-900 dark:text-zinc-50 mb-3">
            Open a tab and inspect the signal
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 mb-7 max-w-2xl mx-auto">
            Pair a board over Web Bluetooth or Web Serial, launch a synthetic stream in Mock Studio, or write a 15 Hz
            pipeline in Live Lab.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://cloud.pieeg.com/lobby"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-sm transition-colors shadow-md shadow-cyan-500/20"
            >
              <Rocket className="w-4 h-4" />
              Launch PiEEG Cloud
            </a>
            <a
              href="https://cloud.pieeg.com/lab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
              Open Live Lab
            </a>
            <a
              href="https://buddy.pieeg.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Bot className="w-4 h-4 text-violet-500" />
              Open Buddy
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <a
              href="https://docs.pieeg.com/cloud/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Cloud Docs
            </a>
            <a
              href="https://cloud.pieeg.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Data &amp; Privacy Policy
            </a>
            <a
              href="https://discord.gg/neJ45FR6Sv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              Discord Community
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
