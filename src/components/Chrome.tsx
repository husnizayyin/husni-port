import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '../lib/gsap';
import { scrollToY } from '../lib/scroll';
import { NAV, SECTIONS } from '../data/sections';

const RING_LEN = 2 * Math.PI * 15;

function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  scrollToY(Math.min(maxY, el.offsetTop), 1100);
}

/**
 * Persistent UI: brand + nav (top), dot rail (right edge), progress ring (bottom left).
 * Progress is written to the ring imperatively on scroll; React state only changes when
 * the active section changes, so scrolling does not re-render.
 */
export function Chrome() {
  const [active, setActive] = useState(0);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let tops: number[] = [];
    let maxY = 1;
    let current = -1;

    const measure = () => {
      tops = SECTIONS.map((s) => document.getElementById(s.id)?.offsetTop ?? 0);
      maxY = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      update();
    };
    const update = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / maxY));
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(RING_LEN * (1 - p));
      let idx = 0;
      for (let i = 0; i < tops.length; i++) if (window.scrollY + window.innerHeight * 0.42 >= tops[i]) idx = i;
      if (idx !== current) {
        current = idx;
        setActive(idx);
      }
    };

    measure();
    ScrollTrigger.addEventListener('refresh', measure);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      ScrollTrigger.removeEventListener('refresh', measure);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <>
      <header className="top">
        <div className="brand">
          <svg width="22" height="15" viewBox="0 0 22 15" aria-hidden="true">
            <ellipse cx="11" cy="7.5" rx="10" ry="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          Oval
        </div>
        <nav className="nav" aria-label="Sections">
          {NAV.map((n) => (
            <button key={n.id} type="button" aria-current={SECTIONS[active].id === n.id} onClick={() => jumpTo(n.id)}>
              {n.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="rail" aria-label="Jump to section">
        {SECTIONS.map((s, i) => (
          <button key={s.id} type="button" title={s.label} aria-label={s.label} aria-current={i === active} onClick={() => jumpTo(s.id)} />
        ))}
      </div>

      <div className="meter" aria-hidden="true">
        <svg width="34" height="34" viewBox="0 0 34 34">
          <circle cx="17" cy="17" r="15" fill="none" stroke="rgba(14,59,46,.16)" strokeWidth="2.5" />
          <circle
            ref={ringRef} cx="17" cy="17" r="15" fill="none" stroke="#FF5C1A" strokeWidth="2.5" strokeLinecap="round"
            transform="rotate(-90 17 17)" strokeDasharray={RING_LEN} style={{ strokeDashoffset: RING_LEN }}
          />
        </svg>
        <div className="lab">
          <span>{SECTIONS[active].label}</span>
          <i>{String(active).padStart(2, '0')} of {String(SECTIONS.length - 1).padStart(2, '0')}</i>
        </div>
      </div>
    </>
  );
}
