'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowDownRight, FileText } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { PROFILE } from '@/data/profile';
import { SoundButton } from '@/components/ui/SoundButton';
import { useAppSound } from '@/context/SoundProvider';

const HeroScene = dynamic(() => import('@/components/canvas/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="mx-auto aspect-[4/5] w-full max-w-[440px]" />
  ),
});

const HERO_SOCIAL_ICONS: Record<
  (typeof PROFILE.socials)[number]['id'],
  React.ComponentType<{ className?: string }>
> = {
  linkedin: FaLinkedinIn,
  github: SiGithub,
  x: FaXTwitter,
};

export function HeroSection() {
  const { playSound } = useAppSound();

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative overflow-hidden border-b border-zinc-200/80 pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 dark:border-zinc-900"
    >
      {/* Subtle Architectural Grid Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-light bg-[size:28px_28px] opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_35%,transparent_100%)] dark:bg-grid-dark"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Editorial Split Grid */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column (7 cols): Understated Senior Typography */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400"
            >
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {PROFILE.name}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">/</span>
              <span>{PROFILE.role}</span>
              <span className="text-zinc-300 dark:text-zinc-700">/</span>
              <span>{PROFILE.location}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-2xl text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-zinc-950 min-[400px]:text-4xl sm:text-5xl lg:text-[3.5rem] dark:text-white"
            >
              {PROFILE.heroHeadline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-[1.0625rem] dark:text-zinc-400"
            >
              {PROFILE.heroSubheadline}
            </motion.p>

            {/* Primary Actions & Clean Platform Icons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <SoundButton
                href="#work"
                variant="primary"
                soundVariant="click"
                className="w-full sm:w-auto"
              >
                <span>Explore Case Studies</span>
                <ArrowDownRight className="h-4 w-4" />
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
                <span>Curriculum Vitae</span>
              </SoundButton>

              <div className="flex items-center gap-2 sm:ml-1">
                {PROFILE.socials.map((s) => {
                  const Icon = HERO_SOCIAL_ICONS[s.id];
                  return (
                    <motion.a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${PROFILE.shortName} on ${s.label}`}
                      title={s.label}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onPointerDown={() => playSound('tick')}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column (5 cols): Interactive 3D Portrait + Editorial Caption */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <HeroScene />
            <div className="mx-auto mt-3 flex max-w-[440px] items-center justify-between border-t border-zinc-200/70 pt-3 font-mono text-[11px] text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
              <span>Currently · Archangel Digital Studios (SG)</span>
              <span>Next.js · Flutter · Laravel</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Architectural Hairline Ledger (Replaces Generic Floating Box) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-zinc-200/80 pt-8 sm:mt-16 sm:grid-cols-4 sm:gap-x-0 dark:border-zinc-800/90"
        >
          {PROFILE.metrics.map((m, idx) => (
            <div
              key={m.label}
              className={
                idx !== 0
                  ? 'sm:border-l sm:border-zinc-200/80 sm:pl-7 sm:pr-4 dark:sm:border-zinc-800/90'
                  : 'sm:pr-4'
              }
            >
              <div className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">
                0{idx + 1} / {m.label}
              </div>
              <div className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
                {m.value}
              </div>
              <div className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                {m.detail}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
