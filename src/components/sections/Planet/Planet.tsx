import { useRef, useState }  from 'react'
import { useInView }          from 'react-intersection-observer'
import PlanetScene            from './PlanetScene'
import styles                 from './Planet.module.css'
import type { PlanetData }    from '../../../data/planets'

interface Props {
  planet: PlanetData
  prev?:  string
  next?:  string
}

export default function Planet({ planet, prev, next }: Props) {
  const { ref, inView } = useInView({ threshold: 0.2 })

  return (
    <section
      id={planet.id}
      ref={ref}
      className={styles.section}
      style={{ background: planet.bgGradient }}
    >
      {/* 3D planet canvas */}
      <PlanetScene planet={planet} isVisible={inView} />

      {/* Holographic Scanning Rings Background (Interstellar HUD style) */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(85vw, 680px)',
        height: 'min(85vw, 680px)',
        borderRadius: '50%',
        border: '1px solid rgba(255, 255, 255, 0.025)',
        pointerEvents: 'none',
        zIndex: 1,
        boxShadow: `0 0 100px -30px ${planet.glowColor}`,
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(95vw, 840px)',
        height: 'min(95vw, 840px)',
        borderRadius: '50%',
        border: '1px dashed rgba(255, 255, 255, 0.012)',
        pointerEvents: 'none',
        zIndex: 1,
        animation: 'spin 180s linear infinite'
      }} />

      {/* Background gradient overlay */}
      <div className={styles.overlay} />

      {/* Neighbor labels */}
      {prev && (
        <a href={`#${prev}`} className={`${styles.neighbor} ${styles.neighborLeft}`}>
          ← {prev.toUpperCase()}
        </a>
      )}
      {next && (
        <a href={`#${next}`} className={`${styles.neighbor} ${styles.neighborRight}`}>
          {next.toUpperCase()} →
        </a>
      )}

      {/* Text content */}
      <div className={`${styles.content} ${inView ? styles.visible : ''}`}>
        <p className={styles.label}>PLANET / {planet.name}</p>

        <h1 className={styles.title} style={{
          textShadow: `0 0 80px ${planet.glowColor}`
        }}>
          {planet.name}
        </h1>

        <p className={styles.subtitle}>{planet.subtitle}</p>

        <button className={styles.cta}
          style={{ borderColor: `${planet.color}40` }}>
          GET STARTED
        </button>

        {/* Stats */}
        <div className={styles.stats}>
          {[
            { label: 'Diameter',  value: planet.stats.diameter },
            { label: 'Distance',  value: planet.stats.distance },
            { label: 'Orbital',   value: planet.stats.orbital  },
            { label: 'Moons',     value: planet.stats.moons    },
          ].map((s, i) => (
            <div key={s.label} className={styles.statCard}
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.statAccent}
                style={{ background: planet.color }} />
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
