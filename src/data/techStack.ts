import type { IconType } from 'react-icons';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiGreensock,
  SiFlutter,
  SiDart,
  SiKotlin,
  SiSwift,
  SiLaravel,
  SiPhp,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiShopify,
  SiWix,
  SiWordpress,
  SiLinux,
  SiGithub,
  SiVercel,
  SiGooglecloud,
  SiFigma,
  SiJira,
  SiPostman,
  SiDocker,
  SiAndroid,
  SiGraphql,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import { GrOracle } from 'react-icons/gr';
import { TbDatabase, TbApi } from 'react-icons/tb';

export interface TechItem {
  name: string;
  category: 'frontend' | 'mobile' | 'backend' | 'database' | 'platform' | 'tools';
  color: string;
  level: string;
  Icon: IconType;
}

export const TECH_CATEGORIES = [
  { id: 'all', label: 'All Technologies' },
  { id: 'frontend', label: 'Frontend & Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'database', label: 'Databases' },
  { id: 'platform', label: 'Platforms & CMS' },
  { id: 'tools', label: 'Cloud & Tools' },
] as const;

export const TECH_STACK: TechItem[] = [
  // Frontend & Web
  {
    name: 'React',
    category: 'frontend',
    color: '#61DAFB',
    level: 'Core UI Framework',
    Icon: SiReact,
  },
  {
    name: 'Next.js',
    category: 'frontend',
    color: '#000000',
    level: 'SSR & Full Stack',
    Icon: SiNextdotjs,
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    color: '#3178C6',
    level: 'Type Safety',
    Icon: SiTypescript,
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    color: '#F7DF1E',
    level: 'Core Language',
    Icon: SiJavascript,
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    color: '#06B6D4',
    level: 'Modern Styling',
    Icon: SiTailwindcss,
  },
  {
    name: 'GSAP Animations',
    category: 'frontend',
    color: '#88CE02',
    level: 'Interactive Motion',
    Icon: SiGreensock,
  },

  // Mobile
  {
    name: 'Flutter',
    category: 'mobile',
    color: '#02569B',
    level: 'BLOC & GetX Lead',
    Icon: SiFlutter,
  },
  {
    name: 'Dart',
    category: 'mobile',
    color: '#0175C2',
    level: 'Object-Oriented',
    Icon: SiDart,
  },
  {
    name: 'React Native',
    category: 'mobile',
    color: '#61DAFB',
    level: 'Cross-Platform',
    Icon: SiReact,
  },
  {
    name: 'Kotlin',
    category: 'mobile',
    color: '#7F52FF',
    level: 'Android Native',
    Icon: SiKotlin,
  },
  {
    name: 'Android Studio / SDK',
    category: 'mobile',
    color: '#3DDC84',
    level: 'Native Android',
    Icon: SiAndroid,
  },
  {
    name: 'Swift',
    category: 'mobile',
    color: '#FA7343',
    level: 'iOS Native',
    Icon: SiSwift,
  },
  {
    name: 'Java',
    category: 'mobile',
    color: '#007396',
    level: 'Enterprise Core',
    Icon: FaJava,
  },

  // Backend & APIs
  {
    name: 'Laravel',
    category: 'backend',
    color: '#FF2D20',
    level: 'Full-Stack MVC',
    Icon: SiLaravel,
  },
  {
    name: 'PHP',
    category: 'backend',
    color: '#777BB4',
    level: 'Server-Side Core',
    Icon: SiPhp,
  },
  {
    name: 'Node.js',
    category: 'backend',
    color: '#5FA04E',
    level: 'Runtime & APIs',
    Icon: SiNodedotjs,
  },
  {
    name: 'Python',
    category: 'backend',
    color: '#3776AB',
    level: 'Scripting & Automation',
    Icon: SiPython,
  },
  {
    name: 'RESTful APIs',
    category: 'backend',
    color: '#E535AB',
    level: 'API Architecture',
    Icon: TbApi,
  },
  {
    name: 'GraphQL',
    category: 'backend',
    color: '#E10098',
    level: 'Query Language',
    Icon: SiGraphql,
  },

  // Databases
  {
    name: 'PostgreSQL',
    category: 'database',
    color: '#4169E1',
    level: 'Relational & JSON',
    Icon: SiPostgresql,
  },
  {
    name: 'MySQL',
    category: 'database',
    color: '#4479A1',
    level: 'Relational DB',
    Icon: SiMysql,
  },
  {
    name: 'Microsoft SQL Server',
    category: 'database',
    color: '#CC292B',
    level: 'Enterprise Data',
    Icon: TbDatabase,
  },
  {
    name: 'MongoDB',
    category: 'database',
    color: '#47A248',
    level: 'NoSQL Document',
    Icon: SiMongodb,
  },
  {
    name: 'Oracle Database',
    category: 'database',
    color: '#F80000',
    level: 'Mission Critical',
    Icon: GrOracle,
  },
  {
    name: 'Firebase',
    category: 'database',
    color: '#FFCA28',
    level: 'Auth & Firestore',
    Icon: SiFirebase,
  },

  // Platforms & CMS
  {
    name: 'Shopify CLI & Liquid',
    category: 'platform',
    color: '#7AB55C',
    level: 'eCommerce Extensions',
    Icon: SiShopify,
  },
  {
    name: 'Wix Studio & Velo',
    category: 'platform',
    color: '#0C6EFC',
    level: 'Custom Web Modules',
    Icon: SiWix,
  },
  {
    name: 'WordPress',
    category: 'platform',
    color: '#21759B',
    level: 'Custom Themes & Plugins',
    Icon: SiWordpress,
  },

  // Cloud & Tools
  {
    name: 'Git & GitHub',
    category: 'tools',
    color: '#F05032',
    level: 'Version Control',
    Icon: SiGithub,
  },
  {
    name: 'Docker',
    category: 'tools',
    color: '#2496ED',
    level: 'Containerization',
    Icon: SiDocker,
  },
  {
    name: 'Linux / Bash CLI',
    category: 'tools',
    color: '#FCC624',
    level: 'Kernel & Server CLI',
    Icon: SiLinux,
  },
  {
    name: 'Vercel',
    category: 'tools',
    color: '#000000',
    level: 'Edge & Cloud Deployment',
    Icon: SiVercel,
  },
  {
    name: 'Google Cloud (GCP)',
    category: 'tools',
    color: '#4285F4',
    level: 'Cloud Infrastructure',
    Icon: SiGooglecloud,
  },
  {
    name: 'Postman',
    category: 'tools',
    color: '#FF6C37',
    level: 'API Testing & Specs',
    Icon: SiPostman,
  },
  {
    name: 'Figma',
    category: 'tools',
    color: '#F24E1E',
    level: 'UI/UX & Prototyping',
    Icon: SiFigma,
  },
  {
    name: 'Jira / Agile Delivery',
    category: 'tools',
    color: '#0052CC',
    level: 'Sprint Planning',
    Icon: SiJira,
  },
];
