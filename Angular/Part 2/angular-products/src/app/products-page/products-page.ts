import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../interfaces/product';
import { IntlCurrencyPipe } from '../pipes/intl-currency-pipe';

@Component({
  imports: [FormsModule, UpperCasePipe, DatePipe, IntlCurrencyPipe],
  selector: 'products-page',
  styleUrl: './products-page.css',
  templateUrl: './products-page.html',
})
export class ProductsPage {
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

  protected newProduct = signal<Product>({
    description: '',
    available: '',
    imageUrl: '',
    rating: 1,
    price: 0,
  });

  constructor() {
    effect(() => console.log(`Las imágenes se muestran: ${this.showImage()}`));
  }

  protected toggleImage() {
    this.showImage.update((show) => !show);
  }

  protected changeImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files?.length) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newProduct.update((product) => ({ ...product, imageUrl: reader.result as string }));
    });
  }

  protected addProduct(form: NgForm) {
    this.products.update((products) => products.concat({ ...this.newProduct() }));
    form.resetForm();
    this.newProduct.update((product) => ({ ...product, imageUrl: '' }));
  }
}
