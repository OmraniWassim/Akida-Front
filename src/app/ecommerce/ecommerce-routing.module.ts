import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ProductsListComponent } from './products-list/products-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'shop', component: ShopComponent },
        { path: 'product-list', component: ProductsListComponent },

    ])],
    exports: [RouterModule]
})
export class EcommerceRoutingModule { }