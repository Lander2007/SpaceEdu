import { Suspense }   from 'react'
import { Canvas }     from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import PlanetMesh     from './PlanetMesh'
import type { PlanetData } from '../../../data/planets'

interface Props {
  planet:    PlanetData
  isVisible: boolean
}

export default function PlanetScene({ planet, isVisible }: Props) {
  if (!isVisible) return null

  const isMobile = window.innerWidth <= 768

  return (
    <Canvas
      gl={{
        antialias:       !isMobile,
        alpha:           true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, isMobile ? 1.5 : 2]}
      performance={{ min: 0.5 }}
      camera={{ position: [0, 1.5, 5.5], fov: 45 }}
      style={{
        position: 'absolute',
        inset:    0,
        zIndex:   1,
      }}
    >
      {/* Lighting */}
      <directionalLight
        position={[5, 3, 4]}
        intensity={3.0}
        color="#FFF4E0"
      />
      <ambientLight intensity={0.15} color="#0a0a18" />
      <directionalLight
        position={[-5, -2, -3]}
        intensity={0.2}
        color="#112244"
      />
      <pointLight
        position={[4, 3, 5]}
        intensity={2.0}
        color="#FFEEDD"
      />

      <Suspense fallback={null}>
        <PlanetMesh
          planetId={planet.id}
          color={planet.color}
          texturePath={planet.texturePath}
          tilt={planet.tilt}
          autoSpeed={planet.autoSpeed}
          hasSaturnRings={planet.id === 'saturn'}
        />

        {/* Twinkling coordinate stars backdrop for high entertainment value */}
        <Stars
          radius={120}
          depth={50}
          count={800}
          factor={4}
          saturation={0.5}
          fade
          speed={1.2}
        />
      </Suspense>

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}
