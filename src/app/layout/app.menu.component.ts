import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
              label: 'Dashboard',
              items: [
                { label: "Statistique", icon: 'pi pi-fw pi-chart-bar', routerLink: ['/admin/dashboard'] },
              ],
            },
             {
              label: 'Admin',
              items: [
                { label: "gestion des utilisateurs", icon: 'pi pi-fw pi-bars', routerLink: ['/admin/gestion-users'] },
              
              ],
            },
            {
              label: 'Gestion de menu',
              items: [
                { label: "gestion des categories", icon: 'pi pi-fw pi-bars', routerLink: ['/admin/gestion-category'] },
                { label: "gestion des produits", icon: 'pi pi-fw pi-pencil', routerLink: ['/admin/gestion-produit'] },
                { label: "gestion des promotions", icon: 'pi pi-fw pi-tags', routerLink: ['/admin/gestion-discount'] },
                { label: "gestion des commandes", icon: 'pi pi-money-bill', routerLink: ['/admin/gestion-commands'] },

      
              ],
            },
            
          ];
    }
}
