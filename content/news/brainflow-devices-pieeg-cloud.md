---
title: "PiEEG Cloud Expands Beyond PiEEG Hardware with Browser-Native Support for Third-Party BrainFlow Boards"
date: "2026-10-19"
category: "Software"
excerpt: "Connect Muse, OpenBCI Cyton, Daisy, Ganglion, FreeEEG32, Shimmer3, and a growing catalog of BrainFlow-compatible EEG and biosignal devices directly in your browser via Web Bluetooth and Web Serial."
image: "/news-images/brainflow-pieeg-cloud.jpg"
featured: false
tags: ["Software", "PiEEG Cloud", "BrainFlow", "WebBluetooth", "WebSerial", "EEG", "Open Source"]
---

Researchers and developers shouldn't have to rebuild their software stack every time they switch headsets. Expanding **[PiEEG Cloud](https://cloud.pieeg.com/lobby)** beyond first-party PiEEG shields, we have launched a dedicated **BrainFlow Devices** tab that connects third-party EEG, EMG, and IMU boards directly in Chromium browsers over **Web Bluetooth (GATT)** and **Web Serial**.

## Zero Native Drivers, Automatic Nyquist Adaptation

Powered by protocol specifications and conversion equations accredited to the MIT-licensed **[BrainFlow](https://github.com/brainflow-dev/brainflow)** ecosystem, the browser-native driver catalog supports **16+ third-party hardware profiles** (now expanded to 19 browser-native profiles across 7 WebBLE and 12 WebSerial boards)—including **Muse 2 / Muse S / Athena**, **OpenBCI Cyton, Cyton+Daisy, and Ganglion**, **FreeEEG32 / FreeEEG128**, **Mentalab Explore**, and **Shimmer3**.

When you pair a supported device from `cloud.pieeg.com/lobby`:

- **Direct Browser Pairing:** Connects straight through `navigator.bluetooth` or `navigator.serial` in Chrome or Edge—no Python environment, BLED112 wrapper, or local daemon required.
- **Automatic DSP & Sample-Rate Scaling:** PiEEG Cloud adapts dynamically to each board's native ADC rate (50 Hz to 512 Hz), clamping bandpass cutoffs safely below Nyquist and streaming into live FFT spectrograms, 3D scalp topomaps, **3D Hand · IMU** telemetry views, and 35+ interactive BCI benches.
- **Local-First Privacy:** Packet unpacking, filtering, spectral estimation, and Buddy AI feature extraction execute locally inside your browser tab; raw waveforms are never uploaded unless you explicitly share a session.

Third-party device streaming is unlocked free during the launch period.

**[Connect Your Board in PiEEG Cloud →](https://cloud.pieeg.com/lobby)**

**[View the Full BrainFlow Compatibility Matrix →](https://docs.pieeg.com/cloud/brainflow/)**
