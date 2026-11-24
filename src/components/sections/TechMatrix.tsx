'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TECH_CATEGORIES, TECH_STACK, type TechCategory } from '@/data/techStack';
import { useAppSound } from '@/context/SoundProvider';
import { cn } from '@/lib/utils';

export function TechMatrix() {
  const { playSound } = useAppSound();
  const [activeCategory, setActiveCategory] = useState<TechCategory>('all');

  const filteredStack = useMemo(() => {
    if (activeCategory === 'all') return TECH_STACK;
    return TECH_STACK.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="stack"
      aria-label="Technology Stack"
      className="border-b border-zinc-200/80 py-24 sm:py-32 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-[#7B6CF6]" />
              <span>04 / Technical Skills & Tools</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl dark:text-white">
              Technologies & tools I work with.
            </h2>
          </div>

          {/* Filter Pills with Framer Motion layoutId */}
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter technologies">
            {TECH_CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onPointerDown={() => playSound('tick')}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 font-mono text-xs font-medium transition-colors',
                    active
                      ? 'text-white dark:text-zinc-950'
                      : 'border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="tech-category-pill"
                      transition={{ type: 'spring', stiffness: 460, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-zinc-950 dark:bg-white"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Spring-Animated Tech Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredStack.map((tech) => {
              const Icon = tech.Icon;
              return (
                <motion.div
                  layout
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  whileHover={{ y: -3 }}
                  onPointerDown={() => playSound('tick')}
                  className="group flex items-center gap-3.5 rounded-2xl border border-zinc-200/80 bg-white p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:border-zinc-600"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-100 bg-zinc-50 transition-transform group-hover:scale-110 dark:border-zinc-800 dark:bg-zinc-950">
                    <Icon
                      className="h-5 w-5 transition-colors"
                      style={{
                        color:
                          tech.color === '#18181B'
                            ? 'currentColor'
                            : tech.color,
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {tech.name}
                    </div>
                    <div className="truncate font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                      {tech.role}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
