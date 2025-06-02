import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { firstValueFrom } from 'rxjs';
import { TranslationService } from './translation.service';

import { TranslocoHttpLoader } from './transloco-loader';
import { LoadingService } from '../services/loading.service';

@Injectable({ providedIn: 'root' })
export class TranslationResolver implements Resolve<any> {
  translationResponse: any;
  constructor(
    private _translocoService: TranslocoService,
    private _loadingService: LoadingService,
    private _translocoHttpLoader: TranslocoHttpLoader,
    private _translateService: TranslationService
  ) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const i18nPaths: string[] = Array.isArray(route.data['i18nPath'])
      ? route.data['i18nPath']
      : [route.data['i18nPath'] ?? 'default'];

    const lang = this._translocoService.getActiveLang();

    this._loadingService.show();

    try {
      this.translationResponse = i18nPaths.some((el) => el == 'default')
        ? await firstValueFrom(this._translocoHttpLoader.getTranslation(lang))
        : null;

      if (!this.translationResponse) {
        this._translateService
          .getTranslationsWithCustomPath(lang, i18nPaths)
          .subscribe((commonData) => {
            this.translationResponse = {
              ...commonData,
            };

            this._translocoService.setTranslation(
              this.translationResponse,
              lang,
              {
                merge: true,
              }
            );
          });
      }

      return this.translationResponse;
    } finally {
      this._loadingService.hide();
    }
  }
}
