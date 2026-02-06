import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  // Données pour le graphique des ventes
  salesData: any;
  salesOptions: any;

  // Données pour le graphique des utilisateurs
  usersData: any;
  usersOptions: any;

  // Statistiques
  statistics = {
    totalSales: 0,
    totalUsers: 0,
    averageOrder: 0,
    conversionRate: 0
  };

  ngOnInit() {
    // Configuration du graphique des ventes
    this.salesData = {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
      datasets: [
        {
          label: 'Ventes 2024',
          data: [65, 59, 80, 81, 56, 55],
          fill: false,
          borderColor: '#4CAF50',
          tension: 0.4
        }
      ]
    };

    this.salesOptions = {
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    // Configuration du graphique des utilisateurs
    this.usersData = {
      labels: ['Nouveaux', 'Actifs', 'Inactifs'],
      datasets: [
        {
          data: [300, 500, 200],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    };

    this.usersOptions = {
      plugins: {
        legend: {
          position: 'top',
        }
      }
    };

    // Calcul des statistiques
    this.calculateStatistics();
  }

  private calculateStatistics() {
    // Simulation de calculs
    this.statistics = {
      totalSales: 156000,
      totalUsers: 1000,
      averageOrder: 156,
      conversionRate: 3.5
    };
  }
}
