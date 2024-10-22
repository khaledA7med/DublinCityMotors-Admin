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
import { ModelFormComponent } from 'src/app/shared/components/model-form/model-form.component';
import { CarStaticDataService } from 'src/app/shared/services/car-data.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

interface Model {
  id: number;
  makeName: string;
  modelName: string;
}

const MODELS: Model[] = [
  {
    id: 1,
    makeName: 'BMW',
    modelName: 'A1',
  },
  {
    id: 2,
    makeName: 'Audi',
    modelName: 'A2',
  },
  {
    id: 3,
    makeName: 'Honda',
    modelName: 'Q1',
  },
  {
    id: 4,
    makeName: 'Toyota',
    modelName: 'Q2',
  },
];

function search(text: string, pipe: PipeTransform): Model[] {
  return MODELS.filter((car) => {
    const term = text.toLowerCase();
    return (
      car.makeName.toLowerCase().includes(term) ||
      car.id!.toString().includes(term) ||
      car.modelName.toLowerCase().includes(term)
    );
  });
}
@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
  providers: [DecimalPipe],
  encapsulation: ViewEncapsulation.None,
})
export class ModelComponent implements OnInit {
  @ViewChild('makeFilter') makeFilter!: ElementRef;
  modalRef!: NgbModalRef;
  filterForm!: FormGroup;
  make: any;
  subscribe: Subscription[] = [];

  countries$: Observable<Model[]>;
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
    this.getAllModels();
    this.initForm();
  }

  initForm() {
    this.filterForm = new FormGroup({
      name: new FormControl(),
    });
  }

  getAllModels() {
    this.spinner.show();
    return this.CarStaticDataService.getAllModels().subscribe(
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

  openModelModal() {
    this.modalRef = this.modalService.open(ModelFormComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });
    let sub = this.modalRef.closed.subscribe(() => this.getAllModels());
    this.subscribe.push(sub);
  }
}
