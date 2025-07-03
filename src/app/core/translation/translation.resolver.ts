import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Translation, TranslocoService } from '@ngneat/transloco';
import { firstValueFrom } from 'rxjs';
import { TranslationService } from './translation.service';

import { TranslocoHttpLoader } from './transloco-loader';
import { LoadingService } from '../services/loading.service';

@Injectable({ providedIn: 'root' })
export class TranslationResolver implements Resolve<Translation> {
  private readonly _translocoService = inject(TranslocoService);
  private readonly _loadingService = inject(LoadingService);
  private readonly _translocoHttpLoader = inject(TranslocoHttpLoader);
  private readonly _translateService = inject(TranslationService);

  async resolve(route: ActivatedRouteSnapshot) {
    const i18nPaths: string[] = Array.isArray(route.data['i18nPath'])
      ? route.data['i18nPath']
      : [route.data['i18nPath'] ?? 'default'];
    const lang = this._translocoService.getActiveLang();

    this._loadingService.show();

    try {
      let translation: Translation | null;

      translation = i18nPaths.some((el) => el == 'default')
        ? await firstValueFrom(this._translocoHttpLoader.getTranslation(lang))
        : null;

      if (!translation) {
        this._translateService
          .getTranslationsWithCustomPath(lang, i18nPaths)
          .subscribe((commonData) => {
            translation = {
              ...commonData,
            };

            this._translocoService.setTranslation(translation, lang, {
              merge: true,
            });
          });
      }

      return translation;
    } finally {
      this._loadingService.hide();
    }
  }
}
