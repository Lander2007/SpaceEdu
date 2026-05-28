import { useState, useEffect, useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import styles from './Hero.module.css'

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

  useEffect(() => {
    let index = 0
    setDisplayedText('')
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index))
        index++
      } else {
        clearInterval(interval)
        if (callback) callback()
      }
    }, delay)

    return () => clearInterval(interval)
  }, [text, delay, callback])

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

  useEffect(() => {
    let index = 0
    const addLog = () => {
      if (index < rawLogs.length) {
        setLogs((prev) => [...prev, rawLogs[index]])
        index++
        setTimeout(addLog, 900 + Math.random() * 500)
      }
    }
    addLog()
  }, [rawLogs])

  return (
    <div className={styles.telemetryLogs}>
      {logs.map((log, i) => (
        <div key={i} className={styles.logLine}>
          <span className={styles.logBullet}>&gt;</span> {log}
        </div>
      ))}
      {logs.length < rawLogs.length && <span className={styles.blinkCursor}>_</span>}
    </div>
  )
}

export default function Hero() {
  const [showSubtitle, setShowSubtitle] = useState(false)

  const handleBeginExploration = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
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
      {/* 3D Starfield & Coordinate Grid */}
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0.5, 12], fov: 45 }}>
          <Suspense fallback={null}>
            <Starfield />
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
        <span>RANGE: 1.48B KM</span>
        <span>VELOCITY: 28,400 KM/H</span>
        <span>SECTOR: SOL-SYS</span>
        <span className={styles.blinkCursor} style={{ color: '#00ffff' }}>● MONITORING ACTIVE</span>
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
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        <div className={styles.scrollDot}  />
      </div>
    </section>
  )
}
