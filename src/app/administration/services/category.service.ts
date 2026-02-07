import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { CategoryHierarchy } from '../models/CategoryHierarchy';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://192.168.56.20:8081/secured/catrgory';

  constructor(private http: HttpClient) { }

  createCategory(category: Category, imageFile?: File): Observable<any> {
    const formData = new FormData();
    formData.append('category', new Blob([JSON.stringify(category)], { type: 'application/json' }));

    if (imageFile) {
      formData.append('imageFile', imageFile);
    }

    return this.http.post(this.baseUrl, formData);
  }

  updateCategory(id: number, category: Category, imageFile?: File): Observable<Category> {
    const formData = new FormData();
    formData.append('category', new Blob([JSON.stringify(category)], { type: 'application/json' }));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.put<Category>(`${this.baseUrl}/${id}`, formData);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteCategories(categoryIds: number[]): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/bulk`, {
      body: categoryIds
    });
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  getCategoryHierarchy(): Observable<CategoryHierarchy[]> {
    return this.http.get<CategoryHierarchy[]>(`${this.baseUrl}/hierarchy`);
  }

}