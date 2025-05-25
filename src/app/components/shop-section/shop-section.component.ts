import { Component } from '@angular/core';

@Component({
  selector: 'app-shop-section',
  templateUrl: './shop-section.component.html',
  styleUrls: ['./shop-section.component.scss']
})
export class ShopSectionComponent {
  products = [
    {
      id: 1,
      name: 'Produit 1',
      description: 'Description du produit 1',
      price: 99.99,
      image: 'assets/layout/images/sopal.jpg',
      details: 'Détails supplémentaires sur le produit 1. Qualité supérieure, garantie 2 ans.'
    },
    {
      id: 2,
      name: 'Produit 2',
      description: 'Description du produit 2',
      price: 149.99,
      image: 'assets/layout/images/sopal2.jpg',
      details: 'Détails supplémentaires sur le produit 2. Résistant à la corrosion, installation facile.'
    },
    {
      id: 3,
      name: 'Produit 3',
      description: 'Description du produit 3',
      price: 199.99,
      image: 'assets/layout/images/sopal3.jpg',
      details: 'Détails supplémentaires sur le produit 3. Design moderne, matériaux écologiques.'
    }
  ];

  selectedProduct: any = null;

  selectProduct(product: any) {
    this.selectedProduct = this.selectedProduct === product ? null : product;
  }
} 