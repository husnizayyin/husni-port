import type { ChartKind } from '../data/work';

/** Small trend sparkline for a case study card. Shapes are illustrative, not real data. */
export function WorkChart({ kind, color }: { kind: ChartKind; color: string }) {
  const pts: [number, number][] = [];
  for (let i = 0; i <= 11; i++) {
    const x = (i / 11) * 300;
    let y: number;
    if (kind === 'down') y = 30 + ((11 - i) / 11) * 95;
    else if (kind === 'up') y = 125 - Math.pow(i / 11, 1.15) * 98;
    else if (kind === 'compound') y = 138 - Math.pow(i / 11, 2.3) * 120;
    else if (kind === 'spike') y = 132 - (i < 7 ? Math.pow(i / 7, 3) * 112 : 112 - ((i - 7) / 4) * 46);
    else y = 118 - Math.sin((i / 11) * Math.PI * 0.85) * 16 - (i / 11) * 58;
    pts.push([x, y]);
  }
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const last = pts[pts.length - 1];
  return (
    <svg viewBox="0 0 300 150" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="149" x2="300" y2="149" stroke="rgba(14,59,46,.18)" strokeWidth="1.5" />
      <path d={`${d} L300 149 L0 149 Z`} fill={color} opacity=".1" />
      <path d={d} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <circle cx="300" cy={last[1]} r="5" fill={color} />
    </svg>
  );
}
