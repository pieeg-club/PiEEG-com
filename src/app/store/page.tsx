import { Metadata } from "next";
import Link from "next/link";
import {
  ShoppingBag,
  Sparkles,
  GraduationCap,
  Truck,
  ArrowUpRight,
} from "lucide-react";
import { buildStoreHubJsonLd } from "@/lib/store-catalog";
import StoreCatalogClient from "@/components/StoreCatalogClient";
import BulkOrderSection from "@/components/BulkOrderSection";

export const metadata: Metadata = {
  title: "PiEEG Store — Buy Open-Source EEG, EMG & BCI Hardware",
  description:
    "The official PiEEG Store. Shop 8, 16, and 32-channel 24-bit brain-computer interface boards for Raspberry Pi, ESP32, Arduino, STM32, Jetson Nano, VR headsets, and dry/wet EEG caps.",
  alternates: {
    canonical: "https://pieeg.com/store",
  },
  openGraph: {
    title: "PiEEG Store — The Best Way to Buy Open-Source BCI Hardware",
    description:
      "Shop official PiEEG 8 to 32-channel EEG/EMG/ECG boards, wireless headsets, and dry/wet EEG caps. Instant fulfillment via Elecrow + Direct Store launching soon.",
    url: "https://pieeg.com/store",
    siteName: "PiEEG Store",
    images: [
      {
        url: "/products/pieeg.png",
        width: 1200,
        height: 630,
        alt: "PiEEG Official Store",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PiEEG Store — Open-Source Brain-Computer Interface Hardware",
    description:
      "Research-grade 8 to 32-channel 24-bit EEG/EMG/ECG hardware for Raspberry Pi, ESP32, Arduino, STM32, and VR.",
    images: ["/products/pieeg.png"],
  },
};

export default function StorePage() {
  const jsonLd = buildStoreHubJsonLd();

  return (
    <main className="flex-1 bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── Top Announcement Ribbon (Direct Store + Official Partner Info) ── */}
      <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
              <Sparkles className="w-3 h-3" />
              Official Store
            </span>
            <span>
              Immediate worldwide fulfillment via our official manufacturing partner{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">Elecrow</strong> · Direct checkout on{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">pieeg.com</strong> launching soon.
            </span>
          </div>
          <div className="flex items-center gap-4 font-semibold">
            <a
              href="#direct-store-waitlist"
              className="text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Join Direct Store List →
            </a>
            <a
              href="#bulk-orders"
              className="hidden sm:inline-flex items-center gap-1 text-zinc-700 dark:text-zinc-300 hover:text-cyan-500 transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5 text-cyan-500" />
              University &amp; Lab 10–20% Off
            </a>
          </div>
        </div>
      </div>

      {/* ── Apple Store Inspired Hero Header ── */}
      <section className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-12 border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-400 mb-3">
                <ShoppingBag className="w-3.5 h-3.5" />
                PiEEG Store
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.06]">
                Store.{" "}
                <span className="text-zinc-400 dark:text-zinc-500 font-semibold">
                  The best way to buy the brain-computer interfaces you need.
                </span>
              </h1>
            </div>

            {/* Right helper cards (Apple Store "Need shopping help?" style) */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <div className="p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4.5 h-4.5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-zinc-900 dark:text-zinc-100">
                    Ordering for a university or lab?
                  </p>
                  <a
                    href="#bulk-orders"
                    className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline inline-flex items-center gap-0.5"
                  >
                    Request a 10–20% bulk or PO quote
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Truck className="w-4.5 h-4.5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-zinc-900 dark:text-zinc-100">
                    Need deep engineering specs first?
                  </p>
                  <Link
                    href="/hardware"
                    className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-0.5"
                  >
                    Explore interactive hardware guides
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Interactive Store Catalog ── */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StoreCatalogClient />
        </div>
      </section>

      {/* ── Institutional & Bulk Quote Builder ── */}
      <BulkOrderSection />
    </main>
  );
}
