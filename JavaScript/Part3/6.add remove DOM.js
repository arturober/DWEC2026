const input = document.getElementById("nuevo");
const appendBtn = document.getElementById("append");
const prependBtn = document.getElementById("prepend");
const lista = document.getElementById("lista");
const posBtn = document.getElementById("addPos");
const inputPos = document.getElementById("pos");
const replaceBtn = document.getElementById("replacePos");
const vaciarBtn = document.getElementById("vaciar");

function createLi() {
  const li = document.createElement("li");
  li.textContent = input.value;
  input.value = "";
  return li;
}

appendBtn.addEventListener("click", () => {
  lista.append(createLi());
});

prependBtn.addEventListener("click", () => {
  lista.prepend(createLi());
});

posBtn.addEventListener("click", () => {
  const li = createLi();
  const pos = +inputPos.value;
  lista.children[pos - 1]?.before(li);
});

replaceBtn.addEventListener("click", () => {
  const li = createLi();
  const pos = +inputPos.value;
  lista.children[pos - 1]?.replaceWith(li);
});

vaciarBtn.addEventListener("click", () => lista.replaceChildren());
