---
title: "Your Editor Can Now Read the EEG Stream"
date: "2026-09-24"
category: "Software"
excerpt: "PiEEG Agent exposes its live analysis tools over MCP. The copilot you already use can inspect signal quality, sessions, and neural metrics — hardware commands stay off until you turn them on."
image: "/news-images/New-MCP-server.png"
featured: true
tags: ["MCP", "AI", "BCI", "EEG", "PiEEG Agent", "Software"]
---

A second chat window was always the wrong place for a live recording. You are already in an editor, a desktop agent, or a lab copilot. The missing piece was a way for that program to see the headset without becoming a new product you have to learn.

[PiEEG Agent](https://www.pieeg.com/agent) now publishes its tools over the Model Context Protocol. Any host that speaks MCP can call them: a coding assistant in the IDE, a desktop model, a research agent you already run. PiEEG does not replace that host. It hands it a live view of the stream.

## One conversation, two kinds of work

Until now, looking at a recording meant leaving the place you were writing. Check impedance in one app, ask for a band-power summary in another, then paste the numbers back into the notebook. MCP collapses that hop.

The connected host can ask Agent for what the amplifier is actually doing right now. Channel quality. Whether the spectrum looks like focus, rest, or noise. Which electrodes carried a pattern you just trained. How this block compares with the previous one, with a real effect size rather than a paraphrase. Spectra, connectivity, stored sessions — the same surface Agent already uses, reachable as tools instead of as a separate UI.

That is the useful part. You stay in the thread where the experiment is being written, and the numbers come back into that thread.

## Looking is not the same as driving

Connecting a host does not hand it the front panel.

Out of the box, the MCP surface is observational. The agent can read quality, state metrics, patterns, sessions, and spectral views. It cannot retune the front end, arm a recording, or push a test waveform just because the socket is open.

Hardware actions are a separate switch. You turn them on deliberately, and each execution is still gated on its own. Filtering, capture, the ADS1299 test tone, an OSC feed into another instrument — those are available when you want an agent in the loop, and absent when you only want a second pair of eyes on the trace.

A lab assistant that can describe the signal is useful. A lab assistant that can reconfigure the amplifier without being asked is not. The protocol split is there so those stay different jobs.

## What changes in practice

You do not install a new copilot and you do not migrate a workflow. Point the host you already trust at Agent, then ask it about the stream the way you would ask it about a log file or a dataset sitting in the repo.

People building closed-loop setups get the other half: once device tools are enabled, the same host can request a recording, run the built-in test signal, or route features onward — still only after that permission is explicit.

The analysis stays where it was. [PiEEG Agent](https://www.pieeg.com/agent) still owns the live tools, the metrics, and the gate on the hardware. MCP is only the doorway.

## Open it

Start at [PiEEG Agent](https://www.pieeg.com/agent), attach an MCP host, and ask it what the electrodes are doing. Leave device actions off until you have a reason to turn them on.

🤖 **[PiEEG Agent](https://www.pieeg.com/agent)**

💻 **[GitHub Repository](https://github.com/pieeg-club/PiEEG-agent)**

📚 **[Documentation](https://docs.pieeg.com)**
