import type { Tag } from "@/features/projects/types";
import { getTagIcon } from "@/shared/icons";

/** Máximo de badges que se muestran por tarjeta de proyecto. */
export const MAX_BADGE_TAGS = 4;

/**
 * Devuelve los tags que se muestran como badges en una tarjeta de proyecto:
 * - excluye los lenguajes que ya aparecen en LanguagesBar,
 * - excluye los tags sin icono registrado (p. ej. topics genéricos como
 *   "encryption" o "windows"),
 * - limita el resultado a `max` badges.
 */
export function getBadgeTags(
  tags: Tag[],
  languages: Record<string, number> = {},
  max: number = MAX_BADGE_TAGS,
): Tag[] {
  const langNames = new Set(Object.keys(languages));
  return tags
    .filter((tag) => !langNames.has(tag.name))
    .filter((tag) => getTagIcon(tag.name) !== undefined)
    .slice(0, max);
}
