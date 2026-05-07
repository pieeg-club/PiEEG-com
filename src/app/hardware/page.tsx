import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu, Zap, Code, ChevronRight, ExternalLink, ShoppingCart, Package } from "lucide-react";
import ProductsGrid from "@/components/ProductsGrid";

export const metadata: Metadata = {
  title: "Products — PiEEG",
  description:
    "Explore our line of research-grade brain-computer interface hardware. From 8 to 32 channels, compatible with Raspberry Pi, Arduino, and Jetson Nano.",
};

// Hardware Products
const hardwareProducts = [
  {
    id: "pieeg",
    name: "PiEEG",
    tagline: "8-channel Raspberry Pi shield",
    description:
      "The Raspberry Pi stands as one of the most esteemed single-board computers. PiEEG provides accessible real-time EEG data reading and signal processing directly on the Raspberry Pi.",
    channels: "8 channels",
    platform: "Raspberry Pi 3/4/5",
    signals: ["EEG", "EMG", "ECG"],
    features: [
      "SPI 250 SPS to 16 kSPS",
      "24-bit resolution per channel",
      "Programmable gain: 1-24",
      "Impedance measurement",
      "Open-source Python SDK"
    ],
    status: "Available",
    badge: "Most Popular",
    gradient: "from-cyan-500 to-blue-600",
    bgGradient: "from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30",
    image: "/products/pieeg.png",
    purchaseUrl: "https://www.elecrow.com/pieeg.html",
    github: "https://github.com/pieeg-club/PiEEG",
    youtube: "https://youtu.be/0ocAPWok5YU",
    categories: ["raspberry-pi", "8ch"]
  },
  {
    id: "pieeg-16",
    name: "PiEEG-16",
    tagline: "16-channel Raspberry Pi shield",
    description:
      "Measure 16 channels for more interesting and complex projects compared to the 8-channel version. Maintains all advantages of Raspberry Pi integration.",
    channels: "16 channels",
    platform: "Raspberry Pi 5",
    signals: ["EEG", "EMG", "ECG"],
    features: [
      "SPI 250 SPS to 16 kSPS",
      "24-bit resolution per channel",
      "Programmable gain: 1-24",
      "Impedance measurement",
      "Open-source Python SDK"
    ],
    status: "Available",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
    image: "/products/pieeg-16.png",
    purchaseUrl: "https://www.elecrow.com/pieeg-16.html",
    github: "https://github.com/pieeg-club/PiEEG-16",
    youtube: "https://youtu.be/tjCazk2Efqs",
    categories: ["raspberry-pi", "16ch+"]
  },
  {
    id: "ironbci",
    name: "IronBCI",
    tagline: "8-channel wearable BCI",
    description:
      "Powerful, compact, and highly adaptable biopotential acquisition system. Ideal for neuroscience research, BCI development, and prototyping.",
    channels: "8 channels",
    platform: "BLE5 Wireless",
    signals: ["EEG", "EMG", "ECG"],
    features: [
      "Bluetooth Low Energy 5",
      "250 SPS, 24-bit resolution",
      "Python + Android SDK",
      "50mm diameter, wearable",
      "3D printable headset design"
    ],
    status: "Available",
    badge: "Wireless",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
    image: "/products/ironbci.jpg",
    purchaseUrl: "https://www.elecrow.com/ironbci.html",
    github: "https://github.com/pieeg-club/ironbci",
    youtube: "https://www.youtube.com/watch?v=gWpfsLuq_eE",
    categories: ["wireless", "8ch"]
  },
  {
    id: "ironbci-32",
    name: "IronBCI-32",
    tagline: "32-channel professional system",
    description:
      "Integrates four 8-channel AD7771 ADCs with STM32H7 ARM Cortex-M7. Ultra-low-noise sources ensuring highly accurate signal capture. Brainflow integrated.",
    channels: "32 channels",
    platform: "STM32H7",
    signals: ["EEG", "EMG", "ECG"],
    features: [
      "4× AD7771 ADCs (8ch each)",
      "512 SPS per channel (all 32)",
      "Brainflow library integrated",
      "Serial port data transfer",
      "Research-grade accuracy"
    ],
    status: "Available",
    badge: "Research Grade",
    gradient: "from-red-500 to-orange-600",
    bgGradient: "from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30",
    image: "/products/ironbci-32.png",
    purchaseUrl: "https://www.elecrow.com/ironbci-32.html",
    github: "https://github.com/pieeg-club/ironbci-32",
    categories: ["16ch+"]
  },
  {
    id: "microbci",
    name: "MicroBCI",
    tagline: "8-channel STM32 shield",
    description:
      "Brings Brain-Computer Interface capabilities to STM32 NUCLEO development boards. Ideal tool for learning, prototyping, and research in neuroscience.",
    channels: "8 channels",
    platform: "STM32 NUCLEO-WB55",
    signals: ["EEG", "EMG", "ECG"],
    features: [
      "SPI 250 SPS",
      "Programmable gain: 1-24",
      "Python SDK + Mobile SDK",
      "STM32 ecosystem integration",
      "Low power consumption"
    ],
    status: "Available",
    gradient: "from-teal-500 to-cyan-600",
    bgGradient: "from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30",
    image: "/products/microbci.png",
    purchaseUrl: "https://www.elecrow.com/microbci-eeg-with-stm32.html",
    github: "https://github.com/pieeg-club/MicroBCI",
    categories: ["wireless", "8ch"]
  },
  {
    id: "ardeeg",
    name: "ardEEG",
    tagline: "8-channel Arduino shield",
    description:
      "Arduino tools for learning electronics, now for learning biosciences. Excellent solution for wearable applications with low power consumption.",
    channels: "8 channels",
    platform: "Arduino UNO R4 WiFi",
    signals: ["EEG", "EMG", "ECG"],
    features: [
      "SPI data transfer",
      "Programmable gain: 1-24",
      "Impedance measurement",
      "Ultra-low power, wearable",
      "Python SDK provided"
    ],
    status: "Available",
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
    image: "/products/ardeeg.png",
    purchaseUrl: "https://www.elecrow.com/ardeeg.html",
    github: "https://github.com/Ildaron/ardEEG",
    youtube: "https://youtu.be/s_5mDDUFp6E",
    categories: ["8ch"]
  },
  {
    id: "jneeg",
    name: "JNEEG",
    tagline: "8-channel Jetson Nano shield",
    description:
      "Created for Machine Learning and Deep Learning signal processing. Seamless real-time EEG reading and processing directly on Jetson Nano.",
    channels: "8 channels",
    platform: "Jetson Nano",
    signals: ["EEG", "EMG", "ECG"],
    features: [
      "SPI 250 SPS to 16 kSPS",
      "24-bit resolution per channel",
      "ML/DL optimized",
      "Real-time processing",
      "Programmable gain: 1-24"
    ],
    status: "Available",
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30",
    image: "/products/jneeg.png",
    purchaseUrl: "https://www.elecrow.com/jneeg.html",
    github: "https://github.com/Pi-EEG/EEG-with-JetsonNano",
    youtube: "https://youtu.be/f3stVQCsfrM",
    categories: ["8ch"]
  }
];

