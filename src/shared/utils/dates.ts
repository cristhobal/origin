/**
 * Calcula los años completos de experiencia desde un mes/año de inicio.
 * @param mesInicio  Mes de inicio (1–12)
 * @param anioInicio Año de inicio (ej. 2021)
 * @param hoy        Fecha de referencia (por defecto `new Date()`)
 */
export function calcularAniosExperiencia(
  mesInicio: number,
  anioInicio: number,
  hoy: Date = new Date()
): number {
  let anios = hoy.getFullYear() - anioInicio;
  const meses = hoy.getMonth() + 1 - mesInicio;
  if (meses < 0) anios--;
  return anios;
}
