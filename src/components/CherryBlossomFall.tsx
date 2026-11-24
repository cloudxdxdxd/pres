import { useMemo } from 'react';
import { useReducedMotion } from 'motion/react';

interface PetalSpec {
  id: number;
  leftPct: number;
  width: number;
  height: number;
  durationSec: number;
  delaySec: number;
  driftX: number;
  rotateStart: number;
  rotateEnd: number;
  peakOpacity: number;
  fill: string;
  stroke: string;
}

const PETAL_PALETTE = [
  { fill: '#FBCFE8', stroke: 'rgba(244, 114, 182, 0.35)' }, // soft sakura pink
  { fill: '#FCE7F3', stroke: 'rgba(249, 168, 212, 0.45)' }, // pale blossom
  { fill: '#FECDD3', stroke: 'rgba(251, 113, 133, 0.3)' },  // blush rose
  { fill: '#FFF1F2', stroke: 'rgba(253, 164, 175, 0.45)' }, // ivory pink
  { fill: '#F9A8D4', stroke: 'rgba(244, 114, 182, 0.3)' },  // deeper petal pink
];

function seededRandom(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function CherryBlossomFall() {
  const prefersReducedMotion = useReducedMotion();

  const petals = useMemo<PetalSpec[]>(() => {
    const rand = seededRandom(20261125);
    const count = 20;
    return Array.from({ length: count }, (_, id) => {
      const durationSec = 11 + rand() * 9; // 11s - 20s gentle fall
      const delaySec = -(rand() * durationSec);
      const sizeBase = 10 + Math.round(rand() * 9); // 10px - 19px
      const palette = PETAL_PALETTE[Math.floor(rand() * PETAL_PALETTE.length)];
      return {
        id,
        leftPct: 2 + rand() * 96,
        width: sizeBase,
        height: Math.round(sizeBase * 1.28),
        durationSec,
        delaySec,
        driftX: (rand() > 0.3 ? 1 : -1) * (28 + Math.round(rand() * 52)), // soft breeze drift
        rotateStart: Math.round(rand() * 360),
        rotateEnd: Math.round(rand() * 360) + (rand() > 0.5 ? 240 : -240),
        peakOpacity: 0.44 + rand() * 0.3, // 0.44 - 0.74
        fill: palette.fill,
        stroke: palette.stroke,
      };
    });
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[2] pointer-events-none overflow-hidden select-none"
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="sakura-petal-item"
          style={
            {
              left: `${petal.leftPct}%`,
              width: `${petal.width}px`,
              height: `${petal.height}px`,
              animationDuration: `${petal.durationSec.toFixed(2)}s`,
              animationDelay: `${petal.delaySec.toFixed(2)}s`,
              '--petal-drift': `${petal.driftX}px`,
              '--petal-rot-start': `${petal.rotateStart}deg`,
              '--petal-rot-end': `${petal.rotateEnd}deg`,
              '--petal-opacity': petal.peakOpacity.toFixed(2),
            } as React.CSSProperties
          }
        >
          <svg
            viewBox="0 0 24 30"
            className="w-full h-full"
            fill="none"
          >
            {/* Classic notched cherry blossom (sakura) petal */}
            <path
              d="M12 28 C10.8 25.5 4.2 19.8 4 12.2 C3.8 6.8 6.9 2.4 9.6 2.1 C10.9 2 11.6 3.5 12 5.1 C12.4 3.5 13.1 2 14.4 2.1 C17.1 2.4 20.2 6.8 20 12.2 C19.8 19.8 13.2 25.5 12 28 Z"
              fill={petal.fill}
              stroke={petal.stroke}
              strokeWidth="0.9"
            />
            <path
              d="M12 25.5 C11.9 20.5 11.9 15.5 12 9.5"
              stroke="rgba(255, 255, 255, 0.65)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
