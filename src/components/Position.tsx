import { Fragment, useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

const CLAIM =
  'Architecting end-to-end systems that bridge the gap between complex back-end logic and high-performance user interfaces.';
const WORDS = CLAIM.split(/\s+/);

const PILLARS = [
  {
    title: 'Full-Stack & Web Systems',
    body: 'Next.js, React, and PostgreSQL. Developing end-to-end applications with robust API structures, high performance, and seamless system integrations.',
  },
  {
    title: 'Cross-Platform Mobile Core',
    body: 'Flutter (BLOC & GetX) and Kotlin. Delivering production-grade mobile applications with native-like fluidity across iOS and Android.',
  },
  {
    title: 'Platform & Cloud Integrations',
    body: 'Custom Shopify (Liquid) and Wix Studio (Velo) engineering, paired with Linux headless CLI tooling, Firebase, and relational databases.',
  },
];

/** Section 01. The statement lights up word by word as you scroll (scrubbed, not a fade-in on entry). */
export function Position() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia(root);

    mm.add('(min-width: 1025px)', () => {
      gsap.to(q('.claim .wd'), {
        opacity: 1, ease: 'none', stagger: 0.5,
        scrollTrigger: { trigger: root, start: 'top 74%', end: 'bottom 80%', scrub: 0.4 },
      });
      gsap.from(q('.cols article'), {
        y: 30, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1,
        scrollTrigger: { trigger: q('.cols')[0], start: 'top 88%' },
      });
    });

    mm.add('(max-width: 1024px)', () => {
      gsap.set(q('.claim .wd'), { opacity: 1 });
      gsap.from(q('.cols article'), {
        y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08,
        scrollTrigger: { trigger: q('.cols')[0], start: 'top 90%' },
      });
    });

    return () => mm.revert();
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
