---
title: "Meet Buddy: Your Browser-Based AI Copilot for Brain Data"
date: "2026-07-23"
category: "Product"
excerpt: "Buddy is the conversational face of PiEEG-Agent—an AI copilot that runs entirely in your browser. Open a tab, connect your headset, and turn your live EEG stream into a plain-English dialogue. No installation, no setup, nothing to download."
image: "/news-images/pieeg-agent-launch.jpg"
featured: false
tags: ["AI", "BCI", "EEG", "Buddy", "PiEEG", "Browser"]
---

Say hello to **Buddy**—the friendly, conversational copilot built on top of PiEEG-Agent, and it lives entirely in your browser. No Python environment, no dependency management, nothing to install. Open [buddy.pieeg.com](https://buddy.pieeg.com/), connect your headset, and start talking to your brain in real time.

## Why Browser-Based?

Because the fastest lab is the one that's already open. Buddy runs online as a web app, so getting started is as simple as opening a tab:

- **Zero install** — no Python, no Node.js, no drivers to configure
- **Works everywhere** — any modern browser on your laptop or desktop
- **Always up to date** — you're on the latest version every time you load it
- **Your data stays local** — signal processing runs in the browser, on your machine

Working with live EEG usually means juggling signal-processing scripts, visualization tools, and statistics notebooks. Buddy collapses all of that into a single conversation in a browser tab. You ask a question about your neural state; Buddy handles the math and hands back an answer you can act on.

No black boxes, either—Buddy shows you *why* it reached a conclusion, from channel importance to effect sizes.

## What You Can Ask

Buddy speaks the language of your experiment. A few things it does out of the box:

**Check your signal quality**

> **You:** how's my signal?
> **Buddy:** All channels read "good", quality 0.98 — trustworthy signal.

**Read your brain state**

> **You:** am I focused or relaxed?
> **Buddy:** Relaxed. Alpha is dominant (0.87) and focus is low (0.31).

**Train a custom pattern**

> **You:** train a pattern called "meditation"
> **Buddy:** Starting pattern training. I'll guide you through recording a baseline, then the active state — say "yes" when you're ready to record.

Buddy walks you through each step, captures labeled windows, and reports honest, cross-validated results: balanced accuracy with leave-one-rep-out CV, the top neural cue, and per-channel importance.

**Go deep on the spectrum**

> **You:** analyze my alpha rhythm
> **Buddy:** Individual alpha peak (IAF): 10.2 Hz · Alpha power: 0.73 (dominant) · 1/f slope: -1.1 · Spectral entropy: 0.68 · Frontal alpha asymmetry: -0.05.

**Map your connectivity**

> **You:** show connectivity in the alpha band
> **Buddy:** Mean correlation 0.34. Strongest pair C3↔C4 (r=0.72) — motor cortex synchrony. Most connected: C3.

## Built on Honest Science

Buddy doesn't hand-wave. Every capability is grounded in research-grade methods:

- **Real-time brain state** — focus, relaxation, and engagement as session-relative indices
- **Pattern recognition** — L2 + group-lasso classifiers validated with leave-one-rep-out cross-validation
- **Spectral analysis** — IAF detection, 1/f slope, theta/beta ratio, spectral entropy
- **Connectivity** — cross-channel amplitude coupling in any frequency band
- **Session recording** — labeled windows compared with effect sizes (Cohen's d)
- **Artifact detection** — eye blinks, jaw clenches, and motion flagged automatically
- **Jupyter notebooks** — auto-generated so your analysis is reproducible

## Connects Right From the Browser

Thanks to browser-native hardware support, Buddy talks to your PiEEG headset directly from the tab—no bridge app or middleware required. It works across the PiEEG ecosystem, from a Raspberry Pi prototype to a professional 32-channel rig. Just plug in, grant access, and Buddy starts reading your live stream.

## Meet Buddy Today

🤖 **[Open Buddy in your browser](https://buddy.pieeg.com/)**

💻 **[GitHub Repository](https://github.com/pieeg-club/PiEEG-agent)**

📚 **[Documentation](https://docs.pieeg.com)**

🛒 **[PiEEG Hardware](https://www.pieeg.com/hardware)**

---

*Whether you're building neurofeedback tools, running cognitive research, or just curious what your brain does during deep work — open a tab and start a conversation with Buddy.*
