import { gsap } from '../lib/gsap';
import { ellipsePoint, fmt } from '../lib/util';
import { MIXES, MIX_BAR } from '../data/filmData';
import { CHANNELS } from '../data/channels';


/**
 * The 15-second film as one paused GSAP timeline (450 frames at 30 fps).
 * Film.tsx renders the shapes; this file only animates them. Scroll position drives
 * `timeline.time()`, so the timeline must stay paused: scroll is its only clock.
 *
 *   0.0  1  The ellipse draws itself, becomes the logo
 *   2.4  2  1,284,306 impressions collapse into the 4,118 that mattered
 *   5.2  3  The channel mix bar redistributes three times
 *   7.8  4  Funnel: dots rain down and drop out at each stage
 *  11.0  5  Attribution: four channels converge on one number
 *  13.4  6  The ellipse redraws, wordmark returns
 */
export const FILM_SCENES: [start: number, label: string][] = [
  [0, '01 — Husni Zayyin Ansori · 5+ Years'],
  [2.4, '02 — 1.5M+ Lines & 15+ Shipped Products'],
  [5.2, '03 — Multi-Platform Tech Matrix (15+ Apps)'],
];
export const FILM_SECONDS = 7.8;

export function buildFilmTimeline(root: HTMLElement): gsap.core.Timeline {
  const one = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
  const many = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

  const tl = gsap.timeline({ paused: true });
  const sceneEls = many('.scene');
  gsap.set(sceneEls, { autoAlpha: 0 });
  gsap.set(one('#s1'), { autoAlpha: 1 });
  const cut = (a: string, b: string, t: number) => {
    tl.set(one(a), { autoAlpha: 0 }, t);
    tl.set(one(b), { autoAlpha: 1 }, t);
  };

  /* ── 1 · the ellipse draws itself · 0 → 2.4 ── */
  {
    const e1 = one<SVGEllipseElement>('#e1');
    const dot = one<SVGCircleElement>('#e1dot');
    const word = one('#s1w');
    const sub = one('#s1s');
    const len = e1.getTotalLength();
    const p = { t: 0 };
    gsap.set(e1, { strokeDasharray: len, strokeDashoffset: len });
    gsap.set(word, { opacity: 0, yPercent: 40, '--s': 100 });
    gsap.set(sub, { opacity: 0 });
    tl.to(e1, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, 0.1)
      .to(p, {
        t: 1, duration: 1.5, ease: 'power2.inOut',
        onUpdate() {
          const [x, y] = ellipsePoint(800, 450, 470, 250, p.t * Math.PI * 2);
          dot.setAttribute('cx', String(x));
          dot.setAttribute('cy', String(y));
        },
      }, 0.1)
      .to(dot, { attr: { r: 0 }, duration: 0.25 }, 1.45)
      .to(word, { opacity: 1, yPercent: 0, '--s': 20, duration: 0.9, ease: 'expo.out' }, 0.8)
      .to(sub, { opacity: 0.6, duration: 0.6 }, 1.1)
      .to([word, sub], { opacity: 0, duration: 0.3, ease: 'power2.in' }, 2.1)
      .to(e1, { attr: { rx: 40, ry: 40 }, opacity: 0, duration: 0.45, ease: 'power3.inOut' }, 2.05);
  }
  cut('#s1', '#s2', 2.4);

  /* ── 2 · reach, then what mattered · 2.4 → 5.2 ── */
  {
    const big = one('#bigNum');
    const label = one('#numLab');
    const few = many<SVGCircleElement>('#fewDots circle');
    const fewLab = one('#fewLab');
    const n = { v: 0 };
    gsap.set(big, { scale: 0.8, opacity: 0 });
    gsap.set(label, { opacity: 0 });
    gsap.set(few, { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
    gsap.set(fewLab, { opacity: 0, y: 24 });
    tl.to(big, { scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out' }, 2.4)
      .to(label, { opacity: 0.6, duration: 0.4 }, 2.55)
      .to(n, { v: 1520000, duration: 1.5, ease: 'power2.out', onUpdate: () => { big.textContent = fmt(n.v); } }, 2.45)
      .to(big, { '--s': 100, scale: 0.3, opacity: 0, duration: 0.55, ease: 'power3.inOut' }, 4.05)
      .to(label, { opacity: 0, duration: 0.3 }, 4.05)
      .to(few, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2.2)', stagger: { amount: 0.35, from: 'random' } }, 4.25)
      .to(fewLab, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 4.5)
      .to(few, { opacity: 0, duration: 0.25, stagger: { amount: 0.12, from: 'random' } }, 5.0)
      .to(fewLab, { opacity: 0, duration: 0.2 }, 5.05);
  }
  cut('#s2', '#s3', 5.2);

  /* ── 3 · the mix redistributes · 5.2 → 7.8 ── */
  {
    const segs = many<SVGRectElement>('#mixBar rect');
    const segTx = many<SVGTextElement>('#mixLab text');
    const head = one('#s3h');
    const sub = one('#s3sub');
    const state = { a: MIXES[0].slice() };
    const setBar = (m: number[]) => {
      let x = MIX_BAR.x;
      m.forEach((v, i) => {
        if (!CHANNELS[i] || !segs[i] || !segTx[i]) return;
        const w = Math.max(4, v * MIX_BAR.w - 8);
        segs[i].setAttribute('x', String(x));
        segs[i].setAttribute('width', String(w));
        segTx[i].setAttribute('x', String(x));
        segTx[i].textContent = CHANNELS[i].key + '  ' + Math.round(v * 100) + '%';
        x += v * MIX_BAR.w;
      });
    };
    setBar(state.a);
    gsap.set(segs, { opacity: 0, scaleY: 0.2, transformOrigin: '50% 50%' });
    gsap.set(segTx, { opacity: 0, y: 14 });
    gsap.set(head, { opacity: 0, y: 22 });
    gsap.set(sub, { opacity: 0, y: 16 });
    tl.to(head, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 5.2)
      .to(segs, { opacity: 1, scaleY: 1, duration: 0.55, ease: 'back.out(1.7)', stagger: 0.06 }, 5.3)
      .to(segTx, { opacity: 0.85, y: 0, duration: 0.45, ease: 'expo.out', stagger: 0.06 }, 5.5)
      .to(sub, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 5.6);
    [1, 2].forEach((mi, i) => {
      const targetAnim: Record<string, number> = {};
      MIXES[mi].forEach((val, idx) => {
        targetAnim[idx] = val;
      });
      tl.to(state.a, {
        ...targetAnim,
        duration: 0.7, ease: 'power3.inOut', onUpdate: () => setBar(state.a),
      }, 6.1 + i * 0.8);
    });
    tl.to([...segs, ...segTx, head, sub], { opacity: 0, duration: 0.3 }, 7.6);
  }

  tl.to({}, {}, FILM_SECONDS); // pad the timeline to exactly 7.8s
  return tl;
}
