import { Metadata } from "next";
import Link from "next/link";
import { Code2, Brain, Activity, Eye, Zap, GitFork, ExternalLink, Music, Sparkles, Globe, Webhook } from "lucide-react";

export const metadata: Metadata = {
  title: "Examples — PiEEG",
  description:
    "Real-world examples, tutorials, and BCI applications built with PiEEG hardware. From basic signal acquisition to advanced brain-computer interfaces.",
};

const BASE_EXP_URL =
  "https://github.com/pieeg-club/PiEEG-server/tree/main/dashboard/src/experiences";

const liveExperiences = [
  {
    slug: "blink-scroll",
    name: "Blink Scroll",
    description:
      "Control browser scrolling using eye blinks detected from frontal EEG channels.",
    tag: "Blink / EOG",
    gradient: "from-cyan-500 to-blue-600",
    icon: Eye,
  },
  {
    slug: "eye-track",
    name: "Eye Track",
    description:
      "Real-time EOG gaze estimation — polynomial ridge regression on Fp1/Fp2 with online learning and localStorage persistence.",
    tag: "EOG",
    gradient: "from-purple-500 to-indigo-600",
    icon: Eye,
  },
  {
    slug: "mindcast",
    name: "MindCast",
    description:
      "Attention-driven podcast playback — your focus level controls audio playback speed and clarity.",
    tag: "Focus",
    gradient: "from-orange-500 to-pink-600",
    icon: Brain,
  },
  {
    slug: "neural-sonification",
    name: "Neural Sonification",
    description:
      "Turn your brainwaves into music — live EEG band powers mapped to audio synthesis in real time.",
    tag: "Audio",
    gradient: "from-green-500 to-teal-600",
    icon: Music,
  },
  {
    slug: "northern-lights",
    name: "Northern Lights",
    description:
      "A mesmerizing aurora display driven by your live EEG rhythms and band power fluctuations.",
    tag: "Visual",
    gradient: "from-emerald-500 to-cyan-600",
    icon: Sparkles,
  },
  {
    slug: "p300-mini-game",
    name: "P300 Mini Game",
    description:
      "Classic P300 oddball paradigm reimagined as an interactive mini-game with a swappable ML backend.",
    tag: "BCI",
    gradient: "from-yellow-500 to-orange-600",
    icon: Zap,
  },
  {
    slug: "spoon-bend",
    name: "Spoon Bend",
    description:
      "Focus hard enough to bend a virtual spoon — a telekinetic experience powered by your attention index.",
    tag: "Focus",
    gradient: "from-red-500 to-pink-600",
    icon: Brain,
  },
  {
    slug: "vrchat-osc",
    name: "VRChat OSC",
    description:
      "Stream live EEG data into VRChat via OSC to animate avatars and environments with real brainwaves.",
    tag: "VR / 3D",
    gradient: "from-violet-500 to-purple-600",
    icon: Globe,
  },
  {
    slug: "webhook-wizard",
    name: "Webhook Wizard",
    description:
      "Trigger any HTTP webhook from EEG events — blinks, focus spikes, relaxation peaks, and custom thresholds.",
    tag: "Automation",
    gradient: "from-slate-500 to-zinc-600",
    icon: Webhook,
  },
];

const comingSoonExperiences = [
  {
    name: "Alpha Neurofeedback",
    description: "Real-time alpha wave training loop with visual reward feedback.",
    tag: "EEG",
  },
  {
    name: "Motor Imagery Classifier",
    description: "Left/right hand imagery with live ML inference and visual cues.",
    tag: "BCI",
  },
  {
    name: "EMG Gesture Recognition",
    description: "Surface EMG hand pose classification — up to 15 gestures.",
    tag: "EMG",
  },
  {
    name: "Sleep Stage Scorer",
    description: "Automatic AASM sleep stage classification from overnight EEG.",
    tag: "Sleep",
  },
];

const featuredProjects = [
  {
    title: "OpenClaw Brain-Controlled Robotic Hand",
    description: "Real-time EEG acquisition with RaspberryPi 5, integrated with OpenAI LLM for autonomous brain feedback and prosthetic control.",
    tags: ["EEG", "ML", "Robotics"],
    author: "PiEEG Community",
    gradient: "from-purple-500 to-pink-600",
    github: "https://github.com/pieeg-club/openclaw"
  },
  {
    title: "SSVEP Keyboard for AAC",
    description: "Frequency-based brain-computer interface enabling communication for individuals with motor disabilities. 95% accuracy, 12 WPM typing speed.",
    tags: ["EEG", "BCI", "Accessibility"],
    author: "Research Lab Contributors",
    gradient: "from-cyan-500 to-blue-600",
    github: "https://github.com/pieeg-club/ssvep-keyboard"
  },
  {
    title: "EMG Gesture Recognition Library",
    description: "Pre-trained models for 15 common hand gestures using surface EMG. Drop-in integration with scikit-learn and TensorFlow.",
    tags: ["EMG", "ML", "Gestures"],
    author: "Community",
    gradient: "from-green-500 to-emerald-600",
    github: "https://github.com/pieeg-club/emg-gestures"
  }
];

