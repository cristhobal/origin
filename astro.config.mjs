// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://www.cristhobal.cl",

  // SSR: cada request resuelve el idioma del usuario en el servidor
  // (cookie `portfolio-lang` → `Accept-Language` → fallback "en") vía
  // `detectServerLang` en `src/i18n/server-lang.ts`. Esto elimina el flash
  // de inglés en la primera visita.
  // Páginas estáticas que no necesitan i18n (ej. /og.png) pueden opt-in al
  // prerender con `export const prerender = true;` en su frontmatter.
  output: "server",
  adapter: vercel(),

  integrations: [
    react(),
    sitemap({
      // En `output: "server"` el sitemap no descubre rutas automáticamente
      // (no hay prerender que enumerar). Las listamos explícitamente aquí.
      customPages: [
        "https://www.cristhobal.cl/",
        "https://www.cristhobal.cl/experience",
        "https://www.cristhobal.cl/projects",
      ],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
