import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { CartService } from 'src/app/administration/services/cart.service';

@Component({
  selector: 'app-header-ecommerce',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartCount: number = 0;

  items: MenuItem[] = [
    {
      label: 'Accueil',
      icon: 'pi pi-home',
      routerLink: '/ecommerce'
    },
    {
      label: 'Boutique',
      icon: 'pi pi-shopping-cart',
      routerLink: '/ecommerce/shop'
    },
    {
      label: 'À propos',
      icon: 'pi pi-info-circle',
      routerLink: '/ecommerce/about'
    },
    {
      label: 'Contact',
      icon: 'pi pi-envelope',
      routerLink: '/ecommerce/contact'
    }
  ];

  constructor(private router: Router,private cartService:CartService) {}

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(items => {
      this.cartCount = this.cartService.getCartCount();
    });
  }

  scrollToSection(sectionId: string): void {
    if (this.router.url === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/'], { fragment: sectionId });
    }
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  goToCart(): void {
    this.router.navigate(['/ecommerce/cart']);
  }
} 