import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";
import ArticleContent from "@/components/ArticleContent";
import CompareEegGuide, {
  COMPARE_EEG_SLUG,
} from "@/components/CompareEegGuide";

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide not found" };
  return {
    title: `${guide.title} — PiEEG`,
    description: guide.excerpt,
    alternates:
      slug === COMPARE_EEG_SLUG
        ? { canonical: `https://pieeg.com/guides/${slug}` }
        : undefined,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      images: [guide.image],
      type: "article",
      url:
        slug === COMPARE_EEG_SLUG
          ? `https://pieeg.com/guides/${slug}`
          : undefined,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const related = getAllGuides()
    .filter(
      (g) =>
        g.slug !== slug && g.tags.some((tag) => guide.tags.includes(tag)),
    )
    .slice(0, 3);

  const faqLd =
    guide.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  if (slug === COMPARE_EEG_SLUG) {
    return (
      <main className="flex-1 bg-white">
        <CompareEegGuide />
      </main>
    );
  }

  return (
    <main className="flex-1">
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqLd).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All guides
          </Link>

          <div className="inline-flex items-center px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-4">
            {guide.category}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05] mb-5">
            {guide.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
            {guide.excerpt}
          </p>

          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-5">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>
                Published{" "}
                <time dateTime={guide.date}>
                  {new Date(guide.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </span>
            </div>
            {guide.updated && guide.updated !== guide.date && (
              <span>
                Updated <time dateTime={guide.updated}>{guide.updated}</time>
              </span>
            )}
          </div>

          {guide.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {guide.tags.map((tag) => (
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

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ArticleContent content={guide.content} />
      </section>

      {related.length > 0 && (
        <section className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-5">
              Related guides
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="group rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    {g.category}
                  </p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                    {g.title}
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
