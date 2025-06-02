import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Translation, TranslocoService } from '@ngneat/transloco';
import { Observable, ReplaySubject, Subject, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private availableLangues: any[] = [];

  private selectedLang$: Subject<string> = new ReplaySubject<string>(1);
  private readonly lang: string = 'lang';

  constructor(
    private _httpClient: HttpClient,
    private translocoService: TranslocoService
  ) {
    this.availableLangues = this.translocoService.getAvailableLangs();
    this.setSelectedLang(
      localStorage.getItem(this.lang) || translocoService.getActiveLang()
    );
  }
  getAvailableLangues() {
    return this.availableLangues;
  }
  getSelectedLang(): Observable<string> {
    return this.selectedLang$.asObservable();
  }
  setSelectedLang(select: string) {
    localStorage.setItem(this.lang, select);
    this.translocoService.setActiveLang(select);
    this.selectedLang$.next(select);
  }

  // Custom method to handle custom paths
  getTranslationWithCustomPath(
    lang: string,
    path: string
  ): Observable<Translation> {
    return this._httpClient.get<Translation>(
      `/assets/i18n/${lang}/${path}.json`
    );
  }
  // parcours custom paths
  getTranslationsWithCustomPath(
    lang: string,
    paths: string[]
  ): Observable<Translation> {
    const requests = paths.map((path) =>
      this._httpClient.get<Translation>(`/assets/i18n/${lang}/${path}.json`)
    );

    return forkJoin(requests).pipe(
      map(
        (translations: Translation[]) => Object.assign({}, ...translations) // fusionne tous les objets
      )
    );
  }
}
