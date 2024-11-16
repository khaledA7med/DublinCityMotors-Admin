import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker.component';

@NgModule({
  declarations: [DatePickerComponent],
  imports: [CommonModule, NgbDatepickerModule, FormsModule, JsonPipe],
  exports: [DatePickerComponent, NgbDatepickerModule, JsonPipe],
})
export class DatePickerModule {}
