"use client";

/**
 * PiEEG Pi 5 Enclosure hero media (/store/pieeg-pi5-enclosure): replaces the photo gallery
 * with tabs for an interactive 3D model (PiEEG-8 / PiEEG-16 inside), both assembly animations and a render.
 *
 * The 3D viewer is a prebuilt script (three.js bundled in), loaded only on this page:
 *   /public/products/pieeg-pi5-enclosure/viewer/pieeg-pi5-enclosure-models.js  (case + lid STL, PiEEG-8/16 boards)
 *   /public/products/pieeg-pi5-enclosure/viewer/pieeg-pi5-enclosure-viewer.js  (defines window.initEnclosureViewer)
 * Styles: ../octopus16-enclosure-store/octopus16-enclosure-media.css (shared, scoped to .oc16m).
 */

import { useEffect, useRef, useState } from "react";
import "../octopus16-enclosure-store/octopus16-enclosure-media.css";

type EnclViewer = { dispose(): void; setActive(on: boolean): void };

declare global {
  interface Window {
    initEnclosureViewer?: (root: HTMLElement) => EnclViewer;
  }
}

const BASE = "/products/pieeg-pi5-enclosure";

const TABS = [
  { kind: "3d", caption: "Interactive 3D model — switch boards, open the lid or explode the parts" },
  { kind: "img", src: `${BASE}/assembly-pieeg8.gif`, thumb: `${BASE}/enclosure-closed.png`, caption: "Assembly with PiEEG-8 — Pi 5 in, shield on, lid on, 4 screws", alt: "Animation: Raspberry Pi 5 and PiEEG-8 assembled into the case" },
  { kind: "img", src: `${BASE}/assembly-pieeg16.gif`, thumb: `${BASE}/enclosure-exploded.png`, caption: "Assembly with PiEEG-16 — Pi 5 in, shield on, lid on, 4 screws", alt: "Animation: Raspberry Pi 5 and PiEEG-16 assembled into the case" },
] as const;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-pienc="${src}"]`);
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
    s.dataset.pienc = src;
    s.onload = () => {
      s.dataset.loaded = "1";
      resolve();
    };
    s.onerror = () => reject(new Error(src));
    document.body.appendChild(s);
  });
}

export default function PiEEGPi5EnclosureMedia() {
  const [tab, setTab] = useState(0);
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerObj = useRef<EnclViewer | null>(null);

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    let cancelled = false;
    (async () => {
      try {
        await loadScript(`${BASE}/viewer/pieeg-pi5-enclosure-models.js`);
        await loadScript(`${BASE}/viewer/pieeg-pi5-enclosure-viewer.js`);
        if (!cancelled && window.initEnclosureViewer) viewerObj.current = window.initEnclosureViewer(el);
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
                <button type="button" data-board="pieeg8" className="on">
                  <span className="dot" style={{ background: "#e39a2b" }} />
                  PiEEG-8
                </button>
                <button type="button" data-board="pieeg16">
                  <span className="dot" style={{ background: "#8a3fb0" }} />
                  PiEEG-16
                </button>
                <button type="button" data-board="none">Empty</button>
              </div>
              <div className="vbar views" role="group" aria-label="Camera angle">
                <button type="button" data-view="iso" className="on">3D</button>
                <button type="button" data-view="top">Top</button>
                <button type="button" data-view="front">Front</button>
                <button type="button" data-view="side">Side</button>
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
            {i > 0 && <span className="oc-play">{i === 1 ? "8 ▶" : "16 ▶"}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
