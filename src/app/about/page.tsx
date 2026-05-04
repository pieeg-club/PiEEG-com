import { Metadata } from "next";
import Link from "next/link";
import { Users, Target, Lightbulb, Globe, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About — PiEEG",
  description:
    "Learn about PiEEG's mission to democratize neuroscience technology through open-source brain-computer interface hardware.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Democratizing
              <br />
              <span className="bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 bg-clip-text text-transparent">
                Neuroscience Technology
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              PiEEG is an open-source initiative making brain-computer interface technology accessible to researchers, students, and makers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 sm:py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/50 mb-6">
                <Target className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  Our Mission
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Democratize Neuroscience
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                  We believe that cutting-edge neurotechnology should not be locked behind paywalls. By making our hardware open-source and software freely available, we empower individuals worldwide to explore the brain, build brain-computer interfaces (BCIs), and contribute to neuroscience research.
                </p>
                <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  PiEEG provides access to neurobiology through a universal, open-source shield compatible with various electrodes for EEG, EMG, ECG, allowing the study and application of data in real-world conditions.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800">
                <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">2000+</div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Discord Members</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">active community</div>
              </div>
              <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">50+</div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Universities</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">using PiEEG worldwide</div>
              </div>
              <div className="p-6 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">5000+</div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">GitHub Stars</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">across repositories</div>
              </div>
              <div className="p-6 rounded-xl bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800">
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">11+</div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Research Papers</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">peer-reviewed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Principles that guide everything we build
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Open & Transparent</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Every schematic, firmware line, and design decision is public. No black boxes, no vendor lock-in. Our GitHub repositories are the source of truth.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community-Driven</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Built by neuroscientists, for neuroscientists. Our roadmap is shaped by real user needs, not corporate agendas. Every voice matters.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-lg bg-linear-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white mb-6">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation First</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We push the boundaries of what's possible with accessible hardware. From 32-channel EEG to edge AI integration, we're constantly exploring.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-lg bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Matters</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Low-cost doesn't mean low-quality. We use medical-grade components, rigorous testing, and peer-reviewed validation to ensure research-grade results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Story
            </h2>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              PiEEG started in 2018 as a weekend project to build a low-cost EEG system using a Raspberry Pi. What began as a simple 8-channel prototype has evolved into a full ecosystem of biosignal acquisition hardware used in universities and research labs worldwide.
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              We saw talented researchers and students unable to pursue their ideas because commercial BCI systems cost $20,000+. We knew there had to be a better way. By leveraging open-source hardware, commodity components, and community collaboration, we've created tools that deliver 90% of the performance at 10% of the cost.
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Today, PiEEG powers everything from undergraduate neuroscience labs to cutting-edge BCI research. Our community has grown to thousands of users across 50+ countries, and we're just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-red-50 dark:bg-red-950/20 border-y border-red-200 dark:border-red-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-red-900 dark:text-red-100 font-bold mb-2 text-lg">
                NOT A MEDICAL DEVICE
              </p>
              <p className="text-red-800 dark:text-red-200">
                PiEEG devices are NOT FDA/CE approved medical devices. They are intended for education, research, and hobby applications only. You are fully responsible for safe use. Please read our{" "}
                <Link href="/liability" className="underline font-semibold">
                  Liability statement
                </Link>{" "}
                before purchase or use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-br from-cyan-500 via-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Join the Movement
          </h2>
          <p className="text-lg text-cyan-50 mb-8 max-w-2xl mx-auto">
            Be part of the community democratizing neuroscience technology. Contribute code, share research, or just say hello.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/open-source"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-blue-600 hover:bg-zinc-100 font-bold shadow-xl transition-all"
            >
              Get Involved
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white hover:bg-white/10 font-bold transition-all"
            >
              Browse Hardware
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
