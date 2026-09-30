import { useState } from 'react';
import { PRESETS } from '../data/channels';

/**
 * Kept as its own component so a click re-renders only these buttons,
 * never the chart (which is drawn imperatively by Mix).
 */
export function PresetButtons({ onSelect }: { onSelect: (mix: number[]) => void }) {
  const [active, setActive] = useState(0);
  return (
    <div className="mbtns">
      {PRESETS.map((p, i) => (
        <button
          key={p.label}
          className="mbtn"
          type="button"
          aria-pressed={i === active}
          onClick={() => {
            setActive(i);
            onSelect(p.mix);
          }}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
