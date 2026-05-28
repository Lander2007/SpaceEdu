import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useInView } from 'react-intersection-observer'
import * as THREE from 'three'
import styles from './Galaxy.module.css'

interface Hotspot {
  id: string
  name: string
  position: [number, number, number]
  cameraPosition: [number, number, number]
  class: string
  description: string
  facts: { label: string; value: string }[]
}

const hotspots: Hotspot[] = [
  {
    id: 'sgr-a',
    name: 'Sagittarius A*',
    position: [0, 0, 0],
    cameraPosition: [0, 2.0, 3.8],
    class: 'Supermassive Black Hole',
    description: 'The gravitational anchor of the Milky Way. An extremely dense singularity warping spacetime with a mass of 4.1 million Suns.',
    facts: [
      { label: 'Mass', value: '4.1M Solar Masses' },
      { label: 'Event Horizon', value: '24 Million km' },
      { label: 'Distance', value: '26,700 Light Years' },
      { label: 'Horizon Speed', value: 'c (Speed of Light)' }
    ]
  },
  {
    id: 'sol-system',
    name: 'Sol System',
    position: [-3.2, 0.15, 2.5],
    cameraPosition: [-3.2, 1.1, 4.0],
    class: 'Stellar System / Orion Arm',
    description: 'Our home planetary system, situated on the inner edge of the Orion-Cygnus spur. Orbits the galactic core once every 230 million years.',
    facts: [
      { label: 'Host Star', value: 'Sol (Yellow Dwarf)' },
      { label: 'Structure', value: '8 Planets / 200+ Moons' },
      { label: 'Galactic Distance', value: '26,000 Light Years' },
      { label: 'Orbital Speed', value: '220 km/s' }
    ]
  },
  {
    id: 'perseus-arm',
    name: 'Perseus Arm',
    position: [4.5, -0.15, -3.2],
    cameraPosition: [4.5, 1.8, -1.2],
    class: 'Major Spiral Arm',
    description: 'One of the two primary spiral arms of the Milky Way, rich in young blue stars, starburst molecular clouds, and nebulae.',
    facts: [
      { label: 'Arm Structure', value: 'Primary Spiral Arm' },
      { label: 'Active Clusters', value: 'Double Cluster (h & chi Per)' },
      { label: 'H2 Gas Density', value: 'High Concentration' },
      { label: 'Orbit Cycle', value: '160M Years' }
    ]
  },
  {
    id: 'scutum-arm',
    name: 'Scutum-Centaurus Arm',
    position: [-2.2, -0.1, -4.5],
    cameraPosition: [-2.2, 1.4, -2.4],
    class: 'Major Spiral Arm',
    description: 'A major star-forming corridor in the inner galaxy, attached directly to the long bar anchor of the galactic bar core.',
    facts: [
      { label: 'Core Interface', value: 'Inner Bar Anchor' },
      { label: 'Famous Clusters', value: 'Westerlund 1 (Super Cluster)' },
      { label: 'Star Count', value: 'Estimated 40 Billion' },
      { label: 'Magnetic Flux', value: '4.8 Microgauss' }
    ]
  }
]

