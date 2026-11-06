import { Metadata } from "next";
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
      "Shop official PiEEG 8 to 32-channel EEG/EMG/ECG boards, wireless headsets, and dry/wet EEG caps. Instant fulfillment via Elecrow + 10–20% Academic & Lab discounts.",
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
    <main className="flex-1 bg-white text-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── Main Interactive Store Catalog (Above-the-fold conversion layout) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pt-6 sm:pb-16">
        <StoreCatalogClient />
      </div>

      {/* ── Institutional & Bulk Quote Builder ── */}
      <BulkOrderSection />
    </main>
  );
}
