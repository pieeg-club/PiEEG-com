---
title: "Control Your VRChat Avatar with Live Brain Signals"
date: "2026-08-28"
difficulty: "Intermediate"
time: "45 min"
excerpt: "Design brain-reactive avatar expressions with Avatar Foundation V2, then stream them live into VRChat. Train custom EEG mappings, see which brain signals drive which expressions, and wire the same parameters into your VRChat avatar via OSC. Two streaming paths: Cloud + Neural Stream + Local Bridge, or pieeg-server direct."
image: "/news-images/vrchat-brain-avatar.jpg"
featured: true
tags: ["VRChat", "OSC", "EEG", "Avatar Foundation", "Brain-Computer Interface", "Avatar", "Neural Stream", "PiEEG Cloud", "PiEEG Server", "Local Bridge"]
---

**Avatar Foundation V2** lets you design and calibrate brain-reactive avatar expressions in the browser, then stream the same signals into VRChat to animate your avatar in real time. Train custom EEG mappings (which brain bands drive which expressions), validate signal quality, and export the parameters straight into VRChat via OSC. Your avatar reacts to focus, relaxation, meditation, or arousal — no button presses, no faked expressions.

This guide shows the complete workflow: train mappings in Avatar Foundation V2, then stream live into VRChat using either the cloud route (Neural Stream + Local Bridge) or pieeg-server's direct OSC bridge.

## What You'll Build

By the end, you'll have:

1. **Trained avatar mappings in Avatar Foundation V2** — validated which brain signals (alpha, beta, theta, delta, gamma) drive which expressions on your own headset.
2. **Live OSC stream into VRChat** — your avatar receives the same EEG parameters you tested in the browser, updating 10-15 times per second.
3. **Brain-reactive avatar animations** — blendshapes, material glow, or constraints that respond to focus (beta ↑), relaxation (alpha ↑), or meditation (theta ↑).

Example VRChat avatar parameters you'll create:

| Parameter | Range | Mental State | Example Use |
|-----------|-------|--------------|-------------|
| `EEG_Alpha` | 0.0-1.0 | Relaxed awareness, eyes closed, calm | Eye glow, calm aura particles |
| `EEG_Beta` | 0.0-1.0 | Focus, active thinking, problem-solving | Forehead emissive, sharp eye shape |
| `EEG_Theta` | 0.0-1.0 | Drowsiness, meditation, creative flow | Soft halo, drifting orbs |
| `EEG_Delta` | 0.0-1.0 | Deep sleep, unconscious processing | Dimmed lights, slowed animations |
| `EEG_Gamma` | 0.0-1.0 | High-level cognition, cross-modal binding | High-frequency shimmer, intense glow |

## Prerequisites

| What you need | Details |
|---------------|---------|
| A PiEEG-class device | PiEEG-8/16, Octopus-16, IronBCI, or PiEEG XR |
| VRChat on PC | Steam or standalone VRChat client with OSC enabled |
| Avatar project in Unity | Your avatar source with Avatars 3.0 SDK |

