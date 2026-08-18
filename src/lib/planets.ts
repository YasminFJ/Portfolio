export type Planet = {
  id: string;
  name: string;
  color: string;
  emissive?: string;
  /** Radio visual en la escena (unidades arbitrarias, no a escala real) */
  size: number;
  /** Radio orbital visual (unidades arbitrarias, no a escala real) */
  orbitRadius: number;
  /** Velocidad orbital visual relativa */
  speed: number;
  velocidadRotacion: number;
  hasRings?: boolean;
  hasMoon?: boolean;
  /** Datos reales, mostrados en la ficha del planeta */
  distanceFromSun: string;
  gravity: string;
  temperature: string;
  dayLength: string;
  fact: string;
};

export const sun = {
  name: "Sol",
  color: "#ffd166",
  size: 2.6,
};

export const planets: Planet[] = [
  {
    id: "mercury",
    name: "Mercurio",
    color: "#9c9c94",
    size: 0.32,
    orbitRadius: 5,
    speed: 0.9,
    velocidadRotacion: 0.02,
    distanceFromSun: "57.9M km",
    gravity: "3.70 m/s²",
    temperature: "167°C",
    dayLength: "59 días terrestres",
    fact: "El planeta más cercano al Sol y el más pequeño del sistema solar.",
  },
  {
    id: "venus",
    name: "Venus",
    color: "#e0b568",
    size: 0.55,
    orbitRadius: 7,
    speed: 0.7,
    velocidadRotacion: 0.015,
    distanceFromSun: "108.2M km",
    gravity: "8.87 m/s²",
    temperature: "464°C",
    dayLength: "243 días terrestres",
    fact: "El planeta más caliente del sistema solar por su densa atmósfera.",
  },
  {
    id: "earth",
    name: "Tierra",
    color: "#3b82f6",
    emissive: "#1d4ed8",
    size: 0.58,
    orbitRadius: 9.5,
    speed: 0.6,
    velocidadRotacion: 0.05,
    hasMoon: true,
    distanceFromSun: "149.6M km",
    gravity: "9.81 m/s²",
    temperature: "15°C",
    dayLength: "24 horas",
    fact: "El único planeta conocido con vida. Un satélite natural: la Luna.",
  },
  {
    id: "mars",
    name: "Marte",
    color: "#c1440e",
    size: 0.42,
    orbitRadius: 12,
    speed: 0.48,
    velocidadRotacion: 0.045,
    distanceFromSun: "227.9M km",
    gravity: "3.71 m/s²",
    temperature: "-63°C",
    dayLength: "24h 37min",
    fact: "El planeta rojo, con el volcán más grande del sistema solar: el Monte Olimpo.",
  },
  {
    id: "jupiter",
    name: "Júpiter",
    color: "#d9a066",
    size: 1.5,
    orbitRadius: 16.5,
    speed: 0.26,
    velocidadRotacion: 0.09,
    distanceFromSun: "778.5M km",
    gravity: "24.79 m/s²",
    temperature: "-110°C",
    dayLength: "9h 56min",
    fact: "El gigante gaseoso más grande, con una tormenta que dura siglos: la Gran Mancha Roja.",
  },
  {
    id: "saturn",
    name: "Saturno",
    color: "#e3c078",
    size: 1.3,
    orbitRadius: 21,
    speed: 0.2,
    velocidadRotacion: 0.085,
    hasRings: true,
    distanceFromSun: "1,434M km",
    gravity: "10.44 m/s²",
    temperature: "-140°C",
    dayLength: "10h 42min",
    fact: "Famoso por sus anillos, formados por hielo y roca.",
  },
  {
    id: "uranus",
    name: "Urano",
    color: "#9be7e0",
    size: 0.9,
    orbitRadius: 25,
    speed: 0.14,
    velocidadRotacion: 0.06,
    distanceFromSun: "2,871M km",
    gravity: "8.69 m/s²",
    temperature: "-195°C",
    dayLength: "17h 14min",
    fact: "Gira prácticamente tumbado sobre su propio eje.",
  },
  {
    id: "neptune",
    name: "Neptuno",
    color: "#4062bb",
    size: 0.88,
    orbitRadius: 28.5,
    speed: 0.1,
    velocidadRotacion: 0.06,
    distanceFromSun: "4,495M km",
    gravity: "11.15 m/s²",
    temperature: "-200°C",
    dayLength: "16h 6min",
    fact: "El planeta con los vientos más rápidos del sistema solar.",
  },
];
