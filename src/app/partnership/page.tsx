import { Metadata } from "next";
import Link from "next/link";
import { Building2, GraduationCap, Rocket, Users, Check, ArrowRight, GitFork, Globe, Mail, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Partnership — PiEEG",
  description:
    "Our partners in neurotechnology, education, and open-source communities. Manufacturing, distribution, technology integration, and research collaborations.",
};

export default function PartnershipPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/50 mb-6">
              <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Partnerships
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Our Partners
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              PiEEG collaborates with leading organizations in neurotechnology, education, and open-source communities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Manufacturing & Distribution */}
      <section className="py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Manufacturing & Distribution</h2>
          
          <div className="p-8 rounded-2xl border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/30 mb-8">
            <div className="flex items-start gap-4">
              <Building2 className="w-8 h-8 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-3">Elecrow</h3>
                <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                  <strong>Official manufacturing and global distribution partner</strong>
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  All PiEEG devices available worldwide through Elecrow.com
                </p>
                <a
                  href="https://www.elecrow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
                >
                  Visit Elecrow Store
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Partners */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Technology Partners</h2>
          
          <div className="space-y-6">
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="flex items-start gap-4">
                <GitFork className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-3">Brainflow</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Integration with the industry-leading biosignal processing library
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    All PiEEG devices supported in Brainflow's unified API
                  </p>
                  <a
                    href="https://brainflow.readthedocs.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    Documentation: brainflow.readthedocs.io
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                <h3 className="text-xl font-bold mb-2">Ankh</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Collaborative research projects
                </p>
              </div>

              <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                <h3 className="text-xl font-bold mb-2">Nimbus BCI</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Joint development initiatives
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Partners */}
      <section className="py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Regional Partners</h2>
          
          <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <div className="flex items-start gap-4">
              <Globe className="w-8 h-8 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-3">PiEEG.cn</h3>
                <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                  Official Chinese distributor and community hub
                </p>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Serving researchers and developers across Asia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic & Community */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Academic & Community Partnerships</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <GraduationCap className="w-8 h-8 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">50+ Universities</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                PiEEG devices used in research labs worldwide
              </p>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>• Educational discounts available</li>
                <li>• Student research support program</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Open-Source Ecosystem</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Active collaboration with the neuroscience community
              </p>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>• GitHub community (5000+ stars across repositories)</li>
                <li>• Integration with popular neuroscience tools</li>
                <li>• Compatible with OpenBCI ecosystem</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Community Support */}
      <section className="py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Community Support</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <h3 className="font-bold mb-2">Discord Server</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">2000+ members</p>
              <a
                href="https://discord.gg/neJ45FR6Sv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Join Now →
              </a>
            </div>

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <h3 className="font-bold mb-2">YouTube Tutorials</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Video guides</p>
              <a
                href="https://www.youtube.com/@pieeg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Watch Now →
              </a>
            </div>

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <h3 className="font-bold mb-2">Free Udemy Courses</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Signal processing training</p>
              <a
                href="https://www.udemy.com/user/pieeg/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Enroll Free →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-br from-purple-500 via-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Become a Partner</h2>
          <p className="text-lg text-purple-50 mb-8">
            Interested in partnering with PiEEG? We welcome research institutions, educational organizations, technology companies, distribution partners, and content creators.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:partnerships@pieeg.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-purple-600 hover:bg-zinc-100 font-bold shadow-xl transition-all"
            >
              <Mail className="w-5 h-5" />
              partnerships@pieeg.com
            </a>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white hover:bg-white/10 font-bold transition-all"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Organization</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="University, Company, or Institution"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Partnership Type</label>
              <select className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Select...</option>
                <option>University / Research</option>
                <option>Startup / Innovation</option>
                <option>Enterprise Solution</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Tell us about your project</label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="What are you building? How many units do you need? Any specific requirements?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 rounded-lg bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold shadow-lg transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
