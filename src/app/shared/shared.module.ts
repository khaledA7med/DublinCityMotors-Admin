import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnquireCarModule } from './enquire-car/enquire-car.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  NgbAccordionModule,
  NgbCollapseModule,
  NgbDropdownModule,
  NgbTooltipModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from './dropzone/dropzone.module';
import { RouterModule } from '@angular/router';
import { MakeFormComponent } from './components/make-form/make-form.component';
import { ModelFormComponent } from './components/model-form/model-form.component';

@NgModule({
  declarations: [
    MakeFormComponent,
    ModelFormComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    EnquireCarModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbAccordionModule,
    NgbTooltipModule,
    DropzoneModule,
    RouterModule,
  ],
  exports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    EnquireCarModule,
    NgxSpinnerModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbAccordionModule,
    NgbTooltipModule,
    DropzoneModule,
    RouterModule,
  ],
})
export class SharedModule {}
