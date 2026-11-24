'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Clock, Globe, Search } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { ARTICLES, ARTICLE_CATEGORIES } from '@/data/articles';
import { useAppSound } from '@/context/SoundProvider';
import { cn } from '@/lib/utils';

export function ArticlesIndexClient() {
  const { playSound } = useAppSound();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [query, setQuery] = useState<string>('');

  const filtered = useMemo(() => {
    return ARTICLES.filter((a) => {
      const catMatch = selectedCategory === 'All' || a.category === selectedCategory;
      const q = query.trim().toLowerCase();
      const searchMatch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.repoName.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return catMatch && searchMatch;
    });
  }, [selectedCategory, query]);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:px-8">
      {/* Breadcrumb Back Link */}
      <div className="mb-8">
        <Link
          href="/"
          onPointerDown={() => playSound('tick')}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      {/* Page Header */}
      <div className="border-b border-zinc-200/80 pb-10 dark:border-zinc-900">
        <div className="flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-wider text-[#FF5C1A]">
          <span className="h-2 w-2 rounded-full bg-[#FF5C1A]" />
          <span>Engineering Journal & Case Notes</span>
        </div>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
          Articles & Architecture Breakdowns.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Practical engineering write-ups documenting real systems, live web deployments, video pipelines, and Flutter architectures from my GitHub repositories.
        </p>

        {/* Filter Pills & Search */}
        <div className="mt-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-1.5">
            {ARTICLE_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onPointerDown={() => playSound('tick')}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                    active
                      ? 'text-white dark:text-zinc-950'
                      : 'border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="articles-cat-pill"
                      transition={{ type: 'spring', stiffness: 460, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-zinc-950 dark:bg-white"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles or tech..."
              className="w-full rounded-full border border-zinc-200 bg-white py-2 pl-9 pr-4 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-600"
            />
          </div>
        </div>
      </div>

      {/* Articles List */}
      <motion.div layout className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((article) => (
            <motion.article
              layout
              key={article.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-7 shadow-editorial-light transition-colors hover:border-zinc-400 sm:p-8 dark:border-zinc-800/90 dark:bg-zinc-900/65 dark:shadow-editorial-dark dark:hover:border-zinc-600"
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundColor: article.accent }}
              />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {article.category}
                    </span>
                    <span>•</span>
                    <span>{article.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {article.liveUrl && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <Globe className="h-2.5 w-2.5" />
                        LIVE DEMO
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/articles/${article.slug}`}
                  onPointerDown={() => playSound('click')}
                  className="mt-4 block"
                >
                  <h2 className="text-xl font-bold leading-snug tracking-tight text-zinc-950 transition-colors group-hover:text-[#FF5C1A] sm:text-2xl dark:text-white dark:group-hover:text-[#FF7844]">
                    {article.title}
                  </h2>
                </Link>

                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {article.subtitle}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-200/80 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-5 dark:border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <a
                    href={article.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerDown={() => playSound('tick')}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                  >
                    <SiGithub className="h-3.5 w-3.5" />
                    <span>{article.repoName}</span>
                  </a>
                </div>

                <Link
                  href={`/articles/${article.slug}`}
                  onPointerDown={() => playSound('click')}
                  className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  <span>Read Full Article</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
