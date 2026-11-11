"use client";

/**
 * OctoBio Kit interactive guide for the store page (/store/octobio-kit):
 * live lesson demos, "What's inside", "What students learn", "How to set it up" and the safety band.
 *
 * Same guide as /hardware/octobio-kit without its header, hero, facts and specifications (the store
 * page already shows those). It reuses the interactivity and styles of the hardware page from
 * src/components/octobio-kit/ (initOctobioGuide, octobioGuideCss), so both pages stay in sync.
 * Images are the existing files in /public/hardware/octobio-kit/.
 */

import { useEffect, useRef } from "react";
import { initOctobioGuide } from "@/components/octobio-kit/initOctobioGuide";
import { octobioGuideCss } from "@/components/octobio-kit/octobioGuideCss";
import { octobioStoreGuideHtml } from "./octobio-store-guide-html";

// Store page: "Interactive guide" label and spacing.
const STORE_CSS =
  "#octobio-guide .ig-kicker{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#0891b2;margin:48px 0 6px}" +
  "#octobio-guide main{padding-bottom:40px}";

export default function OctoBioStoreGuide() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cleanup = initOctobioGuide(root);
    return () => {
      cleanup();
      root.innerHTML = octobioStoreGuideHtml; // a re-mount starts clean
    };
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600&display=swap"
      />
      <style dangerouslySetInnerHTML={{ __html: octobioGuideCss + STORE_CSS }} />
      <div id="octobio-guide" ref={ref} dangerouslySetInnerHTML={{ __html: octobioStoreGuideHtml }} />
    </>
  );
}
