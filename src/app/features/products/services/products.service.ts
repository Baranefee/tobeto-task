import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductListItem } from '../models/product-list-item';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiControllerUrl = 'https://northwind.vercel.app/api/products';

  constructor(private http: HttpClient) {}

  getList(): Observable<ProductListItem[]> {
    return this.http.get<ProductListItem[]>(this.apiControllerUrl);
  }

  updateProduct(product: ProductListItem,productId:number): Observable<any> {
    const url = `${this.apiControllerUrl}/${productId}`;
    return this.http.put(url, product);
  }

  getProductById(productId: number): Observable<ProductListItem> {
    const url = `${this.apiControllerUrl}/${productId}`;
    return this.http.get<ProductListItem>(url);
  }

  addProduct(product: ProductListItem): Observable<ProductListItem> {
    return this.http.post<ProductListItem>(this.apiControllerUrl, product);
  }

  deleteProduct(productId: number) :Observable<void>{
    const url = `${this.apiControllerUrl}/${productId}`;
     return this.http.delete<void>(url);
  }
}