export default function ExamplesPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50 mb-6">
              <Code2 className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                Examples & Tutorials
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Learn by
              <br />
              <span className="bg-linear-to-r from-green-500 via-cyan-600 to-blue-600 dark:from-green-400 dark:via-cyan-500 dark:to-blue-500 bg-clip-text text-transparent">
                building & doing
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              Discover how PiEEG devices are transforming neuroscience research and brain-computer interface development across the globe.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://github.com/pieeg-club"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 text-white font-semibold shadow-lg shadow-green-500/30 transition-all"
              >
                <GitFork className="w-5 h-5" />
                Browse All Examples on GitHub
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold transition-all"
              >
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-10 sm:py-14 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Research Applications
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Our open-source EEG platforms have been featured in <strong>11+ peer-reviewed scientific papers</strong> and continue to enable cutting-edge research in cognitive neuroscience, brain-computer interfaces, affective computing, neurological disorder studies, and machine learning with EEG data.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <h3 className="text-2xl font-bold mb-6">Real-World Projects</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2 text-cyan-600 dark:text-cyan-400">Mind-Controlled Robotics</h4>
                  <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                    <li>• Brain-controlled robotic arms using motor imagery</li>
                    <li>• EEG-driven wheelchair navigation</li>
                    <li>• Thought-controlled drones</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-2 text-blue-600 dark:text-blue-400">Health & Wellness</h4>
                  <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                    <li>• Real-time stress monitoring systems</li>
                    <li>• Meditation and focus tracking applications</li>
                    <li>• Sleep quality analysis tools</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <h3 className="text-2xl font-bold mb-6">More Applications</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2 text-purple-600 dark:text-purple-400">Gaming & Entertainment</h4>
                  <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                    <li>• Brain-controlled video games</li>
                    <li>• Neurofeedback training systems</li>
                    <li>• Interactive art installations</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-2 text-green-600 dark:text-green-400">Education & Research</h4>
                  <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                    <li>• University neuroscience labs (50+ institutions)</li>
                    <li>• Student research projects</li>
                    <li>• Hackathon prototypes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center p-8 rounded-2xl bg-linear-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border border-cyan-200 dark:border-cyan-800">
            <h3 className="text-2xl font-bold mb-4">Media Features</h3>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6">
              PiEEG has been featured in <strong>28+ media outlets and podcasts</strong>, including tech publications, neuroscience journals, educational platforms, and innovation showcases.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              Browse our{" "}
              <Link href="https://github.com/pieeg-club" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                GitHub repositories
              </Link>{" "}
              for code examples, datasets, and tutorials. Join our{" "}
              <Link href="https://discord.gg/neJ45FR6Sv" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                Discord community
              </Link>{" "}
              to share your projects and get support from fellow developers and researchers.
            </p>
          </div>
        </div>
      </section>

      {/* Live Dashboard Experiences */}
      <section className="py-10 sm:py-14 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Live Dashboard Experiences
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Interactive BCI experiences built on PiEEG hardware. Click any card to explore its source code on GitHub.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveExperiences.map((exp) => {
              const Icon = exp.icon;
              return (
                <a
                  key={exp.slug}
                  href={`${BASE_EXP_URL}/${exp.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg transition-all"
                >
                  <div className={`h-1.5 bg-linear-to-r ${exp.gradient}`} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2 rounded-lg bg-linear-to-br ${exp.gradient}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {exp.name}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 flex-1 mb-4">
                      {exp.description}
                    </p>
                    <span className="self-start px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {exp.tag}
                    </span>
                  </div>
                </a>
              );
            })}

            {comingSoonExperiences.map((exp, i) => (
              <div
                key={i}
                className="flex flex-col rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 overflow-hidden opacity-60"
              >
                <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800">
                      <Activity className="w-5 h-5 text-zinc-400" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                      Coming Soon
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-zinc-500 dark:text-zinc-400">
                    {exp.name}
                  </h3>
                  <p className="text-sm text-zinc-400 dark:text-zinc-500 flex-1 mb-4">
                    {exp.description}
                  </p>
                  <span className="self-start px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                    {exp.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-10 sm:py-14 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Recommended Learning Path
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              New to biosignals? Start here
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-6 p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Install & Setup</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Install pieeg-server, connect hardware, and stream your first signal
                </p>
                <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                  10 minutes
                </span>
              </div>
            </div>

            <div className="flex gap-6 p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Signal Processing Basics</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Learn filtering, FFT, and band power calculation
                </p>
                <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  1 hour
                </span>
              </div>
            </div>

            <div className="flex gap-6 p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Build Your First BCI</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Alpha neurofeedback or basic gesture recognition
                </p>
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                  2-3 hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-linear-to-br from-green-500 via-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to build?
          </h2>
          <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
            All examples include full source code, explanations, and troubleshooting tips.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/pieeg-club/pieeg-examples"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-cyan-600 hover:bg-zinc-100 font-bold shadow-xl transition-all"
            >
              <GitFork className="w-5 h-5" />
              Fork on GitHub
            </a>
            <Link
              href="/support"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white hover:bg-white/10 font-bold transition-all"
            >
              Read the Docs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
