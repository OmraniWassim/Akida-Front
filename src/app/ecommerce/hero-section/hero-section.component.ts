import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HeroSectionComponent {

 constructor(private router: Router) {}

  redirectToShop(): void {
    //router navugate to ecommerce/shop
    this.router.navigate(['/ecommerce/shop']);
    
  }
} 