"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Glasses,
  Rocket,
  Code2 as Github,
  Play,
  ArrowRight,
  Bluetooth,
  Cpu,
  Radio,
  Waves,
  ExternalLink,
} from "lucide-react";

const KICKSTARTER_URL = 
  "https://www.kickstarter.com/projects/42415505/pieeg-xr-neural-face-interface-for-spatial-computing";

const TRACE_CHANNELS = [
  { ch: "Fp1", region: "Forehead L · EEG/EOG", color: "#22d3ee", p0: 0.2, p1: 1.1, alphaW: 0.35, blinkW: 1.15, emgW: 0.08 },
  { ch: "Fp2", region: "Forehead R · EEG/EOG", color: "#38bdf8", p0: 0.5, p1: 1.7, alphaW: 0.32, blinkW: 1.1, emgW: 0.08 },
  { ch: "F7", region: "Temple L · EOG/fEMG", color: "#a78bfa", p0: 1.9, p1: 2.8, alphaW: 0.18, blinkW: 0.35, emgW: 0.55 },
  { ch: "ZyL", region: "Cheek L · fEMG", color: "#34d399", p0: 3.1, p1: 0.6, alphaW: 0.06, blinkW: 0.08, emgW: 1.1 },
];

const g1 = (x: number, m: number, s: number) => {
  const z = (x - m) / s;
  return Math.exp(-z * z);
};

function synthXrChannel(t: number, c: (typeof TRACE_CHANNELS)[number], idx: number) {
  const bg =
    Math.sin(6.283 * 7.8 * t + c.p0) * 0.26 +
    Math.sin(6.283 * 13.1 * t + c.p1) * 0.2 +
    Math.sin(6.283 * 3.7 * t + idx) * 0.14;
  const env = 0.55 + 0.45 * Math.sin(6.283 * 0.22 * t + c.p0);
  const alpha = c.alphaW * env * Math.sin(6.283 * 10.2 * t + c.p1);
  const bt = (t % 3.6) - 1.4;
  const blink = c.blinkW * (g1(bt, 0, 0.095) * 1.45 - g1(bt, 0.14, 0.12) * 0.35);
  const st = (t % 5.2) - 2.6;
  const smileGate = g1(st, 0, 0.55);
  const emg =
    c.emgW *
    smileGate *
    (Math.sin(6.283 * 42 * t + idx * 1.3) * 0.65 + Math.sin(6.283 * 68 * t + idx * 2.1) * 0.45);
  return bg + alpha + blink + emg;
}

