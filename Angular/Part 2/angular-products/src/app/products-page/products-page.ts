import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../interfaces/product';
import { ProductForm } from '../product-form/product-form';
import { ProductItem } from '../product-item/product-item';

@Component({
  imports: [FormsModule, ProductItem, ProductForm],
  selector: 'products-page',
  styleUrl: './products-page.css',
  templateUrl: './products-page.html',
})
export class ProductsPage implements OnInit {
  protected products = signal<Product[]>([
    {
      id: 1,
      description: 'SSD hard drive',
      available: '2016-10-03',
      price: 75,
      imageUrl: '/ssd.jpg',
      rating: 5,
    },
    {
      id: 2,
      description: 'LGA1151 Motherboard',
      available: '2016-09-15',
      price: 96.95,
      imageUrl: '/motherboard.jpg',
      rating: 4,
    },
    {
      id: 3,
      description: 'HDD Hard drive',
      available: '2014-03-12',
      price: 60,
      imageUrl: '/hdd.jpg',
      rating: 5,
    },
    {
      id: 4,
      description: 'DDR5 6000 32GB',
      available: '2024-09-15',
      price: 499.95,
      imageUrl: '/ram.jpg',
      rating: 4,
    },
  ]);

  protected showImage = signal(true);
  protected search = signal('');

  protected productsFiltered = computed(() =>
    this.products().filter((p) =>
      p.description.toLocaleLowerCase().includes(this.search().toLocaleLowerCase()),
    ),
  );

  constructor() {
    effect(() => console.log(`Las imágenes se muestran: ${this.showImage()}`));
  }

  ngOnInit(): void {
    console.log("Componente products page creado!");
  }

  protected toggleImage() {
    this.showImage.update((show) => !show);
  }

  protected addProduct(product: Product) {
    this.products.update((products) => products.concat(product));
  }

  protected deleteProduct(product: Product) {
    this.products.update(products => products.filter(p => p !== product));
  }
}
