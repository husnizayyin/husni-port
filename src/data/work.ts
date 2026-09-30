import type { IconType } from 'react-icons';
import {
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiShopify,
  SiWix,
  SiPostgresql,
  SiLaravel,
  SiPhp,
  SiMysql,
  SiKotlin,
  SiAndroid,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import { TbDatabase, TbApi, TbScanEye } from 'react-icons/tb';
import type { ChartKind } from '../components/WorkChart';

export interface WorkProduct {
  name: string;
  tech: string;
  desc?: string;
}

export interface WorkTech {
  name: string;
  color: string;
  Icon: IconType;
}

export interface WorkItem {
  name: string;
  location: string;
  color: string;
  /** Pill text colour when white would not have enough contrast on `color`. */
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

/** Professional experience, work locations, key products shipped, tech stack icons, and growth trajectory. */
export const WORK: WorkItem[] = [
  {
    name: 'Archangel Digital Studios',
    location: 'Singapore',
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
      { name: 'Next.js', color: '#000000', Icon: SiNextdotjs },
      { name: 'React', color: '#61DAFB', Icon: SiReact },
      { name: 'Flutter', color: '#02569B', Icon: SiFlutter },
      { name: 'Shopify Liquid', color: '#7AB55C', Icon: SiShopify },
      { name: 'Wix Velo', color: '#0C6EFC', Icon: SiWix },
      { name: 'PostgreSQL', color: '#4169E1', Icon: SiPostgresql },
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
    location: 'Jakarta, Indonesia',
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
      { name: 'Laravel', color: '#FF2D20', Icon: SiLaravel },
      { name: 'PHP 8+', color: '#777BB4', Icon: SiPhp },
      { name: 'Biometrics', color: '#3776AB', Icon: TbScanEye },
      { name: 'PostgreSQL', color: '#4169E1', Icon: SiPostgresql },
      { name: 'REST APIs', color: '#E535AB', Icon: TbApi },
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
    location: 'Bandung, Indonesia',
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
      { name: 'Flutter', color: '#02569B', Icon: SiFlutter },
      { name: 'React Native', color: '#61DAFB', Icon: SiReact },
      { name: 'React JS', color: '#61DAFB', Icon: SiReact },
      { name: 'Laravel', color: '#FF2D20', Icon: SiLaravel },
      { name: 'MS SQL Server', color: '#CC292B', Icon: TbDatabase },
      { name: 'MySQL', color: '#4479A1', Icon: SiMysql },
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
    location: 'Tasikmalaya, Indonesia',
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
      { name: 'Laravel', color: '#FF2D20', Icon: SiLaravel },
      { name: 'Kotlin', color: '#7F52FF', Icon: SiKotlin },
      { name: 'PHP', color: '#777BB4', Icon: SiPhp },
      { name: 'MySQL', color: '#4479A1', Icon: SiMysql },
      { name: 'REST APIs', color: '#E535AB', Icon: TbApi },
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
    location: 'Jakarta, Indonesia',
    color: '#FF5C1A',
    role: 'Mobile Intern',
    period: 'Jul 2019 – Dec 2019',
    title: 'Native Android E-Ticketing Platform',
    desc: 'Developed high-performance native Android application features with responsive user interfaces and real-time REST API integration for online bus ticketing.',
    products: [
      { name: 'Bosbis Ticket Apps', tech: 'Kotlin', desc: 'Bus booking, live seat selection & e-tickets' },
    ],
    techStack: [
      { name: 'Kotlin Native', color: '#7F52FF', Icon: SiKotlin },
      { name: 'Android SDK', color: '#3DDC84', Icon: SiAndroid },
      { name: 'Java', color: '#007396', Icon: FaJava },
      { name: 'REST APIs', color: '#E535AB', Icon: TbApi },
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
