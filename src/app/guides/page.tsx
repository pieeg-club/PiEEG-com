import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "BCI guides — PiEEG",
  description:
    "Honest comparisons of the PiEEG platform with OpenBCI and Muse. Specs from published pages, no ranking, no medical claims. Written so a person or a model can compare the software stack, not only the board.",
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <main className="flex-1">
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm mb-4">
              <Scale className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Compare, do not rank
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] mb-4">
              How to choose a{" "}
              <span className="bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-500 bg-clip-text text-transparent">
                BCI
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
              PiEEG is a developer platform. These notes compare it with OpenBCI and Muse: the stack, the montage, and the raw-data contract. Numbers come from published pages, dated. Where we have not measured something, the page says so.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid gap-6 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-200 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full ring-1 ring-inset bg-cyan-50 text-cyan-700 ring-cyan-600/20 dark:bg-cyan-500/10 dark:text-cyan-400 dark:ring-cyan-500/20">
                  {guide.category}
                </span>
                <time dateTime={guide.updated} className="text-xs text-zinc-500 dark:text-zinc-400">
                  Updated {guide.updated}
                </time>
              </div>
              <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {guide.title}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                {guide.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Read
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
