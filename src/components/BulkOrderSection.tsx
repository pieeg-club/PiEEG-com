"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  GraduationCap,
  Building2,
  Sparkles,
  CheckCircle2,
  Plus,
  Minus,
  Trash2,
  Send,
  ShoppingCart,
  FileText,
  ShieldCheck,
  Globe,
  Code2,
  ArrowRight,
  Loader2,
  Percent,
  PackageCheck,
  Mail,
} from "lucide-react";

export interface BulkCatalogItem {
  id: string;
  name: string;
  category: "board" | "accessory";
  tagline: string;
  price: number;
  image: string;
  elecrowUrl: string;
}

export const BULK_CATALOG: BulkCatalogItem[] = [
  {
    id: "pieeg",
    name: "PiEEG-8",
    category: "board",
    tagline: "8-ch Raspberry Pi 3/4/5 Shield",
    price: 350,
    image: "/products/pieeg.png",
    elecrowUrl: "https://www.elecrow.com/pieeg.html",
  },
  {
    id: "pieeg-16",
    name: "PiEEG-16",
    category: "board",
    tagline: "16-ch Raspberry Pi 5 Shield",
    price: 390,
    image: "/products/pieeg16.jpg",
    elecrowUrl: "https://www.elecrow.com/pieeg-16.html",
  },
  {
    id: "ironbci",
    name: "IronBCI",
    category: "board",
    tagline: "8-ch Wireless BLE 5 Wearable BCI",
    price: 420,
    image: "/products/ironbci-top.jpg",
    elecrowUrl: "https://www.elecrow.com/ironbci.html",
  },
  {
    id: "ironbci-32",
    name: "IronBCI-32",
    category: "board",
    tagline: "32-ch Research System (STM32H7 + BrainFlow)",
    price: 480,
    image: "/products/ironbci-32.png",
    elecrowUrl: "https://www.elecrow.com/ironbci-32.html",
  },
  {
    id: "octopus-16",
    name: "Octopus 16",
    category: "board",
    tagline: "16-ch Wireless ESP32-S3 BCI",
    price: 250,
    image: "/products/octopus16.png",
    elecrowUrl: "https://www.elecrow.com/octopus-16-brain-computer-interface-with-16-eeg-channel.html",
  },
  {
    id: "microbci",
    name: "MicroBCI",
    category: "board",
    tagline: "8-ch STM32 NUCLEO-WB55 Shield",
    price: 325,
    image: "/products/microbci.png",
    elecrowUrl: "https://www.elecrow.com/microbci-eeg-with-stm32.html",
  },
  {
    id: "ardeeg",
    name: "ardEEG",
    category: "board",
    tagline: "8-ch Arduino UNO R4 WiFi Shield",
    price: 350,
    image: "/products/ardeeg.png",
    elecrowUrl: "https://www.elecrow.com/ardeeg.html",
  },
  {
    id: "jneeg",
    name: "JNEEG",
    category: "board",
    tagline: "8-ch Jetson Nano ML/DL Shield",
    price: 350,
    image: "/products/jneeg.png",
    elecrowUrl: "https://www.elecrow.com/jneeg.html",
  },
  {
    id: "8ch-dry-cap",
    name: "8ch Dry EEG Cap Kit",
    category: "accessory",
    tagline: "No-gel press-fit dry electrode cap",
    price: 370,
    image: "/products/cap8-dry.png",
    elecrowUrl: "https://www.elecrow.com/cap-eeg-kit.html",
  },
  {
    id: "8ch-wet-cap",
    name: "8ch Wet EEG Cap Kit",
    category: "accessory",
    tagline: "Sintered Ag/AgCl wet electrode cap + gel",
    price: 350,
    image: "/products/cap8-wet.jpg",
    elecrowUrl: "https://www.elecrow.com/cap-eeg-kit-8-channels-with-8-wet-electrodes.html",
  },
  {
    id: "16ch-cap",
    name: "16ch EEG Cap Kit",
    category: "accessory",
    tagline: "16-ch gold-plated Ag/AgCl textile cap",
    price: 460,
    image: "/products/cap16.png",
    elecrowUrl: "https://www.elecrow.com/cap-eeg-kit-16-channels.html",
  },
  {
    id: "32ch-wet-cap",
    name: "32ch Wet EEG Cap Kit",
    category: "accessory",
    tagline: "32-ch Ag/AgCl cap for IronBCI-32",
    price: 580,
    image: "/products/cap32-wet.webp",
    elecrowUrl: "https://www.elecrow.com/cap-eeg-kit-32-channels-with-32-wet-electrodes-and-2-clips-electrode.html",
  },
  {
    id: "emg-kit",
    name: "EMG / ECG / EKG Kit",
    category: "accessory",
    tagline: "Multi-signal electrode & cable kit",
    price: 85,
    image: "/products/emg-kit.jpg",
    elecrowUrl: "https://www.elecrow.com/kit-to-measure-emg-ecg-ekg.html",
  },
];


