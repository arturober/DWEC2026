/**
 * Módulo para la generación de saludos, fechas y datos de prueba
 */
import { escaparHTML } from "./analisis.js";

// Nombres de ejemplo para probar rápidamente
export const nombresEjemplo = [
  "Arturo",
  "Ada Lovelace",
  "Alan Turing",
  "Grace Hopper",
  "Ana",
  "Otto",
  "Brendan Eich",
  "Margaret Hamilton",
  "Linus Torvalds",
];

// Cumplidos o frases célebres para mostrar
export const cumplidos = [
  "¡Tienes un nombre con 0 errores y 100% de carisma!",
  "¡Ese nombre suena a programador/a de primer nivel!",
  "¡Digno de figurar en el mejor commit de la historia!",
  "¡El algoritmo predice un día genial para ti!",
  "¡Tu nombre compila a la primera y sin advertencias!",
];

/**
 * Determina el saludo según la hora actual del sistema
 * @returns {string} Saludo inicial
 */
export function obtenerSaludoSegunHora() {
  const hora = new Date().getHours();
  if (hora >= 6 && hora < 13) return "¡Buenos días";
  if (hora >= 13 && hora < 21) return "¡Buenas tardes";
  return "¡Buenas noches";
}

/**
 * Formatea la fecha y hora usando dayjs si está disponible,
 * o la API nativa Intl como fallback.
 * @returns {string} Fecha y hora legible
 */
export function obtenerFechaFormateada() {
  if (typeof window !== "undefined" && window.dayjs) {
    try {
      if (typeof window.dayjs.locale === "function") {
        window.dayjs.locale("es");
      }
      return window.dayjs().format("dddd, D [de] MMMM [de] YYYY - HH:mm:ss");
    } catch {
      // Si falla dayjs, se continúa al fallback
    }
  }

  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(new Date());
}

/**
 * Genera el mensaje según el tono seleccionado
 * @param {string} tono
 * @param {string} nombreLimpio
 * @param {string} saludoHora
 * @returns {string} HTML con el texto del saludo
 */
export function generarTextoSaludo(tono, nombreLimpio, saludoHora) {
  const nombreEscapado = escaparHTML(nombreLimpio);

  switch (tono) {
    case "formal":
      return `${saludoHora}. Estimado/a <strong>${nombreEscapado}</strong>, le damos una cordial bienvenida a nuestra aplicación.`;
    case "pirata":
      return `¡Por las barbas de Neptuno! ¡Abordad el navío a toda vela, grumete <strong>${nombreEscapado}</strong>! 🏴‍☠️`;
    case "cyberpunk":
      return `[ACCESO CONCEDIDO] Mainframe inicializado para el agente <code>&lt;${nombreEscapado}/&gt;</code>. ⚡`;
    case "amistoso":
    default:
      return `${saludoHora}, <strong>${nombreEscapado}</strong>! ¡Qué genial tenerte por aquí! 👋`;
  }
}
