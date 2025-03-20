import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { Routes, RouterModule } from '@angular/router';

const signUpRoute: Routes = [
  {
    path: '',
    component: SignUpComponent,
  },
];

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, RouterModule.forChild(signUpRoute)],
})
export class SignUpModule {}
