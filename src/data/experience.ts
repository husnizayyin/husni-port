export interface CaseStudy {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  client: string;
  location: string;
  period: string;
  role: string;
  category: 'Web & Mobile Ecosystem' | 'Enterprise Retail ERP' | 'Biometric HRIS & AI' | 'Logistics & Mobility';
  accent: string;
  heroMetric: string;
  heroMetricLabel: string;
  summary: string;
  challenge: string;
  architecture: string[];
  outcomes: { value: string; label: string }[];
  deliverables: { name: string; stack: string; detail: string }[];
  tags: string[];
}

export interface CareerEntry {
  company: string;
  location: string;
  workMode: string;
  role: string;
  period: string;
  accent: string;
  headline: string;
  description: string;
  highlights: string[];
  stack: string[];
  metrics: { value: string; label: string }[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'archangel-global-platforms',
    index: '01',
    title: 'Multi-Client Global Web, Mobile & Commerce Suite',
    subtitle: 'High-traffic Next.js portals, multilingual Flutter apps & custom headless storefronts',
    client: 'Archangel Digital Studios',
    location: 'Singapore (Remote)',
    period: 'Oct 2025 – Present',
    role: 'Software Engineer',
    category: 'Web & Mobile Ecosystem',
    accent: '#FF5C1A',
    heroMetric: '6+',
    heroMetricLabel: 'Global Production Platforms Shipped',
    summary:
      'Engineered a portfolio of six international web, mobile, and bespoke e-commerce platforms for Singaporean media, institutional, F&B, and ed-tech brands with rapid remote sprint velocity.',
    challenge:
      'Diverse international clients needed custom capabilities—from multilingual community portals and mobile event booking to bespoke culinary e-commerce flows—without sacrificing Lighthouse performance or maintainability.',
    architecture: [
      'Architected SSR/ISR Next.js & PostgreSQL portals (Parent Guide, SGAT Temple Portal) for sub-second page loads and structured SEO indexing.',
      'Built the cross-platform SGAT Flutter mobile app using reactive BLoC/GetX state management for multilingual member engagement across iOS & Android.',
      'Extended Shopify Liquid (Tora Tora Tora Resto, Delish) and Wix Studio Velo (Jiang Education) with custom checkout, reservation, and interactive course-booking modules.',
    ],
    outcomes: [
      { value: '6+ Apps', label: 'Deployed across SG & APAC' },
      { value: '98+ SEO', label: 'Core Web Vitals score' },
      { value: 'iOS + Web', label: 'Unified API contracts' },
    ],
    deliverables: [
      { name: 'Parent Guide', stack: 'Next.js · PostgreSQL', detail: 'SEO-first family media & community editorial portal' },
      { name: 'SGAT Portal & App', stack: 'Next.js · Flutter', detail: 'Institutional event engine & multilingual member app' },
      { name: 'Tora Tora Tora & Delish', stack: 'Shopify Liquid', detail: 'Custom F&B storefronts, reservations & high-conversion checkout' },
      { name: 'Jiang Education', stack: 'Wix Velo', detail: 'Interactive curriculum & live course scheduling portal' },
    ],
    tags: ['Next.js', 'React', 'Flutter', 'PostgreSQL', 'Shopify Liquid', 'Wix Velo'],
  },
  {
    id: 'anyar-retail-ecosystem',
    index: '02',
    title: 'Omnichannel Retail ERP, POS & Loyalty Backbone',
    subtitle: 'Unifying 4 high-concurrency mobile & web systems across multi-branch retail stores',
    client: 'PT Anyar Retail Indonesia',
    location: 'Bandung, Indonesia',
    period: 'May 2022 – Aug 2025',
    role: 'Mobile & Full Stack Lead',
    category: 'Enterprise Retail ERP',
    accent: '#3FA98A',
    heroMetric: '4 Apps',
    heroMetricLabel: 'Unified Enterprise Ecosystem',
    summary:
      'Led full-stack and mobile architecture over 3+ years for a major multi-branch retail group, connecting store-floor workforce operations, central POS/ERP, and two customer loyalty platforms.',
    challenge:
      'Store branches operated with fragmented attendance tracking, delayed inventory visibility, and separate brand loyalty programs requiring real-time synchronization across MS SQL Server and MySQL.',
    architecture: [
      'Led engineering of Daily A Team Apps in Flutter for multi-branch shift scheduling, geolocation attendance, and store operations.',
      'Delivered Triwarna Member Apps and RKM Member Apps in React Native—handling digital membership cards, live point ledgers, and promotional catalogs.',
      'Built Daily Enterprise in React JS + Laravel backed by MS SQL Server & MySQL for real-time executive POS reporting and ERP inventory control.',
    ],
    outcomes: [
      { value: '4 Core Apps', label: 'Web & mobile in production' },
      { value: '3+ Years', label: 'Continuous technical leadership' },
      { value: 'Real-Time', label: 'Multi-branch ERP & POS sync' },
    ],
    deliverables: [
      { name: 'Daily A Team Apps', stack: 'Flutter · Dart', detail: 'Workforce operations, shift rosters & attendance mobile suite' },
      { name: 'Triwarna & RKM Member', stack: 'React Native', detail: 'Dual brand loyalty apps with digital cards & reward redemptions' },
      { name: 'Daily Enterprise ERP', stack: 'React · Laravel · MS SQL', detail: 'Centralized retail ERP & live multi-store POS backoffice' },
    ],
    tags: ['Flutter', 'React Native', 'React', 'Laravel', 'MS SQL Server', 'MySQL'],
  },
  {
    id: 'stars-mining-hris',
    index: '03',
    title: 'Biometric Mining HRIS & Automated Payroll Engine',
    subtitle: 'Facial recognition workforce verification paired with multi-tier tax & shift payroll',
    client: 'PT Stars Global Resources',
    location: 'Jakarta, Indonesia',
    period: 'Aug 2025 – Oct 2025',
    role: 'Full Stack Developer',
    category: 'Biometric HRIS & AI',
    accent: '#7B6CF6',
    heroMetric: '+30%',
    heroMetricLabel: 'Operational Efficiency Gain',
    summary:
      'Designed and shipped an automated payroll and biometric attendance platform tailored for complex mining site shift structures, cutting manual reconciliation time by 30%.',
    challenge:
      'Mining operations involve rotational field shifts, overtime differentials, and strict identity verification where manual timesheets caused payroll bottlenecks and reporting delays.',
    architecture: [
      'Integrated real-time facial recognition attendance verification directly into the enterprise HRIS pipeline to eliminate proxy check-ins.',
      'Engineered a deterministic multi-tier payroll calculation engine in Laravel + PostgreSQL handling rotational allowances, overtime, and tax compliance.',
      'Exposed structured RESTful reporting APIs for executive workforce analytics and audit-ready financial exports.',
    ],
    outcomes: [
      { value: '+30%', label: 'Faster payroll cycle execution' },
      { value: 'Biometric', label: 'Zero-spoof facial attendance' },
      { value: '100%', label: 'Automated shift & tax rules' },
    ],
    deliverables: [
      { name: 'Enterprise Mining HRIS', stack: 'Laravel · Biometrics', detail: 'Facial-verified attendance & field workforce management' },
      { name: 'Automated Payroll Core', stack: 'PHP 8+ · PostgreSQL', detail: 'Rule-based shift differential, tax & disbursement engine' },
    ],
    tags: ['Laravel', 'PHP 8+', 'PostgreSQL', 'Biometric AI', 'REST APIs'],
  },
  {
    id: 'logistics-wms-mobility',
    index: '04',
    title: 'Warehouse Parcels WMS & Native Fleet E-Ticketing',
    subtitle: 'High-throughput courier sortation logistics & live Android passenger seat matrices',
    client: 'PT HS Budiman & PT Media Baru Digital',
    location: 'Tasikmalaya & Jakarta',
    period: '2019 – 2020',
    role: 'Full Stack & Kotlin Mobile Engineer',
    category: 'Logistics & Mobility',
    accent: '#F59E0B',
    heroMetric: '2 Systems',
    heroMetricLabel: 'WMS Logistics & Live Transit Apps',
    summary:
      'Built foundational logistics and transit software combining web-based Warehouse Management Systems (WMS) with native Kotlin Android passenger ticketing applications.',
    challenge:
      'Regional transport and courier operators needed synchronized parcel routing logs alongside live mobile seat reservation matrices that prevented double-booking.',
    architecture: [
      'Developed a Laravel + MySQL Warehouse Management & Courier Dispatch platform tracking parcel sortation, manifests, and hub handoffs.',
      'Engineered native Kotlin Android e-ticketing apps (Bosbis & Fleet Ticketing) featuring real-time seat matrix locking and QR boarding passes.',
      'Authored formal Functional Specification Documents (FSD) and operational SOPs for warehouse and fleet dispatch teams.',
    ],
    outcomes: [
      { value: 'Live Sync', label: 'Real-time seat & parcel state' },
      { value: 'Kotlin SDK', label: 'Native Android performance' },
      { value: 'End-to-End', label: 'FSD specs to production' },
    ],
    deliverables: [
      { name: 'Courier WMS Platform', stack: 'Laravel · MySQL', detail: 'Automated parcel sortation, manifest routing & dispatch logs' },
      { name: 'Bosbis & Fleet Ticketing', stack: 'Kotlin · Android SDK', detail: 'Native bus booking, live seat inventory & e-ticket sync' },
    ],
    tags: ['Kotlin', 'Android SDK', 'Laravel', 'MySQL', 'REST APIs'],
  },
];

