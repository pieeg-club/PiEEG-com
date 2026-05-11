# Hardware Pages

Each sub-folder here is one product page on the website (`/hardware/<product>`).  
Every folder contains a single `page.tsx` file that you edit to update that product's page.

## Editing an existing product page

1. Open the folder for the product you want to update (see table below).
2. Edit `page.tsx` — update text, specs, images, links, etc.
3. Images are served from [`/public/products/`](../../../public/products/) — see that folder's README for sizing guidelines.

## Adding a new product page

1. Create a new folder here with a kebab-case name matching the URL you want, e.g. `my-new-board/`.
2. Inside it, create `page.tsx`.  
   Copy an existing product page as a starting template (e.g. [`ironbci/page.tsx`](ironbci/page.tsx)).
3. Add a link to the new page in the hardware listing page: [`page.tsx`](page.tsx).
4. Add product images to [`public/products/`](../../../public/products/).

## Product pages

| URL | Folder |
|-----|--------|
| `/hardware/pieeg` | [pieeg/](pieeg/) |
| `/hardware/pieeg-16` | [pieeg-16/](pieeg-16/) |
| `/hardware/ironbci` | [ironbci/](ironbci/) |
| `/hardware/ironbci-32` | [ironbci-32/](ironbci-32/) |
| `/hardware/microbci` | [microbci/](microbci/) |
| `/hardware/ardeeg` | [ardeeg/](ardeeg/) |
| `/hardware/jneeg` | [jneeg/](jneeg/) |
| `/hardware/emg-kit` | [emg-kit/](emg-kit/) |
| `/hardware/8ch-wet-cap` | [8ch-wet-cap/](8ch-wet-cap/) |
| `/hardware/8ch-dry-cap` | [8ch-dry-cap/](8ch-dry-cap/) |
| `/hardware/16ch-cap` | [16ch-cap/](16ch-cap/) |
| `/hardware/32ch-wet-cap` | [32ch-wet-cap/](32ch-wet-cap/) |
| `/hardware/conductive-gel` | [conductive-gel/](conductive-gel/) |

---

← Back to [CMS dashboard](../../../README.md)