function HeroXrScope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const smileBarRef = useRef<HTMLDivElement>(null);
  const focusBarRef = useRef<HTMLDivElement>(null);
  const smileValRef = useRef<HTMLSpanElement>(null);
  const focusValRef = useRef<HTMLSpanElement>(null);
  const blinkValRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let stopped = false;
    let visible = true;
    let simT = 0;
    let lastNow = 0;
    let lastHudUpdate = 0;
    let cw = 0;
    let ch = 0;
    let dpr = 1;

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = Math.max(320, Math.floor(rect.width || canvas.clientWidth || 640));
      ch = Math.max(180, Math.floor(rect.height || canvas.clientHeight || 224));
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw(now: number) {
      if (!canvas || !ctx) return;
      if (!cw) resize();
      const dt = Math.min(0.05, (now - (lastNow || now)) / 1000);
      lastNow = now;
      if (!pausedRef.current) simT += dt;

      ctx.fillStyle = "#07080a";
      ctx.fillRect(0, 0, cw, ch);

      const rows = TRACE_CHANNELS.length;
      const rowH = ch / rows;
      const winSec = 4;

      ctx.strokeStyle = "rgba(255,255,255,0.055)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let r = 1; r < rows; r++) {
        const y = Math.round(rowH * r) + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(cw, y);
      }
      const gridOffset = ((simT % 1) / winSec) * cw;
      for (let s = 0; s <= winSec + 1; s++) {
        const x = Math.round((cw * s) / winSec - gridOffset) + 0.5;
        if (x >= 0 && x <= cw) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, ch);
        }
      }
      ctx.stroke();

      const pts = Math.min(340, Math.max(120, Math.floor(cw * 0.6)));
      const amp = rowH * 0.34;

      for (let r = 0; r < rows; r++) {
        const chan = TRACE_CHANNELS[r];
        const midY = rowH * (r + 0.5);

        ctx.strokeStyle = "rgba(255,255,255,0.03)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, midY);
        ctx.lineTo(cw, midY);
        ctx.stroke();

        ctx.strokeStyle = chan.color;
        ctx.lineWidth = 1.65;
        ctx.beginPath();
        for (let k = 0; k <= pts; k++) {
          const u = k / pts;
          const tt = simT - winSec + winSec * u;
          const v = Math.max(-1.45, Math.min(1.45, synthXrChannel(tt, chan, r)));
          const x = u * cw;
          const y = midY - v * amp;
          if (k === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        const headV = Math.max(-1.45, Math.min(1.45, synthXrChannel(simT, chan, r)));
        ctx.fillStyle = chan.color;
        ctx.beginPath();
        ctx.arc(cw - 4, midY - headV * amp, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!pausedRef.current && now - lastHudUpdate > 160) {
        lastHudUpdate = now;
        const st = (simT % 5.2) - 2.6;
        const smile = Math.min(0.98, Math.max(0.04, 0.08 + g1(st, 0, 0.55) * 0.88));
        const focus = 0.38 + 0.24 * Math.sin(simT * 0.62 + 0.9);
        const bt = (simT % 3.6) - 1.4;
        const isBlink = Math.abs(bt) < 0.14;
        if (smileBarRef.current) smileBarRef.current.style.width = `${Math.round(smile * 100)}%`;
        if (focusBarRef.current) focusBarRef.current.style.width = `${Math.round(focus * 100)}%`;
        if (smileValRef.current) smileValRef.current.textContent = smile.toFixed(2);
        if (focusValRef.current) focusValRef.current.textContent = focus.toFixed(2);
        if (blinkValRef.current) blinkValRef.current.textContent = isBlink ? "1 (blink)" : "0";
        if (frameRef.current) {
          frameRef.current.textContent = (24100 + Math.floor(simT * 250)).toLocaleString();
        }
      }
    }

    function startLoop() {
      if (stopped || raf) return;
      lastNow = 0;
      raf = requestAnimationFrame(function tick(now) {
        raf = 0;
        if (stopped) return;
        if (visible) draw(now);
        raf = requestAnimationFrame(tick);
      });
    }

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        if (visible) startLoop();
      },
      { threshold: 0.05, rootMargin: "80px" },
    );
    io.observe(canvas);
    startLoop();

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      raf = 0;
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  const togglePause = () => {
    const next = !pausedRef.current;
    pausedRef.current = next;
    setPaused(next);
  };

  return (
    <div className="relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/90 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          </span>
          <span className="ml-2 px-2.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
            BLE 5 · PiEEG XR · 8 ch + REF/BIAS @ 250 SPS
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-zinc-400">
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            24-bit ADS1299 · n=<span ref={frameRef}>24,100</span>
          </span>
          <span className="hidden sm:inline text-violet-400">EEG + EOG + fEMG</span>
          <button
            type="button"
            onClick={togglePause}
            className="px-2 py-0.5 rounded border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_290px]">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="block w-full h-52 sm:h-60"
            aria-label="Simulated 4-channel PiEEG XR face mask waveform"
          />
          <div className="pointer-events-none absolute inset-y-0 left-3 flex flex-col justify-around py-2 text-[11px] font-mono">
            {TRACE_CHANNELS.map((t) => (
              <div
                key={t.ch}
                className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-zinc-950/85 border border-zinc-800/90"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                <span className="text-zinc-100 font-semibold">{t.ch}</span>
                <span className="text-zinc-500 hidden sm:inline">{t.region}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t lg:border-t-0 lg:border-l border-zinc-800 p-4 flex flex-col justify-between bg-zinc-900/40 font-mono text-xs">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-zinc-500 mb-2.5">
              Decoded XR parameters
            </div>
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-emerald-400">fEMG · smile (L2 + group-lasso)</span>
                  <span ref={smileValRef} className="text-zinc-300 tabular-nums">
                    0.12
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    ref={smileBarRef}
                    className="h-full rounded-full bg-emerald-400 transition-[width] duration-150"
                    style={{ width: "12%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-violet-400">EEG · focus index (session)</span>
                  <span ref={focusValRef} className="text-zinc-300 tabular-nums">
                    0.48
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    ref={focusBarRef}
                    className="h-full rounded-full bg-violet-400 transition-[width] duration-150"
                    style={{ width: "48%" }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-zinc-950/70 border border-zinc-800/70">
                <span className="text-zinc-500 block">EOG · blink</span>
                <span ref={blinkValRef} className="text-cyan-400 font-semibold tabular-nums">
                  0
                </span>
              </div>
              <div className="p-2 rounded bg-zinc-950/70 border border-zinc-800/70">
                <span className="text-zinc-500 block">VRChat OSC</span>
                <span className="text-amber-400 font-semibold">:9000 UDP</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Simulated 4s window</span>
            <Link
              href="#xr-bench"
              className="text-violet-400 hover:underline inline-flex items-center gap-1"
            >
              Inspect path <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function XrHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 pt-10 sm:pt-14 pb-12"
      style={{ contain: "layout style" }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-violet-500/6 via-cyan-500/4 to-blue-500/6 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[64px_64px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-50/70 dark:bg-violet-950/40 text-xs font-medium text-violet-800 dark:text-violet-300 mb-5">
            <Glasses className="w-3.5 h-3.5 text-violet-500" />
            <span>PiEEG XR</span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span className="font-mono text-[11px]">10 dry Ag/AgCl · ADS1299 · STM32WB BLE 5</span>
          </div>

          <h1 className="title-hero text-zinc-900 dark:text-zinc-50 mb-5">
            Neural Face Interface{" "}
            <span className="block mt-1 bg-linear-to-r from-violet-500 via-cyan-500 to-blue-500 dark:from-violet-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              for Spatial Computing
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-7">
            A silicone facial gasket with ten flat dry Ag/AgCl electrodes (8 active + REF + BIAS) that snaps onto your
            VR headset. A strap-mounted IronBCI box digitizes frontal EEG, EOG blinks, and facial EMG at 24-bit /
            250 SPS and streams over Bluetooth LE 5 into PiEEG Cloud,{" "}
            <code className="font-mono text-sm">pieeg-server</code>, VRChat OSC, or BodyPress.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={KICKSTARTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors shadow-md shadow-violet-500/20"
            >
              <Rocket className="w-4 h-4" />
              Back on Kickstarter
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
            <Link
              href="/hardware/pieeg-xr"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <Cpu className="w-4 h-4 text-cyan-500" />
              Hardware &amp; Setup Guide
            </Link>
            <a
              href="https://cloud.pieeg.com/lobby"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <Play className="w-4 h-4 text-amber-500" />
              Open Cloud Lobby
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
            <a
              href="https://github.com/pieeg-club/PiEEG_XR_Hardware"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <Waves className="w-3.5 h-3.5 text-cyan-500" /> 8 ch + REF/BIAS (1.0 µVpp noise)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-violet-500" /> ADS1299 24-bit · 250 SPS
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bluetooth className="w-3.5 h-3.5 text-blue-500" /> STM32WB BLE 5
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-amber-500" /> VRChat OSC · WebXR · BodyPress
            </span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <HeroXrScope />
        </div>

        {/* Featured In & Field Credibility Strip */}
        <div className="mt-7 pt-5 border-t border-zinc-200/70 dark:border-zinc-800/70 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs">
            <span className="font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mr-1">
              Covered by &amp; field-tested:
            </span>
            <a
              href="https://www.uploadvr.com/pieeg-xr-makes-your-vr-avatar-expressive-without-face-tracking/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-semibold hover:border-violet-400 dark:hover:border-violet-500 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              UploadVR
            </a>
            <a
              href="https://www.moguravr.com/pieeg-xr-kickstarter-en/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-semibold hover:border-rose-400 dark:hover:border-rose-500 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              Mogura VR (JP)
            </a>
            <a
              href="https://www.notebookcheck.net/For-VR-PiEEG-XR-measures-brain-activity-in-real-time.1311211.0.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-semibold hover:border-cyan-400 dark:hover:border-cyan-500 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              Notebookcheck
            </a>
            <a
              href="https://www.ukrifter.com/revolutionising-avatar-control-pieegs-brain-computer-interface-for-quest-headsets/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-semibold hover:border-amber-400 dark:hover:border-amber-500 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              UK Rifter
            </a>
            <a
              href="#xr-credibility"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 font-semibold hover:border-emerald-500 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Sports Research · María Trapero Ventura
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <a href="#xr-bench" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            [01 · Interactive XR Architecture]
          </a>
          <a href="#xr-routes" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            [02 · 4 Headset Connection Routes]
          </a>
          <a href="#xr-hardware-demos" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            [03 · Hardware, Demos &amp; Experiences]
          </a>
          <a href="#xr-credibility" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            [04 · Field Research, VR Press &amp; Ecosystem]
          </a>
        </div>
      </div>
    </section>
  );
}
