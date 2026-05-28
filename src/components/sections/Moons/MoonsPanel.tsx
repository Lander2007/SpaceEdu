import { useRef }      from 'react'
import { useInView }     from 'react-intersection-observer'
import MoonCard          from './MoonCard'
import { moons }         from '../../../data/moons'
import type { MoonData } from '../../../data/moons'

interface Props {
  planetId:    string
  accentColor: string
  planetName:  string
  onExploreMoon: (moon: MoonData) => void
}

export default function MoonsPanel({
  planetId, accentColor, planetName, onExploreMoon
}: Props) {
  const planetMoons = moons[planetId] ?? []
  const scrollRef   = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  if (planetMoons.length === 0) {
    return (
      <div style={{
        textAlign:     'center',
        padding:       '40px 20px',
        fontFamily:    'var(--font-body)',
        fontSize:      '0.8rem',
        color:         'rgba(255,255,255,0.3)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}>
        No known moons
      </div>
    )
  }

  return (
    <div ref={ref} style={{
      width:      '100%',
      marginTop:  '0px',
      paddingTop: '20px',
      position:   'relative',
      zIndex:     10,
    }}>
      {/* Header */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        '0 clamp(16px, 3vw, 32px)',
        marginBottom:   '8px',
      }}>
        <div>
          <div style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '0.52rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color:         accentColor,
            marginBottom:  '6px',
          }}>
            Natural Satellites
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize:   'clamp(1rem, 2.5vw, 1.3rem)',
            fontWeight: 600,
            color:      'white',
          }}>
            Moons of {planetName}
          </div>
        </div>

        <div style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'clamp(1.2rem, 3vw, 1.6rem)',
          fontWeight:    700,
          color:         accentColor,
          opacity:       0.6,
        }}>
          {String(planetMoons.length).padStart(2, '0')}
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        style={{
          display:    'flex',
          flexDirection:'row',
          gap:        '16px',
          overflowX:  'auto',
          overflowY:  'visible',
          padding:    '8px clamp(16px, 3vw, 32px) 12px',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
        }}
      >
        {planetMoons.map((moon, i) => (
          <div
            key={moon.id}
            style={{
              opacity:   inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition:`opacity 0.6s ${i * 0.1}s ease, transform 0.6s ${i * 0.1}s ease`,
            }}
          >
            <MoonCard
              moon={moon}
              accentColor={accentColor}
              onExplore={() => onExploreMoon(moon)}
            />
          </div>
        ))}
      </div>

      {/* Scroll hint arrows */}
      {planetMoons.length > 2 && (
        <div style={{
          display:        'flex',
          justifyContent: 'center',
          gap:            '12px',
          marginTop:      '4px',
          position:       'relative',
          zIndex:         100,
          pointerEvents:  'auto',
        }}>
          <button
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollLeft -= 240
              }
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.borderColor = `${accentColor}70`
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.transform = 'scale(1.1)'
              e.currentTarget.style.boxShadow = `0 0 15px ${accentColor}30`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.borderColor = `${accentColor}30`
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            style={{
              width:        '36px',
              height:       '36px',
              borderRadius: '50%',
              background:   'rgba(255,255,255,0.06)',
              border:       `1px solid ${accentColor}30`,
              color:        'rgba(255,255,255,0.6)',
              fontSize:     '16px',
              cursor:       'none',
              display:      'flex',
              alignItems:   'center',
              justifyContent:'center',
              transition:   'all 0.3s ease',
              pointerEvents:'auto',
            }}
          >‹</button>
          <button
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollLeft += 240
              }
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.borderColor = `${accentColor}70`
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.transform = 'scale(1.1)'
              e.currentTarget.style.boxShadow = `0 0 15px ${accentColor}30`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.borderColor = `${accentColor}30`
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            style={{
              width:        '36px',
              height:       '36px',
              borderRadius: '50%',
              background:   'rgba(255,255,255,0.06)',
              border:       `1px solid ${accentColor}30`,
              color:        'rgba(255,255,255,0.6)',
              fontSize:     '16px',
              cursor:       'none',
              display:      'flex',
              alignItems:   'center',
              justifyContent:'center',
              transition:   'all 0.3s ease',
              pointerEvents:'auto',
            }}
          >›</button>
        </div>
      )}
    </div>
  )
}
