import { Metadata } from "next";
import { Cpu, Zap, Signal, Shield, Layers } from "lucide-react";
import ProductDetailLayout from "@/components/ProductDetailLayout";

export const metadata: Metadata = {
  title: "PiEEG-16 — 16-Channel Raspberry Pi EEG Shield | PiEEG",
  description:
    "16-channel EEG shield for Raspberry Pi 5. Double the channels for complex neuroscience projects. 24-bit resolution, 250 SPS to 16 kSPS. Buy at Elecrow.",
};

export default function PiEEG16ProductPage() {
  return (
    <ProductDetailLayout
      name="PiEEG-16"
      tagline="16-channel EEG device for Raspberry Pi 5 — double the resolution for complex research"
      badgeClasses="bg-blue-500/10 text-blue-400 border border-blue-500/20"
      gradient="from-blue-500 to-indigo-600"
      ctaGradient="from-blue-500 via-indigo-600 to-purple-600"
      ctaTextColor="text-blue-50"
      ctaButtonTextColor="text-indigo-600"
      image="/products/pieeg-16.png"
      imageAlt="PiEEG-16 16-Channel Raspberry Pi EEG Shield"
      videoId="tjCazk2Efqs"
      channels="16 channels"
      platform="Raspberry Pi 5"
      signals={["EEG", "EMG", "ECG"]}
      purchaseUrl="https://www.elecrow.com/pieeg-16.html"
      githubUrl="https://github.com/pieeg-club/PiEEG-16"
      description={
        <>
          <p>
            The PiEEG-16 enables you to measure 16 channels, making it possible to use in more
            interesting and complex projects compared to the 8-channel version. It maintains all the
            advantages of Raspberry Pi integration — reliability, accessibility to neuroscience, and
            real-time processing capabilities.
          </p>
          <p>
            Applications include mind-controlled robotic manipulation and stress/meditation management.
            We provide comprehensive SDKs, documentation, and extensive user support.
          </p>
        </>
      }
      specs={[
        { label: "Channels", value: "16" },
        { label: "Resolution", value: "24-bit per channel" },
        { label: "Sample Rate", value: "250 SPS – 16 kSPS" },
        { label: "Interface", value: "SPI" },
        { label: "Gain", value: "1 / 2 / 4 / 6 / 8 / 12 / 24" },
        { label: "Signals", value: "EEG, EMG, ECG" },
        { label: "Platform", value: "Raspberry Pi 5" },
        { label: "Impedance", value: "Built-in measurement" },
        { label: "Software", value: "Open-source Python SDK" },
      ]}
      features={[
        {
          icon: <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
          title: "Raspberry Pi 5 Compatible",
          description: "Optimized for the latest and fastest Raspberry Pi platform.",
        },
        {
          icon: <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
          title: "16 Biopotential Channels",
          description: "Twice the channels for richer spatial coverage and complex brain mapping.",
        },
        {
          icon: <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
          title: "SPI Protocol",
          description: "Configurable from 250 SPS to 16 kSPS for flexible sampling requirements.",
        },
        {
          icon: <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />,
          title: "24-bit Resolution",
          description: "Per-channel high-precision ADC for clinical-quality signal capture.",
        },
        {
          icon: <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
          title: "Programmable Gain",
          description: "Adjustable gain: 1, 2, 4, 6, 8, 12, 24 — adapts to any electrode setup.",
        },
        {
          icon: <Signal className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
          title: "Impedance Measurement",
          description: "Built-in electrode impedance testing for reliable signal quality.",
        },
      ]}
      ctaTitle="Ready to Get Started?"
      ctaSubtitle="Purchase PiEEG-16 from our official manufacturing partner Elecrow"
      ctaSecondaryLabel="View Documentation"
      ctaSecondaryHref="/support"
    />
  );
}
