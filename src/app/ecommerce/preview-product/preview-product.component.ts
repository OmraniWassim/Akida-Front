import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/administration/models/Product';
import { ImageService } from 'src/app/administration/services/image.service';
import { ProductService } from 'src/app/administration/services/product.service';

@Component({
  selector: 'app-preview-product',
  standalone: false,
  templateUrl: './preview-product.component.html',
  styleUrl: './preview-product.component.scss'
})
export class PreviewProductComponent {

  @Input() productId: number;
  @Input() display = false;
  @Output() displayChange = new EventEmitter<boolean>();

  product:Product;
  imageMap: { [fileName: string]: string } = {};
  quantity: number = 1;
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

  responsiveGalleriaOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
      ];

  constructor(
      private productService: ProductService,
      private messageService: MessageService,
      private imageService: ImageService,
  
    ) {
    }

    ngOnInit() {
      this.getProductById(this.productId);
    }

    getProductById(productId: number) {
    this.productService.getProductById(productId).subscribe({
        next: (data) => {
            if (data) {
                data.images?.forEach(img => {
                    if (img.thumbnailPath) {
                        this.loadImage(img.thumbnailPath);
                    }
                });
                this.product = data;
                console.log('loaded image', this.imageMap);
                
            }
        },
        error: () => {
            this.showError('Error loading product');
        }
    });
}

addToCart(product: any) {
    // Your add to cart implementation
    this.messageService.add({
        severity: 'success',
        summary: 'Added to Cart',
        detail: `${product.name} (Qty: ${this.quantity}) added to cart`,
        key: 'productMsgs'
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

  onVisibleChange(event: boolean) {
    this.display = event;
    this.displayChange.emit(this.display);
  }

  reset() {
    this.onVisibleChange(false);
    this.product = null;
    this.imageMap = {};
    this.quantity = 1;
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }
      

}
