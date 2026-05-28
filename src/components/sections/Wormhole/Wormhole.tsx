import { useInView } from 'react-intersection-observer'
import WormholeScene from './WormholeScene'
import styles from './Wormhole.module.css'

export default function Wormhole() {
  const { ref, inView } = useInView({ threshold: 0.2 })

  return (
    <section
      id="wormhole"
      ref={ref}
      className={styles.section}
    >
      {/* 3D Wormhole canvas background */}
      <WormholeScene isVisible={inView} />

      {/* Atmospheric overlays */}
      <div className={styles.overlay} />

      {/* Floating coordinates labels */}
      <a href="#saturn" className={`${styles.neighbor} ${styles.neighborLeft}`} style={{
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
        ← SATURN CORE
      </a>
      <a href="#uranus" className={`${styles.neighbor} ${styles.neighborRight}`} style={{
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
        URANUS ICE →
      </a>

      {/* Centered content block */}
      <div className={`${styles.content} ${inView ? styles.visible : ''}`}>
        <p className={styles.label}>SATURN CO-ORDINATES / ERB-01</p>
        <h1 className={styles.title}>THE WORMHOLE</h1>
        <p className={styles.subtitle}>
          A spherical gravitational tunnel warped in space-time near Saturn's orbits, 
          leading to a completely different galaxy in another dimension.
        </p>

        {/* Cinematic HUD dashboard telemetry info */}
        <div className={styles.hudCard}>
          <div className={styles.hudHeader}>GRAVITATIONAL TELEMETRY SUMMARY</div>
          <div className={styles.hudText}>
            Bridge Type: Einstein-Rosen throat lens <br />
            Deflection Index: θ ≈ 4GM/c²r (Spherical Lensing) <br />
            Throat Diameter: ~1.25 Kilometers <br />
            Destination Coordinates: Gargantua System (Cygnus X-1 Outer Edge)
          </div>
        </div>
      </div>
    </section>
  )
}
