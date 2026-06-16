"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Brain,
  MessageSquare,
  Zap,
  TrendingUp,
  Network,
  FileBarChart,
  BookOpen,
  Terminal,
  Code,
  ExternalLink,
  CheckCircle2,
  Activity,
  Eye,
  BarChart3,
  Sparkles,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";

// Chat demo data - realistic conversations from the docs
const CHAT_DEMOS = [
  {
    id: "monitoring",
    title: "Brain State Monitoring",
    description: "Ask about your current mental state",
    icon: Brain,
    gradient: "from-cyan-500 to-blue-600",
    messages: [
      { role: "user", text: "how's my signal?" },
      { role: "assistant", text: "All channels read 'good', quality 0.98 — trustworthy signal." },
      { role: "user", text: "am I focused or relaxed?" },
      {
        role: "assistant",
        text: "Relaxed. Alpha is dominant (0.87) and focus is low (0.31).",
      },
    ],
  },
  {
    id: "pattern",
    title: "Pattern Training",
    description: "Train custom mental state classifiers",
    icon: Zap,
    gradient: "from-purple-500 to-pink-600",
    messages: [
      { role: "user", text: "train a pattern called 'meditation'" },
      {
        role: "assistant",
        text: "Starting pattern training for 'meditation'. I'll guide you through recording segments.\n\nFirst, I need a baseline. Sit normally with eyes open.\nReady to record 'rest' for 4 seconds? (say yes when ready)",
      },
      { role: "user", text: "yes" },
      {
        role: "assistant",
        text: "[Recording rest...] ✓ Captured 32 frames, quality 0.94.\n\nNow, close your eyes and meditate for 4 seconds.\nReady? (say yes)",
      },
      { role: "user", text: "yes" },
      {
        role: "assistant",
        text: "[Recording active...] ✓ Captured 32 frames, quality 0.96.\n\nPattern 'meditation' trained:\n• Balanced accuracy: 0.89 (leave-one-rep-out CV)\n• Top cue: Alpha increase in O1/O2 (occipital)\n• Channel importance: O1★★★ O2★★★ C3★ C4★",
      },
    ],
  },
  {
    id: "analysis",
    title: "Spectral Analysis",
    description: "Deep frequency-domain analysis",
    icon: BarChart3,
    gradient: "from-green-500 to-emerald-600",
    messages: [
      { role: "user", text: "analyze my alpha rhythm" },
      {
        role: "assistant",
        text: "Spectral analysis:\n• Individual alpha peak (IAF): 10.2 Hz\n• Alpha power: 0.73 (dominant)\n• 1/f slope: -1.1 (typical healthy EEG)\n• Spectral entropy: 0.68 (moderate complexity)\n• Frontal alpha asymmetry: -0.05 (balanced)",
      },
    ],
  },
  {
    id: "connectivity",
    title: "Connectivity Analysis",
    description: "Network topology and synchrony",
    icon: Network,
    gradient: "from-orange-500 to-red-600",
    messages: [
      { role: "user", text: "show connectivity in the alpha band" },
      {
        role: "assistant",
        text: "Alpha-band connectivity (amplitude coupling):\nMean correlation: 0.34\nStrongest pair: C3↔C4 (r=0.72) — motor cortex synchrony\nMost connected: C3 (6 strong links)\nLeast connected: Fp1 (2 weak links)",
      },
    ],
  },
];

const FEATURES = [
  {
    icon: Activity,
    title: "Real-Time Brain State",
    description: "Monitor focus, relaxation, engagement with session-relative indices",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Zap,
    title: "Pattern Recognition",
    description: "Train custom classifiers with L2 + group-lasso, LORO-CV validation",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: BarChart3,
    title: "Spectral Analysis",
    description: "IAF detection, 1/f slope, theta/beta ratio, spectral entropy",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-500/10",
  },
  {
    icon: Network,
    title: "Connectivity",
    description: "Cross-channel amplitude coupling in any frequency band",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: FileBarChart,
    title: "Session Recording",
    description: "Capture labeled windows, compare with effect sizes (Cohen's d)",
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    icon: Eye,
    title: "Artifact Detection",
    description: "Eye blinks (single/double), jaw clenches, motion artifacts",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: BookOpen,
    title: "Jupyter Notebooks",
    description: "Auto-generate publication-ready analysis notebooks",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/10",
  },
];

