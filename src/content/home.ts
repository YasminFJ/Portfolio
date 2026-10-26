/**
 * Home page copy in Spanish and English (redesign v3).
 * Facts come from Yasmin's LinkedIn and CV; nothing here is invented.
 * After approval this content can move to Supabase (site_content per locale).
 */
export type Locale = "es" | "en";

export const CONTACT = {
  email: "fennoujabalyasmin@gmail.com",
  linkedin: "https://www.linkedin.com/in/yasmin-fennou-jabal",
  github: "https://github.com/YasminFJ",
  /** PDF paths once the CVs are added to /public/cv. null → the button opens an email request instead. */
  cv: { es: null as string | null, en: null as string | null },
};

export type FeaturedProject = {
  slug: string;
  name: string;
  image: string;
  imageAlt: Record<Locale, string>;
  type: Record<Locale, string>;
  description: Record<Locale, string>;
  tags: string[];
  inDevelopment?: boolean;
  href: string;
};

export const FEATURED: FeaturedProject[] = [
  {
    slug: "grupo-cunado",
    name: "Grupo Cuñado",
    image: "/images/projects/grupo-cunado.webp",
    imageAlt: {
      es: "Grupo Cuñado: propuesta de nueva home corporativa",
      en: "Grupo Cuñado: proposal for the new corporate homepage",
    },
    type: { es: "Web corporativa", en: "Corporate website" },
    description: {
      es: "Desarrollo de sitio web corporativo con componentes interactivos y optimización de la experiencia de usuario.",
      en: "Corporate website development with interactive components and a refined user experience.",
    },
    tags: ["WordPress", "PHP", "JavaScript"],
    inDevelopment: true,
    href: "/projects/grupo-cunado",
  },
  {
    slug: "diaz-y-asociados",
    name: "Díaz y Asociados",
    image: "/images/projects/diaz-y-asociados-usa.webp",
    imageAlt: {
      es: "Díaz y Asociados: web de Estados Unidos en inglés",
      en: "Díaz y Asociados: United States website in English",
    },
    type: { es: "Web corporativa", en: "Corporate website" },
    description: {
      es: "Desarrollo web multilingüe para mercados de Estados Unidos y Latinoamérica.",
      en: "Multilingual web development for the United States and Latin American markets.",
    },
    tags: ["WordPress", "Polylang", "Multilingüe"],
    href: "/projects/diaz-y-asociados",
  },
  {
    slug: "fundacion-mecerreyes",
    name: "Fundación Mecerreyes",
    image: "/images/projects/fundacion-mecerreyes.webp",
    imageAlt: {
      es: "Fundación Grupo Mecerreyes: home de la nueva plataforma",
      en: "Fundación Grupo Mecerreyes: homepage of the new platform",
    },
    type: { es: "Plataforma web", en: "Web platform" },
    description: {
      es: "Desarrollo de plataforma institucional, arquitectura de contenidos y despliegue.",
      en: "Institutional platform development, content architecture and deployment.",
    },
    tags: ["WordPress", "Elementor", "Hosting"],
    inDevelopment: true,
    href: "/projects/fundacion-mecerreyes",
  },
  {
    slug: "vitale-by-klein",
    name: "Vitale by Klein",
    image: "/images/projects/vitale-by-klein.webp",
    imageAlt: { es: "Vitale by Klein: home de la tienda online", en: "Vitale by Klein: online store homepage" },
    type: { es: "E-commerce", en: "E-commerce" },
    description: {
      es: "Desarrollo y migración de e-commerce con integraciones de pagos, logística y ERP.",
      en: "E-commerce development and migration with payment, shipping and ERP integrations.",
    },
    tags: ["WooCommerce", "Holded", "Sendcloud"],
    href: "/projects/vitale-by-klein",
  },
];

export type Job = {
  company: string;
  logo: "xtramakers" | "esphera" | "freelance";
  role: Record<Locale, string>;
  period: Record<Locale, string>;
  bullets: Record<Locale, string[]>;
  more: Record<Locale, string[]>;
};

