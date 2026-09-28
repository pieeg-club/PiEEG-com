import Image from "next/image";

const review = {
  quote:
    "PiEEG XR is enabling us to gain a deeper insight into our immersive experiences, adding a neurophysiological dimension to the study of how athletes respond during specific training tasks. Its integration with virtual reality environments opens up new possibilities for objectively investigating what happens whilst performing different exercises and how the response changes in the face of varying demands. Although we are still working on methodological optimisation and signal quality control, it is so far proving to be a tool with great potential for sports-related research.",
  name: "María Trapero Ventura",
  roles: [
    "Preparadora física Atlético de Madrid",
    "Health & Prevention Specialist - BeFootball",
    "Profesora en UAX",
  ],
  href: "https://www.linkedin.com/in/mar%C3%ADa-trapero-ventura/",
  photo: "/home/testimonials/maria.webp",
};

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

export default function ResearchReview() {
  return (
    <section
      id="research-review"
      aria-labelledby="research-review-title"
      className="scroll-mt-20 bg-linear-to-b from-white via-violet-50/50 to-white px-4 py-16 sm:py-20 dark:from-zinc-950 dark:via-violet-950/25 dark:to-zinc-950"
    >
      <div className="mx-auto max-w-7xl">
        <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900/60 dark:shadow-none">
          <div className="h-1 bg-linear-to-r from-cyan-500 via-violet-500 to-blue-500" />
          <div className="grid md:grid-cols-[320px_minmax(0,1fr)]">
            <a
              href={review.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block min-h-[420px] md:min-h-full"
            >
              <Image
                src={review.photo}
                alt={review.name}
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover object-[24%_18%] md:object-[center_center]"
              />
            </a>

            <div className="flex flex-col bg-linear-to-br from-white to-zinc-50 px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14 dark:from-zinc-900 dark:to-zinc-950">
              <div className="mb-5 inline-flex items-center gap-2">
                <div className="h-px w-8 bg-linear-to-r from-transparent via-violet-500 to-transparent" />
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                  Latest
                </p>
                <div className="h-px w-8 bg-linear-to-r from-transparent via-violet-500 to-transparent" />
              </div>

              <h2
                id="research-review-title"
                className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50"
              >
                Sports research
                <span className="mt-1 block bg-linear-to-r from-cyan-500 via-violet-500 to-blue-500 bg-clip-text text-transparent dark:from-cyan-400 dark:via-violet-400 dark:to-blue-400">
                  with PiEEG XR
                </span>
              </h2>

              <blockquote className="relative m-0 mt-8">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-5 -left-1 select-none bg-linear-to-br from-cyan-500 to-violet-500 bg-clip-text text-7xl font-bold leading-none text-transparent opacity-30"
                >
                  “
                </span>
                <p className="relative text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-300">
                  {review.quote}
                </p>
              </blockquote>

              <div className="mt-10 flex flex-col gap-5 border-t border-zinc-200 pt-6 sm:flex-row sm:items-end sm:justify-between dark:border-zinc-800">
                <div className="min-w-0">
                  <p className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {review.name}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {review.roles.map((role) => (
                      <span
                        key={role}
                        className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={review.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 shrink-0 items-center gap-2 self-start rounded-lg border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
                >
                  <LinkedInIcon className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
