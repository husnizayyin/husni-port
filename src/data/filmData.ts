import { makeRng } from '../lib/util';
import { CHANNELS } from './channels';

/**
 * Everything the 15-second film draws that is random or computed lives here, so the JSX in
 * Film.tsx renders the shapes and buildFilmTimeline.ts only animates them.
 * The RNG is called in a fixed order so the dots land in the same place on every load.
 */
const rnd = makeRng(20260930);

/** Scene 2: the 4,118 results that mattered. */
export const FEW = Array.from({ length: 90 }, () => {
  const a = rnd() * Math.PI * 2;
  const r = Math.sqrt(rnd()) * 150;
  return { cx: 800 + Math.cos(a) * r, cy: 430 + Math.sin(a) * r * 0.62 };
});

/** Scene 3: three budget splits the bar cycles through. Order matches CHANNELS. */
export const MIXES = [
  [0.62, 0.12, 0.18, 0.08],
  [0.38, 0.27, 0.21, 0.14],
  [0.22, 0.44, 0.16, 0.18],
];
export const MIX_BAR = { x: 150, w: 1300, y: 420, h: 130 };

/** Scene 4: the funnel. `rx` is the ellipse width at that stage. */
export const STAGES = [
  { label: 'Saw it', value: 1284306, rx: 620 },
  { label: 'Clicked', value: 41920, rx: 470 },
  { label: 'Tried', value: 9840, rx: 320 },
  { label: 'Stayed', value: 4118, rx: 175 },
];
/** Normalised y position where a falling dot stops for each stage (1 = reaches the bottom). */
export const STOPS = [0.224, 0.483, 0.741, 1];
export const RAIN = Array.from({ length: 170 }, () => ({
  x: 300 + rnd() * 1000,
  drop: rnd(),
  keep: rnd(),
}));

/** Scene 5: four channel nodes converging on the hub. */
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
/** 36 travelling dots, spread across the four arcs. */
export const TRAVELLERS = Array.from({ length: 36 }, (_, i) => ({ arc: i % 4, offset: rnd() }));
