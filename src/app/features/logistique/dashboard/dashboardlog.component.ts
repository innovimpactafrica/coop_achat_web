import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../../../core/layouts/main-layout/main-layout.component';

interface MetricCard {
  title: string;
  value: string;
  subtitle: string;
  subtitleDetail: string;
  icon: string;
  color: string;
}

interface Delivery {
  reference: string;
  client: string;
  date: string;
  produits: number;
  statut: string;
  statutColor: string;
}

interface StockData {
  category: string;
  percentage: number;
  color: string;
}

interface StockAlert {
  productName: string;
  currentStock: number;
  alertThreshold: number;
  supplier: string;
}

interface OrderCategory {
  name: string;
  count: number;
  products: string;
}

@Component({
  selector: 'app-dashboardlog',
  standalone: true,
  imports: [CommonModule, MainLayoutComponent],
  template: `
    <!-- on passe role='log' au MainLayout -->
    <app-main-layout [role]="role">
      <!-- Header Section -->
      <div class="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6 lg:mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Tableau de bord logistique</h1>
        <div class="flex items-center justify-center sm:justify-end">
          <button class="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center hover:bg-orange-600 transition-colors">
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5309 1.33331H6.53092C6.16273 1.33331 5.86426 1.63179 5.86426 1.99998V3.33331C5.86426 3.7015 6.16273 3.99998 6.53092 3.99998H10.5309C10.8991 3.99998 11.1976 3.7015 11.1976 3.33331V1.99998C11.1976 1.63179 10.8991 1.33331 10.5309 1.33331Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.1982 2.66669H12.5316C12.8852 2.66669 13.2243 2.80716 13.4744 3.05721C13.7244 3.30726 13.8649 3.6464 13.8649 4.00002V13.3334C13.8649 13.687 13.7244 14.0261 13.4744 14.2762C13.2243 14.5262 12.8852 14.6667 12.5316 14.6667H4.53158C4.17795 14.6667 3.83881 14.5262 3.58877 14.2762C3.33872 14.0261 3.19824 13.687 3.19824 13.3334V4.00002C3.19824 3.6464 3.33872 3.30726 3.58877 3.05721C3.83881 2.80716 4.17795 2.66669 4.53158 2.66669H5.86491" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.53125 7.33331H11.1979" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.53125 10.6667H11.1979" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.86426 7.33331H5.87092" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.86426 10.6667H5.87092" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>&nbsp;&nbsp;
            <span class="hidden sm:inline">Préparer commandes</span>
            <span class="sm:hidden">Préparer</span>
          </button>
        </div>
      </div>

      <!-- Metrics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
        <div *ngFor="let metric of metricsData" class="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-3 sm:mb-4">
            <div class="text-xs sm:text-sm text-gray-600">{{ metric.title }}</div>
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center" 
                [ngStyle]="{'background-color': metric.color + '20'}">
              <img src="{{ metric.icon }}" alt="image" class="w-4 h-4 sm:w-5 sm:h-5">
            </div>
          </div>
          <div class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">{{ metric.value }}</div>
          <div class="flex items-center text-xs sm:text-sm space-x-2">
              <span class="font-bold text-gray-700">{{ metric.subtitle }}</span>
              <span class="text-gray-500">{{ metric.subtitleDetail }}</span>
          </div>

        </div>
      </div>

      <!-- Charts and Tables Row -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6 lg:mb-8">
        <!-- Stock Status Chart -->
        <div class="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow">
          <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 border-b border-gray-200 pb-2">État des stocks</h3>

          <div class="flex flex-col items-center">
            <!-- Pie Chart -->
            <div class="relative w-48 h-48 sm:w-56 sm:h-56 mb-6">
              <svg viewBox="0 0 200 200" class="w-full h-full transform -rotate-90">
                <!-- En stock (70%) -->
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#10B981"
                  stroke-width="25"
                  stroke-dasharray="307.8 131.4"
                  stroke-dashoffset="0"
                />
                <!-- Stock faible (15%) -->
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#F59E0B"
                  stroke-width="25"
                  stroke-dasharray="65.9 373.3"
                  stroke-dashoffset="-307.8"
                />
                <!-- Rupture (15%) -->
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#EF4444"
                  stroke-width="25"
                  stroke-dasharray="65.9 373.3"
                  stroke-dashoffset="-373.7"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-sm text-gray-500">En stock</div>
                  <div class="text-lg font-bold text-green-600">70%</div>
                </div>
              </div>
            </div>
            
            <!-- Legend -->
            <div class="flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
              <div class="flex items-center space-x-2">
              <div class="w-3 h-2 bg-green-500 border border-black"></div>
              <span class="text-gray-700">En stock</span>
            </div>

              <div class="flex items-center space-x-2">
                <div class="w-3 h-2 bg-yellow-500 border border-black"></div>
                <span class="text-gray-700">Stock faible</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-3 h-2 bg-red-500 border border-black"></div>
                <span class="text-gray-700">Rupture</span>
              </div>
            </div>
            
            <div class="mt-4">
              <button class="text-gray-600 text-sm border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Voir détails
              </button>
            </div>
          </div>
        </div>

        <!-- Planned Deliveries -->
        <div class="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow">
          <div class="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-4 sm:mb-6 ">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900">Livraisons planifiées</h3>
          </div>
          
          <!-- Desktop Table View -->
          <div class="hidden lg:block overflow-x-auto border border-gray-200 hover:shadow-md rounded-lg shadow-md ">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produits</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let delivery of plannedDeliveries" class="hover:bg-gray-50">
                  <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ delivery.reference }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ delivery.client }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ delivery.date }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {{ delivery.produits }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <span 
                      class="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full"
                      [ngClass]="getStatusClass(delivery.statutColor)"
                    >
                      {{ delivery.statut }}
                    </span>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs transition-colors">
                      Détails
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile Card View -->
          <div class="lg:hidden space-y-3">
            <div *ngFor="let delivery of plannedDeliveries" class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div class="flex flex-col space-y-3">
                <!-- Header -->
                <div class="flex items-start justify-between">
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-medium text-gray-900">{{ delivery.reference }}</h4>
                    <div class="text-xs text-gray-500 mt-1">{{ delivery.client }}</div>
                  </div>
                  <span 
                    class="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full"
                    [ngClass]="getStatusClass(delivery.statutColor)"
                  >
                    {{ delivery.statut }}
                  </span>
                </div>

                <!-- Details -->
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-gray-500">Date:</span>
                    <span class="ml-1 font-medium text-gray-900">{{ delivery.date }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Produits:</span>
                    <span class="ml-1 font-medium text-gray-900">{{ delivery.produits }}</span>
                  </div>
                </div>

                <!-- Action Button -->
                <div class="pt-2">
                  <button class="w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-xs font-medium transition-colors">
                    Détails
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Alertes et Commandes Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- Alertes de stock -->
        <div class="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900">Alertes de stock</h3>
          </div>
          
          <div class="space-y-4">
  <div *ngFor="let alert of stockAlerts" class="bg-red-50 border border-red-200 rounded-lg p-4">
    <div class="flex items-start space-x-3">
      <!-- Icône d'alerte -->
      <div class="flex-shrink-0 mt-0.5">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M18.1083 14.9999L11.4416 3.33319C11.2962 3.0767 11.0854 2.86335 10.8307 2.71492C10.576 2.56649 10.2864 2.48828 9.99161 2.48828C9.69678 2.48828 9.40724 2.56649 9.1525 2.71492C8.89777 2.86335 8.68697 3.0767 8.54161 3.33319L1.87494 14.9999C1.72801 15.2543 1.65096 15.5431 1.65162 15.837C1.65227 16.1308 1.73059 16.4192 1.87865 16.673C2.0267 16.9269 2.23923 17.137 2.49469 17.2822C2.75014 17.4274 3.03945 17.5025 3.33327 17.4999H16.6666C16.959 17.4996 17.2462 17.4223 17.4993 17.2759C17.7525 17.1295 17.9626 16.9191 18.1087 16.6658C18.2548 16.4125 18.3316 16.1252 18.3316 15.8328C18.3315 15.5404 18.2545 15.2531 18.1083 14.9999Z"
                stroke="#F87171" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"/>
          <path d="M10 7.5V10.8333" stroke="#F87171" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 14.167H10.0083" stroke="#F87171" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <!-- Contenu de l'alerte -->
      <div class="flex-1 min-w-0">
        <h4 class="font-medium text-red-800 mb-2">{{ alert.productName }}</h4>

        <!-- Ligne infos stock + fournisseur -->
        <div class="flex items-center justify-between text-xs text-red-600 mb-3">
          <div class="flex items-center space-x-4">
            <span>Stock actuel: <strong>{{ alert.currentStock }}</strong></span>
            <span>Seuil d'alerte: <strong>{{ alert.alertThreshold }}</strong></span>
            <span>Fournisseur: <strong>{{ alert.supplier }}</strong></span>
          </div>
        </div>

        <!-- Bouton aligné -->
        <div class="flex">
          <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
            Commander
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

          
          <div class="mt-4 text-center">
            <button class="text-blue-600 text-sm  px-4 py-2 rounded-lg  transition-colors font-medium">
              <a href="/#">Voir toutes les alertes</a>
              
            </button>
          </div>
        </div>

        <!-- Commandes à préparer aujourd'hui -->
        <div class="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900">Commandes à préparer aujourd'hui</h3>
          </div>
          
          <!-- Résumé principal -->
          <div class=" border border-gray-200 rounded-lg p-4 mb-6">
            <div class="flex items-center space-x-3">
              <!-- Icône boîte -->
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              
              <!-- Contenu principal -->
              <div class="flex-1">
                <h4 class="text-lg font-semibold">8 commandes à préparer</h4>
                <p class="text-sm text-gray-600">Pour livraison demain</p>
              </div>
            </div>
          
          
          <!-- Détails par catégorie -->
          <div class="grid grid-cols-3 gap-4 mb-6 bg-gray-50 p-4 display ">
            <div *ngFor="let category of orderCategories" class="text-center">
              <div class="text-lg font-bold text-gray-900">{{ category.count }}</div>
              <div class="text-xs text-gray-500">{{ category.products }}</div>
              <div class="text-sm text-gray-700 mt-1">{{ category.name }}</div>
            </div>
          </div>
          
          <!-- Bouton principal -->
          <div class="mb-4">
            <div class="flex justify-end">
                  <button class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                    Générer bon de préparation
                  </button>
            </div>

          </div>
          </div>
          <!-- Information complémentaire -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div class="flex items-start space-x-2">
              <!-- Icône info -->
              <div class="flex-shrink-0 mt-0.5">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_118_781)">
                        <path d="M10.0001 18.3337C14.6025 18.3337 18.3334 14.6027 18.3334 10.0003C18.3334 5.39795 14.6025 1.66699 10.0001 1.66699C5.39771 1.66699 1.66675 5.39795 1.66675 10.0003C1.66675 14.6027 5.39771 18.3337 10.0001 18.3337Z" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 13.3333V10" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 6.66699H10.0083" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_118_781">
                        <rect width="20" height="20" fill="white"/>
                        </clipPath>
                        </defs>
                </svg>

              </div>
              
              <div>
                <h5 class="text-sm font-medium text-blue-800">Planification hebdomadaire</h5>
                <p class="text-xs text-blue-600 mt-1">N'oubliez pas de valider le planning de livraison pour la semaine prochaine avant vendredi 16h.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </app-main-layout>
  `,
  styles: [`
    .fa, .fas {
      font-family: "Inter";
      font-weight: 600;
    }
    
    /* Ensure smooth scrolling on mobile */
    @media (max-width: 640px) {
      .overflow-x-auto {
        -webkit-overflow-scrolling: touch;
      }
    }
    
    /* Custom scrollbar for webkit browsers */
    .overflow-x-auto::-webkit-scrollbar {
      height: 6px;
    }
    
    .overflow-x-auto::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 3px;      
    }
    
    .overflow-x-auto::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }
    
    .overflow-x-auto::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  `]
})
export class DashboardLogComponent {
  // rôle forcé à 'log' pour ce composant
  role: 'log' = 'log';

