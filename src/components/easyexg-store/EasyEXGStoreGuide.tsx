"use client";

/**
 * EasyEXG interactive guide for the store page (/store/easyexg), shown after Technical Specifications.
 * Sections: four signals (live simulated trace + placement), signal chain with the JP1 / supply switches,
 * setup steps, MCU wiring, software, µV calculator, examples with code, troubleshooting, safety, design files.
 *
 * Content: ./easyexg-guide-data.ts. Styles: ./easyexg-store-guide.css (scoped to #easyexg-guide).
 * Images (plain files): /public/products/easyexg/guide/
 */

import { useEffect, useMemo, useRef, useState } from "react";
import "./easyexg-store-guide.css";
import {
  DOCS, EXAMPLES, GH, IMG, MCUS, PACKET, SIGNALS, STEPS, STUDIO_MODES, TROUBLE, WIFI_SETTINGS,
  CODE_STUDIO, CODE_USB, CODE_WIFI, type SignalId,
} from "./easyexg-guide-data";

/* ───────────── simulated signals (illustration only) ───────────── */
function sample(id: SignalId, t: number, rnd: () => number): number {
  const n = (rnd() - 0.5) * 2;
  switch (id) {
    case "emg": {
      const ph = t % 2.6;
      const on = ph > 0.5 && ph < 1.7 ? Math.sin(((ph - 0.5) / 1.2) * Math.PI) : 0;
      return n * (0.05 + 0.85 * on) * (0.6 + 0.4 * Math.sin(t * 90));
    }
    case "ecg": {
      const ph = (t % 0.83) / 0.83;
      const g = (c: number, w: number, a: number) => a * Math.exp(-(((ph - c) / w) ** 2));
      return g(0.18, 0.03, 0.12) - g(0.3, 0.008, 0.12) + g(0.32, 0.011, 1) - g(0.345, 0.01, 0.25) + g(0.58, 0.05, 0.28) + n * 0.02;
    }
    case "eogh": {
      const seq = [0, 1, 0, -1, 0, -1, 0, 1];
      const k = Math.floor(t / 1.1) % seq.length, ph = t % 1.1;
      const prev = seq[(k + seq.length - 1) % seq.length];
      return (seq[k] - prev) * 0.6 * Math.exp(-ph * 0.8) + n * 0.03;
    }
    case "eogv": {
      const ph = t % 2.4;
      const blink = ph > 0.3 && ph < 0.55 ? Math.sin(((ph - 0.3) / 0.25) * Math.PI) : 0;
      const look = Math.floor(t / 4.8) % 2 ? -0.35 : 0.35;
      return blink * 0.95 + look * Math.exp(-(t % 4.8) * 0.5) + n * 0.03;
    }
    case "eeg": {
      const closed = Math.floor(t / 4) % 2 === 1;
      const a = closed ? 0.55 : 0.12;
      return a * Math.sin(2 * Math.PI * 10 * t) * (0.7 + 0.3 * Math.sin(t * 2.1)) + 0.12 * Math.sin(2 * Math.PI * 4.3 * t + 1) + n * 0.18;
    }
  }
}

