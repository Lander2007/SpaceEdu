import { useState, useEffect, useCallback } from 'react'

const SECTIONS = [
  { id: 'hero',        label: 'Home',           hudLabel: 'COSMOS INIT',     color: '#ffffff' },
  { id: 'sun',         label: 'Sun',            hudLabel: 'SOLAR CORE',      color: '#FFB347' },
  { id: 'mercury',     label: 'Mercury',        hudLabel: 'MERCURY',         color: '#A89070' },
  { id: 'venus',       label: 'Venus',          hudLabel: 'VENUS',           color: '#E8C47A' },
  { id: 'earth',       label: 'Earth',          hudLabel: 'EARTH CRADLE',    color: '#4B9CD3' },
  { id: 'mars',        label: 'Mars',           hudLabel: 'MARS FRONTIER',   color: '#C1440E' },
  { id: 'asteroids',   label: 'Asteroids',      hudLabel: 'ASTEROID FIELD',  color: '#c084fc' },
  { id: 'jupiter',     label: 'Jupiter',        hudLabel: 'JUPITER GIANT',   color: '#C88B3A' },
  { id: 'saturn',      label: 'Saturn',         hudLabel: 'SATURN RINGS',    color: '#E4D191' },
  { id: 'wormhole',    label: 'Wormhole',       hudLabel: 'WORMHOLE GATE',   color: '#00ffff' },
  { id: 'uranus',      label: 'Uranus',         hudLabel: 'URANUS ICE',      color: '#7DE8E8' },
  { id: 'neptune',     label: 'Neptune',        hudLabel: 'NEPTUNE STORM',   color: '#3F54BA' },
  { id: 'miller',      label: 'Miller',         hudLabel: 'MILLERS PLANET',  color: '#00a0ff' },
  { id: 'pluto',       label: 'Pluto',          hudLabel: 'PLUTO FRONTIER',  color: '#C39B78' },
  { id: 'galaxy',      label: 'Galaxy',         hudLabel: 'MILKY WAY',       color: '#7de8e8' },
  { id: 'scale',       label: 'Scale',          hudLabel: 'SCALE COMPARISON',color: '#ffffff' },
  { id: 'black-holes', label: 'Black Holes',    hudLabel: 'GARGANTUA',       color: '#9933FF' },
  { id: 'concept',     label: 'Concept',        hudLabel: 'THE CONCEPT',     color: '#ffffff' },
]

const NAV_GROUPS = [
  {
    name: 'Solar System',
    sections: [
      { id: 'sun', label: 'Sun', color: '#FFB347' },
      { id: 'mercury', label: 'Mercury', color: '#A89070' },
      { id: 'venus', label: 'Venus', color: '#E8C47A' },
      { id: 'earth', label: 'Earth', color: '#4B9CD3' },
      { id: 'mars', label: 'Mars', color: '#C1440E' },
      { id: 'asteroids', label: 'Asteroid Belt', color: '#c084fc' },
      { id: 'jupiter', label: 'Jupiter', color: '#C88B3A' },
      { id: 'saturn', label: 'Saturn', color: '#E4D191' },
    ]
  },
  {
    name: 'Deep Space',
    sections: [
      { id: 'wormhole', label: 'Wormhole Gate', color: '#00ffff' },
      { id: 'uranus', label: 'Uranus', color: '#7DE8E8' },
      { id: 'neptune', label: 'Neptune', color: '#3F54BA' },
      { id: 'miller', label: 'Miller\'s Planet', color: '#00a0ff' },
      { id: 'pluto', label: 'Pluto', color: '#C39B78' },
      { id: 'galaxy', label: 'Milky Way', color: '#7de8e8' },
    ]
  },
  {
    name: 'The Abyss',
    sections: [
      { id: 'scale', label: 'Scale Comparison', color: '#ffffff' },
      { id: 'black-holes', label: 'Black Holes', color: '#9933FF' },
      { id: 'concept', label: 'Mission Concept', color: '#ffffff' },
    ]
  }
]

