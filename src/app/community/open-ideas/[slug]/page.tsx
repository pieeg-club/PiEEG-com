import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  GitBranch,
  AlertTriangle,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  User,
  Calendar,
} from "lucide-react";
import {
  getAllOpenIdeas,
  getOpenIdeaBySlug,
  getHighlightedCommunityBuilds,
  getHighlightedBuildBySlug,
  type IdeaLevel,
} from "@/lib/open-ideas";
import ArticleContent from "@/components/ArticleContent";

const LEVEL_STYLES: Record<IdeaLevel, string> = {
  Starter:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
  Intermediate:
    "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
  Advanced:
    "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
};

export async function generateStaticParams() {
  const ideaParams = getAllOpenIdeas().map((idea) => ({ slug: idea.slug }));
  const buildParams = getHighlightedCommunityBuilds().map((b) => ({
    slug: b.slug,
  }));
  return [...ideaParams, ...buildParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const build = getHighlightedBuildBySlug(slug);
  if (build) {
    return {
      title: `${build.title} by ${build.author} — Open Neurotech Showcase | PiEEG`,
      description: build.excerpt,
      alternates: {
        canonical: `https://pieeg.com/community/open-ideas/${build.slug}`,
      },
      openGraph: {
        title: `${build.title} — Built by ${build.author}`,
        description: build.excerpt,
        type: "article",
        url: `https://pieeg.com/community/open-ideas/${build.slug}`,
        images: build.image ? [build.image] : undefined,
      },
    };
  }

  const idea = getOpenIdeaBySlug(slug);
  if (!idea) return { title: "Open Project Idea Not Found | PiEEG" };

  return {
    title: `${idea.title} — Open Neurotech & BCI Project Idea | PiEEG`,
    description: `${idea.summary} (${idea.level} · ${idea.categoryName}). Build it independently in your own open-source repository.`,
    keywords: idea.keywords,
    alternates: {
      canonical: `https://pieeg.com/community/open-ideas/${idea.slug}`,
    },
    openGraph: {
      title: `${idea.title} | Open Project Ideas — PiEEG`,
      description: idea.summary,
      type: "article",
      url: `https://pieeg.com/community/open-ideas/${idea.slug}`,
    },
  };
}

export default async function OpenIdeaOrBuildDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Check if this slug is a Highlighted Community Build (from content/open-ideas/*.md)
  const build = getHighlightedBuildBySlug(slug);
  if (build) {
    const parentIdea = build.basedOnIdeaSlug
      ? getOpenIdeaBySlug(build.basedOnIdeaSlug)
      : null;

    const buildLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: build.title,
      author: {
        "@type": "Person",
        name: build.author,
        url: build.authorUrl,
      },
      datePublished: build.date,
      description: build.excerpt,
      codeRepository: build.repoUrl,
      keywords: build.tags.join(", "),
    };

    return (
      <main className="flex-1 bg-white dark:bg-zinc-950">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildLd).replace(/</g, "\\u003c"),
          }}
        />
        <section className="border-b border-zinc-200 dark:border-zinc-800 py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/community/open-ideas#spotlight"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Open Ideas &amp; Highlighted Projects</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-50 text-cyan-700 border border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Community Open-Source Build</span>
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                {build.category}
              </span>
            </div>

            <h1 className="title-article mb-4">{build.title}</h1>

            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
              {build.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-6">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>
                  Independent project by{" "}
                  {build.authorUrl ? (
                    <a
                      href={build.authorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-zinc-900 dark:text-zinc-100 underline"
                    >
                      {build.author}
                    </a>
                  ) : (
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      {build.author}
                    </strong>
                  )}
                </span>
              </div>
              {build.date && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{build.date}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={build.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition-opacity"
              >
                <GitBranch className="w-4 h-4" />
                <span>View Source Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              {build.demoUrl && (
                <a
                  href={build.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {parentIdea && (
                <Link
                  href={`/community/open-ideas/${parentIdea.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-cyan-500/50"
                >
                  <span>Inspired by: {parentIdea.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <ArticleContent content={build.content} />
          </div>
        </section>
      </main>
    );
  }

  // 2. Otherwise check if this slug is one of the 16 Open Project Ideas
  const idea = getOpenIdeaBySlug(slug);
  if (!idea) notFound();

  const allIdeas = getAllOpenIdeas();
  const relatedIdeas = allIdeas
    .filter((i) => i.slug !== idea.slug && i.categoryId === idea.categoryId)
    .slice(0, 3);

  const relatedBuilds = getHighlightedCommunityBuilds().filter(
    (b) => b.basedOnIdeaSlug === idea.slug
  );

  const ideaLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${idea.title} — Open Neurotech Project Idea`,
    description: idea.summary,
    educationalLevel: idea.level,
    keywords: [...idea.skills, ...idea.keywords].join(", "),
    url: `https://pieeg.com/community/open-ideas/${idea.slug}`,
  };

  return (
    <main className="flex-1 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ideaLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Header */}
      <section className="border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/community/open-ideas#ideas"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all 16 Open Project Ideas</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              {idea.categoryName}
            </span>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border ${LEVEL_STYLES[idea.level]}`}
            >
              {idea.level}
            </span>
          </div>

          <h1 className="title-article mb-4">{idea.title}</h1>

          <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
            {idea.summary}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            {idea.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs font-medium px-3 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {idea.repo ? (
              <a
                href={idea.repo[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition-opacity"
              >
                <GitBranch className="w-4 h-4" />
                <span>Explore {idea.repo[0]} on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <a
                href="https://github.com/pieeg-club"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition-opacity"
              >
                <GitBranch className="w-4 h-4" />
                <span>Browse PiEEG Open-Source Repos</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href="https://discord.gg/neJ45FR6Sv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <span>Share your repo on Discord</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Possible outcome & Why it matters */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50">
              <h2 className="text-base font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
                Possible Outcome
              </h2>
              <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                {idea.outcome}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                You own what you build. Publish it under your own GitHub account
                with your name and chosen open-source licence.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50">
              <h2 className="text-base font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
                Why It Matters for Open Neurotech
              </h2>
              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {idea.whyItMatters}
              </p>
            </div>
          </div>

          {/* Starting Notes */}
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <h2 className="text-xl font-bold mb-4">
              Starting Points &amp; Technical Notes
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              These are open-ended suggestions, not specifications or assigned
              tasks. Change the scope, combine ideas, or take a completely
              different approach:
            </p>
            <ul className="space-y-3">
              {idea.gettingStartedNotes.map((note, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Highlighted Community Builds for this Idea (if any) */}
          {relatedBuilds.length > 0 && (
            <div className="p-6 sm:p-8 rounded-2xl border border-cyan-200 dark:border-cyan-900 bg-cyan-50/40 dark:bg-cyan-950/20">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span>Community Projects Built Around This Idea</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedBuilds.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/community/open-ideas/${b.slug}`}
                    className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500 transition-colors"
                  >
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                      {b.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mb-2">by {b.author}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {b.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Ground rules & safety reminder */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-5 rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50/80 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-sm">
              <h3 className="font-bold flex items-center gap-2 mb-1.5 text-amber-950 dark:text-amber-100">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Independent Open-Source Work</span>
              </h3>
              <p className="leading-relaxed">
                PiEEG Ltd does not take on volunteers, interns or unpaid
                workers. Any project you start is your own independent activity
                under your own repository and responsibility.{" "}
                <Link
                  href="/community/open-ideas#rules"
                  className="font-semibold underline"
                >
                  Read the full ground rules →
                </Link>
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50/80 dark:bg-red-950/30 text-red-900 dark:text-red-200 text-sm">
              <h3 className="font-bold flex items-center gap-2 mb-1.5 text-red-950 dark:text-red-100">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Safety First</span>
              </h3>
              <p className="leading-relaxed">
                PiEEG devices are <strong>not medical devices</strong>. Use{" "}
                <strong>battery power only</strong> when electrodes are on a
                person, and never connect to mains power during recording.{" "}
                <Link href="/liability" className="font-semibold underline">
                  Liability &amp; safety →
                </Link>
              </p>
            </div>
          </div>

          {/* Related Ideas in this Category */}
          {relatedIdeas.length > 0 && (
            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-bold mb-4">
                More {idea.categoryName} Ideas
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedIdeas.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/community/open-ideas/${rel.slug}`}
                    className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/50 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span
                        className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full border mb-2 ${LEVEL_STYLES[rel.level]}`}
                      >
                        {rel.level}
                      </span>
                      <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-1.5">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3">
                        {rel.summary}
                      </p>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                      <span>View idea</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
