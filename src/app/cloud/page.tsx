import { Metadata } from "next";
import CloudHero from "@/components/cloud/CloudHero";
import CloudBench from "@/components/cloud/CloudBench";
import CloudLobbySection from "@/components/cloud/CloudLobbySection";
import CloudWorkbenches from "@/components/cloud/CloudWorkbenches";
import CloudPrivacyAndEcosystem from "@/components/cloud/CloudPrivacyAndEcosystem";

export const metadata: Metadata = {
  title: "PiEEG Cloud - Browser-Native BCI Operating System",
  description:
    "Connect 8 to 48 channels of EEG, EMG, ECG, and EOG over Web Bluetooth or Web Serial in your browser. Client-side DSP, 15 Hz Live Lab (Bio-Pen), WebRTC P2P Local Bridge (OSC), Buddy AI, and 35+ neural experiences.",
};

export default function CloudPage() {
  return (
    <main className="flex-1">
      <CloudHero />
      <CloudBench />
      <CloudLobbySection />
      <CloudWorkbenches />
      <CloudPrivacyAndEcosystem />
    </main>
  );
}
