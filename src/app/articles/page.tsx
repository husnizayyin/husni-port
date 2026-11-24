import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticlesIndexClient } from '@/components/articles/ArticlesIndexClient';

export const metadata: Metadata = {
  title: 'Engineering Articles — Husni Zayyin Ansori',
  description:
    'Technical articles and architecture breakdowns by Husni Zayyin Ansori covering Next.js, Flutter, Docker, Prisma, Whisper.cpp video pipelines, and interactive WebGL.',
};

export default function ArticlesPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Navbar />
      <ArticlesIndexClient />
      <Footer />
    </div>
  );
}
