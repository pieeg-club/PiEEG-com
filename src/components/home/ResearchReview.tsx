"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, Quote } from "lucide-react";

const REVIEW_EMAIL = "pieeg@pieeg.com";
const REVIEW_MAILTO = `mailto:${REVIEW_EMAIL}?subject=${encodeURIComponent("My PiEEG experience")}`;

const reviews = [
  {
    tag: "Sports research · PiEEG XR",
    quote:
      "PiEEG XR is enabling us to gain a deeper insight into our immersive experiences, adding a neurophysiological dimension to the study of how athletes respond during specific training tasks. Its integration with virtual reality environments opens up new possibilities for objectively investigating what happens whilst performing different exercises and how the response changes in the face of varying demands. Although we are still working on methodological optimisation and signal quality control, it is so far proving to be a tool with great potential for sports-related research.",
    name: "María Trapero Ventura",
    byline: "Atlético de Madrid · BeFootball · UAX",
    photo: "/home/testimonials/maria.webp",
    position: "18% 22%",
  },
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

export default function ResearchReview() {
  const [copied, setCopied] = useState(false);

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
            className="text-[clamp(30px,4vw,48px)] font-semibold leading-[1.08] tracking-[-0.045em]"
          >
            What researchers are saying
          </h2>
        </div>

        <div className="grid items-stretch gap-5 md:grid-cols-3">
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
  );
}

