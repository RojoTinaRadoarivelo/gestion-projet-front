import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

import { NavigationType } from './navigation.type';
import { ADMIN_NAVIGATION_EN, VISITOR_NAVIGATION_EN } from './navigation-en';
import { ADMIN_NAVIGATION_FR, VISITOR_NAVIGATION_FR } from './navigation-fr';
import { TranslationService } from 'src/app/core/translation/translation.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _navigationSubject: Subject<NavigationType> = new BehaviorSubject<NavigationType>(
    VISITOR_NAVIGATION_FR,
  );

  private _isVerticalMenuReduced: Subject<boolean> = new ReplaySubject<boolean>(1);

  navigation$: Observable<NavigationType> = this._navigationSubject.asObservable();

  isVerticalMenuReduced$: Observable<boolean> = this._isVerticalMenuReduced.asObservable();

  // need to erorganize menu to handle with gard and navigation perfectly and flexible code
  roleAccess: string[] = ['Super administrator'];

  private readonly _translateService = inject(TranslationService);

  setVmenuReduced(isReduced: boolean) {
    this._isVerticalMenuReduced.next(isReduced);
  }

  async setNavigation(roles: string[] = []) {
    let navigationByRoles: NavigationType = { horizontal: [], vertical: [] };

    // changing menus according to lang
    this._translateService.getSelectedLang().subscribe((curr) => {
      let adminNav: NavigationType | null = null;
      let visitorNav: NavigationType | null = null;
      switch (curr) {
        case 'en':
          adminNav = ADMIN_NAVIGATION_EN;
          visitorNav = VISITOR_NAVIGATION_EN;
          break;

        case 'ch':
          adminNav = ADMIN_NAVIGATION_EN;
          visitorNav = VISITOR_NAVIGATION_EN;
          break;

        default:
          adminNav = ADMIN_NAVIGATION_FR;
          visitorNav = VISITOR_NAVIGATION_FR;
          break;
      }

      if (roles.length > 0) {
        roles.forEach((role) => {
          switch (role) {
            case this.roleAccess[0]:
              navigationByRoles = { ...adminNav };
              break;
            // case 'b':
            //   navigationByRoles = {
            //     horizontal: [
            //       ...(navigationByRoles.horizontal! || []),
            //       ...(PROFESSOR_NAVIGATION.horizontal! || []),
            //     ],
            //     vertical: [
            //       ...(navigationByRoles.vertical! || []),
            //       ...(PROFESSOR_NAVIGATION.vertical! || []),
            //     ],
            //   };
            //   break;
            // case 'c':
            //   navigationByRoles = {
            //     horizontal: [
            //       ...(navigationByRoles.horizontal! || []),
            //       ...(STUDENT_NAVIGATION.horizontal! || []),
            //     ],
            //     vertical: [
            //       ...(navigationByRoles.vertical! || []),
            //       ...(STUDENT_NAVIGATION.vertical! || []),
            //     ],
            //   };
            //   break;
            // case 'd':
            //   navigationByRoles = {
            //     horizontal: [
            //       ...(navigationByRoles.horizontal! || []),
            //       ...(CLUB_ADMIN_NAVIGATION.horizontal! || []),
            //     ],
            //     vertical: [
            //       ...(navigationByRoles.vertical! || []),
            //       ...(CLUB_ADMIN_NAVIGATION.vertical! || []),
            //     ],
            //   };
            //   break;
            default:
              navigationByRoles = { ...visitorNav };
              break;
          }
        });
      } else {
        navigationByRoles = { ...visitorNav };
      }

      this._navigationSubject.next(navigationByRoles);
    });
  }
}
