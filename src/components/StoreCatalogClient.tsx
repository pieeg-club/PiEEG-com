"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  ExternalLink,
  ArrowRight,
  Lock,
  Sparkles,
  CheckCircle2,
  Cpu,
  Wifi,
  Glasses,
  Layers,
  Package,
  Search,
  GraduationCap,
  ShieldCheck,
  Truck,
  Code2,
  Rocket,
  SlidersHorizontal,
} from "lucide-react";
import {
  STORE_PRODUCTS,
  STORE_CATEGORIES,
  STORE_BUNDLES,
  getStoreProduct,
  getStoreProductPriceDisplay,
  type StoreCategory,
  type StoreProduct,
} from "@/lib/store-catalog";
import { formatUsd } from "@/lib/elecrow-catalog";
import StoreDirectWaitlist from "@/components/StoreDirectWaitlist";
import HardwareSelectorButton from "@/components/HardwareSelectorButton";

const CATEGORY_ICONS: Record<StoreCategory, React.ReactNode> = {
  all: <ShoppingBag className="w-4 h-4" />,
  wireless: <Wifi className="w-4 h-4" />,
  "sbc-shields": <Cpu className="w-4 h-4" />,
  "mcu-kits": <Layers className="w-4 h-4" />,
  xr: <Glasses className="w-4 h-4" />,
  "caps-accessories": <Package className="w-4 h-4" />,
};

const CHANNEL_FILTERS: { id: "all" | StoreProduct["channelFilter"]; label: string }[] = [
  { id: "all", label: "All Channels" },
  { id: "8ch", label: "8 Channels" },
  { id: "16ch", label: "16 Channels" },
  { id: "32ch", label: "32 Channels" },
  { id: "accessory", label: "Kits & Gel" },
];

