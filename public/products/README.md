# Product Images

This folder contains all images used on hardware/product pages.

## How to add or replace a product image

1. Drop your image file here (`.jpg`, `.png`, `.webp` are all fine).
2. Use a descriptive, kebab-case filename that matches the product, e.g. `ironbci-32-top.jpg`.
3. Reference the image in the product page as `/products/<filename>`.

## Naming convention

| Product | Prefix to use |
|---------|---------------|
| PiEEG | `pieeg-` |
| PiEEG 16 | `pieeg16-` |
| IronBCI | `ironbci-` |
| IronBCI 32 | `ironbci-32-` |
| MicroBCI | `microbci-` |
| ArduEEG | `ardeeg-` |
| JNeuralEEG | `jneeg-` |
| EMG Kit | `emg-` |
| Caps | `cap8-wet-`, `cap8-dry-`, `cap16-`, `cap32-wet-` |
| Conductive Gel | `gel-` |

## Recommended image sizes

- **Main product image**: 800 × 800 px minimum, square crop preferred.
- **Gallery / angle shots**: 1200 × 800 px recommended.
- Keep file size under **300 KB** (use `.webp` for best compression).

## Where images are used

Each product page lives in `src/app/hardware/<product>/page.tsx`.  
The images are referenced there as `src="/products/<filename>"`.

---

← Back to [CMS dashboard](../../README.md)
