import { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight, Newspaper, Award, Users } from "lucide-react";
import Image from "next/image";
import { getAllNews, getFeaturedNews } from '@/lib/news';
import NewsPagination from '@/components/NewsPagination';
import NewsletterForm from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: "News — PiEEG",
  description:
    "Latest updates, releases, and announcements from the PiEEG project. Brain-computer interface developments, research collaborations, and community highlights.",
};

const mediaFeatures = [
  // VR & XR Media (PiEEG XR Coverage)
  { name: "UploadVR", url: "https://www.uploadvr.com/pieeg-xr-makes-your-vr-avatar-expressive-without-face-tracking/" },
  { name: "Notebookcheck", url: "https://www.notebookcheck.net/For-VR-PiEEG-XR-measures-brain-activity-in-real-time.1311211.0.html" },
  { name: "Mogura VR", url: "https://www.moguravr.com/pieeg-xr-kickstarter-en/" },
  { name: "UK Rifter", url: "https://www.ukrifter.com/revolutionising-avatar-control-pieegs-brain-computer-interface-for-quest-headsets/" },
  
  // Tech Media
  { name: "Tom's Hardware", url: "https://www.tomshardware.com/news/control-a-raspberry-pi-with-your-mind-and-pieeg" },
  { name: "Tom's Hardware", url: "https://www.tomshardware.com/raspberry-pi/raspberry-pi-powers-briefcase-sized-pieeg-bio-lab-project" },
  { name: "IEEE Spectrum", url: "https://spectrum.ieee.org/neurotechnology-diy" },
  { name: "VICE", url: "https://www.vice.com/en/article/88x99k/this-affordable-device-will-let-anyone-connect-their-brain-to-a-computer" },
  { name: "It's FOSS", url: "https://itsfoss.com/news/pieeg-kit/" },
  
  // Maker & Hardware Media
  { name: "Raspberry Pi", url: "https://www.raspberrypi.com/news/raspberry-pi-to-brain-interface/" },
  { name: "Hackaday", url: "https://hackaday.com/2024/05/08/ardeeg-lowers-the-cost-of-brain-computer-interfaces/" },
  { name: "Hackaday", url: "https://hackaday.com/tag/pieeg/" },
  { name: "Hackster.io", url: "https://www.hackster.io/news/ildar-rakhmatulin-is-back-with-more-low-cost-brain-computer-interface-tech-meet-the-ardeeg-6fb1427a52a7" },
  { name: "Hackster.io", url: "https://www.hackster.io/news/ildar-rakhmatulin-launches-a-new-16-channel-pieeg-for-the-most-advanced-brain-machine-interfaces-3327547fb52d" },
  { name: "Electronics Weekly", url: "https://www.electronicsweekly.com/blogs/gadget-master/arduino/measuring-eeg-and-biosignals-with-arduino-ardeeg-shield-2024-05/" },
  { name: "Arduino Blog", url: "https://blog.arduino.cc/2024/05/10/ardeeg-is-an-arduino-uno-r4-wifi-shield-for-measuring-biosignals/" },
  { name: "CNX Software", url: "https://www.cnx-software.com/2024/05/15/ardeeg-shield-works-with-arduino-uno-r4-wifi-for-biosignals-measurement/" },
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
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm mb-4">
              <Newspaper className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Latest Updates
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.02] mb-4">
              PiEEG
              <br />
              <span className="bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-500 bg-clip-text text-transparent">
                News & Updates
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 mb-5 max-w-xl mx-auto leading-relaxed">
              Product launches, research breakthroughs, and community highlights from the world of open-source brain-computer interfaces.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-cyan-500" />
                <span>{mediaFeatures.length}+ media outlets</span>
              </div>
              <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700" />
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-cyan-500" />
                <span>1000+ researchers worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Features Section */}
      <section className="py-10 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 text-center mb-4">Featured In</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {mediaFeatures.map((media) => (
              <a
                key={media.url}
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full text-xs font-semibold border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 dark:hover:border-cyan-700 transition-colors bg-white dark:bg-zinc-900"
              >
                {media.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      {featuredNews.length > 0 && (
        <section className="py-10 border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-extrabold">Featured Stories</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredNews.map((article) => (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  className="group flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg transition-all duration-200"
                >
                  <div className="relative h-44 bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 bg-transparent">
                        {article.category}
                      </span>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        {new Date(article.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <h3 className="text-base font-bold mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4 line-clamp-2 flex-1">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mt-auto">
                      Read more
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All News */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-extrabold">All News</h2>
          </div>

          <div className="space-y-6">
            {paginatedNews.map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="flex flex-col md:flex-row gap-6 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-200 group"
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
      <NewsletterForm />

      {/* Community Stats */}
      <section className="py-10 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${allNews.length}+`, label: "Articles" },
              { value: "1000+", label: "Researchers" },
              { value: `${mediaFeatures.length}+`, label: "Media Features" },
              { value: "50+", label: "Countries" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-2xl font-extrabold bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">{value}</span>
                <span className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
