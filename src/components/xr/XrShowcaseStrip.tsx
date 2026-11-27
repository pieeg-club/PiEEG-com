import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, ScanFace, Layers } from "lucide-react";

export default function XrShowcaseStrip() {
  return (
    <section
      id="xr-capabilities"
      className="py-12 sm:py-16 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/30"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-2">
              [WHY PIEEG XR · SPATIAL BIOSIGNALS]
            </p>
            <h2 className="title-subsection text-zinc-900 dark:text-zinc-50">
              One facial gasket. Three neural &amp; muscular modalities.
            </h2>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
            No optical face-tracking cameras or gel caps required—just ten dry Ag/AgCl pads snapped directly into
            your headset&apos;s facial interface.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Expressive Avatars */}
          <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-hidden flex flex-col justify-between shadow-xs hover:border-violet-400/70 dark:hover:border-violet-500/60 transition-colors">
            <div>
              <div className="relative aspect-4/3 bg-zinc-950 overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
                <Image
                  src="/xr/xr-headset-main.png"
                  alt="PiEEG XR driving real-time VR avatar expressions: Smile, Surprise, Eyebrow Raise, Mouth Open, Wink"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-bottom group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="p-5 sm:p-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-3">
                  <ScanFace className="w-3.5 h-3.5" />
                  fEMG + EOG · Zero Cameras
                </span>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                  Expressive VR Avatars Without Face Cameras
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Temple and cheek sEMG electrodes capture smiles, eyebrow raises, jaw clenches, and winks while
                  forehead EOG tracks blinks—streaming directly to VRChat OSC or VRM blendshapes.
                </p>
              </div>
            </div>
            <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>VRChat UDP :9000</span>
              <a
                href="#xr-routes"
                className="inline-flex items-center gap-1 text-violet-600 dark:text-violet-400 font-semibold hover:underline"
              >
                OSC Setup <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 2: Cognitive State & Focus */}
          <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-hidden flex flex-col justify-between shadow-xs hover:border-cyan-400/70 dark:hover:border-cyan-500/60 transition-colors">
            <div>
              <div className="relative aspect-4/3 bg-zinc-950 overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
                <Image
                  src="/xr/xr-melt-focus.png"
                  alt="PiEEG XR tracking real-time Focus, Mental Load, and Relaxation in VR"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-bottom group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="p-5 sm:p-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 mb-3">
                  <Brain className="w-3.5 h-3.5" />
                  24-bit Frontal EEG · 250 SPS
                </span>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                  Real-Time Focus &amp; Neurofeedback
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Measure attention, mental workload, and relaxation inside immersive WebXR worlds, athletic VR drills,
                  and adaptive spatial apps—with full raw 24-bit µV access over LSL and Python.
                </p>
              </div>
            </div>
            <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>WebXR · LSL · Python</span>
              <a
                href="#xr-credibility"
                className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
              >
                Field Study <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 3: 10-Pad Dry Electrode Map */}
          <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-hidden flex flex-col justify-between shadow-xs hover:border-emerald-400/70 dark:hover:border-emerald-500/60 transition-colors">
            <div>
              <div className="relative aspect-4/3 bg-white overflow-hidden border-b border-zinc-200 dark:border-zinc-800 p-3 flex items-center justify-center">
                <Image
                  src="/products/pieeg-xr/pieeg-xr-electrode-map.png"
                  alt="PiEEG XR 10 dry Ag/AgCl electrode map: Ch3-Ch6 forehead, Ch1-Ch2/Ch7-Ch8 temples, Ref and Bias"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="p-5 sm:p-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20 mb-3">
                  <Layers className="w-3.5 h-3.5" />
                  10 Dry Ag/AgCl Pads
                </span>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                  Mapped Forehead &amp; Temple Gasket
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Ch3–Ch6 sit across the forehead for EEG &amp; blinks, Ch1–Ch2 &amp; Ch7–Ch8 cover temples and cheeks,
                  and isolated Ref + Bias pads stabilize the 24-bit TI ADS1299 front-end.
                </p>
              </div>
            </div>
            <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>5 V battery isolated</span>
              <Link
                href="/hardware/pieeg-xr"
                className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
              >
                Setup Guide <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
