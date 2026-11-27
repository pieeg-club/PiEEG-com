"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Copy, Quote } from "lucide-react";

const REVIEW_EMAIL = "pieeg@pieeg.com";
const REVIEW_MAILTO = `mailto:${REVIEW_EMAIL}?subject=${encodeURIComponent("My PiEEG experience")}`;

type Partner = {
  index: string;
  category: string;
  accent: "emerald" | "cyan";
  title: string;
  quote: string;
  name: string;
  roles: readonly string[];
  badge: string;
  href: string;
  linkLabel: string;
  photo: string;
  photoPosition: string;
};

const partners: readonly Partner[] = [
  {
    index: "01",
    category: "Sports Neuroscience",
    accent: "emerald",
    title: "PiEEG XR in sports research",
    quote:
      "PiEEG XR is enabling us to gain a deeper insight into our immersive experiences, adding a neurophysiological dimension to the study of how athletes respond during specific training tasks. Its integration with virtual reality environments opens up new possibilities for objectively investigating what happens whilst performing different exercises and how the response changes in the face of varying demands. Although we are still working on methodological optimisation and signal quality control, it is so far proving to be a tool with great potential for sports-related research.",
    name: "María Trapero Ventura",
    roles: [
      "Preparadora física Atlético de Madrid",
      "Health & Prevention Specialist - BeFootball",
      "Profesora en UAX",
    ],
    badge: "Atlético de Madrid · BeFootball · UAX",
    href: "https://www.linkedin.com/in/mar%C3%ADa-trapero-ventura/",
    linkLabel: "LinkedIn",
    photo: "/home/testimonials/maria.webp",
    photoPosition: "22% center",
  },
  {
    index: "02",
    category: "Immersive Biofeedback",
    accent: "cyan",
    title: "PiEEG XR in VR wellness",
    quote:
      "At Alma Digital we create immersive wellness experiences in VR: breathwork, meditation and drawing in light. PiEEG XR sits inside the headset, takes a minute to put on, and is open enough to plug straight into our own tools. Now the experience can respond to the person's state as it happens, and show them something real about it at the end.",
    name: "Beltrán Lihn & Vicente Manzano",
    roles: ["Alma Digital · Immersive wellness experiences in VR"],
    badge: "Alma Digital Studio · VR Wellness",
    href: "https://almadigitalstudio.com",
    linkLabel: "almadigitalstudio.com",
    photo: "/home/testimonials/alma-digital.webp",
    photoPosition: "58% center",
  },
];

const applicationSignals = [
  "Neurophysiological Training",
  "In-Headset EEG Integration",
  "Real-Time Biofeedback",
  "Athlete Cognitive Load",
  "Breathwork & Meditation",
  "Open Research Pipeline",
] as const;

const reviews = [
  {
    tag: "Getting started · PiEEG",
    quote:
      "From my own experience I found the entire process from getting the actual device running to the online server really easy to use and set-up as well, as a relative beginner to the field this was a massive multiplier in the amount of progress I was able to make in a short time span. I would highly recommend PiEEG to anyone who is considering giving it a shot for this reason alone!",
    name: "Saad Ansari",
    byline: "Student · King’s College London, UK",
    photo: "/home/testimonials/saad.webp",
    position: "50% 18%",
  },
  {
    tag: "Facial EMG · PiEEG-8",
    quote:
      "I used PiEEG-8 on a Raspberry Pi 5 to record 8 channels of facial EMG at 1000 Hz, and deep learning models turn the signals into text or speech.",
    name: "Balazs Szabo",
    byline: "Vector Space Lab · Hungary",
    photo: "/home/testimonials/balazs.webp",
    position: "50% 18%",
  },
] as const;

const accentStyles = {
  emerald: {
    pill: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300",
    dot: "bg-emerald-500 dark:bg-emerald-400",
    quoteBar: "border-emerald-500/50 dark:border-emerald-400/50",
    glow: "from-emerald-500/15 via-transparent to-transparent dark:from-emerald-400/15",
    indexText: "text-emerald-600/80 dark:text-emerald-400/80",
  },
  cyan: {
    pill: "border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300",
    dot: "bg-cyan-500 dark:bg-cyan-400",
    quoteBar: "border-cyan-500/50 dark:border-cyan-400/50",
    glow: "from-cyan-500/15 via-transparent to-transparent dark:from-cyan-400/15",
    indexText: "text-cyan-600/80 dark:text-cyan-400/80",
  },
} as const;

