import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APPROUTES } from './routes';

@NgModule({
  imports: [RouterModule.forRoot(APPROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
