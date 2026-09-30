export type ChartKind = 'down' | 'up' | 'compound' | 'spike' | 'retain';

export interface WorkItem {
  name: string;
  color: string;
  /** Pill text colour when white would not have enough contrast on `color`. */
  pillText?: string;
  role: string;
  period: string;
  title: string;
  desc: string;
  stats: [value: string, label: string][];
  chart: ChartKind;
}

/** Professional experience and engineering milestones of Husni Zayyin Ansori (from official CV). */
export const WORK: WorkItem[] = [
  {
    name: 'Archangel Digital Studios Singapore',
    color: '#FF5C1A',
    role: 'Software Engineer',
    period: 'Oct 2025 – Present',
    title: 'Scalable Full-Stack & Platform Architecture',
    desc: 'Engineering web & mobile applications with Next.js, React, PostgreSQL, and Flutter (BLOC/GetX), plus custom Shopify (Liquid) and Wix Studio (Velo) integrations.',
    stats: [
      ['Next.js / React', 'full-stack core'],
      ['Flutter (BLOC)', 'iOS & Android'],
      ['Shopify / Wix', 'custom Liquid/Velo'],
    ],
    chart: 'compound',
  },
  {
    name: 'PT Stars Global Resources',
    color: '#7B6CF6',
    role: 'Full Stack Developer',
    period: 'Aug 2025 – Oct 2025',
    title: 'Mining Enterprise HRIS & Payroll Management',
    desc: 'Developed an automated HRIS and Payroll Management platform for the mining industry (+30% efficiency), featuring facial recognition biometric tracking and REST APIs.',
    stats: [
      ['HRIS & Payroll', 'mining operations'],
      ['+30%', 'efficiency gain'],
      ['Biometrics AI', 'facial tracking'],
    ],
    chart: 'up',
  },
  {
    name: 'PT Anyar Retail Indonesia',
    color: '#3FA98A',
    pillText: '#0E3B2E',
    role: 'Mobile & Full Stack Lead',
    period: 'May 2022 – Aug 2025',
    title: 'HRIS, Attendance Apps, Custom ERP & POS',
    desc: 'Architected and engineered core enterprise platforms: corporate HRIS, mobile Attendance Apps (Flutter), Custom ERP systems, and Retail POS for multi-branch operations.',
    stats: [
      ['HRIS & Attendance', 'Flutter & Web'],
      ['Custom ERP', 'operations engine'],
      ['Retail POS', 'real-time sync'],
    ],
    chart: 'retain',
  },
  {
    name: 'PT HS Budiman',
    color: '#E8C547',
    pillText: '#0E3B2E',
    role: 'Full Stack Intern',
    period: 'Jul 2020 – Dec 2020',
    title: 'Warehouse & Courier Management Logistics',
    desc: 'Engineered Warehouse Management (WMS) & Courier Systems, integrated E-Ticketing mobile APIs, and created core Functional Specification Documents (FSD).',
    stats: [
      ['WMS & Courier', 'logistics systems'],
      ['E-Ticketing', 'mobile API sync'],
      ['FSD & SOP', 'technical specs'],
    ],
    chart: 'spike',
  },
  {
    name: 'PT Media Baru Digital',
    color: '#FF5C1A',
    role: 'Mobile Intern',
    period: 'Jul 2019 – Dec 2019',
    title: 'Native Android Mobile Applications',
    desc: 'Built native Android mobile applications using Kotlin, crafting fluid responsive interfaces and integrating backend RESTful web services.',
    stats: [
      ['Kotlin Native', 'Android applications'],
      ['REST APIs', 'service integration'],
      ['Responsive UI', 'device optimization'],
    ],
    chart: 'compound',
  },
];
