# Highlighted Community Open-Source Builds (`content/open-ideas/`)

Drop a `.md` file in this directory to feature an independent open-source project built by a community member on `/community/open-ideas` and automatically generate a dedicated SEO page at `/community/open-ideas/<slug>` (plus add it to `sitemap.xml`).

## Example (`content/open-ideas/my-awesome-bci-project.md`)

```markdown
---
title: "Open LSL Bridge for PiEEG-16"
author: "Jane Doe"
authorUrl: "https://github.com/janedoe"
date: "2026-11-15"
category: "Software & Tools"
level: "Intermediate"
hardware: ["PiEEG-16", "Raspberry Pi 5"]
tags: ["LSL", "Python", "OpenViBE", "MNE"]
excerpt: "Zero-copy Lab Streaming Layer bridge for 16-channel PiEEG recordings with synthetic fallback mode."
repoUrl: "https://github.com/janedoe/pieeg16-lsl-bridge"
demoUrl: "https://youtube.com/watch?v=example"
basedOnIdeaSlug: "lsl-brainflow-style-bridges"
featured: true
---

Write the project overview, architecture, benchmark results, and links here in Markdown!
```
