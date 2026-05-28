import { useState, useEffect, useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import styles from './Hero.module.css'

// Zero-dependency Web Audio API sound generator for tactical UI feel
const playBeep = (freq = 800, type: OscillatorType = 'sine', duration = 0.08, vol = 0.05) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.type = type
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    
    gain.gain.setValueAtTime(vol, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch (e) {
    // Audio context might be blocked or unsupported by browser autoplays
  }
}

function OrbitingNode({ radius, speed, color, offset = 0 }: { radius: number; speed: number; color: string; offset?: number }) {
  const nodeRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()
    const angle = elapsed * speed + offset
    if (nodeRef.current) {
      nodeRef.current.position.x = Math.cos(angle) * radius
      nodeRef.current.position.y = Math.sin(angle) * radius
    }
  })

  return (
    <mesh ref={nodeRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

function HologramGlobe() {
  const groupRef = useRef<THREE.Group>(null)
  const planetRef = useRef<THREE.Mesh>(null)
  const outerPlanetRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)
  
  const [scale, setScale] = useState(0)

  useEffect(() => {
    // Smoothly scale up the hologram on mount
    let start: number | null = null
    const duration = 2200 
    const animate = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 4) // Quartic ease out
      setScale(ease * 1.15) 
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [])

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()

    // Slow planet rotations
    if (planetRef.current) {
      planetRef.current.rotation.y = elapsed * 0.05
      planetRef.current.rotation.x = elapsed * 0.02
    }
    if (outerPlanetRef.current) {
      outerPlanetRef.current.rotation.y = -elapsed * 0.03
      outerPlanetRef.current.rotation.z = elapsed * 0.01
    }

    // Tilted ring rotations
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = elapsed * 0.12
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -elapsed * 0.08
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = elapsed * 0.15
    }

    // Interactive pointer parallax (tilting the whole assembly)
    if (groupRef.current) {
      const targetRotationX = state.pointer.y * 0.35
      const targetRotationY = state.pointer.x * 0.35
      
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05
    }
  })

  return (
    <group ref={groupRef} scale={scale} position={[0, -0.4, -4.5]}>
      {/* Central Planet Hologram (Dual-layered wireframe) */}
      <mesh ref={planetRef}>
        <icosahedronGeometry args={[2.0, 2]} />
        <meshBasicMaterial 
          wireframe 
          color="#00ffff" 
          transparent 
          opacity={0.14} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <mesh ref={outerPlanetRef}>
        <icosahedronGeometry args={[2.02, 1]} />
        <meshBasicMaterial 
          wireframe 
          color="#7de8e8" 
          transparent 
          opacity={0.06} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Internal core sphere for solid occlusion/depth */}
      <mesh>
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshBasicMaterial 
          color="#020412" 
          transparent 
          opacity={0.45} 
        />
      </mesh>

      {/* Concentric Tilted Orbital Rings & Satellites */}
      {/* Equatorial Ring */}
      <group rotation={[Math.PI / 2.2, 0, 0]}>
        <mesh ref={ring1Ref}>
          <ringGeometry args={[2.55, 2.57, 64]} />
          <meshBasicMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.25} 
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <OrbitingNode radius={2.56} speed={0.3} color="#00ffff" />
        <OrbitingNode radius={2.56} speed={0.3} color="#00ffff" offset={Math.PI} />
      </group>

      {/* Tilted Ring 2 */}
      <group rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <mesh ref={ring2Ref}>
          <ringGeometry args={[2.9, 2.915, 64]} />
          <meshBasicMaterial 
            color="#9933ff" 
            transparent 
            opacity={0.2} 
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <OrbitingNode radius={2.907} speed={-0.25} color="#9933ff" />
      </group>

      {/* Tilted Ring 3 */}
      <group rotation={[-Math.PI / 4, -Math.PI / 5, 0]}>
        <mesh ref={ring3Ref}>
          <ringGeometry args={[3.25, 3.26, 64]} />
          <meshBasicMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.15} 
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <OrbitingNode radius={3.255} speed={0.18} color="#00ffff" offset={Math.PI / 2} />
      </group>
    </group>
  )
}

function Starfield() {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const count = 1500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorChoices = [
      new THREE.Color('#7de8e8'), // Cyan-white
      new THREE.Color('#ffffff'), // White
      new THREE.Color('#ffdfb4'), // Yellow-white
      new THREE.Color('#8a2be2'), // Violet-blue
    ]

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2.0 * Math.random() - 1.0)
      const r = 5.0 + Math.random() * 25.0

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors }
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

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.003
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.001
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        vertexColors
        map={starTexture}
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function NavigationGrid() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((state) => {
    if (gridRef.current) {
      const mat = gridRef.current.material as THREE.LineBasicMaterial
      mat.opacity = 0.03 + Math.abs(Math.sin(state.clock.getElapsedTime() * 1.2)) * 0.04
    }
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[50, 45, '#00ffff', 'rgba(0, 255, 255, 0.12)']}
      position={[0, -3.2, 0]}
    />
  )
}

