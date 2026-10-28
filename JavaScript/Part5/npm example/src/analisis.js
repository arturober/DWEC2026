/**
 * Módulo de utilidades y análisis de cadenas de texto para DWEC
 */

// Paleta de gradientes para los avatares según la inicial
const GRADIENTES_AVATAR = [
  "linear-gradient(135deg, #4f46e5, #06b6d4)",
  "linear-gradient(135deg, #ec4899, #8b5cf6)",
  "linear-gradient(135deg, #f59e0b, #ef4444)",
  "linear-gradient(135deg, #10b981, #3b82f6)",
  "linear-gradient(135deg, #8b5cf6, #ec4899)",
  "linear-gradient(135deg, #0ea5e9, #10b981)",
];

/**
 * Evita problemas de inyección XSS escapando caracteres HTML especiales
 * @param {string} texto
 * @returns {string} Texto seguro para insertar en el DOM
 */
export function escaparHTML(texto) {
  const span = document.createElement("span");
  span.textContent = texto;
  return span.innerHTML;
}

/**
 * Devuelve un gradiente según la primera letra del nombre
 * @param {string} letra
 * @returns {string} Regla CSS linear-gradient
 */
export function obtenerGradiente(letra) {
  const indice = letra.toUpperCase().charCodeAt(0) % GRADIENTES_AVATAR.length;
  return GRADIENTES_AVATAR[isNaN(indice) ? 0 : indice];
}

/**
 * Realiza un análisis exhaustivo del nombre:
 * longitud, conteo de vocales, consonantes, inversión y detección de palíndromos.
 * @param {string} nombre
 * @returns {object} Estadísticas calculadas
 */
export function analizarNombre(nombre) {
  const sinEspacios = nombre.replace(/\s+/g, "");
  const longitud = sinEspacios.length;

  // Normalizamos caracteres con tildes para contarlos de forma fiable (á -> a)
  const normalizado = nombre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  let vocales = 0;
  let consonantes = 0;

  for (const char of normalizado) {
    if (/[aeiou]/.test(char)) {
      vocales++;
    } else if (/[bcdfghjklmnñpqrstvwxyz]/.test(char)) {
      consonantes++;
    }
  }

  // Inversión de caracteres
  const alReves = [...nombre].reverse().join("");

  // Comprobar si es palíndromo (mínimo 2 caracteres)
  const soloLetras = normalizado.replace(/[^a-z0-9]/g, "");
  const esPalindromo =
    soloLetras.length > 1 && soloLetras === [...soloLetras].reverse().join("");

  return {
    longitud,
    vocales,
    consonantes,
    alReves,
    esPalindromo,
  };
}
