import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface Guide {
  slug: string;
  title: string;
  date: string;
  updated: string;
  excerpt: string;
  image: string;
  category: string;
  content: string;
  tags: string[];
  featured?: boolean;
  faqs: GuideFaq[];
}

const guidesDirectory = path.join(process.cwd(), 'content/guides');

export function getAllGuides(): Guide[] {
  if (!fs.existsSync(guidesDirectory)) return [];
  const fileNames = fs.readdirSync(guidesDirectory);
  return fileNames
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => getGuideBySlug(f.replace(/\.md$/, '')))
    .filter((g): g is Guide => g !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getGuideBySlug(slug: string): Guide | null {
  try {
    const fullPath = path.join(guidesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const faqs = Array.isArray(data.faqs)
      ? data.faqs
          .filter(
            (item: { question?: string; answer?: string }) =>
              item && item.question && item.answer,
          )
          .map((item: { question: string; answer: string }) => ({
            question: String(item.question),
            answer: String(item.answer),
          }))
      : [];

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      updated: data.updated || data.date || '',
      excerpt: data.excerpt || '',
      image: data.image || '/products/pieeg.png',
      category: data.category || 'Guide',
      content,
      tags: data.tags || [],
      featured: data.featured || false,
      faqs,
    };
  } catch {
    return null;
  }
}
