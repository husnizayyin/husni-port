import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { linear, scrollToY } from '../lib/scroll';
import { prefersReducedMotion, fmt } from '../lib/util';
import { buildFilmTimeline, FILM_SCENES, FILM_SECONDS } from './buildFilmTimeline';
import { CHANNELS } from '../data/channels';
import { FEW, MIX_BAR, NODES, RAIN, STAGES, TRAVELLERS } from '../data/filmData';
import { INK, ORANGE } from '../data/tokens';

const svgText = { fontFamily: 'var(--g)' } as const;
const LOGO = ['H', 'u', 's', 'n', 'i'];

/**
 * Section 02. A pinned 16:9 "film" whose playhead is the page scroll.
 * The stage is authored at 1600x900 and scaled to fit; the timeline lives in buildFilmTimeline.ts.
 */
export function Film() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneLabelRef = useRef<HTMLDivElement>(null);
  const frameNumRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current!;
    const frame = frameRef.current!;
    const stage = stageRef.current!;
    const reduce = prefersReducedMotion();

    // Scale the 1600x900 stage into whatever box the frame ends up with.
    const fitStage = () => {
      const w = frame.clientWidth;
      const h = frame.clientHeight;
      const s = Math.min(w / 1600, h / 900);
      stage.style.transform = `translate(${(w - 1600 * s) / 2}px,${(h - 900 * s) / 2}px) scale(${s})`;
    };
    fitStage();
    window.addEventListener('resize', fitStage);

    const mm = gsap.matchMedia(section);

    mm.add('(min-width: 1025px)', () => {
      const film = buildFilmTimeline(stage);

      // HUD (scene label + frame counter) is written straight to the DOM: it changes every frame.
      const scenes = FILM_SCENES.map(([t, label]) => [Math.min(1, t / film.duration()), label] as const);
      let lastFrame = -1;
      const updateHud = () => {
        const p = film.time() / film.duration();
        const fr = Math.min(450, Math.round(p * 450));
        if (fr === lastFrame) return;
        lastFrame = fr;
        if (frameNumRef.current) frameNumRef.current.textContent = String(fr).padStart(3, '0');
        let i = 0;
        while (i < scenes.length - 1 && p >= scenes[i + 1][0]) i++;
        const label = sceneLabelRef.current;
        if (label && label.textContent !== scenes[i][1]) label.textContent = scenes[i][1];
      };

      const scrub = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=680%',
          pin: pinRef.current,
          anticipatePin: 1,
          scrub: reduce ? true : 0.45,
          invalidateOnRefresh: true,
          onRefreshInit: fitStage,
        },
      });
      scrub.to(film, { time: film.duration(), ease: 'none', duration: 1, onUpdate: updateHud });
      triggerRef.current = scrub.scrollTrigger ?? null;
    });

    mm.add('(max-width: 1024px)', () => {
      // Tablet & Mobile: Auto-play film seamlessly without pinning scroll
      triggerRef.current = null;
      const film = buildFilmTimeline(stage);
      const scenes = FILM_SCENES.map(([t, label]) => [Math.min(1, t / film.duration()), label] as const);

      film.eventCallback('onUpdate', () => {
        const p = film.time() / film.duration();
        const fr = Math.min(450, Math.round(p * 450));
        if (frameNumRef.current) frameNumRef.current.textContent = String(fr).padStart(3, '0');
        let i = 0;
        while (i < scenes.length - 1 && p >= scenes[i + 1][0]) i++;
        const label = sceneLabelRef.current;
        if (label && label.textContent !== scenes[i][1]) label.textContent = scenes[i][1];
      });

      film.play();
      film.repeat(-1);
      film.repeatDelay(1.2);
    });

    return () => {
      window.removeEventListener('resize', fitStage);
      mm.revert();
    };
  }, []);

  /** "Run at speed": scroll through the pinned range in real time (15s) on desktop, or smooth scroll */
  const runAtSpeed = () => {
    const st = triggerRef.current;
    if (st) {
      const a = st.start;
      const b = st.end;
      const from = window.scrollY;
      const target = from > a + (b - a) * 0.92 ? a : b;
      scrollToY(target, Math.max(1100, FILM_SECONDS * 1000 * (Math.abs(target - from) / (b - a))), linear);
    }
  };

  return (
    <section id="film" ref={sectionRef} aria-label="Software engineering journey">
      <div className="film-pin" ref={pinRef}>
        <div className="film-box">
          <div className="film" ref={frameRef}>
            <div className="stage" ref={stageRef}>
              {/* 1 · the introduction */}
              <div className="scene" id="s1">
                <svg width="1600" height="900" viewBox="0 0 1600 900">
                  <ellipse id="e1" cx="800" cy="450" rx="470" ry="250" fill="none" stroke={INK} strokeWidth="2" />
                  <circle id="e1dot" cx="1270" cy="450" r="11" fill={ORANGE} />
                </svg>
                <div className="s1txt">
                  <div className="fr s1w" id="s1w">Husni</div>
                  <div className="s1s" id="s1s">Software Engineer · 5+ Years Experience · 5 Companies</div>
                </div>
              </div>

              {/* 2 · production volume & commits */}
              <div className="scene" id="s2">
                <div className="s2mid">
                  <div className="fr num bignum" id="bigNum">0</div>
                  <div className="numlab" id="numLab">lines of production code across 15+ shipped products</div>
                </div>
                <svg width="1600" height="900" viewBox="0 0 1600 900">
                  <g id="fewDots">
                    {FEW.map((d, i) => (
                      <circle key={i} cx={d.cx} cy={d.cy} r="7" fill={ORANGE} />
                    ))}
                  </g>
                </svg>
                <div className="fr fewlab" id="fewLab">3,766+ GitHub contributions across 5 global & enterprise companies</div>
              </div>

              {/* 3 · tech stack distribution */}
              <div className="scene" id="s3">
                <div className="fr s3h" id="s3h">Multi-Platform Ecosystem · 15+ Products Shipped</div>
                <svg width="1600" height="900" viewBox="0 0 1600 900">
                  <g id="mixBar">
                    {CHANNELS.map((c) => (
                      <rect key={c.key} x={MIX_BAR.x} y={MIX_BAR.y} width="10" height={MIX_BAR.h} rx="10" fill={c.color} />
                    ))}
                  </g>
                  <g id="mixLab">
                    {CHANNELS.map((c) => (
                      <text key={c.key} x={MIX_BAR.x} y={MIX_BAR.y + MIX_BAR.h + 46} fontSize="23" fontWeight="600" fill={INK} opacity="0" style={svgText} />
                    ))}
                  </g>
                </svg>
                <div className="s3sub" id="s3sub">
                  <span>📱 7 Mobile Apps</span>
                  <span className="dot">•</span>
                  <span>💻 6 Web & Portals</span>
                  <span className="dot">•</span>
                  <span>⚡ 2 Enterprise HRIS & WMS</span>
                </div>
              </div>

              {/* 4 · the system architecture pipeline */}
              <div className="scene" id="s4">
                <svg width="1600" height="900" viewBox="0 0 1600 900">
                  <g id="funnel">
                    {STAGES.map((s, i) => (
                      <ellipse key={s.label} cx="800" cy={250 + i * 150} rx={s.rx} ry="46" fill="none" stroke={INK} strokeWidth="2" opacity="0" />
                    ))}
                  </g>
                  <g id="rain">
                    {RAIN.map((_, i) => (
                      <circle key={i} cx="0" cy="0" r="4.5" fill={INK} />
                    ))}
                  </g>
                  <g id="fLab">
                    {STAGES.map((s, i) => {
                      const lx = 800 + s.rx + 26;
                      return (
                        <g key={s.label} opacity="0">
                          <text x={lx} y={244 + i * 150} fontSize="25" fontWeight="600" fill={i === 3 ? ORANGE : INK} style={svgText}>{fmt(s.value)}</text>
                          <text x={lx} y={272 + i * 150} fontSize="17" fill={INK} opacity=".7" style={svgText}>{s.label}</text>
                        </g>
                      );
                    })}
                  </g>
                </svg>
              </div>

              {/* 5 · distributed convergence */}
              <div className="scene" id="s5">
                <svg width="1600" height="900" viewBox="0 0 1600 900">
                  <g id="paths">
                    {NODES.map((n) => (
                      <path key={n.key} d={`M${n.x} ${n.y} Q${n.mx} ${n.my} 800 450`} fill="none" stroke={n.color} strokeWidth="2.5" opacity=".35" />
                    ))}
                  </g>
                  <g id="nodes">
                    {NODES.map((n) => (
                      <g key={n.key} opacity="0">
                        <circle cx={n.x} cy={n.y} r="15" fill={n.color} />
                        <text x={n.x} y={n.y + (n.y < 450 ? -30 : 44)} textAnchor="middle" fontSize="21" fontWeight="600" fill={INK} style={svgText}>{n.key}</text>
                      </g>
                    ))}
                  </g>
                  <g id="travel">
                    {TRAVELLERS.map((t, i) => (
                      <circle key={i} cx={NODES[t.arc].x} cy={NODES[t.arc].y} r="6" fill={NODES[t.arc].color} opacity="0" />
                    ))}
                  </g>
                  <circle id="hub" cx="800" cy="450" r="0" fill={INK} />
                  <text id="hubN" x="800" y="462" textAnchor="middle" fontSize="46" fontWeight="600" fill="#FBFBF8" opacity="0" style={svgText}>0</text>
                </svg>
                <div className="fr s5h" id="s5h">15+ Products & 5 Companies Converged into One Core</div>
              </div>

              {/* 6 · signature */}
              <div className="scene" id="s6">
                <svg width="1600" height="900" viewBox="0 0 1600 900">
                  <ellipse id="e6" cx="800" cy="450" rx="470" ry="250" fill="none" stroke={INK} strokeWidth="2" />
                </svg>
                <div className="s6mid">
                  <div className="fr endw" id="endW">
                    {LOGO.map((c, i) => (
                      <span key={i} className="ch fr">{c}</span>
                    ))}
                  </div>
                  <div className="endm-mask">
                    <div className="endm" id="endM">Husni Zayyin Ansori · Software Engineer · 15+ Shipped Products</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="film-hud" aria-hidden="true">
              <div className="a" ref={sceneLabelRef}>01 — Husni Zayyin Ansori</div>
              <div className="b num"><em ref={frameNumRef}>000</em> / 450</div>
              <div className="c">Engineering Journey · 15 seconds</div>
            </div>
          </div>

          <div className="film-cap">
            <span>Your scroll is the playhead — 450 frames, scrubbed</span>
            <button className="runbtn" type="button" onClick={runAtSpeed}>
              <i />Run at speed
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
