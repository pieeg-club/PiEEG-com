"use client";

import { ArrowRight, Zap, Cpu, Terminal, ExternalLink, Play, Bluetooth, Usb, CircuitBoard, Radio, Copy, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const products = [
  {
    name: "IronBCI-32",
    tagline: "32-channel research-grade BCI",
    platform: "USB Serial • 921600 baud",
    badge: "32ch",
    spec: "500 Hz • 24-bit",
    icon: "usb",
    description:
      "High-density cortical mapping. 32 channels at 500 Hz. 4× AD7771 ADCs. FreeEEG protocol. Pure Python driver—no BrainFlow dependency.",
    featured: true,
  },
  {
    name: "IronBCI",
    tagline: "Wearable wireless BCI",
    platform: "Bluetooth LE • Standalone",
    badge: "8ch BLE",
    spec: "250 Hz • 24-bit",
    icon: "bluetooth",
    description:
      "Untethered biosignals. 8 channels over BLE. Walk, move, live—your data follows you. STM32 + ADS1299 ADC.",
    featured: false,
  },
  {
    name: "PiEEG-16",
    tagline: "16-channel Pi shield",
    platform: "Raspberry Pi 4 / 5 • SPI",
    badge: "16ch",
    spec: "250 Hz • 24-bit",
    icon: "circuit",
    description:
      "The flagship. Real-time 16-channel acquisition. 2× ADS1299 ADCs. Powered by pieeg-server. One command—live dashboard in your browser.",
    featured: true,
  },
  {
    name: "PiEEG",
    tagline: "8-channel Pi shield",
    platform: "Raspberry Pi • SPI",
    badge: "8ch",
    spec: "250 Hz • 24-bit",
    icon: "circuit",
    description:
      "Where it started. The original open-source shield. 8 channels, ADS1299 ADC, SPI interface, proven in labs worldwide.",
    featured: false,
  },
  {
    name: "ardEEG",
    tagline: "Arduino biosignal shield",
    platform: "Arduino • SPI",
    badge: "Arduino",
    spec: "8 channels",
    icon: "circuit",
    description:
      "BCI for the Arduino ecosystem. Same ADS1299 precision. Sketch-friendly. Perfect for embedded projects.",
    featured: false,
  },
  {
    name: "JNEEG",
    tagline: "Jetson Nano AI shield",
    platform: "NVIDIA Jetson Nano • SPI",
    badge: "GPU ML",
    spec: "1 µV noise",
    icon: "cpu",
    description:
      "Neural networks meet neural signals. Stream EEG directly into TensorFlow. Real-time inference on-device.",
    featured: false,
  },
  {
    name: "MicroBCI",
    tagline: "STM32 embedded shield",
    platform: "STM32 NUCLEO-WB55",
    badge: "STM32",
    spec: "Low power",
    icon: "radio",
    description:
      "Bare-metal BCI. Ultra-low-power STM32. Build custom firmware from scratch. Total hardware control.",
    featured: false,
  },
];

const signals = [
  {
    abbr: "EEG",
    name: "Electroencephalography",
    color: "cyan",
    description:
      "Neural oscillations. δ θ α β γ bands. Consciousness, attention, sleep architecture—measured at the scalp.",
  },
  {
    abbr: "EMG",
    name: "Electromyography",
    color: "blue",
    description:
      "Muscle activation potentials. Motor unit firing. Build myoelectric prosthetics, gesture interfaces.",
  },
  {
    abbr: "ECG",
    name: "Electrocardiography",
    color: "rose",
    description:
      "Cardiac waveforms. QRS complex, P-wave, T-wave. Heart rate variability for autonomic state analysis.",
  },
  {
    abbr: "EOG",
    name: "Electrooculography",
    color: "violet",
    description:
      "Ocular artifact signals. Saccades, blinks, gaze shifts. Eye-controlled UI or artifact rejection.",
  },
];

const featuredIn = [
  { name: "Tom's Hardware", logo: "Tom's Hardware" },
  { name: "IEEE Spectrum", logo: "IEEE Spectrum" },
  { name: "VICE", logo: "VICE" },
  { name: "Raspberry Pi", logo: "Raspberry Pi" },
  { name: "Hackaday", logo: "Hackaday" },
  { name: "Hackster.io", logo: "Hackster.io" },
];

const features = [
  {
    Icon: Terminal,
    title: "One Line. Live Dashboard.",
    description:
      "pip install pieeg-server. That's it. Auto-detects your hardware, starts streaming. WebSocket API—plain JSON. No SDK bloat. Works on Pi, Linux, macOS, Windows.",
  },
  {
    Icon: Cpu,
    title: "Medical-Grade ADCs.",
    description:
      "24-bit delta-sigma converters (ADS1299, AD7771). 1 µV resolution. The same chips in $10,000 systems. Published schematics, clean layout. Build it yourself or buy ready-made.",
  },
  {
    Icon: Zap,
    title: "Open. Hackable. Proven.",
    description:
      "MIT/AGPL licensed. Full source on GitHub. Cited in peer-reviewed research. Used in universities, hackerspaces, clinical trials. No proprietary lock-in. Ever.",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function EEGVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [mode, setMode] = useState<'eeg' | 'emg' | 'ecg' | 'eog'>('eeg');
  const modeRef = useRef(mode);
  
  // Data buffers for 4 channels
  const buffersRef = useRef<Float32Array[]>([
    new Float32Array(500),
    new Float32Array(500),
    new Float32Array(500),
    new Float32Array(500),
  ]);
  const writeIndexRef = useRef(0);
  const timeRef = useRef(0);

  // Update mode ref when mode changes (without restarting animation)
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  // Signal generation function
  const generateSample = useRef((channel: number, t: number, signalMode: string): number => {
    if (signalMode === 'eeg') {
      // Electroencephalography - brain waves (alpha, beta rhythms)
      return (Math.sin(t * 0.02 + channel) * 8 + Math.cos(t * 0.01) * 5) + (Math.random() - 0.5) * 2;
    } else if (signalMode === 'ecg') {
      // Electrocardiography - heart activity
      const bpm = 72;
      const beatInterval = (60 / bpm) * 250; // samples per beat at 250 Hz
      const phase = (t % beatInterval) / beatInterval;
      
      if (phase < 0.1) {
        // P wave
        return Math.sin(phase * Math.PI * 10) * 15;
      } else if (phase > 0.15 && phase < 0.25) {
        // QRS complex
        const qrsPhase = (phase - 0.15) / 0.1;
        return Math.sin(qrsPhase * Math.PI) * 40 * (channel === 1 ? 1.2 : 1);
      } else if (phase > 0.3 && phase < 0.45) {
        // T wave
        return Math.sin((phase - 0.3) * Math.PI * 6.67) * 20;
      }
      return (Math.random() - 0.5) * 3;
    } else if (signalMode === 'emg') {
      // Electromyography - muscle activity with bursts
      const base = Math.sin(t * 0.03 + channel) * 5;
      return base + (Math.random() < 0.02 ? (Math.random() - 0.5) * 60 : 0);
    } else if (signalMode === 'eog') {
      // Electrooculography - eye movements (saccades and blinks)
      const blinkInterval = 4 * 250; // blink every ~4 seconds
      const blinkPhase = (t % blinkInterval) / blinkInterval;
      
      // Occasional blinks
      if (blinkPhase < 0.05) {
        return Math.sin(blinkPhase * Math.PI * 20) * 50;
      }
      
      // Saccadic movements
      const saccadeBase = Math.floor(t / 100) * 100;
      if (t - saccadeBase < 25) {
        return ((t - saccadeBase) / 25) * 30 * (Math.random() > 0.5 ? 1 : -1);
      }
      
      return Math.sin(t * 0.01) * 8 + (Math.random() - 0.5) * 3;
    }
    return 0;
  }).current;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Detect dark mode
    const isDark = document.documentElement.classList.contains('dark');
    
    // Set CSS variables for colors
    canvas.style.setProperty('--canvas-bg', isDark ? 'rgba(24, 24, 27, 0.5)' : '#fafafa');
    canvas.style.setProperty('--canvas-grid', isDark ? 'rgba(63, 63, 70, 0.5)' : 'rgba(0,0,0,0.05)');
    canvas.style.setProperty('--canvas-text', isDark ? 'rgba(113, 113, 122, 1)' : 'rgba(0,0,0,0.4)');

    // Set canvas resolution
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const channelHeight = h / 4;

    const draw = () => {
      // Clear
      ctx.fillStyle = getComputedStyle(canvas).getPropertyValue('--canvas-bg') || '#fafafa';
      ctx.fillRect(0, 0, w, h);

      // Generate multiple samples per frame for faster scrolling (simulate 250 Hz at 60fps)
      const samplesPerFrame = 4;
      const currentMode = modeRef.current;
      
      for (let s = 0; s < samplesPerFrame; s++) {
        timeRef.current++;
        const writeIdx = writeIndexRef.current;
        
        for (let ch = 0; ch < 4; ch++) {
          buffersRef.current[ch][writeIdx] = generateSample(ch, timeRef.current, currentMode);
        }
        
        writeIndexRef.current = (writeIdx + 1) % 500;
      }

      // Draw each channel
      const colors = ['rgb(20, 184, 166)', 'rgb(59, 130, 246)', 'rgb(168, 85, 247)', 'rgb(236, 72, 153)'];
      const labels = ['C3', 'Cz', 'C4', 'Pz'];

      for (let ch = 0; ch < 4; ch++) {
        const yOffset = ch * channelHeight + channelHeight / 2;
        const buffer = buffersRef.current[ch];

        // Grid line
        ctx.strokeStyle = getComputedStyle(canvas).getPropertyValue('--canvas-grid') || 'rgba(0,0,0,0.05)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, yOffset);
        ctx.lineTo(w, yOffset);
        ctx.stroke();

        // Channel label
        ctx.fillStyle = getComputedStyle(canvas).getPropertyValue('--canvas-text') || 'rgba(0,0,0,0.4)';
        ctx.font = '10px ui-monospace, monospace';
        ctx.fillText(labels[ch], 8, yOffset - channelHeight / 2 + 14);

        // Waveform - continuous scrolling
        ctx.strokeStyle = colors[ch];
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();

        const pixelsPerSample = w / 500;
        let started = false;
        const currentWriteIdx = writeIndexRef.current;

        for (let i = 0; i < 500; i++) {
          const idx = (currentWriteIdx - 500 + i + 1 + 500) % 500;
          const value = buffer[idx];
          
          // Skip uninitialized samples (first few frames)
          if (timeRef.current < 500 && idx > currentWriteIdx) continue;
          
          const x = i * pixelsPerSample;
          const y = yOffset - value * 1.5;
          
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    // Start animation immediately
    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []); // Empty deps - only run once on mount

  return (
    <div className="relative w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-xl">
      {/* Synthetic Data Badge */}
      <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span className="text-[10px] font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide">
          Demo Mode • Synthetic Data
        </span>
      </div>

      {/* Canvas */}
      <canvas 
        ref={canvasRef}
        className="w-full h-64"
        style={{ display: 'block' }}
      />

      {/* Interactive Controls */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('eeg')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              mode === 'eeg'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            EEG
          </button>
          <button
            onClick={() => setMode('ecg')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              mode === 'ecg'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            ECG
          </button>
          <button
            onClick={() => setMode('emg')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              mode === 'emg'
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            EMG
          </button>
          <button
            onClick={() => setMode('eog')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              mode === 'eog'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            EOG
          </button>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span className="font-mono">250 Hz</span>
          <span>•</span>
          <span>4 ch</span>
        </div>
      </div>
    </div>
  );
}

function SignalWave() {
  const path =
    "M0,32 L20,32 L26,32 L30,8 L34,56 L38,20 L42,32 L80,32 L86,30 L90,44 L94,18 L98,32 L140,32 L145,16 L149,48 L153,32 L190,32 L196,32 L201,20 L206,44 L211,32 L260,32 L268,28 L274,38 L280,32 L330,32 L335,32 L339,4 L343,60 L347,26 L351,38 L355,32 L410,32 L417,32 L421,22 L425,42 L429,32 L480,32 L486,30 L490,34 L494,32 L550,32 L556,32 L560,10 L564,54 L568,24 L572,40 L576,32 L630,32 L636,30 L642,38 L648,26 L654,32 L700,32 L706,32 L710,20 L714,44 L718,32 L760,32 L766,30 L770,34 L774,32 L800,32";

  return (
    <div
      className="relative w-full h-10 overflow-hidden pointer-events-none select-none"
      aria-hidden
    >
      <div className="signal-scroll absolute top-0 left-0 flex" style={{ width: "200%" }}>
        <svg
          viewBox="0 0 800 64"
          className="h-10 shrink-0"
          style={{ width: "50%" }}
          preserveAspectRatio="none"
        >
          <path d={path} strokeWidth="1.5" fill="none" className="stroke-cyan-400/50 dark:stroke-cyan-400/40" />
        </svg>
        <svg
          viewBox="0 0 800 64"
          className="h-10 shrink-0"
          style={{ width: "50%" }}
          preserveAspectRatio="none"
        >
          <path d={path} strokeWidth="1.5" fill="none" className="stroke-cyan-400/50 dark:stroke-cyan-400/40" />
        </svg>
      </div>
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center overflow-hidden min-h-[calc(100svh-3.5rem)] px-4 bg-gradient-to-b from-white via-zinc-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px'
      }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-12 max-w-6xl mx-auto py-20">

        {/* Headline */}
        <div className="flex flex-col gap-5">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-zinc-900 dark:text-zinc-50">
            Brain-Computer<br />
            Interface
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400">
            Open-source • Research & Education • Real-time
          </p>
        </div>

        {/* EEG Visualization */}
        <div className="w-full max-w-4xl">
          <EEGVisualization />
        </div>

        {/* Install command */}
        <div className="flex flex-col gap-3 items-center">
          <code className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-mono text-sm border border-zinc-200 dark:border-zinc-800">
            pip install pieeg-server
          </code>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            250–500 Hz • 8–32 channels • ADS1299 & AD7771
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-600 max-w-2xl">
            Not a medical device • For research, education & development purposes
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://pieeg.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 h-12 bg-cyan-500 dark:bg-cyan-400 px-8 text-sm font-semibold text-white dark:text-zinc-950 hover:bg-cyan-600 dark:hover:bg-cyan-300 transition-colors rounded-lg"
          >
            <Play className="w-4 h-4" />
            View Live Demo
          </a>
          <a
            href="https://github.com/pieeg-club/PiEEG-server"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 h-12 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-8 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors rounded-lg"
          >
            <GitHubIcon className="w-4 h-4" />
            GitHub
          </a>
        </div>

        {/* Featured In */}
        <div className="flex flex-col items-center gap-6 w-full pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
            Featured In
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center w-full max-w-5xl">
            {featuredIn.map(({ name, logo }) => (
              <div
                key={name}
                className="group relative flex items-center justify-center px-4 py-2 transition-all duration-300 hover:scale-110"
              >
                <span className="text-sm md:text-base font-semibold text-zinc-400 dark:text-white group-hover:text-zinc-700 dark:group-hover:text-zinc-100 transition-colors duration-300 whitespace-nowrap">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function FeaturedInBar() {
  return (
    <div className="border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Label */}
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
            Featured In
          </p>
          
          {/* Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center w-full">
            {featuredIn.map(({ name, logo }) => (
              <div
                key={name}
                className="group relative flex items-center justify-center px-4 py-2 transition-all duration-300 hover:scale-110"
              >
                <span className="text-sm md:text-base font-semibold text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-zinc-400 transition-colors duration-300 whitespace-nowrap">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsSection() {
  const iconMap = {
    usb: Usb,
    bluetooth: Bluetooth,
    circuit: CircuitBoard,
    cpu: Cpu,
    radio: Radio,
  };

  return (
    <section id="products" className="py-24 px-4">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-14 flex flex-col gap-3 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500 dark:text-cyan-400">
            Hardware
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
            A board for every platform.
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            From Raspberry Pi to Arduino to Jetson Nano — all powered by Pieeg-server. 
            One-line install on any platform. Start streaming biosignals instantly.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => {
            const IconComponent = iconMap[product.icon as keyof typeof iconMap] || CircuitBoard;
            return (
              <a
                key={product.name}
                href="#"
                className={[
                  "group relative flex flex-col gap-4 rounded-xl border p-6 transition-all duration-200",
                  product.featured
                    ? "border-cyan-400/60 dark:border-cyan-400/40 bg-cyan-50/40 dark:bg-cyan-950/20 hover:border-cyan-500 dark:hover:border-cyan-400"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/70",
                ].join(" ")}
              >
                {/* Icon & Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={[
                      "flex items-center justify-center w-10 h-10 rounded-lg border",
                      product.featured
                        ? "bg-cyan-100 dark:bg-cyan-900/50 border-cyan-200/60 dark:border-cyan-800/40 text-cyan-600 dark:text-cyan-400"
                        : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400",
                    ].join(" ")}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span
                      className={[
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md",
                        product.featured
                          ? "bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400",
                      ].join(" ")}
                    >
                      {product.badge}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors shrink-0 mt-0.5" />
                </div>

                {/* Name + tagline */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-mono text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                    {product.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
                  {product.description}
                </p>

                {/* Bottom */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                    {product.spec}
                  </span>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
                    {product.platform}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function SignalsSection() {
  const [hoveredSignal, setHoveredSignal] = useState<string | null>(null);

  const signalPaths: Record<string, string> = {
    EEG: "M0,20 Q5,10 10,20 T20,20 Q25,15 30,20 T40,20 Q45,25 50,20 T60,20 Q65,18 70,20 T80,20",
    EMG: "M0,20 L15,20 L15.5,5 L16,35 L16.5,8 L17,32 L17.5,12 L18,28 L20,20 L35,20 L35.5,3 L36,37 L36.5,10 L37,30 L37.5,15 L38,25 L40,20 L55,20 L55.5,7 L56,33 L56.5,13 L57,27 L60,20 L75,20 L75.5,6 L76,34 L76.5,11 L77,29 L80,20",
    ECG: "M0,20 L20,20 L22,18 L24,20 L26,15 L28,35 L30,18 L32,20 L35,25 L38,20 L60,20 L62,18 L64,20 L66,15 L68,35 L70,18 L72,20 L75,25 L78,20",
    EOG: "M0,20 Q10,20 15,8 T25,20 Q35,20 40,32 T50,20 Q60,20 65,12 T75,20",
  };

  const colorMap: Record<string, { 
    card: string;
    accent: string;
    glow: string;
    path: string;
  }> = {
    cyan: {
      card: "bg-gradient-to-br from-cyan-50/80 to-cyan-100/50 dark:from-cyan-950/20 dark:to-cyan-900/10 border-cyan-200/60 dark:border-cyan-800/30",
      accent: "bg-cyan-500/10 dark:bg-cyan-400/10 border-cyan-300/50 dark:border-cyan-700/50",
      glow: "shadow-cyan-500/20",
      path: "stroke-cyan-400/60 dark:stroke-cyan-400/40"
    },
    blue: {
      card: "bg-gradient-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10 border-blue-200/60 dark:border-blue-800/30",
      accent: "bg-blue-500/10 dark:bg-blue-400/10 border-blue-300/50 dark:border-blue-700/50",
      glow: "shadow-blue-500/20",
      path: "stroke-blue-400/60 dark:stroke-blue-400/40"
    },
    rose: {
      card: "bg-gradient-to-br from-rose-50/80 to-rose-100/50 dark:from-rose-950/20 dark:to-rose-900/10 border-rose-200/60 dark:border-rose-800/30",
      accent: "bg-rose-500/10 dark:bg-rose-400/10 border-rose-300/50 dark:border-rose-700/50",
      glow: "shadow-rose-500/20",
      path: "stroke-rose-400/60 dark:stroke-rose-400/40"
    },
    violet: {
      card: "bg-gradient-to-br from-violet-50/80 to-violet-100/50 dark:from-violet-950/20 dark:to-violet-900/10 border-violet-200/60 dark:border-violet-800/30",
      accent: "bg-violet-500/10 dark:bg-violet-400/10 border-violet-300/50 dark:border-violet-700/50",
      glow: "shadow-violet-500/20",
      path: "stroke-violet-400/60 dark:stroke-violet-400/40"
    },
  };

  return (
    <section
      id="signals"
      className="py-24 px-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-16 flex flex-col gap-4 max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500 dark:text-cyan-400">
            Biosignals
          </p>
          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            One platform.<br />Four biosignals.
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Every PiEEG board is designed to capture the full spectrum of the
            human body&apos;s electrical activity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signals.map((signal) => {
            const colors = colorMap[signal.color];
            const isHovered = hoveredSignal === signal.abbr;
            
            return (
              <div
                key={signal.abbr}
                onMouseEnter={() => setHoveredSignal(signal.abbr)}
                onMouseLeave={() => setHoveredSignal(null)}
                className={`group relative flex flex-col gap-6 rounded-2xl border p-6 transition-all duration-300 ${colors.card} ${
                  isHovered ? `shadow-2xl ${colors.glow} scale-[1.02] -translate-y-1` : 'shadow-md hover:shadow-xl'
                }`}
              >
                {/* Signal wave decoration */}
                <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden opacity-40 rounded-t-2xl">
                  <svg
                    viewBox="0 0 80 40"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d={signalPaths[signal.abbr]}
                      fill="none"
                      strokeWidth="2"
                      className={`${colors.path} transition-all duration-300 ${
                        isHovered ? 'stroke-[2.5]' : ''
                      }`}
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative flex flex-col gap-5 pt-8">
                  {/* Abbreviation badge */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl border ${colors.accent} transition-all duration-300 ${
                    isHovered ? 'scale-110' : ''
                  }`}>
                    <span className={`font-mono text-2xl font-black tracking-tight ${
                      signal.color === 'cyan' ? 'text-cyan-600 dark:text-cyan-400' :
                      signal.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      signal.color === 'rose' ? 'text-rose-600 dark:text-rose-400' :
                      'text-violet-600 dark:text-violet-400'
                    }`}>
                      {signal.abbr}
                    </span>
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                      {signal.name}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {signal.description}
                    </p>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                } ${
                  signal.color === 'cyan' ? 'bg-gradient-to-r from-cyan-400 to-cyan-600' :
                  signal.color === 'blue' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                  signal.color === 'rose' ? 'bg-gradient-to-r from-rose-400 to-rose-600' :
                  'bg-gradient-to-r from-violet-400 to-violet-600'
                }`} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl">

        <div className="mb-14 flex flex-col gap-3 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500 dark:text-cyan-400">
            Why PiEEG
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
            The simplest approach<br />to neuroscience.
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Powered by Pieeg-server. One-line install eliminates complexity. 
            No proprietary lock-in, no expensive subscriptions — just hardware 
            that works and software you control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-7"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/60 dark:border-cyan-800/40 text-cyan-600 dark:text-cyan-400">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function FeaturedSection() {
  const publications = [
    "Tom's Hardware",
    "IEEE Spectrum",
    "VICE",
    "Raspberry Pi",
    "Hackaday",
    "Electronics Weekly",
    "Hackster.io",
    "Arduino",
    "CNX Software",
  ];

  return (
    <section className="py-24 px-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 neural-bg">
      <div className="mx-auto max-w-7xl">
        
        <div className="flex flex-col items-center text-center gap-12">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-blue-500 dark:text-blue-400">
                [RECOGNITION]
              </p>
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
              Featured in 28+ media and podcasts
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Recognized by leading tech publications and cited in scientific research worldwide.{" "}
              <a 
                href="https://www.google.com/search?q=pieeg&tbm=nws" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-mono text-sm"
              >
                [view_coverage]
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          {/* Publication logos grid */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
            {publications.map((pub, idx) => (
              <div
                key={pub}
                className="group relative clip-corner-sm"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center h-20 px-4 border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/40 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200">
                  <span className="font-medium text-sm text-center text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                    {pub}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Scientific citations */}
          <div className="w-full max-w-4xl">
            <div className="relative hex-border clip-corner">
              <div className="rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-gradient-to-br from-cyan-50/80 via-blue-50/50 to-purple-50/30 dark:from-cyan-950/20 dark:via-blue-950/20 dark:to-purple-950/10 backdrop-blur-sm px-8 py-6">
                <p className="text-base text-zinc-700 dark:text-zinc-300 text-center leading-relaxed font-mono">
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400">
                    Cited in 11+ scientific papers
                  </span>
                  {" "}— Used in universities, research labs, and hackerspaces worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function CtaSection() {
  const [copied, setCopied] = useState(false);
  const installCommand = "pip install pieeg-server";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-4 border-t border-zinc-200 dark:border-zinc-800 neural-bg wave-pattern">
      <div className="mx-auto max-w-4xl flex flex-col items-center text-center gap-10">

        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-500 dark:text-cyan-400">
              [INIT_SEQUENCE]
            </p>
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
            One install command.<br />Live in 60 seconds.
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Install pieeg-server, connect your hardware, and start streaming brainwaves to your browser instantly.
          </p>
        </div>

        {/* Install Code Block */}
        <div className="w-full max-w-2xl">
          <div className="relative hex-border clip-corner">
            <div className="rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900/80 overflow-hidden signal-glow backdrop-blur-sm">
              {/* Terminal chrome */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <span className="ml-2 text-xs font-mono text-zinc-400 dark:text-zinc-600">
                    ~/pieeg
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 transition-all duration-200"
                  aria-label="Copy command"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      copy
                    </>
                  )}
                </button>
              </div>
              {/* Code */}
              <div className="px-5 py-6 bg-gradient-to-br from-white via-white to-cyan-50/30 dark:from-zinc-900/80 dark:via-zinc-900/80 dark:to-cyan-950/20">
                <pre className="text-sm font-mono leading-relaxed">
                  <code>
                    <span className="text-purple-500 dark:text-purple-400">❯ </span>
                    <span className="text-zinc-800 dark:text-zinc-100 font-semibold">{installCommand}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
          
          {/* Quick steps */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 clip-corner-sm">
                <div className="flex items-center justify-center w-7 h-7 rounded bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 text-white text-xs font-bold font-mono flex-shrink-0">
                  01
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-mono">INSTALL</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">One pip command</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 clip-corner-sm">
                <div className="flex items-center justify-center w-7 h-7 rounded bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white text-xs font-bold font-mono flex-shrink-0">
                  02
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-mono">CONNECT</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">Auto-detects hardware</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 clip-corner-sm">
                <div className="flex items-center justify-center w-7 h-7 rounded bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 text-white text-xs font-bold font-mono flex-shrink-0">
                  03
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-mono">STREAM</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">Live in your browser</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://pieeg.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400 px-6 text-sm font-semibold text-white dark:text-zinc-950 hover:shadow-lg hover:scale-105 transition-all duration-200 clip-corner-sm"
          >
            <Play className="w-4 h-4" />
            Try Live Demo
          </a>
          <a
            href="https://pieeg-server-doc.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 h-12 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 px-6 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors clip-corner-sm"
          >
            Read Documentation
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://pieeg.com/shop"
            className="flex items-center gap-2 h-12 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 px-6 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors clip-corner-sm"
          >
            Shop Hardware
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono">
          // Not a medical device. For research and engineering purposes only.
        </p>

      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProductsSection />
        <SignalsSection />
        <FeaturesSection />
        <FeaturedSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

