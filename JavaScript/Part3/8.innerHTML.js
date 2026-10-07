// Referencias a elementos del DOM
const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("userName");
const ageInput = document.getElementById("userAge");
const emailInput = document.getElementById("userEmail");
const cardsContainer = document.getElementById("cardsContainer");
const emptyState = document.getElementById("emptyState");
const counterBadge = document.getElementById("counterBadge");
const statusToast = document.getElementById("statusToast");
const clearAllBtn = document.getElementById("clearAllBtn");

// Contador local de tarjetas
let totalCards = 0;

// Paleta de colores aleatorios para avatares estéticos
const avatarGradients = [
  "from-blue-500 to-indigo-600",
  "from-emerald-400 to-teal-600",
  "from-amber-400 to-orange-500",
  "from-rose-500 to-pink-600",
  "from-purple-500 to-indigo-700",
  "from-cyan-500 to-blue-600",
];

/**
 * Extrae las iniciales de un nombre
 */
function getInitials(name) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Actualiza el contador y el estado de la UI
 */
function updateCounter() {
  counterBadge.textContent = `${totalCards} ${totalCards === 1 ? "registrado" : "registrados"}`;
  if (totalCards > 0) {
    clearAllBtn.classList.remove("hidden");
  } else {
    clearAllBtn.classList.add("hidden");
  }
}

userForm.addEventListener("submit", function (event) {
  // 1. Evitar recarga de página por defecto
  event.preventDefault();

  // 2. Extraer los valores del formulario
  const name = nameInput.value.trim();
  const age = parseInt(ageInput.value, 10);
  const email = emailInput.value.trim();

  if (!name || isNaN(age) || !email) return;

  // 3. Remover el estado vacío si es la primera tarjeta
  if (totalCards === 0) {
    cardsContainer.innerHTML = "";
  }

  // 4. Preparar datos visuales
  const initials = getInitials(name);
  const randomGradient =
    avatarGradients[Math.floor(Math.random() * avatarGradients.length)];
  const registrationTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // 5. Construir la estructura HTML de la tarjeta
  const newCardTemplate = `
        <article class="card-animate bg-white rounded-2xl p-5 border border-slate-100 shadow-md shadow-slate-100 hover:shadow-lg transition-all duration-200 relative group flex flex-col justify-between">
          <div>
            <!-- Cabecera de la tarjeta con avatar y edad -->
            <div class="flex items-start justify-between mb-3.5">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-tr ${randomGradient} text-white flex items-center justify-center font-bold text-base shadow-sm">
                ${initials}
              </div>
              <span class="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                ${age} años
              </span>
            </div>

            <!-- Datos principales -->
            <h3 class="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
              ${name}
            </h3>

            <!-- Correo con icono -->
            <div class="mt-2 flex items-center text-xs text-slate-500 break-all">
              <svg class="w-4 h-4 text-slate-400 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>${email}</span>
            </div>
          </div>

          <!-- Pie de tarjeta con marca de tiempo -->
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Añadido a las ${registrationTime}</span>
            <span class="text-indigo-500 font-medium">Activo</span>
          </div>
        </article>
      `;

  // 6. USO DE innerHTML: Añadir la tarjeta al contenedor en el DOM
  cardsContainer.innerHTML += newCardTemplate;

  // 7. Incrementar contador y actualizar UI
  totalCards++;
  updateCounter();

  // 8. Resetear el formulario y devolver el foco al primer campo
  userForm.reset();
  nameInput.focus();

  // 9. Mostrar feedback breve al usuario
  statusToast.classList.remove("hidden");
  setTimeout(() => {
    statusToast.classList.add("hidden");
  }, 3000);
});

// Botón para limpiar todas las tarjetas y restaurar el estado inicial
clearAllBtn.addEventListener("click", function () {
  cardsContainer.innerHTML = `
        <div id="emptyState" class="sm:col-span-2 bg-white/60 border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center flex flex-col items-center justify-center">
          <div class="w-14 h-14 bg-indigo-50 text-indigo-400 rounded-2xl flex items-center justify-center mb-3">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 class="text-sm font-semibold text-slate-700">Aún no hay tarjetas</h3>
          <p class="text-xs text-slate-400 mt-1 max-w-xs">
            Completa el formulario a la izquierda y pulsa enviar para añadir la primera tarjeta al DOM.
          </p>
        </div>
      `;
  totalCards = 0;
  updateCounter();
  nameInput.focus();
});
