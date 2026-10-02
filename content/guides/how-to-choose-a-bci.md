---
title: "How to choose: PiEEG, OpenBCI, or Muse"
date: "2026-10-02"
updated: "2026-10-02"
category: "Buying guide"
excerpt: "PiEEG is a bio-data developer platform. OpenBCI is an open board ecosystem. Muse is a consumer headband. This page is the checklist for comparing them without a ranking."
image: "/products/pieeg.png"
featured: true
tags: ["BCI", "EEG", "PiEEG", "OpenBCI", "Muse"]
faqs:
  - question: "Is PiEEG just an EEG board?"
    answer: "No. The boards are the input. PiEEG is the platform around the stream: PiEEG Cloud in the browser, PiEEG Server, an agent that calls your model, a browser SDK, and outputs to OSC, LSL, Unity, and a phone or headset app. Comparing PiEEG to OpenBCI or Muse on channel count alone misses the product."
  - question: "Should I compare PiEEG to OpenBCI or to Muse?"
    answer: "Both, for different reasons. OpenBCI is the open board people already know: Cyton, a dongle, a GUI, BrainFlow. Muse is the consumer headband: four fixed sites and an app. PiEEG overlaps the first on hardware and the second on 'put it on and see a signal', then continues into a developer stack neither of those products is."
  - question: "Does a 24-bit ADC mean cleaner EEG?"
    answer: "Not by itself. Bit depth is the converter's number format. Contact, reference, cables, gain, and montage move the recording more than the brand. This series does not invent a head-to-head noise bench."
  - question: "Are PiEEG devices medical devices?"
    answer: "No. PiEEG is for education, research prototyping, and development. It is not an FDA- or CE-cleared medical device. See the liability page."
---

People searching "OpenBCI vs" or "Muse vs" are usually holding three different products and calling all of them a BCI. This series compares two of them to PiEEG. It does not rank them.

1. **Muse** is a consumer headband. Four dry EEG sites, motion sensors, an app. Raw samples exist through community tools. The product you buy is the session.
2. **OpenBCI** is an open board ecosystem. The Cyton is the object in most "vs" threads: ADS1299, a USB radio dongle, design files, a GUI, BrainFlow. Electrodes are separate. Galea exists as their mixed-reality headset. This series does not spec it.
3. **PiEEG** is a bio-data developer platform. Boards are how a signal gets in. The product is what happens next: a browser, a local server, an agent, a SDK, and outputs.

Worked comparisons: [PiEEG vs OpenBCI](/guides/pieeg-vs-openbci) and [PiEEG vs Muse](/guides/pieeg-vs-muse).

## What "platform" means here

If a page compares PiEEG to OpenBCI as two PCB vendors, it is the wrong page. The boards matter. They are not the whole object.

From this site, the platform is:

