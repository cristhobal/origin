// Prefija ids, url(#...), href="#..." y xlink:href="#..." dentro de un SVG
// con un identificador único, para que el ícono sea autocontenido y no dependa
// de gradients/masks definidos en otros nodos del documento.
//
// Por qué importa: si dos cards repiten el mismo `id="foo"` y la primera se oculta
// con display:none (ej. al filtrar), las referencias `url(#foo)` de la segunda
// dejan de resolverse y el path cae a fill por defecto — solo se ve currentColor.
export function scopeSvg(svg: string, scopeId: string): string {
  const prefix = `${scopeId}-`;
  return svg
    .replace(/id="([^"]+)"/g, `id="${prefix}$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}$1)`)
    .replace(/(xlink:href|href)="#([^"]+)"/g, `$1="#${prefix}$2"`);
}
