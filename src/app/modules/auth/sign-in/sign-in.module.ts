import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { RouterModule, Routes } from '@angular/router';
const signInRoute: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
];

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, RouterModule.forChild(signInRoute)],
})
export class SignInModule {}
