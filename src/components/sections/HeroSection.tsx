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
    <div className="flex h-[430px] w-full items-center justify-center sm:h-[520px] lg:h-[600px]">
      <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-dashed border-zinc-300 dark:border-zinc-800">
        <div className="h-20 w-20 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-900" />
        <span className="absolute -bottom-8 font-mono text-[11px] uppercase tracking-widest text-zinc-400">
          Initializing WebGL Core
        </span>
      </div>
    </div>
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
      {/* Subtle Architectural Dot Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-light bg-[size:26px_26px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_38%,#000_45%,transparent_100%)] dark:bg-grid-dark"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Coordinate Metadata Strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/70 pb-4 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:border-zinc-800/70 dark:text-zinc-400"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{PROFILE.availability}</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <MapPin className="h-3.5 w-3.5 text-[#FF5C1A]" />
            <span>06°12&apos;S 106°50&apos;E · {PROFILE.location} ({PROFILE.timezone})</span>
          </div>
        </motion.div>

        {/* Main Split Grid: Editorial Typography + Interactive R3F 3D Prism */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1 font-mono text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              <span className="font-semibold text-[#FF5C1A]">HUSNI ZAYYIN ANSORI</span>
              <span className="text-zinc-300 dark:text-zinc-700">/</span>
              <span>{PROFILE.role}</span>
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-zinc-950 sm:text-5xl lg:text-[3.65rem] dark:text-white"
            >
              Engineering systems where{' '}
              <span className="italic text-[#FF5C1A]">precision backend</span> meets tactile interface.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400"
            >
              {PROFILE.heroSubheadline}
            </motion.p>

            {/* Primary Actions & Social Channels */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <SoundButton href="#work" variant="primary" soundVariant="click">
                <span>Explore Case Studies</span>
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
                <span>Download CV</span>
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

          {/* Right Column (5 cols): Interactive R3F 3D Sculpture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <HeroScene />
          </motion.div>
        </div>

        {/* Bottom Architectural Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="mt-12 grid grid-cols-2 gap-4 rounded-3xl border border-zinc-200/90 bg-zinc-50/75 p-5 backdrop-blur-xs sm:grid-cols-4 sm:p-7 dark:border-zinc-800/90 dark:bg-zinc-900/50"
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
              <div className="font-display text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
                {m.value}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
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
