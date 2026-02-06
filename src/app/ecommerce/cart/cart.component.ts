import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppUser } from 'src/app/administration/models/AppUser';
import { Order } from 'src/app/administration/models/Order';
import { AppUserService } from 'src/app/administration/services/appUser.service';
import { CartItem, CartService } from 'src/app/administration/services/cart.service';
import { ImageService } from 'src/app/administration/services/image.service';
import { OrderService } from 'src/app/administration/services/order.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  subtotal: number = 0;
  imageMap: { [fileName: string]: string } = {};
  deliveryFee: number = 7;


  constructor(
    private cartService: CartService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private imageService: ImageService,
    private appUserService: AppUserService,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems()
    this.subtotal = this.cartService.getCartTotal();
    this.total = this.subtotal + this.deliveryFee;
    this.cartItems.forEach(prod => {
      if (prod.product.images.length > 0 && prod.product.images[0].thumbnailPath) {
        this.loadImage(prod.product.images[0].thumbnailPath);
      };
    });
  }

  loadImage(fileName: string): string {
    if (!this.imageMap[fileName]) {
      this.imageService.getImage(fileName).subscribe(blob => {
        const objectURL = URL.createObjectURL(blob);
        this.imageMap[fileName] = objectURL;
        return objectURL;
      });
    }
    return this.imageMap[fileName];
  }

  updateQuantity(item: CartItem, event: any) {
    const newQuantity = event.value;
    if (newQuantity < 1) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Quantity',
        detail: 'Quantity must be at least 1'
      });
      return;
    }

    if (newQuantity > item.product.stockQuantity) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Insufficient Stock',
        detail: `Only ${item.product.stockQuantity} items available`
      });
      this.cartService.updateQuantity(item.product.id, item.product.stockQuantity);
      this.loadCart();
      return;
    }

    this.cartService.updateQuantity(item.product.id, newQuantity);
    this.loadCart();
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
    this.messageService.add({
      severity: 'success',
      summary: 'Removed',
      detail: 'Item removed from cart'
    });
  }

  confirmCheckout() {
    this.confirmationService.confirm({
      message: "Are you sure you want to proceed with checkout for " + this.cartItems.length + " items? Total amount: " + this.total + " TND",
      header: 'Confirm Checkout',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes, proceed',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-primary',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        // User accepted - process the checkout
        this.processCheckout();
      },
      reject: () => {
        // User rejected - do nothing or show message
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Checkout was cancelled'
        });
      }
    });
  }
  processCheckout() {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
      this.messageService.add({
        severity: 'error',
        summary: 'Authentication Required',
        detail: 'Please login to complete your order'
      });
      return;
    }
    const user = JSON.parse(userJson);
    let currentUser: AppUser | undefined;
    this.appUserService.getByID(user.currentUserId).subscribe({
      next: (data: AppUser) => {

        currentUser = data;
        
        const order: Order = {
          totalAmount: this.total,
          deliveryAddress: currentUser.address || 'Default Address',
          appUser: { id: currentUser.id },
          items: this.cartItems.map(item => ({
            product: { id: item.product.id },
            quantity: item.quantity,
            unitPrice: item.product.price
          }))
        };



        // Submit order
        this.orderService.createOrder(order).subscribe({
          next: (createdOrder) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Order Placed!',
              detail: `Order #${createdOrder.id} has been confirmed`,
              life: 5000
            });

            // Clear cart
            this.cartService.clearCart();
            this.loadCart();


          },
          error: (error) => {
            let errorDetail = 'Could not process your order';

            if (error.error?.message) {
              errorDetail = error.error.message;
            } else if (error.status === 403) {
              errorDetail = 'Please login to complete your order';
            } else if (error.status === 400) {
              errorDetail = 'Invalid order data';
            }

            this.messageService.add({
              severity: 'error',
              summary: 'Checkout Failed',
              detail: errorDetail,
              life: 5000
            });
          }
        });
      },
      error: (error) => {

      }

    })



  }



  goToShop() {
    this.router.navigate(['/ecommerce/shop']);
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
    this.messageService.add({
      severity: 'success',
      summary: 'Cleared',
      detail: 'Cart has been cleared'
    });
  }
}