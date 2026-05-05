# News Content Management

This directory contains all news articles for the PiEEG website. Each article is a separate markdown file with frontmatter metadata.

## Adding a New Article

1. Create a new `.md` file in this directory
2. Use kebab-case for the filename (e.g., `my-new-article.md`)
3. The filename becomes the URL slug (e.g., `/news/my-new-article`)
4. Add frontmatter at the top of the file
5. Write your content in Markdown below the frontmatter

## Article Template

```markdown
---
title: "Your Article Title"
date: "YYYY-MM-DD"
category: "Category Name"
excerpt: "A brief summary of the article (1-2 sentences)"
image: "/news-images/your-image.jpg"
featured: false
tags: ["Tag1", "Tag2", "Tag3"]
---

Your article content goes here in Markdown format.

## You can use headers

- Bullet points
- Are supported

1. As are
2. Numbered lists

**Bold** and *italic* text work too.

[Links](https://example.com) are supported.

![Images](/path/to/image.jpg) can be embedded.
```

## Frontmatter Fields

### Required Fields

- **title**: The article title (string)
- **date**: Publication date in YYYY-MM-DD format
- **category**: Article category (e.g., "Product Launch", "Tutorial", "Research", "Community")
- **excerpt**: Short description for previews (1-2 sentences)
- **image**: Path to featured image in `/public/news-images/`

### Optional Fields

- **featured**: Set to `true` to feature on homepage (boolean, defaults to false)
- **tags**: Array of tags for the article (e.g., ["BCI", "Tutorial", "Python"])

## Categories

Use one of these standard categories:
- Product Launch
- Software
- Hardware
- Tutorial
- Research
- Community
- Update

## Images

1. Add your image to `/public/news-images/`
2. Use descriptive filenames (e.g., `pieeg-32-launch.jpg`)
3. Recommended size: 1200x675px (16:9 aspect ratio)
4. Optimize images before uploading (keep under 500KB)

## Featured Articles

Set `featured: true` in the frontmatter to display the article in the "Featured Stories" section on the news homepage. Only the 3 most recent featured articles will be shown.

## Ordering

Articles are automatically sorted by date (newest first). The date field controls the order.

## Testing

After adding or editing an article:
1. Save the file
2. The Next.js dev server will hot-reload
3. Navigate to `/news` to see the article in the list
4. Click through to see the full article at `/news/[slug]`

## Example

See existing articles in this directory for real examples:
- `pieeg-software-update.md` - Featured article example
- `ironbci-launch.md` - Product launch example
- `deep-learning-keras-tutorial.md` - Tutorial example

## Markdown Rendering

The site uses `react-markdown` with support for:
- Headers (h1-h6)
- Lists (ordered and unordered)
- Links
- Images
- Bold and italic
- Code blocks
- Tables
- Blockquotes

## Need Help?

- Check existing articles for examples
- Join our Discord: https://discord.gg/pieeg
- Read the Next.js documentation: https://nextjs.org/docs
