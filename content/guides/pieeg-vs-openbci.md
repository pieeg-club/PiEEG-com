---
title: "PiEEG vs OpenBCI: platform or board ecosystem"
date: "2026-10-02"
updated: "2026-10-02"
category: "Comparison"
excerpt: "OpenBCI is an open board ecosystem: Cyton, a dongle, a GUI, BrainFlow. PiEEG is a bio-data developer platform: boards are the input, then a browser, a server, an agent, and outputs. Same ADC family on some boards. Not the same product."
image: "/products/pieeg.png"
featured: true
tags: ["PiEEG", "OpenBCI", "BCI", "EEG", "Comparison"]
faqs:
  - question: "Is PiEEG a clone of the OpenBCI Cyton?"
    answer: "No. Some PiEEG boards use the same ADC family as the Cyton, the ADS1299. That is where the similarity ends. OpenBCI sells the board, a radio dongle, design files, and a path into their GUI and BrainFlow. PiEEG sells a developer platform: the board is one input, then PiEEG Server, PiEEG Cloud, an agent, a browser SDK, and outputs to OSC, LSL, Unity, and a headset app. Shared silicon is not a shared product."
  - question: "Which has better signal quality?"
    answer: "We do not know from a published head-to-head bench, and this page will not invent one. Electrode contact, reference, cables, and gain usually move the recording more than the brand name. If you need a noise number, measure it on your montage or cite a paper that measured the device you will actually buy."
  - question: "Can I use BrainFlow with both?"
    answer: "OpenBCI documents BrainFlow support for Cyton, including the scale factors. IronBCI-32 is documented on this site as working with BrainFlow. Other PiEEG boards are used through PiEEG Server, Python, or a browser stream. Check the board page before you assume a BrainFlow board id exists."
  - question: "Do I still need electrodes?"
    answer: "Yes for both, unless you buy a kit that explicitly includes them. OpenBCI's Cyton shop page states that the board does not include electrodes. PiEEG shield pages assume a separate electrode or cap kit. Octopus-16 is the exception on our side: the pogo pins are the electrodes, and they cover one small area, not a full cap."
---

**Short answer:** choose OpenBCI if you want the Cyton ecosystem: a standalone board, a USB radio dongle, published design files, and the tutorials and papers that already assume that object. Choose PiEEG if you want a platform: a board as the input, then a browser or a local server, an agent that calls your model, and a place for the signal to go (dashboard, notebook, OSC, VR, your own page). Neither side is the more accurate EEG. We have not published that bench.

The other target in this series is [PiEEG vs Muse](/guides/pieeg-vs-muse). The checklist is [how to choose](/guides/how-to-choose-a-bci).

## You are not comparing two PCBs

