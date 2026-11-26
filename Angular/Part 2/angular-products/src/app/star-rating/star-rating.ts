import { Component, linkedSignal, model } from '@angular/core';

@Component({
  imports: [],
  selector: 'star-rating',
  styleUrl: './star-rating.css',
  templateUrl: './star-rating.html',
})
export class StarRating {
  rating = model.required<number>();
  auxRating = linkedSignal(() => this.rating());
}
