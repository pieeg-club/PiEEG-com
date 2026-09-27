import { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, Code2 as GitHubIcon, Shield } from "lucide-react";
import { ProductJsonLd, ProductPrice } from "@/components/ProductOffer";
import { EnclosureLinks } from "@/components/EnclosureLink";
import { enclosuresFor } from "@/lib/thingiverse";
import IronBCI32Guide from "./IronBCI32Guide";

export const metadata: Metadata = {
  title: "IronBCI-32 — 32-Channel Professional EEG System — PiEEG",
  description:
    "Research-grade 32-channel EEG development kit. 4× AD7771 ADCs, STM32H7, Brainflow integrated. 500 Hz per channel. Available at Elecrow.",
  openGraph: {
    title: "IronBCI-32 — 32-Channel Professional EEG System",
    description:
      "Research-grade 32-channel EEG development kit. 4× AD7771 ADCs, STM32H7, Brainflow integrated. 500 Hz per channel.",
    images: [{ url: "/products/ironbci-32.png", width: 1200, height: 630, alt: "IronBCI-32 professional EEG system" }],
  },
};

export default function IronBCI32ProductPage() {
  return (
    <main className="flex-1">
      <ProductJsonLd productId="ironbci-32" />
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

              <ProductPrice productId="ironbci-32" />

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
              <EnclosureLinks links={enclosuresFor("ironbci-32")} className="mb-8 -mt-4" />
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

      {/* ── Guide: where to use it, how to set it up, safety ── */}
      <IronBCI32Guide />
    </main>
  );
}
