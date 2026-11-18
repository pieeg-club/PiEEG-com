"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Lightbulb,
  Trophy,
  Calendar,
  Database,
  ExternalLink,
  Radio,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const COMMUNITY_TABS = [
  {
    id: "discussions",
    label: "Discussions",
    href: "/community/discussions",
    Icon: MessageSquare,
    badge: "Q&A",
    matchPrefix: "/community/discussions",
  },
  {
    id: "competition",
    label: "PiEEG Competition",
    href: "/community",
    Icon: Trophy,
    badge: "Cohort #1",
    exactMatch: true,
  },
  {
    id: "live",
    label: "PiEEG Live",
    href: "/live",
    Icon: Radio,
    badge: "Monthly",
    matchPrefix: "/live",
  },
  {
    id: "kaggle",
    label: "Kaggle",
    href: "https://www.kaggle.com/pieegbiolabplatform/code",
    Icon: Database,
    external: true,
  },
  {
    id: "open-ideas",
    label: "Open Ideas & Volunteers",
    href: "/community/open-ideas",
    Icon: Lightbulb,
    badge: "16 Ideas",
    matchPrefix: "/community/open-ideas",
  },
  {
    id: "hackathons",
    label: "Hackathons",
    href: "/community/hackathons",
    Icon: Calendar,
    badge: "Sponsorship",
    matchPrefix: "/community/hackathons",
  },
];

export function CommunitySubNav() {
  const pathname = usePathname() ?? "/community";
  const navRef = useRef<HTMLElement>(null);
  const activeTabRef = useRef<HTMLAnchorElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isTabActive = (tab: (typeof COMMUNITY_TABS)[number]) => {
    if (tab.external) return false;
    if (tab.exactMatch) return pathname === tab.href;
    if (tab.matchPrefix) {
      return (
        pathname === tab.matchPrefix ||
        pathname.startsWith(`${tab.matchPrefix}/`)
      );
    }
    return pathname === tab.href;
  };

  const syncScrollButtons = useCallback(() => {
    const el = navRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(maxScrollLeft - el.scrollLeft > 4);
  }, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaY !== 0) {
        const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd =
          el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 && e.deltaY > 0;
        if (!atStart && !atEnd) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      syncScrollButtons();
    });
    resizeObserver.observe(el);
    el.addEventListener("scroll", syncScrollButtons, { passive: true });
    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener("scroll", syncScrollButtons);
      el.removeEventListener("wheel", handleWheel);
    };
  }, [syncScrollButtons]);

  // Ensure the active pill is visible whenever the route changes
  useEffect(() => {
    activeTabRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [pathname]);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = navRef.current;
    if (!el) return;
    const offset = Math.max(200, Math.round(el.clientWidth * 0.6));
    el.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  return (
    <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/90 dark:bg-zinc-900/80 backdrop-blur-md">
      <div className="mx-auto max-w-450 px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 py-2.5 min-w-0">
          {/* Left breadcrumb / label */}
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap shrink-0">
            <Link
              href="/"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Home
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <Link
              href="/community"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Community Ecosystem
            </Link>
          </div>

          {/* Scrollable sub-navigation pills with edge fades & arrow controls */}
          <div className="relative flex items-center min-w-0 flex-1 md:justify-end">
            {canScrollLeft && (
              <div className="absolute left-0 inset-y-0 z-10 flex items-center pr-4 bg-linear-to-r from-zinc-50 via-zinc-50/95 to-transparent dark:from-zinc-900 dark:via-zinc-900/95 pointer-events-none">
                <button
                  type="button"
                  onClick={() => scrollByAmount("left")}
                  aria-label="Scroll community tabs left"
                  className="pointer-events-auto inline-flex items-center justify-center w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 shadow-xs hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            )}

            <nav
              ref={navRef}
              aria-label="Community sections"
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5 min-w-0 max-w-full scroll-smooth"
            >
              {COMMUNITY_TABS.map((tab) => {
                const active = isTabActive(tab);
                const Icon = tab.Icon;

                const baseClasses =
                  "group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-150 border";
                const activeClasses =
                  "bg-cyan-600 text-white border-cyan-600 shadow-xs dark:bg-cyan-500 dark:text-zinc-950 dark:border-cyan-400";
                const inactiveClasses =
                  "bg-white dark:bg-zinc-950/90 text-zinc-700 dark:text-zinc-300 border-zinc-200/90 dark:border-zinc-800 hover:border-cyan-400/60 dark:hover:border-cyan-500/50 hover:text-cyan-700 dark:hover:text-cyan-300";

                if (tab.external) {
                  return (
                    <a
                      key={tab.id}
                      href={tab.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${baseClasses} ${inactiveClasses}`}
                    >
                      <Icon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <span>{tab.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </a>
                  );
                }

                return (
                  <Link
                    key={tab.id}
                    ref={active ? activeTabRef : undefined}
                    href={tab.href}
                    aria-current={active ? "page" : undefined}
                    className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 shrink-0 ${
                        active
                          ? "text-white dark:text-zinc-950"
                          : "text-cyan-600 dark:text-cyan-400"
                      }`}
                    />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full ${
                          active
                            ? "bg-white/20 text-white dark:bg-zinc-950/20 dark:text-zinc-950"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {canScrollRight && (
              <div className="absolute right-0 inset-y-0 z-10 flex items-center pl-4 bg-linear-to-l from-zinc-50 via-zinc-50/95 to-transparent dark:from-zinc-900 dark:via-zinc-900/95 pointer-events-none">
                <button
                  type="button"
                  onClick={() => scrollByAmount("right")}
                  aria-label="Scroll community tabs right"
                  className="pointer-events-auto inline-flex items-center justify-center w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 shadow-xs hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
