// src/components/sections/BlackHole/BlackHole.tsx

import { useRef, useState, useEffect } from 'react'
import { useInView }    from 'react-intersection-observer'
import BlackHoleScene   from './BlackHoleScene'
import BlackHoleStats   from './BlackHoleStats'
import styles           from './BlackHole.module.css'

export default function BlackHole() {
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mass, setMass] = useState(1.0)
  const sectionRef = useRef<HTMLElement | null>(null)

  // Track scroll progress within this section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1,
        -rect.top / window.innerHeight
      ))
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="black-holes"
      ref={(el: HTMLElement | null) => {
        sectionRef.current = el
        ref(el)
      }}
      className={styles.section}
    >
      {/* WebGL Black Hole — only renders when visible */}
      <BlackHoleScene
        isVisible={inView}
        scrollProgress={scrollProgress}
        mass={mass}
      />

      {/* Background gradient overlay */}
      <div className={styles.gradientOverlay} />

      {/* Text content */}
      <div className={`${styles.content} ${inView ? styles.visible : ''}`}>
        <span className={styles.label}>
          SINGULARITY / EVENT HORIZON
        </span>

        <h1 className={styles.title}>
          BLACK HOLES
        </h1>

        <p className={styles.subtitle}>
          Where gravity is so extreme that nothing —
          not even light — can escape. The most violent
          and mysterious objects in the universe.
        </p>

        {/* Singularity mass slider control */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          margin: '20px 0 30px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '15px',
          padding: '16px 28px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          minWidth: '320px',
          pointerEvents: 'auto',
        }}>
          <label style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
          }}>
            Singularity Mass: {mass.toFixed(2)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.05"
            value={mass}
            onChange={(e) => setMass(parseFloat(e.target.value))}
            style={{
              width: '100%',
              accentColor: '#cc00ff',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '5px',
              height: '6px',
              outline: 'none',
              cursor: 'pointer',
            }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            fontFamily: 'var(--font-body)',
            fontSize: '0.58rem',
            color: 'rgba(255,255,255,0.4)',
          }}>
            <span>0.5x (Miniature)</span>
            <span>2.0x (Supermassive)</span>
          </div>
        </div>

        <BlackHoleStats mass={mass} />
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        <div className={styles.scrollDot}  />
      </div>
    </section>
  )
}