function CameraRig() {
  const { camera } = useThree()

  useFrame((state) => {
    // Parallax mouse movements
    const targetX = state.pointer.x * 2.5
    const targetY = state.pointer.y * 1.8 + 0.5
    
    camera.position.x += (targetX - camera.position.x) * 0.04
    camera.position.y += (targetY - camera.position.y) * 0.04
    camera.lookAt(0, 0, -10)
  })

  return null
}

function Typewriter({ text, delay = 35, callback }: { text: string; delay?: number; callback?: () => void }) {
  const [displayedText, setDisplayedText] = useState('')
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    let index = 0
    let current = ''
    setDisplayedText('')
    const interval = setInterval(() => {
      if (index < text.length) {
        current += text.charAt(index)
        setDisplayedText(current)
        index++
      } else {
        clearInterval(interval)
        if (callbackRef.current) callbackRef.current()
      }
    }, delay)

    return () => clearInterval(interval)
  }, [text, delay])

  return <span>{displayedText}</span>
}

function TelemetryLogs() {
  const [logs, setLogs] = useState<string[]>([])
  const rawLogs = useMemo(() => [
    'SYS-INIT: COGNITIVE ORBIT SECURE',
    'FREQUENCY: AUDIO CAPABLE',
    'TARGET: ERB-01 WORMHOLE CORRIDOR',
    'HUD CALIBRATED: 100% ALIGNED',
    'STATUS: READY FOR DEPARTURE'
  ], [])

  const extraLogs = useMemo(() => [
    'PROPULSION SYSTEM: ACTIVE',
    'THERMAL SHIELDS: NOMINAL',
    'GRAVITY TENSOR: BALANCED [1.0G]',
    'WARP COILS: STEADY STATE',
    'REACTOR CORE: 104% STABLE',
    'OXYGEN RATIO: 20.9% NORMAL',
    'HULL INTEGRITY: 99.8%',
    'RADAR SWEEP: CLEAR SECTOR',
    'COGNITIVE DRIFT: 0.01% CORR',
    'GRID REALIGNMENT: VERIFIED',
    'NAV-COMPUTER: SYNCING COORDS',
    'WARP BUFFER: CHARGING [87%]',
    'COLLISION DETECTOR: SCANNING...',
    'QUANTUM DECOHERENCE: 0.00%',
    'GRAVITATIONAL WAVES: MINIMAL'
  ], [])

  useEffect(() => {
    let index = 0
    let timer: any
    
    const addLog = () => {
      if (index < rawLogs.length) {
        setLogs((prev) => [...prev, rawLogs[index]])
        index++
        timer = setTimeout(addLog, 900 + Math.random() * 500)
      } else {
        // Stream periodic extra diagnostic logs
        const streamLogs = () => {
          const randomLog = extraLogs[Math.floor(Math.random() * extraLogs.length)]
          setLogs((prev) => {
            const nextLogs = prev.length >= 6 ? prev.slice(1) : prev
            return [...nextLogs, randomLog]
          })
          timer = setTimeout(streamLogs, 3000 + Math.random() * 3000)
        }
        timer = setTimeout(streamLogs, 4000)
      }
    }
    
    addLog()
    return () => clearTimeout(timer)
  }, [rawLogs, extraLogs])

  return (
    <div className={styles.telemetryLogs}>
      {logs.map((log, i) => (
        <div key={i} className={styles.logLine}>
          <span className={styles.logBullet}>&gt;</span> {log}
        </div>
      ))}
      <span className={styles.blinkCursor}>_</span>
    </div>
  )
}

