'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Layers, X } from 'lucide-react';
import { CASE_STUDIES, type CaseStudy } from '@/data/experience';
import { useAppSound } from '@/context/SoundProvider';

export function CaseStudies() {
  const { playSound } = useAppSound();
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedStudy) {
        playSound('tick');
        setSelectedStudy(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedStudy, playSound]);

  return (
    <section
      id="work"
      aria-label="Selected Case Studies"
      className="border-b border-zinc-200/80 py-24 sm:py-32 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-[#FF5C1A]" />
              <span>02 / Production Case Studies</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
              Systems shipped to production.
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-400">
            Click any case study card to inspect the underlying system architecture, engineering trade-offs, and shipped deliverables.
          </p>
        </div>

        {/* Bento Case Study Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {CASE_STUDIES.map((study, idx) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              whileHover={{ y: -5 }}
              onPointerDown={() => playSound('open')}
              onClick={() => setSelectedStudy(study)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  playSound('open');
                  setSelectedStudy(study);
                }
              }}
              className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-7 shadow-editorial-light transition-colors hover:border-zinc-400 sm:p-8 dark:border-zinc-800/90 dark:bg-zinc-900/65 dark:shadow-editorial-dark dark:hover:border-zinc-600"
            >
              {/* Top Accent Hairline */}
              <div
                className="absolute inset-x-0 top-0 h-1 opacity-85 transition-opacity group-hover:opacity-100"
                style={{ backgroundColor: study.accent }}
              />

              <div>
                {/* Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  <span>
                    {study.index} · {study.client}
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] dark:border-zinc-800 dark:bg-zinc-900">
                    {study.period}
                  </span>
                </div>

                {/* Metric Callout + Title */}
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight text-zinc-950 group-hover:text-[#FF5C1A] transition-colors sm:text-[1.7rem] dark:text-white dark:group-hover:text-[#FF7844]">
                    {study.title}
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {study.summary}
                </p>

                {/* Key Deliverables Preview */}
                <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {study.deliverables.slice(0, 4).map((item) => (
                    <div
                      key={item.name}
                      className="rounded-2xl border border-zinc-100 bg-zinc-50/80 px-3.5 py-2.5 dark:border-zinc-800/80 dark:bg-zinc-950/60"
                    >
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </div>
                      <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                        {item.stack}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-7 flex items-center justify-between border-t border-zinc-100 pt-5 dark:border-zinc-800/80">
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display text-2xl font-semibold"
                    style={{ color: study.accent }}
                  >
                    {study.heroMetric}
                  </span>
                  <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                    {study.heroMetricLabel}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-medium text-zinc-900 transition-colors group-hover:bg-zinc-950 group-hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:group-hover:bg-white dark:group-hover:text-zinc-950">
                  <span>Inspect Architecture</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Expandable Architectural Case Study Modal */}
      <AnimatePresence>
        {selectedStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playSound('tick');
              setSelectedStudy(null);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/55 p-4 backdrop-blur-md sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl sm:p-9 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div
                className="absolute inset-x-0 top-0 h-1.5"
                style={{ backgroundColor: selectedStudy.accent }}
              />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {selectedStudy.client} · {selectedStudy.location} · {selectedStudy.period}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-zinc-950 sm:text-3xl dark:text-white">
                    {selectedStudy.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Role: <strong className="text-zinc-800 dark:text-zinc-200">{selectedStudy.role}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close case study"
                  onPointerDown={() => playSound('tick')}
                  onClick={() => setSelectedStudy(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-700 transition-colors hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Outcomes Strip */}
              <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/90 p-4 dark:border-zinc-800 dark:bg-zinc-900/70">
                {selectedStudy.outcomes.map((o) => (
                  <div key={o.label}>
                    <div
                      className="font-display text-xl font-semibold sm:text-2xl"
                      style={{ color: selectedStudy.accent }}
                    >
                      {o.value}
                    </div>
                    <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">{o.label}</div>
                  </div>
                ))}
              </div>

              {/* Engineering Challenge */}
              <div className="mt-6">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  The Engineering Challenge
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {selectedStudy.challenge}
                </p>
              </div>

              {/* System Architecture */}
              <div className="mt-6">
                <h4 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  <Layers className="h-3.5 w-3.5 text-[#FF5C1A]" />
                  <span>System Architecture & Execution</span>
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {selectedStudy.architecture.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#3FA98A]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipped Deliverables */}
              <div className="mt-6">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  Shipped Products & Modules
                </h4>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {selectedStudy.deliverables.map((d) => (
                    <div
                      key={d.name}
                      className="rounded-2xl border border-zinc-200/80 p-3.5 dark:border-zinc-800"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-zinc-950 dark:text-white">
                          {d.name}
                        </span>
                        <span className="font-mono text-[10px] text-[#FF5C1A]">{d.stack}</span>
                      </div>
                      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{d.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Tags */}
              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-zinc-100 pt-5 dark:border-zinc-800">
                {selectedStudy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 font-mono text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
