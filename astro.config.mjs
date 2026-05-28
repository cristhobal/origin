// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://www.cristhobal.cl",

  // Site mayoritariamente estático (rápido y barato). El idioma se detecta
  // client-side en `src/i18n/translate.astro` vía `navigator.languages` →
  // localStorage → fallback "en". El body queda invisible hasta que el swap
  // termina (atributo `data-i18n-loading`), así que no hay flash de inglés.
  // Páginas que necesiten datos en vivo (ej. /og.png) opt-out con
  // `export const prerender = false;`.
  output: "static",
  adapter: vercel(),

  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
