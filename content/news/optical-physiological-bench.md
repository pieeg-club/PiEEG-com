---
title: "After BioPose, we present the Optical Physiological Bench"
date: "2026-10-17"
category: "Software"
excerpt: "A new scientific recording and signal-analysis bench is live on PiEEG Cloud. It turns a standard RGB webcam into a quantitative, time-locked optical measurement instrument running alongside your live EEG/sEMG stream."
image: "/news-images/optical-bench.jpg"
featured: true
tags: ["Software", "Optical Physiological Bench", "rPPG", "EEG", "sEMG", "Signal Processing", "PiEEG Cloud"]
---

A new scientific recording and signal-analysis bench is live on PiEEG Cloud. It turns a standard RGB webcam into a quantitative, time-locked optical measurement instrument running alongside your live EEG/sEMG stream.

## What is inside:

- **Identical-frame rPPG comparison:** Runs `POS` (Plane-Orthogonal-to-Skin), `CHROM`, and `GREEN` simultaneously on uniform-resampled ROI time series with zero-phase biquad bandpass filtering, Hann-windowed cardiac PSD, and De Haan spectral SNR (dB).
- **Forehead virtual sensor array (2×2, 3×4, 4×6):** Treats the tracked forehead polygon as a grid of virtual optical sensors, computing per-cell pulsatile AC/DC amplitude (ppt), raw unprocessed CV, per-cell SNR, narrowband coherence at the cardiac fundamental, and the full N×N cross-sensor correlation matrix.
- **Slow optical dynamics (<0.15 Hz):** Tracks baseline-relative ΔR/R₀, ΔG/G₀, ΔB/B₀, chromaticity drift, low-frequency oscillations, and Interval A vs. B deltas, with a non-skin ambient reference patch to flag lighting, auto-exposure, or auto-white-balance shifts.
- **SNR-gated pulse-interval metrics:** Peak detection, IBI physiological gating, instantaneous BPM, `SDNN-opt`, `RMSSD-opt`, and pulse-amplitude variability (`PAV`).
- **Live Bio / EEG trace dock + unified recorder:** Inspect live PiEEG channels on the same screen, drop manual or frontal EOG blink markers, reprocess recorded sessions offline from preserved raw RGB without the camera, and export timestamped CSV or JSON takes.
- **Built-in reference validation datasets:** Test the pipeline immediately without a camera using deterministic `66 BPM` stationary, `78 BPM` specular-contaminated, and `72 BPM` illumination-step reference takes.

Try it live: [https://cloud.pieeg.com](https://cloud.pieeg.com/) (Experiences -> **Optical Physiological Bench**)
