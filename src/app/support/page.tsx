import { Metadata } from "next";
import Link from "next/link";
import { 
  BookOpen, 
  Rocket, 
  Code2, 
  Wrench, 
  Zap, 
  CircuitBoard,
  Terminal,
  FileCode,
  GraduationCap,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Wifi
} from "lucide-react";

export const metadata: Metadata = {
  title: "Support — PiEEG",
  description:
    "Documentation, guides, and support resources for PiEEG biosignal acquisition hardware and software.",
};

const DOCS_BASE = "https://docs.pieeg.com";

const quickStart = [
  {
    title: "Install the Server",
    description: "One-line install on Raspberry Pi OS — enables SPI, installs pieeg-server, and starts the service",
    icon: Terminal,
    time: "2 min",
    href: `${DOCS_BASE}/software/getting-started/installation/`
  },
  {
    title: "Open the Dashboard",
    description: "Browse to http://raspberrypi.local:1617, click Connect and start streaming in real time",
    icon: CircuitBoard,
    time: "1 min",
    href: `${DOCS_BASE}/software/features/dashboard/`
  },
  {
    title: "Stream from Code",
    description: "Connect any WebSocket client to ws://raspberrypi.local:1616 — plain JSON, no SDK required",
    icon: Zap,
    time: "3 min",
    href: `${DOCS_BASE}/software/api/websocket/`
  }
];

const guides = [
  {
    category: "Getting Started",
    icon: Rocket,
    gradient: "from-cyan-500 to-blue-600",
    items: [
      { title: "Installation", description: "One-line install on Raspberry Pi OS", href: `${DOCS_BASE}/software/getting-started/installation/` },
      { title: "Quick Start", description: "Get streaming in under 5 minutes", href: `${DOCS_BASE}/software/getting-started/quick-start/` },
      { title: "Configuration", description: "CLI flags, config file, and service options", href: `${DOCS_BASE}/software/getting-started/configuration/` },
    ]
  },
  {
    category: "Hardware",
    icon: CircuitBoard,
    gradient: "from-purple-500 to-pink-600",
    items: [
      { title: "Device Overview", description: "All supported PiEEG boards and specs", href: `${DOCS_BASE}/hardware/devices/` },
      { title: "Accessories", description: "Electrodes, caps, and power banks", href: `${DOCS_BASE}/hardware/accessories/` },
      { title: "Signal Quality", description: "Noise elimination and best practices", href: `${DOCS_BASE}/hardware/signal-quality/noise-elimination/` },
      { title: "Safety", description: "Liabilities and safe usage guidelines", href: `${DOCS_BASE}/hardware/safety/` },
    ]
  },
  {
    category: "Software Features",
    icon: Code2,
    gradient: "from-green-500 to-emerald-600",
    items: [
      { title: "Server", description: "pieeg-server modes, options, and systemd service", href: `${DOCS_BASE}/software/features/server/` },
      { title: "Dashboard", description: "Browser-based real-time visualization at :1617", href: `${DOCS_BASE}/software/features/dashboard/` },
      { title: "Recording", description: "Save sessions to CSV with the built-in recorder", href: `${DOCS_BASE}/software/features/recording/` },
      { title: "Detectors", description: "Built-in blink, focus, and event detectors", href: `${DOCS_BASE}/software/features/detectors/` },
    ]
  },
  {
    category: "API Reference",
    icon: Terminal,
    gradient: "from-orange-500 to-red-600",
    items: [
      { title: "WebSocket API", description: "Real-time data stream on port 1616", href: `${DOCS_BASE}/software/api/websocket/` },
      { title: "Data Format", description: "Frame structure and field reference", href: `${DOCS_BASE}/software/api/data-format/` },
      { title: "ADS1299 Registers", description: "Low-level ADC register control", href: `${DOCS_BASE}/software/features/registers/` },
      { title: "Authentication", description: "Secure access with tokens", href: `${DOCS_BASE}/software/reference/authentication/` },
    ]
  },
  {
    category: "Integrations",
    icon: Wifi,
    gradient: "from-blue-500 to-indigo-600",
    items: [
      { title: "Jupyter Notebooks", description: "Live streaming and recording analysis notebooks", href: `${DOCS_BASE}/software/integrations/notebooks/` },
      { title: "Lab Streaming Layer", description: "LSL outlet for OpenViBE, MNE, LabRecorder", href: `${DOCS_BASE}/software/integrations/lsl/` },
      { title: "VRChat OSC", description: "Brain-driven avatar control over OSC/UDP", href: `${DOCS_BASE}/software/integrations/vrchat-osc/` },
      { title: "Webhooks & IFTTT", description: "Trigger automation from EEG detectors", href: `${DOCS_BASE}/software/integrations/webhooks/` },
    ]
  },
  {
    category: "Troubleshooting",
    icon: Wrench,
    gradient: "from-pink-500 to-purple-600",
    items: [
      { title: "Self-Diagnostics", description: "Run pieeg-server doctor to check everything", href: `${DOCS_BASE}/software/reference/troubleshooting/` },
      { title: "Common Issues", description: "SPI, ports, hardware, and dashboard fixes", href: `${DOCS_BASE}/software/reference/troubleshooting/` },
      { title: "Security", description: "Auth, TLS, and network exposure guidance", href: `${DOCS_BASE}/software/reference/security/` },
      { title: "Architecture", description: "Platform internals and module map", href: `${DOCS_BASE}/software/reference/architecture/` },
    ]
  }
];

