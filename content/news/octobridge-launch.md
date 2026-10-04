---
title: "octoBridge: A Browser Lab for Biosignals and the Room"
date: "2026-10-04"
category: "Product Launch"
excerpt: "octoBridge is a classroom lab in the browser. Octopus-16 supplies band power over Bluetooth. A USB board supplies room sensors, lights, a servo, and a screen. Programs send serial commands. They do not flash a new sketch."
image: "/news-images/octobridge.jpg"
featured: true
tags: ["Product Launch", "octoBridge", "Octopus-16", "Classroom", "EEG"]
---

**octoBridge** is a classroom lab that runs in the browser. Wear Octopus-16. Plug the octoBridge board. The same tab reads both, then moves a light, a servo, or a screen.

Open it at [octobridge.pieeg.com](https://octobridge.pieeg.com).

## Two devices, one tab

Octopus-16 is the scalp side: 16 channels over Bluetooth. The tab computes the reading. Hampel, a band-pass, then an FFT. What comes out is relative band power, an RMS in µV, and two indices labelled focus and relax. Those indices are uncalibrated. A blink or a jaw clench raises RMS. That is muscle, not a thought.

octoBridge is the room side: an Arduino Uno (ATmega328P) over USB. It reports light in lux, distance in centimetres (a facing surface is required), temperature, and humidity. Moisture, sound, and the knob are raw counts from 0 to 1023. It also reports a button, PIR motion, IR remote codes, and 6-axis tilt. Tilt is gravity. There is no magnetometer, so there is no heading.

Outputs are two lights, a relay, a buzzer, a servo from 0 to 180 degrees, and a 16×2 character screen.

Web Serial and Web Bluetooth stay in this browser. Chrome or Edge, on https or localhost. Nothing is installed.

## Flash once. Then the page is the program.

The first visit puts firmware on from the tab. Octopus-16 flashes the XIAO ESP32-S3. octoBridge takes a hex through the Uno bootloader. No Arduino IDE, and no second sketch later.

After that, Board shows live numbers and lets you press a light, turn the servo, or write the screen. Blocks stacks forever, if, wait, and a move. Write is the same run, typed as sentences: a comma waits a moment, a period waits longer. Repeat runs six ready machines and does not overwrite the stack you wrote. Learn reads the same fields and does not send commands.

A stack sends the same serial commands as the Board studio. It does not flash a new sketch.

## What you can actually build

Close your eyes, alpha rises, a light comes on. Map focus onto the servo and the needle follows an uncalibrated index, scaled onto 0 to 180 degrees. A walk-by on the PIR turns the buzzer on. Moisture is still a raw count: when it drops, the relay can switch a pump. Two reads can share one action. High alpha and no motion can write a line on the screen.

Swap the sense and you have a different meter. The pieces do not change.

## Limits

This is a classroom tool. It is not a hospital test.

- Focus and relax are uncalibrated indices.
- Sound, moisture, and the knob are ADC counts, not calibrated units.
- Distance needs a facing surface. A missed echo is not "very far".
- Blink and jaw are not thoughts.
- Safari and phones cannot open USB serial.

## Open the lab

**[octobridge.pieeg.com](https://octobridge.pieeg.com)**

First time, start at [Flash](https://octobridge.pieeg.com/flash), then [Connect](https://octobridge.pieeg.com/connect).
