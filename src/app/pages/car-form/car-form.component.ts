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
import { Category, Option, Specs, Type } from 'src/app/shared/models/category';
import { CarStaticDataService } from 'src/app/shared/services/car-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CarForm } from 'src/app/shared/models/car-form';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
  Make: Type[] = [];
  Model: Type[] = [];
  ExteriorOptions: Specs[] = [];
  InteriorOptions: Specs[] = [];
  TechOptions: Specs[] = [];
  SafetyOptions: Specs[] = [];
  categories: Category[] = [];

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
  carId!: number;
  editable!: boolean;

  selectedExteriors: { specs: string }[] = [];
  selectedInteriors: { specs: string }[] = [];
  selectedSafeties: { specs: string }[] = [];
  selectedTeches: { specs: string }[] = [];

  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild('cat') cat!: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private staticData: CarStaticDataService,
    private spinner: NgxSpinnerService,
    private messages: MessagesService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.staticData.getAllClients().subscribe((res) => console.log(res));

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this.FuelType = this.staticData.FuelType;
    this.Make = this.staticData.make;
    this.Model = this.staticData.model;
    this.Transmission = this.staticData.Transmission;
    this.Drive = this.staticData.Drive;
    this.BodyType = this.staticData.BodyType;
    this.categories = this.staticData.categories;
    this.ExteriorOptions = this.staticData.ExteriorOptions;
    this.InteriorOptions = this.staticData.InteriorOptions;
    this.TechOptions = this.staticData.TechOptions;
    this.SafetyOptions = this.staticData.SafetyOptions;

    this.route.params.subscribe((params) => {
      this.carId = +params['id']; // Convert string to number
      this.editable = JSON.parse(params['editable']);
      console.log(typeof this.editable);

      if (this.carId) {
        this.loadCarDetails(this.carId); // Load car details if editing
      }
    });
    this.initForm();
  }

  initForm() {
    this.carForm = new FormGroup<any>({
      name: new FormControl(''),
      price: new FormControl(),
      regYear: new FormControl(),
      mileage: new FormControl(''),
      fuelType: new FormControl(''),
      transmission: new FormControl(''),
      drive: new FormControl(''),
      make: new FormControl(''),
      model: new FormControl(''),
      exteriorColor: new FormControl(''),
      interiorColor: new FormControl(''),
      // description: new FormControl(''),
      // bodyType: new FormControl(''),
      // isSold: new FormControl(''),
      exteriors: new FormControl(''),
      interiors: new FormControl(''),
      teches: new FormControl(''),
      safeties: new FormControl(''),
      // engineSize: new FormControl(''),
      // SpecsFuelType: new FormControl(''),
      // cylinders: new FormControl(''),
      // driveAxle: new FormControl(''),
      // bHP: new FormControl(''),
      // torque: new FormControl(''),
      // emissions: new FormControl(''),
      // tax: new FormControl(''),
      // urban: new FormControl(''),
      // extraUrban: new FormControl(''),
      // driveLayout: new FormControl(''),
      // speed: new FormControl(''),
      // performance: new FormControl(''),
      // nOX: new FormControl(''),
      // shortDescription: new FormControl(''),
    });
  }

  getSpecs(e: any) {
    console.log(e);
  }

  get f() {
    return this.carForm.controls;
  }

  loadCarDetails(id: number) {
    console.log(id);

    // Assuming carService.getCarById returns an observable of car data
    // this.carService.getCarById(id).subscribe(car => {
    //   this.carForm.patchValue(car); // Populate the form with the car's data
    // });
  }

  submitForm() {
    this.submit = true;
    this.messages.toast('User Updated successfully', 'success');
    this.staticData.addCar(this.carForm.value).subscribe((res) => {
      console.log(res);
    });

    console.log(this.carForm.value);
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
