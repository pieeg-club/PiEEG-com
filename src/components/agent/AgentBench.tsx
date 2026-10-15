"use client";

import { useEffect, useRef } from "react";
import { mountAgentBench } from "./agent-bench-engine.js";
import "@/components/home/benches.css";

export default function AgentBench() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountAgentBench(root);
  }, []);

  return (
    <section
      id="agent-bench"
      className="scroll-mt-20 py-14 sm:py-16 px-4 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 mx-auto">
            <div className="h-px w-8 bg-linear-to-r from-transparent via-violet-500 to-transparent" />
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              [01 · AI &amp; AGENT ARCHITECTURE]
            </p>
            <div className="h-px w-8 bg-linear-to-r from-transparent via-violet-500 to-transparent" />
          </div>
          <h2 className="title-section text-zinc-900 dark:text-zinc-50">
            Trace the signal from 250 Hz ring buffer to LLM tool call
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Select a subsystem to inspect how raw microvolts become language-sized tool verdicts, cross-validated
            classifiers, and gated device commands. Hover any specification row to trace its nodes.
          </p>
        </div>

        <div ref={rootRef} className="home-bench plat-bench">
          <nav className="picker" aria-label="Choose a PiEEG Agent subsystem">
            <div className="filters" role="group" aria-label="Filter AI subsystems">
              <button data-filter="all" aria-pressed="true">All</button>
              <button data-filter="core" aria-pressed="false">Core &amp; Cascade</button>
              <button data-filter="mcp" aria-pressed="false">MCP Server</button>
              <button data-filter="decode" aria-pressed="false">Decode &amp; Notebooks</button>
              <button data-filter="gate" aria-pressed="false">Safety Gate</button>
              <button data-filter="browser" aria-pressed="false">Browser (Buddy)</button>
            </div>
            <div className="rail" id="agent-rail" />
          </nav>

          <div className="bench">
            <div className="maincol">
              <section className="stage" aria-label="Signal path inside PiEEG Agent">
                <div className="stage-bar">
                  <div className="bar-group">
                    <span className="seg-label">Highlight</span>
                    <div className="seg" id="agent-layers" role="group" aria-label="Highlight a stage" />
                  </div>
                  <div className="bar-group" id="agent-hostWrap" />
                </div>
                <div className="scene-scroll">
                  <svg
                    id="agent-scene"
                    className="plat-scene"
                    viewBox="0 0 1040 500"
                    role="img"
                    aria-labelledby="agent-sceneTitle"
                  >
                    <title id="agent-sceneTitle">Data path through PiEEG Agent</title>
                    <g id="agent-lCap" />
                    <g id="agent-lLinks" />
                    <g id="agent-lNodes" />
                  </svg>
                </div>
                <div className="stage-foot" id="agent-legend" />
                <div className="tip" id="agent-tip" />
              </section>

              <section className="panel-live" aria-label="Live output preview">
                <div className="sig-head">
                  <h2 id="agent-panelTitle">Live output preview</h2>
                  <div className="right">
                    <p id="agent-panelNote" />
                    <button className="ghost" id="agent-pause" type="button">
                      Pause
                    </button>
                  </div>
                </div>
                <div id="agent-panelBody" />
              </section>
            </div>
            <aside className="spec" id="agent-spec" aria-live="polite" />
          </div>
          <p className="bench-note">
            Values in the live panel are simulated to illustrate the runtime contract of each Agent subsystem.
          </p>
        </div>
      </div>
    </section>
  );
}
