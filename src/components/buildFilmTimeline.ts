import { gsap } from '../lib/gsap';
import { ellipsePoint, fmt, quadPoint } from '../lib/util';
import { MIXES, MIX_BAR, NODES, RAIN, STOPS, TRAVELLERS } from '../data/filmData';
import { CHANNELS } from '../data/channels';
import { INK, ORANGE } from '../data/tokens';

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
  [0, '01 — The ellipse'],
  [2.4, '02 — Reach, then results'],
  [5.2, '03 — Where the money goes'],
  [7.8, '04 — The funnel'],
  [11, '05 — Attribution'],
  [13.4, '06 — Signature'],
];
export const FILM_SECONDS = 15;

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
      .to(n, { v: 1284306, duration: 1.5, ease: 'power2.out', onUpdate: () => { big.textContent = fmt(n.v); } }, 2.45)
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
    const state = { a: MIXES[0].slice() };
    const setBar = (m: number[]) => {
      let x = MIX_BAR.x;
      m.forEach((v, i) => {
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
    tl.to(head, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 5.2)
      .to(segs, { opacity: 1, scaleY: 1, duration: 0.55, ease: 'back.out(1.7)', stagger: 0.06 }, 5.3)
      .to(segTx, { opacity: 0.85, y: 0, duration: 0.45, ease: 'expo.out', stagger: 0.06 }, 5.5);
    [1, 2].forEach((mi, i) => {
      tl.to(state.a, {
        0: MIXES[mi][0], 1: MIXES[mi][1], 2: MIXES[mi][2], 3: MIXES[mi][3],
        duration: 0.7, ease: 'power3.inOut', onUpdate: () => setBar(state.a),
      }, 6.1 + i * 0.8);
    });
    tl.to([...segs, ...segTx, head], { opacity: 0, duration: 0.3 }, 7.6);
  }
  cut('#s3', '#s4', 7.8);

  /* ── 4 · the funnel · 7.8 → 11.0 ── */
  {
    const shapes = many<SVGEllipseElement>('#funnel ellipse');
    const texts = many<SVGGElement>('#fLab > g');
    const dots = many<SVGCircleElement>('#rain circle');
    gsap.set(shapes, { opacity: 0, scaleX: 0.5, transformOrigin: '800px 450px' });
    gsap.set(texts, { opacity: 0 });
    gsap.set(dots, { opacity: 0 });
    tl.to(shapes, { opacity: 1, scaleX: 1, duration: 0.55, ease: 'expo.out', stagger: 0.1 }, 7.8)
      .to(texts, { opacity: 1, duration: 0.4, stagger: 0.1 }, 8.05);
    const r = { t: 0 };
    tl.to(r, {
      t: 1, duration: 2.1, ease: 'none',
      onUpdate() {
        RAIN.forEach((d, i) => {
          const el = dots[i];
          const local = Math.min(1, Math.max(0, (r.t - d.drop * 0.5) / 0.5));
          const stop = d.keep < 0.09 ? STOPS[3] : d.keep < 0.22 ? STOPS[2] : d.keep < 0.45 ? STOPS[1] : STOPS[0];
          const p = Math.min(local, stop);
          const done = stop === 1 && p >= 1;
          el.setAttribute('cx', String(d.x + (800 - d.x) * p * p));
          el.setAttribute('cy', String(120 + p * 580));
          el.setAttribute('fill', done ? ORANGE : INK);
          el.setAttribute('r', done ? '6.5' : '4.5');
          // GSAP writes opacity as inline style, which beats the SVG attribute, so drive style here too.
          el.style.opacity = String(
            local <= 0 ? 0 : p >= stop && stop < 1 ? Math.max(0, 1 - (local - stop) * 6) * 0.5 : 0.82,
          );
        });
      },
    }, 8.3);
    tl.to([...shapes, ...texts, ...dots], { opacity: 0, duration: 0.3 }, 10.75);
  }
  cut('#s4', '#s5', 11.0);

  /* ── 5 · attribution converges · 11.0 → 13.4 ── */
  {
    const paths = many<SVGPathElement>('#paths path');
    const nodeGs = many<SVGGElement>('#nodes > g');
    const trav = many<SVGCircleElement>('#travel circle');
    const hub = one<SVGCircleElement>('#hub');
    const hubN = one('#hubN');
    const head = one('#s5h');
    const lens = paths.map((p) => p.getTotalLength());
    paths.forEach((p, i) => gsap.set(p, { strokeDasharray: lens[i], strokeDashoffset: lens[i], opacity: 0.4 }));
    gsap.set(nodeGs, { opacity: 0, scale: 0.4, transformOrigin: '800px 450px' });
    gsap.set(trav, { opacity: 0 });
    gsap.set(hub, { attr: { r: 0 } });
    gsap.set(hubN, { opacity: 0 });
    gsap.set(head, { opacity: 0, y: 20 });
    tl.to(head, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 11.0)
      .to(nodeGs, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.07 }, 11.05)
      .to(paths, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut', stagger: 0.07 }, 11.2)
      .to(hub, { attr: { r: 76 }, duration: 0.6, ease: 'back.out(1.6)' }, 11.6)
      .to(hubN, { opacity: 1, duration: 0.3 }, 11.85);
    const T = { t: 0 };
    const hn = { v: 0 };
    tl.to(T, {
      t: 1, duration: 1.4, ease: 'none',
      onUpdate() {
        TRAVELLERS.forEach((d, i) => {
          const n = NODES[d.arc];
          const p = (T.t * 1.6 + d.offset) % 1;
          const [x, y] = quadPoint(n.x, n.y, n.mx, n.my, 800, 450, p);
          trav[i].setAttribute('cx', String(x));
          trav[i].setAttribute('cy', String(y));
          trav[i].style.opacity = String(T.t < 0.06 ? (T.t / 0.06) * 0.95 : p > 0.93 ? (1 - p) / 0.07 : 0.95);
        });
      },
    }, 11.8)
      .to(hn, { v: 4118, duration: 1.2, ease: 'power2.out', onUpdate: () => { hubN.textContent = fmt(hn.v); } }, 11.9)
      .to([...trav, ...paths, ...nodeGs, head], { opacity: 0, duration: 0.3 }, 13.1)
      .to([hub, hubN], { opacity: 0, duration: 0.25 }, 13.2);
  }
  cut('#s5', '#s6', 13.4);

  /* ── 6 · back to the ellipse · 13.4 → 15 ── */
  {
    const e6 = one<SVGEllipseElement>('#e6');
    const len = e6.getTotalLength();
    const chars = many('#endW .ch');
    const meta = one('#endM');
    gsap.set(e6, { strokeDasharray: len, strokeDashoffset: len * 0.999, attr: { rx: 40, ry: 40 } });
    gsap.set(chars, { yPercent: 108, opacity: 0, '--s': 100, '--fw': 300 });
    gsap.set(meta, { yPercent: 115 });
    tl.to(e6, { attr: { rx: 470, ry: 250 }, strokeDashoffset: 0, duration: 1, ease: 'expo.out' }, 13.4)
      .to(chars, { yPercent: 0, opacity: 1, '--s': 20, '--fw': 600, duration: 0.95, ease: 'expo.out', stagger: 0.07 }, 13.6)
      .to(meta, { yPercent: 0, duration: 0.7, ease: 'expo.out' }, 13.95)
      .to({}, {}, FILM_SECONDS); // pad the timeline to exactly 15s
  }

  return tl;
}
