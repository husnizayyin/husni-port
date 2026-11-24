export const PROFILE = {
  name: 'Husni Zayyin Ansori',
  shortName: 'Husni Zayn',
  handle: '@husnizayn',
  githubHandle: 'husnizayyin',
  role: 'Senior Software Engineer & System Architect',
  tagline: '5+ Years Remote Engineering · Web, Mobile & Enterprise Systems',
  location: 'Jakarta, Indonesia',
  timezone: 'UTC+7 (WIB)',
  availability: 'Available for Remote Senior & Lead Engineering Roles',
  email: 'husni.zayyin98@gmail.com',
  phone: '+62 859-5993-9270',
  cvUrl: '/cv/CV-Husni-Zayyin-Ansori.pdf',
  heroHeadline: 'Engineering systems where precision backend meets tactile interface.',
  heroSubheadline:
    'With 5+ years delivering remote & enterprise software across Singapore and Indonesia, I architect high-concurrency Next.js web platforms, native-fluid Flutter mobile apps, and mission-critical ERP/HRIS infrastructure.',
  manifesto:
    'Architecting end-to-end digital ecosystems that bridge complex distributed back-end logic with fluid, zero-friction user experiences across web and mobile.',
  education: {
    university: 'Universitas 17 Agustus 1945 Surabaya',
    degree: 'Bachelor of Engineering in Informatics Engineering',
    gpa: '3.31 / 4.00',
    thesis: 'Architected an integrated Warehouse Management System (WMS) & Regional Courier Dispatch Platform.',
  },
  metrics: [
    { value: '5+', label: 'Years Experience', detail: 'Remote & cross-functional delivery' },
    { value: '15+', label: 'Products Shipped', detail: 'Across Singapore & Indonesia' },
    { value: '3,766+', label: 'GitHub Commits', detail: '25+ open & enterprise repos' },
    { value: '+30%', label: 'Efficiency Gain', detail: 'Automated biometric HRIS & ERP' },
  ],
  pillars: [
    {
      index: '01',
      title: 'Full-Stack Web & Headless Commerce',
      accent: '#FF5C1A',
      summary:
        'End-to-end Next.js, React, TypeScript, and PostgreSQL architectures paired with custom Shopify Liquid and Wix Studio Velo storefronts engineered for SEO velocity and conversion.',
      tags: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Shopify Liquid', 'Wix Velo'],
    },
    {
      index: '02',
      title: 'Cross-Platform & Native Mobile Core',
      accent: '#3FA98A',
      summary:
        'Production-grade iOS and Android ecosystems built with Flutter (BLoC, Riverpod, GetX), React Native, Kotlin, and SwiftUI—delivering 60fps tactile motion and offline-first reliability.',
      tags: ['Flutter', 'Dart', 'BLoC & Riverpod', 'React Native', 'Kotlin', 'SwiftUI'],
    },
    {
      index: '03',
      title: 'Enterprise ERP, Biometrics & Cloud Ops',
      accent: '#7B6CF6',
      summary:
        'Multi-branch retail POS/ERP backbones, Laravel/Node REST & GraphQL APIs, OpenCV biometric attendance engines, and Linux headless CLI infrastructure tuned for zero-downtime scale.',
      tags: ['Laravel', 'MS SQL & Postgres', 'Biometric AI', 'Docker', 'Linux CLI', 'GCP'],
    },
  ],
  socials: [
    {
      label: 'LinkedIn',
      handle: 'in/husnizayn',
      href: 'https://www.linkedin.com/in/husnizayn/',
    },
    {
      label: 'GitHub',
      handle: 'github.com/husnizayyin',
      href: 'https://github.com/husnizayyin',
    },
    {
      label: 'Email',
      handle: 'husni.zayyin98@gmail.com',
      href: 'mailto:husni.zayyin98@gmail.com',
    },
    {
      label: 'WhatsApp',
      handle: '+62 859-5993-9270',
      href: 'https://wa.me/6285959939270',
    },
    {
      label: 'Telegram',
      handle: '@husnizayn',
      href: 'https://t.me/husnizayn',
    },
    {
      label: 'X / Twitter',
      handle: '@husnizayn',
      href: 'https://x.com/husnizayn',
    },
  ],
} as const;

export const NAV_ITEMS = [
  { id: 'about', label: 'Craft' },
  { id: 'work', label: 'Case Studies' },
  { id: 'experience', label: 'Journey' },
  { id: 'stack', label: 'Stack' },
  { id: 'opensource', label: 'Open Source' },
  { id: 'contact', label: 'Contact' },
] as const;
