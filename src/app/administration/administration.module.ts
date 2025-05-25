import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionProduitComponent } from './gestion-produit/gestion-produit.component';
import { GestionCategoryComponent } from './gestion-category/gestion-category.component';
import { AdministrationsRoutingModule } from './administration-routing.module';
import { AdminLayoutComponent } from './layout/admin-layout.component';

// PrimeNG Modules
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { GestionDiscountComponent } from './gestion-discount/gestion-discount.component';
import { TranslateModule, TranslatePipe, TranslateLoader } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        AdminLayoutComponent,
        DashboardComponent,
        GestionCategoryComponent,
        GestionProduitComponent,
        GestionDiscountComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdministrationsRoutingModule,
        CardModule,
        DialogModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        FileUploadModule,
        ToastModule,
        ToolbarModule,
        ConfirmDialogModule,
        InputNumberModule,
        DropdownModule,
        TagModule,
        RatingModule,
        RadioButtonModule,
        ChartModule,
        MenuModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        MessageService,
        ConfirmationService,
        TranslatePipe
    ]
})
export class AdministrationModule { }
