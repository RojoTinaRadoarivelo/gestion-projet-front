import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private _httpClient: HttpClient) {}
  getTranslation(lang: string): Observable<Translation> {
    return this._httpClient.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}
