import { Metadata } from "next";
import Link from "next/link";
import {
  Cloud, Zap, ArrowRight, Wifi, Usb, Cpu, Activity, Download,
  BarChart2, BookOpen, Bot, Users, PlayCircle, KeyRound, Bluetooth,
  ShieldCheck, Sparkles, Rocket,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PiEEG Cloud — Zero-Install, Browser-Native BCI Platform",
  description:
    "PiEEG Cloud is a zero-installation, browser-native platform for brain-computer interfaces. Connect IronBCI or PiEEG hardware directly through your browser via Web Bluetooth or Web Serial — EEG collection, streaming and real-time analysis, no install required.",
};

const devices = [
  {
    name: "IronBCI",
    specs: "8-ch • 250 Hz • Wireless",
    link: "Web Bluetooth",
    Icon: Bluetooth,
    gradient: "from-cyan-500 to-blue-600",
    href: "/hardware/ironbci",
  },
  {
    name: "IronBCI-16",
    specs: "16-ch • 250 Hz • Wireless",
    link: "Web Bluetooth",
    Icon: Bluetooth,
    gradient: "from-blue-500 to-indigo-600",
    href: "/hardware/ironbci",
  },
  {
    name: "Octopus 16",
    specs: "16-ch • 250 Hz • ESP32",
    link: "Web Serial",
    Icon: Cpu,
    gradient: "from-violet-500 to-purple-600",
    href: "/hardware",
  },
  {
    name: "IronBCI-32",
    specs: "32-ch • 500 Hz • USB",
    link: "Web Serial",
    Icon: Usb,
    gradient: "from-fuchsia-500 to-pink-600",
    href: "/hardware/ironbci-32",
  },
];

const features = [
  {
    icon: Activity,
    title: "Real-time Visualization",
    description: "Live EEG streaming and monitoring with per-channel signal quality — watch your brain in the browser as it happens.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: BarChart2,
    title: "Advanced Processing",
    description: "Neural decoders and analysis run entirely browser-side: spectral band powers, connectivity, P300 decoding and facial-EMG classifiers.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Download,
    title: "Export & Integrate",
    description: "Seamless data export and API access. Capture labelled sessions and take your recordings anywhere for offline analysis.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: BookOpen,
    title: "Quick Start Guide",
    description: "Step-by-step setup that gets you from unboxing to a live stream in minutes — no drivers, no terminal, no installation.",
    gradient: "from-amber-500 to-orange-600",
  },
];

const whyCloud = [
  {
    icon: Cloud,
    title: "Zero installation",
    description: "Nothing to download or install. Open a browser tab and you are already running a full BCI stack.",
  },
  {
    icon: Bluetooth,
    title: "Web Bluetooth & Web Serial",
    description: "Hardware connects directly through native browser APIs — wireless over BLE or wired over USB/ESP32.",
  },
  {
    icon: ShieldCheck,
    title: "Runs where you are",
    description: "Cross-platform by design — Windows, macOS, Linux and Chromebooks. If it runs a modern browser, it runs PiEEG Cloud.",
  },
];

export default function CloudPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-blue-500/5 to-violet-500/5" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[64px_64px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm mb-4">
              <Cloud className="w-4 h-4 text-cyan-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Cloud Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.02] mb-4">
              Welcome to
              <br />
              <span className="bg-linear-to-r from-cyan-500 via-blue-500 to-violet-500 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
                PiEEG Cloud
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 mb-6 max-w-xl mx-auto leading-relaxed">
              EEG data collection, streaming, and real-time analysis. In the browser, no install required — your hardware connects directly through Web Bluetooth or Web Serial.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://cloud.pieeg.com/lobby"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition-colors shadow-md shadow-cyan-500/20"
              >
                <Rocket className="w-4 h-4" />
                Get Started
              </a>
              <Link
                href="/hardware"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Hardware
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://buddy.pieeg.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Bot className="w-4 h-4 text-cyan-500" />
                Meet Buddy
              </a>
            </div>
          </div>

          {/* Flow diagram */}
          <div className="flex items-center justify-center gap-3 flex-wrap text-sm font-medium">
            {[
              { label: "PiEEG / IronBCI Hardware", color: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800" },
              { label: "→", color: "" },
              { label: "Web Bluetooth / Web Serial", color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800" },
              { label: "→", color: "" },
              { label: "PiEEG Cloud (your browser)", color: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800" },
            ].map((item, i) =>
              item.color ? (
                <span key={i} className={`px-3 py-1 rounded-full border text-xs font-semibold ${item.color}`}>
                  {item.label}
                </span>
              ) : (
                <span key={i} className="text-zinc-400 dark:text-zinc-600">{item.label}</span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Choose Your Connection */}
      <section className="py-10 sm:py-14 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Choose Your Connection</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Plug in a supported device, or explore with a demo — no hardware needed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {devices.map((device) => (
              <div
                key={device.name}
                className="group flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-200"
              >
                <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${device.gradient} flex items-center justify-center text-white shadow-md mb-4`}>
                  <device.Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">{device.name}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{device.specs}</p>
                <span className="mt-2 inline-flex w-fit items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                  {device.link === "Web Bluetooth" ? <Bluetooth className="w-3 h-3" /> : <Usb className="w-3 h-3" />}
                  {device.link}
                </span>
                <a
                  href="https://cloud.pieeg.com/lobby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
                >
                  Connect
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>

          {/* Demo + Session code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div className="flex items-start gap-4 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60">
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shrink-0">
                <PlayCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">No device? Try a demo</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 mb-3">
                  Launch an interactive demo stream — pick 8-ch, 16-ch or 32-ch and explore the full platform without hardware.
                </p>
                <a
                  href="https://cloud.pieeg.com/lobby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  Launch Demo
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60">
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-md shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Have a session code?</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 mb-3">
                  Enter a session code to join a shared EEG stream — perfect for classrooms, demos and remote collaboration.
                </p>
                <a
                  href="https://cloud.pieeg.com/lobby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  Join a shared stream
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 sm:py-14 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">What You Can Do</h2>
            <p className="text-zinc-500 dark:text-zinc-400">A complete BCI workflow, all in the browser</p>
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

      {/* Why Cloud */}
      <section className="py-10 sm:py-14 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Why Browser-Native?</h2>
            <p className="text-zinc-500 dark:text-zinc-400">The barrier to brain-computer interfaces just disappeared</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {whyCloud.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm"
                >
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/40 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
              No install required
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to stream your brain?
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            Open PiEEG Cloud, connect your device, and start collecting, streaming and analysing EEG in real time. Need a hand? Meet Buddy, our AI copilot, or dive into the docs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://cloud.pieeg.com/lobby"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition-colors shadow-md shadow-cyan-500/20"
            >
              <Rocket className="w-4 h-4" />
              Launch PiEEG Cloud
            </a>
            <a
              href="https://buddy.pieeg.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Bot className="w-4 h-4 text-cyan-500" />
              Meet Buddy
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <a
              href="https://docs.pieeg.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Documentation
            </a>
            <a
              href="https://discord.gg/neJ45FR6Sv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <Users className="w-4 h-4" />
              Community
            </a>
            <a
              href="https://github.com/pieeg-club/PiEEG-server"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <Zap className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
