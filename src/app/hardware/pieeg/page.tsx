import { Metadata } from "next";
import { Cpu, Zap, Signal, Shield, Code } from "lucide-react";
import ProductDetailLayout from "@/components/ProductDetailLayout";

export const metadata: Metadata = {
  title: "PiEEG — 8-Channel Raspberry Pi EEG Shield — PiEEG",
  description:
    "Transform your Raspberry Pi into a brain-computer interface. 8 channels, 24-bit resolution, 250 SPS to 16 kSPS. Open-source Python SDK. Available at Elecrow.",
};

export default function PiEEGProductPage() {
  return (
    <ProductDetailLayout
      name="PiEEG"
      tagline="Brain-computer interface for EEG, EMG, and ECG bio-signals with 8 channels"
      badge="Most Popular"
      badgeClasses="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
      gradient="from-cyan-500 to-blue-600"
      ctaGradient="from-cyan-500 via-blue-600 to-purple-600"
      ctaTextColor="text-cyan-50"
      ctaButtonTextColor="text-blue-600"
      image="/products/pieeg.png"
      imageAlt="PiEEG 8-Channel Raspberry Pi EEG Shield"
      videoId="0ocAPWok5YU"
      channels="8 channels"
      platform="Raspberry Pi 3/4/5"
      signals={["EEG", "EMG", "ECG"]}
      purchaseUrl="https://www.elecrow.com/pieeg.html"
      githubUrl="https://github.com/pieeg-club/PiEEG"
      description={
        <>
          <p>
            The Raspberry Pi stands as one of the most esteemed single-board computers in the world,
            renowned for its reliability and user-friendliness. The utilization of PiEEG in
            conjunction with Raspberry Pi provides an accessible avenue for delving into the realm of
            neuroscience.
          </p>
          <p>
            Our methodology facilitates seamless real-time EEG data reading and signal processing
            directly on the Raspberry Pi, eliminating the need for data transmission or additional
            computing resources. This setup is particularly well-suited for those seeking to grasp the
            fundamentals of bioscience, engage in mind-controlled robotic manipulation, or manage
            stress and meditation.
          </p>
          <p>
            We provide comprehensive software packages, along with all requisite technical
            documentation and extensive user support for PiEEG device enthusiasts.
          </p>
        </>
      }
      specs={[
        { label: "Channels", value: "8" },
        { label: "Resolution", value: "24-bit per channel" },
        { label: "Sample Rate", value: "250 SPS – 16 kSPS" },
        { label: "Interface", value: "SPI" },
        { label: "Gain", value: "1 / 2 / 4 / 6 / 8 / 12 / 24" },
        { label: "Signals", value: "EEG, EMG, ECG" },
        { label: "Platform", value: "Raspberry Pi 3, 4, 5" },
        { label: "GPIO Pins", value: "3 free GPIO pins" },
        { label: "Impedance", value: "Built-in measurement" },
        { label: "Software", value: "Open-source Python SDK" },
      ]}
      features={[
        {
          icon: <Cpu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
          title: "Compatible Platforms",
          description: "Works with Raspberry Pi 3, 4 and 5 — the world's most popular SBCs.",
        },
        {
          icon: <Signal className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
          title: "8 Biopotential Channels",
          description: "Connect wet or dry electrodes across 8 fully differential input channels.",
        },
        {
          icon: <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
          title: "SPI Data Transfer",
          description: "Configurable from 250 SPS to 16 kSPS for flexible sampling requirements.",
        },
        {
          icon: <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />,
          title: "24-bit Resolution",
          description: "Per-channel high-precision ADC ensuring clinical-quality signal capture.",
        },
        {
          icon: <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
          title: "Programmable Gain",
          description: "Adjustable gain: 1, 2, 4, 6, 8, 12, 24 — adapts to any electrode setup.",
        },
        {
          icon: <Code className="w-5 h-5 text-pink-600 dark:text-pink-400" />,
          title: "Open-Source Python SDK",
          description: "Full software stack for data acquisition, filtering, and visualization.",
        },
        {
          icon: <Signal className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
          title: "Impedance Measurement",
          description: "Built-in electrode impedance testing for reliable signal quality.",
        },
        {
          icon: <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
          title: "3 Free GPIO Pins",
          description: "Available for connecting external objects and peripherals.",
        },
      ]}
      ctaTitle="Ready to Get Started?"
      ctaSubtitle="Purchase PiEEG from our official manufacturing partner Elecrow"
      ctaSecondaryLabel="View Documentation"
      ctaSecondaryHref="/support"
    />
  );
}
