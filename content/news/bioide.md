---
title: "bioIDE: Write JavaScript Against Live EEG in the Browser"
date: "2026-08-23"
category: "Software"
excerpt: "bioIDE is a browser sandbox for live EEG. Connect a board or start a mock stream, write JavaScript against EEG and bio, and run it in the tab."
image: "/news-images/bioide.jpg"
featured: true
tags: ["Software", "JavaScript", "EEG", "bioIDE"]
---

**bioIDE** is a browser IDE for EEG. Open [ide.pieeg.com](https://ide.pieeg.com), connect a board or start a mock stream, and write JavaScript against the live signal.

The stream was never the hard part. The gap was what comes next: a live frame in the browser, and still a notebook or a server just to ask a simple question.

## What it does

Student code runs in a Web Worker. The sandbox injects:

- `EEG` : the latest streamed frame
- `bio` : windowed history, recording, features, and small models
- `tf` : TensorFlow.js (CPU)
- `plot()` and `console`

There is no backend. Hardware comes in through the [JavaScript SDK](https://docs.pieeg.com/software/api/javascript-sdk/).

## Getting started

1. Open [ide.pieeg.com](https://ide.pieeg.com)
2. Click **Mock**, or **Connect** a board
3. Pick a recipe, or write your own
4. **Run** (`Ctrl+Enter` / `⌘↵`)

Recipes cover the usual first questions: blink, focus, a small classifier.

**[Open bioIDE](https://ide.pieeg.com)**

