'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { ThemeToggle } from "./ThemeToggle";
import {
  ChevronDown, Users, Mail, Briefcase, Building2, Code2,
  Zap, BookOpen, Newspaper, Sparkles, ArrowRight, Menu, X, Globe, LayoutGrid,
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

const navLinks = [
  { href: "/hardware", label: "Hardware" },
  { href: "/software", label: "Software" },
  { href: "/community", label: "Community" },
  { href: "/support", label: "Support" },
  { href: "/news", label: "News" },
];

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
    ],
  },
  {
    id: "collaborate",
    heading: "Collaborate",
    accent: "bg-purple-500",
    textAccent: "text-purple-600 dark:text-purple-400",
    items: [
      { href: "/partnership", label: "Partnership", desc: "Become a partner or reseller", Icon: Building2 },
      { href: "/community", label: "Open Source", desc: "Contribute on GitHub", Icon: Code2 },
      { href: "/examples", label: "Examples & Demos", desc: "Real-world BCI applications", Icon: Zap },
    ],
  },
  {
    id: "learn",
    heading: "Learn & Discover",
    accent: "bg-emerald-500",
    textAccent: "text-emerald-600 dark:text-emerald-400",
    items: [
      { href: "/software", label: "Software & SDKs", desc: "Tools, dashboards & integrations", Icon: Globe },
      { href: "/support", label: "Support", desc: "Docs, FAQ & troubleshooting", Icon: BookOpen },
      { href: "/news", label: "Latest News", desc: "Updates & announcements", Icon: Newspaper },
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
      className="sticky top-0 z-50 w-full border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" onClick={() => { closeMega(); closeMobile(); }} className="flex items-center shrink-0 group">
            <Image
              src="/logo-without-bg.png"
              alt="PiEEG Logo"
              width={120}
              height={32}
              className="h-8 w-auto dark:brightness-0 dark:invert transition-transform duration-200 group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Desktop Centered Nav */}
          <nav className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
            <div className="flex items-center gap-1 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-full px-2 py-1.5 border border-zinc-200/50 dark:border-zinc-800/50">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMega}
                  className="relative px-4 py-2 rounded-full text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-white/60 dark:hover:bg-zinc-800/60 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}

              {/* ── Explore mega-menu trigger ── */}
              <button
                onClick={() => setMegaOpen((v) => !v)}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                aria-controls="mega-menu-panel"
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 select-none ${
                  megaOpen
                    ? "text-zinc-900 dark:text-zinc-100 bg-white/80 dark:bg-zinc-800/80 shadow-sm ring-1 ring-zinc-200/70 dark:ring-zinc-700/70"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-white/60 dark:hover:bg-zinc-800/60"
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
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => { setMobileOpen((v) => !v); closeMega(); }}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-200"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            <span className="shop-aurora hover:scale-105 transition-transform duration-200">
              <a
                href="https://www.elecrow.com/store/PiEEG"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 items-center rounded-full bg-white dark:bg-zinc-950 px-5 text-sm font-semibold text-zinc-900 dark:text-zinc-100"
              >
                Shop
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
        className={`lg:hidden border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/98 dark:bg-zinc-950/98 backdrop-blur-xl overflow-hidden transition-all duration-300 ${
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
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-150"
              >
                <item.Icon className="w-4 h-4 text-zinc-400 shrink-0" />
                {item.label}
              </Link>
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
