import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { TECH_CATEGORIES, TECH_STACK, type TechItem } from '../data/techStack';

interface InteractiveCardProps {
  item: TechItem;
}

function InteractiveTechCard({ item }: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.03,
      transformPerspective: 800,
      duration: 0.25,
      ease: 'power2.out',
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 1,
        x: x - 45,
        y: y - 45,
        duration: 0.18,
        ease: 'power1.out',
      });
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="tech-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--accent': item.color } as React.CSSProperties}
    >
      <div ref={glowRef} className="tech-card-spotlight" />
      <div className="tech-icon-wrap">
        <item.Icon className="tech-svg-icon" size={24} color={item.color} />
      </div>
      <div className="tech-info">
        <span className="tech-name">{item.name}</span>
        <span className="tech-level">{item.level}</span>
      </div>
    </div>
  );
}

export function TechStack() {
  const rootRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  const filtered = activeTab === 'all'
    ? TECH_STACK
    : TECH_STACK.filter((t) => t.category === activeTab);

  // Initial ScrollTrigger entrance
  useLayoutEffect(() => {
    const root = rootRef.current!;
    const q = gsap.utils.selector(root);

    const ctx = gsap.context(() => {
      gsap.from(q('.tech-head, .tech-tabs'), {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: root,
          start: 'top 82%',
        },
      });

      gsap.from(q('.tech-card'), {
        y: 35,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.03,
        scrollTrigger: {
          trigger: q('.tech-grid')[0],
          start: 'top 85%',
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // Snappy tab change transition
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.tech-card');
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        scale: 0.9,
        y: 15,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        stagger: 0.02,
      }
    );
  }, [activeTab]);

  return (
    <section id="tech" ref={rootRef} className="pad tech-section" aria-label="Technologies and Tooling">
      <div className="tech-head">
        <p className="eyeline"><span className="d" />Technical Ecosystem</p>
        <h2 className="fr tech-title">Languages, frameworks &<br />production tooling.</h2>
        <p className="tech-subtitle">
          5 years of hands-on architecture across Web, Mobile, Distributed Backends, and Cloud Databases.
        </p>
      </div>

      <div className="tech-tabs" role="tablist" aria-label="Filter technologies">
        {TECH_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={activeTab === c.id}
            className="tech-tab"
            onClick={() => setActiveTab(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="tech-grid" ref={gridRef} aria-live="polite">
        {filtered.map((t) => (
          <InteractiveTechCard key={t.name} item={t} />
        ))}
      </div>
    </section>
  );
}
