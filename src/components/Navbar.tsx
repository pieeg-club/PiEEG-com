'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback, useMemo, Fragment } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { SocialMenu, PIEEG_SOCIAL_LINKS } from "./SocialMenu";
import {
  ChevronDown, Users, Mail, Briefcase, Building2,
  Zap, BookOpen, Newspaper, Sparkles, ArrowRight, ArrowUpRight, Menu, X, Globe, LayoutGrid, Monitor, Cloud, Bot, Glasses, Cpu, ShoppingCart, GraduationCap, Smartphone, Terminal, Watch, CircuitBoard, School, Scale, FlaskConical, Camera, Eye, Radio, MessageSquare, Search, Trophy, Calendar, Lightbulb, Database, Layers, LifeBuoy,
} from "lucide-react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function MetaQuestIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5,19.5c0-4.6,2.3-9.4,5-9.4c1.5,0,2.7,0.9,4.6,3.6c-1.8,2.8-2.9,4.5-2.9,4.5c-2.4,3.8-3.2,4.6-4.5,4.6C5.9,22.9,5,21.7,5,19.5 M20.7,17.8L19,15c-0.4-0.7-0.9-1.4-1.3-2c1.5-2.3,2.7-3.5,4.2-3.5c3,0,5.4,4.5,5.4,10.1c0,2.1-0.7,3.3-2.1,3.3S23.3,22,20.7,17.8 M16.4,11c-2.2-2.9-4.1-4-6.3-4C5.5,7,2,13.1,2,19.5c0,4,1.9,6.5,5.1,6.5c2.3,0,3.9-1.1,6.9-6.3c0,0,1.2-2.2,2.1-3.7c0.3,0.5,0.6,1,0.9,1.6l1.4,2.4c2.7,4.6,4.2,6.1,6.9,6.1c3.1,0,4.8-2.6,4.8-6.7C30,12.6,26.4,7,22.1,7C19.8,7,18,8.8,16.4,11"/>
    </svg>
  );
}

function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.919V2.733a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

const navGroups = [
  [
    { href: "/hardware", label: "Hardware" },
    { href: "/cloud", label: "Cloud" },
    { href: "/agent", label: "AI" },
    { href: "/server", label: "Server" },
  ],
  [
    { href: "/community", label: "Community" },
    { href: "/news", label: "News" },
    { href: "https://docs.pieeg.com", label: "Docs", external: true },
  ],
];

const navLinks = navGroups.flat();

type MegaPillar = "all" | "hardware" | "cloud" | "spatial-ai" | "learn" | "community" | "company";

interface MegaMenuItem {
  href: string;
  label: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
  external?: boolean;
  exactMatch?: boolean;
  badge?: string;
  keywords?: string;
}

interface MegaMenuSection {
  id: string;
  pillar: Exclude<MegaPillar, "all">;
  heading: string;
  tag: string;
  accentDot: string;
  topHairline: string;
  textAccent: string;
  iconHover: string;
  badgeStyle: string;
  footerNote?: { text: string; href?: string; cta?: string };
  items: MegaMenuItem[];
}

const MEGA_PILLARS: { id: MegaPillar; label: string }[] = [
  { id: "all", label: "All Ecosystem" },
  { id: "hardware", label: "Hardware & Stack" },
  { id: "cloud", label: "Cloud & Labs" },
  { id: "spatial-ai", label: "XR, AI & Wearables" },
  { id: "learn", label: "Academy & Docs" },
  { id: "community", label: "Community" },
  { id: "company", label: "Company" },
];

