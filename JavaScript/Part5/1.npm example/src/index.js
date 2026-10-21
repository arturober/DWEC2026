/**
 * DWEC - Práctica con JavaScript y Módulos ES (ESM)
 * Archivo principal index.js que coordina la interfaz y los eventos del DOM
 */

import { escaparHTML, obtenerGradiente, analizarNombre } from "./analisis.js";

import {
  nombresEjemplo,
  cumplidos,
  obtenerSaludoSegunHora,
  obtenerFechaFormateada,
  generarTextoSaludo,
} from "./saludos.js";

// 1. Selección de elementos del DOM
const inputNombre = document.getElementById("inputNombre");
const selectorTono = document.getElementById("selectorTono");
const btnSaludar = document.getElementById("btnSaludar");
const btnAleatorio = document.getElementById("btnAleatorio");
const btnLimpiar = document.getElementById("btnLimpiar");
const contenedorResultado = document.getElementById("contenedorResultado");

const hola = 34;
console.log(hola);

/**
 * Actualiza la vista con el resultado del análisis y saludo
 * @param {string} nombre
 */
function actualizarVista(nombre) {
  const nombreLimpio = nombre.trim();

  // Si el campo está vacío, mostramos el estado inicial
  if (!nombreLimpio) {
    contenedorResultado.innerHTML = `
      <div class="empty-state">
        <span class="icon">✍️</span>
        <p>Escribe un nombre arriba para ver el saludo en tiempo real.</p>
      </div>
    `;
    return;
  }

  const inicial = nombreLimpio.charAt(0).toUpperCase();
  const gradiente = obtenerGradiente(inicial);
  const saludoHora = obtenerSaludoSegunHora();
  const tono = selectorTono.value;
  const mensajeSaludo = generarTextoSaludo(tono, nombreLimpio, saludoHora);
  const fechaHora = obtenerFechaFormateada();
  const stats = analizarNombre(nombreLimpio);

  // Selección determinista de cumplido basado en el nombre
  const hashNombre = [...nombreLimpio].reduce(
    (acc, c) => acc + c.charCodeAt(0),
    0
  );
  const cumplido = cumplidos[hashNombre % cumplidos.length];

  // Renderizado dinámico
  contenedorResultado.innerHTML = `
    <div class="saludo-header">
      <div class="avatar" style="background: ${gradiente};">${inicial}</div>
      <div class="saludo-texto">
        <h2>${mensajeSaludo}</h2>
        <span class="hora-tag">🕒 ${fechaHora}</span>
      </div>
    </div>

    ${
      stats.esPalindromo
        ? `
      <div class="palindromo-alert">
        <span>🎉</span> ¡Increíble! Tu nombre es un <strong>palíndromo</strong> (se lee igual de izquierda a derecha).
      </div>
    `
        : ""
    }

    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-label">Longitud</div>
        <div class="stat-value">${stats.longitud} <small style="font-size:0.75rem">letras</small></div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Vocales</div>
        <div class="stat-value">${stats.vocales}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Consonantes</div>
        <div class="stat-value">${stats.consonantes}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Al revés</div>
        <div class="stat-value" style="font-size: 1rem;">${escaparHTML(stats.alReves)}</div>
      </div>
    </div>

    <div class="quote-box">
      💡 ${cumplido}
    </div>
  `;
}

// 2. Asignación de Eventos

// Actualización en tiempo real conforme se escribe
inputNombre.addEventListener("input", () => {
  actualizarVista(inputNombre.value);
});

// Cambio de estilo o tono del saludo
selectorTono.addEventListener("change", () => {
  actualizarVista(inputNombre.value);
});

// Botón "Saludar"
btnSaludar.addEventListener("click", (e) => {
  e.preventDefault();
  actualizarVista(inputNombre.value);
  inputNombre.focus();
});

// Botón "Aleatorio"
btnAleatorio.addEventListener("click", () => {
  const indice = Math.floor(Math.random() * nombresEjemplo.length);
  inputNombre.value = nombresEjemplo[indice];
  actualizarVista(inputNombre.value);
  inputNombre.focus();
});

// Botón "Limpiar"
btnLimpiar.addEventListener("click", () => {
  inputNombre.value = "";
  actualizarVista("");
  inputNombre.focus();
});

// Foco inicial
inputNombre.focus();
