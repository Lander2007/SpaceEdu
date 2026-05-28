import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

interface AsteroidBelt3DProps {
  selectedRegion: string | null;
  compositionFilter: number; // 0=All, 1=Metallic, 2=Stony, 3=Carbonaceous
  isCinematicMode: boolean;
}

export default function AsteroidBelt3D({
  selectedRegion,
  compositionFilter,
  isCinematicMode
}: AsteroidBelt3DProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const ceresRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  // Camera lerp targets
  const currentCam = useRef(new THREE.Vector3(0, 30, 45));
  const targetCam = useRef(new THREE.Vector3(0, 30, 45));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const targetTarget = useRef(new THREE.Vector3(0, 0, 0));

  const asteroidCount = 1000;

  // Generate orbital parameters for each asteroid instance
  const { orbits, originalScales, types } = useMemo(() => {
    const orbits = [];
    const originalScales = [];
    const types = []; // 1 = Metallic (Inner), 2 = Stony (Central), 3 = Carbonaceous (Outer)

    for (let i = 0; i < asteroidCount; i++) {
      let radius = 0;
      let type = 1;
      const rand = Math.random();

      if (rand < 0.3) {
        // Inner Belt: 10 - 14 units radius
        radius = 10 + Math.random() * 4;
        type = 1; // Metallic
      } else if (rand < 0.7) {
        // Central Belt: 15 - 21 units radius
        radius = 15 + Math.random() * 6;
        type = 2; // Stony
      } else {
        // Outer Belt: 22 - 28 units radius
        radius = 22 + Math.random() * 6;
        type = 3; // Carbonaceous
      }

      const angle = Math.random() * Math.PI * 2;
      const speed = (0.018 + Math.random() * 0.018) / (radius * 0.07);
      const yOffset = (Math.random() - 0.5) * (radius * 0.06);

      // Random rock-like scaling
      const scaleX = 0.06 + Math.random() * 0.12;
      const scaleY = 0.06 + Math.random() * 0.12;
      const scaleZ = 0.06 + Math.random() * 0.12;

      orbits.push({ radius, angle, speed, yOffset });
      originalScales.push(new THREE.Vector3(scaleX, scaleY, scaleZ));
      types.push(type);
    }
    return { orbits, originalScales, types };
  }, []);

  // Update instanced mesh positions and scales on each frame
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const tempObject = new THREE.Object3D();

    if (meshRef.current) {
      for (let i = 0; i < asteroidCount; i++) {
        const orbit = orbits[i];
        const type = types[i];
        const origScale = originalScales[i];

        // Orbit update
        orbit.angle += orbit.speed * 0.25;
        const x = Math.cos(orbit.angle) * orbit.radius;
        const z = Math.sin(orbit.angle) * orbit.radius;
        const y = orbit.yOffset + Math.sin(orbit.angle * 2 + i) * 0.1;

        tempObject.position.set(x, y, z);

        // Random tumbling rotation
        tempObject.rotation.set(
          time * 0.15 + i * 0.05,
          time * 0.12 + i * 0.03,
          time * 0.08 + i * 0.02
        );

        // Determine scale based on filter
        let finalScale = origScale.clone();
        if (compositionFilter !== 0) {
          // compositionFilter: 1 = Metallic (M-Type), 2 = Stony (S-Type), 3 = Carbonaceous (C-Type)
          if (compositionFilter === 1 && type !== 1) finalScale.multiplyScalar(0.08);
          else if (compositionFilter === 2 && type !== 2) finalScale.multiplyScalar(0.08);
          else if (compositionFilter === 3 && type !== 3) finalScale.multiplyScalar(0.08);
        }

        // Highlight selected region
        if (selectedRegion) {
          const isInner = selectedRegion === 'inner-belt' && type === 1;
          const isCentral = selectedRegion === 'central-belt' && type === 2;
          const isOuter = selectedRegion === 'outer-belt' && type === 3;
          if (isInner || isCentral || isOuter) {
            finalScale.multiplyScalar(1.3);
          } else {
            finalScale.multiplyScalar(0.35); // fade out non-focused regions
          }
        }

        tempObject.scale.copy(finalScale);
        tempObject.updateMatrix();
        meshRef.current.setMatrixAt(i, tempObject.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }

    // Ceres orbit animation (Central Belt)
    if (ceresRef.current) {
      const ceresAngle = time * 0.008;
      const ceresX = Math.cos(ceresAngle) * 18;
      const ceresZ = Math.sin(ceresAngle) * 18;
      ceresRef.current.position.set(ceresX, 0, ceresZ);
      ceresRef.current.rotation.y += 0.003;
    }

    // Camera control animations
    if (isCinematicMode) {
      const angle = time * 0.04;
      targetCam.current.set(
        Math.cos(angle) * 32,
        12 + Math.sin(time * 0.08) * 6,
        Math.sin(angle) * 32
      );
      targetTarget.current.set(0, 0, 0);
    } else if (selectedRegion === 'inner-belt') {
      targetCam.current.set(0, 6, 16);
      targetTarget.current.set(0, 0, 0);
    } else if (selectedRegion === 'central-belt' && ceresRef.current) {
      // Follow Ceres!
      const cp = ceresRef.current.position;
      targetCam.current.set(cp.x - 2.5, cp.y + 1.8, cp.z + 3.5);
      targetTarget.current.copy(cp);
    } else if (selectedRegion === 'outer-belt') {
      targetCam.current.set(-16, 12, 24);
      targetTarget.current.set(0, 0, -8);
    } else {
      // Default view
      targetCam.current.set(0, 32, 40);
      targetTarget.current.set(0, 0, 0);
    }

    // Smooth camera transition
    const lerpSpeed = 0.025;
    camera.position.lerp(targetCam.current, lerpSpeed);
    
    currentTarget.current.lerp(targetTarget.current, lerpSpeed);
    camera.lookAt(currentTarget.current);
  });

  // Assign colors to instances based on composition type
  useEffect(() => {
    if (meshRef.current) {
      const color = new THREE.Color();
      for (let i = 0; i < asteroidCount; i++) {
        const type = types[i];
        if (type === 1) {
          // Metallic: Bronze / Gold
          color.setHSL(0.07 + Math.random() * 0.04, 0.65, 0.32 + Math.random() * 0.15);
        } else if (type === 2) {
          // Stony: Neutral Grey / Slate
          color.setHSL(0.0, 0.0, 0.42 + Math.random() * 0.2);
        } else {
          // Carbonaceous: Very dark charcoal / carbon-blue tint
          color.setHSL(0.55 + Math.random() * 0.05, 0.22, 0.14 + Math.random() * 0.08);
        }
        meshRef.current.setColorAt(i, color);
      }
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }
  }, [types]);

  return (
    <group>
      <OrbitControls 
        enableZoom={true} 
        enablePan={false} 
        maxDistance={60} 
        minDistance={5} 
      />

      {/* Instanced Asteroids */}
      <instancedMesh ref={meshRef} args={[null as any, null as any, asteroidCount]}>
        <dodecahedronGeometry args={[1, 1]} />
        <meshStandardMaterial roughness={0.92} metalness={0.12} flatShading />
      </instancedMesh>

      {/* Ceres (large key object in Central Belt) */}
      <mesh ref={ceresRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#9c9c9c" 
          roughness={0.85} 
          flatShading
        />
        {/* Ceres Atmosphere/Glow */}
        <mesh>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshBasicMaterial 
            color="#00a0ff" 
            transparent 
            opacity={0.06} 
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      </mesh>

      {/* Glowing Orbital Disk Guide */}
      <gridHelper args={[55, 55, "rgba(255,255,255,0.05)", "rgba(255,255,255,0.005)"]} position={[0, -0.05, 0]} />

      {/* Highlight Rings for regions */}
      {selectedRegion === 'inner-belt' && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[9.8, 14.2, 64]} />
          <meshBasicMaterial color="#f5a623" transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
      )}
      {selectedRegion === 'central-belt' && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[14.8, 21.2, 64]} />
          <meshBasicMaterial color="#00a0ff" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      )}
      {selectedRegion === 'outer-belt' && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[21.8, 28.2, 64]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}
