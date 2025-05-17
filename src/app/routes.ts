import { Routes } from '@angular/router';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';

export const APPROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/guarded/guarded.module').then((m) => m.GuardedModule),
  },
  // {
  //   path: 'home',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./modules/guarded/guarded.module').then((m) => m.GuardedModule),
  // },
];