const DISCOUNT_TIERS = [
  {
    minUnits: 5,
    maxUnits: 9,
    percent: 15,
    badge: "5–9 Boards",
    title: "Starter Lab & Capstone",
    description: "Ideal for PhD research groups, senior capstones, and pilot BCI experiments.",
    perks: [
      "15% off all BCI hardware boards",
      "Free PiEEG Cloud, Server & open-source SDKs",
      "35+ interactive BCI experiments & demos",
      "Official university quotes & PO support",
    ],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    minUnits: 10,
    maxUnits: 24,
    percent: 20,
    badge: "10–24 Boards · Most Popular",
    title: "University Course & Lab",
    description: "Designed for undergraduate/graduate neuroscience labs and neurotech clubs.",
    perks: [
      "20% off all BCI hardware boards",
      "Free PiEEG Cloud, Server & open-source SDKs",
      "Ready-to-use EEG labs, demos & teaching tools",
      "Priority technical support for your lab",
      "University quotes & purchase order support",
    ],
    gradient: "from-blue-500 via-indigo-500 to-violet-600",
    featured: true,
  },
  {
    minUnits: 25,
    maxUnits: null,
    percent: 30,
    badge: "25+ Boards",
    title: "Institutional & Hackathon Fleet",
    description: "Maximum savings for department-wide deployments, hackathons, and multi-site studies.",
    perks: [
      "30% off all BCI hardware boards",
      "Full access to the free PiEEG ecosystem",
      "1-on-1 live onboarding with the PiEEG team",
      "Priority assistance for large-scale deployments",
      "Direct conversation with the founders for 50+ boards",
      "Custom collaboration opportunities for institutions",
    ],
    gradient: "from-violet-500 to-fuchsia-600",
  },
];


const BUNDLE_PRESETS = [
  {
    id: "teaching-8ch",
    label: "Teaching Lab (10× PiEEG-8 + 5× Dry Caps)",
    items: { pieeg: 10, "8ch-dry-cap": 5 } as Record<string, number>,
  },
  {
    id: "starter-5",
    label: "5× PiEEG-8 Lab Starter",
    items: { pieeg: 5 } as Record<string, number>,
  },
  {
    id: "wireless-cohort",
    label: "Wireless Lab (5× IronBCI + 5× Dry Caps)",
    items: { ironbci: 5, "8ch-dry-cap": 5 } as Record<string, number>,
  },
  {
    id: "research-32ch",
    label: "32-Ch Research Fleet (5× IronBCI-32 + 5× 32ch Caps)",
    items: { "ironbci-32": 5, "32ch-wet-cap": 5 } as Record<string, number>,
  },
  {
    id: "hackathon-octopus",
    label: "Hackathon Pack (15× Octopus-16 + 10× EMG Kits)",
    items: { "octopus-16": 15, "emg-kit": 10 } as Record<string, number>,
  },
];

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "https://pieeg-cloud.fly.dev";

export function getDiscountPercent(totalUnits: number): number {
  if (totalUnits >= 25) return 30;
  if (totalUnits >= 10) return 20;
  if (totalUnits >= 5) return 15;
  return 0;
}

