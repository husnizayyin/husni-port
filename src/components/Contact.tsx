import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { klTime } from '../lib/util';

const LOGO = ['H', 'u', 's', 'n', 'i'];

/** Section 06. The ellipse draws itself as you arrive and the wordmark rises inside it. */
export function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const ellRef = useRef<SVGEllipseElement>(null);
  const [clock, setClock] = useState(klTime);

  useEffect(() => {
    const id = window.setInterval(() => setClock(klTime()), 20000);
    return () => window.clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const ell = ellRef.current!;
    const q = gsap.utils.selector(root);
    const len = ell.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.set(ell, { strokeDasharray: len, strokeDashoffset: len });
      gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 84%', end: 'top 26%', scrub: 0.5 } })
        .to(ell, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)
        .fromTo(q('.endmark .ch'), { yPercent: 100, opacity: 0, '--s': 100 }, {
          yPercent: 0, opacity: 1, '--s': 20, ease: 'none', duration: 0.7, stagger: 0.08,
        }, 0.2);
      gsap.from(q('.cta > *'), {
        y: 26, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.09,
        scrollTrigger: { trigger: q('.cta')[0], start: 'top 92%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={rootRef} className="pad" aria-label="Contact">
      <div className="endmark">
        <svg viewBox="0 0 1000 400" aria-hidden="true">
          <ellipse ref={ellRef} cx="500" cy="200" rx="470" ry="175" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
        </svg>
        <div className="w fr">
          {LOGO.map((c, i) => (
            <span key={i} className="ch fr">{c}</span>
          ))}
        </div>
      </div>
      <div className="cta">
        <a className="fr" href="mailto:husnizayyin@gmail.com">husnizayyin@gmail.com</a>
        <div className="who">
          Indonesia (UTC+7) · <span>{clock}</span> WIB<br />Open for Software Engineering Roles & Collaboration
        </div>
      </div>
      <div className="social-links" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '13.5px', fontWeight: 600 }}>
        <a href="https://github.com/husnizayyin" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', borderBottom: '1px solid var(--hair)', paddingBottom: '3px', color: 'var(--ink)' }}>
          GitHub (25+ Repos) ↗
        </a>
        <a href="https://t.me/husnizayn" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', borderBottom: '1px solid var(--hair)', paddingBottom: '3px', color: 'var(--ink)' }}>
          Telegram (@husnizayn) ↗
        </a>
        <a href="https://x.com/husnizayn" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', borderBottom: '1px solid var(--hair)', paddingBottom: '3px', color: 'var(--ink)' }}>
          X / Twitter (@husnizayn) ↗
        </a>
      </div>
      <div className="legal">
        <span>Husni Zayyin Ansori · Software Engineer</span>
        <span>5 Years Experience · React, Next.js, Flutter, React Native, Laravel, Java, Kotlin, Databases</span>
      </div>
    </section>
  );
}
