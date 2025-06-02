import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { Routes, RouterModule } from '@angular/router';
import { EssentialModule } from 'src/app/core/essential.module';
import { TranslationResolver } from 'src/app/core/translation/translation.resolver';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CardsModule } from 'src/app/core/components/cards/cards.module';
import { CommonFormModule } from 'src/app/core/common-form.module';

const signUpRoute: Routes = [
  {
    path: '',
    component: SignUpComponent,
    data: {
      // i18nPath: 'signup',
      i18nPath: ['signup', 'common'],
    },
    resolve: { translations: TranslationResolver },
  },
];

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(signUpRoute),
    CommonFormModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CardsModule,
    EssentialModule,
  ],
  exports: [SignUpComponent],
})
export class SignUpModule {}
