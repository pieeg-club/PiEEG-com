import { Metadata } from "next";
import Link from "next/link";
import { Brain, Globe, MessageSquare, BarChart2, Zap, ArrowRight, Shield, RefreshCw, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "PiEEG Browser Extension — Real-time Brain State on Every Page",
  description:
    "Chrome extension that overlays real-time cognitive state insights on any webpage. Brain insights, neural feedback assistant, live signal quality — all from your PiEEG.",
};

const features = [
  {
    icon: Brain,
    title: "Brain Insights Overlay",
    description: "Draggable HUD showing real-time cognitive state: engagement, workload, fatigue, calm — with confidence badges and animated waveforms.",
    gradient: "from-violet-500 to-purple-600"
  },
  {
    icon: MessageSquare,
    title: "Neural Feedback Assistant",
    description: "AI-powered chat copilot that understands your live brain signals. Ask \"am I focused?\" in plain English. Requires PiEEG-agent.",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    icon: BarChart2,
    title: "Live Signal Quality",
    description: "Confidence badges, trend indicators, and per-channel quality metrics. See exactly which electrodes are clean or noisy.",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    icon: Zap,
    title: "Context-Aware",
    description: "Works on YouTube, docs, games, code editors — your mental state follows you across every tab.",
    gradient: "from-orange-500 to-red-600"
  },
  {
    icon: Shield,
    title: "Scientifically Honest",
    description: "All indices are ratio-based (β/(α+θ), θ/α, etc.), normalised to your session baseline with full citations. No false clinical claims.",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    icon: RefreshCw,
    title: "Auto-Update Notifications",
    description: "The extension checks GitHub for new versions every 6 hours and shows a one-click reload banner when an update is available.",
    gradient: "from-amber-500 to-yellow-600"
  }
];

const brainIndices = [
  { name: "Engagement", formula: "β / (α + θ)", ref: "Pope, Bogart & Bartolome (1995)" },
  { name: "Workload", formula: "θ / α", ref: "Gevins et al. (1997); Holm (2009)" },
  { name: "Fatigue", formula: "(θ + α) / β", ref: "Eoh, Chung & Kim (2005); Jap (2009)" },
  { name: "Calm", formula: "α / total power", ref: "Pfurtscheller & Lopes da Silva (1999)" },
];

const quickStart = [
  {
    step: "1",
    title: "Start PiEEG Server",
    code: `curl -sSL https://raw.githubusercontent.com/pieeg-club/PiEEG-server/main/install.sh | bash
pieeg-server`,
    description: "The server streams EEG data on ws://localhost:1616 and serves a dashboard on :1617.",
    color: "cyan"
  },
  {
    step: "2",
    title: "Load the Extension",
    code: `git clone https://github.com/pieeg-club/PiEEG-chrome.git`,
    description: "Open chrome://extensions, enable Developer mode, click Load unpacked, select the PiEEG-chrome folder.",
    color: "blue"
  },
  {
    step: "3",
    title: "Optional: AI Copilot",
    code: `curl -sSL https://raw.githubusercontent.com/pieeg-club/PiEEG-agent/main/install.sh | bash
pieeg-agent web`,
    description: "Enables the Neural Feedback Assistant chat interface on any page.",
    color: "violet"
  }
];

const permissions = [
  { name: "storage", reason: "Persist your configured server port" },
  { name: "tabs", reason: "Open the dashboard in a new tab" },
  { name: "alarms", reason: "Schedule the periodic update check (every 6 h)" },
  { name: "http://localhost/*", reason: "Fetch /api/info from the local PiEEG server" },
  { name: "raw.githubusercontent.com", reason: "Check for extension updates on GitHub main" },
];

const ports = [
  { service: "HTTP dashboard", port: "1617" },
  { service: "WebSocket stream", port: "1616" },
  { service: "PiEEG-agent (optional)", port: "8000" },
];

