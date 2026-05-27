import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import {
  PLANET_SCALES,
  PLANET_TEXTURES,
  type PlanetKey,
} from '../../constants/planetTextures';

interface PlanetProps {
  planet: PlanetKey;
}

export function Planet({ planet }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const scaleRef = useRef(1);
  const baseScale = PLANET_SCALES[planet];
  const isSun = planet === 'sun';
  const isSaturn = planet === 'saturn';
  const isEarth = planet === 'earth';

  const texture = useTexture(PLANET_TEXTURES[planet]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }

    const target = hovered ? 1.15 : 1;
    scaleRef.current += (target - scaleRef.current) * Math.min(1, delta * 8);

    if (groupRef.current) {
      groupRef.current.scale.setScalar(baseScale * scaleRef.current);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = '';
        }}
      >
        <sphereGeometry args={[1, 64, 64]} />
        {isSun ? (
          <meshStandardMaterial
            map={texture}
            emissive="#ff6600"
            emissiveIntensity={2}
            roughness={0.4}
            metalness={0.05}
          />
        ) : (
          <meshStandardMaterial
            map={texture}
            roughness={0.8}
            metalness={0.1}
          />
        )}
      </mesh>

      {isSun && (
        <mesh>
          <sphereGeometry args={[1.07, 32, 32]} />
          <meshBasicMaterial color="#ff6600" transparent opacity={0.08} />
        </mesh>
      )}

      {isEarth && (
        <mesh scale={1.02}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#4488ff"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {isSaturn && (
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[1.4, 2.2, 64]} />
          <meshBasicMaterial
            color="#c2a060"
            side={THREE.DoubleSide}
            transparent
            opacity={0.7}
          />
        </mesh>
      )}
    </group>
  );
}
