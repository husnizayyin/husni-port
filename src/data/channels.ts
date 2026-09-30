export interface Channel {
  key: string;
  color: string;
  /** Relative output of one unit of engineering effort across stages (1..12). */
  ramp: (week: number) => number;
}

/** Colour carries meaning across the whole page: orange is Frontend/Web, green Mobile, violet Backend, mustard Database. */
export const CHANNELS: Channel[] = [
  { key: 'Frontend & Web', color: '#FF5C1A', ramp: () => 1 },
  { key: 'Mobile Developer', color: '#3FA98A', ramp: (w) => Math.pow(w / 12, 1.9) * 2.6 },
  { key: 'Backend & APIs', color: '#7B6CF6', ramp: (w) => 0.45 + 0.75 * Math.sin(Math.min(1, w / 9) * Math.PI / 2) },
  { key: 'Databases & Cloud', color: '#E8C547', ramp: (w) => 0.35 + 0.14 * w },
];

export const WEEKS = 12;

/** Engineering focus profiles for different system architectures. */
export const PRESETS = [
  { label: 'Full Stack', mix: [0.35, 0.25, 0.25, 0.15] },
  { label: 'Mobile First', mix: [0.15, 0.55, 0.15, 0.15] },
  { label: 'Backend & Data', mix: [0.1, 0.1, 0.45, 0.35] },
  { label: 'Web Platform', mix: [0.6, 0.1, 0.2, 0.1] },
];

/** Cumulative output velocity per week for a given architecture distribution. */
export function cumulative(share: number[]): number[] {
  const out: number[] = [];
  let acc = 0;
  for (let w = 1; w <= WEEKS; w++) {
    let v = 0;
    CHANNELS.forEach((c, i) => (v += share[i] * c.ramp(w)));
    acc += v;
    out.push(acc);
  }
  return out;
}

/** Fixed y-scale so switching presets visibly moves the curve instead of re-normalising it. */
export const CHART_SCALE =
  Math.max(...cumulative([0, 1, 0, 0]), ...cumulative([1, 0, 0, 0])) * 1.04;