**Streaming path options:**
- **Path A (Cloud)**: [PiEEG Cloud](https://cloud.pieeg.com) + [PiEEG Local Bridge](https://github.com/pieeg-club/PiEEG-local-bridge/releases/latest) (5 MB binary, includes Avatar Foundation V2)
- **Path B (Server)**: `pieeg-server` Python package (Python 3.10+, direct OSC)

> **No headset yet?** Both paths support the demo server — train avatar mappings with synthetic signals to understand the workflow before buying hardware.

---

## Step 1: Design & Validate Mappings in Avatar Foundation V2

**Avatar Foundation V2** is a browser-based neurofeedback studio that trains custom EEG → expression mappings and ranks which brain signals work best for your unique electrode placement. Use it FIRST to validate signal quality and discover which bands drive which expressions, THEN wire the same parameters into VRChat.

### Launch Avatar Foundation V2

1. Open [cloud.pieeg.com](https://cloud.pieeg.com) in Chrome or Edge.
2. Click **Connect** and choose your device (BLE, Wi-Fi server URL, or **▶ Use Demo Server**).
3. Confirm live waveforms appear.
4. In the gallery, open **Avatar Foundation V2** (Neurofeedback section).

### Train a Mapping

Pick an expression you want to drive (e.g., "calm eyes" or "focused brow") and train a brain-state mapping:

1. **Pick a link type**:
   - **Spectral** (recommended): Maps EEG frequency bands (alpha, beta, theta, delta, gamma) to expression intensity.
   - **Artifact**: Maps time-domain transients (blinks, jaw clenches) to momentary triggers.

2. **Record contrast states** (20 seconds each):
   - **REST**: Sit still, neutral expression, eyes open.
   - **ACTIVE**: Perform the target state (e.g., close eyes and relax for alpha).

3. **Avatar Foundation ranks all channels × bands** by Cohen's d and highlights the **best EEG cue** for your electrode placement.
   - Example: "Channel 3 Alpha has the highest separation (d = 1.8)" → wire `EEG_Alpha` to your VRChat "calm eyes" blendshape.

4. **Test live**: Avatar Foundation previews the mapping in real time so you can validate it works before exporting.

### Repeat for Multiple Expressions

- **Calm/relaxation** → Alpha (eyes closed, relaxed)
- **Focus/concentration** → Beta (mental math, problem-solving)
- **Meditation/drowsiness** → Theta (eyes closed, drifting attention)
- **High cognition** → Gamma (complex reasoning, cross-modal tasks)

Each trained mapping tells you WHICH parameter to wire in VRChat and validates your headset is picking up clean signal for that band.

### Note Your Parameters

Avatar Foundation shows you parameter names like:
- `Alpha`, `Beta`, `Theta`, `Delta`, `Gamma` (global average)
- `Frontal_Alpha`, `Parietal_Beta` (per-region, if configured)

Write these down — you'll create the same parameters in VRChat and stream the same values via OSC.

---

## Step 2: Choose Your Streaming Path

Now that you've validated which brain signals work, stream them into VRChat. Two paths:

| | Cloud + Local Bridge | pieeg-server Direct |
|---|---|---|
| **Includes Avatar Foundation V2?** | ✅ Yes (browser-based) | ❌ No (server streams raw data only) |
| **Complexity** | One binary download + browser | Python install + pip |
| **Latency** | ~150-300 ms (browser → bridge → VRChat) | ~50-100 ms (server → VRChat) |
| **Cross-machine** | No (bridge and VRChat on same PC) | Yes (server on one PC, VRChat on another) |
| **Per-region streaming** | Yes (via Neural Stream config) | Yes (via `--osc-regions-setup`) |
| **Best for** | Designing mappings first, then streaming | Lowest latency, Python workflows, LAN setups |

**Recommendation**: Start with **Path A (Cloud)** — you've already used Avatar Foundation V2, so just add the Local Bridge and stream the same parameters straight into VRChat.

---

## Path A: Stream via Cloud + Neural Stream + Local Bridge

You've already trained mappings in Avatar Foundation V2. Now forward those same signals into VRChat via the Local Bridge.

### Step A1: Launch the Local Bridge

Neural Stream sends data to a tiny app on your machine, not to cloud servers.

1. Download the [PiEEG Local Bridge](https://github.com/pieeg-club/PiEEG-local-bridge/releases/latest) (Windows, macOS, or Linux).
2. Run it. A window appears with a **6-character share code** (e.g. `X7P4K9`).
3. In the Cloud dashboard header, click **🖥️ Local Bridge**, enter the code, and click **Connect**.
4. The status dot turns green when the P2P channel opens.

### Step A2: Start Neural Stream

1. In the dashboard header, click **🧠 Neural Stream**.
2. Set the destination to **VRChat** (this picks port 9000 and sets the address prefix to `/avatar/parameters/`).
3. Enable the **signal groups** matching what you trained in Avatar Foundation:

| Group | What VRChat receives | Use case |
|-------|---------------------|----------|
| **🌈 Band powers · average** | `EEG_Alpha`, `EEG_Beta`, `EEG_Theta`, `EEG_Delta`, `EEG_Gamma` | The 5 core bands you validated |
| **🧬 Band powers · per region** | `Frontal_Alpha`, `Parietal_Beta`, … | Spatial mappings (if you trained per-region) |
| **⚡ Events** | `blink` | Momentary 0/1 pulse on eye blinks |

4. Set the **streaming rate** (10-15 Hz is smooth for avatar animations).
5. Flip the switch to **Streaming**. Leave the panel open (streaming stops when you close it).

> **Browser throttling fix**: Launch Chrome/Edge with `--disable-background-timer-throttling` so the stream keeps running at full rate when VRChat has focus:
> ```bash
> chrome.exe --disable-background-timer-throttling
> ```

### Step A3: Verify VRChat Receives OSC

1. Launch **VRChat** and load into any world.
2. Open the **Action Menu** (R on keyboard), go to **Options → OSC → Enable**.
3. Press **Show OSC Debug** — a floating panel lists every OSC message received.
4. Look for `/avatar/parameters/EEG_Alpha`, `/avatar/parameters/EEG_Beta`, etc., updating at 10-15 Hz.

If nothing appears, see [Troubleshooting](#troubleshooting) below.

---

## Path B: Stream via pieeg-server Direct OSC Bridge

The server-native route: `pieeg-server` computes band powers in Python and sends OSC directly to VRChat. No browser, no bridge — just a Python process and a UDP socket.

### Step B1: Install pieeg-server

Requires Python 3.10 or later:

```bash
pip install pieeg-server
```

Verify the install:

```bash
pieeg-server --version
```

### Step B2: Start the Server with OSC Enabled

Launch the server and enable the VRChat OSC bridge with `--osc`:

```bash
pieeg-server --osc
```

**Full flags:**

| Flag | Default | Meaning |
|------|---------|---------|
| `--osc` | Off | Enable the OSC bridge on startup |
| `--osc-host` | `127.0.0.1` | VRChat's OSC receive address |
| `--osc-port` | `9000` | VRChat's OSC receive port |
| `--osc-mode` | `both` | `chatbox`, `parameters`, or `both` |
| `--osc-interval` | `0.25` | Update interval in seconds (4 Hz) |
| `--osc-regions-setup` | Off | Enable per-region streaming |

**Example: 60 Hz updates, parameters only**

```bash
pieeg-server --osc --osc-interval 0.016 --osc-mode parameters
```

### Step B3: Connect Your Headset

The server auto-discovers devices:

1. The terminal shows **available devices** (BLE, USB, network).
2. Type the number next to your device and press Enter.
3. Signals stream; the dashboard serves on `http://localhost:1617`.

Or connect to the demo server for testing:

```bash
pieeg-server --device demo --osc
```

### Step B4: Verify OSC Output

**Check server logs** for OSC send confirmations:

```
[OSC] Sent /avatar/parameters/EEG_Alpha = 0.42
[OSC] Sent /avatar/parameters/EEG_Beta = 0.68
[OSC] Sent /chatbox/input "🧠 α42|θ31|β68|γ24 µV²/Hz"
```

And verify in VRChat's **OSC Debug** panel (Action Menu → Options → OSC → Show OSC Debug).

### Step B5: Per-Region Streaming (Advanced)

Send band powers **per brain region** instead of one global average:

```bash
pieeg-server --osc --osc-regions-setup
```

The server prompts you to define regions interactively:

```
Define regions (e.g., Frontal, Parietal, Occipital).
Region name (or Enter to finish): Frontal
Channels (comma-separated, e.g., 0,1,2): 0,1
Region name (or Enter to finish): Parietal
Channels: 4,5
Region name (or Enter to finish): 
```

VRChat receives parameters like `/avatar/parameters/EEG_Frontal_Alpha`, `/avatar/parameters/EEG_Parietal_Beta`, etc.

---

## Step 3: Wire Your Avatar in Unity

Now that VRChat is receiving OSC parameters, wire them into your avatar's Avatars 3.0 FX controller.

### Add Parameters to Your FX Controller

Open your avatar's **FX Animator Controller** and add the parameters matching what you trained:

| Parameter Name | Type | Default | Saved |
|----------------|------|---------|-------|
| `EEG_Alpha` | Float | 0.0 | No |
| `EEG_Beta` | Float | 0.0 | No |
| `EEG_Theta` | Float | 0.0 | No |
| `EEG_Delta` | Float | 0.0 | No |
| `EEG_Gamma` | Float | 0.0 | No |

> **Important**: Set **Saved** to **No** — OSC parameters should update locally without syncing to other players.

### Create Blend Trees or Direct Bindings

Map each parameter to avatar elements based on what you learned in Avatar Foundation V2:

**Option A: Blendshape-driven expression**

1. Create a **1D Blend Tree** with parameter `EEG_Alpha`.
2. At `0.0`, set a neutral expression clip; at `1.0`, set a "calm eyes closed" clip.
3. VRChat interpolates between them based on live alpha.

**Option B: Material glow**

1. Expose a material property (e.g., `_EmissionIntensity`) as animatable.
2. Create two animation clips: one with intensity `0`, one with intensity `2.5`.
3. Blend between them using `EEG_Gamma` as the parameter.

**Option C: Constraint-driven movement**

1. Add a **Position Constraint** to a floating halo or orb.
2. Animate the constraint's weight or offset using `EEG_Theta`.
3. The object drifts or glows as theta rises (meditation, drowsiness).

### Example: Wire Alpha → Calm Eyes

If Avatar Foundation V2 showed "Channel 3 Alpha" as the best cue for relaxation:

1. In Unity, create a blendshape animation: `neutral_face` → `calm_eyes_closed`.
2. Add a 1D blend tree using `EEG_Alpha` as the parameter (0.0 → neutral, 1.0 → calm).
3. Upload the avatar to VRChat.
4. In VRChat, close your eyes and relax — alpha rises, and your avatar's eyes animate shut.

### Upload and Test

1. Build and upload your avatar with the new parameters and animations.
2. Load into VRChat and enable OSC (Action Menu → Options → OSC → Enable).
3. Start your chosen streaming path (Cloud + Bridge or pieeg-server).
4. **Your avatar now reacts to the same brain signals you validated in Avatar Foundation V2.**

---

## Troubleshooting

### VRChat OSC Debug shows nothing

**Check 1: Is OSC enabled in VRChat?**
- Action Menu → Options → OSC → **Enable** must be checked.

**Check 2: Is the OSC sender running?**
- **Cloud path**: Neural Stream panel must be open and show "Streaming".
- **Server path**: Terminal logs should show `[OSC] Sent /avatar/parameters/...`.

**Check 3: Firewall blocking UDP port 9000?**
- Windows: Allow the bridge or Python through Windows Defender Firewall.
- Check that VRChat and the sender are on the **same machine** (or same LAN if using `--osc-host`).

**Check 4: Wrong port?**
- VRChat's default OSC receive port is **9000**. Check that Neural Stream (VRChat preset) or `--osc-port` matches.

### Parameters update but avatar doesn't react

**Check 1: Parameter names match exactly**
- VRChat is case-sensitive. `EEG_Alpha` ≠ `eeg_alpha`.
- Verify parameter names in Unity FX controller match the OSC addresses.

**Check 2: Parameters are not synced**
- Avatar parameters receiving OSC should have **Saved** unchecked in the Expressions Menu so they update locally without sync.

**Check 3: Blend tree or animation isn't wired**
- Select your avatar in VRChat, open the Expressions Menu, and check the Animator — do the parameter values change when you trigger different mental states?

### High latency or choppy updates

**Cloud path:**
- Use the browser `--disable-background-timer-throttling` flag.
- Close other tabs consuming CPU/GPU.
- Reduce Neural Stream rate to 10 Hz if your PC struggles.

**Server path:**
- Increase `--osc-interval` (e.g., `--osc-interval 0.1` for 10 Hz).
- Check CPU usage — FFT runs every interval; high rates on weak hardware cause lag.

### Bridge won't connect (Cloud path)

- Check that the Local Bridge is actually running (window open, share code visible).
- Restart the bridge and re-enter the code in the dashboard.
- Firewall may be blocking WebRTC — allow the bridge through your firewall.

---

## Example Workflows

### Beginner: Single-Band Blendshape

Based on Avatar Foundation V2 training:

1. Train "calm eyes" mapping in Avatar Foundation → discover **Alpha** is the best cue (d = 1.8).
2. Create a blendshape animation in Unity: `neutral_face` → `calm_eyes_closed`.
3. Wire `EEG_Alpha` to a 1D blend tree (0.0 → neutral, 1.0 → calm).
4. Stream via Neural Stream (Path A) or pieeg-server (Path B).
5. **Result**: Close your eyes and relax — alpha rises, eyes animate shut.

### Intermediate: Focus vs. Relax States

1. Train two mappings in Avatar Foundation V2:
   - **Focus** → Beta (mental math, problem-solving)
   - **Relax** → Alpha (eyes closed, deep breathing)
2. In Unity:
   - `EEG_Beta` drives "focus glow" (emissive eyes or forehead).
   - `EEG_Alpha` drives "calm aura" (soft halo or particle effect).
3. Stream both parameters to VRChat.
4. **Result**: Solve a mental math problem (beta ↑ glow intensifies), then close your eyes (alpha ↑ aura appears).

### Advanced: Per-Region Spatial Mapping

1. Train per-region mappings in Avatar Foundation V2 (Frontal, Parietal, Occipital).
2. Stream per-region band powers via Neural Stream or `pieeg-server --osc-regions-setup`.
3. In Unity:
   - `Frontal_Beta` → forehead glow (executive function)
   - `Occipital_Alpha` → back-of-head particles (visual cortex relaxation)
   - `Parietal_Theta` → top-of-head drift (spatial processing)
4. **Result**: Different brain areas drive different avatar parts — frontal focus vs occipital calm visualized spatially.

---

## Going Further

- **Combine with Face Trainer**: Stream fEMG + EEG simultaneously. Use Neural Stream's event mode for blink triggers and expression detection.
- **Drive game mechanics**: Create a VRChat world with trigger zones that read `EEG_Theta` or `EEG_Gamma` for puzzles or environmental reactions.
- **Multi-user EEG**: Run pieeg-server on separate PCs, each streaming to its own VRChat client, and join the same world — every avatar reacts to its user's brain.
- **Combine with Unity PiEEG Package**: Use the [PiEEG Unity package](https://github.com/pieeg-club/PiEEG-unity) to preview EEG-driven animations **in-editor** before uploading to VRChat.

---

## Further Reading

- [VRChat OSC Documentation](https://docs.vrchat.com/docs/osc-overview) — official OSC API reference
- [Neural Stream + TouchDesigner Tutorial](https://pieeg.com/tutorials/neural-stream-touchdesigner-osc) — same Neural Stream setup, different destination
- [PiEEG Unity Package](https://github.com/pieeg-club/PiEEG-unity) — in-editor neuro-reactive avatar authoring
- [PiEEG Local Bridge Releases](https://github.com/pieeg-club/PiEEG-local-bridge/releases/latest) — download the bridge
- [pieeg-server Documentation](https://github.com/pieeg-club/PiEEG-server) — server install, CLI reference, API docs

---

**You've just wired your brain to your VRChat avatar.** Every time you focus, relax, meditate, or problem-solve, your avatar shows it — no button presses, no faked expressions. The same OSC stream can drive multiple apps at once (VRChat + TouchDesigner + your own Unity build), and the whole pipeline runs on your machine with zero cloud dependency after the initial handshake. Welcome to neuro-reactive social VR.