export const CAREER_TIMELINE: CareerEntry[] = [
  {
    company: 'Archangel Digital Studios',
    location: 'Singapore',
    workMode: 'Remote · Full-Time',
    role: 'Software Engineer',
    period: 'Oct 2025 – Present',
    accent: '#FF5C1A',
    headline: 'Scalable Web Portals, Cross-Platform Mobile & Bespoke Headless Commerce',
    description:
      'Architecting end-to-end applications across Next.js, React, PostgreSQL, and Flutter while extending Shopify (Liquid) and Wix Studio (Velo) for international clients.',
    highlights: [
      'Shipped 6+ global digital products spanning community media, institutional portals, F&B e-commerce, and ed-tech.',
      'Engineered native-fluid Flutter (BLoC & GetX) mobile applications synchronized with Next.js SSR backends.',
      'Tuned Linux headless CLI workflows and edge deployments for rapid multi-client iteration.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Flutter', 'PostgreSQL', 'Shopify Liquid', 'Wix Velo'],
    metrics: [
      { value: '6+ Products', label: 'Worldwide releases' },
      { value: 'SG Remote', label: 'Cross-border velocity' },
    ],
  },
  {
    company: 'PT Stars Global Resources Indonesia',
    location: 'Jakarta, Indonesia',
    workMode: 'Hybrid · Full-Time',
    role: 'Full Stack Developer',
    period: 'Aug 2025 – Oct 2025',
    accent: '#7B6CF6',
    headline: 'Mining Enterprise HRIS, Biometrics & Automated Payroll',
    description:
      'Built automated payroll and facial-recognition attendance infrastructure for mining operations, accelerating HR and finance workflows.',
    highlights: [
      'Boosted workforce and payroll operational efficiency by +30% through automated shift & tax computation.',
      'Integrated biometric facial recognition attendance tracking with real-time RESTful executive reporting APIs.',
    ],
    stack: ['Laravel', 'PHP 8+', 'PostgreSQL', 'Biometric AI', 'REST APIs'],
    metrics: [
      { value: '+30% Gain', label: 'Operational efficiency' },
      { value: 'Biometrics', label: 'Facial attendance' },
    ],
  },
  {
    company: 'PT Anyar Retail Indonesia',
    location: 'Bandung, Indonesia',
    workMode: 'Lead · Full-Time',
    role: 'Mobile & Full Stack Lead',
    period: 'May 2022 – Aug 2025',
    accent: '#3FA98A',
    headline: 'Omnichannel Retail ERP, POS & 4-App Mobile Loyalty Suite',
    description:
      'Spearheaded mobile and web engineering for a multi-branch retail enterprise, unifying internal workforce apps, loyalty platforms, and central ERP.',
    highlights: [
      'Led delivery and maintenance of 4 flagship apps: Daily A Team (Flutter), Triwarna & RKM Member (React Native), and Daily Enterprise (React JS).',
      'Orchestrated high-concurrency API integrations across Laravel, Microsoft SQL Server, and MySQL.',
    ],
    stack: ['Flutter', 'React Native', 'React', 'Laravel', 'MS SQL Server', 'MySQL'],
    metrics: [
      { value: '4 Core Apps', label: 'Web & mobile suite' },
      { value: '3.3 Years', label: 'Lead tenure' },
    ],
  },
  {
    company: 'PT HS Budiman',
    location: 'Tasikmalaya, Indonesia',
    workMode: 'Internship',
    role: 'Full Stack Developer',
    period: 'Jul 2020 – Dec 2020',
    accent: '#F59E0B',
    headline: 'Warehouse Management System (WMS) & Fleet Ticketing APIs',
    description:
      'Engineered parcel sortation WMS workflows and mobile e-ticketing API integrations alongside formal Functional Specification Documents.',
    highlights: [
      'Built end-to-end Warehouse Management & Courier Management systems in Laravel and MySQL.',
      'Integrated live REST APIs for Kotlin mobile fleet passenger e-ticketing.',
    ],
    stack: ['Laravel', 'Kotlin', 'PHP', 'MySQL', 'REST APIs'],
    metrics: [
      { value: 'WMS + API', label: 'Logistics core' },
      { value: 'FSD & SOP', label: 'System specs' },
    ],
  },
  {
    company: 'PT Media Baru Digital',
    location: 'Jakarta, Indonesia',
    workMode: 'Internship',
    role: 'Mobile Developer',
    period: 'Jul 2019 – Dec 2019',
    accent: '#EC4899',
    headline: 'Native Kotlin Android E-Ticketing Platform',
    description:
      'Developed native Android interfaces and live seat-inventory REST integrations for the Bosbis intercity bus ticketing platform.',
    highlights: [
      'Built responsive native Kotlin screens across diverse Android device form factors.',
      'Collaborated with backend & product teams on real-time booking and seat selection flows.',
    ],
    stack: ['Kotlin', 'Android SDK', 'Java', 'REST APIs'],
    metrics: [
      { value: 'Kotlin', label: 'Native Android' },
      { value: 'Bosbis App', label: 'Live bus ticketing' },
    ],
  },
];
