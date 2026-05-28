export const PLANET_TEXTURES = {
  sun: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg',
  mercury: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg',
  venus: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg',
  earth: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
  mars: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
  jupiter: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
  saturn: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
  uranus: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg',
  neptune: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg',
  pluto: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_EHorizon.jpg',
} as const;

export type PlanetKey = keyof typeof PLANET_TEXTURES;

export const PLANET_SCALES: Record<PlanetKey, number> = {
  sun: 1.6,
  mercury: 0.38,
  venus: 0.55,
  earth: 0.58,
  mars: 0.46,
  jupiter: 1.05,
  saturn: 0.92,
  uranus: 0.72,
  neptune: 0.7,
  pluto: 0.24,
};

export const ORBIT_RADII: Partial<Record<PlanetKey, number>> = {
  mercury: 1.15,
  venus: 1.35,
  earth: 1.55,
  mars: 1.75,
  jupiter: 2.1,
  saturn: 2.35,
  uranus: 2.55,
  neptune: 2.75,
  pluto: 2.95,
};
