import MoonModel     from './MoonModel'
import type { MoonData } from '../../../data/moons'

interface Props {
  moon:        MoonData
  accentColor: string
  onExplore:   () => void
}

export default function MoonCard({ moon, accentColor, onExplore }: Props) {
  return (
    <>
      {/* COMPACT CARD — just model + name + tap hint */}
      <div
        onClick={onExplore}
        style={{
          background:     'rgba(255,255,255,0.04)',
          border:         `1px solid rgba(255,255,255,0.08)`,
          borderRadius:   '16px',
          padding:        '12px 8px 10px',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '6px',
          cursor:         'pointer',
          transition:     'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          backdropFilter: 'blur(12px)',
          flex:           '0 0 auto',
          width:          '110px',  // compact width
          position:       'relative',
          overflow:       'hidden',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.border = `1px solid ${accentColor}60`
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = `0 8px 30px ${accentColor}25, inset 0 0 12px ${accentColor}15`
          e.currentTarget.style.background = `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, ${accentColor}08 100%)`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
        }}
      >
        {/* Top-edge ambient glow line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          width: '80%',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)`,
        }} />

        {/* Tiny serial coordinate */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.4rem',
          letterSpacing: '0.12em',
          color: 'rgba(255, 255, 255, 0.25)',
          textTransform: 'uppercase',
        }}>
          SYS.{moon.id.toUpperCase().substring(0, 4)}
        </div>

        {/* 3D Moon — small size with background radial atmospheric glow */}
        <div style={{ width: '72px', height: '72px', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle, ${moon.color}22 0%, transparent 70%)`,
            filter: 'blur(3px)',
            pointerEvents: 'none',
            borderRadius: '50%'
          }} />
          <MoonModel
            moon={moon}
            onZoomChange={() => {}}
            size="small"
          />
        </div>

        {/* Moon name */}
        <div style={{
          fontFamily:    'var(--font-display)',
          fontSize:      '0.78rem',
          fontWeight:    600,
          color:         'white',
          textAlign:     'center',
          letterSpacing: '0.03em',
        }}>
          {moon.name}
        </div>

        {/* Diameter */}
        <div style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.5rem',
          color:         'rgba(255,255,255,0.35)',
          letterSpacing: '0.08em',
        }}>
          {moon.diameter}
        </div>

        {/* Tap hint */}
        <div style={{
          fontFamily:    'var(--font-body)',
          fontSize:      '0.44rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color:         accentColor,
          opacity:       0.7,
        }}>
          Explore ✦
        </div>
      </div>
    </>
  )
}
