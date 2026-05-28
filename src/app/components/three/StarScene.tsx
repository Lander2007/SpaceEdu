import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Planet } from './Planet';
import { MouseParallaxCamera } from './MouseParallaxCamera';
import { ScrollCameraZoom } from './ScrollCameraZoom';
import { SceneLoadingFallback } from './SceneLoadingFallback';
import { MilkyWay3D } from './MilkyWay3D';

interface StarSceneProps {
  className?: string;
  scrollTriggerId?: string;
  variant?: 'galaxy' | 'compact';
  focusMode?: 'full' | 'core' | 'orion' | 'perseus';
  mouseX?: number;
  mouseY?: number;
  enableCameraControl?: boolean;
}

export default function StarScene({
  className = '',
  scrollTriggerId = '#galaxy-section',
  variant = 'galaxy',
  focusMode = 'full',
  mouseX = 0,
  mouseY = 0,
  enableCameraControl = false,
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
              <MilkyWay3D 
                focusMode={focusMode} 
                mouseX={mouseX} 
                mouseY={mouseY} 
                enableCameraControl={enableCameraControl} 
              />
              {!enableCameraControl && (
                <ScrollCameraZoom triggerSelector={scrollTriggerId} fromZ={8} toZ={3} scrub={2} />
              )}
            </>
          )}

          <ambientLight intensity={0.2} />
          <Planet planet="sun" />
          {!enableCameraControl && (
            <MouseParallaxCamera enabled={isGalaxy} xStrength={0.35} yStrength={0.2} />
          )}
        </Canvas>
      </Suspense>
    </div>
  );
}
