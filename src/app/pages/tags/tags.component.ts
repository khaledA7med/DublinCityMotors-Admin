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
  desc: string;
}

interface Form {
  name?: FormControl<string | null>;
  slug?: FormControl<string | null>;
  desc?: FormControl<string | null>;
}

const COUNTRIES: Country[] = [
  {
    name: 'Test1',
    slug: 'Test1',
    desc: 'Test1',
  },
  {
    name: 'Test2',
    slug: 'test2',
    desc: 'Test2',
  },
  {
    name: 'Test3',
    slug: 'test3',
    desc: 'Test3',
  },
  {
    name: 'Test4',
    slug: 'test4',
    desc: 'Test4',
  },
];

function search(text: string, pipe: PipeTransform): Country[] {
  return COUNTRIES.filter((country) => {
    const term = text.toLowerCase();
    return (
      country.name.toLowerCase().includes(term) ||
      pipe.transform(country.slug).includes(term) ||
      pipe.transform(country.desc).includes(term)
    );
  });
}

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  providers: [DecimalPipe],
  encapsulation: ViewEncapsulation.None,
})
export class TagsComponent implements OnInit {
  countries$: Observable<Country[]>;
  filter = new FormControl('', { nonNullable: true });

  contentModal!: NgbModalRef;
  @ViewChild('content') content!: TemplateRef<any>;

  submit: boolean = false;

  tagsForm!: FormGroup<Form>;

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
    this.tagsForm = new FormGroup<Form>({
      name: new FormControl(''),
      slug: new FormControl(''),
      desc: new FormControl(''),
    });
  }
  get f() {
    return this.tagsForm.controls;
  }

  submitForm() {
    this.submit = true;
    console.log(this.tagsForm.value);
    this.messages.toast('Tag created successfully', 'success');
  }

  reset() {
    this.tagsForm.reset();
  }
}
