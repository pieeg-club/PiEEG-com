import { Metadata } from "next";
import Link from "next/link";
import { Brain, Activity, Heart, Eye, Zap, ArrowRight, Code2, Terminal, Wifi, Play, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "PiEEG Server — Real-time Biosignal Streaming",
  description:
    "Stream EEG, EMG, ECG, EOG at 250–500 Hz over WebSocket. One pip install. Browser dashboard. Works on Raspberry Pi, Linux, macOS, Windows.",
};

const features = [
  {
    icon: Terminal,
    title: "One-Line Install",
    description: "curl -sSL https://raw.githubusercontent.com/pieeg-club/PiEEG-server/main/install.sh | bash",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    icon: Wifi,
    title: "WebSocket Streaming",
    description: "Plain JSON at 250–500 Hz. No SDK, no binary protocol. Works in any language with WebSocket support.",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    icon: Play,
    title: "Live Dashboard",
    description: "React-based web UI with real-time waveforms, FFT, spectrograms, topographic maps, and signal quality monitoring.",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    icon: Database,
    title: "Record & Replay",
    description: "CSV recording with annotations. Session library with playback controls (0.5×–2× speed).",
    gradient: "from-orange-500 to-red-600"
  }
];

const quickStart = [
  {
    step: "1",
    title: "Install",
    code: "pip install pieeg-server",
    description: "Requires Python 3.10+. Auto-detects your hardware.",
    color: "cyan"
  },
  {
    step: "2",
    title: "Stream",
    code: "pieeg-server",
    description: "Starts WebSocket server on :1616 and dashboard on :1617",
    color: "blue"
  },
  {
    step: "3",
    title: "Connect",
    code: "http://raspberrypi.local:1617",
    description: "Open in any browser. Click Connect to start streaming.",
    color: "purple"
  }
];

const devices = [
  {
    name: "PiEEG",
    channels: "8 / 16",
    connection: "SPI",
    command: "pieeg-server",
    description: "Raspberry Pi shield via SPI interface"
  },
  {
    name: "IronBCI",
    channels: "8",
    connection: "Bluetooth LE",
    command: "pieeg-server --device ironbci8",
    description: "Wireless BLE streaming"
  },
  {
    name: "IronBCI-32",
    channels: "32",
    connection: "USB Serial",
    command: "pieeg-server --device ironbci32 --serial-port /dev/ttyACM0",
    description: "High-density USB serial acquisition"
  },
  {
    name: "Mock Mode",
    channels: "16",
    connection: "Simulated",
    command: "pieeg-server --mock",
    description: "Synthetic EEG with alpha rhythm, drift, noise, artifacts"
  }
];

const websocketExample = `import asyncio, json, websockets

async def main():
    async with websockets.connect("ws://raspberrypi.local:1616") as ws:
        async for msg in ws:
            frame = json.loads(msg)
            # frame = {"t": 1711234567.123, "n": 42, "channels": [12.34, -5.67, ...]}
            print(f"Sample #{frame['n']}: {len(frame['channels'])} channels @ {frame['t']}")

asyncio.run(main())`;

const jsExample = `const ws = new WebSocket("ws://raspberrypi.local:1616");

ws.onmessage = (e) => {
  const frame = JSON.parse(e.data);
  console.log(\`#\${frame.n}: \${frame.channels.length} channels\`);
  
  // frame.channels = array of µV values per channel
  // frame.t = Unix timestamp (seconds)
  // frame.n = sample number (monotonic)
};`;

const commands = [
  {
    category: "Filtering",
    description: "Real-time Butterworth bandpass",
    code: `{"cmd": "set_filter", "enabled": true, "lowcut": 1.0, "highcut": 40.0}`
  },
  {
    category: "Recording",
    description: "Start/stop CSV recording",
    code: `{"cmd": "start_record"}
{"cmd": "stop_record"}`
  },
  {
    category: "ADS1299 Registers",
    description: "Live hardware configuration",
    code: `{"cmd": "reg_read"}
{"cmd": "reg_write", "regs": {"0x05": "0x00"}}`
  },
  {
    category: "Webhooks",
    description: "HTTP callbacks on EEG events",
    code: `{"cmd": "webhook_create", "rule": {...}}`
  }
];

const integrations = [
  {
    name: "VRChat OSC",
    description: "Stream band powers to VRChat avatar parameters",
    flag: "--osc",
    icon: "🎮"
  },
  {
    name: "Lab Streaming Layer",
    description: "Compatible with OpenViBE, MNE, LabRecorder",
    flag: "--lsl",
    icon: "🔬"
  },
  {
    name: "IFTTT & Zapier",
    description: "Trigger webhooks when EEG conditions are met",
    flag: "webhooks",
    icon: "⚡"
  },
  {
    name: "Jupyter Notebooks",
    description: "Load CSV or stream live for analysis",
    flag: "notebooks/",
    icon: "📊"
  }
];

const signalTypes = [
  {
    type: "EEG",
    name: "Electroencephalography",
    icon: Brain,
    amplitude: "10–100 µV",
    frequency: "0.5–100 Hz",
    color: "purple",
    bands: ["Delta (0.5–4 Hz)", "Theta (4–8 Hz)", "Alpha (8–13 Hz)", "Beta (13–30 Hz)", "Gamma (30–100 Hz)"]
  },
  {
    type: "EMG",
    name: "Electromyography",
    icon: Activity,
    amplitude: "50–5000 µV",
    frequency: "20–500 Hz",
    color: "cyan",
    bands: ["Motor Units (20–150 Hz)", "High Frequency (150–500 Hz)"]
  },
  {
    type: "ECG",
    name: "Electrocardiography",
    icon: Heart,
    amplitude: "0.5–4 mV",
    frequency: "0.5–150 Hz",
    color: "red",
    bands: ["P Wave", "QRS Complex", "T Wave"]
  },
  {
    type: "EOG",
    name: "Electrooculography",
    icon: Eye,
    amplitude: "50–3500 µV",
    frequency: "0.1–30 Hz",
    color: "green",
    bands: ["Horizontal (saccades)", "Vertical (blinks)"]
  }
];

