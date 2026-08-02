import { Metadata } from "next";
import Link from "next/link";
import { Clock, GraduationCap, BookOpen, ArrowRight, Tag } from "lucide-react";
import { getAllTutorials, type Difficulty } from "@/lib/tutorials";

export const metadata: Metadata = {
  title: "Tutorials — PiEEG",
  description:
    "Step-by-step guides for getting started with PiEEG hardware, cloud tools, and brain-computer interface experiments.",
};

const difficultyStyles: Record<Difficulty, string> = {
  Beginner:
    "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",
  Intermediate:
    "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",
  Advanced:
    "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/20",
};

export default function TutorialsPage() {
  const tutorials = getAllTutorials();

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm mb-4">
              <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Step-by-step guides
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] mb-4">
              PiEEG{" "}
              <span className="bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-500 bg-clip-text text-transparent">
                Tutorials
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Practical walkthroughs for connecting hardware, building BCI experiments, and getting the most out of the PiEEG ecosystem. Contributed by the team and the community.
            </p>
          </div>
        </div>
      </section>

      {/* Tutorial grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {tutorials.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <BookOpen className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-4" />
            <p className="text-zinc-500 dark:text-zinc-400">No tutorials yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutorials.map((tutorial) => (
              <Link
                key={tutorial.slug}
                href={`/tutorials/${tutorial.slug}`}
                className="group flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md dark:hover:shadow-zinc-900/40 transition-all duration-200 overflow-hidden"
              >
                {/* Card header */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ring-1 ring-inset ${difficultyStyles[tutorial.difficulty]}`}
                    >
                      {tutorial.difficulty}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                      <Clock className="w-3 h-3" />
                      {tutorial.time}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {tutorial.title}
                  </h2>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                    {tutorial.excerpt}
                  </p>

                  {/* Tags */}
                  {tutorial.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {tutorial.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card footer */}
                <div className="px-5 pb-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
                  <time
                    dateTime={tutorial.date}
                    className="text-xs text-zinc-400 dark:text-zinc-500"
                  >
                    {new Date(tutorial.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:gap-2 transition-all duration-150">
                    Read
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
