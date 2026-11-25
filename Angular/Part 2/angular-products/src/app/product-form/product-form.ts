import { Component, output, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'product-form',
  styleUrl: './product-form.css',
  templateUrl: './product-form.html',
})
export class ProductForm {
  protected add = output<Product>();

  protected newProduct = signal<Product>({
    description: '',
    available: '',
    imageUrl: '',
    rating: 1,
    price: 0,
  });

  protected changeImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files?.length) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newProduct.update((product) => ({ ...product, imageUrl: reader.result as string }));
    });
  }

  addProduct(form: NgForm) {
    this.add.emit({...this.newProduct()});
    form.resetForm();
    this.newProduct.update((product) => ({ ...product, imageUrl: '' }));
  }
}
