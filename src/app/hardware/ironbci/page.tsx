import { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, Code2 as GitHubIcon, Radio } from "lucide-react";
import { ProductJsonLd, ProductPrice } from "@/components/ProductOffer";
import { EnclosureLinks } from "@/components/EnclosureLink";
import { enclosuresFor } from "@/lib/thingiverse";
import IronBCIGuide from "./IronBCIGuide";

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
      <ProductJsonLd productId="ironbci" />
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

              <ProductPrice productId="ironbci" />

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
              <EnclosureLinks links={enclosuresFor("ironbci")} className="mb-8 -mt-4" />
            </div>
            
            {/* Product image */}
            <div className="flex items-center justify-center">
              <Image
                src="/products/ironbci-top.png"
                alt="IronBCI board: three stacked round PCBs with pin headers and switches"
                width={596}
                height={419}
                priority
                style={{
                  display: "block",
                  width: "100%",
                  maxWidth: 520,
                  height: "auto",
                  filter:
                    "drop-shadow(0 24px 40px rgba(0,0,0,.55)) drop-shadow(0 0 60px rgba(168,85,247,.18))",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Guide: video, where to use it, how to set it up, safety ── */}
      <IronBCIGuide />
    </main>
  );
}
