import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'auth',
                loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
            },
            {
                path: 'admin',
                component: AppLayoutComponent,
                loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)
            },
            { path: 'ecommerce',
              loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule)
            },
            { path: '', redirectTo: '/ecommerce', pathMatch: 'full' },
            { path: '**', redirectTo: '/ecommerce' }
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
