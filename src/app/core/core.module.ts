import { NgModule, Optional, SkipSelf } from '@angular/core';
import { TranslocoRootModule } from './translation/transloco-root.module';
import { CommonIconModule } from './common-icon.module';
import { AuthModule } from '../modules/auth/auth.module';

@NgModule({
  imports: [AuthModule, CommonIconModule, TranslocoRootModule],
})
export class CoreModule {
  /**
   * Constructor
   */
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    // Do not allow multiple injections
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. Import this module in the AppModule only.',
      );
    }
  }
}
