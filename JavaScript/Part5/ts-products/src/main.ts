import { ProductsService } from "./classes/products.service";
import type { Product, ProductInsert } from "./interfaces/product";

const tabla = document.getElementById("tabla-productos") as HTMLTableElement;
const productTemplate = document.getElementById("plantilla-producto") as HTMLTemplateElement;
const tbody = tabla.querySelector("tbody")!;

const formProducto = document.getElementById("form-producto") as HTMLFormElement;
const imgPreview = document.getElementById("image-preview") as HTMLImageElement;

const productsService = new ProductsService();

function showProduct(product: Product): void {
  const tr = (productTemplate.content.cloneNode(true) as DocumentFragment).firstElementChild!;
  tr.querySelector("img")!.src = product.imageUrl;
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
  tr.querySelector(".btn-borrar")!.addEventListener("click", async () => {
    await productsService.delete(product.id);
    tr.remove();
  });

  tbody.append(tr);
}

const imageInput = formProducto.image as HTMLInputElement;

imageInput.addEventListener("change", () => {
  const file = imageInput.files?.[0];
  if (!file) {
    imgPreview.src = "";
    return;
  }

  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.addEventListener("load", () => {
    imgPreview.src = fileReader.result as string;
  });
});

formProducto.addEventListener("submit", async (e) => {
  e.preventDefault();
  const productInsert: ProductInsert = {
    description: (formProducto.description as HTMLInputElement).value,
    price: +(formProducto.price as HTMLInputElement).value,
    imageUrl: imgPreview.src,
  };

  try {
    const product = await productsService.add(productInsert);
    showProduct(product)
    formProducto.reset();
    imgPreview.src = "";
  } catch(e) {
    alert("Error añadiendo el producto");
    console.log(e);
  }
});

async function getProducts(): Promise<void> {
  const products = await productsService.getProductos();
  products.forEach((p) => showProduct(p));
}

getProducts();