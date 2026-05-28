import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function MillerMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Custom high-frequency water wave vertex shader
  const uniforms = useRef({
    uTime: { value: 0 },
  })

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      uniforms.current.uTime.value = state.clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.6, 64, 64]} />
      <shaderMaterial
        transparent
        uniforms={uniforms.current}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;

          // Simple sinusoidal wave displacement mimicking water waves
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            
            // Ocean tidal wave displacements
            vec3 pos = position;
            float wave = sin(pos.x * 4.0 + uTime * 2.0) * cos(pos.z * 4.0 + uTime * 1.5) * 0.08;
            pos += normal * wave;
            
            vPosition = pos;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;

          void main() {
            vec3 viewDir = normalize(-vPosition);
            vec3 normal = normalize(vNormal);

            // Ocean deep color and sparkling crest highlights
            vec3 oceanDeep = vec3(0.01, 0.12, 0.28);
            vec3 waveCrest = vec3(0.4, 0.85, 0.95);

            // Simple wave pattern noise
            float pattern = sin(vPosition.x * 20.0 + uTime * 3.0) * cos(vPosition.y * 20.0 + uTime * 2.0);
            pattern = smoothstep(0.4, 0.9, pattern);

            vec3 waterColor = mix(oceanDeep, waveCrest, pattern * 0.4);

            // Fresnel ocean reflection rim
            float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
            vec3 finalColor = mix(waterColor, vec3(0.7, 0.9, 1.0), fresnel * 0.6);

            gl_FragColor = vec4(finalColor, 0.92);
          }
        `}
      />
    </mesh>
  )
}
