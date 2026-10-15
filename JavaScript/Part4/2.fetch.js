const tabla = document.getElementById("tabla-productos");
const productTemplate = document.getElementById("plantilla-producto");
const tbody = tabla.querySelector("tbody");

const formProducto = document.getElementById("form-producto");
const imgPreview = document.getElementById("image-preview");

function showProduct(product) {
  const tr = productTemplate.content.cloneNode(true).firstElementChild;
  tr.querySelector("img").src = product.imageUrl;
  tr.children[1].textContent = product.description;
  const dateFormatter = new Intl.DateTimeFormat("es", {
    dateStyle: "medium",
  });
  tr.children[2].textContent = dateFormatter.format(
    new Date(product.available),
  );
  const priceFormatter = new Intl.NumberFormat("es", {
    currency: "EUR",
    style: "currency",
  });
  tr.children[3].textContent = priceFormatter.format(product.price);
  tr.querySelector(".btn-borrar").addEventListener("click", () => {
    fetch(`http://localhost:3000/products/${product.id}`, { method: "DELETE" })
    .then(resp => {
        if(resp.ok) tr.remove();
    });
  });

  tbody.append(tr);
}

// Por defecto es una petición GET
fetch("http://localhost:3000/products")
  .then((resp) => resp.json())
  .then((json) => json.products.forEach((p) => showProduct(p)));

formProducto.image.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) {
    imgPreview.src = "";
    return;
  }

  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.addEventListener("load", () => {
    imgPreview.src = fileReader.result;
  });
});

formProducto.addEventListener("submit", (e) => {
  e.preventDefault();
  const product = {
    description: formProducto.description.value,
    price: +formProducto.price.value,
    imageUrl: imgPreview.src,
  };

  fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((resp) => resp.json())
    .then((json) => {
        showProduct(json.product)
        formProducto.reset();
        imgPreview.src = "";
    });
});
