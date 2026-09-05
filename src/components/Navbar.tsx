'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { ThemeToggle } from "./ThemeToggle";
import {
  ChevronDown, Users, Mail, Briefcase, Building2, Code2,
  Zap, BookOpen, Newspaper, Sparkles, ArrowRight, Menu, X, Globe, LayoutGrid, Monitor, Cloud, Bot, Glasses, Cpu, ShoppingCart, GraduationCap, Smartphone, Terminal, Watch,
} from "lucide-react";

const ANNOUNCEMENT_KEY = "announcements-dismissed";

const ANNOUNCEMENTS = [
  {
    href: "/news/bodypress-meta-quest-launch",
    badge: "🚀 New",
    text: "BodyPress Now on Meta Quest — Neural Data Visualization in VR"
  },
  {
    href: "/news/pieeg-xr-launch",
    badge: "Prelaunch",
    text: "PiEEG XR: Neural Face Interface for Meta Quest VR — Now on Kickstarter"
  },
  {
    href: "/news/octopus-16-firmware",
    badge: "Software",
    text: "Octopus-16 Firmware Brings 16-Channel EEG to PiEEG Cloud over Bluetooth"
  },
  {
    href: "/news/browser-native-hardware",
    badge: "Technology",
    text: "Zero-Installation BCI: Browser-Native Hardware Support Arrives"
  },
  {
    href: "/news/pieeg-agent-launch",
    badge: "AI",
    text: "Introducing PiEEG-Agent: Talk to Your Brain Data in Plain English"
  },
  {
    href: "/news/pieeg-js-browser-sdk",
    badge: "Developers",
    text: "pieeg.js: Zero-Dependency Web Bluetooth SDK for Neural States"
  },
  {
    href: "/news/coin-sized-16ch-eeg",
    badge: "Innovation",
    text: "Coin-Sized 16-Channel EEG: Brain Monitoring Goes Pocket-Size"
  },
  {
    href: "/news/neuroscience-hackathon-announcement",
    badge: "Events",
    text: "Neuroscience Hackathon Coming This Autumn to Ottawa, Canada"
  }
];

