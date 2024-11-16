import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './offers.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'src/app/shared/components/date-picker/date-picker.module';

const routes: Routes = [
  {
    path: 'offers',
    component: OffersComponent,
    data: { title: 'Offers' },
  },
];

@NgModule({
  declarations: [OffersComponent],
  imports: [
    CommonModule,
    SharedModule,
    DatePickerModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class OffersModule {}
