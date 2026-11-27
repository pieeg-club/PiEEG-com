"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bot,
  Cpu,
  Code2,
  Activity,
  Brain,
  MessageSquare,
  Calendar,
  Clock,
  Radio,
  MapPin,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Wrench,
  FlaskConical,
  HelpCircle,
  Pause,
  Play,
  Plus,
} from "lucide-react";

/* ─── Calendar & Timezone Utilities (Europe/London anchor) ────────── */

const TIME_ZONE = "Europe/London";
const DURATION_MS = 60 * 60 * 1000;
const TITLE = "PiEEG Monthly Live";
const LOCATION = "https://www.youtube.com/@pieeg";
const DETAILS =
  "PiEEG Monthly Live: updates in AI agents, hardware, software, signal processing and neuroscience, plus live Q&A.\nLive on YouTube, LinkedIn and all PiEEG channels.\nhttps://www.youtube.com/@pieeg\nhttps://pieeg.com";

const pad = (n: number) => String(n).padStart(2, "0");

function fmt(
  date: Date,
  options: Intl.DateTimeFormatOptions,
  zone: string = TIME_ZONE,
): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: zone,
    ...options,
  }).format(date);
}

function londonOffset(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts
      .filter((p) => p.type !== "literal")
      .map((p) => [p.type, Number(p.value)]),
  );
  const wallTime = Date.UTC(
    values.year,
    values.month - 1,
    values.day,
    values.hour,
    values.minute,
    values.second,
  );
  return Math.round(
    (wallTime - Math.floor(date.getTime() / 1000) * 1000) / 60000,
  );
}

function lastMonday(year: number, month: number): Date {
  const day = new Date(Date.UTC(year, month + 1, 0, 14));
  day.setUTCDate(day.getUTCDate() - ((day.getUTCDay() + 6) % 7));
  return new Date(day.getTime() - londonOffset(day) * 60000);
}

const FIRST_SESSION = lastMonday(2027, 0);

function upcomingSessions(count = 4, now = new Date()): Date[] {
  const current = new Date(now);
  const events: Date[] = [];
  let month = current.getUTCMonth() - 1;
  const year = current.getUTCFullYear();
  while (events.length < count) {
    const start = lastMonday(year, month++);
    if (
      start.getTime() >= FIRST_SESSION.getTime() &&
      start.getTime() + DURATION_MS > current.getTime()
    ) {
      events.push(start);
    }
  }
  return events;
}

function localStamp(date: Date): string {
  const wall = new Date(date.getTime() + londonOffset(date) * 60000);
  return `${wall.getUTCFullYear()}${pad(wall.getUTCMonth() + 1)}${pad(
    wall.getUTCDate(),
  )}T${pad(wall.getUTCHours())}${pad(wall.getUTCMinutes())}${pad(
    wall.getUTCSeconds(),
  )}`;
}

function zoneName(date: Date): "BST" | "GMT" {
  return londonOffset(date) ? "BST" : "GMT";
}

function buildGoogleCalendarUrl(start: Date, recurring = true): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: TITLE,
    dates: `${localStamp(start)}/${localStamp(
      new Date(start.getTime() + DURATION_MS),
    )}`,
    ctz: TIME_ZONE,
    details: DETAILS,
    location: LOCATION,
  });
  if (recurring) {
    params.set("recur", "RRULE:FREQ=MONTHLY;BYDAY=-1MO");
  }
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildCopyDetails(start: Date): string {
  return `${TITLE}\n${fmt(start, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })}, 2:00 PM London (${zoneName(start)})\nEvery last Monday of the month\n\n${DETAILS}`;
}

/* ─── Static Content Data ─────────────────────────────────────────── */

const MARQUEE_TAGS = [
  "EEG",
  "EMG",
  "ECG",
  "AI agents",
  "Octopus 16",
  "PiEEG XR",
  "Signal processing",
  "Machine learning",
  "Open source",
  "Real-time BCI",
  "Neurofeedback",
  "Biotech",
];

const ROTATING_QUESTIONS = [
  "How do I start with EEG?",
  "Which electrodes should I use?",
  "Can AI agents read bio signals?",
  "How do I remove blink artifacts?",
  "What can I build with Octopus 16?",
  "How does a BCI actually work?",
];

interface TopicItem {
  id: number;
  number: string;
  title: string;
  description: string;
  tags: string[];
  questions: string[];
  wide?: boolean;
  Icon: typeof Bot;
  accentText: string;
  accentBg: string;
  accentBorder: string;
}

