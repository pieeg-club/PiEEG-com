"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Bot,
  Terminal,
  Plug,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Cpu,
  Layers,
  Lock,
  BookOpen,
  ExternalLink,
} from "lucide-react";

const CASCADE_TIERS = [
  {
    tier: "T0 · RAW",
    rate: "250 Hz",
    desc: "float32 µV · 60s ring",
    llm: "Never sent",
    color: "#22d3ee",
  },
  {
    tier: "T1 · FEATURES",
    rate: "8 Hz",
    desc: "FFT δθαβγ + quality",
    llm: "Via tools",
    color: "#38bdf8",
  },
  {
    tier: "T2 · STATE",
    rate: "1 Hz",
    desc: "focus · relax · engage",
    llm: "On demand",
    color: "#a78bfa",
  },
  {
    tier: "T3 · EVENTS",
    rate: "Sparse",
    desc: "2s dwell · hysteresis",
    llm: "Context log",
    color: "#34d399",
  },
  {
    tier: "T4 · REASON",
    rate: "On query",
    desc: "MCP / Copilot tools",
    llm: "JSON verdict",
    color: "#f59e0b",
  },
];

const TOOL_LOG_ROTATION = [
  {
    call: "get_channel_quality()",
    ret: '{ status: "good", quality: 0.97, line_ratio: 0.018, bad: [] }',
    tag: "NeuralTools · read-only",
  },
  {
    call: "get_neural_state()",
    ret: '{ focus: 0.34, relax: 0.82, dominant: "alpha", warming_up: false }',
    tag: "NeuralTools · session-relative",
  },
  {
    call: 'analyze_spectrum({ channel: "O1" })',
    ret: "{ iaf_hz: 10.2, slope_1f: -1.14, theta_beta: 1.42, entropy: 0.66 }",
    tag: "DecodeTools · Welch PSD",
  },
  {
    call: 'connectivity({ band: "alpha" })',
    ret: '{ mean_r: 0.36, strongest_pair: ["C3", "C4", 0.72], hub: "C3" }',
    tag: "DecodeTools · envelope r",
  },
  {
    call: 'explain_pattern({ name: "meditation" })',
    ret: '{ loro_balanced_acc: 0.89, top_channels: ["O1", "O2"], penalty: "L2+group_lasso" }',
    tag: "DecodeTools · 3-fold LORO-CV",
  },
  {
    call: 'compare_sessions({ a: "meditation", b: "baseline" })',
    ret: "{ alpha_cohens_d: +0.92, beta_cohens_d: -0.54, within_session_only: true }",
    tag: "DecodeTools · Cohen's d",
  },
];

