import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { Routes, RouterModule } from '@angular/router';

const forgotPwdRoute: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
  },
];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [CommonModule, RouterModule.forChild(forgotPwdRoute)],
})
export class ForgotPasswordModule {}
