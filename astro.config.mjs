// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://www.cristhobal.cl",

  // Mantenemos el sitio mayoritariamente estatico (rapido y barato).
  // Las paginas que necesiten datos en vivo (ej. /projects) se opt-out
  // del prerender con `export const prerender = false;` en su frontmatter.
  output: "static",
  adapter: vercel(),

  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
