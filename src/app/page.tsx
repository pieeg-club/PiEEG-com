"use client";

import { ArrowRight, Zap, Cpu, ExternalLink, Play, Radio, Copy, Check, Brain, Eye, Music, Sparkles, Globe, Webhook, BookOpen, Shield, Fingerprint, Mic, FlaskConical, Waves, User, Compass, ScanFace, Hand, Camera, Database, Gamepad2, PenTool, Lock, Orbit } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import HardwareBench from "@/components/home/HardwareBench";
import PlatformBench from "@/components/home/PlatformBench";
import AcademicCustomers from "@/components/home/AcademicCustomers";

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

const featuredIn = [
  { name: "UploadVR", logo: "UploadVR", url: "https://www.uploadvr.com/pieeg-xr-makes-your-vr-avatar-expressive-without-face-tracking/" },
  { name: "Tom's Hardware", logo: "Tom's Hardware", url: "https://www.tomshardware.com/raspberry-pi/raspberry-pi-powers-briefcase-sized-pieeg-bio-lab-project" },
  { name: "IEEE Spectrum", logo: "IEEE Spectrum", url: "https://spectrum.ieee.org/neurotechnology-diy" },
  { name: "VICE", logo: "VICE", url: "https://www.vice.com/en/article/88x99k/this-affordable-device-will-let-anyone-connect-their-brain-to-a-computer" },
  { name: "Raspberry Pi", logo: "Raspberry Pi", url: "https://www.raspberrypi.com/news/raspberry-pi-to-brain-interface/" },
  { name: "Hackaday", logo: "Hackaday", url: "https://hackaday.com/tag/pieeg/" },
  { name: "Hackster.io", logo: "Hackster.io", url: "https://www.hackster.io/news/ildar-rakhmatulin-launches-a-new-16-channel-pieeg-for-the-most-advanced-brain-machine-interfaces-3327547fb52d" },
  { name: "Arduino Blog", logo: "Arduino", url: "https://blog.arduino.cc/2024/05/10/ardeeg-is-an-arduino-uno-r4-wifi-shield-for-measuring-biosignals/" },
  { name: "CNX Software", logo: "CNX Software", url: "https://www.cnx-software.com/2024/05/15/ardeeg-shield-works-with-arduino-uno-r4-wifi-for-biosignals-measurement/" },
  { name: "Notebookcheck", logo: "Notebookcheck", url: "https://www.notebookcheck.net/For-VR-PiEEG-XR-measures-brain-activity-in-real-time.1311211.0.html" },
  { name: "It's FOSS", logo: "It's FOSS", url: "https://itsfoss.com/news/pieeg-kit/" },
  { name: "Electronics Weekly", logo: "Electronics Weekly", url: "https://www.electronicsweekly.com/blogs/gadget-master/arduino/measuring-eeg-and-biosignals-with-arduino-ardeeg-shield-2024-05/" },
];

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative flex flex-col overflow-hidden min-h-[calc(100svh-4rem)]" style={{ contain: 'layout style' }}>

      {/* Background video */}
      <HeroVideo />

      {/* Layered cinematic overlays */}
      <div className="absolute inset-0 bg-linear-to-br from-cyan-400/8 via-blue-500/5 to-violet-600/8 dark:from-cyan-400/12 dark:via-blue-500/8 dark:to-violet-600/12 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-t from-white via-white/10 to-white/50 dark:from-zinc-950 dark:via-zinc-950/10 dark:to-zinc-950/50 pointer-events-none" />
      {/* Subtle radial glow behind the content - simplified for performance */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-175 h-125 rounded-full bg-cyan-400/5 dark:bg-cyan-400/8 blur-[80px]" />
      </div>

      {/* Main content — fills leftover height so Featured In stays on the first fold */}
      <div className="relative z-10 flex-1 w-full max-w-6xl mx-auto flex flex-col items-center justify-center gap-5 px-4 py-8">

        {/* ── Hero content ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-5 text-center py-4 sm:py-8 px-4 max-w-4xl mx-auto">

          {/* Eyebrow — latest news */}
          <a
            href="/tutorials/run-pieeg-xr-meta-quest"
            className="group inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-50/70 dark:bg-cyan-950/40 px-3.5 py-1.5 text-xs font-medium text-cyan-700 dark:text-cyan-300 backdrop-blur-sm hover:border-cyan-500/60 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
            </span>
            New — Run PiEEG XR inside Meta Quest
            <ArrowRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Headline */}
          <h1 className="hero-fade text-zinc-900 dark:text-zinc-50 tracking-[-0.045em] leading-[0.88]">
            <span className="block text-[clamp(3.4rem,12vw,7.5rem)] font-semibold">
              BIO DATA
            </span>
            <span className="block mt-1 text-[clamp(1.65rem,5.4vw,3.35rem)] font-medium tracking-[-0.035em] text-zinc-700 dark:text-zinc-200">
              Developer Platform
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
            Research-grade EEG, EMG &amp; ECG — streamed to your browser, decoded by AI, ready for VR.
            No drivers. No lock-in.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
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
              href="/hardware"
              className="flex items-center gap-2 h-12 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 rounded-lg"
            >
              Shop Hardware <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://docs.pieeg.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 h-12 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 rounded-lg"
            >
              <BookOpen className="w-4 h-4" /> Docs
            </a>
          </div>

          {/* Capability strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 pt-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-cyan-500" /> Browser-native</span>
            <span className="inline-flex items-center gap-1.5"><Radio className="w-3.5 h-3.5 text-amber-500" /> Wireless BLE + USB</span>
            <span className="inline-flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-sky-500" /> 24-bit · up to 500 Hz</span>
            <span className="inline-flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-violet-500" /> Real-time ML &amp; AI copilot</span>
            <span className="inline-flex items-center gap-1.5"><GitHubIcon className="w-3.5 h-3.5 text-emerald-500" /> MIT open-source</span>
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono pt-1">
            // Not a medical device. Research &amp; engineering use only.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-2xl mt-2 pt-5 border-t border-zinc-200/50 dark:border-zinc-800/50">
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-3xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">28+</div>
            <div className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 text-center uppercase tracking-wide">Media features</div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">11+</div>
            <div className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 text-center uppercase tracking-wide">Scientific papers</div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">7</div>
            <div className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 text-center uppercase tracking-wide">Hardware platforms</div>
          </div>
        </div>

      </div>

      {/* Featured In — pinned to the bottom of the first fold */}
      <div className="relative z-10 mt-auto w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-hidden" style={{ contain: 'layout paint' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-5 pb-4">
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">Featured In</p>
            <div className="relative w-full overflow-hidden" style={{ contain: 'layout paint' }}>
              <div className="flex gap-12 md:gap-16 animate-scroll-slow">
                {[...featuredIn, ...featuredIn].map(({ name, logo, url }, index) => (
                  <a 
                    key={`${name}-${index}`} 
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center px-4 py-2 shrink-0 hover:text-zinc-700 dark:hover:text-zinc-400"
                  >
                    <span className="text-sm md:text-base font-semibold text-zinc-400 dark:text-zinc-600 whitespace-nowrap">{logo}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1">
              <a
                href="#hardware-on-body"
                className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                Hardware
                <span className="font-normal text-zinc-400 dark:text-zinc-500">on-body</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all" />
              </a>
              <span aria-hidden="true" className="hidden sm:block h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
              <a
                href="#platform"
                className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                Platform
                <span className="font-normal text-zinc-400 dark:text-zinc-500">signal path</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Web BCI Experiences ───────────────────────────────────────────────────────

const BASE_EXP_URL =
  "https://github.com/pieeg-club/PiEEG-server/tree/main/dashboard/src/experiences";
const CLOUD_EXP_URL = "https://cloud.pieeg.com/experiences";

const webExperiences = [
  {
    slug: "blink-scroll",
    name: "Blink Scroll",
    tag: "EOG",
    gradient: "from-cyan-500 to-blue-600",
    Icon: Eye,
    description: "Control browser scrolling using eye blinks detected from frontal EEG channels.",
  },
  {
    slug: "eye-track",
    name: "Eye Track",
    tag: "EOG",
    gradient: "from-purple-500 to-indigo-600",
    Icon: Eye,
    description: "Real-time gaze estimation — polynomial regression on Fp1/Fp2 with online learning.",
  },
  {
    slug: "mindcast",
    name: "MindCast",
    tag: "Focus",
    gradient: "from-orange-500 to-pink-600",
    Icon: Brain,
    description: "Your focus level controls podcast playback speed and audio clarity in real time.",
  },
  {
    slug: "neural-sonification",
    name: "Neural Sonification",
    tag: "Audio",
    gradient: "from-green-500 to-teal-600",
    Icon: Music,
    description: "Turn your brainwaves into live music — EEG band powers mapped to audio synthesis.",
  },
  {
    slug: "northern-lights",
    name: "Northern Lights",
    tag: "Visual",
    gradient: "from-emerald-500 to-cyan-600",
    Icon: Sparkles,
    description: "A mesmerizing aurora display driven by your live EEG rhythms and band powers.",
  },
  {
    slug: "p300-mini-game",
    name: "P300 Mini Game",
    tag: "BCI",
    gradient: "from-yellow-500 to-orange-600",
    Icon: Zap,
    description: "Classic P300 oddball paradigm reimagined as an interactive mini-game with swappable ML.",
  },
  {
    slug: "spoon-bend",
    name: "Spoon Bend",
    tag: "Focus",
    gradient: "from-red-500 to-pink-600",
    Icon: Brain,
    description: "Focus hard enough to bend a virtual spoon. Telekinesis powered by your attention index.",
  },
  {
    slug: "vrchat-osc",
    name: "VRChat OSC",
    tag: "VR / 3D",
    gradient: "from-violet-500 to-purple-600",
    Icon: Globe,
    description: "Stream live EEG into VRChat via OSC to animate avatars with real brainwaves.",
  },
  {
    slug: "webhook-wizard",
    name: "Webhook Wizard",
    tag: "Automation",
    gradient: "from-slate-500 to-zinc-600",
    Icon: Webhook,
    description: "Trigger any HTTP webhook from blinks, focus spikes, and relaxation peaks.",
  },
  {
    slug: "mushroom-body-decoder",
    name: "Mushroom Body Decoder",
    tag: "BCI / Connectome",
    gradient: "from-orange-500 to-pink-600",
    Icon: Brain,
    href: `${CLOUD_EXP_URL}/mushroom-body-decoder`,
    description: "Live EEG drives a fruit-fly mushroom-body circuit. Sparse Kenyon-cell code, trained readout.",
  },
  {
    slug: "octo-captcha",
    name: "octoCaptcha",
    tag: "EOG / Liveness",
    gradient: "from-emerald-400 to-teal-600",
    Icon: Shield,
    href: `${CLOUD_EXP_URL}/octo-captcha`,
    description: "Random blink-count nonce after a GO cue, verified from Fp1/Fp2 EOG morphology.",
  },
  {
    slug: "octo-auth",
    name: "octoAuth",
    tag: "BCI / Biometric",
    gradient: "from-emerald-500 to-sky-500",
    Icon: Fingerprint,
    href: `${CLOUD_EXP_URL}/octo-auth`,
    description: "16-channel neck EMG identity challenge: random isometric actions plus a person-specific map.",
  },
  {
    slug: "silent-speech",
    name: "Silent Speech Interface",
    tag: "BCI / sEMG",
    gradient: "from-violet-500 to-cyan-500",
    Icon: Mic,
    href: `${CLOUD_EXP_URL}/silent-speech`,
    description: "Closed-vocabulary subvocal sEMG decoder. Enrol a command set, then silently mouth words.",
  },
  {
    slug: "signal-lab",
    name: "Signal Lab",
    tag: "Learn / Game",
    gradient: "from-blue-500 to-violet-500",
    Icon: BookOpen,
    href: `${CLOUD_EXP_URL}/signal-lab`,
    description: "EEG DSP as a course: time domain, cleaning, frequency domain. Live sandbox on your stream.",
  },
  {
    slug: "ar-buddy",
    name: "Room Buddy (AR)",
    tag: "AR",
    gradient: "from-sky-500 to-cyan-400",
    Icon: Sparkles,
    href: `${CLOUD_EXP_URL}/ar-buddy`,
    description: "Place a buddy in your room. It waves, hops on focus, and flinches on blinks.",
  },
  {
    slug: "virtual-lab",
    name: "PiEEG Virtual Lab",
    tag: "Lab / VR",
    gradient: "from-blue-600 to-sky-400",
    Icon: FlaskConical,
    href: `${CLOUD_EXP_URL}/virtual-lab`,
    description: "Walk a photoreal lab and sit at a workstation running the live dashboard.",
  },
  {
    slug: "xr-wave-view",
    name: "Neural Wave Space",
    tag: "VR / 3D",
    gradient: "from-violet-600 to-blue-500",
    Icon: Waves,
    href: `${CLOUD_EXP_URL}/xr-wave-view`,
    description: "Immersive 3D EEG visualization: waves curve around you in a starfield.",
  },
  {
    slug: "neural-genesis",
    name: "Neural Flight",
    tag: "VR / AR",
    gradient: "from-blue-600 to-cyan-400",
    Icon: Globe,
    href: `${CLOUD_EXP_URL}/neural-genesis`,
    description: "First-person flight. Focus is lift; lose it and gravity takes over.",
  },
  {
    slug: "mind-reader",
    name: "Mind Reader",
    tag: "BCI / ML",
    gradient: "from-violet-600 to-yellow-400",
    Icon: Brain,
    href: `${CLOUD_EXP_URL}/mind-reader`,
    description: "P300 number guess: think 1-9; shrinkage-LDA plus Bayesian accumulation reads the ERP.",
  },
  {
    slug: "avatar-foundation",
    name: "Avatar Neurofeedback Studio",
    tag: "BCI / Avatar",
    gradient: "from-indigo-500 to-cyan-400",
    Icon: User,
    href: `${CLOUD_EXP_URL}/avatar-foundation`,
    description: "Map electrode x band to facial expressions on a VRM avatar.",
  },
  {
    slug: "premeditatio-malorum",
    name: "Premeditatio Malorum",
    tag: "XR / Stoic",
    gradient: "from-cyan-400 to-violet-400",
    Icon: Compass,
    href: `${CLOUD_EXP_URL}/premeditatio-malorum`,
    description: "Paired 360 scenes. Score is how fast a beta spike decays back to baseline.",
  },
  {
    slug: "glitching-reality",
    name: "The Glitching Reality",
    tag: "MR / Shader",
    gradient: "from-rose-500 to-cyan-400",
    Icon: Zap,
    href: `${CLOUD_EXP_URL}/glitching-reality`,
    description: "Passthrough plus a shader: load tears the room; a breath restores it.",
  },
  {
    slug: "face-trainer",
    name: "Face Trainer",
    tag: "BCI / Face",
    gradient: "from-cyan-400 to-green-500",
    Icon: ScanFace,
    href: `${CLOUD_EXP_URL}/face-trainer`,
    description: "Placement-agnostic facial EMG. Per-expression L2 + group-lasso detectors.",
  },
  {
    slug: "face-trainer-v2",
    name: "Face Trainer v2",
    tag: "BCI / Face",
    gradient: "from-violet-500 to-cyan-400",
    Icon: ScanFace,
    href: `${CLOUD_EXP_URL}/face-trainer-v2`,
    description: "Same fEMG pipeline with a 3-2-1 recording rhythm. Independent storage from v1.",
  },
  {
    slug: "hand-trainer",
    name: "Hand Trainer",
    tag: "BCI / sEMG",
    gradient: "from-amber-500 to-cyan-400",
    Icon: Hand,
    href: `${CLOUD_EXP_URL}/hand-trainer`,
    description: "Palm sEMG grip decoder for Aura: fist, open, pinch, point, thumb-up.",
  },
  {
    slug: "aura-imu-lab",
    name: "Aura IMU Lab",
    tag: "IMU / Debug",
    gradient: "from-amber-500 to-cyan-400",
    Icon: Compass,
    href: `${CLOUD_EXP_URL}/aura-imu-lab`,
    description: "6-axis IMU lab: still-hold calibration, gravity-compensated accel, ZUPT.",
  },
  {
    slug: "biopose-recorder",
    name: "BioPose Recorder",
    tag: "Lab / Pose",
    gradient: "from-cyan-400 to-indigo-400",
    Icon: Camera,
    href: `${CLOUD_EXP_URL}/biopose-recorder`,
    description: "Camera body stick plus live bio traces. Review, mark, export.",
  },
  {
    slug: "aura-dataset-lab",
    name: "Aura Dataset Lab",
    tag: "sEMG / Dataset",
    gradient: "from-amber-500 to-cyan-400",
    Icon: Database,
    href: `${CLOUD_EXP_URL}/aura-dataset-lab`,
    description: "Guided EMG + IMU records with rest/hold labels. Export JSON or 50 Hz CSV.",
  },
  {
    slug: "hand-of-god",
    name: "Hand of God",
    tag: "BCI / Game",
    gradient: "from-sky-400 to-amber-500",
    Icon: Gamepad2,
    href: `${CLOUD_EXP_URL}/hand-of-god`,
    description: "Hang-ball punch game. Optional Aura fist training.",
  },
  {
    slug: "handwriting-trainer",
    name: "Aura Handwriting",
    tag: "IMU / sEMG",
    gradient: "from-amber-500 to-zinc-300",
    Icon: PenTool,
    href: `${CLOUD_EXP_URL}/handwriting-trainer`,
    description: "Palm sEMG gates pen-down; wrist rates draw a unistroke. 1-NN DTW.",
  },
  {
    slug: "penalty-shooters",
    name: "Penalty Shooters",
    tag: "BCI / Game",
    gradient: "from-green-500 to-amber-500",
    Icon: Gamepad2,
    href: `${CLOUD_EXP_URL}/penalty-shooters`,
    description: "Blink-controlled penalty kicks. Trainless adaptive detector. Press start.",
  },
  {
    slug: "neural-maze-lock",
    name: "Neural Maze Lock",
    tag: "BCI / Game",
    gradient: "from-cyan-300 to-blue-700",
    Icon: Lock,
    href: `${CLOUD_EXP_URL}/neural-maze-lock`,
    description: "EOG gaze steers a maze. Focus, calm, and blink gates confirm intent.",
  },
  {
    slug: "orb-control",
    name: "Orb Control",
    tag: "BCI / EOG",
    gradient: "from-violet-500 to-cyan-400",
    Icon: Orbit,
    href: `${CLOUD_EXP_URL}/orb-control`,
    description: "Focus grabs an orb, EOG gaze moves it, calm steadies it, a blink releases charge.",
  },
];

function WebBCISection() {
  const offset = Math.ceil(webExperiences.length / 2);
  const row2 = [
    ...webExperiences.slice(offset),
    ...webExperiences.slice(0, offset),
  ];

  return (
    <section className="py-16 bg-linear-to-b from-white via-slate-50/60 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 overflow-hidden">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/50 mb-6">
          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Web BCI Experiences
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Raw EEG in. Working BCI out.<br />
          <span className="bg-linear-to-r from-cyan-500 via-violet-500 to-pink-500 dark:from-cyan-400 dark:via-violet-400 dark:to-pink-400 bg-clip-text text-transparent">
            JavaScript. Open-source. Yours.
          </span>
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Real-time BCI from a live sensor stream. MIT Server gallery plus Cloud experiences: decoders, trainers, XR, and labs.
        </p>
      </div>

      {/* Dual scrolling rows */}
      <div className="relative space-y-4">
        {/* Edge fade masks */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-linear-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-linear-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

        {/* Row 1 — scrolls left */}
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-scroll-slow">
            {[...webExperiences, ...webExperiences].map((exp, i) => {
              const Icon = exp.Icon;
              return (
                <a
                  key={i}
                  href={"href" in exp && exp.href ? exp.href : `${BASE_EXP_URL}/${exp.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-72 shrink-0 flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                >
                  <div className={`h-1 bg-linear-to-r ${exp.gradient}`} />
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg bg-linear-to-br ${exp.gradient}`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-all" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {exp.name}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                        {exp.description}
                      </p>
                    </div>
                    <span className="self-start px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                      {exp.tag}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Row 2 — scrolls right (offset order) */}
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-scroll-slow-reverse">
            {[...row2, ...row2].map((exp, i) => {
              const Icon = exp.Icon;
              return (
                <a
                  key={i}
                  href={"href" in exp && exp.href ? exp.href : `${BASE_EXP_URL}/${exp.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-72 shrink-0 flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                >
                  <div className={`h-1 bg-linear-to-r ${exp.gradient}`} />
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg bg-linear-to-br ${exp.gradient}`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-all" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {exp.name}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                        {exp.description}
                      </p>
                    </div>
                    <span className="self-start px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                      {exp.tag}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12 px-4">
        <Link
          href="/examples"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-sm hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-all hover:scale-105 shadow-lg shadow-zinc-900/20 dark:shadow-white/10"
        >
          Explore all experiences
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

function FeaturedSection() {
  const publications = [
    { name: "UploadVR", kind: "VR press", url: "https://www.uploadvr.com/pieeg-xr-makes-your-vr-avatar-expressive-without-face-tracking/" },
    { name: "Tom's Hardware", kind: "Hardware", url: "https://www.tomshardware.com/raspberry-pi/raspberry-pi-powers-briefcase-sized-pieeg-bio-lab-project" },
    { name: "IEEE Spectrum", kind: "Science", url: "https://spectrum.ieee.org/neurotechnology-diy" },
    { name: "VICE", kind: "Media", url: "https://www.vice.com/en/article/88x99k/this-affordable-device-will-let-anyone-connect-their-brain-to-a-computer" },
    { name: "Raspberry Pi", kind: "Hardware", url: "https://www.raspberrypi.com/news/raspberry-pi-to-brain-interface/" },
    { name: "Hackaday", kind: "Maker", url: "https://hackaday.com/tag/pieeg/" },
    { name: "Hackster.io", kind: "Maker", url: "https://www.hackster.io/news/ildar-rakhmatulin-launches-a-new-16-channel-pieeg-for-the-most-advanced-brain-machine-interfaces-3327547fb52d" },
    { name: "Arduino Blog", kind: "Hardware", url: "https://blog.arduino.cc/2024/05/10/ardeeg-is-an-arduino-uno-r4-wifi-shield-for-measuring-biosignals/" },
    { name: "CNX Software", kind: "Embedded", url: "https://www.cnx-software.com/2024/05/15/ardeeg-shield-works-with-arduino-uno-r4-wifi-for-biosignals-measurement/" },
    { name: "Notebookcheck", kind: "Tech", url: "https://www.notebookcheck.net/For-VR-PiEEG-XR-measures-brain-activity-in-real-time.1311211.0.html" },
    { name: "It's FOSS", kind: "Open source", url: "https://itsfoss.com/news/pieeg-kit/" },
    { name: "Electronics Weekly", kind: "Electronics", url: "https://www.electronicsweekly.com/blogs/gadget-master/arduino/measuring-eeg-and-biosignals-with-arduino-ardeeg-shield-2024-05/" },
  ] as const;

  const mediaRowOne = publications.filter((_, i) => i % 2 === 0);
  const mediaRowTwo = publications.filter((_, i) => i % 2 === 1);

  const MediaPill = ({ pub }: { pub: (typeof publications)[number] }) => (
    <span className="inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-white py-2 pr-4 pl-2 text-left shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-200 group-hover:border-zinc-300 group-hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none dark:group-hover:border-zinc-700 dark:group-hover:bg-zinc-800">
      <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-50 text-[10px] font-semibold tracking-tight text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
        {pub.name.slice(0, 2).toUpperCase()}
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="text-[13px] font-medium tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
          {pub.name}
        </span>
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
          {pub.kind}
        </span>
      </span>
    </span>
  );

  const MediaRow = ({
    items,
    reverse = false,
  }: {
    items: readonly (typeof publications)[number][];
    reverse?: boolean;
  }) => {
    const loop = [...items, ...items, ...items, ...items];
    return (
      <div className="marquee-fade overflow-hidden">
        <div
          className={`flex w-max items-center gap-3 px-4 ${
            reverse ? "academia-marquee-track-reverse" : "academia-marquee-track"
          }`}
        >
          {loop.map((pub, i) => (
            <a
              key={`${pub.name}-${i}`}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden={i >= items.length}
              tabIndex={i >= items.length ? -1 : undefined}
              className="group shrink-0"
            >
              <MediaPill pub={pub} />
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="overflow-hidden py-20 bg-linear-to-b from-white via-blue-50/30 to-white dark:from-zinc-950 dark:via-blue-950/10 dark:to-zinc-950">
      <div className="mx-auto max-w-7xl px-4">
        
        <div className="flex flex-col items-center text-center gap-10">
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
                href="/news" 
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5 font-mono"
              >
                [view_all_coverage]
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

        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3">
        <MediaRow items={mediaRowOne} />
        <MediaRow items={mediaRowTwo} reverse />
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
    <section className="py-10 px-4 bg-linear-to-b from-white via-zinc-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl flex flex-col items-center text-center gap-8">

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
            href="/support"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 h-16 border-2 border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm px-10 text-lg font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 rounded-xl"
          >
            Documentation
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="/hardware"
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
      <HardwareBench />
      <PlatformBench />
      <AcademicCustomers />
      <WebBCISection />
      <FeaturedSection />
      <CtaSection />
    </main>
  );
}

