import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function WormholeMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Custom Gravitational Lensing / Einstein Ring Throat Shader
  const uniforms = useRef({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(800, 800) }
  })

  useFrame((state) => {
    if (meshRef.current) {
      // Swirling rotation
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.12
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.08
      uniforms.current.uTime.value = state.clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={meshRef}>
      {/* Mesmerizing spherical gravitational throat lens */}
      <sphereGeometry args={[2.0, 64, 64]} />
      <shaderMaterial
        transparent
        side={THREE.DoubleSide}
        uniforms={uniforms.current}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewPosition;

          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewPosition;

          // Simple procedural fractional Brownian noise
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                       mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
          }

          void main() {
            // High refractive lensing index
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            
            // Fresnel refraction rim logic
            float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);

            // Polar coordinates swirl throat texture
            vec2 uv = vUv - 0.5;
            float r = length(uv);
            float theta = atan(uv.y, uv.x);

            // Speed swirl inside throat
            float swirl = theta + 3.0 * noise(uv * 1.5 + uTime * 0.15) - (r * 8.0) + (uTime * 0.8);
            
            // Neon cyan/violet light distortion rays
            float pattern = sin(swirl * 12.0) * 0.5 + 0.5;
            pattern *= smoothstep(0.1, 0.45, r) * (1.0 - smoothstep(0.45, 0.5, r));

            // Deep cosmic colors
            vec3 throatColor = mix(
              vec3(0.05, 0.0, 0.15), // Deep abyss void
              vec3(0.0, 0.85, 0.95), // Radiant gravitational lens ring
              pattern
            );

            // Shimmering starlight stars inside wormhole
            float stars = step(0.985, noise(uv * 35.0 + uTime * 0.05));
            throatColor += vec3(stars * 0.8);

            // Blend inside & fresnel refracting ring
            vec3 finalColor = mix(throatColor, vec3(0.6, 0.2, 1.0), fresnel * 0.7);
            float alpha = smoothstep(0.0, 0.1, r) * (0.8 + fresnel * 0.2);

            gl_FragColor = vec4(finalColor, alpha);
          }
        `}
      />
    </mesh>
  )
}
