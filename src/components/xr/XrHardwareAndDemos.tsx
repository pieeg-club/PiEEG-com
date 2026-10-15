import Image from "next/image";
import Link from "next/link";
import {
  Glasses,
  Cpu,
  ScanFace,
  Sparkles,
  Radio,
  Plane,
  ShieldAlert,
  ExternalLink,
  ArrowRight,
  Rocket,
  Code2 as Github,
  BookOpen,
  Users,
  Box,
  PlayCircle,
  Newspaper,
} from "lucide-react";
import {
  XR_ENCLOSURE,
  XR_GITHUB,
  XR_KICKSTARTER,
  xrDemoVideos,
  xrYoutube,
} from "@/app/hardware/_xr/media";

const XR_EXPERIENCES = [
  {
    name: "Face Trainer v2",
    tag: "fEMG · L2 + Group-Lasso",
    Icon: ScanFace,
    accent: "text-emerald-600 dark:text-emerald-400",
    href: "https://cloud.pieeg.com/experiences/face-trainer-v2",
    desc: "Common-Average Reference across 8 channels, 40-D time/spectral feature vector (200 ms @ 12 Hz), and Leave-One-Rep-Out cross-validation with per-electrode importance bars.",
  },
  {
    name: "Avatar Neurofeedback Studio v2",
    tag: "Spectral + Artifact · VRM",
    Icon: Sparkles,
    accent: "text-violet-600 dark:text-violet-400",
    href: "https://cloud.pieeg.com/experiences",
    desc: "Two-state contrastive calibration (20s quiet baseline vs 20s target state) ranks all channel × band features by within-session Cohen's d and wires them to VRM blendshapes.",
  },
  {
    name: "Neural Flight (WebXR)",
    tag: "Immersive VR / AR",
    Icon: Plane,
    accent: "text-cyan-600 dark:text-cyan-400",
    href: "https://cloud.pieeg.com/experiences",
    desc: "First-person procedural flight in WebXR where sustained focus drives lift and climb rate. Starts in autopilot preview and switches live in the headset.",
  },
  {
    name: "VRChat OSC · Brain Regions",
    tag: "UDP :9000 · Spatial Groups",
    Icon: Radio,
    accent: "text-amber-600 dark:text-amber-400",
    href: "/tutorials/brain-reactive-vrchat-avatar",
    desc: "Partition channels into custom groups (Frontal, Zygomatic, Occipital) and stream rolling-normalized [0, 1] float parameters to VRChat avatars and chatbox.",
  },
];

const EDITION_SPECS = [
  {
    spec: "Active Channels",
    xr8: "8 channels + REF + BIAS (10 dry Ag/AgCl pads on facial gasket)",
    xr16: "16 channels + REF + BIAS (8 facial gasket pads + 8 visual-cortex strap sensors)",
  },
  {
    spec: "Analog Front-End",
    xr8: "Single 24-bit TI ADS1299 · 250 SPS · 1.0 µVpp input-referred noise",
    xr16: "Dual daisy-chained 24-bit TI ADS1299 · 250 SPS · 1.0 µVpp noise",
  },
  {
    spec: "Wireless & MCU",
    xr8: "STM32WB dual-core (Cortex-M4/M0+) · BLE 5 · advertises as 'PiEEG XR'",
    xr16: "STM32WB dual-core (Cortex-M4/M0+) · BLE 5 · advertises as 'PiEEG XR-16'",
  },
  {
    spec: "Signal Coverage",
    xr8: "Facial sEMG micro-expressions, corneal-retinal EOG blinks/gaze, frontal EEG",
    xr16: "All XR-8 facial/frontal signals + posterior occipital/parietal EEG (O1, O2, Oz, POz, Pz…)",
  },
  {
    spec: "Power & Mount",
    xr8: "5 V USB-C battery bank or headset battery · 4-buckle snap-in gasket + strap box",
    xr16: "5 V USB-C battery bank or headset battery · 4-buckle snap-in gasket + rear strap sensors",
  },
];

