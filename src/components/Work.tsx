import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { WORK } from '../data/work';
import { WorkChart } from './WorkChart';

/**
 * Section 03. The section pins and the card row translates sideways.
 * Each card also has its own trigger tied to that horizontal motion (containerAnimation),
 * so it rises in and its chart drifts against it as it crosses the screen.
 */
export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current!;
    const track = trackRef.current!;
    const mm = gsap.matchMedia(section);

    mm.add('(min-width: 1025px)', () => {
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const across = gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + (dist() + window.innerHeight * 0.15),
          pin: pinRef.current,
          anticipatePin: 1,
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
      track.querySelectorAll<HTMLElement>('.wcard').forEach((card) => {
        gsap.from(card, {
          yPercent: 8, opacity: 0.3, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: card, containerAnimation: across, start: 'left 96%', end: 'left 56%', scrub: 0.5 },
        });
        gsap.fromTo(card.querySelector('.wcard-growth figure svg'), { xPercent: -5, opacity: 0.8 }, {
          xPercent: 5, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: card, containerAnimation: across, start: 'left right', end: 'right left', scrub: 0.6 },
        });
      });
    });

    mm.add('(max-width: 1024px)', () => {
      // Tablet & Mobile: No pinning, natural vertical card flow with lightweight entrance
      gsap.set(track, { clearProps: 'all' });
      gsap.from(track.querySelectorAll('.wcard'), {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: track,
          start: 'top 85%',
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} aria-label="Professional Experience & Impact">
      <div className="hpin" ref={pinRef}>
        <div className="htrack" ref={trackRef}>
          <div className="wintro">
            <p className="eyeline"><span className="d" />Career & Milestones</p>
            <h2 className="fr">5 years of shipping,<br />solving complex scale.</h2>
            <p>From enterprise retail transactions to mobile platforms and distributed databases. Scroll horizontally to explore.</p>
          </div>

          {WORK.map((w) => (
            <article className="wcard" key={w.name}>
              <header className="wcard-head">
                <div className="wcard-meta">
                  <span className="wcard-company">{w.name}</span>
                  <div className="wcard-submeta">
                    <span className="wcard-period">{w.period}</span>
                    <span className="wcard-sep" aria-hidden="true">•</span>
                    <span className="wcard-loc">{w.location}</span>
                  </div>
                </div>
                <span className="pill" style={{ background: w.color, color: w.pillText ?? '#FBFBF8' }}>
                  {w.role}
                </span>
              </header>

              <div className="wcard-body">
                <h3 className="fr">{w.title}</h3>
                <p className="wcard-desc">{w.desc}</p>

                {w.products && w.products.length > 0 && (
                  <div className="wcard-products">
                    <span className="wcard-products-label">Key Deliverables</span>
                    <div className="wcard-product-chips">
                      {w.products.map((p) => (
                        <div className="product-chip" key={p.name} title={p.desc}>
                          <span className="p-name">{p.name}</span>
                          <span className="p-tech">{p.tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack used in this company */}
                <div className="wcard-stack-box">
                  <span className="wcard-stack-label">Tech Stack & Tools</span>
                  <div className="wcard-stack-chips">
                    {w.techStack.map((t) => (
                      <div className="stack-pill" key={t.name} style={{ '--accent-c': t.color } as React.CSSProperties}>
                        <span className="stack-pill-icon">
                          <t.Icon size={14} color={t.color} />
                        </span>
                        <span className="stack-pill-name">{t.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Growth Graph & Sparkline */}
              <div className="wcard-growth">
                <div className="growth-meta">
                  <span className="growth-dot" style={{ background: w.color }} />
                  <span className="growth-title">Engineering Velocity & Scale</span>
                  <span className="growth-badge" style={{ color: w.color, background: `${w.color}14` }}>
                    {w.growthLabel}
                  </span>
                </div>
                <figure>
                  <WorkChart kind={w.chart} color={w.color} />
                </figure>
              </div>

              <div className="stats">
                {w.stats.map(([value, label]) => (
                  <div key={label}>
                    <b className="fr num">{value}</b>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}

          <div className="wend">
            <p className="fr">Ready to elevate your engineering velocity? Let's build together.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
