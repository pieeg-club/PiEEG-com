import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ExternalLink, ShoppingCart, Droplets, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Conductive Gel for EEG — PiEEG",
  description:
    "Low-impedance electrolyte gel for optimal electrode-skin contact with wet EEG electrodes. Medical grade, skin-safe. 100ml bottle.",
  openGraph: {
    title: "Conductive Gel for EEG — PiEEG",
    description:
      "Low-impedance electrolyte gel for optimal electrode-skin contact with wet EEG electrodes. Medical grade, skin-safe.",
    images: [{ url: "/products/gel.png", width: 1200, height: 630, alt: "Conductive Gel for EEG" }],
  },
};

export default function ConductiveGelPage() {
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
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">Conductive Gel for EEG</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50 mb-4">
                <Droplets className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                  Medical Grade
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50 mb-6 ml-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Coming Soon
                </span>
              </div>

              <h1 className="text-5xl font-bold tracking-tight mb-4">
                Conductive Gel for EEG
              </h1>

              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                Low-impedance electrolyte gel for optimal electrode-skin contact. Medical grade and skin-safe.
              </p>

              {/* Spec chips */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { label: "Volume", value: "100 ml" },
                  { label: "Grade", value: "Medical" },
                  { label: "Skin Safe", value: "Yes" },
                ].map(({ label, value }) => (
                  <div key={label} className="px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-0.5">{label}</div>
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500 font-bold cursor-not-allowed">
                  Coming Soon
                </div>
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
                <div className="absolute inset-8 bg-linear-to-br from-green-500 to-emerald-500 opacity-10 blur-3xl rounded-full" />
                <div className="relative aspect-square rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-10 overflow-hidden flex items-center justify-center">
                  <Image
                    src="/products/gel.png"
                    alt="Conductive Gel for EEG"
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
          <h2 className="text-3xl font-bold mb-6">About this gel</h2>
          <div className="space-y-4">
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Conductive gel is essential for achieving low electrode-skin impedance when using wet EEG electrodes. A thin layer applied to each electrode dramatically improves signal quality and reduces artefacts.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              This medical-grade electrolyte gel is formulated for safe, prolonged skin contact. It is compatible with all sintered Ag/AgCl electrodes and the full PiEEG cap range.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              The 100 ml bottle provides enough gel for dozens of recording sessions. This product is coming soon — check back for availability.
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
                <Image src="/products/gel.png" alt="Conductive Gel for EEG — bottle" width={520} height={400} className="object-contain max-h-72 w-auto drop-shadow-xl" />
              </div>
              <div className="px-5 py-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">100ml Bottle</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-600">1 / 2</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col min-h-45 lg:flex-1">
                <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-green-500 to-emerald-500 opacity-15" />
                  <Image src="/products/gel-2.png" alt="Conductive Gel for EEG — in use" width={260} height={200} className="object-contain max-h-28 w-auto relative z-10" style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.08))" }} />
                </div>
                <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Application</span>
                  <span className="text-xs text-zinc-700">2 / 2</span>
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
              { label: "Volume", value: "100 ml" },
              { label: "Grade", value: "Medical / electrolyte" },
              { label: "Skin Safety", value: "Dermatologically tested" },
              { label: "Type", value: "Low-impedance electrolyte" },
              { label: "Compatibility", value: "All Ag/AgCl wet electrodes" },
              { label: "Availability", value: "Coming Soon" },
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
              { icon: <Droplets className="w-5 h-5 text-green-500" />, title: "Low Impedance", description: "Electrolyte formula reduces skin-electrode impedance to ensure clean, low-noise EEG signals." },
              { icon: <Shield className="w-5 h-5 text-emerald-500" />, title: "Skin Safe", description: "Dermatologically tested and safe for prolonged skin contact. Comfortable for long recording sessions." },
              { icon: <Zap className="w-5 h-5 text-teal-500" />, title: "Universal Compatibility", description: "Works with all sintered Ag/AgCl wet electrodes including the PiEEG 8ch and 16ch cap kits." },
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
          <h2 className="text-3xl font-bold mb-4">Coming soon</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">This product is not yet available. In the meantime, explore our caps and hardware platforms.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/hardware"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-lg"
            >
              Browse All Products
            </Link>
            <Link
              href="/hardware#accessories"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
            >
              View Accessories
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
