import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.scss'],
})
export class ModelFormComponent implements OnInit {
  modelForm!: FormGroup;
  makes = [
    { id: 1, name: 'Audi' },
    { id: 2, name: 'BMW' },
    { id: 3, name: 'Mercedes' },
  ];

  constructor(
    public modal: NgbActiveModal,
    private messages: MessagesService
  ) {}
  ngOnInit(): void {
    this.initMakeForm();
  }

  initMakeForm() {
    this.modelForm = new FormGroup({
      makeId: new FormControl(),
      modelName: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.modelForm.value);
    this.messages.toast('Model Added successfully', 'success');
    this.modal.close();
  }
  reset() {
    this.modelForm.reset();
  }
}
