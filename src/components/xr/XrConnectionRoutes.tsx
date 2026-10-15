"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Copy,
  Monitor,
  Server,
  Radio,
  Smartphone,
  ArrowRight,
  ExternalLink,
  Terminal,
  Bluetooth,
} from "lucide-react";

const ROUTES = [
  {
    id: "cloud-mirror",
    num: "01",
    badge: "Fastest · Zero Install",
    title: "Cloud on PC + Desktop Mirror",
    subtitle: "Web Bluetooth in Chrome/Edge, mirrored into the headset",
    Icon: Monitor,
    accent: "text-cyan-600 dark:text-cyan-400",
    summary:
      "Desktop Chrome and Edge support Web Bluetooth natively. Pair PiEEG XR or PiEEG XR-16 directly at cloud.pieeg.com, then bring your PC desktop into the headset over USB-C Link, Air Link, Virtual Desktop, or Steam Link.",
    steps: [
      "Power the strap-mounted IronBCI box from a 5 V USB-C battery bank (LED on, advertising as PiEEG XR).",
      "On your PC, open cloud.pieeg.com/lobby in Chrome or Edge, click Connect, and pair PiEEG XR over Web Bluetooth.",
      "Mirror your PC desktop into the headset and launch Face Trainer v2, Neural Flight, or Avatar Studio.",
    ],
    snippetTitle: "Browser URL (Chrome / Edge on PC)",
    snippet: `https://cloud.pieeg.com/lobby\n# Click Connect → PiEEG XR (8 ch) or PiEEG XR-16 (16 ch)`,
    docHref: "/tutorials/run-pieeg-xr-meta-quest",
    docLabel: "Full headset walkthrough",
  },
  {
    id: "server-lan",
    num: "02",
    badge: "No Screen Mirroring",
    title: "pieeg-server on PC + Headset Browser",
    subtitle: "PC holds the BLE link; stock headset browser loads HTTP :1617 over Wi-Fi",
    Icon: Server,
    accent: "text-violet-600 dark:text-violet-400",
    summary:
      "The headset's stock browser disables Web Bluetooth, but it renders standard WebSockets at 60 fps. Run pieeg-server on a PC or Raspberry Pi on the same Wi-Fi to handle the BLE link, then open http://<lan-ip>:1617 inside the headset and pin it as a floating spatial window.",
    steps: [
      "Install and start pieeg-server with the IronBCI BLE driver on a machine on the same 5 GHz Wi-Fi.",
      "Note the LAN IP printed at startup (e.g. http://192.168.1.50:1617).",
      "Open that address in the headset's built-in browser and pin the window beside any VR application.",
    ],
    snippetTitle: "Terminal on PC / Raspberry Pi",
    snippet: `pip install pieeg-server\npieeg-server --device ironbci8 --ble-name "PiEEG XR"\n# Then open http://<your-lan-ip>:1617 in the headset browser`,
    docHref: "/server",
    docLabel: "PiEEG Server reference",
  },
  {
    id: "vrchat-osc",
    num: "03",
    badge: "Social VR · Avatar Sync",
    title: "VRChat Avatar over UDP OSC (:9000)",
    subtitle: "Cloud + Local Bridge (WebRTC→UDP) or pieeg-server --osc",
    Icon: Radio,
    accent: "text-amber-600 dark:text-amber-400",
    summary:
      "Drive VRChat avatar expression parameters (/avatar/parameters/EEG_*) and the chatbox bubble in real time. Train contrastive mappings in Avatar Foundation v2 or stream per-region band powers directly over UDP port 9000.",
    steps: [
      "Path A (Browser): Connect PiEEG XR in Cloud, run the 5 MB Rust pieeg-local-bridge, and paste the 6-character pairing code.",
      "Path B (Python): Run pieeg-server --device ironbci8 --osc (add --osc-regions-setup for Frontal / Zygomatic groups).",
      "In VRChat, enable Action Menu → Options → OSC → Enabled. Parameters normalize to [0, 1] over a rolling 5-minute window.",
    ],
    snippetTitle: "Direct OSC via pieeg-server (or use Local Bridge with Cloud)",
    snippet: `pieeg-server --device ironbci8 --osc --osc-interval 0.016 --osc-mode parameters\n# Or configure per-region groups:\npieeg-server --osc --osc-regions-setup`,
    docHref: "/tutorials/brain-reactive-vrchat-avatar",
    docLabel: "Brain-reactive VRChat tutorial",
  },
  {
    id: "headset-native",
    num: "04",
    badge: "Standalone · No PC",
    title: "On-Headset Native BLE (BodyPress or Chromium)",
    subtitle: "Pair directly from the headset's Android BLE stack",
    Icon: Smartphone,
    accent: "text-emerald-600 dark:text-emerald-400",
    summary:
      "For untethered sessions with no PC on the network, install BodyPress from the headset store for offline 3D signal monitoring and electrode health, or sideload the ARM64 Chromium APK once via ADB / SideQuest to unlock Web Bluetooth directly inside the headset.",
    steps: [
      "Option A (BodyPress): Install BodyPress on the headset, open Live Signal, and pair PiEEG XR over Bluetooth.",
      "Option B (Chromium APK): Sideload ARM64 Chromium via ADB or SideQuest so Web Bluetooth is enabled in-headset.",
      "Open https://cloud.pieeg.com/lobby inside headset Chromium and pair PiEEG XR directly.",
    ],
    snippetTitle: "Optional: sideload ARM64 Chromium for in-headset Web Bluetooth",
    snippet: `adb install -r chromium-arm64.apk\n# Launch Chromium in headset → https://cloud.pieeg.com/lobby`,
    docHref: "/tutorials/ble-quest-chromium-pieeg-xr",
    docLabel: "On-headset Chromium BLE guide",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-zinc-400" />
          Copy
        </>
      )}
    </button>
  );
}

