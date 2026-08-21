"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play, X } from "lucide-react";

export default function HeroOctopusCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  // Defer the video so it never competes with the critical hero paint.
  useEffect(() => {
    const timer = setTimeout(() => setShouldLoad(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isClosed) {
    return null;
  }

  return (
    <div className="group hidden lg:block fixed z-50 bottom-24 right-4 sm:right-6 w-64">
      {/* Close button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsClosed(true);
        }}
        className="absolute -top-2 -right-2 z-30 p-1.5 rounded-full bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-700 shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Close Octopus card"
      >
        <X className="w-3 h-3" />
      </button>

      <a
        href="https://octopus.pieeg.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Meet Octopus — 16-channel neural interface"
        className="block"
      >
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-950/10 dark:shadow-zinc-950/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          {/* Video */}
          <div className="relative aspect-video overflow-hidden bg-zinc-950">
            {shouldLoad && (
              <video
                ref={videoRef}
                src="https://pieeg.lon1.cdn.digitaloceanspaces.com/octopus-16-vid.mp4"
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

            {/* Gradient scrim for legibility */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

            {/* Play affordance */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play className="h-4 w-4 translate-x-px fill-zinc-900 text-zinc-900" />
              </div>
            </div>

            {/* Live badge */}
            <div className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-sm px-2 py-1 text-[10px] font-medium text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </span>
              16-CH EEG
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-2 px-3 py-2.5">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Meet Octopus</div>
              <div className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">Coin-sized neural interface</div>
            </div>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 transition-all duration-300 group-hover:border-teal-500 group-hover:text-teal-600 dark:group-hover:text-teal-400">
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
