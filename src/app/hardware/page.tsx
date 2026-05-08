import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
    image: "/products/pieeg16.jpg",
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
    image: "/products/cap8-dry.png",
    purchaseUrl: "https://www.elecrow.com/cap-eeg-kit-8-channels-dry-electrodes.html",
    status: "Available"
  },
  {
    id: "8ch-wet-cap",
    name: "8 Channel Wet EEG Cap Kit",
    description: "Professional textile cap with sintered Ag/AgCl gold-plated wet electrodes for superior signal quality.",
    specs: "8 channels • Wet electrodes • Includes gel",
    gradient: "from-blue-500 to-indigo-500",
    image: "/products/cap8-wet.jpg",
    purchaseUrl: "https://www.elecrow.com/cap-eeg-kit-8-channels-with-wet-electrodes.html",
    status: "Available"
  },
  {
    id: "16ch-cap",
    name: "16 Channel EEG Cap",
    description: "Low-cost 16 channel textile EEG cap with gold-plated sintered Ag/AgCl electrodes.",
    specs: "16 channels • Professional grade • Reusable",
    gradient: "from-purple-500 to-pink-500",
    image: "/products/cap16.png",
    purchaseUrl: "https://www.elecrow.com/low-cost-16-channels-eeg-cap.html",
    status: "Available"
  },
  {
    id: "conductive-gel",
    name: "Conductive Gel for EEG",
    description: "Low-impedance electrolyte gel for optimal electrode-skin contact with wet electrodes.",
    specs: "100ml bottle • Medical grade • Skin-safe",
    gradient: "from-green-500 to-emerald-500",
    image: "/products/gel.png",
    purchaseUrl: "https://www.elecrow.com/conductive-gel-for-eeg.html",
    status: "Coming Soon"
  },
  {
    id: "emg-kit",
    name: "EMG / ECG / EKG Kit",
    description: "Measure electromyography, electrocardiography, and electroencephalography signals with this all-in-one biosignal kit.",
    specs: "Multi-signal • Plug & play • Compatible with PiEEG",
    gradient: "from-orange-500 to-red-500",
    image: "/products/emg-kit.jpg",
    purchaseUrl: "https://www.elecrow.com/kit-to-measure-emg-ecg-ekg.html",
    status: "Available"
  }
];

export default function ProductsPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        {/* Background video */}
        <HeroVideo />

        {/* Layered cinematic overlays */}
        <div className="absolute inset-0 bg-linear-to-br from-cyan-400/8 via-blue-500/5 to-violet-600/8 dark:from-cyan-400/12 dark:via-blue-500/8 dark:to-violet-600/12 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/10 to-white/50 dark:from-zinc-950 dark:via-zinc-950/10 dark:to-zinc-950/50 pointer-events-none" />
        {/* Subtle radial glow behind the content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-175 h-125 rounded-full bg-cyan-400/5 dark:bg-cyan-400/8 blur-[120px]" />
        </div>

        {/* Content */}
        <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col items-center text-center">

          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-700/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
              Open-Source BCI Hardware
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[0.97] mb-5">
            <span className="text-zinc-900 dark:text-white">Research-grade</span>
            <br />
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              biosignal hardware
            </span>
            <br />
            <span className="text-zinc-900 dark:text-white">for everyone.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            Seven platforms. Five accessories. One mission — make brain-computer interfaces
            accessible, open, and beautiful.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-16">
            <HardwareSelectorButton />
            <Link
              href="#hardware"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-px"
            >
              Explore Products
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 backdrop-blur-sm transition-all hover:-translate-y-px"
            >
              Documentation
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
            {[
              { value: "7", label: "Hardware Platforms" },
              { value: "32", label: "Channels Max" },
              { value: "24-bit", label: "ADC Resolution" },
              { value: "MIT", label: "Open-Source SDK" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  {value}
                </span>
                <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-zinc-400 dark:text-zinc-500">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none" />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {accessories.map((accessory) => (
              <div
                key={accessory.id}
                className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden"
              >
                {/* Product image panel */}
                <div className={`relative bg-linear-to-br ${accessory.gradient} flex items-center justify-center overflow-hidden`} style={{minHeight: "160px"}}>
                  <div className="absolute inset-0 bg-black/10" />
                  <Image
                    src={accessory.image}
                    alt={accessory.name}
                    width={200}
                    height={160}
                    className="object-contain w-full h-40 p-4 relative z-10 group-hover:scale-105 transition-transform duration-300"
                    style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}
                  />
                  {accessory.status !== "Available" && (
                    <span className="absolute top-2 right-2 z-20 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                      {accessory.status}
                    </span>
                  )}
                </div>
                {/* Card body */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-sm mb-1.5">{accessory.name}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 flex-1 leading-relaxed">
                    {accessory.description}
                  </p>
                  <p className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 mb-3">
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
