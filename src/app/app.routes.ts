import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent)
  },
  {
    path: 'create-password', // ✅ Route corrigée pour CreatePasswordComponent
    loadComponent: () => import('./features/auth/create-password/create-password.component').then(c => c.CreatePasswordComponent)
  },
  {
    path: 'otp-verification',
    loadComponent: () => import('./features/auth/otp-verification/otp-verification.component').then(c => c.OtpVerificationComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./features/auth/reset-password/reset-password.component').then(c => c.ResetPasswordComponent)
  },
  {
    path: 'com/dashboard',
    loadComponent: () => import('./features/commercial/dashboard/dashboard.component').then(c => c.DashboardComponent)
  },
  //path for logistique dashboard module
  //  {
  //   path: 'log/dashboardlog',
  //   loadComponent: () => import('./features/logistique/dashboard/dashboardlog.component').then(c => c.DashboardLogComponent)
  // },
   {
    path: 'com/propection',
    loadComponent: () => import('./features/commercial/propection/propection.component').then(c => c.ProspectionComponent)
  },
  {
    path: 'com/salaries',
    loadComponent: () => import('./features/commercial/salaries/salaries.component').then(c => c.EmployeeManagementComponent)
  },
  {
    path: 'com/statistiques',
    loadComponent: () => import('./features/commercial/statistiques/statistiques.component').then(c => c.SalesStatisticsComponent)
  },
   {
    path: 'com/promotions',
    loadComponent: () => import('./features/commercial/promotions/promotions.component').then(c => c.PromotionsManagementComponent)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];