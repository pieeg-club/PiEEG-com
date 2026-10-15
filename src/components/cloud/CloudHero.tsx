"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Cloud,
  Rocket,
  FlaskConical,
  Bot,
  Code2,
  Play,
  ArrowRight,
  Radio,
  ShieldCheck,
  Terminal,
  Usb,
  Bluetooth,
  Cpu,
} from "lucide-react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const TRACE_COLORS = [
  { ch: "Fp1", color: "#22d3ee" },
  { ch: "Fp2", color: "#38bdf8" },
  { ch: "C3", color: "#a78bfa" },
  { ch: "O1", color: "#34d399" },
];

function HeroSignalScope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    let t = 0;
    let lastNow = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(320, Math.floor(rect.width * dpr));
      canvas.height = Math.max(160, Math.floor(rect.height * dpr));
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw(now: number) {
      if (!canvas || !ctx) return;
      const dt = Math.min(0.05, (now - (lastNow || now)) / 1000);
      lastNow = now;
      if (!reduce) t += dt;

      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "#08090c";
      ctx.fillRect(0, 0, w, h);

      // Subtle grid lines
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      const rows = TRACE_COLORS.length;
      for (let r = 1; r < rows; r++) {
        const y = Math.round((h / rows) * r) + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      const cols = 8;
      for (let c = 1; c < cols; c++) {
        const x = Math.round((w / cols) * c) + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      ctx.stroke();

      // Draw 4 channel traces
      const pts = 180;
      const rowH = h / rows;
      for (let r = 0; r < rows; r++) {
        const midY = rowH * (r + 0.5);
        const amp = rowH * 0.28;
        ctx.strokeStyle = TRACE_COLORS[r].color;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        for (let i = 0; i <= pts; i++) {
          const u = i / pts;
          const x = u * w;
          const phase = t * 2.4 + u * 8 + r * 1.4;
          const alpha = Math.sin(phase * 2.8) * 0.52;
          const beta = Math.sin(phase * 6.5 + r) * 0.22;
          const slow = Math.sin(phase * 0.7) * 0.2;
          // Periodic frontal blink bump on Fp1/Fp2
          const blinkCycle = (t * 0.45 + u * 0.9) % 1;
          const blink =
            r < 2 && blinkCycle > 0.46 && blinkCycle < 0.54
              ? Math.sin(((blinkCycle - 0.46) / 0.08) * Math.PI) * 0.85
              : 0;
          const y = midY - (alpha + beta + slow + blink) * amp;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    function loop(now: number) {
      raf = 0;
      if (!visible) return;
      draw(now);
      if (!reduce) {
        raf = requestAnimationFrame(loop);
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        if (visible && !raf) {
          lastNow = 0;
          raf = requestAnimationFrame(loop);
        }
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl overflow-hidden">
      {/* Top browser / runtime bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/90 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </span>
          <span className="ml-2 px-2.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
            https://cloud.pieeg.com
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-zinc-400">
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Float32Array Ring
          </span>
          <span>250 Hz</span>
          <span className="hidden sm:inline text-cyan-400">Hampel + IIR 1-40 Hz</span>
          <span className="hidden md:inline text-violet-400">Worker FFT</span>
        </div>
      </div>

      {/* Scope body */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px]">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="block w-full h-48 sm:h-56"
            aria-label="Simulated 4-channel browser EEG waveform preview"
          />
          {/* Channel labels */}
          <div className="pointer-events-none absolute inset-y-0 left-3 flex flex-col justify-around py-2 text-[11px] font-mono">
            {TRACE_COLORS.map((t) => (
              <div
                key={t.ch}
                className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-zinc-950/80 border border-zinc-800/80"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: t.color }}
                />
                <span className="text-zinc-200 font-semibold">{t.ch}</span>
                <span className="text-zinc-500">24-bit</span>
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
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Default: local to tab</span>
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
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.95] text-zinc-900 dark:text-zinc-50 mb-5">
            The Browser-Native
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
