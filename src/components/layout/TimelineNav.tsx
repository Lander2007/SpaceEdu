import { useEffect, useState } from 'react'

export default function TimelineNav() {
  const [activeSection, setActiveSection] = useState('hero')

  const sections = [
    { id: 'hero',        label: 'COSMOS INIT' },
    { id: 'sun',         label: 'SOLAR CORE' },
    { id: 'mercury',     label: 'MERCURY' },
    { id: 'venus',       label: 'VENUS' },
    { id: 'earth',       label: 'EARTH CRADLE' },
    { id: 'mars',        label: 'MARS FRONTIER' },
    { id: 'asteroids',   label: 'ASTEROID FIELD' },
    { id: 'jupiter',     label: 'JUPITER GIANT' },
    { id: 'saturn',      label: 'SATURN RINGS' },
    { id: 'wormhole',    label: 'WORMHOLE GATE' },
    { id: 'uranus',      label: 'URANUS ICE' },
    { id: 'neptune',     label: 'NEPTUNE STORM' },
    { id: 'miller',      label: 'MILLERS PLANET' },
    { id: 'galaxy',      label: 'MILKY WAY' },
    { id: 'scale',       label: 'SCALE COMPARISON' },
    { id: 'black-holes', label: 'GARGANTUA' },
    { id: 'concept',     label: 'THE CONCEPT' }
  ]

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger exactly when mid-point of section hits middle screen
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div style={{
      position: 'fixed',
      right: '24px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '14px',
      pointerEvents: 'none',
      userSelect: 'none',
    }}>
      {/* HUD Active section marker */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        letterSpacing: '0.2em',
        color: '#cc00ff',
        textTransform: 'uppercase',
        marginBottom: '10px',
        animation: 'pulse 2s infinite',
        background: 'rgba(5, 5, 12, 0.6)',
        border: '1px solid rgba(204, 0, 255, 0.2)',
        padding: '4px 10px',
        borderRadius: '4px',
        backdropFilter: 'blur(5px)',
      }}>
        Coordinate: {sections.find(s => s.id === activeSection)?.label || 'DEEP SPACE'}
      </div>

      {/* Timeline track */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        position: 'relative',
        paddingRight: '6px'
      }}>
        {/* Track Line */}
        <div style={{
          position: 'absolute',
          right: '9px',
          top: '5px',
          bottom: '5px',
          width: '1px',
          background: 'rgba(255, 255, 255, 0.1)',
          zIndex: 1
        }} />

        {/* Timeline dots */}
        {sections.map((sec) => {
          const isActive = activeSection === sec.id
          return (
            <div
              key={sec.id}
              onClick={() => handleNavClick(sec.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'none',
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 2,
                height: '12px'
              }}
            >
              {/* Floating label on hover/active */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                letterSpacing: '0.15em',
                color: isActive ? 'white' : 'rgba(255,255,255,0.25)',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(10px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                pointerEvents: 'none',
                textTransform: 'uppercase'
              }} className="timeline-label">
                {sec.label}
              </span>

              {/* Point Node dot */}
              <div
                style={{
                  width: isActive ? '8px' : '4px',
                  height: isActive ? '8px' : '4px',
                  borderRadius: '50%',
                  background: isActive ? '#cc00ff' : 'rgba(255, 255, 255, 0.3)',
                  boxShadow: isActive ? '0 0 10px 2px #cc00ff' : 'none',
                  transition: 'all 0.3s ease',
                  border: isActive ? '1px solid white' : 'none'
                }}
              />
            </div>
          )
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        /* Hover triggers matching tags */
        div[class*="timeline-dot"]:hover .timeline-label {
          opacity: 0.8 !important;
          transform: translateX(0) !important;
        }
      `}} />
    </div>
  )
}
