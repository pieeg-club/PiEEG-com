import { elecrowCatalog, formatUsd, type Availability } from "./elecrow-catalog";
import { enclosuresFor, type EnclosureLink } from "./thingiverse";

export const SENDY_STORE_LIST_ID = "jsw5exWDIC1KbuAgvAoliQ";
export const SITE_ORIGIN = "https://pieeg.com";

export type StoreCategory =
  | "all"
  | "wireless"
  | "sbc-shields"
  | "mcu-kits"
  | "xr"
  | "caps-accessories"
  | "cases"
  | "upcoming";

export interface StoreGalleryItem {
  src: string;
  alt: string;
  caption: string;
  /** Optional interactive 3D viewer page (in /public). `src` is then used as its thumbnail. */
  model3d?: string;
}

export interface StoreBoxItem {
  qty: string;
  item: string;
  detail?: string;
}

export interface StoreSpecHighlight {
  label: string;
  value: string;
  sublabel: string;
}

export interface StoreFaqItem {
  q: string;
  a: string;
}

export interface StoreProduct {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  badge?: string;
  tagline: string;
  headline: string;
  summary: string;
  category: Exclude<StoreCategory, "all">;
  channelFilter: "8ch" | "16ch" | "32ch" | "128ch" | "accessory";
  featured?: boolean;
  channels: string;
  platform: string;
  signals: string[];
  gradient: string;
  accentText: string;
  heroImage: string;
  gallery: StoreGalleryItem[];
  videoId?: string;
  price: number | null;
  priceLabel?: string;
  currency: string;
  sku: string | null;
  availability: Availability | "Kickstarter" | "ComingSoon";
  elecrowUrl?: string;
  kickstarterUrl?: string;
  hardwarePath: string;
  storePath: string;
  githubUrl?: string;
  enclosureLinks: EnclosureLink[];
  keySpecs: StoreSpecHighlight[];
  highlights: { title: string; description: string }[];
  inTheBox: StoreBoxItem[];
  requirements: string[];
  recommendedWith: string[];
  fullSpecs: { label: string; value: string }[];
  faqs: StoreFaqItem[];
}

export interface StoreBundle {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  idealFor: string;
  gradient: string;
  itemSlugs: string[];
}

export const STORE_CATEGORIES: {
  id: StoreCategory;
  label: string;
  shortDesc: string;
}[] = [
  { id: "all", label: "All Models", shortDesc: "Full BCI hardware & accessory lineup" },
  { id: "wireless", label: "Wireless & Wearable", shortDesc: "BLE 5 untethered neural acquisition" },
  { id: "sbc-shields", label: "Raspberry Pi & Jetson", shortDesc: "24-bit SPI shields for Linux & GPU" },
  { id: "mcu-kits", label: "Arduino, STM32 & Education", shortDesc: "Embedded shields & classroom kits" },
  { id: "xr", label: "Spatial & VR (XR)", shortDesc: "Neural face gaskets for VR headsets" },
  { id: "caps-accessories", label: "EEG Caps & Kits", shortDesc: "Dry & wet 10-20 caps, EMG & gel" },
  { id: "cases", label: "3D-Printed Cases", shortDesc: "PLA enclosures for PiEEG, IronBCI-32 & Octopus 16" },
  { id: "upcoming", label: "Upcoming", shortDesc: "New devices in development — subscribe to hear first" },
];

const COMMON_STORE_FAQS: StoreFaqItem[] = [
  {
    q: "Why do I complete my purchase on Elecrow right now?",
    a: "Elecrow is PiEEG's official manufacturing and global logistics partner. Ordering through our official Elecrow listing ensures factory-tested hardware, instant stock allocation, and tracked worldwide shipping via DHL, FedEx, UPS, or postal airmail.",
  },
  {
    q: "When will Direct Checkout on pieeg.com launch?",
    a: "We are finalizing direct checkout on pieeg.com with express warehouse dispatch, instant academic PO invoicing, and extended direct coverage. Enter your email below the 'Buy Direct (Soon)' button to get priority access and launch perks.",
  },
  {
    q: "Can my university or research lab order with a Purchase Order (PO) or bulk discount?",
    a: "Yes. Orders of 5+ units qualify for 10% to 20% institutional discounts, formal pro-forma invoices, W-8BEN-E / vendor onboarding, and net-30 university PO support.",
  },
  {
    q: "Is the software and SDK included free of charge?",
    a: "Every PiEEG device includes 100% open-source MIT-licensed Python/C/JS SDKs, access to PiEEG Cloud in the browser, and community support on GitHub and Discord—with zero subscription fees.",
  },
];

