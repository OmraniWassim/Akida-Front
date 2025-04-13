import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionCategoryComponent } from './gestion-category/gestion-category.component';
import { GestionProduitComponent } from './gestion-produit/gestion-produit.component';
import { AdministrationsRoutingModule } from './administration-routing.module';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast'
import { ToolbarModule } from 'primeng/toolbar';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json")
  }
@NgModule({
  declarations: [
    DashboardComponent,
    GestionCategoryComponent,
    GestionProduitComponent
  ],
  imports: [
    CommonModule,
    AdministrationsRoutingModule,
    CardModule,
    DialogModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ToolbarModule,
    TranslateModule,
    ConfirmDialogModule

    
  ],
  providers: [MessageService,TranslatePipe,ConfirmationService],
})
export class AdministrationModule { }