export default function Hero() {
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [range, setRange] = useState(1482000320)
  const [velocity, setVelocity] = useState(28400)
  const [missionTime, setMissionTime] = useState({ d: 4, h: 16, m: 35, s: 12 })

  useEffect(() => {
    // Dynamic countdown for range
    const rangeInterval = setInterval(() => {
      setRange(r => r - Math.floor(Math.random() * 5 + 15))
    }, 200)

    // Minor fluctuations for velocity
    const velocityInterval = setInterval(() => {
      setVelocity(v => 28400 + Math.floor((Math.random() - 0.5) * 12))
    }, 800)

    // Ticking mission clock
    const missionInterval = setInterval(() => {
      setMissionTime(prev => {
        let ns = prev.s + 1
        let nm = prev.m
        let nh = prev.h
        let nd = prev.d
        if (ns >= 60) {
          ns = 0
          nm += 1
        }
        if (nm >= 60) {
          nm = 0
          nh += 1
        }
        if (nh >= 24) {
          nh = 0
          nd += 1
        }
        return { d: nd, h: nh, m: nm, s: ns }
      })
    }, 1000)

    return () => {
      clearInterval(rangeInterval)
      clearInterval(velocityInterval)
      clearInterval(missionInterval)
    }
  }, [])

  const handleCtaHover = () => {
    playBeep(1200, 'sine', 0.05, 0.02)
  }

  const handleBeginExploration = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Play initiation chime
    playBeep(880, 'triangle', 0.25, 0.06)
    setTimeout(() => playBeep(1320, 'sine', 0.4, 0.04), 100)

    // Initiate procedural synth
    window.dispatchEvent(new CustomEvent('start-ambient-synth'))
    // Scroll down to the first section (Sun)
    const sunSection = document.getElementById('sun')
    if (sunSection) {
      sunSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className={styles.section}>
      {/* Subtle pulsing nebular backdrop */}
      <div className={styles.nebulaGlow} />

      {/* 3D Starfield, Grid & Hologram Globe */}
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0.5, 12], fov: 45 }}>
          <Suspense fallback={null}>
            <Starfield />
            <HologramGlobe />
            <NavigationGrid />
            <CameraRig />
          </Suspense>
        </Canvas>
      </div>

      {/* Film grain overlay */}
      <div className="film-grain" />

      {/* Futuristic Spacecraft HUD Brackets */}
      <div className={styles.hudFrame}>
        <div className={styles.cornerTL} />
        <div className={styles.cornerTR} />
        <div className={styles.cornerBL} />
        <div className={styles.cornerBR} />
      </div>

      {/* Interactive Telemetry Logs (Top Left) */}
      <TelemetryLogs />

      {/* Navigation telemetry (Top Right) */}
      <div className={styles.rightStatus}>
        <span>RANGE: {range.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} KM</span>
        <span>VELOCITY: {velocity.toLocaleString()} KM/H</span>
        <span>SECTOR: SOL-SYS</span>
        <div className={styles.statusMonitorRow}>
          <span className={styles.blinkCursor} style={{ color: '#00ffff' }}>● MONITORING ACTIVE</span>
          <div className={styles.signalWaveform}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.waveBar} style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Rotating central vector reticle */}
      <div className={styles.centerReticle}>
        <svg viewBox="0 0 100 100" className={styles.reticleSvg}>
          <circle cx="50" cy="50" r="46" className={styles.reticleOuter} />
          <circle cx="50" cy="50" r="32" className={styles.reticleInner} />
          <line x1="50" y1="36" x2="50" y2="42" className={styles.crosshair} />
          <line x1="50" y1="58" x2="50" y2="64" className={styles.crosshair} />
          <line x1="36" y1="50" x2="42" y2="50" className={styles.crosshair} />
          <line x1="58" y1="50" x2="64" y2="50" className={styles.crosshair} />
          <path d="M 18 50 A 32 32 0 0 1 50 18" className={styles.reticleArc} />
          <path d="M 82 50 A 32 32 0 0 1 50 82" className={styles.reticleArc} />
        </svg>
      </div>

      {/* Main typography */}
      <div className={styles.content}>
        <p className={styles.label}>
          <Typewriter 
            text="mankind was born on earth. it was never meant to die here." 
            delay={30} 
            callback={() => setShowSubtitle(true)} 
          />
        </p>
        <h1 className={`${styles.title} ${showSubtitle ? styles.titleVisible : ''}`}>
          Explore<br />
          <em>The Cosmos</em>
        </h1>
        <p className={`${styles.subtitle} ${showSubtitle ? styles.subtitleVisible : ''}`} style={{ maxWidth: '600px', margin: '14px auto 0' }}>
          "We've always defined ourselves by the ability to overcome the impossible. 
          And we began to realize that these moments when we dare to aim higher... 
          are our greatest achievements."
        </p>
        
        {showSubtitle && (
          <a 
            href="#sun" 
            onClick={handleBeginExploration} 
            onMouseEnter={handleCtaHover}
            className={styles.cta} 
            style={{ marginTop: '28px' }}
          >
            Begin Exploration
          </a>
        )}
      </div>

      {/* Bottom Coordinates indicators */}
      <div className={styles.bottomCoords}>
        <span>LAT. 34.0522° N / LONG. 118.2437° W</span>
        <span style={{ margin: '0 12px', opacity: 0.3 }}>|</span>
        <span>GALACTIC POS: RA 17H 45M 40S / DEC -29°00'28"</span>
        <span style={{ margin: '0 12px', opacity: 0.3 }}>|</span>
        <span style={{ color: '#00ffff', textShadow: '0 0 8px rgba(0, 255, 255, 0.4)' }}>
          ELAPSED: T+ {String(missionTime.d).padStart(3, '0')}D:{String(missionTime.h).padStart(2, '0')}H:{String(missionTime.m).padStart(2, '0')}M:{String(missionTime.s).padStart(2, '0')}S
        </span>
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        <div className={styles.scrollDot}  />
      </div>
    </section>
  )
}
