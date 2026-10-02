/* MCP map, Q&A and setup from the MCP prototype. Mounted when that chip is selected. */

export function mountMcpStage(root, opts = {}) {
  const reduce = opts.reduce ?? window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.innerHTML = `<section class="hero"><div class="wrap">
  <div class="hero-head">
    <span class="pillrow"><b>Protocol</b>Model Context Protocol, served by PiEEG Agent</span>
    <h2>Your brain signal,<br><span class="soft">inside the AI you&nbsp;already&nbsp;use.</span></h2>
    <p class="lead">PiEEG Agent publishes its live EEG analysis as MCP tools. Claude, ChatGPT, Cursor, VS Code or an agent you wrote can ask about signal quality, focus, spectra and patterns, and get answers from the live stream. The analysis stays in Agent. MCP is only the doorway.</p>
    <div class="cta">
      <a class="btn primary" href="#mcp-map">Ask it something</a>
      <a class="btn" href="#mcp-start">Connect a host</a>
    </div>
  </div>
  <div class="map" id="mcp-map">
    <div class="map-bar">
      <div class="seg" id="mcp-layers" role="group" aria-label="Highlight">
        <button type="button" aria-pressed="true" data-l="all" style="--c:#d6dae0"><i></i>Everything</button>
        <button type="button" aria-pressed="false" data-l="src" style="--c:#22d3ee"><i></i>Your signal</button>
        <button type="button" aria-pressed="false" data-l="mcp" style="--c:#a78bfa"><i></i>The doorway</button>
        <button type="button" aria-pressed="false" data-l="host" style="--c:#7fb2ff"><i></i>Your AI host</button>
      </div>
      <span class="cap">Pick a question, then click any host to see how it answers</span>
    </div>
    <div class="scroll">
      <svg id="mcp-hero" viewBox="0 64 1200 480" role="img" aria-labelledby="mcp-heroTitle">
        <title id="mcp-heroTitle">EEG from the head flows to pieeg-server, then PiEEG Agent, then through MCP to AI hosts such as Claude, ChatGPT, Cursor and VS Code</title>
        <defs>
          <radialGradient id="mcp-glow"><stop offset="0" stop-color="#a78bfa" stop-opacity=".35"/><stop offset=".55" stop-color="#a78bfa" stop-opacity=".08"/><stop offset="1" stop-color="#a78bfa" stop-opacity="0"/></radialGradient>
          <radialGradient id="mcp-core"><stop offset="0" stop-color="#2a2145"/><stop offset="1" stop-color="#110e1c"/></radialGradient>
          <linearGradient id="mcp-headG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22d3ee" stop-opacity=".16"/><stop offset="1" stop-color="#22d3ee" stop-opacity=".02"/></linearGradient>
          <clipPath id="mcp-scopeClip"><rect x="0" y="0" width="140" height="34" rx="6"/></clipPath>
        </defs>
        <g id="mcp-gLinks"></g>
        <g id="mcp-gNodes"></g>
        <g id="mcp-gFx"></g>
      </svg>
    </div>
    <div class="qa" id="mcp-qa">
      <div class="ask" id="mcp-ask" role="group" aria-label="Pick a question"><span class="lbl">Ask</span></div>
      <div class="qa-grid">
        <div class="qa-col">
          <h4><span class="sw" style="background:#eef0f3"></span>You, in <b id="mcp-qaHost">Claude</b></h4>
          <div class="m you" id="mcp-qaQ"></div>
          <div class="trow" id="mcp-qaTools"></div>
          <div class="data" id="mcp-qaData"></div>
        </div>
        <div class="qa-col">
          <h4><span class="sw" style="background:#a78bfa"></span><b id="mcp-qaWho">Claude</b><span id="mcp-qaModel"></span></h4>
          <div class="m bot" id="mcp-qaBubble"><span class="reply" id="mcp-qaR"></span></div>
          <div class="tags" id="mcp-qaTags"></div>
        </div>
      </div>
      <p class="qa-note">Answers are illustrative, written to show how different models tend to use the same tool data. Not recorded outputs.</p>
    </div>
    <div class="map-foot">
      <span><i style="background:#22d3ee"></i>EEG samples</span>
      <span><i style="background:#7fb2ff"></i>Local stream</span>
      <span><i style="background:#45dd8b"></i>MCP tool calls</span>
      <span><i style="background:#ffae42"></i>Device tools, locked</span>
      <span class="note">Host names show where MCP can plug in. Values are simulated.</span>
    </div>
  </div>
</div></section>
<section class="block" id="mcp-start"><div class="wrap">
  <div class="sh">
    <p class="eyebrow">Get started</p>
    <h3>Three steps from electrodes to your AI host</h3>
    <p>Everything runs on your machine, next to the server. Mock mode works too, so you can try it before the board arrives.</p>
  </div>
  <div class="steps">
    <div class="card step"><span class="num">1</span><h3>Stream the board</h3><p>Start the server with Lab Streaming Layer on, so Agent can find the stream.</p>
      <div class="term"><span class="p">$ </span>pip install pieeg-server
<span class="p">$ </span>pieeg-server --lsl</div></div>
    <div class="card step"><span class="num">2</span><h3>Run PiEEG Agent</h3><p>Agent reads the stream and owns every tool. Open its web UI to check it sees your channels.</p>
      <div class="term"><span class="p">$ </span>pieeg-agent web
<span class="p"># </span>localhost:8000</div></div>
    <div class="card step"><span class="num">3</span><h3>Point your host at Agent</h3><p>Add PiEEG Agent as an MCP server in Claude, ChatGPT, Cursor, VS Code or your own client. The docs list the entry for each host.</p>
      <a class="btn primary" href="https://docs.pieeg.com/software/integrations/pieeg-agent" target="_blank" rel="noopener">Open the Agent docs</a></div>
  </div>
  <div class="safety">
    <h3>EEG is biometric data</h3>
    <p>Tool results go to whichever model your host uses, so pick a provider you trust, or a local model. Keep device tools off unless you need them. Research and prototyping, not clinical use.</p>
  </div>
</div></section>`;

  const NS = "http://www.w3.org/2000/svg";
  const $ = (s, r = root) => r.querySelector(s);
  const C = { eeg:"#22d3ee", wire:"#7fb2ff", net:"#45dd8b", osc:"#ffae42", ai:"#a78bfa", red:"#f87171", white:"#eef0f3" };
  const ICON = {
    server:"M2,3h14v4.5H2Z M2,10.5h14V15H2Z M5,5.2h0.01 M5,12.7h0.01",
    robot:"M9,1.5v2 M4,3.5h10a1.5,1.5 0 0 1 1.5,1.5v7a1.5,1.5 0 0 1 -1.5,1.5H4a1.5,1.5 0 0 1 -1.5,-1.5V5A1.5,1.5 0 0 1 4,3.5Z M6.3,7.8h0.01 M11.7,7.8h0.01 M6.5,11h5",
    chat:"M3,3.5h12a1.5,1.5 0 0 1 1.5,1.5v6.5a1.5,1.5 0 0 1 -1.5,1.5H8l-3.5,3v-3H3a1.5,1.5 0 0 1 -1.5,-1.5V5A1.5,1.5 0 0 1 3,3.5Z",
    term:"M2,3h14v12H2Z M5,7l2.5,2L5,11 M9,11.5h4",
    code:"M6.5,5.5L2.5,9l4,3.5 M11.5,5.5L15.5,9l-4,3.5",
    editor:"M2,3h14v12H2Z M6,3v12 M8.5,7h5 M8.5,10h3.5",
    spark:"M9,2v4 M9,12v4 M2,9h4 M12,9h4 M4.6,4.6l2.2,2.2 M11.2,11.2l2.2,2.2 M13.4,4.6l-2.2,2.2 M6.8,11.2l-2.2,2.2",
    lock:"M4.5,8h9v7.5h-9Z M6.5,8V5.5a2.5,2.5 0 0 1 5,0V8",
  };
  const icon = (k, x, y, col, s = 1) => `<g transform="translate(${x},${y}) scale(${s})" fill="none" stroke="${col}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="${ICON[k]}"/></g>`;
  const bez = (x1, y1, x2, y2) => { const l = Math.max(26, (x2 - x1) * .45); return `M${x1},${y1} C${x1 + l},${y1} ${x2 - l},${y2} ${x2},${y2}`; };
  const pill = (t, col, x, y, mono) => { const w = (mono ? 7 : 6.8) * t.length + 16; return `<g transform="translate(${x},${y})"><rect x="${-w/2}" y="-10" width="${w}" height="20" rx="10" fill="#0b0d11" stroke="${col}" stroke-opacity=".45"/><text x="0" y="4" text-anchor="middle" style="font-size:11px;font-weight:600${mono ? ";font-family:var(--mono)" : ""}" fill="${col}">${t}</text></g>`; };

  const hero = $("#mcp-hero");
  const HEAD = { cx: 104, cy: 300, r: 66 };
  const SRV = { x: 214, y: 256, w: 190, h: 88 };
  const AG = { x: 450, y: 266, w: 180, h: 68 };
  const P = { cx: 780, cy: 300 };
  const HOSTS = [
    { id:"claude", t:"Claude", s:"desktop app", ic:"chat", q:"Is my signal clean?", tool:"quality" },
    { id:"claudecode", t:"Claude Code", s:"in your terminal", ic:"term", q:"Plot alpha for block 2", tool:"spectra" },
    { id:"chatgpt", t:"ChatGPT", s:"with MCP connectors", ic:"spark", q:"Am I focused right now?", tool:"state" },
    { id:"cursor", t:"Cursor", s:"AI code editor", ic:"code", q:"Which electrodes carried it?", tool:"patterns" },
    { id:"vscode", t:"VS Code", s:"agent mode", ic:"editor", q:"Compare block 2 with 1", tool:"compare" },
    { id:"own", t:"Your own agent", s:"any MCP client", ic:"robot", q:"Start a recording", tool:"capture", dev:true },
  ];
  const HX = 1000, HW = 180, HH = 58;
  HOSTS.forEach((h, i) => { h.y = 300 + (i - 2.5) * 82; h.x = HX + Math.abs(i - 2.5) * -12 + 6; });
  const READ = ["quality","state","spectra","connectivity","patterns","sessions"];
  const DEV = ["filter","capture","test tone","OSC"];

  function drawHero() {
    let L = "", N = "";
    L += `<g data-layer="src">
      <path id="mcp-p-head" d="${bez(HEAD.cx + HEAD.r, HEAD.cy, SRV.x, SRV.y + SRV.h/2)}" stroke="${C.eeg}" stroke-opacity=".25" stroke-width="1.6" fill="none"/>
      <path class="flow" data-speed="0.8" d="${bez(HEAD.cx + HEAD.r, HEAD.cy, SRV.x, SRV.y + SRV.h/2)}" stroke="${C.eeg}" stroke-width="2.4" stroke-linecap="round"/>
      <path id="mcp-p-srv" d="${bez(SRV.x + SRV.w, SRV.y + SRV.h/2, AG.x, AG.y + AG.h/2)}" stroke="${C.wire}" stroke-opacity=".25" stroke-width="1.6" fill="none"/>
      <path class="flow" d="${bez(SRV.x + SRV.w, SRV.y + SRV.h/2, AG.x, AG.y + AG.h/2)}" stroke="${C.wire}" stroke-width="2.4" stroke-linecap="round"/>
      ${pill("LSL", C.wire, (SRV.x + SRV.w + AG.x)/2, 284)}
    </g>`;
    L += `<g data-layer="mcp">
      <path id="mcp-p-ag" d="M${AG.x + AG.w},${P.cy} L${P.cx - 92},${P.cy}" stroke="${C.ai}" stroke-opacity=".3" stroke-width="1.6" fill="none"/>
      <path class="flow" d="M${AG.x + AG.w},${P.cy} L${P.cx - 92},${P.cy}" stroke="${C.ai}" stroke-width="2.4" stroke-linecap="round"/>
    </g>`;
    HOSTS.forEach((h) => {
      const d = bez(P.cx + 96, P.cy + (h.y - P.cy) * .28, h.x, h.y);
      L += `<g data-layer="host">
        <path id="mcp-p-${h.id}" d="${d}" stroke="${h.dev ? C.osc : C.net}" stroke-opacity=".22" stroke-width="1.6" fill="none"/>
        <path class="flow" d="${d}" stroke="${C.net}" stroke-width="2" stroke-linecap="round" stroke-opacity=".8"/>
      </g>`;
    });
    $("#mcp-gLinks", hero).innerHTML = L;

    const elec = [];
    for (let i = 0; i < 16; i++) {
      const ring = i < 8 ? .72 : .4, n = 8, a = (i % 8) / n * Math.PI * 2 + (i < 8 ? .2 : .6);
      elec.push([HEAD.cx + Math.cos(a) * HEAD.r * ring, HEAD.cy + Math.sin(a) * HEAD.r * ring * 1.05]);
    }
    N += `<g data-layer="src">
      <ellipse cx="${HEAD.cx}" cy="${HEAD.cy}" rx="${HEAD.r}" ry="${HEAD.r * 1.08}" fill="url(#mcp-headG)" stroke="${C.eeg}" stroke-opacity=".5"/>
      <path d="M${HEAD.cx - 9},${HEAD.cy - HEAD.r * 1.08 + 2} L${HEAD.cx},${HEAD.cy - HEAD.r * 1.08 - 12} L${HEAD.cx + 9},${HEAD.cy - HEAD.r * 1.08 + 2}" fill="none" stroke="${C.eeg}" stroke-opacity=".5"/>
      <path d="M${HEAD.cx - HEAD.r},${HEAD.cy - 8} q-9,8 0,16 M${HEAD.cx + HEAD.r},${HEAD.cy - 8} q9,8 0,16" fill="none" stroke="${C.eeg}" stroke-opacity=".5"/>
      ${elec.map(([x, y], i) => `<circle class="elec" style="animation-delay:${(i * .13).toFixed(2)}s" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.2" fill="${C.eeg}"/>`).join("")}
      <text x="${HEAD.cx}" y="${HEAD.cy + HEAD.r + 34}" text-anchor="middle" class="t-main">16 electrodes</text>
      <text x="${HEAD.cx}" y="${HEAD.cy + HEAD.r + 51}" text-anchor="middle" class="t-sub">PiEEG board, 250 Hz</text>
    </g>`;
    N += `<g data-layer="src">
      <rect class="plate" x="${SRV.x}" y="${SRV.y}" width="${SRV.w}" height="${SRV.h}" rx="16" fill="#0c0e12" stroke="rgba(255,255,255,.14)"/>
      ${icon("server", SRV.x + 14, SRV.y + 14, "#8b93a1")}
      <text x="${SRV.x + 40}" y="${SRV.y + 27}" class="t-main">pieeg-server</text>
      <g transform="translate(${SRV.x + 25},${SRV.y + 42})"><g clip-path="url(#mcp-scopeClip)"><rect width="140" height="34" rx="6" fill="#07080a"/>
        <path id="mcp-sc0" fill="none" stroke="${C.eeg}" stroke-width="1.2"/><path id="mcp-sc1" fill="none" stroke="${C.eeg}" stroke-opacity=".6" stroke-width="1.2"/><path id="mcp-sc2" fill="none" stroke="${C.ai}" stroke-opacity=".7" stroke-width="1.2"/></g></g>
    </g>`;
    N += `<g data-layer="mcp">
      <rect class="plate" x="${AG.x}" y="${AG.y}" width="${AG.w}" height="${AG.h}" rx="16" fill="#0c0e12" stroke="rgba(255,255,255,.14)"/>
      ${icon("robot", AG.x + 14, AG.y + 25, "#8b93a1")}
      <text x="${AG.x + 42}" y="${AG.y + 30}" class="t-main">PiEEG Agent</text>
      <text x="${AG.x + 42}" y="${AG.y + 47}" class="t-sub">analysis + the gate</text>
    </g>`;
    let chips = "";
    READ.forEach((t, i) => {
      const a = -Math.PI * .9 + i * (Math.PI * .8 / (READ.length - 1));
      const rr = i % 2 ? 182 : 146;
      chips += pill(t, C.net, P.cx + Math.cos(a) * rr, P.cy + Math.sin(a) * rr, true);
    });
    DEV.forEach((t, i) => {
      const a = Math.PI * .22 + i * (Math.PI * .56 / (DEV.length - 1));
      const x = P.cx + Math.cos(a) * 150, y = P.cy + Math.sin(a) * 150;
      const w = 7 * t.length + 34;
      chips += `<g transform="translate(${x},${y})" opacity=".85"><rect x="${-w/2}" y="-10" width="${w}" height="20" rx="10" fill="#0b0d11" stroke="${C.osc}" stroke-opacity=".4" stroke-dasharray="3 3"/>
        ${icon("lock", -w/2 + 6, -6.5, C.osc, .7)}<text x="9" y="4" text-anchor="middle" style="font-size:11px;font-weight:600;font-family:var(--mono)" fill="${C.osc}">${t}</text></g>`;
    });
    N += `<g data-layer="mcp">
      <circle cx="${P.cx}" cy="${P.cy}" r="210" fill="url(#mcp-glow)"/>
      <circle cx="${P.cx}" cy="${P.cy}" r="150" fill="none" stroke="#ffffff10"/>
      <circle class="pulse" cx="${P.cx}" cy="${P.cy}" r="92" fill="none" stroke="${C.ai}" stroke-width="1.4"/>
      <circle class="pulse d2" cx="${P.cx}" cy="${P.cy}" r="92" fill="none" stroke="${C.ai}" stroke-width="1.4"/>
      <circle class="spin" cx="${P.cx}" cy="${P.cy}" r="112" fill="none" stroke="${C.ai}" stroke-opacity=".45" stroke-dasharray="2 10" stroke-width="2"/>
      <circle class="spin rev" cx="${P.cx}" cy="${P.cy}" r="100" fill="none" stroke="${C.ai}" stroke-opacity=".25" stroke-dasharray="40 14 4 14"/>
      <circle id="mcp-portal" cx="${P.cx}" cy="${P.cy}" r="90" fill="url(#mcp-core)" stroke="${C.ai}" stroke-width="1.6"/>
      <text x="${P.cx}" y="${P.cy - 2}" text-anchor="middle" style="font-size:40px;font-weight:800;letter-spacing:-.04em" fill="#f4f4f5">MCP</text>
      <text x="${P.cx}" y="${P.cy + 22}" text-anchor="middle" class="t-sub">JSON-RPC, host calls in</text>
      <text id="mcp-callCount" x="${P.cx}" y="${P.cy + 44}" text-anchor="middle" style="font-size:11px;font-family:var(--mono)" fill="${C.net}">0 calls answered</text>
      ${chips}
    </g>`;
    HOSTS.forEach((h) => {
      N += `<g class="host" data-layer="host" data-id="${h.id}" tabindex="0" role="button" aria-label="Ask this question in ${h.t}">
        <rect class="plate" x="${h.x}" y="${h.y - HH/2}" width="${HW}" height="${HH}" rx="15" fill="#0c0e12" stroke="rgba(255,255,255,.14)"/>
        <rect x="${h.x + 12}" y="${h.y - 15}" width="30" height="30" rx="9" fill="#ffffff08" stroke="#ffffff14"/>
        ${icon(h.ic, h.x + 18, h.y - 9, "#c9ced6")}
        <text x="${h.x + 54}" y="${h.y - 3}" class="t-main">${h.t}</text>
        <text x="${h.x + 54}" y="${h.y + 14}" class="t-sub">${h.s}</text>
      </g>`;
    });
    $("#mcp-gNodes", hero).innerHTML = N;
  }
  drawHero();

  $("#mcp-layers").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    $("#mcp-layers").querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    const l = b.dataset.l;
    hero.classList.toggle("dimmed", l !== "all");
    hero.querySelectorAll("[data-layer]").forEach((g) => g.classList.toggle("lit", g.dataset.layer === l));
  });

  const EX = [
    {
      q: "Clean my data",
      shared: [
        ['quality', '16 ch  <span class="g">13 good</span>  <span class="o">P3, O2 poor contact</span>  <span class="o">T7 muscle bursts</span>'],
        ['spectra', '<span class="o">50 Hz peak +18 dB</span> on C3, C4, Cz, P4, Pz   drift &lt;1 Hz on Fp1, Fp2'],
        ['filter', '<span class="r">not listed</span>  <span class="c">device tools off</span>'],
      ],
      r: {
        claude: { tools: [["quality"], ["spectra"]], text: "Three separate things are dirtying the signal, and they need different fixes.\n\nFirst, P3 and O2 have poor contact. No filter can fix that, so re-seat those two electrodes before anything else.\n\nSecond, there is strong 50 Hz mains hum on five channels and slow drift on Fp1 and Fp2. A 1 to 40 Hz bandpass with a 50 Hz notch would clear both.\n\nThird, T7 shows muscle bursts. Relax your jaw; filtering won't remove those cleanly.\n\nI can't change the filter myself, because device tools are off. If you start Agent with --allow-actions, I can preview it for you first.", tags: [["2 tool calls"], ["fixes contact first", "good"], ["asks before acting", "good"]] },
        gpt: { tools: [["quality"], ["spectra"]], text: "Here's what's affecting your data quality:\n\n• 50 Hz line noise on 5 channels (C3, C4, Cz, P4, Pz)\n• Low-frequency drift on Fp1 and Fp2\n• Poor contact on P3 and O2\n• Muscle artifacts on T7\n\nRecommended steps:\n1. Re-seat P3 and O2\n2. Move away from chargers and mains cables\n3. Apply a 1–40 Hz bandpass and a 50 Hz notch\n\nNote: filtering must be enabled in PiEEG Agent (device tools are currently off).", tags: [["2 tool calls"], ["checklist style"], ["no action taken", "good"]] },
        local: { tools: [["quality"]], text: "P3 and O2 look bad, try re-seating them. T7 also has some noise. A notch filter might help with the rest.", tags: [["1 tool call"], ["short answer"], ["data stays on your machine", "good"]] },
      },
    },
    {
      q: "What do you see here?",
      shared: [
        ['state', 'focus <span class="g">0.58</span>  relax <span class="g">0.44</span>  alpha <span class="g">0.29</span>  <span class="c">session-relative</span>'],
        ['spectra', 'alpha peak <span class="g">10.2 Hz</span>  1/f slope <span class="g">-1.3</span>  frontal asymmetry <span class="g">+0.04</span>'],
        ['quality', '<span class="g">14 of 16 good</span>  <span class="o">P3, O2 noisy</span>'],
      ],
      r: {
        claude: { tools: [["state"], ["spectra"], ["quality"]], text: "Mostly a calm, awake signal.\n\nYour alpha rhythm peaks at 10.2 Hz, the kind of pattern you usually see with eyes closed or relaxed attention. Focus sits at 0.58 on today's scale, so you're engaged but not straining.\n\nOne caveat: P3 and O2 are noisy, so I'd be careful reading anything from the back of the head right now.\n\nThese numbers are relative to this session, not a clinical reading.", tags: [["3 tool calls"], ["checks quality first", "good"], ["flags limits", "good"]] },
        gpt: { tools: [["state"], ["spectra"]], text: "Snapshot of your current EEG:\n\n• Dominant rhythm: alpha, peak at 10.2 Hz\n• Focus: 0.58 · Relax: 0.44 (session scale)\n• 1/f slope: -1.3\n• Frontal asymmetry: close to zero (+0.04)\n\nOverall this looks like a relaxed but attentive state.", tags: [["2 tool calls"], ["summary table style"], ["skipped quality check", "warn"]] },
        local: { tools: [["state"]], text: "Focus is 0.58 and relax is 0.44. You seem fairly calm right now.", tags: [["1 tool call"], ["short answer"], ["data stays on your machine", "good"]] },
      },
    },
    {
      q: "Did the last block relax me?",
      shared: [
        ['compare', 'block 3 vs 2  alpha <span class="g">+0.18</span>  beta <span class="o">-0.06</span>  effect size <span class="g">d=0.54</span>'],
        ['compare', 'strongest change at <span class="g">Pz, O1</span>'],
        ['quality', '<span class="o">O2 noisy in both blocks</span>'],
      ],
      r: {
        claude: { tools: [["compare", "block 3 vs 2"], ["quality"]], text: "Yes, moderately.\n\nAlpha rose by 0.18 in the last block and beta dropped slightly, with a medium effect size (d = 0.54). The change was strongest at Pz and O1.\n\nI left O2 out because it was noisy in both blocks.\n\nOne pair of blocks is a small sample, so repeat it once or twice before reading too much into it.", tags: [["2 tool calls"], ["notes sample size", "good"]] },
        gpt: { tools: [["compare", "block 3 vs 2"]], text: "Yes. Compared with the previous block:\n\n• Alpha: +0.18\n• Beta: -0.06\n• Effect size: d = 0.54 (medium)\n• Strongest change: Pz and O1\n\nThis pattern is consistent with increased relaxation.", tags: [["1 tool call"], ["bullet summary"]] },
        local: { tools: [["compare", "last block"]], text: "Alpha went up by 0.18, so yes, you were more relaxed.", tags: [["1 tool call"], ["short answer"], ["no effect size", "warn"]] },
      },
    },
    {
      q: "Which electrodes matter for my pattern?",
      shared: [
        ['patterns', '"focus vs rest"  balanced accuracy <span class="g">0.78</span>  <span class="c">cross-validated</span>'],
        ['patterns', 'importance  Fz <span class="g">0.31</span>  F3 <span class="g">0.22</span>  Cz <span class="g">0.17</span>  others <span class="c">0.30</span>'],
      ],
      r: {
        claude: { tools: [["patterns", "focus vs rest"]], text: "Mostly the front and centre of the head.\n\nFz carries the most weight, then F3 and Cz. Together those three make up about 70% of what the classifier uses.\n\nBalanced accuracy is 0.78 in cross-validation. That's a solid first pattern, but not reliable enough to control anything yet. A few more training blocks will help most.", tags: [["1 tool call"], ["explains what 0.78 means", "good"]] },
        gpt: { tools: [["patterns", "focus vs rest"]], text: "Top electrodes for \"focus vs rest\":\n\n1. Fz: 0.31\n2. F3: 0.22\n3. Cz: 0.17\n\nBalanced accuracy: 0.78 (cross-validated)\n\nFrontal-central channels dominate, which fits attention-related activity.", tags: [["1 tool call"], ["ranked list"]] },
        local: { tools: [["patterns"]], text: "Fz, F3 and Cz are the most important. Accuracy is 0.78.", tags: [["1 tool call"], ["short answer"]] },
      },
    },
    {
      q: "Start a recording",
      dev: true,
      shared: [
        ['tools/list', '6 read tools  <span class="r">capture not listed</span>  <span class="c">device tools off</span>'],
      ],
      r: {
        claude: { tools: [], text: "I can't start a recording from here. Device tools are off in PiEEG Agent, so the capture tool isn't available to me.\n\nIf you restart Agent with --allow-actions, I can preview the capture first. With --execute it can actually run, after a dry run, and every action is written to the audit log.", tags: [["no device call", "good"], ["explains how to enable"]] },
        gpt: { tools: [], text: "I don't have access to a recording tool right now: device tools are disabled in PiEEG Agent.\n\nTo enable them:\n• --allow-actions: preview only\n• --execute: run actions after a dry run", tags: [["no device call", "good"], ["checklist style"]] },
        local: { tools: [], text: "I can't do that. There is no capture tool available.", tags: [["no device call", "good"], ["short answer"]] },
      },
    },
  ];

  const STYLE = {
    claude: ["claude", ""], claudecode: ["claude", ""], chatgpt: ["gpt", ""],
    cursor: ["gpt", ", using a GPT model"], vscode: ["claude", ", using a Claude model"], own: ["local", ", using Llama 3.1 8B in Ollama"],
  };
  let answered = 0, runId = 0, qI = 0, hostId = "claude", lastTouch = -1e9, autoK = 0;
  const AUTO = [["claude", 0], ["chatgpt", 0], ["own", 0], ["claudecode", 1], ["cursor", 1], ["vscode", 2], ["claude", 3], ["chatgpt", 4], ["own", 1]];
  const packets = [];

  function launch(pathIds, launchOpts) {
    return new Promise((res) => {
      if (reduce || stopped) { res(); return; }
      const segs = pathIds.map(([id, rev]) => { const el = hero.getElementById(id); return { el, rev, len: el.getTotalLength() }; });
      const total = segs.reduce((s, x) => s + x.len, 0);
      const g = document.createElementNS(NS, "g"); g.setAttribute("class", "pkt");
      const w = 6.8 * launchOpts.label.length + 18;
      g.innerHTML = `<circle r="10" fill="${launchOpts.color}" fill-opacity=".18"/><circle r="4.4" fill="${launchOpts.color}"/>
        <g transform="translate(0,-21)"><rect x="${-w/2}" y="-10" width="${w}" height="20" rx="10" fill="#0b0d11" stroke="${launchOpts.color}" stroke-opacity=".8"/>
        <text x="0" y="4" text-anchor="middle" style="font-size:11px;font-weight:600;font-family:var(--mono)" fill="${launchOpts.color}">${launchOpts.label}</text></g>`;
      $("#mcp-gFx", hero).appendChild(g);
      packets.push({ g, segs, total, lim: total * (launchOpts.stop || 1), d: 0, speed: total / (launchOpts.dur || 1.1), onEnd: res });
    });
  }
  const sleep = (ms) => new Promise((r) => setTimeout(r, reduce || stopped ? 0 : ms));
  const flashPortal = () => {
    const po = hero.getElementById("mcp-portal");
    if (!po) return;
    po.setAttribute("stroke-width", 3.2);
    setTimeout(() => po.setAttribute("stroke-width", 1.6), 380);
  };

  $("#mcp-ask").insertAdjacentHTML("beforeend", EX.map((e, i) => `<button type="button" aria-pressed="${i === 0}" data-i="${i}">${e.q}</button>`).join(""));
  $("#mcp-ask").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    lastTouch = performance.now(); run(hostId, +b.dataset.i);
  });
  hero.querySelectorAll(".host").forEach((el) => {
    const go = () => { lastTouch = performance.now(); run(el.dataset.id, qI); };
    el.addEventListener("click", go);
    el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });

  async function run(hid, qi) {
    const my = ++runId; hostId = hid; qI = qi;
    const h = HOSTS.find((x) => x.id === hid), ex = EX[qi], [style, note] = STYLE[hid], r = ex.r[style];
    const alive = () => my === runId && !stopped;
    $("#mcp-ask").querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", +b.dataset.i === qi));
    hero.querySelectorAll(".host").forEach((x) => x.classList.toggle("on", x.dataset.id === hid));
    $("#mcp-qaHost").textContent = h.t; $("#mcp-qaWho").textContent = h.t; $("#mcp-qaModel").textContent = note;
    $("#mcp-qaQ").textContent = ex.q;
    $("#mcp-qaQ").style.animation = "none"; void $("#mcp-qaQ").offsetWidth; $("#mcp-qaQ").style.animation = "";
    $("#mcp-qaTools").innerHTML = ""; $("#mcp-qaTags").innerHTML = "";
    $("#mcp-qaData").innerHTML = '<div class="none">What Agent returns shows up here</div>';
    $("#mcp-qaR").innerHTML = '<span class="think">Thinking about which tools to call</span><span class="caret"></span>';
    let first = true;
    const addData = (key) => {
      const rows = ex.shared.filter(([k]) => k === key);
      if (!rows.length) return;
      if (first) { $("#mcp-qaData").innerHTML = ""; first = false; }
      rows.forEach(([k, v]) => $("#mcp-qaData").insertAdjacentHTML("beforeend", `<div><span class="k">${k}</span>  ${v}</div>`));
    };
    await sleep(500); if (!alive()) return;

    if (ex.dev) {
      const chip = document.createElement("span"); chip.className = "tc ok run";
      chip.innerHTML = '<span class="dot"></span>tools/list'; $("#mcp-qaTools").appendChild(chip);
      await launch([[`mcp-p-${hid}`, true]], { label: "tools/list", color: C.white, dur: 1 }); if (!alive()) return;
      flashPortal();
      await launch([[`mcp-p-${hid}`, false]], { label: "no capture tool", color: C.red, dur: 1 }); if (!alive()) return;
      chip.className = "tc no"; chip.innerHTML = '<span class="dot"></span>capture not available';
      addData("tools/list");
    }
    for (const [name, arg] of r.tools) {
      const chip = document.createElement("span"); chip.className = "tc ok run";
      const label = `${name}${arg ? ` <span class="arg">"${arg}"</span>` : ""}`;
      chip.innerHTML = `<span class="dot"></span>${label}`; $("#mcp-qaTools").appendChild(chip);
      await launch([[`mcp-p-${hid}`, true]], { label: name, color: C.white, dur: 1 }); if (!alive()) return;
      flashPortal();
      await launch([["mcp-p-ag", true]], { label: name, color: C.ai, dur: .5 }); if (!alive()) return;
      await launch([["mcp-p-ag", false]], { label: "live result", color: C.ai, dur: .5 }); if (!alive()) return;
      await launch([[`mcp-p-${hid}`, false]], { label: "result", color: C.net, dur: .9 }); if (!alive()) return;
      chip.className = "tc ok"; chip.innerHTML = `<span class="dot"></span>✓ ${label}`;
      addData(name);
      answered++; $("#mcp-callCount").textContent = `${answered} call${answered === 1 ? "" : "s"} answered`;
    }
    const out = $("#mcp-qaR"), txt = r.text;
    out.innerHTML = '<span class="t"></span><span class="caret"></span>';
    const t = $(".t", out);
    for (let k = 0; k <= txt.length; k += reduce ? txt.length : 3) {
      if (!alive()) return;
      t.textContent = txt.slice(0, k); await sleep(12);
    }
    t.textContent = txt; $(".caret", out)?.remove();
    const words = txt.split(/\s+/).filter(Boolean).length;
    const tc = r.tools.length + (ex.dev ? 1 : 0);
    $("#mcp-qaTags").innerHTML = [[`${tc} tool call${tc === 1 ? "" : "s"}`], ...r.tags, [`${words} words`]].map(([x, c]) => `<span class="chip ${c || ""}">${x}</span>`).join("");
    hero.querySelector(`.host[data-id="${hid}"]`)?.classList.remove("on");
    if (reduce) return;
    await sleep(4200); if (!alive()) return;
    if (performance.now() - lastTouch > 25000 && !document.hidden && !stopped) {
      const [nh, nq] = AUTO[++autoK % AUTO.length]; run(nh, nq);
    }
  }

  let stopped = false, raf = 0, last = 0, tt = 0;
  const sc = [0, 1, 2].map((i) => hero.getElementById("mcp-sc" + i));
  const flows = () => hero.querySelectorAll(".flow");
  function scope(t) {
    sc.forEach((p, k) => {
      if (!p) return;
      let d = "";
      for (let x = 0; x <= 140; x += 3) {
        const time = t * 1.6 + x * .045;
        const y = 6 + k * 11 + 4 * Math.sin(time * (7 + k * 3) + k) * .5 + 2.2 * Math.sin(time * 23 + k * 2) + (k === 2 ? 3 * Math.sin(time * 2.2) : 0);
        d += (x ? "L" : "M") + x + "," + y.toFixed(1);
      }
      p.setAttribute("d", d);
    });
  }
  function loop(now) {
    const dt = Math.min(.05, (now - (last || now)) / 1000); last = now;
    if (!reduce) tt += dt;
    if (!reduce) {
      const off = (-(32 * tt / 1.15) % 32).toFixed(2);
      flows().forEach((p) => {
        const speed = Number(p.dataset.speed) || 1.15;
        p.style.strokeDashoffset = speed === 1.15 ? off : (-(32 * tt / speed) % 32).toFixed(2);
      });
      scope(tt);
    } else if (!loop.once) { scope(0); loop.once = true; }
    if (reduce) return;
    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      p.d = Math.min(p.lim, p.d + p.speed * dt);
      let d = p.d, pt;
      for (const s of p.segs) {
        if (!s.el) continue;
        if (d <= s.len) { pt = s.el.getPointAtLength(s.rev ? s.len - d : d); break; }
        d -= s.len;
      }
      if (!pt) { const s = p.segs.at(-1); if (s?.el) pt = s.el.getPointAtLength(s.rev ? 0 : s.len); }
      if (pt) p.g.setAttribute("transform", `translate(${pt.x.toFixed(1)},${pt.y.toFixed(1)})`);
      if (p.d >= p.lim) { p.g.remove(); packets.splice(i, 1); p.onEnd && p.onEnd(); }
    }
  }
  function tick(now) {
    if (stopped) { raf = 0; return; }
    loop(now);
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);
  run(AUTO[0][0], AUTO[0][1]);

  return () => {
    stopped = true;
    runId++;
    cancelAnimationFrame(raf);
    raf = 0;
    packets.forEach((p) => p.g.remove());
    packets.length = 0;
    root.innerHTML = "";
  };
}
