---
title: "Shipping the Oculomotor, Blink & Pupillometry Bench in PiEEG Cloud"
date: "2026-10-18"
category: "Software"
excerpt: "Continuing our scientific recording bench series, PiEEG Cloud adds roll-stabilized dual-eye video-oculography, iris-normalized pupillometry with PLR flash triggers, blink kinematics, and live Optical-to-Bio L2 Ridge Coupling."
image: "/news-images/oculomotor-bench.jpg"
featured: false
tags: ["Software", "Oculomotor", "Pupillometry", "EOG", "EEG", "Signal Processing", "PiEEG Cloud"]
---

Following the release of the **[Optical Physiological Bench](/news/optical-physiological-bench)**, we have shipped the next instrument in PiEEG Cloud's scientific recording series: the **Oculomotor, Blink & Pupillometry Bench**.

Rather than rendering a casual full-face webcam preview, the bench locks onto the medial and lateral canthi of both eyes offscreen (`1280×720` at 30 Hz), affine-rectifies head roll to `0°`, and isolates only two roll-stabilized periocular scopes (**OD · Right Eye** and **OS · Left Eye**) synchronized on a shared monotonic clock with your live PiEEG electrophysiological channels.

## Four Transparent Pipeline Stages

Every computer-vision and signal-coupling step is exposed for inspection and CSV/JSON export—never hidden behind opaque scores:

1. **Pixel-Level Segmentation & Chord Profiling:** Switch either eye viewport live between rectified RGB, the per-pixel segmentation overlay (dark pupil core, iris stroma annulus, corneal Purkinje glint exclusion, and eyelid margins), and the 2D Sobel gradient, paired with the 1D horizontal iris chord intensity profile `I(u)`.
2. **Distance-Invariant Pupillometry & Photic Reflex (PLR):** Computes the iris-normalized pupil ratio (`D_pupil / D_iris`) with blink hold-last-valid gating and zero-phase Butterworth filtering so head Z-movement and blink occlusions don't masquerade as dilation. Includes a built-in photic step trigger to quantify pupillary light reflex constriction latency, amplitude, peak velocity, and `T63` recovery alongside occipital alpha reactivity.
3. **Ballistic Blink & Gaze Kinematics:** Tracks asymmetric closing versus opening eyelid velocity (`dA/dt`), conjugate gaze azimuth/elevation, binocular vergence, and 68% bivariate contour ellipse area (`BCEA`) fixation stability.
4. **Live Optical-to-Bio L2 Ridge Coupling:** Continuously fits standardized L2-regularized regression weights mapping `[eyelidClosure, eyelidVel, gazeAzimuth, gazeElevation]` onto each concurrent EEG/EOG channel—reporting per-channel `R²` and reconstructing the ocular dipole contribution in microvolts in real time.

## Open It in PiEEG Cloud

Launch **[PiEEG Cloud](https://cloud.pieeg.com)** and open **Oculomotor, Blink & Pupillometry Bench** from the Experiences gallery (including built-in reference PLR validation takes when running without a camera).

**[Try It Live on PiEEG Cloud →](https://cloud.pieeg.com/)**

**[Read the Oculomotor Bench Documentation →](https://docs.pieeg.com/software/features/oculomotor-bench/)**
