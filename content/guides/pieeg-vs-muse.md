---
title: "PiEEG vs Muse: developer platform or consumer headband"
date: "2026-10-02"
updated: "2026-10-02"
category: "Comparison"
excerpt: "Muse is a finished headband with a consumer app and a community path to raw EEG. PiEEG is a bio-data developer platform: hardware, browser, server, agent, and outputs. They are not the same job."
image: "/products/pieeg.png"
featured: true
tags: ["PiEEG", "Muse", "BCI", "EEG", "Comparison"]
faqs:
  - question: "Is PiEEG a Muse alternative for meditation?"
    answer: "Not as a product. Muse ships a headband and an app aimed at sessions, sleep, and scores. PiEEG ships boards plus a developer platform: live samples, a dashboard, an agent, and outputs to code, OSC, and VR. You can build a neurofeedback session on PiEEG. That is not what the box is for."
  - question: "Can I get raw EEG from a Muse?"
    answer: "Yes, through community tools, not through an official developer platform we could verify on 2 October 2026. muse-lsl streams Muse 2, Muse S, and the 2016 Muse to Lab Streaming Layer. Mind Monitor, a third-party app, shows raw microvolts and can stream OSC. Interaxon's own product pages redirected away from the spec sheet on the day we checked, so this page does not quote an official sample rate."
  - question: "Does Muse have more channels?"
    answer: "No. Mind Monitor's technical manual lists four EEG sites on the headband: TP9, AF7, AF8, and TP10, plus auxiliary inputs on some older models. PiEEG boards run from 8 to 32 channels, and the montage is yours. Four fixed dry sites and a 32-channel cap are different instruments. Neither number is a quality ranking."
  - question: "Which one should a developer buy?"
    answer: "Buy Muse if the job is a headband that fits in a minute and a consumer app. Buy PiEEG if the job is to read the samples, train a pattern, and send the result somewhere: a browser, a notebook, VRChat, Unity, or your own model. If you only need four frontal and temporal sites and you already have muse-lsl working, Muse can still be the right sensor."
---

**Short answer:** buy a Muse if you want a headband and an app. Buy PiEEG if you want a platform you can build on. Muse is four dry EEG sites in a fixed band, plus motion sensors, wrapped in a consumer product. PiEEG is the stack around the signal: a board you choose, a browser or a local server, an agent that calls your model, and outputs (WebSocket, LSL, OSC, Unity, a headset app). We have not measured which one is quieter. This page will not pretend that comparison exists.

The other target in this series is [PiEEG vs OpenBCI](/guides/pieeg-vs-openbci). The checklist is [how to choose](/guides/how-to-choose-a-bci).

## What each product is

Muse, from InteraXon, is a consumer headband. The job the company sells is a session: put it on, open the app, get a score or a sleep trace. Developers reached the raw stream later, mostly through community software.

