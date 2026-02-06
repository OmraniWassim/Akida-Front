import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = 'http://backend:8081/secured/images';

  constructor(private http: HttpClient) { }

  getImage(filename: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/byFileName?fileName=${filename}`, {
      responseType: 'blob'
    });
  }

}