// Accessories & Add-ons
const accessories = [
  {
    id: "8ch-dry-cap",
    name: "8 Channel Dry EEG Cap Kit",
    description: "EEG dry electrodes cap with dry comfort press-fit electrodes. Ready to use, no conductive gel needed.",
    specs: "8 channels • Dry electrodes • Adjustable size",
    gradient: "from-cyan-500 to-blue-500",
    purchaseUrl: "https://www.elecrow.com/cap-eeg-kit-8-channels-dry-electrodes.html",
    status: "Available"
  },
  {
    id: "8ch-wet-cap",
    name: "8 Channel Wet EEG Cap Kit",
    description: "Professional textile cap with sintered Ag/AgCl gold-plated wet electrodes for superior signal quality.",
    specs: "8 channels • Wet electrodes • Includes gel",
    gradient: "from-blue-500 to-indigo-500",
    purchaseUrl: "https://www.elecrow.com/cap-eeg-kit-8-channels-with-wet-electrodes.html",
    status: "Available"
  },
  {
    id: "16ch-cap",
    name: "16 Channel EEG Cap",
    description: "Low-cost 16 channel textile EEG cap with gold-plated sintered Ag/AgCl electrodes.",
    specs: "16 channels • Professional grade • Reusable",
    gradient: "from-purple-500 to-pink-500",
    purchaseUrl: "https://www.elecrow.com/low-cost-16-channels-eeg-cap.html",
    status: "Available"
  },
  {
    id: "conductive-gel",
    name: "Conductive Gel for EEG",
    description: "Low-impedance electrolyte gel for optimal electrode-skin contact with wet electrodes.",
    specs: "100ml bottle • Medical grade • Skin-safe",
    gradient: "from-green-500 to-emerald-500",
    purchaseUrl: "https://www.elecrow.com/conductive-gel-for-eeg.html",
    status: "Coming Soon"
  }
];

export default function ProductsPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/50 mb-6">
              <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Complete Catalog
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Research-grade biosignal
              <br />
              <span className="bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 bg-clip-text text-transparent">
                hardware for everyone
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              11 products: 7 hardware platforms and 4 accessories. MIT-licensed software included.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#hardware"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-cyan-500/30 transition-all"
              >
                Explore Products
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold transition-all"
              >
                Documentation
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Products Section */}
      <section id="hardware" className="py-20 sm:py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Hardware Platforms
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
              Every device is extensively documented and backed by our community.
            </p>
          </div>

          <ProductsGrid products={hardwareProducts} />
        </div>
      </section>

      {/* Accessories Section */}
      <section className="py-20 sm:py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Accessories & Add-ons
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Professional EEG caps and electrodes to complete your setup.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessories.map((accessory) => (
              <div
                key={accessory.id}
                className="group p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-lg bg-linear-to-br ${accessory.gradient} mb-4 flex items-center justify-center text-white shadow-lg`}>
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{accessory.name}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  {accessory.description}
                </p>
                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-500 mb-4">
                  {accessory.specs}
                </p>
                {accessory.status === "Available" ? (
                  <a
                    href={accessory.purchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r ${accessory.gradient} text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Shop Now
                  </a>
                ) : (
                  <div className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 font-semibold text-sm text-center">
                    {accessory.status}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose PiEEG */}
      <section className="py-20 sm:py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Why choose PiEEG hardware?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center">
                    <Code className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">MIT-Licensed Software</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Software and SDKs are MIT licensed. Fork, modify, and build on our code. Hardware designs are proprietary.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Research-Grade Quality</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                      24-bit ADCs, medical-grade components, and rigorous testing. Used in peer-reviewed research worldwide.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Platform Flexibility</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Choose your compute platform: Raspberry Pi for versatility, Arduino for embedded, Jetson for AI.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-linear-to-br from-cyan-100 to-blue-100 dark:from-cyan-950 dark:to-blue-950 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
                    1000+
                  </div>
                  <p className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                    Researchers worldwide
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    From hobbyists to universities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-cyan-500 via-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to start measuring biosignals?
          </h2>
          <p className="text-lg text-cyan-50 mb-8 max-w-2xl mx-auto">
            Join the community of researchers, makers, and neuroscience enthusiasts building the future of open BCI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/support"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-blue-600 hover:bg-zinc-100 font-bold shadow-xl transition-all"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white hover:bg-white/10 font-bold transition-all"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
