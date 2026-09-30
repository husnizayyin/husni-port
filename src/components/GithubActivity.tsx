import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { SiGithub } from 'react-icons/si';
import { TbFlame, TbGitCommit, TbGitPullRequest } from 'react-icons/tb';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { scrollToY } from '../lib/scroll';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionsApiResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

const FALLBACK_TOTALS: Record<string, number> = {
  'last-year': 1910,
  '2026': 1677,
  '2025': 1257,
  '2024': 410,
  '2023': 140,
  '2022': 198,
};

const AVAILABLE_TABS = [
  { key: '2026', label: '2026' },
  { key: '2025', label: '2025' },
  { key: '2024', label: '2024' },
  { key: '2023', label: '2023' },
  { key: '2022', label: '2022' },
] as const;

export function GithubActivity() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('2026');
  const [data, setData] = useState<ContributionsApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Fetch real-time contribution data from GitHub API
  useEffect(() => {
    let isMounted = true;
    async function fetchGitHubContributions() {
      try {
        setLoading(true);
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/husnizayyin');
        if (!res.ok) throw new Error('Failed to fetch contributions');
        const json: ContributionsApiResponse = await res.json();
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setData({
            total: FALLBACK_TOTALS,
            contributions: generateFallbackContributions(),
          });
          setLoading(false);
        }
      }
    }

    fetchGitHubContributions();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute dataset and weeks based on selected tab
  const { weeks, monthLabels, totalForTab, tabDescription } = useMemo(() => {
    if (!data || !data.contributions || data.contributions.length === 0) {
      return { weeks: [], monthLabels: [], totalForTab: 0, tabDescription: '' };
    }

    const sortedAll = [...data.contributions].sort((a, b) => a.date.localeCompare(b.date));

    // Full calendar year (Jan 1 to Dec 31) for selected year
    const yearDays = sortedAll.filter((c) => c.date.startsWith(selectedTab));
    
    // Ensure all 365/366 days are present from Jan 1 to Dec 31
    const fullYearDays = fillFullCalendarYear(yearDays, parseInt(selectedTab, 10));
    const yearTotal = data.total[selectedTab] ?? yearDays.reduce((acc, curr) => acc + curr.count, 0);
    const { weeks: w, monthLabels: ml } = buildWeeklyMatrix(fullYearDays);

    return {
      weeks: w,
      monthLabels: ml,
      totalForTab: yearTotal,
      tabDescription: `${yearTotal.toLocaleString()} contributions in ${selectedTab}`,
    };
  }, [data, selectedTab]);

  const allTimeTotal = useMemo(() => {
    if (!data?.total) return 3766;
    return Object.values(data.total).reduce((acc, curr) => acc + curr, 0);
  }, [data]);

  // Pinned ScrollTrigger for scrubbing years
  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: '+=200%',
        pin: true,
        anticipatePin: 1,
        scrub: 0.3,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          const numYears = AVAILABLE_TABS.length;
          const index = Math.min(numYears - 1, Math.floor(self.progress * numYears));
          const targetYear = AVAILABLE_TABS[index].key;
          setSelectedTab((prev) => (prev !== targetYear ? targetYear : prev));
        },
      });

      triggerRef.current = st;
    }, root);

    return () => ctx.revert();
  }, []);

  // Grid update micro-animation on tab switch
  useEffect(() => {
    if (!gridContainerRef.current) return;
    const cells = gridContainerRef.current.querySelectorAll('.gh-cell:not(.gh-cell-empty)');
    gsap.fromTo(
      cells,
      { opacity: 0.15, scale: 0.7 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        stagger: {
          amount: 0.15,
          from: 'random',
        },
      }
    );
  }, [selectedTab]);

  const handleYearClick = (key: string) => {
    setSelectedTab(key);
    const idx = AVAILABLE_TABS.findIndex((t) => t.key === key);
    if (idx !== -1 && triggerRef.current) {
      const st = triggerRef.current;
      const scrollDist = st.end - st.start;
      const targetY = st.start + (idx / (AVAILABLE_TABS.length - 1)) * scrollDist + 10;
      scrollToY(targetY, 400);
    }
  };

  return (
    <section id="activity" ref={sectionRef} className="pad gh-section" aria-label="Live GitHub Activity">
      <div className="gh-pin-content">
        <div className="gh-head">
          <div className="gh-live-status">
            <span className="live-dot" />
            <span>LIVE GITHUB TELEMETRY</span>
          </div>
          <h2 className="fr gh-title">Continuous shipping &<br />production commits.</h2>
          <p className="gh-subtitle">
            Real-time telemetry tracked across 25+ public and enterprise repositories, logging 3,766+ lifetime contributions. Scroll to journey through the years.
          </p>
        </div>

        <div className="gh-metrics-row">
          <div className="gh-metric-card">
            <div className="gh-metric-icon" style={{ color: '#39D353' }}>
              <TbGitCommit size={22} />
            </div>
            <div className="gh-metric-info">
              <b className="fr num">{totalForTab.toLocaleString()}</b>
              <span>Contributions in {selectedTab}</span>
            </div>
          </div>

          <div className="gh-metric-card">
            <div className="gh-metric-icon" style={{ color: '#FF5C1A' }}>
              <TbFlame size={22} />
            </div>
            <div className="gh-metric-info">
              <b className="fr num">{allTimeTotal.toLocaleString()}</b>
              <span>All-Time Lifetime Commits</span>
            </div>
          </div>

          <div className="gh-metric-card">
            <div className="gh-metric-icon" style={{ color: '#61DAFB' }}>
              <TbGitPullRequest size={22} />
            </div>
            <div className="gh-metric-info">
              <b className="fr num">25+</b>
              <span>Repositories Maintained</span>
            </div>
          </div>
        </div>

        {/* GitHub Container with Heatmap + Vertical Year Selector */}
        <div className="gh-panel-container">
          <div className="gh-panel">
            <div className="gh-panel-top">
              <div className="gh-panel-title">
                <SiGithub size={20} />
                <a
                  href="https://github.com/husnizayyin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gh-username"
                >
                  @husnizayyin
                </a>
                <span className="gh-year-count">— {tabDescription}</span>
              </div>

              {/* Scroll progress scrub meter */}
              <div className="gh-scroll-meter" title="Scroll through contribution history">
                <div
                  className="gh-scroll-meter-fill"
                  style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
                />
              </div>
            </div>

            {/* Heatmap Matrix */}
            <div className="gh-heatmap-wrap" ref={gridContainerRef}>
              {loading ? (
                <div className="gh-loading">
                  <span className="gh-spinner" />
                  <span>Fetching live GitHub activity...</span>
                </div>
              ) : (
                <div className="gh-calendar-body">
                  {/* Month labels positioned precisely above their start week */}
                  <div className="gh-months-bar">
                    {monthLabels.map((m, idx) => (
                      <span
                        key={`${m.month}-${idx}`}
                        className="gh-month-label"
                        style={{ left: `${(m.colIdx / Math.max(weeks.length, 53)) * 100}%` }}
                      >
                        {m.month}
                      </span>
                    ))}
                  </div>

                  <div className="gh-grid-row">
                    <div className="gh-days-col">
                      <span className="gh-day-label">Sun</span>
                      <span className="gh-day-label">Mon</span>
                      <span className="gh-day-label">Tue</span>
                      <span className="gh-day-label">Wed</span>
                      <span className="gh-day-label">Thu</span>
                      <span className="gh-day-label">Fri</span>
                      <span className="gh-day-label">Sat</span>
                    </div>

                    <div className="gh-heatmap-matrix">
                      {weeks.map((week, wIdx) => (
                        <div className="gh-week-col" key={wIdx}>
                          {week.map((day, dIdx) =>
                            day ? (
                              <div
                                key={day.date}
                                className={`gh-cell level-${day.level}`}
                                data-level={day.level}
                                onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                                onMouseLeave={() => setHoveredDay(null)}
                              />
                            ) : (
                              <div key={`empty-${wIdx}-${dIdx}`} className="gh-cell gh-cell-empty" />
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="gh-panel-foot">
              <div className="gh-tooltip-view">
                {hoveredDay ? (
                  <span>
                    <b>{hoveredDay.count} contribution{hoveredDay.count !== 1 ? 's' : ''}</b> on {formatDisplayDate(hoveredDay.date)}
                  </span>
                ) : (
                  <span>Scroll or hover squares to inspect velocity</span>
                )}
              </div>

              <div className="gh-legend">
                <span>Less</span>
                <span className="gh-cell level-0" />
                <span className="gh-cell level-1" />
                <span className="gh-cell level-2" />
                <span className="gh-cell level-3" />
                <span className="gh-cell level-4" />
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Vertical Year Selector (Clickable & Scroll-Driven) */}
          <aside className="gh-years-sidebar" role="tablist" aria-label="Contribution Years">
            {AVAILABLE_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={selectedTab === tab.key}
                className="gh-year-sidebar-btn"
                onClick={() => handleYearClick(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}

function formatIsoLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function fillFullCalendarYear(existingDays: ContributionDay[], year: number): ContributionDay[] {
  const map = new Map<string, ContributionDay>();
  existingDays.forEach((d) => map.set(d.date, d));

  const result: ContributionDay[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const iso = formatIsoLocal(d);
    const existing = map.get(iso);
    if (existing) {
      result.push(existing);
    } else {
      result.push({ date: iso, count: 0, level: 0 });
    }
  }

  return result;
}

interface WeeklyMatrixResult {
  weeks: (ContributionDay | null)[][];
  monthLabels: { month: string; colIdx: number }[];
}

function buildWeeklyMatrix(days: ContributionDay[]): WeeklyMatrixResult {
  if (!days || days.length === 0) {
    return { weeks: [], monthLabels: [] };
  }

  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const weeks: (ContributionDay | null)[][] = [];
  let currentWeek: (ContributionDay | null)[] = [];

  const [y0, m0, d0] = sorted[0].date.split('-').map(Number);
  const firstDate = new Date(y0, m0 - 1, d0);
  const firstDow = firstDate.getDay(); // 0 = Sunday, 1 = Monday ... 6 = Saturday

  // Pad the first week before the starting day of week
  for (let i = 0; i < firstDow; i++) {
    currentWeek.push(null);
  }

  sorted.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  // Calculate month labels directly above the week column where the month begins
  const monthLabels: { month: string; colIdx: number }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, colIdx) => {
    for (const d of week) {
      if (d && d.date) {
        const [y, m, dayNum] = d.date.split('-').map(Number);
        const dt = new Date(y, m - 1, dayNum);
        const mon = dt.getMonth();
        if (mon !== lastMonth) {
          lastMonth = mon;
          const name = dt.toLocaleDateString('en-US', { month: 'short' });
          monthLabels.push({ month: name, colIdx });
          break;
        }
      }
    }
  });

  return { weeks, monthLabels };
}

function generateYearDates(year: number): ContributionDay[] {
  const result: ContributionDay[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const iso = formatIsoLocal(d);
    result.push({ date: iso, count: 0, level: 0 });
  }
  return result;
}

function generateFallbackContributions(): ContributionDay[] {
  const years = [2026, 2025, 2024, 2023, 2022];
  const list: ContributionDay[] = [];
  years.forEach((y) => {
    const days = generateYearDates(y);
    days.forEach((d) => {
      const [yNum, mNum, dayNum] = d.date.split('-').map(Number);
      const isWeekend = new Date(yNum, mNum - 1, dayNum).getDay() % 6 === 0;
      const count = isWeekend
        ? (Math.random() > 0.65 ? Math.floor(Math.random() * 5) : 0)
        : (Math.random() > 0.3 ? Math.floor(Math.random() * 12) + 1 : 0);
      const level = count === 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 10 ? 3 : 4;
      list.push({ date: d.date, count, level });
    });
  });
  return list;
}

function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  const date = new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}


