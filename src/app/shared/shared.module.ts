import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { EnquireCarModule } from './enquire-car/enquire-car.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    EnquireCarModule,
    NgxSpinnerModule,
  ],
  exports: [
    NgSelectModule,
    NgSelectModule,
    FormsModule,
    EnquireCarModule,
    NgxSpinnerModule,
  ],
})
export class SharedModule {}
