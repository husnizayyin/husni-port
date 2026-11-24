export interface CaseStudy {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  client: string;
  location: string;
  period: string;
  role: string;
  accent: string;
  productsCount: number;
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
    title: 'Global Web Portals, Mobile App & Custom E-Commerce',
    subtitle: 'Full-stack Next.js web portals, cross-platform Flutter app & custom Shopify/Wix stores',
    client: 'Archangel Digital Studios Singapore',
    location: 'Singapore (Remote)',
    period: 'Oct 2025 – Present',
    role: 'Software Engineer',
    accent: '#FF5C1A',
    productsCount: 6,
    heroMetric: '6 Products',
    heroMetricLabel: 'Launched in Production',
    summary:
      'Developed and launched 6 production digital products for international clients in Singapore across media portals, community mobile apps, restaurant e-commerce, and online education.',
    challenge:
      'Multiple international clients needed custom web, mobile, and e-commerce platforms built rapidly with high SEO performance, clean API integration, and mobile-friendly user experiences.',
    architecture: [
      'Built end-to-end web portals (Parent Guide & SGAT Temple Portal) using Next.js, React, and PostgreSQL with fast server-side rendering.',
      'Developed the cross-platform SGAT Mobile App using Flutter (BLoC & GetX) with native-like performance across iOS and Android.',
      'Extended Shopify (Liquid) for Tora Tora Tora Resto & Delish Storefront and Wix Studio (Velo) for Jiang Education with custom booking and checkout features.',
    ],
    outcomes: [
      { value: '6 Products', label: 'Launched in production' },
      { value: 'Web & Mobile', label: 'Next.js + Flutter stack' },
      { value: 'SG & Global', label: 'Multi-client delivery' },
    ],
    deliverables: [
      { name: 'Parent Guide', stack: 'Next.js · PostgreSQL', detail: 'SEO-optimized family media & community web portal' },
      { name: 'SGAT Temple', stack: 'Next.js · PostgreSQL', detail: 'Institutional web platform & event management portal' },
      { name: 'SGAT Mobile App', stack: 'Flutter · BLoC & GetX', detail: 'Multilingual iOS & Android community member app' },
      { name: 'Tora Tora Tora Resto', stack: 'Shopify Liquid', detail: 'Custom restaurant e-commerce & reservation storefront' },
      { name: 'Delish Storefront', stack: 'Shopify Liquid', detail: 'Custom F&B online store & high-conversion checkout' },
      { name: 'Jiang Education', stack: 'Wix Studio Velo', detail: 'Interactive course scheduling & learning portal' },
    ],
    tags: ['Next.js', 'React', 'Flutter', 'PostgreSQL', 'Shopify Liquid', 'Wix Velo'],
  },
  {
    id: 'anyar-retail-ecosystem',
    index: '02',
    title: 'Multi-Branch Retail ERP, POS & Customer Loyalty Apps',
    subtitle: 'Connected mobile workforce app, two retail member apps & centralized POS backoffice',
    client: 'PT Anyar Retail Indonesia',
    location: 'Bandung, Indonesia',
    period: 'May 2022 – Aug 2025',
    role: 'Mobile Developer',
    accent: '#3FA98A',
    productsCount: 4,
    heroMetric: '4 Products',
    heroMetricLabel: 'Launched in Production',
    summary:
      'Led mobile development and API integration across 4 core applications powering daily store operations, employee attendance, POS management, and customer loyalty programs.',
    challenge:
      'Multi-branch retail stores required unified mobile apps for staff attendance and customer membership rewards synchronized reliably with the central ERP and POS database.',
    architecture: [
      'Developed and led Daily A Team App using Flutter to manage multi-branch staff operations, schedules, and attendance.',
      'Built and maintained Triwarna Member App and RKM Member App in React Native for digital member cards, points, and store catalogs.',
      'Integrated mobile apps seamlessly with Daily Enterprise (React.js, Laravel, MS SQL Server & MySQL) for real-time retail data sync.',
    ],
    outcomes: [
      { value: '4 Products', label: 'Launched in production' },
      { value: '3+ Years', label: 'Production maintenance' },
      { value: 'Multi-Store', label: 'Retail ERP & POS sync' },
    ],
    deliverables: [
      { name: 'Daily A Team App', stack: 'Flutter · Dart', detail: 'Employee operations, shift schedules & attendance app' },
      { name: 'Triwarna Member App', stack: 'React Native', detail: 'Customer loyalty app with digital cards & rewards' },
      { name: 'RKM Member App', stack: 'React Native', detail: 'Retail membership rewards & promotional catalog app' },
      { name: 'Daily Enterprise ERP', stack: 'React · Laravel · MS SQL', detail: 'Central retail ERP & multi-store POS web dashboard' },
    ],
    tags: ['Flutter', 'React Native', 'React.js', 'Laravel', 'MS SQL Server', 'MySQL'],
  },
  {
    id: 'stars-mining-hris',
    index: '03',
    title: 'Mining HRIS Facial Attendance & Automated Payroll',
    subtitle: 'Biometric employee attendance system paired with automated payroll & reporting APIs',
    client: 'PT Stars Global Resources Indonesia',
    location: 'Jakarta, Indonesia',
    period: 'Aug 2025 – Oct 2025',
    role: 'Full Stack Developer',
    accent: '#7B6CF6',
    productsCount: 2,
    heroMetric: '2 Products',
    heroMetricLabel: 'Launched in Production',
    summary:
      'Built and launched 2 integrated enterprise systems—an automated mining payroll platform and a facial recognition attendance system—improving operational efficiency by 30%.',
    challenge:
      'Manual attendance verification and complex mining shift calculations slowed down monthly payroll processing and management reporting.',
    architecture: [
      'Developed an automated payroll calculation system in Laravel and PostgreSQL tailored to mining industry shift rules, increasing efficiency by 30%.',
      'Integrated facial recognition attendance tracking to verify employee check-ins accurately and streamline HR workflows.',
      'Created RESTful APIs for comprehensive workforce and financial reporting to support faster management decisions.',
    ],
    outcomes: [
      { value: '2 Products', label: 'Launched in production' },
      { value: '+30%', label: 'Operational efficiency' },
      { value: 'REST APIs', label: 'Real-time HR reporting' },
    ],
    deliverables: [
      { name: 'Enterprise Biometric HRIS', stack: 'Laravel · Facial Recognition', detail: 'Automated employee attendance & workforce management' },
      { name: 'Automated Payroll System', stack: 'Laravel · PostgreSQL', detail: 'Mining shift calculation, tax & payroll reporting system' },
    ],
    tags: ['Laravel', 'PHP', 'PostgreSQL', 'Facial Recognition', 'RESTful APIs'],
  },
  {
    id: 'logistics-wms-mobility',
    index: '04',
    title: 'Warehouse Management (WMS) & Android E-Ticketing',
    subtitle: 'Parcel warehouse & courier system alongside native Kotlin passenger booking apps',
    client: 'PT HS Budiman & PT Media Baru Digital',
    location: 'Tasikmalaya & Jakarta',
    period: '2019 – 2020',
    role: 'Full Stack & Mobile Developer',
    accent: '#F59E0B',
    productsCount: 3,
    heroMetric: '3 Products',
    heroMetricLabel: 'Launched in Production',
    summary:
      'Delivered 3 logistics and transportation software products: a web-based Warehouse & Courier Management System and two native Kotlin Android passenger e-ticketing apps.',
    challenge:
      'Logistics warehouses and bus operators needed digital parcel tracking and mobile ticket booking systems connected to live seat availability APIs.',
    architecture: [
      'Developed a Warehouse Management System (WMS) and Courier Management System with Laravel and MySQL at PT HS Budiman.',
      'Integrated REST APIs with mobile E-Ticketing apps and authored Functional Specification Documents (FSD) and operational SOPs.',
      'Built the native Kotlin Android Bosbis Ticket App at PT Media Baru Digital with responsive seat selection across screen sizes.',
    ],
    outcomes: [
      { value: '3 Products', label: 'Launched in production' },
      { value: 'WMS + App', label: 'Logistics & e-ticketing' },
      { value: 'Kotlin SDK', label: 'Native Android UI' },
    ],
    deliverables: [
      { name: 'Warehouse & Courier WMS', stack: 'Laravel · MySQL', detail: 'Parcel tracking, warehouse inventory & courier dispatch' },
      { name: 'Fleet E-Ticketing App', stack: 'Kotlin · REST API', detail: 'Mobile passenger ticket booking & API integration' },
      { name: 'Bosbis Ticket App', stack: 'Kotlin · Android SDK', detail: 'Native Android intercity bus booking & seat selection' },
    ],
    tags: ['Kotlin', 'Android SDK', 'Laravel', 'MySQL', 'RESTful APIs'],
  },
];