function catalogInfo(id: string) {
  const entry = elecrowCatalog.products[id];
  return {
    price: entry?.price ?? null,
    currency: entry?.currency ?? "USD",
    sku: entry?.sku ?? null,
    elecrowUrl: entry?.elecrowUrl,
    availability: (entry?.availability ?? "InStock") as Availability,
  };
}

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    slug: "pieeg",
    name: "PiEEG-8",
    shortName: "PiEEG-8",
    eyebrow: "Raspberry Pi 3 / 4 / 5 Shield",
    badge: "Most Popular",
    tagline: "The flagship 8-channel 24-bit biosignal shield for Raspberry Pi.",
    headline: "Buy PiEEG-8",
    summary:
      "Turn any Raspberry Pi 3, 4, or 5 into a research-grade 8-channel EEG, EMG, and ECG lab. Powered by the TI ADS1299 24-bit analog front-end with SPI transfer up to 16 kSPS and an open-source Python SDK.",
    category: "sbc-shields",
    channelFilter: "8ch",
    featured: true,
    channels: "8 channels",
    platform: "Raspberry Pi 3 / 4 / 5",
    signals: ["EEG", "EMG", "ECG"],
    gradient: "from-cyan-500 to-blue-600",
    accentText: "text-cyan-500",
    heroImage: "/products/pieeg.png",
    gallery: [
      {
        src: "/products/pieeg-8/pieeg8-3d-thumb.png",
        model3d: "/products/pieeg-8/3d/pieeg8-3d-board.html",
        alt: "Interactive 3D model of the PiEEG-8 board with components",
        caption: "Interactive 3D model — drag to rotate, scroll or pinch to zoom",
      },
      {
        src: "/products/pieeg-8/pieeg8-board-overview.png",
        alt: "PiEEG-8 board overview: electrodes, GPIO 40 pinout, ADS1299, regulators, LEDs and user switches",
        caption: "Board overview — 8 differential inputs plus Reference and Bias, GPIO 40 pinout",
      },
      {
        src: "/products/pieeg.png",
        alt: "PiEEG-8 8-channel Raspberry Pi EEG shield",
        caption: "PiEEG-8 8-Channel Shield — 40-pin Raspberry Pi HAT form factor",
      },
      {
        src: "/products/pieeg-clean.png",
        alt: "PiEEG-8 clean board top view",
        caption: "Precision 24-bit ADS1299 analog front-end with gold-plated electrode headers",
      },
    ],
    ...catalogInfo("pieeg"),
    hardwarePath: "/hardware/pieeg",
    storePath: "/store/pieeg",
    githubUrl: "https://github.com/pieeg-club/PiEEG",
    enclosureLinks: enclosuresFor("pieeg"),
    keySpecs: [
      { label: "Channels", value: "8 Ch + REF/BIAS", sublabel: "Differential inputs" },
      { label: "ADC Resolution", value: "24-bit", sublabel: "TI ADS1299 converter" },
      { label: "Sample Rate", value: "250–16k SPS", sublabel: "Low-latency SPI bus" },
      { label: "Host", value: "RPi 3 / 4 / 5", sublabel: "40-pin GPIO header" },
    ],
    highlights: [
      {
        title: "Research-Grade 24-Bit Signal Path",
        description:
          "Built around the industry-standard ADS1299 biopotential ADC with programmable gain (1× to 24×), hardware lead-off detection, and ultra-low input-referred noise.",
      },
      {
        title: "Direct SPI to Python in Minutes",
        description:
          "Reads real-time EEG, EMG, and ECG streams straight on the Raspberry Pi without USB dongles or proprietary middleware. Stream to PiEEG Server, LabStreamingLayer, or MNE-Python.",
      },
      {
        title: "Cited in Peer-Reviewed Research",
        description:
          "Trusted by university teaching labs and BCI researchers worldwide as the most accessible entry point into open-source neurotechnology.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "PiEEG-8 8-Channel Biosignal Shield", detail: "Assembled & factory-tested PCB with 40-pin GPIO socket" },
      { qty: "1×", item: "2.54 mm Pin Header & Standoff Set", detail: "Secure mechanical mounting for Raspberry Pi 3, 4, or 5" },
      { qty: "1×", item: "Open-Source SDK & PiEEG Server Access", detail: "MIT-licensed Python codebase, GUI scripts & documentation" },
    ],
    requirements: [
      "Raspberry Pi 3, 4, or 5 (not included)",
      "5V USB battery power bank (mandatory for mains isolation during human recording)",
      "EEG Cap (8ch Dry or Wet Cap) or EMG/ECG electrode cables",
    ],
    recommendedWith: ["pieeg-pi5-enclosure", "8ch-dry-cap", "8ch-wet-cap"],
    fullSpecs: [
      { label: "Channels", value: "8 differential + 1 Reference (SRB1) + 1 Bias" },
      { label: "ADC Converter", value: "Texas Instruments ADS1299 (24-bit Delta-Sigma)" },
      { label: "Sampling Rate", value: "250 SPS to 16,000 SPS via SPI" },
      { label: "Programmable Gain", value: "1, 2, 4, 6, 8, 12, 24" },
      { label: "Input-Referred Noise", value: "1.0 µVpp (250 SPS, Gain 24)" },
      { label: "CMRR", value: "-110 dB" },
      { label: "Host Compatibility", value: "Raspberry Pi 3B+, Raspberry Pi 4, Raspberry Pi 5" },
      { label: "Electrode Connector", value: "Standard 2.54 mm pin header" },
      { label: "Power Source", value: "5V via Raspberry Pi powered exclusively by battery power bank" },
      { label: "SKU", value: "CQA240229P1" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "octopus-16",
    name: "Octopus 16",
    shortName: "Octopus 16",
    eyebrow: "16-Channel Wireless ESP32-S3 BCI",
    badge: "Best Value 16-Ch",
    tagline: "Wireless 16-channel dry pogo-pin EEG board powered by XIAO ESP32-S3.",
    headline: "Buy Octopus 16",
    summary:
      "High-density 16-channel wireless biosignal acquisition at an unprecedented price point. Dual 24-bit ADS131M08 ADCs, integrated spring-loaded dry pogo-pin electrodes, Bluetooth Low Energy streaming, and native PiEEG Cloud & Garmin watch support.",
    category: "wireless",
    channelFilter: "16ch",
    featured: true,
    channels: "16 channels",
    platform: "Seeed XIAO ESP32-S3 · BLE",
    signals: ["EEG", "EMG", "ECG"],
    gradient: "from-violet-500 to-fuchsia-600",
    accentText: "text-violet-500",
    heroImage: "/products/octopus16.png",
    gallery: [
      {
        src: "/products/octopus16.png",
        alt: "Octopus 16 wireless 16-channel EEG board",
        caption: "Octopus 16 — Compact circular 16-channel wireless BCI board",
      },
      {
        src: "/products/octopus16-worn.jpeg",
        alt: "Octopus 16 worn on headband",
        caption: "Wearable form factor with direct dry pogo-pin scalp contact",
      },
      {
        src: "/products/octopus16-mount.jpeg",
        alt: "Octopus 16 3D-printed mount and hardware view",
        caption: "Modular mounting for headbands, caps, and custom 3D-printed rigs",
      },
      {
        src: "/products/octopus16-firmware.jpg",
        alt: "Octopus 16 web firmware and streaming utility",
        caption: "One-click browser flashing and Web Bluetooth streaming to PiEEG Cloud",
      },
    ],
    ...catalogInfo("octopus-16"),
    hardwarePath: "/hardware/octopus-16",
    storePath: "/store/octopus-16",
    githubUrl: "https://github.com/pieeg-club/Octopus_16",
    enclosureLinks: enclosuresFor("octopus-16"),
    keySpecs: [
      { label: "Channels", value: "16 Channels", sublabel: "Dry gold pogo-pins" },
      { label: "Dual ADCs", value: "2× 24-bit", sublabel: "TI ADS131M08 @ 250 SPS" },
      { label: "Connectivity", value: "Bluetooth LE", sublabel: "Web Bluetooth + Python" },
      { label: "MCU", value: "ESP32-S3", sublabel: "Seeed Studio XIAO" },
    ],
    highlights: [
      {
        title: "Zero Cables, Zero Gel",
        description:
          "16 gold-plated spring pogo pins act directly as dry electrodes on the board underside—or connect external electrodes via the perimeter pads.",
      },
      {
        title: "Streams Straight to Your Browser or Garmin Watch",
        description:
          "Pair instantly over Web Bluetooth with cloud.pieeg.com, bioIDE, octoBridge, or the octoWatch Garmin Connect IQ app without installing drivers.",
      },
      {
        title: "16 Channels for $250",
        description:
          "Dual 8-channel 24-bit simultaneous-sampling ADCs make 16-channel wireless neural recording affordable for every student, maker, and lab.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "Octopus 16 Carrier Board with 16 Gold Dry Pogo-Pin Electrodes", detail: "Dual ADS131M08 24-bit analog front-end" },
      { qty: "1×", item: "Seeed Studio XIAO ESP32-S3 Module", detail: "Pre-flashed with Octopus-16 BLE streaming firmware" },
      { qty: "1×", item: "Ear-Clip Reference Cable & Strap Mount Hardware", detail: "Ready for headband or 3D-printed enclosure assembly" },
    ],
    requirements: [
      "3.7V LiPo battery or isolated 5V USB power source",
      "Desktop Chrome/Edge (for Web Bluetooth) or Python 3.9+ environment",
    ],
    recommendedWith: ["octopus-16-enclosure", "16ch-cap", "octobio-kit"],
    fullSpecs: [
      { label: "Channels", value: "16 EEG channels + Reference + Bias" },
      { label: "ADCs", value: "2× Texas Instruments ADS131M08 (24-bit simultaneous sampling)" },
      { label: "Microcontroller", value: "Seeed Studio XIAO ESP32-S3 (Dual-core Xtensa LX7 @ 240 MHz)" },
      { label: "Wireless Protocol", value: "Bluetooth Low Energy (BLE 5.0) & USB-C Serial" },
      { label: "Sampling Rate", value: "250 SPS per channel across all 16 channels" },
      { label: "Electrode Interface", value: "16 integrated spring-loaded dry pogo pins + external solder/header pads" },
      { label: "Cloud & App Support", value: "PiEEG Cloud, bioIDE, octoBridge, Garmin octoWatch, Python SDK" },
      { label: "SKU", value: "PIA24027P" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "octobio-kit",
    name: "OctoBio Kit",
    shortName: "OctoBio Kit",
    eyebrow: "Brain-to-Hardware Complete Learning Kit",
    badge: "Education Kit",
    tagline: "16-channel wireless EEG board + Arduino starter kit + browser block coding.",
    headline: "Buy OctoBio Kit",
    summary:
      "The complete classroom and maker kit that connects live brainwaves to physical hardware. Includes the 16-channel wireless Octopus 16 EEG board plus an All-in-One Arduino Starter Kit—programmed with drag-and-drop blocks in Chrome or Edge.",
    category: "mcu-kits",
    channelFilter: "16ch",
    featured: true,
    channels: "16 channels",
    platform: "Octopus 16 + Arduino Kit",
    signals: ["EEG"],
    gradient: "from-cyan-500 to-amber-500",
    accentText: "text-amber-500",
    heroImage: "/hardware/octobio-kit/octobio-1-262a4266.png",
    gallery: [
      {
        src: "/hardware/octobio-kit/octobio-1-262a4266.png",
        alt: "OctoBio Kit complete package with Octopus 16 and Arduino starter kit",
        caption: "Complete OctoBio Kit — Octopus 16 wireless EEG + All-in-One Arduino Starter Kit",
      },
      {
        src: "/hardware/octobio-kit/octobio-2-df57ebbe.jpg",
        alt: "Octopus 16 EEG board closeup",
        caption: "Brain Side: 16-channel wireless EEG with gold dry pogo-pin electrodes",
      },
      {
        src: "/hardware/octobio-kit/octobio-3-51ca5cd4.jpg",
        alt: "Octopus 16 top and bottom pogo-pin view",
        caption: "No gel or cap required — spring-loaded dry electrodes make instant contact",
      },
      {
        src: "/hardware/octobio-kit/octobio-4-eb0b604a.jpg",
        alt: "Arduino starter kit sensors and actuators",
        caption: "Room Side: 15+ sensors, LEDs, servo motor, OLED screen, and buzzer on one board",
      },
    ],
    ...catalogInfo("octobio-kit"),
    hardwarePath: "/hardware/octobio-kit",
    storePath: "/store/octobio-kit",
    githubUrl: "https://github.com/pieeg-club/Octopus_16",
    enclosureLinks: enclosuresFor("octopus-16"),
    keySpecs: [
      { label: "Brain Side", value: "Octopus 16", sublabel: "16-ch dry wireless EEG" },
      { label: "Room Side", value: "Arduino Kit", sublabel: "15+ sensors & actuators" },
      { label: "Coding", value: "5-Level Blocks", sublabel: "octobridge.pieeg.com" },
      { label: "Setup Time", value: "< 5 Minutes", sublabel: "Zero software install" },
    ],
    highlights: [
      {
        title: "Brain Rhythms In, Real-World Actions Out",
        description:
          "Link alpha relaxation, beta focus, or jaw clenches directly to real LEDs, servos, buzzers, and OLED displays in one browser tab.",
      },
      {
        title: "5-Level Progressive Block Curriculum",
        description:
          "Designed for K-12 STEM, undergraduate neuroscience labs, and makerspaces—starting with single-rule blocks and scaling up to full logic pipelines.",
      },
      {
        title: "Two Complete Kits in One Box",
        description:
          "Use the Octopus 16 as a standalone 16-channel research BCI and the Arduino starter board for electronics projects, or combine both in octoBridge.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "Octopus 16 Wireless 16-Channel EEG Board", detail: "With Seeed XIAO ESP32-S3 and 16 dry pogo-pin electrodes" },
      { qty: "1×", item: "All-in-One Arduino Starter Kit Board", detail: "Integrated Arduino Uno MCU + 15 pre-wired sensors, LEDs, OLED & actuators" },
      { qty: "1×", item: "USB Cables, Headband Strap & Accessories", detail: "Everything needed to connect via Web Bluetooth + Web Serial" },
    ],
    requirements: [
      "Desktop or laptop running Google Chrome or Microsoft Edge (for Web Bluetooth + Web Serial)",
    ],
    recommendedWith: ["16ch-cap", "emg-kit", "8ch-dry-cap"],
    fullSpecs: [
      { label: "EEG Hardware", value: "Octopus 16 (16-ch dry pogo pins, 2× ADS131M08 24-bit ADCs)" },
      { label: "Actuator Hardware", value: "Arduino Uno All-in-One Starter Kit (15+ onboard modules)" },
      { label: "Browser Environment", value: "octobridge.pieeg.com (Web Bluetooth + Web Serial)" },
      { label: "Sampling Rate", value: "250 SPS (EEG) + live serial telemetry" },
      { label: "Programming", value: "5-level visual block programming + exportable logic" },
      { label: "SKU", value: "PIA24028P" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "pieeg-16",
    name: "PiEEG-16",
    shortName: "PiEEG-16",
    eyebrow: "16-Channel Raspberry Pi 5 Shield",
    badge: "16-Ch HAT",
    tagline: "Double the spatial density on Raspberry Pi with 16 simultaneous 24-bit channels.",
    headline: "Buy PiEEG-16",
    summary:
      "Designed for advanced neuroscience paradigms requiring full 10-20 montage coverage on a Raspberry Pi 4 or 5. Features 16 differential biosignal channels at 24-bit resolution with SPI transfer up to 16 kSPS.",
    category: "sbc-shields",
    channelFilter: "16ch",
    featured: true,
    channels: "16 channels",
    platform: "Raspberry Pi 4 / 5",
    signals: ["EEG", "EMG", "ECG"],
    gradient: "from-blue-500 to-indigo-600",
    accentText: "text-blue-500",
    heroImage: "/products/pieeg16.jpg",
    gallery: [
      {
        src: "/products/pieeg-16/pieeg16-3d-thumb.png",
        model3d: "/products/pieeg-16/3d/pieeg16-3d-board.html",
        alt: "Interactive 3D model of the PiEEG-16 board with components",
        caption: "Interactive 3D model — drag to rotate, scroll or pinch to zoom",
      },
      {
        src: "/products/pieeg-16/pieeg16-board-overview.png",
        alt: "PiEEG-16 board overview: 16 electrodes, Reference and Bias, two ADS1299, GPIO 40 pinout",
        caption: "Board overview — 16 channels plus Reference and Bias, GPIO 40 pinout",
      },
      {
        src: "/products/pieeg16.jpg",
        alt: "PiEEG-16 16-channel EEG shield on a Raspberry Pi",
        caption: "PiEEG-16 — 16-channel high-density Raspberry Pi shield",
      },
      {
        src: "/products/pieeg16-top.jpg",
        alt: "PiEEG-16 board, underside",
        caption: "Dual-stage 24-bit ADC architecture for 16 synchronized EEG/EMG/ECG channels",
      },
      {
        src: "/products/pieeg16-angle.jpg",
        alt: "PiEEG-16 board, top side",
        caption: "Direct 40-pin GPIO mounting for Raspberry Pi 4 and Raspberry Pi 5",
      },
    ],
    ...catalogInfo("pieeg-16"),
    hardwarePath: "/hardware/pieeg-16",
    storePath: "/store/pieeg-16",
    githubUrl: "https://github.com/pieeg-club/PiEEG-16",
    enclosureLinks: enclosuresFor("pieeg-16"),
    keySpecs: [
      { label: "Channels", value: "16 Channels", sublabel: "+ REF and BIAS" },
      { label: "Resolution", value: "24-bit ADC", sublabel: "Simultaneous sampling" },
      { label: "Data Rate", value: "250–16k SPS", sublabel: "High-speed SPI" },
      { label: "Host", value: "Raspberry Pi 4/5", sublabel: "Native Python SDK" },
    ],
    highlights: [
      {
        title: "Full 16-Channel Spatial Resolution",
        description:
          "Capture frontal, central, temporal, parietal, and occipital cortices simultaneously for motor imagery, ERP, SSVEP, and cognitive workload studies.",
      },
      {
        title: "Standalone Linux BCI Workstation",
        description:
          "Process 16 channels locally on Raspberry Pi 5 with zero external PC required, or stream over Wi-Fi via LSL / PiEEG Server.",
      },
      {
        title: "Plug-and-Play with the 16-Channel EEG Cap",
        description:
          "Standard 2.54 mm header pinout pairs directly with our 16-Channel sintered Ag/AgCl textile EEG cap.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "PiEEG-16 16-Channel Biosignal Shield", detail: "Assembled & factory-tested 16-channel HAT" },
      { qty: "1×", item: "GPIO Header & Mounting Kit", detail: "Fits Raspberry Pi 4 and Raspberry Pi 5" },
      { qty: "1×", item: "Open-Source Python SDK & Server Suite", detail: "Full 16-channel acquisition, filtering, and visualization code" },
    ],
    requirements: [
      "Raspberry Pi 4 or Raspberry Pi 5 (not included)",
      "5V USB battery power bank (required for isolated operation)",
      "16-Channel EEG Cap or two 8-Channel electrode harnesses",
    ],
    recommendedWith: ["pieeg-pi5-enclosure", "16ch-cap", "conductive-gel"],
    fullSpecs: [
      { label: "Channels", value: "16 differential biosignal channels + Reference + Bias" },
      { label: "Resolution", value: "24-bit per channel" },
      { label: "Sampling Rate", value: "250 SPS to 16 kSPS via SPI" },
      { label: "Programmable Gain", value: "1, 2, 4, 6, 8, 12, 24" },
      { label: "Host Platform", value: "Raspberry Pi 4 / Raspberry Pi 5" },
      { label: "Software", value: "MIT Open-Source Python SDK, PiEEG Server, BrainFlow / MNE ready" },
      { label: "SKU", value: "CQA240229G16" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "ironbci",
    name: "IronBCI",
    shortName: "IronBCI",
    eyebrow: "8-Channel Wearable Wireless BLE 5 BCI",
    badge: "Wireless",
    tagline: "Ultra-compact 50 mm wearable 8-channel wireless EEG/EMG/ECG system.",
    headline: "Buy IronBCI",
    summary:
      "Untether your neuroscience experiments. IronBCI packs an 8-channel 24-bit ADS1299 front-end and Bluetooth Low Energy 5.0 into a 50 mm circular wearable stack—complete with Python, Android, and 3D-printable headset designs.",
    category: "wireless",
    channelFilter: "8ch",
    featured: true,
    channels: "8 channels",
    platform: "BLE 5.0 Wireless",
    signals: ["EEG", "EMG", "ECG"],
    gradient: "from-purple-500 to-pink-600",
    accentText: "text-purple-500",
    heroImage: "/products/ironbci-top.png",
    gallery: [
      {
        src: "/products/ironbci-8/ironbci8-3d-thumb.png",
        model3d: "/products/ironbci-8/3d/ironbci8-3d-model.html",
        alt: "Interactive 3D model of the IronBCI-8 three-board stack",
        caption: "Interactive 3D model — drag to rotate, tap Explode to see all three boards",
      },
      {
        src: "/products/ironbci-8/ironbci8-board-overview.png",
        alt: "IronBCI-8 board overview: Bluetooth, ADC and power boards with electrodes, connectors, switches and LEDs",
        caption: "Board overview — Bluetooth, ADC and power boards, 8 electrodes plus Reference and Bias",
      },
      {
        src: "/products/ironbci-top.png",
        alt: "IronBCI 3-board stacked wireless BCI top view",
        caption: "IronBCI — 50 mm diameter stacked PCB architecture with BLE 5.0",
      },
      {
        src: "/products/ironbci-angle.jpg",
        alt: "IronBCI angled product view",
        caption: "Modular 3-layer design separating battery, MCU/BLE, and 24-bit analog front-end",
      },
      {
        src: "/products/ironbci-worn.jpg",
        alt: "IronBCI worn on 3D-printed headset",
        caption: "Mounts directly onto open-source 3D-printable headsets or EEG caps",
      },
    ],
    videoId: "X3xSN6h-QzM",
    ...catalogInfo("ironbci"),
    hardwarePath: "/hardware/ironbci",
    storePath: "/store/ironbci",
    githubUrl: "https://github.com/pieeg-club/ironbci",
    enclosureLinks: enclosuresFor("ironbci"),
    keySpecs: [
      { label: "Channels", value: "8 Channels", sublabel: "24-bit ADS1299" },
      { label: "Wireless", value: "BLE 5.0", sublabel: "250 SPS streaming" },
      { label: "Form Factor", value: "50 mm Round", sublabel: "Wearable 3-PCB stack" },
      { label: "SDKs", value: "Python & Android", sublabel: "+ PiEEG Cloud" },
    ],
    highlights: [
      {
        title: "True Wearable Freedom",
        description:
          "At just 50 mm across, IronBCI clips onto a headband, EEG cap, or our open-source 3D-printed headset for ambulatory and mobile BCI research.",
      },
      {
        title: "Isolated 3-Layer Stack Architecture",
        description:
          "Separates power management, wireless radio, and the ultra-sensitive 24-bit analog front-end across three stacked boards for clean signals during movement.",
      },
      {
        title: "Desktop, Web & Mobile Ready",
        description:
          "Stream over Bluetooth 5 to Python on Windows/Mac/Linux, PiEEG Cloud in the browser, or our Android mobile SDK.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "IronBCI 3-Layer Wireless BCI Stack", detail: "Pre-assembled ADC board + BLE 5 MCU board + power board" },
      { qty: "1×", item: "Open-Source 3D Enclosure & Headset STL Files", detail: "Downloadable via Thingiverse for custom wearable mounting" },
      { qty: "1×", item: "Python & Android SDK Access", detail: "Full source code on GitHub" },
    ],
    requirements: [
      "Rechargeable LiPo battery (3.7V)",
      "8-Channel Dry or Wet EEG Cap or EMG electrode cables",
    ],
    recommendedWith: ["8ch-dry-cap", "8ch-wet-cap", "emg-kit"],
    fullSpecs: [
      { label: "Channels", value: "8 differential channels + Reference + Bias" },
      { label: "ADC", value: "24-bit TI ADS1299 @ 250 SPS" },
      { label: "Connectivity", value: "Bluetooth Low Energy 5.0 (BLE)" },
      { label: "Dimensions", value: "50 mm diameter circular stack" },
      { label: "SDK Support", value: "Python, Android, Web Bluetooth (PiEEG Cloud)" },
      { label: "SKU", value: "PIA24023P" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "ironbci-32",
    name: "IronBCI-32",
    shortName: "IronBCI-32",
    eyebrow: "32-Channel Professional Research System",
    badge: "Research Grade",
    tagline: "Four 24-bit AD7771 ADCs + STM32H7 Cortex-M7 + native BrainFlow integration.",
    headline: "Buy IronBCI-32",
    summary:
      "Our highest-density neuroscience platform. IronBCI-32 synchronizes four 8-channel 24-bit Analog Devices AD7771 converters with an STM32H7 ARM Cortex-M7 processor—delivering 32 simultaneous channels at 512 SPS with native BrainFlow support.",
    category: "mcu-kits",
    channelFilter: "32ch",
    featured: true,
    channels: "32 channels",
    platform: "STM32H7 · BrainFlow",
    signals: ["EEG", "EMG", "ECG"],
    gradient: "from-red-500 to-orange-600",
    accentText: "text-red-500",
    heroImage: "/products/ironbci-32.png",
    gallery: [
      {
        src: "/products/ironbci-32.png",
        alt: "IronBCI-32 32-channel professional EEG board",
        caption: "IronBCI-32 — 32-channel synchronized 24-bit research acquisition system",
      },
      {
        src: "/products/ironbci-32-main.png",
        alt: "IronBCI-32 top architecture view",
        caption: "Four Analog Devices AD7771 24-bit ADCs driven by an STM32H7 Cortex-M7",
      },
      {
        src: "/products/ironbci-32-angle.png",
        alt: "IronBCI-32 angled connector view",
        caption: "Direct 2.54 mm header array matching the 32-Channel Wet EEG Cap Kit",
      },
    ],
    ...catalogInfo("ironbci-32"),
    hardwarePath: "/hardware/ironbci-32",
    storePath: "/store/ironbci-32",
    githubUrl: "https://github.com/pieeg-club/ironbci-32",
    enclosureLinks: enclosuresFor("ironbci-32"),
    keySpecs: [
      { label: "Channels", value: "32 Channels", sublabel: "Full 10-20 scalp map" },
      { label: "Quad ADCs", value: "4× AD7771", sublabel: "24-bit simultaneous" },
      { label: "Sample Rate", value: "512 SPS / Ch", sublabel: "All 32 channels live" },
      { label: "Ecosystem", value: "BrainFlow", sublabel: "Python, C++, MATLAB" },
    ],
    highlights: [
      {
        title: "32-Channel High-Density Topography",
        description:
          "Acquire full-scalp EEG at a fraction of traditional $15,000+ clinical amplifiers. Ideal for source localization, high-density ERP, and motor decoding.",
      },
      {
        title: "Native BrainFlow Integration",
        description:
          "Works out of the box with the BrainFlow library across Python, C++, Julia, R, and MATLAB—plus MNE-Python and OpenViBE pipelines.",
      },
      {
        title: "Quad AD7771 + STM32H7 Architecture",
        description:
          "Hardware-synchronized clocking across all four 8-channel 24-bit ADCs ensures zero inter-channel phase skew at 512 Hz.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "IronBCI-32 32-Channel Main Acquisition Board", detail: "4× AD7771 24-bit ADCs + STM32H7 MCU" },
      { qty: "1×", item: " Reference / Bias Splitter & Header Kit", detail: "Direct 2.54 mm interface for 32-channel caps" },
      { qty: "1×", item: "BrainFlow & Open-Source Firmware Suite", detail: "Full documentation and acquisition scripts" },
    ],
    requirements: [
      "32-Channel Wet EEG Cap Kit + Conductive Gel (recommended)",
      "Battery-powered laptop or USB isolator for safe human recording",
    ],
    recommendedWith: ["ironbci-32-enclosure", "32ch-wet-cap", "conductive-gel"],
    fullSpecs: [
      { label: "Channels", value: "32 simultaneous differential channels + Reference + Bias" },
      { label: "ADCs", value: "4× Analog Devices AD7771 (24-bit, 8ch each)" },
      { label: "Processor", value: "STMicroelectronics STM32H7 ARM Cortex-M7" },
      { label: "Sampling Rate", value: "512 SPS per channel across all 32 channels" },
      { label: "Software Integration", value: "BrainFlow integrated, Python, C++, MNE-Python" },
      { label: "Pin Pitch", value: "2.54 mm standard headers" },
      { label: "SKU", value: "PIA24025P" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "ironbci-128",
    name: "IronBCI-128",
    shortName: "IronBCI-128",
    eyebrow: "Upcoming · IronBCI family",
    badge: "Coming Soon",
    tagline: "A 128-channel brain–computer interface from PiEEG. Subscribe to hear first.",
    headline: "IronBCI-128 — Coming Soon",
    summary:
      "A 128-channel brain–computer interface from PiEEG. IronBCI-128 is the next step for the IronBCI family: 128 channels on one compact 70 × 70 mm octagonal board. Subscribe and we'll let you know the moment IronBCI-128 is ready to order.",
    category: "upcoming",
    channelFilter: "128ch",
    channels: "128 channels",
    platform: "IronBCI family · USB-C",
    signals: ["EEG", "BCI"],
    gradient: "from-amber-500 to-orange-600",
    accentText: "text-amber-500",
    heroImage: "/products/ironbci-128/ironbci-128.png",
    gallery: [
      {
        src: "/products/ironbci-128/ironbci-128.png",
        alt: "IronBCI-128 128-channel octagonal board, top side",
        caption: "IronBCI-128 — 128 channels on a 70 × 70 mm octagonal board (pre-production)",
      },
      {
        src: "/products/ironbci-128/ironbci-128-top.png",
        alt: "IronBCI-128 PCB top side rendered from the Gerber files",
        caption: "Top side, rendered from the pre-production Gerber files",
      },
      {
        src: "/products/ironbci-128/ironbci-128-bottom.png",
        alt: "IronBCI-128 PCB bottom side rendered from the Gerber files",
        caption: "Bottom side — 4-layer PCB with parts on both sides",
      },
    ],
    price: null,
    priceLabel: "Coming soon",
    currency: "USD",
    sku: null,
    availability: "ComingSoon",
    hardwarePath: "/store/ironbci-128#subscribe",
    storePath: "/store/ironbci-128",
    enclosureLinks: [],
    keySpecs: [
      { label: "Channels", value: "128", sublabel: "4× IronBCI-32" },
      { label: "Board", value: "70 × 70 mm", sublabel: "Compact octagon" },
      { label: "PCB", value: "4-layer", sublabel: "Parts on both sides" },
      { label: "Connection", value: "USB-C", sublabel: "One cable to the host" },
    ],
    highlights: [
      {
        title: "128 Channels, Same Footprint",
        description:
          "Four times the channel count of IronBCI-32 on the same compact 70 × 70 mm octagonal board.",
      },
      {
        title: "Double-Sided 4-Layer PCB",
        description:
          "Components on both sides and a solid inner ground plane keep 128 channels on a board that fits in your hand.",
      },
      {
        title: "Subscribers Hear First",
        description:
          "Full specifications, pricing and availability will be announced to IronBCI-128 subscribers first.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "IronBCI-128 128-Channel Board", detail: "Final contents announced at launch" },
    ],
    requirements: [
      "Specifications may change — IronBCI-128 is in development",
      "Battery-powered laptop or USB isolator for safe human recording",
    ],
    recommendedWith: ["ironbci-32", "conductive-gel"],
    fullSpecs: [
      { label: "Channels", value: "128" },
      { label: "Board", value: "70 × 70 mm regular octagon, 1.6 mm thick" },
      { label: "PCB", value: "4 copper layers, parts on both sides" },
      { label: "Connection", value: "USB-C" },
      { label: "Mounting", value: "6 × Ø 3.2 mm holes (M3)" },
      { label: "Board-to-board", value: "4 connector positions per side, 2 × 20 pins, 1.27 mm pitch" },
      { label: "Resolution / sample rate", value: "To be announced" },
      { label: "Price & availability", value: "Announced to subscribers first" },
    ],
    faqs: [
      {
        q: "When will IronBCI-128 be available?",
        a: "IronBCI-128 is in development. Subscribe on this page and we'll email you the moment it is ready to order.",
      },
      {
        q: "How much will IronBCI-128 cost?",
        a: "Pricing has not been announced yet. Subscribers get the price and order date first.",
      },
      {
        q: "What will I receive if I subscribe?",
        a: "One email when IronBCI-128 is ready, plus the full specifications. No spam, and you can unsubscribe any time.",
      },
      {
        q: "Can I start with IronBCI-32 now?",
        a: "Yes. IronBCI-32 is available today and is part of the same IronBCI family.",
      },
    ],
  },
  {
    slug: "octopus-headband",
    name: "Octopus Headband",
    shortName: "Octopus Headband",
    eyebrow: "Upcoming · Open-source headband BCI",
    badge: "Coming Soon",
    tagline: "Open-source headband BCI powered by Octopus 16. Sign up if you're interested.",
    headline: "Octopus Headband — Coming Soon",
    summary:
      "An open-source headband brain–computer interface powered by the real Octopus 16 board, with a 1000 mAh battery on the band. The data protocol is fully open, and the software includes an app constructor, so you can start in minutes and adapt the app to your own needs. It connects to the PiEEG server for games and VR, the module is easy to move to a new position, and you can scale up to 48 channels.",
    category: "upcoming",
    channelFilter: "16ch",
    channels: "16 → 48 channels",
    platform: "Octopus 16 · 1000 mAh",
    signals: ["EEG", "BCI"],
    gradient: "from-violet-500 to-fuchsia-600",
    accentText: "text-violet-500",
    heroImage: "/products/octopus-headband/Headband.png",
    gallery: [
      {
        src: "/products/octopus-headband/Headband.png",
        alt: "Octopus Headband",
        caption: "Octopus Headband",
      },
    ],   
    price: null,
    priceLabel: "Coming soon",
    currency: "USD",
    sku: null,
    availability: "ComingSoon",
    hardwarePath: "/store/octopus-headband#subscribe",
    storePath: "/store/octopus-headband",
    enclosureLinks: [],
    keySpecs: [
      { label: "Powered by", value: "Octopus 16", sublabel: "Dry pogo-pin EEG" },
      { label: "Battery", value: "1000 mAh", sublabel: "On the band, USB-C" },
      { label: "Channels", value: "16 → 48", sublabel: "Scale up when you need" },
      { label: "Software", value: "Open", sublabel: "Open protocol + app constructor" },
    ],
    highlights: [
      {
        title: "Open Protocol, Open Source",
        description:
          "The data protocol is fully open, so you can read the signals in any language and build on top of them.",
      },
      {
        title: "App Constructor Inside",
        description:
          "Start with a ready-made app and adapt it to your own needs with the built-in app constructor.",
      },
      {
        title: "Games & VR via PiEEG Server",
        description:
          "Connect to the PiEEG server to play games or drive VR with your brain signals.",
      },
      {
        title: "Move It, Scale It",
        description:
          "Change the module position on the head in seconds, and expand from 16 up to 48 channels.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "Octopus Headband with Octopus 16", detail: "Final contents announced at launch" },
      { qty: "1×", item: "1000 mAh rechargeable battery", detail: "Mounts on the band" },
    ],
    requirements: [
      "Specifications may change — Octopus Headband is in development",
      "Computer, phone or VR headset to run the app",
    ],
    recommendedWith: ["octopus-16", "ironbci-128"],
    fullSpecs: [
      { label: "EEG module", value: "Octopus 16 (16 channels, dry gold pogo-pin electrodes)" },
      { label: "Channels", value: "16, expandable up to 48" },
      { label: "Battery", value: "1000 mAh rechargeable, USB-C" },
      { label: "Data protocol", value: "Fully open and documented" },
      { label: "Software", value: "App constructor to build and adapt your own app" },
      { label: "Integration", value: "PiEEG server — games and VR" },
      { label: "Positioning", value: "Module moves easily to a new position on the head" },
      { label: "Price & availability", value: "Announced to subscribers first" },
    ],
    faqs: [
      {
        q: "When will Octopus Headband be available?",
        a: "It is in development. Sign up on this page and we'll email you as soon as it is ready to order.",
      },
      {
        q: "Is it really open source?",
        a: "Yes. The data protocol is fully open, so you can read and use the signals in your own software.",
      },
      {
        q: "Can I build my own app?",
        a: "Yes. The software includes an app constructor, so you can start with a ready app and adapt it to your needs.",
      },
      {
        q: "Can I use it for games or VR?",
        a: "Yes. Octopus Headband connects to the PiEEG server for games and VR.",
      },
      {
        q: "Can I start with Octopus 16 now?",
        a: "Yes. Octopus 16 is available today — it is the same board that powers the headband.",
      },
    ],
  },
  {
    slug: "pieeg-xr",
    name: "PiEEG XR",
    shortName: "PiEEG XR",
    eyebrow: "Neural Face Interface for VR Headsets",
    badge: "Newest · XR",
    tagline: "8-channel dry-electrode VR face gasket for facial EMG and frontal EEG.",
    headline: "Reserve PiEEG XR",
    summary:
      "Snap-on neural face interface for spatial computing and VR headsets. Captures 8 channels of facial micro-expression EMG and frontal EEG at 24-bit resolution over BLE 5.0—driving live avatar expressions and Focus-to-Action mechanics.",
    category: "xr",
    channelFilter: "8ch",
    featured: true,
    channels: "8 channels",
    platform: "VR Headset · BLE 5.0",
    signals: ["EEG", "EMG"],
    gradient: "from-violet-500 to-cyan-600",
    accentText: "text-violet-400",
    heroImage: "/products/pieeg-xr.png",
    gallery: [
      {
        src: "/products/pieeg-xr.png",
        alt: "PiEEG XR neural face gasket for VR headsets",
        caption: "PiEEG XR — Dry electrodes integrated directly into the VR face gasket",
      },
      {
        src: "/products/pieeg-xr-kit.jpg",
        alt: "PiEEG XR kit with VR headset",
        caption: "Snaps onto standard VR headsets with wireless BLE 5.0 streaming",
      },
      {
        src: "/products/pieeg-xr-focus.png",
        alt: "PiEEG XR Focus-to-Action gameplay demo",
        caption: "Focus-to-Action API: control in-game physics and shaders with neural band power",
      },
      {
        src: "/products/pieeg-xr-poster.png",
        alt: "PiEEG XR facial EMG expression mapping",
        caption: "Real-time facial EMG decoding for camera-free avatar micro-expressions",
      },
    ],
    videoId: "X3xSN6h-QzM",
    price: null,
    priceLabel: "Kickstarter",
    currency: "USD",
    sku: "PIEEG-XR-8",
    availability: "Kickstarter",
    kickstarterUrl:
      "https://www.kickstarter.com/projects/42415505/pieeg-xr-neural-face-interface-for-spatial-computing",
    hardwarePath: "/hardware/pieeg-xr",
    storePath: "/store/pieeg-xr",
    githubUrl: "https://github.com/pieeg-club/ironbci",
    enclosureLinks: enclosuresFor("pieeg-xr"),
    keySpecs: [
      { label: "Channels", value: "8 Channels", sublabel: "Dry face-mask sensors" },
      { label: "Signals", value: "EEG + Facial EMG", sublabel: "Focus & expressions" },
      { label: "Front-End", value: "24-bit IronBCI", sublabel: "250 SPS over BLE 5" },
      { label: "Form Factor", value: "VR Face Gasket", sublabel: "Open-source 3D CAD" },
    ],
    highlights: [
      {
        title: "Camera-Free Facial Expression Tracking",
        description:
          "Dry electrodes around the mask read zygomatic, corrugator, and jaw EMG to drive real-time avatar smiles, frowns, and speech cues.",
      },
      {
        title: "Focus-to-Action Spatial Computing API",
        description:
          "Stream live alpha/beta/theta ratios into Unity, Unreal, WebXR, or TouchDesigner to trigger scene effects from mental focus.",
      },
      {
        title: "Powered by the 24-Bit IronBCI Core",
        description:
          "Uses the proven IronBCI 24-bit analog front-end and BLE 5 radio—fully compatible with PiEEG Cloud and open-source SDKs.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "PiEEG XR Face Gasket with 8 Dry Electrodes", detail: "Snap-on VR interface" },
      { qty: "1×", item: "IronBCI 24-Bit BLE 5.0 Acquisition Module", detail: "250 SPS wireless streaming" },
      { qty: "1×", item: "WebXR / Unity / Python SDK & Open 3D CAD", detail: "MIT open-source software stack" },
    ],
    requirements: [
      "Compatible VR headset (Meta Quest / Pico / PCVR)",
      "BLE 5.0 receiver (PC, headset, or mobile device)",
    ],
    recommendedWith: ["xr-16", "ironbci", "octopus-16"],
    fullSpecs: [
      { label: "Channels", value: "8 dry mask electrodes + reference" },
      { label: "Signals Measured", value: "Frontal EEG, EOG & Facial EMG" },
      { label: "ADC Resolution", value: "24-bit @ 250 SPS (IronBCI core)" },
      { label: "Wireless", value: "Bluetooth Low Energy 5.0" },
      { label: "Availability", value: "Launching on Kickstarter + Direct Store Soon" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "xr-16",
    name: "PiEEG XR-16",
    shortName: "PiEEG XR-16",
    eyebrow: "16-Channel Face + Visual Cortex VR Interface",
    badge: "16-Ch XR",
    tagline: "PiEEG XR face gasket plus 8 posterior visual-cortex sensors (16 channels total).",
    headline: "Reserve PiEEG XR-16",
    summary:
      "Everything in PiEEG XR plus eight rear electrodes over the occipital visual cortex. Built for SSVEP, visual evoked potentials (VEP), and full-head spatial computing research inside VR.",
    category: "xr",
    channelFilter: "16ch",
    channels: "16 channels",
    platform: "VR Headset · BLE 5.0",
    signals: ["EEG", "EMG"],
    gradient: "from-cyan-500 to-blue-600",
    accentText: "text-cyan-400",
    heroImage: "/products/xr-16.png",
    gallery: [
      {
        src: "/products/xr-16.png",
        alt: "PiEEG XR-16 16-channel VR neural interface",
        caption: "PiEEG XR-16 — 8 face-gasket electrodes + 8 visual-cortex rear sensors",
      },
      {
        src: "/products/pieeg-xr.png",
        alt: "PiEEG XR front electrode layout",
        caption: "Front gasket dry electrodes for frontal EEG and facial EMG",
      },
      {
        src: "/products/pieeg-xr-kit.jpg",
        alt: "PiEEG XR kit with VR headset",
        caption: "Complete headset-mounted neural interface kit",
      },
    ],
    videoId: "X3xSN6h-QzM",
    price: null,
    priceLabel: "Kickstarter",
    currency: "USD",
    sku: "PIEEG-XR-16",
    availability: "Kickstarter",
    kickstarterUrl:
      "https://www.kickstarter.com/projects/42415505/pieeg-xr-neural-face-interface-for-spatial-computing",
    hardwarePath: "/hardware/xr-16",
    storePath: "/store/xr-16",
    githubUrl: "https://github.com/pieeg-club/ironbci",
    enclosureLinks: enclosuresFor("pieeg-xr"),
    keySpecs: [
      { label: "Channels", value: "16 Channels", sublabel: "8 Face + 8 Occipital" },
      { label: "Coverage", value: "Frontal + Visual", sublabel: "SSVEP & VEP ready" },
      { label: "Resolution", value: "24-bit @ 250 SPS", sublabel: "BLE 5.0 wireless" },
      { label: "SDK", value: "Open-Source", sublabel: "Python, WebXR, Unity" },
    ],
    highlights: [
      {
        title: "Occipital Visual Cortex + Facial EMG",
        description:
          "Adds 8 posterior electrodes over O1/Oz/O2/POz so you can decode visual attention and SSVEP targets inside VR alongside facial expressions.",
      },
      {
        title: "16 Synchronized 24-Bit Channels",
        description:
          "Streams all 16 channels wirelessly over BLE 5.0 at 250 SPS directly to PiEEG Cloud or your local VR host.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "PiEEG XR-16 Face Gasket + 8 Rear Visual-Cortex Sensors", detail: "16 dry electrodes total" },
      { qty: "1×", item: "16-Channel 24-Bit BLE 5.0 Module", detail: "Advertises as PiEEG XR-16" },
    ],
    requirements: [
      "Compatible VR headset",
      "BLE 5.0 capable host device",
    ],
    recommendedWith: ["pieeg-xr", "octopus-16", "16ch-cap"],
    fullSpecs: [
      { label: "Channels", value: "16 channels (8 facial/frontal + 8 occipital visual cortex)" },
      { label: "Resolution", value: "24-bit, 250 SPS per channel" },
      { label: "Wireless", value: "BLE 5.0" },
      { label: "Availability", value: "Kickstarter / Direct Store Soon" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "ardeeg",
    name: "ardEEG",
    shortName: "ardEEG",
    eyebrow: "8-Channel Arduino UNO R4 WiFi Shield",
    tagline: "Bring 8-channel 24-bit EEG, EMG, and ECG to the Arduino UNO R4 WiFi ecosystem.",
    headline: "Buy ardEEG",
    summary:
      "Arduino tools for learning electronics—now for learning neuroscience. ardEEG stacks directly onto an Arduino UNO R4 WiFi to stream 8 channels of 24-bit biosignals over Wi-Fi or Serial with ultra-low power consumption.",
    category: "mcu-kits",
    channelFilter: "8ch",
    channels: "8 channels",
    platform: "Arduino UNO R4 WiFi",
    signals: ["EEG", "EMG", "ECG"],
    gradient: "from-green-500 to-emerald-600",
    accentText: "text-emerald-500",
    heroImage: "/products/ardeeg.png",
    gallery: [
      {
        src: "/products/ardeeg.png",
        alt: "ardEEG 8-channel Arduino EEG shield",
        caption: "ardEEG — 8-channel 24-bit shield for Arduino UNO R4 WiFi",
      },
      {
        src: "/products/ardeeg-top.png",
        alt: "ardEEG top PCB layout",
        caption: "Clean Arduino shield footprint with standard 2.54 mm electrode headers",
      },
      {
        src: "/products/ardeeg-setup.jpg",
        alt: "ardEEG complete setup with Arduino",
        caption: "Ultra-low power operation with wireless Wi-Fi streaming to Python",
      },
    ],
    videoId: "s_5mDDUFp6E",
    ...catalogInfo("ardeeg"),
    hardwarePath: "/hardware/ardeeg",
    storePath: "/store/ardeeg",
    githubUrl: "https://github.com/Ildaron/ardEEG",
    enclosureLinks: enclosuresFor("ardeeg"),
    keySpecs: [
      { label: "Channels", value: "8 Channels", sublabel: "+ REF and BIAS" },
      { label: "Host", value: "UNO R4 WiFi", sublabel: "Standard shield pinout" },
      { label: "Transfer", value: "SPI + Wi-Fi", sublabel: "Wireless or USB serial" },
      { label: "ADC", value: "24-bit", sublabel: "Programmable gain 1–24" },
    ],
    highlights: [
      {
        title: "Familiar Arduino Workflow, Research-Grade ADC",
        description:
          "Program in the Arduino IDE using C/C++ while streaming 24-bit biosignal data over Wi-Fi to our Python receiver and visualizer.",
      },
      {
        title: "Ultra-Low Power for Wearable Projects",
        description:
          "Runs for hours on a compact 5V battery pack, making it ideal for student capstone projects, prosthetics, and robotics control.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "ardEEG 8-Channel Shield", detail: "Stackable Arduino UNO R4 WiFi form factor" },
      { qty: "1×", item: "Arduino Firmware & Python Receiver SDK", detail: "MIT open-source repository" },
    ],
    requirements: [
      "Arduino UNO R4 WiFi (not included)",
      "5V battery pack (required for isolated recording)",
      "8-Channel EEG Cap or EMG/ECG electrode kit",
    ],
    recommendedWith: ["8ch-dry-cap", "emg-kit", "8ch-wet-cap"],
    fullSpecs: [
      { label: "Channels", value: "8 differential + Reference + Bias" },
      { label: "Host Board", value: "Arduino UNO R4 WiFi" },
      { label: "Resolution", value: "24-bit ADC, gain 1× to 24×" },
      { label: "Interface", value: "SPI to Arduino, Wi-Fi / Serial to PC" },
      { label: "SKU", value: "CQA240229AR" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "microbci",
    name: "MicroBCI",
    shortName: "MicroBCI",
    eyebrow: "8-Channel STM32 NUCLEO-WB55 Shield",
    tagline: "Embedded 8-channel 24-bit BCI shield for STM32 NUCLEO-WB55.",
    headline: "Buy MicroBCI",
    summary:
      "Built for embedded systems engineers and STM32 developers. MicroBCI mounts onto the dual-core wireless STM32 NUCLEO-WB55 development board for real-time 8-channel 24-bit EEG, EMG, and ECG acquisition.",
    category: "mcu-kits",
    channelFilter: "8ch",
    channels: "8 channels",
    platform: "STM32 NUCLEO-WB55",
    signals: ["EEG", "EMG", "ECG"],
    gradient: "from-teal-500 to-cyan-600",
    accentText: "text-teal-500",
    heroImage: "/products/microbci.png",
    gallery: [
      {
        src: "/products/microbci.png",
        alt: "MicroBCI STM32 EEG shield",
        caption: "MicroBCI — 8-channel biosignal shield for STM32 NUCLEO-WB55",
      },
      {
        src: "/products/microbci-main.png",
        alt: "MicroBCI board detail",
        caption: "24-bit SPI acquisition engineered for STMicroelectronics workflows",
      },
      {
        src: "/products/microbci-setup.jpg",
        alt: "MicroBCI mounted on STM32 Nucleo",
        caption: "Complete embedded setup with Python and mobile SDK support",
      },
    ],
    ...catalogInfo("microbci"),
    hardwarePath: "/hardware/microbci",
    storePath: "/store/microbci",
    githubUrl: "https://github.com/pieeg-club/MicroBCI",
    enclosureLinks: enclosuresFor("microbci"),
    keySpecs: [
      { label: "Channels", value: "8 Channels", sublabel: "EEG · EMG · ECG" },
      { label: "Host MCU", value: "STM32WB55", sublabel: "ARM Cortex-M4 + M0+" },
      { label: "Sample Rate", value: "250 SPS", sublabel: "24-bit SPI bus" },
      { label: "SDK", value: "Python & Mobile", sublabel: "STM32Cube compatible" },
    ],
    highlights: [
      {
        title: "Native STM32 Ecosystem Integration",
        description:
          "Run bare-metal C, FreeRTOS, or CMSIS-DSP filters directly on the STM32 microcontroller with deterministic real-time latency.",
      },
      {
        title: "Lowest-Cost Entry to 8-Channel 24-Bit BCI",
        description:
          "At $325, MicroBCI gives embedded labs and students an industrial-grade 8-channel biopotential front-end.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "MicroBCI 8-Channel STM32 Shield", detail: "Compatible with STM32 NUCLEO-WB55 headers" },
      { qty: "1×", item: "STM32 Firmware, Python & Mobile SDK", detail: "Open-source on GitHub" },
    ],
    requirements: [
      "STM32 NUCLEO-WB55 board (not included)",
      "Battery power source (5V)",
      "8-Channel EEG Cap or EMG/ECG electrodes",
    ],
    recommendedWith: ["8ch-dry-cap", "emg-kit", "8ch-wet-cap"],
    fullSpecs: [
      { label: "Channels", value: "8 differential channels + Reference + Bias" },
      { label: "Host Platform", value: "STM32 NUCLEO-WB55" },
      { label: "Sampling Rate", value: "250 SPS @ 24-bit resolution" },
      { label: "Programmable Gain", value: "1, 2, 4, 6, 8, 12, 24" },
      { label: "SKU", value: "PIA24024P" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "jneeg",
    name: "JNEEG",
    shortName: "JNEEG",
    eyebrow: "8-Channel NVIDIA Jetson Nano Shield",
    tagline: "GPU-accelerated 8-channel 24-bit EEG shield for NVIDIA Jetson Nano.",
    headline: "Buy JNEEG",
    summary:
      "Purpose-built for edge AI, deep learning, and real-time neural decoding. JNEEG connects directly to the NVIDIA Jetson Nano 40-pin header so you can run PyTorch, TensorFlow, and Keras models against live 24-bit EEG streams on the GPU.",
    category: "sbc-shields",
    channelFilter: "8ch",
    channels: "8 channels",
    platform: "NVIDIA Jetson Nano",
    signals: ["EEG", "EMG", "ECG"],
    gradient: "from-orange-500 to-red-600",
    accentText: "text-orange-500",
    heroImage: "/products/jneeg.png",
    gallery: [
      {
        src: "/products/jneeg.png",
        alt: "JNEEG Jetson Nano EEG shield",
        caption: "JNEEG — 8-channel 24-bit biosignal shield for NVIDIA Jetson Nano",
      },
      {
        src: "/products/jneeg-board.jpg",
        alt: "JNEEG mounted on NVIDIA Jetson Nano",
        caption: "Direct SPI connection to Jetson Nano for zero-copy GPU inference",
      },
      {
        src: "/products/jneeg-detail.jpg",
        alt: "JNEEG electrode connector detail",
        caption: "250 SPS to 16 kSPS sampling rate with programmable gain 1–24",
      },
    ],
    videoId: "f3stVQCsfrM",
    ...catalogInfo("jneeg"),
    hardwarePath: "/hardware/jneeg",
    storePath: "/store/jneeg",
    githubUrl: "https://github.com/Pi-EEG/EEG-with-JetsonNano",
    enclosureLinks: enclosuresFor("jneeg"),
    keySpecs: [
      { label: "Channels", value: "8 Channels", sublabel: "24-bit ADS1299" },
      { label: "Host GPU", value: "Jetson Nano", sublabel: "128-core NVIDIA Maxwell" },
      { label: "Sample Rate", value: "250–16k SPS", sublabel: "Direct SPI transfer" },
      { label: "AI Stack", value: "PyTorch / Keras", sublabel: "On-device ML inference" },
    ],
    highlights: [
      {
        title: "Edge GPU Neural Decoding",
        description:
          "Eliminate network jitter by running CNN/Transformer EEG classifiers directly on the Jetson Nano GPU right next to the SPI bus.",
      },
      {
        title: "Ideal for Neuro-Robotics",
        description:
          "Combine computer vision and 8-channel EEG/EMG on a single NVIDIA Jetson board to drive robotic arms, wheelchairs, and drones.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "JNEEG 8-Channel Shield for Jetson Nano", detail: "40-pin GPIO compatible" },
      { qty: "1×", item: "Python & Deep Learning Example Suite", detail: "Open-source repository on GitHub" },
    ],
    requirements: [
      "NVIDIA Jetson Nano Developer Kit (not included)",
      "Isolated battery power supply",
      "8-Channel EEG Cap or EMG/ECG electrode kit",
    ],
    recommendedWith: ["8ch-dry-cap", "8ch-wet-cap", "emg-kit"],
    fullSpecs: [
      { label: "Channels", value: "8 differential + Reference + Bias" },
      { label: "Host Compatibility", value: "NVIDIA Jetson Nano" },
      { label: "ADC Resolution", value: "24-bit, 250 SPS to 16 kSPS" },
      { label: "Programmable Gain", value: "1, 2, 4, 6, 8, 12, 24" },
      { label: "SKU", value: "CQA240229JN" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "8ch-dry-cap",
    name: "8 Channel Dry EEG Cap Kit",
    shortName: "8-Ch Dry Cap",
    eyebrow: "Gel-Free Ready-to-Wear EEG Cap",
    badge: "No Gel Needed",
    tagline: "8 dry comfort press-fit Ag/AgCl electrodes + 2 ear clips on the 10-20 system.",
    headline: "Buy 8-Ch Dry EEG Cap Kit",
    summary:
      "Start measuring brainwaves in under two minutes with zero conductive gel and zero cleanup. Includes a washable 10-20 nylon cap, 8 dry press-fit Ag/AgCl comb electrodes with pre-wired 2.54 mm cables, and 2 ear-clip references.",
    category: "caps-accessories",
    channelFilter: "8ch",
    channels: "8 channels",
    platform: "All 8/16-ch PiEEG Boards",
    signals: ["EEG"],
    gradient: "from-cyan-500 to-blue-500",
    accentText: "text-cyan-500",
    heroImage: "/products/cap8-dry.png",
    gallery: [
      {
        src: "/products/cap8-dry.png",
        alt: "8 Channel Dry EEG Cap Kit",
        caption: "8-Channel Dry EEG Cap Kit — Ready to wear with no gel required",
      },
      {
        src: "/products/cap8-dry-2.jpg",
        alt: "Dry EEG electrode comb detail",
        caption: "Spring-comfort dry Ag/AgCl pins part hair gently for direct scalp contact",
      },
      {
        src: "/products/cap8-dry-3.jpg",
        alt: "8-Channel Dry Cap 2.54mm connectors",
        caption: "Pre-wired 2.54 mm connectors plug straight into PiEEG-8, IronBCI, ardEEG, MicroBCI & JNEEG",
      },
    ],
    ...catalogInfo("8ch-dry-cap"),
    hardwarePath: "/hardware/8ch-dry-cap",
    storePath: "/store/8ch-dry-cap",
    enclosureLinks: [],
    keySpecs: [
      { label: "Channels", value: "8 Dry + 2 Ref", sublabel: "10-20 system positions" },
      { label: "Electrode", value: "Dry Ag/AgCl", sublabel: "Zero conductive gel" },
      { label: "Connectors", value: "2.54 mm Pitch", sublabel: "Plug-and-play cables" },
      { label: "Prep Time", value: "< 2 Minutes", sublabel: "No hair washing after" },
    ],
    highlights: [
      {
        title: "Zero Gel, Zero Mess",
        description:
          "Perfect for classrooms, hackathons, rapid prototyping, and daily BCI sessions where applying and washing out gel isn't practical.",
      },
      {
        title: "Universal 2.54 mm PiEEG Connector",
        description:
          "Every electrode and ear clip terminates in a standard 2.54 mm female header that slides directly onto PiEEG-8, IronBCI, ardEEG, MicroBCI, and JNEEG.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "Adjustable 10-20 Nylon EEG Cap (Size L)", detail: "With pre-mounted electrode holders" },
      { qty: "8×", item: "Dry Ag/AgCl Comb Electrodes with Integrated Cables", detail: "2.54 mm pin connectors" },
      { qty: "2×", item: "Ear-Clip Reference & Bias Electrodes", detail: "2.54 mm pin connectors" },
    ],
    requirements: [
      "Compatible EEG acquisition board (PiEEG-8, IronBCI, ardEEG, MicroBCI, or JNEEG)",
    ],
    recommendedWith: ["pieeg", "ironbci", "ardeeg", "emg-kit"],
    fullSpecs: [
      { label: "Channels", value: "8 EEG channels + 2 ear-clip references" },
      { label: "Electrode Type", value: "Dry press-fit sintered Ag/AgCl" },
      { label: "Gel Required", value: "No" },
      { label: "Connector", value: "2.54 mm pin socket" },
      { label: "Compatible Boards", value: "PiEEG-8, PiEEG-16, IronBCI, MicroBCI, ardEEG, JNEEG" },
      { label: "SKU", value: "CQA240229CE" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "8ch-wet-cap",
    name: "8 Channel Wet EEG Cap Kit",
    shortName: "8-Ch Wet Cap",
    eyebrow: "Clinical-Grade Wet Ag/AgCl Cap",
    tagline: "Gold-plated sintered Ag/AgCl wet electrodes for ultra-low skin impedance.",
    headline: "Buy 8-Ch Wet EEG Cap Kit",
    summary:
      "When your research demands the lowest possible electrode-skin impedance and clinical-grade signal fidelity. Includes a washable 10-20 textile cap, 8 gold-plated sintered Ag/AgCl wet electrodes, 2 ear clips, and starter gel.",
    category: "caps-accessories",
    channelFilter: "8ch",
    channels: "8 channels",
    platform: "All 8/16-ch PiEEG Boards",
    signals: ["EEG"],
    gradient: "from-blue-500 to-indigo-500",
    accentText: "text-blue-500",
    heroImage: "/products/cap8-wet.jpg",
    gallery: [
      {
        src: "/products/cap8-wet.jpg",
        alt: "8 Channel Wet EEG Cap Kit",
        caption: "8-Channel Wet EEG Cap Kit with sintered Ag/AgCl electrodes",
      },
      {
        src: "/products/cap8-wet-2.jpg",
        alt: "Wet EEG electrode closeup",
        caption: "Gold-plated sintered Ag/AgCl electrodes for ultra-low drift and noise",
      },
      {
        src: "/products/cap8-wet-3.jpg",
        alt: "8-Channel Wet Cap view",
        caption: "Standard 10-20 placement with washable elastic textile construction",
      },
    ],
    ...catalogInfo("8ch-wet-cap"),
    hardwarePath: "/hardware/8ch-wet-cap",
    storePath: "/store/8ch-wet-cap",
    enclosureLinks: [],
    keySpecs: [
      { label: "Channels", value: "8 Wet + 2 Ref", sublabel: "10-20 montage" },
      { label: "Electrode", value: "Sintered Ag/AgCl", sublabel: "Gold-plated cups" },
      { label: "Impedance", value: "< 5 kΩ Typical", sublabel: "With conductive gel" },
      { label: "Connector", value: "2.54 mm Pitch", sublabel: "Direct PiEEG fit" },
    ],
    highlights: [
      {
        title: "Publication-Ready Signal Quality",
        description:
          "Wet sintered Ag/AgCl electrodes provide the gold-standard half-cell stability required for ERP, P300, sleep spindles, and clinical neuroscience research.",
      },
      {
        title: "Reusable & Washable Textile Cap",
        description:
          "Built for hundreds of lab sessions with easy water-rinse cleanup and durable shielded lead wires.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "8-Channel 10-20 Textile EEG Cap", detail: "Adjustable chin strap" },
      { qty: "8×", item: "Gold-Plated Sintered Ag/AgCl Wet Electrodes", detail: "With 2.54 mm connectors" },
      { qty: "2×", item: "Ear-Clip Reference Electrodes", detail: "With 2.54 mm connectors" },
    ],
    requirements: [
      "Compatible 8-ch or 16-ch PiEEG board",
      "Conductive EEG Gel (starter included; extra 100ml bottle recommended for labs)",
    ],
    recommendedWith: ["pieeg", "ironbci", "conductive-gel"],
    fullSpecs: [
      { label: "Channels", value: "8 wet channels + 2 ear-clip references" },
      { label: "Electrode Material", value: "Gold-plated sintered Ag/AgCl" },
      { label: "Gel Required", value: "Yes (included)" },
      { label: "Compatibility", value: "PiEEG-8, PiEEG-16, IronBCI, MicroBCI, ardEEG, JNEEG" },
      { label: "SKU", value: "PDA24022P" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "16ch-cap",
    name: "16 Channel EEG Cap",
    shortName: "16-Ch EEG Cap",
    eyebrow: "16-Channel High-Density EEG Cap",
    tagline: "16 sintered Ag/AgCl electrodes + 2 ear clips for PiEEG-16 and Octopus 16.",
    headline: "Buy 16-Channel EEG Cap",
    summary:
      "Full 16-channel 10-20 coverage across prefrontal, frontal, central, temporal, parietal, and occipital regions. Engineered specifically for PiEEG-16 and 16-channel BCI setups.",
    category: "caps-accessories",
    channelFilter: "16ch",
    channels: "16 channels",
    platform: "PiEEG-16 · Octopus 16",
    signals: ["EEG"],
    gradient: "from-purple-500 to-pink-500",
    accentText: "text-purple-500",
    heroImage: "/products/cap16.png",
    gallery: [
      {
        src: "/products/cap16.png",
        alt: "16 Channel EEG Cap",
        caption: "16-Channel EEG Cap — Full 10-20 system spatial coverage",
      },
      {
        src: "/products/cap16-2.jpg",
        alt: "16 Channel EEG Cap electrode layout",
        caption: "Pre-positioned holders at Fp1/Fp2, F3/F4, F7/F8, C3/C4, T3/T4, T5/T6, P3/P4, O1/O2",
      },
      {
        src: "/products/cap16-3.jpg",
        alt: "16 Channel EEG Cap 2.54mm connectors",
        caption: "Labeled 2.54 mm connectors for fast channel mapping on PiEEG-16",
      },
    ],
    ...catalogInfo("16ch-cap"),
    hardwarePath: "/hardware/16ch-cap",
    storePath: "/store/16ch-cap",
    enclosureLinks: [],
    keySpecs: [
      { label: "Channels", value: "16 + 2 Ear Ref", sublabel: "Full 10-20 montage" },
      { label: "Electrode", value: "Ag/AgCl", sublabel: "Professional grade" },
      { label: "Connector", value: "2.54 mm Pitch", sublabel: "Direct PiEEG-16 fit" },
      { label: "Cap Material", value: "Washable Nylon", sublabel: "Size L adjustable" },
    ],
    highlights: [
      {
        title: "Complete 10-20 Topographical Mapping",
        description:
          "Covers all major cortical lobes simultaneously—ideal for coherence mapping, motor imagery, and hemispheric asymmetry studies.",
      },
      {
        title: "Plug-and-Play with PiEEG-16",
        description:
          "Every lead terminates in a 2.54 mm connector ready to plug directly onto the PiEEG-16 header row.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "16-Channel Nylon EEG Cap (Size L)", detail: "International 10-20 positions" },
      { qty: "16×", item: "Ag/AgCl Electrodes with Integrated 2.54 mm Cables", detail: "Individually labeled" },
      { qty: "2×", item: "Ear-Clip Reference & Bias Electrodes", detail: "2.54 mm connectors" },
    ],
    requirements: [
      "PiEEG-16 or compatible 16-channel acquisition system",
    ],
    recommendedWith: ["pieeg-16", "octopus-16", "conductive-gel"],
    fullSpecs: [
      { label: "Channels", value: "16 EEG + 2 ear-clip references" },
      { label: "Positions", value: "Fp1, Fp2, F3, F4, C3, C4, P3, P4, O1, O2, F7, F8, T3, T4, T5, T6" },
      { label: "Connector", value: "2.54 mm pin socket" },
      { label: "Compatibility", value: "PiEEG-16, Octopus 16, IronBCI" },
      { label: "SKU", value: "CQA240229CK2" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "32ch-wet-cap",
    name: "32 Channel Wet EEG Cap Kit",
    shortName: "32-Ch Wet Cap",
    eyebrow: "32-Channel Research Cap for IronBCI-32",
    tagline: "32 wet Ag/AgCl electrodes + 2 ear-clip references with 2.54 mm plug-and-play pitch.",
    headline: "Buy 32-Ch Wet EEG Cap Kit",
    summary:
      "Engineered specifically for IronBCI-32. Provides 32 wet sintered Ag/AgCl electrodes across both hemispheres and the midline (Fpz, Fz, FCz, Cz, CPz, Pz, POz, Oz) plus dual ear-clip references.",
    category: "caps-accessories",
    channelFilter: "32ch",
    channels: "32 channels",
    platform: "IronBCI-32",
    signals: ["EEG"],
    gradient: "from-red-500 to-orange-500",
    accentText: "text-red-500",
    heroImage: "/products/cap32-wet.webp",
    gallery: [
      {
        src: "/products/cap32-wet.webp",
        alt: "32 Channel Wet EEG Cap Kit",
        caption: "32-Channel Wet EEG Cap Kit — High-density 10-20 research cap",
      },
      {
        src: "/products/cap32-wet-2.webp",
        alt: "32 Channel Wet Cap electrode detail",
        caption: "32 wet Ag/AgCl electrodes with integrated low-noise cables",
      },
      {
        src: "/products/cap32-wet-3.webp",
        alt: "32 Channel Wet Cap worn view",
        caption: "Full-scalp coverage including midline z-channels and dual ear clips",
      },
    ],
    ...catalogInfo("32ch-wet-cap"),
    hardwarePath: "/hardware/32ch-wet-cap",
    storePath: "/store/32ch-wet-cap",
    enclosureLinks: [],
    keySpecs: [
      { label: "Channels", value: "32 EEG + 2 Ref", sublabel: "Hemispheres + Midline" },
      { label: "Electrode", value: "Wet Ag/AgCl", sublabel: "Clinical low-noise" },
      { label: "Pitch", value: "2.54 mm", sublabel: "Fits IronBCI-32" },
      { label: "Weight", value: "350 g", sublabel: "Breathable nylon" },
    ],
    highlights: [
      {
        title: "Matched to IronBCI-32",
        description:
          "No custom adapters or soldering needed—the 32 channel leads and 2 ear-clip references plug directly into the IronBCI-32 header bank.",
      },
      {
        title: "Full Midline + Bilateral 10-20 Array",
        description:
          "Includes 8 midline electrodes (Fpz to Oz) and 24 lateral electrodes for high-density source imaging and motor decoding.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "32-Channel Nylon EEG Cap (Size L)", detail: "Full 10-20 layout" },
      { qty: "32×", item: "Wet Ag/AgCl Electrodes with Integrated 2.54 mm Cables", detail: "Pre-labeled by 10-20 site" },
      { qty: "2×", item: "Ear-Clip Reference & Bias Electrodes (A1/A2)", detail: "2.54 mm connectors" },
    ],
    requirements: [
      "IronBCI-32 acquisition board",
      "Conductive EEG Gel",
    ],
    recommendedWith: ["ironbci-32", "conductive-gel", "emg-kit"],
    fullSpecs: [
      { label: "Channels", value: "32 EEG + 2 ear-clip references" },
      { label: "Electrode Type", value: "Wet sintered Ag/AgCl" },
      { label: "Connector", value: "2.54 mm pin pitch" },
      { label: "Compatibility", value: "IronBCI-32" },
      { label: "Weight", value: "350 g" },
      { label: "SKU", value: "PIA24026P" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "emg-kit",
    name: "EMG / ECG / EKG Kit",
    shortName: "EMG / ECG Kit",
    eyebrow: "Universal Multi-Signal Electrode & Cable Kit",
    badge: "Essential Add-on",
    tagline: "3 snap lead cables + 50 adhesive Ag/AgCl surface electrodes for EMG, ECG, and EEG.",
    headline: "Buy EMG / ECG / EKG Kit",
    summary:
      "The essential starter accessory for every PiEEG board. Includes 3 color-coded snap lead cables with 2.54 mm pin connectors and 50 self-adhesive solid-gel Ag/AgCl surface electrodes for immediate forearm EMG, heart ECG, or forehead EEG recording.",
    category: "caps-accessories",
    channelFilter: "accessory",
    channels: "Multi-signal",
    platform: "All PiEEG Hardware",
    signals: ["EMG", "ECG", "EEG"],
    gradient: "from-orange-500 to-red-500",
    accentText: "text-orange-500",
    heroImage: "/products/emg-kit.jpg",
    gallery: [
      {
        src: "/products/emg-kit.jpg",
        alt: "EMG / ECG / EKG Kit overview",
        caption: "Complete EMG / ECG / EKG Kit — 3 snap cables + 50 adhesive electrodes",
      },
      {
        src: "/products/emg-cables.jpg",
        alt: "EMG snap cables with 2.54mm connectors",
        caption: "Color-coded snap leads with 2.54 mm connectors fit every PiEEG board",
      },
      {
        src: "/products/emg-electrodes.jpg",
        alt: "50 self-adhesive Ag/AgCl electrodes",
        caption: "50× 45 mm pre-gelled Ag/AgCl disposable surface patches",
      },
    ],
    ...catalogInfo("emg-kit"),
    hardwarePath: "/hardware/emg-kit",
    storePath: "/store/emg-kit",
    enclosureLinks: [],
    keySpecs: [
      { label: "Electrodes", value: "50 Patches", sublabel: "Pre-gelled Ag/AgCl" },
      { label: "Lead Cables", value: "3× Snap Leads", sublabel: "2.54 mm connectors" },
      { label: "Signals", value: "EMG · ECG · EOG", sublabel: "+ Frontal EEG" },
      { label: "Compatibility", value: "Universal", sublabel: "All PiEEG boards" },
    ],
    highlights: [
      {
        title: "Verify Your Board in 60 Seconds",
        description:
          "Before putting on a full EEG cap, snap three patches onto your forearm or chest to see crisp 24-bit muscle EMG spikes and heart R-waves immediately.",
      },
      {
        title: "Works with Every PiEEG Device",
        description:
          "Standard 2.54 mm pin ends plug directly into PiEEG-8, PiEEG-16, IronBCI, IronBCI-32, ardEEG, MicroBCI, and JNEEG.",
      },
    ],
    inTheBox: [
      { qty: "3×", item: "Electrode Snap Lead Cables", detail: "Standard snap socket to 2.54 mm female pin" },
      { qty: "50×", item: "Self-Adhesive Ag/AgCl Solid-Gel Electrodes", detail: "45 mm diameter, skin-safe adhesive" },
    ],
    requirements: [
      "Any PiEEG acquisition board",
    ],
    recommendedWith: ["pieeg", "ardeeg", "microbci", "ironbci"],
    fullSpecs: [
      { label: "Signals", value: "EMG, ECG/EKG, EOG, forehead EEG" },
      { label: "Lead Cables", value: "3× snap-to-2.54mm cables" },
      { label: "Disposable Patches", value: "50× Ag/AgCl solid-gel patches (45 mm)" },
      { label: "Compatibility", value: "All PiEEG boards" },
      { label: "SKU", value: "CQA240229EK" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "conductive-gel",
    name: "Conductive Gel for EEG",
    shortName: "Conductive Gel",
    eyebrow: "Medical-Grade Low-Impedance Electrolyte Gel",
    tagline: "100 ml skin-safe electrolyte gel for wet Ag/AgCl EEG caps.",
    headline: "Conductive Gel for EEG",
    summary:
      "Formulated to rapidly lower skin-electrode impedance on wet sintered Ag/AgCl EEG caps (8-ch, 16-ch, and 32-ch). Water-soluble, non-irritating, and easy to rinse out after recording.",
    category: "caps-accessories",
    channelFilter: "accessory",
    channels: "100 ml",
    platform: "All Wet EEG Caps",
    signals: ["EEG"],
    gradient: "from-green-500 to-emerald-500",
    accentText: "text-emerald-500",
    heroImage: "/products/gel.png",
    gallery: [
      {
        src: "/products/gel.png",
        alt: "Conductive Gel for EEG 100ml bottle",
        caption: "100 ml Low-Impedance Electrolyte Gel for Wet EEG Caps",
      },
      {
        src: "/products/gel-2.png",
        alt: "Conductive Gel application view",
        caption: "Precision nozzle for easy application into wet electrode wells",
      },
    ],
    price: null,
    priceLabel: "Coming soon",
    currency: "USD",
    sku: "PIEEG-GEL-100",
    availability: "ComingSoon",
    elecrowUrl: "https://www.elecrow.com/conductive-gel-for-eeg.html",
    hardwarePath: "/hardware/conductive-gel",
    storePath: "/store/conductive-gel",
    enclosureLinks: [],
    keySpecs: [
      { label: "Volume", value: "100 ml", sublabel: "Dozens of sessions" },
      { label: "Formula", value: "Low-Impedance", sublabel: "Water-soluble" },
      { label: "Skin Safety", value: "Medical Grade", sublabel: "Hypoallergenic" },
      { label: "Use With", value: "Wet Ag/AgCl Caps", sublabel: "8ch / 16ch / 32ch" },
    ],
    highlights: [
      {
        title: "Drops Impedance Below 5 kΩ",
        description:
          "Creates a stable ionic bridge between sintered Ag/AgCl electrodes and the scalp to eliminate 50/60 Hz line noise and motion drift.",
      },
      {
        title: "Water-Soluble & Easy Cleanup",
        description:
          "Rinses cleanly from hair and textile EEG caps using warm water without leaving greasy residue.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "100 ml Bottle of EEG Conductive Gel", detail: "With precision dispenser tip" },
    ],
    requirements: [
      "Wet EEG Cap (8-Ch Wet Cap, 16-Ch Cap, or 32-Ch Wet Cap)",
    ],
    recommendedWith: ["8ch-wet-cap", "16ch-cap", "32ch-wet-cap"],
    fullSpecs: [
      { label: "Volume", value: "100 ml" },
      { label: "Type", value: "Water-soluble conductive electrolyte gel" },
      { label: "Compatibility", value: "All Ag/AgCl wet electrodes" },
      { label: "Availability", value: "Coming Soon — Join Direct Store Waitlist" },
    ],
    faqs: COMMON_STORE_FAQS,
  },
  {
    slug: "octopus-16-enclosure",
    name: "Octopus 16 Enclosure",
    shortName: "Octopus 16 Enclosure",
    eyebrow: "3D-Printed Case · Octopus 16",
    badge: "New",
    tagline: "3D-printed PLA twist-lock case for the Octopus 16 wireless EEG board.",
    headline: "Buy Octopus 16 Enclosure",
    summary:
      "A three-part 3D-printed PLA case for the Octopus 16 board and its XIAO ESP32-S3. The board drops into the box with its 18 pogo pins through the floor, the lid screws on top, and the box screws into the base ring. No screws or tools needed.",
    category: "cases",
    channelFilter: "accessory",
    channels: "Fits Octopus 16",
    platform: "PLA · Twist-lock",
    signals: ["EEG"],
    gradient: "from-violet-500 to-fuchsia-600",
    accentText: "text-violet-500",
    heroImage: "/products/octopus-16-enclosure/enclosure-closed.png",
    gallery: [
      {
        src: "/products/octopus-16-enclosure/enclosure-closed.png",
        alt: "Octopus 16 Enclosure assembled: base ring, threaded box and lid",
        caption: "Assembled: base ring, threaded box and screw-on lid (3D render)",
      },
      {
        src: "/products/octopus-16-enclosure/enclosure-exploded.png",
        alt: "Octopus 16 Enclosure exploded view with the Octopus 16 board and XIAO inside",
        caption: "Exploded view: Octopus 16 and XIAO drop into the box, pins through the floor",
      },
    ],
    ...catalogInfo("octopus-16-enclosure"),
    hardwarePath: "/hardware/octopus-16",
    storePath: "/store/octopus-16-enclosure",
    githubUrl: "https://github.com/pieeg-club/Octopus_16",
    enclosureLinks: enclosuresFor("octopus-16"),
    keySpecs: [
      { label: "Fits", value: "Octopus 16", sublabel: "Ø 26 mm board + XIAO" },
      { label: "Material", value: "PLA", sublabel: "3D printed, non-conductive" },
      { label: "Size", value: "50 × 54 × 30 mm", sublabel: "Assembled, base to lid" },
      { label: "Closing", value: "Threaded", sublabel: "Twist on, no tools" },
    ],
    highlights: [
      {
        title: "Built around the pogo pins",
        description:
          "The 18 holes in the box floor line up exactly with the board's 18 pogo pins. About 8 mm of each pin sticks out below the base, ready to touch the scalp.",
      },
      {
        title: "Twist together, no tools",
        description:
          "The lid screws into the box and the box screws into the base. Take it apart in seconds to flash the XIAO or swap boards.",
      },
      {
        title: "Power and cable openings",
        description:
          "The power bank plugs into the XIAO's USB-C through a side opening with the case closed. A small opening on the other side leaves room for the 6-pin connector cable.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "Base ring", detail: "PLA, internal thread, flat tab and 12 small holes for fixing to a strap or cap" },
      { qty: "1×", item: "Threaded box", detail: "PLA, 18 pogo-pin holes in the floor, USB-C opening and a small cable opening" },
      { qty: "1×", item: "Screw-on lid", detail: "PLA, knurled grip, short post that rests above the XIAO" },
    ],
    requirements: [
      "Octopus 16 board with XIAO ESP32-S3 (not included)",
      "Small 5V power bank, up to 2 A (mandatory while worn)",
      "USB-C data cable (for flashing, off the head)",
      "Elastic strap or headband to hold it in place",
    ],
    recommendedWith: ["octopus-16", "16ch-cap", "octobio-kit"],
    fullSpecs: [
      { label: "Compatible Board", value: "Octopus 16 with Seeed XIAO ESP32-S3 (Ø 26 mm round board, 18 pogo pins)" },
      { label: "Material", value: "PLA (non-conductive), FDM 3D printed" },
      { label: "Printed Parts", value: "3 — base ring, box and lid" },
      { label: "Base Ring", value: "50 × 54 × 13.5 mm including the mounting tab" },
      { label: "Box", value: "Ø 35.5 × 24.7 mm" },
      { label: "Lid", value: "Ø 37 × 11 mm" },
      { label: "Assembled Size", value: "≈ 50 × 54 × 30 mm; pogo pins stick out about 8 mm below the base" },
      { label: "Closing", value: "Threaded: lid into box, box into base. No screws." },
      { label: "Openings", value: "18 pogo-pin holes (Ø 4.7 mm), USB-C side opening, small cable opening" },
      { label: "Weight", value: "≈ 15–20 g (depends on infill)" },
      { label: "Print Settings (DIY)", value: "0.2 mm layers, 15–20 % infill; STL files on Thingiverse" },
      { label: "SKU", value: "PIA40213P" },
    ],
    faqs: [
      {
        q: "Do I need any screws or tools?",
        a: "No. The lid screws into the box and the box screws into the base by hand.",
      },
      {
        q: "Can I plug in the power bank with the case closed?",
        a: "Yes. The XIAO's USB-C port sits behind the wide opening in the side of the box. Flash the firmware with the device off the head; while worn, use a power bank only.",
      },
      {
        q: "Do the pogo pins still reach the scalp?",
        a: "Yes. The pins pass through the box floor and stick out about 8 mm below the base ring, and they still compress under strap pressure as on the bare board.",
      },
      {
        q: "Does the case make Octopus 16 safe to use plugged into a computer?",
        a: "No. The case is a mechanical cover only and adds no electrical isolation. While it is on a head, power it from a small 5V power bank only.",
      },
      {
        q: "Is PLA a good material for this case?",
        a: "PLA is stiff, non-conductive and fine at room and body temperature. It softens at around 55–60 °C, so don't leave the case in a hot car or in direct summer sun.",
      },
      {
        q: "Can I print it myself?",
        a: "Yes. The STL files are on Thingiverse. Print the three parts in PLA with the settings in the specifications table.",
      },
      ...COMMON_STORE_FAQS,
    ],
  },
  {
    slug: "pieeg-pi5-enclosure",
    name: "PiEEG Pi 5 Enclosure",
    shortName: "PiEEG Pi 5 Enclosure",
    eyebrow: "3D-Printed Case · PiEEG-8 & PiEEG-16",
    badge: "New",
    tagline: "3D-printed PLA case for a Raspberry Pi 5 with PiEEG-8 or PiEEG-16.",
    headline: "Buy PiEEG Pi 5 Enclosure",
    summary:
      "One 3D-printed PLA case for a Raspberry Pi 5 with either PiEEG-8 or PiEEG-16 on top. The lid's two slots sit right over the electrode headers of both shields, so you can plug in leads with the case closed. Four screws hold the lid at the corners.",
    category: "cases",
    channelFilter: "accessory",
    channels: "Fits PiEEG-8 & 16",
    platform: "PLA · Raspberry Pi 5",
    signals: ["EEG"],
    gradient: "from-cyan-500 to-blue-600",
    accentText: "text-cyan-500",
    heroImage: "/products/pieeg-pi5-enclosure/enclosure-closed.png",
    gallery: [
      {
        src: "/products/pieeg-pi5-enclosure/enclosure-closed.png",
        alt: "PiEEG Pi 5 Enclosure assembled with lid and four screws",
        caption: "Assembled: case body, lid and four M2.5 screws (3D render)",
      },
      {
        src: "/products/pieeg-pi5-enclosure/enclosure-exploded.png",
        alt: "PiEEG Pi 5 Enclosure exploded view with Raspberry Pi 5 and PiEEG-16",
        caption: "Exploded view: Raspberry Pi 5, PiEEG shield and lid",
      },
    ],
    ...catalogInfo("pieeg-pi5-enclosure"),
    hardwarePath: "/hardware/pieeg",
    storePath: "/store/pieeg-pi5-enclosure",
    githubUrl: "https://github.com/pieeg-club/PiEEG-8",
    enclosureLinks: [],
    keySpecs: [
      { label: "Fits", value: "PiEEG-8 & 16", sublabel: "Same case, same lid" },
      { label: "Host", value: "Raspberry Pi 5", sublabel: "Port openings for Pi 5" },
      { label: "Material", value: "PLA", sublabel: "3D printed, non-conductive" },
      { label: "Size", value: "106 × 75 × 37 mm", sublabel: "Assembled, with lid" },
    ],
    highlights: [
      {
        title: "One case for PiEEG-8 and PiEEG-16",
        description:
          "Both shields share the Raspberry Pi HAT footprint, and the lid's two slots line up with either board: electrodes 1–8 on the left, electrodes 9–16 (or the PiEEG-8 jumpers) on the right.",
      },
      {
        title: "Shaped around the Raspberry Pi 5",
        description:
          "Openings for USB-C power, both micro-HDMI ports, USB, Ethernet and the microSD slot, plus side vents. Four posts sit at the Pi's standard mounting holes.",
      },
      {
        title: "PLA, open-source and repairable",
        description:
          "Printed in non-conductive PLA. Four screws close the lid at the corner lugs, so it opens again easily. The STL files are open source, so you can print a spare yourself.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "Case body for Raspberry Pi 5", detail: "PLA, four mounting posts, Pi 5 port openings and side vents" },
      { qty: "1×", item: "PiEEG-8/16 lid with screw ears", detail: "PLA, two slots over the electrode headers, countersunk screw holes" },
      { qty: "4×", item: "M2.5 countersunk lid screws, 8 mm", detail: "Into the case's corner lugs" },
    ],
    requirements: [
      "Raspberry Pi 5 (not included)",
      "PiEEG-8 or PiEEG-16 shield (not included)",
      "Small Phillips screwdriver",
      "5V USB battery power bank (mandatory for mains isolation during human recording)",
    ],
    recommendedWith: ["pieeg", "pieeg-16", "16ch-cap"],
    fullSpecs: [
      { label: "Compatible Shields", value: "PiEEG-8, PiEEG-16" },
      { label: "Host Board", value: "Raspberry Pi 5 (not Raspberry Pi 4)" },
      { label: "Material", value: "PLA (non-conductive), FDM 3D printed" },
      { label: "Printed Parts", value: "2 — case body and lid" },
      { label: "Case Body", value: "105.8 × 75.2 × 35.5 mm" },
      { label: "Lid", value: "105.8 × 75.2 × 3.6 mm including the four screw ears" },
      { label: "Assembled Size", value: "≈ 106 × 75 × 37 mm" },
      { label: "Lid Fixing", value: "4 × M2.5 countersunk screws, 8 mm, into the corner lugs" },
      { label: "Pi Mounting", value: "4 posts at 58 × 49 mm (standard Raspberry Pi holes)" },
      { label: "Openings", value: "USB-C, 2× micro-HDMI, USB, Ethernet, microSD, side vents, 2 lid slots for electrode leads" },
      { label: "Weight", value: "≈ 35–45 g (depends on infill)" },
      { label: "SKU", value: "PIA40212P" },
    ],
    faqs: [
      {
        q: "Does the same box really fit both PiEEG-8 and PiEEG-16?",
        a: "Yes. Both shields have the same outline and mounting holes and plug onto the same 40-pin header. The lid's slots line up with the electrode headers on both boards, so there is one case and one lid for both.",
      },
      {
        q: "Can I connect electrodes with the lid closed?",
        a: "Yes. The electrode headers sit under the two lid slots, so the electrode leads plug in through the slots. On PiEEG-8 the right slot also gives access to the jumpers.",
      },
      {
        q: "Will it fit a Raspberry Pi 4?",
        a: "The case is designed around the Raspberry Pi 5. The Pi 4 has its USB and Ethernet ports in different places, so the side openings won't line up.",
      },
      {
        q: "Is PLA a good material for this case?",
        a: "PLA is stiff, non-conductive and fine at room and body temperature. It softens at around 55–60 °C, so don't leave the case in a hot car or in direct summer sun.",
      },
      ...COMMON_STORE_FAQS,
    ],
  },
  {
    slug: "ironbci-32-enclosure",
    name: "IronBCI-32 Enclosure",
    shortName: "IronBCI-32 Enclosure",
    eyebrow: "3D-Printed Case · IronBCI-32",
    badge: "New",
    tagline: "3D-printed PLA case for the IronBCI-32 32-channel EEG board.",
    headline: "Buy IronBCI-32 Enclosure",
    summary:
      "A two-part 3D-printed PLA case for the IronBCI-32 board. The board sits on six posts in the bottom tray, the lid closes over it, and four screws from underneath hold everything together. All four electrode headers and both Micro-USB ports stay reachable from the sides.",
    category: "cases",
    channelFilter: "accessory",
    channels: "Fits IronBCI-32",
    platform: "PLA · 4 screws",
    signals: ["EEG"],
    gradient: "from-red-500 to-orange-600",
    accentText: "text-red-500",
    heroImage: "/products/ironbci-32-enclosure/enclosure-closed.png",
    gallery: [
      {
        src: "/products/ironbci-32-enclosure/enclosure-closed.png",
        alt: "IronBCI-32 Enclosure assembled with the board inside",
        caption: "Assembled: bottom tray, lid and IronBCI-32 (3D render)",
      },
      {
        src: "/products/ironbci-32-enclosure/enclosure-exploded.png",
        alt: "IronBCI-32 Enclosure exploded view",
        caption: "Exploded view: tray, board, lid and four screws",
      },
    ],
    ...catalogInfo("ironbci-32-enclosure"),
    hardwarePath: "/hardware/ironbci-32",
    storePath: "/store/ironbci-32-enclosure",
    enclosureLinks: [],
    keySpecs: [
      { label: "Fits", value: "IronBCI-32", sublabel: "70 mm octagon board" },
      { label: "Material", value: "PLA", sublabel: "3D printed, non-conductive" },
      { label: "Size", value: "76 × 76 × 29 mm", sublabel: "Assembled, with lid" },
      { label: "Fixing", value: "4 screws", sublabel: "M2.5 × 16 mm, from underneath" },
    ],
    highlights: [
      {
        title: "Made for the IronBCI-32 octagon",
        description:
          "Six posts sit exactly under the board's six mounting holes, and the board's top ends level with the tray rim. Two small holes in the lid line up with the board's push-buttons.",
      },
      {
        title: "Everything reachable with the lid on",
        description:
          "The lid's legs leave the four header sides and the two USB corners open, so electrodes, the Power cable and the Data Stream cable plug in with the case closed.",
      },
      {
        title: "PLA, open-source and repairable",
        description:
          "Printed in non-conductive PLA. Four screws from underneath clamp the tray, board and lid together and come out again easily.",
      },
    ],
    inTheBox: [
      { qty: "1×", item: "Bottom tray", detail: "PLA, six posts matching the board's mounting holes, recessed screw holes underneath" },
      { qty: "1×", item: "Lid", detail: "PLA, open sides for the four electrode headers and both Micro-USB ports, two button holes" },
      { qty: "4×", item: "M2.5 × 16 mm pan-head screws", detail: "Through the tray posts and board into the lid" },
    ],
    requirements: [
      "IronBCI-32 board (not included)",
      "Small Phillips screwdriver",
      "Two Micro-USB cables: one for power, one full data cable",
      "5V USB battery power bank and a laptop running on battery (mandatory during human recording)",
    ],
    recommendedWith: ["ironbci-32", "32ch-wet-cap", "conductive-gel"],
    fullSpecs: [
      { label: "Compatible Board", value: "IronBCI-32 (70 × 70 mm octagon, 1.6 mm PCB)" },
      { label: "Material", value: "PLA (non-conductive), FDM 3D printed" },
      { label: "Printed Parts", value: "2 — bottom tray and lid" },
      { label: "Bottom Tray", value: "76.4 × 76.4 × 12.2 mm" },
      { label: "Lid", value: "76.4 × 76.4 × 16.6 mm" },
      { label: "Assembled Size", value: "≈ 76 × 76 × 29 mm; electrode header pins stick out about 3 mm on each side" },
      { label: "Board Mounting", value: "6 posts matching the board's 6 mounting holes" },
      { label: "Fixing", value: "4 × M2.5 × 16 mm pan-head screws from underneath; 2 spare holes" },
      { label: "Openings", value: "4 electrode header sides, 2 Micro-USB (Power, Data Stream), 2 button holes in the lid" },
      { label: "Weight", value: "≈ 30–40 g (depends on infill)" },
      { label: "SKU", value: "PIA40214P" },
    ],
    faqs: [
      {
        q: "Do I need to open the case to connect electrodes or USB?",
        a: "No. The four electrode headers stick out through the open sides of the lid, and the Power and Data Stream Micro-USB ports sit in the open corners.",
      },
      {
        q: "Why do the screws go in from underneath?",
        a: "The screw holes open on the bottom of the tray. Each screw passes up through a post and the board's mounting hole into the lid, so one screw holds all three parts together.",
      },
      {
        q: "Does the case make IronBCI-32 safe to use on mains power?",
        a: "No. The case is a mechanical cover only and adds no electrical isolation. Keep following the battery-only rules: board on a 5V USB battery, laptop on its own battery, unplugged from the wall.",
      },
      {
        q: "Is PLA a good material for this case?",
        a: "PLA is stiff, non-conductive and fine at room and body temperature. It softens at around 55–60 °C, so don't leave the case in a hot car or in direct summer sun.",
      },
      ...COMMON_STORE_FAQS,
    ],
  },
];

export const STORE_BUNDLES: StoreBundle[] = [
  {
    id: "rpi-starter-lab",
    title: "Raspberry Pi Complete BCI Starter Bundle",
    eyebrow: "Most Popular Setup",
    description:
      "Everything needed to start recording 8-channel gel-free EEG and muscle EMG on a Raspberry Pi in minutes.",
    idealFor: "Students, Python developers & first-time BCI builders",
    gradient: "from-cyan-500 to-blue-600",
    itemSlugs: ["pieeg", "8ch-dry-cap", "emg-kit"],
  },
  {
    id: "wireless-16ch-suite",
    title: "Wireless 16-Channel Maker & Cloud Suite",
    eyebrow: "Untethered 16-Ch",
    description:
      "Pair the wireless 16-channel Octopus 16 board with the 16-Channel 10-20 Cap and EMG kit for full-head and body recording.",
    idealFor: "Wearable BCI makers, Web Bluetooth & Garmin watch users",
    gradient: "from-violet-500 to-fuchsia-600",
    itemSlugs: ["octopus-16", "16ch-cap", "emg-kit"],
  },
  {
    id: "clinical-32ch-rig",
    title: "32-Channel University Research Workstation",
    eyebrow: "High-Density Lab Rig",
    description:
      "Full 32-channel 24-bit BrainFlow acquisition paired with the matched 32-Channel Wet Ag/AgCl Cap.",
    idealFor: "Neuroscience departments, ERP/SSVEP labs & clinical studies",
    gradient: "from-red-500 to-orange-600",
    itemSlugs: ["ironbci-32", "32ch-wet-cap", "emg-kit"],
  },
];

export function getStoreProduct(slug: string): StoreProduct | undefined {
  return STORE_PRODUCTS.find((p) => p.slug === slug);
}

export function getAllStoreProducts(): StoreProduct[] {
  return STORE_PRODUCTS;
}

export function getStoreProductPriceDisplay(product: StoreProduct): string {
  if (typeof product.price === "number") {
    return formatUsd(product.price);
  }
  return product.priceLabel ?? "Coming soon";
}

function availabilitySchemaIri(availability: StoreProduct["availability"]): string {
  if (availability === "OutOfStock") return "https://schema.org/OutOfStock";
  if (availability === "PreOrder" || availability === "Kickstarter" || availability === "ComingSoon") {
    return "https://schema.org/PreOrder";
  }
  return "https://schema.org/InStock";
}

export function buildStoreHubJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "OnlineStore",
        "@id": `${SITE_ORIGIN}/store#organization`,
        name: "PiEEG Official Store",
        url: `${SITE_ORIGIN}/store`,
        logo: `${SITE_ORIGIN}/logo-without-bg.png`,
        description:
          "Official store for PiEEG open-source brain-computer interface (BCI) hardware, 8 to 32 channel 24-bit EEG shields, wireless neural interfaces, and EEG caps.",
        sameAs: [
          "https://github.com/pieeg-club",
          "https://www.youtube.com/@pieeg",
          "https://www.linkedin.com/company/pieeg/",
          "https://discord.gg/neJ45FR6Sv",
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${SITE_ORIGIN}/store#webpage`,
        url: `${SITE_ORIGIN}/store`,
        name: "PiEEG Store — Buy Open-Source EEG, EMG & BCI Hardware",
        description:
          "Shop official PiEEG brain-computer interface boards, wireless 16-channel EEG headsets, Raspberry Pi shields, and dry/wet EEG caps.",
        isPartOf: { "@id": `${SITE_ORIGIN}/store#organization` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: STORE_PRODUCTS.map((p, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `${SITE_ORIGIN}${p.storePath}`,
            name: p.name,
          })),
        },
      },
    ],
  };
}

export function buildStoreProductJsonLd(product: StoreProduct) {
  const imageUrl = product.heroImage.startsWith("http")
    ? product.heroImage
    : `${SITE_ORIGIN}${product.heroImage}`;

  const galleryImages = product.gallery.map((g) =>
    g.src.startsWith("http") ? g.src : `${SITE_ORIGIN}${g.src}`
  );

  const offerTargetUrl =
    product.elecrowUrl || product.kickstarterUrl || `${SITE_ORIGIN}${product.storePath}`;

  const productNode: Record<string, unknown> = {
    "@type": "Product",
    "@id": `${SITE_ORIGIN}${product.storePath}#product`,
    name: product.name,
    description: product.summary,
    image: galleryImages.length > 0 ? galleryImages : [imageUrl],
    sku: product.sku ?? product.slug.toUpperCase(),
    mpn: product.sku ?? product.slug.toUpperCase(),
    brand: {
      "@type": "Brand",
      name: "PiEEG",
    },
    category: "Brain-Computer Interface Hardware",
    url: `${SITE_ORIGIN}${product.storePath}`,
  };

  if (typeof product.price === "number") {
    productNode.offers = {
      "@type": "Offer",
      url: offerTargetUrl,
      priceCurrency: product.currency || "USD",
      price: Number.isInteger(product.price) ? String(product.price) : product.price.toFixed(2),
      availability: availabilitySchemaIri(product.availability),
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "PiEEG (Fulfilled via Official Partner Elecrow)",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 10,
            unitCode: "DAY",
          },
        },
      },
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      productNode,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_ORIGIN,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Store",
            item: `${SITE_ORIGIN}/store`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: `${SITE_ORIGIN}${product.storePath}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: product.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ],
  };
}
