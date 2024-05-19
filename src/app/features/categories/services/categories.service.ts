import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryListItem } from '../models/category-list-item';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiControllerUrl = 'https://northwind.vercel.app/api/categories';

  constructor(private http: HttpClient) {}

  getList(): Observable<CategoryListItem[]> {
    return this.http.get<CategoryListItem[]>(this.apiControllerUrl);
  }

  updateCategory(category: CategoryListItem,categoryId:number): Observable<any> {
    const url = `${this.apiControllerUrl}/${categoryId}`;
    return this.http.put(url, category);
  }

  getCategoryById(categoryId: number): Observable<CategoryListItem> {
    const url = `${this.apiControllerUrl}/${categoryId}`;
    return this.http.get<CategoryListItem>(url);
  }

  addCategory(category: CategoryListItem): Observable<CategoryListItem> {
    return this.http.post<CategoryListItem>(this.apiControllerUrl, category);
  }

  deleteCategory(categoryId: number) :Observable<void>{
    const url = `${this.apiControllerUrl}/${categoryId}`;
     return this.http.delete<void>(url);
  }
}