- **Input.** [Hardware](/hardware) from 8 to 32 channels: Raspberry Pi shields, Arduino, STM32, Jetson, IronBCI over BLE, IronBCI-32 over USB, Octopus-16 dry pins, and [PiEEG XR](/xr) as a face gasket (Kickstarter, not a shipping consumer headset). A simulator runs with no board.
- **See the stream.** [PiEEG Cloud](/cloud) in a Chromium tab, no install. [PiEEG Server](/server) on your machine: WebSocket JSON, dashboard, CSV.
- **Build on it.** [pieeg.js](/news/pieeg-js-browser-sdk), [bioIDE](https://ide.pieeg.com), [examples](/examples), [1020 Academy](https://1020.pieeg.com).
- **Ask a model.** [Buddy and PiEEG Agent](/agent). Your key. Anthropic, OpenAI, or local Ollama. MCP tools an editor can call. Device actions stay off until you enable them.
- **Send it somewhere.** LSL, OSC (VRChat, TouchDesigner, Max), Unity, webhooks, a [Chrome extension](/browser), [BodyPress](/news/bodypress-mobile-launch).

None of that is a claim that the EEG is cleaner than a Cyton or a Muse. It is the scope of the product. A comparison that stops at the ADC has not compared PiEEG.

## What those other pages skip

Vendor "vs" posts sort the market into "integrated system" and "DIY kit", then treat setup time as the price. That split is real. It hides the questions that actually change the buy:

- **The converter is not the recording.** Two ADS1299 boards can differ once electrodes, reference, and cables are attached. We have not published a head-to-head noise bench. Do not treat a shared chip name as a ranking.
- **Channel count without montage is incomplete.** Four fixed Muse sites, an 8-channel Cyton with a cap you assemble, and 16 dry pins over visual cortex are three instruments.
- **Raw data is a contract.** Is every sample available, at what rate, in what units, and do you need a paid seat or a community bridge to export it?
- **Software is part of the object.** A GUI that plots the Cyton is not the same product as a browser platform with an agent. A meditation app is not the same product as either. Compare the job, then the sensor.

## The six questions that actually sort the market

Answer these before you compare brand names.

### 1. What signal, and where on the body?

EEG on the scalp, EMG on a muscle, ECG on the chest, and EOG around the eyes are the same class of biopotential, not the same experiment. A face gasket and an occipital dry board are both "16-channel" products in some catalogs and they do not answer the same question.

If the protocol needs a standard 10-20 map, you need a cap or a headset whose sites are published. If the protocol is "one muscle" or "visual cortex only", a full cap is extra work.

### 2. How many channels, and are they simultaneous?

More channels help when you need spatial coverage or when you will reject artifacts using other channels. They do not raise signal-to-noise on a single site by themselves.

Also ask whether every channel is converted at the same instant. Some headsets use one ADC and sample sites in sequence. Some boards use a multi-channel converter that samples the bank together. Sequential sampling is not a defect. It is a different timing model, and it matters for cross-channel phase and for high-rate EMG more than for a slow band-power demo.

### 3. Wet, saline, or dry?

| Interface | What you get | What you pay in time |
| --- | --- | --- |
| Wet gel cup or cap | Usually the most stable contact for a lab session | Setup, cleanup, gel in hair |
| Saline felt | Faster than gel, still a wet interface | Pads dry out during a long session |
| Dry metal, pins, or spring contacts | Fast on/off, no gel | Contact varies with hair, pressure, and motion |

There is no dry electrode that removes this tradeoff. If a page implies otherwise, treat that as marketing.

### 4. What is the host, and what is the link?

This is the split most "vs" articles bury under "easy vs DIY".

- **SPI or USB to a computer you control** (Raspberry Pi header, USB serial): the sample rate is limited by the converter and the wire, not by a radio packet. You must have that computer.
- **A vendor radio dongle**: convenient on a laptop, and the dongle firmware can cap the rate. Read the vendor's data-format note, not only the ADC datasheet.
- **Standard Bluetooth LE to a phone or browser**: no dongle, shorter range and a lower practical rate. Confirm the phone stack is actually implemented. Some boards document a proprietary radio and say a standard BLE path is not defined yet.

On PiEEG the link depends on the board, and the platform does not. IronBCI and Octopus-16 enter the browser over Web Bluetooth. IronBCI-32 uses Web Serial. PiEEG-8 and PiEEG-16 sit on a Raspberry Pi and feed PiEEG Server over SPI. The dashboard, the agent, and the outputs are the same contract. Picking "PiEEG" without picking a board picks the wrong sensor. It does not pick a different platform. Use the [hardware index](/hardware) for the sensor, and [Cloud](/cloud) or [Server](/server) for the software.

### 5. Who owns the sample, and what does the software cost?

Three patterns show up in this market:

- **Raw samples on the wire, tools optional.** You can record with Python, BrainFlow, or your own code. A dashboard may exist. It is not a gate.
- **Raw samples behind a subscription or a developer application.** The headset works out of the box for the vendor's metrics. Exporting the time series is a separate contract. Read the current terms. They change.
- **Processed scores only** (attention, meditation, and similar). Fine for a demo. Not enough if you need to defend a filter chain or reanalyze the session.

Open hardware does not mean the recording is better. It means you can inspect the schematic and keep the board if a website changes. PiEEG publishes those files under [pieeg-club](https://github.com/pieeg-club). OpenBCI publishes Cyton design files too. Muse is a closed headband. The open-source fact is about maintenance and about whether you can build past the vendor app. It is not a noise claim, and it is not "no cloud": PiEEG Cloud is a product you can use or skip.

### 6. What is the total object, not the board price?

A board price is not a system price. Add:

- electrodes or a cap
- the host, if the board is a shield (a Raspberry Pi, an Arduino, a Jetson, an STM32 Nucleo)
- a battery, if the board is not USB-powered from the host
- software seats, if raw export is paid
- your time to fit, impedance-check, and write the first recorder

We do not publish competitor street prices here. Shops change currency and kits. Use the vendor cart for their number, and the [PiEEG hardware pages](/hardware) for ours (those prices are read from the current catalog, not copied into this article).

## The three products, on the same axes

Orientation, not a scoreboard. Hardware numbers are from pages checked on 2 October 2026. Muse's own shop redirected that day, so Muse sensor names come from Mind Monitor's manual and the muse-lsl readme, not from an Interaxon datasheet.

| | PiEEG | OpenBCI | Muse |
| --- | --- | --- | --- |
| What you are buying | A developer platform. Boards are the input. | A board ecosystem. Cyton is the usual object. GUI and BrainFlow around it. | A consumer headband and an app. |
| Montage | You place it. 8, 16, or 32 channels, depending on the board. Octopus-16 is one small dry patch, not a cap. | 8, or 16 with Daisy. Electrodes and a headset are separate. | Four fixed sites: TP9, AF7, AF8, TP10. |
| Raw samples | WebSocket, browser SDK, or CSV. No subscription gate. | On the wire, and in BrainFlow. Their GUI is the usual first view. | Community path: muse-lsl, Mind Monitor. Not the app you buy. |
| Agent / your model | Buddy and PiEEG Agent. Your LLM key. MCP. | Not found on the Cyton pages we opened. | Not the product. |
| Where it goes without you writing the bridge | OSC, LSL, Unity, webhooks, Chrome, BodyPress, examples gallery. | BrainFlow and their GUI. You write the rest, or you use the community. | OSC if you run Mind Monitor. LSL if you run muse-lsl. |
| Open files | Schematics and firmware published. | Cyton design files published. | Closed headband. |
| When it is the wrong buy | You wanted a headband and a score, and you will not build anything. | Your course already uses the Cyton GUI and you only need that board. | You need more than four sites, or you need to move them. |

## What we will not claim

- We will not call a PiEEG recording cleaner because the platform is larger.
- We will not quote a noise figure we have not measured.
- We will not say any of these is appropriate for diagnosis or treatment. Read the [liability notice](/liability).
- We will not treat another company's marketing superlatives as facts.

## How to use the rest of this series

- [PiEEG vs OpenBCI](/guides/pieeg-vs-openbci): platform against the Cyton ecosystem, including the radio limit on 16-channel streaming.
- [PiEEG vs Muse](/guides/pieeg-vs-muse): platform against a four-site consumer headband.

If you already know the platform fits and you only need the sensor, start at [hardware](/hardware).

## Sources checked for this page

- This site: hardware, Cloud, Server, Agent, examples, XR. 2 October 2026.
- OpenBCI, [Cyton specs](https://docs.openbci.com/Cyton/CytonSpecs/) and [Cyton data format](https://docs.openbci.com/Cyton/CytonDataFormat/).
- muse-lsl readme and Mind Monitor's technical manual, for Muse sensor names. Interaxon's shop URLs redirected and were not used.
