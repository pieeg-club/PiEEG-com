"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import {
  Rocket,
  Code2 as Github,
  Play,
  ArrowRight,
  Bluetooth,
  Cpu,
  Radio,
  Waves,
  ExternalLink,
  Glasses,
  Sparkles,
  Eye,
  Smile,
  Brain,
} from "lucide-react";

import { pieegXrKickstarterUrl } from "@/lib/kickstarter";

const KICKSTARTER_URL = pieegXrKickstarterUrl("xr_hero");

type SimMode = "auto" | "smile" | "blink" | "focus";

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

function synthXrChannel(t: number, c: (typeof TRACE_CHANNELS)[number], idx: number, mode: SimMode) {
  const focusBoost = mode === "focus" ? 1.8 : 1;
  const bg =
    Math.sin(6.283 * 7.8 * t + c.p0) * 0.22 +
    Math.sin(6.283 * 13.1 * t + c.p1) * 0.18 * focusBoost +
    Math.sin(6.283 * 3.7 * t + idx) * 0.12;
  const env = mode === "focus" ? 0.95 : 0.55 + 0.45 * Math.sin(6.283 * 0.22 * t + c.p0);
  const alpha = c.alphaW * env * Math.sin(6.283 * 10.2 * t + c.p1);

  const bt = mode === "blink" ? (t % 1.1) - 0.45 : (t % 3.6) - 1.4;
  const blinkAmp = mode === "blink" ? 1.65 : mode === "auto" ? 1.45 : 0.15;
  const blink = c.blinkW * (g1(bt, 0, 0.095) * blinkAmp - g1(bt, 0.14, 0.12) * 0.35);

  const st = (t % 5.2) - 2.6;
  const smileGate = mode === "smile" ? 0.96 : mode === "auto" ? g1(st, 0, 0.55) : 0.06;
  const emg =
    c.emgW *
    smileGate *
    (Math.sin(6.283 * 42 * t + idx * 1.3) * 0.65 + Math.sin(6.283 * 68 * t + idx * 2.1) * 0.45);
  return bg + alpha + blink + emg;
}

const SIM_PRESETS: { id: SimMode; label: string; Icon: typeof Sparkles }[] = [
  { id: "auto", label: "Auto Cycle", Icon: Sparkles },
  { id: "smile", label: "Smile (fEMG)", Icon: Smile },
  { id: "blink", label: "Blink (EOG)", Icon: Eye },
  { id: "focus", label: "Deep Focus", Icon: Brain },
];

