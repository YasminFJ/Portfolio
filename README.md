# Yasmin Fennou Jabal — Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-animaciones-EF008F?logo=framer&logoColor=white)

Portfolio personal de Yasmin Fennou Jabal, desarrolladora Full Stack. Sitio estático de una sola página, construido con Next.js y desplegado en Vercel.

## Sobre el proyecto

La web presenta quién es Yasmin, sus habilidades técnicas, su trayectoria formativa y profesional, una selección de proyectos reales en los que ha trabajado, y una forma de contacto directa. Está pensada para cargar rápido, verse bien en cualquier dispositivo y transmitir una imagen profesional y cuidada.

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| [Next.js 16](https://nextjs.org/) (App Router) | Framework React, generación estática de la página |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático en todo el proyecto |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilos, mediante tokens de diseño en `globals.css` |
| [Framer Motion](https://www.framer.com/motion/) | Animaciones de aparición al hacer scroll |
| [Lucide React](https://lucide.dev/) | Iconos |

No hay backend ni base de datos: todo el contenido vive en un único archivo de datos y la web se genera como HTML estático en el build.

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx        # Metadatos y estructura HTML base
│   ├── page.tsx          # Composición de la página (orden de las secciones)
│   └── globals.css       # Paleta de colores y estilos globales
├── components/
│   ├── Navbar.tsx        # Menú de navegación fijo
│   ├── Hero.tsx          # Cabecera con foto, animación de texto y CTAs
│   ├── CodeShowcase.tsx  # Ventana de código estilo editor
│   ├── About.tsx         # Sección "Quién soy"
│   ├── Skills.tsx        # Habilidades agrupadas por categoría
│   ├── Experience.tsx    # Línea de tiempo de formación y experiencia
│   ├── Projects.tsx      # Grid de proyectos con enlaces
│   ├── Contact.tsx       # Bloque de contacto (email / WhatsApp)
│   ├── Footer.tsx
│   └── Reveal.tsx        # Wrapper de animación al hacer scroll
└── lib/
    └── data.ts           # Todo el contenido de la web: textos, habilidades,
                           # trayectoria, proyectos y datos de contacto
public/
└── images/
    └── yasmin.jpg        # Foto de perfil
```

## Editar el contenido

Todo el texto de la web (biografía, habilidades, trayectoria, proyectos, email y teléfono) está centralizado en **`src/lib/data.ts`**. Para actualizar cualquier dato no hace falta tocar los componentes: basta con editar ese archivo y guardar.

## Diseño

Los colores no están escritos directamente en cada componente, sino definidos como variables en `src/app/globals.css` (`--background`, `--foreground`, `--accent`, etc.) y expuestos a Tailwind mediante `@theme inline`. Esto permite cambiar toda la paleta de la web editando un solo archivo.

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

El proyecto está preparado para desplegarse en [Vercel](https://vercel.com) directamente desde un repositorio Git, sin configuración adicional (Vercel detecta Next.js automáticamente).

1. Crear un repositorio vacío en GitLab.
2. Conectar este proyecto y subirlo:
   ```bash
   git remote add origin <URL-de-tu-repositorio-gitlab>
   git push -u origin main
   ```
3. En Vercel: **Add New Project** → importar el repositorio de GitLab → **Deploy**.

Cada vez que se haga `git push` a la rama principal, Vercel volverá a desplegar la web automáticamente.

## Autora

**Yasmin Fennou Jabal** — Desarrolladora Full Stack
