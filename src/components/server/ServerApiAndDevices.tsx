"use client";

import { useState } from "react";
import { Check, Copy, Cpu, ExternalLink, Radio, Terminal } from "lucide-react";

const DEVICES = [
  {
    id: "pieeg16",
    name: "PiEEG-16",
    channels: "16",
    link: "SPI",
    cmd: "pieeg-server",
    note: "Default device. Raspberry Pi shield over SPI. First boot: enable SPI, then reboot.",
  },
  {
    id: "pieeg8",
    name: "PiEEG-8",
    channels: "8",
    link: "SPI",
    cmd: "pieeg-server --device pieeg8",
    note: "8-channel Raspberry Pi shield. Same ADS1299 path as PiEEG-16.",
  },
  {
    id: "jneeg",
    name: "JNEEG",
    channels: "8",
    link: "SPI",
    cmd: "pieeg-server --device jneeg",
    note: "Jetson Nano shield. Profile auto-detects jetson-nano from /proc/device-tree.",
  },
  {
    id: "ironbci8",
    name: "IronBCI-8",
    channels: "8",
    link: "BLE",
    cmd: "pieeg-server --device ironbci8",
    note: "Wireless BLE. Optional --ble-name or --ble-address to skip the scan.",
  },
  {
    id: "ironbci32",
    name: "IronBCI-32",
    channels: "32",
    link: "USB serial",
    cmd: "pieeg-server --device ironbci32 --serial-port /dev/ttyACM0",
    note: "921,600 baud. On Windows use COM3 (or the port the OS assigns).",
  },
  {
    id: "mock",
    name: "Mock",
    channels: "16",
    link: "Synthetic",
    cmd: "pieeg-server --mock",
    note: "Alpha, drift, noise, blink artifacts. Same {t, n, channels} contract as hardware.",
  },
];

const INSTALL_SNIPPETS = [
  {
    id: "pip",
    label: "pip",
    file: "any OS · Python 3.10+",
    text: "pip install pieeg-server\npieeg-server --mock",
  },
  {
    id: "pi",
    label: "Raspberry Pi",
    file: "install.sh · enables SPI",
    text: "curl -sSL https://raw.githubusercontent.com/pieeg-club/PiEEG-server/main/install.sh | bash\nsudo reboot\npieeg-server",
  },
  {
    id: "lsl",
    label: "with LSL",
    file: "extra: pylsl",
    text: "pip install pieeg-server[lsl]\npieeg-server --lsl",
  },
];

const COMMANDS = [
  {
    category: "Filter",
    description: "Butterworth bandpass, live toggle",
    code: `{ "cmd": "set_filter", "enabled": true, "lowcut": 1.0, "highcut": 40.0 }`,
  },
  {
    category: "Record",
    description: "CSV start / stop",
    code: `{ "cmd": "start_record" }\n{ "cmd": "stop_record" }`,
  },
  {
    category: "ADS1299",
    description: "Registers and noise test",
    code: `{ "cmd": "reg_read" }\n{ "cmd": "reg_write", "regs": { "0x05": "0x00" } }\n{ "cmd": "noise_test", "duration": 3 }`,
  },
  {
    category: "LSL",
    description: "Outlet and channel groups",
    code: `{ "cmd": "lsl_start" }\n{ "cmd": "lsl_groups_set", "groups": [\n  { "name": "EEG", "channels": [0, 1, 2, 3] }\n] }`,
  },
  {
    category: "OSC",
    description: "VRChat chatbox / parameters",
    code: `{ "cmd": "osc_configure", "host": "127.0.0.1", "port": 9000, "mode": "both" }\n{ "cmd": "osc_start" }`,
  },
  {
    category: "Webhooks",
    description: "HTTP callbacks on EEG events",
    code: `{ "cmd": "webhook_create", "rule": { "trigger_type": "amplitude_above", "params": { "channel": 0, "threshold": 150 } } }`,
  },
];

const PY_EXAMPLE = `import asyncio, json, websockets

async def main():
    async with websockets.connect("ws://raspberrypi.local:1616") as ws:
        async for msg in ws:
            frame = json.loads(msg)
            # frame = {"t": 1711234567.123, "n": 42, "channels": [12.34, -5.67, ...]}
            print(f"#{frame['n']}: {len(frame['channels'])} ch @ {frame['t']}")

asyncio.run(main())`;

