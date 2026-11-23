"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";
import { PIEEG_XR_CAMPAIGN, pieegXrKickstarterUrl } from "@/lib/kickstarter";

const STORAGE_KEY = "pieeg-ks-xr-topbar-snooze-until";

export function KickstarterTopBar() {
  const pathname = usePathname() ?? "/";
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && Number(raw) > Date.now()) {
        setDismissed(true);
      }
    } catch {
      // Ignore storage access errors in restricted browsing modes
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now() + PIEEG_XR_CAMPAIGN.snoozeMs));
    } catch {
      // Ignore storage access errors
    }
  };

  if (dismissed) return null;

  const onXrPage =
    pathname === "/xr" ||
    pathname.startsWith("/xr/") ||
    pathname === "/hardware/pieeg-xr" ||
    pathname === "/hardware/xr-16" ||
    pathname === "/store/pieeg-xr" ||
    pathname === "/store/xr-16";

  return (
    <div
      role="region"
      aria-label="PiEEG XR Kickstarter announcement"
      className="relative z-50 w-full border-b border-teal-500/25 bg-zinc-950 text-zinc-100 overflow-hidden"
    >
      {/* Subtle poster-matched radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_50%_50%,rgba(45,212,191,0.12),transparent_70%)]"
      />

      <div className="relative mx-auto flex max-w-450 items-center justify-between gap-2 px-3 py-2 sm:px-6 lg:px-10">
        {/* Left spacer on desktop so the announcement centers cleanly */}
        <div className="hidden lg:block w-7 shrink-0" aria-hidden="true" />

        {/* Main message + CTA */}
        <div className="flex flex-1 flex-wrap items-center justify-start lg:justify-center gap-x-3 gap-y-1.5 min-w-0 text-xs">
          {/* Poster-style outlined pill */}
          <a
            href={pieegXrKickstarterUrl("topbar_badge")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-teal-400/70 bg-teal-400/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-teal-300 hover:bg-teal-400/15 transition-colors"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-300 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-teal-300" />
            </span>
            <span>Now Live on Kickstarter</span>
          </a>

          {/* Copy: full founder hook on md+, concise on mobile */}
          <p className="truncate sm:whitespace-normal text-zinc-200 leading-snug">
            <span className="hidden md:inline text-zinc-300">
              We&apos;ve never asked before —{" "}
            </span>
            <strong className="font-semibold text-white">
              today we need your support.
            </strong>{" "}
            <span className="text-teal-300 font-semibold">PiEEG XR</span>
            <span className="hidden xl:inline text-zinc-300">
              {" "}— open-source neural face interface for VR
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-zinc-400">
              {" "}· Goal {PIEEG_XR_CAMPAIGN.goal} · {PIEEG_XR_CAMPAIGN.endsLabel}
            </span>
          </p>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={pieegXrKickstarterUrl("topbar_cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-teal-400 px-3 py-1 text-[11px] font-bold text-zinc-950 shadow-xs shadow-teal-400/20 hover:bg-teal-300 transition-colors"
            >
              <span>Back Us</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.25]" />
            </a>

            {!onXrPage && (
              <Link
                href="/xr"
                className="hidden lg:inline-flex items-center text-[11px] font-medium text-zinc-400 hover:text-white underline decoration-zinc-700 underline-offset-4 hover:decoration-teal-400 transition-colors"
              >
                Explore XR
              </Link>
            )}
          </div>
        </div>

        {/* Dismiss (3-day snooze) */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss Kickstarter announcement for 3 days"
          className="flex size-7 shrink-0 items-center justify-center rounded-full text-zinc-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
