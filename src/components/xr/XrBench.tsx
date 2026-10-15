"use client";

import { useEffect, useRef } from "react";
import { mountXrBench } from "./xr-bench-engine.js";
import "@/components/home/benches.css";

export default function XrBench() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountXrBench(root);
  }, []);

  return (
    <section
      id="xr-bench"
      className="scroll-mt-20 py-14 sm:py-16 px-4 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 mx-auto">
            <div className="h-px w-8 bg-linear-to-r from-transparent via-violet-500 to-transparent" />
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              [01 · XR ARCHITECTURE]
            </p>
            <div className="h-px w-8 bg-linear-to-r from-transparent via-violet-500 to-transparent" />
          </div>
          <h2 className="title-section text-zinc-900 dark:text-zinc-50">
            Trace the gasket from dry Ag/AgCl pads to avatar and scene
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Pick an XR subsystem to inspect how the 10-electrode facial mask, the IronBCI BLE 5 front-end, expression
            decoders, and OSC/WebXR outputs connect. Hover any specification row to highlight its nodes.
          </p>
        </div>

        <div ref={rootRef} className="home-bench plat-bench">
          <nav className="picker" aria-label="Choose a PiEEG XR subsystem">
            <div className="filters" role="group" aria-label="Filter XR surfaces">
              <button data-filter="all" aria-pressed="true">All</button>
              <button data-filter="hardware" aria-pressed="false">Mask &amp; AFE</button>
              <button data-filter="decode" aria-pressed="false">Decode</button>
              <button data-filter="avatar" aria-pressed="false">Avatar &amp; OSC</button>
              <button data-filter="scene" aria-pressed="false">WebXR &amp; Apps</button>
            </div>
            <div className="rail" id="xr-rail" />
          </nav>

          <div className="bench">
            <div className="maincol">
              <section className="stage" aria-label="Signal path inside PiEEG XR">
                <div className="stage-bar">
                  <div className="bar-group">
                    <span className="seg-label">Highlight</span>
                    <div className="seg" id="xr-layers" role="group" aria-label="Highlight a stage" />
                  </div>
                  <div className="bar-group" id="xr-hostWrap" />
                </div>
                <div className="scene-scroll">
                  <svg
                    id="xr-scene"
                    className="plat-scene"
                    viewBox="0 0 1040 500"
                    role="img"
                    aria-labelledby="xr-sceneTitle"
                  >
                    <title id="xr-sceneTitle">Data path through PiEEG XR</title>
                    <g id="xr-lCap" />
                    <g id="xr-lLinks" />
                    <g id="xr-lNodes" />
                  </svg>
                </div>
                <div className="stage-foot" id="xr-legend" />
                <div className="tip" id="xr-tip" />
              </section>

              <section className="panel-live" aria-label="Live output preview">
                <div className="sig-head">
                  <h2 id="xr-panelTitle">Live output preview</h2>
                  <div className="right">
                    <p id="xr-panelNote" />
                    <button className="ghost" id="xr-pause" type="button">
                      Pause
                    </button>
                  </div>
                </div>
                <div id="xr-panelBody" />
              </section>
            </div>
            <aside className="spec" id="xr-spec" aria-live="polite" />
          </div>
          <p className="bench-note">
            Values in the live panel are simulated to illustrate the runtime contract of each XR surface.
          </p>
        </div>
      </div>
    </section>
  );
}
