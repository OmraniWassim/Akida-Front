import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { Category } from 'src/app/administration/models/Category';
import { CategoryHierarchy } from 'src/app/administration/models/CategoryHierarchy';
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
  categoryHierarchy: any[] = [];
  megaMenuItems: MegaMenuItem[] = [];
  responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number; }[];
  displayProductDetailDialog = false;
  productId: number;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }]



    this.getProducts();
    this.loadCategoryHierarchy();
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
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

  loadCategoryHierarchy() {
    this.categoryService.getCategoryHierarchy().subscribe(
      (data: any[]) => {
        this.categoryHierarchy = data;
        this.megaMenuItems = this.buildMegaMenuItems(data);
        
        // Preload images
        data.forEach(category => {
          if (category.imagePath) {
            this.loadImage(category.imagePath);
          }
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load categories'
        });
      }
    );
  }

  private buildMegaMenuItems(categories: any[]): MegaMenuItem[] {
    return categories.map(category => ({
      label: category.name,
      icon: this.getCategoryIcon(category),
      items: [
        [
          {
            label: category.name,
            items: category.children?.length 
              ? this.buildSubcategoryItems(category.children)
              : [{ label: 'All Products', command: () => this.navigateToProductList(category.id) }]
          }
        ]
      ]
    }));
  }

  private buildSubcategoryItems(subcategories: any[]): any[] {
    return subcategories.map(subCat => ({
      label: subCat.name,
      icon: this.getCategoryIcon(subCat),
      command: () => this.navigateToProductList(subCat.id)
    }));
  }

  getCategoryIcon(category: Category): string {
    if (category.image && category.image.thumbnailPath) {
      return this.loadImage(category.image.thumbnailPath);
    }
    return 'pi pi-tag'; // Default icon if no image is available
  }

  navigateToProductList(categoryId: number) {
    const navigationExtras: NavigationExtras = {
      state: {
        categoryId: categoryId,
        flagAllProducts: categoryId == null? true : false
      },
      relativeTo: this.route
    };
    this.router.navigate(['/ecommerce/product-list'], navigationExtras);
  }

  viewProduct(productId: number) {
    this.productId = productId;
    this.displayProductDetailDialog = true;
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }
}
