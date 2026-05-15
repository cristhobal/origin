// ─────────────────────────────────────────────────────────────────────────────
// Tag icons + normalizer
// ─────────────────────────────────────────────────────────────────────────────
// Centraliza todos los iconos de tags (skills/tecnologias) que aparecen en las
// cards de proyectos, y normaliza los nombres entre lo que devuelve la API de
// GitHub (topics en lowercase con guiones, ej. "next-js", "tailwindcss") y los
// nombres canonicos que usamos para mostrar y para buscar en TAG_ICONS.
//
// Para AGREGAR UN ICONO NUEVO:
//   1. Anade la entrada en TAG_ICONS con el nombre canonico.
//   2. Si el topic en GitHub se escribe distinto, anade el alias en ALIASES.
//   3. Si el lenguaje principal del repo es ese, anade tambien el mapeo en
//      LANGUAGE_TAG_MAP de github.ts (ya hace fallback al lenguaje sin mapear).
//
// SVG: estilo recomendado: viewBox="0 0 24 24" + class="w-auto h-3" + fill
// currentColor cuando sea posible (asi hereda color del tema). Cuando el logo
// requiere su color de marca (React, Tailwind, etc.), uso ese color directo.
// ─────────────────────────────────────────────────────────────────────────────

// Topics en GitHub vienen lowercase con guiones. Aqui mapeamos esos formatos
// al nombre canonico que usamos en TAG_ICONS.
const ALIASES: Record<string, string> = {
  // Frameworks frontend
  astro: "Astro",
  react: "React",
  reactjs: "React",
  "react-js": "React",
  vue: "Vue",
  vuejs: "Vue",
  "vue-js": "Vue",
  svelte: "Svelte",
  sveltekit: "SvelteKit",
  solid: "SolidJS",
  solidjs: "SolidJS",
  "next-js": "Next.js",
  nextjs: "Next.js",
  next: "Next.js",
  nuxt: "Nuxt",
  nuxtjs: "Nuxt",
  "nuxt-js": "Nuxt",
  angular: "Angular",
  remix: "Remix",

  // Lenguajes
  typescript: "TypeScript",
  ts: "TypeScript",
  javascript: "JavaScript",
  js: "JavaScript",
  python: "Python",
  py: "Python",
  lua: "Lua",
  go: "Go",
  golang: "Go",
  rust: "Rust",
  html: "HTML",
  html5: "HTML",
  css: "CSS",
  css3: "CSS",
  php: "PHP",
  java: "Java",
  ruby: "Ruby",
  shell: "Shell",
  bash: "Shell",
  c: "C",
  "c-plus-plus": "C++",
  cpp: "C++",
  cplusplus: "C++",
  "c-sharp": "C#",
  csharp: "C#",
  swift: "Swift",
  kotlin: "Kotlin",

  // Backend / runtime
  nodejs: "Node.js",
  "node-js": "Node.js",
  node: "Node.js",
  deno: "Deno",
  bun: "Bun",
  express: "Express",
  expressjs: "Express",
  nestjs: "NestJS",
  "nest-js": "NestJS",
  django: "Django",
  flask: "Flask",
  fastapi: "FastAPI",
  laravel: "Laravel",

  // CSS / UI
  tailwind: "Tailwind CSS",
  tailwindcss: "Tailwind CSS",
  "tailwind-css": "Tailwind CSS",
  shadcn: "shadcn/ui",
  shadcnui: "shadcn/ui",
  "shadcn-ui": "shadcn/ui",
  sass: "Sass",
  scss: "Sass",
  bootstrap: "Bootstrap",

  // Bases de datos
  postgres: "PostgreSQL",
  postgresql: "PostgreSQL",
  mysql: "MySQL",
  mongodb: "MongoDB",
  mongo: "MongoDB",
  redis: "Redis",
  sqlite: "SQLite",
  supabase: "Supabase",
  firebase: "Firebase",
  prisma: "Prisma",

  // Cloud / DevOps
  docker: "Docker",
  kubernetes: "Kubernetes",
  k8s: "Kubernetes",
  aws: "AWS",
  vercel: "Vercel",
  netlify: "Netlify",
  cloudflare: "Cloudflare",
  "github-actions": "GitHub Actions",
  vite: "Vite",
  webpack: "Webpack",
  git: "Git",

  // Otros / nicho
  fivem: "FiveM",
  graphql: "GraphQL",
  framer: "Framer Motion",
  "framer-motion": "Framer Motion",
};

/**
 * Convierte un topic/tag crudo (ej. "next-js", "TAILWINDCSS", "react")
 * al nombre canonico que usamos en la UI ("Next.js", "Tailwind CSS", "React").
 * Si no esta en ALIASES, devuelve el original con la primera letra en mayuscula.
 */
export function normalizeTagName(raw: string): string {
  if (!raw) return raw;
  const key = raw.toLowerCase().trim();
  if (ALIASES[key]) return ALIASES[key];
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}
