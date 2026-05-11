<img width="1447" height="989" alt="image" src="https://github.com/user-attachments/assets/08636c7f-4a60-4c2f-896c-e88fa152a808" />


# PiEEG Website — Content Manager

Welcome! This README is your **CMS dashboard**. Click any section below to open the corresponding folder and its guide.

---

## 📰 News Articles

> Add, edit or remove news articles displayed on the `/news` page.

| Action | Location |
|--------|----------|
| ✏️ Add / Edit / Delete an article | [content/news/](content/news/) |
| 🖼️ Upload a news image | [public/news-images/](public/news-images/) |

---

## 🛒 Product / Hardware Pages

> Each sub-folder is one hardware product page on the website.

| Action | Location |
|--------|----------|
| ➕ Add or update a product page | [src/app/hardware/](src/app/hardware/) |
| 🖼️ Upload a product image | [public/products/](public/products/) |

**Existing product pages:**

| Product | Folder |
|---------|--------|
| PiEEG | [src/app/hardware/pieeg/](src/app/hardware/pieeg/) |
| PiEEG 16 | [src/app/hardware/pieeg-16/](src/app/hardware/pieeg-16/) |
| IronBCI | [src/app/hardware/ironbci/](src/app/hardware/ironbci/) |
| IronBCI 32 | [src/app/hardware/ironbci-32/](src/app/hardware/ironbci-32/) |
| MicroBCI | [src/app/hardware/microbci/](src/app/hardware/microbci/) |
| ArduEEG | [src/app/hardware/ardeeg/](src/app/hardware/ardeeg/) |
| JNeuralEEG | [src/app/hardware/jneeg/](src/app/hardware/jneeg/) |
| EMG Kit | [src/app/hardware/emg-kit/](src/app/hardware/emg-kit/) |
| 8-ch Wet Cap | [src/app/hardware/8ch-wet-cap/](src/app/hardware/8ch-wet-cap/) |
| 8-ch Dry Cap | [src/app/hardware/8ch-dry-cap/](src/app/hardware/8ch-dry-cap/) |
| 16-ch Cap | [src/app/hardware/16ch-cap/](src/app/hardware/16ch-cap/) |
| 32-ch Wet Cap | [src/app/hardware/32ch-wet-cap/](src/app/hardware/32ch-wet-cap/) |
| Conductive Gel | [src/app/hardware/conductive-gel/](src/app/hardware/conductive-gel/) |

---

## 📄 Other Pages

> Static pages of the website. Each folder contains a `page.tsx` file you can edit.

| Page | Folder |
|------|--------|
| Home | [src/app/](src/app/) → `page.tsx` |
| About | [src/app/about/](src/app/about/) |
| Community | [src/app/community/](src/app/community/) |
| Contact | [src/app/contact/](src/app/contact/) |
| Examples | [src/app/examples/](src/app/examples/) |
| Explore | [src/app/explore/](src/app/explore/) |
| Software | [src/app/software/](src/app/software/) |
| Support | [src/app/support/](src/app/support/) |
| Partnership | [src/app/partnership/](src/app/partnership/) |
| Jobs | [src/app/job/](src/app/job/) |
| Liability | [src/app/liability/](src/app/liability/) |

---

## 🖼️ Global Images & Assets

| Asset type | Folder |
|------------|--------|
| Product images | [public/products/](public/products/) |
| News images | [public/news-images/](public/news-images/) |
| Site-wide images (logo, hero…) | [public/](public/) |

---

## 🚀 Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to preview the site.
