// src/components/sections/BlackHole/BlackHoleMesh.tsx

import { useRef, useMemo }   from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE             from 'three'
import { vertexShader, fragmentShader } from './shaders'

interface BlackHoleMeshProps {
  scrollProgress: number;
  mass:           number;
}

export default function BlackHoleMesh({ scrollProgress, mass }: BlackHoleMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { size } = useThree()

  // Create shader material with uniforms
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uResolution: { value: new THREE.Vector2(
          size.width, size.height
        )},
        uTime:   { value: 0 },
        uScroll: { value: 0 },
        uMouse:  { value: new THREE.Vector2(0, 0) },
        uMass:   { value: mass },
      },
    })
  }, [size.width, size.height])

  // Update resolution when canvas resizes
  useMemo(() => {
    if (material.uniforms.uResolution) {
      material.uniforms.uResolution.value.set(
        size.width, size.height
      )
    }
  }, [size.width, size.height, material])

  // Animation loop — runs every frame
  useFrame((state) => {
    if (!material.uniforms) return
    material.uniforms.uTime.value   = state.clock.elapsedTime
    material.uniforms.uScroll.value = scrollProgress
    material.uniforms.uMass.value   = mass

    // Smoothly ease uMouse toward target state.pointer values
    const targetX = state.pointer.x
    const targetY = state.pointer.y
    material.uniforms.uMouse.value.x += (targetX - material.uniforms.uMouse.value.x) * 0.08
    material.uniforms.uMouse.value.y += (targetY - material.uniforms.uMouse.value.y) * 0.08
  })

  // Full-screen quad: covers entire canvas
  const geometry = useMemo(() =>
    new THREE.PlaneGeometry(2, 2), []
  )

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} />
  )
}
