import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessagesService } from '../../services/messages.service';
import { CarStaticDataService } from '../../services/car-data.service';

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
    private CarStaticDataService: CarStaticDataService,
    private messages: MessagesService
  ) {}
  ngOnInit(): void {
    this.getAllMake();
    this.initMakeForm();
  }

  initMakeForm() {
    this.modelForm = new FormGroup({
      makeId: new FormControl(),
      year: new FormControl(),
      name: new FormControl(''),
    });
  }

  getAllMake() {
    return this.CarStaticDataService.getAllMake().subscribe(
      (res) => {
        if (res) {
          this.makes = res;
        }
      },
      (error) => {
        this.messages.toast(error.error.message, 'error');
      }
    );
  }

  onSubmit() {
    this.CarStaticDataService.addModel(this.modelForm.value).subscribe(
      (res) => {
        this.messages.toast('Make Added successfully', 'success');
        this.modal.close();
      },
      (error) => {
        this.messages.toast(error.error.message, 'error');
      }
    );
  }
  reset() {
    this.modelForm.reset();
  }
}
