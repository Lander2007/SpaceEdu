import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface Props {
  texturePath: string
  radiusScale: number
  position:    [number, number, number]
  autoSpeed:   number
  color:       string
  hasSaturnRings?: boolean
}

export default function ScaleMesh({
  texturePath, radiusScale, position, autoSpeed, color, hasSaturnRings
}: Props) {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  // Load texture dynamically
  const texture = useTexture(texturePath)

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    map:       texture,
    roughness: 0.8,
    metalness: 0.05,
  }), [texture])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += autoSpeed * delta * 40
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.0002
    }
  })

  // Saturn Rings geometry
  const saturnRings = useMemo(() => {
    if (!hasSaturnRings) return null
    // Scale rings proportional to radius scale
    const ringScale = radiusScale * 1.8
    const ringGeo = new THREE.RingGeometry(radiusScale * 1.3, ringScale, 64)
    
    // Rotate ring geometry to lie flat
    const pos = ringGeo.attributes.position
    const v3 = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i)
      ringGeo.attributes.position.setXYZ(i, v3.x, v3.z, -v3.y)
    }
    ringGeo.computeVertexNormals()

    return (
      <mesh ref={ringRef} geometry={ringGeo} position={position}>
        <meshStandardMaterial
          color="#A89F82"
          side={THREE.DoubleSide}
          transparent
          opacity={0.7}
        />
      </mesh>
    )
  }, [hasSaturnRings, radiusScale, position])

  return (
    <group>
      <mesh
        ref={meshRef}
        material={material}
        position={position}
      >
        <sphereGeometry args={[radiusScale, 64, 64]} />
      </mesh>
      {saturnRings}
    </group>
  )
}
