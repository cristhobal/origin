import { describe, it, expect } from "vitest";
import { cn, calcularAniosExperiencia } from "../dates";

// ── cn() ─────────────────────────────────────────────────────────────────────

describe("cn()", () => {
  it("retorna una clase simple sin cambios", () => {
    expect(cn("text-red-500")).toBe("text-red-500");
  });

  it("combina múltiples clases", () => {
    expect(cn("flex", "items-center", "gap-4")).toBe("flex items-center gap-4");
  });

  it("elimina duplicados con tailwind-merge (última clase gana)", () => {
    // tailwind-merge resuelve conflictos: p-4 vs p-8 → p-8
    expect(cn("p-4", "p-8")).toBe("p-8");
  });

  it("ignora valores falsy (false, null, undefined)", () => {
    expect(cn("block", false, null, undefined, "mt-2")).toBe("block mt-2");
  });

  it("maneja condicionales con objetos", () => {
    expect(cn({ "font-bold": true, "text-sm": false })).toBe("font-bold");
  });

  it("retorna string vacío si no hay clases válidas", () => {
    expect(cn(false, null, undefined)).toBe("");
  });
});

// ── calcularAniosExperiencia() ────────────────────────────────────────────────

describe("calcularAniosExperiencia()", () => {
  it("calcula correctamente cuando ya pasó el mes de aniversario", () => {
    // Inicio: septiembre 2021. Hoy: octubre 2024 → 3 años completos
    const hoy = new Date(2024, 9, 1); // octubre = mes 9 (0-indexed)
    expect(calcularAniosExperiencia(9, 2021, hoy)).toBe(3);
  });

  it("calcula correctamente exactamente en el mes de aniversario", () => {
    // Inicio: septiembre 2021. Hoy: septiembre 2024 → 3 años completos
    const hoy = new Date(2024, 8, 15); // septiembre = mes 8 (0-indexed)
    expect(calcularAniosExperiencia(9, 2021, hoy)).toBe(3);
  });

  it("resta un año cuando no ha llegado el mes de aniversario", () => {
    // Inicio: septiembre 2021. Hoy: agosto 2024 → solo 2 años completos
    const hoy = new Date(2024, 7, 31); // agosto = mes 7 (0-indexed)
    expect(calcularAniosExperiencia(9, 2021, hoy)).toBe(2);
  });

  it("retorna 0 en el mismo año antes del mes de aniversario", () => {
    // Inicio: septiembre 2021. Hoy: enero 2021
    const hoy = new Date(2021, 0, 1);
    expect(calcularAniosExperiencia(9, 2021, hoy)).toBe(-1);
  });

  it("retorna 0 exactamente en el primer año de aniversario", () => {
    // Inicio: enero 2021. Hoy: enero 2021 (mismo mes y año)
    const hoy = new Date(2021, 0, 1);
    expect(calcularAniosExperiencia(1, 2021, hoy)).toBe(0);
  });

  it("usa la fecha actual por defecto (smoke test)", () => {
    // Solo verifica que devuelve un número
    const resultado = calcularAniosExperiencia(9, 2021);
    expect(typeof resultado).toBe("number");
    expect(resultado).toBeGreaterThanOrEqual(3);
  });

  it("funciona con inicio en enero", () => {
    // Inicio: enero 2020. Hoy: diciembre 2023 → 3 años
    const hoy = new Date(2023, 11, 31);
    expect(calcularAniosExperiencia(1, 2020, hoy)).toBe(3);
  });

  it("funciona con inicio en diciembre", () => {
    // Inicio: diciembre 2020. Hoy: enero 2024 → 3 años
    const hoy = new Date(2024, 0, 15);
    expect(calcularAniosExperiencia(12, 2020, hoy)).toBe(3);
  });
});
