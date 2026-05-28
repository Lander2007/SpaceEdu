import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import MillerMesh from './MillerMesh'

interface Props {
  isVisible: boolean
}

export default function MillerScene({ isVisible }: Props) {
  if (!isVisible) return null

  return (
    <Canvas
      gl={{
        antialias:       true,
        alpha:           true,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 4.8], fov: 45 }}
      style={{
        position: 'absolute',
        inset:    0,
        zIndex:   1,
      }}
    >
      {/* Heavy blue/cyan lighting for deep water look */}
      <ambientLight intensity={0.25} color="#0c1a30" />
      <directionalLight position={[6, 3, 5]} intensity={2.5} color="#dcf0fa" />
      <pointLight position={[-4, -2, -3]} intensity={1.2} color="#005588" />

      <Suspense fallback={null}>
        <MillerMesh />

        {/* Twinkling star field backdrop surrounding Miller's Planet */}
        <Stars
          radius={120}
          depth={50}
          count={800}
          factor={4}
          saturation={0.5}
          fade
          speed={1.5}
        />
      </Suspense>
    </Canvas>
  )
}
