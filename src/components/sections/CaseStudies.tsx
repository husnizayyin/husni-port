'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, Layers } from 'lucide-react';
import { CASE_STUDIES } from '@/data/experience';
import { useAppSound } from '@/context/SoundProvider';
import { cn } from '@/lib/utils';

export function CaseStudies() {
  const { playSound } = useAppSound();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section
      id="work"
      aria-label="Case Studies and Launched Products"
      className="border-b border-zinc-200/80 py-24 sm:py-28 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-[#FF5C1A]" />
              <span>02 / Case Studies & Launched Products</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl dark:text-white">
              15 products launched to production.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Web , mobile apps, e-commerce stores, and internal business systems delivered for clients across Singapore and Indonesia.
          </p>
        </div>

        {/* Case Study Cards — Inline Expandable Details (Zero Modals) */}
        <div className="mt-12 grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          {CASE_STUDIES.map((study, idx) => {
            const isExpanded = expandedId === study.id;
            return (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-7 shadow-editorial-light transition-colors hover:border-zinc-400 sm:p-8 dark:border-zinc-800/90 dark:bg-zinc-900/65 dark:shadow-editorial-dark dark:hover:border-zinc-600"
              >
                {/* Top Accent Bar */}
                <div
                  className="absolute inset-x-0 top-0 h-1 opacity-90 transition-opacity group-hover:opacity-100"
                  style={{ backgroundColor: study.accent }}
                />

                <div>
                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    <span>
                      {study.index} · {study.client}
                    </span>
                    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 font-mono text-[11px] dark:border-zinc-800 dark:bg-zinc-900">
                      {study.period}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-xl font-bold leading-snug tracking-tight text-zinc-950 sm:text-2xl dark:text-white">
                    {study.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {study.summary}
                  </p>

                  {/* Launched Products Grid */}
                  <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {study.deliverables.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-2xl border border-zinc-100 bg-zinc-50/90 px-3.5 py-2.5 dark:border-zinc-800/80 dark:bg-zinc-950/60"
                      >
                        <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          {item.name}
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                          {item.stack}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Inline Expandable Architecture Details (No Popup Modal) */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 space-y-4 border-t border-zinc-100 pt-5 dark:border-zinc-800">
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                              Business Challenge
                            </h4>
                            <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                              {study.challenge}
                            </p>
                          </div>

                          <div>
                            <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                              <Layers className="h-3.5 w-3.5 text-[#FF5C1A]" />
                              <span>Technical Implementation</span>
                            </h4>
                            <ul className="mt-2 space-y-2">
                              {study.architecture.map((point) => (
                                <li
                                  key={point}
                                  className="flex items-start gap-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300"
                                >
                                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3FA98A]" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {study.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Footer */}
                <div className="mt-7 flex items-center justify-between border-t border-zinc-100 pt-5 dark:border-zinc-800/80">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-2xl font-bold tracking-tight"
                      style={{ color: study.accent }}
                    >
                      {study.heroMetric}
                    </span>
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {study.heroMetricLabel}
                    </span>
                  </div>

                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onPointerDown={() => playSound('tick')}
                    onClick={() => setExpandedId(isExpanded ? null : study.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-950 hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-white dark:hover:text-zinc-950"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'Architecture Details'}</span>
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 transition-transform',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
