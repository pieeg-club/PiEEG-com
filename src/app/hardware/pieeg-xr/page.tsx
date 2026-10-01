import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ExternalLink, Rocket } from "lucide-react";
import { ProductPrice } from "@/components/ProductOffer";
import { EnclosureLinks } from "@/components/EnclosureLink";
import { XR_ENCLOSURE, XR_GITHUB, XR_KICKSTARTER, xrYoutube } from "../_xr/media";
import PieegXRGuide from "./PieegXRGuide";

export const metadata: Metadata = {
  title: "PiEEG XR — Neural Face Interface for Spatial Computing | PiEEG",
  description:
    "Face-gasket neural interface for VR headsets. 8-channel facial EMG and EEG, 24-bit IronBCI front-end, BLE 5. Price coming soon on Kickstarter.",
  openGraph: {
    title: "PiEEG XR — Neural Face Interface",
    description:
      "Face-gasket neural interface for VR headsets. 8-channel facial EMG and EEG, 24-bit IronBCI front-end, BLE 5.",
    images: [
      { url: "/products/pieeg-xr.png", width: 1200, height: 630, alt: "PiEEG XR neural face interface" },
    ],
  },
};

// Main demo video (first entry in ../_xr/media.ts)
const VIDEO = xrYoutube[0];

export default function PiEEGXRProductPage() {
  return (
    <main className="flex-1">
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
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">PiEEG XR</span>
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 bg-violet-500/10 text-violet-400 border border-violet-500/20">
                Newest
              </div>

              <h1 className="text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 leading-none">
                PiEEG XR
              </h1>

              <p className="text-xl text-zinc-300 mb-10 leading-relaxed max-w-lg">
                Neural face interface that snaps onto a VR headset
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
                  <div className="text-xs font-bold text-white leading-tight">VR headset · BLE 5</div>
                </div>
                <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">
                    Signals
                  </div>
                  <div className="text-xs font-bold text-white">EEG · EMG</div>
                </div>
              </div>

              <ProductPrice productId="pieeg-xr" variant="onDark" fallback="Coming soon" />

              <div className="flex flex-wrap gap-4">
                <a
                  href={XR_KICKSTARTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-600 text-white font-bold text-base shadow-2xl hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
                >
                  <Rocket className="w-5 h-5" />
                  Back on Kickstarter
                </a>
                <a
                  href={XR_GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 font-bold text-base transition-all duration-200"
                >
                  GitHub
                  <ExternalLink className="w-4 h-4 opacity-60" />
                </a>
                {/* 3D model: https://www.thingiverse.com/thing:7392535 */}
                <EnclosureLinks links={[XR_ENCLOSURE]} tone="ondark" className="mt-4" />
              </div>
            </div>

            {/* Right: product image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-8 bg-gradient-to-br from-violet-500 to-cyan-600 opacity-20 blur-3xl rounded-full" />
                <div className="relative aspect-square rounded-3xl bg-white/[0.03] border border-white/10 p-6 overflow-hidden">
                  <Image
                    src="/products/pieeg-xr.png"
                    alt="PiEEG XR face gasket with eight dry electrodes, kit box, and VR headset"
                    width={480}
                    height={480}
                    className="object-contain w-full h-full relative z-10 drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* YouTube video */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO.id}`}
                title={VIDEO.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Guide: where to use it, how to set it up, safety ── */}
      <PieegXRGuide />
    </main>
  );
}
