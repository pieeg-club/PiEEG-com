import { Metadata } from "next";
import Link from "next/link";
import { Code2 as Github, MessageCircle, BookOpen, Code, GitFork, Star, Heart, ExternalLink, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Open Source — PiEEG",
  description:
    "Join the PiEEG community. Contribute to open-source neuroscience software. MIT-licensed pieeg-server and SDKs. Community-driven, built in the open.",
};

const repositories = [
  {
    name: "EEGwithRaspberryPI",
    description: "Measure 8 EEG channels with Shield PiEEG and RaspberryPi in C library (not actively supported)",
    language: "Python",
    stars: "935",
    forks: "89",
    color: "bg-blue-500"
  },
  {
    name: "ironbci",
    description: "Wearable (BLE) Brain-Computer Interface, ADS1299 and STM32 with SDK for mobile application",
    language: "Python",
    stars: "595",
    forks: "57",
    color: "bg-blue-500"
  },
  {
    name: "EEG-with-JetsonNano",
    description: "With deep learning to neuroscience world with shield for Jetson Nano - JNEEG",
    language: "Python",
    stars: "58",
    forks: "8",
    color: "bg-blue-500"
  },
  {
    name: "PiEEG-16",
    description: "Measure 16 EEG channels with Shield PiEEG-16 and RaspberryPi",
    language: "Python",
    stars: "57",
    forks: "11",
    color: "bg-blue-500"
  },
  {
    name: "ardEEG",
    description: "Arduino for measure EEG, EMG, and ECG bio-signals",
    language: "Python",
    stars: "51",
    forks: "9",
    color: "bg-blue-500"
  },
  {
    name: "PiEEG_Kit",
    description: "BioLab in home to measure EEG, EMG, EKG, EOG, PPG",
    language: "Python",
    stars: "51",
    forks: "7",
    color: "bg-blue-500"
  },
  {
    name: "PiEEG-server",
    description: "One-line install streaming server, terminal monitor, and browser dashboard for the PiEEG shields",
    language: "TypeScript",
    stars: "33",
    forks: "7",
    color: "bg-blue-600"
  },
  {
    name: "PiEEG",
    description: "Measure 8 EEG channels with Shield PiEEG and RaspberryPi",
    language: "Python",
    stars: "30",
    forks: "5",
    color: "bg-blue-500"
  },
  {
    name: "ironbci-32",
    description: "32 EEG channels low-cost brain-computer interface",
    language: "Python",
    stars: "19",
    forks: "2",
    color: "bg-blue-500"
  },
  {
    name: "ironbci_3D_EEG_Printable_Headset",
    description: "Fully open, 3D-printable EEG headset for ironbci — designed for DIY neuroscience and BCI experiments",
    language: "3D Print",
    stars: "17",
    forks: "2",
    color: "bg-purple-500"
  },
  {
    name: "BioRon_EEG",
    description: "Active electrode to measure EEG. Low-noise power supply, 2 stage Amplifier, DRL, Band-Pass Filter, ADC",
    language: "Hardware",
    stars: "14",
    forks: "3",
    color: "bg-purple-500"
  },
  {
    name: "ChatGPT_PiEEG",
    description: "Connect brain-computer interface to ChatGPT",
    language: "Python",
    stars: "12",
    forks: "2",
    color: "bg-blue-500"
  }
];

const contributors = [
  { role: "Repositories", count: 17, description: "Open-source projects" },
  { role: "GitHub Stars", count: "2.5K", description: "Across all repositories" },
  { role: "Followers", count: 170, description: "GitHub community" },
  { role: "Community", count: "1K+", description: "Discord & social media" }
];

const contribute = [
  {
    icon: Code,
    title: "Write Code",
    description: "Contribute to firmware, server, SDK, or web UI. All skill levels welcome.",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    icon: BookOpen,
    title: "Improve Docs",
    description: "Write tutorials, fix typos, translate pages, or create examples.",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    icon: MessageCircle,
    title: "Help Others",
    description: "Answer questions on Discord, review PRs, or mentor new users.",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    icon: GitFork,
    title: "Build Hardware",
    description: "Design new shields, cases, or electrodes. Share your mods!",
    gradient: "from-orange-500 to-red-600"
  }
];

