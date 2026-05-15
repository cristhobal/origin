// src/pages/og.png.ts
import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";
import { createElement as h } from "react";
import { calcularAniosExperiencia } from "@/shared/utils/dates";
import { readFileSync } from "fs";
import { join } from "path";

export const prerender = false;

// ─── Paleta ────────────────────────────────────────────────────────────────
const BG = "#141414";
const CARD = "#242424";
const FG = "#f9f9f9";
const MUTED = "#a3a3a3";
const SUBTLE = "#484848";
const BORDER = "rgba(255,255,255,0.08)";
const PRIMARY = "#e4e4e4";

export const GET: APIRoute = () => {
  // ⚠️  FIX: readFileSync movido DENTRO del handler.
  //
  // PROBLEMA ANTERIOR: readFileSync estaba a nivel de módulo (fuera del handler).
  // En Vercel, el archivo .js de la serverless function se inicializa en cold start,
  // y en ese momento process.cwd() apunta a /var/task — pero public/favicon.png
  // NO está en el bundle de la función porque los archivos estáticos van al CDN.
  // Esto provocaba un ENOENT durante la inicialización del módulo, que Vercel
  // traduce a un error 403/500 antes de que el handler siquiera se ejecute.
  //
  // FIX: al moverlo dentro del handler, el error (si ocurriera) quedaría contenido
  // dentro de la invocación y podría manejarse con try/catch. Combinado con la
  // opción `includeFiles` del adaptador de Vercel (ver astro.config.mjs), el archivo
  // queda correctamente bundleado en la función y la lectura siempre funciona.
  let faviconSrc: string;
  try {
    const faviconBuffer = readFileSync(
      join(process.cwd(), "public", "favicon.png"),
    );
    faviconSrc = `data:image/png;base64,${faviconBuffer.toString("base64")}`;
  } catch {
    // Fallback: si el archivo no está disponible (p.ej. en tests o entornos locales
    // sin el archivo), usamos una cadena vacía para que la imagen igualmente se genere.
    faviconSrc = "";
  }

  const anios = calcularAniosExperiencia(9, 2021);

  return new ImageResponse(
    h(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          fontFamily: "Onest, sans-serif",
          backgroundColor: BG,
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06), transparent 40%)",
        },
      },

      // ── Header ────────────────────────────────────────────────────────────
      h(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          },
        },

        h(
          "span",
          {
            style: {
              color: SUBTLE,
              fontSize: "16px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            },
          },
          "origin",
        ),

        faviconSrc
          ? h("img", {
              src: faviconSrc,
              width: 72,
              height: 72,
              style: {
                borderRadius: "50%",
                border: `1px solid ${BORDER}`,
                opacity: 0.9,
              },
            })
          : null,
      ),

      // ── Centro ────────────────────────────────────────────────────────────
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            maxWidth: "900px",
          },
        },

        h(
          "div",
          {
            style: {
              color: FG,
              fontSize: "92px",
              fontWeight: 800,
              lineHeight: "0.95",
              letterSpacing: "-3.5px",
            },
          },
          "Cristhobal\nCanales",
        ),

        h(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "16px",
            },
          },
          h("div", {
            style: {
              width: "40px",
              height: "1px",
              backgroundColor: PRIMARY,
              opacity: 0.6,
            },
          }),
          h(
            "span",
            {
              style: {
                color: MUTED,
                fontSize: "26px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              },
            },
            "Fullstack Web Developer",
          ),
        ),
      ),

      // ── Footer ────────────────────────────────────────────────────────────
      h(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${BORDER}`,
            paddingTop: "28px",
          },
        },

        h(
          "span",
          {
            style: {
              color: SUBTLE,
              fontSize: "16px",
              letterSpacing: "0.04em",
            },
          },
          `${anios}+ years of experience · Chile`,
        ),

        h(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${BORDER}`,
              borderRadius: "999px",
              padding: "10px 20px",
              backdropFilter: "blur(6px)",
            },
          },
          h(
            "span",
            {
              style: {
                color: FG,
                fontSize: "16px",
                fontWeight: 600,
              },
            },
            "Available for work",
          ),
          h(
            "span",
            {
              style: {
                color: MUTED,
                fontSize: "16px",
              },
            },
            "→",
          ),
        ),
      ),
    ),
    { width: 1200, height: 630 },
  );
};
