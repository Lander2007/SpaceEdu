import { useMemo } from 'react';

export function ParallaxStars() {
  const farStars = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.3 + 0.1,
      })),
    []
  );
  const midStars = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.2,
      })),
    []
  );
  const nearStars = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.7 + 0.3,
      })),
    []
  );

  return (
    <div
      className="star-field fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        opacity: 0.4, // GSAP will animate 0.4 -> 1 during the Galaxy pin section
        willChange: 'transform, opacity',
      }}
    >
      <div className="absolute inset-0">
        {farStars.map((s) => (
          <div
            key={s.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: `${s.left}%`, top: `${s.top}%`, opacity: s.opacity }}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {midStars.map((s) => (
          <div
            key={s.id}
            className="absolute w-1.5 h-1.5 bg-white rounded-full"
            style={{ left: `${s.left}%`, top: `${s.top}%`, opacity: s.opacity }}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {nearStars.map((s) => (
          <div
            key={s.id}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{ left: `${s.left}%`, top: `${s.top}%`, opacity: s.opacity }}
          />
        ))}
      </div>
    </div>
  );
}
