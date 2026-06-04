# Scripts

Utility scripts for asset optimization and build tasks.

## Video Compression

### `compress-video.py`

Compresses videos for web background use with aggressive optimization.

**Requirements:**
- Python 3
- FFmpeg (install with `winget install FFmpeg` on Windows)

**Usage:**

```bash
# Basic usage (default settings)
python scripts/compress-video.py input-video.mp4

# Custom output name
python scripts/compress-video.py input-video.mp4 output-video.mp4

# Custom settings (width, fps, quality)
python scripts/compress-video.py input-video.mp4 output.mp4 1280 24 32
```

**Recommended Settings for Background Videos:**

Since the video is displayed at low opacity (15%) and blurred, use aggressive compression:

```bash
# High compression (recommended for backgrounds)
python scripts/compress-video.py ironbci-video.mp4 ironbci-bg.mp4 1280 24 35

# Maximum compression (smaller file, slightly lower quality)
python scripts/compress-video.py ironbci-video.mp4 ironbci-tiny.mp4 960 20 38
```

**Parameters:**
- `max_width`: Maximum width in pixels (default: 1280)
- `fps`: Frame rate (default: 24, can go as low as 15-20 for backgrounds)
- `crf`: Quality factor (18-28 = high, 28-35 = medium, 35-40 = low)
  - For backgrounds: **32-38 is ideal**
  - Higher = smaller file size

**Output:**
- H.264 encoded MP4
- No audio track
- Optimized for web streaming (`faststart` flag)
- Typically 60-90% file size reduction

---

## Image Optimization

### `optimize-images.js`

Optimizes images for web use.

**Usage:**
```bash
node scripts/optimize-images.js
```

### `convert-icon.js`

Converts icon files to various formats for web use.

**Usage:**
```bash
node scripts/convert-icon.js
```
