import { Http } from "./http";

interface Product {
  id: number;
  description: string;
  imageUrl: string;
  rating: number;
  price: number;
  available: string;
}

interface ProductsResponse {
  products: Product[];
}

interface SingleProductResponse {
  product: Product;
}


const http = new Http();

const respProd = http.get<ProductsResponse>("http://localhost:3000/products");
respProd.then((resp) => resp.products.forEach((p) => console.log(p)));
http.post<SingleProductResponse, Product>("http://localhost:3000/products", {
    id: 23,
    available: '',
    description: '',
    imageUrl: '',
    price: 23,
    rating: 3
})