function AnnouncementBar() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Runs once on mount (client only) — avoids SSR mismatch
  const initialized = useRef(false);
  if (typeof window !== "undefined" && !initialized.current) {
    initialized.current = true;
    if (!sessionStorage.getItem(ANNOUNCEMENT_KEY)) {
      // We mutate state via a ref trick only before first render is committed
    }
  }

  useEffect(() => {
    if (!sessionStorage.getItem(ANNOUNCEMENT_KEY)) setVisible(true);
  }, []);

  // Rotate announcements every 5 seconds
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  const announcement = ANNOUNCEMENTS[currentIndex];

  return (
    <div className="relative hidden md:block overflow-hidden border-b border-white/6 bg-zinc-950 text-white">
      {/* Subtle aurora glow bleeding from the top edge */}
      <span aria-hidden="true" className="announce-glow pointer-events-none absolute inset-0" />
      {/* Hairline gradient accent along the top */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="relative mx-auto flex max-w-450 items-center justify-center px-12 py-2.5">
        {/* Rotation indicators */}
        {ANNOUNCEMENTS.length > 1 && (
          <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 items-center gap-1.5 lg:flex">
            {ANNOUNCEMENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Show announcement ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-4 bg-white/80" : "w-1 bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

        <Link
          href={announcement.href}
          className="group inline-flex items-center gap-2.5"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/7 px-2.5 py-0.5 ring-1 ring-inset ring-white/10 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </span>
            <span className="nav-tech text-[10px] font-semibold text-cyan-300">{announcement.badge}</span>
          </span>
          <span
            key={currentIndex}
            className="announce-text text-[13px] font-medium text-zinc-300 transition-colors duration-200 group-hover:text-white"
          >
            {announcement.text}
          </span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white" />
        </Link>

        <button
          onClick={() => { sessionStorage.setItem(ANNOUNCEMENT_KEY, "1"); setVisible(false); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

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
  ],
];

const navLinks = navGroups.flat();

const megaMenuSections = [
  {
    id: "company",
    heading: "Company",
    accent: "bg-cyan-500",
    textAccent: "text-cyan-600 dark:text-cyan-400",
    items: [
      { href: "/about", label: "About PiEEG", desc: "Our mission, team & story", Icon: Users },
      { href: "/contact", label: "Contact", desc: "Reach us directly", Icon: Mail },
      { href: "/job", label: "Careers", desc: "Join our growing team", Icon: Briefcase },
      { href: "/partnership", label: "Partnership", desc: "Become a partner or reseller", Icon: Building2 },
    ],
  },
  {
    id: "products",
    heading: "Products & Platforms",
    accent: "bg-purple-500",
    textAccent: "text-purple-600 dark:text-purple-400",
    items: [
      { href: "/cloud", label: "Cloud Platform", desc: "Zero-install BCI in your browser", Icon: Cloud },
      { href: "/xr", label: "PiEEG XR", desc: "Neural face interface for VR", Icon: Glasses },
      { href: "https://aura.pieeg.com", label: "Aura VR", desc: "EMG + IMU wristband for XR", Icon: Watch, external: true },
      { href: "/agent", label: "AI Agent", desc: "Your AI copilot for brain data", Icon: Bot },
      { href: "https://play.google.com/store/apps/details?id=com.bodypress.governorhq", label: "BodyPress Mobile", desc: "Neural data on your phone", Icon: Smartphone, external: true },
      { href: "/browser", label: "Browser Extension", desc: "Brain state overlay on every page", Icon: Monitor },
      { href: "https://ide.pieeg.com", label: "bioIDE", desc: "Write JavaScript against live EEG", Icon: Terminal, external: true },
      { href: "/server", label: "Server & SDKs", desc: "Tools, dashboards & integrations", Icon: Globe },
    ],
  },
  {
    id: "resources",
    heading: "Resources & Community",
    accent: "bg-emerald-500",
    textAccent: "text-emerald-600 dark:text-emerald-400",
    items: [
      { href: "/tutorials", label: "Tutorials", desc: "Step-by-step guides & how-tos", Icon: GraduationCap },
      { href: "/examples", label: "Examples & Demos", desc: "Real-world BCI applications", Icon: Zap },
      { href: "/support", label: "Support", desc: "Docs, FAQ & troubleshooting", Icon: BookOpen },
      { href: "/news", label: "Latest News", desc: "Updates & announcements", Icon: Newspaper },
      { href: "/community", label: "Open Source", desc: "Contribute on GitHub", Icon: Code2 },
      { href: "https://firmware.pieeg.com/", label: "Octopus-16 Firmware", desc: "Flash 16-ch EEG over Bluetooth", Icon: Cpu, external: true },
    ],
  },
];

// All unique items for mobile drawer (deduplicated, excluding main nav hrefs)
const mobileExtraLinks = megaMenuSections.flatMap((s) => s.items).filter(
  (item, i, arr) =>
    arr.findIndex((a) => a.href === item.href) === i &&
    !navLinks.some((n) => n.href === item.href),
);

export function Navbar() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const closeMega = useCallback(() => setMegaOpen(false), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeMega(); closeMobile(); }
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
  }, [closeMega, closeMobile]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl backdrop-saturate-150"
    >
      {/* Futuristic top accent + sweeping neural scan-line */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-500/40 to-transparent" />
      <span aria-hidden="true" className="header-scanline" />

      <AnnouncementBar />
      <div className="mx-auto max-w-450 px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" onClick={() => { closeMega(); closeMobile(); }} className="flex items-center gap-2.5 shrink-0 group">
            <Image
              src="/logo-without-bg.png"
              alt="PiEEG Logo"
              width={120}
              height={32}
              className="h-8 w-auto dark:brightness-0 dark:invert transition-transform duration-200 group-hover:scale-[1.02]"
              priority
            />
            <span aria-hidden="true" className="hidden sm:flex items-center gap-1.5 pl-2.5 border-l border-zinc-200 dark:border-zinc-800">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500" />
              </span>
              <span className="nav-tech text-[9px] font-semibold text-zinc-400 dark:text-zinc-500">
                Neurotech
              </span>
            </span>
          </Link>

          {/* Desktop Centered Nav */}
          <nav className="hidden xl:flex items-center justify-center absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
            <div className="nav-glass flex items-center gap-0 bg-zinc-50/60 dark:bg-zinc-900/40 rounded-full px-2 py-1.5 border border-zinc-200/50 dark:border-zinc-800/60">
              {navGroups.map((group, gi) => (
                <Fragment key={gi}>
                  {gi > 0 && (
                    <span aria-hidden="true" className="w-px h-3.5 rounded-full bg-zinc-300/80 dark:bg-zinc-700/80 mx-1 shrink-0" />
                  )}
                  {group.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMega}
                      className="nav-tech nav-underline relative px-3 py-1.5 rounded-full text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {/* ── XR (styled distinctly, right after Hardware) ── */}
                  {gi === 0 && (
                    <a
                      href="/xr"
                      rel="noopener noreferrer"
                      onClick={closeMega}
                      className="group/xr relative flex items-center gap-1.5 ml-1 pl-2.5 pr-3 py-1.5 rounded-full text-[11px] font-semibold bg-linear-to-r from-cyan-500/10 to-purple-500/10 dark:from-cyan-500/15 dark:to-purple-500/15 ring-1 ring-inset ring-cyan-500/25 dark:ring-cyan-400/25 hover:from-cyan-500/20 hover:to-purple-500/20 hover:ring-cyan-500/50 dark:hover:ring-cyan-400/50 transition-all duration-200"
                    >
                      <span className="relative flex items-center justify-center">
                        <Glasses className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 transition-transform duration-200 group-hover/xr:scale-110" />
                        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-zinc-950" />
                      </span>
                      <span className="nav-tech bg-clip-text text-transparent bg-linear-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
                        XR
                      </span>
                    </a>
                  )}
                </Fragment>
              ))}

              {/* ── Explore mega-menu trigger ── */}
              <button
                onClick={() => setMegaOpen((v) => !v)}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                aria-controls="mega-menu-panel"
                className={`nav-tech relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-medium transition-all duration-200 select-none ${
                  megaOpen
                    ? "text-zinc-900 dark:text-zinc-100 bg-white/80 dark:bg-zinc-800/80 shadow-sm ring-1 ring-zinc-200/70 dark:ring-zinc-700/70"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white/60 dark:hover:bg-zinc-800/60"
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 transition-all duration-300 ${megaOpen ? "text-cyan-500 scale-110" : ""}`} />
                More
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${megaOpen ? "rotate-180 text-cyan-500" : ""}`} />
              </button>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/pieeg-club"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-105 transition-all duration-200"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-4.5 h-4.5" />
            </a>

            {/* Discord */}
            <a
              href="https://discord.gg/neJ45FR6Sv"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-105 transition-all duration-200 discord-pulse"
              aria-label="Join Discord Community"
            >
              <DiscordIcon className="w-4.5 h-4.5" />
            </a>
            
            {/* Meta Quest Store */}
            <a
              href="https://www.meta.com/experiences/bodypress/1271355469389420"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-105 transition-all duration-200"
              aria-label="BodyPress on Meta Quest"
            >
              <MetaQuestIcon className="w-4.5 h-4.5" />
            </a>
            
            {/* Google Play Store */}
            <a
              href="https://play.google.com/store/apps/details?id=com.bodypress.governorhq"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-105 transition-all duration-200"
              aria-label="BodyPress on Google Play"
            >
              <PlayStoreIcon className="w-4.5 h-4.5" />
            </a>
            
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => { setMobileOpen((v) => !v); closeMega(); }}
              className="xl:hidden flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-200"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            {/* Shopping Cart */}
            <a
              href="https://www.elecrow.com/store/PiEEG"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-105 transition-all duration-200"
              aria-label="Shop"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
            </a>

            <span className="shop-aurora hover:scale-105 transition-transform duration-200">
              <a
                href="https://cloud.pieeg.com"
                className="nav-tech flex h-9 items-center rounded-full bg-white dark:bg-zinc-950 px-5 text-[11px] font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Connect Device
              </a>
            </span>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════
          MEGA MENU PANEL
      ═══════════════════════════════════════ */}
      <div
        id="mega-menu-panel"
        role="region"
        aria-label="Explore menu"
        className={`absolute top-full left-0 w-full border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/98 dark:bg-zinc-950/98 backdrop-blur-xl shadow-2xl shadow-zinc-900/10 dark:shadow-zinc-900/40 transition-all duration-200 origin-top ${
          megaOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

          {/* Three-column grid */}
          <div className="grid grid-cols-3 gap-8 lg:gap-12">
            {megaMenuSections.map((section) => (
              <div key={section.id}>
                <div className="flex items-center gap-2 mb-5">
                  <span className={`w-1.5 h-1.5 rounded-full ${section.accent}`} />
                  <h3 className={`text-xs font-bold uppercase tracking-widest ${section.textAccent}`}>
                    {section.heading}
                  </h3>
                </div>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      {("external" in item && item.external) ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={closeMega}
                          className="group flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-150"
                        >
                          <span className="mt-0.5 flex items-center justify-center w-8 h-8 shrink-0 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                            <item.Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                              {item.label}
                            </span>
                            <span className="block text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 leading-snug">
                              {item.desc}
                            </span>
                          </span>
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={closeMega}
                          className="group flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-150"
                        >
                          <span className="mt-0.5 flex items-center justify-center w-8 h-8 shrink-0 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                            <item.Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                              {item.label}
                            </span>
                            <span className="block text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 leading-snug">
                              {item.desc}
                            </span>
                          </span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Bottom strip: spotlight CTA + Explore all ── */}
          <div className="mt-7 pt-6 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-col sm:flex-row gap-3">

            {/* Partnership spotlight */}
            <Link
              href="/partnership"
              onClick={closeMega}
              className={`group flex-1 flex items-center justify-between p-4 rounded-2xl bg-linear-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 dark:from-cyan-500/15 dark:via-blue-500/8 dark:to-purple-500/15 border border-cyan-500/20 dark:border-cyan-500/10 hover:border-cyan-500/40 dark:hover:border-cyan-500/25 transition-all duration-200`}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20 shrink-0">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Become a PiEEG Partner</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    White-label · Research collabs · Distribution · Custom integrations
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-4" />
            </Link>

            {/* Explore all hub */}
            <Link
              href="/explore"
              onClick={closeMega}
              className="group flex items-center gap-3 px-5 py-4 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-all duration-200"
            >
              <LayoutGrid className="w-5 h-5 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors shrink-0" />
              <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors whitespace-nowrap">
                Explore all pages
              </span>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all duration-200" />
            </Link>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MOBILE DRAWER
      ═══════════════════════════════════════ */}
      <div
        className={`xl:hidden border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/98 dark:bg-zinc-950/98 backdrop-blur-xl overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {/* Main links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}

          {/* Extra links from mega menu */}
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 mt-3">
            <p className="px-4 pb-2 text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">More</p>
            {mobileExtraLinks.map((item) => (
              ("external" in item && item.external) ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-150"
                >
                  <item.Icon className="w-4 h-4 text-zinc-400 shrink-0" />
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-150"
                >
                  <item.Icon className="w-4 h-4 text-zinc-400 shrink-0" />
                  {item.label}
                </Link>
              )
            ))}
            <Link
              href="/explore"
              onClick={closeMobile}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-150"
            >
              <LayoutGrid className="w-4 h-4 text-zinc-400 shrink-0" />
              Explore all pages
            </Link>
          </div>

          {/* GitHub in mobile */}
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 mt-3 px-2">
            <a
              href="https://github.com/pieeg-club"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-150"
            >
              <GitHubIcon className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>

    </header>
  );
}
