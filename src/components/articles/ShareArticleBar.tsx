'use client';

import React, { useEffect, useState } from 'react';
import { Check, Link2, Share2 } from 'lucide-react';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTelegram,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6';
import type { Article } from '@/data/articles';
import { useAppSound } from '@/context/SoundProvider';
import { trackEvent } from '@/lib/analytics';

const SITE_URL = 'https://www.husnizayn.com';

interface ShareArticleBarProps {
  article: Article;
  variant?: 'compact' | 'card';
}

export function ShareArticleBar({ article, variant = 'card' }: ShareArticleBarProps) {
  const { playSound } = useAppSound();
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(`${SITE_URL}/articles/${article.slug}`);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}/articles/${article.slug}`);
      setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
    }
  }, [article.slug]);

  const shareTitle = `${article.title} — Husni Zayyin Ansori`;
  const shareSummary = article.excerpt;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);
  const encodedTextWithDesc = encodeURIComponent(`${article.title}\n\n${shareSummary}`);
  const encodedWhatsApp = encodeURIComponent(
    `*${article.title}*\n${shareSummary}\n\n${shareUrl}`
  );

  const platforms = [
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: FaLinkedinIn,
      hoverClass: 'hover:border-[#0A66C2] hover:text-[#0A66C2] dark:hover:border-[#0A66C2] dark:hover:text-[#3897F0]',
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedWhatsApp}`,
      Icon: FaWhatsapp,
      hoverClass: 'hover:border-[#25D366] hover:text-[#16A34A] dark:hover:border-[#25D366] dark:hover:text-[#25D366]',
    },
    {
      name: 'X / Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      Icon: FaXTwitter,
      hoverClass: 'hover:border-zinc-900 hover:text-zinc-950 dark:hover:border-white dark:hover:text-white',
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTextWithDesc}`,
      Icon: FaTelegram,
      hoverClass: 'hover:border-[#229ED9] hover:text-[#229ED9] dark:hover:border-[#229ED9] dark:hover:text-[#38BDF8]',
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
      Icon: FaFacebookF,
      hoverClass: 'hover:border-[#1877F2] hover:text-[#1877F2] dark:hover:border-[#1877F2] dark:hover:text-[#60A5FA]',
    },
  ] as const;

  const recordShare = (method: string) => {
    trackEvent('article_share', {
      share_method: method,
      article_slug: article.slug,
      article_title: article.title,
      article_category: article.category,
    });
  };

  const handleCopyLink = async () => {
    playSound('click');
    recordShare('copy_link');
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Ignore clipboard errors
    }
  };

  const handleNativeShare = async () => {
    playSound('click');
    recordShare('native_share');
    try {
      await navigator.share({
        title: shareTitle,
        text: shareSummary,
        url: shareUrl,
      });
    } catch {
      // User dismissed share sheet
    }
  };

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center gap-2" aria-label="Share this article">
        <span className="mr-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Share:
        </span>
        {platforms.map(({ name, href, Icon, hoverClass }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${name}`}
            title={`Share on ${name}`}
            onPointerDown={() => playSound('tick')}
            onClick={() => recordShare(name.toLowerCase())}
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 ${hoverClass}`}
          >
            <Icon className="h-3.5 w-3.5" />
          </a>
        ))}

        <button
          type="button"
          onClick={handleCopyLink}
          aria-label="Copy article link"
          title="Copy article link"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Link2 className="h-3.5 w-3.5" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        {canNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            aria-label="More share options"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
          >
            <Share2 className="h-3.5 w-3.5 text-[#FF5C1A]" />
            <span>Share</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <section
      aria-label="Share Article and Social Preview"
      className="mt-16 rounded-3xl border border-zinc-200/90 bg-zinc-50/80 p-6 sm:p-8 dark:border-zinc-800/90 dark:bg-zinc-900/50"
    >
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
        {/* Left: Share Actions */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#FF5C1A]">
            <Share2 className="h-3.5 w-3.5" />
            <span>Share This Article</span>
          </div>
          <h3 className="mt-2 text-xl font-bold text-zinc-950 sm:text-2xl dark:text-white">
            Found this breakdown useful? Share it with your network.
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Sharing automatically attaches your official OpenGraph banner along with this article&apos;s title and summary description.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {platforms.map(({ name, href, Icon, hoverClass }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onPointerDown={() => playSound('click')}
                onClick={() => recordShare(name.toLowerCase())}
                className={`inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-800 transition-colors dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 ${hoverClass}`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{name}</span>
              </a>
            ))}

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400 dark:text-emerald-600" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Link2 className="h-3.5 w-3.5" />
                  <span>Copy URL</span>
                </>
              )}
            </button>

            {canNativeShare && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-800 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
              >
                <Share2 className="h-3.5 w-3.5 text-[#FF5C1A]" />
                <span>More</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Live OpenGraph Social Card Preview */}
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="aspect-[1983/793] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/og-image.jpg"
                alt={`Husni Zayyin Ansori OpenGraph banner for ${article.title}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="border-t border-zinc-100 p-3.5 dark:border-zinc-800/80">
              <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                husnizayn.com
              </div>
              <div className="mt-0.5 line-clamp-1 text-xs font-bold text-zinc-900 dark:text-zinc-100">
                {article.title}
              </div>
              <div className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">
                {article.excerpt}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