export default function BulkOrderSection() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    pieeg: 5,
    "8ch-dry-cap": 5,
  });
  const [activeTab, setActiveTab] = useState<"board" | "accessory">("board");

  // Form fields
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [organizationType, setOrganizationType] = useState<
    "university" | "research_lab" | "company" | "school" | "nonprofit" | "other"
  >("university");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentPreference, setPaymentPreference] = useState<
    "invoice_po" | "wire_transfer" | "credit_card" | "grant_quote" | "flexible"
  >("invoice_po");
  const [timeline, setTimeline] = useState("Upcoming Semester / Course");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedOrder, setSubmittedOrder] = useState<{
    id: string;
    totalUnits: number;
    discountPercent: number;
    estimatedSubtotal: number;
    estimatedTotal: number;
    organization: string;
    email: string;
  } | null>(null);

  // Listen for custom product selection from product cards or URL query params
  useEffect(() => {
    const handleSelectProduct = (e: Event) => {
      const customEvent = e as CustomEvent<{ productId: string; quantity?: number }>;
      const productId = customEvent.detail?.productId;
      const qty = customEvent.detail?.quantity ?? 5;
      if (productId && BULK_CATALOG.some((p) => p.id === productId)) {
        setQuantities((prev) => ({
          ...prev,
          [productId]: Math.max(prev[productId] || 0, qty),
        }));
      }
    };

    window.addEventListener("pieeg:select-bulk-product", handleSelectProduct);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const productParam = params.get("product");
      if (productParam && BULK_CATALOG.some((p) => p.id === productParam)) {
        setQuantities({ [productParam]: 5 });
      }
    }

    return () => {
      window.removeEventListener("pieeg:select-bulk-product", handleSelectProduct);
    };
  }, []);

  const selectedItems = useMemo(() => {
    return BULK_CATALOG.filter((item) => (quantities[item.id] || 0) > 0).map((item) => ({
      ...item,
      quantity: quantities[item.id] || 0,
    }));
  }, [quantities]);

  const totalUnits = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.quantity, 0),
    [selectedItems]
  );

  const boardUnits = useMemo(
    () =>
      selectedItems
        .filter((item) => item.category === "board")
        .reduce((sum, item) => sum + item.quantity, 0),
    [selectedItems]
  );

  const discountPercent = useMemo(() => getDiscountPercent(boardUnits), [boardUnits]);

  const subtotal = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [selectedItems]
  );

  const boardsSubtotal = useMemo(
    () =>
      selectedItems
        .filter((item) => item.category === "board")
        .reduce((sum, item) => sum + item.price * item.quantity, 0),
    [selectedItems]
  );

  const discountAmount = useMemo(
    () => Number(((boardsSubtotal * discountPercent) / 100).toFixed(2)),
    [boardsSubtotal, discountPercent]
  );

  const estimatedTotal = useMemo(
    () => Number((subtotal - discountAmount).toFixed(2)),
    [subtotal, discountAmount]
  );

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const nextQty = Math.max(0, (prev[id] || 0) + delta);
      const updated = { ...prev };
      if (nextQty === 0) {
        delete updated[id];
      } else {
        updated[id] = nextQty;
      }
      return updated;
    });
  };

  const setExactQuantity = (id: string, value: number) => {
    const clean = Math.max(0, Math.min(999, Math.floor(value || 0)));
    setQuantities((prev) => {
      const updated = { ...prev };
      if (clean === 0) {
        delete updated[id];
      } else {
        updated[id] = clean;
      }
      return updated;
    });
  };

  const applyPreset = (presetItems: Record<string, number>) => {
    setQuantities({ ...presetItems });
    setSubmittedOrder(null);
  };

  const bumpToFiveUnits = () => {
    if (boardUnits >= 5) return;
    const selectedBoards = selectedItems.filter((item) => item.category === "board");
    if (selectedBoards.length === 0) {
      setQuantities((prev) => ({ ...prev, pieeg: 5 }));
      return;
    }
    const firstBoardId = selectedBoards[0].id;
    const needed = 5 - boardUnits;
    updateQuantity(firstBoardId, needed);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (selectedItems.length === 0) {
      setError("Please select at least one hardware board or accessory.");
      return;
    }

    setSubmitting(true);

    const payload = {
      contactName: contactName.trim(),
      email: email.trim(),
      organization: organization.trim(),
      organizationType,
      role: role.trim() || undefined,
      country: country.trim(),
      phone: phone.trim() || undefined,
      items: selectedItems.map((item) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
      })),
      paymentPreference,
      timeline: timeline.trim() || undefined,
      notes: notes.trim() || undefined,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/v1/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.message || "Could not submit your quote request. Please try again."
        );
      }

      setSubmittedOrder({
        id: data?.order?.id || data?.order?._id || "PIEEG-QUOTE",
        totalUnits,
        discountPercent,
        estimatedSubtotal: subtotal,
        estimatedTotal,
        organization: organization.trim(),
        email: email.trim(),
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Network error while submitting order. Please try again or email youssef@pieeg.com."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const nextTierHint = useMemo(() => {
    if (boardUnits < 5) {
      return `Add ${5 - boardUnits} more BCI board${5 - boardUnits === 1 ? "" : "s"} to unlock the 15% Institutional Discount on boards!`;
    }
    if (boardUnits < 10) {
      return `Add ${10 - boardUnits} more BCI board${10 - boardUnits === 1 ? "" : "s"} to jump from 15% → 20% OFF on boards!`;
    }
    if (boardUnits < 25) {
      return `Add ${25 - boardUnits} more BCI board${25 - boardUnits === 1 ? "" : "s"} to unlock maximum 30% OFF Fleet Pricing on boards!`;
    }
    return "Maximum 30% Institutional Fleet Discount unlocked on all BCI boards!";
  }, [boardUnits]);

  return (
    <section
      id="bulk-orders"
      className="py-14 sm:py-20 border-t border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-cyan-50/40 via-white to-violet-50/30 dark:from-zinc-950 dark:via-zinc-900/50 dark:to-zinc-950 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap className="w-4 h-4" />
            Universities · Research Labs · Bulk Orders (5+ Units)
          </div>

          <h2 className="title-section mb-4">
            Equip your classroom or lab.{" "}
            <span className="bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              Save up to 30%.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            As an open-source hardware &amp; software company, our mission is to make
            research-grade neuroscience accessible to every student and scientist worldwide.
            Order <strong>1–4 units</strong> anytime on Elecrow, or request a{" "}
            <strong>5+ unit institutional quote</strong> below with volume discounts and
            university Purchase Order (PO) invoicing.
          </p>
        </div>

        {/* Dual Ordering Comparison Banner */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-sm flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-zinc-700 dark:text-zinc-200">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-base">Need 1–4 Units Right Now?</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  Instant Checkout
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-2.5">
                Order individual units directly through our official fulfillment partner{" "}
                <strong>Elecrow</strong> for immediate global dispatch.
              </p>
              <a
                href="#hardware"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                Click &ldquo;Buy&rdquo; on any product above
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl border-2 border-cyan-500/40 dark:border-cyan-500/40 bg-linear-to-br from-cyan-500/5 via-blue-500/5 to-violet-500/10 backdrop-blur-sm flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 text-white shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-base">Ordering 5+ Units for a Lab or Institution?</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500 text-white">
                  15% – 30% OFF
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mb-2.5">
                Mix and match any boards &amp; EEG caps. Get formal university PO / Net-30
                invoicing, tax-exempt billing, and direct engineering support.
              </p>
              <a
                href="#bulk-quote-builder"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                Build your instant institutional quote below
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 3 Discount Tier Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {DISCOUNT_TIERS.map((tier) => {
            const isUnlocked =
              boardUnits >= tier.minUnits &&
              (tier.maxUnits === null || boardUnits <= tier.maxUnits);
            return (
              <div
                key={tier.badge}
                className={`relative rounded-2xl p-6 transition-all duration-200 flex flex-col ${
                  tier.featured
                    ? "border-2 border-blue-500/60 dark:border-blue-400/60 bg-white dark:bg-zinc-900 shadow-xl shadow-blue-500/5"
                    : "border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70"
                } ${isUnlocked ? "ring-2 ring-cyan-500 dark:ring-cyan-400" : ""}`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-linear-to-r ${tier.gradient}`}
                  >
                    {tier.badge}
                  </span>
                  {isUnlocked && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      Active Tier
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
                    {tier.percent}% OFF
                  </span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    on BCI boards
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                  {tier.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
                  {tier.description}
                </p>

                <ul className="space-y-2 mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  {tier.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Institutional Trust Pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            {
              icon: FileText,
              title: "University PO & Net-30",
              desc: "Official pro-forma quotes, vendor onboarding, W-9, and wire/ACH/card billing.",
            },
            {
              icon: Code2,
              title: "100% Open-Source Stack",
              desc: "MIT-licensed Python, C++, JS & BrainFlow SDKs. Zero recurring license fees.",
            },
            {
              icon: ShieldCheck,
              title: "Peer-Reviewed & Cited",
              desc: "Validated in 11+ academic publications and trusted by global neurotech labs.",
            },
            {
              icon: Globe,
              title: "Global Express Shipping",
              desc: "Direct DHL/FedEx priority fulfillment to universities in 60+ countries.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/50 flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                <Icon className="w-4 h-4 text-cyan-500 shrink-0" />
                {title}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Configurator + Order Form */}
        <div
          id="bulk-quote-builder"
          className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl overflow-hidden scroll-mt-24"
        >
          {/* Top Preset Bar */}
          <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Quick Lab Bundles:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {BUNDLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset.items)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-cyan-500 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12">
            {/* Left 7 Cols: Hardware & Accessory Selector */}
            <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight">
                    1. Select Hardware &amp; Quantities
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Volume discounts (15–30%) apply to BCI boards (5+ boards). EEG caps &amp; kits can be bundled on the same PO at standard list price.
                  </p>
                </div>

                {/* Category toggle */}
                <div className="inline-flex p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setActiveTab("board")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === "board"
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    BCI Boards (8)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("accessory")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === "accessory"
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    EEG Caps &amp; Kits (5)
                  </button>
                </div>
              </div>

              {/* Catalog list for active tab */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {BULK_CATALOG.filter((item) => item.category === activeTab).map((item) => {
                  const qty = quantities[item.id] || 0;
                  const isBoard = item.category === "board";
                  const discountedUnit = isBoard
                    ? Number((item.price * (1 - discountPercent / 100)).toFixed(0))
                    : item.price;
                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        qty > 0
                          ? "border-cyan-500 bg-cyan-50/30 dark:bg-cyan-950/20 shadow-xs"
                          : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1.5 flex items-center justify-center shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                            {item.tagline}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {isBoard && discountPercent > 0 ? (
                              <>
                                <span className="text-xs font-extrabold text-cyan-600 dark:text-cyan-400">
                                  ${discountedUnit}
                                </span>
                                <span className="text-[11px] line-through text-zinc-400">
                                  ${item.price}
                                </span>
                              </>
                            ) : (
                              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                ${item.price}
                              </span>
                            )}
                            <span className="text-[10px] text-zinc-400">
                              {isBoard ? "/ unit" : "/ unit (net price)"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={qty === 0}
                          aria-label={`Decrease ${item.name} quantity`}
                          className="w-7 h-7 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-40"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          type="number"
                          min={0}
                          max={999}
                          value={qty}
                          onChange={(e) =>
                            setExactQuantity(item.id, parseInt(e.target.value, 10))
                          }
                          aria-label={`${item.name} quantity`}
                          className="w-11 h-7 text-center text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500"
                        />
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, qty === 0 ? 5 : 1)}
                          aria-label={`Increase ${item.name} quantity`}
                          title={qty === 0 ? "Add 5 units" : "Add 1 unit"}
                          className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center hover:opacity-90"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Summary Box */}
              <div className="mt-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 p-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <PackageCheck className="w-4 h-4 text-cyan-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Your Quote Summary ({totalUnits} {totalUnits === 1 ? "Unit" : "Units"})
                    </span>
                  </div>
                  {discountPercent > 0 ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      <Percent className="w-3 h-3" />
                      {discountPercent}% Bulk Discount Applied
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={bumpToFiveUnits}
                      className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      + Bump to 5 units for 15% off
                    </button>
                  )}
                </div>

                {selectedItems.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-3">
                    No hardware selected yet. Click <strong>+</strong> on any board or cap above
                    to add 5 units.
                  </p>
                ) : (
                  <div className="space-y-2 mb-4 max-h-44 overflow-y-auto pr-1">
                    {selectedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-xs bg-white dark:bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-200/70 dark:border-zinc-800"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-zinc-900 dark:text-white">
                            {item.quantity}×
                          </span>
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                            ${(item.price * item.quantity).toLocaleString("en-US")}
                          </span>
                          <button
                            type="button"
                            onClick={() => setExactQuantity(item.id, 0)}
                            aria-label={`Remove ${item.name}`}
                            className="text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Totals calculation */}
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                    <span>Regular Retail Subtotal (Elecrow):</span>
                    <span>${subtotal.toLocaleString("en-US")} USD</span>
                  </div>
                  <div className="flex justify-between font-semibold text-emerald-600 dark:text-emerald-400">
                    <span>BCI Boards Volume Discount ({discountPercent}%):</span>
                    <span>-${discountAmount.toLocaleString("en-US")} USD</span>
                  </div>
                  <div className="flex justify-between items-baseline text-base font-black text-zinc-900 dark:text-white pt-1.5 border-t border-zinc-200/60 dark:border-zinc-800">
                    <span>Estimated Institutional Total:</span>
                    <span className="text-lg text-cyan-600 dark:text-cyan-400">
                      ${estimatedTotal.toLocaleString("en-US")} USD
                    </span>
                  </div>
                </div>

                <div className="mt-3 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-medium text-cyan-800 dark:text-cyan-300 flex items-center justify-between gap-2">
                  <span>{nextTierHint}</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Institutional Quote Request Form */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-zinc-50/40 dark:bg-zinc-900/20 flex flex-col justify-between">
              {submittedOrder ? (
                <div className="my-auto py-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">
                    Ref #{submittedOrder.id.slice(0, 8).toUpperCase()}
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    Quote Request Received!
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Thank you! We&apos;ve logged your request for{" "}
                    <strong>{submittedOrder.organization}</strong> ({submittedOrder.totalUnits}{" "}
                    units · {submittedOrder.discountPercent}% discount ·{" "}
                    <strong>${submittedOrder.estimatedTotal.toLocaleString("en-US")} USD</strong>) and
                    notified{" "}
                    <a
                      href="mailto:youssef@pieeg.com"
                      className="text-cyan-600 dark:text-cyan-400 font-semibold underline"
                    >
                      youssef@pieeg.com
                    </a>
                    .
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                    We&apos;ll reply directly to <strong>{submittedOrder.email}</strong> within
                    24 hours with your official pro-forma invoice / PO quote.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`mailto:youssef@pieeg.com?subject=${encodeURIComponent(
                        `PiEEG Bulk Order Quote (#${submittedOrder.id.slice(0, 8).toUpperCase()}) - ${submittedOrder.organization}`
                      )}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:opacity-90 transition-opacity"
                    >
                      <Mail className="w-4 h-4" />
                      Email youssef@pieeg.com Directly
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedOrder(null)}
                      className="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      Modify Quote
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight">
                      2. Request Official Quote / PO Invoice
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Sent directly to our institutional team (
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                        youssef@pieeg.com
                      </span>
                      ) — we reply within 24 hours.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Jane Smith"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Institutional / Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jsmith@university.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        University / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MIT / ETH Zurich / Lab Name"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Organization Type
                      </label>
                      <select
                        value={organizationType}
                        onChange={(e) =>
                          setOrganizationType(
                            e.target.value as typeof organizationType
                          )
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:border-cyan-500"
                      >
                        <option value="university">University / Teaching Lab</option>
                        <option value="research_lab">Research Institute / Hospital</option>
                        <option value="company">Company / R&amp;D Team</option>
                        <option value="school">High School / STEM Program</option>
                        <option value="nonprofit">Hackathon / Student Club</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Country *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="United States, Germany, Japan..."
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Role / Title
                      </label>
                      <input
                        type="text"
                        placeholder="Professor, PI, Lab Manager, Procurement..."
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Billing / Payment Preference
                      </label>
                      <select
                        value={paymentPreference}
                        onChange={(e) =>
                          setPaymentPreference(
                            e.target.value as typeof paymentPreference
                          )
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:border-cyan-500"
                      >
                        <option value="invoice_po">University PO / Pro-Forma Invoice</option>
                        <option value="wire_transfer">Bank Wire Transfer (ACH / SWIFT)</option>
                        <option value="credit_card">Credit Card / Online Payment Link</option>
                        <option value="grant_quote">Formal Quote for Grant Application</option>
                        <option value="flexible">Flexible / Discuss with Team</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Notes, Shipping Address, or Custom Requirements (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your course/research project, preferred delivery date, tax/VAT exemption details, or any custom electrode/cap questions..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-400 font-medium">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || selectedItems.length === 0}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-linear-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-bold text-sm shadow-lg hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending Quote Request...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Request Official Quote ({totalUnits}{" "}
                        {totalUnits === 1 ? "Unit" : "Units"} · ${estimatedTotal.toLocaleString("en-US")}{" "}
                        USD)
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-zinc-400 dark:text-zinc-500">
                    No payment required today. We&apos;ll email your formal quote &amp; PO
                    instructions from <strong>youssef@pieeg.com</strong>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
