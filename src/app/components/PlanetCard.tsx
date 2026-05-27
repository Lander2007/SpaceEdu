import { lazy, Suspense, type Ref } from 'react';
import { motion } from 'motion/react';
import { SceneLoadingFallback } from './three/SceneLoadingFallback';
import type { PlanetKey } from '../constants/planetTextures';

const PlanetScene = lazy(() => import('./three/PlanetScene'));

interface PlanetCardProps {
  name: string;
  fact: string;
  patternType: PlanetKey;
  size: number;
  distance?: string;
  orbitalPeriod?: string;
  moons?: number;
  variant?: 'full' | 'orbit';
  canvasRef?: Ref<HTMLDivElement>;
}

const accentByPattern: Record<PlanetKey, string> = {
  sun: '#F5A623',
  mercury: '#B0B0B0',
  venus: '#E8A045',
  earth: '#4FC3F7',
  mars: '#C1440E',
  jupiter: '#C88B3A',
  saturn: '#E8D5A3',
  uranus: '#7DE8E8',
  neptune: '#3A7BD5',
};

export function PlanetCard({
  name,
  fact,
  patternType,
  size,
  distance,
  orbitalPeriod,
  moons,
  variant = 'full',
  canvasRef,
}: PlanetCardProps) {
  const isOrbit = variant === 'orbit';
  const accentColor = accentByPattern[patternType];
  const sceneSize = Math.min(size, isOrbit ? 320 : size);

  const planetVisual = (
    <Suspense fallback={<SceneLoadingFallback size={sceneSize} label={`Loading ${name}…`} />}>
      <PlanetScene planet={patternType} size={sceneSize} showOrbit={isOrbit} />
    </Suspense>
  );

  return (
    <motion.div
      className={
        isOrbit
          ? 'planet-card orbit relative z-[2] px-2'
          : 'min-h-screen flex items-center justify-center px-8'
      }
      style={
        isOrbit
          ? {
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              boxShadow: '0 0 0 rgba(0,0,0,0)',
              willChange: 'transform, box-shadow',
            }
          : undefined
      }
      initial={false}
      whileHover={
        isOrbit
          ? {
              scale: 1.08,
              boxShadow: `0 0 70px ${accentColor}66`,
            }
          : undefined
      }
      transition={isOrbit ? { duration: 0.4, ease: 'easeOut' } : undefined}
    >
      <div className={isOrbit ? 'flex items-start gap-10 w-full max-w-6xl' : 'flex items-center gap-20 max-w-6xl'}>
        <div
          ref={canvasRef}
          className="planet-canvas-wrapper flex-shrink-0"
          style={{ willChange: 'transform, opacity' }}
        >
          {planetVisual}
        </div>

        <div className="flex flex-col gap-4">
          <div className={isOrbit ? 'pt-1' : undefined}>
            <h2
              className={isOrbit ? 'text-[64px] leading-none tracking-tight' : 'text-[120px] leading-none tracking-tight mb-4'}
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
            >
              {name}
            </h2>
            <p
              className={isOrbit ? 'text-white/60 italic text-[14px] max-w-md' : 'text-white/60 italic text-lg max-w-md'}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              {fact}
            </p>
          </div>

          {(distance || orbitalPeriod || moons !== undefined) && (
            <div
              className={isOrbit ? 'flex flex-wrap gap-6' : 'flex gap-8'}
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              {distance && (
                <div>
                  <div className="text-[8px] text-white/40 tracking-widest mb-1">DISTANCE FROM SUN</div>
                  <div className="text-[12px] text-white/80">{distance}</div>
                </div>
              )}
              {orbitalPeriod && (
                <div>
                  <div className="text-[8px] text-white/40 tracking-widest mb-1">ORBITAL PERIOD</div>
                  <div className="text-[12px] text-white/80">{orbitalPeriod}</div>
                </div>
              )}
              {moons !== undefined && (
                <div>
                  <div className="text-[8px] text-white/40 tracking-widest mb-1">MOONS</div>
                  <div className="text-[12px] text-white/80">{moons}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
