import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraPagesRoutingModule } from './extra-pages-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, ExtraPagesRoutingModule],
})
export class ExtraPagesModule {}
