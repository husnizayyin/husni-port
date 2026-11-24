export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  code?: {
    filename: string;
    language: string;
    snippet: string;
  };
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: 'Full-Stack & DevOps' | 'Video & AI Systems' | 'API & Documentation' | 'Mobile Architecture' | 'Interactive Web & 3D';
  publishedAt: string;
  readTime: string;
  featured: boolean;
  accent: string;
  repoName: string;
  repoUrl: string;
  liveUrl?: string;
  tags: string[];
  keyTakeaways: string[];
  sections: ArticleSection[];
}

export const ARTICLE_CATEGORIES = [
  'All',
  'Full-Stack & DevOps',
  'Video & AI Systems',
  'API & Documentation',
  'Mobile Architecture',
  'Interactive Web & 3D',
] as const;

export const ARTICLES: Article[] = [
  {
    slug: 'local-first-9-16-video-pipeline-viralreels-studio',
    title: 'Building a Zero-Cloud 9:16 Video & Subtitle Engine with Whisper.cpp and BullMQ',
    subtitle:
      'How ViralReels Studio Pro automates word-level karaoke captions, EBU R128 audio normalization, and Intel QuickSync encoding entirely on-premise.',
    excerpt:
      'Cloud transcription and video rendering APIs become expensive at scale. Here is how I architected a local-first TypeScript pipeline powered by whisper.cpp, Redis BullMQ queues, and hardware-accelerated FFmpeg.',
    category: 'Video & AI Systems',
    publishedAt: 'October 2026',
    readTime: '6 min read',
    featured: true,
    accent: '#FF5C1A',
    repoName: 'husnizayyin/virals_reels',
    repoUrl: 'https://github.com/husnizayyin/virals_reels',
    tags: ['TypeScript', 'Whisper.cpp', 'BullMQ', 'Redis', 'FFmpeg', 'h264_qsv'],
    keyTakeaways: [
      'Eliminated 100% of recurring cloud speech-to-text API costs by running AVX2-optimized whisper.cpp locally.',
      'Isolated heavy FFmpeg rendering from HTTP uploads using Redis + BullMQ with strict concurrency and memory caps (<2.5 GB RAM).',
      'Automated 9:16 cropping (1080x1920), 480px safe-zone karaoke captions, and -14 LUFS loudness normalization in a single worker pipeline.',
    ],
    sections: [
      {
        heading: 'Why Move Video Processing Off the Cloud?',
        paragraphs: [
          'Short-form content workflows for Reels, Shorts, and TikTok require repetitive processing steps: speech transcription, word-level timestamp alignment, aspect-ratio cropping, audio normalization, and H.264 encoding.',
          'Relying on external cloud APIs introduces per-minute billing, upload latency for large source files, and rate limits. With ViralReels Studio Pro, the goal was straightforward: run the entire pipeline locally on modest hardware (an Intel Core i5-1235U baseline) without freezing the system.',
        ],
      },
      {
        heading: 'Decoupling Ingestion from Encoding with BullMQ',
        paragraphs: [
          'Video transcoding and speech inference are CPU- and GPU-intensive tasks. Running them directly inside an HTTP request handler quickly exhausts memory when multiple files are dropped into the web studio.',
          'To keep the web UI responsive, uploads immediately enqueue a job into BullMQ backed by Redis. A dedicated worker processes one job at a time (concurrency = 1) while streaming live stage progress back to the dashboard.',
        ],
        code: {
          filename: 'worker/videoQueue.ts',
          language: 'typescript',
          snippet: `import { Worker, Job } from 'bullmq';

export const videoWorker = new Worker(
  'reels-pipeline',
  async (job: Job) => {
    await job.updateProgress({ stage: 'transcribing', percent: 15 });
    const words = await runWhisperCpp(job.data.inputPath, { threads: 4 });

    await job.updateProgress({ stage: 'subtitles', percent: 45 });
    const assPath = buildKaraokeAssSubtitles(words, { bottomMarginPx: 480 });

    await job.updateProgress({ stage: 'encoding', percent: 75 });
    return renderVerticalVideo(job.data.inputPath, assPath);
  },
  { connection: redisConnection, concurrency: 1 }
);`,
        },
      },
      {
        heading: 'Hardware Tuning & Safe-Zone Subtitle Design',
        paragraphs: [
          'Two practical details made the biggest difference in output quality and system stability: thermal management on hybrid CPUs and platform UI safe zones.',
        ],
        bullets: [
          'Whisper Thread Cap (-t 4): Prevents thermal throttling on Intel 12th Gen hybrid cores while keeping transcription fast.',
          '3-Word Karaoke Grouping: Groups word-level timestamps into crisp 3-word phrases positioned above a 480px bottom margin so TikTok and Instagram Reels buttons never cover captions.',
          'Intel QuickSync (h264_qsv) + libx264 Fallback: Uses integrated GPU encoding first and falls back cleanly to CPU encoding when hardware acceleration is unavailable.',
          'EBU R128 Audio Normalization (-14 LUFS): Ensures consistent voice loudness across mobile speakers.',
        ],
      },
    ],
  },
  {
    slug: 'dockerized-fullstack-react-express-prisma-learnjs-v3',
    title: 'Structuring a Containerized Full-Stack React, Express & Prisma Application',
    subtitle:
      'Lessons from building and deploying LearnJs v3 with Vite, Tailwind CSS, Prisma ORM, MySQL 8, and Docker Compose.',
    excerpt:
      'A practical walkthrough of connecting a modern React + Vite + Framer Motion frontend to a typed Express and Prisma MySQL backend with reproducible Docker Compose environments.',
    category: 'Full-Stack & DevOps',
    publishedAt: 'November 2025',
    readTime: '5 min read',
    featured: true,
    accent: '#3FA98A',
    repoName: 'husnizayyin/LearnJs_v3',
    repoUrl: 'https://github.com/husnizayyin/LearnJs_v3',
    liveUrl: 'https://learn-js-v3.vercel.app',
    tags: ['React 18', 'Express', 'Prisma ORM', 'MySQL 8', 'Docker Compose', 'Tailwind CSS'],
    keyTakeaways: [
      'Paired Prisma ORM v6 with MySQL 8.0 to maintain strict schema migrations and clean relational queries in Express.',
      'Standardized local onboarding into a single docker-compose up --build workflow across frontend, API, and database containers.',
      'Deployed the React + Tailwind + Framer Motion client to Vercel for instant edge delivery.',
    ],
    sections: [
      {
        heading: 'Bridging Frontend Speed with Relational Data Integrity',
        paragraphs: [
          'LearnJs v3 was built as a clean, end-to-end JavaScript reference application separating concerns between an interactive SPA client and a structured REST API server.',
          'On the frontend, React 18, Vite, Tailwind CSS, and Framer Motion handle fast view transitions and Axios data fetching. On the backend, Express pairs with Prisma ORM and MySQL 8.0 so database queries remain readable, predictable, and easy to migrate.',
        ],
      },
      {
        heading: 'Clean Express + Prisma Service Layer',
        paragraphs: [
          'Instead of scattering raw SQL strings across route handlers, Prisma centralizes the schema definition and generates typed client methods for CRUD operations, validation, and pagination.',
        ],
        code: {
          filename: 'backend/src/controllers/courseController.js',
          language: 'javascript',
          snippet: `import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listModules(req, res) {
  try {
    const modules = await prisma.module.findMany({
      orderBy: { createdAt: 'desc' },
      include: { lessons: true },
    });
    return res.status(200).json({ status: 'ok', data: modules });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load modules' });
  }
}`,
        },
      },
      {
        heading: 'Reproducible Environments with Docker Compose',
        paragraphs: [
          'Setting up local MySQL versions and Node.js environment variables manually often slows down team collaboration. Wrapping the API, MySQL 8 instance, and frontend in Docker Compose makes spinning up the stack deterministic.',
        ],
        bullets: [
          'Isolated network bridge between Express API container and MySQL 8 volume storage.',
          'CORS and Morgan HTTP request logging pre-configured for transparent local debugging.',
          'Frontend deployed live on Vercel while keeping the API contract decoupled via environment variables.',
        ],
      },
    ],
  },
  {
    slug: 'designing-interactive-hris-api-docs-malikago',
    title: 'Designing Clear Module & API Documentation Portals for Mobile HRIS Ecosystems',
    subtitle:
      'How Documentation-MalikaGoApp structures authentication, attendance, leave requests, and approval workflows into a live developer portal.',
    excerpt:
      'When mobile and backend engineers collaborate across attendance, leave, and approval modules, static PDFs quickly go stale. Here is how I built a dedicated live documentation web app on Vercel.',
    category: 'API & Documentation',
    publishedAt: 'December 2025',
    readTime: '5 min read',
    featured: true,
    accent: '#7B6CF6',
    repoName: 'husnizayyin/Documentation-MalikaGoApp',
    repoUrl: 'https://github.com/husnizayyin/Documentation-MalikaGoApp',
    liveUrl: 'https://documentation-malika-go-app.vercel.app',
    tags: ['React', 'Vite', 'REST API Specs', 'HRIS Workflows', 'Vercel'],
    keyTakeaways: [
      'Organized complex workforce app specs into 9 dedicated domain routes: Login, Home, Attendance, Leave, Request, Approval, History, Employee, and Personal.',
      'Hosted live on Vercel so mobile (Flutter/Kotlin) and backend teams always reference a single source of truth.',
      'Reduced integration back-and-forth during sprint handoffs with explicit payload examples and status flows.',
    ],
    sections: [
      {
        heading: 'Why Living Documentation Matters in Mobile + API Teams',
        paragraphs: [
          'In workforce and logistics mobile apps like MalikaGo, every mobile screen depends on strict API contracts: token login, geolocation attendance check-ins, leave balances, multi-step manager approvals, and employee profiles.',
          'Sharing API contracts through chat messages or static documents often leads to mismatched field names and state bugs. Building a dedicated web portal deployed on Vercel gave every team member instant browser access to the exact module specifications.',
        ],
      },
      {
        heading: 'Domain-Driven Route Structure',
        paragraphs: [
          'Rather than dumping every endpoint onto a single endless page, the documentation app mirrors the exact product navigation of the mobile application itself using nested layouts.',
        ],
        code: {
          filename: 'src/App.jsx',
          language: 'jsx',
          snippet: `<Routes>
  <Route path="/" element={<DocLayout />}>
    <Route index element={<Navigate to="/login" replace />} />
    <Route path="login" element={<Login />} />
    <Route path="attendance" element={<Attendance />} />
    <Route path="leave" element={<Leave />} />
    <Route path="request" element={<Request />} />
    <Route path="approval" element={<Approval />} />
    <Route path="employee" element={<Employee />} />
  </Route>
</Routes>`,
        },
      },
      {
        heading: 'Impact on Cross-Functional Delivery',
        paragraphs: [
          'Mapping each route 1-to-1 with a real user flow made QA testing and mobile state management significantly faster.',
        ],
        bullets: [
          'Clear state transitions for Leave & Request -> Approval workflows (Pending, Approved, Rejected).',
          'Standardized authentication header and token refresh documentation on the Login entry route.',
          'Zero-config continuous deployment on Vercel whenever API contracts evolve.',
        ],
      },
    ],
  },
  {
    slug: 'clean-flutter-architecture-mvvm-riverpod-vs-bloc-pos',
    title: 'Scalable Flutter Architecture in Production: MVVM + Riverpod vs. BLoC for Retail POS',
    subtitle:
      'Practical state management patterns drawn from building SimplePOS (Firebase + BLoC) and my Flutter MVVM Riverpod Supabase starter.',
    excerpt:
      'Choosing the right state management pattern in Flutter determines how cleanly your app scales. A practical comparison from shipping real retail POS, loyalty, and starter architectures.',
    category: 'Mobile Architecture',
    publishedAt: 'September 2026',
    readTime: '7 min read',
    featured: false,
    accent: '#0284C7',
    repoName: 'husnizayyin/flutter_mvvm_riverpod',
    repoUrl: 'https://github.com/husnizayyin/flutter_mvvm_riverpod',
    tags: ['Flutter', 'Dart', 'Riverpod', 'BLoC', 'Firebase', 'Supabase', 'MVVM'],
    keyTakeaways: [
      'MVVM + Riverpod + go_router excels for rapid product bootstrapping with compile-safe dependency injection and minimal boilerplate.',
      'BLoC shines in high-concurrency enterprise retail & POS apps (like SimplePOS) where explicit event-to-state auditability is critical.',
      'Decoupling repositories from UI widgets makes switching between Firebase Firestore and Supabase PostgreSQL straightforward.',
    ],
    sections: [
      {
        heading: 'Matching State Architecture to Product Complexity',
        paragraphs: [
          'Over 5+ years of building cross-platform mobile apps—from multi-branch retail ecosystems to lightweight indie starters—one lesson stands out: there is no single silver-bullet state manager, only clear boundaries.',
          'Across two open-source repositories—flutter_mvvm_riverpod (paired with Supabase and go_router) and pos_firebase / SimplePOS (paired with BLoC and Cloud Firestore)—I refined two complementary blueprints.',
        ],
      },
      {
        heading: 'Pattern 1: MVVM + Riverpod for Fast, Type-Safe Feature Delivery',
        paragraphs: [
          'In flutter_mvvm_riverpod, Views stay purely declarative while ViewModels (Notifiers) coordinate repositories, localization, authentication, and theme state without context-tree boilerplate.',
        ],
        code: {
          filename: 'lib/features/auth/auth_viewmodel.dart',
          language: 'dart',
          snippet: `class AuthViewModel extends AsyncNotifier<UserSession?> {
  @override
  FutureOr<UserSession?> build() {
    return ref.watch(authRepositoryProvider).currentSession();
  }

  Future<void> signInWithEmail(String email, String password) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => ref.read(authRepositoryProvider).signIn(email, password),
    );
  }
}`,
        },
      },
      {
        heading: 'Pattern 2: BLoC + Firestore for Point-of-Sale Reliability',
        paragraphs: [
          'In SimplePOS (pos_firebase), store cashiers trigger rapid cart updates, stock deductions, and checkout receipts. Using BLoC enforces strict event streams so inventory state transitions never race.',
        ],
        bullets: [
          'Predictable CartEvent -> CartState transitions during barcode/item additions and stock checks.',
          'Firestore offline persistence keeps sales tracking responsive even on unstable store Wi-Fi.',
          'Clean separation between UI presentation, BLoC business rules, and Firebase data providers.',
        ],
      },
    ],
  },
  {
    slug: 'interactive-nextjs-portfolio-r3f-framer-motion-webaudio',
    title: 'Crafting a Fast Interactive Web Experience with Next.js, React Three Fiber & WebAudio',
    subtitle:
      'Engineering notes behind husnizayn.com and exploring browser-based creative tooling in ArtCraft.',
    excerpt:
      'How to combine WebGL 3D elements, Framer Motion spring transitions, Light/Dark mode theming, and zero-delay tactile UI sound effects while keeping First Load JS around 54 kB.',
    category: 'Interactive Web & 3D',
    publishedAt: 'November 2026',
    readTime: '6 min read',
    featured: false,
    accent: '#F59E0B',
    repoName: 'husnizayyin/husni-port',
    repoUrl: 'https://github.com/husnizayyin/husni-port',
    liveUrl: 'https://www.husnizayn.com',
    tags: ['Next.js', 'React Three Fiber', 'Three.js', 'Framer Motion', 'use-sound', 'Tailwind CSS'],
    keyTakeaways: [
      'Code-splitting the React Three Fiber <Canvas> with next/dynamic (ssr: false) keeps the initial Next.js route bundle lean (~54 kB).',
      'Triggering preloaded 44.1kHz PCM WAV buffers on onPointerDown via use-sound delivers instant auditory feedback without blocking the main thread.',
      'Tree-shaking icon subpaths (optimizePackageImports) dramatically accelerates both dev compilation and client bundle performance.',
    ],
    sections: [
      {
        heading: 'Balancing Visual Craft with Core Web Vitals',
        paragraphs: [
          'Interactive web applications—whether creative engines like ArtCraft (getartcraft.com) or a developer portfolio—often suffer from bloated initial bundles when WebGL and animation libraries load upfront.',
          'By rendering clean server-first typography and deferring the Three.js canvas into an isolated client boundary, users get instant Light Mode readability while the interactive 3D layer hydrates smoothly in parallel.',
        ],
      },
      {
        heading: 'Zero-Latency Tactile Audio on Pointer Down',
        paragraphs: [
          'Most web sound implementations feel sluggish because they use MP3 files with encoder lead-in padding and fire on the click event (which only triggers after pointer release).',
          'Using tiny (<10 KB) uncompressed PCM WAV samples preloaded through use-sound and firing them on onPointerDown makes buttons, tabs, and theme switches feel crisp and immediate.',
        ],
        code: {
          filename: 'src/components/ui/SoundButton.tsx',
          language: 'tsx',
          snippet: `<motion.button
  type={type}
  whileHover={{ y: -1.5 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 450, damping: 26 }}
  onPointerDown={() => playSound(soundVariant)}
  onClick={() => onClick?.()}
  className={sharedClasses}
>
  {children}
</motion.button>`,
        },
      },
      {
        heading: 'Performance Guardrails That Matter',
        paragraphs: [
          'Small architectural habits keep 60fps animations smooth across both desktop and mobile browsers:',
        ],
        bullets: [
          'Interpolate cursor movement inside R3F useFrame using THREE.MathUtils.damp instead of React useState to avoid 60Hz component re-renders.',
          'Use Framer Motion layoutId for shared-element navigation pills and category filters.',
          'Configure optimizePackageImports in next.config.mjs for icon libraries and Three.js helpers.',
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
