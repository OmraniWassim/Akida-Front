import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-ecommerce',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  socialLinks = [
    { icon: 'pi pi-facebook', url: '#' },
    { icon: 'pi pi-twitter', url: '#' },
    { icon: 'pi pi-instagram', url: '#' }
  ];
} 