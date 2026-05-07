import { Metadata } from "next";
import Link from "next/link";
import { Users, Target, Lightbulb, Globe, ArrowRight, Shield, Code2 as Github, MapPin, BookOpen, Cpu, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "About — PiEEG",
  description:
    "PiEEG provides access to neurobiology through research-grade biosignal hardware compatible with various electrodes for EEG, EMG, ECG, allowing the study and application of data in real-world conditions.",
};

const team = [
  {
    name: "Ildar Rakhmatulin",
    role: "Founder & Lead Engineer",
    bio: "PhD scientist, engineer, and entrepreneur in bioscience. With an academic background spanning Imperial College London, Heriot-Watt University, and the University of Edinburgh, Ildar has published numerous papers on deep neural networks for EEG feature extraction, low-cost brain-computer interfaces, and applied AI. His work is widely cited in neurotechnology and BCI research. He launched PiEEG on CrowdSupply and raised 5× the initial goal.",
    location: "Edinburgh, Scotland, UK",
    github: "https://github.com/Ildaron",
    linkedin: "https://www.linkedin.com/company/pieeg/",
    scholar: "https://scholar.google.com/citations?user=L8q-KSoAAAAJ&hl=en",
    gradient: "from-cyan-500 to-blue-600",
    initials: "IR",
    tags: ["PhD", "Hardware Design", "Signal Processing", "Machine Learning", "Udemy Instructor"],
  },
  {
    name: "Youssef El Abbassi",
    role: "Software Architect",
    bio: "Software architect and BCI developer building the open-source software ecosystem around PiEEG. Creator of PiEEG-Server — the one-line install streaming server, terminal monitor, and browser dashboard for PiEEG shields. Also the author of PhantomLoop (real-time BCI decoder visualization) and PhantomMusic (real-time BCI → music streaming), pushing the boundaries of what's possible with consumer-grade biosignal hardware.",
    location: "Remote",
    github: "https://github.com/yelabb/",
    linkedin: "https://www.linkedin.com/in/yelabb",
    scholar: undefined,
    gradient: "from-violet-500 to-purple-600",
    initials: "YA",
    tags: ["TypeScript", "BCI Software", "Real-Time Systems", "PiEEG-Server", "Open Source"],
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.02] mb-6">
              Democratizing
              <br />
              <span className="bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-500 bg-clip-text text-transparent">
                Neuroscience Technology
              </span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
              PiEEG is an initiative making brain-computer interface technology accessible to researchers, students, and makers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm mb-6">
                <Target className="w-4 h-4 text-cyan-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Our Mission
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
                Breaking Down Barriers to Neuroscience
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  For years, the PiEEG team has been dedicated to breaking down the barriers of neuroscience. We believe that measuring the human body&apos;s signals—whether it&apos;s the brain (EEG), muscles (EMG), or eyes (EOG)—shouldn&apos;t be restricted to high-cost equipment.
                </p>
                <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Our mission is to make PiEEG the universal bridge between biology and technology for research purposes. Designed for simplicity and compatible with a vast range of electrodes, our hardware lets you go from unboxing to data-tracking in minutes. If you can run a Python script, you can explore the human nervous system.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "11+", label: "Science Papers", sub: "peer-reviewed citations", from: "from-cyan-500", to: "to-blue-500" },
                { value: "28+", label: "Media Features", sub: "podcasts & outlets", from: "from-blue-500", to: "to-indigo-500" },
                { value: "MIT", label: "Open Software", sub: "MIT-licensed SDKs", from: "from-violet-500", to: "to-purple-500" },
                { value: "Global", label: "Community", sub: "worldwide researchers", from: "from-pink-500", to: "to-rose-500" },
              ].map(({ value, label, sub, from, to }) => (
                <div key={label} className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm flex flex-col gap-1">
                  <div className={`text-2xl font-extrabold bg-linear-to-br ${from} ${to} bg-clip-text text-transparent`}>{value}</div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{label}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 sm:py-24 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              The Team
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              Engineers, scientists, and hackers building the future of accessible neuroscience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm flex flex-col gap-5"
              >
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${member.gradient} flex items-center justify-center text-white font-extrabold text-lg shadow-md shrink-0`}>
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100">{member.name}</h3>
                    <p className={`text-sm font-semibold bg-linear-to-r ${member.gradient} bg-clip-text text-transparent`}>
                      {member.role}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-zinc-400" />
                      <span className="text-xs text-zinc-400">{member.location}</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
                  {member.bio}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    <Users className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                  {member.scholar && (
                    <a
                      href={member.scholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      Scholar
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Our Core Values
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Principles that guide everything we build
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Globe, title: "Open & Transparent", desc: "Software and SDKs are MIT licensed and fully public. No vendor lock-in. Our GitHub repositories are the source of truth for every line of code.", from: "from-cyan-500", to: "to-blue-600" },
              { icon: Users, title: "Community-Driven", desc: "Built by neuroscientists, for neuroscientists. Our roadmap is shaped by real user needs, not corporate agendas. Every voice matters.", from: "from-blue-500", to: "to-violet-600" },
              { icon: Lightbulb, title: "Innovation First", desc: "We push the boundaries of what's possible with accessible hardware. From 32-channel EEG to edge AI integration, we're constantly exploring.", from: "from-violet-500", to: "to-purple-600" },
              { icon: Target, title: "Quality Matters", desc: "Low-cost doesn't mean low-quality. We use medical-grade components, rigorous testing, and peer-reviewed validation to ensure research-grade results.", from: "from-green-500", to: "to-emerald-600" },
            ].map(({ icon: Icon, title, desc, from, to }) => (
              <div key={title} className="p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm flex gap-5">
                <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${from} ${to} flex items-center justify-center text-white shadow-md shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold mb-2">{title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-24 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              About Us
            </h2>
          </div>

          <div className="space-y-5">
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              PiEEG provides access to neurobiology through research-grade biosignal hardware compatible with various electrodes for EEG, EMG, ECG, allowing the study and application of data in real-world conditions.
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              PiEEG is a project born from a shared interest in hardware engineering, signal processing, and neuroscience. Our team consists of researchers and engineers who believe that the tools for exploring biosignals should be accessible to everyone.
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Over the years, we have contributed to the field by publishing our findings on Brain-Computer Interfaces (BCIs) and developing open-source software tools. Our goal isn&apos;t just to build devices, but to provide a transparent platform where others can experiment with neural interfaces. By combining our experience in hardware design with machine learning, we work to ensure PiEEG remains a reliable, entry-level tool for non-medical research and exploration.
            </p>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Global Presence
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              PiEEG hardware is used by researchers and makers across the world, with dedicated regional support.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold mb-1">Headquarters</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Edinburgh, Scotland, UK</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">Founded & led by Ildar Rakhmatulin, PhD</p>
              </div>
            </div>

            <div className="p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-red-500 to-orange-500 flex items-center justify-center text-white shadow-md shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold mb-1">China Representative</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Official Chinese distribution & support</p>
                <a
                  href="https://www.pieeg.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 mt-1 inline-block transition-colors"
                >
                  pieeg.cn →
                </a>
              </div>
            </div>

            <div className="p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-md shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold mb-1">Hardware Manufacturing</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Sold & shipped through Elecrow</p>
                <a
                  href="https://www.elecrow.com/catalogsearch/result/?q=pieeg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 mt-1 inline-block transition-colors"
                >
                  Shop on Elecrow →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Recognition */}
      <section className="py-20 sm:py-24 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Academic Recognition
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              PiEEG is used and cited in research institutions worldwide.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: BookOpen, value: "11+", label: "Science Papers", sub: "peer-reviewed citations", from: "from-cyan-500", to: "to-blue-600" },
              { icon: Globe, value: "28+", label: "Media Features", sub: "podcasts & outlets", from: "from-blue-500", to: "to-indigo-600" },
              { icon: Users, value: "1800+", label: "GitHub Stars", sub: "across all repositories", from: "from-violet-500", to: "to-purple-600" },
              { icon: Cpu, value: "7", label: "Hardware Platforms", sub: "from 8 to 32 channels", from: "from-green-500", to: "to-emerald-600" },
            ].map(({ icon: Icon, value, label, sub, from, to }) => (
              <div key={label} className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm flex flex-col gap-3">
                <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${from} ${to} flex items-center justify-center text-white shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-3xl font-extrabold bg-linear-to-br ${from} ${to} bg-clip-text text-transparent`}>{value}</div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{label}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-red-50 dark:bg-red-950/20 border-y border-red-200 dark:border-red-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0 mt-1" />
            <div>
              <p className="text-red-900 dark:text-red-100 font-bold mb-2 text-lg">
                NOT A MEDICAL DEVICE
              </p>
              <p className="text-red-800 dark:text-red-200 text-sm leading-relaxed">
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
      <section className="py-16 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Join the Movement
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Be part of the community democratizing neuroscience technology. Contribute code, share research, or just say hello.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/community"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shadow-lg"
            >
              Get Involved
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/hardware"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Browse Hardware
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
