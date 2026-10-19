import { ProductsService } from "./classes/products.service.js";

const tabla = document.getElementById("tabla-productos");
const productTemplate = document.getElementById("plantilla-producto");
const tbody = tabla.querySelector("tbody");

const formProducto = document.getElementById("form-producto");
const imgPreview = document.getElementById("image-preview");

const productsService = new ProductsService();

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
  tr.querySelector(".btn-borrar").addEventListener("click", async () => {
    await productsService.delete(product.id);
    tr.remove();
  });

  tbody.append(tr);
}

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

formProducto.addEventListener("submit", async (e) => {
  e.preventDefault();
  const product = {
    description: formProducto.description.value,
    price: +formProducto.price.value,
    imageUrl: imgPreview.src,
  };

  try {
    const product = await productsService.add(product);
    showProduct(product)
    formProducto.reset();
    imgPreview.src = "";
  } catch(e) {
    alert("Error añadiendo el producto");
    console.log(e);
  }
});

async function getProducts() {
  const products = await productsService.getProductos();
  products.forEach((p) => showProduct(p));
}

getProducts();