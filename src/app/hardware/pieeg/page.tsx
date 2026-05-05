import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Code2 as GitHubIcon, Cpu, Zap, Signal, Shield, Code } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PiEEG — 8-Channel Raspberry Pi EEG Shield — PiEEG",
  description:
    "Transform your Raspberry Pi into a brain-computer interface. 8 channels, 24-bit resolution, 250 SPS to 16 kSPS. Open-source Python SDK. Available at Elecrow.",
};

export default function PiEEGProductPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/50 mb-6">
                <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  Most Popular
                </span>
              </div>
              
              <h1 className="text-5xl font-bold tracking-tight mb-4">
                PiEEG
              </h1>
              
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
                Brain-computer interface (EEG device) for EEG, EMG, and ECG bio-signals with 8 channels
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="https://www.elecrow.com/pieeg.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold shadow-lg transition-all"
                >
                  Buy on Elecrow
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/pieeg-club/PiEEG"
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
                  src="https://www.youtube.com/embed/0ocAPWok5YU"
                  title="PiEEG Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why PiEEG */}
      <section className="py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Why is PiEEG</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
              The Raspberry Pi stands as one of the most esteemed single-board computers in the world, renowned for its reliability and user-friendliness. The utilization of PiEEG in conjunction with Raspberry Pi provides an accessible avenue for delving into the realm of neuroscience.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
              Our methodology facilitates seamless real-time EEG data reading and signal processing directly on the Raspberry Pi, eliminating the need for data transmission or additional computing resources. This setup is particularly well-suited for those seeking to grasp the fundamentals of bioscience, engage in mind-controlled robotic manipulation, or manage stress and meditation.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              We provide comprehensive software packages, along with all requisite technical documentation and extensive user support for PiEEG device enthusiasts.
            </p>
          </div>
        </div>
      </section>

      {/* Features & Specifications */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Features & Specifications</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Cpu className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mb-4" />
              <h3 className="font-bold mb-2">Compatible Platforms</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Raspberry Pi 3, 4 and 5</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Signal className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-bold mb-2">8 Channels</h3>
              <p className="text-zinc-600 dark:text-zinc-400">For connecting wet or dry electrodes</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="font-bold mb-2">SPI Protocol</h3>
              <p className="text-zinc-600 dark:text-zinc-400">250 SPS to 16 kSPS data transfer</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Shield className="w-8 h-8 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="font-bold mb-2">24-bit Resolution</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Per channel, high-precision ADC</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
              <h3 className="font-bold mb-2">Programmable Gain</h3>
              <p className="text-zinc-600 dark:text-zinc-400">1, 2, 4, 6, 8, 12, 24</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Code className="w-8 h-8 text-pink-600 dark:text-pink-400 mb-4" />
              <h3 className="font-bold mb-2">Open-Source SDK</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Python software for data reading and processing</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Signal className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-4" />
              <h3 className="font-bold mb-2">Impedance Measurement</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Built-in electrode impedance testing</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Cpu className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="font-bold mb-2">3 Free GPIO Pins</h3>
              <p className="text-zinc-600 dark:text-zinc-400">For external objects (ground and Raspberry Pi channel)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Warning */}
      <section className="py-12 bg-yellow-50 dark:bg-yellow-950/20 border-y border-yellow-200 dark:border-yellow-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-yellow-900 dark:text-yellow-100 font-semibold mb-2">
                Important Notice
              </p>
              <p className="text-yellow-800 dark:text-yellow-200">
                PiEEG is not a medical device and has not been certified by any government regulatory agency for use with the human body. You are fully responsible for your personal decision to purchase this device and, ultimately, for its safe use. Please read{" "}
                <Link href="/liability" className="underline font-semibold">
                  LIABILITIES
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-br from-cyan-500 via-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-cyan-50 mb-8">
            Purchase PiEEG from our official manufacturing partner Elecrow
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.elecrow.com/pieeg.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-blue-600 hover:bg-zinc-100 font-bold shadow-xl transition-all"
            >
              Buy on Elecrow
              <ExternalLink className="w-5 h-5" />
            </a>
            <Link
              href="/support"
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
