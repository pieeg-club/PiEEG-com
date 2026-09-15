"use client";

import { useEffect, useRef } from "react";
import { mountPlatformBench } from "./platform-bench-engine.js";
import "./benches.css";

export default function PlatformBench() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountPlatformBench(root);
  }, []);

  return (
    <section
      id="platform"
      className="scroll-mt-20 pt-10 pb-12 px-4 bg-white dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 mx-auto">
            <div className="h-px w-8 bg-linear-to-r from-transparent via-violet-500 to-transparent" />
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              Platform
            </p>
            <div className="h-px w-8 bg-linear-to-r from-transparent via-violet-500 to-transparent" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            See where your signal goes
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The boards read your body. This map is what happens next: pick a piece, and it shows what feeds it, what it turns EEG into, and where that lands.
          </p>
        </div>

        <div ref={rootRef} className="home-bench plat-bench">
          <nav className="picker" aria-label="Choose a part of the platform">
            <div className="filters" role="group" aria-label="Filter by role">
              <button data-filter="all" aria-pressed="true">All</button>
              <button data-filter="run" aria-pressed="false">Run it yourself</button>
              <button data-filter="browser" aria-pressed="false">In the browser</button>
              <button data-filter="ai" aria-pressed="false">AI</button>
              <button data-filter="stream" aria-pressed="false">Streams out</button>
              <button data-filter="build" aria-pressed="false">Build on it</button>
            </div>
            <div className="rail" id="plat-rail" />
          </nav>

          <div className="bench">
            <div className="maincol">
              <section className="stage" aria-label="How this part of the platform connects">
                <div className="stage-bar">
                  <div className="bar-group">
                    <span className="seg-label">Highlight</span>
                    <div className="seg" id="plat-layers" role="group" aria-label="Highlight a layer" />
                  </div>
                  <div className="bar-group" id="plat-hostWrap" />
                </div>
                <div className="scene-scroll">
                  <svg id="plat-scene" className="plat-scene" viewBox="0 0 1040 500" role="img" aria-labelledby="plat-sceneTitle">
                    <title id="plat-sceneTitle">Data path through the PiEEG platform</title>
                    <g id="plat-lCap" />
                    <g id="plat-lLinks" />
                    <g id="plat-lNodes" />
                  </svg>
                </div>
                <div className="stage-foot" id="plat-legend" />
                <div className="tip" id="plat-tip" />
              </section>

              <section className="panel-live" aria-label="Live output preview">
                <div className="sig-head">
                  <h2 id="plat-panelTitle">What comes out</h2>
                  <div className="right">
                    <p id="plat-panelNote" />
                    <button className="ghost" id="plat-pause" type="button">Pause</button>
                  </div>
                </div>
                <div id="plat-panelBody" />
              </section>
            </div>
            <aside className="spec" id="plat-spec" aria-live="polite" />
          </div>
          <p className="bench-note">Values in the live panel are simulated so you can see the shape of the output, not recordings.</p>
        </div>
      </div>
    </section>
  );
}
