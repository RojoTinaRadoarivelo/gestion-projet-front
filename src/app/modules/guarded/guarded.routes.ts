import { Routes } from '@angular/router';

export const GUARDEDROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('../not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];
