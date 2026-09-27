import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ExternalLink, ShoppingCart } from "lucide-react";
import { ProductJsonLd, ProductPrice } from "@/components/ProductOffer";
import { EnclosureLinks } from "@/components/EnclosureLink";
import { enclosuresFor } from "@/lib/thingiverse";
import ArdEEGGuide from "./ArdEEGGuide";

export const metadata: Metadata = {
  title: "ardEEG — 8-Channel Arduino EEG Shield — PiEEG",
  description:
    "EEG with Arduino UNO R4 WiFi. 8 channels, wireless WiFi data transfer, ultra-low power wearable design. Arduino tools for learning biosciences. Available at Elecrow.",
  openGraph: {
    title: "ardEEG — 8-Channel Arduino EEG Shield",
    description:
      "EEG with Arduino UNO R4 WiFi. 8 channels, wireless WiFi data transfer, ultra-low power wearable design. Arduino tools for learning biosciences.",
    images: [{ url: "/products/ardeeg-top.png", width: 1200, height: 630, alt: "ardEEG Arduino EEG shield" }],
  },
};

const PURCHASE_URL = "https://www.elecrow.com/ardeeg.html";
const GITHUB_URL = "https://github.com/Ildaron/ardEEG";
const enclosureLinks = enclosuresFor("ardeeg");

export default function ArdEEGProductPage() {
  return (
    <main className="flex-1">
      <ProductJsonLd productId="ardeeg" />

      {/* ── Breadcrumb ── */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400"
          >
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link
              href="/hardware"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Hardware
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">ardEEG</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-zinc-950 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.04),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Arduino shield
              </div>

              <h1 className="text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 leading-none">
                ardEEG
              </h1>

              <p className="text-xl text-zinc-300 mb-10 leading-relaxed max-w-lg">
                Brain-computer interface for EEG, EMG, and ECG bio-signals with 8 channels on Arduino
              </p>

              <div className="grid grid-cols-3 gap-3 mb-10">
                <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">
                    Channels
                  </div>
                  <div className="text-sm font-bold text-white">8 channels</div>
                </div>
                <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">
                    Platform
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">Arduino UNO R4 WiFi</div>
                </div>
                <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">
                    Signals
                  </div>
                  <div className="text-xs font-bold text-white">EEG · EMG · ECG</div>
                </div>
              </div>

              {/* Price comes from the Elecrow catalog (src/data/elecrow-catalog.json) */}
              <ProductPrice productId="ardeeg" variant="onDark" />

              <div className="flex flex-wrap gap-4">
                <a
                  href={PURCHASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base shadow-2xl hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy on Elecrow
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 font-bold text-base transition-all duration-200"
                >
                  GitHub
                  <ExternalLink className="w-4 h-4 opacity-60" />
                </a>
                {enclosureLinks.length > 0 && (
                  <EnclosureLinks links={enclosureLinks} tone="ondark" className="mt-4" />
                )}
              </div>
            </div>

            {/* Right: product image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-8 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-20 blur-3xl rounded-full" />
                <div className="relative aspect-square rounded-3xl bg-white/[0.03] border border-white/10 p-10 overflow-hidden">
                  <Image
                    src="/products/ardeeg.png"
                    alt="ardEEG 8-Channel Arduino EEG Shield"
                    width={480}
                    height={373}
                    className="object-contain w-full h-full relative z-10 drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Guide: where to use it, how to set it up, safety ── */}
      <ArdEEGGuide />
    </main>
  );
}
