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
    const ctx = gsap.context(() => {
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
        gsap.fromTo(card.querySelector('figure svg'), { xPercent: -5, opacity: 0.75 }, {
          xPercent: 5, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: card, containerAnimation: across, start: 'left right', end: 'right left', scrub: 0.6 },
        });
      });
    }, section);
    return () => ctx.revert();
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
              <header>
                <span>{w.name}</span>
                <span className="pill" style={{ background: w.color, color: w.pillText ?? '#FBFBF8' }}>{w.tag}</span>
              </header>
              <h3 className="fr">{w.title}</h3>
              <figure><WorkChart kind={w.chart} color={w.color} /></figure>
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
