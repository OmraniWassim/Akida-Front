import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionCategoryComponent } from './gestion-category/gestion-category.component';
import { GestionProduitComponent } from './gestion-produit/gestion-produit.component';
import { AdministrationsRoutingModule } from './administration-routing.module';
import { CardModule } from 'primeng/card';



@NgModule({
  declarations: [
    DashboardComponent,
    GestionCategoryComponent,
    GestionProduitComponent
  ],
  imports: [
    CommonModule,
    AdministrationsRoutingModule,
    CardModule
  ]
})
export class AdministrationModule { }
