import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Planet } from './Planet';
import { MouseParallaxCamera } from './MouseParallaxCamera';
import { ScrollCameraZoom } from './ScrollCameraZoom';
import { SceneLoadingFallback } from './SceneLoadingFallback';

interface StarSceneProps {
  className?: string;
  scrollTriggerId?: string;
  variant?: 'galaxy' | 'compact';
}

export default function StarScene({
  className = '',
  scrollTriggerId = '#galaxy-section',
  variant = 'galaxy',
}: StarSceneProps) {
  const isGalaxy = variant === 'galaxy';

  return (
    <div className={`star-scene-canvas ${className}`.trim()}>
      <Suspense fallback={<SceneLoadingFallback size={isGalaxy ? 400 : 360} label="Loading star field…" />}>
        <Canvas
          camera={{ position: [0, 0, isGalaxy ? 8 : 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          frameloop={isGalaxy ? 'always' : 'demand'}
          style={{ background: 'transparent' }}
        >
          {isGalaxy && (
            <>
              <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={0.6} />
              <ScrollCameraZoom triggerSelector={scrollTriggerId} fromZ={8} toZ={3} scrub={2} />
            </>
          )}

          <ambientLight intensity={0.2} />
          <Planet planet="sun" />
          <MouseParallaxCamera enabled={isGalaxy} xStrength={0.35} yStrength={0.2} />
        </Canvas>
      </Suspense>
    </div>
  );
}
