import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessagesService } from '../../services/messages.service';
@Component({
  selector: 'app-make-form',
  templateUrl: './make-form.component.html',
  styleUrls: ['./make-form.component.scss'],
})
export class MakeFormComponent implements OnInit {
  makeForm!: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    private messages: MessagesService
  ) {}
  ngOnInit(): void {
    this.initMakeForm();
  }

  initMakeForm() {
    this.makeForm = new FormGroup({
      name: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.makeForm.value);
    this.messages.toast('Make Added successfully', 'success');
    this.modal.close();
  }
  reset() {
    this.makeForm.reset();
  }
}
