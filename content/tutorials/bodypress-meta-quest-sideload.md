---
title: "Run BodyPress on Meta Quest: Sideload the Biosignal Journal App"
date: "2026-08-03"
difficulty: "Beginner"
time: "15 min"
excerpt: "BodyPress turns your physiological signals into a daily first-person journal — and because it speaks Bluetooth Low Energy, it pairs directly with PiEEG and other community BCI hardware. This guide explains what BodyPress is and walks you through sideloading the APK onto a Meta Quest headset, so you can stream heart-rate and multi-channel biosignals and read the story your body writes."
image: "/news-images/bodypress-app.png"
featured: false
tags:
  [
    "Quest",
    "BodyPress",
    "BLE",
    "Heart Rate",
    "BCI",
    "Flutter",
    "Sideload",
    "Android",
  ]
---

**BodyPress** is a cross-platform app that treats your body as an observable system. Throughout the day it collects physiological, environmental, and behavioural signals — then feeds them to an LLM that writes back a warm, first-person journal entry, as though your body were narrating its own day. Instead of another dashboard of numbers, you get a story: _"You spent a long afternoon out in the sharp, crystalline cold of Gatineau, where temperatures hovered between -18 °C and -10 °C…"_

For the PiEEG community the interesting part is the radio. BodyPress talks **Bluetooth Low Energy**, so it pairs directly with any BLE Heart Rate Profile strap (Polar H10, Wahoo TICKR, Garmin) **and** with community BCI hardware through its plugin system (ADS1299, PiEEG-XR, IronBCI, Octopus-16, and more). Its **Live Signal** screen offers four visualisation modes — time-domain waveforms, real-time FFT spectral analysis, a neural-state decoding demo, and a signal-quality monitor — all running over the same BLE connection. That makes a Meta Quest, which is an Android device with a full BLE stack, a perfectly good host for reading live biosignals in a headset.

## What BodyPress Does

| Capability               | What it means on a Quest                                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **AI Journal**           | A daily narrative generated from real captured signals — headline, mood, summary, full body text.                                                                                          |
| **BLE Heart Rate**       | Real-time streaming from any 0x180D strap, with a live ECG-style waveform and continuous RR-interval recording.                                                                            |
| **HRV & Autonomic Tone** | RMSSD / SDNN computed from RR intervals at every capture, turned into a plain-language stress narrative.                                                                                   |
| **BCI Signal Analysis**  | Four Live Signal modes — waveform, spectral (spectrum / waterfall / EEG bands), neural-state decoding demo, and signal-quality monitoring — usable with real BLE hardware or in demo mode. |
| **Patterns & Trends**    | AI-derived insights aggregated across your capture history.                                                                                                                                |

> **A note on Quest sensors.** A headset has no GPS, no optical heart-rate sensor, and no Health Connect store, so the movement / weather / sleep data sources stay quiet on Quest. The value on the headset comes from **BLE** — pair a heart-rate strap or a PiEEG-class device and use the Live Signal screen and heart-rate capture. Everything else still works in **demo mode**, which synthesises signals so you can explore the whole app without hardware.

## Where to Get BodyPress