export default function XrConnectionRoutes() {
  const [activeId, setActiveId] = useState<string>("cloud-mirror");
  const active = ROUTES.find((r) => r.id === activeId) ?? ROUTES[0];

  return (
    <section
      id="xr-routes"
      className="scroll-mt-20 py-14 sm:py-16 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/25"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3">
              [02 · 4 HEADSET CONNECTION ROUTES]
            </p>
            <h2 className="title-section text-zinc-900 dark:text-zinc-50">
              Four ways to get BLE 5 from the mask into your headset
            </h2>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-3xl">
              Stock standalone headset browsers disable Web Bluetooth. Pick the path that matches your session:
              desktop Web Bluetooth with Link mirroring, a local <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">pieeg-server</code> over
              Wi-Fi, UDP OSC into VRChat, or direct on-headset BLE via BodyPress / ARM64 Chromium.
            </p>
          </div>
          <Link
            href="/tutorials/run-pieeg-xr-meta-quest"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shrink-0 self-start lg:self-auto"
          >
            Complete Headset Guide
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 route selector cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          {ROUTES.map((r) => {
            const Icon = r.Icon;
            const isSelected = r.id === active.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveId(r.id)}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-violet-500 dark:border-violet-400 bg-white dark:bg-zinc-900 shadow-md ring-1 ring-violet-500/30"
                    : "border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-zinc-400">ROUTE {r.num}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    {r.badge}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-1">
                  <Icon className={`w-4 h-4 shrink-0 ${r.accent}`} />
                  <span>{r.title}</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{r.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Active route detail panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-violet-600 dark:text-violet-400 font-semibold">
                  Route {active.num} · {active.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                  <Bluetooth className="w-3.5 h-3.5 text-cyan-500" /> BLE 5 · 250 SPS
                </span>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{active.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5">{active.summary}</p>

              <ol className="space-y-3">
                {active.steps.map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-mono font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
              <Link
                href={active.docHref}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
              >
                {active.docLabel}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="https://docs.pieeg.com/hardware/devices/PiEEG_XR/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              >
                docs.pieeg.com/hardware/devices/PiEEG_XR
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/90 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <Terminal className="w-4 h-4 text-violet-400" />
                  <span>{active.snippetTitle}</span>
                </div>
                <CopyButton text={active.snippet} />
              </div>
              <pre className="p-4 sm:p-5 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                {active.snippet}
              </pre>
            </div>

            <div className="p-4 border-t border-zinc-800 bg-zinc-900/40 grid grid-cols-3 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 block">BLE name</span>
                <span className="text-zinc-200 font-semibold">PiEEG XR</span>
              </div>
              <div className="p-2 rounded bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 block">16-ch BLE</span>
                <span className="text-cyan-400 font-semibold">PiEEG XR-16</span>
              </div>
              <div className="p-2 rounded bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 block">Supply</span>
                <span className="text-emerald-400 font-semibold">5 V USB-C</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
