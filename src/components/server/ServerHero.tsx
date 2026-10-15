"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Terminal,
  Code2 as Github,
  Play,
  ArrowRight,
  Cpu,
  Radio,
  Bluetooth,
  Usb,
  ShieldCheck,
  BookOpen,
  ExternalLink,
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

function uvAt(t: number, idx: number) {
  const c = TRACE_CHANNELS[idx % TRACE_CHANNELS.length];
  return (synthEEG(t, c, idx) * 18.4).toFixed(2);
}

function HeroStreamScope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const nRef = useRef<HTMLSpanElement>(null);
  const tRef = useRef<HTMLSpanElement>(null);
  const jsonRef = useRef<HTMLPreElement>(null);
  const hzRef = useRef<HTMLSpanElement>(null);

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
          const v = Math.max(-1.45, Math.min(1.45, synthEEG(tt, chan, r)));
          const x = u * cw;
          const y = midY - v * amp;
          if (k === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        const headV = Math.max(-1.45, Math.min(1.45, synthEEG(simT, chan, r)));
        ctx.fillStyle = chan.color;
        ctx.beginPath();
        ctx.arc(cw - 4, midY - headV * amp, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!pausedRef.current && now - lastHudUpdate > 160) {
        lastHudUpdate = now;
        const n = 18420 + Math.floor(simT * 250);
        const unix = 1711234567 + simT;
        if (nRef.current) nRef.current.textContent = n.toLocaleString();
        if (tRef.current) tRef.current.textContent = unix.toFixed(3);
        if (hzRef.current) hzRef.current.textContent = "250 Hz";
        if (jsonRef.current) {
          const chans = [0, 1, 2, 3].map((i) => uvAt(simT, i)).join(", ");
          jsonRef.current.textContent = `{ "t": ${unix.toFixed(3)}, "n": ${n}, "channels": [${chans}, …] }`;
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
            ws://raspberrypi.local:1616
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-zinc-400">
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span ref={hzRef}>250 Hz</span>
            {" · n="}
            <span ref={nRef}>18,420</span>
          </span>
          <span className="hidden sm:inline text-cyan-400">JSON per sample</span>
          <span className="hidden md:inline text-violet-400">dashboard :1617</span>
          <button
            type="button"
            onClick={togglePause}
            className="px-2 py-0.5 rounded border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="block w-full h-52 sm:h-60"
            aria-label="Simulated 4-channel pieeg-server WebSocket waveform"
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
              Frame contract
            </div>
            <pre
              ref={jsonRef}
              className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-emerald-400 leading-relaxed whitespace-pre-wrap wrap-break-word"
            >
              {`{ "t": 1711234567.123, "n": 18420, "channels": [12.40, -5.11, 8.02, 15.60, …] }`}
            </pre>
            <div className="mt-3.5 pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-zinc-950/70 border border-zinc-800/70">
                <span className="text-zinc-500 block">t</span>
                <span ref={tRef} className="text-cyan-400 font-semibold tabular-nums">
                  1711234567.123
                </span>
              </div>
              <div className="p-2 rounded bg-zinc-950/70 border border-zinc-800/70">
                <span className="text-zinc-500 block">channels</span>
                <span className="text-zinc-200 font-semibold">µV array</span>
              </div>
              <div className="p-2 rounded bg-zinc-950/70 border border-zinc-800/70">
                <span className="text-zinc-500 block">bind</span>
                <span className="text-violet-400 font-semibold">:1616 WS</span>
              </div>
              <div className="p-2 rounded bg-zinc-950/70 border border-zinc-800/70">
                <span className="text-zinc-500 block">UI</span>
                <span className="text-amber-400 font-semibold">:1617 HTTP</span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Simulated 4s window</span>
            <Link
              href="#server-bench"
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

export default function ServerHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 pt-10 sm:pt-14 pb-12"
      style={{ contain: "layout style" }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/6 via-emerald-500/4 to-violet-500/6 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[64px_64px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-50/70 dark:bg-cyan-950/40 text-xs font-medium text-cyan-800 dark:text-cyan-300 mb-5">
            <Terminal className="w-3.5 h-3.5 text-cyan-500" />
            <span>pieeg-server</span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span className="font-mono text-[11px]">Python 3.10+ · MIT · :1616 / :1617</span>
          </div>

          <h1 className="title-hero text-zinc-900 dark:text-zinc-50 mb-5">
            Self-Hosted Biosignal{" "}
            <span className="block mt-1 bg-linear-to-r from-cyan-500 via-emerald-500 to-violet-500 dark:from-cyan-400 dark:via-emerald-400 dark:to-violet-400 bg-clip-text text-transparent">
              Streaming Server
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-7">
            One process acquires 8 to 32 channels over SPI, Bluetooth LE, or USB serial and emits one JSON object per
            sample on WebSocket <code className="font-mono text-sm">:1616</code>. A React dashboard is served on{" "}
            <code className="font-mono text-sm">:1617</code>. Optional LSL, OSC, and HTTP webhooks attach to the same
            loop. MIT licensed.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#install-cli"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold transition-colors shadow-md shadow-cyan-500/20"
            >
              <Terminal className="w-4 h-4" />
              Install &amp; CLI
            </a>
            <a
              href="https://cloud.pieeg.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <Play className="w-4 h-4 text-amber-500" />
              Live Dashboard Demo
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
            <a
              href="https://github.com/pieeg-club/PiEEG-server"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub Repo
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
            <a
              href="https://docs.pieeg.com/software/features/server/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-zinc-500" />
              Docs
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-500" /> SPI (PiEEG-8 / 16, JNEEG)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bluetooth className="w-3.5 h-3.5 text-blue-500" /> BLE (IronBCI-8)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Usb className="w-3.5 h-3.5 text-violet-500" /> USB Serial (IronBCI-32)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-amber-500" /> LSL · OSC · Webhooks
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> MIT · optional --auth
            </span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <HeroStreamScope />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <a href="#server-bench" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            [01 · Interactive Architecture]
          </a>
          <a href="#install-cli" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            [02 · Install, Devices &amp; WebSocket]
          </a>
          <a href="#mit-ecosystem" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            [03 · MIT License &amp; Ecosystem]
          </a>
        </div>
      </div>
    </section>
  );
}
