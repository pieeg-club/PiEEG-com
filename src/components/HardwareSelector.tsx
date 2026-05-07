"use client";

import { useState } from "react";
import Link from "next/link";
import {
  X,
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  Wifi,
  Cpu,
  Layers,
  Brain,
  FlaskConical,
  GraduationCap,
  ShoppingCart,
  ExternalLink,
  Sparkles,
} from "lucide-react";

// ─── Decision tree ────────────────────────────────────────────────────────────

type Option = {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  next?: string;
  result?: string;
};

type Step = {
  id: string;
  question: string;
  subtitle?: string;
  options: Option[];
};

const steps: Record<string, Step> = {
  start: {
    id: "start",
    question: "What's your primary goal?",
    subtitle: "We'll narrow down the best hardware in just a few clicks.",
    options: [
      {
        label: "Learn & Prototype",
        description: "Student, maker, or first BCI project",
        icon: <GraduationCap className="w-5 h-5" />,
        next: "platform-learn",
      },
      {
        label: "Research / Lab work",
        description: "Academic or professional neuroscience",
        icon: <FlaskConical className="w-5 h-5" />,
        next: "channels",
      },
      {
        label: "Wearable / Mobile",
        description: "Needs to move with the subject",
        icon: <Wifi className="w-5 h-5" />,
        next: "wearable",
      },
      {
        label: "ML / Deep Learning",
        description: "Real-time inference on GPU or NPU",
        icon: <Brain className="w-5 h-5" />,
        result: "jneeg",
      },
    ],
  },

  "platform-learn": {
    id: "platform-learn",
    question: "Which development platform do you prefer?",
    subtitle: "Pick the ecosystem you're most comfortable with.",
    options: [
      {
        label: "Raspberry Pi",
        description: "Linux, Python, large community",
        icon: <Cpu className="w-5 h-5" />,
        result: "pieeg",
      },
      {
        label: "Arduino",
        description: "Simple C++ workflow, easy wiring",
        icon: <Cpu className="w-5 h-5" />,
        result: "ardeeg",
      },
      {
        label: "STM32",
        description: "Bare-metal or RTOS, low power",
        icon: <Cpu className="w-5 h-5" />,
        result: "microbci",
      },
      {
        label: "No preference",
        description: "Recommend the easiest entry point",
        icon: <Sparkles className="w-5 h-5" />,
        result: "pieeg",
      },
    ],
  },

  channels: {
    id: "channels",
    question: "How many EEG channels do you need?",
    subtitle: "More channels capture broader spatial coverage.",
    options: [
      {
        label: "8 channels",
        description: "Great for most BCI research tasks",
        icon: <Layers className="w-5 h-5" />,
        next: "platform-research",
      },
      {
        label: "16 channels",
        description: "Extended coverage for richer data",
        icon: <Layers className="w-5 h-5" />,
        result: "pieeg-16",
      },
      {
        label: "32 channels",
        description: "Full research-grade coverage",
        icon: <Layers className="w-5 h-5" />,
        result: "ironbci-32",
      },
    ],
  },

  "platform-research": {
    id: "platform-research",
    question: "Which platform fits your lab setup?",
    subtitle: "All options deliver 24-bit, 250 SPS per channel.",
    options: [
      {
        label: "Raspberry Pi",
        description: "Python-first, easy data pipeline",
        icon: <Cpu className="w-5 h-5" />,
        result: "pieeg",
      },
      {
        label: "STM32 / Embedded",
        description: "Low power, real-time control",
        icon: <Cpu className="w-5 h-5" />,
        result: "microbci",
      },
      {
        label: "No preference",
        description: "Most popular research choice",
        icon: <Sparkles className="w-5 h-5" />,
        result: "pieeg",
      },
    ],
  },

  wearable: {
    id: "wearable",
    question: "Does the device need to be wireless?",
    subtitle: "Wireless setups remove cable constraints during movement.",
    options: [
      {
        label: "Yes — fully wireless",
        description: "BLE 5, streams to phone or PC",
        icon: <Wifi className="w-5 h-5" />,
        result: "ironbci",
      },
      {
        label: "Wired is fine",
        description: "More stable, lower latency",
        icon: <Cpu className="w-5 h-5" />,
        next: "platform-wearable",
      },
    ],
  },

  "platform-wearable": {
    id: "platform-wearable",
    question: "Which platform for your wearable project?",
    options: [
      {
        label: "Raspberry Pi",
        description: "Compact Pi Zero / Pi 4 form factor",
        icon: <Cpu className="w-5 h-5" />,
        result: "pieeg",
      },
      {
        label: "STM32",
        description: "Ultra low-power embedded",
        icon: <Cpu className="w-5 h-5" />,
        result: "microbci",
      },
      {
        label: "Arduino",
        description: "Arduino R4 WiFi — compact & cheap",
        icon: <Cpu className="w-5 h-5" />,
        result: "ardeeg",
      },
    ],
  },
};

// ─── Product results ──────────────────────────────────────────────────────────

type Product = {
  id: string;
  name: string;
  tagline: string;
  why: string;
  channels: string;
  platform: string;
  badge?: string;
  gradient: string;
  href: string;
  purchaseUrl: string;
};

