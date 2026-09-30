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

/** Scene 3: three architecture distributions the bar cycles through. Order matches CHANNELS (3 channels). */
export const MIXES = [
  [0.35, 0.35, 0.30],
  [0.60, 0.25, 0.15],
  [0.20, 0.60, 0.20],
];
export const MIX_BAR = { x: 180, w: 1240, y: 410, h: 120 };

export const FUNNEL_CX = 620;

export const STAGES = [
  { label: 'All-Time Total GitHub Contributions', value: 3766, rx: 420 },
  { label: '2026 Active Code Contributions', value: 1677, rx: 310 },
  { label: 'Production Products Delivered Worldwide', value: 15, rx: 210 },
  { label: 'Companies & Organizations Scaled', value: 5, rx: 110 },
];
/** Normalised y position where a falling dot stops for each stage (1 = reaches the bottom). */
export const STOPS = [0.224, 0.483, 0.741, 1];
export const RAIN = Array.from({ length: 170 }, () => ({
  x: 180 + rnd() * 880,
  drop: rnd(),
  keep: rnd(),
}));

/** Scene 5: engineering domain nodes converging on the unified production hub. */
export const NODES = CHANNELS.map((c, i) => {
  const a = -Math.PI / 2 + i * ((Math.PI * 2) / CHANNELS.length);
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

/** 36 travelling packets, spread across the engineering arcs. */
export const TRAVELLERS = Array.from({ length: 36 }, (_, i) => ({
  arc: i % CHANNELS.length,
  offset: rnd(),
}));