export default function StoreCatalogClient() {
  const [category, setCategory] = useState<StoreCategory>("all");
  const [channelFilter, setChannelFilter] = useState<"all" | StoreProduct["channelFilter"]>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredProducts = useMemo(
    () => STORE_PRODUCTS.filter((p) => p.featured),
    []
  );

  const filteredProducts = useMemo(() => {
    return STORE_PRODUCTS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (channelFilter !== "all" && p.channelFilter !== channelFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hay = `${p.name} ${p.tagline} ${p.platform} ${p.channels} ${p.summary} ${p.signals.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [category, channelFilter, searchQuery]);

  return (
    <div className="space-y-20">
      {/* ── Apple Store Style Category Ribbon ── */}
      <section aria-label="Store categories" className="pt-2">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {STORE_CATEGORIES.map((cat) => {
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`group shrink-0 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md"
                      : "bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200/60 dark:border-zinc-800"
                  }`}
                >
                  <span
                    className={
                      active
                        ? "text-cyan-400 dark:text-cyan-600"
                        : "text-zinc-400 group-hover:text-cyan-500 transition-colors"
                    }
                  >
                    {CATEGORY_ICONS[cat.id]}
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search + Channel sub-filter */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 sm:flex-initial sm:w-60">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search boards, caps, specs..."
                aria-label="Search store products"
                className="w-full pl-9 pr-3.5 py-2 rounded-xl text-xs sm:text-sm bg-zinc-100/80 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-x-auto">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400 ml-2 mr-1 shrink-0 hidden sm:block" />
              {CHANNEL_FILTERS.map((cf) => (
                <button
                  key={cf.id}
                  type="button"
                  onClick={() => setChannelFilter(cf.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    channelFilter === cf.id
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  {cf.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The Latest / Flagship Bento Shelf (shown when viewing All without search) ── */}
      {category === "all" && channelFilter === "all" && !searchQuery.trim() && (
        <section aria-labelledby="featured-shelf-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2
                id="featured-shelf-heading"
                className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white"
              >
                The Flagships.{" "}
                <span className="text-zinc-400 dark:text-zinc-500 font-semibold">
                  Take a look at what’s leading open-source neurotech right now.
                </span>
              </h2>
            </div>
            <div className="shrink-0">
              <HardwareSelectorButton />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.slice(0, 3).map((product) => (
              <div
                key={product.slug}
                className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-950 text-white overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top ambient gradient */}
                <div
                  className={`absolute -top-24 -right-24 w-72 h-72 rounded-full bg-linear-to-br ${product.gradient} opacity-20 blur-3xl pointer-events-none group-hover:opacity-35 transition-opacity`}
                />

                <div className="relative p-7 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-400">
                      {product.eyebrow}
                    </span>
                    {product.badge && (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-linear-to-r ${product.gradient} text-white`}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <Link href={product.storePath} className="block group/title">
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover/title:text-cyan-300 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>

                {/* Product Showcase Image */}
                <Link
                  href={product.storePath}
                  className="relative flex items-center justify-center px-8 py-4 h-56"
                >
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    width={360}
                    height={240}
                    className="object-contain max-h-48 w-auto drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Bottom Apple-style price & action bar */}
                <div className="relative p-6 pt-4 border-t border-white/10 bg-white/2 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500">
                      {typeof product.price === "number" ? "Price" : "Status"}
                    </div>
                    <div className="text-xl font-black text-white">
                      {getStoreProductPriceDisplay(product)}
                      {typeof product.price === "number" && (
                        <span className="ml-1 text-xs font-medium text-zinc-400">USD</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={product.storePath}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-zinc-950 font-bold text-xs sm:text-sm hover:bg-cyan-400 hover:text-zinc-950 transition-colors shadow-md"
                    >
                      Buy
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Complete Store Catalog Grid ── */}
      <section id="all-models" aria-labelledby="catalog-grid-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2
              id="catalog-grid-heading"
              className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white"
            >
              {category === "all"
                ? "All Models & Accessories."
                : `${STORE_CATEGORIES.find((c) => c.id === category)?.label}.`}{" "}
              <span className="text-zinc-400 dark:text-zinc-500 font-semibold">
                Choose your platform.
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Showing {filteredProducts.length} of {STORE_PRODUCTS.length} products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 p-12 text-center bg-zinc-50/50 dark:bg-zinc-900/30">
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              No matching hardware found
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Try clearing your search or switching the category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setChannelFilter("all");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isAvailable = product.availability === "InStock";
              const isKickstarter = product.availability === "Kickstarter";

              return (
                <article
                  key={product.slug}
                  className="group flex flex-col rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-black/40 transition-all duration-300"
                >
                  {/* Top Header inside card */}
                  <div className="p-6 pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                        {product.platform}
                      </span>
                      {product.badge ? (
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-linear-to-r ${product.gradient}`}
                        >
                          {product.badge}
                        </span>
                      ) : isAvailable ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          In Stock
                        </span>
                      ) : null}
                    </div>

                    <Link href={product.storePath} className="block group/link">
                      <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 group-hover/link:text-cyan-600 dark:group-hover/link:text-cyan-400 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 min-h-10">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Product Studio Image Stage */}
                  <Link
                    href={product.storePath}
                    className="relative mx-6 my-2 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-100 dark:border-zinc-800/80 flex items-center justify-center p-6 h-52 overflow-hidden"
                  >
                    <div
                      className={`absolute inset-8 bg-linear-to-br ${product.gradient} opacity-10 blur-2xl rounded-full pointer-events-none`}
                    />
                    <Image
                      src={product.heroImage}
                      alt={product.name}
                      width={320}
                      height={220}
                      className="object-contain max-h-40 w-auto relative z-10 drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Spec chips */}
                  <div className="px-6 py-3 flex flex-wrap items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-800">
                      {product.channels}
                    </span>
                    {product.signals.map((sig) => (
                      <span
                        key={sig}
                        className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-cyan-500/8 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20"
                      >
                        {sig}
                      </span>
                    ))}
                  </div>

                  {/* Price & Dual-Channel Action Footer */}
                  <div className="p-6 pt-3 mt-auto border-t border-zinc-100 dark:border-zinc-900 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                          {getStoreProductPriceDisplay(product)}
                        </span>
                        {typeof product.price === "number" && (
                          <span className="ml-1.5 text-xs font-semibold text-zinc-400">
                            USD
                          </span>
                        )}
                      </div>
                      <Link
                        href={product.hardwarePath}
                        className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white underline underline-offset-4"
                      >
                        Tech Specs & Guide →
                      </Link>
                    </div>

                    {/* Primary Store Page CTA + Quick Elecrow Link */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Link
                        href={product.storePath}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs sm:text-sm hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        View in Store
                      </Link>

                      {isAvailable && product.elecrowUrl ? (
                        <a
                          href={product.elecrowUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-linear-to-r ${product.gradient} text-white font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity shadow-xs`}
                        >
                          Buy on Elecrow
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : isKickstarter && product.kickstarterUrl ? (
                        <a
                          href={product.kickstarterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-linear-to-r ${product.gradient} text-white font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity shadow-xs`}
                        >
                          <Rocket className="w-3.5 h-3.5" />
                          Kickstarter
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 font-bold text-xs sm:text-sm cursor-not-allowed"
                        >
                          Coming Soon
                        </button>
                      )}
                    </div>

                    {/* Disabled Direct Store indicator button */}
                    <button
                      type="button"
                      disabled
                      title="Direct checkout on pieeg.com is launching soon"
                      className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 text-zinc-400 dark:text-zinc-500 text-[11px] font-semibold cursor-not-allowed select-none"
                    >
                      <Lock className="w-3 h-3 text-cyan-500/70" />
                      <span>Buy Direct on pieeg.com — Coming Soon</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Curated Lab & Starter Bundles ── */}
      <section
        id="bundles"
        aria-labelledby="bundles-heading"
        className="pt-12 border-t border-zinc-200 dark:border-zinc-800"
      >
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Recommended Lab Setups
          </div>
          <h2
            id="bundles-heading"
            className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white"
          >
            Complete Your Setup.{" "}
            <span className="text-zinc-400 dark:text-zinc-500 font-semibold">
              Pre-matched boards, caps, and electrode kits.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {STORE_BUNDLES.map((bundle) => {
            const items = bundle.itemSlugs
              .map((s) => getStoreProduct(s))
              .filter((p): p is StoreProduct => Boolean(p));
            const totalUsd = items.reduce((sum, item) => sum + (item.price ?? 0), 0);

            return (
              <div
                key={bundle.id}
                className="flex flex-col justify-between rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 p-6 sm:p-7"
              >
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white bg-linear-to-r ${bundle.gradient} mb-4`}
                  >
                    {bundle.eyebrow}
                  </span>
                  <h3 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white mb-2">
                    {bundle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    {bundle.description}
                  </p>
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-5">
                    Ideal for: <span className="text-zinc-800 dark:text-zinc-200">{bundle.idealFor}</span>
                  </p>

                  {/* Included items list */}
                  <div className="space-y-2.5 mb-6">
                    {items.map((item) => (
                      <Link
                        key={item.slug}
                        href={item.storePath}
                        className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 hover:border-cyan-500/40 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-11 h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 p-1.5 flex items-center justify-center shrink-0">
                            <Image
                              src={item.heroImage}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="object-contain max-h-8 w-auto"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-zinc-500 truncate">{item.channels}</p>
                          </div>
                        </div>
                        <span className="text-xs font-black text-zinc-900 dark:text-zinc-100 shrink-0">
                          {getStoreProductPriceDisplay(item)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-zinc-400">
                      Combined Total
                    </div>
                    <div className="text-2xl font-black text-zinc-900 dark:text-white">
                      {formatUsd(totalUsd)}{" "}
                      <span className="text-xs font-semibold text-zinc-400">USD</span>
                    </div>
                  </div>
                  {items[0] && (
                    <Link
                      href={items[0].storePath}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity"
                    >
                      Configure Setup
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Direct Store Priority Waitlist Section ── */}
      <section id="direct-store-waitlist" aria-label="Direct Store Launch Notification">
        <StoreDirectWaitlist />
      </section>

      {/* ── Store Trust Pillars (Apple Store "The PiEEG Store Difference") ── */}
      <section
        aria-labelledby="store-difference-heading"
        className="pt-12 border-t border-zinc-200 dark:border-zinc-800"
      >
        <h2
          id="store-difference-heading"
          className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white mb-8"
        >
          The PiEEG Store Difference.{" "}
          <span className="text-zinc-400 dark:text-zinc-500 font-semibold">
            Even more reasons to shop with us.
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: <ShieldCheck className="w-6 h-6 text-cyan-500" />,
              title: "Official Elecrow Fulfillment",
              desc: "Every unit is factory-tested and fulfilled via our official manufacturing partner Elecrow—with Direct Store checkout coming soon.",
            },
            {
              icon: <Truck className="w-6 h-6 text-blue-500" />,
              title: "Tracked Global Shipping",
              desc: "Ships worldwide to 120+ countries via DHL, FedEx, UPS, and dedicated airmail with full customs documentation.",
            },
            {
              icon: <GraduationCap className="w-6 h-6 text-violet-500" />,
              title: "10–20% Academic & Lab Discounts",
              desc: "Ordering 5+ boards for a university course or research lab? Get instant tiered discounts and formal PO invoices.",
            },
            {
              icon: <Code2 className="w-6 h-6 text-emerald-500" />,
              title: "100% Open-Source SDKs Included",
              desc: "No paywalls or monthly software fees. Includes Python, C/C++, BrainFlow, and browser-based PiEEG Cloud tools.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col gap-3"
            >
              <div className="w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                {card.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
