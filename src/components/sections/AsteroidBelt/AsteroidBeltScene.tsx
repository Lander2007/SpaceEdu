import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import AsteroidBelt3D from './AsteroidBelt3D';

interface AsteroidBeltSceneProps {
  selectedRegion: string | null;
  compositionFilter: number;
  isCinematicMode: boolean;
}

export default function AsteroidBeltScene({
  selectedRegion,
  compositionFilter,
  isCinematicMode
}: AsteroidBeltSceneProps) {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 32, 40], fov: 45 }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
      }}
    >
      <ambientLight intensity={0.4} color="#0d0e1a" />
      <directionalLight position={[15, 20, 15]} intensity={1.8} color="#ffd4a3" />
      <pointLight position={[-15, -10, -15]} intensity={0.6} color="#8ab4ff" />

      <Suspense fallback={null}>
        <AsteroidBelt3D
          selectedRegion={selectedRegion}
          compositionFilter={compositionFilter}
          isCinematicMode={isCinematicMode}
        />
        <Stars
          radius={120}
          depth={40}
          count={1200}
          factor={3}
          saturation={0.5}
          fade
          speed={0.8}
        />
      </Suspense>
    </Canvas>
  );
}
