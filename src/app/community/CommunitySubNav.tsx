"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Lightbulb,
  Trophy,
  Calendar,
  Database,
  ExternalLink,
} from "lucide-react";

const COMMUNITY_TABS = [
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
    href: "/news/neuroscience-hackathon-announcement",
    Icon: Calendar,
    badge: "Events",
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
    id: "kaggle",
    label: "Kaggle",
    href: "https://www.kaggle.com/pieegbiolabplatform/code",
    Icon: Database,
    external: true,
  },
];

export function CommunitySubNav() {
  const pathname = usePathname() ?? "/community";

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

  return (
    <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/90 dark:bg-zinc-900/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2.5">
          {/* Left breadcrumb / label */}
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
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

          {/* Sub-navigation pills */}
          <nav
            aria-label="Community sections"
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5"
          >
            {COMMUNITY_TABS.map((tab) => {
              const active = isTabActive(tab);
              const Icon = tab.Icon;

              const baseClasses =
                "group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 border";
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
        </div>
      </div>
    </div>
  );
}
