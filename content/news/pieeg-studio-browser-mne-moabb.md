---
title: "PiEEG Studio Launches: Browser-Based MNE-Python Analysis and MOABB BCI Benchmarks"
date: "2026-11-06"
category: "Software"
excerpt: "Run full MNE-Python preprocessing, ICA, spectral topomaps, connectivity, and 7 MOABB BCI decoding pipelines directly in your browser—and export every step as a reproducible Python script or Jupyter notebook."
image: "/news-images/pieeg-studio-overview.png"
featured: true
tags: ["Software", "PiEEG Studio", "MNE-Python", "MOABB", "Python", "BCI", "PiEEG Cloud"]
---

Analyzing EEG recordings rigorously with **MNE-Python** and benchmarking decoders with **MOABB** typically starts with hours of Python environment setup, dependency management, and boilerplate scripting. With the launch of **[PiEEG Studio](https://pieeg-studio.fly.dev/)**, that entire scientific workflow now runs directly in your browser—and writes clean, reproducible Python code for you as you work.

Accessible standalone or directly from **[PiEEG Cloud](https://cloud.pieeg.com)** (via the Session Lobby, Saved Sessions, or playback toolbar), PiEEG Studio accepts **CSV, Excel, EDF, BDF, FIF**, and live browser captures with zero local installation.

## Full 11-View MNE-Python Pipeline

Drop in a recording—or generate a synthetic paradigm—to move interactively through a complete electrophysiology workflow:

- **Signal Browser & Channel Quality:** Inspect multi-channel traces, bad-channel metrics, and montage layouts.
- **Preprocessing & Artifact Removal:** Apply zero-phase bandpass/notch filters, common average or custom re-referencing, and Independent Component Analysis (ICA).
- **Spectral & Topographic Mapping:** Compute Welch/multitaper power spectral densities alongside 2D scalp topomaps across canonical frequency bands.
- **Epochs, ERPs & Time-Frequency:** Slice event-locked epochs, inspect evoked responses, and visualize time-frequency spectrograms.
- **Functional Connectivity:** Evaluate cross-channel coherence and phase-coupling matrices.

## Built-In MOABB BCI Benchmark Lab

The **BCI & MOABB** workspace brings standardized decoding benchmarks—including Motor Imagery, P300/ERP, and SSVEP—straight into the browser across **7 classic and Riemannian pipelines**:

1. `CSP + LDA` (Common Spatial Patterns + Shrinkage LDA)
2. `CSP + SVM` (Common Spatial Patterns + RBF SVM)
3. `Riemannian TS + LR` (SPD Covariance + Tangent Space + Logistic Regression)
4. `Riemannian MDM` (Minimum Distance to Riemannian Mean)
5. `LogVar + LDA` (Channel Log-Variance + Shrinkage LDA)
6. `BandPower + RF` (Welch Band Powers + Random Forest)
7. `ERP-Xdawn + LDA` (Xdawn Spatial-Temporal Covariance + LDA)

Compare accuracy, balanced accuracy, F1, and ROC-AUC against chance level, inspect confusion matrices and CSP spatial pattern topomaps, and validate within-session or cross-session generalization.

## Every Click Becomes Reproducible Python Code

PiEEG Studio is not a closed GUI box. Every filter, montage change, epoch window, and MOABB benchmark you configure automatically generates a **standalone Python script or Jupyter notebook** that you can download, version-control, customize, and batch-run on new datasets.

In the Cloud Preview, each browser session is strictly isolated via per-session sandboxing (`X-Studio-Session`) with automatic 15-minute inactivity cleanup; if you run the local Community Edition (`127.0.0.1:1618`), PiEEG Cloud automatically routes Studio actions locally for unlimited file sizes and 150+ online MOABB datasets.

**[Launch PiEEG Studio →](https://pieeg-studio.fly.dev/)**

**[Read the PiEEG Studio Documentation →](https://docs.pieeg.com/cloud/studio/)**
