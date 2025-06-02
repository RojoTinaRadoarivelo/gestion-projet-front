import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { Routes, RouterModule } from '@angular/router';
import { EssentialModule } from 'src/app/core/essential.module';
import { TranslationResolver } from 'src/app/core/translation/translation.resolver';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonFormModule } from 'src/app/core/common-form.module';
import { CardsModule } from 'src/app/core/components/cards/cards.module';

const forgotPwdRoute: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
    data: {
      // i18nPath: 'forgotpassword',
      i18nPath: ['forgotpassword', 'common'],
    },
    resolve: { translations: TranslationResolver },
  },
];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(forgotPwdRoute),
    CommonFormModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CardsModule,
    EssentialModule,
  ],
})
export class ForgotPasswordModule {}
