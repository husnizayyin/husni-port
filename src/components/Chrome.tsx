import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '../lib/gsap';
import { scrollToY } from '../lib/scroll';
import { NAV, SECTIONS } from '../data/sections';

const RING_LEN = 2 * Math.PI * 15;

function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const targetEl = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
  const targetY = targetEl.getBoundingClientRect().top + window.scrollY;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  scrollToY(Math.min(maxY, Math.max(0, targetY)), 1100);
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
    let maxY = 1;
    let current = -1;

    const getActiveIndex = () => {
      const scrollY = window.scrollY;
      if (scrollY <= 60) return 0; // At top, section 0 (hero) is always active

      const focalY = window.innerHeight * 0.38;
      let activeIdx = 0;

      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (!el) continue;
        const targetEl = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
        const rect = targetEl.getBoundingClientRect();
        if (rect.top <= focalY && rect.bottom > 0) {
          activeIdx = i;
        }
      }

      // If at bottom of page, activate last section
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 30) {
        activeIdx = SECTIONS.length - 1;
      }

      return activeIdx;
    };

    const update = () => {
      maxY = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / maxY));
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(RING_LEN * (1 - p));

      const idx = getActiveIndex();
      if (idx !== current) {
        current = idx;
        setActive(idx);
      }
    };

    update();
    ScrollTrigger.addEventListener('refresh', update);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      ScrollTrigger.removeEventListener('refresh', update);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
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

