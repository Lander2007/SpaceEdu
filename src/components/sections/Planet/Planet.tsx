import { useRef, useState, useEffect }  from 'react'
import { useInView }          from 'react-intersection-observer'
import PlanetScene            from './PlanetScene'
import styles                 from './Planet.module.css'
import type { PlanetData }    from '../../../data/planets'
import MoonsPanel             from '../Moons/MoonsPanel'
import MoonExplorer           from '../Moons/MoonExplorer'
import { moons }              from '../../../data/moons'
import type { MoonData }      from '../../../data/moons'

const playBeep = (freq = 800, type: OscillatorType = 'sine', duration = 0.08, vol = 0.05) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.type = type
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    
    gain.gain.setValueAtTime(vol, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch (e) {}
}

interface TelemetryDetails {
  classification: string
  atmosphere:     string
  pressure:       string
  velocity:       string
  escape:         string
  temp:           string
  gravity:        string
  habitability:   string
  warpTime:       string
}

const PLANET_DETAILS: Record<string, TelemetryDetails> = {
  sun: {
    classification: 'Yellow Dwarf Star (G2V Class)',
    atmosphere:     '73% Hydrogen, 25% Helium, 2% Heavy Elements',
    pressure:       '3.4 × 10¹¹ atm (Super-compressed Core)',
    velocity:       '220.0 km/s (Galactic Orbit velocity)',
    escape:         '617.7 km/s',
    temp:           '5,500 °C (Surface) / 15M °C (Core)',
    gravity:        '274.0 m/s² (27.9g equivalent)',
    habitability:   '0.00% (Fatal Radiation / Extreme Thermal)',
    warpTime:       '8.3 Light-Minutes'
  },
  mercury: {
    classification: 'Terrestrial (High Metal Density)',
    atmosphere:     'Exosphere of Oxygen, Sodium, Hydrogen',
    pressure:       '10⁻¹⁴ atm (Exremely sparse exosphere)',
    velocity:       '47.36 km/s',
    escape:         '4.25 km/s',
    temp:           '-180 °C (Night) to 430 °C (Day)',
    gravity:        '3.70 m/s² (0.38g equivalent)',
    habitability:   '0.00% (Fatal solar proximity / No UV shield)',
    warpTime:       '3.2 Light-Minutes'
  },
  venus: {
    classification: 'Terrestrial (Runaway Greenhouse planet)',
    atmosphere:     '96.5% Carbon Dioxide, 3.5% Nitrogen',
    pressure:       '92.0 atm (Extreme surface compression)',
    velocity:       '35.02 km/s',
    escape:         '10.36 km/s',
    temp:           '462 °C (Isothermal surface range)',
    gravity:        '8.87 m/s² (0.90g equivalent)',
    habitability:   '0.00% (Fatal Acid atmosphere / Hyper-thermal)',
    warpTime:       '2.3 Light-Minutes'
  },
  earth: {
    classification: 'Terrestrial (Active Biosphere & Hydrosphere)',
    atmosphere:     '78.1% Nitrogen, 20.9% Oxygen, 0.9% Argon',
    pressure:       '1.0 atm (Mean Sea Level benchmark)',
    velocity:       '29.78 km/s',
    escape:         '11.19 km/s',
    temp:           '-89 °C (Polar) to 58 °C (Equatorial)',
    gravity:        '9.81 m/s² (1.00g benchmark)',
    habitability:   '100.00% (Optimal Biosphere Support)',
    warpTime:       '0.0 Light-Seconds'
  },
  mars: {
    classification: 'Terrestrial (Desert Rust Oxide planet)',
    atmosphere:     '95.3% Carbon Dioxide, 2.7% Nitrogen, 1.6% Argon',
    pressure:       '0.006 atm (Hyper-thin atmospheric boundary)',
    velocity:       '24.07 km/s',
    escape:         '5.03 km/s',
    temp:           '-143 °C (Winter polar) to 35 °C (Summer equator)',
    gravity:        '3.71 m/s² (0.38g equivalent)',
    habitability:   '0.15% (Potential subsurface microbial aquifers)',
    warpTime:       '4.3 Light-Minutes'
  },
  jupiter: {
    classification: 'Gas Giant (Jovian class prototype)',
    atmosphere:     '89.8% Hydrogen, 10.2% Helium, traces of Ammonia',
    pressure:       '1,000,000 atm (Metallic hydrogen boundary)',
    velocity:       '13.07 km/s',
    escape:         '59.50 km/s',
    temp:           '-108 °C (Upper cloud tops average)',
    gravity:        '24.79 m/s² (2.53g equivalent)',
    habitability:   '0.50% (Oceanic Europa subsurface ice channels)',
    warpTime:       '33.2 Light-Minutes'
  },
  saturn: {
    classification: 'Gas Giant (Ringed Jovian system)',
    atmosphere:     '96.3% Hydrogen, 3.2% Helium, traces of Methane',
    pressure:       '500,000 atm (Hydrogen transition zone)',
    velocity:       '9.68 km/s',
    escape:         '35.50 km/s',
    temp:           '-139 °C (Upper troposphere average)',
    gravity:        '10.44 m/s² (1.06g equivalent)',
    habitability:   '1.20% (Subsurface Titan chemistry & liquid lakes)',
    warpTime:       '1.2 Light-Hours'
  },
  uranus: {
    classification: 'Ice Giant (Highly Oblique retrograde orbit)',
    atmosphere:     '82.5% Hydrogen, 15.2% Helium, 2.3% Methane',
    pressure:       '1,200,000 atm (Super-fluid mantle envelope)',
    velocity:       '6.80 km/s',
    escape:         '21.30 km/s',
    temp:           '-197 °C (Lowest planetary troposphere mark)',
    gravity:        '8.69 m/s² (0.89g equivalent)',
    habitability:   '0.00% (Super-critical chemical core pressures)',
    warpTime:       '2.6 Light-Hours'
  },
  neptune: {
    classification: 'Ice Giant (Storm Jovian class)',
    atmosphere:     '80.0% Hydrogen, 19.0% Helium, 1.5% Methane',
    pressure:       '1,500,000 atm (Metallic core mantle)',
    velocity:       '5.43 km/s',
    escape:         '23.50 km/s',
    temp:           '-201 °C (Extreme convective thermal winds)',
    gravity:        '11.15 m/s² (1.14g equivalent)',
    habitability:   '0.02% (Faint subsurface mantle ocean channels)',
    warpTime:       '4.1 Light-Hours'
  },
  pluto: {
    classification: 'Dwarf Planet (Kuiper Belt Object)',
    atmosphere:     '99.0% Nitrogen, 1.0% Methane / Carbon Monoxide',
    pressure:       '10⁻⁵ atm (Ultra-thin global envelope)',
    velocity:       '4.74 km/s',
    escape:         '1.23 km/s',
    temp:           '-230 °C (Troposphere average)',
    gravity:        '0.62 m/s² (0.06g equivalent)',
    habitability:   '0.00% (Extreme cryogenic state)',
    warpTime:       '5.5 Light-Hours'
  }
}

