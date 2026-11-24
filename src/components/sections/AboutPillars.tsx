'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { PROFILE } from '@/data/profile';
import { useAppSound } from '@/context/SoundProvider';
import { cn } from '@/lib/utils';

const VELOCITY_PRESETS = [
  {
    id: 'balanced',
    label: 'Full-Stack Balanced',
    split: [36, 34, 30],
    curve: 'M 0 130 C 90 118, 175 88, 260 62 C 345 36, 425 22, 500 12',
    caption: 'Synchronized Next.js SSR portals, Flutter mobile clients & PostgreSQL APIs.',
  },
  {
    id: 'mobile',
    label: 'Mobile Core Lead',
    split: [20, 62, 18],
    curve: 'M 0 134 C 110 126, 195 92, 285 48 C 365 18, 435 12, 500 6',
    caption: 'High-frame-rate Flutter (BLoC/Riverpod), React Native & Kotlin native releases.',
  },
  {
    id: 'web',
    label: 'Headless Web & Commerce',
    split: [64, 18, 18],
    curve: 'M 0 126 C 85 95, 175 68, 270 44 C 360 25, 430 18, 500 10',
    caption: 'Sub-second Next.js platforms, custom Shopify Liquid & Wix Studio Velo modules.',
  },
  {
    id: 'enterprise',
    label: 'Enterprise ERP & AI',
    split: [22, 20, 58],
    curve: 'M 0 132 C 95 112, 180 76, 265 54 C 350 32, 430 16, 500 8',
    caption: 'Multi-branch retail POS, Laravel/MS SQL backbones & OpenCV biometric HRIS.',
  },
] as const;

function ScrubWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.28em]">
      {word}
    </motion.span>
  );
}

export function AboutPillars() {
  const manifestoRef = useRef<HTMLParagraphElement>(null);
  const { playSound } = useAppSound();
  const [presetIdx, setPresetIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: manifestoRef,
    offset: ['start 85%', 'end 48%'],
  });

  const words = PROFILE.manifesto.split(' ');
  const activePreset = VELOCITY_PRESETS[presetIdx];

  return (
    <section
      id="about"
      aria-label="Engineering Specialization"
      className="relative border-b border-zinc-200/80 py-24 sm:py-32 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-[#FF5C1A]" />
          <span>01 / Specialization & Engineering Philosophy</span>
        </div>

        {/* Scroll-Scrubbed Word-by-Word Manifesto */}
        <p
          ref={manifestoRef}
          className="relative mt-6 max-w-5xl font-display text-3xl font-medium leading-[1.18] tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl dark:text-white"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <ScrubWord
                key={`${word}-${i}`}
                word={word}
                progress={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </p>

        {/* Three Architectural Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PROFILE.pillars.map((pillar, idx) => (
            <motion.article
              key={pillar.index}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              onPointerDown={() => playSound('tick')}
              className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-white p-7 shadow-editorial-light transition-colors hover:border-zinc-300 dark:border-zinc-800/90 dark:bg-zinc-900/60 dark:shadow-editorial-dark dark:hover:border-zinc-700"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                    PILLAR {pillar.index}
                  </span>
                  <span
                    className="h-2.5 w-2.5 rounded-full transition-transform group-hover:scale-125"
                    style={{ backgroundColor: pillar.accent }}
                  />
                </div>

                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {pillar.summary}
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-1.5 border-t border-zinc-100 pt-5 dark:border-zinc-800/80">
                {pillar.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 font-mono text-[11px] text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Interactive Architecture Allocation & Sprint Telemetry Widget */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-8 rounded-3xl border border-zinc-200/90 bg-zinc-50/70 p-6 sm:p-8 dark:border-zinc-800/90 dark:bg-zinc-900/40"
        >
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#FF5C1A]">
                Interactive Delivery Telemetry
              </span>
              <h3 className="mt-1 font-display text-2xl font-semibold text-zinc-950 dark:text-white">
                Cross-Stack Sprint Velocity Simulator
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {activePreset.caption}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {VELOCITY_PRESETS.map((preset, idx) => {
                const active = idx === presetIdx;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onPointerDown={() => playSound('tick')}
                    onClick={() => setPresetIdx(idx)}
                    className={cn(
                      'relative rounded-full px-3.5 py-1.5 font-mono text-xs font-medium transition-colors',
                      active
                        ? 'text-white dark:text-zinc-950'
                        : 'border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="velocity-preset-pill"
                        transition={{ type: 'spring', stiffness: 460, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full bg-zinc-950 dark:bg-white"
                      />
                    )}
                    <span className="relative z-10">{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* Allocation Bars */}
            <div className="space-y-4 lg:col-span-5">
              {[
                { label: 'Web & Headless Frontend', pct: activePreset.split[0], color: '#FF5C1A' },
                { label: 'Cross-Platform Mobile', pct: activePreset.split[1], color: '#3FA98A' },
                { label: 'Backend, DB & Enterprise Ops', pct: activePreset.split[2], color: '#7B6CF6' },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs font-medium">
                    <span className="text-zinc-700 dark:text-zinc-300">{bar.label}</span>
                    <span className="font-mono text-zinc-950 dark:text-white">{bar.pct}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200/80 dark:bg-zinc-800">
                    <motion.div
                      animate={{ width: `${bar.pct}%` }}
                      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: bar.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Animated Cumulative Velocity Curve */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 lg:col-span-7 dark:border-zinc-800 dark:bg-zinc-950/70">
              <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                <span>Sprint 01 → Sprint 12 Output</span>
                <span>Production Compounding Curve</span>
              </div>
              <svg viewBox="0 0 500 145" className="h-32 w-full overflow-visible">
                <defs>
                  <linearGradient id="velocityGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF5C1A" />
                    <stop offset="55%" stopColor="#7B6CF6" />
                    <stop offset="100%" stopColor="#3FA98A" />
                  </linearGradient>
                </defs>
                <line
                  x1="0"
                  y1="136"
                  x2="500"
                  y2="136"
                  stroke="currentColor"
                  className="text-zinc-200 dark:text-zinc-800"
                  strokeDasharray="4 4"
                />
                <motion.path
                  fill="none"
                  stroke="url(#velocityGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ d: activePreset.curve }}
                  animate={{ d: activePreset.curve }}
                  transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
