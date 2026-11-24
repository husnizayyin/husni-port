'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Globe,
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import type { Article } from '@/data/articles';
import { useAppSound } from '@/context/SoundProvider';
import { SoundButton } from '@/components/ui/SoundButton';

interface ArticleDetailClientProps {
  article: Article;
  relatedArticles: Article[];
}

export function ArticleDetailClient({ article, relatedArticles }: ArticleDetailClientProps) {
  const { playSound } = useAppSound();
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const handleCopySnippet = async (filename: string, code: string) => {
    playSound('tick');
    try {
      await navigator.clipboard.writeText(code);
      setCopiedFile(filename);
      setTimeout(() => setCopiedFile(null), 2000);
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:px-8">
      {/* Top Breadcrumb Navigation */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/articles"
          onPointerDown={() => playSound('tick')}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Articles</span>
        </Link>

        <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
          <span>{article.publishedAt}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readTime}
          </span>
        </div>
      </div>

      {/* Article Header */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="border-b border-zinc-200/80 pb-10 dark:border-zinc-800"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: article.accent }}
          />
          <span>{article.category}</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.75rem] dark:text-white">
          {article.title}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
          {article.subtitle}
        </p>

        {/* Source Repository & Live Website Actions */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          {article.liveUrl && (
            <SoundButton
              href={article.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              soundVariant="click"
            >
              <Globe className="h-4 w-4" />
              <span>Visit {article.liveDomain ?? 'Live Website'}</span>
              <ArrowUpRight className="h-4 w-4" />
            </SoundButton>
          )}

          {article.repoUrl && article.repoName && (
            <SoundButton
              href={article.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              soundVariant="tick"
            >
              <SiGithub className="h-4 w-4" />
              <span>{article.repoName}</span>
              <ArrowUpRight className="h-4 w-4" />
            </SoundButton>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-200/80 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.header>

      {/* Key Takeaways Summary Box */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        aria-label="Key Takeaways"
        className="mt-10 rounded-3xl border border-zinc-200/90 bg-zinc-50/80 p-6 sm:p-8 dark:border-zinc-800/90 dark:bg-zinc-900/50"
      >
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
          Key Engineering Takeaways
        </h2>
        <ul className="mt-4 space-y-3">
          {article.keyTakeaways.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#3FA98A]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Full Article Body */}
      <div className="mt-12 space-y-12">
        {article.sections.map((sec) => (
          <section key={sec.heading} className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
              {sec.heading}
            </h2>

            {sec.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300"
              >
                {p}
              </p>
            ))}

            {sec.bullets && (
              <ul className="mt-4 space-y-2.5 rounded-2xl border border-zinc-200/70 bg-white p-5 dark:border-zinc-800/80 dark:bg-zinc-900/40">
                {sec.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: article.accent }}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {sec.code && (
              <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-100">
                <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
                  <span className="font-mono text-xs text-zinc-400">
                    {sec.code.filename}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopySnippet(sec.code!.filename, sec.code!.snippet)
                    }
                    className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                  >
                    {copiedFile === sec.code.filename ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-zinc-200">
                  <code>{sec.code.snippet}</code>
                </pre>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Continue Reading Section */}
      <section
        aria-label="More Articles"
        className="mt-20 border-t border-zinc-200/80 pt-12 dark:border-zinc-800"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-white">
            More Engineering Articles
          </h2>
          <Link
            href="/articles"
            onPointerDown={() => playSound('tick')}
            className="text-xs font-semibold text-[#FF5C1A] hover:underline"
          >
            Browse all →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {relatedArticles.map((rel) => (
            <Link
              key={rel.slug}
              href={`/articles/${rel.slug}`}
              onPointerDown={() => playSound('click')}
              className="group rounded-3xl border border-zinc-200/90 bg-white p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-600"
            >
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                {rel.category} · {rel.readTime}
              </div>
              <h3 className="mt-2 text-base font-bold text-zinc-950 transition-colors group-hover:text-[#FF5C1A] dark:text-white">
                {rel.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                {rel.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
