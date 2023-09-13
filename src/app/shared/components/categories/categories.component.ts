import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public products: Product[] = [];
  public collapse = true;

  constructor(public productService: ProductService) {
    this.productService.getProducts.subscribe(
      product => (this.products = product)
    );
  }

  get filterByCategory() {
    return [...new Set(this.products.map(product => product.type))];
  }

  ngOnInit(): void {}
}
