import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'catalog',
    loadComponent: () => import('./modules/catalog/catalog.component').then((c) => c.CatalogComponent),
  },
  {
    path: '**',
    redirectTo: 'catalog'
  }
];
