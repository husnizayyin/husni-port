import type { ChartKind } from '../components/WorkChart';

export interface WorkProduct {
  name: string;
  tech: string;
  desc?: string;
}

export interface WorkTech {
  name: string;
  color: string;
  iconSvg: string;
}

export interface WorkItem {
  name: string;
  color: string;
  pillText?: string;
  role: string;
  period: string;
  title: string;
  desc: string;
  products: WorkProduct[];
  techStack: WorkTech[];
  growthLabel: string;
  chart: ChartKind;
  stats: [value: string, label: string][];
}

/** Professional experience, key products shipped, tech stack icons, and growth trajectory. */
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
    techStack: [
      {
        name: 'Next.js',
        color: '#111111',
        iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.665 21.978l-10.4-13.678h-2.265v13.678h-2V2.022h4.265l10.4 13.722v-13.722h2v19.956z"/></svg>`,
      },
      {
        name: 'React',
        color: '#61DAFB',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" stroke-width="2"><ellipse cx="12" cy="12" rx="10" ry="4.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="2" fill="#61DAFB"/></svg>`,
      },
      {
        name: 'Flutter',
        color: '#02569B',
        iconSvg: `<svg viewBox="0 0 24 24" fill="#02569B"><path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zM6 15.7L2.3 12l6.007-6.007L14.314 12 6 15.7zm8.314 8.3L8.307 18 14.314 12l6.007 6.007-6.007 5.993z"/></svg>`,
      },
      {
        name: 'Shopify Liquid',
        color: '#7AB55C',
        iconSvg: `<svg viewBox="0 0 24 24" fill="#7AB55C"><path d="M19.4 6.7l-2.1-.6c-.2-.1-.5 0-.6.2l-2.8 7.3-2-6.5c-.1-.3-.4-.5-.7-.5h-2c-.3 0-.6.2-.7.5L5.7 18.2c-.1.3 0 .6.3.8l5.2 2.8c.2.1.5.1.7 0l7.8-4.2c.3-.1.4-.4.4-.7l-.7-10.2zm-8 12.3l-3.8-2 1.9-5.9 3.2 6.5-1.3 1.4zm3.9-3.2l-2.1-4.2 1.9-5 1.5 8.7-1.3.5z"/></svg>`,
      },
      {
        name: 'Wix Velo',
        color: '#0C6EFC',
        iconSvg: `<svg viewBox="0 0 24 24" fill="#0C6EFC"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.5 14h-2.1l-1.9-5.2-1.9 5.2H9.5L6.8 8h2.1l1.8 5.4L12.5 8h1.9l1.8 5.4L18 8h2.1l-2.6 8z"/></svg>`,
      },
      {
        name: 'PostgreSQL',
        color: '#4169E1',
        iconSvg: `<svg viewBox="0 0 24 24" fill="#4169E1"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z"/></svg>`,
      },
    ],
    growthLabel: 'Worldwide Multi-Client Velocity',
    chart: 'compound',
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
    desc: 'Architected mission-critical enterprise systems that boosted workforce efficiency by +30%, pairing automated multi-tier payroll engines with facial recognition biometrics.',
    products: [
      { name: 'Enterprise HRIS', tech: 'Laravel', desc: 'Workforce intelligence with facial recognition' },
      { name: 'Payroll Management', tech: 'Laravel', desc: 'Automated tax, shift differential & payroll engine' },
    ],
    techStack: [
      {
        name: 'Laravel',
        color: '#FF2D20',
        iconSvg: `<svg viewBox="0 0 24 24" fill="#FF2D20"><path d="M19.8 6.5l-7.3-4.2a1 1 0 00-1 0L4.2 6.5a1 1 0 00-.5.9v8.2a1 1 0 00.5.9l7.3 4.2a1 1 0 001 0l7.3-4.2a1 1 0 00.5-.9V7.4a1 1 0 00-.5-.9zm-7.8-2.6l5.7 3.3-2.6 1.5-5.7-3.3 2.6-1.5zm-6.3 4.4l5.7 3.3v6.6l-5.7-3.3V8.3zm7.3 9.9v-6.6l5.7-3.3v6.6l-5.7 3.3z"/></svg>`,
      },
      {
        name: 'PHP 8+',
        color: '#777BB4',
        iconSvg: `<svg viewBox="0 0 24 24" fill="#777BB4"><ellipse cx="12" cy="12" rx="11" ry="7"/><path fill="#FFF" d="M6.8 9.5h2.2c1.1 0 1.8.6 1.8 1.6 0 1.2-.8 1.8-2 1.8h-1l-.5 2.1H6l1.3-5.5zm1.5 2.2h.7c.5 0 .8-.2.8-.7 0-.4-.3-.6-.7-.6h-.6l-.2 1.3zm3.7-2.2h1.3l-.5 2.1h1.7l.5-2.1h1.3l-1.3 5.5h-1.3l.5-2.1h-1.7l-.5 2.1H12l1.3-5.5zm4.8 0h2.2c1.1 0 1.8.6 1.8 1.6 0 1.2-.8 1.8-2 1.8h-1l-.5 2.1h-1.3l1.3-5.5zm1.5 2.2h.7c.5 0 .8-.2.8-.7 0-.4-.3-.6-.7-.6h-.6l-.2 1.3z"/></svg>`,
      },
      {
        name: 'Biometrics',
        color: '#3776AB',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#3776AB" stroke-width="2"><circle cx="12" cy="10" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7M2 4h4M2 8h2M20 4h-4M20 8h-2"/></svg>`,
      },
      {
        name: 'PostgreSQL',
        color: '#4169E1',
        iconSvg: `<svg viewBox="0 0 24 24" fill="#4169E1"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z"/></svg>`,
      },
      {
        name: 'REST APIs',
        color: '#E535AB',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#E535AB" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8"/></svg>`,
      },
    ],
    growthLabel: '+30% Operational Efficiency Gain',
    chart: 'up',
    stats: [
      ['+30% Boost', 'operational efficiency'],
      ['HRIS & Payroll', 'mining enterprise'],
      ['Biometrics', 'facial verification'],
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
    techStack: [
      {
        name: 'Flutter',
        color: '#02569B',
        iconSvg: `<svg viewBox="0 0 24 24" fill="#02569B"><path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zM6 15.7L2.3 12l6.007-6.007L14.314 12 6 15.7zm8.314 8.3L8.307 18 14.314 12l6.007 6.007-6.007 5.993z"/></svg>`,
      },
      {
        name: 'React Native',
        color: '#61DAFB',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="3"/><circle cx="12" cy="18" r="1" fill="#61DAFB"/><path d="M9 5h6"/></svg>`,
      },
      {
        name: 'React JS',
        color: '#61DAFB',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" stroke-width="2"><ellipse cx="12" cy="12" rx="10" ry="4.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="2" fill="#61DAFB"/></svg>`,
      },
      {
        name: 'Laravel',
        color: '#FF2D20',
        iconSvg: `<svg viewBox="0 0 24 24" fill="#FF2D20"><path d="M19.8 6.5l-7.3-4.2a1 1 0 00-1 0L4.2 6.5a1 1 0 00-.5.9v8.2a1 1 0 00.5.9l7.3 4.2a1 1 0 001 0l7.3-4.2a1 1 0 00.5-.9V7.4a1 1 0 00-.5-.9zm-7.8-2.6l5.7 3.3-2.6 1.5-5.7-3.3 2.6-1.5zm-6.3 4.4l5.7 3.3v6.6l-5.7-3.3V8.3zm7.3 9.9v-6.6l5.7-3.3v6.6l-5.7 3.3z"/></svg>`,
      },
      {
        name: 'MS SQL Server',
        color: '#CC292B',
        iconSvg: `<svg viewBox="0 0 24 24" fill="#CC292B"><path d="M22 6c0-2.2-4.5-4-10-4S2 3.8 2 6v12c0 2.2 4.5 4 10 4s10-1.8 10-4V6zm-10 2c-4.4 0-8-1.1-8-2.5S7.6 3 12 3s8 1.1 8 2.5S16.4 8 12 8z"/></svg>`,
      },
      {
        name: 'MySQL',
        color: '#4479A1',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#4479A1" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
      },
    ],
    growthLabel: 'Omnichannel 4-App Retail Scale',
    chart: 'retain',
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
    techStack: [
      {
        name: 'Laravel',
        color: '#FF2D20',
        iconSvg: `<svg viewBox="0 0 24 24" fill="#FF2D20"><path d="M19.8 6.5l-7.3-4.2a1 1 0 00-1 0L4.2 6.5a1 1 0 00-.5.9v8.2a1 1 0 00.5.9l7.3 4.2a1 1 0 001 0l7.3-4.2a1 1 0 00.5-.9V7.4a1 1 0 00-.5-.9zm-7.8-2.6l5.7 3.3-2.6 1.5-5.7-3.3 2.6-1.5zm-6.3 4.4l5.7 3.3v6.6l-5.7-3.3V8.3zm7.3 9.9v-6.6l5.7-3.3v6.6l-5.7 3.3z"/></svg>`,
      },
      {
        name: 'Kotlin',
        color: '#7F52FF',
        iconSvg: `<svg viewBox="0 0 24 24" fill="#7F52FF"><path d="M24 24H0V0h24L12 12z"/></svg>`,
      },
      {
        name: 'PHP',
        color: '#777BB4',
        iconSvg: `<svg viewBox="0 0 24 24" fill="#777BB4"><ellipse cx="12" cy="12" rx="11" ry="7"/><path fill="#FFF" d="M6.8 9.5h2.2c1.1 0 1.8.6 1.8 1.6 0 1.2-.8 1.8-2 1.8h-1l-.5 2.1H6l1.3-5.5zm1.5 2.2h.7c.5 0 .8-.2.8-.7 0-.4-.3-.6-.7-.6h-.6l-.2 1.3zm3.7-2.2h1.3l-.5 2.1h1.7l.5-2.1h1.3l-1.3 5.5h-1.3l.5-2.1h-1.7l-.5 2.1H12l1.3-5.5zm4.8 0h2.2c1.1 0 1.8.6 1.8 1.6 0 1.2-.8 1.8-2 1.8h-1l-.5 2.1h-1.3l1.3-5.5zm1.5 2.2h.7c.5 0 .8-.2.8-.7 0-.4-.3-.6-.7-.6h-.6l-.2 1.3z"/></svg>`,
      },
      {
        name: 'MySQL',
        color: '#4479A1',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#4479A1" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
      },
      {
        name: 'REST APIs',
        color: '#E535AB',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#E535AB" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8"/></svg>`,
      },
    ],
    growthLabel: 'Logistics WMS & Live Fleet Transit',
    chart: 'spike',
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
    techStack: [
      {
        name: 'Kotlin Native',
        color: '#7F52FF',
        iconSvg: `<svg viewBox="0 0 24 24" fill="#7F52FF"><path d="M24 24H0V0h24L12 12z"/></svg>`,
      },
      {
        name: 'Android Studio',
        color: '#3DDC84',
        iconSvg: `<svg viewBox="0 0 24 24" fill="#3DDC84"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`,
      },
      {
        name: 'Java',
        color: '#007396',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#007396" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>`,
      },
      {
        name: 'REST APIs',
        color: '#E535AB',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#E535AB" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8"/></svg>`,
      },
    ],
    growthLabel: 'Mobile Conversion & Seat Inventory Sync',
    chart: 'compound',
    stats: [
      ['Kotlin Native', 'Android architecture'],
      ['RESTful APIs', 'live booking sync'],
      ['Seat Matrix', 'real-time inventory'],
    ],
  },
];
