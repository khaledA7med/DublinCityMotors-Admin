import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { Category, Option, Type } from 'src/app/shared/models/category';
import { CarStaticDataService } from 'src/app/shared/services/car-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup } from '@angular/forms';
import { CarForm } from 'src/app/shared/models/car-form';
import { MessagesService } from 'src/app/shared/services/messages.service';
@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class CarFormComponent implements OnInit {
  FuelType: Type[] = [];
  Transmission: Type[] = [];
  Drive: Type[] = [];
  BodyType: Type[] = [];
  ExteriorOptions: Option[] = [];
  InteriorOptions: Option[] = [];
  TechOptions: Option[] = [];
  SafetyOptions: Option[] = [];
  categories: Category[] = [];

  isExteriorCollapsed: boolean = false;
  isInteriorCollapsed: boolean = false;
  isSafetyCollapsed: boolean = false;
  isTechCollapsed: boolean = false;
  isTechnicalCollapsed: boolean = false;
  isDesc1lCollapsed: boolean = false;
  isDesc2lCollapsed: boolean = false;
  isGalleryCollapsed: boolean = false;
  isCategoryCollapsed: boolean = false;
  submit: boolean = false;

  modalRef!: NgbModalRef;
  public Editor = ClassicEditor;
  public editorData = '<p>Hello, CKEditor 5!</p>';

  // Custom configuration for CKEditor
  public editorConfig = {
    placeholder: 'Start typing here...',
  };
  carForm!: FormGroup<CarForm>;

  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild('cat') cat!: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private staticData: CarStaticDataService,
    private spinner: NgxSpinnerService,
    private messages: MessagesService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    // this.staticData.getAllClients().subscribe((res) => console.log(res));

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this.FuelType = this.staticData.FuelType;
    this.Transmission = this.staticData.Transmission;
    this.Drive = this.staticData.Drive;
    this.BodyType = this.staticData.BodyType;
    this.categories = this.staticData.categories;
    this.ExteriorOptions = this.staticData.ExteriorOptions;
    this.InteriorOptions = this.staticData.InteriorOptions;
    this.TechOptions = this.staticData.TechOptions;
    this.SafetyOptions = this.staticData.SafetyOptions;

    this.initForm();
  }

  initForm() {
    this.carForm = new FormGroup<any>({
      name: new FormControl(''),
      carName: new FormControl(''),
      description: new FormControl(''),
      RegYear: new FormControl(''),
      mileage: new FormControl(''),
      fuelType: new FormControl(''),
      transmission: new FormControl(''),
      drive: new FormControl(''),
      bodyType: new FormControl(''),
      exteriorColor: new FormControl(''),
      interiorColor: new FormControl(''),
      sold: new FormControl(''),
      exteriorFeatures: new FormControl(''),
      interiorFeatures: new FormControl(''),
      techFeatures: new FormControl(''),
      safetyFeatures: new FormControl(''),
      engineSize: new FormControl(''),
      SpecsFuelType: new FormControl(''),
      cylinders: new FormControl(''),
      driveAxle: new FormControl(''),
      bHP: new FormControl(''),
      torque: new FormControl(''),
      emissions: new FormControl(''),
      tax: new FormControl(''),
      urban: new FormControl(''),
      extraUrban: new FormControl(''),
      driveLayout: new FormControl(''),
      speed: new FormControl(''),
      performance: new FormControl(''),
      nOX: new FormControl(''),
      shortDescription: new FormControl(''),
    });
  }

  submitForm() {
    this.submit = true;
    console.log(this.carForm.value);
    this.messages.toast('User Updated successfully', 'success');
  }

  openImagesModal() {
    this.modalRef = this.modalService.open(this.content, {
      backdrop: 'static',
      size: 'xl',
      centered: true,
    });
  }
  openCategoryModal() {
    this.modalRef = this.modalService.open(this.cat, {
      backdrop: 'static',
      size: 'md',
      centered: true,
    });
  }

  getEditorData({ editor }: ChangeEvent) {
    console.log(editor.data.get());
  }
}
