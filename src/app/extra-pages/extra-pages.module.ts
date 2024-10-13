import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraPagesRoutingModule } from './extra-pages-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { Error401Component } from './error401/error401.component';

@NgModule({
  declarations: [NotFoundComponent, Error401Component],
  imports: [CommonModule, ExtraPagesRoutingModule],
})
export class ExtraPagesModule {}
