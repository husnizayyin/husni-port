import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { klTime } from '../lib/util';

const LOGO = ['O', 'v', 'a', 'l'];

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
        <a className="fr" href="mailto:new@oval.studio">new@oval.studio</a>
        <div className="who">
          Kuala Lumpur · <span>{clock}</span> MYT<br />Two account slots open for Q1
        </div>
      </div>
      <div className="legal">
        <span>Oval Studio</span>
        <span>One page, drawn live in your browser</span>
      </div>
    </section>
  );
}