const SECTION_DISTANCES: Record<string, string> = {
  hero: '0 KM',
  sun: '149.6M KM',
  mercury: '91.7M KM',
  venus: '41.4M KM',
  earth: '0 KM',
  mars: '78.3M KM',
  asteroids: '329.0M KM',
  jupiter: '628.7M KM',
  saturn: '1.27B KM',
  wormhole: 'Warp Horizon',
  uranus: '2.72B KM',
  neptune: '4.35B KM',
  miller: '12.4B KM',
  pluto: '5.91B KM',
  galaxy: '26K Light-Years',
  scale: 'Universal Range',
  'black-holes': '10K Light-Years',
  concept: 'Mission End'
}

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [isMobile,     setIsMobile]     = useState(false)

  // Live telemetry state
  const [velocity, setVelocity] = useState(28410)
  const [signal, setSignal] = useState(98.4)

  useEffect(() => {
    const interval = setInterval(() => {
      setVelocity(v => Math.round(v + (Math.random() - 0.5) * 6))
      setSignal(s => Math.min(100, Math.max(92, parseFloat((s + (Math.random() - 0.5) * 0.3).toFixed(1)))))
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  // Detect active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    onScroll(); onResize()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }, [])

  const activeColor = SECTIONS.find(s => s.id === activeSection)?.color ?? '#ffffff'

  // Mobile navigation return
  if (isMobile) {
    return (
      <>
        <style dangerouslySetInnerHTML={{__html: `
          .mobile-grid-bg {
            background-image: 
              linear-gradient(rgba(255, 255, 255, 0.012) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.012) 1px, transparent 1px) !important;
            background-size: 32px 32px !important;
            background-position: center !important;
          }
          @keyframes fadeUpStagger {
            0% {
              opacity: 0;
              transform: translateY(12px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}} />

        <nav style={{
          position:       'fixed',
          top:            0, left: 0, right: 0,
          height:         'var(--nav-height)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '0 20px',
          zIndex:         1000,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          background:     scrolled ? 'rgba(3, 5, 22, 0.85)' : 'rgba(2, 4, 18, 0.15)',
          borderBottom: scrolled ? `1px solid ${activeColor}20` : '1px solid rgba(255, 255, 255, 0.05)',
          transition: 'all 0.4s ease',
        }}>
          {/* Logo */}
          <div
            onClick={() => scrollTo('hero')}
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.82rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.92)',
              display:       'flex',
              alignItems:    'center',
              gap:           '8px',
              cursor:        'none',
            }}
          >
            spaceedu
            <span style={{
              width:        '6px',
              height:       '6px',
              borderRadius: '50%',
              background:    activeColor,
              boxShadow:    `0 0 10px 2.5px ${activeColor}90`,
              animation:    'pulse 2s infinite',
              transition:   'background 0.5s ease, box-shadow 0.5s ease',
            }} />
          </div>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border:     'none',
              cursor:     'pointer',
              padding:    '8px',
              display:    'flex',
              flexDirection: 'column',
              gap:        '5px',
              zIndex:     1001,
            }}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display:         'block',
                width:           '22px',
                height:          '1.5px',
                background:      'rgba(255,255,255,0.8)',
                borderRadius:    '1px',
                transition:      'all 0.3s ease',
                transformOrigin: 'center',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </nav>

        {/* mobile fullscreen drawer menu */}
        <div 
          className="mobile-grid-bg"
          style={{
            position:       'fixed',
            inset:          0,
            background:     'rgba(2, 4, 18, 0.98)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            zIndex:         999,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'stretch',
            justifyContent: 'flex-start',
            paddingTop:     '90px',
            paddingBottom:  '40px',
            overflowY:      'auto',
            opacity:        menuOpen ? 1 : 0,
            pointerEvents:  menuOpen ? 'auto' : 'none',
            transition:     'opacity 0.4s ease',
          }}
        >
          {SECTIONS.map((s, i) => {
            const isActive = activeSection === s.id
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '1.02rem',
                  fontWeight:    isActive ? 600 : 400,
                  color:         isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                  background:    'none',
                  border:        'none',
                  cursor:        'pointer',
                  letterSpacing: '0.14em',
                  padding:       '12px 28px',
                  width:         '100%',
                  textAlign:     'left',
                  display:       'flex',
                  alignItems:    'center',
                  justifyContent:'space-between',
                  borderBottom:  '1px solid rgba(255, 255, 255, 0.03)',
                  transition:    'all 0.3s ease',
                  animation:     menuOpen
                    ? `fadeUpStagger 0.4s ${i * 0.02}s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94)`
                    : 'none',
                  opacity:       0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#ffffff'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = isActive ? '#ffffff' : 'rgba(255,255,255,0.55)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.66rem',
                    color: isActive ? s.color : 'rgba(255, 255, 255, 0.25)',
                    transition: 'color 0.3s ease',
                  }}>
                    {String(i).padStart(2, '0')}
                  </span>
                  <span style={{ textTransform: 'uppercase' }}>{s.label}</span>
                </div>
                {isActive && (
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: s.color,
                    boxShadow: `0 0 10px ${s.color}`,
                  }} />
                )}
              </button>
            )
          })}
        </div>

        {/* bottom floating control dots pill */}
        <div style={{
          position:        'fixed',
          bottom:          '20px',
          left:            '50%',
          transform:       'translateX(-50%)',
          display:         'flex',
          alignItems:      'center',
          gap:             '6px',
          background:      'rgba(0,0,20,0.8)',
          backdropFilter:  'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border:          `1px solid ${activeColor}30`,
          borderRadius:    '40px',
          padding:         '8px 12px',
          zIndex:          998,
          transition:      'border-color 0.5s ease',
          boxShadow:       `0 0 30px ${activeColor}20`,
        }}>
          <button
            onClick={() => {
              const i = SECTIONS.findIndex(s => s.id === activeSection)
              if (i > 0) scrollTo(SECTIONS[i-1].id)
            }}
            style={{
              width:        '32px',
              height:       '32px',
              borderRadius: '50%',
              background:   'rgba(255,255,255,0.06)',
              border:       '1px solid rgba(255,255,255,0.1)',
              color:        'rgba(255,255,255,0.6)',
              fontSize:     '14px',
              cursor:       'pointer',
              display:      'flex',
              alignItems:   'center',
              justifyContent:'center',
              outline:      'none',
            }}
          >‹</button>

          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{
                  width:        activeSection === s.id ? '18px' : '4px',
                  height:       '4px',
                  borderRadius: '2px',
                  background:   activeSection === s.id ? s.color : 'rgba(255,255,255,0.2)',
                  border:       'none',
                  cursor:       'pointer',
                  padding:      0,
                  transition:   'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                  boxShadow:    activeSection === s.id ? `0 0 8px ${s.color}80` : 'none',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => {
              const i = SECTIONS.findIndex(s => s.id === activeSection)
              if (i < SECTIONS.length - 1) scrollTo(SECTIONS[i+1].id)
            }}
            style={{
              width:        '32px',
              height:       '32px',
              borderRadius: '50%',
              background:   'rgba(255,255,255,0.06)',
              border:       '1px solid rgba(255,255,255,0.1)',
              color:        'rgba(255,255,255,0.6)',
              fontSize:     '14px',
              cursor:       'pointer',
              display:      'flex',
              alignItems:   'center',
              justifyContent:'center',
              outline:      'none',
            }}
          >›</button>
        </div>

        <ScrollProgressBar activeColor={activeColor} />
      </>
    )
  }

  // Desktop Expandable Dynamic Island return
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .dynamic-island {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          height: 44px;
          width: 390px;
          border-radius: 22px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(3, 5, 22, 0.95) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          z-index: 1000;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.02);
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          overflow: visible;
        }

        .dynamic-island:hover {
          width: 980px;
          height: 64px;
          border-radius: 32px;
          background: rgba(3, 5, 22, 0.85);
          border-color: var(--active-border-glow);
          box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.7), 0 0 35px var(--active-shadow-glow);
          padding: 0 32px;
        }

        .island-compact-view {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          opacity: 1;
          visibility: visible;
          transition: opacity 0.3s ease, transform 0.3s ease;
          transform: scale(1);
        }

        .dynamic-island:hover .island-compact-view {
          opacity: 0;
          visibility: hidden;
          transform: scale(0.9);
          position: absolute;
        }

        .island-expanded-view {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
          transform: scale(0.95);
        }

        .dynamic-island:hover .island-expanded-view {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
        }

        .nav-item-container {
          position: relative;
        }
        
        .nav-group-trigger {
          font-family: var(--font-body);
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          background: none;
          border: none;
          cursor: none;
          transition: all 0.3s ease;
          padding: 8px 16px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nav-group-trigger.active {
          color: #ffffff;
        }

        .nav-item-container:hover .nav-group-trigger {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .dropdown-arrow {
          font-size: 0.45rem;
          transition: transform 0.3s ease, opacity 0.3s ease;
          opacity: 0.6;
          display: inline-block;
        }

        .nav-item-container:hover .dropdown-arrow {
          transform: rotate(180deg);
          opacity: 1;
        }

        .nav-dropdown {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(12px);
          width: 230px;
          background: rgba(3, 5, 22, 0.95);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid var(--active-border-glow);
          border-radius: 16px;
          padding: 10px;
          z-index: 1010;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7), 0 0 20px var(--active-shadow-glow);
        }

        .nav-item-container:hover .nav-dropdown {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 8px 12px;
          background: transparent;
          border: none;
          border-left: 2px solid transparent;
          border-radius: 8px;
          text-align: left;
          cursor: none;
          transition: all 0.2s ease;
        }

        .dropdown-item.active {
          background: rgba(255, 255, 255, 0.06);
          border-left-color: var(--active-border-glow);
        }

        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(4px);
        }

        .dropdown-item-label {
          font-family: var(--font-body);
          font-size: 0.66rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.2s ease;
        }

        .dropdown-item.active .dropdown-item-label,
        .dropdown-item:hover .dropdown-item-label {
          color: #ffffff;
        }

        .beacon-ping {
          animation: beaconPulse 2s infinite ease-in-out;
        }

        @keyframes beaconPulse {
          0% { transform: scale(1); opacity: 0.8; box-shadow: 0 0 4px var(--active-border-glow); }
          50% { transform: scale(1.4); opacity: 1; box-shadow: 0 0 12px var(--active-border-glow); }
          100% { transform: scale(1); opacity: 0.8; box-shadow: 0 0 4px var(--active-border-glow); }
        }
      `}} />

      {/* ── EXPANDABLE DYNAMIC ISLAND NAVBAR ── */}
      <nav 
        className="dynamic-island"
        style={{
          '--active-border-glow': `${activeColor}30`,
          '--active-shadow-glow': `${activeColor}20`,
        } as React.CSSProperties}
      >
        {/* COMPACT STATE VIEW */}
        <div className="island-compact-view">
          <div
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.76rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.92)',
              display:       'flex',
              alignItems:    'center',
              gap:           '6px',
            }}
          >
            spaceedu
            <span className="beacon-ping" style={{
              width:        '5px',
              height:       '5px',
              borderRadius: '50%',
              background:    activeColor,
              boxShadow:    `0 0 8px 1.5px ${activeColor}80`,
              transition:   'background 0.5s ease, box-shadow 0.5s ease',
              '--active-border-glow': activeColor
            } as React.CSSProperties} />
          </div>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.8rem' }}>|</span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            letterSpacing: '0.15em',
            color: activeColor,
            textTransform: 'uppercase',
            transition: 'color 0.4s ease',
          }}>
            {SECTIONS.find(s => s.id === activeSection)?.hudLabel || 'DEEP SPACE'}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.8rem' }}>|</span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.52rem',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.08em',
          }}>
            DST: {SECTION_DISTANCES[activeSection] || '0 KM'}
          </span>
        </div>

        {/* EXPANDED STATE VIEW */}
        <div className="island-expanded-view">
          {/* Logo */}
          <div
            onClick={() => scrollTo('hero')}
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.82rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.92)',
              display:       'flex',
              alignItems:    'center',
              gap:           '8px',
              cursor:        'none',
            }}
          >
            spaceedu
            <span style={{
              width:        '6px',
              height:       '6px',
              borderRadius: '50%',
              background:    activeColor,
              boxShadow:    `0 0 10px 2.5px ${activeColor}90`,
              animation:    'pulse 2s infinite',
              transition:   'background 0.5s ease, box-shadow 0.5s ease',
            }} />
          </div>

          {/* Group dropdowns */}
          <div style={{
            display:    'flex',
            gap:        '12px',
            alignItems: 'center',
          }}>
            {NAV_GROUPS.map(group => {
              const isGroupActive = group.sections.some(s => s.id === activeSection)
              return (
                <div key={group.name} className="nav-item-container">
                  <button className={`nav-group-trigger ${isGroupActive ? 'active' : ''}`}>
                    {group.name}
                    <span className="dropdown-arrow">▼</span>
                  </button>

                  <div className="nav-dropdown">
                    {group.sections.map(s => {
                      const isItemActive = activeSection === s.id
                      return (
                        <button
                          key={s.id}
                          onClick={() => scrollTo(s.id)}
                          className={`dropdown-item ${isItemActive ? 'active' : ''}`}
                        >
                          <span
                            style={{
                              width:        '6px',
                              height:       '6px',
                              borderRadius: '50%',
                              background:   s.color,
                              boxShadow:    `0 0 6px ${s.color}`,
                            }}
                          />
                          <span className="dropdown-item-label">
                            {s.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* HUD telemetry stats + Explore Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.52rem',
              letterSpacing: '0.15em',
              color: 'rgba(255, 255, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '4px 16px',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              marginRight: '4px'
            }}>
              <div>
                <span style={{ color: activeColor }}>VEL:</span> {velocity.toLocaleString()} KM/S
              </div>
              <div>
                <span style={{ color: activeColor }}>SIG:</span> {signal}%
              </div>
              <div>
                <span style={{ color: activeColor }}>DST:</span> {SECTION_DISTANCES[activeSection] || '0 KM'}
              </div>
            </div>

            <button 
              onClick={() => scrollTo('sun')}
              style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '0.68rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding:       '10px 22px',
                background:    'transparent',
                color:         '#ffffff',
                border:        `1px solid ${activeColor}`,
                borderRadius:  '30px',
                cursor:        'none',
                fontWeight:    500,
                boxShadow:     `0 0 10px ${activeColor}40`,
                transition:    'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = activeColor
                e.currentTarget.style.color = '#020414'
                e.currentTarget.style.boxShadow = `0 0 20px 5px ${activeColor}80`
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.boxShadow = `0 0 10px ${activeColor}40`
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Explore
            </button>
          </div>
        </div>
      </nav>

      {/* ── SIDE TIMELINE DOT NAVIGATION (desktop) ────── */}
      <div style={{
        position:       'fixed',
        right:          '24px',
        top:            '50%',
        transform:      'translateY(-50%)',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'flex-end',
        gap:            '14px',
        zIndex:         999,
        pointerEvents:  'none',
        userSelect:     'none',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          color: activeColor,
          textTransform: 'uppercase',
          marginBottom: '6px',
          background: 'rgba(5, 5, 12, 0.65)',
          border: `1px solid ${activeColor}30`,
          padding: '5px 12px',
          borderRadius: '4px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          transition: 'color 0.4s ease, border-color 0.4s ease',
          boxShadow: `0 0 15px -3px ${activeColor}30`,
        }}>
          Coordinate: {SECTIONS.find(s => s.id === activeSection)?.hudLabel || 'DEEP SPACE'}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          position: 'relative',
          paddingRight: '6px'
        }}>
          <div style={{
            position: 'absolute',
            right: '9px',
            top: '5px',
            bottom: '5px',
            width: '1px',
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 1
          }} />

          {SECTIONS.map((s) => {
            const isActive = activeSection === s.id
            return (
              <div
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '12px',
                  cursor: 'none',
                  pointerEvents: 'auto',
                  position: 'relative',
                  zIndex: 2,
                  height: '14px',
                }}
                onMouseEnter={(e) => {
                  const label = e.currentTarget.querySelector('.timeline-label') as HTMLSpanElement
                  if (label && !isActive) {
                    label.style.opacity = '0.8'
                    label.style.transform = 'translateX(0)'
                  }
                  const dot = e.currentTarget.querySelector('.timeline-dot') as HTMLDivElement
                  if (dot && !isActive) {
                    dot.style.transform = 'scale(1.5)'
                    dot.style.background = s.color
                  }
                }}
                onMouseLeave={(e) => {
                  const label = e.currentTarget.querySelector('.timeline-label') as HTMLSpanElement
                  if (label && !isActive) {
                    label.style.opacity = '0'
                    label.style.transform = 'translateX(10px)'
                  }
                  const dot = e.currentTarget.querySelector('.timeline-dot') as HTMLDivElement
                  if (dot && !isActive) {
                    dot.style.transform = 'scale(1)'
                    dot.style.background = 'rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                <span
                  className="timeline-label"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.52rem',
                    letterSpacing: '0.18em',
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.25)',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateX(0)' : 'translateX(10px)',
                    transition: 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    pointerEvents: 'none',
                    textTransform: 'uppercase',
                    textShadow: isActive ? `0 0 10px ${s.color}60` : 'none',
                  }}
                >
                  {s.hudLabel}
                </span>

                <div
                  className="timeline-dot"
                  style={{
                    width: isActive ? '10px' : '4px',
                    height: isActive ? '10px' : '4px',
                    borderRadius: '50%',
                    background: isActive ? s.color : 'rgba(255, 255, 255, 0.3)',
                    boxShadow: isActive ? `0 0 12px 3px ${s.color}aa` : 'none',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    border: isActive ? '1px solid #ffffff' : 'none',
                    transform: 'scale(1)'
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* ── SCROLL PROGRESS BAR ──────────────── */}
      <ScrollProgressBar activeColor={activeColor} />
    </>
  )
}

function ScrollProgressBar({ activeColor }: { activeColor: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      setProgress(scrollTop / (scrollHeight - clientHeight) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{
      position:   'fixed',
      top:        0, left: 0,
      height:     '2px',
      width:      `${progress}%`,
      background: `linear-gradient(90deg, #1a88ff, #8833ff, ${activeColor}, #ff6600)`,
      boxShadow:  `0 0 10px 2px ${activeColor}60`,
      zIndex:     9999,
      transition: 'width 0.1s linear, box-shadow 0.5s ease',
    }} />
  )
}