const TOPICS: TopicItem[] = [
  {
    id: 1,
    number: "01",
    title: "AI agents & neuroscience",
    description:
      "How AI agents work with your bio data, and what that opens up for research and everyday tools.",
    tags: ["PiEEG Agent", "LLMs + EEG"],
    questions: [
      "How can I connect an AI agent to my EEG data?",
      "What can a language model do with biosignal data?",
    ],
    Icon: Bot,
    accentText: "text-cyan-600 dark:text-cyan-400",
    accentBg: "bg-cyan-500/10 dark:bg-cyan-400/10",
    accentBorder: "border-cyan-500/25 dark:border-cyan-400/25",
  },
  {
    id: 2,
    number: "02",
    title: "Hardware",
    description:
      "New boards, caps, electrodes and headsets. Prototypes from the bench and what's coming next.",
    tags: ["Octopus 16", "PiEEG XR", "EEG caps"],
    questions: [
      "Which PiEEG board or headset suits my project?",
      "How do I get a stable signal from my electrodes?",
    ],
    Icon: Cpu,
    accentText: "text-violet-600 dark:text-violet-400",
    accentBg: "bg-violet-500/10 dark:bg-violet-400/10",
    accentBorder: "border-violet-500/25 dark:border-violet-400/25",
  },
  {
    id: 3,
    number: "03",
    title: "Software",
    description:
      "SDK and firmware releases, PiEEG Cloud and Server, and the open-source tools we ship.",
    tags: ["SDKs", "Cloud", "Server"],
    questions: [
      "Where should I start with the PiEEG SDK?",
      "How do PiEEG Cloud and Server fit into a project?",
    ],
    Icon: Code2,
    accentText: "text-fuchsia-600 dark:text-fuchsia-400",
    accentBg: "bg-fuchsia-500/10 dark:bg-fuchsia-400/10",
    accentBorder: "border-fuchsia-500/25 dark:border-fuchsia-400/25",
  },
  {
    id: 4,
    number: "04",
    title: "Signal processing & AI",
    description:
      "From raw EEG, EMG and ECG to clean features and models: filtering, artifacts, classification and real-time BCI.",
    tags: ["Filtering", "Artifacts", "Machine learning", "Real-time BCI"],
    questions: [
      "How do I remove artifacts from my EEG recording?",
      "How can I turn biosignals into a real-time classifier?",
    ],
    wide: true,
    Icon: Activity,
    accentText: "text-emerald-600 dark:text-emerald-400",
    accentBg: "bg-emerald-500/10 dark:bg-emerald-400/10",
    accentBorder: "border-emerald-500/25 dark:border-emerald-400/25",
  },
  {
    id: 5,
    number: "05",
    title: "All things neuroscience",
    description:
      "Open talk about the brain, BCIs and the wider neurotech and biotech world, explained so anyone can follow.",
    tags: ["BCI research", "Neurotech news", "Biotech"],
    questions: [
      "What makes a useful first BCI experiment?",
      "How do EEG, EMG and ECG differ?",
    ],
    wide: true,
    Icon: Brain,
    accentText: "text-amber-600 dark:text-amber-400",
    accentBg: "bg-amber-500/10 dark:bg-amber-400/10",
    accentBorder: "border-amber-500/25 dark:border-amber-400/25",
  },
];

const STREAM_STEPS = [
  {
    id: "step-1",
    number: "01",
    label: "We go live",
    subtitle: "Updates & demos",
    kicker: "From the PiEEG team",
    heading: "We bring the month to you.",
    body: "We go live with what we built, what we learned, and what comes next. Hardware, software, AI and neuroscience, in one session.",
    bullets: [
      "See the latest PiEEG updates and demos.",
      "Meet the people behind the projects.",
    ],
    ctaType: "calendar" as const,
    ctaLabel: "Add monthly reminder",
  },
  {
    id: "step-2",
    number: "02",
    label: "You choose a channel",
    subtitle: "Same video, same time",
    kicker: "One broadcast, shared out",
    heading: "Your channel. The same show.",
    body: "You do not need to follow several streams. Choose a PiEEG channel and watch the same live session at the same time as everyone else.",
    bullets: [
      "Pick your preferred channel below.",
      "Open that channel when the session starts.",
    ],
    ctaType: "anchor" as const,
    ctaLabel: "Choose my channel",
    ctaHref: "#channelPicker",
  },
  {
    id: "step-3",
    number: "03",
    label: "We talk together",
    subtitle: "Your questions, answered",
    kicker: "You are part of the conversation",
    heading: "Bring the thing you're working on.",
    body: "Ask a question in your channel's live chat. Hardware, code, signals, or just the brain: the Q&A is part of the same live session.",
    bullets: [
      "Ask in the live chat while you watch.",
      "Or post in Discord before the stream.",
    ],
    ctaType: "external" as const,
    ctaLabel: "Ask on Discord",
    ctaHref: "https://discord.gg/neJ45FR6Sv",
  },
];

const PLATFORMS = [
  {
    name: "YouTube",
    url: "https://www.youtube.com/@pieeg",
    badgeBg: "bg-red-600 text-white",
    svgPath:
      "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15V9l5.8 3z",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/pieeg/",
    badgeBg: "bg-[#0a66c2] text-white",
    svgPath:
      "M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6z",
  },
  {
    name: "X",
    url: "",
    badgeBg: "bg-zinc-900 text-white dark:bg-zinc-800",
    svgPath:
      "M17.8 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H.9l7.9-9L.5 2.3h7l4.8 6.4zm-1.2 17.9h1.9L6.5 4.2H4.5z",
  },
  {
    name: "Facebook",
    url: "",
    badgeBg: "bg-[#1877f2] text-white",
    svgPath:
      "M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z",
  },
  {
    name: "Instagram",
    url: "",
    badgeBg: "bg-[#d62976] text-white",
    svgPath:
      "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z",
  },
  {
    name: "TikTok",
    url: "",
    badgeBg: "bg-zinc-900 text-white dark:bg-zinc-800",
    svgPath:
      "M12.5 0h4a5.4 5.4 0 0 0 5 5v4.1a9.3 9.3 0 0 1-5-1.6v8.3A7.8 7.8 0 1 1 8.7 8v4.2a3.6 3.6 0 1 0 3.8 3.6z",
  },
];

const WORLD_ZONES: [string, string][] = [
  ["London", "Europe/London"],
  ["New York", "America/New_York"],
  ["Ottawa", "America/Toronto"],
  ["India", "Asia/Kolkata"],
  ["China", "Asia/Shanghai"],
  ["Japan", "Asia/Tokyo"],
];

/* ─── Topic Micro-Visualizations ──────────────────────────────────── */

