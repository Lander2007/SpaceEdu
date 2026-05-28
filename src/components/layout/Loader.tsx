import { useProgress } from '@react-three/drei'
import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const { active, progress: r3fProgress } = useProgress()
  const [progress, setProgress] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Increments progress smoothly to give realistic aesthetic feed
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const increment = Math.random() * 5 + 3
        const next = prev + increment
        return Math.min(100, Math.max(next, r3fProgress))
      })
    }, 80)

    return () => clearInterval(interval)
  }, [r3fProgress])

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setShow(false), 600)
      return () => clearTimeout(timer)
    }
  }, [progress])

  useEffect(() => {
    // Safety fallback: force loader closure after 4.5s max
    const safetyTimer = setTimeout(() => setShow(false), 4500)
    return () => clearTimeout(safetyTimer)
  }, [])

  // Dynamic status text based on progress
  const loadingStatusText = useMemo(() => {
    if (progress < 25) return 'CALCULATING PLANETARY ORBITS...'
    if (progress < 50) return 'LOADING HIGH-RESOLUTION TEXTURE MAPS...'
    if (progress < 75) return 'GENERATINGProcedural BLACK HOLES...'
    if (progress < 95) return 'COMPILING COSMIC SPECTRAL STARFIELDS...'
    return 'SYSTEM READY. ENTERING THE VOID...'
  }, [progress])

  if (!show) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000005',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            overflow: 'hidden',
          }}
        >
          {/* Glowing Nebula Background Blobs */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              x: [-20, 20, -20],
              y: [-10, 10, -10],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '-10%',
              left: '-10%',
              width: '50vw',
              height: '50vw',
              background: 'radial-gradient(circle, rgba(130, 80, 255, 0.12) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            animate={{
              scale: [1.1, 0.95, 1.1],
              x: [20, -20, 20],
              y: [10, -10, 10],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: '-10%',
              right: '-10%',
              width: '55vw',
              height: '55vw',
              background: 'radial-gradient(circle, rgba(255, 0, 150, 0.08) 0%, transparent 70%)',
              filter: 'blur(70px)',
              pointerEvents: 'none',
            }}
          />

          {/* Orrery Solar System Loader */}
          <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Glowing Sun center */}
            <div style={{
              position: 'absolute',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FFE79A 0%, #FFA500 70%, #FF4500 100%)',
              boxShadow: '0 0 35px 8px rgba(255,165,0,0.55), 0 0 70px 15px rgba(255,69,0,0.3)',
              zIndex: 5,
            }} />
            
            {/* Orbit 1 (Mercury) - Inner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.06)',
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-3px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#8B8680',
                boxShadow: '0 0 8px #8B8680',
              }} />
            </motion.div>

            {/* Orbit 2 (Earth) - Middle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.08)',
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#4B9CD3',
                boxShadow: '0 0 10px #4B9CD3',
              }} />
            </motion.div>

            {/* Orbit 3 (Mars) - Outer */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '186px',
                height: '186px',
                borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.05)',
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-3px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#C1440E',
                boxShadow: '0 0 8px #C1440E',
              }} />
            </motion.div>
          </div>

          {/* Loading Label Details */}
          <div style={{ textAlign: 'center', zIndex: 6, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <motion.div
              key={loadingStatusText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.5, y: 0 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.22em',
                color: '#fff',
                textTransform: 'uppercase',
              }}
            >
              {loadingStatusText}
            </motion.div>

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.8rem',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '0.05em',
              textShadow: '0 0 15px rgba(255,255,255,0.3)',
            }}>
              {Math.round(progress)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