const JS_EXAMPLE = `const ws = new WebSocket("ws://raspberrypi.local:1616");

ws.onmessage = (e) => {
  const frame = JSON.parse(e.data);
  // frame.channels = µV per channel
  // frame.t = Unix time (seconds)
  // frame.n = monotonic sample index
  console.log(\`#\${frame.n}: \${frame.channels.length} channels\`);
};`;

function CopySnippetButton({ text }: { text: string }) {
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

export default function ServerApiAndDevices() {
  const [deviceId, setDeviceId] = useState("pieeg16");
  const [installId, setInstallId] = useState("pip");
  const device = DEVICES.find((d) => d.id === deviceId) ?? DEVICES[0];
  const install = INSTALL_SNIPPETS.find((s) => s.id === installId) ?? INSTALL_SNIPPETS[0];

  return (
    <section
      id="install-cli"
      className="scroll-mt-20 py-14 sm:py-16 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/25"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">
              [02 · INSTALL, DEVICES &amp; WEBSOCKET]
            </p>
            <h2 className="title-section text-zinc-900 dark:text-zinc-50">
              One package. A device flag. JSON on :1616.
            </h2>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-3xl">
              Python 3.10+ on Raspberry Pi, Jetson, Linux, macOS, or Windows. The dashboard is already inside the
              wheel. Node is not required unless you are editing{" "}
              <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">dashboard/src</code>.
            </p>
          </div>
          <a
            href="https://docs.pieeg.com/software/features/server/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors shrink-0 self-start lg:self-auto"
          >
            Server docs
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-10">
          <div className="lg:col-span-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 overflow-hidden shadow-xl">
            <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/90 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold">Install</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">{install.file}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 p-3 border-b border-zinc-800 bg-zinc-900/40">
              {INSTALL_SNIPPETS.map((s) => {
                const active = s.id === install.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setInstallId(s.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      active
                        ? "bg-cyan-600 text-white"
                        : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1.5">
                <span>Command</span>
                <CopySnippetButton text={install.text} />
              </div>
              <pre className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
                {install.text}
              </pre>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] font-mono">
                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <span className="text-cyan-400 block font-semibold">:1616</span>
                  <span className="text-zinc-400">WebSocket JSON</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <span className="text-violet-400 block font-semibold">:1617</span>
                  <span className="text-zinc-400">Dashboard HTTP</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <span className="text-amber-400 block font-semibold">doctor</span>
                  <span className="text-zinc-400">pieeg-server doctor</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <Cpu className="w-4 h-4 text-cyan-500" />
              Device flag
            </div>
            <div className="flex flex-wrap gap-1.5 p-3 border-b border-zinc-200 dark:border-zinc-800">
              {DEVICES.map((d) => {
                const active = d.id === device.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDeviceId(d.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      active
                        ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                        : "border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {d.name}
                  </button>
                );
              })}
            </div>
            <div className="p-4 sm:p-5 space-y-3">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{device.name}</h3>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                  {device.channels} ch · {device.link}
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{device.note}</p>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>Start</span>
                <CopySnippetButton text={device.cmd} />
              </div>
              <pre className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                $ {device.cmd}
              </pre>
            </div>
          </div>
        </div>

        <div id="ws-contract" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-5">
            <Radio className="w-4 h-4 text-violet-500" />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">WebSocket contract</h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/90">
                <span className="text-xs font-mono text-zinc-300">stream_eeg.py</span>
                <CopySnippetButton text={PY_EXAMPLE} />
              </div>
              <pre className="p-5 text-xs leading-relaxed text-zinc-100 font-mono overflow-x-auto whitespace-pre">
                {PY_EXAMPLE}
              </pre>
            </div>
            <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/90">
                <span className="text-xs font-mono text-zinc-300">stream.js</span>
                <CopySnippetButton text={JS_EXAMPLE} />
              </div>
              <pre className="p-5 text-xs leading-relaxed text-zinc-100 font-mono overflow-x-auto whitespace-pre">
                {JS_EXAMPLE}
              </pre>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { k: "t", v: "Unix timestamp (seconds, float)" },
              { k: "n", v: "Monotonic sample index" },
              { k: "channels", v: "Array of microvolts, one per ADC channel" },
            ].map((f) => (
              <div
                key={f.k}
                className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70"
              >
                <code className="text-sm font-mono text-cyan-600 dark:text-cyan-400">{f.k}</code>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{f.v}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMMANDS.map((cmd) => (
              <div
                key={cmd.category}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70"
              >
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{cmd.category}</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">{cmd.description}</p>
                <pre className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-violet-300 overflow-x-auto whitespace-pre">
                  {cmd.code}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
