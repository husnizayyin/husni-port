import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticleDetailClient } from '@/components/articles/ArticleDetailClient';
import { ARTICLES, getArticleBySlug, getSortedArticles } from '@/data/articles';
import { PROFILE } from '@/data/profile';

const SITE_URL = 'https://www.husnizayn.com';

interface ArticlePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return { title: 'Article Not Found' };
  }

  const canonicalUrl = `${SITE_URL}/articles/${article.slug}`;
  const ogImageUrl = `${SITE_URL}/og-image.jpg`;

  return {
    title: article.title,
    description: article.excerpt,
    keywords: [...article.tags, 'Husni Zayyin Ansori', 'Software Engineering Case Study'],
    authors: [{ name: PROFILE.name, url: SITE_URL }],
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      siteName: 'Husni Zayyin Ansori',
      title: article.title,
      description: article.excerpt,
      publishedTime: `${article.publishedIso}T08:00:00.000Z`,
      authors: [PROFILE.name],
      tags: article.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1983,
          height: 793,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@husnizayn',
      creator: '@husnizayn',
      title: article.title,
      description: article.excerpt,
      images: [ogImageUrl],
    },
  };
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const relatedArticles = getSortedArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  const canonicalUrl = `${SITE_URL}/articles/${article.slug}`;
  const ogImageUrl = `${SITE_URL}/og-image.jpg`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        image: ogImageUrl,
        datePublished: `${article.publishedIso}T08:00:00+07:00`,
        dateModified: `${article.publishedIso}T08:00:00+07:00`,
        author: {
          '@type': 'Person',
          name: PROFILE.name,
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Person',
          name: PROFILE.name,
          url: SITE_URL,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        keywords: article.tags.join(', '),
        articleSection: article.category,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Articles',
            item: `${SITE_URL}/articles`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />
      <ArticleDetailClient article={article} relatedArticles={relatedArticles} />
      <Footer />
    </div>
  );
}
