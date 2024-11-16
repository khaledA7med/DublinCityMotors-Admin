import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  NgbCalendar,
  NgbCalendarIslamicUmalqura,
  NgbDateStruct,
  NgbInputDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [NgbInputDatepickerConfig, NgbCalendarIslamicUmalqura],
})
export class DatePickerComponent implements OnChanges {
  date!: NgbDateStruct;
  @Input() model!: any;
  @Input() readonly: boolean = false;
  @Input() submitted: boolean = false;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Output() dateChange: EventEmitter<any> = new EventEmitter();

  @Input() minDate: NgbDateStruct = this.calendar.getToday();
  @Input() maxDate: NgbDateStruct = { year: 2050, month: 12, day: 31 };

  constructor(
    config: NgbInputDatepickerConfig,
    public changeDate: NgbCalendarIslamicUmalqura,
    private calendar: NgbCalendar
  ) {
    config.minDate = this.calendar.getToday();
    config.maxDate = { year: 2099, month: 12, day: 31 };
    config.placement = ['top-end', 'top-start', 'bottom-end', 'bottom-start'];
  }

  ngOnChanges(): void {
    if (this.model) this.date = this.model;
    else this.date = { day: 0, year: 0, month: 0 };
  }

  get today() {
    this.onDateSelect(this.calendar.getToday());
    return this.calendar.getToday();
  }

  onDateSelect(e: any) {
    let hijri = this.changeDate.fromGregorian(
      new Date(`${e.year}-${e.month}-${e.day}`)
    );
    let obj = {
      gon: e,
      hijri,
    };
    this.dateChange.emit(obj);
  }
}
