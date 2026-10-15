import Image from "next/image";
import Link from "next/link";
import {
  Quote,
  ExternalLink,
  BookOpen,
  ShieldAlert,
  ArrowRight,
  Radio,
  Glasses,
  Activity,
  Cpu,
  Waves,
  Sparkles,
} from "lucide-react";

const MARIA_PARTNER = {
  quote:
    "PiEEG XR is enabling us to gain a deeper insight into our immersive experiences, adding a neurophysiological dimension to the study of how athletes respond during specific training tasks. Its integration with virtual reality environments opens up new possibilities for objectively investigating what happens whilst performing different exercises and how the response changes in the face of varying demands. Although we are still working on methodological optimisation and signal quality control, it is so far proving to be a tool with great potential for sports-related research.",
  name: "María Trapero Ventura",
  roles: [
    "Preparadora física Atlético de Madrid",
    "Health & Prevention Specialist - BeFootball",
    "Profesora en UAX",
  ],
  href: "https://www.linkedin.com/in/mar%C3%ADa-trapero-ventura/",
  photo: "/home/testimonials/maria.webp",
};

const VR_PRESS = [
  {
    outlet: "UploadVR",
    region: "US · XR Press",
    badgeBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/25",
    monogram: "UVR",
    headline: "This Quest 3 Accessory Makes Your VR Avatar Expressive Without Face Tracking",
    summary:
      "Covers PiEEG XR as an open-source biosignal face interface that trains facial expression detectors and maps focus and sEMG into real-time VR avatar control without optical face-tracking cameras.",
    url: "https://www.uploadvr.com/pieeg-xr-makes-your-vr-avatar-expressive-without-face-tracking/",
  },
  {
    outlet: "Mogura VR",
    region: "Japan · XR Media",
    badgeBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25",
    monogram: "MVR",
    headline:
      "The BCI device 'PiEEG XR,' which attaches to a VR headset and is controlled by brainwaves, has launched a crowdfunding campaign",
    summary:
      "Japanese and English coverage by the MoguLive editorial team detailing Emotional Sync, Neural Interaction, the Focus-to-Action API, and the 250 SPS 24-bit BLE 5 IronBCI hardware stack.",
    url: "https://www.moguravr.com/pieeg-xr-kickstarter-en/",
  },
  {
    outlet: "Notebookcheck",
    region: "EU · Hardware Review",
    badgeBg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/25",
    monogram: "NBC",
    headline: "For VR: PiEEG XR measures brain activity in real time",
    summary:
      "Technical hardware breakdown by Silvio Werner covering the replacement facial cushion, dry electrodes, 250 SPS wireless Bluetooth streaming for standalone headsets, and native VRChat compatibility.",
    url: "https://www.notebookcheck.net/For-VR-PiEEG-XR-measures-brain-activity-in-real-time.1311211.0.html",
  },
  {
    outlet: "UK Rifter",
    region: "UK · VR Community",
    badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
    monogram: "UKR",
    headline: "Revolutionising Avatar Control: PiEEG's Brain-Computer Interface for Quest Headsets",
    summary:
      "Highlights how a snap-on facial gasket brings low-cost biopotential sensing to standalone VR headsets for developers, gaming experiments, and cognitive research.",
    url: "https://www.ukrifter.com/revolutionising-avatar-control-pieegs-brain-computer-interface-for-quest-headsets/",
  },
];

const VR_ECOSYSTEM_BADGES = [
  {
    name: "VRChat OSC",
    spec: "UDP :9000 · /avatar/parameters/*",
    desc: "Global or per-region normalized band powers & fEMG blendshapes",
    Icon: Radio,
    color: "text-amber-500",
  },
  {
    name: "WebXR Device API",
    spec: "immersive-vr · immersive-ar",
    desc: "In-browser 3D neurofeedback scenes (Neural Flight, XR Wave View)",
    Icon: Glasses,
    color: "text-violet-500",
  },
  {
    name: "BodyPress VR",
    spec: "Native Headset BLE App",
    desc: "Offline 3D signal monitoring & per-channel electrode health",
    Icon: Activity,
    color: "text-emerald-500",
  },
  {
    name: "TouchDesigner & Max",
    spec: "WebRTC P2P → Local Bridge",
    desc: "5 MB Rust bridge outputs named OSC channels on 127.0.0.1",
    Icon: Sparkles,
    color: "text-cyan-500",
  },
  {
    name: "Lab Streaming Layer",
    spec: "pieeg-server --lsl",
    desc: "Stream raw 250 SPS µV to OpenViBE, MNE-LSL, and LabRecorder",
    Icon: Waves,
    color: "text-blue-500",
  },
  {
    name: "Aura VR Wristband",
    spec: "4 dry sEMG + 6-axis IMU",
    desc: "Companion wrist strap for synchronized hand gesture + face XR",
    Icon: Cpu,
    color: "text-teal-500",
  },
];

