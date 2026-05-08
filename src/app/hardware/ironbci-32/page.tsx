import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Code2 as GitHubIcon, Cpu, Signal, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "IronBCI-32 — 32-Channel Professional EEG System — PiEEG",
  description:
    "Research-grade 32-channel EEG development kit. 4× AD7771 ADCs, STM32H7, Brainflow integrated. 500 Hz per channel. Available at Elecrow.",
};

export default function IronBCI32ProductPage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50 mb-6">
                <Shield className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
                  Research Grade
                </span>
              </div>
              
              <h1 className="text-5xl font-bold tracking-tight mb-4">
                IronBCI-32
              </h1>
              
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
                32-channel, 24-bit EEG open-source development kit for professional neuroscience research
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="https://www.elecrow.com/ironbci-32.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-linear-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold shadow-lg transition-all"
                >
                  Buy on Elecrow
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/pieeg-club/ironbci-32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-zinc-900 dark:border-zinc-100 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 font-bold transition-all"
                >
                  <GitHubIcon className="w-5 h-5" />
                  GitHub
                </a>
              </div>
            </div>
            
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 p-8 shadow-2xl border border-zinc-200 dark:border-zinc-700">
                <Image
                  src="/products/ironbci-32.png"
                  alt="IronBCI-32 32-Channel Board"
                  width={400}
                  height={400}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Professional 32-Channel System</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
              ironbci-32 integrates four 8-channel AD7771 analog-to-digital converters (ADCs), each with ultra-low-noise sources, ensuring highly accurate signal capture. The core is powered by the STM32H7 ARM Cortex-M7 microcontroller.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Fully integrated into the open-source Brainflow Library, making it compatible with the broader neuroscience ecosystem. Optimized firmware delivers 500 Hz per channel when running all 32 channels simultaneously.
            </p>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="py-16 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Product Gallery</h2>
            <span className="text-sm text-zinc-400 dark:text-zinc-500 hidden sm:block">2 product views</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden flex flex-col min-h-[320px]">
              <div className="flex-1 flex items-center justify-center p-10">
                <Image
                  src="/products/ironbci-32-main.png"
                  alt="IronBCI-32 — top-down PCB view"
                  width={480}
                  height={480}
                  className="object-contain max-h-64 w-auto drop-shadow-xl"
                />
              </div>
              <div className="px-5 py-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Top-Down View</span>
                <span className="text-xs text-zinc-300 dark:text-zinc-600">1 / 2</span>
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col min-h-[320px]">
              <div className="flex-1 flex items-center justify-center p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-600 opacity-15" />
                <Image
                  src="/products/ironbci-32-angle.png"
                  alt="IronBCI-32 — angle view showing ARM chip"
                  width={480}
                  height={480}
                  className="object-contain max-h-64 w-auto relative z-10"
                  style={{ filter: "drop-shadow(0 0 24px rgba(255,255,255,0.1))" }}
                />
              </div>
              <div className="px-5 py-3.5 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">ARM Cortex-M7 Core</span>
                <span className="text-xs text-zinc-700">2 / 2</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Features & Specifications</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Cpu className="w-8 h-8 text-red-600 dark:text-red-400 mb-4" />
              <h3 className="font-bold mb-2">4× AD7771 ADCs</h3>
              <p className="text-zinc-600 dark:text-zinc-400">8 channels each, ultra-low-noise sources</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Signal className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
              <h3 className="font-bold mb-2">32 Simultaneous Channels</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Highly accurate signal capture</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="font-bold mb-2">STM32H7 Core</h3>
              <p className="text-zinc-600 dark:text-zinc-400">ARM Cortex-M7 microcontroller</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-bold mb-2">500 Hz per Channel</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Firmware-fixed sampling rate (all 32 channels)</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Signal className="w-8 h-8 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="font-bold mb-2">Serial Port Data Transfer</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Reliable communication protocol</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <GitHubIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="font-bold mb-2">Brainflow Integrated</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                <a href="https://brainflow.readthedocs.io/en/stable/SupportedBoards.html#ironbci" target="_blank" rel="noopener noreferrer" className="underline">
                  Official Brainflow support
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-yellow-50 dark:bg-yellow-950/20 border-y border-yellow-200 dark:border-yellow-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-yellow-600 dark:text-yellow-400 shrink-0 mt-1" />
            <div>
              <p className="text-yellow-900 dark:text-yellow-100 font-semibold mb-2">
                Important Notice
              </p>
              <p className="text-yellow-800 dark:text-yellow-200">
                Not a medical device. Read the{" "}
                <Link href="/liability" className="underline font-semibold">
                  Liability
                </Link>{" "}
                before buying and using it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-linear-to-br from-red-500 via-orange-600 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Professional Research Starts Here</h2>
          <p className="text-lg text-red-50 mb-8">
            Purchase IronBCI-32 from our official manufacturing partner Elecrow
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.elecrow.com/ironbci-32.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-red-600 hover:bg-zinc-100 font-bold shadow-xl transition-all"
            >
              Buy on Elecrow
              <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href="https://brainflow.readthedocs.io/en/stable/SupportedBoards.html#ironbci"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white hover:bg-white/10 font-bold transition-all"
            >
              View Brainflow Docs
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
