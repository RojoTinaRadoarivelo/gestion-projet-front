import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AUTHROUTES } from './auth.routes';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(AUTHROUTES)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
