import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8081/secured/orders';

  constructor(private http: HttpClient) { }

  createOrder(orderData: Order): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

//   getUserOrders(userId: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/user/${userId}`);
//   }
}