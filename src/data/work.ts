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

/** Professional experience and engineering milestones of Husni Zayyin Ansori (from official CV). */
export const WORK: WorkItem[] = [
  {
    name: 'Archangel Digital Studios Singapore',
    color: '#FF5C1A',
    tag: 'Oct 2025 – Present · Software Engineer',
    title: 'Architecting end-to-end applications with Next.js, React, PostgreSQL, and Flutter (BLOC/GetX), plus custom Shopify (Liquid) and Wix Studio (Velo) integrations.',
    stats: [
      ['Next.js & React', 'full-stack core'],
      ['Flutter iOS/Android', 'BLOC & GetX'],
      ['Shopify & Wix', 'custom Liquid/Velo'],
    ],
    chart: 'compound',
  },
  {
    name: 'PT Stars Global Resources',
    color: '#7B6CF6',
    tag: 'Aug 2025 – Oct 2025 · Full Stack Developer',
    title: 'Developed automated mining payroll systems boosting efficiency by +30%, integrated facial recognition attendance, and built high-performance REST APIs.',
    stats: [
      ['+30%', 'operational efficiency'],
      ['Facial Recognition', 'biometric tracking'],
      ['RESTful APIs', 'mining reporting core'],
    ],
    chart: 'up',
  },
  {
    name: 'PT Anyar Retail Indonesia',
    color: '#3FA98A',
    pillText: '#0E3B2E',
    tag: 'May 2022 – Aug 2025 · Mobile Developer (Lead)',
    title: 'Led mobile application development using Flutter, delivering high-performance cross-platform apps and seamless API integrations across 3+ years.',
    stats: [
      ['3+ yrs', 'mobile development lead'],
      ['Flutter & Dart', 'cross-platform core'],
      ['REST & POS', 'retail backend sync'],
    ],
    chart: 'retain',
  },
  {
    name: 'PT HS Budiman',
    color: '#E8C547',
    pillText: '#0E3B2E',
    tag: 'Jul 2020 – Dec 2020 · Full Stack Developer Intern',
    title: 'Engineered Warehouse Management System (WMS) & Courier Management System, integrated E-Ticketing mobile APIs, and authored Functional Spec Documents.',
    stats: [
      ['WMS & Courier', 'logistics systems'],
      ['E-Ticketing', 'mobile API integration'],
      ['FSD & SOP', 'technical documentation'],
    ],
    chart: 'spike',
  },
  {
    name: 'PT Media Baru Digital',
    color: '#FF5C1A',
    tag: 'Jul 2019 – Dec 2019 · Mobile Developer Intern',
    title: 'Developed native Android mobile applications with Kotlin, crafting responsive UI and integrating RESTful backend services.',
    stats: [
      ['Kotlin Native', 'Android applications'],
      ['API Integration', 'backend services'],
      ['Responsive UX', 'multi-device optimization'],
    ],
    chart: 'compound',
  },
];
