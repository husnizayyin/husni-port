/**
 * Tiny programmatic scroller (used by the nav, the dot rail and "Run at speed").
 * No smooth-scroll library on purpose: native scroll stays native on trackpads and phones.
 * Any real user input cancels an in-flight animation.
 */
let raf: number | null = null;

export const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const linear = (x: number) => x;

export function stopScroll() {
  if (raf !== null) {
    cancelAnimationFrame(raf);
    raf = null;
  }
}

export function scrollToY(y: number, duration: number, ease: (x: number) => number = easeInOut) {
  stopScroll();
  const from = window.scrollY;
  const delta = y - from;
  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    window.scrollTo(0, from + delta * ease(p));
    raf = p < 1 ? requestAnimationFrame(step) : null;
  };
  raf = requestAnimationFrame(step);
}

/** Call once at app start. Returns a cleanup function. */
export function installScrollCancel() {
  const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
  events.forEach((e) => window.addEventListener(e, stopScroll, { passive: true }));
  return () => events.forEach((e) => window.removeEventListener(e, stopScroll));
}
