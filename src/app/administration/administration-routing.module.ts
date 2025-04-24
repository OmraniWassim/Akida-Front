import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionProduitComponent } from './gestion-produit/gestion-produit.component';
import { GestionDiscountComponent } from './gestion-discount/gestion-discount.component';
import { GestionCategoryComponent } from './gestion-category/gestion-category.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'dashboard', component: DashboardComponent },
        { path: 'gestion-category', component: GestionCategoryComponent },
        { path: 'gestion-produit', component: GestionProduitComponent },
        { path: 'gestion-discount', component: GestionDiscountComponent },

    ])],
    exports: [RouterModule]
})
export class AdministrationsRoutingModule { }