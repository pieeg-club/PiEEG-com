import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Cpu,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Mail,
  MessageSquare,
  Clock,
  Trophy,
  ShieldAlert,
  GraduationCap,
  Zap,
  Terminal,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Neurotech Hackathons — Hardware & Engineering Sponsorship | PiEEG",
  description:
    "Organizing a neurotech, BCI, biomedical engineering, or AI hackathon? PiEEG sponsors selected hackathons worldwide with open-source EEG hardware, live engineering time, and mentorship.",
  alternates: {
    canonical: "https://pieeg.com/community/hackathons",
  },
  openGraph: {
    title: "Neurotech Hackathons — Hardware & Engineering Sponsorship | PiEEG",
    description:
      "We sponsor selected hackathons with PiEEG & Octopus-16 BCI hardware, live onboarding, and engineering time. Apply to bring open neurotechnology to your event.",
    url: "https://pieeg.com/community/hackathons",
    images: [
      {
        url: "/community/octopus-challenge/octopus-overview.jpg",
        width: 1063,
        height: 1038,
        alt: "PiEEG Octopus 16 — 16-channel wireless dry-electrode EEG for hackathons",
      },
    ],
  },
};

const SPONSORSHIP_PILLARS = [
  {
    title: "Open-Source BCI Hardware",
    description:
      "We sponsor selected hackathons with PiEEG boards, wireless 16-channel Octopus-16 sensors, OctoBio starter kits, EEG caps, and EMG/ECG electrode packs—plus tailored fleet packs for larger events.",
    Icon: Cpu,
    accent: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/70",
  },
  {
    title: "Dedicated Engineering Time",
    description:
      "Our team sponsors hands-on time for selected events: pre-event organizer calls, a live kick-off workshop on EEG signal acquisition, real-time Discord debugging during hacking hours, and judging.",
    Icon: Clock,
    accent: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/70",
  },
  {
    title: "Zero-Install Weekend Stack",
    description:
      "Hackers don't lose Saturday fighting drivers. With PiEEG Cloud, WebBLE streaming, Python/JS SDKs, and PiEEG-server, teams go from unboxing to live 16-channel brain data in under 10 minutes.",
    Icon: Zap,
    accent: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/70",
  },
  {
    title: "Prizes & Community Spotlight",
    description:
      "Standout hackathon builds get featured across the PiEEG ecosystem, giving student and developer teams permanent visibility for their open-source repositories and demos.",
    Icon: Trophy,
    accent: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/70",
  },
];

const HACKATHON_TRACKS = [
  {
    tag: "Track 01 · Signals to Systems",
    title: "Real-Time Neural Control & Robotics",
    description:
      "Stream multi-channel EEG, EMG, or EOG into Python, ROS, or WebSockets to steer rovers, robotic arms, wheelchairs, or smart-home devices hands-free.",
  },
  {
    tag: "Track 02 · Browser & XR BCIs",
    title: "Zero-Install Web, Gaming & VR Experiences",
    description:
      "Build SSVEP/c-VEP spellers, brain-reactive VRChat avatars, Meta Quest neural overlays, or multiplayer neurofeedback games in TypeScript and Unity.",
  },
  {
    tag: "Track 03 · Machine Learning & DSP",
    title: "Low-Channel Decoding & Artifact Removal",
    description:
      "Train compact motor-imagery classifiers, sleep/focus state trackers, or real-time blink/jaw-clench artifact filters that run on edge devices.",
  },
  {
    tag: "Track 04 · Multimodal Biosignals",
    title: "Brain + Heart + Muscle Fusion",
    description:
      "Combine EEG with ECG heart-rate variability, EMG gestures, or webcam pupillometry to create adaptive biofeedback, music generation, or accessibility tools.",
  },
];

const FAQS = [
  {
    q: "What kinds of hackathons does PiEEG sponsor?",
    a: "We prioritize university neurotech clubs, biomedical engineering societies, IEEE EMBS student branches, neuroscience department hackathons, and major student/developer AI or hardware hackathons that include a dedicated neurotech or biosignals track.",
  },
  {
    q: "How far in advance should organizers apply?",
    a: "Please reach out at least 4 to 8 weeks before your event date. International hardware shipping and customs clearance take time, and early coordination lets us schedule live onboarding sessions for your participants.",
  },
  {
    q: "What do you look for when selecting hackathons to sponsor?",
    a: "We look at expected participant count, how many teams will actively build with biosignal hardware, whether projects will be shared as public open-source repositories, and whether your organizing team has a clear plan for hardware distribution and battery-only safety.",
  },
  {
    q: "Can we also order extra boards at an institutional hackathon discount?",
    a: "Yes. Alongside sponsored hardware and time for selected events, universities and hackathon organizers can use our institutional fleet tiers (up to 20% off boards plus custom hackathon packs of Octopus-16 and OctoBio kits).",
  },
];

