import { Routes } from '@angular/router';
import { GuardedComponent } from './guarded.component';

export const GUARDEDROUTES: Routes = [
  {
    path: '',
    component: GuardedComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
  {
    path: 'not-found',
    loadChildren: () => import('../not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];
