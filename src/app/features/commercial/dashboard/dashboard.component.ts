import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../../../core/layouts/main-layout/main-layout.component';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: string;
}

interface Prospect {
  company: string;
  contact: string;
  status: string;
  statusColor: string;
}

interface PartnerCompany {
  name: string;
  registeredEmployees: number;
  orders: number;
  totalAmount: string;
  status: 'Active' | 'En attente';
}

@Component({
  selector: 'app-commercial-dashboard',
  standalone: true,
  imports: [CommonModule, MainLayoutComponent],
  template: `
    <app-main-layout>
      <!-- Metrics Cards -->
      <div class="flex items-center justify-between mb-2" >
     <h1 class="text-3xl font-bold text-gray-900"> Tableau de bord commercial</h1>
     <div class="flex items-center space-x-4">
       
       <button class="bg-blue-950 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-blue-700 transition-colors">
         <i class="fas fa-plus mr-0"></i>
         <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.87097 8H13.2043" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.5376 3.33337V12.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"class="mr-8"/>
</svg>
          Nouvelle Prospection 
       </button>
     </div>
   </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        
        <div *ngFor="let metric of metricsData" class="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
          
          <div class="flex items-center justify-between mb-4">
            
            <div class="text-sm text-gray-600">{{ metric.title }} 
            </div>
            <img [src]="metric.icon" class="text-gray-400 text-lg">
          </div>
          <div class="text-3xl font-bold text-gray-900 mb-4">{{ metric.value }}</div>
          <div class="flex items-center text-sm">
            <span 
              class="font-medium"
              [class.text-green-600]="metric.changeType === 'positive'"
              [class.text-red-600]="metric.changeType === 'negative'"
            >
              {{ metric.change }}
            </span>
            
          </div>
          
        </div>
      </div>

      <!-- Charts and Tables Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <!-- Sales Evolution Chart -->
        <div class="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Évolution des ventes</h3>
          <div class="relative">
            <div class="h-64 flex items-end justify-between px-4 border-b border-l border-gray-200">
              <!-- X-axis labels -->
              <div class="absolute -bottom-6 left-8 text-xs text-gray-500">Jan</div>
              <div class="absolute -bottom-6 left-1/4 text-xs text-gray-500">Fév</div>
              <div class="absolute -bottom-6 left-2/4 text-xs text-gray-500">Mar</div>
              <div class="absolute -bottom-6 right-1/4 text-xs text-gray-500">Avr</div>
              <div class="absolute -bottom-6 right-8 text-xs text-gray-500">Mai</div>
              
              <!-- Y-axis labels -->
              <div class="absolute -left-10 bottom-0 text-xs text-gray-500">0</div>
              <div class="absolute -left-10 bottom-12 text-xs text-gray-500">1500</div>
              <div class="absolute -left-10 bottom-24 text-xs text-gray-500">3000</div>
              <div class="absolute -left-10 bottom-36 text-xs text-gray-500">4500</div>
              <div class="absolute -left-8 top-4 text-xs text-gray-500">6000</div>
              
              <!-- Chart line -->
              <svg class="absolute inset-0 w-full h-full" viewBox="0 0 300 240" preserveAspectRatio="none">
                <polyline 
                  fill="none" 
                  stroke="#3B82F6" 
                  stroke-width="3"
                  points="30,180 80,160 140,120 200,140 270,100"
                />
                <!-- Data points -->
                <circle cx="30" cy="180" r="4" fill="#3B82F6"/>
                <circle cx="80" cy="160" r="4" fill="#3B82F6"/>
                <circle cx="140" cy="120" r="4" fill="#3B82F6"/>
                <circle cx="200" cy="140" r="4" fill="#3B82F6"/>
                <circle cx="270" cy="100" r="4" fill="#3B82F6"/>
                
                <!-- Gradient fill under the curve -->
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:0.05" />
                  </linearGradient>
                </defs>
                <polygon 
                  fill="url(#chartGradient)"
                  points="30,180 80,160 140,120 200,140 270,100 270,240 30,240"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Recent Prospects -->
        <div class="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Prospects récents</h3>
            <button class="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
              Voir tous les prospects
            </button>
          </div>
          <div class="space-y-5">
            <div *ngFor="let prospect of recentProspects"
                 class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div class="flex items-center">
                
                <div class="rounded-lg ">
                  
                  <div class="font-medium text-gray-900 text-2xs">{{ prospect.company }}</div>
                  <div class="text-2xs text-gray-500 b-6">Contact:  {{ prospect.contact }}</div>
                  <div [class]="getStatusClass(prospect.statusColor)">Contact: {{ prospect.status }}</div>
                  
                </div>
              </div>
              <div class="flex items-center">
                <svg width="14" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.64172 7H11.8084" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.7251 2.91663L11.8084 6.99996L7.7251 11.0833" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                <span 
                  class="text-3xs px-3 py-0  font-medium"
                  
                >
                  Détails
                </span>
                <i class="fas fa-chevron-right text-gray-400 text-xs ml-3"></i>
              </div>
            </div>
          </div>
          <div class="text-center">
          <button routerLink="/profil" class="text-black-600 text-2xs  bg-transparent border-none cursor-pointer">
            Voir tous les prospects
          </button>
</div>

        </div>
      </div>

      <!-- Partner Companies Table -->
      <div class="mt-8">
        <div class="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">Entreprises partenaires</h2>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entreprise</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salariés inscrits</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commandes</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant total</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let company of partnerCompanies" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ company.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ company.registeredEmployees }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ company.orders }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {{ company.totalAmount }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                          class="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full"
                          [ngClass]="{
                            'bg-green-100 text-green-800': company.status === 'Active',
                            'bg-yellow-100 text-yellow-800': company.status === 'En attente'
                          }"
                        >
                          <!-- Icône Active -->
                          <img *ngIf="company.status === 'Active'" src="/icones/actif.svg" alt="Actif" class="w-4 h-4 mr-1" />

                        <!-- Icône Inactive -->
                        <img *ngIf="company.status === 'En attente'" src="/icones/attente.svg" alt="Inactif" class="w-4 h-4 mr-1" />
                        
                          {{ company.status }}
                      </span>

                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button class="text-gray-600 hover:text-gray-900 px-3 py-1 border border-gray-300 rounded text-xs">
                      Détails
                    </button>
                    <button class="bg-blue-950 hover:bg-blue-800 text-white px-3 py-1 rounded text-xs">
                      Gérer
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
    
    .fa-building::before { content: ; }
    .fa-user-friends::before { content: "👥"; }
    .fa-euro-sign::before { content: "€"; }
    .fa-trophy::before { content: "🏆"; }
    .fa-chevron-right::before { content: ""; }
  `]
}) 


