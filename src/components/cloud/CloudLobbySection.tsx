import Link from "next/link";
import {
  Bluetooth,
  Usb,
  Cpu,
  Glasses,
  Watch,
  CircuitBoard,
  Play,
  KeyRound,
  ArrowRight,
  ExternalLink,
  Terminal,
  Activity,
  Sliders,
} from "lucide-react";

const LOBBY_DEVICES = [
  {
    name: "IronBCI",
    spec: "8-ch · 250 Hz · 24-bit",
    adc: "1 × ADS1299",
    transport: "Web Bluetooth",
    connectId: "ble:ironbci",
    Icon: Bluetooth,
    gradient: "from-cyan-500 to-blue-600",
    hwHref: "/hardware/ironbci",
    desc: "Standalone 8-channel wireless wearable for scalp EEG, EOG, EMG, and ECG.",
  },
  {
    name: "IronBCI-16",
    spec: "16-ch · 250 Hz · 24-bit",
    adc: "2 × ADS1299",
    transport: "Web Bluetooth",
    connectId: "ble:ironbci16",
    Icon: Bluetooth,
    gradient: "from-blue-500 to-indigo-600",
    hwHref: "/hardware/ironbci",
    desc: "Dual-chip 16-channel BLE acquisition for full 10-20 scalp montages.",
  },
  {
    name: "PiEEG XR",
    spec: "8-ch · 250 Hz · Face Mask",
    adc: "ADS1299 + STM32WB",
    transport: "Web Bluetooth",
    connectId: "ble:ironbci (PiEEG_XR)",
    Icon: Glasses,
    gradient: "from-violet-500 to-purple-600",
    hwHref: "/xr",
    desc: "10 dry Ag/AgCl pads in a VR facial interface. Auto-loads the 3D face montage.",
  },
  {
    name: "PiEEG XR-16",
    spec: "16-ch · 250 Hz · Face + Occipital",
    adc: "2 × ADS1299",
    transport: "Web Bluetooth",
    connectId: "ble:ironbci16",
    Icon: Glasses,
    gradient: "from-purple-500 to-fuchsia-600",
    hwHref: "/xr",
    desc: "Combines facial EMG/EOG mask pads with an occipital visual-cortex cluster.",
  },
  {
    name: "Octopus 16",
    spec: "16-ch · 250 Hz · ESP32-S3",
    adc: "2 × ADS131M08",
    transport: "Web Bluetooth",
    connectId: "ble:octopus16",
    Icon: Cpu,
    gradient: "from-emerald-500 to-teal-600",
    hwHref: "/hardware/octopus-16",
    desc: "Coin-sized spring-loaded pogo-pin array. Flash firmware in-browser, pair over BLE.",
  },
  {
    name: "Kraken-48",
    spec: "48-ch · 250 Hz · 3 × Octopus",
    adc: "6 × ADS131M08",
    transport: "Web Serial (921.6k)",
    connectId: "serial:kraken48",
    Icon: Usb,
    gradient: "from-teal-500 to-cyan-600",
    hwHref: "/news/kraken-link-high-density-wireless-bci",
    desc: "Aggregates three wireless Octopus-16 nodes over a single XIAO ESP32-S3 USB receiver.",
  },
  {
    name: "Aura VR",
    spec: "8-ch sEMG · 6-axis IMU",
    adc: "109-byte BLE frames",
    transport: "Web Bluetooth",
    connectId: "ble:auravr",
    Icon: Watch,
    gradient: "from-amber-500 to-orange-600",
    hwHref: "https://aura.pieeg.com",
    externalHw: true,
    desc: "Wrist/palm sEMG plus gravity-compensated 6-axis IMU with live 3D hand kinematics.",
  },
  {
    name: "IronBCI-32",
    spec: "32-ch · 500 Hz · High-Density",
    adc: "4 × AD7771 + STM32H7",
    transport: "Web Serial (921.6k)",
    connectId: "serial:ironbci32",
    Icon: Usb,
    gradient: "from-fuchsia-500 to-pink-600",
    hwHref: "/hardware/ironbci-32",
    desc: "32-channel wet-electrode research rig speaking the FreeEEG wire protocol over USB.",
  },
  {
    name: "OctoBridge",
    spec: "Sensors & Actuators · UNO",
    adc: "ATmega328P USB + BLE",
    transport: "Web Serial + BLE",
    connectId: "octobridge.pieeg.com",
    Icon: CircuitBoard,
    gradient: "from-sky-500 to-blue-600",
    hwHref: "https://octobridge.pieeg.com",
    externalHw: true,
    desc: "Pairs Octopus-16 EEG with room sensors, relays, servos, and LCD in one classroom tab.",
  },
];

