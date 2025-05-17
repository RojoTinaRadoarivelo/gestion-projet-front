import { NgModule } from '@angular/core';

import { GuardedRoutingModule } from './guarded-routing.module';
import { GuardedComponent } from './guarded.component';

@NgModule({
  declarations: [
    GuardedComponent
  ],
  imports: [GuardedRoutingModule],
  exports: [GuardedRoutingModule],
})
export class GuardedModule {}
