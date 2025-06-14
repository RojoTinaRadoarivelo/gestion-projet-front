import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { Routes, RouterModule } from '@angular/router';
import { EssentialModule } from './../../../core/essential.module';
import { TranslationResolver } from './../../../core/translation/translation.resolver';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CardsModule } from './../../../core/components/cards/cards.module';
import { CommonFormModule } from './../../../core/common-form.module';

const signUpRoute: Routes = [
  {
    path: '',
    component: SignUpComponent,
    data: {
      i18nPath: 'signup',
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
