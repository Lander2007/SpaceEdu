import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import WormholeMesh from './WormholeMesh'

interface Props {
  isVisible: boolean
}

export default function WormholeScene({ isVisible }: Props) {
  if (!isVisible) return null

  return (
    <Canvas
      gl={{
        antialias:       true,
        alpha:           true,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{
        position: 'absolute',
        inset:    0,
        zIndex:   1,
      }}
    >
      <ambientLight intensity={0.2} color="#050512" />
      
      {/* Dynamic colorful lights to color the throat refracting */}
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00ffff" />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#9900ff" />
      <directionalLight position={[0, 0, 8]} intensity={0.5} color="#ffffff" />

      <Suspense fallback={null}>
        <WormholeMesh />
        
        {/* Twinkling coordinate stars outside wormhole */}
        <Stars
          radius={120}
          depth={50}
          count={1500}
          factor={4}
          saturation={0.5}
          fade
          speed={1.5}
        />
      </Suspense>
    </Canvas>
  )
}
