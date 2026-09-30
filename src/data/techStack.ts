export interface TechItem {
  name: string;
  category: 'frontend' | 'mobile' | 'backend' | 'database' | 'platform' | 'tools';
  color: string;
  level: string;
  iconSvg: string;
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
  // Frontend
  {
    name: 'React',
    category: 'frontend',
    color: '#61DAFB',
    level: 'Core UI Framework',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" stroke-width="1.8"><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="2" fill="#61DAFB"/></svg>`,
  },
  {
    name: 'Next.js',
    category: 'frontend',
    color: '#111111',
    level: 'SSR & Full Stack',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.665 21.978l-10.4-13.678h-2.265v13.678h-2V2.022h4.265l10.4 13.722v-13.722h2v19.956z"/></svg>`,
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    color: '#3178C6',
    level: 'Type Safety',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><rect width="24" height="24" rx="4" fill="#3178C6"/><path fill="#FFF" d="M12.5 17.5v-1.7c.6.2 1.3.3 2 .3 1.1 0 1.7-.4 1.7-1 0-1.4-3.7-.8-3.7-3.4 0-1.4 1.1-2.4 3-2.4.7 0 1.4.1 2 .3v1.6c-.6-.2-1.2-.3-1.8-.3-.9 0-1.4.4-1.4.9 0 1.3 3.7.8 3.7 3.3 0 1.5-1.1 2.5-3.3 2.5-.8 0-1.6-.1-2.2-.4zm-8-7.5h6.6v1.6h-2.4v5.8h-1.9v-5.8h-2.3v-1.6z"/></svg>`,
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    color: '#F7DF1E',
    level: 'Core Language',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path fill="#000" d="M7.5 17.5c.6.4 1.4.6 2.3.6 2.2 0 3.7-1.3 3.7-3.7v-5.1h-2v5.1c0 1.2-.6 1.9-1.7 1.9-.5 0-1.1-.1-1.5-.4v1.6zm6.8 0c.8.4 1.8.6 2.8.6 2.5 0 4.1-1.3 4.1-3.6 0-2.1-1.3-3-2.9-3.7l-.6-.3c-.8-.3-1.2-.7-1.2-1.3 0-.7.6-1.2 1.6-1.2.7 0 1.4.2 1.9.5v-1.7c-.6-.3-1.3-.4-2-.4-2.3 0-3.8 1.3-3.8 3.4 0 1.9 1.2 2.8 2.8 3.5l.6.3c.9.4 1.4.8 1.4 1.5 0 .8-.7 1.4-1.8 1.4-.9 0-1.8-.3-2.5-.7v1.8z"/></svg>`,
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    color: '#06B6D4',
    level: 'Modern Styling',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#06B6D4" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"/></svg>`,
  },
  {
    name: 'GSAP Animations',
    category: 'frontend',
    color: '#88CE02',
    level: 'Interactive Motion',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#88CE02" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  },

  // Mobile
  {
    name: 'Flutter',
    category: 'mobile',
    color: '#02569B',
    level: 'BLOC & GetX Lead',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#02569B" d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zM6 15.7L2.3 12l6.007-6.007L14.314 12 6 15.7zm8.314 8.3L8.307 18 14.314 12l6.007 6.007-6.007 5.993z"/></svg>`,
  },
  {
    name: 'Dart',
    category: 'mobile',
    color: '#0175C2',
    level: 'Object-Oriented',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#0175C2" d="M4.108 0L0 4.108l14.108 14.108L24 14.108 4.108 0zm5.784 5.784L0 15.676l4.108 4.108L14 9.892 9.892 5.784zm4.216 4.216L4.216 19.892 8.324 24 24 8.324l-9.892 1.676z"/></svg>`,
  },
  {
    name: 'React Native',
    category: 'mobile',
    color: '#61DAFB',
    level: 'Cross-Platform',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="3"/><circle cx="12" cy="18" r="1" fill="#61DAFB"/><path d="M9 5h6"/></svg>`,
  },
  {
    name: 'Kotlin',
    category: 'mobile',
    color: '#7F52FF',
    level: 'Android Native',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#7F52FF" d="M24 24H0V0h24L12 12z"/></svg>`,
  },
  {
    name: 'Swift',
    category: 'mobile',
    color: '#FA7343',
    level: 'iOS Native',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#FA7343" d="M20.9 14.8c-.1-.2-.2-.3-.3-.4-1.2-1.9-2.9-3.4-4.8-4.5 1.5 1.8 2.2 4.1 1.7 6.4-.1.3-.2.7-.4 1-.3.5-.7 1-1.1 1.4 3-1 4.5-2.6 4.9-3.9zM12 2C6.5 2 2 6.5 2 12c0 3.7 2 7 5.1 8.7 0-.5.1-1 .2-1.5.5-2.2 1.8-4.1 3.5-5.5-1.1 1.6-1.5 3.6-1 5.5.3 1.1.9 2.1 1.7 2.8 1.7.6 3.5.7 5.3.3.6-.1 1.2-.4 1.7-.7-1.4-.7-2.6-1.8-3.4-3.1-1-1.6-1.2-3.6-.6-5.4.1-.3.2-.6.4-.9 1.1-2 2.9-3.5 5-4.3C18.2 4.4 15.3 2 12 2z"/></svg>`,
  },
  {
    name: 'Java',
    category: 'mobile',
    color: '#007396',
    level: 'Enterprise Core',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#007396" stroke-width="1.8"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>`,
  },

  // Backend
  {
    name: 'Laravel',
    category: 'backend',
    color: '#FF2D20',
    level: 'Full-Stack MVC',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#FF2D20" d="M19.8 6.5l-7.3-4.2a1 1 0 00-1 0L4.2 6.5a1 1 0 00-.5.9v8.2a1 1 0 00.5.9l7.3 4.2a1 1 0 001 0l7.3-4.2a1 1 0 00.5-.9V7.4a1 1 0 00-.5-.9zm-7.8-2.6l5.7 3.3-2.6 1.5-5.7-3.3 2.6-1.5zm-6.3 4.4l5.7 3.3v6.6l-5.7-3.3V8.3zm7.3 9.9v-6.6l5.7-3.3v6.6l-5.7 3.3z"/></svg>`,
  },
  {
    name: 'PHP',
    category: 'backend',
    color: '#777BB4',
    level: 'Server-Side Core',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="12" rx="11" ry="7" fill="#777BB4"/><path fill="#FFF" d="M6.8 9.5h2.2c1.1 0 1.8.6 1.8 1.6 0 1.2-.8 1.8-2 1.8h-1l-.5 2.1H6l1.3-5.5zm1.5 2.2h.7c.5 0 .8-.2.8-.7 0-.4-.3-.6-.7-.6h-.6l-.2 1.3zm3.7-2.2h1.3l-.5 2.1h1.7l.5-2.1h1.3l-1.3 5.5h-1.3l.5-2.1h-1.7l-.5 2.1H12l1.3-5.5zm4.8 0h2.2c1.1 0 1.8.6 1.8 1.6 0 1.2-.8 1.8-2 1.8h-1l-.5 2.1h-1.3l1.3-5.5zm1.5 2.2h.7c.5 0 .8-.2.8-.7 0-.4-.3-.6-.7-.6h-.6l-.2 1.3z"/></svg>`,
  },
  {
    name: 'Node.js',
    category: 'backend',
    color: '#339933',
    level: 'Runtime & APIs',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#339933" d="M12 2l10 5.8v11.6L12 25.2 2 19.4V7.8L12 2zm0 2.3L4 8.9v9.2l8 4.6 8-4.6V8.9L12 4.3z"/></svg>`,
  },
  {
    name: 'Python',
    category: 'backend',
    color: '#3776AB',
    level: 'Scripting & AI',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#3776AB" d="M11.9 2c-3.1 0-5 .7-5 2.1v2.1h5.1v.7H4.8C3.1 6.9 2 8.4 2 10.7c0 2.2 1.2 3.7 3 3.7h1.4v-1.7c0-1.6 1.4-2.8 3-2.8h5.2c1.3 0 2.4-1.1 2.4-2.4V4.1C17 2.7 15 2 11.9 2zm-1.5 1.4a.9.9 0 110 1.8.9.9 0 010-1.8zm1.7 18.6c3.1 0 5-.7 5-2.1v-2.1h-5.1v-.7h7.2c1.7 0 2.8-1.5 2.8-3.8 0-2.2-1.2-3.7-3-3.7h-1.4v1.7c0 1.6-1.4 2.8-3 2.8h-5.2c-1.3 0-2.4 1.1-2.4 2.4v3.4c0 1.4 2 2.1 5.1 2.1zm1.5-1.4a.9.9 0 110-1.8.9.9 0 010 1.8z"/></svg>`,
  },
  {
    name: 'REST & GraphQL',
    category: 'backend',
    color: '#E535AB',
    level: 'API Architecture',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#E535AB" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18"/></svg>`,
  },

  // Databases
  {
    name: 'PostgreSQL',
    category: 'database',
    color: '#4169E1',
    level: 'Relational & JSON',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#4169E1" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z"/></svg>`,
  },
  {
    name: 'MySQL',
    category: 'database',
    color: '#4479A1',
    level: 'Relational DB',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#4479A1" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  },
  {
    name: 'Microsoft SQL Server',
    category: 'database',
    color: '#CC292B',
    level: 'Enterprise Data',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#CC292B" d="M22 6c0-2.2-4.5-4-10-4S2 3.8 2 6v12c0 2.2 4.5 4 10 4s10-1.8 10-4V6zm-10 2c-4.4 0-8-1.1-8-2.5S7.6 3 12 3s8 1.1 8 2.5S16.4 8 12 8z"/></svg>`,
  },
  {
    name: 'MongoDB',
    category: 'database',
    color: '#47A248',
    level: 'NoSQL Document',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#47A248" d="M12 1.5C12 1.5 5 8.5 5 14c0 3.9 3.1 7 7 7s7-3.1 7-7c0-5.5-7-12.5-7-12.5zm0 18.5c-3.3 0-6-2.7-6-6 0-3.9 4.3-9.1 6-10.9 1.7 1.8 6 7 6 10.9 0 3.3-2.7 6-6 6z"/></svg>`,
  },
  {
    name: 'Oracle Database',
    category: 'database',
    color: '#F80000',
    level: 'Mission Critical',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#F80000" d="M16.5 4h-9C3.4 4 0 7.4 0 11.5S3.4 19 7.5 19h9c4.1 0 7.5-3.4 7.5-7.5S20.6 4 16.5 4zm-.3 11.8H7.8c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3h8.4c2.4 0 4.3 1.9 4.3 4.3s-1.9 4.3-4.3 4.3z"/></svg>`,
  },
  {
    name: 'Firebase',
    category: 'database',
    color: '#FFCA28',
    level: 'Auth & Firestore',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#FFCA28" d="M4.3 18.3L2 5.1c-.1-.7.6-1.1 1.1-.7l4.3 4-3.1 9.9zm15.4 0l-3.2-13.4c-.2-.7-1-.8-1.4-.2l-5.6 10.4 4 3.8 6.2-.6zm-10.6-2l-3-2.8 2.5-7.9c.2-.7 1.1-.8 1.5-.2l5.2 9.5-6.2 1.4z"/></svg>`,
  },

  // Platforms & CMS
  {
    name: 'Shopify CLI & Liquid',
    category: 'platform',
    color: '#7AB55C',
    level: 'eCommerce Extensions',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#7AB55C" d="M19.4 6.7l-2.1-.6c-.2-.1-.5 0-.6.2l-2.8 7.3-2-6.5c-.1-.3-.4-.5-.7-.5h-2c-.3 0-.6.2-.7.5L5.7 18.2c-.1.3 0 .6.3.8l5.2 2.8c.2.1.5.1.7 0l7.8-4.2c.3-.1.4-.4.4-.7l-.7-10.2zm-8 12.3l-3.8-2 1.9-5.9 3.2 6.5-1.3 1.4zm3.9-3.2l-2.1-4.2 1.9-5 1.5 8.7-1.3.5z"/></svg>`,
  },
  {
    name: 'Wix Studio & Velo',
    category: 'platform',
    color: '#0C6EFC',
    level: 'Custom Web Modules',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#0C6EFC" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.5 14h-2.1l-1.9-5.2-1.9 5.2H9.5L6.8 8h2.1l1.8 5.4L12.5 8h1.9l1.8 5.4L18 8h2.1l-2.6 8z"/></svg>`,
  },
  {
    name: 'WordPress',
    category: 'platform',
    color: '#21759B',
    level: 'Custom Themes & Plugins',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#21759B" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18.5a8.5 8.5 0 01-5.3-1.9l4.5-12.3c.3-.8.6-1.1 1-1.1.4 0 .7.3 1 1.1l4.5 12.3a8.5 8.5 0 01-5.7 1.9zm6.6-4.5l-2.6-7.5c.5-.1.9-.3 1.2-.5a8.4 8.4 0 011.4 8zm-13.2 0a8.4 8.4 0 011.4-8c.3.2.7.4 1.2.5l-2.6 7.5z"/></svg>`,
  },

  // Cloud & Tools
  {
    name: 'Linux / Bash CLI',
    category: 'tools',
    color: '#FCC624',
    level: 'Kernel & Headless Tools',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#E6E7E2" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  },
  {
    name: 'Git & GitHub',
    category: 'tools',
    color: '#F05032',
    level: 'Version Control',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#F05032" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
  },
  {
    name: 'Vercel',
    category: 'tools',
    color: '#000000',
    level: 'Edge & Cloud Deployment',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#FFF" d="M12 1L24 22H0L12 1z"/></svg>`,
  },
  {
    name: 'Google Cloud (GCP)',
    category: 'tools',
    color: '#4285F4',
    level: 'Cloud Architecture',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#4285F4" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>`,
  },
  {
    name: 'Figma',
    category: 'tools',
    color: '#F24E1E',
    level: 'UI/UX & Prototyping',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill="#F24E1E" d="M8 2h4v6H8z"/><circle cx="16" cy="5" r="3" fill="#FF7262"/><circle cx="16" cy="11" r="3" fill="#1ABCFE"/><circle cx="8" cy="11" r="3" fill="#A259FF"/><path fill="#0ACF83" d="M8 17a3 3 0 003 3v-6H8a3 3 0 000 6z"/></svg>`,
  },
  {
    name: 'Jira / Notion / Trello',
    category: 'tools',
    color: '#0052CC',
    level: 'Agile & Sprint Delivery',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#0052CC" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>`,
  },
];
