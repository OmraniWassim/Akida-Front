import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionProduitComponent } from './gestion-produit/gestion-produit.component';
import { GestionDiscountComponent } from './gestion-discount/gestion-discount.component';
import { GestionCategoryComponent } from './gestion-category/gestion-category.component';
import { AdminLayoutComponent } from './layout/admin-layout.component';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'gestion-category', component: GestionCategoryComponent },
            { path: 'gestion-produit', component: GestionProduitComponent },
            { path: 'gestion-discount', component: GestionDiscountComponent },
            { path: '**', redirectTo: 'dashboard' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationsRoutingModule { }