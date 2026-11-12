---
title: "Aura: Calibration-Free EMG Challenge Draws 120+ Teams on Kaggle"
date: "2026-11-09"
category: "Community"
excerpt: "Our inaugural Kaggle machine learning competition challenges researchers and developers to decode six hand gestures from 8-channel wrist surface-EMG and IMU recordings across unseen users—with zero per-user calibration."
image: "/news-images/aura-kaggle-challenge.jpg"
featured: false
tags: ["Kaggle", "Competition", "EMG", "Machine Learning", "Aura", "Wearables", "Hugging Face"]
---

Our inaugural machine learning competition—the **[Aura: Calibration-Free EMG Challenge](https://www.kaggle.com/competitions/vr-calibration-free-emg-challenge-pieeg)**—is officially underway on Kaggle, with **more than 120 teams** already building models and climbing the leaderboard in the first two weeks.

## Solving the Cross-User Generalization Bottleneck

Wearable surface-electromyography (sEMG) interfaces often perform well on the individual whose data trained the model, only to degrade sharply when worn by someone new due to differences in forearm anatomy, subcutaneous tissue, and strap placement. Requiring a tedious calibration routine every time a user puts on a wristband remains one of the biggest barriers to everyday neuromuscular interfaces.

This competition puts cross-subject generalization front and center: **train on one set of participants, and classify hand gestures on entirely unseen individuals without per-user recalibration.**

## Dataset, Task, and Evaluation

Participants work with real physiological recordings captured using **[Aura](https://aura.pieeg.com)**, PiEEG's 8-channel dry surface-EMG wristband with integrated inertial sensing:

- **Six target classes:** `rest`, `fist`, `open`, `point`, `pinch`, and `thumb-up`
- **Multimodal wrist signals:** 8 channels of 250 Hz forearm sEMG paired with IMU telemetry, collected and labeled via Aura Dataset Lab
- **Strict subject-disjoint split:** Test-set participants never appear in the training recordings
- **Evaluation metric:** Macro-averaged F1 score across all six gesture classes

## Open Baseline Model on Hugging Face

To help participants get started quickly, we also published **[AuraNet](https://huggingface.co/pieeg/Aura_Net)** (MIT license) on Hugging Face—a compact PyTorch and ONNX temporal-spatial CNN baseline operating on 1-second `[250 × 8]` sEMG windows, complete with training code for both 6-class gesture classification and 7-DoF continuous hand-pose estimation.

## Join the Competition

Whether your background is in biosignal DSP, Riemannian geometry, domain adaptation, or deep sequence modeling, there is still time to enter, share notebooks, and test your approach on real wearable sEMG data.

**[Compete on Kaggle →](https://www.kaggle.com/competitions/vr-calibration-free-emg-challenge-pieeg)**

**[Explore the AuraNet Baseline on Hugging Face →](https://huggingface.co/pieeg/Aura_Net)**
