import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProductsByIdCategory(categoryId: number) {
    throw new Error('Method not implemented.');
  }
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

  updateProduct(id: number, product: Product, imageFiles: File[] = [], deletedImageIds: number[] = []): Observable<Product> {
    const formData = new FormData();
  
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
  
    imageFiles.forEach(file => {
      if (file instanceof File) {
        formData.append('images', file);
      }
    });
  
    formData.append('deletedImageIds', new Blob([JSON.stringify(deletedImageIds)], { type: 'application/json' }));
  
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

  getAllProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/${categoryId}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
}