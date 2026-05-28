import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import styles from './Concept.module.css'

export default function Concept() {
  const { ref, inView } = useInView({ threshold: 0.2 })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Warm, golden-white floating nebula particles
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.5 + 0.2
    }))

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 3, 0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        // Wrap boundaries
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="concept"
      ref={ref}
      className={styles.section}
    >
      <canvas ref={canvasRef} className={styles.canvas} />
      
      {/* Film grain */}
      <div className="film-grain" />
      <div className={styles.overlay} />

      <div className={`${styles.content} ${inView ? styles.visible : ''}`}>
        <p className={styles.label}>EPILOGUE / MISSION OBJECTIVE</p>
        <h1 className={styles.title}>THE CONCEPT</h1>
        
        <p className={styles.subtitle}>
          SpaceEdu is designed as an interactive 3D portal bridging physics, astronomy, 
          and art. By combining advanced WebGL shaders with intuitive mechanical simulations, 
          the site creates a visceral sense of space—empowering you to rotate planets, explore 
          asteroid fields, and traverse Einstein-Rosen wormholes.
        </p>

        {/* Epic Final Quote Card */}
        <div className={styles.quoteCard}>
          <div className={styles.quoteLabel}>FINAL COSMIC RECORDING</div>
          <p className={styles.quoteText}>
            "We used to look up at the sky and wonder at our place in the stars. 
            Now we just look down, and worry about our place in the dirt."
          </p>
          <span className={styles.quoteAuthor}>— Cooper, Interstellar</span>
        </div>

        <div className={styles.footerCredits}>
          <span>Mission System: SpaceEdu v1.1.0</span>
          <span>Procedural Audio Synth Engine</span>
          <span>© {new Date().getFullYear()} Space Exploration Foundation</span>
        </div>
      </div>
    </section>
  )
}
