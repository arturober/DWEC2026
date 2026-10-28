export interface ProductInsert {
    description: string;
    price: number;
    imageUrl: string;
}

export interface Product extends ProductInsert {
    id: number;
    rating: number;
    available: string;
}

export interface ProductsResponse {
    products: Product[];
}

export interface SingleProductResponse {
    product: Product;
}