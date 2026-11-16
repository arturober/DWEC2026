import { Component } from "@angular/core";
import { ProductsPage } from "./products-page/products-page";

@Component({
  imports: [ProductsPage],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = 'Angular Products';
}