export default function CloudLobbySection() {
  return (
    <section
      id="lobby-devices"
      className="scroll-mt-20 py-14 sm:py-16 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/25"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                [02 · SESSION LOBBY &amp; TRANSPORTS]
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Nine hardware &amp; lab sources. Zero drivers.
            </h2>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
              On load, <code className="font-mono text-xs bg-zinc-200/70 dark:bg-zinc-800 px-1.5 py-0.5 rounded">cloud.pieeg.com/lobby</code> probes
              browser Web Bluetooth and Web Serial readiness, remembers authorized USB serial ports for one-click reconnect,
              and adapts the 3D topomap montage to your board automatically.
            </p>
          </div>
          <a
            href="https://cloud.pieeg.com/lobby"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors shrink-0 self-start md:self-auto"
          >
            Open Live Lobby
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 9 Device Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LOBBY_DEVICES.map((d) => {
            const Icon = d.Icon;
            return (
              <div
                key={d.name}
                className="flex flex-col justify-between p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-linear-to-br ${d.gradient} flex items-center justify-center text-white shadow-sm shrink-0`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
                      {d.transport}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                      {d.name}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                      {d.adc}
                    </span>
                  </div>

                  <p className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5">
                    {d.spec}
                  </p>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
                    {d.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
                  <code className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 truncate">
                    {d.connectId}
                  </code>
                  <div className="flex items-center gap-3 shrink-0">
                    {d.externalHw ? (
                      <a
                        href={d.hwHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                      >
                        Specs
                      </a>
                    ) : (
                      <Link
                        href={d.hwHref}
                        className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                      >
                        Specs
                      </Link>
                    )}
                    <a
                      href={
                        d.name === "OctoBridge"
                          ? "https://octobridge.pieeg.com"
                          : "https://cloud.pieeg.com/lobby"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      Connect
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom 3-column strip: Simulated Streams, PiEEG Server WS, Live Relay */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
          {/* Simulated & Custom Mock */}
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Sliders className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                  No Hardware? Run Synthetic or Custom Mock
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Launch instant in-browser streams (<code className="font-mono text-xs">demo:8</code>,{" "}
                <code className="font-mono text-xs">demo:16</code>,{" "}
                <code className="font-mono text-xs">demo:32</code>,{" "}
                <code className="font-mono text-xs">demo:auravr</code>) or open Mock Studio (<code className="font-mono text-xs">/mock</code>) to stack scripted blinks, bands, 60 Hz mains, and EMG bursts.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-4 text-xs font-semibold">
              <a
                href="https://cloud.pieeg.com/lobby"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                <Play className="w-3.5 h-3.5" /> 8 / 16 / 32 / Aura Demo
              </a>
              <a
                href="https://cloud.pieeg.com/mock"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline"
              >
                Open Mock Studio <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Self-hosted PiEEG Server WebSocket */}
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                  Raspberry Pi &amp; Jetson SPI via WebSocket
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Using PiEEG-8, PiEEG-16, or JNEEG on GPIO SPI? Run{" "}
                <code className="font-mono text-xs">pieeg-server</code> locally (with optional{" "}
                <code className="font-mono text-xs">pieeg-core</code> Rust DSP speedup) and point the Cloud lobby at{" "}
                <code className="font-mono text-xs">ws://raspberrypi.local:1616</code>.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-4 text-xs font-semibold">
              <Link
                href="/server"
                className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                PiEEG Server Guide <ArrowRight className="w-3 h-3" />
              </Link>
              <a
                href="https://firmware.pieeg.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:underline"
              >
                Web Firmware Flasher <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Shared Session & Cloud Library */}
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                  Join a Live Relay or Browse Cloud Library
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Paste a session code or open <code className="font-mono text-xs">/live/:relayId</code> to watch a shared
                experiment in real time with live viewer count, or explore public datasets in{" "}
                <code className="font-mono text-xs">/library</code> with zero login.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-4 text-xs font-semibold">
              <a
                href="https://cloud.pieeg.com/library"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-violet-600 dark:text-violet-400 hover:underline"
              >
                <Activity className="w-3.5 h-3.5" /> Open Cloud Library <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
