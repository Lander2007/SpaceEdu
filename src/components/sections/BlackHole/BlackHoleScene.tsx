import { Canvas }       from '@react-three/fiber'
import { Suspense }     from 'react'
import { Stars }        from '@react-three/drei'
import BlackHoleMesh    from './BlackHoleMesh'
import styles           from './BlackHole.module.css'

interface BlackHoleSceneProps {
  isVisible: boolean;
  scrollProgress: number;
  mass: number;
}

export default function BlackHoleScene({ isVisible, scrollProgress, mass }: BlackHoleSceneProps) {
  if (!isVisible) return null  // unmount when off-screen = saves GPU

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  return (
    <Canvas
      className={styles.canvas}
      gl={{
        antialias:          !isMobile,
        alpha:              true,
        powerPreference:   'high-performance',
      }}
      dpr={[1, isMobile ? 1.5 : 2]}
      performance={{ min: 0.5 }}
      camera={{ position: [0, 0, 1], fov: 75 }}
      style={{
        position:   'absolute',
        top: 0, left: 0,
        width:  '100%',
        height: '100%',
        zIndex: 0,
      }}
    >
      <Suspense fallback={null}>
        <BlackHoleMesh scrollProgress={scrollProgress} mass={mass} />

        {/* Cinematic starfield surrounding the black hole */}
        <Stars
          radius={100}
          depth={50}
          count={1000}
          factor={4}
          saturation={0.5}
          fade
          speed={1.0}
        />
      </Suspense>
    </Canvas>
  )
}