function TopicVisualization({
  topicId,
  paused,
}: {
  topicId: number;
  paused: boolean;
}) {
  if (topicId === 1) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none flex items-center gap-1.5 rounded-2xl rounded-br-sm border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-cyan-600 dark:text-cyan-400"
      >
        {[0, 180, 360].map((delay) => (
          <span
            key={delay}
            className="size-1.5 rounded-full bg-current"
            style={{
              animation: paused ? "none" : "pulse 1.5s ease-in-out infinite",
              animationDelay: `${delay}ms`,
            }}
          />
        ))}
      </div>
    );
  }

  if (topicId === 2) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none size-14 text-violet-600 dark:text-violet-400 opacity-80"
      >
        <svg
          viewBox="0 0 80 80"
          className="size-full fill-none stroke-current stroke-2"
        >
          <rect x="22" y="22" width="36" height="36" rx="6" />
          <path d="M30 10v10M40 10v10M50 10v10M30 60v10M40 60v10M50 60v10M10 30h10M10 40h10M10 50h10M60 30h10M60 40h10M60 50h10" />
          <circle
            cx="40"
            cy="40"
            r="15"
            className={paused ? "opacity-25" : "animate-ping opacity-30"}
            style={{ transformOrigin: "40px 40px", animationDuration: "2.4s" }}
          />
          <circle cx="40" cy="40" r="6" className="fill-current" />
        </svg>
      </div>
    );
  }

  if (topicId === 3) {
    const widths = ["70%", "45%", "85%", "35%", "60%"];
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none flex w-20 flex-col gap-1.5 text-fuchsia-600 dark:text-fuchsia-400 opacity-75"
      >
        {widths.map((w, idx) => (
          <span
            key={idx}
            style={{ width: w }}
            className={`block h-1 rounded-full bg-current ${
              idx % 2 === 0 ? "opacity-35" : "opacity-75"
            }`}
          />
        ))}
      </div>
    );
  }

  if (topicId === 4) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none h-12 w-36 text-emerald-600 dark:text-emerald-400 opacity-85"
      >
        <svg
          viewBox="0 0 200 60"
          preserveAspectRatio="none"
          className="size-full fill-none stroke-current"
        >
          <path
            d="M0 30 L10 22 L18 40 L26 14 L34 44 L42 26 L50 36 L58 10 L66 48 L74 24 L82 34 L90 18 L98 42 L106 28 L114 38 L122 12 L130 46 L138 22 L146 36 L154 20 L162 40 L170 26 L178 34 L186 16 L200 30"
            strokeWidth="1.4"
            strokeDasharray="3 2"
            className="opacity-40"
          />
          <path
            d="M0 30 C20 14 30 14 50 30 S80 46 100 30 S130 14 150 30 S180 46 200 30"
            strokeWidth="2.4"
            className={paused ? "opacity-85" : "animate-pulse"}
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none size-14 text-amber-600 dark:text-amber-400 opacity-85"
    >
      <svg
        viewBox="0 0 80 80"
        className="size-full fill-none stroke-current stroke-2"
      >
        <path
          d="M14 52 L32 24 L52 40 L66 18 M32 24 L40 62 L52 40"
          strokeDasharray="4 4"
          className="opacity-50"
        />
        <circle cx="14" cy="52" r="4" className="fill-current" />
        <circle cx="32" cy="24" r="5" className="fill-current" />
        <circle cx="52" cy="40" r="5" className="fill-current" />
        <circle cx="66" cy="18" r="4" className="fill-current" />
        <circle cx="40" cy="62" r="4" className="fill-current" />
      </svg>
    </div>
  );
}

/* ─── Main Client Component ───────────────────────────────────────── */

