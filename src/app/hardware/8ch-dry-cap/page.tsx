import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ExternalLink, ShoppingCart, Droplets, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "8 Channel Dry EEG Cap Kit — PiEEG",
  description:
    "EEG dry electrodes cap with dry comfort press-fit electrodes. Ready to use, no conductive gel needed. Compatible with PiEEG, PiEEG-16, IronBCI, and more.",
  openGraph: {
    title: "8 Channel Dry EEG Cap Kit — PiEEG",
    description:
      "EEG dry electrodes cap with dry comfort press-fit electrodes. Ready to use, no conductive gel needed.",
    images: [{ url: "/products/cap8-dry.png", width: 1200, height: 630, alt: "8 Channel Dry EEG Cap Kit" }],
  },
};

export default function Cap8DryPage() {
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
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">8 Channel Dry EEG Cap</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/50 mb-6">
                <Droplets className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  Dry Electrodes
                </span>
              </div>

              <h1 className="text-5xl font-bold tracking-tight mb-4">
                8 Channel Dry EEG Cap Kit
              </h1>

              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                Ready-to-use EEG cap with dry comfort press-fit electrodes. No conductive gel required — just wear and measure.
              </p>

              {/* Spec chips */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { label: "Channels", value: "8" },
                  { label: "Electrode Type", value: "Dry" },
                  { label: "Gel Required", value: "No" },
                ].map(({ label, value }) => (
                  <div key={label} className="px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-0.5">{label}</div>
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.elecrow.com/cap-eeg-kit-8-channels-dry-electrodes.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold shadow-lg transition-all"
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
                <div className="absolute inset-8 bg-linear-to-br from-cyan-500 to-blue-500 opacity-10 blur-3xl rounded-full" />
                <div className="relative aspect-square rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-10 overflow-hidden flex items-center justify-center">
                  <Image
                    src="/products/cap8-dry.png"
                    alt="8 Channel Dry EEG Cap Kit"
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
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-4">
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              The 8 Channel Dry EEG Cap Kit is designed for quick, hassle-free EEG recordings. It comes with dry comfort press-fit electrodes that make direct contact with the scalp — no electrolyte gel, no preparation time.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              The cap is fully adjustable to fit different head sizes and is compatible with all PiEEG, PiEEG-16, IronBCI, MicroBCI, ardEEG, and JNEEG hardware platforms.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Ideal for mobile BCI applications, wearable neuroscience experiments, and any scenario where speed and portability matter more than maximum signal quality.
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
                <Image src="/products/cap8-dry.png" alt="8 Channel Dry EEG Cap — main view" width={520} height={400} className="object-contain max-h-72 w-auto drop-shadow-xl" />
              </div>
              <div className="px-5 py-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Cap Overview</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-600">1 / 3</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col min-h-45 lg:flex-1">
                <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-cyan-500 to-blue-500 opacity-15" />
                  <Image src="/products/cap8-dry-2.jpg" alt="8 Channel Dry EEG Cap — electrode detail" width={260} height={200} className="object-contain max-h-28 w-auto relative z-10" style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.08))" }} />
                </div>
                <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Electrode Detail</span>
                  <span className="text-xs text-zinc-700">2 / 3</span>
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col min-h-45 lg:flex-1">
                <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-cyan-500 to-blue-500 opacity-10" />
                  <Image src="/products/cap8-dry-3.jpg" alt="8 Channel Dry EEG Cap — in use" width={260} height={200} className="object-contain max-h-28 w-auto relative z-10" style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.08))" }} />
                </div>
                <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">In Use</span>
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
              { label: "Electrode Type", value: "Dry press-fit" },
              { label: "Gel Required", value: "No" },
              { label: "Size", value: "Adjustable" },
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
              { icon: <Droplets className="w-5 h-5 text-cyan-500" />, title: "No Gel Needed", description: "Dry press-fit electrodes make direct skin contact. Skip the prep and start recording immediately." },
              { icon: <Shield className="w-5 h-5 text-blue-500" />, title: "Adjustable Fit", description: "Fits a wide range of head sizes. Comfortable for extended recording sessions." },
              { icon: <Zap className="w-5 h-5 text-violet-500" />, title: "Universal Compatibility", description: "Works with all PiEEG hardware platforms. Plug straight into your existing setup." },
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
          <h2 className="text-3xl font-bold mb-4">Ready to use out of the box</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">No setup, no gel. Connect the cap to your PiEEG hardware and start measuring.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.elecrow.com/cap-eeg-kit-8-channels-dry-electrodes.html"
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
