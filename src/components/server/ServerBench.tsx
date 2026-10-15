"use client";

import { useEffect, useRef } from "react";
import { mountServerBench } from "./server-bench-engine.js";
import "@/components/home/benches.css";

export default function ServerBench() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountServerBench(root);
  }, []);

  return (
    <section
      id="server-bench"
      className="scroll-mt-20 py-14 sm:py-16 px-4 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 mx-auto">
            <div className="h-px w-8 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              [01 · SERVER ARCHITECTURE]
            </p>
            <div className="h-px w-8 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
          </div>
          <h2 className="title-section text-zinc-900 dark:text-zinc-50">
            Trace the sample from ADC to JSON, LSL, and OSC
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Pick a subsystem to inspect how acquisition, the WebSocket contract, the dashboard, and optional outlets
            share one loop. Hover any specification row to highlight its nodes.
          </p>
        </div>

        <div ref={rootRef} className="home-bench plat-bench">
          <nav className="picker" aria-label="Choose a pieeg-server subsystem">
            <div className="filters" role="group" aria-label="Filter server surfaces">
              <button data-filter="all" aria-pressed="true">All</button>
              <button data-filter="acquire" aria-pressed="false">Acquire</button>
              <button data-filter="stream" aria-pressed="false">Stream</button>
              <button data-filter="dashboard" aria-pressed="false">Dashboard</button>
              <button data-filter="integrate" aria-pressed="false">Outlets</button>
              <button data-filter="sdk" aria-pressed="false">SDK</button>
            </div>
            <div className="rail" id="server-rail" />
          </nav>

          <div className="bench">
            <div className="maincol">
              <section className="stage" aria-label="Signal path inside pieeg-server">
                <div className="stage-bar">
                  <div className="bar-group">
                    <span className="seg-label">Highlight</span>
                    <div className="seg" id="server-layers" role="group" aria-label="Highlight a stage" />
                  </div>
                  <div className="bar-group" id="server-hostWrap" />
                </div>
                <div className="scene-scroll">
                  <svg
                    id="server-scene"
                    className="plat-scene"
                    viewBox="0 0 1040 500"
                    role="img"
                    aria-labelledby="server-sceneTitle"
                  >
                    <title id="server-sceneTitle">Data path through pieeg-server</title>
                    <g id="server-lCap" />
                    <g id="server-lLinks" />
                    <g id="server-lNodes" />
                  </svg>
                </div>
                <div className="stage-foot" id="server-legend" />
                <div className="tip" id="server-tip" />
              </section>

              <section className="panel-live" aria-label="Live output preview">
                <div className="sig-head">
                  <h2 id="server-panelTitle">Live output preview</h2>
                  <div className="right">
                    <p id="server-panelNote" />
                    <button className="ghost" id="server-pause" type="button">
                      Pause
                    </button>
                  </div>
                </div>
                <div id="server-panelBody" />
              </section>
            </div>
            <aside className="spec" id="server-spec" aria-live="polite" />
          </div>
          <p className="bench-note">
            Values in the live panel are simulated to illustrate the runtime contract of each server surface.
          </p>
        </div>
      </div>
    </section>
  );
}
