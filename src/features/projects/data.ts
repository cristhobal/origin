import type { Project } from "./types";

/**
 * Proyectos estáticos (privados o sin repo público).
 * Los proyectos de GitHub se obtienen dinámicamente via github.service.ts.
 *
 * Para DESHABILITAR el enlace al sitio deployado de un proyecto estático,
 * simplemente no incluyas el campo `href` (o ponlo como `undefined`).
 * El nombre del proyecto se mostrará como texto plano en vez de un enlace.
 *
 * Ejemplo con URL visible:
 *   { name: "Mi App", href: "https://miapp.com", ... }
 *
 * Ejemplo SIN URL (no navegable desde el portafolio):
 *   { name: "Mi App", href: undefined, ... }  // o directamente omite `href`
 */
export const projects: Project[] = [];
