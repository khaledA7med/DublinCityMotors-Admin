import { DecimalPipe } from '@angular/common';
import {
  Component,
  OnInit,
  PipeTransform,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, Observable, startWith } from 'rxjs';
import { MessagesService } from 'src/app/shared/services/messages.service';

interface Country {
  name: string;
  slug: string;
  parentCategory: string;
  displayType: string;
  terms: string;
}

interface Form {
  name?: FormControl<string | null>;
  slug?: FormControl<string | null>;
  parentCategory?: FormControl<string | null>;
  displayType?: FormControl<string | null>;
}

const COUNTRIES: Country[] = [
  {
    name: 'Test1',
    slug: 'Test1',
    parentCategory: 'Test1',
    displayType: 'Test1',
    terms: 'Test1',
  },
  {
    name: 'Test2',
    slug: 'test2',
    parentCategory: 'Test2',
    displayType: 'Test2',
    terms: 'Test2',
  },
  {
    name: 'Test3',
    slug: 'test3',
    parentCategory: 'Test3',
    displayType: 'Test3',
    terms: 'Test3',
  },
  {
    name: 'Test4',
    slug: 'test4',
    parentCategory: 'Test4',
    displayType: 'Test4',
    terms: 'Test4',
  },
];

function search(text: string, pipe: PipeTransform): Country[] {
  return COUNTRIES.filter((country) => {
    const term = text.toLowerCase();
    return (
      country.name.toLowerCase().includes(term) ||
      pipe.transform(country.slug).includes(term) ||
      pipe.transform(country.parentCategory).includes(term) ||
      pipe.transform(country.terms).includes(term) ||
      pipe.transform(country.displayType).includes(term)
    );
  });
}
@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss'],
  providers: [DecimalPipe],
  encapsulation: ViewEncapsulation.None,
})
export class AttributesComponent implements OnInit {
  countries$: Observable<Country[]>;
  filter = new FormControl('', { nonNullable: true });

  contentModal!: NgbModalRef;
  @ViewChild('content') content!: TemplateRef<any>;

  submit: boolean = false;

  attributesForm!: FormGroup<Form>;

  categories = [{ name: 'Audi' }, { name: 'BMW' }, { name: 'Mercedes' }];

  types = [{ name: 'Audi' }, { name: 'BMW' }, { name: 'Mercedes' }];

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private messages: MessagesService,
    pipe: DecimalPipe
  ) {
    this.countries$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => search(text, pipe))
    );
  }
  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

    this.initForm();
  }

  openAddModal() {
    this.contentModal = this.modalService.open(this.content, {
      centered: true,
      size: 'lg',
    });

    this.contentModal.hidden.subscribe(() => {});
  }

  initForm() {
    this.attributesForm = new FormGroup<Form>({
      name: new FormControl(''),
      slug: new FormControl(''),
      parentCategory: new FormControl(''),
      displayType: new FormControl(''),
    });
  }
  get f() {
    return this.attributesForm.controls;
  }

  submitForm() {
    this.submit = true;
    console.log(this.attributesForm.value);
    this.messages.toast('Attribute created successfully', 'success');
  }

  reset() {
    this.attributesForm.reset();
  }
}
