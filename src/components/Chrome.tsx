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
 * Persistent UI: brand + nav (top), mobile menu drawer, dot rail (right edge), progress ring (bottom left).
 * Progress is written to the ring imperatively on scroll; React state only changes when
 * the active section changes, so scrolling does not re-render.
 */
export function Chrome() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    jumpTo(id);
  };

  return (
    <>
      <header className="top">
        <button
          className="brand brand-btn"
          type="button"
          onClick={() => handleNavClick('hero')}
          aria-label="Scroll to top"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <rect width="24" height="24" rx="6" fill="var(--ink)" />
            <text x="12" y="16" fill="var(--paid)" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--g)">HZ</text>
          </svg>
          Husni Zayyin
        </button>

        {/* Desktop Navigation */}
        <nav className="nav desktop-nav" aria-label="Sections">
          {NAV.map((n) => (
            <button key={n.id} type="button" aria-current={SECTIONS[active].id === n.id} onClick={() => handleNavClick(n.id)}>
              {n.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className="mobile-nav-toggle"
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
        >
          <span className={`toggle-icon ${menuOpen ? 'open' : ''}`}>
            <span className="toggle-line" />
            <span className="toggle-line" />
            <span className="toggle-line" />
          </span>
          <span className="toggle-label">{menuOpen ? 'Close' : 'Menu'}</span>
        </button>
      </header>

      {/* Mobile Navigation Drawer & Backdrop */}
      <div
        className={`mobile-menu-backdrop ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />
      <div
        className={`mobile-menu-drawer ${menuOpen ? 'active' : ''}`}
        aria-label="Mobile Navigation"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-head">
          <div className="mobile-menu-title">Navigation</div>
          <span className="mobile-menu-sub">Husni Zayyin · Portfolio</span>
        </div>

        <div className="mobile-menu-items">
          {SECTIONS.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              className={`mobile-menu-btn ${SECTIONS[active].id === s.id ? 'active' : ''}`}
              onClick={() => handleNavClick(s.id)}
            >
              <span className="m-idx">{String(idx).padStart(2, '0')}</span>
              <span className="m-label">{s.label}</span>
              {SECTIONS[active].id === s.id && <span className="m-current-dot" />}
            </button>
          ))}
        </div>

        <div className="mobile-menu-foot">
          <button
            type="button"
            className="mobile-menu-cta"
            onClick={() => handleNavClick('contact')}
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Dot Rail (Desktop) */}
      <div className="rail" aria-label="Jump to section">
        {SECTIONS.map((s, i) => (
          <button key={s.id} type="button" title={s.label} aria-label={s.label} aria-current={i === active} onClick={() => handleNavClick(s.id)} />
        ))}
      </div>

      {/* Progress Meter (Bottom Left) */}
      <div
        className="meter"
        role="button"
        tabIndex={0}
        onClick={() => setMenuOpen(true)}
        aria-label={`Current section: ${SECTIONS[active].label}. Click to open menu.`}
      >
        <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
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

