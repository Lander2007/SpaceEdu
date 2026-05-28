import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

interface MilkyWay3DProps {
  focusMode?: 'full' | 'core' | 'orion' | 'perseus';
  mouseX?: number;
  mouseY?: number;
  enableCameraControl?: boolean;
  spectrumMode?: number;
  isCinematicMode?: boolean;
}

// Scoped camera controller inside the Canvas context
function MilkyWayCameraControl({ 
  focusMode = 'full', 
  mouseX = 0, 
  mouseY = 0, 
  orionRef, 
  starPointsRef,
  isManual,
  setIsManual,
  isCinematicMode
}: {
  focusMode: string;
  mouseX: number;
  mouseY: number;
  orionRef: React.RefObject<THREE.Group | null>;
  starPointsRef: React.RefObject<THREE.Points | null>;
  isManual: boolean;
  setIsManual: (v: boolean) => void;
  isCinematicMode: boolean;
}) {
  const { camera } = useThree();
  const orbitRef = useRef<any>(null);

  const currentCam = useRef(new THREE.Vector3(0, 15, 25));
  const targetCam = useRef(new THREE.Vector3(0, 15, 25));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const targetTarget = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (!isManual) {
      currentCam.current.copy(camera.position);
    }
  }, [isManual, camera]);

  useFrame((state) => {
    if (!orionRef.current || !starPointsRef.current) return;

    if (isManual) return;

    if (isCinematicMode) {
      const time = state.clock.getElapsedTime() * 0.12;
      const radius = 24;
      targetCam.current.set(
        Math.cos(time) * radius,
        9 + Math.sin(time * 0.4) * 3,
        Math.sin(time) * radius
      );
      targetTarget.current.set(0, 0, 0);
    } else {
      // Perseus Arm coordinates (rotating with the galaxy)
      const currentRot = starPointsRef.current.rotation.y;
      const perseusR = 7.2;
      const currentPerseusTheta = 4.2 + currentRot;
      const perseusX = Math.cos(currentPerseusTheta) * perseusR;
      const perseusZ = Math.sin(currentPerseusTheta) * perseusR;

      // Set camera and target coordinates based on focus mode
      if (focusMode === 'full') {
        targetTarget.current.set(0, 0, 0);
        targetCam.current.set(0, 13.5, 20.0);
      } else if (focusMode === 'core') {
        targetTarget.current.set(0, 0, 0);
        targetCam.current.set(0, 1.8, 3.2);
      } else if (focusMode === 'orion') {
        targetTarget.current.copy(orionRef.current.position);
        targetCam.current.set(
          orionRef.current.position.x - 1.2,
          orionRef.current.position.y + 0.9,
          orionRef.current.position.z + 1.8
        );
      } else if (focusMode === 'perseus') {
        targetTarget.current.set(perseusX, 0, perseusZ);
        targetCam.current.set(
          perseusX + 1.5,
          0.8,
          perseusZ + 1.5
        );
      }
    }

    // Lerp camera and target
    const lerpS = 0.035;
    currentCam.current.lerp(targetCam.current, lerpS);
    currentTarget.current.lerp(targetTarget.current, lerpS);

    // Apply mouse parallax (only if not cinematic scan)
    const parallaxX = isCinematicMode ? 0 : mouseX * 2.8;
    const parallaxY = isCinematicMode ? 0 : mouseY * 1.8;

    camera.position.set(
      currentCam.current.x + parallaxX,
      currentCam.current.y + parallaxY,
      currentCam.current.z
    );
    camera.lookAt(currentTarget.current);
  });

  return (
    <OrbitControls
      ref={orbitRef}
      enableDamping
      dampingFactor={0.05}
      maxDistance={40}
      minDistance={3}
      onStart={() => {
        setIsManual(true);
        if (orbitRef.current) {
          orbitRef.current.target.copy(currentTarget.current);
        }
      }}
    />
  );
}

