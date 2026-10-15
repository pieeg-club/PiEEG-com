import Link from "next/link";
import {
  FlaskConical,
  Radio,
  Share2,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Download,
  Code2,
  Layers,
  Gauge,
} from "lucide-react";

const BIO_PRIMITIVES = [
  { group: "Spatial & Time", items: ["car(win)", "bipolar(chA, chB)", "detrend(s)", "zscore(s)", "rms(s)", "lineLength(s)", "slopeSignChanges(s)"] },
  { group: "Spectral", items: ["fft(s)", "psd(s, fs, maxHz)", "bandpower(s, [lo, hi])"] },
  { group: "Stats & Classifiers", items: ["cohensD(a, b)", "features(frame)", "lda(X, y, shrinkage)", "logreg(X, y)", "loroCV(X, y, reps)", "crossValScore(X, y, k)", "check(cond, msg)"] },
];

const AUTO_PLOT_SHAPES = [
  { ret: "number | { value, unit }", viz: "Monospace readout + 120-tick rolling sparkline" },
  { ret: "number[] (> 16 items)", viz: "Time-domain waveform trace with zero-line & µV peak" },
  { ret: "number[] (<= 16) | { labels, values }", viz: "Color-coded channel or feature bar chart" },
  { ret: "{ freqs, power, peakHz }", viz: "Power spectrum curve with 8-12 Hz alpha band marked" },
  { ret: "{ matrix, labels }", viz: "2D covariance or LORO-CV confusion heatmap" },
  { ret: "{ label, probs, loroBalancedAccuracy }", viz: "Live BCI decoder probability bars + LORO badge" },
];

const OSC_GROUPS = [
  { name: "Cognitive state", paths: "/pieeg/focus, /pieeg/relax, /pieeg/engagement, /pieeg/dominant", note: "0-1 session-relative indices; dominant in Hz" },
  { name: "Band powers (avg)", paths: "/pieeg/delta, /pieeg/theta, /pieeg/alpha, /pieeg/beta, /pieeg/gamma", note: "Relative power (band / total), 0-1" },
  { name: "Events", paths: "/pieeg/blink", note: "Momentary 0/1 pulse on detected frontal EOG blink" },
  { name: "Channel levels", paths: "/pieeg/ch1/level … /pieeg/chN/level", note: "Per-channel activity envelope (saturating RMS)" },
  { name: "Per-channel bands", paths: "/pieeg/ch1/alpha … /pieeg/chN/gamma", note: "δ θ α β γ for every selected channel (up to 128 params)" },
];

