---
title: "Universal BYOD Ingestion Engine Brings Custom Biosignal Hardware Directly to the Browser"
date: "2026-11-09"
category: "Software"
excerpt: "Connect custom EEG, EMG, and physiological prototypes directly to PiEEG Cloud over WebHID and WebSerial using declarative JSON profiles and an AI-assisted configuration generator—with zero local SDKs."
image: "/news-images/universal-byod-engine.jpg"
featured: true
tags: ["Software", "PiEEG Cloud", "BYOD", "WebHID", "WebSerial", "EEG", "EMG", "Open Science"]
---

Building a custom EEG, EMG, or physiological sensor often means writing throwaway desktop acquisition scripts before you can even inspect a clean spectrum. To close the gap between hardware prototyping and live analysis, we have launched the **Universal Bring Your Own Device (BYOD) Ingestion Engine** in **[PiEEG Cloud](https://cloud.pieeg.com)**.

Instead of writing native drivers or maintaining local Python bridges, engineers and researchers can now describe how their device formats packets, import a declarative JSON hardware profile, and stream directly into the browser.

## From Datasheet to Live Stream with AI-Assisted Profiles

Setting up a custom serial or USB HID protocol usually requires translating register tables and byte offsets by hand. The BYOD modal in PiEEG Cloud includes a built-in **AI Prompt Generator** alongside a visual configuration form:

1. **Describe your hardware:** Paste your microcontroller packet layout, ADC specifications, or protocol notes.
2. **Generate a structured JSON profile:** The generator assembles a schema-constrained prompt you can run in any LLM assistant (such as Claude or ChatGPT) to output a valid PiEEG Cloud hardware profile.
3. **Import and stream locally:** Paste or upload the `.json` configuration into your browser and connect immediately.

## Inside the Declarative Ingestion Engine

Every step of packet acquisition and signal normalization executes client-side inside the browser tab:

- **Direct WebHID & WebSerial Transport:** Communicates natively with USB HID sensors and USB/UART serial devices without companion daemons.
- **Declarative Packet Framing:** Specifies USB vendor/product IDs, baud rates, sync headers, packet lengths, sampling rates, channel names, and physical scaling factors in plain JSON.
- **Arbitrary Bit-Level ADC Decoding:** Supports 8-, 16-, 24-, and 32-bit signed or unsigned samples, endianness control, and non-byte-aligned bit packing.
- **Client-Side Stream Transforms:** Unpacks frames, applies optional stream transforms, and feeds normalized microvolt channels straight into PiEEG Cloud's real-time IIR filters, FFT spectrograms, 3D topographic maps, Live Lab, and interactive BCI benches.
- **Local-First Storage:** Custom device profiles are persisted exclusively in your browser's `localStorage`—no cloud account or server upload required.

## Try It in PiEEG Cloud

Open the Session Lobby, click **+ Add Custom Device**, and connect your research prototype or custom biosignal board in minutes.

**[Launch PiEEG Cloud →](https://cloud.pieeg.com/lobby)**

**[Read the Cloud Documentation →](https://docs.pieeg.com/cloud/)**
