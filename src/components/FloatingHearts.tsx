import { useMemo } from 'react';
import { useReducedMotion } from 'motion/react';

interface HeartSpec {
  id: number;
  leftPct: number;
  size: number;
  durationSec: number;
  delaySec: number;
  swayPx: number;
  rotateStart: number;
  rotateEnd: number;
  peakOpacity: number;
  color: string;
  outline: boolean;
}

const HEART_COLORS = [
  '#FDA4AF', // rose-300
  '#FECDD3', // rose-200
  '#FB7185', // rose-400
  '#F9A8D4', // pink-300
];

// Deterministic PRNG so layout stays stable across renders while looking organically scattered
function seededRandom(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function FloatingHearts() {
  const prefersReducedMotion = useReducedMotion();

  const hearts = useMemo<HeartSpec[]>(() => {
    const rand = seededRandom(20261124);
    const count = 18;
    return Array.from({ length: count }, (_, id) => {
      const durationSec = 13 + rand() * 10; // 13s - 23s gentle drift
      const delaySec = -(rand() * durationSec); // already mid-flight on mount
      return {
        id,
        leftPct: 4 + rand() * 92,
        size: 11 + Math.round(rand() * 11), // 11px - 22px
        durationSec,
        delaySec,
        swayPx: (rand() > 0.5 ? 1 : -1) * (14 + Math.round(rand() * 22)),
        rotateStart: Math.round((rand() - 0.5) * 24),
        rotateEnd: Math.round((rand() - 0.5) * 32),
        peakOpacity: 0.24 + rand() * 0.24, // subtle 0.24 - 0.48
        color: HEART_COLORS[Math.floor(rand() * HEART_COLORS.length)],
        outline: rand() > 0.62,
      };
    });
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden select-none"
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart-item"
          style={
            {
              left: `${heart.leftPct}%`,
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              animationDuration: `${heart.durationSec.toFixed(2)}s`,
              animationDelay: `${heart.delaySec.toFixed(2)}s`,
              '--heart-sway': `${heart.swayPx}px`,
              '--heart-rot-start': `${heart.rotateStart}deg`,
              '--heart-rot-end': `${heart.rotateEnd}deg`,
              '--heart-opacity': heart.peakOpacity.toFixed(2),
            } as React.CSSProperties
          }
        >
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full"
            fill={heart.outline ? 'none' : heart.color}
            stroke={heart.outline ? heart.color : 'rgba(255, 255, 255, 0.7)'}
            strokeWidth={heart.outline ? 1.8 : 0.9}
          >
            <path d="M12 20.4c-.35 0-.7-.12-.98-.35C7.1 16.8 3.5 13.55 3.5 9.2 3.5 6.4 5.68 4.25 8.4 4.25c1.52 0 2.93.72 3.6 1.82.67-1.1 2.08-1.82 3.6-1.82 2.72 0 4.9 2.15 4.9 4.95 0 4.35-3.6 7.6-7.52 10.85-.28.23-.63.35-.98.35Z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
