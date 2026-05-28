import { useEffect, useState } from 'react'
import MoonModel   from './MoonModel'
import { moons }   from '../../../data/moons'
import type { MoonData } from '../../../data/moons'

interface Props {
  moon:        MoonData
  accentColor: string
  onClose:     () => void
}

export default function MoonExplorer({
  moon, accentColor, onClose
}: Props) {
  const planetMoons = moons[moon.planet] ?? []
  const [activeMoon, setActiveMoon] = useState<MoonData>(moon)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleNext = () => {
    const currentIndex = planetMoons.findIndex(m => m.id === activeMoon.id)
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % planetMoons.length
      setActiveMoon(planetMoons[nextIndex])
    }
  }

  const handlePrev = () => {
    const currentIndex = planetMoons.findIndex(m => m.id === activeMoon.id)
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + planetMoons.length) % planetMoons.length
      setActiveMoon(planetMoons[prevIndex])
    }
  }

  const isMobile = window.innerWidth <= 768

  return (
    <div
      onClick={(e) => {
        // Close when clicking backdrop
        if (e.target === e.currentTarget) onClose()
      }}
      style={{
        position:       'fixed',
        inset:          0,
        background:     'rgba(0,0,10,0.8)',
        backdropFilter: 'blur(12px)',
        zIndex:         5000,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        isMobile ? '0' : '20px',
        animation:      'fadeIn 0.3s ease',
      }}
    >
      {/* Modal container */}
      <div style={{
        width:          isMobile ? '100%'   : '580px',
        height:         isMobile ? '100%'   : 'auto',
        maxHeight:      isMobile ? '100%'   : '88vh',
        background:     'rgba(4,6,24,0.98)',
        backdropFilter: 'blur(30px)',
        border:         isMobile ? 'none'
          : `1px solid ${accentColor}25`,
        borderRadius:   isMobile ? '0' : '24px',
        overflow:       'hidden',
        display:        'flex',
        flexDirection:  'column',
        boxShadow:      `0 0 60px ${accentColor}15,
                         0 30px 60px rgba(0,0,0,0.6)`,
        animation:      'scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
      }}>

        {/* ── HEADER ──────────────────────────── */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '18px 22px',
          borderBottom:   `1px solid ${accentColor}20`,
          flexShrink:     0,
        }}>
          <div>
            <div style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.55rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color:         accentColor,
              marginBottom:  '4px',
            }}>
              Natural Satellite Exploration
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'clamp(1.3rem, 4vw, 1.8rem)',
              fontWeight: 700,
              color:      'white',
            }}>
              {activeMoon.name}
            </div>

            {/* Quick selector tabs inside modal for multiple moons */}
            {planetMoons.length > 1 && (
              <div style={{
                display:   'flex',
                gap:       '6px',
                marginTop: '8px',
                flexWrap:  'wrap'
              }}>
                {planetMoons.map(m => {
                  const isActive = m.id === activeMoon.id
                  return (
                    <button
                      key={m.id}
                      onClick={() => setActiveMoon(m)}
                      style={{
                        padding:       '4px 10px',
                        fontFamily:    'var(--font-mono)',
                        fontSize:      '0.52rem',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        color:         isActive ? 'white' : 'rgba(255,255,255,0.45)',
                        background:    isActive ? `${accentColor}30` : 'rgba(255,255,255,0.03)',
                        border:        isActive ? `1px solid ${accentColor}80` : '1px solid rgba(255,255,255,0.08)',
                        borderRadius:  '12px',
                        cursor:        'pointer',
                        transition:    'all 0.3s ease',
                        outline:       'none'
                      }}
                      onMouseEnter={e => {
                        if (!isActive) e.currentTarget.style.border = `1px solid rgba(255,255,255,0.2)`
                      }}
                      onMouseLeave={e => {
                        if (!isActive) e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'
                      }}
                    >
                      {m.name}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            style={{
              width:        '34px',
              height:       '34px',
              borderRadius: '50%',
              background:   'rgba(255,255,255,0.06)',
              border:       '1px solid rgba(255,255,255,0.1)',
              color:        'rgba(255,255,255,0.7)',
              fontSize:     '16px',
              cursor:       'pointer',
              display:      'flex',
              alignItems:   'center',
              justifyContent:'center',
              flexShrink:   0,
            }}
          >×</button>
        </div>

        {/* ── SCROLLABLE CONTENT ───────────────── */}
        <div style={{
          overflowY:  'auto',
          flex:       1,
          scrollbarWidth: 'none',
        }}>

          {/* 3D Model with Next/Prev Slide Chevrons */}
          <div style={{
            width:          '100%',
            height:         isMobile ? '260px' : '280px',
            position:       'relative',
            flexShrink:     0,
          }}>
            {/* Background glow */}
            <div style={{
              position:     'absolute',
              inset:        0,
              background:   `radial-gradient(ellipse at 50% 50%,
                ${activeMoon.color}20 0%, transparent 70%)`,
              pointerEvents:'none',
            }} />

            {/* Slider chevron overlay controls */}
            {planetMoons.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  style={{
                    position:       'absolute',
                    left:           '16px',
                    top:            '50%',
                    transform:      'translateY(-50%)',
                    width:          '36px',
                    height:         '36px',
                    borderRadius:   '50%',
                    background:     'rgba(5,5,15,0.5)',
                    border:         '1px solid rgba(255,255,255,0.12)',
                    color:          'white',
                    fontSize:       '18px',
                    cursor:         'pointer',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    zIndex:         100,
                    transition:     'all 0.3s ease',
                    backdropFilter: 'blur(4px)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${accentColor}20`
                    e.currentTarget.style.borderColor = accentColor
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(5,5,15,0.5)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    position:       'absolute',
                    right:          '16px',
                    top:            '50%',
                    transform:      'translateY(-50%)',
                    width:          '36px',
                    height:         '36px',
                    borderRadius:   '50%',
                    background:     'rgba(5,5,15,0.5)',
                    border:         '1px solid rgba(255,255,255,0.12)',
                    color:          'white',
                    fontSize:       '18px',
                    cursor:         'pointer',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    zIndex:         100,
                    transition:     'all 0.3s ease',
                    backdropFilter: 'blur(4px)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${accentColor}20`
                    e.currentTarget.style.borderColor = accentColor
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(5,5,15,0.5)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  }}
                >
                  ›
                </button>
              </>
            )}

            <MoonModel
              key={activeMoon.id}
              moon={activeMoon}
              onZoomChange={() => {}}
              size="large"
            />
            
            <div style={{
              position:      'absolute',
              bottom:        '12px',
              left:          '50%',
              transform:     'translateX(-50%)',
              fontFamily:    'var(--font-body)',
              fontSize:      '0.5rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.3)',
              pointerEvents: 'none',
              whiteSpace:    'nowrap',
            }}>
              {planetMoons.length > 1 ? '‹ Swipe or Drag to Rotate ›' : 'Drag to rotate · Scroll to zoom'}
            </div>
          </div>

          {/* Content padding wrapper */}
          <div style={{
            padding: '20px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}>

            {/* Badges */}
            <div style={{
              display:  'flex',
              gap:      '6px',
              flexWrap: 'wrap',
            }}>
              {activeMoon.hasOcean && (
                <Badge label="Subsurface Ocean" color="#4488ff" />
              )}
              {activeMoon.hasIce && (
                <Badge label="Ice Surface" color="#88ccff" />
              )}
              {activeMoon.hasCraters && (
                <Badge label="Heavily Cratered" color="#888888" />
              )}
            </div>

            {/* Description */}
            <p style={{
              fontFamily:  'var(--font-body)',
              fontSize:    '0.82rem',
              color:       'rgba(255,255,255,0.6)',
              lineHeight:  1.7,
            }}>
              {activeMoon.description}
            </p>

            {/* Stats grid 2x2 */}
            <div style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:                 '8px',
            }}>
              {[
                { label: 'Diameter',       value: activeMoon.diameter   },
                { label: 'Distance',       value: activeMoon.distance   },
                { label: 'Orbital Period', value: activeMoon.orbital    },
                { label: 'Discovered',     value: activeMoon.discovered },
              ].map(s => (
                <div key={s.label} style={{
                  background:   'rgba(255,255,255,0.04)',
                  border:       '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '10px',
                  padding:      '10px 12px',
                  textAlign:    'center',
                }}>
                  <div style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.82rem',
                    color:         'white',
                    fontWeight:    700,
                    letterSpacing: '0.02em',
                  }}>
                    {s.value}
                  </div>
                  <div style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      '0.52rem',
                    color:         'rgba(255,255,255,0.35)',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginTop:     '3px',
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Scientific Surface & Atmospheric Analysis */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <SectionLabel color={accentColor} text="Atmospheric & Surface Analysis" />
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '10px 14px',
                marginTop: '4px'
              }}>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
                  ✦ Surface Composition: <span style={{ color: 'white', fontWeight: 500 }}>
                    {activeMoon.hasIce ? 'Icy Crust / H2O Solid' : activeMoon.hasCraters ? 'Silicate Regolith' : 'Volcanic Sulfur / Lava'}
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
                  ✦ Liquid Oceans: <span style={{ color: activeMoon.hasOcean ? '#00ff66' : 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
                    {activeMoon.hasOcean ? 'Subsurface Liquid H2O' : 'None Detected'}
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
                  ✦ Visual Albedo: <span style={{ color: 'white', fontWeight: 500 }}>
                    {activeMoon.hasIce ? 'High Reflective (0.68)' : 'Low / Absorptive (0.12)'}
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
                  ✦ Crater Density: <span style={{ color: 'white', fontWeight: 500 }}>
                    {activeMoon.hasCraters ? 'Severe / Ancient impact scarring' : 'Low / Thermally resurfaced'}
                  </span>
                </div>
              </div>
            </div>

            {/* Fun fact */}
            <div style={{
              background:   `${accentColor}12`,
              border:       `1px solid ${accentColor}30`,
              borderRadius: '12px',
              padding:      '14px 16px',
            }}>
              <div style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '0.55rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color:         accentColor,
                marginBottom:  '7px',
              }}>
                ✦ Did You Know
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '0.8rem',
                color:      'rgba(255,255,255,0.65)',
                lineHeight: 1.65,
              }}>
                {activeMoon.funFact}
              </p>
            </div>

            {/* Bottom padding for mobile nav */}
            <div style={{ height: isMobile ? '80px' : '8px' }} />

          </div>
        </div>
      </div>
    </div>
  )
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      fontFamily:    'var(--font-body)',
      fontSize:      '0.52rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color:         color,
      background:    color + '18',
      border:        `1px solid ${color}40`,
      borderRadius:  '20px',
      padding:       '3px 9px',
    }}>
      {label}
    </span>
  )
}

function SectionLabel({ color, text }: { color: string; text: string }) {
  return (
    <div style={{
      display:    'flex',
      alignItems: 'center',
      gap:        '8px',
    }}>
      <div style={{
        width:        '12px',
        height:       '1.5px',
        background:   color,
        borderRadius: '1px',
      }} />
      <span style={{
        fontFamily:    'var(--font-body)',
        fontSize:      '0.55rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color:         'rgba(255,255,255,0.4)',
      }}>
        {text}
      </span>
    </div>
  )
}
