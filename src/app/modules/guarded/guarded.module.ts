import { NgModule } from '@angular/core';

import { GuardedRoutingModule } from './guarded-routing.module';
import { GuardedComponent } from './guarded.component';
import { LanguagesModule } from 'src/app/core/languages/languages.module';

@NgModule({
  declarations: [GuardedComponent],
  imports: [GuardedRoutingModule, LanguagesModule],
  exports: [GuardedRoutingModule],
})
export class GuardedModule {}
