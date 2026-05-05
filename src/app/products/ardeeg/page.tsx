import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Code2 as GitHubIcon, Cpu, Signal, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "ardEEG — 8-Channel Arduino EEG Shield — PiEEG",
  description:
    "EEG with Arduino UNO R4 WiFi. 8 channels, SPI protocol, ultra-low power wearable design. Arduino tools for learning biosciences. Available at Elecrow.",
};

export default function ArdEEGProductPage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50 mb-6">
                <Cpu className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                  Arduino Shield
                </span>
              </div>
              
              <h1 className="text-5xl font-bold tracking-tight mb-4">
                ardEEG
              </h1>
              
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
                EEG with Arduino. Shield for Arduino to measure EEG, EMG, and ECG bio-signals with 8 channels
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="https://www.elecrow.com/ardeeg.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold shadow-lg transition-all"
                >
                  Buy on Elecrow
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/Ildaron/ardEEG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-zinc-900 dark:border-zinc-100 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 font-bold transition-all"
                >
                  <GitHubIcon className="w-5 h-5" />
                  GitHub
                </a>
              </div>
            </div>
            
            {/* Product Video */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-700">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/s_5mDDUFp6E"
                  title="ardEEG Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Why is ardEEG</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
              You know Arduino tools for learning electronics, in this case, Arduino with ardEEG for learning biosciences.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
              Arduino stands as one of the most esteemed microcontrollers learning boards in the world, it is very comfortable device to learn electronics. Connections between ardEEG and Arduino provide great opportunity make step from electronics to neuroscience.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
              The main advantage of this setup it is opportunity to use ardEEG as wearable device, since it is very low power consumption and very small weight and dimensions. Therefore, this is an excellent solution for using this device for demanding tasks, such as robotic arm manipulation, or health monitoring, etc.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              We provide comprehensive software packages, along with all requisite technical documentation and extensive user support for PiEEG device enthusiasts.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Features & Specifications</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Cpu className="w-8 h-8 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="font-bold mb-2">Arduino UNO R4 WiFi</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Compatible with Arduino ecosystem</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Signal className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-4" />
              <h3 className="font-bold mb-2">8 Channels</h3>
              <p className="text-zinc-600 dark:text-zinc-400">For connecting wet or dry electrodes</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="font-bold mb-2">SPI Data Transfer</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Fast serial communication</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-bold mb-2">Programmable Gain</h3>
              <p className="text-zinc-600 dark:text-zinc-400">1, 2, 4, 6, 8, 12, 24</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Signal className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-4" />
              <h3 className="font-bold mb-2">Impedance Measurement</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Built-in electrode testing</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
              <h3 className="font-bold mb-2">Ultra-Low Power</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Perfect for wearable applications</p>
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
                ardEEG is not a medical device and has not been certified by any government regulatory agency for use with the human body. You are fully responsible for your personal decision to purchase this device and, ultimately, for its safe use. Please read{" "}
                <Link href="/liability" className="underline font-semibold">
                  LIABILITIES
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-linear-to-br from-green-500 via-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Arduino Meets Neuroscience</h2>
          <p className="text-lg text-green-50 mb-8">
            Purchase ardEEG from our official manufacturing partner Elecrow
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.elecrow.com/ardeeg.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-green-600 hover:bg-zinc-100 font-bold shadow-xl transition-all"
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
