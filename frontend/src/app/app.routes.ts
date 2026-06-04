import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
  },
  {
    path: 'perfumes',
    loadComponent: () => import('./pages/catalog/catalog').then(m => m.CatalogComponent),
  },
  {
    path: 'perfumes/:id',
    loadComponent: () => import('./pages/perfume-detail/perfume-detail').then(m => m.PerfumeDetailComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password').then(m => m.ForgotPasswordComponent),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then(m => m.CartComponent),
  },
  {
  path: 'register',
  loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent),
},
];
