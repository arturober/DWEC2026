import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Product } from '../interfaces/product';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'products-page',
  styleUrl: './products-page.css',
  templateUrl: './products-page.html',
})
export class ProductsPage {
  protected products: Product[] = [{
    id: 1,
    description: 'SSD hard drive',
    available: '2016-10-03',
    price: 75,
    imageUrl: '/ssd.jpg',
    rating: 5
  },{
    id: 2,
    description: 'LGA1151 Motherboard',
    available: '2016-09-15',
    price: 96.95,
    imageUrl: '/motherboard.jpg',
    rating: 4
  },
{
    id: 3,
    description: 'HDD Hard drive',
    available: '2014-03-12',
    price: 60,
    imageUrl: '/hdd.jpg',
    rating: 5
  },{
    id: 4,
    description: 'DDR5 6000 32GB',
    available: '2024-09-15',
    price: 499.95,
    imageUrl: '/ram.jpg',
    rating: 4
  }];

  protected showImage = true;

  protected newProduct: Product = {
      description: '',
      available: '',
      imageUrl: '',
      rating: 1,
      price: 0
  }
  protected imageFile = '';

  #changeDetector = inject(ChangeDetectorRef);

  protected toggleImage() {
    this.showImage = !this.showImage;
  }

  protected changeImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files?.length) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newProduct.imageUrl = reader.result as string;
      this.#changeDetector.markForCheck();
    });
  }

  protected addProduct(form: NgForm) {
    this.products.push({...this.newProduct});
    form.resetForm();
    this.newProduct.imageUrl = '';
  }
}