export default function LivePageClient() {
  const [sessions, setSessions] = useState<Date[]>(() => upcomingSessions(4));
  const [selectedSessionIdx, setSelectedSessionIdx] = useState(0);
  const [localTimeStr, setLocalTimeStr] = useState<string>("2:00 PM London");
  const [countdown, setCountdown] = useState({
    d: "0",
    h: "00",
    m: "00",
    s: "00",
    isLive: false,
  });
  const [copyToast, setCopyToast] = useState("");

  // Topics state
  const [openTopicId, setOpenTopicId] = useState<number | null>(null);
  const [copiedQuestion, setCopiedQuestion] = useState<string | null>(null);
  const [topicStatusMessage, setTopicStatusMessage] = useState<
    "copied" | "error" | null
  >(null);
  const [motionPaused, setMotionPaused] = useState(false);
  const [typedQuestion, setTypedQuestion] = useState(ROTATING_QUESTIONS[0]);

  // Stream Explainer & Channels state
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [selectedPlatformIdx, setSelectedPlatformIdx] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stepTabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const nextEvent =
    sessions[0] ??
    lastMonday(new Date().getUTCFullYear(), new Date().getUTCMonth());
  const selectedSession = sessions[selectedSessionIdx] ?? nextEvent;
  const recurringGcalUrl = buildGoogleCalendarUrl(nextEvent, true);
  const selectedSessionGcalUrl = buildGoogleCalendarUrl(selectedSession, false);

  // Hydrate countdown, user's local timezone string, and visibility refresh
  useEffect(() => {
    const refreshSchedule = () => {
      const fresh = upcomingSessions(4);
      setSessions(fresh);
      const next = fresh[0];
      if (next) {
        const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setLocalTimeStr(
          fmt(
            next,
            {
              weekday: "short",
              day: "numeric",
              month: "short",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            },
            localTz,
          ),
        );
      }
    };

    refreshSchedule();

    const tick = () => {
      const fresh = upcomingSessions(1);
      const target = fresh[0];
      if (!target) return;
      const diffMs = target.getTime() - Date.now();
      if (diffMs <= 0) {
        setCountdown({ d: "0", h: "00", m: "00", s: "00", isLive: true });
        return;
      }
      const totalSeconds = Math.floor(diffMs / 1000);
      setCountdown({
        d: String(Math.floor(totalSeconds / 86400)),
        h: pad(Math.floor((totalSeconds % 86400) / 3600)),
        m: pad(Math.floor((totalSeconds % 3600) / 60)),
        s: pad(totalSeconds % 60),
        isLive: false,
      });
    };

    tick();
    const interval = window.setInterval(tick, 1000);

    const onVisibility = () => {
      if (!document.hidden) refreshSchedule();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Subtle EEG waveform canvas in hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const lines = [
      {
        c: "rgba(6, 182, 212, 0.45)",
        a: 14,
        f: [0.021, 0.057, 0.13],
        sp: 1.1,
        y: 0.35,
      },
      {
        c: "rgba(139, 92, 246, 0.35)",
        a: 18,
        f: [0.012, 0.043, 0.09],
        sp: 0.75,
        y: 0.58,
      },
      {
        c: "rgba(20, 184, 166, 0.30)",
        a: 11,
        f: [0.03, 0.071, 0.17],
        sp: 1.4,
        y: 0.8,
      },
    ];

    let t = 0;
    let frameId: number | null = null;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      lines.forEach((L, k) => {
        ctx.beginPath();
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = L.c;
        for (let x = 0; x <= w; x += 3) {
          const p = x + t * L.sp * 2;
          let y =
            Math.sin(p * L.f[0]) * L.a +
            Math.sin(p * L.f[1] + k) * L.a * 0.5 +
            Math.sin(p * L.f[2] + k * 2) * L.a * 0.25;
          const spike =
            Math.sin(p * 0.006 + k) > 0.985 ? Math.sin(p * 0.6) * L.a * 1.5 : 0;
          y = L.y * h + y + spike;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      t += 1;
      if (!prefersReduced && !motionPaused) {
        frameId = window.requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [motionPaused]);

  // Typewriter rotating question in Card 06 (Live Q&A)
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || motionPaused) {
      return;
    }

    let qIdx = 0;
    let pos = ROTATING_QUESTIONS[0].length;
    let phase: "hold" | "erase" | "type" = "hold";
    let timer: number | null = null;

    const step = () => {
      const currentFull = ROTATING_QUESTIONS[qIdx];
      if (phase === "hold") {
        phase = "erase";
        timer = window.setTimeout(step, 30);
      } else if (phase === "erase") {
        pos = Math.max(0, pos - 1);
        setTypedQuestion(currentFull.slice(0, pos));
        if (pos === 0) {
          qIdx = (qIdx + 1) % ROTATING_QUESTIONS.length;
          phase = "type";
          timer = window.setTimeout(step, 260);
        } else {
          timer = window.setTimeout(step, 26);
        }
      } else {
        const nextFull = ROTATING_QUESTIONS[qIdx];
        pos += 1;
        setTypedQuestion(nextFull.slice(0, pos));
        if (pos >= nextFull.length) {
          phase = "hold";
          timer = window.setTimeout(step, 2300);
        } else {
          timer = window.setTimeout(step, 45);
        }
      }
    };

    timer = window.setTimeout(step, 2200);
    return () => {
      if (timer !== null) window.clearTimeout(timer);
    };
  }, [motionPaused]);

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Fallback below
    }
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("aria-hidden", "true");
    field.style.cssText = "position:fixed;left:-9999px;top:0;";
    document.body.appendChild(field);
    field.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    field.remove();
    return ok;
  }, []);

  const handleCopyDetails = async () => {
    const ok = await copyToClipboard(buildCopyDetails(nextEvent));
    setCopyToast(
      ok
        ? "Copied. Paste it into your calendar or share it."
        : "Copy not available here. Use Google Calendar instead.",
    );
    window.setTimeout(() => setCopyToast(""), 4500);
  };

  const handleCopyQuestion = async (question: string) => {
    const ok = await copyToClipboard(question);
    if (ok) {
      setCopiedQuestion(question);
      setTopicStatusMessage("copied");
    } else {
      setTopicStatusMessage("error");
    }
  };

  const handleStepKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    idx: number,
  ) => {
    const len = STREAM_STEPS.length;
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % len;
    else if (e.key === "ArrowLeft") nextIdx = (idx + len - 1) % len;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = len - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      setActiveStepIdx(nextIdx);
      stepTabsRef.current[nextIdx]?.focus();
    }
  };

  const selectedPlatform = PLATFORMS[selectedPlatformIdx] ?? PLATFORMS[0];
  const londonDayKey = fmt(selectedSession, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <div className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* ========== HERO ========== */}
      <section
        id="top"
        className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50/80 via-white to-white dark:from-zinc-900/50 dark:via-zinc-950 dark:to-zinc-950 py-14 sm:py-20 lg:py-24"
      >
        {/* Ambient subtle glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-180 rounded-full bg-linear-to-r from-cyan-500/10 via-violet-500/8 to-teal-500/10 blur-3xl"
        />

        {/* Animated EEG trace canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 w-full opacity-60 dark:opacity-70"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Hero Left Copy */}
            <div className="lg:col-span-6">
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-3.5 py-1.5 shadow-2xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-rose-500" />
                </span>
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-zinc-600 dark:text-zinc-300">
                  PiEEG Monthly Live
                </span>
              </div>

              <h1 className="title-hero mb-6 text-zinc-900 dark:text-zinc-50">
                Your monthly{" "}
                <span className="text-cyan-600 dark:text-cyan-400">
                  brain&#8209;computer
                </span>{" "}
                meetup.
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                Once a month we go live with{" "}
                <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                  everything new at PiEEG
                </strong>
                : AI agents, hardware, software, signal processing, and the
                neuroscience behind it all. Then it&apos;s your turn.{" "}
                <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Come and ask us anything.
                </strong>
              </p>

              <div className="my-7 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="size-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  Last Monday of every month
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="size-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  2:00 PM London
                </span>
                <span className="inline-flex items-center gap-2">
                  <Radio className="size-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  Live on all our channels
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={recurringGcalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  <Calendar className="size-4" />
                  Add to my calendar
                </a>
                <a
                  href="#ask"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200 transition-colors hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/70"
                >
                  Send a question
                </a>
              </div>

              {/* Section Quick Jump Links */}
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-zinc-200/80 dark:border-zinc-800/80 pt-5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <span className="font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  On this page:
                </span>
                <a
                  href="#topics"
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Topics &amp; Q&amp;A
                </a>
                <a
                  href="#community"
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Community
                </a>
                <a
                  href="#watch"
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Where to watch
                </a>
                <a
                  href="#ask"
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  Ask us
                </a>
              </div>
            </div>

            {/* Hero Right: Countdown Card + Community Images */}
            <div className="lg:col-span-6 grid gap-5">
              {/* Next Live Countdown Card */}
              <aside
                aria-live="polite"
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/90 p-6 sm:p-7 shadow-sm backdrop-blur-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${
                      countdown.isLive
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {countdown.isLive ? "● Live now" : "Next live"}
                  </span>
                  <span className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2.5 py-0.5 font-mono text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                    {fmt(nextEvent, { month: "short", year: "numeric" })} edition
                  </span>
                </div>

                <p className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {fmt(nextEvent, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {fmt(nextEvent, { year: "numeric" })} &middot; 2:00 PM London (
                  {zoneName(nextEvent)}) &middot; about 1 hour
                </p>

                {/* Countdown Grid */}
                <div className="my-5 grid grid-cols-4 gap-2.5">
                  {[
                    { label: "Days", value: countdown.d },
                    { label: "Hrs", value: countdown.h },
                    { label: "Min", value: countdown.m },
                    { label: "Sec", value: countdown.s },
                  ].map((unit) => (
                    <div
                      key={unit.label}
                      className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/90 py-3 px-2 text-center"
                    >
                      <b className="block font-mono text-2xl sm:text-3xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
                        {unit.value}
                      </b>
                      <small className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500">
                        {unit.label}
                      </small>
                    </div>
                  ))}
                </div>

                {/* User Local Time Banner */}
                <div className="flex items-center gap-2.5 rounded-xl border border-cyan-500/25 dark:border-cyan-400/25 bg-cyan-50/70 dark:bg-cyan-950/30 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  <MapPin className="size-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>
                    Your time:{" "}
                    <strong className="font-semibold text-zinc-900 dark:text-cyan-200">
                      {localTimeStr}
                    </strong>
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <a
                    href={recurringGcalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    Google Calendar
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyDetails}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 transition-colors hover:border-zinc-400 dark:hover:border-zinc-600 cursor-pointer"
                  >
                    <Copy className="size-3.5" />
                    Copy details
                  </button>
                </div>

                {copyToast && (
                  <p className="mt-2.5 text-center text-xs font-medium text-cyan-600 dark:text-cyan-400">
                    {copyToast}
                  </p>
                )}
              </aside>

              {/* Community & Live Call Visual Row */}
              <div
                aria-label="PiEEG community photos"
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch"
              >
                <div className="sm:col-span-7 relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 min-h-44">
                  <Image
                    src="/live/community.jpg"
                    alt="PiEEG community members building together at a hackathon"
                    width={1418}
                    height={504}
                    priority
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950/85 via-zinc-950/20 to-transparent" />
                  <div className="absolute inset-x-4 bottom-3.5 text-white">
                    <b className="block text-sm font-semibold leading-snug">
                      Built with our community
                    </b>
                    <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-zinc-300">
                      Hackathons &middot; Makers &middot; Labs
                    </span>
                  </div>
                </div>

                <figure className="sm:col-span-5 relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 flex items-center">
                  <svg
                    viewBox="627 872 520 505"
                    width="520"
                    height="505"
                    role="img"
                    aria-labelledby="heroCallImageTitle"
                    className="block h-auto w-full"
                  >
                    <title id="heroCallImageTitle">
                      PiEEG community video call
                    </title>
                    <image
                      href="/live/live-call-reference.png"
                      x="0"
                      y="0"
                      width="2048"
                      height="1540"
                    />
                  </svg>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TOPICS ========== */}
      <section
        id="topics"
        className="border-b border-zinc-200 dark:border-zinc-800 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-400">
                // Every month
              </p>
              <h2 className="title-section text-zinc-900 dark:text-zinc-50">
                A month of PiEEG in{" "}
                <span className="text-cyan-600 dark:text-cyan-400">
                  one hour
                </span>
              </h2>
              <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
                What we built, what we learned, and where it&apos;s going, across
                every part of the stack.
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">
                <span aria-hidden="true" className="text-base">
                  ↳
                </span>
                Explore a topic. Pick a question to bring to the live chat.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMotionPaused((p) => !p)}
              aria-pressed={motionPaused}
              aria-label={
                motionPaused
                  ? "Resume topic animations"
                  : "Pause topic animations"
              }
              className="self-start sm:self-end inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3.5 py-1.5 font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              {motionPaused ? (
                <>
                  <Play className="size-3" />
                  <span>Resume motion</span>
                </>
              ) : (
                <>
                  <Pause className="size-3" />
                  <span>Pause motion</span>
                </>
              )}
            </button>
          </div>

          {/* Marquee Tag Strip */}
          <div
            aria-hidden="true"
            className="mb-10 overflow-hidden marquee-fade py-1"
          >
            <div
              className="flex w-max items-center gap-2.5 animate-scroll-slow"
              style={{
                animationPlayState: motionPaused ? "paused" : "running",
              }}
            >
              {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90 px-3.5 py-1.5 font-mono text-xs font-medium text-zinc-600 dark:text-zinc-300 whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Topics Bento Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {TOPICS.map((topic) => {
              const Icon = topic.Icon;
              const isOpen = openTopicId === topic.id;
              return (
                <div
                  key={topic.id}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm ${
                    topic.wide ? "lg:col-span-3" : "lg:col-span-2"
                  }`}
                >
                  <div>
                    {/* Top row: Icon + Micro Visualization */}
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div
                        className={`flex size-11 items-center justify-center rounded-xl border ${topic.accentBorder} ${topic.accentBg} ${topic.accentText}`}
                      >
                        <Icon className="size-5" />
                      </div>
                      <TopicVisualization
                        topicId={topic.id}
                        paused={motionPaused}
                      />
                    </div>

                    <p className="font-mono text-xs font-medium tracking-wider text-zinc-400 dark:text-zinc-500">
                      {topic.number}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {topic.description}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {topic.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interactive Question Explorer */}
                  <div className="mt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 pt-4">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenTopicId((curr) =>
                          curr === topic.id ? null : topic.id,
                        )
                      }
                      aria-expanded={isOpen}
                      className={`flex w-full items-center justify-between gap-2 text-left text-xs font-semibold ${topic.accentText} cursor-pointer`}
                    >
                      <span>Explore this topic</span>
                      <span
                        aria-hidden="true"
                        className={`flex size-6 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 transition-transform duration-200 ${
                          isOpen ? "rotate-45 bg-zinc-100 dark:bg-zinc-800" : ""
                        }`}
                      >
                        <Plus className="size-3.5" />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="mt-4 space-y-2">
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          Questions you could bring
                        </p>
                        <div className="grid gap-2">
                          {topic.questions.map((q) => {
                            const isCopied = copiedQuestion === q;
                            return (
                              <button
                                key={q}
                                type="button"
                                onClick={() => handleCopyQuestion(q)}
                                aria-label={`Copy question: ${q}`}
                                className={`flex flex-col gap-1.5 rounded-xl border p-3 text-left text-xs transition-colors cursor-pointer ${
                                  isCopied
                                    ? "border-cyan-500/60 bg-cyan-50/70 dark:border-cyan-400/60 dark:bg-cyan-950/30"
                                    : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/60 hover:border-cyan-500/40 dark:hover:border-cyan-400/40"
                                }`}
                              >
                                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                  {q}
                                </span>
                                <small
                                  className={`inline-flex items-center gap-1 font-mono text-[10px] font-semibold ${topic.accentText}`}
                                >
                                  {isCopied ? (
                                    <>
                                      <Check className="size-3" /> Copied
                                    </>
                                  ) : (
                                    <>Copy question ↗</>
                                  )}
                                </small>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Card 06: Live Q&A Full-Width Banner Card */}
            <a
              href="#ask"
              className="lg:col-span-6 group relative overflow-hidden rounded-2xl border border-cyan-500/30 dark:border-cyan-400/30 bg-linear-to-r from-cyan-50/70 via-white to-violet-50/60 dark:from-cyan-950/25 dark:via-zinc-900 dark:to-violet-950/25 p-6 sm:p-8 transition-all duration-200 hover:border-cyan-500/60 dark:hover:border-cyan-400/60"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <MessageSquare className="size-5" />
                  </div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    06 &middot; Live Q&amp;A
                  </p>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Come and ask us
                  </h3>
                  <p
                    aria-hidden="true"
                    className="mt-2 font-mono text-sm text-cyan-700 dark:text-cyan-300 min-h-6"
                  >
                    &gt; <span>{typedQuestion}</span>
                    <b className="ml-0.5 animate-pulse text-cyan-500">_</b>
                  </p>
                  <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                    Stuck on a project, curious about BCIs, or have an idea for
                    us? Ask in the live chat on any platform, or send your
                    question before the stream.
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-transform group-hover:translate-x-0.5 dark:bg-zinc-100 dark:text-zinc-950">
                    Ask a question
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* Copied Question Status Feedback */}
          <div role="status" aria-live="polite">
            {topicStatusMessage === "copied" && (
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cyan-500/30 bg-cyan-50/70 dark:bg-cyan-950/30 px-4 py-3 text-xs sm:text-sm text-cyan-900 dark:text-cyan-200">
                <span>
                  Question copied. Paste it into the live chat, or post it
                  before the stream.
                </span>
                <a
                  href="https://discord.gg/neJ45FR6Sv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 hover:text-cyan-700 dark:hover:text-cyan-100"
                >
                  Open Discord <ExternalLink className="size-3.5" />
                </a>
              </div>
            )}
            {topicStatusMessage === "error" && (
              <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/30 px-4 py-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                Copy is not available in this browser. Select and copy the
                question text, then paste it into the live chat or Discord.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========== COMMUNITY ========== */}
      <section
        id="community"
        className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-xs">
                <Image
                  src="/live/community.jpg"
                  alt="PiEEG community members building together at a hackathon"
                  width={1418}
                  height={504}
                  className="aspect-16/10 w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/85 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-4 flex flex-wrap items-end justify-between gap-2 text-white">
                  <b className="text-base sm:text-lg font-semibold">
                    Built with our community
                  </b>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                    Hackathons &middot; Makers &middot; Labs
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-400">
                // The place to be
              </p>
              <h2 className="title-section text-zinc-900 dark:text-zinc-50">
                Where the BCI community meets
              </h2>
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                If you like brain-computer interfaces, this is your monthly
                hangout. Meet the team behind PiEEG and people from all over the
                world who build with bio signals.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  {
                    Icon: Wrench,
                    title: "Makers & hackers",
                    desc: "Building their first BCI or their tenth",
                  },
                  {
                    Icon: FlaskConical,
                    title: "Researchers & students",
                    desc: "Running experiments with EEG, EMG and ECG",
                  },
                  {
                    Icon: HelpCircle,
                    title: "The curious",
                    desc: "New to neuroscience and want to learn",
                  },
                ].map((item) => {
                  const Icon = item.Icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-4"
                    >
                      <Icon className="mt-0.5 size-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <div>
                        <b className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {item.title}
                        </b>
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-6 border-t border-zinc-200 dark:border-zinc-800 pt-6">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2"
                >
                  <Image
                    src="/logo-without-bg.png"
                    alt="PiEEG"
                    width={110}
                    height={30}
                    className="h-7 w-auto dark:brightness-0 dark:invert"
                  />
                </Link>
                <div>
                  <b className="block text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    2000+
                  </b>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    on Discord
                  </span>
                </div>
                <div>
                  <b className="block text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    Open source
                  </b>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    MIT-licensed software
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WATCH & SCHEDULE ========== */}
      <section
        id="watch"
        className="border-b border-zinc-200 dark:border-zinc-800 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-400">
              // One stream, every channel
            </p>
            <h2 className="title-section text-zinc-900 dark:text-zinc-50">
              Watch where you already follow us
            </h2>
            <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
              We stream once, and the same live video goes out to all PiEEG
              channels at the same time. Chat and ask questions from any of
              them.
            </p>
          </div>

          {/* Interactive Stream Explainer */}
          <div
            aria-labelledby="streamFormatTitle"
            className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 bg-zinc-50/70 dark:bg-zinc-900">
              <h3
                id="streamFormatTitle"
                className="text-base font-semibold text-zinc-900 dark:text-zinc-100"
              >
                How the stream works
              </h3>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                One conversation. Join from anywhere.
              </span>
            </div>

            {/* 3-Step Tablist */}
            <div
              role="tablist"
              aria-label="How the stream works"
              className="grid grid-cols-1 sm:grid-cols-3 border-b border-zinc-200 dark:border-zinc-800 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 dark:divide-zinc-800"
            >
              {STREAM_STEPS.map((step, idx) => {
                const selected = idx === activeStepIdx;
                return (
                  <button
                    key={step.id}
                    ref={(el) => {
                      stepTabsRef.current[idx] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`streamTab-${idx}`}
                    aria-selected={selected}
                    aria-controls={`streamPanel-${idx}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveStepIdx(idx)}
                    onKeyDown={(e) => handleStepKeyDown(e, idx)}
                    className={`flex items-center gap-3.5 px-5 py-4 text-left transition-colors cursor-pointer ${
                      selected
                        ? "bg-cyan-50/60 dark:bg-cyan-950/25 text-zinc-900 dark:text-zinc-50 shadow-[inset_0_-2px_0_0_#06b6d4]"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-semibold ${
                        selected
                          ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                          : "border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">
                        {step.label}
                      </span>
                      <small className="block text-xs text-zinc-500 dark:text-zinc-400">
                        {step.subtitle}
                      </small>
                    </div>
                    {idx < 2 && (
                      <span
                        aria-hidden="true"
                        className="hidden sm:inline text-zinc-400 dark:text-zinc-600"
                      >
                        →
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Format Body */}
            <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-12">
              {/* Left Illustrated Preview */}
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-zinc-800 px-3.5 py-2.5 text-xs font-semibold">
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full bg-cyan-400"
                    />
                    <span>PiEEG Monthly Live</span>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                      Stream format
                    </span>
                  </div>
                  <div className="relative aspect-16/11 overflow-hidden bg-zinc-900">
                    <svg
                      viewBox="627 872 520 505"
                      width="520"
                      height="505"
                      role="img"
                      preserveAspectRatio="xMidYMid slice"
                      aria-labelledby="streamCallTitle"
                      className="block size-full"
                    >
                      <title id="streamCallTitle">
                        PiEEG community video call
                      </title>
                      <image
                        href="/live/live-call-reference.png"
                        x="0"
                        y="0"
                        width="2048"
                        height="1540"
                      />
                    </svg>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/80 to-transparent" />
                    <span className="absolute inset-x-3.5 bottom-2.5 text-xs font-medium text-white">
                      The team. The demos. Your questions.
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-zinc-200">
                    <span className="inline-flex items-center gap-2">
                      <span className="text-cyan-400" aria-hidden="true">
                        ▶
                      </span>
                      One live video
                    </span>
                    <span className="text-zinc-400">~ 1 hour</span>
                  </div>
                </div>
              </div>

              {/* Right Active Tabpanel */}
              <div className="lg:col-span-7">
                {STREAM_STEPS.map((step, idx) => {
                  const selected = idx === activeStepIdx;
                  return (
                    <div
                      key={step.id}
                      id={`streamPanel-${idx}`}
                      role="tabpanel"
                      aria-labelledby={`streamTab-${idx}`}
                      hidden={!selected}
                      tabIndex={0}
                      className={selected ? "block" : "hidden"}
                    >
                      <p className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                        {step.kicker}
                      </p>
                      <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {step.heading}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {step.body}
                      </p>
                      <ul className="my-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                        {step.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-center gap-2.5">
                            <Check className="size-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {step.ctaType === "calendar" && (
                        <a
                          href={recurringGcalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors"
                        >
                          <Calendar className="size-4" />
                          {step.ctaLabel}
                        </a>
                      )}
                      {step.ctaType === "anchor" && (
                        <a
                          href={step.ctaHref}
                          className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                        >
                          {step.ctaLabel} <span aria-hidden="true">↓</span>
                        </a>
                      )}
                      {step.ctaType === "external" && (
                        <a
                          href={step.ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors"
                        >
                          {step.ctaLabel} <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stream Distribution Bar */}
            <div
              aria-label="One PiEEG live session is broadcast to multiple channels"
              className="flex items-center gap-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/60 px-6 py-3.5 font-mono text-xs"
            >
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold whitespace-nowrap">
                <span aria-hidden="true" className="mr-1.5">
                  ◉
                </span>
                PiEEG live session
              </span>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-linear-to-r from-cyan-500/50 to-violet-500/50"
              />
              <span className="text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                Same video &middot; every channel{" "}
                <span
                  aria-hidden="true"
                  className="text-violet-600 dark:text-violet-400"
                >
                  ↓
                </span>
              </span>
            </div>
          </div>

          {/* Channel Picker */}
          <div
            id="channelPicker"
            className="mt-12 mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2 scroll-mt-24"
          >
            <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Choose where to join
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Select a channel for its link and live-chat details.
            </p>
          </div>

          <div
            role="group"
            aria-label="Choose a streaming channel"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
          >
            {PLATFORMS.map((platform, idx) => {
              const selected = idx === selectedPlatformIdx;
              const available = Boolean(platform.url);
              return (
                <button
                  key={platform.name}
                  type="button"
                  aria-pressed={selected}
                  aria-controls="channelGuide"
                  aria-label={
                    available
                      ? `Choose ${platform.name}`
                      : `${platform.name}: channel link coming soon`
                  }
                  onClick={() => setSelectedPlatformIdx(idx)}
                  className={`relative flex flex-col items-start gap-3.5 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                    selected
                      ? "border-cyan-500 dark:border-cyan-400 bg-cyan-50/50 dark:bg-cyan-950/25 shadow-2xs"
                      : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 hover:border-zinc-300 dark:hover:border-zinc-700"
                  } ${!available && !selected ? "opacity-65" : ""}`}
                >
                  {selected && (
                    <span
                      aria-hidden="true"
                      className="absolute top-3 right-3 text-xs font-bold text-cyan-600 dark:text-cyan-400"
                    >
                      ✓
                    </span>
                  )}
                  <span
                    className={`flex size-9 items-center justify-center rounded-xl ${platform.badgeBg}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4.5 fill-current"
                      aria-hidden="true"
                    >
                      <path d={platform.svgPath} />
                    </svg>
                  </span>
                  <div>
                    <span className="block text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {platform.name}
                    </span>
                    <small className="block text-xs text-zinc-500 dark:text-zinc-400">
                      {available ? "Choose channel" : "Link coming"}
                    </small>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Channel Guide Card */}
          <div
            id="channelGuide"
            aria-live="polite"
            aria-atomic="true"
            className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/90 p-6"
          >
            <div className="max-w-2xl">
              <p
                className={`font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${
                  selectedPlatform.url
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {selectedPlatform.url
                  ? "YOUR CHANNEL · SAME LIVE SESSION"
                  : "CHANNEL LINK COMING SOON"}
              </p>
              <h3 className="mt-1.5 text-xl font-bold text-zinc-900 dark:text-zinc-50">
                {selectedPlatform.url
                  ? `Watch on ${selectedPlatform.name}`
                  : `${selectedPlatform.name} — link coming`}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {selectedPlatform.url
                  ? `Open the PiEEG ${selectedPlatform.name} ${
                      selectedPlatform.name === "LinkedIn" ? "page" : "channel"
                    } at the scheduled time, choose the live stream, and bring your question to its ${
                      selectedPlatform.name === "LinkedIn"
                        ? "comments"
                        : "live chat"
                    }.`
                  : `The ${selectedPlatform.name} channel link is coming soon. You can join the PiEEG live session on YouTube or LinkedIn using the channels above.`}
              </p>
            </div>

            <div className="flex flex-col sm:items-center gap-2.5 shrink-0">
              {selectedPlatform.url && (
                <a
                  href={selectedPlatform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors"
                >
                  Open {selectedPlatform.name} <span aria-hidden="true">↗</span>
                </a>
              )}
              <a
                href="https://discord.gg/neJ45FR6Sv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-xs font-medium text-zinc-500 dark:text-zinc-400 underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Ask before the stream on Discord
              </a>
            </div>
          </div>

          {/* Find Your Time & Session Selector */}
          <div className="mt-12 mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Find your time
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Last Monday of every month &middot; 2:00 PM London
            </p>
          </div>

          <div
            role="group"
            aria-label="Choose a session date"
            className="flex flex-wrap gap-2"
          >
            {sessions.map((date, idx) => {
              const selected = idx === selectedSessionIdx;
              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelectedSessionIdx(idx)}
                  className={`rounded-full border px-4 py-2 font-mono text-xs font-medium transition-colors cursor-pointer ${
                    selected
                      ? "border-cyan-500 dark:border-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-200 font-semibold"
                      : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {fmt(date, {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  &middot; 2 PM {zoneName(date)}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p
              role="status"
              aria-live="polite"
              className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400"
            >
              Selected:{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                {fmt(selectedSession, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </strong>{" "}
              &middot; 2:00–3:00 PM London ({zoneName(selectedSession)}).
            </p>
            <a
              href={selectedSessionGcalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              Add this session to calendar <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* 6 World Timezone Grid */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800">
            {WORLD_ZONES.map(([city, tz]) => {
              const timeText = fmt(
                selectedSession,
                { hour: "numeric", minute: "2-digit", hour12: true },
                tz,
              ).toUpperCase();
              const cityDayKey = fmt(
                selectedSession,
                { year: "numeric", month: "numeric", day: "numeric" },
                tz,
              );
              const differentDay = cityDayKey !== londonDayKey;

              return (
                <div
                  key={city}
                  className="bg-white dark:bg-zinc-950 p-4 flex flex-col justify-between"
                >
                  <b className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {city}
                  </b>
                  <span className="mt-1 font-mono text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    {timeText}
                  </span>
                  {differentDay && (
                    <small className="mt-1 font-mono text-[10px] font-medium text-cyan-600 dark:text-cyan-400">
                      {fmt(
                        selectedSession,
                        { weekday: "short", day: "numeric", month: "short" },
                        tz,
                      )}
                    </small>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            Times above follow the date you select, including daylight-saving
            changes.
          </p>
        </div>
      </section>

      {/* ========== ASK / FINAL CTA ========== */}
      <section id="ask" className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90 px-6 py-12 sm:px-12 sm:py-16 text-center shadow-xs">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-400">
              // Your turn
            </p>
            <h2 className="title-section mt-3 text-zinc-900 dark:text-zinc-50">
              Bring your questions.
              <br />
              <span className="text-cyan-600 dark:text-cyan-400">
                We&apos;ll answer them live.
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
              Post your question in our Discord before the stream, or ask in the
              live chat on the day. Hardware, code, signals, or just the brain.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://discord.gg/neJ45FR6Sv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors"
              >
                Ask on Discord
                <ExternalLink className="size-4" />
              </a>
              <a
                href={recurringGcalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-6 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <Calendar className="size-4" />
                Add monthly reminder
              </a>
            </div>

            <p className="mt-5 text-xs text-zinc-500 dark:text-zinc-400">
              Or email{" "}
              <a
                href="mailto:pieeg@pieeg.com"
                className="font-mono font-medium text-zinc-700 dark:text-zinc-300 underline underline-offset-4 hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                pieeg@pieeg.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
