'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowUpRight, FileText } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { PROFILE } from '@/data/profile';
import { SoundButton } from '@/components/ui/SoundButton';
import { useAppSound } from '@/context/SoundProvider';
import { getJakartaTime } from '@/lib/utils';

const PLATFORM_STYLES: Record<
  (typeof PROFILE.socials)[number]['id'],
  { Icon: React.ComponentType<{ className?: string }>; hoverClass: string }
> = {
  linkedin: {
    Icon: FaLinkedinIn,
    hoverClass:
      'hover:border-[#0A66C2] hover:text-[#0A66C2] dark:hover:border-[#0A66C2] dark:hover:text-[#3897F0]',
  },
  github: {
    Icon: SiGithub,
    hoverClass:
      'hover:border-zinc-900 hover:text-zinc-950 dark:hover:border-white dark:hover:text-white',
  },
  x: {
    Icon: FaXTwitter,
    hoverClass:
      'hover:border-zinc-900 hover:text-zinc-950 dark:hover:border-white dark:hover:text-white',
  },
};

const FOOTER_LINKS = [
  { label: 'Capabilities', href: '/#about' },
  { label: 'Case Studies', href: '/#work' },
  { label: 'Articles', href: '/articles' },
  { label: 'Experience', href: '/#experience' },
  { label: 'GitHub', href: '/#opensource' },
] as const;

export function Footer() {
  const { playSound } = useAppSound();
  const [clock, setClock] = useState<string>('--:--:--');

  useEffect(() => {
    setClock(getJakartaTime());
    const timer = window.setInterval(() => {
      setClock(getJakartaTime());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleBackToTop = () => {
    playSound('tick');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      aria-label="Contact and Footer"
      className="border-t border-zinc-200/80 bg-white pt-16 pb-12 sm:pt-24 sm:pb-16 dark:border-zinc-900 dark:bg-[#09090B]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Asymmetric Editorial Contact Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left Column (7 cols): Direct Pitch & Primary Action */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-[#FF5C1A]" />
              <span>07 / Contact</span>
            </div>

            <h2 className="mt-4 max-w-xl text-3xl font-bold leading-[1.12] tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl dark:text-white">
              Let&apos;s discuss your next engineering build.
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
              Open to full-time software engineering roles and select technical engagements across web platforms, iOS/Android mobile applications, and internal enterprise systems.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SoundButton
                href={`mailto:${PROFILE.email}`}
                variant="primary"
                soundVariant="click"
                className="w-full sm:w-auto"
              >
                <span>Send an Email</span>
                <ArrowUpRight className="h-4 w-4" />
              </SoundButton>

              <SoundButton
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                soundVariant="open"
                className="w-full sm:w-auto"
              >
                <FileText className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                <span>Curriculum Vitae (PDF)</span>
              </SoundButton>
            </div>
          </div>

          {/* Right Column (5 cols): Structured Architectural Spec Table */}
          <div className="lg:col-span-5">
            <dl className="divide-y divide-zinc-200/80 overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-50/50 dark:divide-zinc-800/80 dark:border-zinc-800/90 dark:bg-zinc-900/35">
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Base
                </dt>
                <dd className="text-right text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {PROFILE.location}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Local Time
                </dt>
                <dd className="font-mono text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  {clock} {PROFILE.timezone} (UTC+7)
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Engagement
                </dt>
                <dd className="text-right text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Remote Global · APAC &amp; EU Overlap
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Profiles
                </dt>
                <dd className="flex items-center gap-2">
                  {PROFILE.socials.map((s) => {
                    const { Icon, hoverClass } = PLATFORM_STYLES[s.id];
                    return (
                      <motion.a
                        key={s.id}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        title={s.label}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onPointerDown={() => playSound('tick')}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition-colors dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 ${hoverClass}`}
                      >
                        <Icon className="h-4 w-4" />
                      </motion.a>
                    );
                  })}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bottom Architectural Colophon */}
        <div className="mt-14 flex flex-col justify-between gap-6 border-t border-zinc-200/80 pt-8 sm:mt-16 md:flex-row md:items-center dark:border-zinc-900">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950 font-display text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">
              HZ
            </span>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">{PROFILE.name}</span>
              <span className="mx-2 text-zinc-300 dark:text-zinc-700">·</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {FOOTER_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onPointerDown={() => playSound('tick')}
                className="transition-colors hover:text-zinc-950 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={handleBackToTop}
              className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-zinc-700 transition-colors hover:text-[#FF5C1A] dark:text-zinc-300 dark:hover:text-[#FF5C1A]"
            >
              <span>Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
