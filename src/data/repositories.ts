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
    name: 'flutter_mvvm_riverpod',
    description:
      'Production-ready Flutter architecture blueprint implementing Clean Architecture, MVVM layers, and Riverpod 2.0 reactive state management.',
    language: 'Dart',
    category: 'Mobile',
    stars: 2,
    forks: 1,
    topics: ['flutter', 'riverpod', 'mvvm', 'clean-architecture'],
    html_url: 'https://github.com/husnizayyin/flutter_mvvm_riverpod',
    updated_at: '2025-12-12',
  },
  {
    name: 'husni-port',
    description:
      'Interactive 3D developer portfolio built with Next.js, React Three Fiber, Framer Motion spring choreography, and zero-latency WebAudio feedback.',
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
    name: 'mymirror',
    description:
      'Smart IoT Mirror companion mobile app in Flutter interfacing with smart-home hub hardware for real-time telemetry and routines.',
    language: 'Dart',
    category: 'Mobile',
    stars: 1,
    forks: 0,
    topics: ['flutter', 'iot', 'smart-mirror', 'telemetry'],
    html_url: 'https://github.com/husnizayyin/mymirror',
    updated_at: '2026-09-02',
  },
  {
    name: 'pos_firebase',
    description:
      'Offline-capable Point of Sale (POS) and inventory management mobile suite backed by Firebase Firestore, Cloud Auth, and local cache.',
    language: 'Dart',
    category: 'Mobile',
    stars: 1,
    forks: 0,
    topics: ['flutter', 'firebase', 'pos', 'firestore'],
    html_url: 'https://github.com/husnizayyin/pos_firebase',
    updated_at: '2025-11-27',
  },
  {
    name: 'pythonProject_face_recognition',
    description:
      'Real-time biometric facial recognition and identity verification pipeline using OpenCV, deep metric embeddings, and live stream capture.',
    language: 'Python',
    category: 'AI & Python',
    stars: 1,
    forks: 0,
    topics: ['python', 'opencv', 'biometrics', 'face-recognition'],
    html_url: 'https://github.com/husnizayyin/pythonProject_face_recognition',
    updated_at: '2025-08-05',
  },
  {
    name: 'Cargoku',
    description:
      'Enterprise cargo dispatch and parcel freight tracking web platform with multi-tenant operations dashboards and automated invoicing.',
    language: 'PHP',
    category: 'Backend',
    stars: 1,
    forks: 0,
    topics: ['php', 'laravel', 'freight-wms', 'mysql'],
    html_url: 'https://github.com/husnizayyin/Cargoku',
    updated_at: '2025-04-20',
  },
  {
    name: 'craft.js',
    description:
      'Customized extensible React page-builder framework featuring drag-and-drop node trees, live property inspectors, and JSON canvas serialization.',
    language: 'TypeScript',
    category: 'Frontend',
    stars: 1,
    forks: 0,
    topics: ['react', 'typescript', 'page-builder', 'visual-editor'],
    html_url: 'https://github.com/husnizayyin/craft.js',
    updated_at: '2025-10-18',
  },
  {
    name: 'AirBook',
    description:
      'Native iOS flight discovery and passenger seat-map booking prototype crafted in Swift and SwiftUI with fluid gesture transitions.',
    language: 'Swift',
    category: 'Mobile',
    stars: 1,
    forks: 0,
    topics: ['swift', 'swiftui', 'ios', 'flight-booking'],
    html_url: 'https://github.com/husnizayyin/AirBook',
    updated_at: '2024-12-15',
  },
  {
    name: 'Python-Liriklagu',
    description:
      'Automated web crawler and Natural Language Processing (NLP) corpus pipeline for extracting and tokenizing Indonesian & global song lyrics.',
    language: 'Python',
    category: 'AI & Python',
    stars: 1,
    forks: 2,
    topics: ['python', 'nlp', 'crawler', 'data-pipeline'],
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
