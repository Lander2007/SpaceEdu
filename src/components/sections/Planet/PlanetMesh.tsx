import { useRef, useMemo }    from 'react'
import { useFrame }           from '@react-three/fiber'
import { useTexture }          from '@react-three/drei'
import * as THREE              from 'three'

interface MoonConfig {
  name: string
  distance: number
  size: number
  speed: number
  color: string
}

// Moons configuration based on planet id
const getMoons = (id: string): MoonConfig[] => {
  if (id === 'earth') {
    return [
      { name: 'Luna', distance: 2.4, size: 0.12, speed: 0.015, color: '#e5e5e5' }
    ]
  }
  if (id === 'mars') {
    return [
      { name: 'Phobos', distance: 2.1, size: 0.07, speed: 0.03, color: '#a18d84' },
      { name: 'Deimos', distance: 2.6, size: 0.05, speed: 0.02, color: '#877a74' }
    ]
  }
  if (id === 'jupiter') {
    return [
      { name: 'Io', distance: 2.2, size: 0.10, speed: 0.04, color: '#e5d16f' },
      { name: 'Europa', distance: 2.6, size: 0.09, speed: 0.03, color: '#d2edf4' },
      { name: 'Ganymede', distance: 3.1, size: 0.14, speed: 0.02, color: '#b1afab' },
      { name: 'Callisto', distance: 3.6, size: 0.12, speed: 0.012, color: '#7a7977' }
    ]
  }
  if (id === 'saturn') {
    // Rings end at outer: 3.85, so moons must be placed at 4.2+
    return [
      { name: 'Titan', distance: 4.2, size: 0.15, speed: 0.01, color: '#e6b85c' },
      { name: 'Rhea', distance: 4.7, size: 0.08, speed: 0.018, color: '#b0c4de' },
      { name: 'Dione', distance: 5.1, size: 0.07, speed: 0.024, color: '#dcdcdc' }
    ]
  }
  if (id === 'uranus') {
    return [
      { name: 'Titania', distance: 2.3, size: 0.10, speed: 0.025, color: '#e0e0e0' },
      { name: 'Oberon', distance: 2.8, size: 0.09, speed: 0.018, color: '#c8c8c8' },
      { name: 'Ariel', distance: 3.3, size: 0.07, speed: 0.032, color: '#b4b4b4' }
    ]
  }
  if (id === 'neptune') {
    return [
      { name: 'Triton', distance: 2.5, size: 0.13, speed: -0.016, color: '#d9edf2' },
      { name: 'Proteus', distance: 3.2, size: 0.08, speed: 0.028, color: '#90a4ae' }
    ]
  }
  if (id === 'pluto') {
    return [
      { name: 'Charon', distance: 2.2, size: 0.09, speed: 0.02, color: '#9e8c81' },
      { name: 'Nix', distance: 2.8, size: 0.04, speed: 0.035, color: '#c5b8b1' },
      { name: 'Hydra', distance: 3.4, size: 0.05, speed: 0.015, color: '#d1c7c2' }
    ]
  }
  return []
}

function MoonMesh({ moon }: { moon: MoonConfig }) {
  const orbitRef = useRef<THREE.Group>(null)
  
  useFrame((_, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += moon.speed * delta * 60
    }
  })

  return (
    <group ref={orbitRef}>
      {/* Moon sphere */}
      <mesh position={[moon.distance, 0, 0]}>
        <sphereGeometry args={[moon.size, 16, 16]} />
        <meshStandardMaterial color={moon.color} roughness={0.85} metalness={0.0} />
      </mesh>
      
      {/* Faint orbit trail ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[moon.distance - 0.015, moon.distance + 0.015, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

interface Props {
  planetId:    string
  color:       string
  texturePath: string
  tilt:        number
  autoSpeed:   number
  hasSaturnRings?: boolean
}

export default function PlanetMesh({
  planetId, color, texturePath, tilt, autoSpeed, hasSaturnRings
}: Props) {
  const meshRef  = useRef<THREE.Mesh>(null)
  const ringRef  = useRef<THREE.Mesh>(null)

  // Load texture
  const texture = useTexture(texturePath)

  // PBR material — self-luminous for the Sun, standard PBR for planets
  const material = useMemo(() => {
    const isSun = planetId === 'sun'
    return new THREE.MeshStandardMaterial({
      map:       texture,
      roughness: isSun ? 0.9 : 0.75,
      metalness: 0.0,
      emissive: isSun ? new THREE.Color('#FFA500') : new THREE.Color('#000000'),
      emissiveMap: isSun ? texture : null,
      emissiveIntensity: isSun ? 3.0 : 0.0,
    })
  }, [texture, planetId])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += autoSpeed * delta * 60
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.0003
    }
  })

  // Get moons list for this planet
  const moons = useMemo(() => getMoons(planetId), [planetId])

  // Parse color for atmospheric glow uniform
  const glowRGB = useMemo(() => new THREE.Color(color), [color])

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  return (
    <group rotation={[0, 0, tilt]}>
      {/* Symmetrically scale down planet body, atmosphere, and rings */}
      <group scale={isMobile ? 0.7 : 0.8}>
        {/* Planet sphere */}
        <mesh ref={meshRef} material={material}>
          <sphereGeometry args={[1.5, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
        </mesh>

        {/* Atmosphere glow */}
        <mesh>
          <sphereGeometry args={[1.62, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
          <shaderMaterial
            transparent
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            uniforms={useMemo(() => ({
              uColor: { value: glowRGB }
            }), [glowRGB])}
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
              varying vec3 vNormal;
              uniform vec3 uColor;
              void main() {
                float rim = 1.0 - abs(dot(vNormal, vec3(0,0,1)));
                rim = pow(rim, 2.5);
                gl_FragColor = vec4(uColor, rim * 0.45);
              }
            `}
          />
        </mesh>

        {/* Saturn rings */}
        {hasSaturnRings && (
          <group rotation={[Math.PI / 2.2, 0, 0]}>
            {[
              { inner: 1.85, outer: 2.1,  opacity: 0.25, color: '#8B7355' },
              { inner: 2.1,  outer: 2.9,  opacity: 0.9,  color: '#D4A855' },
              { inner: 2.9,  outer: 3.05, opacity: 0.85, color: '#050505' },
              { inner: 3.05, outer: 3.7,  opacity: 0.65, color: '#C49A3C' },
              { inner: 3.75, outer: 3.85, opacity: 0.2,  color: '#AA8833' },
            ].map((ring, i) => (
              <mesh key={i} ref={i === 1 ? ringRef : undefined}>
                <ringGeometry args={[ring.inner, ring.outer, 128]} />
                <meshBasicMaterial
                  color={ring.color}
                  side={THREE.DoubleSide}
                  transparent
                  opacity={ring.opacity}
                />
              </mesh>
            ))}
          </group>
        )}
      </group>

      {/* Render moons */}
      {moons.map((moon) => (
        <MoonMesh key={moon.name} moon={moon} />
      ))}
    </group>
  )
}
