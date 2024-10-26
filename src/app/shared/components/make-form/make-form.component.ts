import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessagesService } from '../../services/messages.service';
import { CarStaticDataService } from '../../services/car-data.service';
@Component({
  selector: 'app-make-form',
  templateUrl: './make-form.component.html',
  styleUrls: ['./make-form.component.scss'],
})
export class MakeFormComponent implements OnInit {
  makeForm!: FormGroup;
  submit: boolean = false;
  constructor(
    public modal: NgbActiveModal,
    private CarStaticDataService: CarStaticDataService,
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
    this.submit = true;
    this.CarStaticDataService.addMake(this.makeForm.value).subscribe(
      (res) => {
        this.submit = false;
        this.messages.toast('Make Added successfully', 'success');
        this.modal.close();
      },
      (error) => {
        this.messages.toast(error.error.message, 'error');
      }
    );
  }
  reset() {
    this.makeForm.reset();
  }
}
