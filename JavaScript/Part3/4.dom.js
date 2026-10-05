// Obtener e imprimir precios de todos los productos
const precios = document.getElementsByClassName("producto-precio");
// Devuelve HTMLCollection. Debemos generar un array a partir del mismo para usar sus métodos
// [...precios].forEach((precio) => console.log(precio.textContent));

// const titulos = document.getElementsByClassName("producto-titulo");
// console.log(titulos);
// Array.from(titulos).forEach(t => console.log(t.textContent));

const lista = document.querySelector(".lista-productos");
console.log(lista);
console.log(lista.firstChild); // Cuidado. DEvuelve texto
console.log(lista.firstElementChild);
console.log(lista.children);
console.log(lista.childNodes);

let li = lista.firstElementChild;
while (li) {
  const titulo =
    li.querySelector(".producto-titulo")?.textContent ?? "No encontrado";
  console.log(titulo);
  li = li.nextElementSibling;
}

// Acceder a la descripción del segundo producto
const descripcion = document
  .querySelectorAll(".producto")[1]
  .querySelector(".producto-descripcion").textContent;
console.log(descripcion);

const descripcion2 = document.querySelector(
  ".producto:nth-child(2) .producto-descripcion",
).textContent;
console.log(descripcion2);