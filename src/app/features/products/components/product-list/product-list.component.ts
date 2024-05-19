import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListItem } from '../../models/product-list-item';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: ProductListItem[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getList().subscribe(products => {
      this.products = products;
    });
  }
}
