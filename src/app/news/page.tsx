import { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight, Newspaper, Award, Users } from "lucide-react";
import Image from "next/image";
import { getAllNews, getFeaturedNews } from '@/lib/news';
import NewsPagination from '@/components/NewsPagination';

export const metadata: Metadata = {
  title: "News — PiEEG",
  description:
    "Latest updates, releases, and announcements from the PiEEG project. Brain-computer interface developments, research collaborations, and community highlights.",
};

const mediaFeatures = [
  { name: "Tom's Hardware", url: "https://www.tomshardware.com/news/control-a-raspberry-pi-with-your-mind-and-pieeg" },
  { name: "IEEE Spectrum", url: "https://spectrum.ieee.org/neurotechnology-diy" },
  { name: "VICE", url: "https://www.vice.com/en/article/88x99k/this-affordable-device-will-let-anyone-connect-their-brain-to-a-computer" },
  { name: "Raspberry Pi", url: "https://www.raspberrypi.com/news/raspberry-pi-to-brain-interface/" },
  { name: "Hackaday", url: "https://hackaday.com/2024/05/08/ardeeg-lowers-the-cost-of-brain-computer-interfaces/" },
  { name: "Electronics Weekly", url: "https://www.electronicsweekly.com/blogs/gadget-master/arduino/measuring-eeg-and-biosignals-with-arduino-ardeeg-shield-2024-05/" },
  { name: "Hackster.io", url: "https://www.hackster.io/news/ildar-rakhmatulin-is-back-with-more-low-cost-brain-computer-interface-tech-meet-the-ardeeg-6fb1427a52a7" },
  { name: "Arduino Blog", url: "https://blog.arduino.cc/2024/05/10/ardeeg-is-an-arduino-uno-r4-wifi-shield-for-measuring-biosignals/" },
  { name: "CNX Software", url: "https://www.cnx-software.com/2024/05/15/ardeeg-shield-works-with-arduino-uno-r4-wifi-for-biosignals-measurement/" }
];

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const perPage = 10;
  
  const allNews = getAllNews();
  const featuredNews = getFeaturedNews();
  const totalPages = Math.ceil(allNews.length / perPage);
  
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedNews = allNews.slice(startIndex, endIndex);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-br from-zinc-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-950/20">
        <div className="absolute inset-0 bg-[url('/hero-bg-light.png')] dark:bg-[url('/hero-bg-dark.png')] bg-cover opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 mb-6">
              <Newspaper className="w-4 h-4 text-blue-600 dark:text-blue-400" />
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
            
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              Product launches, research breakthroughs, and community highlights from the world of open-source brain-computer interfaces
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Featured in {mediaFeatures.length}+ media outlets</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>1000+ researchers worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Features Section */}
      <section className="py-12 bg-linear-to-r from-cyan-50 via-blue-50 to-purple-50 dark:from-cyan-950/20 dark:via-blue-950/20 dark:to-purple-950/20 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Featured In</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Read about PiEEG in leading tech publications</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {mediaFeatures.map((media) => (
              <a
                key={media.name}
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium text-sm sm:text-base transition-colors"
              >
                {media.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      {featuredNews.length > 0 && (
        <section className="py-16 border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-2">Featured Stories</h2>
              <div className="h-1 w-20 bg-linear-to-r from-cyan-500 to-blue-600 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredNews.map((article) => (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  className="group bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="relative h-48 bg-linear-to-br from-cyan-500 to-blue-600 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
                        {article.category}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-500">
                        {new Date(article.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-sm font-medium">
                      Read more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All News */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">All News</h2>
            <div className="h-1 w-20 bg-linear-to-r from-cyan-500 to-blue-600 rounded-full"></div>
          </div>

          <div className="space-y-6">
            {paginatedNews.map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-lg hover:border-cyan-500 dark:hover:border-cyan-500 transition-all group"
              >
                <div className="md:w-48 h-32 md:h-auto rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 shrink-0 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={192}
                    height={144}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(article.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-sm font-medium">
                    Read full article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <NewsPagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-linear-to-br from-cyan-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Newspaper className="w-12 h-12 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg text-blue-100 mb-8">
            Get the latest PiEEG news, product launches, and research highlights delivered to your inbox
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-white text-cyan-600 font-semibold hover:bg-blue-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-12 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">{allNews.length}+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">News Articles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">1000+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Researchers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">{mediaFeatures.length}+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Media Features</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">50+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Countries</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
