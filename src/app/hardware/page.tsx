import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu, Code, ChevronRight, ExternalLink, ShoppingCart, Package, Tag, BookOpen } from "lucide-react";
import ProductsGrid from "@/components/ProductsGrid";
import HardwareSelectorButton from "@/components/HardwareSelectorButton";
import HeroVideo from "@/components/HeroVideo";

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
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        {/* Background video — loops with fade-dim transition between repeats */}
        <HeroVideo />
        {/* Artistic gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-violet-600/10 dark:from-cyan-500/15 dark:to-violet-600/15 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-t from-white/80 via-white/20 to-white/60 dark:from-zinc-950/85 dark:via-zinc-950/20 dark:to-zinc-950/60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm mb-4">
              <Cpu className="w-4 h-4 text-cyan-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Complete Catalog
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.02] mb-4">
              Research-grade biosignal
              <br />
              <span className="bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-500 bg-clip-text text-transparent">
                hardware for everyone
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 mb-5 max-w-xl mx-auto leading-relaxed">
              11 products: 7 hardware platforms and 4 accessories. MIT-licensed software included.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <HardwareSelectorButton />
              <Link
                href="#hardware"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-md"
              >
                Explore Products
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Documentation
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Products Section */}
      <section id="hardware" className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Hardware Platforms
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              Every device is extensively documented and backed by our community.
            </p>
          </div>

          <ProductsGrid products={hardwareProducts} />
        </div>
      </section>

      {/* Accessories Section */}
      <section className="py-10 sm:py-14 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Accessories & Add-ons
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              Professional EEG caps and electrodes to complete your setup.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {accessories.map((accessory) => (
              <div
                key={accessory.id}
                className="group p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${accessory.gradient} mb-4 flex items-center justify-center text-white shadow-md`}>
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm mb-2">{accessory.name}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 flex-1 leading-relaxed">
                  {accessory.description}
                </p>
                <p className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 mb-4">
                  {accessory.specs}
                </p>
                {accessory.status === "Available" ? (
                  <a
                    href={accessory.purchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-xs hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Shop Now
                  </a>
                ) : (
                  <div className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500 font-semibold text-xs text-center">
                    {accessory.status}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose PiEEG */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Why choose PiEEG hardware?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center">
                    <Tag className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-sm">Affordable by Design</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                      Research-grade biosignal hardware at a fraction of the cost of traditional systems. Low price, no compromise on signal quality.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center">
                    <Code className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-sm">Open-Source Software</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                      All software and SDKs are MIT licensed and published on GitHub. Fork, modify, and build freely.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-sm">Research Validated</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                      Cited in 11+ peer-reviewed academic papers. Used by universities, research labs, and BCI startups worldwide.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-violet-500" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-sm">7 Hardware Platforms</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                      Raspberry Pi, Arduino, STM32, Jetson Nano, and wireless BLE5 — one ecosystem with a platform for every use case.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "11+", label: "Science Papers", sub: "peer-reviewed citations", from: "from-cyan-500", to: "to-blue-600" },
                  { value: "28+", label: "Media Features", sub: "podcasts & outlets", from: "from-blue-500", to: "to-indigo-600" },
                  { value: "1800+", label: "GitHub Stars", sub: "across all repositories", from: "from-violet-500", to: "to-purple-600" },
                  { value: "7", label: "Platforms", sub: "hardware options", from: "from-green-500", to: "to-emerald-600" },
                ].map(({ value, label, sub, from, to }) => (
                  <div key={label} className="aspect-square rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className={`text-3xl font-extrabold bg-linear-to-br ${from} ${to} bg-clip-text text-transparent mb-1`}>
                        {value}
                      </div>
                      <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                        {label}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to start measuring biosignals?
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join the community of researchers, makers, and neuroscience enthusiasts building the future of open BCI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/support"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-lg"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
