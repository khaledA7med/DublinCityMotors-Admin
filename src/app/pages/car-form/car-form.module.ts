import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarFormComponent } from './car-form.component';
import { RouterModule, Routes } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  NgbCollapseModule,
  NgbNavModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: CarFormComponent }];

@NgModule({
  declarations: [CarFormComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    CKEditorModule,
    NgbCollapseModule,
    NgbTooltipModule,
    NgbNavModule,
    FormsModule,
  ],
})
export class CarFormModule {}
