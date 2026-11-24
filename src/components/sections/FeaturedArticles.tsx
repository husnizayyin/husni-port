'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BookOpen, Clock, Globe } from 'lucide-react';
import { ARTICLES } from '@/data/articles';
import { useAppSound } from '@/context/SoundProvider';

export function FeaturedArticles() {
  const { playSound } = useAppSound();
  const highlights = ARTICLES.filter((a) => a.featured);

  return (
    <section
      id="articles"
      aria-label="Featured Engineering Articles"
      className="border-b border-zinc-200/80 py-24 sm:py-28 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-[#FF5C1A]" />
              <span>03 / Engineering Articles</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl dark:text-white">
              Technical notes from real builds.
            </h2>
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
              Deep dives into architecture, performance, and system design written directly from my open-source and live deployed repositories.
            </p>
          </div>

          <Link
            href="/articles"
            onPointerDown={() => playSound('click')}
            className="inline-flex items-center gap-2 self-start rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-xs font-semibold text-zinc-950 transition-colors hover:border-zinc-400 hover:bg-zinc-50 sm:self-auto dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-600"
          >
            <BookOpen className="h-3.5 w-3.5 text-[#FF5C1A]" />
            <span>View All Articles ({ARTICLES.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Highlight Articles Grid — Navigates Directly to Dedicated Article Page (Zero Modals) */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {highlights.map((article, idx) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-7 shadow-editorial-light transition-colors hover:border-zinc-400 dark:border-zinc-800/90 dark:bg-zinc-900/65 dark:shadow-editorial-dark dark:hover:border-zinc-600"
            >
              <div
                className="absolute inset-x-0 top-0 h-1 opacity-90 transition-opacity group-hover:opacity-100"
                style={{ backgroundColor: article.accent }}
              />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {article.liveUrl && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <Globe className="h-2.5 w-2.5" />
                        LIVE REPO
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
                  <h3 className="text-xl font-bold leading-snug tracking-tight text-zinc-950 transition-colors group-hover:text-[#FF5C1A] dark:text-white dark:group-hover:text-[#FF7844]">
                    {article.title}
                  </h3>
                </Link>

                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {article.excerpt}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {article.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-200/80 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between border-t border-zinc-100 pt-5 dark:border-zinc-800/80">
                <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                  {article.repoName}
                </span>

                <Link
                  href={`/articles/${article.slug}`}
                  onPointerDown={() => playSound('click')}
                  className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
