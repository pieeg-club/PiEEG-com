import { Metadata } from "next";
import Link from "next/link";
import { Code2, Brain, Activity, Eye, Zap, GitFork } from "lucide-react";

export const metadata: Metadata = {
  title: "Examples — PiEEG",
  description:
    "Real-world examples, tutorials, and BCI applications built with PiEEG hardware. From basic signal acquisition to advanced brain-computer interfaces.",
};

const categories = [
  {
    icon: Brain,
    title: "EEG Applications",
    description: "Brain signal processing and BCI paradigms",
    gradient: "from-purple-500 to-pink-600",
    examples: [
      { name: "Alpha Wave Neurofeedback", difficulty: "Beginner", time: "30 min" },
      { name: "P300 Speller", difficulty: "Intermediate", time: "2 hrs" },
      { name: "Motor Imagery Classifier", difficulty: "Advanced", time: "4 hrs" },
      { name: "Sleep Stage Detection", difficulty: "Intermediate", time: "3 hrs" }
    ]
  },
  {
    icon: Activity,
    title: "EMG Control",
    description: "Muscle signal processing for gesture recognition",
    gradient: "from-cyan-500 to-blue-600",
    examples: [
      { name: "Basic Gesture Recognition", difficulty: "Beginner", time: "45 min" },
      { name: "Prosthetic Hand Control", difficulty: "Advanced", time: "5 hrs" },
      { name: "Muscle Fatigue Monitor", difficulty: "Intermediate", time: "2 hrs" },
      { name: "Hand Pose Classification", difficulty: "Advanced", time: "4 hrs" }
    ]
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Live filtering, FFT, and feature extraction",
    gradient: "from-green-500 to-emerald-600",
    examples: [
      { name: "50/60 Hz Notch Filter", difficulty: "Beginner", time: "20 min" },
      { name: "Real-time FFT Visualization", difficulty: "Beginner", time: "30 min" },
      { name: "Band Power Calculation", difficulty: "Intermediate", time: "1 hr" },
      { name: "ICA Artifact Removal", difficulty: "Advanced", time: "3 hrs" }
    ]
  },
  {
    icon: Eye,
    title: "Multimodal Systems",
    description: "Combining EEG, EMG, ECG, and EOG",
    gradient: "from-orange-500 to-red-600",
    examples: [
      { name: "Heart Rate + Brain Activity", difficulty: "Intermediate", time: "2 hrs" },
      { name: "Gaze-Directed BCI", difficulty: "Advanced", time: "6 hrs" },
      { name: "Stress Detection System", difficulty: "Intermediate", time: "3 hrs" },
      { name: "Full Polysomnography", difficulty: "Advanced", time: "8 hrs" }
    ]
  }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50 mb-6">
              <Code2 className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                Examples & Tutorials
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
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
      <section className="py-20 sm:py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Research Applications
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Our open-source EEG platforms have been featured in <strong>11+ peer-reviewed scientific papers</strong> and continue to enable cutting-edge research in cognitive neuroscience, brain-computer interfaces, affective computing, neurological disorder studies, and machine learning with EEG data.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
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

      {/* Example Categories */}
      <section className="py-20 sm:py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Examples by Category
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Step-by-step tutorials for every skill level
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {categories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden"
                >
                  <div className={`p-6 bg-linear-to-r ${category.gradient}`}>
                    <div className="flex items-center gap-4 text-white">
                      <Icon className="w-8 h-8" />
                      <div>
                        <h3 className="text-2xl font-bold">{category.title}</h3>
                        <p className="text-white/90 text-sm">{category.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <ul className="space-y-3">
                      {category.examples.map((example, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-between p-4 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all group cursor-pointer"
                        >
                          <div>
                            <div className="font-semibold text-sm group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                              {example.name}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                              {example.time}
                            </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            example.difficulty === 'Beginner' ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400' :
                            example.difficulty === 'Intermediate' ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400' :
                            'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400'
                          }`}>
                            {example.difficulty}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-20 sm:py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
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
      <section className="py-20 bg-linear-to-br from-green-500 via-cyan-600 to-blue-600 text-white">
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
