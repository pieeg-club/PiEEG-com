import fs from 'fs';
import path from 'path';
import type { MetadataRoute } from 'next';
import { getAllNews } from '@/lib/news';
import { getAllTutorials } from '@/lib/tutorials';

const BASE_URL = 'https://pieeg.com';

// Top-level routes that map to a static page (src/app/<route>/page.tsx).
const STATIC_ROUTES = [
  '',
  'about',
  'agent',
  'browser',
  'cloud',
  'community',
  'contact',
  'examples',
  'explore',
  'hardware',
  'job',
  'liability',
  'news',
  'partnership',
  'server',
  'support',
  'tutorials',
  'xr',
];

// Auto-discover hardware product pages: any src/app/hardware/<product>/page.tsx.
function getHardwareSlugs(): string[] {
  const hardwareDir = path.join(process.cwd(), 'src/app/hardware');
  try {
    return fs
      .readdirSync(hardwareDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .filter((entry) =>
        fs.existsSync(path.join(hardwareDir, entry.name, 'page.tsx'))
      )
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: route ? `${BASE_URL}/${route}` : BASE_URL,
    lastModified: now,
    changeFrequency: route === '' || route === 'news' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.7,
  }));

  const hardwareEntries: MetadataRoute.Sitemap = getHardwareSlugs().map(
    (slug) => ({
      url: `${BASE_URL}/hardware/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  );

  const newsEntries: MetadataRoute.Sitemap = getAllNews().map((article) => ({
    url: `${BASE_URL}/news/${article.slug}`,
    lastModified: article.date ? new Date(article.date) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const tutorialEntries: MetadataRoute.Sitemap = getAllTutorials().map(
    (tutorial) => ({
      url: `${BASE_URL}/tutorials/${tutorial.slug}`,
      lastModified: tutorial.date ? new Date(tutorial.date) : now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  );

  return [
    ...staticEntries,
    ...hardwareEntries,
    ...newsEntries,
    ...tutorialEntries,
  ];
}