export function MilkyWay3D({ 
  focusMode = 'full', 
  mouseX = 0, 
  mouseY = 0, 
  enableCameraControl = true,
  spectrumMode = 0,
  isCinematicMode = false
}: MilkyWay3DProps) {
  const starPointsRef = useRef<THREE.Points>(null);
  const nebulaPointsRef = useRef<THREE.Points>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const coreGlowRef = useRef<THREE.Mesh>(null);
  const orionGroupRef = useRef<THREE.Group>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);
  const ringMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  const nebulaMaterialRef = useRef<THREE.PointsMaterial>(null);
  const starsMaterialRef = useRef<THREE.PointsMaterial>(null);
  const coreMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    setIsManual(false);
  }, [focusMode]);

  const orionR = 5.8;
  const orionTheta = 2.1;

  // Generate 3D logarithmic spiral star particle data
  const { positions, colors, sizes } = useMemo(() => {
    const starsCount = 6500;
    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 3);
    const sizes = new Float32Array(starsCount);

    const arms = 2;
    const curl = 2.2;

    for (let i = 0; i < starsCount; i++) {
      const armIndex = i % arms;
      const r = Math.random() * 12;
      const theta = (armIndex * Math.PI) + (r * curl) + (Math.random() - 0.5) * 0.35;
      
      const thickness = (1.0 - (r / 12)) * 1.5;
      const y = (Math.random() - 0.5) * thickness + (Math.random() - 0.5) * 0.12;

      const scatterX = (Math.random() - 0.5) * 0.4;
      const scatterZ = (Math.random() - 0.5) * 0.4;

      const x = Math.cos(theta) * r + scatterX;
      const z = Math.sin(theta) * r + scatterZ;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // HSL color maps for distinct regions
      const color = new THREE.Color();
      if (r < 2.2) {
        // Core bulge: warm gold/white
        color.setHSL(0.08 + Math.random() * 0.04, 0.95, 0.65 + Math.random() * 0.25);
      } else {
        const rand = Math.random();
        if (rand < 0.45) {
          // Electric blue/cyan
          color.setHSL(0.55 + Math.random() * 0.05, 0.85, 0.7 + Math.random() * 0.2);
        } else if (rand < 0.75) {
          // Magenta/purple dust lanes
          color.setHSL(0.76 + Math.random() * 0.08, 0.75, 0.6 + Math.random() * 0.25);
        } else {
          // General field stars (white/yellow)
          color.setHSL(0.12 + Math.random() * 0.06, 0.4, 0.8 + Math.random() * 0.2);
        }
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 1.8 + 0.4;
    }

    return { positions, colors, sizes };
  }, []);

  // Generate larger faint background nebulae gas clouds
  const nebulaData = useMemo(() => {
    const nebulaCount = 350;
    const positions = new Float32Array(nebulaCount * 3);
    const colors = new Float32Array(nebulaCount * 3);
    
    for (let i = 0; i < nebulaCount; i++) {
      const arm = i % 2;
      const r = Math.random() * 11 + 1;
      const theta = (arm * Math.PI) + (r * 2.2) + (Math.random() - 0.5) * 0.8;
      const x = Math.cos(theta) * r + (Math.random() - 0.5) * 0.8;
      const z = Math.sin(theta) * r + (Math.random() - 0.5) * 0.8;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
      positions[i * 3 + 2] = z;
      
      const color = new THREE.Color();
      if (Math.random() < 0.5) {
        color.setHSL(0.72 + Math.random() * 0.08, 0.85, 0.45);
      } else {
        color.setHSL(0.55 + Math.random() * 0.05, 0.9, 0.45);
      }
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  // Create soft fuzzy circle texture for particles
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.7, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  const nebulaTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.5, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(() => {
    // Rotation animation
    const rotSpeed = 0.0016;
    if (starPointsRef.current) starPointsRef.current.rotation.y += rotSpeed;
    if (nebulaPointsRef.current) nebulaPointsRef.current.rotation.y += rotSpeed;
    if (coreMeshRef.current) coreMeshRef.current.rotation.y += rotSpeed;
    if (coreGlowRef.current) coreGlowRef.current.rotation.y -= rotSpeed * 0.5;

    // Orion marker rotation sync and pulsing ring
    if (starPointsRef.current && orionGroupRef.current && pulseRingRef.current && ringMaterialRef.current) {
      const currentRot = starPointsRef.current.rotation.y;
      const currentOrionTheta = orionTheta + currentRot;
      orionGroupRef.current.position.x = Math.cos(currentOrionTheta) * orionR;
      orionGroupRef.current.position.z = Math.sin(currentOrionTheta) * orionR;

      const pulse = Math.sin(performance.now() / 240) * 0.4 + 1.1;
      pulseRingRef.current.scale.set(pulse, pulse, 1);
      ringMaterialRef.current.opacity = Math.max(0, 1.0 - (pulse - 0.7) / 0.8);
    }

    // Dynamic spectrum transitions
    if (nebulaMaterialRef.current && starsMaterialRef.current && coreMaterialRef.current && glowMaterialRef.current) {
      if (spectrumMode === 0) {
        // Visible
        nebulaMaterialRef.current.opacity = THREE.MathUtils.lerp(nebulaMaterialRef.current.opacity, 0.12, 0.05);
        starsMaterialRef.current.opacity = THREE.MathUtils.lerp(starsMaterialRef.current.opacity, 0.9, 0.05);
        starsMaterialRef.current.size = THREE.MathUtils.lerp(starsMaterialRef.current.size, 0.13, 0.05);
        coreMaterialRef.current.color.lerp(new THREE.Color("#ffffff"), 0.05);
        glowMaterialRef.current.color.lerp(new THREE.Color("#ffd23f"), 0.05);
        glowMaterialRef.current.opacity = THREE.MathUtils.lerp(glowMaterialRef.current.opacity, 0.16, 0.05);
      } else if (spectrumMode === 1) {
        // Infrared
        nebulaMaterialRef.current.opacity = THREE.MathUtils.lerp(nebulaMaterialRef.current.opacity, 0.35, 0.05);
        starsMaterialRef.current.opacity = THREE.MathUtils.lerp(starsMaterialRef.current.opacity, 0.3, 0.05);
        starsMaterialRef.current.size = THREE.MathUtils.lerp(starsMaterialRef.current.size, 0.08, 0.05);
        coreMaterialRef.current.color.lerp(new THREE.Color("#ff5500"), 0.05);
        glowMaterialRef.current.color.lerp(new THREE.Color("#ff7700"), 0.05);
        glowMaterialRef.current.opacity = THREE.MathUtils.lerp(glowMaterialRef.current.opacity, 0.28, 0.05);
      } else {
        // Gamma Ray
        nebulaMaterialRef.current.opacity = THREE.MathUtils.lerp(nebulaMaterialRef.current.opacity, 0.05, 0.05);
        starsMaterialRef.current.opacity = THREE.MathUtils.lerp(starsMaterialRef.current.opacity, 0.05, 0.05);
        starsMaterialRef.current.size = THREE.MathUtils.lerp(starsMaterialRef.current.size, 0.05, 0.05);
        coreMaterialRef.current.color.lerp(new THREE.Color("#d500f9"), 0.05);
        glowMaterialRef.current.color.lerp(new THREE.Color("#00e5ff"), 0.05);
        glowMaterialRef.current.opacity = THREE.MathUtils.lerp(glowMaterialRef.current.opacity, 0.4, 0.05);
      }
    }
  });

  return (
    <group>
      {/* 3D camera controller */}
      {enableCameraControl && (
        <MilkyWayCameraControl 
          focusMode={focusMode} 
          mouseX={mouseX} 
          mouseY={mouseY} 
          orionRef={orionGroupRef} 
          starPointsRef={starPointsRef} 
          isManual={isManual}
          setIsManual={setIsManual}
          isCinematicMode={isCinematicMode}
        />
      )}

      {/* Volumetric Central Core */}
      <mesh ref={coreMeshRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial ref={coreMaterialRef} color="#ffffff" transparent opacity={0.85} />
      </mesh>

      {/* Volumetric bulge halo */}
      <mesh ref={coreGlowRef}>
        <sphereGeometry args={[4.0, 32, 32]} />
        <meshBasicMaterial 
          ref={glowMaterialRef}
          color="#ffd23f" 
          transparent 
          opacity={0.16} 
          blending={THREE.AdditiveBlending} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* Faint gas clouds */}
      <points ref={nebulaPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nebulaData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[nebulaData.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={nebulaMaterialRef}
          size={2.8}
          map={nebulaTexture}
          vertexColors
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Stars Points */}
      <points ref={starPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={starsMaterialRef}
          size={0.13}
          map={particleTexture}
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Orion Arm Group marker */}
      <group ref={orionGroupRef} position={[Math.cos(orionTheta) * orionR, 0, Math.sin(orionTheta) * orionR]}>
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
        </mesh>
        
        <mesh ref={pulseRingRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.16, 0.32, 32]} />
          <meshBasicMaterial 
            ref={ringMaterialRef}
            color="#7de8e8" 
            transparent 
            opacity={0.8} 
            side={THREE.DoubleSide} 
            blending={THREE.AdditiveBlending} 
          />
        </mesh>

        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([0, 0, 0, 0, 1.2, 0]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#7de8e8" transparent opacity={0.35} />
        </line>
      </group>

      {/* Relativistic Plasma Jets in Gamma Ray */}
      {spectrumMode === 2 && (
        <group rotation={[0.1, 0, 0.1]}>
          <mesh position={[0, 4.5, 0]}>
            <cylinderGeometry args={[0.01, 0.45, 9, 16, 1, true]} />
            <meshBasicMaterial 
              color="#00e5ff" 
              transparent 
              opacity={0.5} 
              blending={THREE.AdditiveBlending} 
              side={THREE.DoubleSide} 
            />
          </mesh>
          <mesh position={[0, -4.5, 0]}>
            <cylinderGeometry args={[0.45, 0.01, 9, 16, 1, true]} />
            <meshBasicMaterial 
              color="#00e5ff" 
              transparent 
              opacity={0.5} 
              blending={THREE.AdditiveBlending} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        </group>
      )}

      {/* Distance contours coordinate guide (Galactic Grid) */}
      {[5, 10, 15].map((radius, index) => (
        <mesh key={index} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.03, radius + 0.03, 64]} />
          <meshBasicMaterial 
            color="#7de8e8" 
            transparent 
            opacity={0.03} 
            side={THREE.DoubleSide} 
            blending={THREE.AdditiveBlending} 
          />
        </mesh>
      ))}
    </group>
  );
}
