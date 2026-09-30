import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { SiGithub, SiDart, SiTypescript, SiJavascript, SiPython, SiPhp, SiSwift } from 'react-icons/si';
import { TbGitFork, TbStar, TbExternalLink, TbSearch, TbCode, TbFolder } from 'react-icons/tb';
import { gsap } from '../lib/gsap';

export interface Repository {
  name: string;
  description: string;
  language: string;
  category: 'All' | 'Mobile' | 'Frontend' | 'Backend' | 'AI & Python';
  stars: number;
  forks: number;
  topics: string[];
  html_url: string;
  homepage?: string | null;
  updated_at: string;
}

const CURATED_REPOSITORIES: Repository[] = [
  {
    name: 'husni-port',
    description: 'High-performance personal engineering portfolio built with Vite, React, TypeScript, GSAP ScrollTrigger, and custom token aesthetics.',
    language: 'TypeScript',
    category: 'Frontend',
    stars: 1,
    forks: 0,
    topics: ['react', 'typescript', 'gsap', 'portfolio', 'vite'],
    html_url: 'https://github.com/husnizayyin/husni-port',
    homepage: 'https://husnizayyin.github.io',
    updated_at: '2026-09-30',
  },
  {
    name: 'flutter_mvvm_riverpod',
    description: 'Production-ready Flutter architecture template implementing Clean Architecture, MVVM design pattern, and Riverpod 2.0 reactive state management.',
    language: 'Dart',
    category: 'Mobile',
    stars: 2,
    forks: 1,
    topics: ['flutter', 'riverpod', 'mvvm', 'clean-architecture', 'dart'],
    html_url: 'https://github.com/husnizayyin/flutter_mvvm_riverpod',
    updated_at: '2024-12-12',
  },
  {
    name: 'mymirror',
    description: 'Smart IoT Mirror client mobile app built with Flutter, interfacing with smart home hub hardware for telemetry and scheduled routines.',
    language: 'Dart',
    category: 'Mobile',
    stars: 0,
    forks: 0,
    topics: ['flutter', 'iot', 'smart-mirror', 'mobile-app'],
    html_url: 'https://github.com/husnizayyin/mymirror',
    updated_at: '2026-09-02',
  },
  {
    name: 'pos_firebase',
    description: 'Full-featured Point of Sale (POS) and inventory management mobile application backed by Firebase Firestore, Cloud Auth, and offline cache.',
    language: 'Dart',
    category: 'Mobile',
    stars: 1,
    forks: 0,
    topics: ['flutter', 'firebase', 'pos', 'inventory', 'firestore'],
    html_url: 'https://github.com/husnizayyin/pos_firebase',
    updated_at: '2025-11-27',
  },
  {
    name: 'weather_apps',
    description: 'Real-time weather radar and forecasting mobile application with dynamic location tracking, OpenWeatherMap API, and weather animations.',
    language: 'Dart',
    category: 'Mobile',
    stars: 0,
    forks: 0,
    topics: ['flutter', 'weather-app', 'api-integration', 'geolocation'],
    html_url: 'https://github.com/husnizayyin/weather_apps',
    updated_at: '2025-10-25',
  },
  {
    name: 'Documentation-MalikaGoApp',
    description: 'Technical architecture specification, REST API schema, and integration documentation for MalikaGo logistics and delivery system.',
    language: 'JavaScript',
    category: 'Frontend',
    stars: 0,
    forks: 0,
    topics: ['documentation', 'api-docs', 'logistics', 'javascript'],
    html_url: 'https://github.com/husnizayyin/Documentation-MalikaGoApp',
    updated_at: '2025-12-06',
  },
  {
    name: 'Python-Liriklagu',
    description: 'Automated web crawler and Natural Language Processing (NLP) text analyzer for Indonesian and international song lyrics extraction.',
    language: 'Python',
    category: 'AI & Python',
    stars: 1,
    forks: 2,
    topics: ['python', 'nlp', 'scraping', 'jupyter-notebook'],
    html_url: 'https://github.com/husnizayyin/Python-Liriklagu',
    updated_at: '2025-11-27',
  },
  {
    name: 'Cargoku',
    description: 'Enterprise cargo management and parcel freight dispatch tracking web platform featuring multi-tenant dashboards and invoice generation.',
    language: 'PHP',
    category: 'Backend',
    stars: 1,
    forks: 0,
    topics: ['php', 'cargo', 'freight-system', 'mysql', 'logistics'],
    html_url: 'https://github.com/husnizayyin/Cargoku',
    updated_at: '2025-04-20',
  },
  {
    name: 'AirBook',
    description: 'Native iOS flight discovery and passenger booking app prototype built with Swift and SwiftUI with responsive ticketing seat map UI.',
    language: 'Swift',
    category: 'Mobile',
    stars: 0,
    forks: 0,
    topics: ['swift', 'swiftui', 'ios-app', 'flight-booking'],
    html_url: 'https://github.com/husnizayyin/AirBook',
    updated_at: '2023-12-15',
  },
  {
    name: 'pythonProject_face_recognition',
    description: 'Real-time biometric facial recognition and identity verification system utilizing OpenCV, deep metric embeddings, and webcam streaming.',
    language: 'Python',
    category: 'AI & Python',
    stars: 0,
    forks: 0,
    topics: ['python', 'opencv', 'computer-vision', 'face-recognition'],
    html_url: 'https://github.com/husnizayyin/pythonProject_face_recognition',
    updated_at: '2024-08-05',
  },
  {
    name: 'Archangel-Digital-Studios-Website',
    description: 'Corporate studio web presence built with responsive UI architecture, showcasing interactive portfolio showcases and creative services.',
    language: 'HTML',
    category: 'Frontend',
    stars: 0,
    forks: 0,
    topics: ['web-design', 'landing-page', 'creative-studio'],
    html_url: 'https://github.com/husnizayyin/Archangel-Digital-Studios-Website',
    updated_at: '2026-09-18',
  },
  {
    name: 'craft.js',
    description: 'Extensible page builder framework fork featuring customized component dragging, live property inspectors, and canvas state serializer.',
    language: 'TypeScript',
    category: 'Frontend',
    stars: 0,
    forks: 0,
    topics: ['react', 'page-builder', 'drag-and-drop', 'typescript'],
    html_url: 'https://github.com/husnizayyin/craft.js',
    updated_at: '2025-10-18',
  },
];

