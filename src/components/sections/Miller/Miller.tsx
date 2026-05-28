import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import MillerScene from './MillerScene'
import styles from './Miller.module.css'

export default function Miller() {
  const { ref, inView } = useInView({ threshold: 0.2 })
  const [hours, setHours] = useState(1)

  // 1 hour on Miller = 7 Earth years (61320 hours dilation factor!)
  const earthYears = (hours * 7).toFixed(1)
  const earthDays = Math.round(hours * 7 * 365.25).toLocaleString()

  return (
    <section
      id="miller"
      ref={ref}
      className={styles.section}
    >
      {/* 3D Miller's Planet canvas background */}
      <MillerScene isVisible={inView} />

      {/* Atmospheric overlay */}
      <div className={styles.overlay} />

      {/* Floating navigation links */}
      <a href="#neptune" className={`${styles.neighbor} ${styles.neighborLeft}`} style={{
        position: 'absolute',
        top: '50%',
        left: '24px',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.58rem',
        letterSpacing: '0.2em',
        color: 'rgba(255,255,255,0.3)',
        textDecoration: 'none',
        zIndex: 10
      }}>
        ← NEPTUNE WIND
      </a>
      <a href="#galaxy" className={`${styles.neighbor} ${styles.neighborRight}`} style={{
        position: 'absolute',
        top: '50%',
        right: '24px',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.58rem',
        letterSpacing: '0.2em',
        color: 'rgba(255,255,255,0.3)',
        textDecoration: 'none',
        zIndex: 10
      }}>
        MILKY WAY →
      </a>

      {/* Main text content */}
      <div className={`${styles.content} ${inView ? styles.visible : ''}`}>
        <p className={styles.label}>FIRST PLANET EXPLORATION / GARGANTUA ORBIT</p>
        <h1 className={styles.title}>MILLER'S PLANET</h1>
        <p className={styles.subtitle}>
          A vast, infinite water world orbiting extremely close to the supermassive black hole Gargantua, 
          experiencing extreme gravitational time dilation.
        </p>

        {/* Time dilation interactive HUD card */}
        <div className={styles.sliderContainer}>
          <div className={styles.sliderLabel}>GRAVITATIONAL TIME DILATION CALCULATOR</div>
          <input
            type="range"
            min="1"
            max="12"
            step="1"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
            className={styles.sliderInput}
          />
          <div className={styles.sliderFooter}>
            <span>1 Hour Here</span>
            <span>12 Hours Here</span>
          </div>

          <div className={styles.dilationHUD}>
            <strong>{hours} Hour{hours > 1 ? 's' : ''} on Miller</strong> ={' '}
            <span style={{ color: '#00a0ff', fontWeight: 600 }}>{earthYears} Years</span> on Earth
            <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
              (~{earthDays} days of terrestrial timeline passing in the outer cosmos)
            </div>
          </div>
        </div>

        {/* Physical Telemetry Details Grid */}
        <div className={styles.stats}>
          {[
            { label: 'Gravity',     value: '130% Earth' },
            { label: 'Ocean Depth', value: 'Shallow (0.6m)' },
            { label: 'Tidal Waves', value: '1,200m High' },
            { label: 'Dilation',    value: '61,320x Factor' },
          ].map((s, i) => (
            <div key={s.label} className={styles.statCard}
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.statAccent} />
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
