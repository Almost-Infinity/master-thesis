import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./modules/home/home.component').then((c) => c.HomeComponent)
  },
  {
    path: '',
    loadComponent: () => import('./components/layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: 'catalog',
        loadComponent: () => import('./modules/catalog/catalog.component').then((c) => c.CatalogComponent)
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
