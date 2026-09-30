import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { linear, scrollToY } from '../lib/scroll';
import { prefersReducedMotion, fmt } from '../lib/util';
import { buildFilmTimeline, FILM_SCENES, FILM_SECONDS } from './buildFilmTimeline';
import { CHANNELS } from '../data/channels';
import { FEW, MIX_BAR, NODES, RAIN, STAGES, TRAVELLERS } from '../data/filmData';
import { INK, ORANGE } from '../data/tokens';

const svgText = { fontFamily: 'var(--g)' } as const;
const LOGO = ['O', 'v', 'a', 'l'];

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

    const ctx = gsap.context(() => {
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
    }, section);

    return () => {
      window.removeEventListener('resize', fitStage);
      ctx.revert();
    };
  }, []);

  /** "Run at speed": scroll through the pinned range in real time (15s), or jump back if already at the end. */
  const runAtSpeed = () => {
    const st = triggerRef.current;
    if (!st) return;
    const a = st.start;
    const b = st.end;
    const from = window.scrollY;
    const target = from > a + (b - a) * 0.92 ? a : b;
    scrollToY(target, Math.max(1100, FILM_SECONDS * 1000 * (Math.abs(target - from) / (b - a))), linear);
  };

  return (
    <section id="film" ref={sectionRef} aria-label="Studio film">
      <div className="film-pin" ref={pinRef}>
        <div className="film-box">
          <div className="film" ref={frameRef}>
            <div className="stage" ref={stageRef}>
              {/* 1 · the ellipse */}
              <div className="scene" id="s1">
                <svg width="1600" height="900" viewBox="0 0 1600 900">
                  <ellipse id="e1" cx="800" cy="450" rx="470" ry="250" fill="none" stroke={INK} strokeWidth="2" />
                  <circle id="e1dot" cx="1270" cy="450" r="11" fill={ORANGE} />
                </svg>
                <div className="s1txt">
                  <div className="fr s1w" id="s1w">Oval</div>
                  <div className="s1s" id="s1s">a digital marketing studio</div>
                </div>
              </div>

              {/* 2 · reach, then results */}
              <div className="scene" id="s2">
                <div className="s2mid">
                  <div className="fr num bignum" id="bigNum">0</div>
                  <div className="numlab" id="numLab">impressions, last 30 days</div>
                </div>
                <svg width="1600" height="900" viewBox="0 0 1600 900">
                  <g id="fewDots">
                    {FEW.map((d, i) => (
                      <circle key={i} cx={d.cx} cy={d.cy} r="7" fill={ORANGE} />
                    ))}
                  </g>
                </svg>
                <div className="fr fewlab" id="fewLab">of which {fmt(4118)} mattered</div>
              </div>

              {/* 3 · where the money goes */}
              <div className="scene" id="s3">
                <div className="fr s3h" id="s3h">Where the money goes</div>
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
              </div>

              {/* 4 · the funnel */}
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
                          <text x={lx} y={244 + i * 150} fontSize="29" fontWeight="600" fill={i === 3 ? ORANGE : INK} style={svgText}>{fmt(s.value)}</text>
                          <text x={lx} y={272 + i * 150} fontSize="18" fill={INK} opacity=".55" style={svgText}>{s.label}</text>
                        </g>
                      );
                    })}
                  </g>
                </svg>
              </div>

              {/* 5 · attribution */}
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
                <div className="fr s5h" id="s5h">Everything lands in one number</div>
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
                    <div className="endm" id="endM">Attention, bought carefully · Kuala Lumpur</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="film-hud" aria-hidden="true">
              <div className="a" ref={sceneLabelRef}>01 — The ellipse</div>
              <div className="b num"><em ref={frameNumRef}>000</em> / 450</div>
              <div className="c">Film no. 1 · 15 seconds</div>
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
