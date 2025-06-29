import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LangDefinition, Translation, TranslocoService } from '@ngneat/transloco';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private availableLangues: LangDefinition[] = [];

  private selectedLang$: Subject<string> = new ReplaySubject<string>(1);
  private readonly lang: string = 'lang';

  private readonly _httpClient = inject(HttpClient);
  private readonly _translocoService = inject(TranslocoService);

  constructor() {
    this.availableLangues = this._translocoService.getAvailableLangs() as LangDefinition[];
    this.setSelectedLang(localStorage.getItem(this.lang) || this._translocoService.getActiveLang());
  }
  getAvailableLangues() {
    return this.availableLangues;
  }
  getSelectedLang(): Observable<string> {
    return this.selectedLang$.asObservable();
  }
  setSelectedLang(select: string) {
    localStorage.setItem(this.lang, select);
    this._translocoService.setActiveLang(select);
    this.selectedLang$.next(select);
  }

  // Custom method to handle custom paths
  getTranslationWithCustomPath(lang: string, path: string): Observable<Translation> {
    return this._httpClient.get<Translation>(`/assets/i18n/${lang}/${path}.json`);
  }
}
