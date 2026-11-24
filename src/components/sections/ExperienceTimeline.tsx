'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { CheckCircle2, ChevronDown, GraduationCap, MapPin } from 'lucide-react';
import { CAREER_TIMELINE } from '@/data/experience';
import { PROFILE } from '@/data/profile';
import { useAppSound } from '@/context/SoundProvider';
import { cn } from '@/lib/utils';

export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { playSound } = useAppSound();
  const [expandedIdx, setExpandedIdx] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 65%'],
  });
  const lineScaleY = useSpring(scrollYProgress, { stiffness: 220, damping: 30 });

  return (
    <section
      id="experience"
      aria-label="Work Experience and Education"
      className="relative border-b border-zinc-200/80 py-24 sm:py-28 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-[#3FA98A]" />
            <span>03 / Work Experience</span>
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl dark:text-white">
            Professional career & experience.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
            5+ years of full-time remote, hybrid, and on-site software engineering experience aligned directly with my LinkedIn profile.
          </p>
        </div>

        <div ref={containerRef} className="relative mt-12 pl-6 sm:pl-10">
          {/* Background Spine */}
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-2 top-2 w-[2px] bg-zinc-200 sm:left-3 dark:bg-zinc-800"
          />
          {/* Animated Scroll Progress Spine */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineScaleY }}
            className="absolute bottom-4 left-2 top-2 w-[2px] origin-top bg-gradient-to-b from-[#FF5C1A] via-[#7B6CF6] to-[#3FA98A] sm:left-3"
          />

          <div className="space-y-4">
            {CAREER_TIMELINE.map((item, idx) => {
              const isOpen = expandedIdx === idx;
              return (
                <motion.div
                  key={item.company}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  className="relative"
                >
                  {/* Timeline Node Dot */}
                  <span
                    className="absolute -left-[22px] top-7 h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm sm:-left-[34px] dark:border-zinc-950"
                    style={{ backgroundColor: item.accent }}
                  />

                  <div
                    className={cn(
                      'rounded-3xl border bg-white transition-colors dark:bg-zinc-900/60',
                      isOpen
                        ? 'border-zinc-300 shadow-editorial-light dark:border-zinc-700 dark:shadow-editorial-dark'
                        : 'border-zinc-200/80 hover:border-zinc-300 dark:border-zinc-800/80 dark:hover:border-zinc-700'
                    )}
                  >
                    <button
                      type="button"
                      onPointerDown={() => playSound('tick')}
                      onClick={() => setExpandedIdx(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full flex-col justify-between gap-4 p-6 text-left sm:flex-row sm:items-center sm:p-7"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                            {item.period}
                          </span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {item.location}
                          </span>
                          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                            {item.workMode}
                          </span>
                        </div>

                        <h3 className="mt-2 text-lg font-bold text-zinc-950 sm:text-xl dark:text-white">
                          {item.role}{' '}
                          <span className="font-medium text-zinc-500 dark:text-zinc-400">
                            · {item.company}
                          </span>
                        </h3>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                          {item.headline}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 self-start sm:self-center">
                        <div className="hidden gap-2 md:flex">
                          {item.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="rounded-2xl border border-zinc-200/80 bg-zinc-50 px-3 py-1.5 text-right dark:border-zinc-800 dark:bg-zinc-950"
                            >
                              <div className="text-xs font-bold text-zinc-900 dark:text-white">
                                {m.value}
                              </div>
                              <div className="text-[10px] text-zinc-500">{m.label}</div>
                            </div>
                          ))}
                        </div>
                        <span
                          className={cn(
                            'flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-700 transition-transform dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300',
                            isOpen && 'rotate-180'
                          )}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-zinc-100 px-6 pb-6 pt-5 sm:px-7 sm:pb-7 dark:border-zinc-800/80">
                            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                              {item.description}
                            </p>
                            <ul className="mt-4 space-y-2.5">
                              {item.highlights.map((h) => (
                                <li
                                  key={h}
                                  className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                                >
                                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#3FA98A]" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-5 flex flex-wrap gap-1.5">
                              {item.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col justify-between gap-4 rounded-3xl border border-zinc-200/80 bg-zinc-50/80 p-6 sm:flex-row sm:items-center sm:p-7 dark:border-zinc-800/80 dark:bg-zinc-900/40"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Education
                </div>
                <h3 className="mt-0.5 text-lg font-bold text-zinc-950 sm:text-xl dark:text-white">
                  {PROFILE.education.degree} · {PROFILE.education.university}
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {PROFILE.education.thesis}
                </p>
              </div>
            </div>
            <div className="shrink-0 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-left sm:text-right dark:border-zinc-800 dark:bg-zinc-950">
              <div className="text-lg font-bold text-zinc-950 dark:text-white">
                GPA {PROFILE.education.gpa}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Informatics Engineering
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
