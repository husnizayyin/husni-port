# Oval — scroll-driven landing page (React + TypeScript + GSAP)

A port of the Oval landing page to a Vite + React 18 + TypeScript project. Visuals and motion match the original single-file HTML.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
```

Node 18+ (built and tested on Node 22). No env vars, no backend, no network calls: fonts are self-hosted through `@fontsource`.

## Structure

```
src/
  main.tsx                     entry: fonts + styles + <App/>
  App.tsx                      section order; refreshes ScrollTrigger after fonts load
  styles.css                   all styles + design tokens (CSS custom properties)
  components/
    Chrome.tsx                 top nav, right-edge dot rail, bottom-left progress ring
    Hero.tsx                   00  ellipse draws itself, wordmark rises
    Position.tsx               01  statement lights up word by word (scrubbed)
    Film.tsx                   02  pinned 16:9 film, scroll = playhead   (markup + pin)
    buildFilmTimeline.ts       02  the 15s GSAP timeline, 6 scenes       (animation)
    Work.tsx / WorkChart.tsx   03  pinned horizontal scroll of case-study cards
    Depth.tsx                  04  three ellipses at three parallax speeds
    Mix.tsx / PresetButtons.tsx 05  channel-mix allocator (dark section)
    Contact.tsx                06  ellipse redraws, wordmark, CTA
  data/
    work.ts                    case studies (placeholder copy: replace)
    channels.ts                channel colours, ramp curves, presets, cumulative()
    filmData.ts                seeded random dots, funnel stages, node positions
    sections.ts                section ids/labels (drive nav, rail, progress)
    tokens.ts                  brand colours used from JS
  lib/
    gsap.ts                    registers ScrollTrigger once; import gsap from here
    scroll.ts                  programmatic scroll used by nav / rail / "Run at speed"
    util.ts                    formatting, seeded RNG, geometry helpers, KL clock
```

## How the motion works

- **Every animated section follows one pattern:** refs for elements, a `useLayoutEffect` that builds tweens inside `gsap.context(..., sectionEl)`, and `return () => ctx.revert()`. That cleanup is what makes React StrictMode and hot reload safe: without it pins and triggers would double up. Keep it when you add sections.
- **The film (02)** is one *paused* timeline of exactly 15s. A ScrollTrigger scrubs `timeline.time()`, so scroll is its only clock. If you ever call `.play()` on it, it will fight the scroll. `Film.tsx` renders the SVG; `buildFilmTimeline.ts` finds the shapes by id and animates them.
- **Per-frame values (HUD frame counter, mix chart, progress ring) are written straight to the DOM through refs**, not React state, so scrolling never re-renders. React state is used only where it changes rarely (active section, active preset button).
- **Work (03)** pins the section and moves the track with `x`. Each card has its own trigger using `containerAnimation`, which is how GSAP ties a trigger to *horizontal* motion.
- **Pin measurements depend on layout.** `App.tsx` calls `ScrollTrigger.refresh()` once web fonts load. If you add content above a pinned section, or change fonts, refresh after it settles.
- **Reduced motion:** the scroll-driven parts stay (they answer the user's input); intro animations, the looping cue and easing on presets are skipped.

## Things worth knowing before you change it

- **GSAP animates CSS variables** for the type: `--s` (Fraunces softness), `--fw` (weight), `--o` (optical size). Put the `.fr` class on the element that owns the variables *and* on any child you animate them on: `font-variation-settings` is inherited as a computed value, so a child will not pick up a changed variable from its parent.
- **GSAP writes opacity as an inline style, which beats the SVG `opacity` attribute.** Where a per-frame loop needs to change an SVG element's opacity (funnel dots, travelling dots) it sets `el.style.opacity`.
- **Keep the film caption outside `.film`:** that box has `overflow: hidden`.
- **Colour is semantic:** orange = paid, green = organic, violet = social, mustard = lifecycle, in the film, the work cards and the allocator.

## Content and data

All numbers, client names and case studies are **placeholders**. The allocator's curves in `data/channels.ts` are illustrative: they demonstrate the argument (fast channels win early, compounding ones win late), not a forecast. Replace before shipping.

## Licence notes

GSAP 3.12.5 (including ScrollTrigger) is free for use under GreenSock's standard licence, but check its terms for your use case (commercial and SaaS-style products have conditions). Fraunces and Schibsted Grotesk are SIL Open Font License.
