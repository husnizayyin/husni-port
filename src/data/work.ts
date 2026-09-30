export interface WorkProduct {
  name: string;
  tech: string;
  desc?: string;
}

export interface WorkPipeline {
  label: string;
  steps: string[];
}

export interface WorkItem {
  name: string;
  color: string;
  /** Pill text colour when white would not have enough contrast on `color`. */
  pillText?: string;
  role: string;
  period: string;
  title: string;
  desc: string;
  products: WorkProduct[];
  pipeline: WorkPipeline;
  stats: [value: string, label: string][];
}

/** Professional experience, key products shipped, and engineering milestones of Husni Zayyin Ansori. */
export const WORK: WorkItem[] = [
  {
    name: 'Archangel Digital Studios Singapore',
    color: '#FF5C1A',
    role: 'Software Engineer',
    period: 'Oct 2025 – Present',
    title: 'Scalable Web, Mobile & Bespoke Platforms',
    desc: 'Architected and delivered high-impact global applications across high-traffic Next.js web portals, Flutter mobile apps, and custom Liquid/Velo headless commerce solutions.',
    products: [
      { name: 'Parent Guide', tech: 'Next.js', desc: 'Family media & SEO-optimized community portal' },
      { name: 'SGAT Temple Portal', tech: 'Next.js', desc: 'Institutional web platform & events engine' },
      { name: 'SGAT Mobile Apps', tech: 'Flutter', desc: 'Multi-lingual community member application' },
      { name: 'Tora Tora Tora Resto', tech: 'Shopify Liquid', desc: 'Custom culinary e-commerce & reservation experience' },
      { name: 'Delish Storefront', tech: 'Shopify Liquid', desc: 'Bespoke high-conversion storefront & checkout flow' },
      { name: 'Jiang Education', tech: 'Wix Velo', desc: 'Interactive course booking & learning portal' },
    ],
    pipeline: {
      label: 'Production Architecture Pipeline',
      steps: ['Next.js SSR', 'Flutter (BLOC)', 'Liquid / Velo', 'Cloud DB'],
    },
    stats: [
      ['6+ Products', 'deployed worldwide'],
      ['Next.js / Flutter', 'cross-platform core'],
      ['Shopify / Wix', 'custom Liquid & Velo'],
    ],
  },
  {
    name: 'PT Stars Global Resources',
    color: '#7B6CF6',
    role: 'Full Stack Developer',
    period: 'Aug 2025 – Oct 2025',
    title: 'Mining Enterprise HRIS & Automated Payroll',
    desc: 'Architected mission-critical enterprise systems that boosted workforce efficiency by +30%, pairing automated multi-tier payroll engines with AI facial recognition biometrics.',
    products: [
      { name: 'Enterprise HRIS', tech: 'Laravel', desc: 'Workforce intelligence with AI facial recognition' },
      { name: 'Payroll Management', tech: 'Laravel', desc: 'Automated tax, shift differential & payroll engine' },
    ],
    pipeline: {
      label: 'Automated Payroll & Biometrics Flow',
      steps: ['Biometrics AI', 'Laravel Core', 'Payroll Engine', 'Audit Logs'],
    },
    stats: [
      ['+30% Boost', 'operational efficiency'],
      ['HRIS & Payroll', 'mining enterprise'],
      ['Biometrics AI', 'facial verification'],
    ],
  },
  {
    name: 'PT Anyar Retail Indonesia',
    color: '#3FA98A',
    pillText: '#0E3B2E',
    role: 'Mobile & Full Stack Lead',
    period: 'May 2022 – Aug 2025',
    title: 'Omnichannel Retail ERP, POS & Mobile Ecosystem',
    desc: 'Led full-stack engineering of the enterprise digital backbone—unifying 4 core web & mobile applications powering daily multi-branch retail operations and customer loyalty.',
    products: [
      { name: 'Daily A Team Apps', tech: 'Flutter', desc: 'Multi-branch workforce operations & attendance' },
      { name: 'Triwarna Member Apps', tech: 'React Native', desc: 'Customer loyalty, digital cards & rewards' },
      { name: 'RKM Member Apps', tech: 'React Native', desc: 'High-traffic retail rewards & promo catalog' },
      { name: 'Daily Enterprise', tech: 'React JS', desc: 'Central retail ERP & real-time POS backoffice' },
    ],
    pipeline: {
      label: 'Omnichannel Enterprise Sync',
      steps: ['Store POS', 'React ERP', 'Flutter Ops', 'SQL Cluster'],
    },
    stats: [
      ['4 Core Apps', 'web & mobile ecosystem'],
      ['Multi-Branch', 'retail & ERP sync'],
      ['Flutter & React', 'high-concurrency apps'],
    ],
  },
  {
    name: 'PT HS Budiman',
    color: '#E8C547',
    pillText: '#0E3B2E',
    role: 'Full Stack Intern',
    period: 'Jul 2020 – Dec 2020',
    title: 'Logistics WMS & Fleet Ticketing Systems',
    desc: 'Engineered core logistics and transit infrastructure, delivering automated package sortation workflows and synchronized mobile ticketing APIs for regional fleet transport.',
    products: [
      { name: 'Warehouse Management (WMS)', tech: 'Laravel', desc: 'High-throughput courier parcel sortation & logs' },
      { name: 'Fleet Ticketing Apps', tech: 'Kotlin', desc: 'Live mobile passenger booking & dispatch sync' },
    ],
    pipeline: {
      label: 'Logistics & Transit Architecture',
      steps: ['Courier Hub', 'WMS Engine', 'Ticket API', 'Fleet Sync'],
    },
    stats: [
      ['WMS & Courier', 'logistics routing'],
      ['Live Ticketing', 'mobile API sync'],
      ['FSD & SOP', 'technical specs'],
    ],
  },
  {
    name: 'PT Media Baru Digital',
    color: '#FF5C1A',
    role: 'Mobile Intern',
    period: 'Jul 2019 – Dec 2019',
    title: 'Native Android E-Ticketing Platform',
    desc: 'Developed high-performance native Android application features with responsive user interfaces and real-time REST API integration for online bus ticketing.',
    products: [
      { name: 'Bosbis Ticket Apps', tech: 'Kotlin', desc: 'Bus booking, live seat selection & e-tickets' },
    ],
    pipeline: {
      label: 'Mobile Engine Architecture',
      steps: ['Kotlin UI', 'REST Gateways', 'Seat Inventory', 'Android SDK'],
    },
    stats: [
      ['Kotlin Native', 'Android architecture'],
      ['RESTful APIs', 'live booking sync'],
      ['Seat Matrix', 'real-time inventory'],
    ],
  },
];
