"use client";

import { useEffect, useRef, useState } from "react";

const BASE_OPACITY = 0.15;
const FADE_S = 1.5;

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const rafRef = useRef<number>(0);

  // Lazy load video after initial render to improve perceived performance
  useEffect(() => {
    // Delay video load slightly to prioritize critical content
    const timer = setTimeout(() => setShouldLoad(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    let fadingOut = false;
    let lastCheckTime = 0;

    // Throttled timeupdate - only check every 200ms to reduce CPU load
    const handleTimeUpdate = () => {
      const now = performance.now();
      if (now - lastCheckTime < 200) return; // Increased throttle
      lastCheckTime = now;

      if (isNaN(video.duration) || fadingOut) return;
      if (video.duration - video.currentTime <= FADE_S) {
        fadingOut = true;
        video.style.transition = `opacity ${FADE_S}s linear`;
        video.style.opacity = "0";
      }
    };

    // On end: reset, play, fade back in - use single RAF instead of double
    const handleEnded = () => {
      video.style.transition = "none";
      video.style.opacity = "0";
      video.currentTime = 0;
      video.play().catch(() => {});
      
      rafRef.current = requestAnimationFrame(() => {
        video.style.transition = `opacity ${FADE_S}s linear`;
        video.style.opacity = String(BASE_OPACITY);
        fadingOut = false;
      });
    };

    video.addEventListener("timeupdate", handleTimeUpdate, { passive: true });
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldLoad]);

  if (!shouldLoad) {
    // Render placeholder with same background color to prevent layout shift
    return (
      <div className="absolute inset-0 w-full h-full bg-zinc-950" style={{ opacity: BASE_OPACITY }} />
    );
  }

  return (
    <video
      ref={videoRef}
      src="https://pieeg.lon1.cdn.digitaloceanspaces.com/ironbci-video-tiny.mp4"
      autoPlay
      muted
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      style={{ opacity: BASE_OPACITY }}
      className="absolute inset-0 w-full h-full object-cover scale-105 blur-[1px]"
    />
  );
}

