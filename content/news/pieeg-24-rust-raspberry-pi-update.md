---
title: "PiEEG-24 Engineering Update: Real-Time 24-Channel Dry EEG on Raspberry Pi with Rust Acceleration"
date: "2026-10-25"
category: "Hardware"
excerpt: "Powered by three daisy-chained Texas Instruments ADS1299 ADCs and native Rust DSP acceleration in PiEEG Server, real-time 24-channel dry-electrode EEG acquisition is now running on Raspberry Pi."
image: "/news-images/pieeg-24-board.jpg"
featured: false
tags: ["Hardware", "PiEEG-24", "Raspberry Pi", "Rust", "ADS1299", "EEG", "Open Source"]
---

After an extended R&D cycle, **PiEEG-24** is back in active bench validation—bringing **24 simultaneous EEG channels** onto a single Raspberry Pi shield using dry electrodes and **three Texas Instruments ADS1299** 24-bit analog front-end chips.

## Why Rust Acceleration Unlocked 24 Channels on the Edge

Scaling a Raspberry Pi shield from 8 or 16 channels up to 24 high-resolution channels multiplies both SPI read throughput and continuous multi-channel filtering load. To sustain deterministic real-time acquisition, bandpass/notch filtering, and spectral analysis without dropped samples on a single-board computer, we paired the triple-ADS1299 hardware stack with **[pieeg-core](https://github.com/pieeg-club/PiEEG-core)**—our compiled Rust native accelerator inside **[PiEEG Server](/server)**.

With zero-copy acquisition and compiled IIR filtering handling the hot path, a standard Raspberry Pi can now acquire, filter, visualize, and stream all 24 dry-electrode channels live.

## Next Steps Toward Release

We are currently completing final signal-integrity checks, cross-chip synchronization verification, and open-source Python/Rust driver documentation in the **[PiEEG-24 GitHub repository](https://github.com/pieeg-club/PiEEG-24)** ahead of hardware availability.

**[Follow PiEEG-24 on GitHub →](https://github.com/pieeg-club/PiEEG-24)**

**[Explore PiEEG Server →](/server)**
