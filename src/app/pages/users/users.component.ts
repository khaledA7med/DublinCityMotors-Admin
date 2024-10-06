import { DecimalPipe } from '@angular/common';
import {
  Component,
  OnInit,
  PipeTransform,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, Observable, startWith } from 'rxjs';
import { MessagesService } from 'src/app/shared/services/messages.service';

interface User {
  userName: string;
  name: string;
  email: string;
  role: string;
}

interface Form {
  email?: FormControl<string | null>;
  role?: FormControl<string | null>;
  userName?: FormControl<string | null>;
  firstName?: FormControl<string | null>;
  lastName?: FormControl<string | null>;
  password?: FormControl<string | null>;
}

const USERS: User[] = [
  {
    userName: 'zead sayed',
    name: 'zead',
    email: 'zead12@gmail.com ',
    role: 'Admin',
  },
  {
    userName: 'ahmed sayed',
    name: 'ahmed',
    email: 'ahmed55@gmail.com ',
    role: 'SEO',
  },
  {
    userName: 'khaled ahmed',
    name: 'khaled',
    email: 'khaled45@gmail.com ',
    role: 'Editor',
  },
  {
    userName: 'zead sayed',
    name: 'zead',
    email: 'zead12@gmail.com ',
    role: 'User',
  },
];

function search(text: string, pipe: PipeTransform): User[] {
  return USERS.filter((country) => {
    const term = text.toLowerCase();
    return (
      country.name.toLowerCase().includes(term) ||
      pipe.transform(country.email).includes(term) ||
      pipe.transform(country.role).includes(term) ||
      pipe.transform(country.name).includes(term) ||
      pipe.transform(country.userName).includes(term)
    );
  });
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DecimalPipe],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  filter = new FormControl('', { nonNullable: true });
  contentModal!: NgbModalRef;
  @ViewChild('content') content!: TemplateRef<any>;
  submit: boolean = false;
  userForm!: FormGroup<Form>;
  roles = [{ name: 'Administrator' }, { name: 'Editor' }, { name: 'SEO' }];

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private messages: MessagesService,
    pipe: DecimalPipe
  ) {
    this.users$ = this.filter.valueChanges.pipe(
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

  initForm() {
    this.userForm = new FormGroup<Form>({
      userName: new FormControl(''),
      email: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(''),
    });
  }
  get f() {
    return this.userForm.controls;
  }
  openAddModal() {
    this.contentModal = this.modalService.open(this.content, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });

    this.contentModal.hidden.subscribe(() => {});
  }
  submitForm() {
    this.submit = true;
    console.log(this.userForm.value);
    this.messages.toast('User created successfully', 'success');
  }

  reset() {
    this.userForm?.reset();
  }
}