const vertexShader = `
  uniform float uTime;
  uniform float uRotationSpeed;
  uniform float uParticleScale;
  uniform float uSpectrumMode;
  attribute float aSize;
  attribute float aSpeedMultiplier;
  varying vec3 vColor;
  varying float vRadius;

  void main() {
    vec3 pos = position;
    float r = length(pos.xz);
    
    // Flat rotation curve: inner stars rotate faster, outer stars slower but leveling off
    float angle = uTime * uRotationSpeed * aSpeedMultiplier * (2.2 / (r + 0.6));
    
    float cosA = cos(angle);
    float sinA = sin(angle);
    
    float rx = pos.x * cosA - pos.z * sinA;
    float rz = pos.x * sinA + pos.z * cosA;
    
    pos.x = rx;
    pos.z = rz;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation
    gl_PointSize = aSize * uParticleScale * (400.0 / -mvPosition.z);
    
    // Visible Light Colors (passed from vertex attribute color)
    vec3 visibleColor = color;
    
    // Infrared: Gas and warm dust structures (fiery red/orange)
    vec3 infraredColor = vec3(0.95, 0.28 + 0.12 * sin(r * 1.8 - uTime * 0.25), 0.05);
    if (r > 8.5) {
      infraredColor *= 0.25;
    }
    
    // Chandra X-Ray: Ultra high energy core, violet-blue arms
    vec3 xrayColor = vec3(0.08, 0.42, 0.95);
    if (r < 2.0) {
      xrayColor = vec3(0.95, 0.95, 1.0); // Flare white core
    } else {
      xrayColor *= (2.0 / (r + 0.1));
    }
    
    // Smooth transition based on spectrum mode
    vec3 finalColor = visibleColor;
    if (uSpectrumMode < 1.0) {
      finalColor = mix(visibleColor, infraredColor, uSpectrumMode);
    } else {
      finalColor = mix(infraredColor, xrayColor, uSpectrumMode - 1.0);
    }
    
    vColor = finalColor;
    vRadius = r;
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec3 vColor;
  varying float vRadius;

  void main() {
    vec4 texColor = texture2D(uTexture, gl_PointCoord);
    if (texColor.a < 0.05) discard;
    gl_FragColor = vec4(vColor, 1.0) * texColor;
  }
`;

function GalaxyParticles({ spectrumMode }: { spectrumMode: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, colors, sizes, speedMultipliers } = useMemo(() => {
    const count = 15000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const speedMultipliers = new Float32Array(count)
    const arms = 4
    const curl = 3.2

    for (let i = 0; i < count; i++) {
      const armIndex = i % arms
      const radius = Math.pow(Math.random(), 2.2) * 12
      const theta = (armIndex * 2 * Math.PI / arms) + (radius * curl) + (Math.random() - 0.5) * 0.38
      const thickness = (1.0 - (radius / 12)) * 1.8
      const y = (Math.random() - 0.5) * thickness

      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      sizes[i] = 0.5 + Math.random() * 2.0
      speedMultipliers[i] = 0.85 + Math.random() * 0.3

      const color = new THREE.Color()
      if (radius < 2.5) {
        // Bright golden/white core
        color.setHSL(0.08 + Math.random() * 0.04, 0.95, 0.65 + Math.random() * 0.25)
      } else {
        const rand = Math.random()
        if (rand < 0.4) {
          // Electric cyan/blue
          color.setHSL(0.52 + Math.random() * 0.05, 0.9, 0.65 + Math.random() * 0.15)
        } else if (rand < 0.8) {
          // Deep violet/magenta
          color.setHSL(0.76 + Math.random() * 0.08, 0.85, 0.6 + Math.random() * 0.2)
        } else {
          // Shimmering white stars
          color.setRGB(0.95, 0.95, 1.0)
        }
      }

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors, sizes, speedMultipliers }
  }, [])

  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 16
    canvas.height = 16
    const ctx = canvas.getContext('2d')!
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.3, 'rgba(255,255,255,0.8)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 16, 16)
    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
  }, [])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uRotationSpeed: { value: 0.038 },
    uParticleScale: { value: 0.12 },
    uSpectrumMode: { value: 0.0 },
    uTexture: { value: starTexture }
  }), [starTexture])

  useEffect(() => {
    uniforms.uSpectrumMode.value = spectrumMode
  }, [spectrumMode, uniforms])

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime()
  })

  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  }), [uniforms])

  return (
    <points ref={pointsRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aSpeedMultiplier" args={[speedMultipliers, 1]} />
      </bufferGeometry>
    </points>
  )
}

