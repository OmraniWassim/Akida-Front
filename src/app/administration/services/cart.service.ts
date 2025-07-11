import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'ecommerce_cart';
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  
  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const cartData = localStorage.getItem(this.cartKey);
    this.cartItems = cartData ? JSON.parse(cartData) : [];
    this.cartSubject.next(this.cartItems);
  }

  private saveCart(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        product: { ...product }, // Create a copy to avoid reference issues
        quantity: quantity
      });
    }
    
    this.saveCart();
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    localStorage.removeItem(this.cartKey);
    this.cartSubject.next(this.cartItems);
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  getCartCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 
      0
    );
  }

  getCartObservable(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }
}