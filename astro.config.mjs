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

  build: {
    // Consolidar el CSS en un solo chunk (ver vite.build.cssCodeSplit más
    // abajo) no alcanzó: ese chunk seguía siendo un <link rel="stylesheet">
    // externo, y por ende igual de render-blocking. "always" lo inyecta
    // directo como <style> inline en cada página, eliminando la petición
    // de red por completo (a costa de duplicar esos bytes entre páginas,
    // aceptable para un sitio chico como este).
    inlineStylesheets: "always",
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Un solo CSS en vez de un chunk extra por isla (ej. PageScrollArea):
      // elimina una petición render-blocking separada en la carga inicial.
      cssCodeSplit: false,
    },
  },
});
