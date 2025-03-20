import { NgModule } from '@angular/core';
import { GUARDEDROUTES } from './guarded.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(GUARDEDROUTES)],
  exports: [RouterModule],
})
export class GuardedRoutingModule {}
