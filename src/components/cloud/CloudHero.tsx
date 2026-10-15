"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Cloud,
  Rocket,
  FlaskConical,
  Bot,
  Play,
  ArrowRight,
  Radio,
  ShieldCheck,
  Usb,
  Bluetooth,
  Cpu,
} from "lucide-react";

const TRACE_CHANNELS = [
  { ch: "Fp1", region: "Frontal L", color: "#22d3ee", p0: 0.2, p1: 1.1, alphaW: 0.22, blinkW: 1.05 },
  { ch: "Fp2", region: "Frontal R", color: "#38bdf8", p0: 0.5, p1: 1.7, alphaW: 0.24, blinkW: 0.98 },
  { ch: "C3", region: "Central L", color: "#a78bfa", p0: 1.9, p1: 2.8, alphaW: 0.42, blinkW: 0.12 },
  { ch: "O1", region: "Occipital L", color: "#34d399", p0: 3.1, p1: 0.6, alphaW: 0.85, blinkW: 0.0 },
];

const g1 = (x: number, m: number, s: number) => {
  const z = (x - m) / s;
  return Math.exp(-z * z);
};

function synthEEG(t: number, c: (typeof TRACE_CHANNELS)[number], idx: number) {
  const bg =
    Math.sin(6.283 * 7.8 * t + c.p0) * 0.32 +
    Math.sin(6.283 * 13.1 * t + c.p1) * 0.22 +
    Math.sin(6.283 * 3.7 * t + idx) * 0.18 +
    Math.sin(6.283 * 22.4 * t + idx * 1.7) * 0.09;
  const env = 0.55 + 0.45 * Math.sin(6.283 * 0.22 * t + c.p0);
  const alpha = c.alphaW * env * Math.sin(6.283 * 10.2 * t + c.p1);
  const bt = (t % 3.6) - 1.4;
  const blink = c.blinkW * (g1(bt, 0, 0.095) * 1.45 - g1(bt, 0.14, 0.12) * 0.35);
  return bg + alpha * 1.15 + blink;
}