function HazeParticles({ spectrumMode }: { spectrumMode: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, colors, sizes, speedMultipliers } = useMemo(() => {
    const count = 3000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const speedMultipliers = new Float32Array(count)
    const arms = 4
    const curl = 3.2

    for (let i = 0; i < count; i++) {
      const armIndex = i % arms
      const radius = Math.pow(Math.random(), 1.8) * 11.5
      const theta = (armIndex * 2 * Math.PI / arms) + (radius * curl) + (Math.random() - 0.5) * 0.62
      const thickness = (1.0 - (radius / 12)) * 2.5
      const y = (Math.random() - 0.5) * thickness

      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      sizes[i] = 1.0 + Math.random() * 2.5
      speedMultipliers[i] = 0.9 + Math.random() * 0.2

      const color = new THREE.Color()
      const rand = Math.random()
      if (rand < 0.65) {
        color.setHSL(0.78 + Math.random() * 0.05, 0.9, 0.35 + Math.random() * 0.1)
      } else {
        color.setHSL(0.55 + Math.random() * 0.05, 0.9, 0.4 + Math.random() * 0.1)
      }

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors, sizes, speedMultipliers }
  }, [])

  const hazeTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')!
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    grad.addColorStop(0, 'rgba(255,255,255,0.7)')
    grad.addColorStop(0.3, 'rgba(255,255,255,0.3)')
    grad.addColorStop(0.6, 'rgba(255,255,255,0.08)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 32, 32)
    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
  }, [])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uRotationSpeed: { value: 0.038 },
    uParticleScale: { value: 0.95 },
    uSpectrumMode: { value: 0.0 },
    uTexture: { value: hazeTexture }
  }), [hazeTexture])

  useEffect(() => {
    uniforms.uSpectrumMode.value = spectrumMode
  }, [spectrumMode, uniforms])

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime()
  })

  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  }), [uniforms])

  return (
    <points ref={pointsRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aSpeedMultiplier" args={[speedMultipliers, 1]} />
      </bufferGeometry>
    </points>
  )
}

function SagittariusA({ spectrumMode }: { spectrumMode: number }) {
  const diskRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (diskRef.current) {
      diskRef.current.rotation.z = -state.clock.getElapsedTime() * 0.4
    }
  })

  const coreColor = useMemo(() => {
    if (spectrumMode < 1.0) {
      const color1 = new THREE.Color('#ffd23f')
      const color2 = new THREE.Color('#ff3c00')
      return color1.clone().lerp(color2, spectrumMode)
    } else {
      const color2 = new THREE.Color('#ff3c00')
      const color3 = new THREE.Color('#8a2be2')
      return color2.clone().lerp(color3, spectrumMode - 1.0)
    }
  }, [spectrumMode])

  return (
    <group>
      {/* Event Horizon (Black sphere) */}
      <mesh>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Relativistic Accretion Disk (Tilted ring geometry) */}
      <mesh ref={diskRef} rotation={[Math.PI / 2.3, Math.PI / 10, 0]}>
        <ringGeometry args={[0.3, 1.2, 64]} />
        <meshBasicMaterial
          color={coreColor}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Accretion corona glow */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial
          color={coreColor}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Volumetric center corona */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color={coreColor}
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Chandra Relativistic Plasma Jets */}
      {spectrumMode > 1.0 && (
        <group rotation={[Math.PI / 10, 0, Math.PI / 12]}>
          {/* North Jet */}
          <mesh position={[0, 4.0, 0]}>
            <cylinderGeometry args={[0.01, 0.45, 8.0, 16, 1, true]} />
            <meshBasicMaterial
              color="#00ffff"
              transparent
              opacity={(spectrumMode - 1.0) * 0.45}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* South Jet */}
          <mesh position={[0, -4.0, 0]}>
            <cylinderGeometry args={[0.45, 0.01, 8.0, 16, 1, true]} />
            <meshBasicMaterial
              color="#00ffff"
              transparent
              opacity={(spectrumMode - 1.0) * 0.45}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      )}
    </group>
  )
}

