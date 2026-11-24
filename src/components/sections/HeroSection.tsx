'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowDownRight, Download, MapPin } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';
import { PROFILE } from '@/data/profile';
import { SoundButton } from '@/components/ui/SoundButton';
import { useAppSound } from '@/context/SoundProvider';

const HeroScene = dynamic(() => import('@/components/canvas/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full sm:h-[490px] lg:h-[530px]" />
  ),
});

export function HeroSection() {
  const { playSound } = useAppSound();

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative overflow-hidden border-b border-zinc-200/80 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 dark:border-zinc-900"
    >
      {/* Subtle Dot Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-light bg-[size:26px_26px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_38%,#000_45%,transparent_100%)] dark:bg-grid-dark"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Status & Location Strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/70 pb-4 text-xs font-medium text-zinc-600 dark:border-zinc-800/70 dark:text-zinc-400"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span>{PROFILE.availability}</span>
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            <MapPin className="h-3.5 w-3.5 text-[#FF5C1A]" />
            <span>{PROFILE.location}</span>
          </div>
        </motion.div>

        {/* Main Split Grid: Clear Professional Copy + Interactive 3D Portrait of Husni */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
            >
              <span className="text-[#FF5C1A]">{PROFILE.name}</span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span>{PROFILE.tagline}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl font-bold leading-[1.12] tracking-tight text-zinc-950 sm:text-5xl lg:text-[3.5rem] dark:text-white"
            >
              Building Scalable{' '}
              <span className="text-[#FF5C1A]">Web, Mobile,</span> and Enterprise Applications.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400"
            >
              {PROFILE.heroSubheadline}
            </motion.p>

            {/* Primary Actions & Social Channels */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <SoundButton href="#work" variant="primary" soundVariant="click">
                <span>View Launched Products</span>
                <ArrowDownRight className="h-4 w-4" />
              </SoundButton>

              <SoundButton
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                soundVariant="open"
              >
                <Download className="h-4 w-4 text-[#FF5C1A]" />
                <span>Download Resume (PDF)</span>
              </SoundButton>

              <div className="ml-1 flex items-center gap-2">
                <motion.a
                  href="https://www.linkedin.com/in/husnizayn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Husni Zayn on LinkedIn"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  onPointerDown={() => playSound('tick')}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors hover:border-zinc-400 hover:text-[#0A66C2] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-white"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                </motion.a>
                <motion.a
                  href="https://github.com/husnizayyin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Husni Zayyin on GitHub"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  onPointerDown={() => playSound('tick')}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-white"
                >
                  <SiGithub className="h-4 w-4" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right Column (5 cols): Interactive 3D Portrait Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <HeroScene />
          </motion.div>
        </div>

        {/* Bottom Key Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-12 grid grid-cols-2 gap-4 rounded-3xl border border-zinc-200/90 bg-zinc-50/80 p-6 backdrop-blur-sm sm:grid-cols-4 sm:p-7 dark:border-zinc-800/90 dark:bg-zinc-900/50"
        >
          {PROFILE.metrics.map((m, idx) => (
            <div
              key={m.label}
              className={
                idx !== 0
                  ? 'sm:border-l sm:border-zinc-200/80 sm:pl-6 dark:sm:border-zinc-800'
                  : ''
              }
            >
              <div className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
                {m.value}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-800 dark:text-zinc-200">
                {m.label}
              </div>
              <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{m.detail}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
