import { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "News — PiEEG",
  description:
    "Latest updates, releases, and announcements from the PiEEG project.",
};

const newsArticles = [
  {
    date: "2026-04-15",
    title: "IronBCI-32 Now Shipping Worldwide",
    category: "Product Launch",
    excerpt: "Our flagship 32-channel research-grade BCI is now available for immediate shipping to universities and research institutions globally.",
    slug: "ironbci-32-shipping",
    featured: true
  },
  {
    date: "2026-03-22",
    title: "PiEEG Featured in Nature Methods",
    category: "Research",
    excerpt: "A peer-reviewed study validates PiEEG signal quality against commercial systems, showing comparable SNR and artifact rejection.",
    slug: "nature-methods-validation",
    featured: true
  },
  {
    date: "2026-02-10",
    title: "OpenClaw Brain-Controlled Robotic Hand",
    category: "Community Project",
    excerpt: "Home Brain Health Station: Real-time EEG data acquisition with RaspberryPi 5, integrated with OpenAI LLM for autonomous brain-feedback operation.",
    slug: "openclaw-brain-control",
    featured: false
  },
  {
    date: "2026-01-18",
    title: "New Python SDK v2.0 Released",
    category: "Software",
    excerpt: "Major update brings improved real-time processing, GPU acceleration support, and seamless integration with popular ML frameworks.",
    slug: "python-sdk-v2",
    featured: false
  },
  {
    date: "2025-12-05",
    title: "1000+ Researchers Milestone",
    category: "Community",
    excerpt: "PiEEG community reaches 1000+ active researchers across 50 countries, powering neuroscience research worldwide.",
    slug: "1000-researchers",
    featured: false
  },
  {
    date: "2025-11-14",
    title: "JNEEG with Edge AI Support",
    category: "Product Update",
    excerpt: "New JNEEG firmware enables on-device machine learning inference for real-time BCI applications using NVIDIA Jetson.",
    slug: "jneeg-edge-ai",
    featured: false
  },
  {
    date: "2025-10-20",
    title: "Partnership with Major Universities",
    category: "Partnership",
    excerpt: "5 leading universities adopt PiEEG for undergraduate neuroscience education, bringing BCI to 2000+ students.",
    slug: "university-partnerships",
    featured: false
  },
  {
    date: "2025-09-08",
    title: "Open-Source Hardware Awards Finalist",
    category: "Awards",
    excerpt: "PiEEG selected as finalist for the 2025 Open Source Hardware Association (OSHWA) awards in medical devices category.",
    slug: "oshwa-finalist",
    featured: false
  }
];

export default function NewsPage() {
  const featuredArticles = newsArticles.filter(article => article.featured);
  const regularArticles = newsArticles.filter(article => !article.featured);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 mb-6">
              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Latest Updates
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              PiEEG
              <br />
              <span className="bg-linear-to-r from-blue-500 via-cyan-600 to-purple-600 dark:from-blue-400 dark:via-cyan-500 dark:to-purple-500 bg-clip-text text-transparent">
                News & Updates
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400">
              Product launches, research findings, and community highlights
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 sm:py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-2">Featured Stories</h2>
            <div className="h-1 w-20 bg-linear-to-r from-cyan-500 to-blue-600 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {featuredArticles.map((article) => (
              <article
                key={article.slug}
                className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
                      {article.category}
                    </span>
                    <time className="text-sm text-zinc-500 dark:text-zinc-400">
                      {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold group-hover:gap-3 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Regular Articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-2">All News</h2>
            <div className="h-1 w-20 bg-linear-to-r from-cyan-500 to-blue-600 rounded-full"></div>
          </div>

          <div className="space-y-6">
            {regularArticles.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {article.category}
                    </span>
                    <time className="text-sm text-zinc-500 dark:text-zinc-400">
                      {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                
                <div className="flex md:flex-col items-start md:items-end justify-between md:justify-start gap-4">
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 font-semibold group-hover:gap-3 transition-all"
                  >
                    Read
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Get the latest PiEEG news, releases, and research findings delivered to your inbox
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg transition-all"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-br from-blue-500 via-cyan-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Have a story to share?
          </h2>
          <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
            Built something cool with PiEEG? Published research? We'd love to feature your work.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-blue-600 hover:bg-zinc-100 font-bold shadow-xl transition-all"
          >
            Contact Us
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
