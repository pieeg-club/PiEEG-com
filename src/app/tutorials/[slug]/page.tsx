import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, GraduationCap, Calendar, Tag } from "lucide-react";
import { getAllTutorials, getTutorialBySlug, type Difficulty } from "@/lib/tutorials";
import ArticleContent from "@/components/ArticleContent";

export async function generateStaticParams() {
  return getAllTutorials().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  if (!tutorial) return { title: "Tutorial Not Found" };
  return {
    title: `${tutorial.title} — PiEEG Tutorials`,
    description: tutorial.excerpt,
    openGraph: {
      title: tutorial.title,
      description: tutorial.excerpt,
      images: [tutorial.image],
    },
  };
}

const difficultyStyles: Record<Difficulty, string> = {
  Beginner:
    "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",
  Intermediate:
    "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",
  Advanced:
    "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/20",
};

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  if (!tutorial) notFound();

  const allTutorials = getAllTutorials();
  const related = allTutorials
    .filter(
      (t) =>
        t.slug !== slug &&
        t.tags.some((tag) => tutorial.tags.includes(tag))
    )
    .slice(0, 3);

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tutorials
          </Link>

          {/* Badges */}
          <div className="flex items-center gap-2.5 flex-wrap mb-4">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ring-inset ${difficultyStyles[tutorial.difficulty]}`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              {tutorial.difficulty}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              {tutorial.time}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05] mb-5">
            {tutorial.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-5">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={tutorial.date}>
                {new Date(tutorial.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>

          {tutorial.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tutorial.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ArticleContent content={tutorial.content} />
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-5">
              Related tutorials
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tutorials/${t.slug}`}
                  className="group rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ring-1 ring-inset ${difficultyStyles[t.difficulty]}`}
                    >
                      {t.difficulty}
                    </span>
                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {t.time}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {t.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