export class DashboardComponent {
  metricsData: MetricCard[] = [
    {
      title: 'Entreprises',
      value: '24',
      change: '+2 Partenaires actifs',
      changeType: 'positive',
      icon: 'icones/entreprise.svg'
    },
    {
      title: 'Salariés',
      value: '458',
      change: '+15 Inscrits ce mois',
      changeType: 'positive',
      icon: 'icones/salaries2.svg'
    },
    {
      title: 'Ventes',
      value: '18,250€',
      change: '+12% Ce mois',
      changeType: 'positive',
      icon: 'icones/vente.svg'
    },
    {
      title: 'Promotions',
      value: '3',
      change: 'Actives En cours',
      changeType: 'positive',
      icon: 'icones/promo.svg'
    }
    
    
  ];

  recentProspects: Prospect[] = [
    {
      company: 'Entreprise LAMI',
      contact: 'Pierre Dupont',
      status: 'Intéressé',
      statusColor: 'green'
    },
    {
      company: 'Société PQR',
      contact: 'Jean Martin',
      status: 'Relances',
      statusColor: 'yellow'
    },
    {
      company: 'Groupe 456',
      contact: 'Sophie Lefebvre',
      status: 'Rendez-vous',
      statusColor: 'blue'
    }
  ];

  partnerCompanies: PartnerCompany[] = [
    {
      name: 'Entreprise ABC',
      registeredEmployees: 85,
      orders: 156,
      totalAmount: '12,450€',
      status: 'Active'
    },
    {
      name: 'Société XYZ',
      registeredEmployees: 42,
      orders: 78,
      totalAmount: '8,320€',
      status: 'Active'
    },
    {
      name: 'Groupe 123',
      registeredEmployees: 23,
      orders: 34,
      totalAmount: '3,670€',
      status: 'En attente'
    },
    {
      name: 'Tech Solutions',
      registeredEmployees: 67,
      orders: 112,
      totalAmount: '9,840€',
      status: 'Active'
    }
  ];

  getInitials(company: string): string {
    return company.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
  }

  getStatusClass(color: string): string {
    const classes = {
      'yellow': 'bg-yellow-100 text-yellow-800',
      'blue': 'bg-blue-100 text-blue-800',
      'green': 'bg-green-100 text-green-800'
    };
    return classes[color as keyof typeof classes] || 'bg-gray-100 text-gray-800';
  }
}