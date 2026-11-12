---
title: "OctoKin (MIT): Open-Source Human Biosignal Feedback for NVIDIA Isaac and ROS 2"
date: "2026-11-11"
category: "Software"
excerpt: "OctoKin bridges the coin-sized 16-channel Octopus-16 sensor directly to ROS 2, NVIDIA Isaac Sim, and Isaac Lab—enabling ~50 ms physiological safety halts, shared-autonomy velocity scaling, and biometric RLHF."
image: "/news-images/octokin-physical-ai.jpg"
featured: true
tags: ["Open Source", "Robotics", "ROS 2", "NVIDIA Isaac", "Octopus-16", "Physical AI", "BCI"]
---

Modern robotic platforms can already perceive operators through cameras and microphones. With **[OctoKin](https://github.com/pieeg-club/octoKin)**—now released under the MIT license—robots and simulation environments can also respond directly to measurable physiological signals from the human body.

Built around our 26 mm, 16-channel dry-electrode **[Octopus-16](/hardware/octopus-16)** sensor, OctoKin streams live EEG, surface EMG, and EOG features into **ROS 2**, **NVIDIA Isaac Sim**, and reinforcement learning pipelines in **Gymnasium** and **NVIDIA Isaac Lab**.

## Grounded in Measurable Physiology

OctoKin is designed strictly around explicit physiological triggers and continuous contact verification rather than black-box "mind-reading" claims:

- **~50 ms Physiological Safety Triggers:** Voluntary jaw-clench EMG bursts (35–100 Hz) execute an immediate `/cmd_vel` halt, while intentional double-blinks allow hands-free mode or waypoint switching.
- **16-Pin Contact Quality Gate & Watchdog:** Continuous scalp-contact monitoring across all 16 spring-loaded pogo pins—paired with a 500 ms telemetry watchdog—prevents loose electrodes or dropped BLE frames from driving erratic motion.
- **Shared-Autonomy Modulation:** Real-time Welch spectral band ratios (`alpha_ratio` and `engagement_index`) smoothly scale robot velocity or compliance within operator-defined safety bounds.
- **Biometric RLHF for Isaac Lab:** A drop-in `HumanFeedbackWrapper(env)` aligns 250 SPS physiological state streams and explicit preference labels (`+1 / -1`) with 50–100 Hz policy steps, automatically gating out noisy frames during human-in-the-loop training.

## Native ROS 2 & Container Integration

Instead of requiring custom C++ message definitions, OctoKin publishes standard `geometry_msgs/Twist`, `std_msgs/Float32`, and `std_msgs/Bool` topics (`/octokin/signal_quality`, `/octokin/intervention`, `/octokin/speed_scale`, and gated `/cmd_vel`). That makes it immediately compatible with NVIDIA Isaac Sim's `omni.isaac.ros2_bridge`, Nav2, MoveIt Servo, and Unitree ROS 2 stacks, as well as Docker and WSL2 setups via a lightweight UDP host bridge.

## Test the Pipeline Without Hardware

Researchers and robotics engineers can evaluate the entire ROS 2 and reinforcement learning workflow immediately using OctoKin's built-in synthetic signal generator:

```bash
git clone https://github.com/pieeg-club/octoKin.git
cd octoKin
pip install -e ".[dev]"

octokin check --source demo --duration 5
python examples/isaac_sim_controller.py --source demo --duration 11 --fast
python examples/rl_human_feedback_demo.py
```

*Safety note: Octopus-16 is a non-medical research sensor without galvanic isolation and must only be powered from an isolated 5 V USB battery bank (≤ 2 A) while worn.*

## Explore OctoKin

- **GitHub Repository (MIT):** [github.com/pieeg-club/octoKin](https://github.com/pieeg-club/octoKin)
- **Hardware Platform:** [PiEEG Octopus-16](/hardware/octopus-16)
