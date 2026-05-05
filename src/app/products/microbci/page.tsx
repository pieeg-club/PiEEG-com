import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Code2 as GitHubIcon, Cpu, Zap, Signal, Shield, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "MicroBCI — 8-Channel STM32 EEG Shield — PiEEG",
  description:
    "Measure EEG with STM32 NUCLEO-WB55. 8 channels, SPI 250 SPS, Python + Mobile SDK. Brain-computer interface for STM32. Available at Elecrow.",
};

export default function MicroBCIProductPage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/50 mb-6">
                <Cpu className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  STM32 Shield
                </span>
              </div>
              
              <h1 className="text-5xl font-bold tracking-tight mb-4">
                MicroBCI
              </h1>
              
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
                Measure EEG with STM32 via NUCLEO-WB55. Brain-computer interface for EEG, EMG, and ECG bio-signals
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="https://www.elecrow.com/microbci-eeg-with-stm32.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold shadow-lg transition-all"
                >
                  Buy on Elecrow
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/pieeg-club/MicroBCI"
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
                  src="/products/microbci.png"
                  alt="MicroBCI STM32 Shield"
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

      <section className="py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Why MicroBCI</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
              MicroBCI is a shield that brings Brain-Computer Interface (BCI) capabilities to STM32 NUCLEO development boards. Easily measure EEG signals and explore neuroscience applications directly within STMicroelectronics ecosystem.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
              Combines power of STM32 microcontrollers with open-source MicroBCI shield to perform real-time EEG signal acquisition and processing without external computing resources. Ideal tool for learning, prototyping, and applied research in brain-computer interfaces. Lowers barrier for students, researchers, and developers.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <strong>Applications:</strong> Brain-controlled devices & robotics, stress/focus/meditation tracking, gaming & entertainment, neuroscience education and research.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Features & Specifications</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Cpu className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-4" />
              <h3 className="font-bold mb-2">STM32 NUCLEO-WB55</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Compatible with STM32 ecosystem</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Signal className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mb-4" />
              <h3 className="font-bold mb-2">8 Channels</h3>
              <p className="text-zinc-600 dark:text-zinc-400">For connecting wet or dry electrodes</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="font-bold mb-2">SPI Protocol</h3>
              <p className="text-zinc-600 dark:text-zinc-400">250 SPS data transfer</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Shield className="w-8 h-8 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="font-bold mb-2">Programmable Gain</h3>
              <p className="text-zinc-600 dark:text-zinc-400">1, 2, 4, 6, 8, 12, 24</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Smartphone className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-bold mb-2">Multiple SDKs</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Python SDK, Mobile SDK, STM32 Framework SDK</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
              <h3 className="font-bold mb-2">Low Power</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Optimized for embedded applications</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-yellow-50 dark:bg-yellow-950/20 border-y border-yellow-200 dark:border-yellow-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-yellow-900 dark:text-yellow-100 font-semibold mb-2">
                Important Notice
              </p>
              <p className="text-yellow-800 dark:text-yellow-200">
                MicroBCI is not a medical device. Please read{" "}
                <Link href="/liability" className="underline font-semibold">
                  LIABILITIES
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-linear-to-br from-teal-500 via-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Power Your STM32 with BCI</h2>
          <p className="text-lg text-teal-50 mb-8">
            Purchase MicroBCI from our official manufacturing partner Elecrow
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.elecrow.com/microbci-eeg-with-stm32.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-teal-600 hover:bg-zinc-100 font-bold shadow-xl transition-all"
            >
              Buy on Elecrow
              <ExternalLink className="w-5 h-5" />
            </a>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white hover:bg-white/10 font-bold transition-all"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
