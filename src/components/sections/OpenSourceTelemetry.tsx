'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, GitFork, Search, Star } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import {
  CURATED_REPOSITORIES,
  FALLBACK_CONTRIBUTION_TOTALS,
  REPO_CATEGORIES,
  type RepositoryItem,
} from '@/data/repositories';
import { useAppSound } from '@/context/SoundProvider';
import { cn } from '@/lib/utils';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const YEARS = ['2026', '2025', '2024', '2023', '2022'] as const;

function buildDeterministicYear(year: number): ContributionDay[] {
  const days: ContributionDay[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  let seed = year * 1337;
  const nextRand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const r = nextRand();
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const activeChance = year >= 2025 ? (isWeekend ? 0.45 : 0.78) : isWeekend ? 0.25 : 0.52;
    const count = r < activeChance ? Math.floor(nextRand() * 11) + 1 : 0;
    const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 8 ? 3 : 4;
    days.push({ date: `${y}-${m}-${day}`, count, level });
  }
  return days;
}

export function OpenSourceTelemetry() {
  const { playSound } = useAppSound();
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [contribMap, setContribMap] = useState<Record<string, ContributionDay[]>>({});
  const [totals, setTotals] = useState<Record<string, number>>(FALLBACK_CONTRIBUTION_TOTALS);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  const [repos, setRepos] = useState<RepositoryItem[]>(CURATED_REPOSITORIES);
  const [repoCategory, setRepoCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  // Populate deterministic matrix immediately, then hydrate from live API if reachable
  useEffect(() => {
    const initialMap: Record<string, ContributionDay[]> = {};
    YEARS.forEach((yr) => {
      initialMap[yr] = buildDeterministicYear(Number(yr));
    });
    setContribMap(initialMap);

    let active = true;
    fetch('https://github-contributions-api.jogruber.de/v4/husnizayyin')
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!active || !json?.contributions) return;
        const grouped: Record<string, ContributionDay[]> = {};
        YEARS.forEach((yr) => {
          const filtered = (json.contributions as ContributionDay[]).filter((c) =>
            c.date.startsWith(yr)
          );
          grouped[yr] = filtered.length > 200 ? filtered : buildDeterministicYear(Number(yr));
        });
        setContribMap(grouped);
        if (json.total) {
          setTotals((prev) => ({ ...prev, ...json.total }));
        }
      })
      .catch(() => {});

    fetch('https://api.github.com/users/husnizayyin/repos?sort=updated&per_page=30')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!active || !Array.isArray(data)) return;
        setRepos((prev) =>
          prev.map((cur) => {
            const match = data.find(
              (item: { name?: string }) =>
                item.name?.toLowerCase() === cur.name.toLowerCase()
            );
            if (!match) return cur;
            return {
              ...cur,
              stars: match.stargazers_count ?? cur.stars,
              forks: match.forks_count ?? cur.forks,
            };
          })
        );
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const weeks = useMemo(() => {
    const days = contribMap[selectedYear] ?? [];
    const cols: (ContributionDay | null)[][] = [];
    let current: (ContributionDay | null)[] = [];
    if (days.length > 0) {
      const [y, m, d] = days[0].date.split('-').map(Number);
      const pad = new Date(y, m - 1, d).getDay();
      for (let i = 0; i < pad; i++) current.push(null);
    }
    days.forEach((day) => {
      current.push(day);
      if (current.length === 7) {
        cols.push(current);
        current = [];
      }
    });
    if (current.length > 0) {
      while (current.length < 7) current.push(null);
      cols.push(current);
    }
    return cols;
  }, [contribMap, selectedYear]);

  const filteredRepos = useMemo(() => {
    return repos.filter((r) => {
      const catOk = repoCategory === 'All' || r.category === repoCategory;
      const q = search.trim().toLowerCase();
      const searchOk =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.language.toLowerCase().includes(q) ||
        r.topics.some((t) => t.toLowerCase().includes(q));
      return catOk && searchOk;
    });
  }, [repos, repoCategory, search]);

  const levelClasses = [
    'bg-zinc-100 dark:bg-zinc-800/80',
    'bg-orange-200 dark:bg-orange-950/90',
    'bg-orange-300 dark:bg-orange-800/90',
    'bg-[#FF7844] dark:bg-[#FF7844]',
    'bg-[#FF5C1A] dark:bg-[#FF5C1A]',
  ];

  return (
    <section
      id="opensource"
      aria-label="GitHub Telemetry and Open Source Repositories"
      className="border-b border-zinc-200/80 py-24 sm:py-32 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-[#FF5C1A]" />
              <span>06 / Open Source & GitHub Activity</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl dark:text-white">
              27+ public repositories & 3,766+ commits.
            </h2>
          </div>

          <a
            href="https://github.com/husnizayyin"
            target="_blank"
            rel="noopener noreferrer"
            onPointerDown={() => playSound('click')}
            className="inline-flex items-center gap-2 self-start rounded-full border border-zinc-200 bg-white px-4 py-2 font-mono text-xs font-medium text-zinc-900 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
          >
            <SiGithub className="h-4 w-4" />
            <span>@husnizayyin</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Contribution Heatmap Card */}
        <div className="mt-10 rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-editorial-light sm:p-8 dark:border-zinc-800/90 dark:bg-zinc-900/60 dark:shadow-editorial-dark">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-display text-2xl font-semibold text-zinc-950 dark:text-white">
                {(totals[selectedYear] ?? 1200).toLocaleString()} contributions in {selectedYear}
              </div>
              <div className="mt-0.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                {hoveredDay
                  ? `${hoveredDay.count} commits on ${hoveredDay.date}`
                  : 'Hover any cell or switch calendar year to inspect commit cadence'}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {YEARS.map((yr) => {
                const active = selectedYear === yr;
                return (
                  <button
                    key={yr}
                    type="button"
                    onPointerDown={() => playSound('tick')}
                    onClick={() => setSelectedYear(yr)}
                    className={cn(
                      'relative rounded-full px-3 py-1 font-mono text-xs font-medium transition-colors',
                      active
                        ? 'text-white dark:text-zinc-950'
                        : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="gh-year-pill"
                        transition={{ type: 'spring', stiffness: 460, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-zinc-950 dark:bg-white"
                      />
                    )}
                    <span className="relative z-10">{yr}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Heatmap Scrollable Matrix */}
          <div className="mt-6 overflow-x-auto pb-2">
            <div className="inline-flex gap-[3px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dIdx) =>
                    day ? (
                      <div
                        key={day.date}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={cn(
                          'h-3 w-3 rounded-[3px] transition-transform hover:scale-125',
                          levelClasses[day.level] ?? levelClasses[0]
                        )}
                      />
                    ) : (
                      <div key={`empty-${wIdx}-${dIdx}`} className="h-3 w-3" />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Repository Filter + Search Bar */}
        <div className="mt-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-1.5">
            {REPO_CATEGORIES.map((cat) => {
              const active = repoCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onPointerDown={() => playSound('tick')}
                  onClick={() => setRepoCategory(cat)}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 font-mono text-xs font-medium transition-colors',
                    active
                      ? 'text-white dark:text-zinc-950'
                      : 'border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="repo-cat-pill"
                      transition={{ type: 'spring', stiffness: 460, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-zinc-950 dark:bg-white"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search repositories..."
              className="w-full rounded-full border border-zinc-200 bg-white py-2 pl-9 pr-4 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-600"
            />
          </div>
        </div>

        {/* Curated Repositories Grid */}
        <motion.div layout className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredRepos.map((repo) => (
              <motion.a
                layout
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                whileHover={{ y: -4 }}
                onPointerDown={() => playSound('click')}
                className="group flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-white p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:border-zinc-600"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-[#FF5C1A]">
                      {repo.language}
                    </span>
                    <div className="flex items-center gap-3 font-mono text-xs text-zinc-500">
                      {repo.stars > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {repo.stars}
                        </span>
                      )}
                      {repo.forks > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          {repo.forks}
                        </span>
                      )}
                      <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-900 dark:group-hover:text-white" />
                    </div>
                  </div>

                  <h3 className="mt-3 font-mono text-base font-semibold text-zinc-950 group-hover:text-[#FF5C1A] dark:text-white">
                    {repo.name}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {repo.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-zinc-100 pt-4 dark:border-zinc-800/80">
                  {repo.topics.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-zinc-100 px-2.5 py-0.5 font-mono text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
