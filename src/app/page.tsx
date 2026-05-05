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
    slug: "ironbci-32",
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
    slug: "ironbci",
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
    slug: "pieeg-16",
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
    slug: "pieeg",
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
    slug: "ardeeg",
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
    slug: "jneeg",
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
    slug: "microbci",
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
    title: "Research-Grade ADCs.",
    description:
      "24-bit delta-sigma converters (ADS1299, AD7771). 1 µV resolution. The same chips in $10,000 systems. Published schematics, clean layout. Build it yourself or buy ready-made.",
  },
  {
    Icon: Zap,
    title: "Open. Hackable. Proven.",
    description:
      "MIT/AGPL licensed. Full source on GitHub. Cited in peer-reviewed research. Used in universities, makerspaces, and research labs worldwide. No proprietary lock-in. Ever.",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

// Mini signal streaming component for signal cards
function MiniSignalCanvas({ mode, isActive, color }: { mode: 'eeg' | 'emg' | 'ecg' | 'eog', isActive: boolean, color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const bufferRef = useRef<Float32Array>(new Float32Array(200));
  const writeIndexRef = useRef(0);
  const timeRef = useRef(0);

  const generateSample = useRef((t: number, signalMode: string): number => {
    if (signalMode === 'eeg') {
      return (Math.sin(t * 0.02) * 8 + Math.cos(t * 0.01) * 5) + (Math.random() - 0.5) * 2;
    } else if (signalMode === 'ecg') {
      const bpm = 72;
      const beatInterval = (60 / bpm) * 250;
      const phase = (t % beatInterval) / beatInterval;
      
      if (phase < 0.1) return Math.sin(phase * Math.PI * 10) * 15;
      if (phase > 0.15 && phase < 0.25) {
        const qrsPhase = (phase - 0.15) / 0.1;
        return Math.sin(qrsPhase * Math.PI) * 40;
      }
      if (phase > 0.3 && phase < 0.45) return Math.sin((phase - 0.3) * Math.PI * 6.67) * 20;
      return (Math.random() - 0.5) * 3;
    } else if (signalMode === 'emg') {
      const base = Math.sin(t * 0.03) * 5;
      return base + (Math.random() < 0.02 ? (Math.random() - 0.5) * 60 : 0);
    } else if (signalMode === 'eog') {
      const blinkInterval = 4 * 250;
      const blinkPhase = (t % blinkInterval) / blinkInterval;
      
      if (blinkPhase < 0.05) return Math.sin(blinkPhase * Math.PI * 20) * 50;
      
      const saccadeBase = Math.floor(t / 100) * 100;
      if (t - saccadeBase < 25) return ((t - saccadeBase) / 25) * 30 * (Math.random() > 0.5 ? 1 : -1);
      
      return Math.sin(t * 0.01) * 8 + (Math.random() - 0.5) * 3;
    }
    return 0;
  }).current;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      if (!isActive) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      const samplesPerFrame = 3;
      
      for (let s = 0; s < samplesPerFrame; s++) {
        timeRef.current++;
        const writeIdx = writeIndexRef.current;
        bufferRef.current[writeIdx] = generateSample(timeRef.current, mode);
        writeIndexRef.current = (writeIdx + 1) % 200;
      }

      const colorMap: Record<string, string> = {
        cyan: 'rgba(20, 184, 166, 0.8)',
        blue: 'rgba(59, 130, 246, 0.8)',
        rose: 'rgba(244, 63, 94, 0.8)',
        violet: 'rgba(139, 92, 246, 0.8)',
      };

      ctx.strokeStyle = colorMap[color] || 'rgba(20, 184, 166, 0.8)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();

      const pixelsPerSample = w / 200;
      let started = false;
      const currentWriteIdx = writeIndexRef.current;

      for (let i = 0; i < 200; i++) {
        const idx = (currentWriteIdx - 200 + i + 1 + 200) % 200;
        const value = bufferRef.current[idx];
        
        if (timeRef.current < 200 && idx > currentWriteIdx) continue;
        
        const x = i * pixelsPerSample;
        const y = h / 2 - value * 0.8;
        
        if (!started) {
          ctx.moveTo(x, y);
          started = true;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mode, isActive, color, generateSample]);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

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
      const beatInterval = (60 / bpm) * 250; // samples per beat (at typical 250 Hz)
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

      // Generate multiple samples per frame for faster scrolling (250–500 Hz at 60fps)
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
          <span className="font-mono">250–500 Hz</span>
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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("pip install pieeg-server");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center overflow-hidden min-h-[calc(100svh-3.5rem)] px-4">
      
      {/* Background images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Light theme background */}
        <div 
          className="absolute inset-0 bg-no-repeat dark:hidden"
          style={{ 
            backgroundImage: 'url(/hero-bg-light.png)',
            backgroundPosition: 'right 0 bottom 0',
            backgroundSize: '100%',
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,1) 60%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,1) 60%)',
          }}
        />
        {/* Dark theme background */}
        <div 
          className="hidden dark:block absolute inset-0 bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/hero-bg-dark.png)',
            backgroundPosition: 'right 0 bottom 0',
            backgroundSize: '100%',
            opacity: 0.4,
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,1) 60%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,1) 60%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl mx-auto py-12">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200/60 dark:border-cyan-800/40 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm shadow-lg shadow-cyan-500/10">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">[Open Source]</span>
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-zinc-900 dark:text-zinc-50">
            Stream brain signals
            <br />
            <span className="bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 bg-clip-text text-transparent">
              in 60 seconds
            </span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Open-source neuroscience hardware. Real-time EEG, EMG, ECG, EOG on Raspberry Pi, Arduino, and more. One pip install. Zero lock-in.
          </p>
        </div>

        {/* Terminal mockup with install command */}
        <div className="w-full max-w-2xl mt-4">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-300"></div>
            
            {/* Terminal */}
            <div className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl">
              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2">terminal</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-xs font-medium text-zinc-600 dark:text-zinc-400"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              
              {/* Terminal content */}
              <div className="px-6 py-6 bg-white dark:bg-zinc-950">
                <div className="flex items-center gap-2 font-mono text-sm sm:text-base">
                  <span className="text-purple-500 dark:text-purple-400">$</span>
                  <span className="text-zinc-900 dark:text-zinc-100">pip install pieeg-server</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-step process */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mt-6">
          <div className="flex flex-col items-center gap-3 p-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/30">
              1
            </div>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">Install</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">One pip command</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 p-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white font-bold shadow-lg shadow-blue-500/30">
              2
            </div>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">Connect</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Auto-detects hardware</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 p-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 text-white font-bold shadow-lg shadow-purple-500/30">
              3
            </div>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">Stream</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Live in your browser</p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <a
            href="https://cloud.pieeg.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 h-12 bg-linear-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 px-6 text-sm font-semibold text-white dark:text-zinc-950 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-200 rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Play className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Try Live Demo</span>
          </a>
          <a
            href="https://pieeg-server-doc.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 h-12 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 rounded-lg"
          >
            Documentation
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://pieeg.com/pieeg-shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 h-12 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 rounded-lg"
          >
            Shop Hardware
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Legal disclaimer */}
        <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-6 font-mono">
          // Not a medical device. For research and engineering purposes only.
        </p>

        {/* Stats moved to bottom */}
        <div className="grid grid-cols-3 gap-12 w-full max-w-2xl mt-8 pt-8 border-t border-zinc-200/50 dark:border-zinc-800/50">
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-3xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              28+
            </div>
            <div className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 text-center uppercase tracking-wide">
              Media features
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              11+
            </div>
            <div className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 text-center uppercase tracking-wide">
              Scientific papers
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              7
            </div>
            <div className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 text-center uppercase tracking-wide">
              Hardware platforms
            </div>
          </div>
        </div>

      </div>

      {/* Featured In Section */}
      <div className="relative z-10 w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-hidden mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center gap-6">
            {/* Label */}
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
              Featured In
            </p>
            
            {/* Animated Scrolling Logos */}
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-12 md:gap-16 animate-scroll-slow hover:[animation-play-state:paused]">
                {[...featuredIn, ...featuredIn].map(({ name, logo }, index) => (
                  <div
                    key={`${name}-${index}`}
                    className="group relative flex items-center justify-center px-4 py-2 transition-all duration-300 hover:scale-110 shrink-0"
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
      </div>
    </section>
  );
}

function FeaturedInBar() {
  // Duplicate the array for seamless infinite scroll
  const duplicatedLogos = [...featuredIn, ...featuredIn];
  
  return (
    <div className="border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Label */}
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
            Featured In
          </p>
          
          {/* Animated Scrolling Logos */}
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-12 md:gap-16 animate-scroll-slow hover:[animation-play-state:paused]">
              {duplicatedLogos.map(({ name, logo }, index) => (
                <div
                  key={`${name}-${index}`}
                  className="group relative flex items-center justify-center px-4 py-2 transition-all duration-300 hover:scale-110 shrink-0"
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
    <section id="products" className="py-32 px-4 bg-linear-to-b from-white via-zinc-50/50 to-white dark:from-zinc-950 dark:via-zinc-900/50 dark:to-zinc-950">
      <div className="mx-auto max-w-7xl">

        {/* Header - Centered */}
        <div className="mb-20 flex flex-col gap-5 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 mx-auto">
            <div className="h-px w-8 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              Hardware Platforms
            </p>
            <div className="h-px w-8 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Your platform.<br />Our hardware.
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            From Raspberry Pi to Arduino to Jetson Nano — all powered by one unified server. 
            Deploy on any platform with a single command.
          </p>
        </div>

        {/* Featured Products - Large Cards */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {products.filter(p => p.featured).map((product) => {
            const IconComponent = iconMap[product.icon as keyof typeof iconMap] || CircuitBoard;
            return (
              <a
                key={product.name}
                href={`/hardware/${product.slug}`}
                className="group relative flex flex-col gap-6 rounded-2xl border-2 border-cyan-200/60 dark:border-cyan-800/40 bg-linear-to-br from-cyan-50/80 via-white to-blue-50/50 dark:from-cyan-950/20 dark:via-zinc-900/40 dark:to-blue-950/20 p-8 hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 text-white shadow-lg shadow-cyan-500/30">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-mono text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                          {product.name}
                        </h3>
                        <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                          {product.tagline}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1.5 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-widest">
                      {product.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Specs */}
                  <div className="flex items-center justify-between gap-4 pt-6 border-t border-cyan-200/60 dark:border-cyan-800/40">
                    <div className="flex flex-col gap-1">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">Performance</div>
                      <div className="text-sm font-mono font-semibold text-zinc-900 dark:text-zinc-100">{product.spec}</div>
                    </div>
                    <div className="flex flex-col gap-1 text-right">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">Platform</div>
                      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{product.platform.split('•')[0].trim()}</div>
                    </div>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Other Products - Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {products.filter(p => !p.featured).map((product) => {
            const IconComponent = iconMap[product.icon as keyof typeof iconMap] || CircuitBoard;
            return (
              <a
                key={product.name}
                href={`/hardware/${product.slug}`}
                className="group relative flex flex-col gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-xl hover:shadow-zinc-500/10 transition-all duration-200"
              >
                {/* Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 group-hover:bg-cyan-100 group-hover:border-cyan-300 group-hover:text-cyan-600 dark:group-hover:bg-cyan-900/30 dark:group-hover:border-cyan-700 dark:group-hover:text-cyan-400 transition-all">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                    {product.badge}
                  </span>
                </div>

                {/* Name */}
                <div>
                  <h3 className="font-mono text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {product.tagline}
                  </p>
                </div>

                {/* Spec */}
                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {product.spec}
                  </div>
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

  const colorMap: Record<string, { 
    card: string;
    accent: string;
    glow: string;
    gradient: string;
  }> = {
    cyan: {
      card: "bg-linear-to-br from-cyan-50/80 to-cyan-100/50 dark:from-cyan-950/20 dark:to-cyan-900/10 border-cyan-200/60 dark:border-cyan-800/30",
      accent: "bg-linear-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500",
      glow: "shadow-cyan-500/20",
      gradient: "from-cyan-400 to-cyan-600"
    },
    blue: {
      card: "bg-linear-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10 border-blue-200/60 dark:border-blue-800/30",
      accent: "bg-linear-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500",
      glow: "shadow-blue-500/20",
      gradient: "from-blue-400 to-blue-600"
    },
    rose: {
      card: "bg-linear-to-br from-rose-50/80 to-rose-100/50 dark:from-rose-950/20 dark:to-rose-900/10 border-rose-200/60 dark:border-rose-800/30",
      accent: "bg-linear-to-br from-rose-500 to-rose-600 dark:from-rose-400 dark:to-rose-500",
      glow: "shadow-rose-500/20",
      gradient: "from-rose-400 to-rose-600"
    },
    violet: {
      card: "bg-linear-to-br from-violet-50/80 to-violet-100/50 dark:from-violet-950/20 dark:to-violet-900/10 border-violet-200/60 dark:border-violet-800/30",
      accent: "bg-linear-to-br from-violet-500 to-violet-600 dark:from-violet-400 dark:to-violet-500",
      glow: "shadow-violet-500/20",
      gradient: "from-violet-400 to-violet-600"
    },
  };

  return (
    <section
      id="signals"
      className="py-32 px-4 bg-white dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-20 flex flex-col gap-5 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 mx-auto">
            <div className="h-px w-8 bg-linear-to-r from-transparent via-blue-500 to-transparent" />
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Biosignals
            </p>
            <div className="h-px w-8 bg-linear-to-r from-transparent via-blue-500 to-transparent" />
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Four biosignals.<br />One platform.
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Capture the full spectrum of biosignals with research-grade precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signals.map((signal) => {
            const colors = colorMap[signal.color];
            const isHovered = hoveredSignal === signal.abbr;
            const signalMode = signal.abbr.toLowerCase() as 'eeg' | 'emg' | 'ecg' | 'eog';
            
            return (
              <div
                key={signal.abbr}
                onMouseEnter={() => setHoveredSignal(signal.abbr)}
                onMouseLeave={() => setHoveredSignal(null)}
                className={`group relative flex flex-col gap-6 rounded-2xl border-2 p-8 transition-all duration-300 ${colors.card} ${
                  isHovered ? `shadow-xl ${colors.glow}` : 'shadow-md hover:shadow-lg'
                }`}
              >
                {/* Live Signal Streaming - Always Playing */}
                <div className={`absolute top-0 left-0 right-0 h-24 overflow-hidden rounded-t-2xl transition-opacity duration-300 ${
                  isHovered ? 'opacity-50' : 'opacity-30'
                }`}>
                  <div className="w-full h-full">
                    <MiniSignalCanvas 
                      mode={signalMode} 
                      isActive={true}
                      color={signal.color}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="relative flex flex-col gap-5 pt-12">
                  {/* Abbreviation badge */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${colors.accent} text-white shadow-md transition-all duration-300 ${
                    isHovered ? 'shadow-lg' : ''
                  }`}>
                    <span className="font-mono text-2xl font-semibold tracking-tight">
                      {signal.abbr}
                    </span>
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                      {signal.name}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {signal.description}
                    </p>
                  </div>

                  {/* Live indicator badge - always visible */}
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 self-start">
                    <div className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${colors.gradient} animate-pulse`} />
                    <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                      Live
                    </span>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-opacity duration-300 bg-linear-to-r ${colors.gradient} ${
                  isHovered ? 'opacity-100' : 'opacity-0'
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
    <section id="features" className="py-32 px-4 bg-linear-to-b from-zinc-50/50 via-white to-zinc-50/50 dark:from-zinc-900/50 dark:via-zinc-950 dark:to-zinc-900/50">
      <div className="mx-auto max-w-7xl">

        <div className="mb-20 flex flex-col gap-5 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 mx-auto">
            <div className="h-px w-8 bg-linear-to-r from-transparent via-purple-500 to-transparent" />
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">
              Why PiEEG
            </p>
            <div className="h-px w-8 bg-linear-to-r from-transparent via-purple-500 to-transparent" />
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            The simplest path to<br />neurotechnology.
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            No proprietary lock-in. No expensive subscriptions. Just open hardware and software that works.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ Icon, title, description }, index) => (
            <div
              key={title}
              className="group relative flex flex-col gap-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-500 text-white shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 mt-6">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {title}
                  </h3>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional info box */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative rounded-2xl border-2 border-purple-200 dark:border-purple-800/40 bg-linear-to-br from-purple-50 via-white to-pink-50/50 dark:from-purple-950/20 dark:via-zinc-900/40 dark:to-pink-950/10 p-8">
            <div className="flex items-start gap-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500 dark:bg-purple-400 text-white shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                  Research-grade precision at maker prices
                </h3>
                <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  The same 24-bit ADCs used in $10,000+ systems. Published schematics. Clean layouts. Build it yourself or buy ready-made. 
                  Used in universities, research labs, and hackerspaces worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function FeaturedSection() {
  const publications = [
  ];

  return (
    <section className="py-32 px-4 bg-linear-to-b from-white via-blue-50/30 to-white dark:from-zinc-950 dark:via-blue-950/10 dark:to-zinc-950">
      <div className="mx-auto max-w-7xl">
        
        <div className="flex flex-col items-center text-center gap-16">
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="inline-flex items-center justify-center gap-2 mx-auto">
              <div className="h-px w-12 bg-linear-to-r from-transparent via-blue-500 to-transparent" />
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                [RECOGNITION]
              </p>
              <div className="h-px w-12 bg-linear-to-r from-transparent via-blue-500 to-transparent" />
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Trusted by researchers<br />worldwide
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Featured in 28+ media publications and cited in 11+ scientific papers.{" "}
              <a 
                href="https://www.google.com/search?q=pieeg&tbm=nws" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5 font-mono"
              >
                [view_coverage]
                <ExternalLink className="w-4 h-4" />
              </a>
            </p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
              <div className="relative flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-800/40 bg-blue-50/50 dark:bg-blue-950/20">
                <div className="text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  28+
                </div>
                <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400 text-center">
                  Media features & podcasts
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
              <div className="relative flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-purple-200 dark:border-purple-800/40 bg-purple-50/50 dark:bg-purple-950/20">
                <div className="text-5xl font-bold bg-linear-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  11+
                </div>
                <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400 text-center">
                  Scientific papers
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
              <div className="relative flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-cyan-200 dark:border-cyan-800/40 bg-cyan-50/50 dark:bg-cyan-950/20">
                <div className="text-5xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                  100+
                </div>
                <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400 text-center">
                  Universities & labs
                </div>
              </div>
            </div>
          </div>

          {/* Publication logos grid */}
          <div className="w-full max-w-5xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {publications.map((pub, idx) => (
                <div
                  key={pub}
                  className="group relative rounded-xl"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center h-24 px-4 border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 backdrop-blur-sm hover:border-blue-300 dark:hover:border-blue-700 rounded-xl transition-all duration-200">
                    <span className="font-semibold text-sm text-center text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                      {pub}
                    </span>
                  </div>
                </div>
              ))}
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
    <section className="py-32 px-4 bg-linear-to-b from-white via-zinc-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl flex flex-col items-center text-center gap-12">

        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center justify-center gap-2 mx-auto">
            <div className="h-px w-12 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              [GET_STARTED]
            </p>
            <div className="h-px w-12 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Ship your first<br />
            <span className="bg-linear-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              BCI in 60 seconds
            </span>
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Install pieeg-server, connect your hardware, and start streaming brainwaves instantly.
          </p>
        </div>

        {/* Install Code Block */}
        <div className="w-full max-w-3xl">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-300"></div>
            
            <div className="relative rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900/90 overflow-hidden shadow-2xl backdrop-blur-sm">
              {/* Terminal chrome */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <span className="ml-2 text-sm font-mono text-zinc-500 dark:text-zinc-500">
                    terminal
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-white transition-all duration-200"
                  aria-label="Copy command"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              
              {/* Code */}
              <div className="px-8 py-8 bg-linear-to-br from-white via-white to-cyan-50/20 dark:from-zinc-900/90 dark:via-zinc-900/90 dark:to-cyan-950/10">
                <pre className="text-base md:text-lg font-mono leading-relaxed">
                  <code>
                    <span className="text-purple-500 dark:text-purple-400">$ </span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{installCommand}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
          
          {/* Quick steps */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
              <div className="relative flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 text-white text-lg font-bold font-mono shrink-0 shadow-lg shadow-cyan-500/30">
                  1
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-mono mb-1">INSTALL</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">One pip command</p>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
              <div className="relative flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white text-lg font-bold font-mono shrink-0 shadow-lg shadow-blue-500/30">
                  2
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-mono mb-1">CONNECT</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Auto-detects hardware</p>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
              <div className="relative flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 text-white text-lg font-bold font-mono shrink-0 shadow-lg shadow-purple-500/30">
                  3
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-mono mb-1">STREAM</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Live in your browser</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="https://cloud.pieeg.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-3 h-16 bg-linear-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 px-10 text-lg font-semibold text-white dark:text-zinc-950 hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-200 rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Play className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Try Live Demo</span>
          </a>
          <a
            href="https://pieeg-server-doc.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 h-16 border-2 border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm px-10 text-lg font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 rounded-xl"
          >
            Documentation
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="https://pieeg.com/shop"
            className="flex items-center gap-3 h-16 border-2 border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm px-10 text-lg font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 rounded-xl"
          >
            Shop Hardware
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Disclaimer */}
        <p className="text-sm text-zinc-500 dark:text-zinc-500 font-mono mt-8">
          // Not a medical device. For research and engineering purposes only.
        </p>

      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ProductsSection />
      <SignalsSection />
      <FeaturesSection />
      <FeaturedSection />
      <CtaSection />
    </main>
  );
}

