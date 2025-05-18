import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/administration/models/Category';
import { Product } from 'src/app/administration/models/Product';
import { CategoryService } from 'src/app/administration/services/category.service';
import { ImageService } from 'src/app/administration/services/image.service';
import { ProductService } from 'src/app/administration/services/product.service';
import { DataView } from 'primeng/dataview';

@Component({
  selector: 'app-products-list',
  standalone: false,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  categoryId: number;
  products: Product[] = [];
  selectdCategory: Category;
  imageMap: { [fileName: string]: string } = {};
  sortOptions: { label: string; value: string; }[];
  sortOrder: number;
  sortField: any;

  options = ['list', 'grid'];
  displayProductDetailDialog = false;
  productId: number;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private router: Router,
    private imageService: ImageService,
    private categoryService: CategoryService,

  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras?.state) {
      const state = navigation.extras.state as {
        categoryId: number;
        flagAllProducts: boolean;
      };
      if(state.flagAllProducts) {
        this.getAllProducts();
      }else{
        this.categoryId = state.categoryId;
        this.getProductsByIdCategory(state.categoryId);
        this.getCategoryById(state.categoryId);
      }
      
    } else {
      this.router.navigate(['/ecommerce/shop']);
    }
  }
  ngOnInit() {
    
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];

  }


  getAllProducts() {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      if (data) {
        data.forEach(prod => {
          if (prod.images.length > 0 && prod.images[0].thumbnailPath) {
            this.loadImage(prod.images[0].thumbnailPath);
          };
        });
        this.products = data
      }
    }, () => {
      this.showError('Erreur lors de la récupération des produits');
    });
  }
  
  getProductsByIdCategory(categoryId: number) {
    this.productService.getAllProductsByCategoryId(categoryId).subscribe((data: Product[]) => {
      if (data) {
        data.forEach(prod => {
          if (prod.images.length > 0 && prod.images[0].thumbnailPath) {
            this.loadImage(prod.images[0].thumbnailPath);
          };
        });
        this.products = data
      }
    }, () => {
      this.showError('Erreur lors de la récupération des produits');
    });
  }

  getCategoryById(categoryId: number) {
    this.categoryService.getCategoryById(categoryId).subscribe((data: Category) => {
      if (data) {
        this.selectdCategory = data;
        if (data.image && data.image.thumbnailPath) {
          this.loadImage(data.image.thumbnailPath);
        }
      }
    }, () => {
      this.showError('Erreur lors de la récupération de la catégorie');
      this.router.navigate(['/ecommerce/shop']);
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

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
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
