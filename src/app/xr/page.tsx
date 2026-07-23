import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Glasses, Brain, Sparkles, Zap, Flame, Smile, Gamepad2, Eye,
  ArrowRight, Code2, Radio, Cpu, Waves, BadgeCheck, Rocket, Package,
  Users, PlayCircle, ExternalLink, CircuitBoard,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PiEEG XR — Neural Face Interface for Spatial Computing",
  description:
    "PiEEG XR is a neural face interface that snaps onto your VR headset, turning brain signals and facial micro-expressions into real-time avatar control, emotional sync, and focus-to-action interaction. Open source, powered by IronBCI.",
};

const KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/42415505/pieeg-xr-neural-face-interface-for-spatial-computing";

// Core interaction pillars
const pillars = [
  {
    icon: Smile,
    title: "Emotional Sync",
    description:
      "Your avatar smiles when you feel joy and glows when you're excited. Affective computing reads your neural signals and mirrors them in the virtual world.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Brain,
    title: "Neural Interaction",
    description:
      "Use your concentration to manipulate the environment. No controllers, no plastic buttons — just your mind driving the experience.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Eye,
    title: "Facial Micro-Expressions",
    description:
      "Sensors placed on the mask capture facial fEMG, translating the smallest expressions into rich, natural avatar animation.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Flame,
    title: "Focus-to-Action API",
    description:
      "Look at a digital object, concentrate your mental energy, and watch it melt, explode, or transform based on your brainwave intensity.",
    gradient: "from-amber-500 to-orange-600",
  },
];

// IronBCI hardware specs powering PiEEG XR
const specs = [
  { icon: Waves, label: "Low Noise", value: "Research-grade signal quality" },
  { icon: Radio, label: "250 SPS", value: "Samples per second speed" },
  { icon: Cpu, label: "BLE5", value: "Wireless data transfer" },
  { icon: CircuitBoard, label: "24-bit", value: "Resolution per channel" },
];

// Demo videos
const demoVideos = [
  {
    title: "Testing the Headset with PiEEG Dashboard",
    description: "Live neural signals streaming from the XR headset into the PiEEG dashboard.",
    src: "https://pieeg.lon1.cdn.digitaloceanspaces.com/testing-headset-with-pieeg-dashboard.mp4",
    poster: "/xr/xr-headset-main.png",
  },
  {
    title: "Avatar Studio — Quick Demo",
    description: "Facial micro-expressions and brain state driving a live avatar in real time.",
    src: "https://pieeg.lon1.cdn.digitaloceanspaces.com/avatar-studio-quick-demo.mp4",
    poster: "/xr/xr-melt-focus.png",
  },
];

