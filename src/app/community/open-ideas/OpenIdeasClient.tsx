"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Lightbulb,
  Cpu,
  Brain,
  Code2,
  BookOpen,
  FlaskConical,
  GitBranch,
  Rocket,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  MessageSquare,
  ArrowRight,
  Search,
  ExternalLink,
  Plus,
} from "lucide-react";
import {
  OPEN_IDEA_CATEGORIES,
  OPEN_IDEAS_FAQS,
  type IdeaCategoryId,
  type IdeaLevel,
  type HighlightedCommunityBuild,
} from "@/lib/open-ideas-data";

function CategoryIcon({
  icon,
  className,
}: {
  icon: "cpu" | "brain" | "code" | "book" | "flask";
  className?: string;
}) {
  switch (icon) {
    case "cpu":
      return <Cpu className={className} />;
    case "brain":
      return <Brain className={className} />;
    case "code":
      return <Code2 className={className} />;
    case "book":
      return <BookOpen className={className} />;
    case "flask":
      return <FlaskConical className={className} />;
  }
}

const LEVEL_STYLES: Record<IdeaLevel, string> = {
  Starter:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
  Intermediate:
    "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
  Advanced:
    "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
};

interface OpenIdeasClientProps {
  highlightedBuilds: HighlightedCommunityBuild[];
}

