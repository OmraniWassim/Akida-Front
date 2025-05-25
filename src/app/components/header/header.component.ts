import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  items: MenuItem[] = [
    {
      label: 'Accueil',
      icon: 'pi pi-home',
      routerLink: '/'
    },
    {
      label: 'Boutique',
      icon: 'pi pi-shopping-cart',
      routerLink: '/shop'
    },
    {
      label: 'À propos',
      icon: 'pi pi-info-circle',
      routerLink: '/about'
    },
    {
      label: 'Contact',
      icon: 'pi pi-envelope',
      routerLink: '/contact'
    }
  ];

  constructor(private router: Router) {}

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
} 