import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesComponent } from './languages.component';
import { EssentialModule } from '../essential.module';

@NgModule({
  declarations: [LanguagesComponent],
  imports: [CommonModule, EssentialModule],
  exports: [LanguagesComponent, EssentialModule],
})
export class LanguagesModule {}
