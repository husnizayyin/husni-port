import type { IconType } from 'react-icons';
import {
  SiAndroid,
  SiDart,
  SiDocker,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiGithub,
  SiGooglecloud,
  SiGraphql,
  SiJavascript,
  SiJira,
  SiKotlin,
  SiLaravel,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiShopify,
  SiSwift,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
  SiWix,
} from 'react-icons/si';
import { TbApi, TbDatabase } from 'react-icons/tb';

export type TechCategory = 'all' | 'frontend' | 'mobile' | 'backend' | 'database' | 'platform' | 'tools';

export interface TechItem {
  name: string;
  category: Exclude<TechCategory, 'all'>;
  color: string;
  role: string;
  Icon: IconType;
}

export const TECH_CATEGORIES: { id: TechCategory; label: string }[] = [
  { id: 'all', label: 'All Stack' },
  { id: 'frontend', label: 'Frontend & 3D' },
  { id: 'mobile', label: 'Mobile Core' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'database', label: 'Data & Storage' },
  { id: 'platform', label: 'Commerce & CMS' },
  { id: 'tools', label: 'Cloud & DevOps' },
];

export const TECH_STACK: TechItem[] = [
  { name: 'Next.js', category: 'frontend', color: '#18181B', role: 'App Router & SSR', Icon: SiNextdotjs },
  { name: 'React', category: 'frontend', color: '#0EA5E9', role: 'UI Architecture', Icon: SiReact },
  { name: 'TypeScript', category: 'frontend', color: '#3178C6', role: 'Strict Type Systems', Icon: SiTypescript },
  { name: 'Tailwind CSS', category: 'frontend', color: '#06B6D4', role: 'Design Token Styling', Icon: SiTailwindcss },
  { name: 'Three.js / R3F', category: 'frontend', color: '#FF5C1A', role: 'Interactive WebGL 3D', Icon: SiThreedotjs },
  { name: 'JavaScript (ES6+)', category: 'frontend', color: '#EAB308', role: 'Runtime Core', Icon: SiJavascript },

  { name: 'Flutter', category: 'mobile', color: '#02569B', role: 'BLoC, Riverpod & GetX', Icon: SiFlutter },
  { name: 'Dart', category: 'mobile', color: '#0175C2', role: 'Reactive Mobile Core', Icon: SiDart },
  { name: 'React Native', category: 'mobile', color: '#0EA5E9', role: 'Omnichannel Apps', Icon: SiReact },
  { name: 'Kotlin', category: 'mobile', color: '#7F52FF', role: 'Native Android', Icon: SiKotlin },
  { name: 'Swift / SwiftUI', category: 'mobile', color: '#F05138', role: 'Native iOS', Icon: SiSwift },
  { name: 'Android SDK', category: 'mobile', color: '#16A34A', role: 'Platform Native', Icon: SiAndroid },

  { name: 'Laravel', category: 'backend', color: '#FF2D20', role: 'Enterprise MVC & ERP', Icon: SiLaravel },
  { name: 'Node.js', category: 'backend', color: '#16A34A', role: 'Event-Driven Services', Icon: SiNodedotjs },
  { name: 'PHP 8+', category: 'backend', color: '#777BB4', role: 'High-Throughput Web', Icon: SiPhp },
  { name: 'Python', category: 'backend', color: '#3776AB', role: 'CV Biometrics & NLP', Icon: SiPython },
  { name: 'RESTful APIs', category: 'backend', color: '#EC4899', role: 'Contract Design', Icon: TbApi },
  { name: 'GraphQL', category: 'backend', color: '#E10098', role: 'Typed Data Graphs', Icon: SiGraphql },

  { name: 'PostgreSQL', category: 'database', color: '#4169E1', role: 'Relational & JSONB', Icon: SiPostgresql },
  { name: 'MS SQL Server', category: 'database', color: '#CC292B', role: 'Enterprise Retail DB', Icon: TbDatabase },
  { name: 'MySQL', category: 'database', color: '#4479A1', role: 'Transactional Core', Icon: SiMysql },
  { name: 'Firebase', category: 'database', color: '#F59E0B', role: 'Realtime & Auth', Icon: SiFirebase },
  { name: 'MongoDB', category: 'database', color: '#16A34A', role: 'Document Store', Icon: SiMongodb },

  { name: 'Shopify Liquid', category: 'platform', color: '#65A30D', role: 'Bespoke Storefronts', Icon: SiShopify },
  { name: 'Wix Studio Velo', category: 'platform', color: '#2563EB', role: 'Custom Full-Stack Modules', Icon: SiWix },

  { name: 'Linux Headless CLI', category: 'tools', color: '#D97706', role: 'Kernel & Server Ops', Icon: SiLinux },
  { name: 'Docker', category: 'tools', color: '#2496ED', role: 'Containerized Environments', Icon: SiDocker },
  { name: 'Git & GitHub', category: 'tools', color: '#F05032', role: 'CI/CD & Source Control', Icon: SiGithub },
  { name: 'Vercel', category: 'tools', color: '#18181B', role: 'Edge Network Delivery', Icon: SiVercel },
  { name: 'Google Cloud', category: 'tools', color: '#4285F4', role: 'Cloud Infrastructure', Icon: SiGooglecloud },
  { name: 'Figma', category: 'tools', color: '#F24E1E', role: 'Design Systems', Icon: SiFigma },
  { name: 'Postman & Jira', category: 'tools', color: '#FF6C37', role: 'API Specs & Agile Delivery', Icon: SiPostman },
  { name: 'Agile / Scrum', category: 'tools', color: '#0052CC', role: 'Remote Sprint Execution', Icon: SiJira },
];
