import { Metadata } from "next";
import { ProductJsonLd } from "@/components/ProductOffer";
import OctoBioGuide from "@/components/octobio-kit/OctoBioGuide";

export const metadata: Metadata = {
  title: "OctoBio Kit: Brain-to-Hardware Learning Kit | PiEEG",
  description:
    "OctoBio Kit: a 16-channel wireless EEG board plus an Arduino starter kit. Read brain rhythms, drive real lights, motors and screens, and program it all with blocks in the browser.",
  openGraph: {
    title: "OctoBio Kit: Brain-to-Hardware Learning Kit",
    description:
      "Octopus 16 EEG + Arduino starter kit. Alpha rises, a light turns on. Build with blocks, run in Chrome or Edge.",
    images: ["/hardware/octobio-kit/octobio-1-262a4266.jpg"],
  },
};

export default function OctoBioKitPage() {
  return (
    <main className="flex-1">
      <ProductJsonLd productId="octobio-kit" />
      <OctoBioGuide showOwnHeader={false} />
    </main>
  );
}