export default function XrCredibilityAndResearch() {
  return (
    <section
      id="xr-credibility"
      className="scroll-mt-20 py-14 sm:py-16 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/25"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">
            [04 · FIELD RESEARCH, VR PRESS &amp; ECOSYSTEM]
          </p>
          <h2 className="title-section text-zinc-900 dark:text-zinc-50">
            Tested in VR sports performance and covered by global XR press
          </h2>
          <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            From athlete neurophysiology drills in virtual reality to independent reviews in the US, Japan, Germany,
            and the UK, PiEEG XR is built as an inspectable instrument for spatial computing.
          </p>
        </div>

        {/* 1. Partner Testimonial: María Trapero Ventura */}
        <div className="mb-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid items-center gap-8 md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
            <a
              href={MARIA_PARTNER.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto block w-full max-w-60 lg:max-w-65 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800"
            >
              <Image
                src={MARIA_PARTNER.photo}
                alt={MARIA_PARTNER.name}
                width={720}
                height={1280}
                sizes="260px"
                className="aspect-3/4 w-full object-cover object-[22%_center]"
              />
            </a>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  <Quote className="w-3.5 h-3.5" />
                  Partner Field Study · VR Sports Neurophysiology
                </span>
                <a
                  href="https://www.youtube.com/watch?v=rqgJboa-lGY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-violet-600 dark:text-violet-400 hover:underline"
                >
                  Watch VR Goalkeeper Drill
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <h3 className="title-subsection text-zinc-900 dark:text-zinc-50 mb-4">
                PiEEG XR in sports research
              </h3>

              <blockquote className="m-0 text-base sm:text-[17px] leading-[1.7] text-zinc-600 dark:text-zinc-300">
                <p className="m-0">&ldquo;{MARIA_PARTNER.quote}&rdquo;</p>
              </blockquote>

              <footer className="mt-6 border-t border-zinc-200 pt-5 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="m-0 text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {MARIA_PARTNER.name}
                  </p>
                  <ul className="m-0 mt-1.5 list-none space-y-0.5 p-0 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                    {MARIA_PARTNER.roles.map((role) => (
                      <li key={role}>{role}</li>
                    ))}
                  </ul>
                </div>

                <a
                  href={MARIA_PARTNER.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/70 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors self-start sm:self-auto"
                >
                  LinkedIn Profile
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </footer>
            </div>
          </div>
        </div>

        {/* 2. VR & Tech Press Coverage (UploadVR, Mogura VR, Notebookcheck, UK Rifter) */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Independent VR &amp; Hardware Press Coverage
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
                International coverage of PiEEG XR across dedicated virtual reality and hardware publications.
              </p>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-violet-600 dark:text-violet-400 hover:underline"
            >
              All 28+ media features
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VR_PRESS.map((item) => (
              <a
                key={item.outlet}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 hover:border-violet-400 dark:hover:border-violet-500/60 transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border font-mono text-xs font-extrabold tracking-tight ${item.badgeBg}`}
                      >
                        {item.monogram}
                      </span>
                      <div>
                        <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                          {item.outlet}
                        </div>
                        <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                          {item.region}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-violet-500 transition-colors shrink-0" />
                  </div>

                  <h4 className="font-bold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors mb-2 leading-snug">
                    &ldquo;{item.headline}&rdquo;
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  <span>Read article on {item.outlet}</span>
                  <span className="text-violet-600 dark:text-violet-400 font-semibold">↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 3. Spatial Computing & VR Ecosystem Compatibility Strip */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            VR Protocols, Engines &amp; Companion Hardware
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VR_ECOSYSTEM_BADGES.map((b) => {
              const Icon = b.Icon;
              return (
                <div
                  key={b.name}
                  className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 flex items-start gap-3.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className={`w-4.5 h-4.5 ${b.color}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{b.name}</span>
                      <code className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {b.spec}
                      </code>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Preprint Citation & Battery Isolation Safety */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-violet-600 dark:text-violet-400 font-semibold mb-2">
                <BookOpen className="w-4 h-4" />
                Scientific Preprint Citation
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

          <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold mb-2">
                <ShieldAlert className="w-4 h-4" />
                Battery Isolation &amp; Research Notice
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                PiEEG XR is a research and developer kit, not a medical device. Operate strictly from a{" "}
                <strong>5 V battery bank</strong> or the headset&apos;s internal battery over USB-C. Never connect the
                board to mains wall power while worn.
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
  );
}
