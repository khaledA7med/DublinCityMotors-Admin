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
  img: string;
  name: string;
  slug: string;
  parentCategory: string;
  displayType: string;
  desc: string;
}

interface Form {
  name?: FormControl<string | null>;
  slug?: FormControl<string | null>;
  desc?: FormControl<string | null>;
  parentCategory?: FormControl<string | null>;
  displayType?: FormControl<string | null>;
  img?: FormControl<File | null>;
}
interface makeForm {
  make?: FormControl<string | null>;
  model?: FormControl<string | null>;
}

const COUNTRIES: Country[] = [
  {
    img: 'f/f3/Flag_of_Russia.svg',
    name: 'Test1',
    slug: 'Test1',
    parentCategory: 'Test1',
    displayType: 'Test1',
    desc: 'Test1',
  },
  {
    img: 'c/cf/Flag_of_Canada.svg',
    name: 'Test2',
    slug: 'test2',
    parentCategory: 'Test2',
    displayType: 'Test2',
    desc: 'Test2',
  },
  {
    img: 'a/a4/Flag_of_the_United_States.svg',
    name: 'Test3',
    slug: 'test3',
    parentCategory: 'Test3',
    displayType: 'Test3',
    desc: 'Test3',
  },
  {
    img: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    name: 'Test4',
    slug: 'test4',
    parentCategory: 'Test4',
    displayType: 'Test4',
    desc: 'Test4',
  },
];

function search(text: string, pipe: PipeTransform): Country[] {
  return COUNTRIES.filter((country) => {
    const term = text.toLowerCase();
    return (
      country.name.toLowerCase().includes(term) ||
      pipe.transform(country.slug).includes(term) ||
      pipe.transform(country.parentCategory).includes(term) ||
      pipe.transform(country.displayType).includes(term) ||
      pipe.transform(country.desc).includes(term)
    );
  });
}
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [DecimalPipe],
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesComponent implements OnInit {
  countries$: Observable<Country[]>;
  filter = new FormControl('', { nonNullable: true });

  contentModal!: NgbModalRef;
  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild('makeContent') makeContent!: TemplateRef<any>;

  submit: boolean = false;

  categoriesForm!: FormGroup<Form>;
  makeForm!: FormGroup<makeForm>;

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
    this.initMakeForm();
  }

  openAddModal() {
    this.contentModal = this.modalService.open(this.content, {
      centered: true,
      size: 'lg',
    });

    this.contentModal.hidden.subscribe(() => {});
  }

  openMakeModal() {
    this.contentModal = this.modalService.open(this.makeContent, {
      centered: true,
      size: 'lg',
    });

    this.contentModal.hidden.subscribe(() => {});
  }

  initForm() {
    this.categoriesForm = new FormGroup<Form>({
      name: new FormControl(''),
      slug: new FormControl(''),
      parentCategory: new FormControl(''),
      displayType: new FormControl(''),
      desc: new FormControl(''),
    });
  }
  initMakeForm() {
    this.makeForm = new FormGroup<makeForm>({
      make: new FormControl(''),
      model: new FormControl(''),
    });
  }
  get f() {
    return this.categoriesForm.controls;
  }

  submitForm() {
    this.submit = true;
    console.log(this.categoriesForm.value);
    this.messages.toast('Category created successfully', 'success');
  }
  onSubmit() {
    this.submit = true;
    console.log(this.makeForm.value);
    this.messages.toast('Category created successfully', 'success');
    this.reset();
  }

  reset() {
    this.categoriesForm.reset();
    this.makeForm.reset();
  }
}
