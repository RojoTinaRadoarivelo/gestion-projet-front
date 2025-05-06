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
  constructor(
    private _translocoService: TranslocoService,
    private _loadingService: LoadingService,
    private _translocoHttpLoader: TranslocoHttpLoader,
    private _translateService: TranslationService
  ) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const i18nPath = route.data['i18nPath'] ?? 'default';
    const lang = this._translocoService.getActiveLang();

    this._loadingService.show();

    try {
      let translation: any;
      if (i18nPath === 'default') {
        translation = await firstValueFrom(
          this._translocoHttpLoader.getTranslation(lang)
        );
      } else {
        translation = await firstValueFrom(
          this._translateService.getTranslationWithCustomPath(lang, i18nPath)
        );
      }
      this._translocoService.setTranslation(translation, lang, {
        merge: true,
      });

      return translation;
    } finally {
      this._loadingService.hide();
    }
  }
}
