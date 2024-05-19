import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryListItem } from '../../models/category-list-item';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  
  categories: CategoryListItem[] = [];

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categoryService.getList().subscribe(categories => {
      this.categories = categories;
    });
  }

}
