import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BlackHoleProps {
  mouseX: number;
  mouseY: number;
}

export const BlackHole = memo(function BlackHole({ mouseX, mouseY }: BlackHoleProps) {
  const blackHoleRef = useRef<THREE.Group>(null);
  const accretionDiskRef = useRef<THREE.Mesh>(null);
  const eventHorizonRef = useRef<THREE.Mesh>(null);
  const photonSphereRef = useRef<THREE.Mesh>(null);

  // Create accretion disk geometry with more detail
  const accretionDiskGeometry = useMemo(() => {
    const geometry = new THREE.RingGeometry(1.8, 4.5, 128, 32);
    const positions = geometry.attributes.position;
    const colors = new Float32Array(positions.count * 3);
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const distance = Math.sqrt(x * x + y * y);
      const normalizedDist = (distance - 1.8) / (4.5 - 1.8);
      
      // Color gradient from bright orange/yellow to deep red
      const r = 1.0 - normalizedDist * 0.3;
      const g = 0.6 - normalizedDist * 0.5;
      const b = 0.1 - normalizedDist * 0.1;
      
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }
    
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, []);

  // Create accretion disk material with glow
  const accretionDiskMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vColor;
        varying float vDistance;
        attribute vec3 color;
        
        void main() {
          vUv = uv;
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vDistance = length(position.xy);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vColor;
        varying float vDistance;
        
        void main() {
          // Animated turbulence
          float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
          float turbulence = sin(angle * 8.0 + time * 0.5 + vDistance * 3.0) * 0.5 + 0.5;
          
          // Brightness based on distance (inner parts brighter)
          float brightness = 1.0 - (vDistance - 1.8) / (4.5 - 1.8);
          brightness = pow(brightness, 1.5) * (0.8 + turbulence * 0.4);
          
          // Add some noise for realism
          float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233)) + time * 0.1) * 43758.5453);
          brightness *= (0.9 + noise * 0.2);
          
          vec3 finalColor = vColor * brightness;
          
          // Add glow at the edges
          float edgeFade = smoothstep(0.0, 0.2, vDistance - 1.8) * smoothstep(4.5, 4.2, vDistance);
          
          gl_FragColor = vec4(finalColor, edgeFade * 0.95);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  // Event horizon material (pure black with subtle edge glow)
  const eventHorizonMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          // Edge detection for subtle rim light
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float edge = 1.0 - abs(dot(viewDirection, vNormal));
          edge = pow(edge, 4.0);
          
          // Very subtle orange rim from accretion disk light
          vec3 rimColor = vec3(1.0, 0.4, 0.1) * edge * 0.15;
          
          // Almost pure black with tiny bit of rim
          gl_FragColor = vec4(rimColor, 1.0);
        }
      `,
      side: THREE.FrontSide,
    });
  }, []);

  // Photon sphere (gravitational lensing ring)
  const photonSphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vNormal;
        
        void main() {
          vec3 viewDirection = normalize(cameraPosition);
          float edge = 1.0 - abs(dot(viewDirection, vNormal));
          edge = pow(edge, 2.0);
          
          // Bright orange/white ring
          vec3 color = mix(vec3(1.0, 0.6, 0.2), vec3(1.0, 1.0, 1.0), edge);
          float alpha = edge * 0.6;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  // Animation loop
  useFrame((state) => {
    if (!blackHoleRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Update shader uniforms
    if (accretionDiskRef.current) {
      (accretionDiskRef.current.material as THREE.ShaderMaterial).uniforms.time.value = time;
      // Rotate accretion disk
      accretionDiskRef.current.rotation.z = time * 0.15;
    }
    
    if (eventHorizonRef.current) {
      (eventHorizonRef.current.material as THREE.ShaderMaterial).uniforms.time.value = time;
    }
    
    if (photonSphereRef.current) {
      (photonSphereRef.current.material as THREE.ShaderMaterial).uniforms.time.value = time;
    }
    
    // Subtle rotation based on mouse position
    blackHoleRef.current.rotation.x = mouseY * 0.3;
    blackHoleRef.current.rotation.y = mouseX * 0.3;
    
    // Gentle floating animation
    blackHoleRef.current.position.y = Math.sin(time * 0.3) * 0.1;
  });

  return (
    <group ref={blackHoleRef}>
      {/* Event Horizon (black sphere) */}
      <mesh ref={eventHorizonRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <primitive object={eventHorizonMaterial} />
      </mesh>
      
      {/* Photon Sphere (gravitational lensing ring) */}
      <mesh ref={photonSphereRef}>
        <sphereGeometry args={[1.65, 64, 64]} />
        <primitive object={photonSphereMaterial} />
      </mesh>
      
      {/* Accretion Disk */}
      <mesh ref={accretionDiskRef} rotation={[Math.PI / 2.2, 0, 0]}>
        <primitive object={accretionDiskGeometry} />
        <primitive object={accretionDiskMaterial} />
      </mesh>
      
      {/* Additional glow layers for depth */}
      <mesh rotation={[Math.PI / 2.2, 0, Math.PI / 4]}>
        <ringGeometry args={[2.0, 4.2, 64, 1]} />
        <meshBasicMaterial 
          color="#ff6600" 
          transparent 
          opacity={0.08} 
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Outer glow halo */}
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial 
          color="#ff4400" 
          transparent 
          opacity={0.02} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Point light to illuminate surroundings */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#ff6600" distance={15} decay={2} />
    </group>
  );
});
