import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ExternalLink, ShoppingCart, FlaskConical, Shield, Signal } from "lucide-react";

export const metadata: Metadata = {
  title: "8 Channel Wet EEG Cap Kit — PiEEG",
  description:
    "Professional textile cap with sintered Ag/AgCl gold-plated wet electrodes for superior signal quality. Includes electrode gel. Compatible with all PiEEG platforms.",
  openGraph: {
    title: "8 Channel Wet EEG Cap Kit — PiEEG",
    description:
      "Professional textile cap with sintered Ag/AgCl gold-plated wet electrodes for superior signal quality.",
    images: [{ url: "/products/cap8-wet.jpg", width: 1200, height: 630, alt: "8 Channel Wet EEG Cap Kit" }],
  },
};

export default function Cap8WetPage() {
  return (
    <main className="flex-1">
      {/* Breadcrumb */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/hardware" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Hardware</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">8 Channel Wet EEG Cap</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 mb-6">
                <FlaskConical className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Wet Electrodes — Research Grade
                </span>
              </div>

              <h1 className="text-5xl font-bold tracking-tight mb-4">
                8 Channel Wet EEG Cap Kit
              </h1>

              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                Professional textile cap with sintered Ag/AgCl gold-plated electrodes for superior signal quality. Includes electrode gel.
              </p>

              {/* Spec chips */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { label: "Channels", value: "8" },
                  { label: "Electrode Type", value: "Wet Ag/AgCl" },
                  { label: "Gold Plated", value: "Yes" },
                ].map(({ label, value }) => (
                  <div key={label} className="px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-0.5">{label}</div>
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.elecrow.com/cap-eeg-kit-8-channels-with-wet-electrodes.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold shadow-lg transition-all"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy on Elecrow
                </a>
                <Link
                  href="/hardware"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold transition-all text-zinc-700 dark:text-zinc-300"
                >
                  All Products
                </Link>
              </div>
            </div>

            {/* Product image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-8 bg-linear-to-br from-blue-500 to-indigo-500 opacity-10 blur-3xl rounded-full" />
                <div className="relative aspect-square rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-10 overflow-hidden flex items-center justify-center">
                  <Image
                    src="/products/cap8-wet.jpg"
                    alt="8 Channel Wet EEG Cap Kit"
                    width={420}
                    height={420}
                    className="object-contain w-full h-full drop-shadow-xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">About this cap</h2>
          <div className="space-y-4">
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              The 8 Channel Wet EEG Cap Kit is built for researchers and developers who need the highest possible signal quality. The sintered Ag/AgCl electrodes are gold-plated for low-impedance contact and long-term durability.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              The professional textile cap distributes electrode pressure evenly across the scalp. Combined with electrode gel, this setup achieves impedances suitable for clinical and research-grade EEG acquisition.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Fully compatible with all PiEEG hardware platforms. Includes the cap, 8 wet electrodes, and the necessary cabling.
            </p>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="py-14 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">Product Gallery</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden flex flex-col min-h-70 lg:min-h-100">
              <div className="flex-1 flex items-center justify-center p-12">
                <Image src="/products/cap8-wet.jpg" alt="8 Channel Wet EEG Cap — main view" width={520} height={400} className="object-contain max-h-72 w-auto drop-shadow-xl" />
              </div>
              <div className="px-5 py-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Cap Overview</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-600">1 / 3</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col min-h-45 lg:flex-1">
                <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-indigo-500 opacity-15" />
                  <Image src="/products/cap8-wet-2.jpg" alt="8 Channel Wet EEG Cap — electrode detail" width={260} height={200} className="object-contain max-h-28 w-auto relative z-10" style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.08))" }} />
                </div>
                <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Electrode Detail</span>
                  <span className="text-xs text-zinc-700">2 / 3</span>
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col min-h-45 lg:flex-1">
                <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-indigo-500 opacity-10" />
                  <Image src="/products/cap8-wet-3.jpg" alt="8 Channel Wet EEG Cap — cap view" width={260} height={200} className="object-contain max-h-28 w-auto relative z-10" style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.08))" }} />
                </div>
                <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Cap View</span>
                  <span className="text-xs text-zinc-700">3 / 3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-12 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            {[
              { label: "Channels", value: "8" },
              { label: "Electrode Type", value: "Sintered Ag/AgCl, gold-plated" },
              { label: "Gel Required", value: "Yes (included)" },
              { label: "Size", value: "Adjustable textile cap" },
              { label: "Compatibility", value: "PiEEG, IronBCI, MicroBCI, ardEEG, JNEEG" },
              { label: "Connector", value: "Standard EEG snap" },
            ].map(({ label, value }) => (
              <div key={label} className="px-6 py-4 bg-white dark:bg-zinc-950">
                <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">{label}</dt>
                <dd className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{value}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Key Features</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <FlaskConical className="w-5 h-5 text-blue-500" />, title: "Ag/AgCl Electrodes", description: "Gold-plated sintered Ag/AgCl electrodes deliver ultra-low impedance for clinical-quality signals." },
              { icon: <Signal className="w-5 h-5 text-indigo-500" />, title: "Superior Signal Quality", description: "Wet contact provides the lowest possible skin-electrode impedance, ideal for research-grade EEG." },
              { icon: <Shield className="w-5 h-5 text-violet-500" />, title: "Professional Textile Cap", description: "Durable, washable textile cap distributes electrodes uniformly across the scalp." },
            ].map(({ icon, title, description }) => (
              <div key={title} className="flex flex-col gap-3 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60">
                <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">{icon}</div>
                <h3 className="font-bold text-sm">{title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Research-grade signal quality</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">Gold-plated Ag/AgCl electrodes for maximum signal fidelity in every session.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.elecrow.com/cap-eeg-kit-8-channels-with-wet-electrodes.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              Buy on Elecrow
            </a>
            <Link
              href="/hardware"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
            >
              Browse All Products
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
