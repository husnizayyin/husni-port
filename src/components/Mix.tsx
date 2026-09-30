import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { CHANNELS, CHART_SCALE, PRESETS, WEEKS, cumulative } from '../data/channels';
import { fmt, prefersReducedMotion } from '../lib/util';
import { PresetButtons } from './PresetButtons';

const PW = 900;
const PH = 450;
const EVEN_SPLIT = [1 / 3, 1 / 3, 1 / 3];

const pathFor = (series: number[]) =>
  series.map((v, i) => `${i ? 'L' : 'M'}${((i / (WEEKS - 1)) * PW).toFixed(1)} ${(PH - (v / CHART_SCALE) * PH).toFixed(1)}`).join(' ');

/**
 * Section 05. Same engineering effort, 4 specialized presets. Scroll walks through sprints 1-12;
 * the buttons shift repo balance across Mobile, Frontend, and Full Stack disciplines.
 */
export function Mix() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const flatRef = useRef<SVGPathElement>(null);
  const curRef = useRef<SVGLineElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const outRef = useRef<HTMLElement>(null);
  const outLabRef = useRef<HTMLSpanElement>(null);
  const fillRefs = useRef<(HTMLElement | null)[]>([]);
  const pctRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const applyMix = useRef<(mix: number[]) => void>(() => {});

  useLayoutEffect(() => {
    const reduce = prefersReducedMotion();
    let share = PRESETS[0].mix.slice();
    let series = cumulative(share);
    const week = { t: 0 };
    let tween: gsap.core.Tween | null = null;

    const drawCurve = () => {
      const d = pathFor(series);
      if (lineRef.current) lineRef.current.setAttribute('d', d);
      if (areaRef.current) areaRef.current.setAttribute('d', `${d} L${PW} ${PH} L0 ${PH} Z`);
      if (flatRef.current) flatRef.current.setAttribute('d', pathFor(cumulative(EVEN_SPLIT)));
      share.forEach((v, i) => {
        const fillEl = fillRefs.current[i];
        if (fillEl) fillEl.style.transform = `scaleX(${v})`;
        const pctEl = pctRefs.current[i];
        if (pctEl) pctEl.textContent = Math.round(v * 100) + '%';
      });
    };
    const drawHead = () => {
      const t = week.t;
      const idx = t * (WEEKS - 1);
      const i0 = Math.floor(idx);
      const i1 = Math.min(WEEKS - 1, i0 + 1);
      const v0 = series[i0] ?? 0;
      const v1 = series[i1] ?? v0;
      const v = v0 + (v1 - v0) * (idx - i0);
      const x = t * PW;
      const y = PH - (v / CHART_SCALE) * PH;
      if (curRef.current) {
        curRef.current.setAttribute('x1', String(x));
        curRef.current.setAttribute('x2', String(x));
      }
      if (dotRef.current) {
        dotRef.current.setAttribute('cx', String(x));
        dotRef.current.setAttribute('cy', String(y));
      }
      if (outRef.current) outRef.current.textContent = fmt(v * 1180);
      if (outLabRef.current) outLabRef.current.textContent = 'engineering output by sprint ' + Math.max(1, Math.round(1 + t * (WEEKS - 1)));
    };
    drawCurve();
    drawHead();

    applyMix.current = (target) => {
      const from = share.slice();
      const k = { v: 0 };
      tween?.kill();
      tween = gsap.to(k, {
        v: 1, duration: reduce ? 0 : 0.8, ease: 'power3.inOut',
        onUpdate() {
          share = from.map((f, i) => f + ((target[i] ?? 0) - f) * k.v);
          series = cumulative(share);
          drawCurve();
          drawHead();
        },
      });
    };

    const mm = gsap.matchMedia(sectionRef.current!);

    mm.add('(min-width: 1025px)', () => {
      gsap.to(week, {
        t: 1, ease: 'none', onUpdate: drawHead,
        scrollTrigger: {
          trigger: sectionRef.current!, start: 'top top', end: '+=250%',
          pin: pinRef.current, anticipatePin: 1, scrub: 0.3,
        },
      });
    });

    mm.add('(max-width: 1024px)', () => {
      // Tablet & Mobile: No scroll pinning, week.t is fully rendered
      week.t = 1;
      drawHead();
    });

    return () => {
      tween?.kill();
      mm.revert();
    };
  }, []);

  return (
    <section id="mix" ref={sectionRef} aria-label="Tech stack architecture matrix">
      <div className="mpin pad" ref={pinRef}>
        <div className="mhead">
          <h2 className="fr">Ecosystem Balance.<br />Engineering Velocity.</h2>
          <p>
            Synthesized from GitHub commits and repository activity. Scroll steps through sprints 1-12; click the buttons
            to model engineering velocity across Mobile Development, Frontend, and Full Stack disciplines.
          </p>
        </div>
        <div className="mgrid">
          <div className="pcol">
            <div className="plot">
              <svg viewBox={`0 0 ${PW} ${PH}`} preserveAspectRatio="none" aria-hidden="true">
                <g stroke="rgba(230,231,226,.16)" strokeWidth="1">
                  {[1, 2, 3].map((i) => <line key={`h${i}`} x1="0" y1={(i * PH) / 4} x2={PW} y2={(i * PH) / 4} />)}
                  {Array.from({ length: WEEKS - 1 }, (_, i) => i + 1).map((i) => (
                    <line key={`v${i}`} x1={(i * PW) / WEEKS} y1="0" x2={(i * PW) / WEEKS} y2={PH} />
                  ))}
                </g>
                <path ref={areaRef} d="" fill="rgba(255,92,26,.18)" />
                <path ref={flatRef} d="" fill="none" stroke="rgba(230,231,226,.42)" strokeWidth="2" strokeDasharray="5 8" />
                <path ref={lineRef} d="" fill="none" stroke="#FF5C1A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <line ref={curRef} x1="0" y1="0" x2="0" y2={PH} stroke="rgba(230,231,226,.45)" strokeWidth="1.5" />
                <circle ref={dotRef} cx="0" cy={PH} r="7" fill="#FBFBF8" />
              </svg>
            </div>
            <p className="pnote">
              <b>Solid: active architecture model</b>
              <b>Dashed: equal tier distribution</b>
              <b>Vertical: active sprint cycle</b>
            </p>
          </div>

          <div className="mside">
            <div className="readout">
              <b className="fr num" ref={outRef}>0</b>
              <span ref={outLabRef}>engineering output by sprint 1</span>
            </div>
            <div className="mbars">
              {CHANNELS.map((c, i) => (
                <div className="mrow" key={c.key}>
                  <i style={{ background: c.color }} />
                  <span className="mname">{c.key}</span>
                  <span className="tr"><b ref={(el) => { fillRefs.current[i] = el; }} style={{ background: c.color }} /></span>
                  <span className="pc num" ref={(el) => { pctRefs.current[i] = el; }}>0%</span>
                </div>
              ))}
            </div>
            <PresetButtons onSelect={(mix) => applyMix.current(mix)} />
          </div>
        </div>
      </div>
    </section>
  );
}
