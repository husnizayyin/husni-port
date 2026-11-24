export interface RepositoryItem {
  name: string;
  description: string;
  language: string;
  category: 'Mobile' | 'Frontend' | 'Backend' | 'AI & Python';
  stars: number;
  forks: number;
  topics: string[];
  html_url: string;
  homepage?: string;
  updated_at: string;
}

export const REPO_CATEGORIES = ['All', 'Mobile', 'Frontend', 'Backend', 'AI & Python'] as const;

export const CURATED_REPOSITORIES: RepositoryItem[] = [
  {
    name: 'artcraft',
    description:
      'ArtCraft — an intentional creative crafting engine designed for digital artists, UI designers, and filmmakers.',
    language: 'TypeScript',
    category: 'Frontend',
    stars: 1,
    forks: 0,
    topics: ['creative-engine', 'design-tools', 'web-app'],
    html_url: 'https://github.com/husnizayyin/artcraft',
    updated_at: '2026-10-20',
  },
  {
    name: 'virals_reels',
    description:
      'Short-form video & reels web application built with TypeScript for streamlined media playback and content workflows.',
    language: 'TypeScript',
    category: 'Frontend',
    stars: 1,
    forks: 0,
    topics: ['typescript', 'video', 'media-platform'],
    html_url: 'https://github.com/husnizayyin/virals_reels',
    updated_at: '2026-10-15',
  },
  {
    name: 'husni-port',
    description:
      'Interactive 3D developer portfolio built with Next.js, React Three Fiber, Framer Motion, and zero-delay WebAudio UI feedback.',
    language: 'TypeScript',
    category: 'Frontend',
    stars: 1,
    forks: 0,
    topics: ['nextjs', 'react-three-fiber', 'framer-motion', 'tailwindcss'],
    html_url: 'https://github.com/husnizayyin/husni-port',
    homepage: 'https://www.husnizayn.com/',
    updated_at: '2026-11-24',
  },
  {
    name: 'Archangel-Digital-Studios-Website',
    description:
      'Official corporate studio website for Archangel Digital Studios showcasing digital services and client work.',
    language: 'HTML',
    category: 'Frontend',
    stars: 1,
    forks: 0,
    topics: ['agency-website', 'responsive-ui', 'frontend'],
    html_url: 'https://github.com/husnizayyin/Archangel-Digital-Studios-Website',
    updated_at: '2026-09-18',
  },
  {
    name: 'mymirror',
    description:
      'Smart IoT Mirror mobile client built with Flutter for smart-home telemetry, widgets, and automated daily routines.',
    language: 'Dart',
    category: 'Mobile',
    stars: 1,
    forks: 0,
    topics: ['flutter', 'iot', 'smart-mirror', 'dart'],
    html_url: 'https://github.com/husnizayyin/mymirror',
    updated_at: '2026-09-02',
  },
  {
    name: 'flutter_mvvm_riverpod',
    description:
      'Production-ready Flutter starter architecture implementing Clean Architecture, MVVM pattern, and Riverpod state management.',
    language: 'Dart',
    category: 'Mobile',
    stars: 2,
    forks: 1,
    topics: ['flutter', 'riverpod', 'mvvm', 'clean-architecture'],
    html_url: 'https://github.com/husnizayyin/flutter_mvvm_riverpod',
    updated_at: '2024-12-12',
  },
  {
    name: 'pos_firebase',
    description:
      'Mobile Point of Sale (POS) and real-time inventory management app powered by Flutter, Firebase Auth, and Cloud Firestore.',
    language: 'Dart',
    category: 'Mobile',
    stars: 1,
    forks: 0,
    topics: ['flutter', 'firebase', 'pos', 'inventory'],
    html_url: 'https://github.com/husnizayyin/pos_firebase',
    updated_at: '2025-11-27',
  },
  {
    name: 'Cargoku',
    description:
      'Warehouse & cargo parcel management web platform developed for Informatics Engineering thesis at UNTAG Surabaya.',
    language: 'PHP',
    category: 'Backend',
    stars: 1,
    forks: 0,
    topics: ['php', 'wms', 'cargo-logistics', 'mysql'],
    html_url: 'https://github.com/husnizayyin/Cargoku',
    updated_at: '2025-04-20',
  },
  {
    name: 'pythonProject_face_recognition',
    description:
      'Real-time facial recognition and biometric attendance verification system built with Python and OpenCV.',
    language: 'Python',
    category: 'AI & Python',
    stars: 1,
    forks: 0,
    topics: ['python', 'opencv', 'face-recognition', 'biometrics'],
    html_url: 'https://github.com/husnizayyin/pythonProject_face_recognition',
    updated_at: '2024-08-05',
  },
  {
    name: 'Documentation-MalikaGoApp',
    description:
      'REST API specifications and technical integration documentation for the MalikaGo delivery & logistics platform.',
    language: 'JavaScript',
    category: 'Backend',
    stars: 1,
    forks: 0,
    topics: ['api-docs', 'logistics', 'rest-api'],
    html_url: 'https://github.com/husnizayyin/Documentation-MalikaGoApp',
    updated_at: '2025-12-06',
  },
  {
    name: 'AirBook',
    description:
      'Native iOS flight search and seat-map ticket booking prototype built using Swift and SwiftUI.',
    language: 'Swift',
    category: 'Mobile',
    stars: 1,
    forks: 0,
    topics: ['swift', 'swiftui', 'ios-app', 'booking'],
    html_url: 'https://github.com/husnizayyin/AirBook',
    updated_at: '2023-12-15',
  },
  {
    name: 'Python-Liriklagu',
    description:
      'Automated web scraper and Natural Language Processing (NLP) notebook for extracting and analyzing song lyrics.',
    language: 'Python',
    category: 'AI & Python',
    stars: 1,
    forks: 2,
    topics: ['python', 'nlp', 'data-scraping', 'jupyter'],
    html_url: 'https://github.com/husnizayyin/Python-Liriklagu',
    updated_at: '2025-11-27',
  },
];

export const FALLBACK_CONTRIBUTION_TOTALS: Record<string, number> = {
  '2026': 1677,
  '2025': 1257,
  '2024': 410,
  '2023': 224,
  '2022': 198,
};
