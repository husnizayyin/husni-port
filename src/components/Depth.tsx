import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

/** Section 04. Three concentric ellipses drift at three speeds: depth is just disagreement about velocity. */
export function Depth() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia(root);

    mm.add('(min-width: 1025px)', () => {
      gsap.timeline({ scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.5 } })
        .fromTo(q('.o1'), { yPercent: 16, scale: 0.94 }, { yPercent: -16, scale: 1.06, ease: 'none', duration: 1 }, 0)
        .fromTo(q('.o2'), { yPercent: 44, rotate: -5 }, { yPercent: -44, rotate: 5, ease: 'none', duration: 1 }, 0)
        .fromTo(q('.o3'), { yPercent: 92, xPercent: -14 }, { yPercent: -92, xPercent: 14, ease: 'none', duration: 1 }, 0)
        .fromTo(q('.dsay'), { yPercent: 12 }, { yPercent: -12, ease: 'none', duration: 1 }, 0);
      gsap.from(q('.dsay'), {
        opacity: 0, scale: 0.95, duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: root, start: 'top 56%' },
      });
    });

    mm.add('(max-width: 1024px)', () => {
      gsap.set(q('.o1, .o2, .o3, .dsay'), { clearProps: 'all' });
      gsap.from(q('.dsay'), {
        opacity: 0, y: 20, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: root, start: 'top 70%' },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="depth" ref={rootRef} aria-label="Engineering Philosophy">
      <div className="dpin">
        <div className="orb o1" aria-hidden="true" />
        <div className="orb o2" aria-hidden="true" />
        <div className="orb o3" aria-hidden="true" />
        <h2 className="dsay fr">Tools evolve quickly. <em>Sound architecture endures.</em></h2>
        <div className="dfoot">
          <span>Frontend · Mobile · Full Stack · Data Architecture</span>
          <span>5 Years of Crafting Resilient Systems</span>
        </div>
      </div>
    </section>
  );
}
