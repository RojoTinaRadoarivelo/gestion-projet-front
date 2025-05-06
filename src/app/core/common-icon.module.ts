import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({})
export class CommonIconModule {
  constructor(
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer
  ) {
    this._matIconRegistry.addSvgIconSetInNamespace(
      'scratch-icon',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/customs.svg'
      )
    );
  }
}
