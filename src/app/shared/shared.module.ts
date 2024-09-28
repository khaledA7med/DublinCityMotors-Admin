import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnquireCarModule } from './enquire-car/enquire-car.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  NgbDropdownModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    EnquireCarModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
  ],
  exports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    EnquireCarModule,
    NgxSpinnerModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
  ],
})
export class SharedModule {}
