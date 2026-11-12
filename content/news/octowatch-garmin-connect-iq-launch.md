---
title: "octoWatch Goes Live on the Garmin Connect IQ Store: Direct 16-Channel EEG on Your Wrist"
date: "2026-11-05"
category: "Product Launch"
excerpt: "octoWatch connects 46 Garmin smartwatch models directly to the Octopus-16 headset over Bluetooth Low Energy—streaming, filtering, and visualizing 16 channels of 250 SPS EEG, EOG, and EMG with no phone or laptop in between."
image: "/news-images/octowatch-garmin.jpg"
featured: true
tags: ["Product Launch", "octoWatch", "Garmin", "Octopus-16", "Wearables", "EEG", "BLE"]
---

Following our recent mobile and Meta Quest releases, PiEEG has officially arrived on the wrist: **[octoWatch](https://apps.garmin.com/apps/8e994535-c853-45ca-abe3-ccef61119c8b)** is now live and free on the **Garmin Connect IQ Store**.

Unlike companion apps that merely mirror numbers from a phone, **octoWatch pairs your Garmin watch directly with our [Octopus-16](/hardware/octopus-16) sensor over Bluetooth Low Energy (`Toybox.BluetoothLowEnergy`)**. There is no smartphone, no laptop, and no cloud server in the loop—your biosignals stay strictly between your head and your wrist.

## Engineering 16 Channels at 250 SPS Onto a Smartwatch

Sports watches are traditionally designed to receive one heart-rate integer per second, not 16 channels of microvolt-scale electrophysiology at 250 samples per second. Fitting continuous multi-channel waveforms inside Garmin's tight BLE MTU and memory constraints required both custom Octopus-16 framing (`0xA1` compact 20-byte batched GATT notifications alongside full 24-bit `0xA0` framing) and a zero-allocation Monkey C DSP engine running on the watch:

- **Real-Time Wrist Oscilloscope:** View live 250 SPS filtered traces (with online IIR DC-drift blocking) for any channel from `Fp1` to `P8`, annotated with brain region, RMS amplitude in µV, and Signal Quality Index (`SQI%`).
- **4-Channel Montage & 16-Channel Matrix:** Compare brain regions side by side or inspect a live 10–20 electrode contact grid that turns green as each pin establishes clean contact.
- **Athlete Readiness HUD:** Track relative spectral band power bars—`α CALM`, `β FOCUS`, and `θ REST`—alongside a pre-session readiness readout for neurofeedback and training exploration.
- **Built-In 250 SPS Simulator:** No Octopus-16 nearby? After six seconds without a paired headset, octoWatch automatically boots an on-watch synthetic generator (10 Hz alpha, 22 Hz beta, 5 Hz theta, and frontal blink artifacts) so anyone can explore all five 20 FPS screens immediately.

![octoWatch Live EEG Screens on Garmin](/news-images/octowatch-screens.jpg)

## Compatible Across 46 Garmin Watch Models

octoWatch runs across **46 devices** spanning the **Venu** (Venu through Venu 3 & Sq 2), **vívoactive** (4, 4s, 5), **fēnix** (6, 7, and 8 series), **epix** (Gen 2 & Pro), and **Forerunner** (165, 245, 255, 265, 745, 945, 955, 965) lineups.

*Designed for non-medical research, education, and personal neurofeedback.*

**[Download octoWatch Free on Garmin Connect IQ →](https://apps.garmin.com/apps/8e994535-c853-45ca-abe3-ccef61119c8b)**

**[Read the octoWatch Documentation →](https://docs.pieeg.com/software/octowatch/)**
