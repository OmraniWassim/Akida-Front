import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShopSectionComponent } from './components/shop-section/shop-section.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'shop', component: ShopSectionComponent },
    { path: 'about', component: AboutUsComponent },
    { path: 'contact', component: ContactUsComponent },
    { 
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    { 
        path: 'admin',
        loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),
        canActivate: [AuthGuard]
    },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
