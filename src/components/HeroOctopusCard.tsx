"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";

export default function HeroOctopusCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Defer the video so it never competes with the critical hero paint.
  useEffect(() => {
    const timer = setTimeout(() => setShouldLoad(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="https://octopus.pieeg.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Meet Octopus — 16-channel neural interface"
      className="group hidden lg:block absolute z-20 right-6 xl:right-14 top-1/2 translate-y-[-42%] w-60 xl:w-72"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-cyan-400/20 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative overflow-hidden rounded-2xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-2xl shadow-cyan-900/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-cyan-500/25">
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
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/85 backdrop-blur-sm shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="h-4 w-4 translate-x-px fill-zinc-900 text-zinc-900" />
            </div>
          </div>

          {/* Live badge */}
          <div className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </span>
            16-CH EEG
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 px-3.5 py-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Meet Octopus</div>
            <div className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">Coin-sized neural interface</div>
          </div>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 transition-all duration-300 group-hover:border-cyan-500/50 group-hover:text-cyan-500">
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </a>
  );
}
