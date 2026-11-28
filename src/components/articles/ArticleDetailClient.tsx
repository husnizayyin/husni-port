'use client';

import React, { useEffect, useRef, useState } from 'react';
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
import { trackEvent } from '@/lib/analytics';
import { ShareArticleBar } from './ShareArticleBar';

interface ArticleDetailClientProps {
  article: Article;
  relatedArticles: Article[];
}

export function ArticleDetailClient({ article, relatedArticles }: ArticleDetailClientProps) {
  const { playSound } = useAppSound();
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const hasTrackedRead75 = useRef(false);

  useEffect(() => {
    hasTrackedRead75.current = false;

    trackEvent('article_view', {
      article_slug: article.slug,
      article_title: article.title,
      article_category: article.category,
      article_read_time: article.readTime,
      article_published_at: article.publishedIso,
    });

    const handleScroll = () => {
      if (hasTrackedRead75.current) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const ratio = window.scrollY / scrollable;
      if (ratio >= 0.75) {
        hasTrackedRead75.current = true;
        trackEvent('article_read_75', {
          article_slug: article.slug,
          article_title: article.title,
          article_category: article.category,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.slug, article.title, article.category, article.readTime, article.publishedIso]);

  const handleCopySnippet = async (filename: string, code: string) => {
    playSound('tick');
    trackEvent('article_code_copy', {
      article_slug: article.slug,
      code_filename: filename,
    });
    try {
      await navigator.clipboard.writeText(code);
      setCopiedFile(filename);
      setTimeout(() => setCopiedFile(null), 2000);
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <main id="main-content" className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:px-8">
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
              onClick={() =>
                trackEvent('article_outbound_click', {
                  article_slug: article.slug,
                  destination_type: 'live_website',
                  destination_url: article.liveUrl,
                })
              }
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
              onClick={() =>
                trackEvent('article_outbound_click', {
                  article_slug: article.slug,
                  destination_type: 'github_repo',
                  destination_url: article.repoUrl,
                })
              }
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

        <div className="mt-7 border-t border-zinc-100 pt-5 dark:border-zinc-800/70">
          <ShareArticleBar article={article} variant="compact" />
        </div>
      </motion.header>

      {/* Key Takeaways Summary Box */}
      {article.heroImage && (
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-10 overflow-hidden rounded-3xl border border-zinc-200/90 bg-zinc-50/70 shadow-editorial-light dark:border-zinc-800/90 dark:bg-zinc-900/50 dark:shadow-editorial-dark"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.heroImage.src}
            alt={article.heroImage.alt}
            className="block h-auto w-full"
          />
          {article.heroImage.caption && (
            <figcaption className="border-t border-zinc-200/80 px-5 py-3.5 text-xs leading-relaxed text-zinc-600 dark:border-zinc-800/80 dark:text-zinc-400">
              {article.heroImage.caption}
            </figcaption>
          )}
        </motion.figure>
      )}

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

            {sec.images && sec.images.length > 0 && (
              <div className="mt-6 space-y-6">
                {sec.images.map((img) => (
                  <figure
                    key={img.src}
                    className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-50/70 shadow-sm dark:border-zinc-800/90 dark:bg-zinc-900/50"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="block h-auto w-full"
                    />
                    {img.caption && (
                      <figcaption className="border-t border-zinc-200/80 px-4 py-3 text-xs leading-relaxed text-zinc-600 sm:px-5 dark:border-zinc-800/80 dark:text-zinc-400">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
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

      {/* Social Share Card with Live OpenGraph Image & Description Preview */}
      <ShareArticleBar article={article} variant="card" />

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