export default function BrowserPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm mb-4">
              <Globe className="w-4 h-4 text-violet-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Chrome Extension
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.02] mb-4">
              Your brain state,
              <br />
              <span className="bg-linear-to-r from-violet-500 via-purple-500 to-pink-500 dark:from-violet-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                on every page
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 mb-6 max-w-xl mx-auto leading-relaxed">
              Chrome extension that overlays real-time cognitive state insights on any webpage. Engagement, workload, fatigue, calm — all driven by your live EEG.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://github.com/pieeg-club/PiEEG-chrome"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-md"
              >
                <Globe className="w-4 h-4" />
                View on GitHub
              </a>
              <Link
                href="/server"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Get PiEEG Server first
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Flow diagram */}
          <div className="flex items-center justify-center gap-3 flex-wrap text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {[
              { label: "PiEEG Hardware", color: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800" },
              { label: "→", color: "" },
              { label: "PiEEG-server", color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800" },
              { label: "→", color: "" },
              { label: "Chrome Extension", color: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800" },
              { label: "+", color: "" },
              { label: "PiEEG-agent (optional)", color: "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-800" },
            ].map((item, i) =>
              item.color && item.label !== "→" && item.label !== "+" ? (
                <span key={i} className={`px-3 py-1 rounded-full border text-xs font-semibold ${item.color}`}>
                  {item.label}
                </span>
              ) : (
                <span key={i} className="text-zinc-400 dark:text-zinc-600">{item.label}</span>
              )
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-sm mx-auto">
              Requires PiEEG-server running on localhost. Not available on the Chrome Web Store — localhost-only extensions require developer mode.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-10 sm:py-14 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Quick Start</h2>
            <p className="text-zinc-500 dark:text-zinc-400">Three steps to brain-aware browsing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {quickStart.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-200"
              >
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm mb-4 shadow-md">
                  {item.step}
                </div>
                <h3 className="font-bold mb-3">{item.title}</h3>
                <div className="p-3 rounded-lg bg-zinc-900 dark:bg-zinc-950 border border-zinc-700 mb-3 font-mono text-xs text-cyan-400 overflow-x-auto whitespace-pre">
                  {item.code}
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 text-sm text-amber-700 dark:text-amber-400 text-center">
            Chrome Store policies don&apos;t allow localhost-only extensions. Install via Developer mode instead — it takes 30 seconds.
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 sm:py-14 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">What It Does</h2>
            <p className="text-zinc-500 dark:text-zinc-400">Your browser becomes brain-aware</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-200 flex gap-5"
                >
                  <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${feature.gradient} flex items-center justify-center text-white shadow-md shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brain Indices */}
      <section className="py-10 sm:py-14 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">How Brain Insights Stays Honest</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
              Every reading is a ratio-based index, normalised against your own session baseline (EWMA z-score → logistic). All relative to <em>you</em>.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="text-left py-3 px-4 font-semibold text-zinc-700 dark:text-zinc-300">Index</th>
                  <th className="text-left py-3 px-4 font-semibold text-zinc-700 dark:text-zinc-300">Formula</th>
                  <th className="text-left py-3 px-4 font-semibold text-zinc-700 dark:text-zinc-300">Reference</th>
                </tr>
              </thead>
              <tbody>
                {brainIndices.map((idx, i) => (
                  <tr key={idx.name} className={`border-b border-zinc-100 dark:border-zinc-900 ${i % 2 === 0 ? "bg-zinc-50/50 dark:bg-zinc-900/30" : ""}`}>
                    <td className="py-3 px-4 font-medium">{idx.name}</td>
                    <td className="py-3 px-4 font-mono text-violet-600 dark:text-violet-400 text-xs">{idx.formula}</td>
                    <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400 text-xs">{idx.ref}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500 text-center">
            Confidence reflects baseline coverage and live signal stability. Trends compare fast vs slow EMA with a deadband to avoid jitter. All formulas shown in the overlay&apos;s expandable details panel.
          </p>
        </div>
      </section>

      {/* Updating */}
      <section className="py-10 sm:py-14 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">Staying Up to Date</h2>
              <p className="text-zinc-500 dark:text-zinc-400 mb-4">
                Unpacked extensions don&apos;t auto-update. PiEEG Chrome checks GitHub every 6 hours and shows a banner when a new version is available.
              </p>
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60">
                <p className="text-sm font-semibold mb-2">To apply an update:</p>
                <div className="font-mono text-xs text-cyan-400 bg-zinc-900 dark:bg-zinc-950 rounded-lg p-3 mb-2">
                  git pull
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Then click <strong>Reload</strong> in the popup banner — no need to visit <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 rounded">chrome://extensions</code>.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">Default Ports</h2>
              <div className="space-y-3">
                {ports.map((p) => (
                  <div key={p.service} className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{p.service}</span>
                    <code className="text-sm font-mono font-bold text-violet-600 dark:text-violet-400">:{p.port}</code>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">
                Change the HTTP port in the extension&apos;s settings row — persisted via <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">chrome.storage.sync</code>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Permissions */}
      <section className="py-10 sm:py-14 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Permissions Used</h2>
            <p className="text-zinc-500 dark:text-zinc-400">What the extension requests and why</p>
          </div>

          <div className="space-y-3">
            {permissions.map((p) => (
              <div key={p.name} className="flex items-start gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60">
                <div className="flex items-center gap-2 min-w-45 shrink-0">
                  <Settings className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <code className="text-xs font-mono text-violet-600 dark:text-violet-400">{p.name}</code>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{p.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to try it?
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            Start with the server, then add the extension. The actual EEG streaming and signal processing happen in PiEEG-server. The extension brings your brain data into every tab.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://github.com/pieeg-club/PiEEG-chrome"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-md"
            >
              <Globe className="w-4 h-4" />
              PiEEG-chrome on GitHub
            </a>
            <Link
              href="/server"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              PiEEG Server
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/agent"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              PiEEG Agent
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
