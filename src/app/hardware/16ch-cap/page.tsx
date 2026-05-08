import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ExternalLink, ShoppingCart, Layers, Shield, Signal } from "lucide-react";

export const metadata: Metadata = {
  title: "16 Channel EEG Cap — PiEEG",
  description:
    "Low-cost 16 channel textile EEG cap with gold-plated sintered Ag/AgCl electrodes. Professional grade, reusable. Compatible with PiEEG-16 and IronBCI.",
  openGraph: {
    title: "16 Channel EEG Cap — PiEEG",
    description:
      "Low-cost 16 channel textile EEG cap with gold-plated sintered Ag/AgCl electrodes. Professional grade, reusable.",
    images: [{ url: "/products/cap16.png", width: 1200, height: 630, alt: "16 Channel EEG Cap" }],
  },
};

export default function Cap16Page() {
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
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">16 Channel EEG Cap</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/50 mb-6">
                <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  16 Channels — Professional Grade
                </span>
              </div>

              <h1 className="text-5xl font-bold tracking-tight mb-4">
                16 Channel EEG Cap
              </h1>

              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                Low-cost 16 channel textile EEG cap with gold-plated sintered Ag/AgCl electrodes. Professional grade and fully reusable.
              </p>

              {/* Spec chips */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { label: "Channels", value: "16" },
                  { label: "Electrode Type", value: "Ag/AgCl" },
                  { label: "Grade", value: "Professional" },
                ].map(({ label, value }) => (
                  <div key={label} className="px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-0.5">{label}</div>
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.elecrow.com/low-cost-16-channels-eeg-cap.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg transition-all"
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
                <div className="absolute inset-8 bg-linear-to-br from-purple-500 to-pink-500 opacity-10 blur-3xl rounded-full" />
                <div className="relative aspect-square rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-10 overflow-hidden flex items-center justify-center">
                  <Image
                    src="/products/cap16.png"
                    alt="16 Channel EEG Cap"
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
              The 16 Channel EEG Cap is designed to unlock higher spatial resolution recordings at an accessible price. With 16 sintered Ag/AgCl gold-plated electrodes, it delivers professional-grade signals suitable for research and BCI development.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              The textile cap is durable and washable, making it ideal for repeated use across subjects. It pairs directly with the PiEEG-16 shield and the IronBCI platform.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Standard EEG snap connectors ensure compatibility with the full PiEEG accessory ecosystem. Use with conductive gel for best results.
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
                <Image src="/products/cap16.png" alt="16 Channel EEG Cap — main view" width={520} height={400} className="object-contain max-h-72 w-auto drop-shadow-xl" />
              </div>
              <div className="px-5 py-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Cap Overview</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-600">1 / 3</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col min-h-45 lg:flex-1">
                <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-pink-500 opacity-15" />
                  <Image src="/products/cap16-2.jpg" alt="16 Channel EEG Cap — electrode placement" width={260} height={200} className="object-contain max-h-28 w-auto relative z-10" style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.08))" }} />
                </div>
                <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Electrode Placement</span>
                  <span className="text-xs text-zinc-700">2 / 3</span>
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col min-h-45 lg:flex-1">
                <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-pink-500 opacity-10" />
                  <Image src="/products/cap16-3.jpg" alt="16 Channel EEG Cap — connector detail" width={260} height={200} className="object-contain max-h-28 w-auto relative z-10" style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.08))" }} />
                </div>
                <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Connector Detail</span>
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
              { label: "Channels", value: "16" },
              { label: "Electrode Material", value: "Sintered Ag/AgCl, gold-plated" },
              { label: "Gel Required", value: "Yes (recommended)" },
              { label: "Cap Type", value: "Textile, washable" },
              { label: "Compatibility", value: "PiEEG-16, IronBCI" },
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
              { icon: <Layers className="w-5 h-5 text-purple-500" />, title: "16 Channels", description: "Double the spatial resolution over 8-channel setups. Capture richer brain topography for advanced BCI and research tasks." },
              { icon: <Signal className="w-5 h-5 text-pink-500" />, title: "Gold-Plated Ag/AgCl", description: "Sintered Ag/AgCl electrodes with gold plating for stable, low-impedance contact and excellent longevity." },
              { icon: <Shield className="w-5 h-5 text-indigo-500" />, title: "Reusable & Washable", description: "Professional textile construction designed for repeated use. Clean and reuse across multiple recording sessions." },
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
          <h2 className="text-3xl font-bold mb-4">Professional 16-channel coverage</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">Gold-plated Ag/AgCl electrodes across 16 channels for high-density EEG recordings.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.elecrow.com/low-cost-16-channels-eeg-cap.html"
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
