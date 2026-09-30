import { makeRng } from '../lib/util';
import { CHANNELS } from './channels';

/**
 * Everything the 15-second film draws that is random or computed lives here, so the JSX in
 * Film.tsx renders the shapes and buildFilmTimeline.ts only animates them.
 * The RNG is called in a fixed order so the dots land in the same place on every load.
 */
const rnd = makeRng(20260930);

/** Scene 2: the 5,280 commits & pull requests that powered production. */
export const FEW = Array.from({ length: 90 }, () => {
  const a = rnd() * Math.PI * 2;
  const r = Math.sqrt(rnd()) * 150;
  return { cx: 800 + Math.cos(a) * r, cy: 430 + Math.sin(a) * r * 0.62 };
});

/** Scene 3: three architecture distributions the bar cycles through. Order matches CHANNELS. */
export const MIXES = [
  [0.40, 0.30, 0.20, 0.10],
  [0.25, 0.35, 0.25, 0.15],
  [0.30, 0.20, 0.35, 0.15],
];
export const MIX_BAR = { x: 150, w: 1300, y: 420, h: 130 };

/** Scene 4: the architecture pipeline. `rx` is the ellipse width at that stage. */
export const STAGES = [
  { label: 'Client / UI Layer (React, Next.js, Flutter)', value: 1250000, rx: 620 },
  { label: 'API Gateway & Services (REST, GraphQL)', value: 840000, rx: 470 },
  { label: 'Business Logic (Laravel, Java, Kotlin)', value: 420000, rx: 320 },
  { label: 'Persistent Core (PostgreSQL, Oracle, Mongo)', value: 165000, rx: 175 },
];
/** Normalised y position where a falling dot stops for each stage (1 = reaches the bottom). */
export const STOPS = [0.224, 0.483, 0.741, 1];
export const RAIN = Array.from({ length: 170 }, () => ({
  x: 300 + rnd() * 1000,
  drop: rnd(),
  keep: rnd(),
}));

/** Scene 5: four engineering domain nodes converging on the unified production hub. */
export const NODES = CHANNELS.map((c, i) => {
  const a = -Math.PI / 2 + i * ((Math.PI * 2) / 4);
  const x = 800 + Math.cos(a) * 470;
  const y = 450 + Math.sin(a) * 250;
  return {
    key: c.key,
    color: c.color,
    x,
    y,
    // Control point for the curved path into the hub
    mx: (x + 800) / 2 + (y - 450) * 0.42,
    my: (y + 450) / 2 - (x - 800) * 0.42,
  };
});
/** 36 travelling packets, spread across the four engineering arcs. */
export const TRAVELLERS = Array.from({ length: 36 }, (_, i) => ({ arc: i % 4, offset: rnd() }));