function HeroSignalScope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const alphaBarRef = useRef<HTMLDivElement>(null);
  const betaBarRef = useRef<HTMLDivElement>(null);
  const alphaValRef = useRef<HTMLSpanElement>(null);
  const betaValRef = useRef<HTMLSpanElement>(null);
  const frameCountRef = useRef<HTMLSpanElement>(null);
  const rmsRefs = useRef<(HTMLSpanElement | null)[]>([]);

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
      if (!pausedRef.current) {
        simT += dt;
      }

      ctx.fillStyle = "#07080a";
      ctx.fillRect(0, 0, cw, ch);

      const rows = TRACE_CHANNELS.length;
      const rowH = ch / rows;
      const winSec = 4;

      // Vertical 1-second time grid + horizontal channel dividers
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

      // Draw scrolling 4-second waveforms
      const pts = Math.min(340, Math.max(120, Math.floor(cw * 0.6)));
      const amp = rowH * 0.34;

      for (let r = 0; r < rows; r++) {
        const chan = TRACE_CHANNELS[r];
        const midY = rowH * (r + 0.5);

        // Subtle zero baseline
        ctx.strokeStyle = "rgba(255,255,255,0.03)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, midY);
        ctx.lineTo(cw, midY);
        ctx.stroke();

        // Waveform trace
        ctx.strokeStyle = chan.color;
        ctx.lineWidth = 1.65;
        ctx.beginPath();
        for (let k = 0; k <= pts; k++) {
          const u = k / pts;
          const tt = simT - winSec + winSec * u;
          const v = Math.max(-1.45, Math.min(1.45, synthEEG(tt, chan, r)));
          const x = u * cw;
          const y = midY - v * amp;
          if (k === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Leading playhead dot on the right edge
        const headV = Math.max(-1.45, Math.min(1.45, synthEEG(simT, chan, r)));
        const headY = midY - headV * amp;
        ctx.fillStyle = chan.color;
        ctx.beginPath();
        ctx.arc(cw - 4, headY, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update telemetry readouts at ~6 Hz (zero React re-renders)
      if (!pausedRef.current && now - lastHudUpdate > 160) {
        lastHudUpdate = now;
        const alphaRel = 0.34 + 0.18 * Math.sin(simT * 0.55 + 0.8);
        const betaRel = 0.21 + 0.09 * Math.sin(simT * 0.83 + 2.1);
        if (alphaBarRef.current) alphaBarRef.current.style.width = `${Math.round(alphaRel * 100)}%`;
        if (betaBarRef.current) betaBarRef.current.style.width = `${Math.round(betaRel * 100)}%`;
        if (alphaValRef.current) alphaValRef.current.textContent = alphaRel.toFixed(2);
        if (betaValRef.current) betaValRef.current.textContent = betaRel.toFixed(2);
        if (frameCountRef.current) {
          frameCountRef.current.textContent = (48200 + Math.floor(simT * 250)).toLocaleString();
        }
        for (let r = 0; r < rows; r++) {
          const el = rmsRefs.current[r];
          if (el) {
            const baseRms = r < 2 ? 18.4 : r === 2 ? 11.2 : 15.6;
            const mod = Math.sin(simT * 1.3 + r * 1.1) * 2.8;
            el.textContent = `${(baseRms + mod).toFixed(1)} µV`;
          }
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
      {/* Top browser / runtime bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/90 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          </span>
          <span className="ml-2 px-2.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
            https://cloud.pieeg.com/dashboard
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-zinc-400">
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            250 Hz · <span ref={frameCountRef}>48,200</span> samples
          </span>
          <span className="hidden sm:inline text-cyan-400">Hampel + IIR 1-40 Hz</span>
          <span className="hidden md:inline text-violet-400">Worker FFT</span>
          <button
            type="button"
            onClick={togglePause}
            className="px-2 py-0.5 rounded border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>

      {/* Scope body */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_270px]">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="block w-full h-52 sm:h-60"
            aria-label="Simulated 4-channel browser EEG waveform preview"
          />
          {/* Channel labels + live RMS */}
          <div className="pointer-events-none absolute inset-y-0 left-3 flex flex-col justify-around py-2 text-[11px] font-mono">
            {TRACE_CHANNELS.map((t, i) => (
              <div
                key={t.ch}
                className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-zinc-950/85 border border-zinc-800/90"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: t.color }}
                />
                <span className="text-zinc-100 font-semibold">{t.ch}</span>
                <span className="text-zinc-500 hidden sm:inline">{t.region}</span>
                <span
                  ref={(el) => {
                    rmsRefs.current[i] = el;
                  }}
                  className="text-zinc-400 tabular-nums"
                >
                  15.2 µV
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right telemetry column */}
        <div className="border-t lg:border-t-0 lg:border-l border-zinc-800 p-4 flex flex-col justify-between bg-zinc-900/40 font-mono text-xs">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-zinc-500 mb-2.5">
              Client-Side Hot Path
            </div>
            <div className="space-y-2 text-zinc-300">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Ingest</span>
                <span className="text-cyan-400">useRef ring (0 GC)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">React state</span>
                <span>2 Hz throttled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Spectrum</span>
                <span className="text-violet-400">256-pt radix-2 Worker</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Live Lab</span>
                <span className="text-emerald-400">15 Hz JS sandbox</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Local Bridge</span>
                <span className="text-amber-400">WebRTC DTLS → OSC</span>
              </div>
            </div>

            {/* Live relative band bars */}
            <div className="mt-3.5 pt-3 border-t border-zinc-800/80 space-y-2">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-emerald-400">α Alpha (8-13 Hz)</span>
                  <span ref={alphaValRef} className="text-zinc-300 tabular-nums">0.42</span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    ref={alphaBarRef}
                    className="h-full rounded-full bg-emerald-400 transition-[width] duration-150"
                    style={{ width: "42%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-amber-400">β Beta (13-30 Hz)</span>
                  <span ref={betaValRef} className="text-zinc-300 tabular-nums">0.24</span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    ref={betaBarRef}
                    className="h-full rounded-full bg-amber-400 transition-[width] duration-150"
                    style={{ width: "24%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Simulated 4s window</span>
            <Link
              href="#cloud-bench"
              className="text-cyan-400 hover:underline inline-flex items-center gap-1"
            >
              Inspect path <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CloudHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 pt-10 sm:pt-14 pb-12"
      style={{ contain: "layout style" }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/6 via-blue-500/4 to-violet-500/6 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[64px_64px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          {/* Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-50/70 dark:bg-cyan-950/40 text-xs font-medium text-cyan-800 dark:text-cyan-300 mb-5">
            <Cloud className="w-3.5 h-3.5 text-cyan-500" />
            <span>cloud.pieeg.com</span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span className="font-mono text-[11px]">Web Bluetooth · Web Serial · WebSocket · WebRTC</span>
          </div>

          {/* Headline */}
          <h1 className="title-hero text-zinc-900 dark:text-zinc-50 mb-5">
            The Browser-Native{" "}
            <span className="block mt-1 bg-linear-to-r from-cyan-500 via-blue-500 to-violet-500 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
              BCI Operating System
            </span>
          </h1>

          {/* Lead */}
          <p className="text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-7">
            Connect 8 to 48 channels over Web Bluetooth or Web Serial directly into a Chromium tab.
            Packet decoding, Hampel despiking, Butterworth IIR filtering, Worker FFT, 3D head topography,
            a 15 Hz programmable JS lab, and 35+ neural experiences execute client-side. No drivers, no account required.
          </p>

          {/* Primary action bar */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://cloud.pieeg.com/lobby"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold transition-colors shadow-md shadow-cyan-500/20"
            >
              <Rocket className="w-4 h-4" />
              Open Session Lobby
            </a>
            <a
              href="https://cloud.pieeg.com/lab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <FlaskConical className="w-4 h-4 text-emerald-500" />
              Live Lab (Bio-Pen)
            </a>
            <a
              href="https://cloud.pieeg.com/mock"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <Play className="w-4 h-4 text-amber-500" />
              Mock Studio
            </a>
            <a
              href="https://buddy.pieeg.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <Bot className="w-4 h-4 text-violet-500" />
              Buddy AI
            </a>
          
          </div>

          {/* Technical strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <Bluetooth className="w-3.5 h-3.5 text-cyan-500" /> Web Bluetooth (BLE)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Usb className="w-3.5 h-3.5 text-blue-500" /> Web Serial (921,600 baud)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-violet-500" /> 8 / 16 / 32 / 48 ch · 250-500 Hz
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-amber-500" /> WebRTC P2P Local Bridge (OSC)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Client-side by default
            </span>
          </div>
        </div>

        {/* Live Scope Preview */}
        <div className="max-w-5xl mx-auto">
          <HeroSignalScope />
        </div>

        {/* Quick jump anchors */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <a href="#cloud-bench" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            [01 · Interactive Architecture]
          </a>
          <a href="#lobby-devices" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            [02 · 9 Hardware &amp; Demo Sources]
          </a>
          <a href="#live-lab" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            [03 · Live Lab &amp; Bio-Pen]
          </a>
          <a href="#local-bridge" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            [04 · Local Bridge &amp; Neural Stream]
          </a>
          <a href="#privacy-contract" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            [05 · Data &amp; Privacy Architecture]
          </a>
        </div>
      </div>
    </section>
  );
}
