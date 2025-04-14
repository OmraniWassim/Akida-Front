import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8081/secured/product';

  constructor(private http: HttpClient) { }

  createProduct(product: Product, imageFiles?: File[]): Observable<any> {
    const formData = new FormData();
    
    // Add product data as JSON blob
    formData.append('product', new Blob([JSON.stringify(product)], { 
      type: 'application/json' 
    }));

    // Add each image file with proper field name
    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((file, index) => {
        formData.append('images', file, file.name);
      });
    }

    return this.http.post(this.baseUrl, formData);
  }

  updateProduct(id: number, product: Product, imageFiles?: File[]): Observable<Product> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { 
      type: 'application/json' 
    }));

    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((file, index) => {
        formData.append('images', file, file.name);
      });
    }

    return this.http.put<Product>(`${this.baseUrl}/${id}`, formData);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteProducts(ids: number[]): Observable<any> {
    return this.http.delete(`${this.baseUrl}/bulk`, { body: ids });
  }
}