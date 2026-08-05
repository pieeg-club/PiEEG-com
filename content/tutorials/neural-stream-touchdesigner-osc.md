---
title: "Stream Your Brain into TouchDesigner: Neural Stream over OSC"
date: "2026-08-04"
difficulty: "Beginner"
time: "15 min"
excerpt: "PiEEG Cloud's new Neural Stream turns your live headset into a tree of named OSC channels. Point a single TouchDesigner OSC In CHOP at your machine and the whole brain — focus, relax, band powers, per-channel activity, blink pulses — arrives as CHOP channels with zero per-address wiring. This guide walks you from a fresh dashboard to reactive visuals."
image: "/news-images/neural-stream-touchdesigner.jpg"
featured: true
tags: ["TouchDesigner", "OSC", "CHOP", "PiEEG Cloud", "Local Bridge", "Neural Stream", "Creative Coding", "VJ"]
---

**Neural Stream** is a dashboard-level feature in [PiEEG Cloud](https://cloud.pieeg.com) that forwards your live headset to a creative-coding app as named **OSC channels**. A single TouchDesigner **`OSC In CHOP`** receives the entire brain — cognitive state, band powers, per-channel activity, and blink events — with **no per-address wiring**. The connection is **direct P2P**: after a one-time handshake, nothing routes through the cloud.

This guide takes you from a fresh browser to brain-reactive visuals in TouchDesigner.

## What You'll Build

By the end you'll have TouchDesigner receiving a live CHOP where each channel is a named brain signal:

| Channel | Meaning |
|---|---|
| `focus`, `relax`, `engagement` | Cognitive-state indices (0–1) |
| `dominant` | Dominant frequency in Hz |
| `alpha`, `beta`, `theta`, `delta`, `gamma` | Headset-average band powers (relative, 0–1) |
| `ch3/level`, `ch3/alpha`, … | Per-channel activity and band powers |
| `blink` | Momentary 0/1 pulse on each detected blink |

Drive anything with them — particle systems, geometry deformation, feedback loops, audio-reactive networks.

## Prerequisites

| What you need | Details |
|---|---|
| A PiEEG-class device | PiEEG-8/16, Octopus-16, or IronBCI — connected to [cloud.pieeg.com](https://cloud.pieeg.com) over Wi-Fi, BLE, or serial |
| PiEEG Local Bridge | The free forwarding app — [download here](https://github.com/pieeg-club/PiEEG-local-bridge/releases/latest) |
| TouchDesigner | Any recent build — the free **non-commercial** license is fine |
| Same machine (recommended) | Run the browser, the Local Bridge, and TouchDesigner on one computer for the simplest setup |

> **No headset yet?** You can still follow along — connect the dashboard to the demo server and Neural Stream will forward the synthesised signals exactly the same way.

## Why It Works: OSC In CHOP + Named Addresses

TouchDesigner's `OSC In CHOP` creates one channel per unique OSC address it receives. Neural Stream sends addresses like `/pieeg/focus` and `/pieeg/ch3/alpha`, so the CHOP **explodes the whole brain into channels automatically** — you never wire an address by hand. Turn a signal group on in the dashboard and its channels simply appear in TouchDesigner.

## Step 1 — Connect Your Headset to PiEEG Cloud

1. Open [cloud.pieeg.com](https://cloud.pieeg.com) in a Chromium browser (Chrome or Edge).
2. Connect your device from the Session Lobby — enter your server URL, pair over BLE, or hit **▶ Use Demo Server** to try it without hardware.
3. Confirm you see live waveforms scrolling in the dashboard.

> **Important — stop background throttling.** Once you switch to TouchDesigner, the browser tab loses focus and Chromium throttles its background timers, collapsing your stream to ~2 fps. Launch the browser with the `--disable-background-timer-throttling` flag so the dashboard keeps streaming at full rate while it sits behind TouchDesigner:
>
> ```bash
> # Windows
> chrome.exe --disable-background-timer-throttling
>
> # macOS
> open -a "Google Chrome" --args --disable-background-timer-throttling
>
> # Linux
> google-chrome --disable-background-timer-throttling
> ```
>
> For Edge, substitute `msedge.exe` (Windows) or `"Microsoft Edge"` (macOS). Close all existing browser windows first so the flag takes effect.

## Step 2 — Launch the Local Bridge

Neural Stream never streams your data through the cloud. Instead it forwards frames to a tiny app on your own machine over a **direct, encrypted P2P WebRTC channel**.

1. Download and run the [PiEEG Local Bridge](https://github.com/pieeg-club/PiEEG-local-bridge/releases/latest) for your OS (Windows, macOS Intel/Apple Silicon, or Linux).
2. On launch it displays a **6-character share code** (e.g. `A3K9M2`).
3. In the dashboard header, click **🖥️ Local Bridge**, type the code, and click **Connect**.
4. The status dot turns green when the direct channel is open.

## Step 3 — Open Neural Stream

1. In the dashboard header, click **🧠 Neural Stream**.
2. Pick **TouchDesigner** as the destination. This sets the address root to `/pieeg` and shows the port hint (default **7000**).
3. Choose which **signal groups** to stream:

| Group | Addresses | Notes |
|---|---|---|
| 🧠 Cognitive state | `focus`, `relax`, `engagement`, `dominant` | Start here — 4 rock-solid channels |
| 🌈 Band powers · average | `alpha` `beta` `theta` `delta` `gamma` | Relative (band ÷ total), 0–1 |
| ⚡ Events | `blink` | Great for triggering effects |
| 📊 Channel levels | `chN/level` | Per-channel activity envelope |
| 🧬 Band powers · per channel | `chN/{band}` | δ θ α β γ for every selected channel |

4. Set the **rate** (10–15 Hz is smooth for state signals; go higher for band envelopes). The panel shows a live **parameter budget** — the local link handles up to 128 channels comfortably.
5. Flip the master switch to **Streaming**. Leave the panel open — streaming stops automatically when it's closed.

> **Tip:** Start with just **Cognitive state** on. Get four channels flowing into TouchDesigner first, then add groups once you see them arrive.

## Step 4 — Receive It in TouchDesigner

1. In TouchDesigner, add an **`OSC In CHOP`** (Tab → CHOP → OSC In).
2. Set its **Network Port** to the port the Local Bridge is forwarding to — **7000** for the TouchDesigner preset.
3. Watch the channels populate: `focus`, `relax`, `alpha`, `blink`, and so on — each named after its OSC address.

If nothing appears, jump to Troubleshooting below.

> **Copy the address list.** The Neural Stream panel has a **Copy list** button that exports every active address, so you can paste the exact channel names into a `Rename` or `Select CHOP` while patching.

## Step 5 — Make Something React

A few starting points:

- **Focus → bloom.** Wire `focus` into a `Level` or `Bloom` TOP intensity for a glow that brightens as you concentrate.
- **Alpha → calm palette.** Map `alpha` to a `Ramp` / `Lookup` so relaxing shifts the whole scene's colour.
- **Blink → burst.** Feed `blink` into a `Trigger CHOP`, then into a particle `Replicator` or feedback pulse — every blink fires an effect.
- **Per-channel → geometry.** Route `ch1/level … chN/level` into `Instance` transforms so each electrode drives its own object.

Smooth incoming channels with a `Filter` or `Lag CHOP` before driving visuals — the signals are already lightly smoothed, but a little extra makes motion feel organic.

## Troubleshooting

| Symptom | Fix |
|---|---|
| No channels in the OSC In CHOP | Confirm the Local Bridge dot is green **and** the Neural Stream master switch says *Streaming*. |
| Bridge won't connect | Re-open the Local Bridge to refresh the 6-char code (codes expire after 24 h), then reconnect. |
| Channels arrive but never change | Check the dashboard shows live waveforms — Neural Stream only forwards what the device sends. |
| Stream drops to ~2 fps when TouchDesigner is focused | Chromium is throttling the backgrounded tab. Relaunch the browser with `--disable-background-timer-throttling` (see Step 1). |
| Port mismatch | The `OSC In CHOP` **Network Port** must equal the Bridge's forwarding port (7000 for the TouchDesigner preset). |
| Too many channels / dropped signals | Lower the rate or turn off per-channel groups; the panel truncates per-channel signals first when over budget. |

## Beyond TouchDesigner

The same Neural Stream works with other OSC consumers — pick the matching destination in the panel:

- **Max / MSP · Ableton** — unpack with `[udpreceive]` → `[OSC-route /pieeg]`.
- **VRChat** — drive avatar float parameters from your cognitive state.
- **Custom** — set your own address root for any OSC-aware tool.

That's it — your brain is now a live signal source in TouchDesigner. Build something that only exists while you're paying attention.
