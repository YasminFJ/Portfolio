/**
 * Solar system data for ORBIT.
 * Sizes, orbit radii and speeds use an adapted scale so the system is explorable;
 * the facts shown in the info panel are real values.
 */
export type Planet = {
  id: string;
  name: string;
  /** Short descriptor shown under the name */
  kind: string;
  /** Fallback colour (labels, loading, low quality) */
  color: string;
  /** Visual radius in scene units */
  size: number;
  /** Visual orbit radius in scene units */
  orbitRadius: number;
  /** Relative orbital speed */
  speed: number;
  /** Self-rotation speed (rad/s at 1x) */
  rotationSpeed: number;
  /** Axial tilt in degrees (real values) */
  tilt: number;
  /** Texture file name in /orbit/textures/{2k|1k}/ */
  texture: string;
  /** Rim atmosphere colour; omitted for bodies without a visible atmosphere */
  atmosphere?: { color: string; intensity: number };
  rings?: { inner: number; outer: number; texture: string };
  moon?: { name: string; texture: string; size: number; distance: number; speed: number };
  facts: {
    distanceFromSun: string;
    diameter: string;
    gravity: string;
    temperature: string;
    dayLength: string;
    yearLength: string;
    moons: string;
  };
  description: string;
};

export const sun = {
  id: "sun",
  name: "Sun",
  kind: "G-type main-sequence star",
  size: 3.2,
  texture: "sun",
  facts: {
    diameter: "1,392,700 km",
    surfaceTemperature: "5,500 °C",
    age: "4.6 billion years",
    mass: "99.86% of the solar system",
  },
  description:
    "A nearly perfect sphere of hot plasma whose light takes about 8 minutes and 20 seconds to reach Earth.",
};

