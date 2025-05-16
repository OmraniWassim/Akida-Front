import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/administration/models/Category';
import { Product } from 'src/app/administration/models/Product';
import { CategoryService } from 'src/app/administration/services/category.service';
import { ImageService } from 'src/app/administration/services/image.service';
import { ProductService } from 'src/app/administration/services/product.service';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {


  imageMap: { [fileName: string]: string } = {};
  products: Product[] = [];
  categoryList: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private imageService: ImageService,
  ) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      if (data) {
        data.forEach(prod => {
          if (prod.images.length > 0 && prod.images[0].thumbnailPath) {
            this.loadImage(prod.images[0].thumbnailPath);
          };
        });
        this.products = data
      }
    }, (error) => {
      this.showError('Erreur lors de la récupération des produits');
    });
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((data: Category[]) => {
      if (data) {
        data.forEach(cat => {
          if (cat.image && cat.image.thumbnailPath) {
            this.loadImage(cat.image.thumbnailPath);
          };
        });
        this.categoryList = data;
      }
    }, (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Erreur lors de la récupération des catégories',
      });
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

  addToCart(product: any) {
    // Implement cart logic
    console.log('Added to cart:', product);
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }

  calculateDiscountedPrice(product: Product): number {
    if (!product.discount) return product.price;
    return product.price * (1 - product.discount.percentage / 100);
  }

  getFinalPrice(product: Product): number {
    return product.discount
      ? product.price * (1 - product.discount.percentage / 100)
      : product.price;
  }
  quickView(product: Product) {
    // Implement quick view modal logic
  }

  navigateToCategory(categoryId: number) {
    // Implement your navigation logic
  }

  // In your component class
  prevCategory() {
    // Logic to manually scroll carousel up
    const carousel = document.querySelector('.vertical-category-carousel') as any;
    if (carousel) carousel.getCarousel().prev();
  }

  nextCategory() {
    // Logic to manually scroll carousel down
    const carousel = document.querySelector('.vertical-category-carousel') as any;
    if (carousel) carousel.getCarousel().next();
  }
}