export default function OpenIdeasClient({
  highlightedBuilds,
}: OpenIdeasClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    IdeaCategoryId | "all"
  >("all");
  const [selectedLevel, setSelectedLevel] = useState<IdeaLevel | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const totalIdeasCount = useMemo(
    () =>
      OPEN_IDEA_CATEGORIES.reduce((acc, cat) => acc + cat.ideas.length, 0),
    []
  );

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return OPEN_IDEA_CATEGORIES.filter(
      (cat) => selectedCategory === "all" || cat.id === selectedCategory
    )
      .map((cat) => ({
        ...cat,
        ideas: cat.ideas.filter((idea) => {
          const matchesLevel =
            selectedLevel === "all" || idea.level === selectedLevel;
          const matchesQuery =
            !q ||
            idea.title.toLowerCase().includes(q) ||
            idea.summary.toLowerCase().includes(q) ||
            idea.outcome.toLowerCase().includes(q) ||
            idea.skills.some((s) => s.toLowerCase().includes(q));
          return matchesLevel && matchesQuery;
        }),
      }))
      .filter((cat) => cat.ideas.length > 0);
  }, [selectedCategory, selectedLevel, searchQuery]);

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-5">
            <Lightbulb className="w-4 h-4 shrink-0" />
            <span>Open Project Ideas</span>
          </div>

          <h1 className="title-hero mb-4">Build Your Own Neurotech Project</h1>

          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {totalIdeasCount}
            </span>{" "}
            open-source ideas you can pick up today and build independently on
            MIT-licensed PiEEG hardware and software. Your project, your
            repository, your name on it.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#ideas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:opacity-90 transition-opacity"
            >
              <span>Browse ideas</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#spotlight"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Community Spotlight</span>
            </a>
            <a
              href="#rules"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors"
            >
              <span>Read the ground rules</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========== NOT A VOLUNTEER PROGRAMME ========== */}
      <section className="pt-10 pb-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start gap-4 p-6 rounded-2xl border-2 border-amber-300 dark:border-amber-800 bg-amber-50/90 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200">
            <AlertTriangle className="w-6 h-6 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-bold text-amber-950 dark:text-amber-100 mb-1.5">
                This is not a volunteer or internship programme
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                PiEEG Ltd is a UK company and does not take on volunteers,
                interns or unpaid workers. The ideas below are shared publicly
                as inspiration. Anyone can work on them, on their own
                initiative, for their own open-source project. You do not work
                for PiEEG, and PiEEG does not assign, supervise or direct your
                work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-12 bg-zinc-50 dark:bg-zinc-900/60 border-y border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="title-section text-center mb-8">How It Works</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Lightbulb className="w-7 h-7 text-cyan-600 dark:text-cyan-400 mb-3" />
              <h3 className="text-base font-bold mb-1">1. Pick an idea</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Choose one below, or invent your own. No application, no
                sign-up.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <GitBranch className="w-7 h-7 text-cyan-600 dark:text-cyan-400 mb-3" />
              <h3 className="text-base font-bold mb-1">2. Start your repo</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Create a repository under your own account. Fork or reuse our
                MIT-licensed code.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Rocket className="w-7 h-7 text-cyan-600 dark:text-cyan-400 mb-3" />
              <h3 className="text-base font-bold mb-1">3. Build &amp; publish</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Work at your own pace. Publish code, results and write-ups
                openly.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Sparkles className="w-7 h-7 text-cyan-600 dark:text-cyan-400 mb-3" />
              <h3 className="text-base font-bold mb-1">4. Share it</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Post it on Discord. We may choose to feature notable projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== IDEAS ========== */}
      <section id="ideas" className="py-14 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="title-section mb-3">The Ideas</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Starting points, not specifications. Change the scope, combine
              ideas, or take them somewhere we never thought of.
            </p>
          </div>

          {/* Category filter chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
                  : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
            >
              <span>All Categories</span>
              <span className="text-xs opacity-70">{totalIdeasCount}</span>
            </button>

            {OPEN_IDEA_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(active ? "all" : cat.id)
                  }
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                    active
                      ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
                      : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  <CategoryIcon
                    icon={cat.icon}
                    className={`w-4 h-4 ${active ? "text-current" : cat.accentClass}`}
                  />
                  <span>{cat.name}</span>
                  <span className="text-xs opacity-60">{cat.ideas.length}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Level filter bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 max-w-3xl mx-auto mb-12">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by skill, topic, or keyword (e.g. Python, KiCad, SSVEP, LSL)..."
                aria-label="Filter open project ideas"
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div className="flex items-center gap-1.5 justify-center">
              {(["all", "Starter", "Intermediate", "Advanced"] as const).map(
                (lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      selectedLevel === lvl
                        ? "bg-cyan-600 text-white border-cyan-600 dark:bg-cyan-500 dark:text-zinc-950 dark:border-cyan-400"
                        : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {lvl === "all" ? "All Levels" : lvl}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Categories & Idea cards */}
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
              <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                No project ideas match your current filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                  setSearchQuery("");
                }}
                className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  id={cat.id}
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <CategoryIcon
                      icon={cat.icon}
                      className={`w-6 h-6 ${cat.accentClass}`}
                    />
                    <h3 className="text-2xl font-bold tracking-tight">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 mb-5">
                    {cat.blurb}
                  </p>

                  <div className="grid gap-5 md:grid-cols-2">
                    {cat.ideas.map((idea) => (
                      <article
                        key={idea.slug}
                        className="group flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2.5">
                          <h4 className="text-lg font-bold leading-snug text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            <Link href={`/community/open-ideas/${idea.slug}`}>
                              {idea.title}
                            </Link>
                          </h4>
                          <span
                            className={`shrink-0 text-xs font-bold px-2.5 py-0.5 rounded-full border ${LEVEL_STYLES[idea.level]}`}
                          >
                            {idea.level}
                          </span>
                        </div>

                        <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 mb-3 leading-relaxed">
                          {idea.summary}
                        </p>

                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
                          <strong className="text-zinc-900 dark:text-zinc-100">
                            Possible outcome:
                          </strong>{" "}
                          {idea.outcome}
                        </p>

                        <div className="mt-auto pt-3 border-t border-zinc-200/70 dark:border-zinc-800/70 flex flex-wrap items-center gap-2">
                          {idea.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-xs px-2.5 py-0.5 rounded-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                            >
                              {skill}
                            </span>
                          ))}

                          <div className="ml-auto flex items-center gap-3">
                            {idea.repo && (
                              <a
                                href={idea.repo[1]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                              >
                                <span>{idea.repo[0]}</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <Link
                              href={`/community/open-ideas/${idea.slug}`}
                              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                            >
                              <span>Idea guide</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========== COMMUNITY OPEN-SOURCE SPOTLIGHT ========== */}
      <section
        id="spotlight"
        className="py-14 bg-zinc-50 dark:bg-zinc-900/60 border-y border-zinc-200 dark:border-zinc-800 scroll-mt-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open Neurotech Showcase</span>
              </div>
              <h2 className="title-section">
                Highlighted Community Projects
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mt-2">
                Built an independent open-source project on PiEEG hardware or
                software? Share your public repository on Discord—notable
                projects get their own dedicated showcase page to highlight your
                work and credit your name.
              </p>
            </div>
            <a
              href="https://discord.gg/neJ45FR6Sv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors shrink-0 self-start md:self-auto"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Share your repo on Discord</span>
            </a>
          </div>

          {highlightedBuilds.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {highlightedBuilds.map((build) => (
                <article
                  key={build.slug}
                  className="flex flex-col p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                      {build.category}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      by <strong className="text-zinc-800 dark:text-zinc-200">{build.author}</strong>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2">
                    <Link
                      href={`/community/open-ideas/${build.slug}`}
                      className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      {build.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 flex-1">
                    {build.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {build.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-sm font-semibold">
                    <a
                      href={build.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <Link
                      href={`/community/open-ideas/${build.slug}`}
                      className="inline-flex items-center gap-1 text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400"
                    >
                      <span>Read showcase</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-3">
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-dashed border-zinc-300 dark:border-zinc-800 flex flex-col justify-between">
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
                    Your Build Here · Slot #1
                  </span>
                  <h3 className="text-lg font-bold mb-2">
                    Publish Your Independent Repo
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Pick any hardware, DSP, ML, software, or open-science idea
                    above, build it in your own GitHub repository, and document
                    your results.
                  </p>
                </div>
                <a
                  href="#ideas"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  <span>Explore {totalIdeasCount} project ideas</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-dashed border-zinc-300 dark:border-zinc-800 flex flex-col justify-between">
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
                    Your Credit &amp; Name · Slot #2
                  </span>
                  <h3 className="text-lg font-bold mb-2">
                    Get a Dedicated Showcase Page
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Notable community repositories shared on Discord can be
                    featured with a dedicated article page linking directly to
                    your GitHub, paper, and author profile.
                  </p>
                </div>
                <a
                  href="https://discord.gg/neJ45FR6Sv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  <span>Share in Discord #showcase</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
                    Cohort #1 · Live Now
                  </span>
                  <h3 className="text-lg font-bold mb-2">
                    Octopus 16 Maker Challenge Winners
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    See the 5 selected makers building mind-guided drones,
                    robotic arms, c-VEP spellers, and neural jazz in the
                    Octopus 16 Maker Challenge.
                  </p>
                </div>
                <Link
                  href="/community"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <span>View Cohort #1 builds</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========== AVAILABLE / NOT AVAILABLE ========== */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="title-section text-center mb-8">
            What&apos;s Available, and What Isn&apos;t
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 sm:p-7 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/70 dark:bg-emerald-950/25 text-emerald-900 dark:text-emerald-200">
              <h3 className="text-lg font-bold flex items-center gap-2.5 mb-4 text-emerald-950 dark:text-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Freely available to everyone</span>
              </h3>
              <ul className="space-y-2.5 text-sm sm:text-base list-disc pl-5">
                <li>
                  MIT-licensed source code and open hardware files on GitHub
                </li>
                <li>Public documentation at docs.pieeg.com</li>
                <li>Published tutorials, guides and example code</li>
                <li>The community Discord, where people help each other</li>
                <li>
                  A chance to be featured: we may showcase notable public
                  projects
                </li>
              </ul>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl border border-red-200 dark:border-red-900/80 bg-red-50/70 dark:bg-red-950/25 text-red-900 dark:text-red-200">
              <h3 className="text-lg font-bold flex items-center gap-2.5 mb-4 text-red-950 dark:text-red-100">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
                <span>Not offered by PiEEG Ltd</span>
              </h3>
              <ul className="space-y-2.5 text-sm sm:text-base list-disc pl-5">
                <li>Volunteer, internship, placement or unpaid roles</li>
                <li>Assigned tasks, supervision, mentoring or deadlines</li>
                <li>Payment, expenses, equipment loans or free hardware</li>
                <li>Certificates, reference letters or confirmation of work</li>
                <li>Visa, academic or placement agreements</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== GROUND RULES ========== */}
      <section
        id="rules"
        className="py-14 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-20"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="title-section text-center mb-6">Ground Rules</h2>

          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">
                Information only.
              </strong>{" "}
              This page is general information and inspiration published by
              PiEEG Ltd. It is not an offer of work, volunteering, training or
              collaboration, and it does not create any employment, worker,
              volunteer, agency or partnership relationship between you and
              PiEEG Ltd.
            </p>
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">
                Your project, your responsibility.
              </strong>{" "}
              Any project you start is your own independent activity. You decide
              whether to do it, how, and when. You are responsible for your own
              work, costs, equipment, safety and compliance with any laws that
              apply to you.
            </p>
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">
                No obligations either way.
              </strong>{" "}
              PiEEG Ltd has no obligation to review, use, merge, feature or
              respond to anything you create, and you have no obligation to
              PiEEG Ltd. Contributions to PiEEG repositories are welcome but are
              accepted or declined at the maintainers&apos; discretion under
              each repository&apos;s licence.
            </p>
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">
                Ideas are provided &ldquo;as is&rdquo;.
              </strong>{" "}
              Ideas may be incomplete, may not work, and may change or be
              removed at any time without notice. To the extent permitted by
              law, PiEEG Ltd accepts no liability for any loss or damage arising
              from acting on them.
            </p>
            <p>
              <strong className="text-zinc-900 dark:text-zinc-100">
                Use the name honestly.
              </strong>{" "}
              You may say your project is built on or compatible with PiEEG open
              source. Please don&apos;t present it, or yourself, as official,
              endorsed by, or working for PiEEG Ltd.
            </p>
          </div>

          <div className="mt-6 p-6 sm:p-7 rounded-2xl border-2 border-red-200 dark:border-red-900/80 bg-red-50/80 dark:bg-red-950/30 text-red-900 dark:text-red-200">
            <h3 className="text-lg font-bold flex items-center gap-2.5 mb-3 text-red-950 dark:text-red-100">
              <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
              <span>Safety first</span>
            </h3>
            <ul className="space-y-2 text-sm sm:text-base list-disc pl-5">
              <li>
                PiEEG devices are <strong>not medical devices</strong>. Never
                use projects for diagnosis or treatment.
              </li>
              <li>
                <strong>Battery power only</strong> when electrodes are on a
                person. Never connect to mains power during recording.
              </li>
              <li>
                Recording other people requires their informed consent, and
                research on human participants normally needs approval from your
                own institution&apos;s ethics committee.
              </li>
              <li>
                Modified or self-designed hardware is entirely at your own risk.
              </li>
            </ul>
            <p className="mt-4">
              <Link
                href="/liability"
                className="font-bold underline hover:opacity-80"
              >
                Read the full liability &amp; safety information →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="py-14 border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="title-section text-center mb-8">Questions</h2>
          <div className="space-y-3">
            {OPEN_IDEAS_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800"
              >
                <summary className="cursor-pointer list-none font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between gap-4">
                  <span>{faq.question}</span>
                  <Plus className="w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-14 bg-linear-to-br from-amber-500 via-orange-500 to-rose-500 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="title-section mb-3">Ready to Start?</h2>
          <p className="text-lg text-amber-50 max-w-xl mx-auto mb-8">
            Grab the code, start your own repository, and share what you build
            with the community.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/pieeg-club"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-white text-orange-600 hover:bg-amber-50 transition-colors shadow-lg"
            >
              <GitBranch className="w-5 h-5" />
              <span>Open-source repositories</span>
            </a>
            <a
              href="https://discord.gg/neJ45FR6Sv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold border-2 border-white text-white hover:bg-white/10 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Share on Discord</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