export default function XrHardwareAndDemos() {
  return (
    <>
      {/* ── Section 03: Hardware Editions, Experiences & Live Demos ────────── */}
      <section
        id="xr-hardware-demos"
        className="scroll-mt-20 py-14 sm:py-16 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
                [03 · HARDWARE EDITIONS, DEMOS &amp; EXPERIENCES]
              </p>
              <h2 className="title-section text-zinc-900 dark:text-zinc-50">
                Two XR editions built around the open IronBCI front-end
              </h2>
              <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-3xl">
                Both editions share the same silicone facial gasket, strap-mounted STM32WB + ADS1299 conversion box,
                and 5 V USB-C battery supply. Choose 8 channels for facial EMG, blinks, and frontal EEG, or 16 channels
                when your paradigm also needs occipital visual-cortex electrodes.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href={XR_ENCLOSURE.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <Box className="w-3.5 h-3.5 text-cyan-500" />
                3D Printable Enclosure
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
              <a
                href={XR_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                PiEEG_XR_Hardware
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>

          {/* Two Hardware Edition Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* PiEEG XR (8-ch) */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/50 overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative h-60 bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-6 flex items-center justify-center">
                  <Image
                    src="/products/pieeg-xr.png"
                    alt="PiEEG XR 8-channel neural face interface gasket and strap box"
                    width={360}
                    height={240}
                    className="object-contain max-h-48 w-auto"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    8 ch + REF/BIAS · BLE 5
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">PiEEG XR</h3>
                    <span className="text-xs font-mono text-violet-600 dark:text-violet-400">
                      10 dry Ag/AgCl pads
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    Silicone facial gasket with eight active electrodes over the forehead, temples, and cheeks plus
                    REF and BIAS. Designed for facial EMG expression decoding, EOG blink/gaze detection, and frontal
                    EEG monitoring.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/hardware/pieeg-xr"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  Product &amp; Interactive Setup Guide
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={XR_KICKSTARTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                >
                  <Rocket className="w-3.5 h-3.5 text-violet-500" />
                  Kickstarter
                </a>
              </div>
            </div>

            {/* PiEEG XR-16 (16-ch) */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/50 overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative h-60 bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-6 flex items-center justify-center">
                  <Image
                    src="/products/xr-16.png"
                    alt="PiEEG XR-16 16-channel face gasket plus eight visual-cortex sensors"
                    width={360}
                    height={240}
                    className="object-contain max-h-48 w-auto"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    16 ch (8 Face + 8 Occipital) · BLE 5
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">PiEEG XR-16</h3>
                    <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                      Dual ADS1299 · +8 visual cortex
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    Adds eight rear head-strap electrodes over the visual and parietal cortex to the 8-channel facial
                    gasket. Enables posterior alpha reactivity, SSVEP, and visual ERP paradigms alongside facial EMG.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/hardware/xr-16"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
                >
                  <Glasses className="w-3.5 h-3.5" />
                  Inspect PiEEG XR-16
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/hardware/ironbci"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                >
                  IronBCI Front-End
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 overflow-hidden mb-14">
            <div className="px-5 py-3.5 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                PiEEG XR (8-ch) vs PiEEG XR-16 (16-ch) Specifications
              </span>
              <span className="text-xs font-mono text-zinc-500">
                Open-source IronBCI architecture · 24-bit · 250 SPS
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 font-mono text-xs">
                    <th className="py-3 px-4 sm:px-5 font-semibold">Specification</th>
                    <th className="py-3 px-4 sm:px-5 font-semibold text-violet-600 dark:text-violet-400">
                      PiEEG XR (8-Channel)
                    </th>
                    <th className="py-3 px-4 sm:px-5 font-semibold text-cyan-600 dark:text-cyan-400">
                      PiEEG XR-16 (16-Channel)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {EDITION_SPECS.map((row) => (
                    <tr key={row.spec}>
                      <td className="py-3 px-4 sm:px-5 font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                        {row.spec}
                      </td>
                      <td className="py-3 px-4 sm:px-5 text-zinc-600 dark:text-zinc-300">{row.xr8}</td>
                      <td className="py-3 px-4 sm:px-5 text-zinc-600 dark:text-zinc-400">{row.xr16}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Starter XR Experiences */}
          <div className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  Starter XR Experiences &amp; Decoders
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Every experience runs client-side in <code className="font-mono text-xs">cloud.pieeg.com</code> or
                  locally from <code className="font-mono text-xs">pieeg-server</code> (MIT licensed).
                </p>
              </div>
              <a
                href="https://cloud.pieeg.com/experiences"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
              >
                Browse all 35+ Cloud experiences
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {XR_EXPERIENCES.map((exp) => {
                const Icon = exp.Icon;
                const isExternal = exp.href.startsWith("http");
                return (
                  <a
                    key={exp.name}
                    href={exp.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-900 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <Icon className={`w-5 h-5 ${exp.accent}`} />
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                          {exp.tag}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors mb-1.5">
                        {exp.name}
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{exp.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-200/70 dark:border-zinc-800/70 inline-flex items-center gap-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Open surface
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Live Video Demos */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-5">
              <PlayCircle className="w-4 h-4 text-violet-500" />
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Recorded Hardware &amp; Avatar Sessions
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {xrYoutube.map((v) => (
                <div
                  key={v.id}
                  className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 aspect-video bg-zinc-950 shadow-lg"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {xrDemoVideos.map((v) => (
                <div
                  key={v.src}
                  className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/50 overflow-hidden"
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
                  <div className="p-4">
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-1">{v.title}</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Preprint, Press & Battery Safety Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-violet-600 dark:text-violet-400 font-semibold mb-2">
                  <BookOpen className="w-4 h-4" />
                  Preprint Citation
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 font-mono leading-relaxed">
                  El Abbassi, Y.; Rakhmatulin, I.{" "}
                  <em>
                    PiEEG XR: A WebXR Brain-Computer Interface Platform for Neural-Adaptive Avatar Control in Mixed
                    Reality.
                  </em>{" "}
                  Preprints 2026, 2026060016.
                </p>
              </div>
              <a
                href="https://doi.org/10.20944/preprints202606.0016.v1"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
              >
                doi.org/10.20944/preprints202606.0016.v1
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
                  <Newspaper className="w-4 h-4" />
                  Independent Coverage &amp; Companion Wristband
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Covered by UploadVR for camera-free biosignal avatar expression. Can be paired alongside{" "}
                  <a
                    href="https://aura.pieeg.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
                  >
                    Aura VR
                  </a>{" "}
                  (4 dry wrist sEMG contacts + 6-axis IMU) for combined facial and hand/wrist streaming.
                </p>
              </div>
              <a
                href="https://www.uploadvr.com/pieeg-xr-makes-your-vr-avatar-expressive-without-face-tracking/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                Read the UploadVR article
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  Battery Isolation &amp; Research Notice
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  PiEEG XR is a research and developer kit, not a medical device. Operate strictly from a{" "}
                  <strong>5 V battery bank</strong> or the headset&apos;s internal battery over USB-C. Never connect
                  the board to mains wall power while worn.
                </p>
              </div>
              <Link
                href="/liability"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline"
              >
                Read safety &amp; liability terms
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-zinc-50/50 dark:bg-zinc-900/25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="title-section text-zinc-900 dark:text-zinc-50 mb-3">
            Snap the gasket onto your headset or test in Mock Studio
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 mb-7 max-w-2xl mx-auto">
            Back PiEEG XR on Kickstarter, inspect the 8-step interactive setup and noise verification guide, or open
            PiEEG Cloud right now to test Face Trainer v2 and Avatar Studio.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={XR_KICKSTARTER}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-colors shadow-md shadow-violet-500/20"
            >
              <Rocket className="w-4 h-4" />
              Back on Kickstarter
            </a>
            <Link
              href="/hardware/pieeg-xr"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Interactive Setup Guide
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://discord.gg/neJ45FR6Sv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <Users className="w-4 h-4 text-cyan-500" />
              Discord Community
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
