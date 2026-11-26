import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Product } from '../interfaces/product';
import { IntlCurrencyPipe } from '../pipes/intl-currency-pipe';
import { StarRating } from '../star-rating/star-rating';

@Component({
  imports: [UpperCasePipe, IntlCurrencyPipe, DatePipe, StarRating],
  selector: 'product-item',
  styleUrl: './product-item.css',
  templateUrl: './product-item.html',
})
export class ProductItem {
  product = input.required<Product>();
  showImage = input(true);
  deleted = output<void>();

  deleteProduct() {
    this.deleted.emit();
  }
}
