import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { Routes, RouterModule } from '@angular/router';
import { EssentialModule } from 'src/app/core/essential.module';
import { TranslationResolver } from 'src/app/core/translation/translation.resolver';

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
  imports: [CommonModule, RouterModule.forChild(signUpRoute), EssentialModule],
})
export class SignUpModule {}
