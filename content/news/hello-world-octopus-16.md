---
title: "Hello Octopus 16: 60-Second BCI Hackathon Starter & AI-Ready Workbench"
date: "2026-11-12"
category: "Software"
excerpt: "Launch a 60 fps 16-channel EEG workbench in 30 seconds and build complete BCI apps with ready-to-paste AI prompts for GitHub Copilot, Claude Code, and Cursor."
image: "/news-images/hello-world-octopus-16.png"
featured: true
tags: ["Open Source", "Octopus-16", "Hackathon", "Web Bluetooth", "JavaScript", "Python", "AI", "BCI"]
---

Building a real-time 16-channel brain-computer interface application no longer requires days of driver setup, serial parsing, or DSP boilerplate. With **[Hello Octopus 16 (`hello_world_octopus_16`)](https://github.com/pieeg-club/hello_world_octopus_16)**, developers and hackathon teams can clone the starter repository, stream live 24-bit wireless EEG (or run the built-in 250 Hz simulator), and ship a working BCI application in under 60 seconds.

Built around our 26 mm coin-sized, 16-channel dry-electrode **[Octopus-16](/hardware/octopus-16)** sensor, the starter kit runs directly in the browser over **Web Bluetooth** with zero gel, zero ear clips, and zero backend required.

## Live 60 fps 16-Channel Workbench Out of the Box

Opening `index.html` launches the **Hello Octopus 16 — BCI Hackathon Workbench**, a complete zero-dependency browser dashboard powered by `pieeg.js`:

- **16-Channel Real-Time Oscilloscope:** Smooth 60 fps HTML5 Canvas rendering backed by a zero-GC ring buffer across both TI ADS131M08 24-bit ADCs (`CH1–CH8` and `CH9–CH16`), complete with Hampel spike rejection, 1–40 Hz Butterworth bandpass filtering, and selectable 50/60 Hz notch filtering.
- **26 mm Hexagonal 18-Pin Pogo Array Map:** True physical millimeter geometry visualization for all 16 signal pins plus `AINREF` and `GND`, switching between live **Contact RMS (`2–150 µV` Good / Railed / Flat)** verification and a spatial **Alpha Heatmap** with optional Surface Laplacian filtering.
- **FFT Power Spectral Density & Band Powers:** Precomputed 256-point Hanning Cooley-Tukey FFT (`0–50 Hz`) with live **Delta, Theta, Alpha, Beta, and Gamma** band power bars and dominant peak tracking.
- **Live BCI Neuro-Controller Sandbox:** An interactive Alpha Charge Orb, eye-blink trigger detector, and clean-EEG artifact gate designed as a ready-to-hack loop for neurofeedback and arcade games.
- **Built-In 250 Hz Simulator & CSV Recorder:** Code and test before touching hardware (or while a teammate wears the board) with interactive keyboard triggers (`Space` = Eye Blink, `A` = Alpha Wave Boost, `C` = Jaw Clench) and one-click CSV recording.

## Pre-Wired for AI Coding Agents

The repository includes ground-truth context files (`AGENTS.md`, `CLAUDE.md`, and `.cursorrules`) so **GitHub Copilot, Claude Code, Cursor, and Windsurf** already know the exact BLE UUIDs, 51-byte packet structure, 18-pin hexagonal geometry, and 60 fps zero-lag rendering rules.

Developers can also jump straight into five copy-paste prompt tracks in `PROMPTS.md`:

1. **60 fps BCI Arcade Game (`bci-game.html`):** Alpha mind shield, blink laser, and jaw-clench slow-motion controls.
2. **Neurofeedback Synthesizer (`neuro-synth.html`):** 30-second baseline calibration wizard paired with a Z-score WebAudio binaural ambient pad.
3. **16-Pin Spatial Heatmap (`spatial-lab.html`):** High-density 2D hexagonal interpolation and Current Source Density (Surface Laplacian) explorer.
4. **SSVEP / P300 Speller (`ssvep-lab.html`):** Precision 10/12/15 Hz visual flicker targets and labeled epoch CSV recorder with `244.14 Hz` LEDC clock compensation.
5. **React / Three.js Hook (`useOctopus16.ts`):** Zero-lag 250 Hz ref stream paired with throttled 15 Hz React UI state updates.

## Clone & Run in 30 Seconds

```bash
git clone https://github.com/pieeg-club/hello_world_octopus_16.git
cd hello_world_octopus_16
npm start
```

Open `http://localhost:3000` in Chrome or Edge to pair with `Octopus-16-XXXX` over Bluetooth, or open `http://localhost:3000/?sim=1` to launch the 250 Hz simulator immediately.

For Python and machine learning workflows (SciPy, MNE, PyTorch, or LabStreamingLayer), the repository also ships with `python_quickstart.py` using `bleak` and `numpy` for auto-discovery BLE streaming, terminal visualization, and multi-channel CSV logging.

*Safety note: Octopus 16 is a non-medical research device. Always power Octopus 16 from a 5 V battery power bank while worn on the head, never from mains power or a wall-plugged laptop.*

## Explore the Starter Kit

- **GitHub Repository:** [github.com/pieeg-club/hello_world_octopus_16](https://github.com/pieeg-club/hello_world_octopus_16)
- **Hardware Platform:** [PiEEG Octopus-16](/hardware/octopus-16)
