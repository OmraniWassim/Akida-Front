import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EcommerceLayoutComponent } from './layout/ecommerce-layout.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: EcommerceLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'product-list', component: ProductsListComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'cart', component: CartComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }