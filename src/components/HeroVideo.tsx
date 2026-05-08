"use client";

import { useEffect, useRef } from "react";

/**
 * Looping background video with a dim-fade transition between loops.
 * - Fades out during the last `FADE_DURATION_S` seconds of each play
 * - Resets to start, then fades back in
 */
const FADE_DURATION_S = 1.5; // seconds to fade out before end

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Track opacity separately so we can animate it
    let opacity = 1; // 0–1 scale, mapped to base opacity later
    let fading: "out" | "in" | "none" = "none";
    let lastTime = performance.now();

    function tick(now: number) {
      const dt = (now - lastTime) / 1000; // seconds
      lastTime = now;

      if (video && !video.paused && !video.ended) {
        const remaining = video.duration - video.currentTime;

        if (remaining <= FADE_DURATION_S && fading !== "in") {
          fading = "out";
        }

        if (fading === "out") {
          opacity = Math.max(0, opacity - dt / FADE_DURATION_S);
          if (opacity <= 0) {
            // Restart
            video.currentTime = 0;
            video.play().catch(() => {});
            fading = "in";
          }
        } else if (fading === "in") {
          opacity = Math.min(1, opacity + dt / FADE_DURATION_S);
          if (opacity >= 1) fading = "none";
        }

        // Base opacity is 0.13 (light) / 0.18 (dark) — apply as inline multiplier
        if (video) {
          video.style.opacity = String(opacity * 0.15);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src="https://pieeg.lon1.cdn.digitaloceanspaces.com/ironbci-video.mp4"
      autoPlay
      muted
      playsInline
      style={{ opacity: 0.15 }}
      className="absolute inset-0 w-full h-full object-cover scale-105 blur-[1px] transition-none"
    />
  );
}
