import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ExternalLink, ShoppingCart, FlaskConical, Shield, Signal, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "32 Channel Wet EEG Cap Kit — PiEEG",
  description:
    "Professional 32-channel nylon EEG cap with 32 wet Ag/AgCl electrodes and 2 ear clip references. Designed for IronBCI-32. 2.54mm pin pitch, plug-and-play.",
  openGraph: {
    title: "32 Channel Wet EEG Cap Kit — PiEEG",
    description:
      "Professional 32-channel nylon EEG cap with 32 wet Ag/AgCl electrodes and 2 ear clip references. Designed for IronBCI-32.",
    images: [{ url: "/products/cap32-wet.webp", width: 1200, height: 630, alt: "32 Channel Wet EEG Cap Kit" }],
  },
};

export default function Cap32WetPage() {
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
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">32 Channel Wet EEG Cap</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50 mb-6">
                <FlaskConical className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
                  32 Channels — Research Grade
                </span>
              </div>

              <h1 className="text-5xl font-bold tracking-tight mb-4">
                32 Channel Wet EEG Cap Kit
              </h1>

              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                Professional nylon EEG cap with 32 wet Ag/AgCl electrodes and 2 ear clip references. Plug-and-play with IronBCI-32 via 2.54mm pin pitch.
              </p>

              {/* Spec chips */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { label: "Channels", value: "32" },
                  { label: "Electrode Type", value: "Wet Ag/AgCl" },
                  { label: "Price", value: "$480" },
                ].map(({ label, value }) => (
                  <div key={label} className="px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-0.5">{label}</div>
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.elecrow.com/cap-eeg-kit-32-channels-with-32-wet-electrodes-and-2-clips-electrode.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold shadow-lg transition-all"
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
                <div className="absolute inset-8 bg-linear-to-br from-red-500 to-orange-500 opacity-10 blur-3xl rounded-full" />
                <div className="relative aspect-square rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-10 overflow-hidden flex items-center justify-center">
                  <Image
                    src="/products/cap32-wet.webp"
                    alt="32 Channel Wet EEG Cap Kit"
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
          <h2 className="text-3xl font-bold mb-6">About this kit</h2>
          <div className="space-y-4">
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              This professional-grade kit includes everything required for high-fidelity EEG data acquisition using the IronBCI-32. Featuring a durable nylon cap (Size L), the system utilizes 32 high-quality wet Ag/AgCl electrodes to ensure superior signal quality and low impedance.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              All components feature a standard 2.54mm pin pitch for seamless plug-and-play compatibility with the IronBCI-32. The two included ear clip electrodes serve as reference and ground channels, following standard EEG conventions.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              The 32 electrode positions follow the international 10-20 system, covering the full scalp from frontal to occipital regions across both hemispheres — ideal for full-brain EEG research and BCI applications.
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
                <Image src="/products/cap32-wet.webp" alt="32 Channel Wet EEG Cap — main view" width={520} height={400} className="object-contain max-h-72 w-auto drop-shadow-xl" />
              </div>
              <div className="px-5 py-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Cap Overview</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-600">1 / 3</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col min-h-45 lg:flex-1">
                <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-red-500 to-orange-500 opacity-15" />
                  <Image src="/products/cap32-wet-2.webp" alt="32 Channel Wet EEG Cap — electrode detail" width={260} height={200} className="object-contain max-h-28 w-auto relative z-10" style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.08))" }} />
                </div>
                <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Electrode Detail</span>
                  <span className="text-xs text-zinc-700">2 / 3</span>
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col min-h-45 lg:flex-1">
                <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-red-500 to-orange-500 opacity-10" />
                  <Image src="/products/cap32-wet-3.webp" alt="32 Channel Wet EEG Cap — cap worn view" width={260} height={200} className="object-contain max-h-28 w-auto relative z-10" style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.08))" }} />
                </div>
                <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Cap Worn View</span>
                  <span className="text-xs text-zinc-700">3 / 3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Electrode Map */}
      <section className="py-12 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Electrode Positions (10-20 System)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Midline (z-line)</h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">Fpz · Fz · FCz · Cz · CPz · Pz · POz · Oz</p>
            </div>
            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Left Hemisphere (odd)</h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">Fp1 · F7 · F3 · FC5 · FC1 · T7 · C3 · CP5 · CP1 · P7 · P3 · O1</p>
            </div>
            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Right Hemisphere (even)</h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">Fp2 · F8 · F4 · FC6 · FC2 · T8 · C4 · CP6 · CP2 · P8 · P4 · O2</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-12 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            {[
              { label: "Channels", value: "32 EEG + 2 ear clip references" },
              { label: "Electrode Type", value: "Wet Ag/AgCl" },
              { label: "Connector", value: "2.54mm pin pitch" },
              { label: "Cap Material", value: "Nylon, Size L" },
              { label: "Compatibility", value: "IronBCI-32" },
              { label: "Weight", value: "350g" },
              { label: "Electrode Standard", value: "10-20 system" },
              { label: "SKU", value: "PIA24026P" },
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
      <section className="py-12 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Key Features</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <Layers className="w-5 h-5 text-red-500" />, title: "32 Channels", description: "Full-scalp coverage with 32 wet Ag/AgCl electrodes following the 10-20 system across both hemispheres and the midline." },
              { icon: <Signal className="w-5 h-5 text-orange-500" />, title: "Plug & Play", description: "2.54mm pin pitch connectors are directly compatible with IronBCI-32 — no soldering or adapters required." },
              { icon: <Shield className="w-5 h-5 text-amber-500" />, title: "Dual Reference", description: "Two ear clip electrodes (A1/A2) included for standard linked-ear or single-ended reference configurations." },
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
          <h2 className="text-3xl font-bold mb-4">Full-scalp 32-channel EEG coverage</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">Wet Ag/AgCl electrodes across 32 channels for high-density brain recordings with IronBCI-32.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.elecrow.com/cap-eeg-kit-32-channels-with-32-wet-electrodes-and-2-clips-electrode.html"
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
