---
title: "BLE End-to-End on Meta Quest: Chromium + PiEEG Cloud to PiEEG XR"
date: "2026-08-02"
difficulty: "Beginner"
time: "20 min"
excerpt: "Run a complete BLE pipeline entirely on your Meta Quest headset — flash Octopus-16 firmware once on a PC, then use the Quest's Chromium browser to connect over Web Bluetooth, stream 16-channel EEG through PiEEG Cloud, and launch PiEEG XR, all without touching a desktop again."
image: "/news-images/octopus-16-firmware.png"
featured: true
tags: ["Quest", "BLE", "Web Bluetooth", "PiEEG Cloud", "PiEEG XR", "Octopus-16", "Chromium"]
---

Meta Quest's built-in browser does **not** support the Web Bluetooth API. To run the full biosignal pipeline on the headset you need **Chromium** sideloaded via APK — the same Chromium build that powers Web Bluetooth on desktop. Once Chromium is installed on the Quest, you can pair Octopus-16 over BLE, stream 16 channels of EEG through PiEEG Cloud, and drop straight into PiEEG XR — no PC after the initial setup, no companion app, no extra software.

## Prerequisites

| What you need | Details |
|---|---|
| Octopus-16 + XIAO ESP32-S3 | With the **Octopus-16 firmware** already flashed (one-time, done from a PC — see below) |
| Meta Quest (2, 3, 3S, or Pro) | Any model — **Developer Mode must be enabled** |
| Chromium APK on your Quest | Sideloaded via ADB — see Step 2 below |
| USB-C power bank | To power the XIAO ESP32-S3 wirelessly |
| Chromium-based desktop browser | Chrome or Edge — only needed once, for the firmware flash step |

> **Already have firmware on your XIAO?** Skip straight to Step 2 below.

## Step 1 — Flash the Octopus-16 Firmware (PC, one-time)

The firmware turns the XIAO ESP32-S3 into a BLE device that PiEEG Cloud can discover. This step only needs a PC.

1. Plug the XIAO ESP32-S3 into your PC with a **USB-C data cable** (not a charge-only cable).
2. Open **Chrome or Edge** and navigate to [firmware.pieeg.com](https://firmware.pieeg.com/).
3. Select **Install Octopus-16 Firmware** and choose the serial port that appears.
4. Wait ~30 seconds for flashing to complete.
5. Unplug and reconnect the board once. It now broadcasts itself as `Octopus-16-XXXX` over BLE.

### Board not detected?

Put the XIAO into bootloader mode first:

1. Hold the **BOOT** button.
2. Tap **RESET** while still holding BOOT.
3. Release BOOT, then start the install again.

## Step 2 — Sideload Chromium on Your Quest

The Meta Quest built-in browser blocks Web Bluetooth. You need to install a full Chromium build via ADB.

### Enable Developer Mode

1. Open the **Meta mobile app** on your phone.
2. Go to **Menu → Devices**, select your headset.
3. Tap **Developer Mode** and toggle it on.

### Install Chromium — Pick Your Method

The Chromium APK is the same regardless of how you install it. Pick whichever method fits your comfort level.

| Method | Best for | What you need |
|---|---|---|
| **[SideQuest (Easy Installer)](https://sidequestvr.com/setup-howto)** | Most users — no command line | SideQuest desktop app (Windows/Mac/Linux) |
| **ADB (command line)** | Developers already using ADB | ADB installed, USB-C data cable |
| **Wireless ADB** | Quest 3 / 3S users who hate cables | Quest and PC on same Wi-Fi, ADB installed |

#### Option A — SideQuest (recommended for most users)

1. Install the **SideQuest** desktop app from [sidequestvr.com](https://sidequestvr.com/setup-howto). It guides you through enabling Developer Mode and USB debugging automatically.
2. Once connected, use the **APK sideload** button (folder icon in the top bar) and select the Chromium APK you downloaded from [chromium.woolyss.com](https://chromium.woolyss.com/) (`Android ARM64`).
3. Done — Chromium appears under **Unknown Sources** in your Quest library.

#### Option B — ADB (command line)

1. Download the Chromium APK from [chromium.woolyss.com](https://chromium.woolyss.com/) (`Android ARM64`).
2. Connect your Quest via USB-C. Accept **Allow USB Debugging** in the headset.
3. Run:

```bash
adb install -r chromium-arm64.apk
```

#### Option C — Wireless ADB (Quest 3 / 3S, no cable)

1. On the Quest, go to **Settings → System → Developer** and enable **Wireless ADB**.
2. Note the IP address shown on screen (e.g. `192.168.1.42:5555`).
3. On your PC (same Wi-Fi):

```bash
adb connect 192.168.1.42:5555
adb install -r chromium-arm64.apk
```

> **Why Chromium and not Chrome?** The Google Play Store version of Chrome on Android disables Web Bluetooth. The standalone Chromium build leaves it enabled.

### Open PiEEG Cloud

Launch **Chromium** from your Quest app library and navigate to:

```
https://cloud.pieeg.com/lobby
```

You land on the PiEEG Cloud lobby. If you want to try it without hardware first, tap **Launch Demo** — it spins up a virtual 8-channel device so you can explore the interface.

## Step 3 — Connect Octopus-16 over BLE

Power the XIAO ESP32-S3 from the USB-C power bank and place the Octopus-16 on your head (all 18 pogo pins in contact with your scalp).

1. In PiEEG Cloud, tap **Connect Hardware**.
2. Select **Octopus-16** from the device list.
3. The Quest system dialog appears — pick your `Octopus-16-XXXX` device and tap **Pair**.
4. Grant the Bluetooth permission when the browser asks.

Within a few seconds you'll see 16 live EEG channels streaming in the dashboard. The signal quality indicator in the top-right turns green when all electrodes have good contact.

## Step 4 — Launch PiEEG XR

With Octopus-16 connected and streaming, tap the **PiEEG XR** tile on the Cloud lobby or navigate directly to `/xr` from within the dashboard.

PiEEG XR opens in the same browser session and reads BLE data from the already-paired Octopus-16. No re-pairing needed.

From here you can:

- **Calibrate expressions** — the XR setup wizard guides you through a short contrastive calibration (rest vs. active expression).
- **Control your avatar** — once calibration is done, facial biosignals from Octopus-16 drive avatar expressions in real time inside the VR environment.
- **Adjust gain and smoothing** per expression link from the in-headset panel.

## Troubleshooting

### "No device found" in the pairing dialog

Make sure the XIAO is powered and within ~5 m. BLE pairing in the Quest browser requires the device to be actively advertising — unplug and replug the power bank to restart advertising if it has been idle.

### Poor signal quality (red indicator)

Each of the 18 pogo pins must make firm contact with your scalp. Hair is a common insulator — part the hair under each pin and apply a small amount of conductive gel if needed.

### BLE disconnects during XR

The Quest browser suspends BLE when the browser window loses focus. Keep PiEEG XR open in the same browser tab (not in a separate window) so the page stays active while you're inside the VR view.

## What's Next

- **PiEEG Cloud demos** — explore the full experience library at [cloud.pieeg.com/lobby](https://cloud.pieeg.com/lobby): P300 Mini-Game, Avatar Foundation, Face Trainer, and more — all running over the same BLE connection.
- **Open source** — the firmware, Arduino sketches, and Python tools are on [GitHub](https://github.com/pieeg-club).
- **Documentation** — full hardware and software reference at [docs.pieeg.com](https://docs.pieeg.com/).
