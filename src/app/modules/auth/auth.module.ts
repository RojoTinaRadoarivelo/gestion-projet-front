import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NoAuthGuard } from './../../core/guards/no-auth.guard';
import { AuthGuard } from './../../core/guards/auth.guard';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule, AuthRoutingModule],
  providers: [AuthService, NoAuthGuard, AuthGuard],
  exports: [AuthRoutingModule],
})
export class AuthModule {}
