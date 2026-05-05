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
  Search,
  ChevronRight,
  ExternalLink
} from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation — PiEEG",
  description:
    "Complete guides, tutorials, and API documentation for PiEEG biosignal acquisition hardware and software.",
};

const featuredIn = [
  { name: "Tom's Hardware", logo: "Tom's Hardware" },
  { name: "IEEE Spectrum", logo: "IEEE Spectrum" },
  { name: "VICE", logo: "VICE" },
  { name: "Raspberry Pi", logo: "Raspberry Pi" },
  { name: "Hackaday", logo: "Hackaday" },
  { name: "Hackster.io", logo: "Hackster.io" },
  { name: "Electronics Weekly", logo: "Electronics Weekly" },
  { name: "Arduino", logo: "Arduino" },
  { name: "CNX Software", logo: "CNX Software" },
];

const quickStart = [
  {
    title: "Install PiEEG Server",
    description: "Set up the Python server in under 60 seconds",
    icon: Terminal,
    time: "2 min",
    href: "#install"
  },
  {
    title: "Connect Hardware",
    description: "Wire up your PiEEG device and verify connections",
    icon: CircuitBoard,
    time: "5 min",
    href: "#hardware"
  },
  {
    title: "Stream Your First Signal",
    description: "Acquire and visualize EEG in real-time",
    icon: Zap,
    time: "3 min",
    href: "#stream"
  }
];

const guides = [
  {
    category: "Getting Started",
    icon: Rocket,
    gradient: "from-cyan-500 to-blue-600",
    items: [
      { title: "Installation Guide", description: "Install pieeg-server on any platform", href: "#" },
      { title: "Hardware Setup", description: "Connect and configure your device", href: "#" },
      { title: "First Acquisition", description: "Stream your first biosignal", href: "#" },
      { title: "Web UI Quickstart", description: "Use the browser-based interface", href: "#" }
    ]
  },
  {
    category: "Hardware Guides",
    icon: CircuitBoard,
    gradient: "from-purple-500 to-pink-600",
    items: [
      { title: "PiEEG Assembly", description: "Build your PiEEG from scratch", href: "#" },
      { title: "IronBCI-32 Setup", description: "Configure the 32-channel system", href: "#" },
      { title: "Electrode Placement", description: "10-20 system and custom montages", href: "#" },
      { title: "Signal Quality Testing", description: "Verify hardware performance", href: "#" }
    ]
  },
  {
    category: "Software & API",
    icon: Code2,
    gradient: "from-green-500 to-emerald-600",
    items: [
      { title: "Python SDK", description: "Complete API reference for pieeg-python", href: "#" },
      { title: "Real-time Processing", description: "Filters, FFT, and feature extraction", href: "#" },
      { title: "WebSocket Streaming", description: "Connect from any language", href: "#" },
      { title: "Data Export", description: "Save to EDF, BDF, CSV, or HDF5", href: "#" }
    ]
  },
  {
    category: "Advanced Topics",
    icon: GraduationCap,
    gradient: "from-orange-500 to-red-600",
    items: [
      { title: "Custom Firmware", description: "Modify and flash custom firmware", href: "#" },
      { title: "Active Electrodes", description: "Design and build active electrodes", href: "#" },
      { title: "Multi-Device Sync", description: "Synchronize multiple PiEEG units", href: "#" },
      { title: "Edge ML Inference", description: "Run models on JNEEG/Jetson", href: "#" }
    ]
  },
  {
    category: "BCI Applications",
    icon: Zap,
    gradient: "from-blue-500 to-indigo-600",
    items: [
      { title: "Motor Imagery", description: "Build a left/right hand classifier", href: "#" },
      { title: "P300 Speller", description: "Create a brain-controlled keyboard", href: "#" },
      { title: "SSVEP Detection", description: "Frequency-based BCI paradigm", href: "#" },
      { title: "Neurofeedback", description: "Real-time alpha/theta training", href: "#" }
    ]
  },
  {
    category: "Troubleshooting",
    icon: Wrench,
    gradient: "from-pink-500 to-purple-600",
    items: [
      { title: "Common Issues", description: "Solutions to frequent problems", href: "#" },
      { title: "Noise Reduction", description: "Eliminate 50/60 Hz interference", href: "#" },
      { title: "Calibration Guide", description: "Optimize ADC settings", href: "#" },
      { title: "FAQ", description: "Frequently asked questions", href: "#" }
    ]
  }
];

