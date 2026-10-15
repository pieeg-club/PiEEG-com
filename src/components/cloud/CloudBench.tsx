"use client";

import { useEffect, useRef } from "react";
import { mountCloudBench } from "./cloud-bench-engine.js";
import "@/components/home/benches.css";

export default function CloudBench() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountCloudBench(root);
  }, []);

  return (
    <section
      id="cloud-bench"
      className="scroll-mt-20 py-14 sm:py-16 px-4 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 mx-auto">
            <div className="h-px w-8 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              [01 · CLOUD ARCHITECTURE]
            </p>
            <div className="h-px w-8 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Trace every surface in the browser tab
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Pick a Cloud subsystem to inspect its signal inputs, client-side execution path, and live output format.
            Hover any specification row to highlight its nodes on the diagram.
          </p>
        </div>

        <div ref={rootRef} className="home-bench plat-bench">
          <nav className="picker" aria-label="Choose a PiEEG Cloud subsystem">
            <div className="filters" role="group" aria-label="Filter Cloud surfaces">
              <button data-filter="all" aria-pressed="true">All</button>
              <button data-filter="acquire" aria-pressed="false">Acquire &amp; Calibrate</button>
              <button data-filter="analyze" aria-pressed="false">Analyze &amp; Train</button>
              <button data-filter="build" aria-pressed="false">Write Code</button>
              <button data-filter="stream" aria-pressed="false">Stream &amp; Share</button>
              <button data-filter="ai" aria-pressed="false">AI Copilot</button>
            </div>
            <div className="rail" id="cloud-rail" />
          </nav>

          <div className="bench">
            <div className="maincol">
              <section className="stage" aria-label="Signal path inside PiEEG Cloud">
                <div className="stage-bar">
                  <div className="bar-group">
                    <span className="seg-label">Highlight</span>
                    <div className="seg" id="cloud-layers" role="group" aria-label="Highlight a stage" />
                  </div>
                  <div className="bar-group" id="cloud-hostWrap" />
                </div>
                <div className="scene-scroll">
                  <svg
                    id="cloud-scene"
                    className="plat-scene"
                    viewBox="0 0 1040 500"
                    role="img"
                    aria-labelledby="cloud-sceneTitle"
                  >
                    <title id="cloud-sceneTitle">Data path through PiEEG Cloud</title>
                    <g id="cloud-lCap" />
                    <g id="cloud-lLinks" />
                    <g id="cloud-lNodes" />
                  </svg>
                </div>
                <div className="stage-foot" id="cloud-legend" />
                <div className="tip" id="cloud-tip" />
              </section>

              <section className="panel-live" aria-label="Live output preview">
                <div className="sig-head">
                  <h2 id="cloud-panelTitle">Live output preview</h2>
                  <div className="right">
                    <p id="cloud-panelNote" />
                    <button className="ghost" id="cloud-pause" type="button">
                      Pause
                    </button>
                  </div>
                </div>
                <div id="cloud-panelBody" />
              </section>
            </div>
            <aside className="spec" id="cloud-spec" aria-live="polite" />
          </div>
          <p className="bench-note">
            Values in the live panel are simulated to illustrate the runtime contract of each Cloud surface.
          </p>
        </div>
      </div>
    </section>
  );
}