function HotspotMarker({ position, onClick, label, isSelected }: {
  position: [number, number, number]
  onClick: () => void
  label: string
  isSelected: boolean
}) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      const scale = 1.0 + Math.sin(state.clock.getElapsedTime() * 4.0) * 0.15
      ringRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group position={position}>
      <mesh onClick={(e) => { e.stopPropagation(); onClick(); }}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* Pulsing ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.22, 32]} />
        <meshBasicMaterial
          color={isSelected ? "#00ffff" : "#ffffff"}
          transparent
          opacity={isSelected ? 0.9 : 0.45}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Glowing center dot */}
      <mesh>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={isSelected ? "#00ffff" : "#ffffff"} />
      </mesh>
    </group>
  )
}

function GalaxyController({
  selectedId,
  controlsRef,
  isCinematicMode,
  setIsCinematicMode
}: {
  selectedId: string | null
  controlsRef: React.RefObject<any>
  isCinematicMode: boolean
  setIsCinematicMode: (b: boolean) => void
}) {
  const { camera } = useThree()
  const animatingRef = useRef(false)
  const lastSelectedRef = useRef<string | null>(null)

  useFrame((state) => {
    // 1. Cinematic Scan Mode
    if (isCinematicMode) {
      const time = state.clock.getElapsedTime() * 0.15
      const radius = 15
      const targetCamX = Math.sin(time) * radius
      const targetCamZ = Math.cos(time) * radius
      const targetCamY = 6 + Math.sin(time * 0.5) * 3

      camera.position.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), 0.03)
      if (controlsRef.current) {
        controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.03)
        controlsRef.current.update()
      }
      return
    }

    // 2. Hotspot Selection glide
    if (selectedId) {
      const hotspot = hotspots.find(h => h.id === selectedId)
      if (!hotspot) return

      const targetLook = new THREE.Vector3(...hotspot.position)
      const targetPos = new THREE.Vector3(...hotspot.cameraPosition)

      if (lastSelectedRef.current !== selectedId) {
        animatingRef.current = true
        lastSelectedRef.current = selectedId
      }

      if (animatingRef.current) {
        camera.position.lerp(targetPos, 0.045)
        if (controlsRef.current) {
          controlsRef.current.target.lerp(targetLook, 0.045)
          controlsRef.current.update()
        }

        const distCam = camera.position.distanceTo(targetPos)
        const distLook = controlsRef.current.target.distanceTo(targetLook)
        if (distCam < 0.1 && distLook < 0.04) {
          animatingRef.current = false
        }
      } else {
        if (controlsRef.current) {
          controlsRef.current.target.copy(targetLook)
          controlsRef.current.update()
        }
      }
    } else {
      // 3. Return to default view
      if (lastSelectedRef.current !== null) {
        animatingRef.current = true
        lastSelectedRef.current = null
      }

      const defaultPos = new THREE.Vector3(0, 9, 14)
      const defaultLook = new THREE.Vector3(0, 0, 0)

      if (animatingRef.current) {
        camera.position.lerp(defaultPos, 0.045)
        if (controlsRef.current) {
          controlsRef.current.target.lerp(defaultLook, 0.045)
          controlsRef.current.update()
        }

        const distCam = camera.position.distanceTo(defaultPos)
        const distLook = controlsRef.current.target.distanceTo(defaultLook)
        if (distCam < 0.1 && distLook < 0.04) {
          animatingRef.current = false
        }
      }
    }
  })

  return null
}

function TelemetryUpdater({
  controlsRef,
  azimuthRef,
  elevationRef
}: {
  controlsRef: React.RefObject<any>
  azimuthRef: React.RefObject<HTMLSpanElement>
  elevationRef: React.RefObject<HTMLSpanElement>
}) {
  useFrame(() => {
    if (controlsRef.current) {
      const az = (controlsRef.current.getAzimuthalAngle() * (180 / Math.PI)).toFixed(1)
      const el = (controlsRef.current.getPolarAngle() * (180 / Math.PI)).toFixed(1)
      if (azimuthRef.current) azimuthRef.current.innerText = az + '°'
      if (elevationRef.current) elevationRef.current.innerText = el + '°'
    }
  })
  return null
}