OpenBCI, on the pages checked for this revision, is a board company with software around the board. The Cyton is the object people mean by "OpenBCI vs". Their shop and docs also cover headsets, electrodes, and [Galea](https://galea.co/), a biosensing headset for mixed reality. This page does not spec Galea. Their home page, Cyton specs, Cyton shop, and data-format page describe a board, a dongle, design files, and a path into BrainFlow. We did not find a browser platform, an LLM agent, or an MCP server on those pages. If they ship one, this sentence should be corrected.

PiEEG is a bio-data developer platform. The boards are how a signal gets in. They are not the thing you are deciding to buy instead of a Cyton, unless the only requirement is "8 channels of ADS1299".

What the platform actually is, from this site:

- **[PiEEG Cloud](/cloud)** at [cloud.pieeg.com](https://cloud.pieeg.com/). No install. Web Bluetooth or Web Serial from a Chromium tab. DSP and FFT in the tab. A demo signal if you have no board. Buddy can sit on that stream.
- **[PiEEG Server](/server).** `pip install pieeg-server`. WebSocket JSON on port 1616, dashboard on 1617, CSV, and LSL, OSC, or webhooks when you enable them. Mock mode uses the same path.
- **[Agent](/agent).** Buddy is a browser agent: bounded tools, your LLM key (Anthropic, OpenAI, or local Ollama). PiEEG Agent is the lab notebook: LSL in, pattern training, CSV and notebook out, MCP tools an editor can call. Device actions stay off until you enable them.
- **Build surfaces.** [pieeg.js](/news/pieeg-js-browser-sdk), [bioIDE](https://ide.pieeg.com), [1020 Academy](https://1020.pieeg.com), [Signal Lab](https://cloud.pieeg.com/experiences/signal-lab).
- **Outputs.** Local Bridge (OSC to VRChat, TouchDesigner, Max), a Unity plugin, a [Chrome extension](/browser), webhooks, [BodyPress](/news/bodypress-mobile-launch), and the [examples gallery](/examples). [PiEEG XR](/xr) is the face-gasket input into that stack. It is on Kickstarter, not a finished consumer headset you can treat as shipping.

OpenBCI's GUI and BrainFlow are real software. A lab that already teaches the Cyton GUI should not switch to chase a feature list. The difference is the shape of the product: a board plus a desktop GUI and libraries, versus a platform that starts in a browser and already has an agent and output bridges. You can still ignore all of that and read samples in Python. The platform is not a gate.

## Same family of converter, different instrument

The OpenBCI Cyton uses a Texas Instruments ADS1299. PiEEG-8, PiEEG-16, IronBCI, ardEEG, and the other shield pages on this site use an ADS1299 as well, except where the page names a different part (IronBCI-32 uses four AD7771 converters; Octopus-16 uses two ADS131M08 converters).

A shared ADC means the analog front end can be discussed in the same units: 24-bit conversion, programmable gain, a bias drive, a reference electrode. It does not mean the recorded noise matches. Layout, protection, cables, and the electrode interface sit between the chip and the scalp. We have not published a bench that swaps a Cyton and a PiEEG-8 onto the same cap. Until that exists, "same chip" is a compatibility fact, not a quality ranking.

OpenBCI lists, on the [Cyton specs](https://docs.openbci.com/Cyton/CytonSpecs/) page, a signal-to-noise ratio of 121 dB and a voltage resolution of 0.298 microvolt per bit (5 V / 2^24). Read that carefully. The resolution line is the converter's count size, not a measured input-referred noise on a scalp. Their [data format](https://docs.openbci.com/Cyton/CytonDataFormat/) page gives the scale they actually apply in software at gain 24: 0.02235 microvolts per count, from the ADS1299 datasheet equation. Use that scale if you are converting Cyton counts. Do not paste the 0.298 µV figure into an analysis script.

## The board, if the board is the question

If you already know you need a converter and you are choosing a host, this is the table. It is not the product comparison. The product comparison is the section above.

OpenBCI's Cyton is one board: 8 channels, a PIC32, an RFduino radio, a microSD slot, a 3-axis accelerometer, and a matching USB dongle. A Daisy module adds a second ADS1299 for 16 channels. Headsets and electrodes are separate products (Ultracortex, electro-cap, gold cups, and others). Design files are in their [hardware repository](https://github.com/OpenBCI/V3_Hardware_Design_Files). The shop page states that the Cyton board does not include electrodes.

PiEEG is a set of boards, not one SKU. The useful comparison is Cyton against the board you would actually buy:

| | OpenBCI Cyton | PiEEG-8 | PiEEG-16 | IronBCI |
| --- | --- | --- | --- | --- |
| Role | Standalone biosensing board | Shield | Shield | Wearable board |
| Channels | 8, or 16 with Daisy | 8, plus REF and BIAS | 16 | 8, plus REF and BIAS |
| Converter | ADS1299 | ADS1299, 24-bit | 2 x ADS1299 | ADS1299, 24-bit |
| Host you must have | Computer with their USB dongle | Raspberry Pi 3, 4, or 5 | Raspberry Pi 5 | None on a header. Phone, laptop, or browser. |
| Link | RFduino to the dongle. Serial on the dongle at 115200 baud for normal use. | SPI on the Pi GPIO header | SPI | Bluetooth LE |
| Sample rate, as documented | Default 250 Hz. Faster rates exist on the ADC. Their docs say the radio and serial link may not keep up. | 250 SPS to 16 kSPS on the product page (SPI, not radio) | Same range as PiEEG-8 | 250 SPS |
| Electrodes in the board box | No | No. Caps are separate. | No | Starter sets vary by kit. Check the current shop listing. |
| Accelerometer | LIS3DH on the Cyton | Not part of the PiEEG-8 shield description | Not part of the PiEEG-16 description | Not listed as an onboard IMU |
| Design files | Published (DesignSpark schematics and PCB) | Published under pieeg-club | Published under pieeg-club | Published under pieeg-club |

Sources for the PiEEG columns are the matching pages on this site: [PiEEG-8](/hardware/pieeg), [PiEEG-16](/hardware/pieeg-16), [IronBCI](/hardware/ironbci). Sources for the Cyton column are the OpenBCI docs linked above, checked 2 October 2026. If a shop listing disagrees with a doc page, trust the page that matches the serial number you are about to buy, and tell us.

Prices are not in this table on purpose. OpenBCI's cart localizes currency. Our hardware pages read the current Elecrow catalog. Copying either number into an article makes it wrong on the next price change.

## The 16-channel difference people miss

OpenBCI's own data-format page describes how Cyton+Daisy sends 16 channels over the radio. Both ADS1299 devices are read at 250 SPS, but the radio packet is not large enough for every channel on every sample. The firmware averages adjacent samples and alternates which chip's data is sent. They recommend recording the unaveraged stream to the SD card if you need the raw 16-channel series. That is a radio-budget constraint, documented by OpenBCI, not a criticism we invented.

PiEEG-16 does not use that radio. Two ADS1299 devices sit on the Raspberry Pi header and are read over SPI. The averaging step in the Cyton radio protocol therefore does not apply. That is an architectural difference. It is not a measurement that PiEEG-16 noise is lower. A wet cap on a Cyton with SD logging can still be the better recording for a given protocol. A dry, moving headset on either board can ruin both.

## Software, and what "open" covers

OpenBCI's GUI, firmware notes, and BrainFlow support are why a lot of teaching labs start on a Cyton. If your course already has Cyton slides, switching boards to save money is often a false saving: you will rewrite the lab. Their data-format page says BrainFlow already applies the Cyton scale factors. That is a real reason to stay.

PiEEG does not ask you to write that recorder before you can see a trace. Server and Cloud both show waveforms, FFT, and quality. The [examples](/examples) are small applications on that stream, not a promise that you will ship a product on day one. The agent can train a named pattern and report a cross-validated score. That score is a within-session check, not a clinical claim.

There is no PiEEG subscription required to read the raw stream. Cloud, academy, and the agent are optional. Using them does not lock the samples. Ignoring them does not remove them from the platform: they are part of what you are comparing to a Cyton GUI.

"Open source" here means you can read the schematic and the firmware, and you can keep the board if a website changes. It does not mean the recording is cleaner. OpenBCI publishes Cyton design files too. Both projects sit in a community. OpenBCI has a long forum and a citation list. PiEEG has docs, a [Discord](https://discord.gg/neJ45FR6Sv), and [GitHub](https://github.com/pieeg-club). Community support is not a warranty.

## Who should buy which

**Buy a Cyton (or Cyton+Daisy) if:**

- You want the board that most OpenBCI tutorials assume.
- You want a standalone unit with a dongle, an SD card, and an onboard accelerometer.
- Your lab already owns Ultracortex hardware or gold-cup cables that terminate for OpenBCI.
- You are fine treating 250 Hz as the wireless default, and you will use the SD card when 16-channel raw samples matter.

**Buy PiEEG if:**

- You want the stream in a browser with no install, or on a machine you already program, and you want an agent, an IDE, or an OSC bridge without assembling that stack yourself.
- The computer in the experiment is a Raspberry Pi, and you want the converter on the header instead of a radio hop. That is [PiEEG-8](/hardware/pieeg) or [PiEEG-16](/hardware/pieeg-16), not "the platform" as a single SKU.
- You need a small BLE board (IronBCI) or 32 channels over USB (IronBCI-32) and you still want the same software contract.
- You do not want a software seat between you and the samples.

**Buy a Muse, not either of these, if** you want a four-site consumer headband and an app. That comparison is [PiEEG vs Muse](/guides/pieeg-vs-muse).

**Buy neither for a clinical decision.** See [liability](/liability).

## What this page does not decide

- Comfort of a specific cap. That is a fit problem. Try the cap, or buy the cap that matches electrodes you already trust.
- Whether your ethics board, journal, or course accepts consumer and maker EEG. Ask them. A vendor badge does not answer it.
- Clinical amplifiers. If your protocol already specifies a Brain Products, g.tec, or similar system, a maker board is not a substitute just because the channel count looks similar.

## Sources

Checked 2 October 2026.

- OpenBCI, [Cyton specs](https://docs.openbci.com/Cyton/CytonSpecs/): ADS1299, Daisy as an 8-to-16 expansion, 121 dB SNR line, 0.298 µV/bit resolution line, design-file repository.
- OpenBCI, [Cyton data format](https://docs.openbci.com/Cyton/CytonDataFormat/): default 250 Hz, radio limit on faster rates, gain-24 scale factor 0.02235 µV/count, 16-channel averaging, SD-card recommendation, note that a standard Bluetooth LE data format was not defined on that page.
- OpenBCI shop, [Cyton board](https://shop.openbci.com/products/cyton-biosensing-board-8-channel): electrodes are not included.
- This site: [PiEEG-8](/hardware/pieeg), [PiEEG-16](/hardware/pieeg-16), [IronBCI](/hardware/ironbci), [hardware index](/hardware).
