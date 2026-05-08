import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Code2 as GitHubIcon, Cpu, Zap, Signal, Shield, Bluetooth, Radio, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "IronBCI — 8-Channel Wearable Wireless EEG — PiEEG",
  description:
    "Wearable Brain-Computer Interface with BLE 5.0. 8 channels, Python + Android SDK, 50mm diameter. Portable neuroscience research. Available at Elecrow.",
  openGraph: {
    title: "IronBCI — 8-Channel Wearable Wireless EEG",
    description:
      "Wearable Brain-Computer Interface with BLE 5.0. 8 channels, Python + Android SDK, 50mm diameter. Portable neuroscience research.",
    images: [{ url: "/products/ironbci-angle.jpg", width: 1200, height: 630, alt: "IronBCI wearable EEG device" }],
  },
};

export default function IronBCIProductPage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/50 mb-6">
                <Radio className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Wireless BLE5
                </span>
              </div>
              
              <h1 className="text-5xl font-bold tracking-tight mb-4">
                IronBCI
              </h1>
              
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
                Wearable Brain-computer interface (EEG device) for EEG, EMG, and ECG bio-signals with 8 channels
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="https://www.elecrow.com/ironbci.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold shadow-lg transition-all"
                >
                  Buy on Elecrow
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/pieeg-club/ironbci"
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
                  src="https://www.youtube.com/embed/gWpfsLuq_eE"
                  title="IronBCI Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Why is IronBCI</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
              IronBCI is a powerful, compact, and highly adaptable biopotential acquisition system ideal for applied neuroscience research, brain-computer interface development, and prototyping.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              <strong>Key advantages:</strong>
            </p>
            <ul className="space-y-2 text-lg text-zinc-700 dark:text-zinc-300">
              <li>• Low noise, 24-bit resolution</li>
              <li>• Support for both wet and dry electrodes</li>
              <li>• BLE5 wireless data transfer for reliable, high-quality signals</li>
              <li>• Easy to integrate with any 3D-printed headset</li>
              <li>• Mobile applications via Android SDK</li>
              <li>• Desktop platforms with Python support</li>
              <li>• Open-source, well-documented, backed by full support</li>
              <li>• Designed for long-term use and rapid development across platforms</li>
            </ul>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mt-6">
              We also provide 3D design for the headset for Ironbci at the GitHub repository.
            </p>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="py-16 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Product Gallery</h2>
            <span className="text-sm text-zinc-400 dark:text-zinc-500 hidden sm:block">3 photos + demo</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden flex flex-col min-h-70 lg:min-h-110">
              <div className="flex-1 flex items-center justify-center p-12">
                <Image
                  src="/products/ironbci-angle.jpg"
                  alt="IronBCI — PCB front view"
                  width={520}
                  height={400}
                  className="object-contain max-h-72 w-auto drop-shadow-xl rounded-xl"
                />
              </div>
              <div className="px-5 py-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">PCB Front</span>
                <span className="text-xs text-zinc-300 dark:text-zinc-600">1 / 4</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col min-h-50 lg:min-h-0 lg:flex-1">
                <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-pink-600 opacity-15" />
                  <Image
                    src="/products/ironbci-top.jpg"
                    alt="IronBCI — stacked assembly"
                    width={260}
                    height={200}
                    className="object-contain max-h-28 w-auto relative z-10 rounded-lg"
                    style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.08))" }}
                  />
                </div>
                <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Stacked Assembly</span>
                  <span className="text-xs text-zinc-700">2 / 4</span>
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col min-h-50 lg:min-h-0 lg:flex-1">
                <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-pink-600 opacity-10" />
                  <Image
                    src="/products/ironbci-worn.jpg"
                    alt="IronBCI — wearable BCI"
                    width={260}
                    height={200}
                    className="object-contain max-h-28 w-auto relative z-10"
                    style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.08))" }}
                  />
                </div>
                <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Wearable BCI</span>
                  <span className="text-xs text-zinc-700">3 / 4</span>
                </div>
              </div>
            </div>
          </div>
          {/* 4th image: full-width demo video */}
          <div className="mt-4 rounded-2xl border border-zinc-800 overflow-hidden relative" style={{height: "240px"}}>
            <iframe
              src="https://www.youtube.com/embed/gWpfsLuq_eE"
              title="IronBCI product demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 px-4 py-2.5 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-between pointer-events-none">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Product Demo</span>
              <span className="text-xs text-zinc-600">4 / 4</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Features & Specifications</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Signal className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="font-bold mb-2">8 Biopotential Channels</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Supports both wet and dry electrodes for EEG, EMG</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Zap className="w-8 h-8 text-pink-600 dark:text-pink-400 mb-4" />
              <h3 className="font-bold mb-2">150 mA Power</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Low power consumption, battery-powered</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-bold mb-2">250 SPS, 24-bit</h3>
              <p className="text-zinc-600 dark:text-zinc-400">High-resolution data acquisition</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Radio className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="font-bold mb-2">Bluetooth Low Energy 5</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Wireless data transfer</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Smartphone className="w-8 h-8 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="font-bold mb-2">Python + Android SDK</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Easy integration and development</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Signal className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
              <h3 className="font-bold mb-2">50mm Diameter</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Compact design, lightweight and wearable</p>
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
                ironbci is not a medical device. Please read before using it{" "}
                <Link href="/liability" className="underline font-semibold">
                  LIABILITIES
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-linear-to-br from-purple-500 via-pink-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Go Wireless?</h2>
          <p className="text-lg text-purple-50 mb-8">
            Purchase IronBCI from our official manufacturing partner Elecrow
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.elecrow.com/ironbci.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-purple-600 hover:bg-zinc-100 font-bold shadow-xl transition-all"
            >
              Buy on Elecrow
              <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/pieeg-club/ironbci_3D_EEG_Printable_Headset"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white hover:bg-white/10 font-bold transition-all"
            >
              Download 3D Headset Design
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
