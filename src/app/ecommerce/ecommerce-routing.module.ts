import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'shop', component: ShopComponent },

    ])],
    exports: [RouterModule]
})
export class EcommerceRoutingModule { }