import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { ellipsePoint, prefersReducedMotion } from '../lib/util';

const LOGO = ['O', 'v', 'a', 'l'];

/** Section 00. The ellipse draws itself with a dot, then the wordmark rises out of it. */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const ellRef = useRef<SVGEllipseElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const ell = ellRef.current!;
    const dot = dotRef.current!;
    const q = gsap.utils.selector(root);
    const reduce = prefersReducedMotion();
    const chars = q('.hero-word .ch');
    const late = q('.hero-say, .hero-foot > p, .scrollcue');
    const len = ell.getTotalLength();

    const ctx = gsap.context(() => {
      gsap.set(ell, { strokeDasharray: len, strokeDashoffset: len });

      if (reduce) {
        gsap.set(ell, { strokeDashoffset: 0 });
        gsap.set([...chars, ...late], { opacity: 1, y: 0 });
      } else {
        gsap.set(chars, { yPercent: 105, opacity: 0, '--s': 100, '--fw': 300 });
        gsap.set(late, { opacity: 0, y: 16 });
        const p = { t: 0 };
        gsap.timeline({ delay: 0.12 })
          .to(ell, { strokeDashoffset: 0, duration: 1.9, ease: 'power2.inOut' }, 0)
          .to(p, {
            t: 1, duration: 1.9, ease: 'power2.inOut',
            onUpdate() {
              const [x, y] = ellipsePoint(500, 240, 480, 215, p.t * Math.PI * 2);
              dot.setAttribute('cx', String(x));
              dot.setAttribute('cy', String(y));
            },
          }, 0)
          .to(dot, { attr: { r: 0 }, duration: 0.35, ease: 'power2.in' }, 1.78)
          .to(chars, { yPercent: 0, opacity: 1, '--s': 20, '--fw': 600, duration: 1.3, ease: 'expo.out', stagger: 0.07 }, 0.62)
          .to(late, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07 }, 1.05);

        // Scroll cue: the orange dot bobs, then springs back
        gsap.timeline({ repeat: -1, repeatDelay: 0.7, delay: 2.4 })
          .to(q('.cue'), { y: 7, duration: 0.5, ease: 'sine.inOut' })
          .to(q('.cue'), { y: 0, duration: 0.7, ease: 'elastic.out(1,.45)' });
      }

      // Scrolling away: ring swells and fades, letters lift off, copy drifts up
      gsap.timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.5 } })
        .to(q('.ring'), { scale: 1.42, opacity: 0, ease: 'none', duration: 1 }, 0)
        .to(chars, { yPercent: -34, opacity: 0, ease: 'none', stagger: 0.04, duration: 1 }, 0)
        .to(q('.hero-say, .hero-foot'), { y: -50, opacity: 0, ease: 'none', duration: 1 }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={rootRef} aria-label="Oval, a digital marketing studio">
      <div className="ring" aria-hidden="true">
        <svg viewBox="0 0 1000 480">
          <ellipse ref={ellRef} cx="500" cy="240" rx="480" ry="215" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
          <circle ref={dotRef} cx="980" cy="240" r="9" fill="var(--paid)" />
        </svg>
      </div>
      <div className="hero-mid">
        <h1 className="hero-word fr">
          {LOGO.map((c, i) => (
            <span key={i} className="ch fr">{c}</span>
          ))}
        </h1>
        <p className="hero-say">A digital marketing studio</p>
      </div>
      <div className="hero-foot">
        <p>
          <b>We buy attention carefully and compound what we earn.</b> Paid, organic, lifecycle — planned as one
          system, reported in one number.
        </p>
        <div className="scrollcue">
          <span className="cue" />
          <span>Scroll to run the film</span>
        </div>
      </div>
    </section>
  );
}
