import { Component } from '@angular/core';

@Component({
  selector: 'app-ecommerce-layout',
  template: `
    <app-header-ecommerce></app-header-ecommerce>

    <div class="ecommerce-content-wrapper">
      <router-outlet></router-outlet>
    </div>

    <app-footer-ecommerce></app-footer-ecommerce>
  `,
  styleUrls: ['./ecommerce-layout.component.scss']
})
export class EcommerceLayoutComponent {}

