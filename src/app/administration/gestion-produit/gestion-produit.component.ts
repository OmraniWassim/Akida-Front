import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { ImageService } from '../services/image.service';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-gestion-produit',
  standalone: false,
  templateUrl: './gestion-produit.component.html',
  styleUrl: './gestion-produit.component.scss'
})
export class GestionProduitComponent implements OnInit {
  @ViewChild('dt') dt: Table;
  @ViewChild('fileUploaderRef') fileUploader!: FileUpload;


  products: Product[] = [];
  statuses: { label: string; value: string }[] = [];
  selectedProducts: Product[] = [];
  categories: Category[] = [];
  product: Product;
  productDialog: boolean = false;
  deleteDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  submitted: boolean = false;
  loading: boolean = true;
  uploadedFiles: any[] = [];
  flag: string = 'create';
  defaultRating: number = 5;
  imageMap: { [fileName: string]: string } = {};
  productId: number=0;
  deletedImageIds: number[] = []



  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private imageService: ImageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.getProducts();
    this.getCategories();
  }

  initForm() {
    this.statuses = [
      { label: 'En Stock', value: 'INSTOCK' },
      { label: 'Stock Faible', value: 'LOWSTOCK' },
      { label: 'Rupture de Stock', value: 'OUTOFSTOCK' },
    ];

    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      reference: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      inventoryStatus: [null, Validators.required],
      categoryId: [null, Validators.required]
    });
  }

  openAddProduct() {
    this.product = null;
    this.submitted = false;
    this.productDialog = true;
    this.flag = 'create';
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((data: Category[]) => {
      if (data) {
        this.categories = data;
      }
    }, (error) => {
      this.showError('Erreur lors de la récupération des catégories');
    });
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

  saveProduct() {
    this.submitted = true;
    if (this.productForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Veuillez remplir tous les champs obligatoires.',
      });
      return;
    }
    if (this.flag === 'create') {
      this.addProduct();
    }else if (this.flag === 'edit') {
      this.editProduct();
    }
    this.submitted = false;
    this.uploadedFiles = [];
    
  }

  addProduct(): void {
    if (this.uploadedFiles.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Veuillez sélectionner au moins une image.',
      });
      return;
    }
    this.product = this.productForm.getRawValue();
    this.product.category = {} as Category;
    this.product.category.id = this.productForm.get('categoryId')?.value;
    this.productService.createProduct(this.product, this.uploadedFiles).subscribe((data: Category) => {
      this.productForm.reset();
      this.getProducts();
      this.productDialog = false;
      this.showSuccess('Produit ajouté avec succès');
    },
      (error) => {
        this.showError('Erreur lors de l\'ajout du produit');
      });
  }

  initEditProduct(product : Product) {
    this.product = product;
    this.productForm.patchValue(product);
    this.productForm.get('categoryId')?.setValue(product?.category?.id);
    this.productId = product.id;
    this.productDialog = true;
    if (product.images && product.images.length > 0) {
      this.uploadedFiles = product.images.map(image => {
        return {
          name: image.thumbnailPath,
          objectURL: this.imageMap[image.thumbnailPath] || this.loadImage(image.thumbnailPath),
          originName: image.fileName,
          id: image.id,
        };
      });
    }
    this.flag = 'edit';
  }

  editProduct(): void {
    this.product = this.productForm.getRawValue();
    this.product.category = {} as Category
    this.product.category.id = this.productForm.get('categoryId')?.value;
    let uploadedFilesToSend= this.uploadedFiles.filter((file) => file instanceof File)
    this.productService.updateProduct(this.productId, this.product, uploadedFilesToSend,this.deletedImageIds).subscribe((data: Product) => {
      this.productForm.reset();
      this.getProducts();
      this.productDialog = false;
      this.showSuccess('Produit modifié avec succès');
    },
      (error) => {
        this.showError('Erreur lors de la modification du produit');
      });
  }

  initDelteProduct(productId: number, productName: string) {
    this.productId = productId;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Êtes-vous sûr de vouloir supprimer le produit "${productName}" ?`,
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      accept: () => {
        this.deleteProduct();
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Annulé', detail: 'Suppression annulée' });
      }
    });


  }
  deleteProduct() {
    this.productService.deleteProduct(this.productId).subscribe(() => {
      this.getProducts();
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Produit supprimé avec succès'
      });
    }, (error) => {
      this.showError('Erreur lors de la suppression du produit');
    });
  }

  getImagePreview(file: any): string {
    if (file.objectURL) return file.objectURL;
    if(file.name) return this.loadImage(file.name);
    return 'assets/images/default-product.png';
  }

  removeFile(index: number, event?: Event) {
    if (event) event.stopPropagation();
    
    const file = this.uploadedFiles[index];
    
    if (file.id && !file.file) {
      this.deletedImageIds.push(file.id);
    }
    
    if (file.objectURL && file.file) {
      URL.revokeObjectURL(file.objectURL);
    }
    
    this.uploadedFiles.splice(index, 1);
    
    if (this.fileUploader) {
      this.fileUploader.clear();
    }
  }

  onBasicUpload(event: any) {
    let toKeepFiles: any[] = [];
    if(this.flag === 'edit') {
      toKeepFiles=this.uploadedFiles.filter((file) => file.name !== event.files[0].name);
    }
    this.uploadedFiles = event.files;
    this.uploadedFiles = [...toKeepFiles, ...this.uploadedFiles];
    this.messageService.add({
      severity: 'info',
      detail: 'les fichiers sont uploadés',
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

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  exportCSV() {
    this.dt.exportCSV();
  }
  get dialogHeader(): string {
    return this.product?.id ? 'Edit Product' : 'Add Product';
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message
    });
  }

  get f() {
    return this.productForm.controls;
  }
  

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }

  ngOnDestroy() {
    // Clean up all object URLs
    this.uploadedFiles.forEach(file => {
      if (file.objectURL && file.file) {
        URL.revokeObjectURL(file.objectURL);
      }
    });
  }
}