export default function CloudWorkbenches() {
  return (
    <>
      {/* ── Section 03: Live Lab (Bio-Pen) ─────────────────────────────────── */}
      <section
        id="live-lab"
        className="scroll-mt-20 py-14 sm:py-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">
                [03 · LIVE LAB (BIO-PEN) · CLOUD.PIEEG.COM/LAB]
              </p>
              <h2 className="title-section text-zinc-900 dark:text-zinc-50">
                Write multi-stage DSP &amp; classifiers at 15 Hz. Share in one URL.
              </h2>
              <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-3xl">
                Live Lab runs a reactive chain of JavaScript cells inside a dedicated Web Worker against the live 2-second
                250 Hz ring buffer. If no board is paired when you open a shared{" "}
                <code className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">/lab/:penId</code> link,
                it boots directly on the 8-channel simulated stream so every pipeline runs immediately.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://cloud.pieeg.com/lab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
              >
                <FlaskConical className="w-4 h-4" />
                Open Live Lab
              </a>
              <Link
                href="/news/live-lab-biopen"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                Technical Note
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 cols: Stage code example + Decoder Arena explanation */}
            <div className="lg:col-span-7 space-y-5">
              {/* 3-stage pipeline preview */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 overflow-hidden shadow-lg">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/90 text-xs font-mono">
                  <span className="text-emerald-400 font-semibold">
                    Live 2-Class BCI Classifier (Shrinkage-LDA + LORO-CV)
                  </span>
                  <span className="text-zinc-400">15 Hz Worker · 450 ms debounce</span>
                </div>
                <div className="p-4 sm:p-5 space-y-4 font-mono text-xs leading-relaxed overflow-x-auto">
                  <div>
                    <div className="text-zinc-400 mb-1">
                      // Stage 1: Spatial Common Average Reference &amp; Detrend
                    </div>
                    <pre className="text-zinc-200">
{`const clean = car(win);
const ch0 = detrend(clean[0] || []);
check(Math.abs(mean(ch0)) < 1e-3, "DC offset removed (mean ~ 0 uV)");
return ch0; // → auto-plots time-domain waveform trace`}
                    </pre>
                  </div>
                  <div className="border-t border-zinc-800/80 pt-3">
                    <div className="text-zinc-400 mb-1">
                      // Stage 2: Fit Ledoit-Wolf Shrinkage-LDA &amp; Audit Trial-Grouped LORO-CV
                    </div>
                    <pre className="text-zinc-200">
{`const model = lda(dataset.X, dataset.y, 0.25);
const cv = loroCV(dataset.X, dataset.y, dataset.reps, "lda");
const x = features(frame);
check(cv.balancedAccuracy >= 0.6, "Held-out LORO-CV balanced accuracy >= 60%");
return {
  label: model.predict(x),
  probs: model.predictProba(x),
  loroBalancedAccuracy: cv.balancedAccuracy,
}; // → auto-plots live class probability bars + LORO badge`}
                    </pre>
                  </div>
                </div>
                <div className="px-4 py-2.5 border-t border-zinc-800 bg-zinc-900/60 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-400">
                  <span>Freeze 2s Window: deterministic buffer lock for debugging</span>
                  <span className="text-emerald-400">Ctrl+S → mints /lab/:id permalink</span>
                </div>
              </div>

              {/* Decoder Arena & Sharing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50">
                  <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    <Gauge className="w-4 h-4 text-emerald-500" />
                    Decoder Arena &amp; Leakage Audit
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Record 2-second labelled repetitions (<code className="font-mono">rest</code>,{" "}
                    <code className="font-mono">active</code>, or custom classes) or click{" "}
                    <strong>Seed Demo Epochs</strong>. The Arena benchmarks your pipeline against reference Shrinkage-LDA
                    and L2 Logistic Regression, showing both trial-grouped <strong>LORO-CV</strong> balanced accuracy and
                    naive sample-split k-fold accuracy side-by-side so temporal autocorrelation leakage is exposed.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50">
                  <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    <Share2 className="w-4 h-4 text-cyan-500" />
                    Save, Fork &amp; Guest Edit Tokens
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Save any pipeline via cloud permalinks (<code className="font-mono">/lab/:id</code>), self-contained
                    base64 URLs (<code className="font-mono">/lab?pen=…</code>), or portable{" "}
                    <code className="font-mono">.biopen.json</code> bundles. Guest creators receive a local SHA-256{" "}
                    <code className="font-mono">X-Pen-Token</code> to update their pen without an account; visitors who edit
                    and save mint a forked <code className="font-mono">/lab/:newId</code>.
                  </p>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Pre-bound primitives & Auto-visualizer table */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-500" />
                  Pre-Bound Worker Primitives
                </h3>
                <div className="space-y-3">
                  {BIO_PRIMITIVES.map((g) => (
                    <div key={g.group}>
                      <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5">
                        {g.group}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {g.items.map((fn) => (
                          <code
                            key={fn}
                            className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[11px] font-mono text-zinc-800 dark:text-zinc-200 border border-zinc-200/60 dark:border-zinc-700/60"
                          >
                            {fn}
                          </code>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-500" />
                  Return-Driven Auto-Visualizer
                </h3>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
                  {AUTO_PLOT_SHAPES.map((row) => (
                    <div key={row.ret} className="py-2 first:pt-0 last:pb-0">
                      <code className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 block">
                        {row.ret}
                      </code>
                      <span className="text-zinc-600 dark:text-zinc-400">{row.viz}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 04: Local Bridge & Neural Stream ───────────────────────── */}
      <section
        id="local-bridge"
        className="scroll-mt-20 py-14 sm:py-16 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/25"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-3">
                [04 · LOCAL BRIDGE &amp; NEURAL STREAM · WEBRTC P2P → OSC]
              </p>
              <h2 className="title-section text-zinc-900 dark:text-zinc-50">
                One TouchDesigner OSC In CHOP receives the whole headset.
              </h2>
              <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-3xl">
                Browser tabs cannot send raw UDP packets directly to local creative-coding tools.{" "}
                <strong>PiEEG Local Bridge</strong> (~5 MB standalone Rust/Tokio binary) pairs with your browser tab via a
                6-character share code and opens a direct, DTLS-encrypted WebRTC P2P data channel over loopback or LAN.
                Zero signal frames route through the cloud.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://github.com/pieeg-club/PiEEG-local-bridge/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Local Bridge (5 MB)
              </a>
              <Link
                href="/tutorials/neural-stream-touchdesigner-osc"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                TouchDesigner Tutorial
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Signal tree table */}
            <div className="lg:col-span-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  <Radio className="w-4 h-4 text-amber-500" />
                  Neural Stream OSC Address Tree (Default Prefix: <code className="font-mono text-xs">/pieeg</code>)
                </div>
                <span className="text-xs font-mono text-zinc-500">10 / 20 / 30 / 60 Hz</span>
              </div>
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {OSC_GROUPS.map((g) => (
                  <div key={g.name} className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                        {g.name}
                      </div>
                      <code className="text-xs font-mono text-amber-600 dark:text-amber-400">
                        {g.paths}
                      </code>
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-right max-w-xs">
                      {g.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: 3-step pairing + targets */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70">
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                  How P2P Pairing Works
                </h3>
                <ol className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-mono font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <span>
                      Run <code className="font-mono">pieeg-local-bridge</code> on Windows, macOS, or Linux. It opens{" "}
                      <code className="font-mono">127.0.0.1:47800</code> and shows a 6-character share code.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-mono font-bold flex items-center justify-center shrink-0">
                      2
                    </span>
                    <span>
                      In <code className="font-mono">cloud.pieeg.com</code>, open <strong>Local Bridge</strong>, enter the
                      6-character code, and complete the one-time HTTPS SDP/ICE handshake.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-mono font-bold flex items-center justify-center shrink-0">
                      3
                    </span>
                    <span>
                      Flip <strong>Neural Stream</strong> to <em>Streaming</em> (or use{" "}
                      <code className="font-mono">useLocalBridge().send()</code> from any experience or Live Lab stage).
                    </span>
                  </li>
                </ol>
              </div>

              <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70">
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2 text-sm">
                  Built-In Target Presets &amp; Diagnostics
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                  Includes one-click presets for <strong>TouchDesigner</strong> (port 7000),{" "}
                  <strong>Max/MSP &amp; Ableton</strong>, <strong>VRChat Avatars</strong> (port 9000), and custom OSC roots,
                  plus mDNS (<code className="font-mono">_osc._udp</code>) auto-discovery and a copyable diagnostics report
                  that detects background tab timer throttling.
                </p>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <a
                    href="https://docs.pieeg.com/cloud/local-bridge/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    Local Bridge Docs <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://github.com/pieeg-club/PiEEG-local-bridge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:underline"
                  >
                    Rust Source (MIT) <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
