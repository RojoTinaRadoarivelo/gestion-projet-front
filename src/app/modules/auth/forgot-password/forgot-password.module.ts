import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { Routes, RouterModule } from '@angular/router';
import { EssentialModule } from 'src/app/core/essential.module';
import { TranslationResolver } from 'src/app/core/translation/translation.resolver';

const forgotPwdRoute: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
    data: {
      i18nPath: 'forgotpassword',
    },
    resolve: { translations: TranslationResolver },
  },
];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(forgotPwdRoute),
    EssentialModule,
  ],
})
export class ForgotPasswordModule {}