const codeExamples = [
  {
    title: "Install & Launch",
    language: "Shell",
    code: `pip install pieeg-server
sudo reboot          # first time only, enables SPI
pieeg-server         # or: pieeg-server --mock (no hardware)`
  },
  {
    title: "Stream via WebSocket",
    language: "Python",
    code: `import asyncio, json, websockets

async def main():
    async with websockets.connect(
            "ws://raspberrypi.local:1616") as ws:
        async for msg in ws:
            frame = json.loads(msg)
            print(frame["channels"])

asyncio.run(main())`
  },
  {
    title: "Recording Analysis",
    language: "Python",
    code: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("pieeg_session.csv")
fig, axes = plt.subplots(4, 4, figsize=(16, 12),
                         sharex=True)
for i, ax in enumerate(axes.flat):
    ax.plot(df.iloc[:, i + 1], linewidth=0.3)
plt.tight_layout(); plt.show()`
  }
];

const resources = [
  {
    title: "Full Documentation",
    description: "Hardware guides, software reference, API, and integrations",
    icon: BookOpen,
    href: "https://docs.pieeg.com/",
    external: true
  },
  {
    title: "GitHub",
    description: "Source code, issue tracker, and example notebooks",
    icon: FileCode,
    href: "https://github.com/pieeg-club",
    external: true
  },
  {
    title: "Live Demo",
    description: "Try the dashboard without hardware at cloud.pieeg.com",
    icon: GraduationCap,
    href: "https://cloud.pieeg.com/",
    external: true
  },
  {
    title: "Community Discord",
    description: "Ask questions and share projects with other builders",
    icon: ExternalLink,
    href: "https://discord.gg/neJ45FR6Sv",
    external: true
  }
];

export default function SupportPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 mb-6">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Support &amp; Docs
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Get help with
              <br />
              <span className="bg-linear-to-r from-blue-500 via-cyan-600 to-purple-600 dark:from-blue-400 dark:via-cyan-500 dark:to-purple-500 bg-clip-text text-transparent">
                PiEEG hardware &amp; software
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              From electrode wiring to live WebSocket streams — complete coverage of PiEEG hardware, PiEEG Server software, and all integrations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://pieeg-club.github.io/PiEEG-docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all"
              >
                <BookOpen className="w-5 h-5" />
                Open Documentation
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="#guides"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold transition-all"
              >
                Browse Guides
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quickstart" className="py-10 sm:py-14 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Quick Start Guide
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Get streaming in under 5 minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {quickStart.map((step, idx) => {
              const Icon = step.icon;
              return (
                <a
                  key={idx}
                  href={step.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:shadow-xl hover:border-cyan-300 dark:hover:border-cyan-700 transition-all"
                >
                  <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    {step.time}
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xl font-bold mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    Step {idx + 1}: {step.title}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {step.description}
                  </p>
                </a>
              );
            })}
          </div>

          {/* Code Examples */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {codeExamples.map((example, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg">
                <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2">
                      {example.title}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400">{example.language}</span>
                </div>
                <div className="p-4 bg-zinc-900 dark:bg-zinc-950">
                  <pre className="text-xs leading-relaxed overflow-x-auto">
                    <code className="text-zinc-100 font-mono whitespace-pre">
                      {example.code}
                    </code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section id="guides" className="py-10 sm:py-14 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Complete Documentation
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Organized by topic for easy navigation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className={`p-6 bg-linear-to-r ${section.gradient}`}>
                    <div className="flex items-center gap-3 text-white">
                      <Icon className="w-6 h-6" />
                      <h3 className="text-xl font-bold">{section.category}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li key={i}>
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                          >
                            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 shrink-0 mt-0.5 transition-colors" />
                            <div>
                              <div className="font-semibold text-sm group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                {item.title}
                              </div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                {item.description}
                              </div>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-10 sm:py-14 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Additional Resources
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Community examples, tutorials, and learning materials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, idx) => {
              const Icon = resource.icon;
              return (
                <a
                  key={idx}
                  href={resource.href}
                  target={resource.external ? "_blank" : undefined}
                  rel={resource.external ? "noopener noreferrer" : undefined}
                  className="group p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:shadow-lg hover:border-cyan-300 dark:hover:border-cyan-700 transition-all"
                >
                  <Icon className="w-10 h-10 text-cyan-600 dark:text-cyan-400 mb-4" />
                  <h3 className="font-bold text-lg mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {resource.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* API Reference Teaser */}
      <section className="py-10 sm:py-14 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-12 rounded-2xl bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-xl bg-linear-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white shrink-0 shadow-lg">
                <Code2 className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">API Reference</h2>
                <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                  Complete reference for the WebSocket data stream (port 1616) and data format. Plain JSON frames — works in any language with WebSocket support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://pieeg-club.github.io/PiEEG-docs/software/api/websocket/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold shadow-lg transition-all"
                  >
                    WebSocket API
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://pieeg-club.github.io/PiEEG-docs/software/api/data-format/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-950/50 font-semibold transition-all"
                  >
                    Data Format
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-linear-to-br from-blue-500 via-cyan-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="text-lg text-cyan-50 mb-8 max-w-2xl mx-auto">
            Ask the community on Discord or open an issue on GitHub. We&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://discord.gg/neJ45FR6Sv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-blue-600 hover:bg-zinc-100 font-bold shadow-xl transition-all"
            >
              Join Discord
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/pieeg-club/pieeg-server/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white hover:bg-white/10 font-bold transition-all"
            >
              Report an Issue
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
