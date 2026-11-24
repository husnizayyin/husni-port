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
            Standardized overview of real-world products built and launched across 5 companies. Click any card to inspect full product details.
          </p>
        </div>

        {/* Standardized Case Study Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {CASE_STUDIES.map((study, idx) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
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

                {/* Clear Professional Title */}
                <h3 className="mt-5 text-xl font-bold leading-snug tracking-tight text-zinc-950 transition-colors group-hover:text-[#FF5C1A] sm:text-2xl dark:text-white dark:group-hover:text-[#FF7844]">
                  {study.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {study.summary}
                </p>

                {/* Complete List of Launched Products for this Company */}
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
              </div>

              {/* Standardized Card Footer: "X Products Launched in Production" */}
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

                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-900 transition-colors group-hover:bg-zinc-950 group-hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:group-hover:bg-white dark:group-hover:text-zinc-950">
                  <span>View Products</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
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
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
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
                  <span className="font-mono text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {selectedStudy.client} · {selectedStudy.location} · {selectedStudy.period}
                  </span>
                  <h3 className="mt-1.5 text-2xl font-bold text-zinc-950 sm:text-3xl dark:text-white">
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

              <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/90 p-4 dark:border-zinc-800 dark:bg-zinc-900/70">
                {selectedStudy.outcomes.map((o) => (
                  <div key={o.label}>
                    <div
                      className="text-xl font-bold sm:text-2xl"
                      style={{ color: selectedStudy.accent }}
                    >
                      {o.value}
                    </div>
                    <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">{o.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  Business Challenge
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {selectedStudy.challenge}
                </p>
              </div>

              <div className="mt-6">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  <Layers className="h-3.5 w-3.5 text-[#FF5C1A]" />
                  <span>Solution & Implementation</span>
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

              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  Launched Products ({selectedStudy.productsCount})
                </h4>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {selectedStudy.deliverables.map((d) => (
                    <div
                      key={d.name}
                      className="rounded-2xl border border-zinc-200/80 p-3.5 dark:border-zinc-800"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-zinc-950 dark:text-white">
                          {d.name}
                        </span>
                        <span className="font-mono text-[10px] text-[#FF5C1A]">{d.stack}</span>
                      </div>
                      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{d.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-zinc-100 pt-5 dark:border-zinc-800">
                {selectedStudy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
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