export default function XRPage() {
  return (
    <main className="flex-1">
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 bg-linear-to-br from-violet-500/5 via-cyan-500/5 to-blue-500/5" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[64px_64px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm mb-4">
                <Glasses className="w-4 h-4 text-violet-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Spatial Computing
                </span>
                <span className="px-2 py-0.5 rounded-full bg-violet-500/10 text-[10px] font-bold uppercase tracking-wide text-violet-600 dark:text-violet-400">
                  Prelaunch
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.02] mb-4">
                PiEEG
                <span className="bg-linear-to-r from-violet-500 via-cyan-500 to-blue-500 dark:from-violet-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                  {" "}XR
                </span>
                <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl text-zinc-500 dark:text-zinc-400 font-bold">
                  Neural Face Interface
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 mb-6 max-w-xl leading-relaxed">
                A new human input layer for avatars, games, and mixed reality. Snap our
                shield onto your headset and unlock <strong className="text-zinc-700 dark:text-zinc-200">affective computing</strong> —
                your brain and face become the controller.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <a
                  href={KICKSTARTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors shadow-md shadow-violet-500/20"
                >
                  <Rocket className="w-4 h-4" />
                  Back on Kickstarter
                </a>
                <a
                  href="https://github.com/pieeg-club/ironbci"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Code2 className="w-4 h-4" />
                  Open Source
                </a>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl aspect-4/3">
              <Image
                src="/xr/xr-headset-main.png"
                alt="PiEEG XR neural face interface shield mounted on a VR headset"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── The Missing Link ─────────────────── */}
      <section className="py-10 sm:py-14 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            The Missing Link in Virtual Reality
          </h2>
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            We&apos;ve achieved incredible visuals and spatial audio, but VR is still missing one vital
            ingredient: <strong className="text-zinc-700 dark:text-zinc-200">you</strong>. Today your
            avatar is a hollow shell — it doesn&apos;t know if you are stressed, excited, or focused, and
            you interact using plastic buttons, not your mind. PiEEG XR isn&apos;t just an accessory;
            it&apos;s a <strong className="text-zinc-700 dark:text-zinc-200">biological bridge</strong> that
            reads your neural signals and translates them into digital action.
          </p>
        </div>
      </section>

      {/* ─────────────────── Interaction Pillars ─────────────────── */}
      <section className="py-10 sm:py-14 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              A New Dimension of Interaction
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              Our sensors read your neural signals and facial micro-expressions, then translate them
              into affective, thought-driven interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="group flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-200"
              >
                <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${p.gradient} flex items-center justify-center text-white shadow-md mb-4`}>
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg mb-1.5">{p.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── Mind Over Matter ─────────────────── */}
      <section className="py-10 sm:py-14 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wide mb-4">
                <Flame className="w-3.5 h-3.5" />
                Focus-to-Action
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Mind Over Matter: The Power to Melt
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                The most requested feature of BCI is the ability to influence the world through
                thought. With PiEEG XR, we&apos;ve developed a <strong className="text-zinc-700 dark:text-zinc-200">Focus-to-Action API</strong>.
                In our demo environments, you can look at a digital object, concentrate your mental
                energy, and watch it melt, explode, or transform based on your brainwave intensity.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Melt", "Explode", "Transform"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-300"
                  >
                    <Zap className="w-3 h-3 text-amber-500" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl aspect-4/3">
              <Image
                src="/xr/xr-melt-focus.png"
                alt="Focus-to-Action: a digital object melting under concentrated brainwave intensity"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── Live Demos ─────────────────── */}
      <section className="py-10 sm:py-14 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 mb-4">
              <PlayCircle className="w-4 h-4 text-violet-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Live Demos
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">See It In Action</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              Real neural signals, real avatars — no post-production magic.
            </p>
          </div>

          {/* Featured YouTube */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl aspect-video">
              <iframe
                src="https://www.youtube.com/embed/X3xSN6h-QzM"
                title="PiEEG XR — Neural Face Interface demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* Self-hosted demo clips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {demoVideos.map((v) => (
              <div
                key={v.title}
                className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 overflow-hidden"
              >
                <div className="relative aspect-video bg-black">
                  <video
                    controls
                    preload="none"
                    poster={v.poster}
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={v.src} type="video/mp4" />
                  </video>
                </div>
                <div className="p-5">
                  <h3 className="font-bold mb-1">{v.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── Powered by IronBCI ─────────────────── */}
      <section className="py-10 sm:py-14 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wide mb-4">
                <CircuitBoard className="w-3.5 h-3.5" />
                Open Source. Open Possibilities.
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Powered by IronBCI
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                In the spirit of PiEEG, this project is fully open source. Whether you&apos;re a developer
                building thought-controlled horror games or a researcher studying emotional responses
                in VR, the VR-Link provides the raw data and tools you need to innovate. PiEEG XR is
                powered by an IronBCI device with 600+ stars on GitHub.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-start gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60"
                  >
                    <s.icon className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-sm">{s.label}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">{s.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/pieeg-club/ironbci"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  <Code2 className="w-4 h-4" />
                  ironbci on GitHub
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/hardware/ironbci"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:underline"
                >
                  IronBCI hardware
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl aspect-4/3">
              <Image
                src="/news-images/neural-face-interface-computing-1.png"
                alt="PiEEG XR neural face interface hardware"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── Editions / Why Kickstarter ─────────────────── */}
      <section className="py-10 sm:py-14 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Choose Your Edition</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              A mask built for gamers, designers, and researchers — with an extended edition for the
              visual cortex.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70">
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-md mb-4">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xl mb-1">PiEEG XR</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                The face mask for gamers, designers, and creators — neural face interface for avatar
                control and affective computing.
              </p>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-violet-500" /> Emotional sync & neural interaction</li>
                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-violet-500" /> Focus-to-Action API</li>
                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-violet-500" /> Snaps onto your VR headset</li>
              </ul>
            </div>

            <div className="flex flex-col p-7 rounded-2xl border-2 border-cyan-500/40 dark:border-cyan-400/40 bg-white/70 dark:bg-zinc-900/70 relative">
              <span className="absolute -top-3 left-7 px-3 py-0.5 rounded-full bg-cyan-600 text-white text-[10px] font-bold uppercase tracking-wide">
                Extended
              </span>
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md mb-4">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xl mb-1">PiEEG XR 16R</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Everything in PiEEG XR plus an additional 8 sensors covering the visual cortex area
                for richer neural decoding.
              </p>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-cyan-500" /> +8 sensors for the visual cortex</li>
                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-cyan-500" /> Higher spatial resolution</li>
                <li className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-cyan-500" /> Ideal for research & advanced BCI</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── CTA ─────────────────── */}
      <section className="py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-linear-to-br from-violet-500/10 via-cyan-500/10 to-blue-500/10 p-8 sm:p-12 text-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[48px_48px]" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 mb-5">
                <Sparkles className="w-4 h-4 text-violet-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Join the Frontier
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Back PiEEG XR on Kickstarter
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto mb-7">
                Help us scale production and finalize our setup. By backing this project you aren&apos;t
                just buying a gadget — you&apos;re joining the frontier of human-computer evolution.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={KICKSTARTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors shadow-md shadow-violet-500/20"
                >
                  <Rocket className="w-4 h-4" />
                  Back the Campaign
                </a>
                <a
                  href="https://discord.gg/neJ45FR6Sv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  Join the Community
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex items-center gap-1.5"><Package className="w-3.5 h-3.5" /> Ships worldwide via Elecrow</span>
                <span className="inline-flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5" /> Fully open source</span>
                <span className="inline-flex items-center gap-1.5"><BadgeCheck className="w-3.5 h-3.5" /> 12-month warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