/**
 * Work experience aligned directly with Husni Zayyin Ansori's LinkedIn & official CV.
 */
export const CAREER_TIMELINE: CareerEntry[] = [
  {
    company: 'Archangel Digital Studios Singapore',
    location: 'Singapore',
    workMode: 'Remote · Full-Time',
    role: 'Software Engineer',
    period: 'Oct 2025 – Present',
    accent: '#FF5C1A',
    headline: 'Full-Stack Engineering, Cross-Platform Flutter & Custom Shopify/Wix Platforms',
    description:
      'Developing end-to-end web and mobile applications using Next.js, React, PostgreSQL, and Flutter, while extending Shopify (Liquid) and Wix Studio (Velo) for enterprise and international clients.',
    highlights: [
      'Full-Stack Engineering: Developing end-to-end applications using Next.js, React, and PostgreSQL, focusing on seamless system integration and robust API structures.',
      'Cross-Platform Mobile Development: Building and maintaining high-performance mobile apps using Flutter (BLoC & GetX), ensuring a native-like experience across iOS and Android.',
      'Advanced Platform Integration: Extending the capabilities of Shopify (Liquid) and Wix Studio (Velo) through custom-coded solutions with rapid time-to-market.',
      'System Architecture: Engineering complex software ecosystems, including multi-store retail systems, WMS, and POS components.',
      'Linux & Infrastructure: Leveraging Linux environments, headless CLI tools, and kernel-level performance tuning for efficient development and production workflows.',
    ],
    stack: ['Next.js', 'React', 'Flutter', 'PostgreSQL', 'Shopify Liquid', 'Wix Studio Velo', 'Linux CLI'],
    metrics: [
      { value: '6 Products', label: 'Launched live' },
      { value: 'Full-Stack', label: 'Web & Mobile' },
    ],
  },
  {
    company: 'PT Stars Global Resources Indonesia',
    location: 'Jakarta, Indonesia',
    workMode: 'On-Site · Full-Time',
    role: 'Full Stack Developer',
    period: 'Aug 2025 – Oct 2025',
    accent: '#7B6CF6',
    headline: 'Automated Mining Payroll System & Facial Recognition Attendance',
    description:
      'Contributed to PT Stars Global Resources Indonesia in Jakarta by building automated payroll and biometric employee attendance solutions for the mining industry.',
    highlights: [
      'Developed an automated payroll system for the mining industry, enhancing operational efficiency by 30%.',
      'Integrated facial recognition attendance tracking to streamline employee management processes.',
      'Created RESTful APIs for comprehensive reporting, improving data accessibility and management decision-making.',
    ],
    stack: ['Laravel', 'PHP', 'PostgreSQL', 'Facial Recognition', 'RESTful APIs'],
    metrics: [
      { value: '2 Products', label: 'Launched live' },
      { value: '+30%', label: 'Efficiency gain' },
    ],
  },
  {
    company: 'PT Anyar Retail Indonesia',
    location: 'Bandung, Indonesia',
    workMode: 'Full-Time',
    role: 'Mobile Developer',
    period: 'May 2022 – Aug 2025',
    accent: '#3FA98A',
    headline: 'High-Performance Flutter & React Native Retail Mobile Applications',
    description:
      'Developed and led high-performance mobile application projects for multi-branch retail operations and customer loyalty ecosystems.',
    highlights: [
      'Developed and led high-performance mobile application projects using Flutter and React Native, enhancing user engagement.',
      'Collaborated with cross-functional teams to define application requirements and ensure seamless API integrations.',
      'Implemented responsive designs, optimizing user experiences across various mobile devices and screen sizes.',
      'Stayed updated with mobile development trends, incorporating innovative features to improve app functionality.',
    ],
    stack: ['Flutter', 'Dart', 'React Native', 'React.js', 'Laravel', 'MS SQL Server', 'MySQL'],
    metrics: [
      { value: '4 Products', label: 'Launched live' },
      { value: '3.3 Years', label: 'Experience' },
    ],
  },
  {
    company: 'PT HS Budiman',
    location: 'Tasikmalaya, Indonesia',
    workMode: 'Internship',
    role: 'Full Stack Developer',
    period: 'Jul 2020 – Dec 2020',
    accent: '#F59E0B',
    headline: 'Warehouse Management System (WMS), Courier System & E-Ticketing API',
    description:
      'Developed warehouse and courier logistics platforms while integrating backend APIs for mobile passenger e-ticketing.',
    highlights: [
      'Developed an integrated Warehouse Management System (WMS) and Courier Management System.',
      'Helped integrate backend REST APIs with mobile applications (E-Ticketing).',
      'Assisted in creating new Standard Operating Procedures (SOP) for operational teams.',
      'Authored Functional Specification Documents (FSD) and final university engineering reports.',
    ],
    stack: ['Laravel', 'PHP', 'Kotlin', 'MySQL', 'RESTful APIs'],
    metrics: [
      { value: '2 Products', label: 'WMS & Ticketing' },
      { value: 'FSD & SOP', label: 'Documentation' },
    ],
  },
  {
    company: 'PT Media Baru Digital',
    location: 'Jakarta, Indonesia',
    workMode: 'Internship',
    role: 'Mobile Developer',
    period: 'Jul 2019 – Dec 2019',
    accent: '#EC4899',
    headline: 'Native Kotlin Android Application Development',
    description:
      'Developed native Android mobile applications using Kotlin with responsive layouts and seamless API integration.',
    highlights: [
      'Developed mobile applications using Kotlin, enhancing user engagement for online bus ticketing.',
      'Collaborated with cross-functional teams to define app requirements and ensure seamless API integrations.',
      'Implemented responsive designs, optimizing user experiences across various Android devices and screen sizes.',
    ],
    stack: ['Kotlin', 'Android SDK', 'Java', 'RESTful APIs'],
    metrics: [
      { value: '1 Product', label: 'Bosbis App' },
      { value: 'Kotlin', label: 'Android Native' },
    ],
  },
];
