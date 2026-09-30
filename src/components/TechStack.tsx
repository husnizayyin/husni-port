import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { TECH_CATEGORIES, TECH_STACK, type TechItem } from '../data/techStack';

interface InteractiveCardProps {
  item: TechItem;
  index: number;
}

function InteractiveTechCard({ item, index }: InteractiveCardProps) {
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

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.04,
      transformPerspective: 900,
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
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`tech-card ${index % 2 === 0 ? 'card-even' : 'card-odd'}`}
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

  // Full ScrollTrigger setup with continuous scrub & batch reveals
  useLayoutEffect(() => {
    const root = rootRef.current!;
    const grid = gridRef.current!;
    const q = gsap.utils.selector(root);

    const ctx = gsap.context(() => {
      // 1. Header & Tabs ScrollTrigger entrance
      gsap.from(q('.tech-head > *'), {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 85%',
        },
      });

      gsap.from(q('.tech-tabs button'), {
        scale: 0.85,
        opacity: 0,
        stagger: 0.04,
        duration: 0.6,
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: q('.tech-tabs')[0],
          start: 'top 88%',
        },
      });

      // 2. Parallax floating drift tied to continuous scroll scrub
      gsap.fromTo(
        q('.card-even'),
        { y: 25 },
        {
          y: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: grid,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        q('.card-odd'),
        { y: -15 },
        {
          y: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: grid,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      // 3. Batch card reveal with 3D rotation
      ScrollTrigger.batch(q('.tech-card'), {
        start: 'top 92%',
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 35, scale: 0.92, rotateX: 10 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 0.75,
              ease: 'power3.out',
              stagger: 0.04,
              overwrite: 'auto',
            }
          );
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            opacity: 0.2,
            y: 20,
            scale: 0.94,
            duration: 0.5,
            ease: 'power2.in',
            stagger: 0.02,
            overwrite: 'auto',
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // Snappy tab change animation
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.tech-card');
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        scale: 0.86,
        y: 18,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.42,
        ease: 'back.out(1.5)',
        stagger: {
          amount: 0.22,
          from: 'start',
        },
      }
    );
    ScrollTrigger.refresh();
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
        {filtered.map((t, idx) => (
          <InteractiveTechCard key={t.name} item={t} index={idx} />
        ))}
      </div>
    </section>
  );
}
