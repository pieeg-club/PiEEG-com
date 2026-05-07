import { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Code, BookOpen, Users, MessageSquare, Heart, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers — Join PiEEG",
  description:
    "Join the PiEEG team. Help democratize neuroscience through research-grade hardware and MIT-licensed software. Remote-friendly positions and volunteer opportunities.",
};

export default function JobPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50 mb-6">
              <Briefcase className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                Careers
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Join the PiEEG Team
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              Help us democratize neuroscience and make brain-computer interfaces accessible to everyone worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-10 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Join PiEEG?</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">Global</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Impact</div>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">50+ universities, 2000+ community members worldwide</p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Open Source</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Culture</div>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">5000+ GitHub stars, MIT licensed, transparent development</p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">Remote</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Friendly</div>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">Work from anywhere, flexible hours, async collaboration</p>
            </div>
          </div>

          <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed text-center">
            PiEEG is more than just hardware – it's a movement to democratize neuroscience. We're building tools that empower researchers, students, and innovators worldwide to explore the brain without prohibitive costs.
          </p>
        </div>
      </section>

      {/* Areas of Interest */}
      <section className="py-10 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Areas of Interest</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Code className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Hardware Engineering</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                PCB design, analog circuit development, signal processing, embedded systems
              </p>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>• EEG/EMG/ECG amplifier design</li>
                <li>• Low-noise analog frontend development</li>
                <li>• Power optimization for wearables</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Code className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Software Development</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Firmware, SDKs, signal processing libraries, data visualization tools
              </p>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>• Python/C++ SDK development</li>
                <li>• Firmware for STM32/Arduino/Raspberry Pi</li>
                <li>• Machine learning integration</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Technical Writing</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Documentation, tutorials, research paper contributions, educational content
              </p>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>• User manuals and API documentation</li>
                <li>• Video tutorials and courses</li>
                <li>• Scientific publication support</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <Users className="w-8 h-8 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Community Management</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Discord moderation, GitHub issue triage, social media, event organization
              </p>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>• Discord community support (2000+ members)</li>
                <li>• Workshop and webinar coordination</li>
                <li>• User feedback collection</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <BookOpen className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Educational Content Creation</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Courses, workshop materials, demonstration videos, interactive examples
              </p>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>• Udemy course development</li>
                <li>• YouTube tutorial production</li>
                <li>• Example project creation</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <MessageSquare className="w-8 h-8 text-pink-600 dark:text-pink-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Technical Support</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                User assistance, troubleshooting, hardware debugging, onboarding
              </p>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>• Email and Discord support</li>
                <li>• Hardware troubleshooting guidance</li>
                <li>• New user onboarding</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-10 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">What We Offer</h2>
          
          <div className="space-y-4">
            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <h3 className="font-bold mb-2">🌍 Remote-Friendly Work Environment</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Work from anywhere in the world. Async-first collaboration with flexible hours.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <h3 className="font-bold mb-2">🚀 Open-Source Culture</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Everything we build is MIT licensed. Your work contributes to a global commons accessible to all.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <h3 className="font-bold mb-2">🌟 Global Impact</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Help 50+ universities, thousands of students, and researchers worldwide explore neuroscience without barriers.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <h3 className="font-bold mb-2">📚 Learning Opportunities</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Work with cutting-edge neuroscience, embedded systems, signal processing, and machine learning technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internships */}
      <section className="py-10 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Internships & Student Positions</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              We welcome students and early-career professionals. Gain hands-on experience with real-world neurotechnology projects while contributing to open-source software and working with our hardware.
            </p>
          </div>
        </div>
      </section>

      {/* Volunteer */}
      <section className="py-10 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Volunteer & Contributor Opportunities</h2>
          
          <p className="text-lg text-zinc-700 dark:text-zinc-300 text-center mb-8">
            You don't need to be an employee to contribute! Join our open-source community:
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
              <h3 className="font-bold mb-3">GitHub Contributions</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                Submit pull requests, report issues, improve documentation
              </p>
              <a
                href="https://github.com/pieeg-club"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
              >
                Browse Repositories →
              </a>
            </div>

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
              <h3 className="font-bold mb-3">Discord Community</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                Help answer questions, share projects, mentor newcomers
              </p>
              <a
                href="https://discord.gg/neJ45FR6Sv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
              >
                Join Discord →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-linear-to-br from-green-500 via-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Interested in Joining Us?</h2>
          <p className="text-lg text-green-50 mb-8">
            Send us your resume, portfolio, or just introduce yourself. We're always looking for passionate people who believe in democratizing neuroscience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:pieeg@pieeg.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-purple-600 hover:bg-zinc-100 font-bold shadow-xl transition-all"
            >
              <Mail className="w-5 h-5" />
              pieeg@pieeg.com
            </a>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white hover:bg-white/10 font-bold transition-all"
            >
              Learn More About Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
