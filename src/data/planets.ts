export interface PlanetData {
  id:          string
  name:        string
  subtitle:    string
  color:       string
  glowColor:   string
  bgGradient:  string
  tilt:        number
  autoSpeed:   number
  texturePath: string
  stats: {
    diameter:  string
    distance:  string
    orbital:   string
    moons:     string
  }
}

export const planets: PlanetData[] = [
  {
    id:         'sun',
    name:       'SUN',
    subtitle:   'The heart of our solar system. A nearly perfect sphere of hot plasma, accounting for 99.86% of the total mass.',
    color:      '#FFA500',
    glowColor:  'rgba(255,165,0,0.4)',
    bgGradient: `
      radial-gradient(ellipse at 70% 20%,
        rgba(255,165,0,0.22) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 80%,
        rgba(180,90,0,0.15) 0%, transparent 45%),
      radial-gradient(ellipse at 50% 50%,
        rgba(25,12,0,1) 0%, rgba(8,3,0,1) 100%)
    `,
    tilt:        0.12,
    autoSpeed:   0.001,
    texturePath: '/textures/sun.jpg',
    stats: {
      diameter: '1,392,700 km',
      distance: '0 km (Center)',
      orbital:  '230M years',
      moons:    '8 Planets',
    },
  },
  {
    id:         'mercury',
    name:       'MERCURY',
    subtitle:   'The smallest planet. Temperatures swing from -180°C to 430°C.',
    color:      '#A89070',
    glowColor:  'rgba(168,144,112,0.3)',
    bgGradient: `
      radial-gradient(ellipse at 70% 20%,
        rgba(255,160,40,0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 80%,
        rgba(180,100,20,0.15) 0%, transparent 40%),
      radial-gradient(ellipse at 50% 50%,
        rgba(15,8,2,1) 0%, rgba(4,2,0,1) 100%)
    `,
    tilt:        0.03,
    autoSpeed:   0.004,
    texturePath: '/textures/mercury.jpg',
    stats: {
      diameter: '4,879 km',
      distance: '57.9M km',
      orbital:  '88 days',
      moons:    '0',
    },
  },
  {
    id:         'venus',
    name:       'VENUS',
    subtitle:   'The hottest planet. Thick atmosphere of CO₂ and sulfuric acid.',
    color:      '#E8C47A',
    glowColor:  'rgba(232,196,122,0.3)',
    bgGradient: `
      radial-gradient(ellipse at 65% 15%,
        rgba(220,170,0,0.22) 0%, transparent 50%),
      radial-gradient(ellipse at 35% 85%,
        rgba(160,90,0,0.18) 0%, transparent 45%),
      radial-gradient(ellipse at 20% 40%,
        rgba(100,40,0,0.12) 0%, transparent 40%),
      radial-gradient(ellipse at 50% 50%,
        rgba(20,10,0,1) 0%, rgba(8,4,0,1) 100%)
    `,
    tilt:        3.09,
    autoSpeed:   0.0002,
    texturePath: '/textures/venus.jpg',
    stats: {
      diameter: '12,104 km',
      distance: '108.2M km',
      orbital:  '225 days',
      moons:    '0',
    },
  },
  {
    id:         'earth',
    name:       'EARTH',
    subtitle:   'The only known planet with life. 71% water, 29% land.',
    color:      '#4B9CD3',
    glowColor:  'rgba(75,156,211,0.35)',
    bgGradient: `
      radial-gradient(ellipse at 75% 10%,
        rgba(0,100,255,0.22) 0%, transparent 50%),
      radial-gradient(ellipse at 25% 85%,
        rgba(0,180,80,0.18) 0%, transparent 45%),
      linear-gradient(135deg,
        rgba(0,200,100,0.05) 0%, transparent 40%,
        rgba(0,80,255,0.08) 100%),
      radial-gradient(ellipse at 50% 50%,
        rgba(0,6,22,1) 0%, rgba(0,2,12,1) 100%)
    `,
    tilt:        0.41,
    autoSpeed:   0.003,
    texturePath: '/textures/earth.jpg',
    stats: {
      diameter: '12,742 km',
      distance: '149.6M km',
      orbital:  '365 days',
      moons:    '1',
    },
  },
  {
    id:         'mars',
    name:       'MARS',
    subtitle:   'The red planet. Home to Olympus Mons, the largest volcano.',
    color:      '#C1440E',
    glowColor:  'rgba(193,68,14,0.35)',
    bgGradient: `
      radial-gradient(ellipse at 65% 20%,
        rgba(220,60,0,0.25) 0%, transparent 50%),
      radial-gradient(ellipse at 35% 75%,
        rgba(160,30,0,0.2) 0%, transparent 45%),
      radial-gradient(ellipse at 85% 65%,
        rgba(180,80,20,0.12) 0%, transparent 35%),
      radial-gradient(ellipse at 50% 50%,
        rgba(22,4,0,1) 0%, rgba(8,2,0,1) 100%)
    `,
    tilt:        0.44,
    autoSpeed:   0.0028,
    texturePath: '/textures/mars.jpg',
    stats: {
      diameter: '6,779 km',
      distance: '227.9M km',
      orbital:  '687 days',
      moons:    '2',
    },
  },
  {
    id:         'jupiter',
    name:       'JUPITER',
    subtitle:   'The giant. Could fit 1,300 Earths inside its mass.',
    color:      '#C88B3A',
    glowColor:  'rgba(200,139,58,0.3)',
    bgGradient: `
      radial-gradient(ellipse at 70% 15%,
        rgba(210,140,40,0.22) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 80%,
        rgba(160,90,20,0.18) 0%, transparent 45%),
      linear-gradient(180deg,
        rgba(40,20,0,0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 50% 50%,
        rgba(18,8,0,1) 0%, rgba(6,3,0,1) 100%)
    `,
    tilt:        0.05,
    autoSpeed:   0.008,
    texturePath: '/textures/jupiter.jpg',
    stats: {
      diameter: '139,820 km',
      distance: '778.5M km',
      orbital:  '12 years',
      moons:    '95',
    },
  },
  {
    id:         'saturn',
    name:       'SATURN',
    subtitle:   'The crown jewel. Famous for its majestic icy ring system.',
    color:      '#E4D191',
    glowColor:  'rgba(228,209,145,0.3)',
    bgGradient: `
      radial-gradient(ellipse at 50% 60%,
        rgba(210,170,50,0.2) 0%, transparent 55%),
      radial-gradient(ellipse at 75% 20%,
        rgba(190,150,20,0.18) 0%, transparent 40%),
      radial-gradient(ellipse at 25% 75%,
        rgba(15,10,0,1) 0%, rgba(5,3,0,1) 100%)
    `,
    tilt:        0.47,
    autoSpeed:   0.006,
    texturePath: '/textures/saturn.jpg',
    stats: {
      diameter: '116,460 km',
      distance: '1.43B km',
      orbital:  '29 years',
      moons:    '146',
    },
  },
  {
    id:         'uranus',
    name:       'URANUS',
    subtitle:   'The ice giant. Rotates on its side at 98° axial tilt.',
    color:      '#7DE8E8',
    glowColor:  'rgba(125,232,232,0.3)',
    bgGradient: `
      radial-gradient(ellipse at 65% 15%,
        rgba(0,210,230,0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 35% 80%,
        rgba(0,160,190,0.18) 0%, transparent 45%),
      linear-gradient(135deg,
        rgba(0,40,60,0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%,
        rgba(0,8,16,1) 0%, rgba(0,3,10,1) 100%)
    `,
    tilt:        1.71,
    autoSpeed:   0.005,
    texturePath: '/textures/uranus.jpg',
    stats: {
      diameter: '50,724 km',
      distance: '2.87B km',
      orbital:  '84 years',
      moons:    '27',
    },
  },
  {
    id:         'neptune',
    name:       'NEPTUNE',
    subtitle:   'The windiest planet. Winds reach 2,100 km/h.',
    color:      '#3F54BA',
    glowColor:  'rgba(63,84,186,0.35)',
    bgGradient: `
      radial-gradient(ellipse at 60% 20%,
        rgba(30,70,255,0.25) 0%, transparent 50%),
      radial-gradient(ellipse at 40% 75%,
        rgba(70,0,200,0.2) 0%, transparent 45%),
      radial-gradient(ellipse at 85% 55%,
        rgba(0,50,220,0.15) 0%, transparent 35%),
      radial-gradient(ellipse at 50% 50%,
        rgba(0,4,22,1) 0%, rgba(0,1,12,1) 100%)
    `,
    tilt:        0.49,
    autoSpeed:   0.002,
    texturePath: '/textures/neptune.jpg',
    stats: {
      diameter: '49,244 km',
      distance: '4.50B km',
      orbital:  '165 years',
      moons:    '16',
    },
  },
]
