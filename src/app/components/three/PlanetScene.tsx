import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Planet } from './Planet';
import { OrbitPath } from './OrbitPath';
import { MouseParallaxCamera } from './MouseParallaxCamera';
import { SceneLoadingFallback } from './SceneLoadingFallback';
import {
  ORBIT_RADII,
  type PlanetKey,
} from '../../constants/planetTextures';

export interface PlanetSceneProps {
  planet: PlanetKey;
  size?: number;
  orbitRadius?: number;
  showOrbit?: boolean;
  autoRotate?: boolean;
  enableParallax?: boolean;
}

export default function PlanetScene({
  planet,
  size = 280,
  orbitRadius,
  showOrbit = true,
  autoRotate = true,
  enableParallax = true,
}: PlanetSceneProps) {
  const isSun = planet === 'sun';
  const resolvedOrbit = orbitRadius ?? ORBIT_RADII[planet];

  return (
    <div
      className="planet-scene-canvas"
      style={{ width: size, height: size, flexShrink: 0 }}
    >
      <Suspense fallback={<SceneLoadingFallback size={size} label={`Loading ${planet}…`} />}>
        <Canvas
          camera={{ position: [0, 0, isSun ? 6 : 8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          frameloop="demand"
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={isSun ? 0.15 : 0.3} />
          {!isSun && (
            <>
              <pointLight position={[10, 10, 10]} intensity={2} color="#fff5e0" />
              <pointLight position={[-10, -5, -10]} intensity={0.5} color="#4466ff" />
            </>
          )}

          <MouseParallaxCamera enabled={enableParallax} />

          {showOrbit && resolvedOrbit && !isSun && (
            <OrbitPath radius={resolvedOrbit} />
          )}

          <Planet planet={planet} />

          {!isSun && autoRotate && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.4}
            />
          )}
        </Canvas>
      </Suspense>
    </div>
  );
}
