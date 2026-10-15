"use client";

import { useEffect, useRef, useState } from "react";
import { mountMcpStage } from "@/components/home/mcp-stage.js";
import "@/components/home/benches.css";
import "@/components/home/mcp-stage.css";
import {
  Check,
  Copy,
  Terminal,
  Plug,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

type HostConfig = {
  id: string;
  label: string;
  transport: string;
  fileOrCmd: string;
  setupNote: string;
  snippet: string;
};

const MCP_HOSTS: HostConfig[] = [
  {
    id: "cursor",
    label: "Cursor",
    transport: "streamable-HTTP (:8765/mcp)",
    fileOrCmd: ".cursor/mcp.json (project) or ~/.cursor/mcp.json (global)",
    setupNote:
      "Start pieeg-server --lsl and pieeg-agent mcp in two terminals, save .cursor/mcp.json, enable 'pieeg' in Cursor Customize → MCP, and ask: how's my signal?",
    snippet: `{
  "mcpServers": {
    "pieeg": {
      "url": "http://127.0.0.1:8765/mcp"
    }
  }
}`,
  },
  {
    id: "vscode",
    label: "VS Code (Copilot)",
    transport: "streamable-HTTP (:8765/mcp)",
    fileOrCmd: ".vscode/mcp.json",
    setupNote:
      "Start pieeg-server --lsl and pieeg-agent mcp, create .vscode/mcp.json, run 'MCP: List Servers' from the Command Palette to start pieeg, then query Copilot Chat.",
    snippet: `{
  "servers": {
    "pieeg": {
      "type": "http",
      "url": "http://127.0.0.1:8765/mcp"
    }
  }
}`,
  },
  {
    id: "claude-code",
    label: "Claude Code",
    transport: "streamable-HTTP (:8765/mcp)",
    fileOrCmd: "CLI registration",
    setupNote:
      "With pieeg-agent mcp running on 127.0.0.1:8765, register the HTTP endpoint once and verify with /mcp inside your session.",
    snippet: `claude mcp add --transport http pieeg http://127.0.0.1:8765/mcp
claude`,
  },
  {
    id: "claude-desktop",
    label: "Claude Desktop",
    transport: "stdio (host spawns process)",
    fileOrCmd: "claude_desktop_config.json",
    setupNote:
      "Claude Desktop spawns pieeg-agent itself over stdio. Keep pieeg-server --lsl running, do NOT start pieeg-agent mcp manually, and restart Claude Desktop after saving.",
    snippet: `{
  "mcpServers": {
    "pieeg": {
      "command": "pieeg-agent",
      "args": ["mcp", "--transport", "stdio"]
    }
  }
}`,
  },
  {
    id: "codex",
    label: "Codex & ChatGPT Desktop",
    transport: "streamable-HTTP (:8765/mcp)",
    fileOrCmd: "~/.codex/config.toml",
    setupNote:
      "Codex CLI and ChatGPT Desktop share ~/.codex/config.toml. Run the CLI command or add the [mcp_servers.pieeg] block directly.",
    snippet: `# Via CLI:
codex mcp add pieeg --url http://127.0.0.1:8765/mcp

# Or in ~/.codex/config.toml:
[mcp_servers.pieeg]
url = "http://127.0.0.1:8765/mcp"`,
  },
  {
    id: "openclaw",
    label: "OpenClaw & Hermes",
    transport: "streamable-HTTP (:8765/mcp)",
    fileOrCmd: "openclaw CLI / ~/.hermes/config.yaml",
    setupNote:
      "Add the local streamable-HTTP endpoint and run doctor --probe (OpenClaw) or /reload-mcp (Hermes).",
    snippet: `# OpenClaw:
openclaw mcp add pieeg --url http://127.0.0.1:8765/mcp --transport streamable-http
openclaw mcp doctor pieeg --probe

# Hermes (~/.hermes/config.yaml):
mcp_servers:
  pieeg:
    url: "http://127.0.0.1:8765/mcp"`,
  },
];

const CLI_COMMANDS = [
  {
    cmd: "pieeg-agent streams",
    desc: "Discover active Lab Streaming Layer (LSL) outlets on the local network.",
  },
  {
    cmd: "pieeg-agent monitor",
    desc: "Live terminal readout of band powers, channel quality, and state indices (no LLM required).",
  },
  {
    cmd: 'pieeg-agent ask "am I focused?"',
    desc: "One-shot question answered from a fresh tool call against the live stream.",
  },
  {
    cmd: "pieeg-agent chat",
    desc: "Interactive multi-turn terminal conversation with pattern training and session tools.",
  },
  {
    cmd: "pieeg-agent web",
    desc: "Launch FastAPI + prebuilt React notebook UI on http://localhost:8000 (no Node.js needed).",
  },
  {
    cmd: "pieeg-agent mcp",
    desc: "Serve all read and decode tools over MCP at http://127.0.0.1:8765/mcp (no API key needed).",
  },
];

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

export default function AgentMcpSection() {
  const mcpRootRef = useRef<HTMLDivElement>(null);
  const [selectedHostId, setSelectedHostId] = useState<string>("cursor");

  useEffect(() => {
    const host = mcpRootRef.current;
    if (!host) return;
    const stopStage = mountMcpStage(host, { reduce: false });

    let raf = 0;
    let stopped = false;
    let visible = true;
    let lastNow = 0;

    function startLoop() {
      if (stopped || raf) return;
      lastNow = 0;
      raf = requestAnimationFrame(function tick(now) {
        raf = 0;
        if (stopped) return;
        const dt = Math.min(0.05, (now - (lastNow || now)) / 1000);
        lastNow = now;
        const fn = (host as HTMLElement & { __mcpFrame?: (d: number) => void })?.__mcpFrame;
        if (visible && fn) fn(dt);
        raf = requestAnimationFrame(tick);
      });
    }

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        if (visible) startLoop();
      },
      { threshold: 0.05, rootMargin: "80px" },
    );
    io.observe(host);
    startLoop();

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      stopStage();
    };
  }, []);

  const activeHost = MCP_HOSTS.find((h) => h.id === selectedHostId) ?? MCP_HOSTS[0];

  return (
    <>
      {/* ── Section 02: Interactive MCP Portal & Multi-Host Q&A ──────────── */}
      <section
        id="mcp-portal"
        className="scroll-mt-20 py-14 sm:py-16 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/25"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center gap-2 mx-auto">
              <div className="h-px w-8 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                [02 · MODEL CONTEXT PROTOCOL DOORWAY]
              </p>
              <div className="h-px w-8 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
            </div>
            <h2 className="title-section text-zinc-900 dark:text-zinc-50">
              One live EEG server. Every AI host you already trust.
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Click any question and any host node below to watch JSON-RPC tool calls travel from Claude, ChatGPT,
              Cursor, VS Code, or a local Ollama agent into PiEEG Agent and return grounded neural metrics.
            </p>
          </div>

          <div className="home-bench">
            <div ref={mcpRootRef} className="mcp-star" />
          </div>
        </div>
      </section>

      {/* ── Section 03: Host Configs & CLI Reference ──────────────────────── */}
      <section
        id="host-configs"
        className="scroll-mt-20 py-14 sm:py-16 px-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">
                [03 · HOST CONFIGURATION &amp; CLI WORKFLOW]
              </p>
              <h2 className="title-section text-zinc-900 dark:text-zinc-50">
                Wire your editor or terminal to the live stream in 60 seconds
              </h2>
              <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-3xl">
                Install with a single command (no Node.js required; the React web UI is prebuilt). Start an LSL stream
                from hardware or <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">--mock</code>,
                then open the web notebook or attach an MCP host.
              </p>
            </div>
            <a
              href="https://docs.pieeg.com/software/integrations/pieeg-agent/#host-config"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors shrink-0 self-start lg:self-auto"
            >
              Full MCP Host Guide
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 cols: Interactive MCP Host Config Picker */}
            <div className="lg:col-span-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 overflow-hidden shadow-xl">
              <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/90 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <Plug className="w-4 h-4 text-violet-400" />
                  <span className="font-semibold">MCP Host Configuration</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">
                  Default: http://127.0.0.1:8765/mcp
                </span>
              </div>

              {/* Host tabs */}
              <div className="flex flex-wrap gap-1.5 p-3 border-b border-zinc-800 bg-zinc-900/40">
                {MCP_HOSTS.map((h) => {
                  const active = h.id === activeHost.id;
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setSelectedHostId(h.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        active
                          ? "bg-violet-600 text-white"
                          : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                      }`}
                    >
                      {h.label}
                    </button>
                  );
                })}
              </div>

              {/* Step 1: Start stream + MCP server */}
              <div className="p-4 sm:p-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1.5">
                    <span>1. Start LSL stream &amp; MCP server</span>
                    <CopySnippetButton
                      text={`pieeg-server --mock --lsl\npieeg-agent mcp`}
                    />
                  </div>
                  <pre className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
{`# Terminal 1 — hardware or synthetic LSL stream
pieeg-server --lsl          # or: pieeg-server --mock --lsl

# Terminal 2 — start MCP server (skip for stdio hosts like Claude Desktop)
pieeg-agent mcp             # listens on http://127.0.0.1:8765/mcp`}
                  </pre>
                </div>

                {/* Step 2: Host-specific snippet */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-400 mb-1.5">
                    <span>
                      2. {activeHost.label} — <code className="text-violet-300">{activeHost.fileOrCmd}</code>
                    </span>
                    <CopySnippetButton text={activeHost.snippet} />
                  </div>
                  <pre className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                    {activeHost.snippet}
                  </pre>
                  <p className="mt-2.5 text-xs text-zinc-400 leading-relaxed">
                    {activeHost.setupNote}
                  </p>
                </div>

                {/* Transport flags strip */}
                <div className="pt-3 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] font-mono">
                  <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                    <span className="text-violet-400 block font-semibold">streamable-http</span>
                    <span className="text-zinc-400">Default · :8765/mcp</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                    <span className="text-cyan-400 block font-semibold">--transport stdio</span>
                    <span className="text-zinc-400">Host spawns process</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                    <span className="text-amber-400 block font-semibold">--transport sse</span>
                    <span className="text-zinc-400">Legacy · :8765/sse</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Install + 6 CLI Entry Points */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                    <Terminal className="w-4 h-4" />
                    One-Line Install (Linux / macOS / WSL)
                  </div>
                  <CopySnippetButton text="curl -sSL https://raw.githubusercontent.com/pieeg-club/PiEEG-agent/main/install.sh | bash" />
                </div>
                <pre className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-200 overflow-x-auto">
                  curl -sSL https://raw.githubusercontent.com/pieeg-club/PiEEG-agent/main/install.sh | bash
                </pre>
                <p className="mt-2 text-[11px] text-zinc-400 font-mono">
                  Windows: <code className="text-zinc-200">git clone https://github.com/pieeg-club/PiEEG-agent.git &amp;&amp; cd PiEEG-agent &amp;&amp; install.cmd</code>
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
                  Six CLI Modes
                </h3>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {CLI_COMMANDS.map((item) => (
                    <div key={item.cmd} className="py-2.5 first:pt-0 last:pb-0">
                      <code className="text-xs font-mono font-semibold text-violet-600 dark:text-violet-400 block">
                        $ {item.cmd}
                      </code>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
