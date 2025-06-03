import { Component } from '@angular/core';

@Component({
  selector: 'app-featured-images',
  templateUrl: './featured-images.component.html',
  styleUrls: ['./featured-images.component.scss']
})
export class FeaturedImagesComponent {
  featuredProducts = [
    {
      name: 'Notre Histoire',
      description: 'Depuis plus de 30 ans, Sopal propose des solutions innovantes et fiables pour la plomberie et la robinetterie.',
      image: 'assets/layout/images/sopal.jpg'
    },
    {
      name: 'Qualité & Innovation',
      description: 'Nos produits sont conçus avec des matériaux de haute qualité et un design moderne pour répondre à tous vos besoins.',
      image: 'assets/layout/images/sopal2.jpg'
    },
    {
      name: 'Engagement Client',
      description: 'Nous plaçons la satisfaction client au cœur de notre démarche, avec un service après-vente réactif et à l\'écoute.',
      image: 'assets/layout/images/sopal3.jpg'
    }
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
} 