function ChatDemo({ demo }: { demo: typeof CHAT_DEMOS[0] }) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play when visible, restart when scrolling back into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset and start playing when visible
            setCurrentMessage(0);
            setIsPlaying(true);
          } else {
            // Pause when not visible
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;

    if (currentMessage >= demo.messages.length) {
      // Restart after a pause
      const restartTimer = setTimeout(() => {
        setCurrentMessage(0);
      }, 2000);
      return () => clearTimeout(restartTimer);
    }

    const delay = demo.messages[currentMessage].role === "user" ? 1200 : 1800;
    const timer = setTimeout(() => {
      setCurrentMessage((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentMessage, demo.messages]);

  return (
    <div
      ref={containerRef}
      className="group relative h-full flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Compact Header */}
      <div className={`px-5 py-3 bg-linear-to-r ${demo.gradient}`}>
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-sm">
            <demo.icon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">{demo.title}</h3>
            <p className="text-xs text-white/80">{demo.description}</p>
          </div>
        </div>
      </div>

      {/* Chat messages - always show content */}
      <div className="flex-1 p-5 space-y-3 overflow-hidden">
        {demo.messages.slice(0, Math.max(currentMessage, 2)).map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"} ${
              idx < currentMessage ? "opacity-100" : "opacity-40"
            } transition-opacity duration-300`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-xs ${
                msg.role === "user"
                  ? "bg-linear-to-r from-cyan-600 to-cyan-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              }`}
            >
              <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        
        {/* Typing indicator when playing */}
        {isPlaying && currentMessage < demo.messages.length && demo.messages[currentMessage]?.role === "assistant" && (
          <div className="flex gap-2 justify-start">
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl px-3 py-2">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subtle live indicator */}
      {isPlaying && (
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400">Live</span>
          </div>
        </div>
      )}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-zinc-400" />
      )}
    </button>
  );
}

export default function AgentPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white via-zinc-50/50 to-white dark:from-zinc-950 dark:via-zinc-900/50 dark:to-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[64px_64px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 dark:border-cyan-500/30 mb-8">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-sm font-medium text-cyan-900 dark:text-cyan-100">
                AI-Powered Neuroscience
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-600 via-purple-600 to-pink-600">
                Talk to Your Brain
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              Natural language EEG lab notebook. Train pattern classifiers, analyze connectivity,
              compare sessions — all by talking to an AI copilot that reads your live brain signals.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Link
                href="https://github.com/pieeg-club/PiEEG-agent"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-cyan-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
              >
                <Code className="w-5 h-5" />
                View on GitHub
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <a
                href="https://discord.gg/neJ45FR6Sv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                Join Discord
              </a>
            </div>

            {/* Hero Video */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl aspect-video">
              <iframe
                src="https://www.youtube.com/embed/-rpmChKZnUA"
                title="PiEEG-agent demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demos */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">See It In Action</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Watch realistic conversations with your brain copilot — live demos auto-play as you scroll
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CHAT_DEMOS.map((demo) => (
              <ChatDemo key={demo.id} demo={demo} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Analysis Tools</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              All the capabilities of a neuroscience lab, accessible through conversation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:shadow-lg transition-shadow"
              >
                <div className={`inline-flex p-3 rounded-xl ${feature.bg} mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Quick Start */}
      <section className="py-24 bg-zinc-900 dark:bg-black text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Quick Start</h2>
            <p className="text-lg text-zinc-400">One command. No Node.js required.</p>
          </div>

          <div className="space-y-6">
            {/* Install */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-3 bg-zinc-800/50 border-b border-zinc-700">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium">Install</span>
                </div>
                <CopyButton text="curl -sSL https://raw.githubusercontent.com/pieeg-club/PiEEG-agent/main/install.sh | bash" />
              </div>
              <div className="p-6">
                <code className="text-sm text-cyan-400 font-mono">
                  curl -sSL https://raw.githubusercontent.com/pieeg-club/PiEEG-agent/main/install.sh
                  | bash
                </code>
              </div>
            </div>

            {/* Launch */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-3 bg-zinc-800/50 border-b border-zinc-700">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium">Launch Web Interface</span>
                </div>
                <CopyButton text="pieeg-agent web" />
              </div>
              <div className="p-6">
                <code className="text-sm text-purple-400 font-mono">pieeg-agent web</code>
                <p className="text-sm text-zinc-500 mt-3">
                  Open{" "}
                  <a
                    href="http://localhost:8000"
                    className="text-cyan-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    http://localhost:8000
                  </a>{" "}
                  for chat, live brain state cards, pattern training UI
                </p>
              </div>
            </div>

            {/* Test without hardware */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-3 bg-zinc-800/50 border-b border-zinc-700">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium">Test with Synthetic Data (No Hardware)</span>
                </div>
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-start gap-3">
                  <span className="text-zinc-500 text-sm">Terminal 1:</span>
                  <code className="text-sm text-green-400 font-mono flex-1">
                    pieeg-server --mock --lsl
                  </code>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-zinc-500 text-sm">Terminal 2:</span>
                  <code className="text-sm text-green-400 font-mono flex-1">pieeg-agent web</code>
                </div>
              </div>
            </div>
          </div>

          {/* What it does */}
          <div className="mt-8 p-6 rounded-xl bg-zinc-800/30 border border-zinc-800">
            <h3 className="font-semibold mb-3">What the installer does:</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                Creates Python virtual environment
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                Installs all dependencies
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                Sets up command-line launcher
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                Runs verification tests
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Architecture Highlight */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Built for Research</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Designed for neurofeedback research and UX prototyping — not clinical use
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
              <h3 className="font-semibold mb-2">Ingestion Never Blocks</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Dedicated LSL thread, ring buffer — no sample loss even if LLM is slow
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
              <h3 className="font-semibold mb-2">LLM Pulls, Never Pushed</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Tools request state on demand — token costs stay sane
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
              <h3 className="font-semibold mb-2">Language-Sized Representations</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Events, not voltage arrays — models reason about "focus_high", not floats
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
              <h3 className="font-semibold mb-2">Decoupled Layers</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Swap providers, run without LLM, test with mock — debuggable, testable,
                maintainable
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
              <h3 className="font-semibold mb-2">Safe by Default</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Dry-run, cooldown, audit log — AI can't spam device commands
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
              <h3 className="font-semibold mb-2">Provider Agnostic</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Anthropic, OpenAI, Groq, Ollama, LM Studio — your choice, your hardware
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Talk to Your Brain?</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Join researchers and makers building the future of brain-computer interfaces
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="https://github.com/pieeg-club/PiEEG-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-cyan-600 to-purple-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-200"
            >
              <Code className="w-6 h-6" />
              Get Started on GitHub
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="https://discord.gg/neJ45FR6Sv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors text-lg font-semibold"
            >
              <MessageSquare className="w-6 h-6" />
              Join Discord Community
            </a>
          </div>

          <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-500">
            Open source • CC BY-NC 4.0 License • Non-commercial use
          </p>
        </div>
      </section>
    </div>
  );
}