const codeExamples = [
  {
    title: "Minimal EEG Stream",
    language: "Python",
    code: `from pieeg import PiEEG

eeg = PiEEG(channels=8, rate=250)
for sample in eeg.stream():
    print(sample.shape)  # (8, 250)`
  },
  {
    title: "Band Power Analysis",
    language: "Python",
    code: `alpha = eeg.band_power(sample, 8, 13)
beta = eeg.band_power(sample, 13, 30)
ratio = beta / alpha
print(f"Focus: {ratio:.2f}")`
  },
  {
    title: "Real-time Filter",
    language: "Python",
    code: `# Apply 50 Hz notch filter
filtered = eeg.notch_filter(
    sample, 
    freq=50, 
    quality=30
)`
  }
];

const resources = [
  {
    title: "Example Projects",
    description: "30+ ready-to-run examples for common BCI tasks",
    icon: FileCode,
    href: "https://github.com/pieeg-club/pieeg-examples",
    external: true
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides on YouTube",
    icon: GraduationCap,
    href: "#",
    external: false
  },
  {
    title: "Research Papers",
    description: "Publications using PiEEG hardware",
    icon: BookOpen,
    href: "#",
    external: false
  },
  {
    title: "Community Forum",
    description: "Ask questions and share knowledge",
    icon: ExternalLink,
    href: "https://discord.gg/neJ45FR6Sv",
    external: true
  }
];

export default function DocsPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 mb-6">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Documentation
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Everything you need
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-cyan-600 to-purple-600 dark:from-blue-400 dark:via-cyan-500 dark:to-purple-500 bg-clip-text text-transparent">
                to build with PiEEG
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              Comprehensive guides, API docs, tutorials, and examples. From first install to production BCI applications.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-12 pr-4 py-4 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#quickstart"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all"
              >
                <Rocket className="w-5 h-5" />
                Quick Start
              </Link>
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

        {/* Featured In Section */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col items-center gap-6">
              {/* Label */}
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                Featured In
              </p>
              
              {/* Animated Scrolling Logos */}
              <div className="relative w-full overflow-hidden">
                <div className="flex gap-12 md:gap-16 animate-scroll-slow hover:[animation-play-state:paused]">
                  {[...featuredIn, ...featuredIn].map(({ name, logo }, index) => (
                    <div
                      key={`${name}-${index}`}
                      className="group relative flex items-center justify-center px-4 py-2 transition-all duration-300 hover:scale-110 shrink-0"
                    >
                      <span className="text-sm md:text-base font-semibold text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-zinc-400 transition-colors duration-300 whitespace-nowrap">
                        {logo}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quickstart" className="py-20 sm:py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Quick Start Guide
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Get up and running in 10 minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {quickStart.map((step, idx) => {
              const Icon = step.icon;
              return (
                <Link
                  key={idx}
                  href={step.href}
                  className="group relative p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:shadow-xl hover:border-cyan-300 dark:hover:border-cyan-700 transition-all"
                >
                  <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    {step.time}
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xl font-bold mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    Step {idx + 1}: {step.title}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {step.description}
                  </p>
                </Link>
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
      <section id="guides" className="py-20 sm:py-24 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
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
                  <div className={`p-6 bg-gradient-to-r ${section.gradient}`}>
                    <div className="flex items-center gap-3 text-white">
                      <Icon className="w-6 h-6" />
                      <h3 className="text-xl font-bold">{section.category}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li key={i}>
                          <Link
                            href={item.href}
                            className="group flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                          >
                            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 flex-shrink-0 mt-0.5 transition-colors" />
                            <div>
                              <div className="font-semibold text-sm group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                {item.title}
                              </div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                {item.description}
                              </div>
                            </div>
                          </Link>
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
      <section className="py-20 sm:py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
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
      <section className="py-20 sm:py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-12 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                <Code2 className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">API Reference</h2>
                <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                  Complete API documentation for all PiEEG Python modules. Auto-generated from docstrings with interactive examples.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/docs/api"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold shadow-lg transition-all"
                  >
                    Browse API Docs
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://github.com/pieeg-club/pieeg-python"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-950/50 font-semibold transition-all"
                  >
                    View on GitHub
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-500 via-cyan-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg text-cyan-50 mb-8 max-w-2xl mx-auto">
            Ask the community on Discord or open an issue on GitHub. We're here to help.
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
