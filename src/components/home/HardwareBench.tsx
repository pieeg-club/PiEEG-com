"use client";

import { useEffect, useRef } from "react";
import { mountHardwareBench } from "./hardware-bench-engine.js";
import "./benches.css";

export default function HardwareBench() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountHardwareBench(root);
  }, []);

  return (
    <section
      id="hardware-on-body"
      className="scroll-mt-20 pt-10 pb-12 px-4 bg-linear-to-b from-white via-zinc-50/50 to-white dark:from-zinc-950 dark:via-zinc-900/40 dark:to-zinc-950"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 mx-auto">
            <div className="h-px w-8 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              Hardware
            </p>
            <div className="h-px w-8 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            See how each device is worn
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Pick a board, then a signal. The model shows where the electrodes go, what powers the board, and how the data reaches your screen.
          </p>
        </div>

        <div ref={rootRef} className="home-bench hw-bench">
          <nav className="picker" aria-label="Choose a device">
            <div className="filters" role="group" aria-label="Filter devices">
              <button data-filter="all" aria-pressed="true">All</button>
              <button data-filter="rpi" aria-pressed="false">Raspberry Pi</button>
              <button data-filter="wireless" aria-pressed="false">Wireless</button>
              <button data-filter="8" aria-pressed="false">8 Ch</button>
              <button data-filter="16" aria-pressed="false">16+ Ch</button>
            </div>
            <div className="rail" id="hw-rail" />
          </nav>

          <div className="bench">
            <div className="maincol">
              <section className="stage" aria-label="Device fitted on a body">
                <div className="stage-bar">
                  <div className="bar-group">
                    <span className="seg-label">Signal</span>
                    <div className="seg" id="hw-modes" role="group" aria-label="Signal type" />
                  </div>
                  <div className="bar-group" id="hw-gelWrap" />
                </div>
                <div className="scene-scroll">
                  <svg id="hw-scene" className="hw-scene" viewBox="0 0 1000 640" role="img" aria-labelledby="hw-sceneTitle">
                    <title id="hw-sceneTitle">Electrode placement and setup</title>
                    <defs>
                      <linearGradient id="hw-skin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#2d323b" />
                        <stop offset="1" stopColor="#171a1f" />
                      </linearGradient>
                      <radialGradient id="hw-skinHead" cx=".42" cy=".3" r=".8">
                        <stop offset="0" stopColor="#3a404a" />
                        <stop offset="1" stopColor="#1c2026" />
                      </radialGradient>
                      <radialGradient id="hw-gel" cx=".4" cy=".35" r=".7">
                        <stop offset="0" stopColor="#e4f5ff" stopOpacity=".85" />
                        <stop offset=".55" stopColor="#8fd3ff" stopOpacity=".45" />
                        <stop offset="1" stopColor="#5ab8ff" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id="hw-fadeDown" x1="0" y1="0" x2="0" y2="1">
                        <stop offset=".82" stopColor="#fff" />
                        <stop offset="1" stopColor="#fff" stopOpacity="0" />
                      </linearGradient>
                      <mask id="hw-bodyFade">
                        <rect x="0" y="0" width="1000" height="640" fill="url(#hw-fadeDown)" />
                      </mask>
                      <linearGradient id="hw-deskGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#fff" stopOpacity=".05" />
                        <stop offset="1" stopColor="#fff" stopOpacity="0" />
                      </linearGradient>
                      <clipPath id="hw-capClip">
                        <path id="hw-capShape" d="M279 154C275 113 300 84 330 84S385 113 381 154C369 145 351 139 330 139S291 145 279 154Z" />
                      </clipPath>
                    </defs>
                    <g id="hw-lMap" />
                    <g id="hw-lDesk" />
                    <g id="hw-lPeriph" />
                    <g id="hw-lFigure" className="figure" mask="url(#hw-bodyFade)" />
                    <g id="hw-lWear" />
                    <g id="hw-lBundle" />
                    <g id="hw-lLeads" data-part="electrodes" />
                    <g id="hw-lElectrodes" data-part="electrodes" />
                    <g id="hw-lBodyDev" />
                    <g id="hw-lAir" />
                  </svg>
                </div>
                <div className="stage-foot" id="hw-legend" />
                <div className="tip" id="hw-tip" />
              </section>

              <section className="signals" aria-label="Signal preview">
                <div className="sig-head">
                  <h2>Signal preview</h2>
                  <div className="right">
                    <p id="hw-sigNote" />
                    <button className="ghost" id="hw-pause" type="button">Pause</button>
                  </div>
                </div>
                <canvas id="hw-traces" height="260" />
              </section>
            </div>
            <aside className="spec" id="hw-spec" aria-live="polite" />
          </div>
          <p className="bench-note">Signals in the preview are simulated to show what each placement picks up. They are not recordings.</p>
        </div>
      </div>
    </section>
  );
}
