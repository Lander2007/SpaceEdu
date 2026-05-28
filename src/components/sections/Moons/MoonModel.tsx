import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame }            from '@react-three/fiber'
import { OrbitControls }               from '@react-three/drei'
import { useInView }                   from 'react-intersection-observer'
import * as THREE                       from 'three'
import type { MoonData }                from '../../../data/moons'

// ── Moon mesh with procedural texture fallback ────────────
function MoonMesh({ moon }: { moon: MoonData }) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Memoize the procedural texture to prevent constant recreation/disposal and network 404s
  const texture = useMemo(() => {
    const canvas  = document.createElement('canvas')
    canvas.width  = 512
    canvas.height = 512
    const ctx     = canvas.getContext('2d')!

    // Base color
    ctx.fillStyle = moon.color
    ctx.fillRect(0, 0, 512, 512)

    // Add noise/craters procedurally
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 512
      const r = Math.random() * 20 + 2
      const dark = Math.random() > 0.5

      const grd = ctx.createRadialGradient(x, y, 0, x, y, r)
      grd.addColorStop(0, dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.15)')
      grd.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    // Ice effect
    if (moon.hasIce) {
      const iceGrd = ctx.createRadialGradient(256, 100, 20, 256, 100, 200)
      iceGrd.addColorStop(0, 'rgba(200,220,255,0.3)')
      iceGrd.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = iceGrd
      ctx.fillRect(0, 0, 512, 512)
    }

    const tex = new THREE.CanvasTexture(canvas)
    return tex
  }, [moon])

  // Dispose of procedural texture on unmount
  useEffect(() => {
    return () => {
      if (texture) {
        texture.dispose()
      }
    }
  }, [texture])

  // Memoize material to avoid WebGL compiler thrashing and black material bugs
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map:       texture ?? undefined,
      color:     texture ? '#ffffff' : moon.color,
      roughness: moon.roughness,
      metalness: 0.0,
    })
  }, [texture, moon.color, moon.roughness])

  // Dispose of material on unmount/re-creation
  useEffect(() => {
    return () => {
      material.dispose()
    }
  }, [material])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003 * delta * 60
    }
  })

  return (
    <mesh ref={meshRef} material={material}>
      <sphereGeometry args={[1.4, 64, 64]} />
    </mesh>
  )
}

// ── Atmosphere for moons that have one ───────────────────
function MoonAtmosphere({ moon }: { moon: MoonData }) {
  if (!moon.hasIce && !moon.hasOcean) return null
  return (
    <mesh>
      <sphereGeometry args={[1.52, 32, 32]} />
      <shaderMaterial
        transparent
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        uniforms={{
          glowColor: {
            value: new THREE.Color(
              moon.hasOcean ? '#4488ff' : '#aaccff'
            )
          }
        }}
        vertexShader={`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix
                        * modelViewMatrix
                        * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 glowColor;
          varying vec3 vNormal;
          void main() {
            float rim = 1.0 - abs(dot(vNormal, vec3(0,0,1)));
            rim = pow(rim, 2.5);
            gl_FragColor = vec4(glowColor, rim * 0.5);
          }
        `}
      />
    </mesh>
  )
}

// ── Main canvas component ─────────────────────────────────
interface Props {
  moon:         MoonData
  onZoomChange: (zoomed: boolean) => void
  size?:        'small' | 'large'
}

export default function MoonModel({ moon, onZoomChange, size = 'large' }: Props) {
  const isSmall = size === 'small'

  const { ref, inView } = useInView({
    threshold: 0.01,
    rootMargin: '150px 0px 150px 0px',
  })

  return (
    <div
      ref={ref}
      style={{
        width:    '100%',
        height:   '100%',
        cursor:   isSmall ? 'pointer' : 'grab',
        position: 'relative',
      }}
    >
      {inView ? (
        <Canvas
          gl={{
            antialias:       true,
            alpha:           true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 1.5]}
          camera={{
            position: [0, 0, isSmall ? 4.8 : 4.0],
            fov:      45,
          }}
          style={{ background: 'transparent' }}
        >
          {/* Lighting */}
          <directionalLight
            position={[5, 3, 5]}
            intensity={2.5}
            color="#FFF4E0"
          />
          <ambientLight intensity={0.2} color="#0a0a20" />
          <pointLight
            position={[-3, -2, 2]}
            intensity={0.3}
            color="#4466aa"
          />

          <MoonMesh moon={moon} />
          <MoonAtmosphere moon={moon} />

          {/* Only allow orbit controls on large size */}
          {!isSmall && (
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={2.0}
              maxDistance={6.0}
              autoRotate={false}
              makeDefault
            />
          )}
        </Canvas>
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '80%',
            height: '80%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${moon.color} 0%, rgba(0,0,0,0) 70%)`,
            opacity: 0.6,
            filter: 'blur(2px)',
          }} />
        </div>
      )}
    </div>
  )
}
