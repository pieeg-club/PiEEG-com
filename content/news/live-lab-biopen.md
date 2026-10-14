---
title: "Live Lab (Bio-Pen): Shareable Live Biosignal Pipelines in a Single URL"
date: "2026-10-14"
category: "Software"
excerpt: "Live Lab runs multi-stage JavaScript DSP and classifier pipelines at 15 Hz against the 250 Hz multichannel EEG/EMG ring buffer in PiEEG Cloud, with trial-grouped cross-validation, a head-to-head Decoder Arena, and one-click /lab/:id sharing."
image: "/news-images/biopen.jpg"
featured: true
tags: ["Software", "Live Lab", "Bio-Pen", "EEG", "Signal Processing", "BCI"]
---

**Live Lab (Bio-Pen)** is now live in PiEEG Cloud at [cloud.pieeg.com/lab](https://cloud.pieeg.com/lab).

Open the URL to run a chain of JavaScript stages at 15 ticks per second against a 2-second 250 Hz multichannel ring buffer from a connected PiEEG board (Web Bluetooth, Web Serial, or `pieeg-server` WebSocket). When no hardware is connected, `/lab` boots directly on the built-in 8-channel simulated stream so any shared link runs immediately.

## Reactive stage pipeline

User code executes inside a dedicated Web Worker. Stage 1 receives the live frame (`win`, `EEG`, `bands`, `focus`, `relax`, `dataset`, `fs`). Each following stage receives the previous stage's return value as `input`.

Every stage plots its return value automatically on the right-hand instrument canvas:

- **Scalar** (`number` or `{ value, unit }`): readout and 120-tick rolling sparkline.
- **1D array** (`<= 16` items): bar chart across channels or features.
- **1D array** (`> 16` items): time-domain waveform trace with zero-line and peak amplitude in µV.
- **Spectrum** (`{ freqs, power, peakHz }`): Hann-windowed power spectral density with the 8-12 Hz alpha band marked.
- **Matrix** (`number[][]` or `{ labels, matrix }`): 2D heatmap for covariance or confusion matrices.
- **Decoder** (`{ label, probs, loroBalancedAccuracy }`): live class probability bars and held-out accuracy badge.

Clicking **Freeze 2s Window** captures the current 2-second multichannel window and feeds that exact buffer on every tick so you can edit and debug DSP or feature code deterministically before returning to the live stream.

## Built-in DSP, classifiers, and LORO-CV

The worker scope provides pure TypeScript numerics without external backend dependencies:

- **Spatial and time-domain**: `car(win)` (Common Average Reference), `bipolar(chA, chB)`, `detrend`, `zscore`, `mean`, `std`, `variance`, `rms`, `lineLength`, `slopeSignChanges`, `cohensD`.
- **Spectral**: `fft(sig)`, `psd(sig, fs, maxHz)`, `bandpower(sig, [lo, hi], fs)`.
- **Classifiers and cross-validation**: `lda(X, y, shrinkage)` (Ledoit-Wolf Shrinkage-LDA), `logreg(X, y)` (L2 multinomial logistic regression), `crossValScore(X, y, k)`, and `loroCV(X, y, reps, kind)` (Leave-One-Rep-Out cross-validation).

The **Session Dataset** bar records 2-second labelled epochs from the live stream (or seeds a 12-trial reference dataset) and groups samples by repetition index. In the **Decoder Arena**, your active pipeline decoder is benchmarked side by side against reference Shrinkage-LDA and L2 Logistic Regression models, showing both trial-grouped LORO-CV balanced accuracy and naive sample-split k-fold accuracy so temporal autocorrelation leakage is visible.

## Graded briefs and one-click Bio-Pen sharing

- **Graded Briefs**: Select a brief from the header to run live `check(condition, message)` assertions against your pipeline output and session dataset.
- **Save, Fork, and Share (`Ctrl+S`)**: Saving mints a `/lab/:id` URL and copies it to the clipboard. Guest creators receive a local cryptographic edit token (`X-Pen-Token`) so they can update or delete their own pen without an account; anyone else who opens the link and saves creates a forked `/lab/:newId`.
- **OSC Output**: Enable the Local Bridge toggle to stream the final stage's numeric or probability outputs to `/pieeg/lab/*` over WebRTC P2P.

## Limits

- Within-session Cohen's d and LORO-CV balanced accuracy describe separation within the current electrode placement and session; they are not cross-subject or cross-day generalisation claims.
- Frontal channels (Fp1/Fp2) carry large corneal-retinal EOG (100-400 µV) and facial sEMG above 20 Hz. Always inspect the time-domain waveform alongside spectral ratios.

## Open Live Lab

- **Workbench**: [cloud.pieeg.com/lab](https://cloud.pieeg.com/lab)
- **Documentation**: [docs.pieeg.com/cloud/live-lab](https://docs.pieeg.com/cloud/live-lab)
