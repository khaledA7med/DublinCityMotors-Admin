import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessagesService } from 'src/app/shared/services/messages.service';

interface Form {
  userName?: FormControl<string | null>;
  firstName?: FormControl<string | null>;
  lastName?: FormControl<string | null>;
  nickName?: FormControl<string | null>;
  email?: FormControl<string | null>;
  website?: FormControl<string | null>;
  facebookUrl?: FormControl<string | null>;
  instagramUrl?: FormControl<string | null>;
  linkedinUrl?: FormControl<string | null>;
  biographicalInfo?: FormControl<string | null>;
  newPaswword?: FormControl<string | null>;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  submit: boolean = false;
  profileForm!: FormGroup<Form>;
  isContactCollapsed: boolean = false;
  public Editor = ClassicEditor;
  public editorData = '<p>Hello, CKEditor 5!</p>';

  // Custom configuration for CKEditor
  public editorConfig = {
    placeholder: 'Start typing Your Biographical Info...',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private messages: MessagesService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

    this.initForm();
  }

  initForm() {
    this.profileForm = new FormGroup<Form>({
      userName: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      nickName: new FormControl(''),
      email: new FormControl(''),
      website: new FormControl(''),
      facebookUrl: new FormControl(''),
      instagramUrl: new FormControl(''),
      linkedinUrl: new FormControl(''),
      biographicalInfo: new FormControl(''),
      newPaswword: new FormControl(''),
    });
  }
  get f() {
    return this.profileForm.controls;
  }
  getEditorData({ editor }: ChangeEvent) {
    console.log(editor.data.get());
  }
  submitForm() {
    this.submit = true;
    console.log(this.profileForm.value);
    this.messages.toast('User Updated successfully', 'success');
  }
}