export default function Galaxy() {
  const { ref, inView } = useInView({ threshold: 0.15 })
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null)
  const [spectrumMode, setSpectrumMode] = useState<number>(0.0) // 0 = Visible, 1 = Infrared, 2 = Chandra X-Ray
  const [isCinematicMode, setIsCinematicMode] = useState<boolean>(false)
  const controlsRef = useRef<any>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  // Direct DOM refs to bypass React state updates at 60fps for telemetry coords
  const azimuthRef = useRef<HTMLSpanElement>(null)
  const elevationRef = useRef<HTMLSpanElement>(null)

  const activeHotspot = useMemo(() => {
    return hotspots.find(h => h.id === selectedHotspotId) || null
  }, [selectedHotspotId])

  const handleSelectHotspot = (id: string | null) => {
    setIsCinematicMode(false)
    setSelectedHotspotId(id)
  }

  const toggleCinematicMode = () => {
    if (!isCinematicMode) {
      setSelectedHotspotId(null)
      setIsCinematicMode(true)
    } else {
      setIsCinematicMode(false)
    }
  }

  // Prevent scroll snap while zooming/dragging inside the canvas container
  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    const container = canvasContainerRef.current;
    if (container && inView) {
      container.addEventListener('wheel', preventDefault, { passive: false });
      container.addEventListener('touchmove', preventDefault, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', preventDefault);
        container.removeEventListener('touchmove', preventDefault);
      }
    };
  }, [inView]);

  return (
    <section id="galaxy" ref={ref} className={styles.section}>
      {/* 3D Galaxy Canvas */}
      <div ref={canvasContainerRef} className={styles.canvasContainer}>
        {inView && (
          <Canvas
            camera={{ position: [0, 9, 14], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}
          >
            <Suspense fallback={null}>
              <GalaxyParticles spectrumMode={spectrumMode} />
              <HazeParticles spectrumMode={spectrumMode} />
              <SagittariusA spectrumMode={spectrumMode} />
              
              {/* Interactive Hotspots in 3D Space */}
              {hotspots.map((h) => (
                <HotspotMarker
                  key={h.id}
                  position={h.position}
                  label={h.name}
                  isSelected={selectedHotspotId === h.id}
                  onClick={() => handleSelectHotspot(h.id)}
                />
              ))}

              <GalaxyController
                selectedId={selectedHotspotId}
                controlsRef={controlsRef}
                isCinematicMode={isCinematicMode}
                setIsCinematicMode={setIsCinematicMode}
              />
              
              <TelemetryUpdater
                controlsRef={controlsRef}
                azimuthRef={azimuthRef}
                elevationRef={elevationRef}
              />
            </Suspense>
            <OrbitControls
              ref={controlsRef}
              enableZoom={true}
              enablePan={false}
              minDistance={2.5}
              maxDistance={26}
              enableDamping={true}
              dampingFactor={0.05}
            />
          </Canvas>
        )}
      </div>

      <div className={styles.overlay} />

      {/* Title Watermark (top-left, matching Asteroid Belt) */}
      <motion.div
        className={styles.titleContainer}
        initial={{ opacity: 0, x: -60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <p className={styles.categoryLabel}>GALACTIC ISLAND / L-SPIRAL</p>
        <h2 className={styles.title}>THE MILKY WAY</h2>
        <div className={styles.accentLine} />
      </motion.div>

      {/* Interactive HUD Overlay */}
      <div className={styles.hudOverlay}>
        
        {/* Left HUD Panel: Controls & Scanner Directory */}
        <motion.div
          className={styles.controlPanel}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.hudGroup}>
            <div className={styles.hudLabel}>TARGET OBSERVATORY SCANNER</div>
            <div className={styles.zoneButtons}>
              <button
                className={`${styles.hudBtn} ${selectedHotspotId === null && !isCinematicMode ? styles.activeBtn : ''}`}
                onClick={() => handleSelectHotspot(null)}
              >
                <div className={styles.btnDot} style={{ background: '#ffffff', boxShadow: '0 0 8px #fff' }} />
                Galactic Orbit
              </button>
              {hotspots.map(h => (
                <button
                  key={h.id}
                  className={`${styles.hudBtn} ${selectedHotspotId === h.id ? styles.activeBtn : ''}`}
                  onClick={() => handleSelectHotspot(h.id)}
                >
                  <div
                    className={styles.btnDot}
                    style={{
                      background: h.id === 'sgr-a' ? '#ffd23f' :
                                  h.id === 'sol-system' ? '#00ffff' :
                                  h.id === 'perseus-arm' ? '#c084fc' : '#a855f7',
                      boxShadow: `0 0 8px ${
                        h.id === 'sgr-a' ? '#ffd23f' :
                        h.id === 'sol-system' ? '#00ffff' :
                        h.id === 'perseus-arm' ? '#c084fc' : '#a855f7'
                      }`
                    }}
                  />
                  {h.name}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.hudGroup}>
            <div className={styles.hudLabel}>WAVELENGTH FILTERS (SPECTRA)</div>
            <div className={styles.filterTabs}>
              {[
                { value: 0, label: "VIS" },
                { value: 1, label: "IR" },
                { value: 2, label: "X-RAY" }
              ].map(tab => (
                <button
                  key={tab.value}
                  className={`${styles.filterTab} ${Math.round(spectrumMode) === tab.value ? styles.activeTab : ''}`}
                  onClick={() => setSpectrumMode(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.hudGroup}>
            <button
              className={`${styles.cinematicBtn} ${isCinematicMode ? styles.activeCinematic : ''}`}
              onClick={toggleCinematicMode}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
              {isCinematicMode ? "SCANNING GALACTIC PRESETS..." : "INITIATE CINEMATIC SCAN"}
            </button>
          </div>
        </motion.div>

        {/* Right HUD Panel: Science Dashboard */}
        <motion.div
          className={styles.infoPanel}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {!selectedHotspotId ? (
              <motion.div
                key="default-panel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <p className={styles.panelLabel}>GALACTIC ISLAND / L-SPIRAL</p>
                <h3 className={styles.panelTitle}>THE MILKY WAY</h3>
                <p className={styles.panelText}>
                  Our entire Solar System is but a pinprick inside this celestial spiral arms system.
                  A massive rotating coordinate grid hosting hundreds of billions of stars.
                </p>

                <div className={styles.stats}>
                  {[
                    { label: "Total Stars", value: "200 - 400 Billion" },
                    { label: "Span Diameter", value: "100k Light Years" },
                    { label: "Arms System", value: "4 Major Spirals" },
                    { label: "System Age", value: "13.6B Years" }
                  ].map(s => (
                    <div key={s.label} className={styles.statCard}>
                      <div className={styles.statLabel}>{s.label}</div>
                      <div className={styles.statValue}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={selectedHotspotId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <p className={styles.panelLabel}>{activeHotspot?.class}</p>
                <h3 className={styles.panelTitle}>{activeHotspot?.name}</h3>
                <p className={styles.panelText}>
                  {activeHotspot?.description}
                </p>

                <div className={styles.stats}>
                  {activeHotspot?.facts.map(s => (
                    <div key={s.label} className={styles.statCard}>
                      <div className={styles.statLabel}>{s.label}</div>
                      <div className={styles.statValue}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Telemetry section inside the Science Panel */}
          <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
              <span>RADAR COORDINATES</span>
              <span style={{ color: '#00ffff', animation: 'beaconBlink 1.5s infinite alternate' }}>● SCAN FEED</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.52rem', color: 'rgba(255,255,255,0.4)' }}>AZIMUTH:</span>
                <span ref={azimuthRef} style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.52rem', color: '#00ffff', fontWeight: 600 }}>CALCULATING</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.52rem', color: 'rgba(255,255,255,0.4)' }}>ELEVATION:</span>
                <span ref={elevationRef} style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.52rem', color: '#00ffff', fontWeight: 600 }}>CALCULATING</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Neighbor Navigation Links */}
      <a href="#miller" className={styles.neighborLeft}>
        ← MILLERS PLANET
      </a>
      <a href="#scale" className={styles.neighborRight}>
        SCALE OF WONDER →
      </a>
    </section>
  )
}
