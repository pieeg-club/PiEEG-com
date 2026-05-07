import { Metadata } from "next";
import Link from "next/link";
import { Building2, GraduationCap, Rocket, Users, Check, ArrowRight, GitFork, Globe, Mail, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Partnership — PiEEG",
  description:
    "Partner with PiEEG for end-to-end BCI solutions. We handle the hardware and software so you can focus on your application. White label solutions, research collaborations, and more.",
};

export default function PartnershipPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/50 mb-6">
              <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Partnership
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Partner with PiEEG
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              If you&apos;re thinking about EEG or BCI and wondering whether you should build your own hardware — it&apos;s slow, it&apos;s expensive, and it distracts you from the thing you actually care about.
            </p>
            
            <p className="text-base text-zinc-500 dark:text-zinc-400">
              We built PiEEG so researchers, startups, and institutions can skip years of hardware pain and focus on applications, software, and results.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Partner With */}
      <section className="py-10 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Who We Partner With</h2>
          
          <div className="space-y-8">
            {/* Startups & Companies */}
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="flex items-start gap-4 mb-4">
                <Rocket className="w-8 h-8 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Startups & Companies</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Want an EEG in your product without spending years developing hardware?
                  </p>
                </div>
              </div>
              
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 mb-4">
                <h4 className="font-bold mb-3">We offer:</h4>
                <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                  <li>• <strong>White label hardware</strong> — PiEEG devices ready to ship</li>
                  <li>• <strong>Custom firmware</strong> — Tailored to your application</li>
                  <li>• <strong>Software integration</strong> — PiEEG Server and SDK support</li>
                  <li>• <strong>Technical consulting</strong> — Signal processing and ML guidance</li>
                </ul>
              </div>

              <p className="text-zinc-600 dark:text-zinc-400 italic">
                If your roadmap includes EEG and your timeline is less than &quot;sometime after your funding runs out,&quot; we should talk.
              </p>
            </div>

            {/* Universities & Research Labs */}
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="flex items-start gap-4 mb-4">
                <GraduationCap className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Universities & Research Labs</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300">
                    We work with universities and research groups to:
                  </p>
                </div>
              </div>
              
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 mb-4">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Provide PiEEG devices for research</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Support teaching labs and student projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Enable more experiments, not fewer approvals</span>
                </li>
              </ul>

              <p className="text-zinc-600 dark:text-zinc-400 italic">
                If your research budget is tight but your ambitions aren&apos;t, PiEEG is built for you.
              </p>
            </div>

            {/* Hackathons & Research Programs */}
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="flex items-start gap-4 mb-4">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Hackathons & Research Programs</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300">
                    We support:
                  </p>
                </div>
              </div>
              
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 mb-4">
                <li>• Hackathons</li>
                <li>• Student initiatives</li>
                <li>• Applied neuroscience programs</li>
              </ul>

              <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                <strong>Why?</strong> Because real innovation doesn&apos;t come from polished demos — it comes from people actually using the hardware and pushing it to its limits.
              </p>

              <p className="text-zinc-600 dark:text-zinc-400 italic">
                If you&apos;re organizing something hands-on and technical, we&apos;re interested.
              </p>
            </div>

            {/* Research → Product Collaborations */}
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="flex items-start gap-4 mb-4">
                <ArrowRight className="w-8 h-8 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Research → Product Collaborations</h3>
                  <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                    Too much EEG research dies as a PDF.
                  </p>
                </div>
              </div>

              <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                We partner with researchers and labs who want their work to:
              </p>
              
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 mb-4">
                <li>• Leave the paper</li>
                <li>• Become a prototype</li>
                <li>• Turn into a real product</li>
              </ul>

              <p className="text-zinc-600 dark:text-zinc-400 italic">
                If your research has commercial potential and you don&apos;t want to reinvent hardware along the way, you can consider PiEEG devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Not Looking For */}
      <section className="py-10 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
            <h2 className="text-2xl font-bold mb-4">What We&apos;re Not Looking For</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">Let&apos;s save everyone time.</p>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>• No vague &quot;explore synergies&quot; conversations</li>
              <li>• No unpaid consulting requests</li>
              <li>• No partnerships without a clear goal</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 mt-4 font-semibold">
              Concrete ideas win. Everything else gets ignored.
            </p>
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-10 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Current Partners</h2>
          
          <div className="space-y-6">
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="flex items-start gap-4">
                <Building2 className="w-8 h-8 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Elecrow</h3>
                  <p className="text-zinc-700 dark:text-zinc-300 mb-3">
                    Official manufacturing and global distribution partner
                  </p>
                  <a
                    href="https://www.elecrow.com/catalogsearch/result/?q=pieeg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
                  >
                    Shop PiEEG on Elecrow
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                <h3 className="text-xl font-bold mb-2">Brainflow</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Integration with industry-leading biosignal library
                </p>
                <a
                  href="https://brainflow.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Learn More →
                </a>
              </div>

              <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                <h3 className="text-xl font-bold mb-2">PiEEG.cn</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Official Chinese distributor
                </p>
                <a
                  href="https://www.pieeg.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Visit Site →
                </a>
              </div>

              <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                <h3 className="text-xl font-bold mb-2">Ankh</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Collaborative research projects
                </p>
              </div>

              <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                <h3 className="text-xl font-bold mb-2">Nimbus BCI</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Joint development initiatives
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-linear-to-br from-purple-500 via-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Let&apos;s Talk</h2>
          <div className="text-lg text-purple-50 mb-8 max-w-2xl mx-auto">
            <p className="mb-4">If you have:</p>
            <ul className="text-left inline-block">
              <li>• A clear use case</li>
              <li>• A real need for EEG</li>
              <li>• A reason to move fast</li>
            </ul>
            <p className="mt-4">Reach out.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:pieeg@pieeg.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-purple-600 hover:bg-zinc-100 font-bold shadow-xl transition-all"
            >
              <Mail className="w-5 h-5" />
              pieeg@pieeg.com
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white hover:bg-white/10 font-bold transition-all"
            >
              Contact Form
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
