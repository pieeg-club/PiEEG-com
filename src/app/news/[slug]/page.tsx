import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { getAllNews, getNewsBySlug } from '@/lib/news';
import ArticleContent from '@/components/ArticleContent';

export async function generateStaticParams() {
  const news = getAllNews();
  return news.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | PiEEG News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const allNews = getAllNews();
  const currentIndex = allNews.findIndex(a => a.slug === slug);
  const relatedNews = allNews
    .filter(a => a.slug !== slug && a.category === article.category)
    .slice(0, 3);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>

          <div className="mb-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-4">
              {article.category}
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05] mb-5">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              <button className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ArticleContent content={article.content} />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-zinc-400" />
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 text-xs font-medium text-zinc-600 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Hackathon Registration CTA */}
      {slug === 'neuroscience-hackathon-announcement' && (
        <section className="py-14 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-200 dark:border-cyan-800 p-8 sm:p-10 text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                Ready to Participate?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-7 max-w-xl mx-auto leading-relaxed">
                Register your interest now to secure your spot at the Neuroscience Hackathon this Autumn in Ottawa, Canada.
              </p>
              <a
                href="https://forms.gle/KPr39g1xL5FnywXJ9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-cyan-500/20"
              >
                Register Your Interest
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Related Articles */}
      {relatedNews.length > 0 && (
        <section className="py-16 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight mb-8">Related Articles</h2>
            
            <div className="grid md:grid-cols-3 gap-5">
              {relatedNews.map((related) => (
                <Link
                  key={related.slug}
                  href={`/news/${related.slug}`}
                  className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-200"
                >
                  <div className="relative h-44 bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                      {related.category}
                    </div>
                    
                    <h3 className="font-bold text-sm mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {related.excerpt}
                    </p>
                    
                    <div className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">
                      {new Date(related.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
