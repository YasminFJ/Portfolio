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
  phone: "+34 637 055 908",
  availability: "Disponibilidad inmediata",
  summary:
    "Nací en 1997 y desde siempre me ha tirado más entender cómo funcionan las cosas por dentro que quedarme con la superficie. Eso me llevó a estudiar Ingeniería Informática en la Universidad Europea, y más tarde a completar un máster en Desarrollo Web Full Stack y Diseño Gráfico, combinando la parte técnica con la sensibilidad visual. Soy una persona autodidacta y resolutiva: prefiero entender el problema completo antes de escribir una sola línea de código.",
  summaryExtra:
    "Actualmente trabajo como freelancer, combinando mi colaboración en Esphera —una plataforma de gestión contable con inteligencia artificial— con el desarrollo web para los clientes de XtraMakers, una agencia de marketing. En paralelo, llevo también mis propios proyectos como autónoma.",
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      "React",
      "Angular",
      "Ionic",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "SASS/SCSS",
      "jQuery",
    ],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "PHP", "APIs REST", "OpenAPI / Swagger"],
  },
  {
    category: "WordPress & hosting",
    items: [
      "WooCommerce",
      "Elementor",
      "Divi",
      "Migraciones",
      "Gestión de hosting",
      "cPanel",
      "Webmail",
      "FileZilla",
    ],
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
    category: "Diseño & Adobe",
    items: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
  },
  {
    category: "Ofimática",
    items: ["Excel", "Word", "PowerPoint"],
  },
];

export type TimelineItem = {
  title: string;
  place: string;
  period: string;
  description: string;
  tags: string[];
  type: "formacion" | "trabajo";
};

export const timeline: TimelineItem[] = [
  {
    title: "Grado en Ingeniería Informática",
    place: "Universidad Europea",
    period: "2015 — 2019",
    description:
      "Formación superior en desarrollo de software, bases de datos y arquitectura de sistemas.",
    tags: ["Ingeniería del software", "Bases de datos"],
    type: "formacion",
  },
  {
    title: "Diseñadora Web y Desarrolladora Full Stack",
    place: "Freelance",
    period: "2018 — 2021",
    description:
      "Creación de sitios responsivos con HTML5, CSS3, JavaScript y React, integración de bases de datos SQL y NoSQL, y diseño de prototipos y flujos UX/UI en Figma y Adobe XD.",
    tags: ["React", "MySQL", "Figma"],
    type: "trabajo",
  },
  {
    title: "Máster en Desarrollo Web Full Stack y Diseño Gráfico",
    place: "Centro de Estudios",
    period: "2022 — 2024",
    description:
      "Especialización en desarrollo full stack moderno y diseño gráfico, profundizando en frameworks frontend, backend y herramientas de diseño.",
    tags: ["Full Stack", "Diseño Gráfico"],
    type: "formacion",
  },
  {
    title: "Freelancer — Esphera & XtraMakers",
    place: "Autónoma",
    period: "Actualidad",
    description:
      "Colaboro con Esphera desarrollando interfaces en React para su plataforma de gestión contable con inteligencia artificial, y con XtraMakers, una agencia de marketing, desarrollando y manteniendo los sitios web de sus clientes.",
    tags: ["React", "WordPress", "IA"],
    type: "trabajo",
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

export const codeSnippet = {
  fileName: "ProjectCard.tsx",
  lines: [
    { tokens: [{ t: "comment", v: "// componente reutilizable para fichas de proyecto" }] },
    { tokens: [{ t: "keyword", v: "export function" }, { t: "plain", v: " ProjectCard(" }, { t: "param", v: "{ name, tags, url }" }, { t: "plain", v: ") {" }] },
    { tokens: [{ t: "keyword", v: "  return" }, { t: "plain", v: " (" }] },
    { tokens: [{ t: "tag", v: "    <a" }, { t: "attr", v: " href" }, { t: "plain", v: "=" }, { t: "string", v: "{url}" }, { t: "tag", v: ">" }] },
    { tokens: [{ t: "tag", v: "      <h3>" }, { t: "param", v: "{name}" }, { t: "tag", v: "</h3>" }] },
    { tokens: [{ t: "tag", v: "      <TagList" }, { t: "attr", v: " items" }, { t: "plain", v: "=" }, { t: "string", v: "{tags}" }, { t: "tag", v: " />" }] },
    { tokens: [{ t: "tag", v: "    </a>" }] },
    { tokens: [{ t: "plain", v: "  );" }] },
    { tokens: [{ t: "plain", v: "}" }] },
  ],
};
