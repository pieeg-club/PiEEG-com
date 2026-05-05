"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Filter, ShoppingCart } from "lucide-react";

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

export default function ProductsGrid({ products }: ProductsGridProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredProducts = products.filter(product => {
    if (filter === "all") return true;
    return product.categories.includes(filter);
  });

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <button
          onClick={() => setFilter("all")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-semibold transition-all ${
            filter === "all"
              ? "bg-cyan-600 text-white border-cyan-600"
              : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
        >
          <Filter className="w-4 h-4" />
          All Products
        </button>
        <button
          onClick={() => setFilter("raspberry-pi")}
          className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all ${
            filter === "raspberry-pi"
              ? "bg-cyan-600 text-white border-cyan-600"
              : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
        >
          Raspberry Pi
        </button>
        <button
          onClick={() => setFilter("wireless")}
          className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all ${
            filter === "wireless"
              ? "bg-cyan-600 text-white border-cyan-600"
              : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
        >
          Wireless
        </button>
        <button
          onClick={() => setFilter("8ch")}
          className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all ${
            filter === "8ch"
              ? "bg-cyan-600 text-white border-cyan-600"
              : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
        >
          8 Channels
        </button>
        <button
          onClick={() => setFilter("16ch+")}
          className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all ${
            filter === "16ch+"
              ? "bg-cyan-600 text-white border-cyan-600"
              : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
        >
          16+ Channels
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`relative group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br ${product.bgGradient} overflow-hidden hover:shadow-xl transition-all duration-300`}
          >
            {product.badge && (
              <div className="absolute top-4 left-4 z-10">
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white bg-gradient-to-r ${product.gradient} shadow-lg`}>
                  {product.badge}
                </div>
              </div>
            )}

            <div className="p-8">
              <div className="flex items-start gap-6 mb-4">
                {product.image && (
                  <div className="shrink-0">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 p-2 shadow-md border border-zinc-200 dark:border-zinc-700">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">
                    {product.tagline}
                  </p>
                </div>
              </div>

              <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-1">
                    Channels
                  </div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-100">
                    {product.channels}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-1">
                    Platform
                  </div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-100">
                    {product.platform}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {product.signals.map((signal) => (
                  <span
                    key={signal}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700"
                  >
                    {signal}
                  </span>
                ))}
              </div>

              <ul className="space-y-2 mb-6">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3">
                <Link
                  href={`/hardware/${product.id}`}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r ${product.gradient} text-white font-semibold shadow-lg hover:shadow-xl transition-all`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={product.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-zinc-900 dark:border-zinc-100 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 font-semibold transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Buy
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
