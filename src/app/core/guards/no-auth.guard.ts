import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private readonly _authService: AuthService,
    private _router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise<boolean | UrlTree>((resolve, reject) => {
      this._authService
        .loadInfos()
        .pipe(
          map((isAuthenticated) => {
            if (isAuthenticated) {
              resolve(this._router.createUrlTree(['/home']));
            } else {
              resolve(true);
            }
          })
        )
        .toPromise();
    });
  }
}
