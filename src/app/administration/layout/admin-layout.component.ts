import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
    menuItems: MenuItem[] = [];

    constructor(private router: Router) {}

    ngOnInit() {
        this.menuItems = [
            {
                label: 'Tableau de bord',
                icon: 'pi pi-home',
                routerLink: ['/admin/dashboard']
            },
            {
                label: 'Gestion des catégories',
                icon: 'pi pi-list',
                routerLink: ['/admin/gestion-category']
            },
            {
                label: 'Gestion des produits',
                icon: 'pi pi-box',
                routerLink: ['/admin/gestion-produit']
            },
            {
                label: 'Gestion des réductions',
                icon: 'pi pi-percentage',
                routerLink: ['/admin/gestion-discount']
            }
        ];
    }
} 