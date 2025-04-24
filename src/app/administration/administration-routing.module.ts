import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionProduitComponent } from './gestion-produit/gestion-produit.component';
import { GestionCategoryComponent } from './gestion-category/gestion-category.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'produits', component: GestionProduitComponent },
    { path: 'categories', component: GestionCategoryComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationsRoutingModule { }