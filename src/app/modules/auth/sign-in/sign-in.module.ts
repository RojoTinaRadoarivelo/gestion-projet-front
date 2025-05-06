import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { RouterModule, Routes } from '@angular/router';
import { CardsModule } from 'src/app/core/components/cards/cards.module';
import { CommonFormModule } from 'src/app/core/common-form.module';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LanguagesModule } from 'src/app/core/languages/languages.module';
import { EssentialModule } from 'src/app/core/essential.module';
import { TranslationResolver } from 'src/app/core/translation/translation.resolver';

const signInRoute: Routes = [
  {
    path: '',
    component: SignInComponent,
    data: {
      i18nPath: 'signin',
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