function LiveTrace({ id, color }: { id: SignalId; color: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [label, setLabel] = useState("");
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SPAN = id === "eogh" || id === "eogv" ? 6 : id === "emg" ? 4 : 3;
    const t0 = performance.now();
    let raf = 0, visible = true, lastLabel = "";
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(cv);
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = cv.clientWidth, h = cv.clientHeight;
      if (cv.width !== w * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(255,255,255,.06)"; ctx.lineWidth = 1;
      for (let i = 1; i < 6; i++) { const x = (w * i) / 6; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
      const T = reduce ? 3 : (now - t0) / 1000;
      ctx.strokeStyle = color; ctx.lineWidth = 1.6; ctx.beginPath();
      seed = 7 + Math.floor(T * 60);
      const N = Math.floor(w);
      for (let i = 0; i <= N; i++) {
        const tt = T - SPAN + (SPAN * i) / N;
        const y = h / 2 - sample(id, Math.max(tt, 0), rnd) * h * 0.4;
        if (i === 0) ctx.moveTo(i, y); else ctx.lineTo(i, y);
      }
      ctx.stroke();
      let l = "";
      if (id === "eeg") l = Math.floor(T / 4) % 2 === 1 ? "Eyes closed — alpha grows" : "Eyes open";
      if (id === "emg") l = T % 2.6 > 0.5 && T % 2.6 < 1.7 ? "Fist clenched" : "Relaxed";
      if (id === "ecg") l = "≈ 72 bpm";
      if (id === "eogh") { const s = [0, 1, 0, -1, 0, -1, 0, 1][Math.floor(T / 1.1) % 8]; l = s > 0 ? "Look right" : s < 0 ? "Look left" : "Centre"; }
      if (id === "eogv") l = T % 2.4 > 0.3 && T % 2.4 < 0.6 ? "Blink" : "Eyes open";
      if (l !== lastLabel) { lastLabel = l; setLabel(l); }
      if (reduce) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [id, color]);
  return (
    <div className="trace">
      <canvas ref={ref} aria-label={`Simulated ${id.toUpperCase()} trace`} role="img" />
      <span className="trace-l" style={{ color }}>● {label}</span>
    </div>
  );
}

/* ───────────── small helpers ───────────── */
function CopyCode({ code, lang }: { code: string; lang?: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className="code">
      <div className="code-bar">
        <span>{lang}</span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(code).then(() => { setDone(true); setTimeout(() => setDone(false), 1400); }).catch(() => {});
          }}
        >
          {done ? "Copied" : "Copy"}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

function Jp1Badge({ jp1 }: { jp1: "open" | "bridged" }) {
  return (
    <span className={`jp1 ${jp1}`}>
      <i><b /><b /></i>
      JP1 {jp1 === "open" ? "open · 221×" : "bridged · 1 048×"}
    </span>
  );
}

const fmt = (v: number, d = 1) => v.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });

/* ───────────── guide ───────────── */
export default function EasyEXGStoreGuide() {
  const [sig, setSig] = useState<SignalId>("emg");
  const S = SIGNALS.find((s) => s.id === sig)!;
  const [bridged, setBridged] = useState(false);
  const [supply, setSupply] = useState<5 | 3.3>(5);
  const [mcu, setMcu] = useState("r4");
  const M = MCUS.find((m) => m.id === mcu)!;
  const [ex, setEx] = useState(EXAMPLES[0].id);
  const E = EXAMPLES.find((e) => e.id === ex)!;
  const [exFilter, setExFilter] = useState("All");
  const [sw, setSw] = useState<"usb" | "wifi">("usb");

  // µV calculator
  const [vref, setVref] = useState(5);
  const [bits, setBits] = useState(10);
  const [gain, setGain] = useState(221);
  const [counts, setCounts] = useState(40);
  const uvPerCount = (vref / 2 ** bits / gain) * 1e6;

  const chainGain = bridged ? 1048 : 221;
  const hpGain = bridged ? "106×" : "22×";
  const maxIn = bridged ? (supply === 5 ? 2.3 : 1.5) : supply === 5 ? 10.9 : 7.2;
  const res10 = ((supply / 1024 / chainGain) * 1e6);

  const exGroups = ["All", "EMG", "ECG", "EOG", "EEG", "Any"];
  const shownEx = useMemo(
    () => EXAMPLES.filter((e) => exFilter === "All" || e.signal.startsWith(exFilter)),
    [exFilter]
  );

  return (
    <section id="easyexg-guide" aria-label="EasyEXG: signals, setup, wiring, software and examples">
      <div className="wrap">
        <div className="kicker">Interactive guide</div>
        <nav className="toc" aria-label="Guide sections">
          {[
            ["signals", "Signals"], ["chain", "How it works"], ["setup", "Set up"], ["wiring", "Wiring"],
            ["software", "Software"], ["calc", "µV calculator"], ["examples", "Examples"], ["help", "Troubleshooting"], ["safety", "Safety"],
          ].map(([id, t]) => (
            <a key={id} href={`#exg-${id}`}>{t}</a>
          ))}
        </nav>

        {/* ── 1. signals ── */}
        <section id="exg-signals">
          <div className="sec-head">
            <h2>One board, four signals</h2>
            <p>Muscle, heart, eyes and brain use the same board — only the gain jumper and the three electrode positions change. Pick a signal to see where the electrodes go and what to expect.</p>
          </div>
          <div className="sig-tabs" role="tablist" aria-label="Signal">
            {SIGNALS.map((s) => (
              <button key={s.id} role="tab" aria-selected={s.id === sig} onClick={() => setSig(s.id)} style={{ ["--c" as string]: s.color }}>
                <i />
                <b>{s.tab}</b>
                <span>{s.sub}</span>
              </button>
            ))}
          </div>
          <div className="sig-stage" style={{ ["--sig" as string]: S.color }} role="tabpanel">
            <div className="sig-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={S.gif} src={`${IMG}/${S.gif}`} alt={`${S.title}: electrode placement and typical signal`} loading="lazy" />
              <p className="cap">Animation: typical signal as an illustration, not a recording.</p>
            </div>
            <div className="sig-info">
              <div className="row-top">
                <Jp1Badge jp1={S.jp1} />
              </div>
              <h3>{S.title}</h3>
              <p className="lead">{S.lead}</p>
              <LiveTrace id={S.id} color={S.color} />
              <table className="place">
                <thead><tr><th>Electrode</th><th>Plug</th><th>Where</th></tr></thead>
                <tbody>
                  {S.placement.map((p) => (
                    <tr key={p.pin}>
                      <td><span className={`dot ${p.pin === "IN+" ? "r" : p.pin === "REF" ? "g" : "y"}`} />{p.pin}</td>
                      <td>{p.contact}</td>
                      <td>{p.where}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <dl className="stats">
                <div><dt>Size at skin</dt><dd>{S.size}</dd></div>
                <div><dt>View filter</dt><dd>{S.filter}</dd></div>
                <div><dt>Sample rate</dt><dd>{S.rate}</dd></div>
              </dl>
              <ul className="tips">{S.tips.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </div>
        </section>

        {/* ── 2. signal chain ── */}
        <section id="exg-chain">
          <div className="sec-head">
            <h2>How the signal flows</h2>
            <p>An instrumentation amplifier, a high-pass with gain, a 2nd-order low-pass and a driven-right-leg reference. Flip the jumper and the supply to see what changes.</p>
          </div>
          <div className="chain-ctl">
            <div className="seg" role="group" aria-label="JP1">
              <span>JP1</span>
              <button aria-pressed={!bridged} onClick={() => setBridged(false)}>Open · EMG, EOG</button>
              <button aria-pressed={bridged} onClick={() => setBridged(true)}>Bridged · ECG, EEG</button>
            </div>
            <div className="seg" role="group" aria-label="Supply">
              <span>Supply</span>
              <button aria-pressed={supply === 5} onClick={() => setSupply(5)}>5 V</button>
              <button aria-pressed={supply === 3.3} onClick={() => setSupply(3.3)}>3.3 V</button>
            </div>
          </div>
          <ol className="chain">
            <li style={{ ["--c" as string]: "#eef0f3" }}><small>Input</small><b>Electrodes</b><span>IN+ − IN− · REF driven</span></li>
            <li style={{ ["--c" as string]: "#7fb2ff" }}><small>U1 · INA333</small><b>9.9×</b><span>CMRR ≥ 100 dB</span></li>
            <li style={{ ["--c" as string]: "#2cc6b4" }}><small>U2C · high-pass</small><b>{hpGain}</b><span>0.16 Hz</span></li>
            <li style={{ ["--c" as string]: "#2cc6b4" }}><small>U2D · low-pass</small><b>1×</b><span>500 Hz Sallen-Key</span></li>
            <li style={{ ["--c" as string]: "#c084fc" }}><small>J3 · OUT</small><b>{fmt(supply / 2, supply === 5 ? 1 : 2)} V</b><span>rest = VCC/2</span></li>
            <li style={{ ["--c" as string]: "#ffae42" }}><small>Your MCU</small><b>ADC</b><span>{supply === 5 ? "A0 on UNO / R4" : "GPIO36 · GP26 · PA0"}</span></li>
          </ol>
          <div className="chain-read">
            <div><dt>Total gain</dt><dd>{chainGain === 1048 ? "1 048×" : "221×"}</dd></div>
            <div><dt>Max input before clipping</dt><dd>{fmt(maxIn)} mV</dd></div>
            <div><dt>1 count, 10-bit ADC</dt><dd>≈ {fmt(res10, res10 < 10 ? 1 : 0)} µV</dd></div>
            <div><dt>Band (−3 dB)</dt><dd>0.16–501 Hz</dd></div>
            <div><dt>Use for</dt><dd>{bridged ? "ECG, EEG" : "EMG, EOG"}</dd></div>
          </div>
          <div className="chain-more">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/amp-response.webp`} alt="Simulated gain of EasyEXG versus frequency for JP1 open and bridged" loading="lazy" />
              <figcaption>Simulated in ngspice (10 MHz OPA4388 model). Blue: JP1 open. Green: JP1 bridged. Flat 0.16–500 Hz.</figcaption>
            </figure>
            <ul className="facts">
              <li><b>U2A</b> makes the mid-supply reference VREF = VCC/2, so OUT can swing both ways from one supply.</li>
              <li><b>U2B</b> drives REF (driven right leg). It keeps the body at mid-supply and removes most 50/60 Hz hum; 390 kΩ limits the current to about 13 µA at 5 V.</li>
              <li><b>0.16 Hz high-pass</b> removes electrode drift but keeps the true ECG shape.</li>
              <li><b>500 Hz 2nd-order low-pass</b> (Q = 0.73) covers the whole EMG band (20–450 Hz) and cuts noise above it.</li>
              <li>Power EasyEXG from the <b>same voltage as your ADC</b>: OUT swings between 0 V and VCC.</li>
            </ul>
          </div>
        </section>

        {/* ── 3. setup ── */}
        <section id="exg-setup">
          <div className="sec-head">
            <h2>From the box to a live signal</h2>
            <p>Six steps to a muscle signal in the Arduino Serial Plotter. The same steps work for ECG, EOG and EEG: only JP1 and the electrode positions change.</p>
          </div>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className={s.img ? "has-img" : ""}>
                <div className="num">{i + 1}</div>
                <div className="step-body">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  {s.table && (
                    <table className="mini">
                      <thead><tr>{s.table[0].map((h) => <th key={h}>{h}</th>)}</tr></thead>
                      <tbody>{s.table.slice(1).map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
                    </table>
                  )}
                  {i === 3 && <CopyCode code={CODE_USB} lang="Arduino/EasyEXG_Arduino.ino (core)" />}
                  {i === 5 && (
                    <table className="mini">
                      <thead><tr><th>Test</th><th>What you should see</th></tr></thead>
                      <tbody>
                        <tr><td>Relax the arm</td><td>Both traces close to flat</td></tr>
                        <tr><td>Clench your fist</td><td>Bursts on the signal, the envelope rises</td></tr>
                        <tr><td>Relax again</td><td>Both traces go flat</td></tr>
                      </tbody>
                    </table>
                  )}
                  {i === 5 && <p className="warn">No isolation: unplug the laptop charger before the electrodes go on, or use the Wi-Fi sketch with a power bank.</p>}
                </div>
                {s.img && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`${IMG}/${s.img}`} alt={s.alt ?? s.title} loading="lazy" />
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* ── 4. wiring ── */}
        <section id="exg-wiring">
          <div className="sec-head">
            <h2>Wire it to your board</h2>
            <p>Three wires: GND, VCC and OUT. VREF is optional. Always power EasyEXG from the same voltage as the microcontroller&apos;s ADC.</p>
          </div>
          <div className="mcu-tabs" role="tablist" aria-label="Microcontroller">
            {MCUS.map((m) => (
              <button key={m.id} role="tab" aria-selected={m.id === mcu} onClick={() => setMcu(m.id)}>
                {m.name}<span className={`v ${m.volt === "5V" ? "v5" : "v33"}`}>{m.volt === "5V" ? "5 V" : "3.3 V"}</span>
              </button>
            ))}
          </div>
          <div className="mcu-stage" role="tabpanel">
            <div className="mcu-pins">
              <table className="pins">
                <thead><tr><th>EasyEXG J3</th><th>{M.name}</th></tr></thead>
                <tbody>
                  <tr><td><span className="pin gnd">1</span>GND</td><td>{M.gnd}</td></tr>
                  <tr><td><span className="pin vcc">2</span>VCC</td><td>{M.vcc}</td></tr>
                  <tr><td><span className="pin out">3</span>OUT</td><td>{M.out}</td></tr>
                  <tr><td><span className="pin ref">4</span>VREF</td><td className="dim">not connected (optional)</td></tr>
                </tbody>
              </table>
              <p className="sw">Software: <b>{M.sw}</b></p>
              <p className="note">{M.note}</p>
              {M.volt === "3V3" && <p className="warn">3.3 V boards: connect VCC to 3.3 V. A 5 V supply can push more than 3.3 V into the analog pin.</p>}
            </div>
            <div className="mcu-img">
              {M.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={M.img} src={`${IMG}/${M.img}`} alt={`EasyEXG wired to ${M.name}`} loading="lazy" />
              ) : (
                <div className="mcu-ph">
                  <b>{M.name}</b>
                  <span>GND → {M.gnd}</span><span>VCC → {M.vcc}</span><span>OUT → {M.out}</span>
                </div>
              )}
            </div>
          </div>
          <div className="io-cards">
            <div>
              <h3>Electrode inputs — use J1 or J2, not both</h3>
              <table className="mini">
                <thead><tr><th>Signal</th><th>J1 · 3.5 mm jack</th><th>J2 · 3 pins</th><th>Purpose</th></tr></thead>
                <tbody>
                  <tr><td><span className="dot r" />IN+</td><td>Tip</td><td>pin 1 · &quot;+&quot; (square pad)</td><td>Positive measuring electrode</td></tr>
                  <tr><td><span className="dot y" />IN−</td><td>Ring</td><td>pin 2 · &quot;−&quot;</td><td>Negative measuring electrode</td></tr>
                  <tr><td><span className="dot g" />REF</td><td>Sleeve</td><td>pin 3 · &quot;REF&quot;</td><td>Driven right leg: cancels mains hum</td></tr>
                </tbody>
              </table>
              <p className="note">Cable colours differ between makers. Follow the plug position (Tip / Ring / Sleeve), not the colour — or check with a multimeter in continuity mode.</p>
            </div>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/connection.webp`} alt="EasyEXG connection overview: electrode jack, output header and gain jumper" loading="lazy" />
            </figure>
          </div>
        </section>

        {/* ── 5. software ── */}
        <section id="exg-software">
          <div className="sec-head">
            <h2>Software</h2>
            <p>EasyEXG gives an analog signal, so any code that calls analogRead() can use it. The repository has two ready-made ways to see it.</p>
          </div>
          <div className="sw-tabs" role="tablist" aria-label="Software option">
            <button role="tab" aria-selected={sw === "usb"} onClick={() => setSw("usb")}>
              <b>USB sketch</b><span>Any Arduino · Serial Plotter · cleanest signal</span>
            </button>
            <button role="tab" aria-selected={sw === "wifi"} onClick={() => setSw("wifi")}>
              <b>Wi-Fi sketch + EasyEXG Studio</b><span>UNO R4 WiFi · ESP32 · ESP8266 · filters, CSV</span>
            </button>
          </div>
          {sw === "usb" ? (
            <div className="sw-panel">
              <div>
                <CopyCode code={CODE_USB} lang="Arduino/EasyEXG_Arduino.ino" />
              </div>
              <ul className="facts">
                <li>Reads A0 at <b>500 Hz</b>, removes the resting level (≈ 512 counts = VCC/2) and prints two numbers per line.</li>
                <li>Open <b>Tools → Serial Plotter</b> at <b>115200 baud</b>. Blue: the signal. Yellow: the envelope.</li>
                <li>On another board change <b>PIN</b> (PA0 on STM32; A0 is GP26 on the Pico).</li>
                <li className="warn">The board is cabled to the computer: the laptop must run on battery, charger unplugged.</li>
              </ul>
            </div>
          ) : (
            <div className="sw-panel">
              <div>
                <CopyCode code={CODE_WIFI} lang="SDK/Arduino/1_Arduino.ino — top of the sketch" />
                <table className="mini">
                  <thead><tr><th>Setting</th><th>Default</th><th>Meaning</th></tr></thead>
                  <tbody>{WIFI_SETTINGS.map((r) => <tr key={r[0]}><td><code>{r[0]}</code></td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody>
                </table>
              </div>
              <div>
                <ul className="facts">
                  <li>Samples A0 at 500 Hz, removes drift and 50 Hz hum, sends <b>25 samples per packet, 20 packets/s</b> over UDP port 5005.</li>
                  <li><b>USE_ACCESS_POINT 0</b>: joins your 2.4 GHz Wi-Fi. <b>1</b>: makes its own network &quot;EasyEXG&quot; (password easyexg123).</li>
                  <li>After upload, unplug USB and power the board from a <b>power bank</b> — no cable to the person.</li>
                </ul>
                <CopyCode code={CODE_STUDIO} lang="EasyEXG Studio · Python 3.9+" />
              </div>
            </div>
          )}
          <div className="studio">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/eog-recording.webp`} alt="Real horizontal EOG recording in EasyEXG Studio: raw and band-pass filtered" loading="lazy" />
              <figcaption>Real horizontal EOG in EasyEXG Studio (JP1 open, 500 Hz): raw on top, 0.1–10 Hz with a 50 Hz notch below. The trace steps down for left, up for right.</figcaption>
            </figure>
            <div>
              <h3>EasyEXG Studio modes</h3>
              <table className="mini">
                <thead><tr><th>Mode</th><th>Band-pass</th><th>JP1 / gain</th><th>Window</th><th>Extra</th></tr></thead>
                <tbody>{STUDIO_MODES.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
              </table>
              <p className="note">Change band-pass, notch (50 / 60 Hz), gain (must match JP1) and window; start <b>● Record CSV</b> (time_s, raw_uV, filtered_uV, mode, band_Hz, gain), or pick <b>Source → Demo</b> to try it without a board.</p>
              <h3>Wi-Fi packet (little-endian)</h3>
              <table className="mini">
                <thead><tr><th>Bytes</th><th>Type</th><th>Content</th></tr></thead>
                <tbody>{PACKET.map((r) => <tr key={r[0]}><td>{r[0]}</td><td><code>{r[1]}</code></td><td>{r[2]}</td></tr>)}</tbody>
              </table>
              <p className="note">The PC sends <code>HELLO</code> to UDP 5005 about once a second; the board streams to the last PC that said hello and stops 5 s after the hellos stop.</p>
            </div>
          </div>
        </section>

        {/* ── 6. µV calculator ── */}
        <section id="exg-calc">
          <div className="sec-head">
            <h2>Counts to microvolts</h2>
            <p>µV at the electrodes = counts × VREF / 2<sup>bits</sup> / gain × 10<sup>6</sup>. Subtract the resting level (about half the ADC range) first, as the sketches do.</p>
          </div>
          <div className="calc">
            <div className="calc-in">
              <div className="seg" role="group" aria-label="ADC reference">
                <span>VREF</span>
                {[5, 3.3].map((v) => <button key={v} aria-pressed={vref === v} onClick={() => setVref(v)}>{v} V</button>)}
              </div>
              <div className="seg" role="group" aria-label="ADC bits">
                <span>ADC</span>
                {[10, 12, 14].map((v) => <button key={v} aria-pressed={bits === v} onClick={() => setBits(v)}>{v}-bit</button>)}
              </div>
              <div className="seg" role="group" aria-label="Gain">
                <span>Gain</span>
                {[221, 1048].map((v) => <button key={v} aria-pressed={gain === v} onClick={() => setGain(v)}>{v === 221 ? "221× (open)" : "1 048× (bridged)"}</button>)}
              </div>
              <label className="slider">
                <span>Counts from the resting level: <b>{counts}</b></span>
                <input type="range" min={-500} max={500} value={counts} onChange={(e) => setCounts(Number(e.target.value))} />
              </label>
            </div>
            <div className="calc-out">
              <div><small>At the electrodes</small><b>{fmt(counts * uvPerCount, Math.abs(counts * uvPerCount) < 100 ? 1 : 0)} µV</b></div>
              <div><small>1 count</small><b>{fmt(uvPerCount, uvPerCount < 1 ? 2 : 1)} µV</b></div>
              <div><small>Largest typical signal vs. this step</small>
                <ul className="fit">
                  {[["EEG", 10, 50], ["EOG", 100, 1000], ["ECG", 500, 2000], ["EMG", 100, 5000]].map(([n, lo, hi]) => {
                    const steps = (hi as number) / uvPerCount;
                    return <li key={n as string}><b>{n}</b> {lo as number}–{hi as number} µV <span className={steps < 8 ? "bad" : steps < 40 ? "ok" : "good"}>{steps < 8 ? "coarse" : steps < 40 ? "usable" : "fine"} · {fmt(steps, 0)} steps</span></li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. examples ── */}
        <section id="exg-examples">
          <div className="sec-head">
            <h2>Examples to build</h2>
            <p>Starting points for real projects: Arduino sketches, Python and MicroPython. Copy one, tune the threshold for your own signal in the Serial Plotter, and build on it.</p>
          </div>
          <div className="ex-filter" role="group" aria-label="Filter examples by signal">
            {exGroups.map((g) => (
              <button key={g} aria-pressed={exFilter === g} onClick={() => { setExFilter(g); const f = EXAMPLES.find((e) => g === "All" || e.signal.startsWith(g)); if (f) setEx(f.id); }}>{g}</button>
            ))}
          </div>
          <div className="ex">
            <ul className="ex-list" role="tablist" aria-label="Examples">
              {shownEx.map((e) => (
                <li key={e.id}>
                  <button role="tab" aria-selected={e.id === ex} onClick={() => setEx(e.id)} style={{ ["--c" as string]: e.color }}>
                    <i /><b>{e.title}</b><span>{e.signal} · {e.lang} · {e.level}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="ex-body" role="tabpanel" style={{ ["--c" as string]: E.color }}>
              <div className="ex-tags"><span>{E.signal}</span><span>{E.lang}</span><span>{E.level}</span><span>{E.board}</span></div>
              <h3>{E.title}</h3>
              <p>{E.idea}</p>
              <p className="parts"><b>You need:</b> {E.parts}</p>
              <CopyCode code={E.code} lang={E.lang} />
            </div>
          </div>
          <div className="projects">
            {[
              ["Muscle switch", "EMG", "Clench your fist to turn on an LED, a relay or a servo"],
              ["Robot hand", "EMG", "The envelope controls how far a servo closes"],
              ["Heart-rate display", "ECG", "Detect R peaks and show bpm on a small screen"],
              ["Eye-controlled cursor", "EOG", "Look left / right to move, blink to click"],
              ["Relax meter", "EEG", "Light an LED when alpha rises with the eyes closed"],
              ["Game controller", "EMG / EOG", "Jump on a muscle burst, steer with the eyes"],
            ].map(([t, s, d]) => (
              <div key={t}><small>{s}</small><b>{t}</b><span>{d}</span></div>
            ))}
          </div>
        </section>

        {/* ── 8. troubleshooting ── */}
        <section id="exg-help">
          <div className="sec-head">
            <h2>Troubleshooting</h2>
            <p>Is it the board or the setup? Unplug the electrode cable: OUT should sit quietly at VCC/2. Then short IN+, IN− and REF together on J2 — the signal should stay near zero. If it does, the board is fine.</p>
          </div>
          <div className="trouble">
            {TROUBLE.map((g) => (
              <div key={g.group}>
                <h3>{g.group}</h3>
                {g.rows.map(([q, a]) => (
                  <details key={q}>
                    <summary>{q}</summary>
                    <p>{a}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── 9. safety ── */}
        <section id="exg-safety">
          <div className="safety">
            <div>
              <h2>Battery only. Not a medical device.</h2>
              <p>EasyEXG has <b>no patient isolation</b>. Full isolation from the mains depends entirely on running from a battery. The DRL current is limited to about 13 µA by design, but that does not protect against a mains fault.</p>
              <ul>
                <li>While electrodes are on a person, EasyEXG and everything cabled to it run from a <b>5 V power bank</b> or a <b>laptop on battery</b>, charger unplugged.</li>
                <li>Upload sketches with nobody connected. No wall charger, desk supply or mains-powered computer while recording.</li>
                <li>No diagnosis or treatment. Not on people with a pacemaker or implanted device without a physician&apos;s approval.</li>
                <li>Clean, intact skin; stop if it gets irritated. Fresh electrodes for each person.</li>
              </ul>
            </div>
            <table className="mini power">
              <thead><tr><th>Setup while recording</th><th /></tr></thead>
              <tbody>
                <tr><td>MCU + EasyEXG on a power bank, Wi-Fi to the PC</td><td className="ok">Safe</td></tr>
                <tr><td>USB to a laptop on battery (charger unplugged)</td><td className="ok">Safe</td></tr>
                <tr><td>USB to a laptop with the charger plugged in</td><td className="no">Never</td></tr>
                <tr><td>USB to a desktop computer</td><td className="no">Never</td></tr>
                <tr><td>MCU on a wall charger</td><td className="no">Never</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 10. design files ── */}
        <section id="exg-files">
          <div className="files">
            <div>
              <h3>Open hardware</h3>
              <p>Schematic, Gerbers, BOM, pick-and-place, STEP / STL models, sketches and the Python viewer. Licence CC BY-NC 4.0.</p>
            </div>
            <div className="file-links">
              <a href={`${GH}/tree/main/Schematic`} target="_blank" rel="noopener">Schematic</a>
              <a href={`${GH}/tree/main/Gerber`} target="_blank" rel="noopener">Gerber & BOM</a>
              <a href={`${GH}/tree/main/3D_Model`} target="_blank" rel="noopener">3D model</a>
              <a href={`${GH}/tree/main/Arduino`} target="_blank" rel="noopener">Arduino sketch</a>
              <a href={`${GH}/tree/main/SDK`} target="_blank" rel="noopener">Wi-Fi SDK & Studio</a>
              <a href={DOCS} target="_blank" rel="noopener">docs.pieeg.com</a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
