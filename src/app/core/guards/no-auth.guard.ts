import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<boolean | UrlTree>((resolve) => {
      this._authService
        .loadInfos()
        .pipe(
          map((isAuthenticated) => {
            if (isAuthenticated) {
              resolve(this._router.createUrlTree(['/home']));
            } else {
              resolve(true);
            }
          }),
        )
        .toPromise();
    });
  }
}
