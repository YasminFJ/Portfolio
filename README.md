# Yasmin Fennou Jabal — Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-animaciones-EF008F?logo=framer&logoColor=white)

Portfolio personal de Yasmin Fennou Jabal, Full Stack Developer, construido con Next.js, Supabase y desplegado en Vercel. Web principal en inglés. Incluye **ORBIT**, un sistema solar 3D interactivo construido desde cero como pieza técnica destacada.

## Sobre el proyecto

La web presenta quién es Yasmin, sus habilidades técnicas, su trayectoria formativa y profesional, una selección de proyectos reales en los que ha trabajado, y una forma de contacto directa. Incluye además `/orbit`, una experiencia 3D navegable que demuestra capacidad de construir algo más que sitios con WordPress.

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| [Next.js 16](https://nextjs.org/) (App Router) | Framework React, generación estática de la página |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático en todo el proyecto |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilos, mediante tokens de diseño en `globals.css` |
| [Three.js](https://threejs.org/) + [React Three Fiber](https://r3f.docs.pmnd.rs/) + [drei](https://github.com/pmndrs/drei) | Escena 3D de ORBIT (`/orbit`) |
| [Framer Motion](https://www.framer.com/motion/) | Animaciones de aparición al hacer scroll |
| [Lucide React](https://lucide.dev/) | Iconos |

El contenido (textos, experiencia, tecnologías y proyectos) se gestiona en Supabase y se lee en el servidor con revalidación cada 5 minutos (ver `src/lib/content/repository.ts`).

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx              # HTML base, fuentes, metadatos globales, noindex
│   ├── (site)/                 # Portfolio (header + footer)
│   │   ├── page.tsx            # Home: Hero, About, Capabilities, Experience, Work, Stack, Contact
│   │   └── projects/           # /projects y /projects/[slug] (fichas)
│   ├── orbit/                  # ORBIT (sin cambios en esta fase)
│   ├── opengraph-image.tsx     # Imagen para compartir (LinkedIn)
│   ├── sitemap.ts · robots.ts
│   └── fonts/                  # Newsreader, Inter, Caveat (OFL)
├── components/
│   ├── site/                   # Secciones del portfolio
│   ├── ui/                     # Monograma, iconos, observer de animaciones
│   └── orbit/                  # Componentes del juego
└── lib/
    ├── content/                # Modelo de contenido y lectura de Supabase (solo servidor)
    └── supabase/client.ts      # Cliente de navegador (ORBIT)
supabase/
├── migrations/                 # Esquema versionado
└── seed/                       # Contenido inicial verificado + generador SQL
```

## ORBIT — la pieza técnica destacada

`/orbit` es un sistema solar 3D navegable construido con Three.js y React Three Fiber, pensado para demostrar algo más que experiencia con WordPress: 3D, interacción, matemáticas y arquitectura de un proyecto desde cero.

- Cámara libre (arrastrar para orbitar, scroll para zoom) y clic sobre cualquier planeta para volar hacia él.
- Ficha con datos reales de cada planeta: distancia al Sol, gravedad, temperatura media y duración del día.
- Panel **Mission Control**: velocidad de la simulación, mostrar/ocultar órbitas y etiquetas, vista general y audio ambiental.
- Panel **Celestial Bodies**: acceso directo a cualquier planeta.
- Easter egg: pasado un tiempo explorando aparece una señal desconocida que conduce a un agujero negro.

El documento `ORBIT_proyecto_portfolio.pdf` original contempla una versión más ambiciosa —nave controlable con físicas, misiones, ranking online— que se irá añadiendo por fases.

### Fase 2: cuentas y progreso guardado (Supabase)

ORBIT ya tiene login, registro y guardado de progreso (planetas descubiertos y XP) usando [Supabase](https://supabase.com) como base de datos Postgres + autenticación, con rutas propias de Next.js (sin backend separado). Si no se configura, la web sigue funcionando con normalidad, simplemente sin guardar progreso.

**Configuración actual:**

- Proyecto Supabase independiente: **`portfolio`** (ref `jbjincheriznduglwxbv`, región `eu-west-3`, plan gratuito).
- Esquema versionado en `supabase/migrations/`: perfiles de ORBIT y tablas de contenido (`projects`, `technologies`, `experience`, `site_content`) con RLS de solo lectura pública para lo publicado, más el bucket público `portfolio-media`.
- Variables (ver `.env.example`): `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Ambas son públicas. La clave `secret`/`service_role` nunca se usa en el frontend ni se sube a Git.
- En local: `.env.local` (ignorado por Git). En Vercel: Project → Settings → Environment Variables (Production y Preview).

A partir de ahí, en `/orbit` aparece un botón **Guardar progreso** para crear cuenta o iniciar sesión, y cada planeta que se visita queda guardado junto con la experiencia (XP) acumulada.

## Editar el contenido

Todo el contenido vive en Supabase (proyecto `portfolio`):

| Tabla | Qué contiene |
|---|---|
| `site_content` (`key`, `locale`) | Textos de la web (`site`), tarjetas de capacidades (`capabilities`) e idiomas (`languages`, sin publicar) |
| `projects` | Proyectos y fichas: estado, rol, stack, contexto, problema, solución, arquitectura, verificación, enlace público |
| `project_media` | Imágenes de galería por proyecto (solo se muestran las publicadas de proyectos publicados) |
| `experience` | Formación y experiencia (`kind`: education / work / freelance) |
| `technologies` | Tecnologías agrupadas por especialidad |

- Para ocultar algo sin borrarlo: `published = false`.
- Orden: `sort_order` (y `category_order` en tecnologías). El proyecto destacado es `tier = 'featured'`.
- Los cambios aparecen en la web en un máximo de 5 minutos.
- La semilla inicial está en `supabase/seed/` (`npm run seed:sql`).

## Diseño

Estética editorial cálida (crema, arena, carbón) con titulares en Newsreader, texto en Inter y notas manuscritas en Caveat (fuentes autoalojadas, licencia OFL). Los tokens de color están en `src/app/globals.css`. Las animaciones usan CSS + IntersectionObserver y respetan `prefers-reduced-motion`; sin JavaScript todo el contenido sigue visible.

## Cómo ejecutar el proyecto en local

Requisitos: [Node.js](https://nodejs.org/) 20 o superior.

```bash
# instalar dependencias
npm install

# levantar servidor de desarrollo (http://localhost:3000)
npm run dev

# generar build de producción
npm run build

# servir el build de producción en local
npm run start

# revisar el código con ESLint
npm run lint
```

## Despliegue

- **Repositorio:** GitHub `YasminFJ/Portfolio`, conectado al proyecto `portfolio` de Vercel.
- **Producción:** rama `main` → https://yasminfennou.com (`www.yasminfennou.com` redirige con 308 al dominio principal).
- **Previsualizaciones:** cualquier otra rama o Pull Request genera un despliegue de prueba en Vercel (protegido con login de Vercel). Flujo recomendado: rama → PR → revisar la preview → merge a `main`.
- **Indexación:** mientras `NEXT_PUBLIC_SITE_INDEXABLE` no sea `true`, todas las páginas llevan `noindex` (meta + cabecera `X-Robots-Tag`). No es una protección de acceso: la web es pública.

## Autora

**Yasmin Fennou Jabal** — Desarrolladora Full Stack
