"use client";

/**
 * IronBCI-32 Enclosure hero media (/store/ironbci-32-enclosure): replaces the photo gallery
 * with tabs for an interactive 3D model, the assembly animation and two renders.
 *
 * The 3D viewer is a prebuilt script (three.js bundled in), loaded only on this page:
 *   /public/products/ironbci-32-enclosure/viewer/ironbci32-enclosure-models.js  (tray + lid STL, board layout)
 *   /public/products/ironbci-32-enclosure/viewer/ironbci32-enclosure-viewer.js  (defines window.initIronViewer)
 * Styles: ../octopus16-enclosure-store/octopus16-enclosure-media.css (shared, scoped to .oc16m).
 */

import { useEffect, useRef, useState } from "react";
import "../octopus16-enclosure-store/octopus16-enclosure-media.css";

type IronViewer = { dispose(): void; setActive(on: boolean): void };

declare global {
  interface Window {
    initIronViewer?: (root: HTMLElement) => IronViewer;
  }
}

const BASE = "/products/ironbci-32-enclosure";

const TABS = [
  { kind: "3d", caption: "Interactive 3D model — open the lid, explode the parts or look underneath" },
  { kind: "img", src: `${BASE}/assembly.gif`, thumb: `${BASE}/enclosure-exploded.png`, caption: "Assembly — board in, lid on, turn over, 4 screws", alt: "Animation: assembling IronBCI-32 in the enclosure" },
  { kind: "img", src: `${BASE}/enclosure-closed.png`, thumb: `${BASE}/enclosure-closed.png`, caption: "Assembled: bottom tray and lid with IronBCI-32 inside (3D render)", alt: "IronBCI-32 Enclosure assembled" },
] as const;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-irbenc="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded) resolve();
      else {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error(src)));
      }
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.dataset.irbenc = src;
    s.onload = () => {
      s.dataset.loaded = "1";
      resolve();
    };
    s.onerror = () => reject(new Error(src));
    document.body.appendChild(s);
  });
}

export default function IronBCI32EnclosureMedia() {
  const [tab, setTab] = useState(0);
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerObj = useRef<IronViewer | null>(null);

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    let cancelled = false;
    (async () => {
      try {
        await loadScript(`${BASE}/viewer/ironbci32-enclosure-models.js`);
        await loadScript(`${BASE}/viewer/ironbci32-enclosure-viewer.js`);
        if (!cancelled && window.initIronViewer) viewerObj.current = window.initIronViewer(el);
      } catch {
        const msg = el.querySelector(".loading");
        if (msg) msg.textContent = "The 3D model could not be loaded.";
      }
    })();
    return () => {
      cancelled = true;
      viewerObj.current?.dispose();
      viewerObj.current = null;
    };
  }, []);

  useEffect(() => {
    if (tab === 0) viewerObj.current?.setActive(true);
  }, [tab]);

  const current = TABS[tab];

  return (
    <div className="oc16m space-y-4">
      <div className="oc-stage">
        <div className="oc-media">
          {/* 3D panel stays mounted so the model keeps its state when switching tabs */}
          <div className={`oc-panel${tab === 0 ? " on" : ""}`}>
            <div className="oc-v3d" ref={viewerRef}>
              <div data-canvas />
              <div className="loading">Loading 3D model…</div>
              <div className="vbar boards" role="group" aria-label="Board inside the case">
                <button type="button" data-board="on" className="on">
                  <span className="dot" style={{ background: "#6b3fb8" }} />
                  With IronBCI-32
                </button>
                <button type="button" data-board="none">Empty</button>
              </div>
              <div className="vbar views" role="group" aria-label="Camera angle">
                <button type="button" data-view="iso" className="on">3D</button>
                <button type="button" data-view="top">Top</button>
                <button type="button" data-view="front">Front</button>
                <button type="button" data-view="bottom">Bottom</button>
              </div>
              <div className="vbar tools" role="group" aria-label="Model tools">
                <button type="button" data-toggle="lid" aria-pressed="true">
                  <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M3 7h18" /></svg>Lid
                </button>
                <button type="button" data-toggle="explode" aria-pressed="false">
                  <svg viewBox="0 0 24 24"><path d="M12 3v6M12 15v6M5 12H3M21 12h-2" /><path d="m8 6 4-3 4 3M8 18l4 3 4-3" /></svg>Exploded
                </button>
                <button type="button" data-toggle="spin" aria-pressed="false">
                  <svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v5h-5" /></svg>Spin
                </button>
                <button type="button" data-reset>
                  <svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>Reset
                </button>
              </div>
              <div className="vhint">Drag to rotate · Scroll or pinch to zoom · Right-drag to pan</div>
            </div>
          </div>
          {TABS.map((t, i) =>
            t.kind === "img" && tab === i ? (
              <div key={t.src} className="oc-panel on">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="oc-img" src={t.src} alt={t.alt} />
              </div>
            ) : null
          )}
        </div>
        <div className="oc-cap">
          <span>{current.caption}</span>
          <span className="oc-count">
            {tab + 1} / {TABS.length}
          </span>
        </div>
      </div>

      <div className="oc-thumbs" role="tablist" aria-label="Product media">
        {TABS.map((t, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={tab === i}
            className={`oc-thumb${t.kind === "3d" ? " t3d" : ""}${tab === i ? " on" : ""}`}
            onClick={() => setTab(i)}
            aria-label={t.kind === "3d" ? "Interactive 3D model" : t.alt}
          >
            {t.kind === "3d" ? (
              <>
                <svg viewBox="0 0 24 24">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
                </svg>
                3D Model
              </>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.thumb} alt="" />
            )}
            {i === 1 && <span className="oc-play">▶</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
