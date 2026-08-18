export const profile = {
  name: "Yasmin Fennou Jabal",
  role: "Desarrolladora Full Stack",
  roles: [
    "Desarrolladora Full Stack",
    "Especialista en WordPress & WooCommerce",
    "React & Angular Developer",
  ],
  location: "Madrid, España",
  email: "fennoujabalyasmin@gmail.com",
  phone: "+34 645 855 242",
  availability: "Disponibilidad inmediata",
  summary:
    "Desarrolladora Full Stack autónoma especializada en React, Angular y Node.js, con un dominio profundo del ecosistema WordPress: WooCommerce, Elementor, Divi, migraciones de hosting y despliegue con FileZilla y Git. Diez años dirigiendo mi propio negocio me dieron la disciplina y la visión de producto que ahora aplico a cada proyecto web que construyo.",
  summaryExtra:
    "Actualmente combino el desarrollo de interfaces con inteligencia artificial en Esphera con el mantenimiento y la creación de sitios web para clientes de XtraMakers, además de proyectos propios como autónoma.",
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["React", "Angular", "Ionic", "TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "APIs REST", "OpenAPI / Swagger"],
  },
  {
    category: "WordPress & CMS",
    items: ["WooCommerce", "Elementor", "Divi", "Migraciones", "Gestión de hosting", "FileZilla"],
  },
  {
    category: "DevOps & control de versiones",
    items: ["Git", "GitLab CI", "GitHub Actions", "Jenkins", "Docker", "Jest", "Jasmine"],
  },
  {
    category: "Bases de datos",
    items: ["MySQL", "MongoDB"],
  },
  {
    category: "Diseño UX/UI",
    items: ["Figma", "Adobe XD"],
  },
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Esphera",
    role: "Programadora Frontend",
    period: "Actualidad",
    description:
      "Desarrollo de interfaces en React para una plataforma de gestión contable con inteligencia artificial, orientada a empresas y gestorías que automatizan la lectura y contabilización de facturas.",
    tags: ["React", "TypeScript", "IA"],
  },
  {
    company: "XtraMakers",
    role: "Desarrolladora Web",
    period: "Actualidad",
    description:
      "Desarrollo, mantenimiento y despliegue de sitios web para los clientes de la agencia: WordPress, Elementor, Divi, WooCommerce, migraciones de hosting y resolución de incidencias.",
    tags: ["WordPress", "Elementor", "WooCommerce"],
  },
  {
    company: "Diseñadora Web y Desarrolladora Full Stack",
    role: "Freelance",
    period: "2018 — 2021",
    description:
      "Creación de sitios responsivos con HTML5, CSS3, JavaScript y React, integración de bases de datos SQL y NoSQL, y diseño de prototipos y flujos UX/UI en Figma y Adobe XD.",
    tags: ["React", "MySQL", "MongoDB", "Figma"],
  },
  {
    company: "Centro de Peluquería y Belleza",
    role: "Gerente y Propietaria",
    period: "10 años",
    description:
      "Gestión integral de un negocio propio: operación, atención al cliente, formación y dirección de equipos, compatibilizando la gestión con estudios de tecnología.",
    tags: ["Gestión", "Equipos", "Autónoma"],
  },
];

export type Project = {
  name: string;
  url: string;
  description: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    name: "Vitale by Klein",
    url: "https://vitalebyklein.com/",
    description:
      "Tienda online de cosmética construida con WooCommerce. Mantenimiento integral, corrección del flujo de compra, contenido dinámico con Pods y optimización de fichas de producto.",
    tags: ["WooCommerce", "Elementor", "Pods"],
  },
  {
    name: "Sierra Nevada TNS",
    url: "https://sierranevadatns.com/",
    description:
      "Escuela de esquí en Sierra Nevada. Rediseño de la página de clases con Divi, redacción SEO de los contenidos y optimización responsive de todo el sitio.",
    tags: ["Divi", "SEO", "Responsive"],
  },
  {
    name: "Esphera",
    url: "https://esphera.ai/",
    description:
      "Plataforma SaaS de contabilidad con inteligencia artificial. Desarrollo de interfaces en React para la extracción y contabilización automática de facturas.",
    tags: ["React", "TypeScript", "SaaS"],
  },
  {
    name: "Supralaboris",
    url: "https://www.supralaboris.com/",
    description:
      "Consultora de selección de personal. Rediseño de las secciones institucionales de casos de éxito y presencia en medios.",
    tags: ["Elementor", "WordPress"],
  },
  {
    name: "Clínica Dental Cote",
    url: "https://clinicadentalcote.com/",
    description:
      "Clínica dental en Vallecas. Desarrollo de las páginas de servicios, equipo médico y sistema de solicitud de citas.",
    tags: ["Elementor", "WordPress"],
  },
  {
    name: "Farmacia Ensanche Sur",
    url: "https://farmaciaensanchesur.com/",
    description:
      "Sitio corporativo para una farmacia en Alcorcón, con reseñas de Google integradas e información de horarios y ubicación.",
    tags: ["Elementor", "WordPress"],
  },
  {
    name: "Andes Capital Resources",
    url: "https://andescapitalresources.com/es/",
    description:
      "Web corporativa multilingüe para una empresa internacional de trading de materias primas, con secciones de sostenibilidad y logística.",
    tags: ["Elementor", "Multilenguaje"],
  },
  {
    name: "Bolero Estudio",
    url: "https://boleroestudio.com/",
    description:
      "Escuela de baile. Mantenimiento continuo del sitio y resolución de incidencias técnicas.",
    tags: ["WordPress"],
  },
  {
    name: "ATA",
    url: "https://ata.es/",
    description:
      "Colaboración en el desarrollo y mantenimiento web de la federación nacional de asociaciones de trabajadores autónomos.",
    tags: ["WordPress"],
  },
];

export const social = {
  email: `mailto:${profile.email}`,
  whatsapp: `https://wa.me/${profile.phone.replace(/\s|\+/g, "")}`,
};