export const JOBS: Job[] = [
  {
    company: "XtraMakers",
    logo: "xtramakers",
    role: { es: "Web Developer & Web Project Manager", en: "Web Developer & Web Project Manager" },
    period: { es: "feb. 2026 – Actualidad", en: "Feb 2026 – Present" },
    bullets: {
      es: ["Desarrollo y mantenimiento de sitios web", "Migraciones, debugging y optimización", "Coordinación de proyectos y clientes"],
      en: ["Website development and maintenance", "Migrations, debugging and optimisation", "Project and client coordination"],
    },
    more: {
      es: ["Integraciones de pago y ERP (Stripe, PayPal, Holded, Sendcloud)", "Servidores, hosting, DNS y SSL"],
      en: ["Payment and ERP integrations (Stripe, PayPal, Holded, Sendcloud)", "Servers, hosting, DNS and SSL"],
    },
  },
  {
    company: "Esphera.ai",
    logo: "esphera",
    role: { es: "Full Stack Developer & Customer Success", en: "Full Stack Developer & Customer Success" },
    period: { es: "ene. 2025 – Actualidad", en: "Jan 2025 – Present" },
    bullets: {
      es: ["Desarrollo con React y Next.js", "Integraciones ERP y resolución de incidencias", "Customer Success y coordinación técnica"],
      en: ["Development with React and Next.js", "ERP integrations and incident resolution", "Customer Success and technical coordination"],
    },
    more: {
      es: ["Interfaces, APIs y soluciones técnicas", "Enlace entre clientes y equipo técnico"],
      en: ["Interfaces, APIs and technical solutions", "Bridge between clients and the engineering team"],
    },
  },
  {
    company: "Profesional independiente",
    logo: "freelance",
    role: { es: "Freelance Full Stack Developer", en: "Freelance Full Stack Developer" },
    period: { es: "ene. 2022 – Actualidad", en: "Jan 2022 – Present" },
    bullets: {
      es: ["Aplicaciones web y e-commerce", "APIs, bases de datos e integraciones", "Servidores, despliegues y mantenimiento"],
      en: ["Web applications and e-commerce", "APIs, databases and integrations", "Servers, deployments and maintenance"],
    },
    more: {
      es: ["Sistemas de reserva y pago a medida", "Migraciones y soporte técnico"],
      en: ["Custom booking and payment systems", "Migrations and technical support"],
    },
  },
];

export const STACK_HIGHLIGHT = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "WordPress", "Docker"];

export const STACK_GROUPS: { title: Record<Locale, string>; items: string[] }[] = [
  { title: { es: "Frontend", en: "Frontend" }, items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "SASS"] },
  { title: { es: "Backend", en: "Backend" }, items: ["Node.js", "APIs REST", "PHP"] },
  { title: { es: "Bases de datos", en: "Databases" }, items: ["PostgreSQL", "MySQL", "SQL", "Supabase"] },
  {
    title: { es: "Infraestructura", en: "Infrastructure" },
    items: ["Linux", "VPS", "Docker", "Git", "GitHub", "Hosting", "DNS", "SSL", "Despliegues"],
  },
  { title: { es: "CMS y e-commerce", en: "CMS & e-commerce" }, items: ["WordPress", "WooCommerce", "Elementor", "Kajabi"] },
  { title: { es: "Integraciones", en: "Integrations" }, items: ["Stripe", "PayPal", "Sendcloud", "Holded", "ERP"] },
];

