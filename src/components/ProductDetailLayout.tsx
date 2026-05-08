import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ChevronRight, ShoppingCart, AlertTriangle } from "lucide-react";
import { ReactNode } from "react";

interface Spec {
  label: string;
  value: string;
}

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface ProductDetailLayoutProps {
  name: string;
  tagline: string;
  badge?: string;
  badgeClasses: string;
  gradient: string;
  ctaGradient: string;
  ctaTextColor: string;
  ctaButtonTextColor: string;
  description: ReactNode;
  image: string;
  imageAlt: string;
  videoId?: string;
  specs: Spec[];
  features: Feature[];
  channels: string;
  platform: string;
  signals: string[];
  purchaseUrl: string;
  githubUrl?: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}

export default function ProductDetailLayout({
  name,
  tagline,
  badge,
  badgeClasses,
  gradient,
  ctaGradient,
  ctaTextColor,
  ctaButtonTextColor,
  description,
  image,
  imageAlt,
  videoId,
  specs,
  features,
  channels,
  platform,
  signals,
  purchaseUrl,
  githubUrl,
  ctaTitle,
  ctaSubtitle,
  ctaSecondaryLabel,
  ctaSecondaryHref,
}: ProductDetailLayoutProps) {
  return (
    <main className="flex-1">
      {/* ── Breadcrumb ── */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400"
          >
            <Link
              href="/"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link
              href="/hardware"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Hardware
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">{name}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-zinc-950 overflow-hidden">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.04),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              {badge && (
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 ${badgeClasses}`}
                >
                  {badge}
                </div>
              )}

              <h1 className="text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 leading-none">
                {name}
              </h1>

              <p className="text-xl text-zinc-300 mb-10 leading-relaxed max-w-lg">{tagline}</p>

              {/* Spec chips */}
              <div className="grid grid-cols-3 gap-3 mb-10">
                <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">
                    Channels
                  </div>
                  <div className="text-sm font-bold text-white">{channels}</div>
                </div>
                <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">
                    Platform
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">{platform}</div>
                </div>
                <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">
                    Signals
                  </div>
                  <div className="text-xs font-bold text-white">{signals.join(" · ")}</div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r ${gradient} text-white font-bold text-base shadow-2xl hover:opacity-90 hover:scale-[1.02] transition-all duration-200`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy on Elecrow
                </a>
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 font-bold text-base transition-all duration-200"
                  >
                    GitHub
                    <ExternalLink className="w-4 h-4 opacity-60" />
                  </a>
                )}
              </div>
            </div>

            {/* Right: Product image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Color glow */}
                <div
                  className={`absolute inset-8 bg-gradient-to-br ${gradient} opacity-20 blur-3xl rounded-full`}
                />
                <div className="relative aspect-square rounded-3xl bg-white/[0.03] border border-white/10 p-10 overflow-hidden">
                  <Image
                    src={image}
                    alt={imageAlt}
                    width={480}
                    height={480}
                    className="object-contain w-full h-full relative z-10 drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Gallery ── */}
      <section className="py-16 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Product Gallery
            </h2>
            <span className="text-sm text-zinc-400 dark:text-zinc-500 hidden sm:block">
              {videoId ? "3 views including demo" : "3 product views"}
            </span>
          </div>

          {/* Asymmetric 2-col grid: large left + stacked right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Large primary panel */}
            <div className="lg:col-span-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden flex flex-col min-h-[280px] lg:min-h-[440px]">
              <div className="flex-1 flex items-center justify-center p-12">
                <Image
                  src={image}
                  alt={`${name} — standard product view`}
                  width={520}
                  height={400}
                  className="object-contain max-h-72 w-auto drop-shadow-xl"
                />
              </div>
              <div className="px-5 py-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Standard View
                </span>
                <span className="text-xs text-zinc-300 dark:text-zinc-600">1 / 3</span>
              </div>
            </div>

            {/* Right column: stacked panels */}
            <div className="flex flex-col gap-4">
              {/* Dark showcase panel */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col min-h-[200px] lg:min-h-0 lg:flex-1">
                <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-15`}
                  />
                  <Image
                    src={image}
                    alt={`${name} — dark showcase`}
                    width={260}
                    height={200}
                    className="object-contain max-h-28 w-auto relative z-10"
                    style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.08))" }}
                  />
                </div>
                <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                    Dark Showcase
                  </span>
                  <span className="text-xs text-zinc-700">2 / 3</span>
                </div>
              </div>

              {/* Video embed or Close-up detail */}
              {videoId ? (
                <div className="rounded-2xl border border-zinc-800 overflow-hidden relative min-h-[200px] lg:min-h-0 lg:flex-1">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`${name} product demo`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-2.5 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-between pointer-events-none">
                    <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                      Product Demo
                    </span>
                    <span className="text-xs text-zinc-600">3 / 3</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col min-h-[200px] lg:min-h-0 lg:flex-1">
                  <div className="flex-1 flex items-center justify-center overflow-hidden p-2 relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`} />
                    <div className="scale-[1.8] origin-center relative z-10">
                      <Image
                        src={image}
                        alt={`${name} — close-up detail`}
                        width={200}
                        height={200}
                        className="object-contain max-h-24 w-auto"
                      />
                    </div>
                  </div>
                  <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                      Close-up Detail
                    </span>
                    <span className="text-xs text-zinc-700">3 / 3</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview + Specifications ── */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Overview */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">
                Overview
              </h2>
              <div className="prose prose-zinc dark:prose-invert prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:leading-relaxed max-w-none">
                {description}
              </div>
            </div>

            {/* Technical Specifications */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">
                Technical Specifications
              </h2>
              <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-sm" aria-label={`${name} technical specifications`}>
                  <tbody>
                    {specs.map((spec, i) => (
                      <tr
                        key={spec.label}
                        className={[
                          i !== specs.length - 1
                            ? "border-b border-zinc-100 dark:border-zinc-800"
                            : "",
                          i % 2 === 0
                            ? "bg-white dark:bg-zinc-950"
                            : "bg-zinc-50 dark:bg-zinc-900",
                        ].join(" ")}
                      >
                        <td className="px-5 py-3.5 font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-[11px] w-[38%]">
                          {spec.label}
                        </td>
                        <td className="px-5 py-3.5 font-medium text-zinc-900 dark:text-zinc-100">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Features ── */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Key Features</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group flex flex-col p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-white dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-200"
              >
                <div className="mb-4 w-11 h-11 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-base mb-2 text-zinc-900 dark:text-zinc-100">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Legal Notice ── */}
      <section className="py-8 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <AlertTriangle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {name} is not a medical device and has not been certified by any government regulatory
              agency for use with the human body. You are fully responsible for your decision to
              purchase and use this device.{" "}
              <Link
                href="/liability"
                className="underline font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Read our Liability Statement →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`py-20 bg-gradient-to-br ${ctaGradient} text-white`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-4">{ctaTitle}</h2>
          <p className={`text-xl mb-10 ${ctaTextColor} opacity-90`}>{ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white ${ctaButtonTextColor} hover:bg-zinc-100 font-bold text-base shadow-2xl transition-all`}
            >
              <ShoppingCart className="w-5 h-5" />
              Buy on Elecrow
            </a>
            {ctaSecondaryLabel && ctaSecondaryHref && (
              <a
                href={ctaSecondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl border-2 border-white/40 text-white hover:border-white hover:bg-white/10 font-bold text-base transition-all"
              >
                {ctaSecondaryLabel}
                <ExternalLink className="w-4 h-4 opacity-60" />
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
