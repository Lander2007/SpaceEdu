import { useState, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import ScaleScene from './ScaleScene'
import styles from './ScaleComparison.module.css'

interface CelestialData {
  id:          string
  name:        string
  color:       string
  texturePath: string
  ratio:       number // Earth radius = 1.0
  autoSpeed:   number
  diameter:    string
  mass:        string
  fact:        string
}

export default function ScaleComparison() {
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [scaleMode, setScaleMode] = useState<'realistic' | 'visual'>('realistic')

  const bodies: CelestialData[] = useMemo(() => [
    {
      id:          'sun',
      name:        'Sun',
      color:       '#FFA500',
      texturePath: '/textures/sun.jpg',
      ratio:       109.0,
      autoSpeed:   0.001,
      diameter:    '1,392,700 km',
      mass:        '333,000 Earths',
      fact:        'Accounts for 99.86% of the entire mass of our Solar System.'
    },
    {
      id:          'mercury',
      name:        'Mercury',
      color:       '#A89070',
      texturePath: '/textures/mercury.jpg',
      ratio:       0.38,
      autoSpeed:   0.004,
      diameter:    '4,879 km',
      mass:        '0.055 Earths',
      fact:        'The smallest planet, only slightly larger than Earth\'s Moon.'
    },
    {
      id:          'venus',
      name:        'Venus',
      color:       '#E8C47A',
      texturePath: '/textures/venus.jpg',
      ratio:       0.95,
      autoSpeed:   0.0002,
      diameter:    '12,104 km',
      mass:        '0.815 Earths',
      fact:        'Earth\'s sister planet in size, but has hot acid clouds.'
    },
    {
      id:          'earth',
      name:        'Earth',
      color:       '#4B9CD3',
      texturePath: '/textures/earth.jpg',
      ratio:       1.0,
      autoSpeed:   0.003,
      diameter:    '12,742 km',
      mass:        '1.0 (Standard)',
      fact:        'The baseline standard for comparing sizes and life limits.'
    },
    {
      id:          'mars',
      name:        'Mars',
      color:       '#C1440E',
      texturePath: '/textures/mars.jpg',
      ratio:       0.53,
      autoSpeed:   0.0028,
      diameter:    '6,779 km',
      mass:        '0.107 Earths',
      fact:        'Has roughly half the diameter of Earth.'
    },
    {
      id:          'jupiter',
      name:        'Jupiter',
      color:       '#C88B3A',
      texturePath: '/textures/jupiter.jpg',
      ratio:       11.2,
      autoSpeed:   0.008,
      diameter:    '139,820 km',
      mass:        '318 Earths',
      fact:        'The largest gas giant, wider than 11 Earths side-by-side.'
    },
    {
      id:          'saturn',
      name:        'Saturn',
      color:       '#E4D191',
      texturePath: '/textures/saturn.jpg',
      ratio:       9.45,
      autoSpeed:   0.006,
      diameter:    '116,460 km',
      mass:        '95 Earths',
      fact:        'Wider than 9 Earths, excluding its giant icy ring system.'
    },
    {
      id:          'uranus',
      name:        'Uranus',
      color:       '#7DE8E8',
      texturePath: '/textures/uranus.jpg',
      ratio:       4.0,
      autoSpeed:   0.005,
      diameter:    '50,724 km',
      mass:        '14.5 Earths',
      fact:        'An ice giant four times wider than Earth.'
    },
    {
      id:          'neptune',
      name:        'Neptune',
      color:       '#3F54BA',
      texturePath: '/textures/neptune.jpg',
      ratio:       3.88,
      autoSpeed:   0.002,
      diameter:    '49,244 km',
      mass:        '17.1 Earths',
      fact:        'Slightly smaller than Uranus, but denser.'
    }
  ], [])

  const [selectA, setSelectA] = useState('earth')
  const [selectB, setSelectB] = useState('jupiter')

  const bodyA = useMemo(() => bodies.find(b => b.id === selectA) || bodies[3], [selectA, bodies])
  const bodyB = useMemo(() => bodies.find(b => b.id === selectB) || bodies[5], [selectB, bodies])

  // Dilation ratio comparison
  const comparisonText = useMemo(() => {
    if (bodyA.id === bodyB.id) return 'The objects are identical in size.'
    const ratio = bodyA.ratio / bodyB.ratio
    if (ratio > 1) {
      return `${bodyA.name} is approximately ${ratio.toFixed(1)}x wider than ${bodyB.name}.`
    } else {
      return `${bodyB.name} is approximately ${(1 / ratio).toFixed(1)}x wider than ${bodyA.name}.`
    }
  }, [bodyA, bodyB])

  return (
    <section id="scale" ref={ref} className={styles.section}>
      {/* Background Gradient Overlay */}
      <div className={styles.overlay} />

      {/* Top HUD Controls and Telemetry Information */}
      <div className={`${styles.content} ${inView ? styles.visible : ''}`}>
        <p className={styles.label}>PHYSICAL COMPARATOR / SCALE RATIOS</p>
        <h1 className={styles.title}>SCALE OF WONDER</h1>

        {/* Dynamic drop selectors block */}
        <div className={styles.comparatorHUD}>
          <div className={styles.selectorRow}>
            {/* Body A Select */}
            <div className={styles.selectorBlock}>
              <label>Object A</label>
              <select value={selectA} onChange={(e) => setSelectA(e.target.value)}>
                {bodies.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            {/* Scale mode toggle */}
            <div className={styles.toggleBlock}>
              <label>Scale Mode</label>
              <button
                onClick={() => setScaleMode(prev => prev === 'realistic' ? 'visual' : 'realistic')}
                className={styles.toggleBtn}
              >
                {scaleMode === 'realistic' ? 'Realistic Scale' : 'Side-by-Side'}
              </button>
            </div>

            {/* Body B Select */}
            <div className={styles.selectorBlock}>
              <label>Object B</label>
              <select value={selectB} onChange={(e) => setSelectB(e.target.value)}>
                {bodies.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Dilation output detail */}
          <div className={styles.comparisonOutput}>
            <strong>Comparison:</strong> {comparisonText}
          </div>
        </div>

        {/* Fact Sheet HUD Card */}
        <div className={styles.factSheetRow}>
          <div className={styles.factCard} style={{ borderColor: `${bodyA.color}45` }}>
            <div className={styles.factTitle} style={{ color: bodyA.color }}>{bodyA.name.toUpperCase()} DATA</div>
            <div>Diameter: {bodyA.diameter}</div>
            <div>Mass: {bodyA.mass}</div>
            <div style={{ fontSize: '0.64rem', opacity: 0.7, marginTop: '6px' }}>{bodyA.fact}</div>
          </div>

          <div className={styles.factCard} style={{ borderColor: `${bodyB.color}45` }}>
            <div className={styles.factTitle} style={{ color: bodyB.color }}>{bodyB.name.toUpperCase()} DATA</div>
            <div>Diameter: {bodyB.diameter}</div>
            <div>Mass: {bodyB.mass}</div>
            <div style={{ fontSize: '0.64rem', opacity: 0.7, marginTop: '6px' }}>{bodyB.fact}</div>
          </div>
        </div>
      </div>

      {/* 3D Scale comparison canvas positioned below HUD to avoid overlap */}
      <div className={styles.canvasContainer}>
        <ScaleScene bodyA={bodyA} bodyB={bodyB} scaleMode={scaleMode} />
      </div>
    </section>
  )
}
