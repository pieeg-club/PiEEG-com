import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ExternalLink,
  Rocket,
  Waves,
  Radio,
  Cpu,
  CircuitBoard,
  Smile,
  Brain,
  Eye,
  Flame,
} from "lucide-react";
import { ProductPrice } from "@/components/ProductOffer";
import { EnclosureLinks } from "@/components/EnclosureLink";
import type { EnclosureLink } from "@/lib/thingiverse";
import { XR_GITHUB, XR_KICKSTARTER, xrDemoVideos, xrYoutube } from "./media";

export type XrProductViewProps = {
  productId: string;
  name: string;
  tagline: string;
  badge: string;
  badgeClassName: string;
  channels: string;
  platform: string;
  signals: string;
  description: string[];
  bullets: string[];
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string; label: string }[];
  glowClassName: string;
  ctaClassName: string;
  enclosureLinks?: EnclosureLink[];
  sibling: { name: string; href: string; blurb: string };
};

const pillars = [
  {
    icon: Smile,
    title: "Facial EMG",
    text: "Mask electrodes pick up facial micro-expressions and map them to avatar motion.",
  },
  {
    icon: Brain,
    title: "EEG stream",
    text: "Same front-end as IronBCI: 24-bit samples over BLE 5 into the browser or a local server.",
  },
  {
    icon: Eye,
    title: "Focus-to-Action",
    text: "Band-power intensity can drive an in-scene effect: melt, explode, transform.",
  },
  {
    icon: Flame,
    title: "Affective overlay",
    text: "Joy, load, and focus are readable from the stream. The avatar is not a hollow mesh.",
  },
];

const ironSpecs = [
  { icon: Waves, label: "Noise", value: "Research-grade analog front-end" },
  { icon: Radio, label: "250 SPS", value: "Samples per second" },
  { icon: Cpu, label: "BLE 5", value: "Wireless stream" },
  { icon: CircuitBoard, label: "24-bit", value: "Resolution per channel" },
];

export default function XrProductView({
  productId,
  name,
  tagline,
  badge,
  badgeClassName,
  channels,
  platform,
  signals,
  description,
  bullets,
  image,
  imageAlt,
  gallery,
  glowClassName,
  ctaClassName,
  enclosureLinks,
  sibling,
}: XrProductViewProps) {
  return (
    <main className="flex-1">
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400"
          >
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
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

      <section className="relative bg-zinc-950 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.04),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 ${badgeClassName}`}
              >
                {badge}
              </div>

              <h1 className="text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 leading-none">
                {name}
              </h1>

              <p className="text-xl text-zinc-300 mb-10 leading-relaxed max-w-lg">{tagline}</p>

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
                  <div className="text-xs font-bold text-white">{signals}</div>
                </div>
              </div>

              <ProductPrice productId={productId} variant="onDark" fallback="Coming soon" />

              <div className="flex flex-wrap gap-4">
                <a
                  href={XR_KICKSTARTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r ${ctaClassName} text-white font-bold text-base shadow-2xl hover:opacity-90 hover:scale-[1.02] transition-all duration-200`}
                >
                  <Rocket className="w-5 h-5" />
                  Back on Kickstarter
                </a>
                <a
                  href={XR_GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 font-bold text-base transition-all duration-200"
                >
                  GitHub
                  <ExternalLink className="w-4 h-4 opacity-60" />
                </a>
                {enclosureLinks && enclosureLinks.length > 0 && (
                  <EnclosureLinks links={enclosureLinks} tone="ondark" className="mt-4" />
                )}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className={`absolute inset-8 ${glowClassName} opacity-20 blur-3xl rounded-full`} />
                <div className="relative aspect-square rounded-3xl bg-white/[0.03] border border-white/10 p-6 overflow-hidden">
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

      <section className="py-16 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              {description.map((p) => (
                <p key={p} className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <ul className="space-y-2.5">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
            What the stream drives
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
              >
                <p.icon className="w-5 h-5 text-violet-500 mb-3" />
                <h3 className="font-bold mb-1.5">{p.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Product gallery</h2>
            <span className="text-sm text-zinc-400 dark:text-zinc-500 hidden sm:block">
              {gallery.length} views
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {gallery.map((shot, i) => (
              <div
                key={shot.src}
                className={`rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden ${
                  i === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div className={`relative ${i === 0 ? "min-h-[280px] lg:min-h-[400px]" : "min-h-[220px]"}`}>
                  <Image src={shot.src} alt="" fill className="object-cover scale-150 blur-2xl opacity-50" aria-hidden="true" />
                  <div className="absolute inset-0 bg-white/30 dark:bg-black/30" />
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                    className="object-contain p-6 relative z-10"
                  />
                </div>
                <div className="px-4 py-2.5 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    {shot.label}
                  </span>
                  <span className="text-xs text-zinc-300 dark:text-zinc-600">
                    {i + 1} / {gallery.length}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">Live demos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {xrYoutube.map((v) => (
              <div
                key={v.id}
                className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 aspect-video"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {xrDemoVideos.map((v) => (
              <div
                key={v.src}
                className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden"
              >
                <div className="relative aspect-video bg-black">
                  <video
                    controls
                    preload="none"
                    poster={v.poster}
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={v.src} type="video/mp4" />
                  </video>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-1">{v.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
            Analog front-end
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 max-w-2xl">
            Electronics are IronBCI. Open source, BLE 5, 24-bit conversion. The XR SKU is the gasket,
            electrode layout, and headset mount around that board.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {ironSpecs.map((s) => (
              <div
                key={s.label}
                className="flex items-start gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800"
              >
                <s.icon className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm">{s.label}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">
                Other edition
              </p>
              <h2 className="text-xl font-bold mb-1">{sibling.name}</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl">{sibling.blurb}</p>
            </div>
            <Link
              href={sibling.href}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors shrink-0"
            >
              View {sibling.name}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