const principles = [
  {
    title: "Truly Open",
    description: "MIT-licensed software (pieeg-server and SDKs). Hardware is proprietary. Fork and build freely on the software side.",
    icon: "🔓"
  },
  {
    title: "Community First",
    description: "Decisions made in the open. RFCs, public roadmap, transparent governance.",
    icon: "🤝"
  },
  {
    title: "Built to Last",
    description: "Long-term support. No planned obsolescence. Backward compatibility.",
    icon: "🏗️"
  },
  {
    title: "Science for All",
    description: "Democratizing neuroscience tools. Accessible pricing. Educational focus.",
    icon: "🧠"
  }
];

export default function OpenSourcePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm mb-6">
              <Heart className="w-4 h-4 text-cyan-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Open Source & Community
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.02] mb-6">
              Built in the open,
              <br />
              <span className="bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-500 bg-clip-text text-transparent">
                powered by community
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 mb-8 max-w-xl mx-auto leading-relaxed">
              Every line of code, every software decision — made in the open. Join thousands of researchers, makers, and neuroscience enthusiasts building the future of BCI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://github.com/pieeg-club"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-md"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
              <a
                href="https://discord.gg/neJ45FR6Sv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {contributors.map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl font-extrabold bg-linear-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-1">
                  {stat.count}+
                </div>
                <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-0.5">
                  {stat.role}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repositories */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Our Repositories
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              17 repositories. Software and SDKs are MIT licensed. Fork, modify, and build upon our code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repo, idx) => (
              <a
                key={idx}
                href={`https://github.com/pieeg-club/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Github className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                      <h3 className="font-bold text-lg group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {repo.name}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                      {repo.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-full ${repo.color}`}></div>
                    <span className="text-zinc-600 dark:text-zinc-400">{repo.language}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                    <Star className="w-4 h-4" />
                    {repo.stars}
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                    <GitFork className="w-4 h-4" />
                    {repo.forks}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://github.com/pieeg-club"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold"
            >
              View all repositories on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* How to Contribute */}
      <section className="py-20 sm:py-24 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Ways to Contribute
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              You don&apos;t need to be a developer. Everyone can contribute to open-source neuroscience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {contribute.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-200 flex gap-5"
                >
                  <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${item.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-2">{item.title}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <Link
                      href="https://github.com/pieeg-club"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      Get Started
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="py-20 sm:py-24 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Our Open-Source Principles
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              The values that guide every decision we make
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {principles.map((principle, idx) => (
              <div
                key={idx}
                className="flex gap-5 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm"
              >
                <div className="text-3xl flex-shrink-0">{principle.icon}</div>
                <div>
                  <h3 className="text-base font-bold mb-2">{principle.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* License Section */}
      <section className="py-20 sm:py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-12 rounded-2xl bg-gradient-to-br from-green-50 to-cyan-50 dark:from-green-950/30 dark:to-cyan-950/30 border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-cyan-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">MIT-Licensed Software</h2>
                <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                  PiEEG software and SDKs — including pieeg-server — are MIT licensed. You&apos;re free to use, modify, distribute, and build upon our code for research, education, and commercial purposes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://github.com/pieeg-club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 text-white font-semibold shadow-lg transition-all"
                  >
                    View on GitHub
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://discord.gg/neJ45FR6Sv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-green-300 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-950/50 font-semibold transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Join Community
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Links */}
      <section className="py-16 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight mb-3">
            Join Our Community
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-10">
            Connect with other PiEEG users, get help, share projects, and stay updated.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: "https://github.com/pieeg-club", Icon: Github, label: "GitHub", desc: "Code, issues, and pull requests", external: true },
              { href: "https://discord.gg/neJ45FR6Sv", Icon: MessageCircle, label: "Discord", desc: "Real-time chat and support", external: true },
              { href: "/support", Icon: BookOpen, label: "Documentation", desc: "Guides, tutorials, and API docs", external: false },
            ].map(({ href, Icon, label, desc, external }) => {
              const props = external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
              return (
                <a
                  key={label}
                  href={href}
                  {...props}
                  className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-200 group text-left flex flex-col gap-3"
                >
                  <Icon className="w-8 h-8 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
                  <div>
                    <h3 className="font-bold mb-1">{label}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{desc}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight mb-3">
            Your contribution matters
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-xl mx-auto leading-relaxed">
            Every bug report, documentation fix, and feature request helps make neuroscience more accessible.
          </p>
          <a
            href="https://github.com/pieeg-club/PiEEG-server"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-lg"
          >
            View PiEEG Server
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
