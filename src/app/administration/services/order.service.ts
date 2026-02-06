import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { OrderStatus } from '../enum/OrderStatus.enum';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://backend:8081/secured/orders';

  constructor(private http: HttpClient) { }

  createOrder(orderData: Order): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  updateOrderStatus(orderId: number, status: OrderStatus): Observable<any> {
    return this.http.put(`${this.apiUrl}/${orderId}/${status}`, {});
  }

//   getUserOrders(userId: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/user/${userId}`);
//   }
}