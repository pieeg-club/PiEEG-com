"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingCart, ChevronRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  channels: string;
  platform: string;
  signals: string[];
  features: string[];
  status: string;
  badge?: string;
  gradient: string;
  bgGradient: string;
  image: string;
  purchaseUrl: string;
  github?: string;
  youtube?: string;
  categories: string[];
}

interface ProductsGridProps {
  products: Product[];
}

const FILTERS = [
  { id: "all", label: "All" },
  { id: "raspberry-pi", label: "Raspberry Pi" },
  { id: "wireless", label: "Wireless" },
  { id: "8ch", label: "8 Ch" },
  { id: "16ch+", label: "16+ Ch" },
];

export default function ProductsGrid({ products }: ProductsGridProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true;
    return product.categories.includes(filter);
  });

  return (
    <>
      {/* Filter bar */}
      <div className="flex items-center gap-1 mb-10 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-fit mx-auto">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              filter === f.id
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            className="group relative flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-zinc-900/40 transition-all duration-300"
          >
            {/* Image area — full width, dark bg */}
            <div className="relative bg-zinc-950 overflow-hidden" style={{ aspectRatio: "16/9" }}>
              {/* Accent glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-10`}
              />
              {/* Subtle grid */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to right,rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.04) 1px,transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={640}
                  height={360}
                  className="absolute inset-0 w-full h-full object-contain p-8 drop-shadow-2xl group-hover:scale-[1.03] transition-transform duration-500"
                />
              )}
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-white bg-gradient-to-r ${product.gradient} shadow-lg`}
                  >
                    {product.badge}
                  </span>
                </div>
              )}
              {/* Platform chip */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-zinc-300 bg-zinc-900/80 border border-zinc-700/50 backdrop-blur-sm">
                  {product.platform}
                </span>
              </div>
            </div>

            {/* Content area */}
            <div className="flex flex-col flex-1 p-6">
              {/* Name + tagline */}
              <div className="mb-4">
                <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{product.tagline}</p>
              </div>

              {/* Horizontal spec row */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-900">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-0.5">
                    Channels
                  </div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {product.channels}
                  </div>
                </div>
                <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex gap-1.5">
                  {product.signals.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features (top 3) */}
              <ul className="space-y-1.5 mb-6 flex-1">
                {product.features.slice(0, 3).map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Action row */}
              <div className="flex items-center gap-3 mt-auto">
                <Link
                  href={`/hardware/${product.id}`}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r ${product.gradient} text-white text-sm font-bold shadow-md hover:shadow-lg hover:opacity-90 transition-all`}
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={product.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-bold text-zinc-700 dark:text-zinc-300 transition-all"
                  aria-label={`Buy ${product.name} on Elecrow`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Buy
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
