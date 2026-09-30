import { Fragment, useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

const CLAIM =
  'Code is easy to write. Resilient, performant, and maintainable software architecture is what endures.';
const WORDS = CLAIM.split(/\s+/);

const PILLARS = [
  {
    title: 'Frontend & Modern Web',
    body: 'React, Next.js, and TypeScript. Architecting fluid SPAs/MPAs with SSR, optimized state trees, and responsive design systems.',
  },
  {
    title: 'Cross-Platform Mobile',
    body: 'Flutter, React Native, Kotlin, and native Java. Delivering production-grade iOS & Android applications with native-feel performance.',
  },
  {
    title: 'Backend & Enterprise Data',
    body: 'Laravel, PHP, Java, Kotlin services paired with PostgreSQL, MySQL, SQL Server, MongoDB, and Oracle databases for scale.',
  },
];

/** Section 01. The statement lights up word by word as you scroll (scrubbed, not a fade-in on entry). */
export function Position() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const q = gsap.utils.selector(root);
    const ctx = gsap.context(() => {
      gsap.to(q('.claim .wd'), {
        opacity: 1, ease: 'none', stagger: 0.5,
        scrollTrigger: { trigger: root, start: 'top 74%', end: 'bottom 80%', scrub: 0.4 },
      });
      gsap.from(q('.cols article'), {
        y: 30, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1,
        scrollTrigger: { trigger: q('.cols')[0], start: 'top 88%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="position" ref={rootRef} className="pad">
      <p className="eyeline"><span className="d" />Specialization & Craft</p>
      <h2 className="claim fr">
        {WORDS.map((w, i) => (
          <Fragment key={i}>
            <span className="wd">{w}</span>
            {i < WORDS.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </h2>
      <div className="cols">
        {PILLARS.map((p) => (
          <article key={p.title}>
            <h3 className="fr">{p.title}</h3>
            <p>{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