| Channel          | Link                                                                                                                                              | Use it for                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Google Play**  | [play.google.com/store/apps/details?id=com.bodypress.governorhq](https://play.google.com/store/apps/details?id=com.bodypress.governorhq&hl=en_CA) | Phones and tablets — the normal install path.                         |
| **Sideload APK** | [pieeg.lon1.cdn.digitaloceanspaces.com/bodypress/app-release.apk](https://pieeg.lon1.cdn.digitaloceanspaces.com/bodypress/app-release.apk)        | Meta Quest and any device without Play Store access.                  |
| **Source (MIT)** | [https://github.com/pieeg-club/bodyPress](https://github.com/pieeg-club/bodyPress)                                              | Build it yourself, audit the code, or contribute a new signal source. |

> The Quest has no Google Play Store for phone apps, so the headset install is always a **sideload** of the APK above. It is the same release build you would get from Play — just delivered as a file.

## Prerequisites

| What you need                       | Details                                                                                                   |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Meta Quest (2, 3, 3S, or Pro)       | Any model — **Developer Mode must be enabled**                                                            |
| A way to sideload                   | SideQuest (easiest) **or** ADB (command line)                                                             |
| USB-C data cable                    | For a wired install (not needed for wireless ADB on Quest 3 / 3S)                                         |
| A BLE biosignal device _(optional)_ | A 0x180D heart-rate strap, or PiEEG / Octopus-16 / IronBCI-class hardware. Skip it and use **demo mode**. |

## Step 1 — Enable Developer Mode

1. Open the **Meta mobile app** on your phone.
2. Go to **Menu → Devices** and select your headset.
3. Tap **Developer Mode** and toggle it on. (You may need to create a free Meta developer account once.)
4. Reboot the headset so the change takes effect.

## Step 2 — Get the APK

Download the BodyPress release build to the machine you will sideload from:

```
https://pieeg.lon1.cdn.digitaloceanspaces.com/bodypress/app-release.apk
```

> **Prefer to build it yourself?** Clone the MIT repo and run `flutter build apk --release`. The output lands at `build/app/outputs/flutter-apk/app-release.apk` — sideload that instead. The code is at [github.com/the-governor-hq/bodyPress-flutter](https://github.com/the-governor-hq/bodyPress-flutter).

## Step 3 — Sideload onto the Quest

Pick whichever method matches your comfort level. The APK is identical either way.

### Option A — SideQuest (recommended for most users)

1. Install the **SideQuest** desktop app from [sidequestvr.com](https://sidequestvr.com/setup-howto). It walks you through enabling Developer Mode and USB debugging automatically.
2. Connect the Quest by USB-C and accept **Allow USB Debugging** inside the headset.
3. Click the **APK sideload** button (the box-with-arrow icon in the top bar) and select `app-release.apk`.
4. Wait for the progress bar to finish. BodyPress now appears in your library under **Unknown Sources**.

### Option B — ADB (command line)

1. Connect the Quest by USB-C. Accept **Allow USB Debugging** in the headset.
2. From the folder containing the APK, run:

```bash
adb install -r app-release.apk
```

### Option C — Wireless ADB (Quest 3 / 3S, no cable)

1. On the Quest, go to **Settings → System → Developer** and enable **Wireless ADB**.
2. Note the IP address shown (e.g. `192.168.1.42:5555`).
3. On your PC (same Wi-Fi):

```bash
adb connect 192.168.1.42:5555
adb install -r app-release.apk
```

## Step 4 — Launch and Grant Permissions

1. In the Quest library, switch the source filter from **All** to **Unknown Sources**.
2. Select **BodyPress** to launch it. It opens as a flat 2D panel inside your VR space.
3. Work through the onboarding flow. Every step is skippable, but for headset use the one that matters is **Nearby devices / Bluetooth** — grant it so the app can scan for BLE hardware.

> On the Quest the app runs in a standard Android window. Grab the panel's edge to resize or reposition it, exactly like any other 2D app on the headset.

## Step 5 — Connect a BLE Device (or Use Demo Mode)

**With hardware:**

1. Power on your BLE strap or BCI device and make sure it is advertising.
2. In BodyPress open the **Capture** tab (for a heart-rate strap) or the **Live Signal** screen (for multi-channel BCI hardware).
3. Tap **connect/scan**, pick your device from the list, and confirm pairing when the system dialog appears.
4. Watch the live waveform populate. On the Live Signal screen, use the popup menu to switch between **waveform**, **spectral**, **decoding**, and **monitoring** views.

**Without hardware:**

Enable **demo mode** to synthesise signals. Every screen — capture, Live Signal's four modes, and the AI journal — works end to end so you can explore the full app before wiring anything up.

## Troubleshooting

### BodyPress isn't in my library

Newly sideloaded apps hide under **Unknown Sources**. Open the library, click the source dropdown (top-right), and choose **Unknown Sources**.

### "No devices found" when scanning

BLE scanning needs the **Nearby devices** permission. Open the Quest's **Settings → Apps → BodyPress → Permissions** and enable it, then relaunch. Also confirm your device is powered and actively advertising — restart it to refresh the advertisement if it has been idle.

### BLE drops when I look away

The Quest can throttle background apps when their window loses focus. Keep the BodyPress panel visible in your view while you're capturing so the connection stays active.

### `adb: device unauthorized`

The **Allow USB Debugging** dialog inside the headset was dismissed or missed. Unplug, replug, put the headset on, and accept the prompt (tick **Always allow from this computer**).

## What's Next

- **Pair PiEEG hardware** — flash Octopus-16 or connect an ADS1299-class board and stream multi-channel EEG straight into the Live Signal screen. See the [BLE-on-Quest tutorial](/tutorials/ble-quest-chromium-pieeg-xr) for the firmware side.
- **Read your body's journal** — after a capture, let the AI generate a daily first-person entry from the signals you streamed.
- **Contribute a signal source** — the plugin system is documented in the repo; add support for your own hardware. Source and contribution guide: [github.com/the-governor-hq/bodyPress-flutter](https://github.com/the-governor-hq/bodyPress-flutter).
