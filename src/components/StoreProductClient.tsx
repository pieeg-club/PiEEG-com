"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ShoppingCart,
  ExternalLink,
  Lock,
  CheckCircle2,
  Package,
  AlertCircle,
  Truck,
  ShieldCheck,
  GraduationCap,
  Code2,
  Play,
  Share2,
  Check,
  BookOpen,
  Rocket,
  Sparkles,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import {
  getStoreProduct,
  getStoreProductPriceDisplay,
  SITE_ORIGIN,
  type StoreProduct,
} from "@/lib/store-catalog";
import StoreDirectWaitlist from "@/components/StoreDirectWaitlist";
import { EnclosureLinks } from "@/components/EnclosureLink";

interface StoreProductClientProps {
  product: StoreProduct;
}

export default function StoreProductClient({ product }: StoreProductClientProps) {
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const isAvailable = product.availability === "InStock";
  const isKickstarter = product.availability === "Kickstarter";
  const priceDisplay = getStoreProductPriceDisplay(product);

  const companionProducts = product.recommendedWith
    .map((slug) => getStoreProduct(slug))
    .filter((p): p is StoreProduct => Boolean(p));

  const currentGalleryItem =
    product.gallery[activeMediaIndex] ?? product.gallery[0] ?? {
      src: product.heroImage,
      alt: product.name,
      caption: product.name,
    };

  const shareUrl = `${SITE_ORIGIN}${product.storePath}`;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} — PiEEG Store`,
          text: product.tagline,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard copy
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="pb-20 lg:pb-0">
      {/* ── Sticky Apple-Style Product Sub-Navigation Bar ── */}
      <div className="sticky top-16 z-30 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-13 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href="/store"
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors shrink-0"
            >
              Store
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="text-sm font-black tracking-tight text-zinc-900 dark:text-white truncate">
              {product.name}
            </span>
            {product.sku && (
              <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                SKU: {product.sku}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              <a href="#in-the-box" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                In the Box
              </a>
              <a href="#companions" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                Accessories
              </a>
              <a href="#specs" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                Tech Specs
              </a>
              <Link
                href={product.hardwarePath}
                className="text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                Interactive Guide →
              </Link>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-sm font-black text-zinc-900 dark:text-white hidden xs:inline">
                {priceDisplay}
              </span>
              {isAvailable && product.elecrowUrl ? (
                <a
                  href={product.elecrowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-linear-to-r ${product.gradient} text-white text-xs font-bold shadow-sm hover:opacity-90 transition-opacity`}
                >
                  Buy on Elecrow
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : isKickstarter && product.kickstarterUrl ? (
                <a
                  href={product.kickstarterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-linear-to-r ${product.gradient} text-white text-xs font-bold shadow-sm hover:opacity-90 transition-opacity`}
                >
                  Kickstarter
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Apple-Style 2-Column Buy Stage ── */}
      <section className="py-10 sm:py-14 lg:py-16 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* LEFT COLUMN: Sticky Interactive Media Gallery (7 cols) */}
            <div className="lg:col-span-7 lg:sticky lg:top-32 space-y-4">
              {/* Primary Viewer Stage */}
              <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70 overflow-hidden aspect-4/3 flex flex-col justify-between">
                {/* Ambient glow */}
                <div
                  className={`absolute inset-12 bg-linear-to-br ${product.gradient} opacity-15 blur-3xl rounded-full pointer-events-none`}
                />

                {showVideo && product.videoId ? (
                  <div className="relative w-full h-full flex-1 bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${product.videoId}?autoplay=1`}
                      title={`${product.name} video demonstration`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                ) : (
                  <div className="relative flex-1 flex items-center justify-center p-8 sm:p-12">
                    <Image
                      src={currentGalleryItem.src}
                      alt={currentGalleryItem.alt}
                      width={640}
                      height={480}
                      priority
                      className="object-contain max-h-80 sm:max-h-96 w-auto relative z-10 drop-shadow-2xl transition-all duration-300"
                    />
                  </div>
                )}

                {/* Caption footer bar */}
                <div className="relative z-10 px-5 py-3 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md flex items-center justify-between gap-4">
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 truncate">
                    {showVideo ? `${product.name} — Live Hardware Demo` : currentGalleryItem.caption}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                    {showVideo
                      ? "VIDEO"
                      : `${activeMediaIndex + 1} / ${product.gallery.length}`}
                  </span>
                </div>
              </div>

              {/* Thumbnail Selector Strip */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.gallery.map((item, idx) => {
                  const selected = !showVideo && activeMediaIndex === idx;
                  return (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => {
                        setShowVideo(false);
                        setActiveMediaIndex(idx);
                      }}
                      className={`relative w-20 h-20 rounded-2xl border overflow-hidden p-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                        selected
                          ? "border-cyan-500 ring-2 ring-cyan-500/30 bg-white dark:bg-zinc-900"
                          : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`View photo ${idx + 1}: ${item.alt}`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={72}
                        height={72}
                        className="object-contain max-h-14 w-auto"
                      />
                    </button>
                  );
                })}

                {product.videoId && (
                  <button
                    type="button"
                    onClick={() => setShowVideo(true)}
                    className={`relative w-24 h-20 rounded-2xl border overflow-hidden p-2 flex flex-col items-center justify-center gap-1 shrink-0 transition-all cursor-pointer ${
                      showVideo
                        ? "border-cyan-500 ring-2 ring-cyan-500/30 bg-zinc-900 text-white"
                        : "border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
                    }`}
                  >
                    <Play className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Demo Video
                    </span>
                  </button>
                )}
              </div>

              {/* Trust Strip under gallery */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  {
                    icon: <Truck className="w-4 h-4 text-cyan-500" />,
                    title: "Global Shipping",
                    sub: "DHL / FedEx / Air",
                  },
                  {
                    icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />,
                    title: "Factory Tested",
                    sub: "Official Elecrow Line",
                  },
                  {
                    icon: <Code2 className="w-4 h-4 text-violet-500" />,
                    title: "MIT Open SDK",
                    sub: "Python, C, Cloud",
                  },
                  {
                    icon: <GraduationCap className="w-4 h-4 text-amber-500" />,
                    title: "Lab Discounts",
                    sub: "10–20% on 5+ units",
                  },
                ].map((badge) => (
                  <div
                    key={badge.title}
                    className="p-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center gap-2.5"
                  >
                    <div className="shrink-0">{badge.icon}</div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {badge.title}
                      </p>
                      <p className="text-[11px] text-zinc-500 truncate">{badge.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Commercial Decision & Dual Buy Panel (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Eyebrow & Availability */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-600 dark:text-cyan-400">
                    {product.eyebrow}
                  </span>
                  {product.badge && (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-linear-to-r ${product.gradient}`}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white mb-3">
                  {product.headline}
                </h1>

                <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {product.summary}
                </p>
              </div>

              {/* Price & Stock Box */}
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">
                    Official Store Price
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
                      {priceDisplay}
                    </span>
                    {typeof product.price === "number" && (
                      <span className="text-sm font-bold text-zinc-400">USD</span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  {isAvailable ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      In Stock · Ready to Ship
                    </span>
                  ) : isKickstarter ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20">
                      <Rocket className="w-3.5 h-3.5" />
                      Kickstarter Campaign
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                      Coming Soon
                    </span>
                  )}
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Fulfilled worldwide via Elecrow
                  </p>
                </div>
              </div>

              {/* 4-Card Key Spec Bento */}
              <div className="grid grid-cols-2 gap-2.5">
                {product.keySpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      {spec.label}
                    </div>
                    <div className="text-base font-black text-zinc-900 dark:text-white mt-0.5">
                      {spec.value}
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {spec.sublabel}
                    </div>
                  </div>
                ))}
              </div>

              {/* ── DUAL PURCHASE ACTION BOX (Elecrow + Disabled Direct Store + Sendy Waitlist) ── */}
              <div className="rounded-3xl border-2 border-zinc-900/10 dark:border-white/10 bg-white dark:bg-zinc-900/50 p-5 sm:p-6 space-y-4 shadow-lg shadow-zinc-900/5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Choose Purchase Channel
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Official Hardware Guarantee
                  </span>
                </div>

                {/* BUTTON 1: Buy on Elecrow (Active) */}
                {isAvailable && product.elecrowUrl ? (
                  <a
                    href={product.elecrowUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-linear-to-r ${product.gradient} text-white font-bold text-base shadow-xl hover:opacity-95 hover:scale-[1.01] transition-all duration-200`}
                  >
                    <span className="flex items-center gap-3">
                      <ShoppingCart className="w-5 h-5 shrink-0" />
                      <span className="text-left">
                        <span className="block leading-tight">Buy on Elecrow</span>
                        <span className="block text-[11px] font-medium text-white/80">
                          Official Manufacturing Partner · Ships Worldwide
                        </span>
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5 text-sm font-black bg-black/20 px-3 py-1.5 rounded-xl">
                      {priceDisplay}
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  </a>
                ) : isKickstarter && product.kickstarterUrl ? (
                  <a
                    href={product.kickstarterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-linear-to-r ${product.gradient} text-white font-bold text-base shadow-xl hover:opacity-95 hover:scale-[1.01] transition-all duration-200`}
                  >
                    <span className="flex items-center gap-3">
                      <Rocket className="w-5 h-5 shrink-0" />
                      <span className="text-left">
                        <span className="block leading-tight">Back on Kickstarter</span>
                        <span className="block text-[11px] font-medium text-white/80">
                          Official Launch Campaign
                        </span>
                      </span>
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-zinc-200 dark:bg-zinc-800 text-zinc-500 font-bold text-base cursor-not-allowed"
                  >
                    Coming Soon to Elecrow
                  </button>
                )}

                {/* BUTTON 2: Buy Direct on pieeg.com (Disabled as requested) */}
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-100/70 dark:bg-zinc-900/90 text-zinc-400 dark:text-zinc-500 cursor-not-allowed select-none"
                >
                  <span className="flex items-center gap-3 text-left">
                    <Lock className="w-4 h-4 text-cyan-500/70 shrink-0" />
                    <span>
                      <span className="block text-sm font-bold text-zinc-500 dark:text-zinc-400">
                        Buy Direct on pieeg.com
                      </span>
                      <span className="block text-[11px] text-zinc-400 dark:text-zinc-500">
                        Direct checkout without leaving our website
                      </span>
                    </span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 shrink-0">
                    Coming Soon
                  </span>
                </button>

                {/* Inline Sendy Waitlist for Direct Store (List ID: jsw5exWDIC1KbuAgvAoliQ) */}
                <StoreDirectWaitlist productName={product.name} compact />
              </div>

              {/* Secondary links: Interactive Hardware Guide + Share + Bulk Quote */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Link
                    href={product.hardwarePath}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-cyan-500" />
                    Interactive Setup Guide & Pinout
                  </Link>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                    aria-label="Share store page link"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        Copied Link!
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        Share
                      </>
                    )}
                  </button>
                </div>

                {product.enclosureLinks.length > 0 && (
                  <div className="px-4 py-2.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-500">
                      Open-Source 3D Printable Case:
                    </span>
                    <EnclosureLinks links={product.enclosureLinks} />
                  </div>
                )}

                {/* Bulk / University PO Callout */}
                <div className="p-4 rounded-2xl border border-cyan-500/25 bg-cyan-500/5 flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                    <span className="font-bold text-zinc-900 dark:text-white">
                      Ordering 5+ units for a university, classroom, or lab?
                    </span>{" "}
                    Save 10–20% with an official institutional quote &amp; Purchase Order.{" "}
                    <Link
                      href={`/store#bulk-orders`}
                      className="font-bold text-cyan-600 dark:text-cyan-400 underline underline-offset-2"
                    >
                      Build Instant Quote →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Complete Your Setup (Essential Companions Cross-Sell) ── */}
      {companionProducts.length > 0 && (
        <section
          id="companions"
          className="py-14 bg-zinc-50/80 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Essential Companions
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                  Complete your {product.name} setup.
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Recommended caps, electrodes, and kits verified for {product.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {companionProducts.map((comp) => (
                <div
                  key={comp.slug}
                  className="flex flex-col justify-between rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                        {comp.channels}
                      </span>
                      <span className="text-sm font-black text-zinc-900 dark:text-white">
                        {getStoreProductPriceDisplay(comp)}
                      </span>
                    </div>

                    <Link
                      href={comp.storePath}
                      className="relative rounded-2xl bg-zinc-50 dark:bg-zinc-900 h-40 flex items-center justify-center p-4 mb-4 overflow-hidden"
                    >
                      <Image
                        src={comp.heroImage}
                        alt={comp.name}
                        width={220}
                        height={150}
                        className="object-contain max-h-32 w-auto"
                      />
                    </Link>

                    <Link href={comp.storePath}>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white hover:text-cyan-500 transition-colors">
                        {comp.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                      {comp.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                    <Link
                      href={comp.storePath}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:opacity-90 transition-opacity"
                    >
                      View in Store
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    {comp.availability === "InStock" && comp.elecrowUrl && (
                      <a
                        href={comp.elecrowUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                      >
                        Elecrow
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── What's in the Box & What You Need to Provide ── */}
      <section
        id="in-the-box"
        className="py-14 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* What's in the Box (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
                    What’s in the Box
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Included with your {product.name} order
                  </p>
                </div>
              </div>

              <ul className="divide-y divide-zinc-200/70 dark:divide-zinc-800">
                {product.inTheBox.map((boxItem, i) => (
                  <li key={i} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-black shrink-0">
                      {boxItem.qty}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {boxItem.item}
                      </p>
                      {boxItem.detail && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                          {boxItem.detail}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* What You'll Need to Provide (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
                      Required for Operation
                    </h2>
                    <p className="text-xs text-zinc-500">
                      Check before you order so your lab is ready on day one
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {product.requirements.map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Safety Note: {product.name} is an open-source research and education device, not a medical device. Always power the host board from an isolated 5V battery bank—never while plugged into AC wall mains.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Apple-Style Highlights & Technical Specifications ── */}
      <section
        id="specs"
        className="py-14 bg-zinc-50/50 dark:bg-zinc-900/20 border-b border-zinc-200 dark:border-zinc-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Why It Stands Out */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">
              Why {product.name}.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.highlights.map((hl) => (
                <div
                  key={hl.title}
                  className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                >
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                    {hl.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {hl.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Full Technical Specs Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white mb-2">
                Technical Specifications
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                Want interactive pinout diagrams, live signal simulations, and step-by-step wiring code?
              </p>
              <Link
                href={product.hardwarePath}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs sm:text-sm font-bold hover:opacity-90 transition-opacity"
              >
                <BookOpen className="w-4 h-4" />
                Open {product.name} Engineering Guide
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-950">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800">
                  {product.fullSpecs.map((row) => (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 w-2/5 bg-zinc-50/60 dark:bg-zinc-900/40"
                      >
                        {row.label}
                      </th>
                      <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── Buyer FAQ Section ── */}
      <section className="py-14 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 mb-8">
            <HelpCircle className="w-5 h-5 text-cyan-500" />
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              Ordering, Shipping &amp; Direct Store FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {product.faqs.map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40"
              >
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mobile Sticky Bottom Buy Bar (Instagram / Mobile Traffic Optimizer) ── */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="min-w-0">
            <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
              {product.name}
            </p>
            <p className="text-sm font-black text-cyan-600 dark:text-cyan-400">
              {priceDisplay}
              {typeof product.price === "number" ? " USD" : ""}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isAvailable && product.elecrowUrl ? (
              <a
                href={product.elecrowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-linear-to-r ${product.gradient} text-white font-bold text-xs shadow-md`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Buy on Elecrow
              </a>
            ) : isKickstarter && product.kickstarterUrl ? (
              <a
                href={product.kickstarterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-linear-to-r ${product.gradient} text-white font-bold text-xs shadow-md`}
              >
                <Rocket className="w-3.5 h-3.5" />
                Kickstarter
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
