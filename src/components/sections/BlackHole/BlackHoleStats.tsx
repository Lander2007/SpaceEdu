// src/components/sections/BlackHole/BlackHoleStats.tsx

import { useRef, useState } from 'react'
import styles from './BlackHole.module.css'

interface BlackHoleStatsProps {
  mass: number;
}

interface StatCardProps {
  value: string;
  label: string;
  delay: string;
}

function StatCard({ value, label, delay }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({ animationDelay: delay })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left // x position within element
    const y = e.clientY - rect.top  // y position within element
    
    // Calculate rotation angles (range: -12deg to 12deg)
    const rx = -((y / rect.height) - 0.5) * 24
    const ry = ((x / rect.width) - 0.5) * 24
    
    const pctX = (x / rect.width) * 100
    const pctY = (y / rect.height) * 100
    
    setStyle({
      animationDelay: delay,
      transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.08)`,
      boxShadow: '0 20px 40px -15px rgba(204, 0, 255, 0.35), 0 0 20px 1px rgba(255, 0, 102, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.25)',
      background: `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 70%)`,
      transition: 'none',
      zIndex: 10,
    })
  }

  const handleMouseLeave = () => {
    setStyle({
      animationDelay: delay,
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    })
  }

  return (
    <div
      ref={cardRef}
      className={styles.statCard}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.statAccent} />
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  )
}

export default function BlackHoleStats({ mass }: BlackHoleStatsProps) {
  const dynamicStats = [
    { value: `${(4 * mass).toFixed(1)}M☉`,   label: 'Sgr A* Mass'    },
    { value: `${(6.5 * mass).toFixed(1)}B☉`, label: 'M87* Mass'       },
    { value: `${(24 * mass).toFixed(0)}M km`, label: 'Event Horizon' },
    { value: 'c',     label: 'Escape Velocity' },
  ]

  return (
    <div className={styles.statsRow}>
      {dynamicStats.map((s, i) => (
        <StatCard
          key={s.label}
          value={s.value}
          label={s.label}
          delay={`${0.2 + i * 0.12}s`}
        />
      ))}
    </div>
  )
}