export const planets: Planet[] = [
  {
    id: "mercury",
    name: "Mercury",
    kind: "Terrestrial planet",
    color: "#9c9c94",
    size: 0.36,
    orbitRadius: 6.2,
    speed: 0.9,
    rotationSpeed: 0.02,
    tilt: 0.03,
    texture: "mercury",
    facts: {
      distanceFromSun: "57.9 million km",
      diameter: "4,879 km",
      gravity: "3.70 m/s²",
      temperature: "167 °C (mean)",
      dayLength: "59 Earth days",
      yearLength: "88 Earth days",
      moons: "0",
    },
    description: "The smallest planet and the closest to the Sun, scarred by billions of years of impacts.",
  },
  {
    id: "venus",
    name: "Venus",
    kind: "Terrestrial planet",
    color: "#e0b568",
    size: 0.6,
    orbitRadius: 8.6,
    speed: 0.7,
    rotationSpeed: -0.012,
    tilt: 177.4,
    texture: "venus_atmosphere",
    atmosphere: { color: "#f3d9a4", intensity: 0.9 },
    facts: {
      distanceFromSun: "108.2 million km",
      diameter: "12,104 km",
      gravity: "8.87 m/s²",
      temperature: "464 °C (mean)",
      dayLength: "243 Earth days",
      yearLength: "225 Earth days",
      moons: "0",
    },
    description:
      "Wrapped in thick clouds of sulphuric acid, Venus is the hottest planet and spins backwards.",
  },
  {
    id: "earth",
    name: "Earth",
    kind: "Terrestrial planet",
    color: "#4f7cc4",
    size: 0.64,
    orbitRadius: 11.4,
    speed: 0.6,
    rotationSpeed: 0.05,
    tilt: 23.4,
    texture: "earth_day",
    atmosphere: { color: "#6fa8ff", intensity: 1.1 },
    moon: { name: "Moon", texture: "moon", size: 0.17, distance: 1.45, speed: 0.55 },
    facts: {
      distanceFromSun: "149.6 million km",
      diameter: "12,742 km",
      gravity: "9.81 m/s²",
      temperature: "15 °C (mean)",
      dayLength: "24 hours",
      yearLength: "365.25 days",
      moons: "1",
    },
    description: "The only world known to host life, with liquid water covering 71% of its surface.",
  },
  {
    id: "mars",
    name: "Mars",
    kind: "Terrestrial planet",
    color: "#c1440e",
    size: 0.46,
    orbitRadius: 14.4,
    speed: 0.48,
    rotationSpeed: 0.045,
    tilt: 25.2,
    texture: "mars",
    atmosphere: { color: "#e3906a", intensity: 0.35 },
    facts: {
      distanceFromSun: "227.9 million km",
      diameter: "6,779 km",
      gravity: "3.71 m/s²",
      temperature: "−63 °C (mean)",
      dayLength: "24 h 37 min",
      yearLength: "687 Earth days",
      moons: "2",
    },
    description: "A cold desert world home to Olympus Mons, the tallest volcano in the solar system.",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    kind: "Gas giant",
    color: "#d9a066",
    size: 1.85,
    orbitRadius: 20,
    speed: 0.26,
    rotationSpeed: 0.09,
    tilt: 3.1,
    texture: "jupiter",
    atmosphere: { color: "#e8c9a0", intensity: 0.45 },
    facts: {
      distanceFromSun: "778.5 million km",
      diameter: "139,820 km",
      gravity: "24.79 m/s²",
      temperature: "−110 °C (cloud tops)",
      dayLength: "9 h 56 min",
      yearLength: "11.9 Earth years",
      moons: "97",
    },
    description: "The largest planet, with a storm — the Great Red Spot — wider than Earth that has raged for centuries.",
  },
  {
    id: "saturn",
    name: "Saturn",
    kind: "Gas giant",
    color: "#e3c078",
    size: 1.55,
    orbitRadius: 26,
    speed: 0.2,
    rotationSpeed: 0.085,
    tilt: 26.7,
    texture: "saturn",
    atmosphere: { color: "#f0dcae", intensity: 0.4 },
    rings: { inner: 1.24, outer: 2.27, texture: "saturn_ring" },
    facts: {
      distanceFromSun: "1.43 billion km",
      diameter: "116,460 km",
      gravity: "10.44 m/s²",
      temperature: "−140 °C (cloud tops)",
      dayLength: "10 h 42 min",
      yearLength: "29.4 Earth years",
      moons: "274",
    },
    description: "Its rings span 280,000 km yet are mostly just tens of metres thick, made of ice and rock.",
  },
  {
    id: "uranus",
    name: "Uranus",
    kind: "Ice giant",
    color: "#9be7e0",
    size: 1.05,
    orbitRadius: 31.5,
    speed: 0.14,
    rotationSpeed: -0.06,
    tilt: 97.8,
    texture: "uranus",
    atmosphere: { color: "#a8e6ef", intensity: 0.6 },
    facts: {
      distanceFromSun: "2.87 billion km",
      diameter: "50,724 km",
      gravity: "8.69 m/s²",
      temperature: "−195 °C (cloud tops)",
      dayLength: "17 h 14 min",
      yearLength: "84 Earth years",
      moons: "29",
    },
    description: "An ice giant that orbits on its side, tilted by almost 98 degrees.",
  },
  {
    id: "neptune",
    name: "Neptune",
    kind: "Ice giant",
    color: "#4062bb",
    size: 1.0,
    orbitRadius: 36,
    speed: 0.1,
    rotationSpeed: 0.06,
    tilt: 28.3,
    texture: "neptune",
    atmosphere: { color: "#5b84f0", intensity: 0.65 },
    facts: {
      distanceFromSun: "4.50 billion km",
      diameter: "49,244 km",
      gravity: "11.15 m/s²",
      temperature: "−200 °C (cloud tops)",
      dayLength: "16 h 6 min",
      yearLength: "165 Earth years",
      moons: "16",
    },
    description: "The windiest world: supersonic storms reach 2,100 km/h in its deep blue atmosphere.",
  },
];

export const bodyIds = ["sun", ...planets.map((p) => p.id)] as const;

export function getPlanet(id: string | null) {
  return planets.find((p) => p.id === id) ?? null;
}
