export interface Channel {
  key: string;
  color: string;
  /** Relative output of one unit of budget in week w (1..12). Illustrative, not real client data. */
  ramp: (week: number) => number;
}

/** Colour carries meaning across the whole page: orange is always paid, green organic, violet social, mustard lifecycle. */
export const CHANNELS: Channel[] = [
  { key: 'Paid search', color: '#FF5C1A', ramp: () => 1 },
  { key: 'Organic', color: '#3FA98A', ramp: (w) => Math.pow(w / 12, 1.9) * 2.6 },
  { key: 'Social', color: '#7B6CF6', ramp: (w) => 0.45 + 0.75 * Math.sin(Math.min(1, w / 9) * Math.PI / 2) },
  { key: 'Lifecycle', color: '#E8C547', ramp: (w) => 0.35 + 0.14 * w },
];

export const WEEKS = 12;

/** Each preset sums to 1: same budget, different split. Order matches CHANNELS. */
export const PRESETS = [
  { label: 'Paid-led', mix: [0.7, 0.1, 0.15, 0.05] },
  { label: 'Balanced', mix: [0.35, 0.3, 0.2, 0.15] },
  { label: 'Compound', mix: [0.15, 0.55, 0.1, 0.2] },
  { label: 'Lifecycle', mix: [0.25, 0.2, 0.15, 0.4] },
];

/** Cumulative results per week for a given budget split. */
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
