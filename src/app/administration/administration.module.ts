import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionProduitComponent } from './gestion-produit/gestion-produit.component';
import { GestionCategoryComponent } from './gestion-category/gestion-category.component';
import { AdministrationsRoutingModule } from './administration-routing.module';

// PrimeNG Modules
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';

@NgModule({
    declarations: [
        DashboardComponent,
        GestionProduitComponent,
        GestionCategoryComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AdministrationsRoutingModule,
        // PrimeNG Modules
        CardModule,
        ChartModule,
        TableModule,
        InputTextModule,
        DialogModule,
        DropdownModule,
        InputNumberModule,
        ToastModule,
        FileUploadModule,
        InputTextareaModule,
        CalendarModule,
        MultiSelectModule,
        ContextMenuModule,
        ProgressBarModule,
        SliderModule,
        RatingModule,
        ToolbarModule,
        TagModule
    ],
    providers: [MessageService]
})
export class AdministrationModule { }