interface Props {
  planet: PlanetData
  prev?:  string
  next?:  string
}

export default function Planet({ planet, prev, next }: Props) {
  const [sceneRef, sceneInView] = useInView({
    threshold: 0.01,
    rootMargin: '800px 0px 800px 0px'
  })
  const [contentRef, contentInView] = useInView({
    threshold: 0.2
  })
  
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanComplete, setScanComplete] = useState(false)
  const [activeMoon, setActiveMoon] = useState<MoonData | null>(null)
  const hasMoons = (moons[planet.id] ?? []).length > 0

  // Floating scan readouts
  const [scanFreq, setScanFreq] = useState(482.4)
  const [latCoord, setLatCoord] = useState('0.0000° N')
  const [longCoord, setLongCoord] = useState('0.0000° W')

  const altitude = Math.floor(15284 - (15284 - 2800) * (scanProgress / 100))

  useEffect(() => {
    if (!isScanning || scanComplete) return

    let timer: any
    let readoutsInterval: any

    const step = () => {
      setScanProgress((prevProgress) => {
        const nextProgress = prevProgress + 4
        if (nextProgress >= 100) {
          setScanComplete(true)
          playBeep(880, 'sine', 0.22, 0.05)
          setTimeout(() => playBeep(1320, 'sine', 0.35, 0.04), 100)
          return 100
        }
        playBeep(380 + prevProgress * 3.8, 'sine', 0.04, 0.015)
        timer = setTimeout(step, 90)
        return nextProgress
      })
    }

    readoutsInterval = setInterval(() => {
      setScanFreq((f) => parseFloat((400 + Math.random() * 500).toFixed(1)))
      setLatCoord(`${(Math.random() * 90).toFixed(4)}° ${Math.random() > 0.5 ? 'N' : 'S'}`)
      setLongCoord(`${(Math.random() * 180).toFixed(4)}° ${Math.random() > 0.5 ? 'E' : 'W'}`)
    }, 150)

    timer = setTimeout(step, 90)

    return () => {
      clearTimeout(timer)
      clearInterval(readoutsInterval)
    }
  }, [isScanning, scanComplete])

  const startScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    setScanComplete(false)
    playBeep(440, 'sawtooth', 0.12, 0.03)
    playBeep(660, 'sine', 0.18, 0.02)
  }

  const abortScan = () => {
    setIsScanning(false)
    setScanProgress(0)
    setScanComplete(false)
    playBeep(300, 'sine', 0.12, 0.03)
  }

  const handleCtaHover = () => {
    if (!isScanning) {
      playBeep(1100, 'sine', 0.04, 0.02)
    }
  }

  const handleNeighborClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetSection = document.getElementById(targetId)
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getHabColor = (hab: string) => {
    if (hab.includes('100.00%')) return '#00ff66'
    if (hab.includes('0.00%')) return '#ff3366'
    return '#ffa500'
  }

  const details = PLANET_DETAILS[planet.id] || PLANET_DETAILS['earth']

  return (
    <section
      id={planet.id}
      ref={sceneRef}
      className={styles.section}
      style={{ background: planet.bgGradient }}
    >
      {/* 3D planet canvas */}
      <div className={styles.canvasWrapper}>
        <PlanetScene planet={planet} isVisible={sceneInView} scanActive={isScanning} />
      </div>

      {/* Snap-on Holographic Cockpit HUD Target brackets */}
      <div className={`${styles.scannerHUD} ${isScanning ? styles.scannerHUDActive : ''}`}>
        <div className={styles.bracketTL} />
        <div className={styles.bracketTR} />
        <div className={styles.bracketBL} />
        <div className={styles.bracketBR} />
        <div className={styles.scanLineBox} />

        {/* Live HUD statistics */}
        <div className={styles.hudStatsLeft}>
          <span>ALT: {altitude.toLocaleString()} KM</span>
          <span>LAT: {latCoord}</span>
          <span>LNG: {longCoord}</span>
        </div>

        <div className={styles.hudStatsRight}>
          <span>FREQ: {scanFreq} MHZ</span>
          <span>COGNITIVE: 100%</span>
          <span>SIGNAL: STRONG</span>
        </div>

        <span className={styles.scanProgress}>
          {scanComplete ? 'EXPLORATION DATA TRANSMITTED' : `SCANNING SURFACE: ${scanProgress}%`}
        </span>
      </div>

      {/* Holographic Scanning Rings Background */}
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
        <a 
          href={`#${prev}`} 
          onClick={(e) => handleNeighborClick(e, prev)}
          className={`${styles.neighbor} ${styles.neighborLeft}`}
          style={{ cursor: 'none' }}
        >
          ← {prev.toUpperCase()}
        </a>
      )}
      {next && (
        <a 
          href={`#${next}`} 
          onClick={(e) => handleNeighborClick(e, next)}
          className={`${styles.neighbor} ${styles.neighborRight}`}
          style={{ cursor: 'none' }}
        >
          {next.toUpperCase()} →
        </a>
      )}

      {/* TOP HALF — planet text content */}
      <div ref={contentRef} className={`${styles.content} ${contentInView ? styles.visible : ''} ${isScanning ? styles.contentScanning : ''}`}>
        <p className={styles.label}>PLANET / {planet.name}</p>

        <h1 className={`${styles.title} ${isScanning ? styles.titleScanning : ''}`} style={{
          textShadow: `0 0 80px ${planet.glowColor}`
        }}>
          {planet.name}
        </h1>

        {!isScanning && <p className={styles.subtitle}>{planet.subtitle}</p>}

        {/* Dynamic Telemetry GUI */}
        {!isScanning ? (
          <div style={{
            display:        'flex',
            gap:            '10px',
            marginTop:      '14px',
            alignItems:     'center',
            justifyContent: 'center',
            flexWrap:       'wrap',
            pointerEvents:  'auto',
          }}>
            <button 
              className={styles.cta}
              onClick={startScan}
              onMouseEnter={handleCtaHover}
              style={{ borderColor: `${planet.color}40`, color: '#ffffff', marginTop: '0' }}
            >
              GET STARTED
            </button>
            {hasMoons && (
              <button
                onClick={() => setActiveMoon((moons[planet.id] ?? [])[0])}
                style={{
                  padding:       '10px 22px',
                  fontFamily:    'var(--font-body)',
                  fontSize:      '0.65rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color:         planet.color,
                  background:    `${planet.color}12`,
                  border:        `1px solid ${planet.color}35`,
                  borderRadius:  '30px',
                  cursor:        'none',
                  transition:    'all 0.3s ease',
                  backdropFilter:'blur(8px)',
                  display:       'flex',
                  alignItems:    'center',
                  justifyContent:'center',
                  minHeight:     '36px',
                  pointerEvents: 'auto',
                }}
              >
                🌙 {moons[planet.id]?.length} Moon{moons[planet.id]?.length > 1 ? 's' : ''}
              </button>
            )}
          </div>
        ) : (
          <div className={styles.scanContainer}>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar} style={{ width: `${scanProgress}%` }} />
            </div>
            
            {scanComplete && (
              <div className={styles.scanFacts}>
                {/* Telemetry Header */}
                <div className={styles.scanFactsHeader}>
                  <span>// ACTIVE TELEMETRY LOG</span>
                  <div className={styles.headerRight}>
                    <span className={styles.classInfo}>CLASS: {details.classification}</span>
                    <button 
                      className={styles.closeCardBtn} 
                      onClick={abortScan}
                      title="Dismiss Scan"
                      style={{ cursor: 'none' }}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Left Column - Orbital Mechanics */}
                <div className={styles.factColumn}>
                  <div className={styles.factRow}>
                    <div className={styles.factLabel}>ORBITAL VELOCITY</div>
                    <div className={styles.factValue}>{details.velocity}</div>
                  </div>
                  <div className={styles.factRow}>
                    <div className={styles.factLabel}>ESCAPE VELOCITY</div>
                    <div className={styles.factValue}>{details.escape}</div>
                  </div>
                  <div className={styles.factRow}>
                    <div className={styles.factLabel}>WARP 1 TRAVEL TIME</div>
                    <div className={styles.factValue}>{details.warpTime}</div>
                  </div>
                </div>

                {/* Right Column - Planetary Metrics */}
                <div className={styles.factColumn}>
                  <div className={styles.factRow}>
                    <div className={styles.factLabel}>ATMOSPHERE CHEMISTRY</div>
                    <div className={styles.factValue}>{details.atmosphere}</div>
                  </div>
                  <div className={styles.factRow}>
                    <div className={styles.factLabel}>ATMOSPHERIC PRESSURE</div>
                    <div className={styles.factValue}>{details.pressure}</div>
                  </div>
                  <div className={styles.factRow}>
                    <div className={styles.factLabel}>SURFACE GRAVITY</div>
                    <div className={styles.factValue}>{details.gravity}</div>
                  </div>
                  <div className={styles.factRow}>
                    <div className={styles.factLabel}>SURFACE TEMPERATURE</div>
                    <div className={styles.factValue}>{details.temp}</div>
                  </div>
                </div>

                {/* Footer Habitability Index */}
                <div className={styles.scanFactsFooter}>
                  <span>HABITABILITY INDEX:</span>
                  <span style={{ color: getHabColor(details.habitability), fontWeight: 'bold' }}>
                    {details.habitability}
                  </span>
                </div>
              </div>
            )}
            
            {scanComplete ? (
              <button 
                className={styles.dismissCta} 
                onClick={abortScan}
                style={{ cursor: 'none' }}
              >
                DISMISS SCAN
              </button>
            ) : (
              <button 
                className={styles.abortCta} 
                onClick={abortScan}
                style={{ cursor: 'none' }}
              >
                Abort Scan
              </button>
            )}
          </div>
        )}

        {/* Stats (Hide when scanning to prevent vertical layout overflow) */}
        {!isScanning && (
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
        )}
      </div>

      {/* BOTTOM HALF — moons panel inside same screen */}
      {!isScanning && hasMoons && (
        <div className={styles.moonsWrapper}>
          <MoonsPanel
            planetId={planet.id}
            accentColor={planet.color}
            planetName={planet.name}
            onExploreMoon={setActiveMoon}
          />
        </div>
      )}

      {/* Moon explorer overlay */}
      {activeMoon && (
        <MoonExplorer
          moon={activeMoon}
          accentColor={planet.color}
          onClose={() => setActiveMoon(null)}
        />
      )}
    </section>
  )
}