export const T = {
  es: {
    nav: [
      { href: "#inicio", label: "Inicio" },
      { href: "#sobre-mi", label: "Sobre mí" },
      { href: "#experiencia", label: "Experiencia" },
      { href: "#proyectos", label: "Proyectos" },
      { href: "#contacto", label: "Contacto" },
    ],
    talk: "Hablemos",
    skip: "Saltar al contenido",
    eyebrow: "Full Stack Developer · Madrid, España",
    title: "Desarrollo soluciones digitales que funcionan.",
    intro:
      "Full Stack Developer especializada en el desarrollo de aplicaciones web, integraciones y soluciones a medida. Trabajo con React, Next.js, TypeScript y Node.js, combinando desarrollo, infraestructura y coordinación técnica para convertir ideas en productos reales.",
    viewProjects: "Ver proyectos",
    downloadCv: "Descargar CV",
    stats: [
      { value: "4+", label: "años de experiencia" },
      { value: "20+", label: "proyectos desarrollados" },
      { value: "100%", label: "compromiso con el resultado" },
    ],
    heroImageAlt: "Captura real de la propuesta de home de Grupo Cuñado en un portátil",
    featured: "Proyectos destacados",
    allProjects: "Ver todos los proyectos",
    inDevelopment: "En desarrollo",
    about: "Sobre mí",
    aboutText:
      "Soy Ingeniera Informática y desarrollo aplicaciones web de principio a fin: frontend, backend, bases de datos, integraciones e infraestructura. Trabajo cerca de clientes y equipos técnicos, lo que me permite traducir necesidades reales en soluciones fiables.",
    facts: [
      { k: "Ubicación", v: "Madrid, España" },
      { k: "Idiomas", v: "Español y árabe (nativos), inglés C2, francés C1" },
      { k: "Formación", v: "Ingeniería Informática · Universidad Europea" },
      { k: "Ahora", v: "Máster en Desarrollo Full Stack · NET Digital School" },
    ],
    experience: "Experiencia profesional",
    fullCareer: "Ver mi trayectoria completa",
    more: "Ver más",
    less: "Ver menos",
    technologies: "Tecnologías",
    allTech: "Ver todas las tecnologías",
    orbitEyebrow: "Proyecto técnico personal",
    orbitText:
      "Observatorio 3D del sistema solar en tiempo real: texturas reales, atmósferas con shaders GLSL, cámara cinematográfica y cuentas opcionales con Supabase.",
    orbitCta: "Abrir ORBIT",
    ctaEyebrow: "Disponible para nuevas oportunidades",
    ctaTitle: "¿Hablamos de tu próximo proyecto?",
    ctaText:
      "Estoy abierta a oportunidades en remoto en España y Europa, con disponibilidad para reubicación. Puedes escribirme o conectar conmigo en LinkedIn.",
    contact: "Contactar",
    rights: "Todos los derechos reservados.",
    menu: "Menú",
    close: "Cerrar",
    lang: { label: "English", href: "/en" },
  },
  en: {
    nav: [
      { href: "#inicio", label: "Home" },
      { href: "#sobre-mi", label: "About" },
      { href: "#experiencia", label: "Experience" },
      { href: "#proyectos", label: "Projects" },
      { href: "#contacto", label: "Contact" },
    ],
    talk: "Let's talk",
    skip: "Skip to content",
    eyebrow: "Full Stack Developer · Madrid, Spain",
    title: "I build digital solutions that work.",
    intro:
      "Full Stack Developer focused on web applications, integrations and custom solutions. I work with React, Next.js, TypeScript and Node.js, combining development, infrastructure and technical coordination to turn ideas into real products.",
    viewProjects: "View projects",
    downloadCv: "Download CV",
    stats: [
      { value: "4+", label: "years of experience" },
      { value: "20+", label: "projects delivered" },
      { value: "100%", label: "commitment to results" },
    ],
    heroImageAlt: "Real screenshot of the Grupo Cuñado homepage proposal on a laptop",
    featured: "Featured projects",
    allProjects: "View all projects",
    inDevelopment: "In development",
    about: "About",
    aboutText:
      "I'm a Computer Engineer who builds web applications end to end: frontend, backend, databases, integrations and infrastructure. I work closely with clients and engineering teams, which helps me turn real needs into reliable solutions.",
    facts: [
      { k: "Location", v: "Madrid, Spain" },
      { k: "Languages", v: "Spanish and Arabic (native), English C2, French C1" },
      { k: "Education", v: "Computer Engineering · Universidad Europea" },
      { k: "Now", v: "Master's in Full Stack Development · NET Digital School" },
    ],
    experience: "Professional experience",
    fullCareer: "See my full career",
    more: "Show more",
    less: "Show less",
    technologies: "Technologies",
    allTech: "See all technologies",
    orbitEyebrow: "Personal technical project",
    orbitText:
      "A real-time 3D solar system observatory: real textures, GLSL shader atmospheres, a cinematic camera and optional accounts with Supabase.",
    orbitCta: "Launch ORBIT",
    ctaEyebrow: "Available for new opportunities",
    ctaTitle: "Shall we talk about your next project?",
    ctaText:
      "I'm open to remote opportunities in Spain and Europe, and available to relocate. Write to me or connect with me on LinkedIn.",
    contact: "Get in touch",
    rights: "All rights reserved.",
    menu: "Menu",
    close: "Close",
    lang: { label: "Español", href: "/" },
  },
} as const;

export type Dict = (typeof T)[Locale];
