import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Category } from '../models/Category';
import { Table } from 'primeng/table';
import { CategoryService } from '../services/category.service';
import { ImageService } from '../services/image.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-gestion-category',
  standalone: false,
  templateUrl: './gestion-category.component.html',
  styleUrls: ['./gestion-category.component.scss']
})
export class GestionCategoryComponent {
  propertyDialog: boolean = false;
  categoryList: Category[] = [];
  dialogVisible: boolean = false;
  uploadedFiles: any[] = [];
  submitted: any = false;
  cols: any[] = [];
  selectedCategories: any[] = [];
  category: Category;
  categoryForm: FormGroup;
  imageMap: { [fileName: string]: string } = {};
  flag: string = 'create';
  categoryId: number = 0;
  parentCategoryList: Category[];



  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService

  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [null],
      sousCategory: ["no"],
      parentId: [null],
    });
  }

  ngOnInit() {
    this.getCategories();
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'name', header: 'name' },
    ];
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

  loadImage(fileName: string): void {
    if (!this.imageMap[fileName]) {
      this.imageService.getImage(fileName).subscribe(blob => {
        const objectURL = URL.createObjectURL(blob);
        this.imageMap[fileName] = objectURL;
      });
    }
  }

  saveCategory() {
    this.submitted = true;
    if (this.categoryForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Veuillez remplir tous les champs obligatoires.',
      });
      return;
    }
    if(this.categoryForm.get('sousCategory')?.value === 'yes' && !this.categoryForm.get('parentId')?.value) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Veuillez sélectionner une catégorie parente.',
      });
      return;
    }
    if (this.flag === 'create') {
      this.addCategory();
    } else if (this.flag === 'edit') {
      this.editCategory();
    }
  }

  initAddCategory() {
    this.dialogVisible = true;
    this.parentCategoryList=this.categoryList;
    this.flag = 'create'
  }

  addCategory(): void {
    if (this.uploadedFiles.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Veuillez sélectionner une image.',
      });
      return;
    }
    this.category = this.categoryForm.getRawValue();
    if(this.categoryForm.get('sousCategory')?.value === 'yes' && this.categoryForm.get('parentId')?.value) {
      this.category.parent={} as Category;
      this.category.parent.id = this.categoryForm.get('parentId')?.value;
    }
    this.categoryService.createCategory(this.category, this.uploadedFiles[0]).subscribe((data: Category) => {
      this.categoryForm.reset();
      this.getCategories();
      this.dialogVisible = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Categorie  ajouter',
      });
    },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Erreur lors de l\'ajout de la catégorie',
        });
      });
  }

  hideCategoryDialog() {
    this.dialogVisible = false;
  }

  initEditCategory(category: Category) {
    this.category = { ...category };
    this.categoryForm.patchValue(category);
    this.categoryId = category.id;
    this.parentCategoryList=this.categoryList.filter(cat => cat.id !== this.categoryId);

    if(this.category.parent) {
      this.categoryForm.get('parentId')?.setValue(this.category.parent.id);
      this.categoryForm.get('sousCategory')?.setValue('yes');
    }else{
      this.categoryForm.get('sousCategory')?.setValue('no');
    }

    this.flag = 'edit'
    this.dialogVisible = true;
  }

  editCategory() {
    this.submitted = true;
    this.category = this.categoryForm.getRawValue();

    if(this.categoryForm.get('sousCategory')?.value === 'yes' && this.categoryForm.get('parentId')?.value) {
      this.category.parent={} as Category;
      this.category.parent.id = this.categoryForm.get('parentId')?.value;
    }

    this.categoryService.updateCategory(this.categoryId, this.category, this.uploadedFiles[0])
      .subscribe({
        next: (data: Category) => {
          this.categoryForm.reset();
          this.getCategories();
          this.dialogVisible = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Catégorie modifiée avec succès',
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Erreur lors de la modification de la catégorie',
          });
        }
      });
  }

  initDelteCategory(categoryId: number, categoryName: string) {
    this.categoryId = categoryId;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Êtes-vous sûr de vouloir supprimer la catégorie "${categoryName}" ?`,
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      accept: () => {
        this.deleteCategory();
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Annulé', detail: 'Suppression annulée' });
      }
    });


  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.categoryId).subscribe(() => {
      this.getCategories();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Catégorie supprimée avec succès',
      });
    }, (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors de la suppression de la catégorie',
      });
    });
  }

  initDeleteAllSelected() {
    if (this.selectedCategories.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Avertissement',
        detail: 'Veuillez sélectionner au moins une catégorie à supprimer.',
      });
      return;
    }
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Êtes-vous sûr de vouloir supprimer les catégories sélectionnées ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      accept: () => {
        this.deleteAllSelectedCategories();
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Annulé', detail: 'Suppression annulée' });
      }
    });
  }

  deleteAllSelectedCategories() {
    const idsToDelete = this.selectedCategories.map((category: Category) => category.id);
    this.categoryService.deleteCategories(idsToDelete).subscribe(() => {
      this.getCategories();
      this.selectedCategories = [];
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Catégories supprimées avec succès',
      });
    }, (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors de la suppression des catégories',
      });
    });
  }

  onBasicUpload(event: any) {
    this.uploadedFiles = event.files;
    this.messageService.add({
      severity: 'info',
      summary: 'Fichier téléchargé',
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getDialogHeader() {
    if (this.flag === 'edit') {
      return this.translateService.instant('category_details') + ' ' + this.category?.name;

    }
    return this.translateService.instant('category_details');
  }

  getUploadLabel() {
    if (this.flag === 'edit') {
      return this.translateService.instant('new_image');
    }
    return this.translateService.instant('choose_image');
  }

  resetDialog() {
    this.categoryForm.reset();
    this.uploadedFiles = [];
    this.dialogVisible = false;
    this.category = null;
    this.categoryId = 0;
    this.propertyDialog = false;
    this.submitted = false;
  }



}
