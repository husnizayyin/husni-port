'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaGooglePlay } from 'react-icons/fa6';
import { CASE_STUDIES } from '@/data/experience';
import { useAppSound } from '@/context/SoundProvider';

const CHIP_BASE =
  'flex min-h-[3.75rem] items-center justify-between gap-3 rounded-2xl border border-zinc-100 bg-zinc-50/90 px-3.5 py-2.5 dark:border-zinc-800/80 dark:bg-zinc-950/60';

export function CaseStudies() {
  const { playSound } = useAppSound();

  return (
    <section
      id="work"
      aria-label="Case Studies and Launched Products"
      className="border-b border-zinc-200/80 py-16 sm:py-24 lg:py-28 dark:border-zinc-900"
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
            Web portals, mobile apps, e-commerce stores, and internal business systems delivered for clients across Singapore and Indonesia.
          </p>
        </div>

        {/* Equal-height cards: every row stretches to the tallest card on tablet and desktop */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-6 md:auto-rows-fr md:grid-cols-2">
          {CASE_STUDIES.map((study, idx) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (idx % 2) * 0.08 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-editorial-light transition-colors hover:border-zinc-400 sm:p-7 lg:p-8 dark:border-zinc-800/90 dark:bg-zinc-900/65 dark:shadow-editorial-dark dark:hover:border-zinc-600"
            >
              <div
                className="absolute inset-x-0 top-0 h-1 opacity-90 transition-opacity group-hover:opacity-100"
                style={{ backgroundColor: study.accent }}
              />

              {/* Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <span>
                  {study.index} · {study.client}
                </span>
                <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 font-mono text-[11px] dark:border-zinc-800 dark:bg-zinc-900">
                  {study.period}
                </span>
              </div>

              {/* Title & Summary: reserved height keeps every card aligned */}
              <h3 className="mt-5 text-xl font-bold leading-snug tracking-tight text-zinc-950 md:min-h-[5.25rem] lg:min-h-[4.25rem] lg:text-2xl dark:text-white">
                {study.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 md:min-h-[7.5rem] lg:min-h-[6rem] dark:text-zinc-400">
                {study.summary}
              </p>

              {/* Launched Products: each one links to its live site or store listing */}
              <div className="mt-5 grid grid-cols-1 content-start gap-2 min-[480px]:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {study.deliverables.map((item) => {
                  const inner = (
                    <>
                      <div className="min-w-0">
                        <div className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          {item.name}
                        </div>
                        <div className="mt-0.5 truncate font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                          {item.stack}
                        </div>
                      </div>
                      {item.url &&
                        (item.linkType === 'play' ? (
                          <FaGooglePlay
                            aria-hidden="true"
                            className="h-3.5 w-3.5 shrink-0 text-zinc-400 transition-colors group-hover/chip:text-[#3FA98A]"
                          />
                        ) : (
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-zinc-400 transition-all group-hover/chip:-translate-y-0.5 group-hover/chip:translate-x-0.5 group-hover/chip:text-[#FF5C1A]"
                          />
                        ))}
                    </>
                  );

                  return item.url ? (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={
                        item.linkType === 'play'
                          ? `${item.name} on Google Play`
                          : `Open ${item.name}`
                      }
                      onPointerDown={() => playSound('click')}
                      className={`${CHIP_BASE} group/chip transition-colors hover:border-zinc-400 hover:bg-white dark:hover:border-zinc-600 dark:hover:bg-zinc-900`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={item.name} className={CHIP_BASE}>
                      {inner}
                    </div>
                  );
                })}
              </div>

              {/* Footer pinned to the bottom of every card */}
              <div className="mt-auto pt-7">
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-5 dark:border-zinc-800/80">
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

                  <a
                    href="#experience"
                    onPointerDown={() => playSound('tick')}
                    className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-950 hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-white dark:hover:text-zinc-950"
                  >
                    <span>Role & experience</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
