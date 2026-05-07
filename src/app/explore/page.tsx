import { Metadata } from "next";
import Link from "next/link";
import {
  Users, Mail, Briefcase, Building2, Code2, Zap, Globe,
  BookOpen, Newspaper, Cpu, Layers, LifeBuoy, MessageCircle,
  ArrowRight, Sparkles, ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Explore — PiEEG",
  description:
    "Your complete guide to everything PiEEG — hardware, software, community, partnership, careers and more.",
};

/* ─── Data ─────────────────────────────────────────────────────── */

const sections = [
  {
    id: "products",
    heading: "Products & Hardware",
    description: "Research-grade biosignal shields for every platform.",
    accent: "from-cyan-500 to-blue-600",
    ring: "ring-cyan-500/20 dark:ring-cyan-500/15",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    dot: "bg-cyan-500",
    items: [
      { href: "/hardware", label: "All Hardware", desc: "Browse every shield & kit", Icon: Cpu },
      { href: "/hardware/pieeg", label: "PiEEG", desc: "Raspberry Pi EEG shield — 8 ch", Icon: Layers },
      { href: "/hardware/pieeg-16", label: "PiEEG-16", desc: "16-channel upgrade", Icon: Layers },
      { href: "/hardware/ironbci", label: "IronBCI", desc: "Wearable BLE BCI", Icon: Layers },
      { href: "/hardware/ironbci-32", label: "IronBCI-32", desc: "Professional 32-channel", Icon: Layers },
      { href: "/hardware/jneeg", label: "JNEEG", desc: "Jetson Nano EEG shield", Icon: Layers },
      { href: "/hardware/ardeeg", label: "ArdEEG", desc: "Arduino biosignal board", Icon: Layers },
      { href: "/hardware/microbci", label: "MicroBCI", desc: "Ultra-compact STM32", Icon: Layers },
    ],
  },
  {
    id: "software",
    heading: "Software & Tools",
    description: "Open-source SDKs, dashboards and integrations.",
    accent: "from-violet-500 to-purple-600",
    ring: "ring-violet-500/20 dark:ring-violet-500/15",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    dot: "bg-violet-500",
    items: [
      { href: "/software", label: "Software Overview", desc: "All tools & SDKs", Icon: Globe },
      { href: "/examples", label: "Examples & Demos", desc: "Real-world BCI code & tutorials", Icon: Zap },
      { href: "/community", label: "Open Source", desc: "GitHub repos & contributions", Icon: Code2 },
    ],
  },
  {
    id: "company",
    heading: "Company",
    description: "Who we are, what drives us, and how to reach us.",
    accent: "from-emerald-500 to-teal-600",
    ring: "ring-emerald-500/20 dark:ring-emerald-500/15",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    dot: "bg-emerald-500",
    items: [
      { href: "/about", label: "About PiEEG", desc: "Mission, team & values", Icon: Users },
      { href: "/contact", label: "Contact", desc: "Reach us directly", Icon: Mail },
      { href: "/job", label: "Careers", desc: "Open positions & volunteer roles", Icon: Briefcase },
    ],
  },
  {
    id: "collaborate",
    heading: "Collaborate",
    description: "Work with us — partnerships, community & research.",
    accent: "from-rose-500 to-pink-600",
    ring: "ring-rose-500/20 dark:ring-rose-500/15",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    dot: "bg-rose-500",
    items: [
      { href: "/partnership", label: "Partnership", desc: "White-label, reseller & collabs", Icon: Building2 },
      { href: "/community", label: "Community", desc: "Forums, Discord & open source", Icon: MessageCircle },
    ],
  },
  {
    id: "resources",
    heading: "Resources",
    description: "Everything you need to get started and go further.",
    accent: "from-amber-500 to-orange-600",
    ring: "ring-amber-500/20 dark:ring-amber-500/15",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    dot: "bg-amber-500",
    items: [
      { href: "/support", label: "Support", desc: "Docs, FAQ & troubleshooting", Icon: LifeBuoy },
      { href: "/news", label: "News", desc: "Latest updates & announcements", Icon: Newspaper },
      { href: "/examples", label: "Tutorials", desc: "Step-by-step guides", Icon: BookOpen },
    ],
  },
];

const featuredCards = [
  {
    href: "/partnership",
    badge: "Collaborate",
    title: "Become a PiEEG Partner",
    desc: "We handle hardware + software end-to-end so you can focus on your application. White-label solutions, research collaborations, distribution and custom integrations.",
    cta: "Explore partnership",
    gradient: "from-cyan-500 via-blue-600 to-violet-600",
    Icon: Building2,
  },
  {
    href: "/job",
    badge: "Careers",
    title: "Join the PiEEG Team",
    desc: "Help us democratize neuroscience and make brain-computer interfaces accessible worldwide. Remote-friendly positions and volunteer opportunities.",
    cta: "See open roles",
    gradient: "from-emerald-500 via-teal-600 to-cyan-600",
    Icon: Briefcase,
  },
  {
    href: "/community",
    badge: "Open Source",
    title: "Contribute on GitHub",
    desc: "PiEEG-Server, SDKs, PhantomLoop, PhantomMusic — all MIT-licensed. Star the repos, open PRs, or start a discussion.",
    cta: "Join the community",
    gradient: "from-violet-500 via-purple-600 to-pink-600",
    Icon: Code2,
  },
];

/* ─── Page ─────────────────────────────────────────────────────── */

export default function ExplorePage() {
  return (
    <main className="flex-1">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-200 h-100 rounded-full bg-linear-to-r from-cyan-500/8 via-blue-500/5 to-violet-500/8 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/50 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Explore PiEEG
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            Everything in one place
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-600 dark:text-zinc-400">
            From research-grade EEG hardware to open-source SDKs, partnerships and careers —
            navigate the full PiEEG universe.
          </p>
        </div>
      </section>

      {/* ── Featured cards ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6">
          Highlighted
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg hover:shadow-zinc-900/5 dark:hover:shadow-zinc-900/30 transition-all duration-200"
            >
              {/* Gradient strip */}
              <div className={`h-1 bg-linear-to-r ${card.gradient}`} />
              <div className="flex flex-col flex-1 p-6">
                <span className={`inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 bg-linear-to-r ${card.gradient} text-white`}>
                  {card.badge}
                </span>
                <div className="flex items-start gap-3 mb-3">
                  <div className={`mt-0.5 flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br ${card.gradient} shadow-md shrink-0`}>
                    <card.Icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                  {card.desc}
                </p>
                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                  {card.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── All sections ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-14">
        {sections.map((section) => (
          <div key={section.id}>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`w-2 h-2 rounded-full ${section.dot}`} />
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{section.heading}</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{section.description}</p>
              </div>
            </div>

            {/* Item grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-start gap-3 p-4 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 ${section.bg} hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-150`}
                >
                  <span className={`mt-0.5 flex items-center justify-center w-8 h-8 shrink-0 rounded-lg bg-linear-to-br ${section.accent} shadow-sm`}>
                    <item.Icon className="w-4 h-4 text-white" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
                      {item.label}
                    </span>
                    <span className="block text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 leading-snug">
                      {item.desc}
                    </span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all duration-150 shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Final CTA strip ── */}
      <section className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Ready to build your next BCI project?</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Shop the hardware, grab the SDK and ship something remarkable.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/hardware"
              className="px-5 py-2.5 rounded-full text-sm font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Browse hardware
            </Link>
            <a
              href="https://www.elecrow.com/store/PiEEG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all duration-200"
            >
              Shop now
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
