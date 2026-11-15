import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Camera,
  CircuitBoard,
  Cloud,
  Cpu,
  Eye,
  FlaskConical,
  Glasses,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Monitor,
  Radio,
  School,
  Shield,
  Smartphone,
  Sparkles,
  Terminal,
  Watch,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About — PiEEG",
  description:
    "PiEEG is a full-stack biosignal ecosystem — from 8-to-48 channel EEG/EMG/ECG/EOG hardware to cloud, XR, AI agents, and physical AI. Founded by Ildar Rakhmatulin, PhD and Youssef El Abbassi.",
};

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const founders: {
  name: string;
  role: string;
  location: string;
  photo: string;
  photoPosition: string;
  photoClass?: string;
  email: string;
  github: string;
  linkedin: string;
  scholar: string;
  bio: string[];
  notes: string[];
}[] = [
  {
    name: "Ildar Rakhmatulin",
    role: "Co-Founder & Lead Engineer",
    location: "Edinburgh, Scotland, UK",
    photo: "/ildar.png",
    photoPosition: "50% 18%",
    email: "ildar@pieeg.com",
    github: "https://github.com/Ildaron",
    linkedin: "https://www.linkedin.com/in/ildar-rakhmatulin-262a66112",
    scholar: "https://scholar.google.com/citations?user=L8q-KSoAAAAJ&hl=en",
    bio: [
      "PhD scientist, engineer, and entrepreneur in bioscience. With an academic background spanning Imperial College London, Heriot-Watt University, and the University of Edinburgh, Ildar has published numerous papers on deep neural networks for EEG feature extraction, low-cost brain-computer interfaces, and applied AI. His work is widely cited in neurotechnology and BCI research. He launched PiEEG on CrowdSupply and raised 5× the initial goal.",
    ],
    notes: [
      "PhD",
      "Hardware Design",
      "Signal Processing",
      "Machine Learning",
      "Udemy Instructor",
    ],
  },
  {
    name: "Youssef El Abbassi",
    role: "Co-Founder & CTO",
    location: "Gatineau, Quebec, Canada",
    photo: "/youssef.jpeg",
    photoPosition: "50% 20%",
    email: "youssef@pieeg.com",
    github: "https://github.com/yelabb/",
    linkedin: "https://www.linkedin.com/in/yelabb",
    scholar: "https://scholar.google.ca/citations?user=qGJWrOYAAAAJ",
    bio: [
      "Software architect and BCI developer building the open-source software ecosystem around PiEEG. Creator of PiEEG-Server, he is focused on making advanced brain-computer interface tools more accessible to developers, researchers, and creators.",
    ],
    notes: [
      "Real-Time Systems",
      "PiEEG-Server",
      "Open Source",
      "Edge AI",
      "XR",
      "Web",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
            About PiEEG
          </p>
          <h1 className="title-hero mb-6 max-w-4xl text-zinc-900 dark:text-zinc-50">
            A biosignal company built by people who design both the instrument and the stack.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            PiEEG makes research-grade EEG, EMG, ECG, and EOG hardware, and the software to acquire, stream, and interpret those signals. Labs and product teams use it when they need biosignal data without years of custom electronics.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-zinc-200 bg-zinc-50/40 py-16 sm:py-24 dark:border-zinc-800 dark:bg-zinc-950">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="h-72 w-160 rounded-full bg-linear-to-r from-cyan-500/10 via-violet-500/10 to-emerald-500/10 blur-3xl dark:from-cyan-400/12 dark:via-violet-500/12 dark:to-emerald-400/10" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">
                <span className="size-1.5 rounded-full bg-cyan-500 animate-ping" />
                What we built
              </p>
              <h2 className="title-section text-zinc-900 dark:text-zinc-50">
                One ecosystem. Electrode to everything.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Hardware, cloud, AI, XR, wearables, and robotics — designed together and shipped open.
            </p>
          </div>
        </div>

        {/* Animated floating bubble streams */}
        <div className="relative mt-12 space-y-3.5 marquee-fade">
          {[
            [
              { label: "PiEEG-8 & 16", tag: "RPi Shield", href: "/hardware/pieeg", Icon: Cpu, dot: "bg-cyan-500" },
              { label: "Octopus-16", tag: "Coin 16-ch BLE", href: "/hardware/octopus-16", Icon: Radio, dot: "bg-cyan-400" },
              { label: "IronBCI-32", tag: "32-ch Pro", href: "/hardware/ironbci-32", Icon: Layers, dot: "bg-blue-500" },
              { label: "PiEEG XR", tag: "VR Face BCI", href: "/xr", Icon: Glasses, dot: "bg-violet-500" },
              { label: "Aura VR", tag: "EMG Wristband", href: "https://aura.pieeg.com", Icon: Watch, dot: "bg-purple-500", external: true },
              { label: "ArdEEG & JNEEG", tag: "Arduino · Jetson", href: "/hardware", Icon: CircuitBoard, dot: "bg-sky-500" },
              { label: "MicroBCI", tag: "STM32", href: "/hardware/microbci", Icon: Cpu, dot: "bg-teal-500" },
              { label: "OctoBio Kit", tag: "16-ch Lab Kit", href: "/hardware/octobio-kit", Icon: Sparkles, dot: "bg-cyan-500" },
            ],
            [
              { label: "PiEEG Cloud", tag: "Zero-Install Web", href: "/cloud", Icon: Cloud, dot: "bg-violet-500" },
              { label: "Buddy AI + MCP", tag: "Neural Copilot", href: "/agent", Icon: Bot, dot: "bg-fuchsia-500" },
              { label: "PiEEG Studio", tag: "MNE & MOABB in Browser", href: "https://cloud.pieeg.com", Icon: FlaskConical, dot: "bg-indigo-500", external: true },
              { label: "PiEEG Server", tag: "Real-Time Stream", href: "/server", Icon: Globe, dot: "bg-cyan-500" },
              { label: "Oculomotor Bench", tag: "Pupillometry & EOG", href: "https://cloud.pieeg.com/experiences/oculomotor-bench", Icon: Eye, dot: "bg-emerald-500", external: true },
              { label: "Optical rPPG Bench", tag: "Webcam + Live EEG", href: "https://cloud.pieeg.com/experiences/optical-physiological-bench", Icon: Camera, dot: "bg-teal-500", external: true },
              { label: "pieeg.js", tag: "Web Serial & BLE SDK", href: "/server", Icon: Zap, dot: "bg-amber-500" },
              { label: "BLE Web Flasher", tag: "OTA Firmware", href: "https://firmware.pieeg.com", Icon: Cpu, dot: "bg-blue-500", external: true },
            ],
            [
              { label: "OctoKin", tag: "ROS 2 & NVIDIA Isaac", href: "/news/octokin-open-source-physical-ai", Icon: Bot, dot: "bg-emerald-500" },
              { label: "OpenClaw", tag: "Robotic Control", href: "/news/openclaw-brain-control", Icon: CircuitBoard, dot: "bg-teal-500" },
              { label: "octoWatch", tag: "Garmin Connect IQ", href: "https://apps.garmin.com/apps/8e994535-c853-45ca-abe3-ccef61119c8b", Icon: Watch, dot: "bg-cyan-500", external: true },
              { label: "BodyPress", tag: "Meta Quest & Mobile", href: "https://www.meta.com/experiences/bodypress/1271355469389420", Icon: Smartphone, dot: "bg-purple-500", external: true },
              { label: "1020 Academy", tag: "Interactive BCI", href: "https://1020.pieeg.com", Icon: School, dot: "bg-amber-500", external: true },
              { label: "bioIDE", tag: "Live EEG JS", href: "https://ide.pieeg.com", Icon: Terminal, dot: "bg-pink-500", external: true },
              { label: "Bio-Pen & octoBridge", tag: "Live DSP Lab", href: "https://cloud.pieeg.com/lab", Icon: FlaskConical, dot: "bg-violet-500", external: true },
              { label: "Browser Extension", tag: "Live Web Overlay", href: "/browser", Icon: Monitor, dot: "bg-sky-500" },
              { label: "GPS/GNSS Sync", tag: "Global Hyperscanning", href: "/news/gps-gnss-global-eeg-synchronization", Icon: Globe, dot: "bg-emerald-400" },
            ],
          ].map((row, rowIndex) => {
            const loop = [...row, ...row];
            return (
              <div key={rowIndex} className="flex overflow-hidden py-1">
                <div
                  className={`flex w-max items-center gap-3.5 px-2 ${
                    rowIndex % 2 === 1
                      ? "animate-scroll-slow-reverse"
                      : "animate-scroll-slow"
                  }`}
                >
                  {loop.map((item, idx) => {
                    const Icon = item.Icon;
                    const pillClass =
                      "group inline-flex items-center gap-3 rounded-full border border-zinc-200/90 bg-white/90 px-4 py-2.5 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/50 hover:shadow-md hover:shadow-cyan-500/10 dark:border-zinc-800/90 dark:bg-zinc-900/85 dark:hover:border-cyan-400/50";
                    const content = (
                      <>
                        <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 transition-colors group-hover:bg-cyan-500/15 group-hover:text-cyan-600 dark:bg-zinc-800 dark:text-zinc-200 dark:group-hover:text-cyan-300">
                          <Icon className="size-4" />
                          <span
                            className={`absolute -top-0.5 -right-0.5 size-2 rounded-full ring-2 ring-white dark:ring-zinc-900 ${item.dot}`}
                          />
                        </span>
                        <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                          {item.label}
                        </span>
                        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-500 dark:bg-zinc-800/90 dark:text-zinc-400">
                          {item.tag}
                        </span>
                      </>
                    );

                    return "external" in item && item.external ? (
                      <a
                        key={`${item.label}-${idx}`}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={pillClass}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link
                        key={`${item.label}-${idx}`}
                        href={item.href}
                        className={pillClass}
                      >
                        {content}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-zinc-200 sm:grid-cols-4 dark:bg-zinc-800">
          {[
            { value: "2022", label: "Founded", detail: "Edinburgh, Scotland" },
            { value: "9", label: "Biosignal boards", detail: "8–48 channels" },
            { value: "12+", label: "Peer-reviewed papers", detail: "by our founders" },
            { value: "NVIDIA", label: "Inception", detail: "startup program member" },
          ].map((fact) => (
            <div key={fact.label} className="bg-white px-5 py-8 dark:bg-zinc-950">
              <div className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {fact.value}
              </div>
              <div className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {fact.label}
              </div>
              <div className="mt-0.5 text-xs text-zinc-500">{fact.detail}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
            Leadership
          </p>
          <h2 className="title-section mb-4 text-zinc-900 dark:text-zinc-50">
            Founders
          </h2>
          <p className="mb-14 max-w-2xl text-[17px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            Hardware science in Edinburgh. Software architecture in Canada. One platform from electrode to application.
          </p>

          <div className="space-y-20">
            {founders.map((person, index) => (
              <article
                key={person.email}
                className={`grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 ${
                  index === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      width={720}
                      height={900}
                      sizes="(min-width: 1024px) 420px, 100vw"
                      className={`aspect-4/5 w-full object-cover ${person.photoClass ?? ""}`}
                      style={{ objectPosition: person.photoPosition }}
                    />
                  </div>
                </div>

                <div className="lg:pt-4">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
                    {person.role}
                  </p>
                  <h3 className="title-subsection mt-2 mb-3 text-zinc-900 dark:text-zinc-50">
                    {person.name}
                  </h3>
                  <p className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {person.location}
                  </p>

                  <div className="space-y-4 text-[16px] leading-[1.7] text-zinc-600 dark:text-zinc-400">
                    {person.bio.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>

                  <ul className="mt-8 space-y-2 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                    {person.notes.map((item) => (
                      <li key={item} className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950 dark:text-zinc-300 dark:decoration-zinc-600 dark:hover:text-zinc-50"
                    >
                      <LinkedInIcon className="size-3.5" />
                      LinkedIn
                    </a>
                    <a
                      href={person.scholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950 dark:text-zinc-300 dark:decoration-zinc-600 dark:hover:text-zinc-50"
                    >
                      <GraduationCap className="size-3.5" />
                      Scholar
                    </a>
                    <a
                      href={person.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950 dark:text-zinc-300 dark:decoration-zinc-600 dark:hover:text-zinc-50"
                    >
                      <GitHubIcon className="size-3.5" />
                      GitHub
                    </a>
                    <a
                      href={`mailto:${person.email}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950 dark:text-zinc-300 dark:decoration-zinc-600 dark:hover:text-zinc-50"
                    >
                      <Mail className="size-3.5" />
                      Email
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 py-16 sm:py-20 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
            The company
          </p>
          <h2 className="title-section mb-4 text-zinc-900 dark:text-zinc-50">
            Where we work
          </h2>
          <p className="mb-10 max-w-2xl text-[16px] leading-[1.7] text-zinc-600 dark:text-zinc-400">
            PiEEG is based in Edinburgh. Software is built in Canada. Hardware is manufactured with Elecrow, with distribution in China.
          </p>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-800">
            {[
              {
                title: "Headquarters",
                body: "Edinburgh, Scotland",
              },
              {
                title: "Software",
                body: "Gatineau, Quebec",
              },
              {
                title: "China",
                body: "pieeg.cn",
                href: "https://www.pieeg.cn/",
              },
              {
                title: "Manufacturing",
                body: "Elecrow",
                href: "https://www.elecrow.com/catalogsearch/result/?q=pieeg",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 dark:bg-zinc-950">
                <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </h3>
                {"href" in item && item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-500 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-900 dark:text-zinc-400 dark:decoration-zinc-600 dark:hover:text-zinc-50"
                  >
                    {item.body}
                  </a>
                ) : (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.body}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-red-200 bg-red-50 py-10 dark:border-red-900/60 dark:bg-red-950/20">
        <div className="mx-auto flex max-w-5xl items-start gap-4 px-4 sm:px-6 lg:px-8">
          <Shield className="mt-0.5 size-5 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
          <div>
            <p className="mb-1 font-semibold text-red-900 dark:text-red-100">
              Not a medical device
            </p>
            <p className="text-sm leading-relaxed text-red-800 dark:text-red-200">
              PiEEG products are not FDA or CE approved medical devices. They are intended for education, research, and engineering only. Read our{" "}
              <Link href="/liability" className="underline font-semibold">
                liability statement
              </Link>{" "}
              before purchase or use.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="title-section mb-4 text-zinc-900 dark:text-zinc-50">
            Work with us
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-zinc-500 dark:text-zinc-400">
            Research groups, universities, and companies use PiEEG as the biosignal layer so they can focus on the application.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/partnership"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-7 py-3 font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Discuss a partnership
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/hardware"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-7 py-3 font-semibold transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Explore our hardware
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