function PerceptionCascadeScope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [toolIdx, setToolIdx] = useState(0);
  const focusValRef = useRef<HTMLSpanElement>(null);
  const relaxValRef = useRef<HTMLSpanElement>(null);
  const iafValRef = useRef<HTMLSpanElement>(null);
  const qualValRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!pausedRef.current) {
        setToolIdx((i) => (i + 1) % TOOL_LOG_ROTATION.length);
      }
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

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
    let lastHud = 0;
    let cw = 0;
    let ch = 0;
    let dpr = 1;

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = Math.max(320, Math.floor(rect.width || canvas.clientWidth || 640));
      ch = Math.max(185, Math.floor(rect.height || canvas.clientHeight || 220));
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

      // Divide canvas into 3 horizontal cascade lanes:
      // Lane 0: T0 Raw 250 Hz (3 channels)
      // Lane 1: T1/T2 8 Hz Features & 1 Hz Smoothed State Envelope
      // Lane 2: T3 Debounced Hysteresis Events & Tool Pull Markers
      const laneH = ch / 3;

      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, Math.round(laneH) + 0.5);
      ctx.lineTo(cw, Math.round(laneH) + 0.5);
      ctx.moveTo(0, Math.round(laneH * 2) + 0.5);
      ctx.lineTo(cw, Math.round(laneH * 2) + 0.5);

      const winSec = 4;
      const gridOffset = ((simT % 1) / winSec) * cw;
      for (let s = 0; s <= winSec + 1; s++) {
        const x = Math.round((cw * s) / winSec - gridOffset) + 0.5;
        if (x >= 0 && x <= cw) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, ch);
        }
      }
      ctx.stroke();

      const pts = Math.min(320, Math.max(120, Math.floor(cw * 0.55)));

      // ── Lane 0: T0 Raw 250 Hz µV (O1, C3, Fp1) ──
      const rawColors = ["#22d3ee", "#38bdf8", "#818cf8"];
      for (let c = 0; c < 3; c++) {
        const subY = laneH * (0.24 + c * 0.26);
        const amp = laneH * 0.12;
        ctx.strokeStyle = rawColors[c];
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        for (let k = 0; k <= pts; k++) {
          const u = k / pts;
          const tt = simT - winSec + winSec * u;
          const alpha = Math.sin(6.283 * 10.2 * tt + c * 1.1) * (0.65 + 0.35 * Math.sin(tt * 0.6));
          const beta = Math.sin(6.283 * 21.5 * tt + c * 2.3) * 0.28;
          const y = subY - (alpha + beta) * amp;
          const x = u * cw;
          if (k === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // ── Lane 1: T1/T2 Smoothed Alpha & Focus Envelopes (8 Hz -> 1 Hz) ──
      const mid1 = laneH * 1.52;
      const amp1 = laneH * 0.34;
      // Alpha envelope (emerald)
      ctx.strokeStyle = "#34d399";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let k = 0; k <= pts; k++) {
        const u = k / pts;
        const tt = simT - winSec + winSec * u;
        const v = Math.sin(tt * 0.85) * 0.55 + Math.sin(tt * 2.1 + 1) * 0.25;
        const x = u * cw;
        const y = mid1 - v * amp1;
        if (k === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Focus index (violet)
      ctx.strokeStyle = "#a78bfa";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      for (let k = 0; k <= pts; k++) {
        const u = k / pts;
        const tt = simT - winSec + winSec * u;
        const v = Math.cos(tt * 0.72 + 0.4) * 0.48 + Math.sin(tt * 1.6) * 0.2;
        const x = u * cw;
        const y = mid1 - v * amp1;
        if (k === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // ── Lane 2: T3 Sparse Events & T4 On-Demand Tool Pulls ──
      const mid2 = laneH * 2.55;
      // Baseline
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, mid2);
      ctx.lineTo(cw, mid2);
      ctx.stroke();

      // Draw sparse event pulses + tool pull markers scrolling across the 4s window
      const firstTick = Math.floor((simT - winSec) / 0.9);
      const lastTick = Math.ceil(simT / 0.9);
      ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
      for (let tk = firstTick; tk <= lastTick; tk++) {
        const evT = tk * 0.9;
        const u = (evT - (simT - winSec)) / winSec;
        if (u < 0.02 || u > 0.98) continue;
        const x = u * cw;
        const isToolPull = tk % 2 === 0;
        const col = isToolPull ? "#f59e0b" : "#34d399";
        const pulseH = isToolPull ? laneH * 0.28 : laneH * 0.2;

        ctx.strokeStyle = col;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, mid2);
        ctx.lineTo(x, mid2 - pulseH);
        ctx.stroke();

        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(x, mid2 - pulseH, 3, 0, Math.PI * 2);
        ctx.fill();

        const lbl = isToolPull ? "T4 pull" : "T3 event";
        ctx.fillText(lbl, x + 6, mid2 - pulseH + 3);
      }

      if (!pausedRef.current && now - lastHud > 180) {
        lastHud = now;
        const rlx = 0.62 + 0.24 * Math.sin(simT * 0.55);
        const foc = 0.44 + 0.22 * Math.cos(simT * 0.48 + 0.7);
        const iaf = 10.1 + 0.3 * Math.sin(simT * 0.3);
        const qual = 0.95 + 0.03 * Math.sin(simT * 0.4);
        if (relaxValRef.current) relaxValRef.current.textContent = rlx.toFixed(2);
        if (focusValRef.current) focusValRef.current.textContent = foc.toFixed(2);
        if (iafValRef.current) iafValRef.current.textContent = `${iaf.toFixed(1)} Hz`;
        if (qualValRef.current) qualValRef.current.textContent = qual.toFixed(2);
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

  const activeLog = TOOL_LOG_ROTATION[toolIdx];

  return (
    <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl overflow-hidden">
      {/* Top chrome bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/90 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          </span>
          <span className="ml-2 px-2.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
            PerceptionCascade · 250 Hz → 8 Hz → 1 Hz → Sparse Tools
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-zinc-400">
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LSL / WebBLE ring (60s)
          </span>
          <span className="hidden sm:inline text-violet-400">0 raw floats sent to LLM</span>
          <button
            type="button"
            onClick={togglePause}
            className="px-2 py-0.5 rounded border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>

      {/* 5-tier strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-zinc-800 bg-zinc-900/40 text-left font-mono text-[11px]">
        {CASCADE_TIERS.map((t, i) => (
          <div
            key={t.tier}
            className={`px-3.5 py-2.5 ${i < CASCADE_TIERS.length - 1 ? "border-b sm:border-b-0 sm:border-r border-zinc-800/80" : ""}`}
          >
            <div className="flex items-center justify-between gap-1">
              <span className="font-bold" style={{ color: t.color }}>
                {t.tier}
              </span>
              <span className="text-zinc-400">{t.rate}</span>
            </div>
            <div className="text-zinc-300 truncate mt-0.5">{t.desc}</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">LLM: {t.llm}</div>
          </div>
        ))}
      </div>

      {/* Main scope + right tool readout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="block w-full h-52 sm:h-60"
            aria-label="Simulated perception cascade from 250 Hz EEG to sparse tool calls"
          />
          <div className="pointer-events-none absolute inset-y-0 left-3 flex flex-col justify-around py-2 text-[11px] font-mono">
            <div className="px-2 py-0.5 rounded bg-zinc-950/85 border border-zinc-800/90 text-cyan-400">
              T0 · 250 Hz Raw µV (ring buffer)
            </div>
            <div className="px-2 py-0.5 rounded bg-zinc-950/85 border border-zinc-800/90 text-emerald-400">
              T1/T2 · 8 Hz PSD + 1 Hz State
            </div>
            <div className="px-2 py-0.5 rounded bg-zinc-950/85 border border-zinc-800/90 text-amber-400">
              T3/T4 · Hysteresis Events &amp; Tool Pulls
            </div>
          </div>
        </div>

        {/* Right live tool call inspector */}
        <div className="border-t lg:border-t-0 lg:border-l border-zinc-800 p-4 flex flex-col justify-between bg-zinc-900/40 font-mono text-xs">
          <div>
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-500 mb-2.5">
              <span>Live Tool Pull</span>
              <span className="text-violet-400">{activeLog.tag}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1.5 text-[11px]">
              <div className="text-amber-400 truncate">&gt; {activeLog.call}</div>
              <div className="text-emerald-400 leading-relaxed break-words">{activeLog.ret}</div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-zinc-950/70 border border-zinc-800/70">
                <span className="text-zinc-500 block">relax (session)</span>
                <span ref={relaxValRef} className="text-emerald-400 font-semibold tabular-nums">
                  0.78
                </span>
              </div>
              <div className="p-2 rounded bg-zinc-950/70 border border-zinc-800/70">
                <span className="text-zinc-500 block">focus (session)</span>
                <span ref={focusValRef} className="text-violet-400 font-semibold tabular-nums">
                  0.41
                </span>
              </div>
              <div className="p-2 rounded bg-zinc-950/70 border border-zinc-800/70">
                <span className="text-zinc-500 block">alpha peak (IAF)</span>
                <span ref={iafValRef} className="text-cyan-400 font-semibold tabular-nums">
                  10.2 Hz
                </span>
              </div>
              <div className="p-2 rounded bg-zinc-950/70 border border-zinc-800/70">
                <span className="text-zinc-500 block">signal quality</span>
                <span ref={qualValRef} className="text-zinc-200 font-semibold tabular-nums">
                  0.97
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Device gate: locked (read-only)</span>
            <Link
              href="#agent-bench"
              className="text-cyan-400 hover:underline inline-flex items-center gap-1"
            >
              Trace cascade <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AgentHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 pt-10 sm:pt-14 pb-12"
      style={{ contain: "layout style" }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-violet-500/6 via-cyan-500/4 to-blue-500/6 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[64px_64px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-50/70 dark:bg-violet-950/40 text-xs font-medium text-violet-800 dark:text-violet-300 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
            <span>PiEEG Agent &amp; Buddy</span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span className="font-mono text-[11px]">LSL · MCP (:8765/mcp) · Web Bluetooth</span>
          </div>

          {/* Headline */}
          <h1 className="title-hero text-zinc-900 dark:text-zinc-50 mb-5">
            Language-Sized Neural{" "}
            <span className="block mt-1 bg-linear-to-r from-violet-500 via-cyan-500 to-blue-500 dark:from-violet-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              Perception &amp; MCP Tooling
            </span>
          </h1>

          {/* Lead */}
          <p className="text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-7">
            LLMs reason at ~1 Hz; EEG arrives at 250 to 500 Hz. PiEEG Agent bridges the rate mismatch with a
            5-tier perception cascade that compresses raw microvolts into verifiable tool calls, L2 + group-lasso
            pattern classifiers, session effect sizes, and an MCP doorway for the editor or copilot you already run.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://buddy.pieeg.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors shadow-md shadow-violet-500/20"
            >
              <Bot className="w-4 h-4" />
              Open Buddy (Browser AI)
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
            <a
              href="#mcp-portal"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <Plug className="w-4 h-4 text-cyan-500" />
              Interactive MCP Stage
            </a>
            <a
              href="#host-configs"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <Terminal className="w-4 h-4 text-emerald-500" />
              Connect Cursor / Claude / VS Code
            </a>
            <a
              href="https://github.com/pieeg-club/PiEEG-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-zinc-500" />
              GitHub Repo
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* Capability strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-500" /> 5-Tier Perception Cascade
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Plug className="w-3.5 h-3.5 text-violet-500" /> MCP Server (streamable-HTTP, SSE, stdio)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-500" /> L2 + Group-Lasso LORO-CV Classifiers
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-500" /> 4-Stage Gated Device Control
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-500" /> Provider-Agnostic (Cloud or Local Ollama)
            </span>
          </div>
        </div>

        {/* Live Cascade Scope */}
        <div className="max-w-5xl mx-auto">
          <PerceptionCascadeScope />
        </div>

        {/* Jump links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <a href="#agent-bench" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            [01 · Interactive AI Architecture]
          </a>
          <a href="#mcp-portal" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            [02 · Live MCP Portal &amp; Host Q&amp;A]
          </a>
          <a href="#host-configs" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            [03 · Host Configs &amp; CLI]
          </a>
          <a href="#agent-tools" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            [04 · 22 Tool Contracts &amp; Safety Gate]
          </a>
          <a href="#agent-vs-buddy" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            [05 · PiEEG Agent vs Buddy]
          </a>
        </div>
      </div>
    </section>
  );
}
