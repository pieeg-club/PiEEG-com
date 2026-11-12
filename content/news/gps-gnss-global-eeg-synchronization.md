---
title: "Exploring Decentralized, GPS-Synchronized EEG Recording Across Continents"
date: "2026-11-08"
category: "Research"
excerpt: "Could a $40 Raspberry Pi GNSS timing module align open-source EEG recordings across continents to the microsecond—without a central timing server? Here is the distributed neuroscience concept we are investigating."
image: "/news-images/gps-eeg-synchronization.jpg"
featured: false
tags: ["Research", "EEG", "GPS", "GNSS", "Hyperscanning", "Raspberry Pi", "PiEEG-16", "PiEEG-24"]
---

Traditional multi-subject EEG hyperscanning requires participants to sit in the same laboratory so hardware trigger cables or local network clocks can lock every amplifier to a common timeline. Once recording sites are separated by cities or oceans, internet jitter makes millisecond—let alone microsecond—sample alignment unreliable.

At PiEEG, we are exploring a decentralized alternative: **using low-cost (~$40) Raspberry Pi GPS/GNSS timing modules with pulse-per-second (1PPS) hardware discipline to synchronize independent EEG stations anywhere on Earth.**

## One Global Clock, Zero Central Servers

Picture independent Raspberry Pi acquisition nodes running in Canada, Japan, and Australia—each paired with **[PiEEG-16](/hardware/pieeg-16)** or the upcoming 24-channel **PiEEG-24** shield and a GNSS receiver. Because GNSS satellites broadcast atomic-clock timing references globally, each station can discipline its local acquisition clock and timestamp ADC sample edges against UTC without any physical link or central timing server between labs.

With proper hardware synchronization between the GNSS timing pulse and the ADS1299 sample clock, **microsecond-scale cross-continental alignment** becomes technically feasible on affordable open hardware.

## Scientific Possibilities—and Necessary Rigor

If validated experimentally, globally time-locked open-source EEG nodes could open new directions in distributed neuroscience:

- **Cross-continental EEG hyperscanning** during collaborative or remote social tasks
- **Shared-stimulus neural response studies** across geographically distributed cohorts
- **Reproducible multi-site benchmarks** using identical open-source signal chains

At the same time, precise clock alignment is only a prerequisite—never proof of neural coupling on its own. Rigorous experimental controls, deterministic ADC sample-clock locking, environmental artifact rejection, and conservative statistical testing remain essential to separate genuine event-locked brain dynamics from spurious correlations.

We are preparing experimental validation tests around this architecture and welcome input from researchers working in hyperscanning, precision timing, and open neuroscience.

**[Join the Discussion in Our Community →](/community)**
