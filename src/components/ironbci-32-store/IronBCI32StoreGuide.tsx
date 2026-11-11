"use client";

/**
 * IronBCI-32 interactive guide for the store page (/store/ironbci-32):
 * "Where to use it" live demos, "How to set it up" in 8 steps, and safety.
 *
 * Markup: ./ironbci32-store-guide-html.ts · styles: ./ironbci32-store-guide.css (scoped to
 * #ironbci32-guide) · interactivity: ./ironbci32-store-guide-engine.js, mounted after
 * hydration and stopped on unmount. Images are plain files in public/products/ironbci-32/.
 */

import { useEffect, useRef } from "react";
import { mountIronBCI32StoreGuide } from "./ironbci32-store-guide-engine.js";
import { ironbci32StoreGuideHtml } from "./ironbci32-store-guide-html";
import "./ironbci32-store-guide.css";

export default function IronBCI32StoreGuide() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stop = mountIronBCI32StoreGuide(root);
    return () => {
      stop();
      // Restore the pristine markup so a re-mount (Strict Mode, navigating back) starts clean.
      root.innerHTML = ironbci32StoreGuideHtml;
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="ironbci32-guide"
      aria-label="IronBCI-32: where to use it and how to set it up"
      style={{ ["--sig" as string]: "#0071e3" }}
      dangerouslySetInnerHTML={{ __html: ironbci32StoreGuideHtml }}
    />
  );
}
