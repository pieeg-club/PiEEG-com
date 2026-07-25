---
title: "Octopus-16 Firmware Brings 16-Channel EEG to PiEEG Cloud"
date: "2026-07-25"
category: "Software"
excerpt: "The new Octopus-16 firmware connects 16-channel EEG hardware to PiEEG Cloud over Bluetooth, with browser-based installation for the XIAO ESP32-S3."
image: "/news-images/octopus-16-firmware.png"
featured: false
tags: ["Octopus-16", "Firmware", "EEG", "Bluetooth", "ESP32-S3"]
---

We are releasing new firmware for **Octopus-16**, bringing 16-channel EEG connectivity over Bluetooth to [PiEEG Cloud](https://cloud.pieeg.com).

The firmware turns the XIAO ESP32-S3 at the heart of Octopus-16 into the wireless link between the EEG hardware and our cloud platform. Once installed, the board identifies itself as `Octopus-16-XXXX`, making it easy to recognize when connecting from PiEEG Cloud.

## From Octopus-16 to the Browser

This release is designed to make getting a 16-channel EEG system online more direct. The firmware is installed through the browser, and the board can then be discovered over Bluetooth without a separate desktop flashing utility.

With Octopus-16 connected to PiEEG Cloud, users have a straightforward path from the hardware to browser-based EEG tools and experiments. The same device name remains visible after reconnecting, so returning to a recording setup is simple.

## Install the Firmware

Installation takes about 30 seconds. Before starting, make sure the cable supports data transfer; charge-only USB-C cables will power the board but will not expose its serial port.

1. Plug the XIAO ESP32-S3 into this computer with a **USB-C data cable**.
2. Select **Install Octopus-16 Firmware** in the installer.
3. Choose the serial port that appears and wait for flashing to finish.

**Install Octopus-16 Firmware**

## If the Board Is Not Detected

If flashing fails or no serial port appears, put the board into bootloader mode:

1. Hold the **BOOT** button.
2. Tap **RESET** while continuing to hold BOOT.
3. Release **BOOT**, then start the installation again.

After a successful flash, unplug and reconnect the board once. It should then appear in the Bluetooth device list as `Octopus-16-XXXX`.

## Ready for PiEEG Cloud

Once the board is visible over Bluetooth, open [cloud.pieeg.com](https://cloud.pieeg.com) to connect Octopus-16 and begin working with its 16 EEG channels in the browser.

This firmware release is another step toward making multichannel EEG systems easier to set up, connect, and use without adding a complicated software installation process between the hardware and the experiment.