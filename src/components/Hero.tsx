import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/util';

/**
 * Section 00 (Hero / Section 1). Editorial Details on Right.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const q = gsap.utils.selector(root);
    const reduce = prefersReducedMotion();
    const content = q('.hero-content-right');
    const items = q('.hero-eyebrow, .hero-name, .hero-role, .hero-desc, .hero-pills, .scrollcue');

    const mm = gsap.matchMedia(root);

    mm.add('(min-width: 1025px)', () => {
      if (reduce) {
        gsap.set(items, { opacity: 1, y: 0, x: 0 });
      } else {
        gsap.set(items, { opacity: 0, y: 22 });

        gsap.timeline({ delay: 0.12 })
          .to(items, { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out', stagger: 0.08 }, 0.25);

        // Scroll cue pulsing animation
        gsap.timeline({ repeat: -1, repeatDelay: 0.7, delay: 2.2 })
          .to(q('.cue'), { y: 7, duration: 0.5, ease: 'sine.inOut' })
          .to(q('.cue'), { y: 0, duration: 0.7, ease: 'elastic.out(1,.45)' });
      }

      // Smooth parallax transition when scrolling away from Section 1
      gsap.timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.5 } })
        .to(content, { y: -50, opacity: 0, ease: 'none', duration: 1 }, 0);
    });

    mm.add('(max-width: 1024px)', () => {
      gsap.set(items, { opacity: 1, y: 0, x: 0, scale: 1 });
      gsap.from(items, { opacity: 0, y: 15, duration: 0.7, stagger: 0.06, delay: 0.15, ease: 'power2.out' });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="hero" ref={rootRef} aria-label="Husni Zayyin Ansori, Software Engineer in Jakarta">
      <div className="hero-split-grid">
        <div className="hero-content-right">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            <span>SOFTWARE ENGINEER & SYSTEM ARCHITECT</span>
          </div>

          <h1 className="hero-name fr">Husni Zayyin Ansori</h1>
          
          <p className="hero-role">Based in Jakarta, Indonesia · Available for Engineering Roles</p>

          <p className="hero-desc">
            <b>Results-driven Software Engineer</b> architecting scalable web & mobile systems bridging complex back-end logic
            with high-performance interfaces (Next.js, Flutter, React, Laravel, PostgreSQL).
          </p>

          <div className="hero-pills">
            <span className="hero-pill">5+ Years Experience</span>
            <span className="hero-pill">Full-Stack & Mobile Core</span>
            <span className="hero-pill">Jakarta (UTC+7)</span>
          </div>

          <div className="scrollcue">
            <span className="cue" />
            <span>Scroll down to explore journey</span>
          </div>
        </div>
      </div>
    </section>
  );
}
