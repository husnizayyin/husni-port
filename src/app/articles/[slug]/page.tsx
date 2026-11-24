import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticleDetailClient } from '@/components/articles/ArticleDetailClient';
import { ARTICLES, getArticleBySlug } from '@/data/articles';

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
    return { title: 'Article Not Found — Husni Zayyin Ansori' };
  }
  return {
    title: `${article.title} — Husni Zayyin Ansori`,
    description: article.excerpt,
  };
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const relatedArticles = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Navbar />
      <ArticleDetailClient article={article} relatedArticles={relatedArticles} />
      <Footer />
    </div>
  );
}
