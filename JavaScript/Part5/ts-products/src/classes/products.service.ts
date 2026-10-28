import { Http } from "./http";
import { SERVER } from "./constants";
import type {
  ProductsResponse,
  SingleProductResponse,
  Product,
  ProductInsert,
} from "../interfaces/product";

export class ProductsService {
  #http = new Http();

  async getProductos(): Promise<Product[]> {
    const resp = await this.#http.get<ProductsResponse>(`${SERVER}/products`);
    return resp.products;
  }

  async add(product: ProductInsert): Promise<Product> {
    const resp = await this.#http.post<SingleProductResponse, ProductInsert>(
      `${SERVER}/products`,
      product,
    );
    return resp.product;
  }

  async update(product: Product): Promise<Product> {
    const resp = await this.#http.put<SingleProductResponse, Product>(
      `${SERVER}/products/${product.id}`,
      product,
    );
    return resp.product;
  }

  delete(id: number): Promise<void> {
    return this.#http.delete(`${SERVER}/products/${id}`);
  }
}
