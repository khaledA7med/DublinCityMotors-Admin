import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { JwtInterceptor } from '../core/helpers/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, AccountRoutingModule],
  providers: [
    {
      useClass: JwtInterceptor,
      multi: true,
      provide: HTTP_INTERCEPTORS,
    },
  ],
})
export class AccountModule {}
