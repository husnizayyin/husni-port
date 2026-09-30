import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { TECH_CATEGORIES, TECH_STACK } from '../data/techStack';

export function TechStack() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  const filtered = activeTab === 'all'
    ? TECH_STACK
    : TECH_STACK.filter((t) => t.category === activeTab);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const q = gsap.utils.selector(root);
    const ctx = gsap.context(() => {
      gsap.from(q('.tech-head, .tech-tabs'), {
        y: 30, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1,
        scrollTrigger: { trigger: root, start: 'top 80%' },
      });
      gsap.from(q('.tech-card'), {
        y: 25, opacity: 0, duration: 0.7, ease: 'expo.out', stagger: 0.03,
        scrollTrigger: { trigger: q('.tech-grid')[0], start: 'top 85%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

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

      <div className="tech-grid" aria-live="polite">
        {filtered.map((t) => (
          <div className="tech-card" key={t.name}>
            <div className="tech-icon-wrap" style={{ '--accent': t.color } as React.CSSProperties}>
              <div
                className="tech-icon"
                dangerouslySetInnerHTML={{ __html: t.iconSvg }}
              />
            </div>
            <div className="tech-info">
              <span className="tech-name">{t.name}</span>
              <span className="tech-level">{t.level}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
