# News Images

This folder contains featured images for news articles.

## How to add a news image

1. Drop your image file here (`.jpg`, `.png`, `.webp` are all fine).
2. Use a descriptive, kebab-case filename that matches the article slug, e.g. `ironbci-32-launch.jpg`.
3. Reference it in the article's frontmatter as `image: "/news-images/<filename>"`.

## Naming convention

Name the image after the article slug so it's easy to match:

```
article slug:  ironbci-32-professional
image file:    ironbci-32-professional.jpg   ✅
```

## Recommended image specs

- **Dimensions**: 1200 × 630 px (standard Open Graph ratio, works well as article header too).
- **Format**: `.jpg` or `.webp` preferred.
- **File size**: under **200 KB**.

## Where images are used

The image path is set in each article's frontmatter inside [content/news/](../../content/news/).

```markdown
---
image: "/news-images/your-image.jpg"
---
```

---

← Back to [CMS dashboard](../../README.md)
