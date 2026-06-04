"use client";

import { useEffect, useRef } from "react";

const BASE_OPACITY = 0.15;
const FADE_S = 1.5;

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fadingOut = false;
    let lastCheckTime = 0;

    // Throttled timeupdate - only check every 100ms to reduce CPU load
    const handleTimeUpdate = () => {
      const now = performance.now();
      if (now - lastCheckTime < 100) return; // Throttle
      lastCheckTime = now;

      if (isNaN(video.duration) || fadingOut) return;
      if (video.duration - video.currentTime <= FADE_S) {
        fadingOut = true;
        video.style.transition = `opacity ${FADE_S}s linear`;
        video.style.opacity = "0";
      }
    };

    // On end: reset, play, fade back in
    const handleEnded = () => {
      video.style.transition = "none";
      video.style.opacity = "0";
      video.currentTime = 0;
      video.play().catch(() => {});
      // Two rAF frames so the transition:none takes effect before we set the new opacity
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          video.style.transition = `opacity ${FADE_S}s linear`;
          video.style.opacity = String(BASE_OPACITY);
          fadingOut = false;
        });
      });
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src="https://pieeg.lon1.cdn.digitaloceanspaces.com/ironbci-video-tiny.mp4"
      autoPlay
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      style={{ opacity: BASE_OPACITY, willChange: 'opacity' }}
      className="absolute inset-0 w-full h-full object-cover scale-105 blur-[1px]"
    />
  );
}

