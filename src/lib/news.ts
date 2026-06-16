import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  content: string;
  tags: string[];
  featured?: boolean;
}

const newsDirectory = path.join(process.cwd(), 'content/news');

export function getAllNews(): NewsArticle[] {
  const fileNames = fs.readdirSync(newsDirectory);
  const allNews = fileNames
    .filter(fileName => fileName.endsWith('.md') && fileName !== 'README.md')
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      return getNewsBySlug(slug);
    })
    .filter((news): news is NewsArticle => news !== null)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
  
  return allNews;
}

export function getNewsBySlug(slug: string): NewsArticle | null {
  try {
    const fullPath = path.join(newsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      category: data.category || 'News',
      excerpt: data.excerpt || '',
      image: data.image || '/news-images/pieeg-software.jpg',
      content,
      tags: data.tags || [],
      featured: data.featured || false,
    };
  } catch (error) {
    console.error(`Error reading news file ${slug}:`, error);
    return null;
  }
}

export function getFeaturedNews(): NewsArticle[] {
  return getAllNews().filter(news => news.featured).slice(0, 3);
}

export function getPaginatedNews(page: number = 1, perPage: number = 10) {
  const allNews = getAllNews();
  const totalPages = Math.ceil(allNews.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  
  return {
    news: allNews.slice(start, end),
    totalPages,
    currentPage: page,
    totalNews: allNews.length,
  };
}
