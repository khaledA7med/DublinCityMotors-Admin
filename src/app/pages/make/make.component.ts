import { DecimalPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  PipeTransform,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  NgbModal,
  NgbModalRef,
  NgbOffcanvas,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { MakeFormComponent } from 'src/app/shared/components/make-form/make-form.component';
import { CarStaticDataService } from 'src/app/shared/services/car-data.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

interface Make {
  id: number;
  makeName: string;
}

const MAKES: Make[] = [
  {
    id: 1,
    makeName: 'BMW',
  },
  {
    id: 2,
    makeName: 'Audi',
  },
  {
    id: 3,
    makeName: 'Honda',
  },
  {
    id: 4,
    makeName: 'Toyota',
  },
];

function search(text: string, pipe: PipeTransform): Make[] {
  return MAKES.filter((car) => {
    const term = text.toLowerCase();
    return (
      car.makeName.toLowerCase().includes(term) ||
      car.id!.toString().includes(term)
    );
  });
}

@Component({
  selector: 'app-make',
  templateUrl: './make.component.html',
  styleUrls: ['./make.component.scss'],
  providers: [DecimalPipe],
  encapsulation: ViewEncapsulation.None,
})
export class MakeComponent implements OnInit {
  @ViewChild('makeFilter') makeFilter!: ElementRef;
  modalRef!: NgbModalRef;
  filterForm!: FormGroup;
  make: any;
  subscribe: Subscription[] = [];

  countries$: Observable<Make[]>;
  filter = new FormControl('', { nonNullable: true });
  constructor(
    private messages: MessagesService,
    private spinner: NgxSpinnerService,
    private CarStaticDataService: CarStaticDataService,
    private offcanvasService: NgbOffcanvas,
    private modalService: NgbModal,
    pipe: DecimalPipe
  ) {
    this.countries$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => search(text, pipe))
    );
  }
  ngOnInit(): void {
    this.getAllMake();
    this.initForm();
  }

  initForm() {
    this.filterForm = new FormGroup({
      name: new FormControl(),
    });
  }

  getAllMake() {
    console.log('loll');

    this.spinner.show();
    return this.CarStaticDataService.getAllMake().subscribe(
      (res) => {
        if (res) {
          this.spinner.hide();
          this.make = res;
        }
      },
      (error) => {
        this.spinner.hide();
        this.messages.toast(error.error.message, 'error');
      }
    );
  }
  openFilterOffcanvas(): void {
    this.offcanvasService.open(this.makeFilter, { position: 'end' });
  }

  openMakeModal() {
    this.modalRef = this.modalService.open(MakeFormComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });
    let sub = this.modalRef.closed.subscribe(() => this.getAllMake());
    this.subscribe.push(sub);
  }
}
