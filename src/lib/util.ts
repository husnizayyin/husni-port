/** Thousands separators, rounded: 1284306 -> "1,284,306" */
export const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Point on an ellipse at angle t (radians). */
export const ellipsePoint = (cx: number, cy: number, rx: number, ry: number, t: number): [number, number] => [
  cx + rx * Math.cos(t),
  cy + ry * Math.sin(t),
];

/** Point on a quadratic bezier at t in 0..1. */
export const quadPoint = (
  x0: number, y0: number, mx: number, my: number, x1: number, y1: number, t: number,
): [number, number] => {
  const u = 1 - t;
  return [u * u * x0 + 2 * u * t * mx + t * t * x1, u * u * y0 + 2 * u * t * my + t * t * y1];
};

/** Small seeded PRNG so the film's dots land in the same place every load. */
export function makeRng(seed: number) {
  let s = seed;
  return () => (s = (s * 1103515245 + 12345) >>> 0) / 4294967296;
}

/** Local wall-clock time (UTC+7, WIB) as HH:MM. */
export function localTime() {
  const d = new Date(Date.now() + new Date().getTimezoneOffset() * 60000 + 7 * 3600000);
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}
export const klTime = localTime;
