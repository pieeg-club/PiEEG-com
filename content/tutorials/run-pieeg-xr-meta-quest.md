---
title: "Run PiEEG XR Inside Meta Quest: Every Path, Fastest First"
date: "2026-08-10"
difficulty: "Beginner"
time: "25 min"
excerpt: "You have the PiEEG XR on your headset — now use it. The zero-install path first: open PiEEG Cloud on your PC and mirror it into the Quest with the screen-streaming you already know. Plus three more routes — PiEEG Server, OSC into VRChat, and the BodyPress app — and the three experiences to try first."
image: "/news-images/pieeg-xr-setup-guide.jpg"
featured: true
tags: ["Quest", "PiEEG XR", "BLE", "Web Bluetooth", "PiEEG Cloud", "PiEEG Server", "BodyPress", "VRChat", "Meta Horizon Link"]
---

You mounted the PiEEG XR mask, powered it from a USB-C bank, and it's advertising over Bluetooth as `PiEEG XR`. This guide takes you from "it's on my head" to "it's driving an experience inside the headset" — starting with the zero-install path almost every VR user already knows.

Everything below assumes the device is already mounted and powered. If not, see the [PiEEG XR connection guide](https://docs.pieeg.com/hardware/devices/PiEEG_XR/connections/) — swap the mask (four buckles), mount the box under the head strap, plug in a 5 V USB-C bank.

---

## Testing PiEEG XR: High-Quality Brainwave & Eye Blink Signal Test

Before mirroring anything into the headset, see what clean PiEEG XR signals look like — a quick live quality check with clear eye-blink and brainwave activity.

https://www.youtube.com/watch?v=khi54mGcJUk

---

## Method 1 — Cloud on Your PC, Mirrored Into the Headset (Start Here)

**Best for:** everyone. **Zero install, zero friction** — no APKs, no sideloading, no command line. Your PC opens a web page, and you already know how to bring a PC screen into your headset.

This is the recommended path. Your desktop browser natively supports Web Bluetooth, so it pairs PiEEG XR with no extra software; then you mirror that desktop into the Quest with the same screen-streaming tool you'd use for any PC VR.

### Step 1 — Connect PiEEG XR in the browser (no install)

1. On your **PC**, open **[cloud.pieeg.com](https://cloud.pieeg.com)** in **Chrome or Edge**.
2. Turn on Bluetooth. Click **Connect**, choose **PiEEG XR** (or **PiEEG XR-16**), pick `PiEEG XR` in the pairing dialog, and grant permission.
3. Signals stream live. That's the whole setup — nothing was installed.

### Step 2 — Mirror your desktop into the Quest

Bring that browser window into the headset with whatever you already use:

| Tool | Type | Notes |
|---|---|---|
| **Meta Horizon Link / Air Link** | Official (Meta) | Wired (USB-C 3.2) or wireless over 5 GHz Wi-Fi. Brings your PC desktop into the headset. Needs the Meta Horizon Link app on Windows. |
| **Virtual Desktop** | Third-party (paid) | Popular low-latency wireless desktop streaming. |
| **Immersed** | Third-party | Multi-monitor virtual desktops. |
| **Steam Link** | Third-party (free) | Streams your PC over Wi-Fi. |

Enable **Meta Horizon Link** on the headset: **Meta button → Quick controls → Link** (wired) or toggle **Use Air Link** (wireless), pick your PC, **Launch**.

### Step 3 — Launch an experience

Your Windows desktop appears as a virtual screen in VR. Open the Cloud gallery on it and pick an experience (see [starter experiences](#three-experiences-to-try-first) below) — you're now reading brain and facial signals inside the headset, and you installed nothing.

---

## Method 2 — PiEEG Server on Your PC, Dashboard in the Quest Browser

**Best for:** no screen-mirroring; the PC holds the BLE link, the Quest's stock browser just loads a page.

Your PC pairs PiEEG XR, and the Quest's **built-in** browser only loads a web page over your local network — no sideloading needed.

1. **Install the server** on your Windows PC (Python 3.10+):
   ```bash
   pip install pieeg-server
   ```
2. **Start it**, connecting to PiEEG XR over BLE:
   ```bash
   pieeg-server
   ```
   The WebSocket runs on `:1616`, the dashboard on `:1617`.
3. **Find your PC's local IP** — `ipconfig` (look for the IPv4 address, e.g. `192.168.1.50`). PC and Quest must be on the **same Wi-Fi**.
4. **In the Quest's built-in browser**, open:
   ```
   http://192.168.1.50:1617
   ```
5. The full dashboard loads — live waveforms, FFT, signal quality, and server-fed experiences — all rendered in the headset while your PC does the Bluetooth.

> Experiences launched from the server dashboard read data over the local WebSocket, so they run fine in the stock Quest browser.

---

## Method 3 — Drive a VRChat Avatar (Cloud + Local Bridge over OSC)

**Best for:** your brain state animating an avatar in a real social-VR app on the Quest.

1. On your **PC**, open [cloud.pieeg.com](https://cloud.pieeg.com) in Chrome/Edge and connect **PiEEG XR** over Web Bluetooth (or use `pieeg-server`).
2. Download and run the **[PiEEG Local Bridge](https://github.com/pieeg-club/PiEEG-local-bridge/releases/latest)** (5 MB) — it forwards Cloud band powers to local apps via **OSC**.
3. In Cloud, launch the **VRChat OSC Bridge** experience (or **VRChat OSC · Brain Regions** for per-region parameters).
4. Run **VRChat on your Quest** on the same network. Your live EEG band powers stream into avatar parameters and the chatbox — focus, calm, and expressions show up on your avatar in real time.

---

## Method 4 — BodyPress App (Native, No Browser)

**Best for:** a native, no-PC reader — because the Quest's Android BLE stack pairs directly.

BodyPress talks Bluetooth Low Energy and pairs straight with PiEEG XR. Its **Live Signal** screen offers waveform, FFT spectral, neural-state, and signal-quality views.

1. **Enable Developer Mode** (Meta Horizon app → **Menu → Devices → your headset → Developer Mode → On**; reboot).
2. **Sideload the APK** — [download the release build](https://pieeg.lon1.cdn.digitaloceanspaces.com/bodypress/app-release.apk) and install via SideQuest or ADB. Full guide: [Run BodyPress on Meta Quest](/tutorials/bodypress-meta-quest-sideload).
3. Launch BodyPress, open **Live Signal**, and pair `PiEEG XR`. Read live biosignals in the headset — no PC, no browser.

> Also on [Google Play](https://play.google.com/store/apps/details?id=com.bodypress.governorhq) for phones and tablets.

### Multitasking tip

Quest lets you pin a browser or app window in space and use it alongside others. Pin the **PiEEG dashboard** (the local-IP server page from Method 2) — or **BodyPress** — as a floating window so your live signal sits beside whatever else you're running.

---

## Three Experiences to Try First

All live in the Cloud gallery at [cloud.pieeg.com](https://cloud.pieeg.com) and in the open-source `experiences` directory.

| Experience | What it does | Why start here |
|---|---|---|
| **Avatar Neurofeedback Studio v2** | Drive a VRM avatar's face directly from your EEG. Drag any electrode × band → any expression; a REST vs ACTIVE contrastive trainer ranks features by Cohen's d and auto-picks your strongest cue. | The clearest "my brain moves this" feedback loop — and it's placement-adaptive. |
| **Neural Flight** | Soar first-person over an endless procedural world — **focus is your lift**. Hold focus to climb and glide; lose it and gravity takes over. Starts in autopilot demo, switch to Live. Enter in VR or AR. | Pure fun, instant intuition for focus control. Runs immersive in the headset. |
| **Face Trainer v2** | Placement-agnostic facial-EMG trainer. A 3-2-1 recording rhythm captures 3× more labelled samples per rep; a per-expression L2 + group-lasso detector shows which electrodes carry each expression. Only 3 reps needed. | Fast, honest calibration — and the channel-importance bars teach you good electrode contact. |

### Recommended order

1. **Face Trainer v2** — quick calibration confirms your mask has clean contact and teaches the pipeline.
2. **Neural Flight** — immediate, joyful focus control.
3. **Avatar Neurofeedback Studio v2** — deeper mapping once you trust your signal.

---

## Which Method Should You Pick?

| Your situation | Method |
|---|---|
| **Just want it working, nothing to install** | **1** (Cloud on PC + mirror into Quest) |
| Don't want to mirror your screen | **2** (Server + local IP) |
| Want your avatar to react in VRChat | **3** (Local Bridge → OSC) |
| Want a native app, no browser at all | **4** (BodyPress) |

## Troubleshooting

- **`PiEEG XR` not in the pairing dialog** — confirm the USB-C bank is powering it and it's within ~5 m. Unplug/replug the bank to restart BLE advertising.
- **Red signal quality** — the mask electrodes need firm skin contact. Reseat the mask; blinking and chewing should produce large, obvious deflections when contact is good.
- **Quest can't reach `http://<pc-ip>:1617` (Method 2)** — both devices must be on the same Wi-Fi; check the PC firewall isn't blocking ports 1616/1617.
- **Laggy or blurry mirror (Method 1)** — use a 5 GHz Wi-Fi network (or a USB-C 3.2 cable for wired Link) and keep the PC and router close.

## What's Next

- **Experiences gallery** — the full library at [cloud.pieeg.com](https://cloud.pieeg.com): P300 Mini-Game, Neural Sonification, Northern Lights, and more.
- **Docs** — [PiEEG XR setup](https://docs.pieeg.com/hardware/devices/PiEEG_XR/) and the [full software reference](https://docs.pieeg.com/).
- **Open source** — everything is on [GitHub](https://github.com/pieeg-club).
