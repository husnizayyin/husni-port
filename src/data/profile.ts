export const PROFILE = {
  name: 'Husni Zayyin Ansori',
  shortName: 'Husni Zayn',
  handle: '@husnizayn',
  githubHandle: 'husnizayyin',
  role: 'Software Engineer',
  tagline: '5+ Years Experience · Full-Stack Web & Mobile Developer',
  location: 'Jakarta, Indonesia',
  timezone: 'WIB',
  availability: 'Available for Remote & Full-Time Software Engineering Roles',
  email: 'husni.zayyin98@gmail.com',
  phone: '+62 859-5993-9270',
  cvUrl: '/cv/CV-Husni-Zayyin-Ansori.pdf',
  heroHeadline: 'Building Scalable Web, Mobile, and Enterprise Applications.',
  heroSubheadline:
    'Results-driven Software Engineer with 5+ years of experience developing end-to-end web platforms, cross-platform mobile apps (iOS & Android), and automated business systems using Next.js, Flutter, React, Laravel, and PostgreSQL.',
  manifesto: 'Engineering across web, mobile, and backend.',
  manifestoSub:
    'From customer-facing web portals and iOS/Android mobile apps to scalable APIs and internal enterprise systems.',
  education: {
    university: 'Universitas 17 Agustus 1945 Surabaya',
    degree: 'Bachelor of Informatics Engineering',
    gpa: '3.31 / 4.00',
    thesis: 'Final Project: Developed an integrated Warehouse Management System (WMS) and Courier Management System.',
  },
  metrics: [
    { value: '5+ Years', label: 'Work Experience', detail: 'Remote & enterprise software teams' },
    { value: '15 Products', label: 'Launched Live', detail: 'Across web, mobile & ERP systems' },
    { value: '27+ Repos', label: 'GitHub Projects', detail: '3,766+ lifetime code contributions' },
    { value: '+30% Gain', label: 'Process Efficiency', detail: 'Automated HRIS & payroll workflows' },
  ],
  pillars: [
    {
      index: '01',
      title: 'Web Application Development',
      accent: '#FF5C1A',
      summary:
        'Developing fast, responsive websites, web portals, and custom e-commerce stores using Next.js, React, TypeScript, Shopify (Liquid), and Wix Studio (Velo).',
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Shopify Liquid', 'Wix Studio'],
    },
    {
      index: '02',
      title: 'Mobile App Development',
      accent: '#3FA98A',
      summary:
        'Building smooth, reliable iOS and Android mobile apps with Flutter (BLoC, Riverpod & GetX) and React Native, as well as native Android apps with Kotlin.',
      tags: ['Flutter', 'Dart', 'BLoC & GetX', 'React Native', 'Kotlin', 'SwiftUI'],
    },
    {
      index: '03',
      title: 'Backend APIs & Business Systems',
      accent: '#7B6CF6',
      summary:
        'Creating secure REST APIs, relational databases, automated payroll & HRIS systems, multi-store retail POS/ERP platforms, and Linux server workflows.',
      tags: ['Laravel', 'PostgreSQL', 'MySQL & MS SQL', 'REST APIs', 'Docker', 'Linux CLI'],
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
  { id: 'about', label: 'Capabilities' },
  { id: 'work', label: 'Case Studies' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Tech Stack' },
  { id: 'opensource', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
] as const;
