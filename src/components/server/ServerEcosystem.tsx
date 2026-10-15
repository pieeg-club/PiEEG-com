import Link from "next/link";
import {
  Scale,
  Code2,
  Radio,
  Webhook,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Server,
  Code2 as Github,
  Terminal,
  Play,
} from "lucide-react";

const COMPARISON_ROWS = [
  {
    dim: "Installation",
    cloud: "Open cloud.pieeg.com in Chrome, Edge, Brave, or Opera",
    server: "pip install pieeg-server (Python 3.10+)",
  },
  {
    dim: "Hardware input",
    cloud: "Web Bluetooth (IronBCI 8/16, XR, Octopus-16); Web Serial (IronBCI-32, Kraken-48)",
    server: "SPI shields (PiEEG-8/16, JNEEG) plus BLE and USB serial boards",
  },
  {
    dim: "Where DSP runs",
    cloud: "Client-side in the tab (Hampel, Butterworth IIR, Worker FFT)",
    server: "Optional server-side IIR; dashboard still does client-side FFT",
  },
  {
    dim: "Local app output",
    cloud: "WebRTC P2P to Local Bridge → UDP OSC",
    server: "Native LSL (--lsl), OSC (--osc), HTTP webhooks",
  },
  {
    dim: "AI copilot",
    cloud: "Buddy at buddy.pieeg.com (in-tab, read-only tools)",
    server: "PiEEG Agent over LSL + MCP (pieeg-server --lsl, then pieeg-agent mcp)",
  },
  {
    dim: "License",
    cloud: "Dashboard UI MIT; hosted relay is opt-in",
    server: "MIT (pieeg-server, pieeg.js, dashboard source)",
  },
];

export default function ServerEcosystem() {
  return (
    <>
      <section
        id="mit-ecosystem"
        className="scroll-mt-20 py-14 sm:py-16 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
              [03 · MIT LICENSE &amp; ECOSYSTEM]
            </p>
            <h2 className="title-section text-zinc-900 dark:text-zinc-50">
              Software is MIT.
            </h2>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              pieeg-server, the dashboard source, and pieeg.js are published under the MIT license. You may use,
              modify, and redistribute that code, including in commercial products, subject to the license text in the
              repository.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50">
              <Scale className="w-5 h-5 text-cyan-500 mb-3" />
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">What MIT covers</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                The Python package, WebSocket protocol, committed dashboard build, pieeg.js, and examples in{" "}
                <a
                  href="https://github.com/pieeg-club/PiEEG-server"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  pieeg-club/PiEEG-server
                </a>
                . LICENSE file in that repo is the source of truth.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50">
              <Code2 className="w-5 h-5 text-violet-500 mb-3" />
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">pieeg.js</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Zero-dependency browser library in the same repo.{" "}
                <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">connectBLE()</code>{" "}
                /{" "}
                <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">connectSerial()</code>{" "}
                must run from a user gesture. CDN: jsDelivr{" "}
                <code className="font-mono text-[11px]">PiEEG-server@main/pieeg.js</code>.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50">
              <Radio className="w-5 h-5 text-amber-500 mb-3" />
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Local by default</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Acquisition, filtering, recording, and the dashboard run on the machine that started the process.
                Cloud relay, session upload, and Buddy keys are separate, opt-in surfaces.{" "}
                <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">--auth</code> is a
                local 6-digit gate, not a cloud account.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              {
                title: "Lab Streaming Layer",
                desc: "Raw samples on the LAN. OpenViBE, MNE-LSL, LabRecorder, BCI2000, NeuroPype.",
                flag: "--lsl",
                Icon: Radio,
              },
              {
                title: "OSC",
                desc: "Band powers to UDP :9000. Chatbox and /avatar/parameters, including per-region groups.",
                flag: "--osc",
                Icon: Radio,
              },
              {
                title: "Webhooks",
                desc: "HTTP POST when a band, ratio, or amplitude rule matches. Dashboard wizard for IFTTT and Zapier.",
                flag: "webhooks.json",
                Icon: Webhook,
              },
              {
                title: "Jupyter",
                desc: "CSV on disk, or stream live. notebooks/ in the repo. Agent can generate notebooks over LSL.",
                flag: "notebooks/",
                Icon: BookOpen,
              },
            ].map((item) => {
              const Icon = item.Icon;
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50"
                >
                  <Icon className="w-4 h-4 text-cyan-500 mb-3" />
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-1">{item.title}</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">{item.desc}</p>
                  <code className="text-[11px] px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
                    {item.flag}
                  </code>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
                <Server className="w-4 h-4 text-cyan-500" />
                Self-hosted server vs browser-native Cloud
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Same React dashboard UI · MIT licensed
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 font-mono text-xs">
                    <th className="py-3 px-4 sm:px-5 font-semibold">Layer</th>
                    <th className="py-3 px-4 sm:px-5 font-semibold text-violet-600 dark:text-violet-400">
                      pieeg-server
                    </th>
                    <th className="py-3 px-4 sm:px-5 font-semibold text-cyan-600 dark:text-cyan-400">
                      PiEEG Cloud
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {COMPARISON_ROWS.map((r) => (
                    <tr key={r.dim}>
                      <td className="py-3.5 px-4 sm:px-5 font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                        {r.dim}
                      </td>
                      <td className="py-3.5 px-4 sm:px-5 text-zinc-600 dark:text-zinc-300">{r.server}</td>
                      <td className="py-3.5 px-4 sm:px-5 text-zinc-600 dark:text-zinc-400">{r.cloud}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-zinc-50/50 dark:bg-zinc-900/25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="title-section text-zinc-900 dark:text-zinc-50 mb-3">
            Start the process, then open :1617
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 mb-7 max-w-2xl mx-auto">
            No board: <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">pieeg-server --mock</code>.
            Hardware: pass <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">--device</code>.
            The dashboard and the WebSocket share that process.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#install-cli"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-sm transition-colors shadow-md shadow-cyan-500/20"
            >
              <Terminal className="w-4 h-4" />
              Install commands
            </a>
            <a
              href="https://cloud.pieeg.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold text-sm hover:bg-white dark:hover:bg-zinc-900 transition-colors"
            >
              <Play className="w-4 h-4 text-amber-500" />
              Dashboard demo
            </a>
            <a
              href="https://github.com/pieeg-club/PiEEG-server"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold text-sm hover:bg-white dark:hover:bg-zinc-900 transition-colors"
            >
              <Github className="w-4 h-4" />
              Source
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
            <Link
              href="/cloud"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold text-sm hover:bg-white dark:hover:bg-zinc-900 transition-colors"
            >
              Cloud page
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
