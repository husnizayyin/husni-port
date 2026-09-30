export type ChartKind = 'compound' | 'up' | 'retain' | 'spike';

interface WorkChartProps {
  kind: ChartKind;
  color: string;
}

/**
 * Animated SVG Growth Sparkline & Trend Graph with gradient area and grid markers.
 */
export function WorkChart({ kind, color }: WorkChartProps) {
  const pts: [number, number][] = [];
  const total = 14;

  for (let i = 0; i <= total; i++) {
    const x = (i / total) * 400;
    let y: number;
    const ratio = i / total;

    if (kind === 'compound') {
      // Exponential / accelerated upward momentum
      y = 110 - Math.pow(ratio, 2.2) * 85;
    } else if (kind === 'up') {
      // Steady steep growth
      y = 105 - Math.pow(ratio, 1.2) * 80;
    } else if (kind === 'spike') {
      // Dynamic breakthrough climb
      y = ratio < 0.6
        ? 105 - Math.pow(ratio / 0.6, 2) * 45
        : 60 - Math.pow((ratio - 0.6) / 0.4, 1.4) * 40;
    } else {
      // High-sustained scale trajectory
      y = 95 - Math.sin(ratio * Math.PI * 0.9) * 20 - ratio * 48;
    }

    pts.push([x, y]);
  }

  const pathD = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const lastPt = pts[pts.length - 1];
  const gradientId = `growth-grad-${color.replace(/[^a-zA-Z0-9]/g, '')}-${kind}`;

  return (
    <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="growth-svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="85%" stopColor={color} stopOpacity="0.02" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Guide lines */}
      <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(14,59,46,0.06)" strokeDasharray="3 3" />
      <line x1="0" y1="70" x2="400" y2="70" stroke="rgba(14,59,46,0.06)" strokeDasharray="3 3" />
      <line x1="0" y1="118" x2="400" y2="118" stroke="rgba(14,59,46,0.14)" strokeWidth="1.2" />

      {/* Area Fill */}
      <path d={`${pathD} L400 118 L0 118 Z`} fill={`url(#${gradientId})`} />

      {/* Smooth Line */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* Glow dot on latest point */}
      <circle cx="400" cy={lastPt[1]} r="7" fill={color} opacity="0.25" />
      <circle cx="400" cy={lastPt[1]} r="4" fill={color} />
      <circle cx="400" cy={lastPt[1]} r="2" fill="#FFFFFF" />
    </svg>
  );
}