PiEEG is a bio-data developer platform. The boards are the input. They are not the product you are comparing to Muse. A person can open [cloud.pieeg.com](https://cloud.pieeg.com/) with no hardware and run a simulated stream, then connect a board over Web Bluetooth or Web Serial when they have one. The same samples can go to [PiEEG Server](/server), to [Buddy or the lab agent](/agent), to [bioIDE](https://ide.pieeg.com), or out over OSC to a game engine. That stack is what "PiEEG vs Muse" has to compare. A channel-count table alone answers a different question.

## Montage: four fixed sites, or a montage you place

Mind Monitor's technical manual, a third-party app that cites Interaxon's older developer docs, lists the headband sensors as:

- TP9, left ear
- AF7, left forehead
- AF8, right forehead
- TP10, right ear

It notes that AF7 and AF8 move with head size and can land closer to Fp1 and Fp2. Some older units expose auxiliary pins. Muse 2, per the [muse-lsl](https://github.com/alexandrebarachant/muse-lsl) readme, also has a PPG sensor, an accelerometer, and a gyroscope.

That is a useful instrument for frontal asymmetry, blinks, a coarse alpha check, and "is the headband on". It is a weak instrument for a motor-cortex BCI, a visual-cortex SSVEP map, or anything that needs you to move an electrode. The sites are the product.

PiEEG does not ship one montage.

| Input | What it covers | When it is the wrong Muse replacement |
| --- | --- | --- |
| [IronBCI](/hardware/ironbci) | 8 channels, BLE, 250 SPS, ADS1299. You place the electrodes. | You wanted a headband, not cables. |
| [Octopus-16](/hardware/octopus-16) | 16 dry pogo pins over one small area, often visual cortex. Not a 10-20 cap. | You wanted forehead alpha. |
| [PiEEG-8](/hardware/pieeg) / [PiEEG-16](/hardware/pieeg-16) | Shield on a Raspberry Pi. 8 or 16 channels over SPI. | You wanted something that fits in a pocket with no host. |
| [IronBCI-32](/hardware/ironbci-32) | 32 channels, USB, four AD7771, 500 SPS on the product guide. | You wanted a two-minute setup. |
| [PiEEG XR](/xr) | Face gasket for a VR headset. Facial EMG and EEG. Kickstarter, not a shipping consumer headband. | You wanted a meditation band. |

If the protocol is "four dry sites, forehead and ears, on and off in a minute", Muse matches the protocol and a PiEEG cap does not. If the protocol is "I pick the sites", Muse cannot follow you.

## Raw data is available on both. The contract is different.

On Muse, the path we could verify is community and third-party:

- [muse-lsl](https://github.com/alexandrebarachant/muse-lsl) streams EEG to Lab Streaming Layer. The readme says it works with Muse 2, Muse S, and the 2016 Muse. A commit on that repo adds Muse S Athena support. We did not open an Interaxon spec page for Athena. Their shop URLs redirected to an ad pixel on 2 October 2026, so this page does not quote Athena's sensor list or an official sample rate.
- Mind Monitor shows raw EEG in microvolts, absolute band powers, accelerometer, and gyroscope, and can stream OSC. Its manual says a constant recording interval produces about 256 raw points per second. That is the app's note, not a line we copied from Interaxon's current datasheet.

So a researcher can get Muse samples. The company did not, on the pages we could open, present that as the product. You depend on a community bridge staying compatible with the next firmware.

On PiEEG the raw stream is the product:

- [PiEEG Cloud](/cloud) connects IronBCI, Octopus-16, or IronBCI-32 in a Chromium tab. Web Bluetooth or Web Serial. DSP runs in the tab. No install. A demo signal exists if you have no board.
- [PiEEG Server](/server) is `pip install pieeg-server`. WebSocket JSON on port 1616, dashboard on 1617, CSV recording, and LSL, OSC, or webhooks when you turn them on. Mock mode runs the same path with synthetic EEG.
- [pieeg.js](/news/pieeg-js-browser-sdk) is the browser SDK: one file, the signal chain, then your page.
- [bioIDE](https://ide.pieeg.com) is a browser IDE against that SDK, including a mock stream.

There is no PiEEG subscription between you and the samples. Cloud, academy, and the agent are optional tools on top of the stream. They are not a lock, and they are not "no cloud": the cloud app exists, and you can ignore it.

## What you can do without writing the recorder

This is the actual gap. Muse's app gives you the session Muse designed. PiEEG's platform gives you surfaces that already assume a live stream:

- **Dashboard.** Waveforms, FFT, topographic map, signal quality. Local server or the cloud tab.
- **Experiences.** The [examples gallery](/examples) includes blink scroll, EOG eye tracking, focus-linked audio, and neural sonification. Those are demos on our stream, not claims that a Muse app lacks creativity.
- **Agent.** [Buddy](/agent) is a browser agent with a bounded tool loop. It reads features from the live stream and calls a model you provide (Anthropic, OpenAI, or a local Ollama). [PiEEG Agent](/agent) is the lab notebook side: LSL in, pattern training, CSV and notebook out, MCP tools an editor can call. Device actions stay off until you enable them. This is not a meditation score. It is a tool-calling loop on your samples, with your key.
- **Outputs.** Local Bridge turns cloud JSON into OSC for VRChat, TouchDesigner, or Max. There is a Unity plugin, a [Chrome extension](/browser) that overlays session-baseline indices on any page, webhooks, and [BodyPress](/news/bodypress-mobile-launch) on a phone or a headset. [PiEEG XR](/xr) is the face-gasket path into that same output stack. It is not shipping as a finished consumer headset.
- **Learning tools.** [1020 Academy](https://1020.pieeg.com) and [Signal Lab](https://cloud.pieeg.com/experiences/signal-lab) sit on the same stream. A student can start on the simulator and move to a board without changing the software contract.

Muse can reach OSC if you run Mind Monitor, and LSL if you run muse-lsl. Those are real. They are not a first-party platform with an agent, an IDE, and a headset app maintained as one product. If Interaxon ships that and we missed it because the site redirected, this paragraph should be corrected.

## Who should buy which

**Buy Muse if:**

- You want a headband, not a cap and a reference electrode.
- The app is the point: a guided session, sleep, a score.
- Four sites at the ears and forehead are enough, and you accept that AF7/AF8 placement depends on head size.
- You are fine with community software if you later need CSV or LSL.

**Buy PiEEG if:**

- You are building something: a decoder, a game, a VR avatar, a notebook, an agent tool.
- You need more than four fixed sites, or you need to move the electrodes.
- You want the raw stream in a browser with no install, or on a Raspberry Pi you already run.
- You want the schematic and the firmware in a public repository, and you do not want a vendor score as the only export.

**Buy Muse as the sensor and still use other software if:**

- muse-lsl already fits the lab, and the question really is frontal EEG plus PPG. Do not buy a 32-channel system to answer that question. PiEEG is the wrong spend there.

**Buy neither for a clinical decision.** PiEEG is not a medical device. See [liability](/liability). We are not quoting a medical claim for Muse either.

## What this page does not claim

- We do not claim a PiEEG board is cleaner than a Muse. Dry contact at TP9 is a different noise problem from a wet cap on an ADS1299. Measure the montage you will publish.
- We do not claim Muse "hides" raw data. Community tools read it. We claim the product you buy in their app store is not a developer platform.
- We do not quote a Muse price, battery life, or official sample rate. The shop page did not return a spec sheet on the day we checked.
- We do not treat "Athena" as specified here. A community commit says support was added. That is all we verified.

## Sources

Checked 2 October 2026.

- This site: [Cloud](/cloud), [Server](/server), [Agent](/agent), [examples](/examples), [XR](/xr), [hardware](/hardware), [browser extension](/browser).
- muse-lsl readme: [github.com/alexandrebarachant/muse-lsl](https://github.com/alexandrebarachant/muse-lsl). Community software, not an Interaxon datasheet. EEG plus, on Muse 2, PPG, accelerometer, gyroscope.
- Mind Monitor technical manual: [mind-monitor.com/Technical_Manual.php](https://mind-monitor.com/Technical_Manual.php). Third-party app. Sensor names, aux pins, and the ~256 Hz recording note.
- Interaxon shop and developer URLs we tried (`choosemuse.com` product and developer pages) redirected to an advertising pixel. No spec was taken from them.
