import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { RouterModule, Routes } from '@angular/router';
import { CardsModule } from './../../../core/components/cards/cards.module';
import { CommonFormModule } from './../../../core/common-form.module';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LanguagesModule } from './../../../core/languages/languages.module';
import { EssentialModule } from './../../../core/essential.module';
import { TranslationResolver } from './../../../core/translation/translation.resolver';

const signInRoute: Routes = [
  {
    path: '',
    component: SignInComponent,
    data: {
      // i18nPath: 'signin',
      i18nPath: ['signin', 'common', 'forgotpassword', 'signup'],
    },
    resolve: { translations: TranslationResolver },
  },
];

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(signInRoute),
    CommonFormModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CardsModule,
    LanguagesModule,
    EssentialModule,
  ],
})
export class SignInModule {}