export default function ResearchReview() {
  const [copied, setCopied] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Record<number, boolean>>({});
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-card-index"));
            if (!Number.isNaN(idx)) {
              setVisibleCards((prev) => (prev[idx] ? prev : { ...prev, [idx]: true }));
            }
          }
        });
      },
      { threshold: 0.14 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(REVIEW_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
    <section
      id="from-partners"
      aria-labelledby="from-partners-title"
      className="relative scroll-mt-20 overflow-hidden border-b border-zinc-200 bg-white py-24 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
    >
      {/* Subtle atmospheric backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(6,182,212,0.08),transparent_65%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(34,211,238,0.08),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400">
            Field Deployments · PiEEG XR
          </p>
          <h2 id="from-partners-title" className="title-section">
            Real-world applications
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            From elite sports science labs to immersive VR wellness studios, teams integrate PiEEG XR directly inside the headset.
          </p>
        </div>

        {/* Continuous horizontal signal marquee */}
        <div
          aria-hidden="true"
          className="marquee-fade mb-14 overflow-hidden border-y border-zinc-200/80 py-3 dark:border-zinc-800/80"
        >
          <div className="academia-marquee-track flex w-max items-center gap-8">
            {[...applicationSignals, ...applicationSignals].map((item, idx) => (
              <span
                key={`${item}-${idx}`}
                className="flex items-center gap-3 whitespace-nowrap text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400"
              >
                <span className="size-1.5 rounded-full bg-cyan-500/70 dark:bg-cyan-400/70" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-10 lg:space-y-12">
          {partners.map((partner, i) => {
            const flip = i % 2 === 1;
            const styles = accentStyles[partner.accent];
            const isVisible = visibleCards[i] ?? false;

            return (
              <article
                key={partner.name}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-card-index={i}
                aria-labelledby={`from-partners-card-${i}`}
                className={`group relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-zinc-50/70 shadow-sm transition-all duration-700 ease-out hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800/90 dark:bg-zinc-900/50 dark:hover:border-zinc-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                {/* Ambient corner accent */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${styles.glow} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div className="relative grid lg:min-h-[560px] lg:grid-cols-12">
                  {/* Full-height image panel */}
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${partner.title} — ${partner.name}`}
                    className={`relative block h-[380px] overflow-hidden bg-zinc-200 sm:h-[460px] lg:col-span-5 lg:h-full dark:bg-zinc-900 ${
                      flip ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={partner.photo}
                      alt={partner.name}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      style={{ objectPosition: partner.photoPosition }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-zinc-950/15 to-transparent"
                    />
                    <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-zinc-950/60 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                        <span className={`size-2 rounded-full ${styles.dot}`} />
                        <span>{partner.badge}</span>
                      </div>
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-zinc-950/60 text-white backdrop-blur-md transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                  </a>

                  {/* Editorial content panel */}
                  <div
                    className={`relative flex flex-col justify-between p-8 sm:p-10 lg:col-span-7 lg:p-14 ${
                      flip ? "lg:order-1" : ""
                    }`}
                  >
                    <div>
                      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${styles.pill}`}
                        >
                          <span className={`size-1.5 rounded-full ${styles.dot}`} />
                          {partner.category}
                        </span>
                        <span
                          className={`font-mono text-xs font-semibold tracking-[0.2em] ${styles.indexText}`}
                        >
                          {partner.index} / 02
                        </span>
                      </div>

                      <h3
                        id={`from-partners-card-${i}`}
                        className="text-2xl font-semibold tracking-[-0.035em] text-zinc-950 sm:text-3xl lg:text-[2.15rem] lg:leading-[1.15] dark:text-white"
                      >
                        {partner.title}
                      </h3>

                      <blockquote
                        className={`mt-7 border-l-2 pl-5 text-[15.5px] leading-[1.78] text-zinc-700 sm:text-base dark:text-zinc-300 ${styles.quoteBar}`}
                      >
                        <p className="m-0">{partner.quote}</p>
                      </blockquote>
                    </div>

                    <footer className="mt-10 flex flex-col gap-5 border-t border-zinc-200/80 pt-6 sm:flex-row sm:items-end sm:justify-between dark:border-zinc-800/80">
                      <div>
                        <p className="m-0 text-base font-semibold tracking-[-0.02em] text-zinc-950 dark:text-white">
                          {partner.name}
                        </p>
                        <ul className="m-0 mt-1.5 list-none space-y-0.5 p-0 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                          {partner.roles.map((role) => (
                            <li key={role}>{role}</li>
                          ))}
                        </ul>
                      </div>

                      <a
                        href={partner.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 no-underline transition-colors hover:border-zinc-900 hover:bg-zinc-900 hover:text-white sm:self-auto dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-950"
                      >
                        <span>{partner.linkLabel}</span>
                        <ArrowUpRight
                          className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    </footer>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section
      id="research-review"
      className="scroll-mt-20 bg-white py-20 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
      aria-labelledby="research-review-title"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-190 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
            Voices from the community
          </p>
          <h2
            id="research-review-title"
            className="title-section"
          >
            What researchers are saying
          </h2>
        </div>

        <div className="grid items-stretch gap-5 md:grid-cols-2">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50/80 p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <Quote
                className="mb-4 size-5 text-cyan-600 dark:text-cyan-400"
                aria-hidden="true"
              />
              <blockquote className="flex-1 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
                {review.quote}
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-zinc-200 pt-5 dark:border-zinc-800">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-zinc-200 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700">
                  <Image
                    src={review.photo}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                    style={{ objectPosition: review.position }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold tracking-tight">
                    {review.name}
                  </p>
                  <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {review.byline}
                  </p>
                  <p className="mt-1 truncate text-[11px] font-medium uppercase tracking-[0.12em] text-cyan-700 dark:text-cyan-400">
                    {review.tag}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 sm:flex-row sm:items-center dark:border-zinc-800 dark:bg-zinc-900/40">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
              Your story next
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Used PiEEG hardware, software, or Discord? Share your experience.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={REVIEW_MAILTO}
              className="inline-flex items-center rounded-lg bg-zinc-900 px-3.5 py-2 text-sm font-semibold text-white no-underline hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Email us
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3.5 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : REVIEW_EMAIL}
            </button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