function HeroXrScope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const modeRef = useRef<SimMode>("auto");
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState<SimMode>("auto");
  const smileBarRef = useRef<HTMLDivElement>(null);
  const focusBarRef = useRef<HTMLDivElement>(null);
  const smileValRef = useRef<HTMLSpanElement>(null);
  const focusValRef = useRef<HTMLSpanElement>(null);
  const blinkValRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<HTMLSpanElement>(null);

  const selectMode = (nextMode: SimMode) => {
    modeRef.current = nextMode;
    setMode(nextMode);
  };

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

      const curMode = modeRef.current;

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
        ctx.lineWidth = 1.75;
        ctx.beginPath();
        for (let k = 0; k <= pts; k++) {
          const u = k / pts;
          const tt = simT - winSec + winSec * u;
          const v = Math.max(-1.45, Math.min(1.45, synthXrChannel(tt, chan, r, curMode)));
          const x = u * cw;
          const y = midY - v * amp;
          if (k === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        const headV = Math.max(-1.45, Math.min(1.45, synthXrChannel(simT, chan, r, curMode)));
        ctx.fillStyle = chan.color;
        ctx.beginPath();
        ctx.arc(cw - 4, midY - headV * amp, 2.8, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!pausedRef.current && now - lastHudUpdate > 140) {
        lastHudUpdate = now;
        const st = (simT % 5.2) - 2.6;
        const smile =
          curMode === "smile"
            ? 0.91 + 0.05 * Math.sin(simT * 5)
            : curMode === "auto"
              ? Math.min(0.98, Math.max(0.04, 0.08 + g1(st, 0, 0.55) * 0.88))
              : 0.07 + 0.02 * Math.sin(simT * 2);
        const focus =
          curMode === "focus"
            ? 0.86 + 0.06 * Math.sin(simT * 1.4)
            : 0.42 + 0.22 * Math.sin(simT * 0.62 + 0.9);
        const bt = curMode === "blink" ? (simT % 1.1) - 0.45 : (simT % 3.6) - 1.4;
        const isBlink = curMode === "blink" ? Math.abs(bt) < 0.2 : curMode === "auto" && Math.abs(bt) < 0.14;
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
    <div className="relative rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/95 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/75" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/75" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/75" />
          </span>
          <span className="ml-2 px-2.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
            BLE 5 · PiEEG XR · 8 ch + REF/BIAS @ 250 SPS
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Simulate facial or neural state">
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 mr-1 hidden md:inline">
            Test signal:
          </span>
          {SIM_PRESETS.map((p) => {
            const Icon = p.Icon;
            const active = mode === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => selectMode(p.id)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                  active
                    ? "bg-violet-600 text-white border border-violet-400/60 shadow-xs"
                    : "bg-zinc-950/80 text-zinc-400 border border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                <Icon className="w-3 h-3" />
                {p.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-[11px] text-zinc-400">
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            n=<span ref={frameRef}>24,100</span>
          </span>
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
            className="block w-full h-52 sm:h-56"
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

        <div className="border-t lg:border-t-0 lg:border-l border-zinc-800 p-4 flex flex-col justify-between bg-zinc-900/50 font-mono text-xs">
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
      className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 pt-8 sm:pt-12 pb-12"
      style={{ contain: "layout style" }}
    >
      {/* Background XR video */}
      <HeroVideo src="https://pieeg.lon1.cdn.digitaloceanspaces.com/pieeg-xr-video.mp4" />

      {/* Layered cinematic overlays */}
      <div className="absolute inset-0 bg-linear-to-br from-violet-500/8 via-cyan-500/5 to-blue-500/8 dark:from-violet-500/14 dark:via-cyan-500/8 dark:to-blue-500/12 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-t from-white via-white/25 to-white/65 dark:from-zinc-950 dark:via-zinc-950/25 dark:to-zinc-950/65 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetric Above-the-Fold Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-10">
          {/* Left Column: Campaign Hook + Primary CTAs */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <a
              href={KICKSTARTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-3.5 py-1.5 rounded-full border border-emerald-400/50 bg-zinc-950/90 text-xs font-medium text-emerald-300 mb-5 shadow-sm hover:border-emerald-300 transition-colors"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
                Live on Kickstarter
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-200 font-mono text-[11px]">Ends 31 Dec</span>
              <ArrowRight className="w-3 h-3 text-emerald-300" />
            </a>

            <h1 className="title-hero text-zinc-900 dark:text-zinc-50 mb-4">
              Neural Face Interface{" "}
              <span className="block mt-1 text-violet-600 dark:text-violet-400">
                for Spatial Computing
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
              Snap a 10-electrode dry Ag/AgCl silicone gasket onto your VR headset and stream{" "}
              <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">
                frontal EEG, EOG blinks, and facial EMG
              </strong>{" "}
              at 24-bit / 250 SPS over BLE 5—driving VRChat avatars, WebXR, and neurofeedback without face cameras.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
              <a
                href={KICKSTARTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all shadow-lg shadow-violet-600/25 hover:shadow-violet-500/35"
              >
                <Rocket className="w-4 h-4" />
                Back on Kickstarter
                <ExternalLink className="w-3.5 h-3.5 opacity-85" />
              </a>
              <Link
                href="/hardware/pieeg-xr"
                className="inline-flex items-center gap-2 h-12 px-5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <Cpu className="w-4 h-4 text-cyan-500" />
                Setup &amp; Specs
              </Link>
              <a
                href="https://cloud.pieeg.com/lobby"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <Play className="w-4 h-4 text-amber-500" />
                Cloud
              </a>
              <a
                href="https://github.com/pieeg-club/PiEEG_XR_Hardware"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PiEEG XR Hardware on GitHub"
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>

            {/* Crisp Hardware Proof Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <Glasses className="w-3.5 h-3.5 text-violet-500" /> Quest 3 / 3S / 2 / Pro &amp; Pico
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5 text-cyan-500" /> ADS1299 24-bit · 250 SPS
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Bluetooth className="w-3.5 h-3.5 text-blue-500" /> BLE 5 · 100% Open Source
              </span>
            </div>
          </div>

          {/* Right Column: Spatial Computing Key Visual */}
          <div className="lg:col-span-6">
            <div className="max-w-lg mx-auto rounded-3xl border border-zinc-800/90 bg-zinc-950 shadow-2xl overflow-hidden">
              <div className="relative aspect-square w-full">
                <Image
                  src="/xr/xr-headset-main.png"
                  alt="PiEEG XR neural face interface on VR headset driving real-time avatar expressions"
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
              <div className="px-4 py-3 border-t border-zinc-800/90 bg-zinc-900/90 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-cyan-300">
                  <Radio className="w-3.5 h-3.5 text-cyan-400" />
                  8ch / 16ch IronBCI · BLE 5 · 250 SPS
                </span>
                <a
                  href="#xr-scope"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-mono border border-zinc-700 transition-colors"
                >
                  Interactive Scope ↓
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive 4-Channel Scope */}
        <div id="xr-scope" className="scroll-mt-24 max-w-6xl mx-auto">
          <HeroXrScope />
        </div>

        {/* Featured In & Field Credibility Strip */}
        <div className="mt-7 pt-5 border-t border-zinc-200/70 dark:border-zinc-800/70 max-w-6xl mx-auto">
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

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <a href="#xr-capabilities" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            [Spatial Capabilities]
          </a>
          <a href="#xr-bench" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            [01 · XR Architecture]
          </a>
          <a href="#xr-routes" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            [02 · 4 Connection Routes]
          </a>
          <a href="#xr-hardware-demos" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            [03 · Hardware &amp; Demos]
          </a>
          <a href="#xr-credibility" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            [04 · Research &amp; Press]
          </a>
        </div>
      </div>
    </section>
  );
}