const APPLY_MAILTO =
  "mailto:pieeg@pieeg.com?subject=Hackathon%20Sponsorship%20Request%20%E2%80%94%20%5BEvent%20Name%5D&body=Hi%20PiEEG%20Team%2C%0A%0AWe%20are%20organizing%20a%20hackathon%20and%20would%20love%20to%20apply%20for%20PiEEG%20hardware%20%26%20engineering%20time%20sponsorship.%0A%0A-%20Event%20Name%20%26%20Website%3A%20%0A-%20University%20%2F%20Organization%3A%20%0A-%20Dates%20%26%20Location%20(In-person%20%2F%20Hybrid)%3A%20%0A-%20Expected%20Number%20of%20Participants%20%2F%20Neurotech%20Teams%3A%20%0A-%20Hardware%20%26%20Workshop%20Support%20Requested%3A%20%0A-%20Shipping%20Country%3A%20%0A";

export default function HackathonsPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main className="flex-1 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-300 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-5">
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Hackathons &amp; University Events</span>
              </div>

              <h1 className="title-hero mb-4">
                We Sponsor Time &amp; Hardware for{" "}
                <span className="bg-linear-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Selected Hackathons
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                Organizing a neurotech hackathon, biomedical engineering
                competition, or university build weekend? PiEEG partners with
                selected events worldwide—providing{" "}
                <strong className="text-zinc-900 dark:text-zinc-100">
                  open-source EEG/BCI hardware
                </strong>
                ,{" "}
                <strong className="text-zinc-900 dark:text-zinc-100">
                  live engineering onboarding
                </strong>
                , and{" "}
                <strong className="text-zinc-900 dark:text-zinc-100">
                  community project spotlights
                </strong>
                .
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={APPLY_MAILTO}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:opacity-90 transition-opacity"
                >
                  <Mail className="w-4 h-4" />
                  <span>Apply for Hackathon Sponsorship</span>
                </a>
                <a
                  href="https://github.com/pieeg-club/hello_world_octopus_16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-cyan-300 dark:border-cyan-800 bg-cyan-50/70 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 hover:bg-cyan-100/70 dark:hover:bg-cyan-950/70 transition-colors"
                >
                  <Terminal className="w-4 h-4" />
                  <span>60-Sec Hackathon Starter Repo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/store#bulk-orders"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors"
                >
                  <span>Hackathon Fleet Packs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl">
                <div className="bg-white p-4 sm:p-6 flex items-center justify-center">
                  <Image
                    src="/community/octopus-challenge/octopus-overview.jpg"
                    alt="PiEEG Octopus 16 — 16-channel wireless dry-electrode EEG for hackathons"
                    width={1063}
                    height={1038}
                    priority
                    className="w-full max-w-sm h-auto object-contain"
                  />
                </div>
                <div className="p-5 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1">
                    <span>Flagship Hackathon Sensor</span>
                    <span>16-Ch Dry EEG · BLE</span>
                  </div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Built for 36-Hour Builds: Octopus 16
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    Coin-sized, wireless, 16 spring-loaded dry electrodes—no
                    conductive gel, no tangled wires. Put it on a headband and
                    stream 24-bit EEG straight into the browser or Python in
                    minutes.
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Link
                      href="/hardware/octopus-16"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      <span>Explore Octopus 16 specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/community"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                      <span>See Cohort #1 builds →</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHAT WE SPONSOR ========== */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="title-section mb-3">
              How We Support Selected Hackathons
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Hardware alone isn&apos;t enough for a 36-hour hackathon. We pair
              open-source biosignal kits with direct engineering time so teams
              ship working demos by Sunday afternoon.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {SPONSORSHIP_PILLARS.map((pillar) => {
              const Icon = pillar.Icon;
              return (
                <div
                  key={pillar.title}
                  className="p-6 sm:p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60"
                >
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${pillar.bg}`}
                  >
                    <Icon className={`w-5 h-5 ${pillar.accent}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== 60-SECOND HACKATHON STARTER REPO ========== */}
      <section className="py-14 border-t border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-cyan-50/40 via-white to-white dark:from-cyan-950/15 dark:via-zinc-950 dark:to-zinc-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 items-center rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 sm:p-10 shadow-sm">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-300 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Terminal className="w-3.5 h-3.5" />
                <span>Official Participant Starter Kit</span>
              </div>

              <h2 className="title-section mb-3">
                Hello Octopus 16 — 60-Second BCI Hackathon Starter
              </h2>

              <p className="text-zinc-600 dark:text-zinc-400 mb-5 leading-relaxed">
                Don&apos;t burn Saturday morning writing BLE parsers or DSP filters.{" "}
                <strong className="text-zinc-900 dark:text-zinc-100">
                  hello_world_octopus_16
                </strong>{" "}
                gives every hackathon team a live 60 fps 16-channel Web Bluetooth
                workbench, a built-in 250 Hz simulator (so teammates can code
                before touching hardware), a Python{" "}
                <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-xs font-mono">
                  bleak + numpy
                </code>{" "}
                streamer, and ready-to-paste AI prompts for{" "}
                <strong className="text-zinc-900 dark:text-zinc-100">
                  GitHub Copilot, Claude Code, and Cursor
                </strong>
                .
              </p>

              <div className="rounded-xl bg-zinc-950 text-zinc-100 p-4 font-mono text-xs sm:text-sm mb-6 overflow-x-auto border border-zinc-800">
                <div className="text-zinc-400 select-none mb-1">
                  # Clone &amp; launch the 16-ch workbench in 30 seconds
                </div>
                <div>
                  git clone https://github.com/pieeg-club/hello_world_octopus_16.git
                </div>
                <div>cd hello_world_octopus_16 &amp;&amp; npm start</div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/pieeg-club/hello_world_octopus_16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
                >
                  <span>Open Starter Repo on GitHub</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/news/hello-world-octopus-16"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <span>Read Workbench Overview</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <a
                href="https://github.com/pieeg-club/hello_world_octopus_16"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-lg"
              >
                <div className="relative aspect-video">
                  <Image
                    src="/news-images/hello-world-octopus-16.png"
                    alt="Hello Octopus 16 — 60fps 16-Channel BCI Hackathon Workbench"
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="px-4 py-3 bg-zinc-900/95 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
                  <span>
                    16-Ch 60 fps Oscilloscope · 18-Pin Hex Contact Map · 250 Hz Simulator · AI Prompts
                  </span>
                  <span className="text-cyan-400 font-semibold shrink-0 ml-2">
                    github.com/pieeg-club/hello_world_octopus_16 →
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HACKATHON TRACK IDEAS ========== */}
      <section className="py-14 bg-zinc-50 dark:bg-zinc-900/60 border-y border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready-to-Run Themes</span>
              </div>
              <h2 className="title-section">
                Weekend Hackathon Tracks
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mt-2">
                Need challenge prompts for your participants? Feel free to use
                these proven weekend tracks—or let hackers pick from our 16 open
                project ideas.
              </p>
            </div>
            <Link
              href="/community/open-ideas"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-cyan-500/50 transition-colors shrink-0 self-start md:self-auto"
            >
              <span>See all 16 Open Project Ideas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {HACKATHON_TRACKS.map((track) => (
              <div
                key={track.title}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
              >
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
                  {track.tag}
                </span>
                <h3 className="text-lg font-bold mb-2">{track.title}</h3>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {track.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW TO APPLY / WHAT TO INCLUDE ========== */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7">
              <h2 className="title-section mb-4">
                How to Apply for Sponsorship
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                We review hackathon sponsorship requests on a rolling basis. To
                help us evaluate your event quickly, include the following
                details when you reach out:
              </p>

              <ul className="space-y-3.5 mb-8">
                {[
                  "Event name, dates, location (in-person or hybrid), and website or organizer deck",
                  "Host university, student society, research lab, or community organization",
                  "Expected total attendance and number of teams competing in the neurotech / BCI track",
                  "What support you are looking for (sponsored hardware units, fleet discount, live workshop, mentorship, or prize categories)",
                  "How participants will publish their weekend builds (e.g. Devpost + public GitHub repositories)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <a
                  href={APPLY_MAILTO}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Hackathon Proposal</span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <span>Contact Form</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70">
                <div className="flex items-center gap-2.5 text-cyan-600 dark:text-cyan-400 font-bold text-sm uppercase tracking-wider mb-2">
                  <GraduationCap className="w-5 h-5" />
                  <span>University &amp; Bulk Fleet Packs</span>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Need 10–25+ Boards for Your Lab or Event?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                  Alongside sponsored kits for selected events, organizers can
                  configure custom Hackathon Packs (e.g. 15× Octopus-16 + 10×
                  EMG Kits) with automatic 10%–20% institutional discounts.
                </p>
                <Link
                  href="/store#bulk-orders"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  <span>Open Fleet Configurator</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="p-6 rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50/80 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-950 dark:text-amber-100 mb-1.5">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>Hackathon Safety Requirement</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">
                  All hackathon participants must operate PiEEG devices on{" "}
                  <strong>battery power only</strong> when electrodes are worn
                  by a person, never mains power. PiEEG hardware is for research
                  and education only, not medical use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="py-14 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="title-section text-center mb-8">
            Hackathon Sponsorship FAQ
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
              >
                <h3 className="font-bold text-base sm:text-lg mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-14 bg-linear-to-br from-cyan-600 via-blue-600 to-purple-700 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="title-section mb-3">
            Bringing Neurotech to Your Next Hackathon?
          </h2>
          <p className="text-lg text-cyan-50 max-w-xl mx-auto mb-8">
            Tell us about your event, timeline, and student community—let&apos;s
            empower the next wave of open-source BCI builders together.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={APPLY_MAILTO}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-white text-blue-700 hover:bg-cyan-50 transition-colors shadow-lg"
            >
              <Mail className="w-5 h-5" />
              <span>pieeg@pieeg.com</span>
            </a>
            <a
              href="https://discord.gg/neJ45FR6Sv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold border-2 border-white text-white hover:bg-white/10 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat with Organizers on Discord</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
