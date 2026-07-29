import { Metadata } from "next";
import { Cpu, Zap, Signal, Shield, Layers, Bluetooth } from "lucide-react";
import ProductDetailLayout from "@/components/ProductDetailLayout";

export const metadata: Metadata = {
  title: "Octopus 16 — 16-Channel Wireless ESP32 BCI | PiEEG",
  description:
    "16-channel wireless biosignal device on the Seeed Studio XIAO ESP32-S3. Portable, battery-powered EEG/EMG/ECG acquisition with 24-bit ADS131M08 ADCs and Bluetooth streaming.",
  openGraph: {
    title: "Octopus 16 — 16-Channel Wireless ESP32 BCI",
    description:
      "16-channel wireless biosignal device on the Seeed Studio XIAO ESP32-S3. Portable, battery-powered EEG/EMG/ECG acquisition with 24-bit ADS131M08 ADCs and Bluetooth streaming.",
    images: [{ url: "/products/octopus16.png", width: 1200, height: 630, alt: "Octopus 16 board" }],
  },
};

export default function Octopus16ProductPage() {
  return (
    <ProductDetailLayout
      name="Octopus 16"
      tagline="16-channel wireless biosignal device for the Seeed Studio XIAO ESP32-S3"
      badgeClasses="bg-violet-500/10 text-violet-400 border border-violet-500/20"
      gradient="from-violet-500 to-fuchsia-600"
      ctaGradient="from-violet-500 via-fuchsia-600 to-purple-600"
      ctaTextColor="text-violet-50"
      ctaButtonTextColor="text-fuchsia-600"
      image="/products/octopus16.png"
      imageAlt="Octopus 16 16-Channel Wireless ESP32 BCI"
      images={["/products/octopus16-mount.jpeg", "/products/octopus16-worn.jpeg", "/products/octopus16-firmware.jpg"]}
      channels="16 channels"
      platform="Seeed Studio XIAO ESP32-S3"
      signals={["EEG", "EMG", "ECG"]}
      purchaseUrl="https://www.elecrow.com/octopus-16-brain-computer-interface-with-16-eeg-channel.html"
      githubUrl="https://github.com/pieeg-club/Octopus_16"
      description={
        <>
          <p>
            Octopus 16 brings high-density biosignal acquisition to microcontrollers with the Seeed
            Studio XIAO ESP32-S3, enabling portable, wireless, and low-cost 16-channel EEG data
            acquisition. It uses Texas Instruments ADS131M08 analog front-end chips to capture
            high-quality 24-bit biosignal data.
          </p>
          <p>
            Ideal for researchers, students, and developers building advanced BCI prototypes,
            wireless neural-interface applications, and multi-channel embedded BCI setups. Octopus 16
            is fully compatible with PiEEG Cloud and PiEEG-Server for browser-based visualization.
          </p>
        </>
      }
      specs={[
        { label: "Channels", value: "16" },
        { label: "Resolution", value: "24-bit per channel" },
        { label: "Analog Front-End", value: "2× ADS131M08" },
        { label: "Interface", value: "SPI / Wireless Bluetooth" },
        { label: "Signals", value: "EEG, EMG, ECG" },
        { label: "Platform", value: "Seeed Studio XIAO ESP32-S3" },
        { label: "Power", value: "Battery-powered (5V, ≤300 mAh)" },
        { label: "Software", value: "PiEEG Cloud, PiEEG-Server & Python SDK" },
      ]}
      features={[
        {
          icon: <Layers className="w-5 h-5 text-violet-600 dark:text-violet-400" />,
          title: "16 Biopotential Channels",
          description: "High-density acquisition powered by dual ADS131M08 analog front-end chips.",
        },
        {
          icon: <Bluetooth className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
          title: "Wireless & Portable",
          description: "Bluetooth streaming firmware for the Seeed Studio XIAO ESP32-S3.",
        },
        {
          icon: <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />,
          title: "24-bit Resolution",
          description: "Per-channel high-precision ADC for research-quality signal capture.",
        },
        {
          icon: <Cpu className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />,
          title: "ESP32-S3 Powered",
          description: "Compact, low-power microcontroller ideal for wearable BCI applications.",
        },
        {
          icon: <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
          title: "Battery Operated",
          description: "Runs from a clean battery supply to isolate from mains noise.",
        },
        {
          icon: <Signal className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
          title: "PiEEG Cloud Compatible",
          description: "Connect and stream straight from your browser via Web Bluetooth—zero install.",
        },
      ]}
      ctaTitle="Ready to Get Started?"
      ctaSubtitle="Purchase Octopus 16 from our official manufacturing partner Elecrow"
      ctaSecondaryLabel="View Documentation"
      ctaSecondaryHref="/support"
    />
  );
}
