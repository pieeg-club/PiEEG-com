"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Rocket, X } from "lucide-react";
import { PIEEG_XR_CAMPAIGN, pieegXrKickstarterUrl } from "@/lib/kickstarter";

const DESKTOP_SNOOZE_KEY = "pieeg-ks-xr-card-snooze-until";
const MOBILE_SESSION_KEY = "pieeg-ks-xr-mobile-pill-dismissed";

export default function HeroOctopusCard() {
  const pathname = usePathname() ?? "/";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isDesktopClosed, setIsDesktopClosed] = useState(false);
  const [showMobilePill, setShowMobilePill] = useState(false);
  const [isMobileClosed, setIsMobileClosed] = useState(false);

  const isStoreBuyPage = pathname.startsWith("/store/");
  const isXrFocusPage =
    pathname === "/xr" ||
    pathname.startsWith("/xr/") ||
    pathname === "/hardware/pieeg-xr" ||
    pathname === "/hardware/xr-16" ||
    isStoreBuyPage;

  useEffect(() => {
    try {
      const snoozeUntil = localStorage.getItem(DESKTOP_SNOOZE_KEY);
      if (snoozeUntil && Number(snoozeUntil) > Date.now()) {
        setIsDesktopClosed(true);
      }
      if (sessionStorage.getItem(MOBILE_SESSION_KEY) === "1") {
        setIsMobileClosed(true);
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  // Defer the video so it never competes with the critical hero paint.
  useEffect(() => {
    const timer = setTimeout(() => setShouldLoadVideo(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // On mobile, reveal a compact non-intrusive pill only after scroll engagement or 14s on page.
  useEffect(() => {
    if (isMobileClosed || isXrFocusPage) return;

    const reveal = () => setShowMobilePill(true);
    const timer = window.setTimeout(reveal, 14000);

    const onScroll = () => {
      const threshold = Math.max(320, window.innerHeight * 0.35);
      if (window.scrollY >= threshold) {
        reveal();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isMobileClosed, isXrFocusPage]);

  const dismissDesktop = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDesktopClosed(true);
    try {
      localStorage.setItem(DESKTOP_SNOOZE_KEY, String(Date.now() + PIEEG_XR_CAMPAIGN.snoozeMs));
    } catch {
      // Ignore storage access errors
    }
  };

  const dismissMobile = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileClosed(true);
    try {
      sessionStorage.setItem(MOBILE_SESSION_KEY, "1");
    } catch {
      // Ignore storage access errors
    }
  };

  return (
    <>
      {/* Desktop floating video card — pinned to PiEEG XR Live on Kickstarter */}
      {!isDesktopClosed && !isStoreBuyPage && (
        <div className="group hidden lg:block fixed z-50 bottom-24 right-4 sm:right-6 w-68">
          <button
            type="button"
            onClick={dismissDesktop}
            className="absolute -top-2 -right-2 z-30 p-1.5 rounded-full bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-700 shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer"
            aria-label="Close Kickstarter card"
          >
            <X className="w-3 h-3" />
          </button>

          <a
            href={pieegXrKickstarterUrl("floating_card")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="PiEEG XR — Now Live on Kickstarter. Back us today."
            className="block"
          >
            <div className="relative overflow-hidden rounded-2xl border border-teal-500/35 bg-zinc-950 text-white shadow-2xl shadow-zinc-950/50 transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/60">
              <div className="relative aspect-video overflow-hidden bg-zinc-950">
                {shouldLoadVideo && (
                  <video
                    ref={videoRef}
                    src="https://pieeg.lon1.cdn.digitaloceanspaces.com/pieeg-xr-video.mp4"
                    poster="/products/pieeg-xr-poster.png"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    disableRemotePlayback
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950 via-black/25 to-black/30" />

                {/* Poster-matched badge */}
                <div className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full border border-teal-400/70 bg-zinc-950/80 backdrop-blur-sm px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-teal-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-300" />
                  </span>
                  Live on Kickstarter
                </div>
              </div>

              <div className="px-3.5 py-3">
                <div className="text-[10px] font-medium text-zinc-400">
                  We&apos;ve never asked before.
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white leading-tight">
                      Support <span className="text-teal-300">PiEEG XR</span>
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] text-zinc-400">
                      {PIEEG_XR_CAMPAIGN.endsLabel}
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-teal-400 px-2.5 py-1 text-[11px] font-bold text-zinc-950 transition-colors group-hover:bg-teal-300">
                    Back
                    <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Mobile scroll-triggered compact pill — stays clear of Ask Buddy button */}
      {showMobilePill && !isMobileClosed && !isXrFocusPage && (
        <div className="lg:hidden fixed inset-x-3 bottom-20 z-50">
          <div className="flex items-center justify-between gap-2.5 rounded-2xl border border-teal-400/40 bg-zinc-950/95 backdrop-blur-md px-3.5 py-2.5 text-white shadow-2xl shadow-black/50">
            <a
              href={pieegXrKickstarterUrl("mobile_scroll_pill")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-between gap-2 min-w-0"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-teal-300">
                  <span className="size-1.5 rounded-full bg-teal-300 animate-pulse" />
                  Live on Kickstarter · {PIEEG_XR_CAMPAIGN.endsLabel}
                </div>
                <div className="truncate text-xs font-semibold text-white mt-0.5">
                  PiEEG XR — Today we need your support
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-teal-400 px-3 py-1.5 text-[11px] font-bold text-zinc-950">
                <Rocket className="w-3 h-3" />
                Back Us
              </span>
            </a>
            <button
              type="button"
              onClick={dismissMobile}
              aria-label="Dismiss Kickstarter prompt"
              className="flex size-7 shrink-0 items-center justify-center rounded-full text-zinc-400 hover:bg-white/10 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