const megaMenuSections: MegaMenuSection[] = [
  {
    id: "hardware",
    pillar: "hardware",
    heading: "Hardware & Core Stack",
    tag: "Boards & SDKs",
    accentDot: "bg-cyan-500",
    topHairline: "from-cyan-500/60 via-cyan-400/20 to-transparent",
    textAccent: "text-cyan-700 dark:text-cyan-400",
    iconHover: "group-hover:bg-cyan-500/15 group-hover:text-cyan-600 dark:group-hover:bg-cyan-400/15 dark:group-hover:text-cyan-300",
    badgeStyle: "bg-cyan-500/12 text-cyan-700 ring-cyan-500/30 dark:bg-cyan-400/15 dark:text-cyan-300 dark:ring-cyan-400/30",
    items: [
      { href: "/store", label: "PiEEG Store", desc: "Shop boards, caps, gels & kits", Icon: ShoppingCart, badge: "Shop", keywords: "buy order kits caps electrodes gel" },
      { href: "/hardware", label: "Hardware Lineup", desc: "Compare 8, 16 & 32-ch BCI shields", Icon: Layers, keywords: "pieeg-8 pieeg-16 ironbci octopus ardeeg jneeg microbci" },
      { href: "/server", label: "Server & SDKs", desc: "Python, C++, LSL & local tools", Icon: Globe, keywords: "api lsl python sdk local dashboards" },
      { href: "https://firmware.pieeg.com/", label: "Octopus-16 Firmware", desc: "Flash 16-ch EEG over Bluetooth", Icon: Cpu, external: true, badge: "BLE", keywords: "esp32 webble flasher update" },
    ],
  },
  {
    id: "cloud",
    pillar: "cloud",
    heading: "Cloud & Live Workbenches",
    tag: "In-Browser",
    accentDot: "bg-sky-500",
    topHairline: "from-sky-500/60 via-blue-400/20 to-transparent",
    textAccent: "text-sky-700 dark:text-sky-400",
    iconHover: "group-hover:bg-sky-500/15 group-hover:text-sky-600 dark:group-hover:bg-sky-400/15 dark:group-hover:text-sky-300",
    badgeStyle: "bg-sky-500/12 text-sky-700 ring-sky-500/30 dark:bg-sky-400/15 dark:text-sky-300 dark:ring-sky-400/30",
    items: [
      { href: "/cloud", label: "Cloud Platform", desc: "Zero-install BCI in your browser", Icon: Cloud, badge: "Web", keywords: "web serial ble streaming cloud" },
      { href: "https://cloud.pieeg.com/lab", label: "Bio-Pen (Live Lab)", desc: "Shareable live DSP & ML pipelines", Icon: FlaskConical, external: true, keywords: "sandbox dsp classifier filters" },
      { href: "https://cloud.pieeg.com/experiences/oculomotor-bench", label: "Oculomotor & Pupillometry", desc: "Dual-eye VOG, PLR & EOG bench", Icon: Eye, external: true, keywords: "eye tracking pupil saccade blink vog plr eog" },
      { href: "https://cloud.pieeg.com/experiences/optical-physiological-bench", label: "Optical Physiological Bench", desc: "Webcam rPPG & optical EEG bench", Icon: Camera, external: true, keywords: "heart rate pulse rppg webcam hrv" },
    ],
  },
  {
    id: "spatial",
    pillar: "spatial-ai",
    heading: "XR, Wearables & Mobile",
    tag: "Spatial & Edge",
    accentDot: "bg-purple-500",
    topHairline: "from-purple-500/60 via-fuchsia-400/20 to-transparent",
    textAccent: "text-purple-700 dark:text-purple-400",
    iconHover: "group-hover:bg-purple-500/15 group-hover:text-purple-600 dark:group-hover:bg-purple-400/15 dark:group-hover:text-purple-300",
    badgeStyle: "bg-purple-500/12 text-purple-700 ring-purple-500/30 dark:bg-purple-400/15 dark:text-purple-300 dark:ring-purple-400/30",
    items: [
      { href: "/xr", label: "PiEEG XR", desc: "Neural face interface for VR", Icon: Glasses, badge: "VR", keywords: "meta quest headset ar facial emg" },
      { href: "https://aura.pieeg.com", label: "Aura VR", desc: "EMG + IMU wristband for XR", Icon: Watch, external: true, keywords: "gesture wristband controller spatial" },
      { href: "https://apps.garmin.com/apps/8e994535-c853-45ca-abe3-ccef61119c8b", label: "octoWatch (Garmin)", desc: "16-ch Octopus-16 EEG on Garmin", Icon: Watch, external: true, keywords: "smartwatch connect iq wearable" },
      { href: "https://play.google.com/store/apps/details?id=com.bodypress.governorhq", label: "BodyPress Mobile", desc: "Neural biosignals on your phone", Icon: Smartphone, external: true, keywords: "android google play mobile app" },
    ],
  },
  {
    id: "ai",
    pillar: "spatial-ai",
    heading: "AI, Robotics & Everyday",
    tag: "Intelligence",
    accentDot: "bg-indigo-500",
    topHairline: "from-indigo-500/60 via-violet-400/20 to-transparent",
    textAccent: "text-indigo-700 dark:text-indigo-400",
    iconHover: "group-hover:bg-indigo-500/15 group-hover:text-indigo-600 dark:group-hover:bg-indigo-400/15 dark:group-hover:text-indigo-300",
    badgeStyle: "bg-indigo-500/12 text-indigo-700 ring-indigo-500/30 dark:bg-indigo-400/15 dark:text-indigo-300 dark:ring-indigo-400/30",
    items: [
      { href: "/agent", label: "AI Agent", desc: "Your AI copilot for brain data", Icon: Bot, badge: "MCP", keywords: "buddy llm claude mcp assistant" },
      { href: "/news/octokin-open-source-physical-ai", label: "OctoKin · Physical AI", desc: "Biosignals for ROS 2 & NVIDIA Isaac", Icon: Bot, exactMatch: true, badge: "MIT", keywords: "robotics humanoid ros2 nvidia isaac" },
      { href: "/browser", label: "Browser Extension", desc: "Brain-state overlay on every page", Icon: Monitor, keywords: "chrome extension focus alpha beta" },
      { href: "https://www.kaggle.com/pieegbiolabplatform/code", label: "Kaggle Datasets & Code", desc: "Open EEG recordings & notebooks", Icon: Database, external: true, badge: "ML", keywords: "machine learning python jupyter datasets" },
    ],
  },
  {
    id: "academy",
    pillar: "learn",
    heading: "Academy & Sandbox Labs",
    tag: "Interactive",
    accentDot: "bg-amber-500",
    topHairline: "from-amber-500/60 via-orange-400/20 to-transparent",
    textAccent: "text-amber-700 dark:text-amber-400",
    iconHover: "group-hover:bg-amber-500/15 group-hover:text-amber-600 dark:group-hover:bg-amber-400/15 dark:group-hover:text-amber-300",
    badgeStyle: "bg-amber-500/12 text-amber-700 ring-amber-500/30 dark:bg-amber-400/15 dark:text-amber-300 dark:ring-amber-400/30",
    footerNote: { text: "100% browser-based · Live or simulated EEG" },
    items: [
      { href: "https://1020.pieeg.com", label: "1020 Academy", desc: "Learn BCI with live brain data", Icon: School, external: true, keywords: "electrode placement montage 10-20" },
      { href: "https://cloud.pieeg.com/experiences/signal-lab", label: "Signal Lab", desc: "EEG DSP course on your live stream", Icon: GraduationCap, external: true, keywords: "fft notch bandpass filter artifacts" },
      { href: "https://ide.pieeg.com", label: "bioIDE", desc: "Write JavaScript against live EEG", Icon: Terminal, external: true, keywords: "code editor javascript scripting" },
      { href: "https://octobridge.pieeg.com/", label: "octoBridge", desc: "Browser lab: sensors, motors, blocks", Icon: CircuitBoard, external: true, keywords: "arduino stem blocks electronics" },
    ],
  },
  {
    id: "resources",
    pillar: "learn",
    heading: "Guides, Docs & News",
    tag: "Knowledge",
    accentDot: "bg-teal-500",
    topHairline: "from-teal-500/60 via-emerald-400/20 to-transparent",
    textAccent: "text-teal-700 dark:text-teal-400",
    iconHover: "group-hover:bg-teal-500/15 group-hover:text-teal-600 dark:group-hover:bg-teal-400/15 dark:group-hover:text-teal-300",
    badgeStyle: "bg-teal-500/12 text-teal-700 ring-teal-500/30 dark:bg-teal-400/15 dark:text-teal-300 dark:ring-teal-400/30",
    items: [
      { href: "/guides", label: "BCI Guides", desc: "Platform comparisons: OpenBCI, Muse", Icon: Scale, keywords: "compare vs openbci muse emotiv" },
      { href: "/tutorials", label: "Tutorials", desc: "Step-by-step guides & how-tos", Icon: BookOpen, keywords: "setup raspberry pi wiring" },
      { href: "/examples", label: "Examples & Demos", desc: "Real-world BCI applications", Icon: Zap, keywords: "projects code github demos" },
      { href: "/support", label: "Support & FAQ", desc: "Docs, pinouts & troubleshooting", Icon: LifeBuoy, keywords: "help documentation manual 50hz 60hz" },
      { href: "/news", label: "Latest News", desc: "Updates, papers & announcements", Icon: Newspaper, keywords: "blog articles press releases" },
    ],
  },
  {
    id: "community",
    pillar: "community",
    heading: "Community & Events",
    tag: "Open Neurotech",
    accentDot: "bg-emerald-500",
    topHairline: "from-emerald-500/60 via-green-400/20 to-transparent",
    textAccent: "text-emerald-700 dark:text-emerald-400",
    iconHover: "group-hover:bg-emerald-500/15 group-hover:text-emerald-600 dark:group-hover:bg-emerald-400/15 dark:group-hover:text-emerald-300",
    badgeStyle: "bg-emerald-500/12 text-emerald-700 ring-emerald-500/30 dark:bg-emerald-400/15 dark:text-emerald-300 dark:ring-emerald-400/30",
    items: [
      { href: "/community/discussions", label: "Community Discussions", desc: "Technical Q&A, DSP tips & forum", Icon: MessageSquare, badge: "Q&A", keywords: "forum questions answers threads" },
      { href: "/community", label: "PiEEG Competition", desc: "Maker Challenge Cohort #1", Icon: Trophy, exactMatch: true, badge: "Cohort #1", keywords: "contest prize octopus maker challenge" },
      { href: "/live", label: "PiEEG Monthly Live", desc: "Monthly neurotech stream & Q&A", Icon: Radio, badge: "Live", keywords: "livestream youtube webinar talk" },
      { href: "/community/open-ideas", label: "Open Ideas & Volunteers", desc: "16 open neurotech projects to build", Icon: Lightbulb, keywords: "contribute open source volunteer" },
      { href: "/community/hackathons", label: "Hackathons", desc: "Student BCI sponsorship & kits", Icon: Calendar, keywords: "university sponsor hardware grant" },
    ],
  },
  {
    id: "company",
    pillar: "company",
    heading: "Company & Collaboration",
    tag: "Organization",
    accentDot: "bg-rose-500",
    topHairline: "from-rose-500/60 via-pink-400/20 to-transparent",
    textAccent: "text-rose-700 dark:text-rose-400",
    iconHover: "group-hover:bg-rose-500/15 group-hover:text-rose-600 dark:group-hover:bg-rose-400/15 dark:group-hover:text-rose-300",
    badgeStyle: "bg-rose-500/12 text-rose-700 ring-rose-500/30 dark:bg-rose-400/15 dark:text-rose-300 dark:ring-rose-400/30",
    footerNote: { text: "11+ papers · 28 outlets", href: "/liability", cta: "Safety & Liability" },
    items: [
      { href: "/about", label: "About PiEEG", desc: "Our mission, team & story", Icon: Users, keywords: "mission research citations team" },
      { href: "/partnership", label: "Partnership", desc: "White-label, resellers & labs", Icon: Building2, badge: "B2B", keywords: "oem distributor custom integration" },
      { href: "/job", label: "Careers", desc: "Join our growing team", Icon: Briefcase, keywords: "jobs hiring remote roles" },
      { href: "/contact", label: "Contact", desc: "Reach us directly", Icon: Mail, keywords: "email support inquiry quote" },
    ],
  },
];

