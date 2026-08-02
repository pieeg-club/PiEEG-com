import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Tutorial {
  slug: string;
  title: string;
  date: string;
  difficulty: Difficulty;
  time: string;
  excerpt: string;
  image: string;
  content: string;
  tags: string[];
  featured?: boolean;
}

const tutorialsDirectory = path.join(process.cwd(), 'content/tutorials');

export function getAllTutorials(): Tutorial[] {
  const fileNames = fs.readdirSync(tutorialsDirectory);
  return fileNames
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => getTutorialBySlug(f.replace(/\.md$/, '')))
    .filter((t): t is Tutorial => t !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getTutorialBySlug(slug: string): Tutorial | null {
  try {
    const fullPath = path.join(tutorialsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      difficulty: data.difficulty || 'Beginner',
      time: data.time || '',
      excerpt: data.excerpt || '',
      image: data.image || '/news-images/pieeg-software.jpg',
      content,
      tags: data.tags || [],
      featured: data.featured || false,
    };
  } catch {
    return null;
  }
}