const CATEGORIES = ['All', 'Mobile', 'Frontend', 'Backend', 'AI & Python'] as const;

export function Repositories() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [repos, setRepos] = useState<Repository[]>(CURATED_REPOSITORIES);

  // Fetch live repos from GitHub API to complement curated data
  useEffect(() => {
    let isMounted = true;
    async function fetchLiveRepos() {
      try {
        const res = await fetch('https://api.github.com/users/husnizayyin/repos?sort=updated&per_page=30');
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && Array.isArray(data)) {
          // Merge API data with curated metadata
          const merged = CURATED_REPOSITORIES.map((cur) => {
            const match = data.find((r: { name: string }) => r.name.toLowerCase() === cur.name.toLowerCase());
            if (match) {
              return {
                ...cur,
                stars: match.stargazers_count ?? cur.stars,
                forks: match.forks_count ?? cur.forks,
                description: cur.description || match.description || 'Public GitHub repository.',
                updated_at: match.updated_at ? match.updated_at.split('T')[0] : cur.updated_at,
              };
            }
            return cur;
          });
          setRepos(merged);
        }
      } catch {
        // Keep curated on offline
      }
    }
    fetchLiveRepos();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter repos by category and search query
  const filteredRepos = useMemo(() => {
    return repos.filter((r) => {
      const matchCat = selectedCategory === 'All' || r.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.language?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [repos, selectedCategory, searchQuery]);

  // Entrance animation
  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);

    const ctx = gsap.context(() => {
      gsap.from(q('.repo-head, .repo-filter-bar'), {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
        },
      });

      gsap.from(q('.repo-card'), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: q('.repo-grid')[0],
          start: 'top 85%',
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // Micro animation on filter change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.repo-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 15, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out', stagger: 0.04 }
    );
  }, [selectedCategory, searchQuery]);

  return (
    <section id="repos" ref={sectionRef} className="pad repo-section" aria-label="Open Source & GitHub Repositories">
      <div className="repo-head">
        <div className="repo-badge">
          <SiGithub size={15} />
          <span>OPEN-SOURCE & CODE ARTIFACTS</span>
        </div>
        <h2 className="fr repo-title">Public Repositories &<br />Production Architecture.</h2>
        <p className="repo-subtitle">
          Curated selection of open-source architectures, mobile state management templates, full-stack systems, and telemetry tools authored by Husni Zayyin.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="repo-filter-bar">
        <div className="repo-categories-list" role="tablist">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              className="repo-category-btn"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
              {cat === 'All' ? ` (${repos.length})` : ` (${repos.filter((r) => r.category === cat).length})`}
            </button>
          ))}
        </div>

        <div className="repo-search-box">
          <TbSearch size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search repos by name, tech or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="repo-search-input"
          />
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="repo-grid" ref={gridRef}>
        {filteredRepos.length === 0 ? (
          <div className="repo-empty-state">
            <TbFolder size={32} />
            <span>No repositories match your search query "{searchQuery}"</span>
          </div>
        ) : (
          filteredRepos.map((repo) => (
            <div key={repo.name} className="repo-card">
              <div className="repo-card-top">
                <div className="repo-name-group">
                  <div className="repo-icon">
                    {getLanguageIcon(repo.language)}
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-link"
                    title={`Open ${repo.name} on GitHub`}
                  >
                    <span className="repo-name">{repo.name}</span>
                    <TbExternalLink size={14} className="repo-ext-icon" />
                  </a>
                </div>

                <div className="repo-meta-stats">
                  {repo.stars > 0 && (
                    <span className="repo-stat" title="Stars">
                      <TbStar size={13} />
                      <span>{repo.stars}</span>
                    </span>
                  )}
                  {repo.forks > 0 && (
                    <span className="repo-stat" title="Forks">
                      <TbGitFork size={13} />
                      <span>{repo.forks}</span>
                    </span>
                  )}
                </div>
              </div>

              <p className="repo-desc">{repo.description}</p>

              <div className="repo-topics-list">
                {repo.topics.slice(0, 4).map((t) => (
                  <span key={t} className="repo-topic-pill">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="repo-card-foot">
                <div className="repo-lang-badge">
                  <span className="repo-lang-dot" style={{ background: getLanguageColor(repo.language) }} />
                  <span>{repo.language || 'Code'}</span>
                </div>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-action-btn"
                >
                  <SiGithub size={13} />
                  <span>View Code</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function getLanguageIcon(lang: string) {
  switch (lang) {
    case 'TypeScript':
      return <SiTypescript size={18} style={{ color: '#3178C6' }} />;
    case 'Dart':
      return <SiDart size={18} style={{ color: '#00B4AB' }} />;
    case 'JavaScript':
      return <SiJavascript size={18} style={{ color: '#F7DF1E' }} />;
    case 'Python':
      return <SiPython size={18} style={{ color: '#3572A5' }} />;
    case 'PHP':
      return <SiPhp size={20} style={{ color: '#777BB4' }} />;
    case 'Swift':
      return <SiSwift size={18} style={{ color: '#F05138' }} />;
    default:
      return <TbCode size={18} style={{ color: '#26A641' }} />;
  }
}

function getLanguageColor(lang: string): string {
  switch (lang) {
    case 'TypeScript':
      return '#3178C6';
    case 'Dart':
      return '#00B4AB';
    case 'JavaScript':
      return '#F7DF1E';
    case 'Python':
      return '#3572A5';
    case 'PHP':
      return '#4F5D95';
    case 'Swift':
      return '#F05138';
    case 'HTML':
      return '#E34F26';
    default:
      return '#26A641';
  }
}