const products: Record<string, Product> = {
  pieeg: {
    id: "pieeg",
    name: "PiEEG",
    tagline: "8-channel Raspberry Pi shield",
    why: "The most popular entry point — Python-friendly, well-documented, and backed by a large community.",
    channels: "8 channels",
    platform: "Raspberry Pi 3/4/5",
    badge: "Most Popular",
    gradient: "from-cyan-500 to-blue-600",
    href: "/hardware/pieeg",
    purchaseUrl: "https://www.elecrow.com/pieeg.html",
  },
  "pieeg-16": {
    id: "pieeg-16",
    name: "PiEEG-16",
    tagline: "16-channel Raspberry Pi shield",
    why: "Double the spatial resolution of PiEEG, still on Raspberry Pi. Ideal for richer research datasets.",
    channels: "16 channels",
    platform: "Raspberry Pi 5",
    gradient: "from-blue-500 to-indigo-600",
    href: "/hardware/pieeg-16",
    purchaseUrl: "https://www.elecrow.com/pieeg-16.html",
  },
  ironbci: {
    id: "ironbci",
    name: "IronBCI",
    tagline: "8-channel wireless BCI",
    why: "The go-to for wearable experiments. BLE 5 streams data to your phone or PC without any cables.",
    channels: "8 channels",
    platform: "BLE 5 Wireless",
    badge: "Wireless",
    gradient: "from-purple-500 to-pink-600",
    href: "/hardware/ironbci",
    purchaseUrl: "https://www.elecrow.com/ironbci.html",
  },
  "ironbci-32": {
    id: "ironbci-32",
    name: "IronBCI-32",
    tagline: "32-channel professional system",
    why: "Full research-grade coverage. Four AD7771 ADCs, STM32H7, Brainflow integrated.",
    channels: "32 channels",
    platform: "STM32H7",
    badge: "Research Grade",
    gradient: "from-red-500 to-orange-600",
    href: "/hardware/ironbci-32",
    purchaseUrl: "https://www.elecrow.com/ironbci-32.html",
  },
  microbci: {
    id: "microbci",
    name: "MicroBCI",
    tagline: "8-channel STM32 shield",
    why: "Best for embedded and low-power workflows. Full STM32 ecosystem support with Python & Mobile SDKs.",
    channels: "8 channels",
    platform: "STM32 NUCLEO-WB55",
    gradient: "from-teal-500 to-cyan-600",
    href: "/hardware/microbci",
    purchaseUrl: "https://www.elecrow.com/microbci-eeg-with-stm32.html",
  },
  ardeeg: {
    id: "ardeeg",
    name: "ardEEG",
    tagline: "8-channel Arduino shield",
    why: "The simplest starting point for makers familiar with Arduino. Ultra-low power and easy wiring.",
    channels: "8 channels",
    platform: "Arduino UNO R4 WiFi",
    gradient: "from-green-500 to-emerald-600",
    href: "/hardware/ardeeg",
    purchaseUrl: "https://www.elecrow.com/ardeeg.html",
  },
  jneeg: {
    id: "jneeg",
    name: "JNEEG",
    tagline: "8-channel Jetson Nano shield",
    why: "Made for ML and deep learning. Run real-time inference directly on the Jetson Nano GPU.",
    channels: "8 channels",
    platform: "Jetson Nano",
    gradient: "from-orange-500 to-red-600",
    href: "/hardware/jneeg",
    purchaseUrl: "https://www.elecrow.com/jneeg.html",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function HardwareSelector({ onClose }: { onClose: () => void }) {
  const [history, setHistory] = useState<string[]>(["start"]);
  const [resultId, setResultId] = useState<string | null>(null);

  const currentStepId = history[history.length - 1];
  const currentStep = steps[currentStepId];
  const result = resultId ? products[resultId] : null;

  function choose(option: Option) {
    if (option.result) {
      setResultId(option.result);
    } else if (option.next) {
      setHistory((h) => [...h, option.next!]);
    }
  }

  function goBack() {
    if (resultId) {
      setResultId(null);
    } else if (history.length > 1) {
      setHistory((h) => h.slice(0, -1));
    }
  }

  const canGoBack = history.length > 1 || resultId !== null;
  const progress = resultId
    ? 100
    : Math.round(((history.length - 1) / 4) * 100);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Panel */}
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            {canGoBack && (
              <button
                onClick={goBack}
                className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Hardware Selector
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full bg-linear-to-r from-cyan-500 to-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {/* ── Result ── */}
          {result ? (
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className={`shrink-0 w-10 h-10 rounded-xl bg-linear-to-br ${result.gradient} flex items-center justify-center shadow-md`}>
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-0.5">
                    Our recommendation
                  </p>
                  <h2 className="text-xl font-extrabold">{result.name}</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {result.tagline}
                  </p>
                </div>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-800/60 rounded-xl p-4">
                {result.why}
              </p>

              <div className="flex gap-3 text-xs font-semibold">
                <span className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300">
                  {result.channels}
                </span>
                <span className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300">
                  {result.platform}
                </span>
                {result.badge && (
                  <span className={`px-2.5 py-1 rounded-lg bg-linear-to-r ${result.gradient} text-white`}>
                    {result.badge}
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <a
                  href={result.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r ${result.gradient} text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-md`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Buy Now
                </a>
                <Link
                  href={result.href}
                  onClick={onClose}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Learn More
                </Link>
              </div>

              <button
                onClick={() => { setHistory(["start"]); setResultId(null); }}
                className="w-full text-center text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors py-1"
              >
                Start over
              </button>
            </div>
          ) : (
            /* ── Question ── */
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-extrabold leading-tight">
                  {currentStep.question}
                </h2>
                {currentStep.subtitle && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {currentStep.subtitle}
                  </p>
                )}
              </div>

              <div className="space-y-2.5">
                {currentStep.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => choose(opt)}
                    className="w-full group flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-cyan-400 dark:hover:border-cyan-600 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/20 transition-all text-left"
                  >
                    {opt.icon && (
                      <span className="shrink-0 w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/40 group-hover:text-cyan-600 transition-colors">
                        {opt.icon}
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{opt.label}</p>
                      {opt.description && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                          {opt.description}
                        </p>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-500 shrink-0 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