const allMegaItems = megaMenuSections.flatMap((s) => s.items);
const allInternalMegaItems = allMegaItems.filter((item) => !item.external);
const primaryNavPrefixes = [
  ...navLinks.filter((l) => !("external" in l && l.external)).map((l) => l.href),
  "/xr",
];

export function Navbar() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaQuery, setMegaQuery] = useState("");
  const [activePillar, setActivePillar] = useState<MegaPillar>("all");
  const headerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const closeMega = useCallback(() => {
    setMegaOpen(false);
    setMegaQuery("");
    setActivePillar("all");
  }, []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const isRouteActive = useCallback(
    (href: string) => {
      if (!href || href.startsWith("http")) return false;
      if (href === "/") return pathname === "/";
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname],
  );

  const isMegaItemActive = useCallback(
    (item: MegaMenuItem) => {
      if (item.external || !item.href || item.href.startsWith("http")) return false;
      if (item.exactMatch) return pathname === item.href;
      const matches = pathname === item.href || pathname.startsWith(`${item.href}/`);
      if (!matches) return false;
      return !allInternalMegaItems.some(
        (other) =>
          other.href !== item.href &&
          other.href.length > item.href.length &&
          (other.exactMatch
            ? pathname === other.href
            : pathname === other.href || pathname.startsWith(`${other.href}/`)),
      );
    },
    [pathname],
  );

  const isXrActive = isRouteActive("/xr");
  const isInformationalPage = [
    "/about",
    "/contact",
    "/job",
    "/partnership",
    "/liability",
    "/news",
    "/community",
    "/support",
  ].some((path) => pathname === path || pathname.startsWith(`${path}/`));

  const isOwnedByPrimaryNav = primaryNavPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  const isMoreRouteActive =
    !isOwnedByPrimaryNav &&
    (isRouteActive("/explore") || allInternalMegaItems.some((item) => isMegaItemActive(item)));

  const filteredSections = useMemo(() => {
    const q = megaQuery.trim().toLowerCase();
    return megaMenuSections
      .filter((section) => activePillar === "all" || section.pillar === activePillar)
      .map((section) => {
        if (!q) return section;
        const sectionMatch =
          section.heading.toLowerCase().includes(q) || section.tag.toLowerCase().includes(q);
        const items = sectionMatch
          ? section.items
          : section.items.filter((item) => {
              const haystack = `${item.label} ${item.desc} ${item.badge ?? ""} ${item.keywords ?? ""}`.toLowerCase();
              return haystack.includes(q);
            });
        return { ...section, items };
      })
      .filter((section) => section.items.length > 0);
  }, [megaQuery, activePillar]);

  const totalFilteredCount = useMemo(
    () => filteredSections.reduce((sum, s) => sum + s.items.length, 0),
    [filteredSections],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMega();
        closeMobile();
        return;
      }
      if (
        megaOpen &&
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA" &&
        !(document.activeElement as HTMLElement | null)?.isContentEditable
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    const handlePointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeMega();
      }
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [megaOpen, closeMega, closeMobile]);

  return (
    <>
      {/* Subtle page backdrop when mega menu is open */}
      <div
        aria-hidden="true"
        onClick={closeMega}
        className={`fixed inset-0 z-40 bg-zinc-950/20 dark:bg-black/55 backdrop-blur-[2px] transition-opacity duration-200 ${
          megaOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <header
        ref={headerRef}
        className="sticky top-0 z-50 w-full border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl backdrop-saturate-150"
      >
      {/* Futuristic top accent + sweeping neural scan-line */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-500/40 to-transparent" />
      <span aria-hidden="true" className="header-scanline" />

      <div className="mx-auto max-w-450 px-4 sm:px-6 lg:px-10">
        <div className="grid h-16 grid-cols-[minmax(max-content,1fr)_auto_minmax(max-content,1fr)] items-center gap-3">

          {/* Logo */}
          <Link href="/" onClick={() => { closeMega(); closeMobile(); }} className="col-start-1 justify-self-start flex items-center gap-2.5 shrink-0 group">
            <Image
              src="/logo-without-bg.png"
              alt="PiEEG Logo"
              width={120}
              height={32}
              className="h-8 w-auto dark:brightness-0 dark:invert transition-transform duration-200 group-hover:scale-[1.02]"
              priority
            />
            <span aria-hidden="true" className="hidden lg:flex items-center gap-1.5 pl-2.5 border-l border-zinc-200 dark:border-zinc-800">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500" />
              </span>
              <span className="nav-tech text-[9px] font-semibold text-zinc-400 dark:text-zinc-500">
                Neurotech
              </span>
            </span>
          </Link>

          {/* Desktop nav: center column so the pill is page-centered, independent
              of logo vs action-cluster width. Full pill needs ~2xl; below that
              the hamburger owns navigation. col-start-2 keeps the slot even
              when this node is display:none. */}
          <nav className="hidden 2xl:flex col-start-2 items-center justify-center" aria-label="Main navigation">
            <div className="nav-glass flex items-center gap-0 bg-zinc-50/60 dark:bg-zinc-900/40 rounded-full px-2 py-1.5 border border-zinc-200/50 dark:border-zinc-800/60">
              {navGroups.map((group, gi) => (
                <Fragment key={gi}>
                  {gi > 0 && (
                    <span aria-hidden="true" className="w-px h-3.5 rounded-full bg-zinc-300/80 dark:bg-zinc-700/80 mx-1 shrink-0" />
                  )}
                  {group.map((link) => {
                    const isExternal = "external" in link && link.external;
                    const active = !isExternal && isRouteActive(link.href);
                    return isExternal ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMega}
                        className="nav-tech nav-underline relative px-3 py-1.5 rounded-full text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMega}
                        aria-current={active ? "page" : undefined}
                        className={`nav-tech nav-underline relative px-3.5 py-1.5 rounded-full text-[11px] transition-all duration-200 ${
                          active
                            ? "font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-500/15 dark:bg-cyan-400/15 ring-1 ring-inset ring-cyan-500/45 dark:ring-cyan-400/45 shadow-xs"
                            : "font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  {/* ── XR (right after first group) ── */}
                  {gi === 0 && (
                    <Link
                      href="/xr"
                      onClick={closeMega}
                      aria-current={isXrActive ? "page" : undefined}
                      className={`group/xr nav-underline relative flex items-center gap-1.5 ml-1 pl-2.5 pr-3 py-1.5 rounded-full text-[11px] transition-all duration-200 ${
                        isXrActive
                          ? "font-bold bg-linear-to-r from-cyan-500/20 to-purple-500/20 dark:from-cyan-400/20 dark:to-purple-400/20 ring-1 ring-inset ring-cyan-500/55 dark:ring-cyan-400/55 shadow-xs"
                          : "font-semibold hover:bg-linear-to-r hover:from-cyan-500/10 hover:to-purple-500/10 dark:hover:from-cyan-500/15 dark:hover:to-purple-500/15"
                      }`}
                    >
                      <span className="relative flex items-center justify-center">
                        <Glasses className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 transition-transform duration-200 group-hover/xr:scale-110" />
                        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-zinc-950" />
                      </span>
                      <span
                        className={`nav-tech ${
                          isXrActive
                            ? "text-cyan-700 dark:text-cyan-300"
                            : "bg-clip-text text-transparent bg-linear-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400"
                        }`}
                      >
                        XR
                      </span>
                    </Link>
                  )}
                </Fragment>
              ))}

              {/* ── Explore mega-menu trigger ── */}
              <button
                onClick={() => setMegaOpen((v) => !v)}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                aria-controls="mega-menu-panel"
                aria-current={isMoreRouteActive ? "page" : undefined}
                className={`nav-tech nav-underline relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] transition-all duration-200 select-none ${
                  megaOpen || isMoreRouteActive
                    ? "font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-500/15 dark:bg-cyan-400/15 ring-1 ring-inset ring-cyan-500/45 dark:ring-cyan-400/45 shadow-xs"
                    : "font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white/60 dark:hover:bg-zinc-800/60"
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 transition-all duration-300 ${megaOpen || isMoreRouteActive ? "text-cyan-500 scale-110" : ""}`} />
                More
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${megaOpen ? "rotate-180 text-cyan-500" : isMoreRouteActive ? "text-cyan-500" : ""}`} />
              </button>
            </div>
          </nav>

          {/* Actions */}
          <div className="col-start-3 justify-self-end flex shrink-0 items-center gap-1.5 sm:gap-2 2xl:gap-2.5">
            <a
              href="https://github.com/pieeg-club"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-105 transition-all duration-200"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-4.5 h-4.5" />
            </a>

            {/* Social Media Popover */}
            <SocialMenu onOpen={closeMega} />

            {/* Discord */}
            <a
              href="https://discord.gg/neJ45FR6Sv"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-105 transition-all duration-200 discord-pulse"
              aria-label="Join Discord Community"
            >
              <DiscordIcon className="w-4.5 h-4.5" />
            </a>
            
            {/* Meta Quest Store */}
            <a
              href="https://www.meta.com/experiences/bodypress/1271355469389420"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden 2xl:flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-105 transition-all duration-200"
              aria-label="BodyPress on Meta Quest"
            >
              <MetaQuestIcon className="w-4.5 h-4.5" />
            </a>
            
            {/* Google Play Store */}
            <a
              href="https://play.google.com/store/apps/details?id=com.bodypress.governorhq"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden 2xl:flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-105 transition-all duration-200"
              aria-label="BodyPress on Google Play"
            >
              <PlayStoreIcon className="w-4.5 h-4.5" />
            </a>
            
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => { setMobileOpen((v) => !v); closeMega(); }}
              className="2xl:hidden flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-200"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            {/* Shopping Cart */}
            <Link
              href="/store"
              onClick={() => { closeMega(); closeMobile(); }}
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-105 transition-all duration-200"
              aria-label="PiEEG Store"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
            </Link>

            {isInformationalPage ? (
              <a
                href="https://cloud.pieeg.com"
                className="nav-tech flex h-9 items-center rounded-full border border-zinc-200/80 px-4 text-[11px] font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800/80 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/60 dark:hover:text-zinc-100"
              >
                Connect Device
              </a>
            ) : (
              <span className="shop-aurora hover:scale-105 transition-transform duration-200">
                <a
                  href="https://cloud.pieeg.com"
                  className="nav-tech flex h-9 items-center rounded-full bg-white dark:bg-zinc-950 px-5 text-[11px] font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  Connect Device
                </a>
              </span>
            )}
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════
          MEGA MENU PANEL — BALANCED BENTO DECK
      ═══════════════════════════════════════ */}
      <div
        id="mega-menu-panel"
        role="region"
        aria-label="Explore PiEEG ecosystem"
        className={`absolute top-full left-0 w-full max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain border-t border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/98 dark:bg-zinc-950/98 backdrop-blur-2xl shadow-2xl shadow-zinc-950/15 dark:shadow-black/60 transition-all duration-200 origin-top ${
          megaOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8 py-4">

          {/* ── Top Command & Filter Bar ── */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 pb-3.5 mb-3.5 border-b border-zinc-200/70 dark:border-zinc-800/70">
            {/* Domain scope pills */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5" role="group" aria-label="Filter ecosystem by domain">
              {MEGA_PILLARS.map((pillar) => {
                const selected = activePillar === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActivePillar(pillar.id)}
                    className={`nav-tech shrink-0 px-3 py-1.5 rounded-full text-[10px] transition-all duration-150 cursor-pointer ${
                      selected
                        ? "font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-500/15 dark:bg-cyan-400/15 ring-1 ring-inset ring-cyan-500/40 dark:ring-cyan-400/40"
                        : "font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/80 dark:hover:bg-zinc-900/80"
                    }`}
                  >
                    {pillar.label}
                  </button>
                );
              })}
            </div>

            {/* Instant search input */}
            <div className="relative flex items-center w-full lg:w-76 shrink-0">
              <Search className="pointer-events-none absolute left-3 w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
              <input
                ref={searchInputRef}
                type="text"
                value={megaQuery}
                onChange={(e) => setMegaQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && megaQuery.trim() && filteredSections.length > 0) {
                    const first = filteredSections[0]?.items[0];
                    if (!first) return;
                    e.preventDefault();
                    closeMega();
                    if (first.external) {
                      window.open(first.href, "_blank", "noopener,noreferrer");
                    } else {
                      router.push(first.href);
                    }
                  }
                }}
                placeholder={`Filter ${allMegaItems.length} labs, boards, SDKs, guides…`}
                aria-label="Filter mega menu links"
                className="w-full h-8 pl-8 pr-14 rounded-full text-xs bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/35 focus:border-cyan-500/50 transition-all"
              />
              {megaQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setMegaQuery("");
                    searchInputRef.current?.focus();
                  }}
                  aria-label="Clear filter"
                  className="absolute right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-zinc-200/70 dark:bg-zinc-800 cursor-pointer"
                >
                  <span>{totalFilteredCount}</span>
                  <X className="w-3 h-3" />
                </button>
              ) : (
                <kbd className="pointer-events-none hidden sm:inline-flex items-center justify-center absolute right-2.5 px-1.5 h-4 rounded border border-zinc-300/70 dark:border-zinc-700/80 bg-white/80 dark:bg-zinc-950/80 font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                  /
                </kbd>
              )}
            </div>
          </div>

          {/* ── Balanced 4×2 Bento Grid ── */}
          {filteredSections.length > 0 ? (
            <div
              className={`grid gap-3 ${
                filteredSections.length === 1
                  ? "grid-cols-1 max-w-xl"
                  : filteredSections.length === 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : filteredSections.length === 3
                      ? "grid-cols-1 md:grid-cols-3"
                      : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
              }`}
            >
              {filteredSections.map((section) => (
                <div
                  key={section.id}
                  className="relative flex flex-col min-w-0 rounded-2xl border border-zinc-200/75 dark:border-zinc-800/80 bg-zinc-50/55 dark:bg-zinc-900/40 p-3 overflow-hidden"
                >
                  {/* Domain top hairline */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-linear-to-r ${section.topHairline}`}
                  />

                  {/* Card heading */}
                  <div className="flex items-center justify-between gap-2 px-1.5 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${section.accentDot}`} />
                      <h3 className={`nav-tech text-[10.5px] font-bold truncate ${section.textAccent}`}>
                        {section.heading}
                      </h3>
                    </div>
                    <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 shrink-0">
                      {section.tag}
                    </span>
                  </div>

                  {/* Card items */}
                  <ul className="space-y-0.5">
                    {section.items.map((item) => {
                      const isExternal = Boolean(item.external);
                      const active = isMegaItemActive(item);
                      const content = (
                        <>
                          <span
                            className={`mt-0.5 flex items-center justify-center w-7 h-7 shrink-0 rounded-lg transition-colors duration-150 ${
                              active
                                ? "bg-cyan-500/20 text-cyan-600 dark:bg-cyan-400/20 dark:text-cyan-300"
                                : `bg-white dark:bg-zinc-800/90 text-zinc-500 dark:text-zinc-400 ring-1 ring-inset ring-zinc-200/70 dark:ring-zinc-700/60 ${section.iconHover}`
                            }`}
                          >
                            <item.Icon className="w-3.5 h-3.5" />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="flex items-center gap-1.5 min-w-0">
                              <span
                                className={`text-[13px] font-semibold leading-tight truncate transition-colors ${
                                  active
                                    ? "text-cyan-700 dark:text-cyan-300"
                                    : "text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
                                }`}
                              >
                                {item.label}
                              </span>
                              {item.badge && (
                                <span
                                  className={`shrink-0 px-1.5 py-px rounded-full text-[9.5px] font-semibold tracking-wide ring-1 ring-inset ${section.badgeStyle}`}
                                >
                                  {item.badge}
                                </span>
                              )}
                              {isExternal && (
                                <ArrowUpRight
                                  aria-hidden="true"
                                  className="w-3 h-3 shrink-0 text-zinc-400 dark:text-zinc-500 opacity-60 group-hover:opacity-100 group-hover:text-cyan-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150 ml-auto"
                                />
                              )}
                            </span>
                            <span className="block text-[11px] text-zinc-500 dark:text-zinc-400/90 leading-snug truncate mt-0.5">
                              {item.desc}
                            </span>
                          </span>
                        </>
                      );

                      return (
                        <li key={item.href}>
                          {isExternal ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={closeMega}
                              className="group flex items-start gap-2.5 px-2 py-1.5 rounded-xl hover:bg-white dark:hover:bg-zinc-800/70 hover:shadow-xs transition-all duration-150"
                            >
                              {content}
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={closeMega}
                              aria-current={active ? "page" : undefined}
                              className={`group flex items-start gap-2.5 px-2 py-1.5 rounded-xl transition-all duration-150 ${
                                active
                                  ? "bg-cyan-500/12 dark:bg-cyan-400/12 ring-1 ring-inset ring-cyan-500/40 dark:ring-cyan-400/40"
                                  : "hover:bg-white dark:hover:bg-zinc-800/70 hover:shadow-xs"
                              }`}
                            >
                              {content}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  {/* Optional card balance footer */}
                  {section.footerNote && !megaQuery && (
                    <div className="mt-auto pt-2 px-2 border-t border-zinc-200/60 dark:border-zinc-800/70 flex items-center justify-between gap-2 text-[10.5px] text-zinc-400 dark:text-zinc-500">
                      <span className="truncate">{section.footerNote.text}</span>
                      {section.footerNote.href && section.footerNote.cta && (
                        <Link
                          href={section.footerNote.href}
                          onClick={closeMega}
                          className="shrink-0 font-medium text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        >
                          {section.footerNote.cta} →
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/30">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                No tools, labs, or guides match &ldquo;{megaQuery}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => {
                  setMegaQuery("");
                  setActivePillar("all");
                  searchInputRef.current?.focus();
                }}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-cyan-700 dark:text-cyan-300 bg-cyan-500/12 hover:bg-cyan-500/20 transition-colors cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* ── Bottom Utility & Spotlight Bar ── */}
          <div className="mt-3.5 pt-3 border-t border-zinc-200/70 dark:border-zinc-800/70 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5">

            {/* Partnership spotlight (compact) */}
            <Link
              href="/partnership"
              onClick={closeMega}
              className="group flex-1 flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-linear-to-r from-cyan-500/10 via-blue-500/6 to-purple-500/10 dark:from-cyan-500/15 dark:via-blue-500/8 dark:to-purple-500/15 border border-cyan-500/20 dark:border-cyan-500/15 hover:border-cyan-500/45 dark:hover:border-cyan-400/35 transition-all duration-200"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 shadow-sm shadow-cyan-500/20 shrink-0">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                    Become a PiEEG Partner
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                    White-label hardware + software · Research collabs · Distribution · Custom integrations
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
            </Link>

            {/* Quick ecosystem hubs */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href="https://docs.pieeg.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMega}
                className="group inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-150"
              >
                <BookOpen className="w-3.5 h-3.5 text-zinc-400 group-hover:text-cyan-500 transition-colors" />
                Documentation
                <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/pieeg-club"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMega}
                className="group inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-150"
              >
                <GitHubIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
                GitHub Org
                <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <Link
                href="/explore"
                onClick={closeMega}
                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white text-xs font-semibold transition-all duration-150"
              >
                <LayoutGrid className="w-3.5 h-3.5 opacity-80" />
                Explore all pages
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MOBILE / TABLET DRAWER (GROUPED)
      ═══════════════════════════════════════ */}
      <div
        className={`2xl:hidden border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/98 dark:bg-zinc-950/98 backdrop-blur-xl transition-all duration-300 ${
          mobileOpen
            ? "max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain opacity-100"
            : "max-h-0 overflow-hidden opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 py-4 space-y-4">
          {/* Primary quick-bar pills */}
          <div className="flex flex-wrap gap-1.5">
            {[...navLinks, { href: "/xr", label: "XR" }].map((link) => {
              const isExternal = "external" in link && link.external;
              const active = !isExternal && isRouteActive(link.href);
              return isExternal ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className="nav-tech inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10.5px] font-medium border border-zinc-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  aria-current={active ? "page" : undefined}
                  className={`nav-tech inline-flex items-center px-3 py-1.5 rounded-full text-[10.5px] transition-colors ${
                    active
                      ? "font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-500/15 ring-1 ring-inset ring-cyan-500/40"
                      : "font-medium border border-zinc-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Grouped Bento Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {megaMenuSections.map((section) => (
              <div
                key={section.id}
                className="rounded-2xl border border-zinc-200/75 dark:border-zinc-800/80 bg-zinc-50/55 dark:bg-zinc-900/40 p-3"
              >
                <div className="flex items-center gap-2 px-1.5 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${section.accentDot}`} />
                  <p className={`nav-tech text-[10px] font-bold ${section.textAccent}`}>
                    {section.heading}
                  </p>
                </div>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isExternal = Boolean(item.external);
                    const active = isMegaItemActive(item);
                    return isExternal ? (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMobile}
                        className="flex items-center gap-2.5 px-2 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800/70 transition-colors"
                      >
                        <item.Icon className="w-4 h-4 text-zinc-400 shrink-0" />
                        <span className="truncate">{item.label}</span>
                        <ArrowUpRight className="w-3 h-3 text-zinc-400 ml-auto shrink-0" />
                      </a>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobile}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center gap-2.5 px-2 py-2 rounded-xl text-xs transition-colors ${
                          active
                            ? "font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-500/12 ring-1 ring-inset ring-cyan-500/40"
                            : "font-medium text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800/70"
                        }`}
                      >
                        <item.Icon
                          className={`w-4 h-4 shrink-0 ${
                            active ? "text-cyan-600 dark:text-cyan-300" : "text-zinc-400"
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className={`ml-auto shrink-0 px-1.5 py-px rounded-full text-[9.5px] font-semibold ring-1 ring-inset ${section.badgeStyle}`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/explore"
            onClick={closeMobile}
            aria-current={isRouteActive("/explore") ? "page" : undefined}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            <LayoutGrid className="w-4 h-4" />
            Explore all pages
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Social & GitHub in mobile */}
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 px-1 flex flex-wrap gap-1">
            <a
              href="https://github.com/pieeg-club"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-150"
            >
              <GitHubIcon className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://discord.gg/neJ45FR6Sv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-150"
            >
              <DiscordIcon className="w-4 h-4" />
              Discord
            </a>
            {PIEEG_SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-150"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      </header>
    </>
  );
}