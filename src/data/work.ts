export type ChartKind = 'down' | 'up' | 'compound' | 'spike' | 'retain';

export interface WorkItem {
  name: string;
  color: string;
  /** Pill text colour when white would not have enough contrast on `color`. */
  pillText?: string;
  tag: string;
  title: string;
  stats: [value: string, label: string][];
  chart: ChartKind;
}

/** Professional experience and engineering milestones of Husni Zayyin Ansori. */
export const WORK: WorkItem[] = [
  {
    name: 'Archangel Digital Studios',
    color: '#FF5C1A',
    tag: 'Oct 2025 – Present · Software Engineer',
    title: 'Architecting scalable web ecosystems, high-performance backends, and responsive multi-platform applications.',
    stats: [
      ['99.9%', 'uptime target'],
      ['Next.js / React', 'core web platform'],
      ['Laravel + DB', 'microservices'],
    ],
    chart: 'compound',
  },
  {
    name: 'Stars Global Resources',
    color: '#7B6CF6',
    tag: 'Aug 2025 – Oct 2025 · Software Engineer',
    title: 'Engineered mission-critical enterprise modules and cross-platform mobile solutions with optimized data flows.',
    stats: [
      ['3.2×', 'throughput boost'],
      ['Flutter / RN', 'mobile apps'],
      ['Postgres & Oracle', 'enterprise data'],
    ],
    chart: 'up',
  },
  {
    name: 'PT Anyar Retail Indonesia',
    color: '#3FA98A',
    pillText: '#0E3B2E',
    tag: 'May 2022 – Aug 2025 · Full Stack & Mobile',
    title: 'Led development of omnichannel retail platforms, POS systems, ERP integrations, and mobile solutions over 3+ years.',
    stats: [
      ['3+ yrs', 'core tenure'],
      ['100k+', 'monthly transactions'],
      ['MySQL / SQL Server', 'optimized schemas'],
    ],
    chart: 'retain',
  },
  {
    name: 'PT HS Budiman Tasikmalaya',
    color: '#E8C547',
    pillText: '#0E3B2E',
    tag: '3 Months · Software & Mobile Intern',
    title: 'Built foundational native mobile applications and internal tools using Kotlin, Java, and RESTful APIs.',
    stats: [
      ['3 mos', 'intensive sprint'],
      ['Kotlin & Java', 'Android Mobile Developer'],
      ['REST APIs', 'backend integration'],
    ],
    chart: 'spike',
  },
  {
    name: 'Multi-Database & Cloud Core',
    color: '#FF5C1A',
    tag: 'Specialization · Data & Infrastructure',
    title: 'Deep mastery spanning relational, enterprise, and NoSQL databases: PostgreSQL, MySQL, SQL Server, MongoDB, Oracle.',
    stats: [
      ['5 Engines', 'in production'],
      ['< 15ms', 'p95 query response'],
      ['Zero', 'downtime migrations'],
    ],
    chart: 'compound',
  },
];
