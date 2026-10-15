const tabla = document.getElementById("tabla-productos");
const productTemplate = document.getElementById("plantilla-producto");
const tbody = tabla.querySelector("tbody");

function addProduct(product) {
  const tr = productTemplate.content.cloneNode(true).firstChild;
  tr.querySelector("img").src = product.imageUrl;
  tr.children[1].textContent = product.description;
  tr.children[2].textContent = product.available;
  tr.children[3].textContent = product.price;
  tbody.append(tr);
}

// Por defecto es una petición GET
fetch("http://localhost:3000/products")
  .then((resp) => resp.json())
  .then((json) => json.products.forEach((p) => addProduct(p)));