export default function SignalsPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/50 mb-6">
              <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                PiEEG Server
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Stream biosignals
              <br />
              <span className="bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 bg-clip-text text-transparent">
                in 60 seconds
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              Real-time EEG/EMG/ECG/EOG streaming at 250–500 Hz. WebSocket API. Browser dashboard. Works on Raspberry Pi, Linux, macOS, Windows.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://pieeg.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-cyan-500/30 transition-all"
              >
                <Play className="w-5 h-5" />
                Try Live Demo
              </a>
              <a
                href="https://github.com/pieeg-club/PiEEG-server"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold transition-all"
              >
                View on GitHub
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20 sm:py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Quick Start
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Three commands to live EEG streaming
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickStart.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-lg transition-all"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-${item.color}-500 to-${item.color}-600 text-white font-bold mb-4 shadow-lg`}>
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <div className="p-3 rounded-lg bg-zinc-900 dark:bg-zinc-950 border border-zinc-700 mb-3 font-mono text-sm text-cyan-400 overflow-x-auto">
                  {item.code}
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-24 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Server Features
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Everything you need for real-time biosignal acquisition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-lg transition-all"
                >
                  <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg mb-6`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 font-mono text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WebSocket API */}
      <section className="py-20 sm:py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              WebSocket API
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Plain JSON. No SDK. Works in any language.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Python Example */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-lg">Python Client</h3>
              </div>
              <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl">
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2">
                      stream_eeg.py
                    </span>
                  </div>
                </div>
                <div className="p-6 bg-zinc-900 dark:bg-zinc-950 overflow-x-auto">
                  <pre className="text-sm leading-relaxed">
                    <code className="text-zinc-100 font-mono whitespace-pre">
                      {websocketExample}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            {/* JavaScript Example */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <h3 className="font-bold text-lg">JavaScript Client</h3>
              </div>
              <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl">
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2">
                      stream.js
                    </span>
                  </div>
                </div>
                <div className="p-6 bg-zinc-900 dark:bg-zinc-950 overflow-x-auto">
                  <pre className="text-sm leading-relaxed">
                    <code className="text-zinc-100 font-mono whitespace-pre">
                      {jsExample}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Data Format */}
          <div className="mt-12 p-8 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-lg mb-4">Data Format</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Every frame is a JSON object with three fields:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-blue-200 dark:border-blue-800">
                <code className="text-sm font-mono text-blue-600 dark:text-blue-400">t</code>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Unix timestamp (seconds)</p>
              </div>
              <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-blue-200 dark:border-blue-800">
                <code className="text-sm font-mono text-blue-600 dark:text-blue-400">n</code>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Sample number (monotonic)</p>
              </div>
              <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-blue-200 dark:border-blue-800">
                <code className="text-sm font-mono text-blue-600 dark:text-blue-400">channels</code>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Array of µV values</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Devices */}
      <section className="py-20 sm:py-24 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Supported Devices
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              One server, multiple hardware platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devices.map((device) => (
              <div
                key={device.name}
                className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-xl">{device.name}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{device.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">{device.channels} ch</div>
                    <div className="text-xs text-zinc-500">{device.connection}</div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900 dark:bg-zinc-950 border border-zinc-700 font-mono text-sm text-green-400 overflow-x-auto">
                  $ {device.command}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WebSocket Commands */}
      <section className="py-20 sm:py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Real-time Control
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Send commands to the server over WebSocket
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commands.map((cmd) => (
              <div
                key={cmd.category}
                className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
              >
                <h3 className="font-bold text-lg mb-2">{cmd.category}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">{cmd.description}</p>
                <div className="p-4 rounded-lg bg-zinc-900 dark:bg-zinc-950 border border-zinc-700 font-mono text-xs text-purple-400 overflow-x-auto whitespace-pre">
                  {cmd.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 sm:py-24 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Integrations
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Connect to your favorite tools and platforms
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-lg transition-all text-center"
              >
                <div className="text-4xl mb-4">{integration.icon}</div>
                <h3 className="font-bold mb-2">{integration.name}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  {integration.description}
                </p>
                <code className="text-xs px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {integration.flag}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signal Types Reference */}
      <section className="py-20 sm:py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Supported Signal Types
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Acquire any biosignal with the same hardware
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {signalTypes.map((signal) => {
              const Icon = signal.icon;
              return (
                <div
                  key={signal.type}
                  className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-${signal.color}-500 flex items-center justify-center text-white shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{signal.type}</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{signal.name}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Amplitude</div>
                      <div className="font-mono text-sm font-semibold">{signal.amplitude}</div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Frequency</div>
                      <div className="font-mono text-sm font-semibold">{signal.frequency}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {signal.bands.map((band) => (
                      <span
                        key={band}
                        className={`text-xs px-3 py-1 rounded-full bg-${signal.color}-100 dark:bg-${signal.color}-950 text-${signal.color}-700 dark:text-${signal.color}-300 border border-${signal.color}-200 dark:border-${signal.color}-800`}
                      >
                        {band}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-br from-cyan-500 via-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start streaming in 60 seconds
          </h2>
          <p className="text-lg text-cyan-50 mb-8 max-w-2xl mx-auto">
            No hardware? Try the live demo with synthetic EEG data.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://pieeg.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Play className="w-5 h-5" />
              Try Live Demo
            </a>
            <a
              href="https://pieeg-server-doc.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Read Documentation
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