  metricsData: MetricCard[] = [
    {
      title: 'Commandes fournisseurs',
      value: '12',
      subtitle: '3 en attente',
      subtitleDetail: 'Ce mois',
      icon: '/icones/commande.png',
      color: ''
    },
    {
      title: 'Stocks',
      value: '1,258',
      subtitle: '15 en alerte',
      subtitleDetail: 'Produits',
      icon: '/icones/stocks.png',
      color: ''
    },
    {
      title: 'Livraisons',
      value: '48',
      subtitle: '8 aujourd\'hui',
      subtitleDetail: 'Planifiées',
      icon: '/icones/livraison.png',
      color: ''
    },
    {
      title: 'Retours',
      value: '7',
      subtitle: '2 en attente',
      subtitleDetail: 'À traiter',
      icon: '/icones/retours.png',
      color: ''
    }
  ];

  plannedDeliveries: Delivery[] = [
    {
      reference: 'LIV-12345',
      client: 'Entreprise ABC',
      date: '15/07/2023',
      produits: 8,
      statut: 'Planifiée',
      statutColor: 'blue'
    },
    {
      reference: 'LIV-12346',
      client: 'Société XYZ',
      date: '15/07/2023',
      produits: 5,
      statut: 'En préparation',
      statutColor: 'yellow'
    },
    {
      reference: 'LIV-12347',
      client: 'Groupe 123',
      date: '16/07/2023',
      produits: 12,
      statut: 'Planifiée',
      statutColor: 'blue'
    },
    {
      reference: 'LIV-12348',
      client: 'Tech Solutions',
      date: '16/07/2023',
      produits: 3,
      statut: 'Planifiée',
      statutColor: 'blue'
    }
  ];

  stockAlerts: StockAlert[] = [
    {
      productName: 'Café en grains 1kg',
      currentStock: 5,
      alertThreshold: 10,
      supplier: 'Café Premium'
    },
    {
      productName: 'Papier A4 (ramette)',
      currentStock: 8,
      alertThreshold: 20,
      supplier: 'Office Plus'
    },
    {
      productName: 'Gel hydroalcoolique 500ml',
      currentStock: 3,
      alertThreshold: 15,
      supplier: 'Hygiène Pro'
    }
  ];

  orderCategories: OrderCategory[] = [
    {
      name: 'Alimentaire',
      count: 12,
      products: 'produits'
    },
    {
      name: 'Hygiène',
      count: 8,
      products: 'produits'
    },
    {
      name: 'Bureautique',
      count: 5,
      products: 'produits'
    }
  ];

  getStatusClass(color: string): string {
    const classes = {
      'blue': 'bg-blue-100 text-blue-800',
      'yellow': 'bg-yellow-100 text-yellow-800',
      'green': 'bg-green-100 text-green-800',
      'red': 'bg-red-100 text-red-800'
    };
    return classes[color as keyof typeof classes] || 'bg-gray-100 text-gray-800';
  }
}