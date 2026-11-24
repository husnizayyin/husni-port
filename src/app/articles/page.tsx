import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticlesIndexClient } from '@/components/articles/ArticlesIndexClient';
import { getSortedArticles } from '@/data/articles';

const SITE_URL = 'https://www.husnizayn.com';

export const metadata: Metadata = {
  title: 'Engineering Articles & Architecture Case Notes',
  description:
    'In-depth software engineering articles and production case studies by Husni Zayyin Ansori covering Next.js SEO platforms, Shopify Liquid e-commerce, Flutter mobile architecture, Docker, and local AI video pipelines.',
  alternates: {
    canonical: '/articles',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/articles`,
    title: 'Engineering Articles & Production Breakdowns — Husni Zayyin Ansori',
    description:
      'Comprehensive technical write-ups from live Singapore & regional web platforms, Shopify catering engines, and open-source repositories.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1983,
        height: 793,
        alt: 'Engineering Articles by Husni Zayyin Ansori',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Articles — Husni Zayyin Ansori',
    description:
      'Architecture breakdowns across Next.js, Flutter, Shopify Liquid, Docker, and Whisper.cpp.',
    images: ['/og-image.jpg'],
  },
};

export default function ArticlesPage() {
  const articles = getSortedArticles();

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Engineering Articles & Production Breakdowns — Husni Zayyin Ansori',
    url: `${SITE_URL}/articles`,
    description:
      'Technical articles and production architecture case studies written by Husni Zayyin Ansori.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((a, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${SITE_URL}/articles/${a.slug}`,
        name: a.title,
      })),
    },
  };

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Navbar />
      <ArticlesIndexClient />
      <Footer />
    </div>
  );
}
