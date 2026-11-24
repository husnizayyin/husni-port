import type { MetadataRoute } from 'next';
import { getSortedArticles } from '@/data/articles';

const SITE_URL = 'https://www.husnizayn.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getSortedArticles();

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.publishedIso),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...articleEntries,
  ];
}
