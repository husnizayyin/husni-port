export interface Channel {
  key: string;
  color: string;
  /** Relative output of one unit of engineering effort across sprints (1..12). */
  ramp: (week: number) => number;
}

/**
 * 3 Core Engineering Specializations analyzed from Husni Zayyin's GitHub repositories & production history:
 * 1. Mobile Developer (Flutter, React Native, Kotlin, Dart, Android SDK)
 * 2. Frontend Developer (React, Next.js, TypeScript, Tailwind CSS, Liquid, Velo)
 * 3. Full Stack (Laravel, PHP, Node.js, PostgreSQL, MySQL, MS SQL, REST APIs)
 */
export const CHANNELS: Channel[] = [
  { key: 'Mobile Developer', color: '#3FA98A', ramp: (w) => Math.pow(w / 12, 1.85) * 2.6 },
  { key: 'Frontend Developer', color: '#FF5C1A', ramp: () => 1 },
  { key: 'Full Stack', color: '#7B6CF6', ramp: (w) => 0.45 + 0.75 * Math.sin(Math.min(1, w / 9) * (Math.PI / 2)) },
];

export const WEEKS = 12;

/** Architecture presets based on git commit and repository velocity distribution. */
export const PRESETS = [
  { label: 'Full Stack Balanced', mix: [0.35, 0.35, 0.30] },
  { label: 'Mobile First Focus', mix: [0.65, 0.20, 0.15] },
  { label: 'Frontend Platform', mix: [0.15, 0.70, 0.15] },
  { label: 'Enterprise Systems', mix: [0.20, 0.25, 0.55] },
];

/** Cumulative output velocity per sprint for a given architecture distribution. */
export function cumulative(share: number[]): number[] {
  const out: number[] = [];
  let acc = 0;
  for (let w = 1; w <= WEEKS; w++) {
    let v = 0;
    CHANNELS.forEach((c, i) => (v += (share[i] ?? 0) * c.ramp(w)));
    acc += v;
    out.push(acc);
  }
  return out;
}

/** Fixed y-scale so switching presets visibly moves the curve smoothly. */
export const CHART_SCALE =
  Math.max(...cumulative([1, 0, 0]), ...cumulative([0, 1, 0]), ...cumulative([0, 0, 1])) * 1.05;
