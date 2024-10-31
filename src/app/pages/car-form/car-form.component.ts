import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { Category, Features, Type } from 'src/app/shared/models/category';
import { CarStaticDataService } from 'src/app/shared/services/car-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CarForm } from 'src/app/shared/models/car-form';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ModelFormComponent } from 'src/app/shared/components/model-form/model-form.component';
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
  Make!: any;
  Model!: any;
  ExteriorOptions: Features[] = [];
  InteriorOptions: Features[] = [];
  TechOptions: Features[] = [];
  SafetyOptions: Features[] = [];
  categories: Category[] = [];

  isDesc1lCollapsed: boolean = false;
  isDesc2lCollapsed: boolean = false;
  isGalleryCollapsed: boolean = false;
  isCategoryCollapsed: boolean = false;
  isSpecificationsCollapsed: boolean = false;
  isDimensionsCollapsed: boolean = false;
  isPerformanceCollapsed: boolean = false;
  isEngineCollapsed: boolean = false;
  isCabinCollapsed: boolean = false;

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
  isSubmit: boolean = false;
  plainText!: string;
  selectedExteriors: { specs: string }[] = [];
  selectedInteriors: { specs: string }[] = [];
  selectedSafeties: { specs: string }[] = [];
  selectedTeches: { specs: string }[] = [];
  documentsToUpload: File[] = [];
  docs: any[] = [];

  @ViewChild('dropzone') dropzone!: any;

  constructor(
    private modalService: NgbModal,
    private staticData: CarStaticDataService,
    private spinner: NgxSpinnerService,
    private messages: MessagesService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllMake();
    this.getStaticData();

    this.route.params?.subscribe((params) => {
      this.carId = +params['id']; // Convert string to number

      // Check if 'editable' exists and is not undefined before parsing
      if (params['editable'] !== undefined) {
        this.editable = JSON.parse(params['editable']);
      } else {
        this.editable = false; // or some default value
      }

      if (this.carId) {
        this.loadCarDetails(this.carId); // Load car details if editing
      }
    });
    this.initForm();
  }

  initForm() {
    this.carForm = new FormGroup<CarForm>({
      id: new FormControl(),
      name: new FormControl(''),
      price: new FormControl(),
      regYear: new FormControl(),
      mileage: new FormControl(''),

      makeId: new FormControl(),
      modelId: new FormControl(),
      exteriorColor: new FormControl(''),
      interiorColor: new FormControl(''),
      bodyType: new FormControl(''),
      sold: new FormControl(false),
      exteriors: new FormControl([]),
      interiors: new FormControl([]),
      teches: new FormControl([]),
      safeties: new FormControl([]),

      fuelCapacity: new FormControl(),
      weight: new FormControl(),
      length: new FormControl(),
      width: new FormControl(),
      height: new FormControl(),
      wheelbase: new FormControl(),
      turningCircle: new FormControl(),

      power: new FormControl(),
      mph: new FormControl(),
      topSpeed: new FormControl(),
      torque: new FormControl(),
      emissions: new FormControl(),
      euroEmissions: new FormControl(),
      miles: new FormControl(),

      engineSize: new FormControl(),
      cylinders: new FormControl(),
      valves: new FormControl(),
      fuelType: new FormControl(''),
      transmission: new FormControl(''),
      gearbox: new FormControl(),
      drive: new FormControl(''),

      doors: new FormControl(),
      seats: new FormControl(),
      luggage: new FormControl(),
      unbraked: new FormControl(),
      braked: new FormControl(),

      tax: new FormControl(),
      urban: new FormControl(),
      extraUrban: new FormControl(),
      driveLayout: new FormControl(''),
      performance: new FormControl(''),
      nOX: new FormControl(),
      shortDescription: new FormControl(''),
    });
  }

  get f() {
    return this.carForm.controls;
  }

  getStaticData() {
    this.FuelType = this.staticData.FuelType;
    this.Transmission = this.staticData.Transmission;
    this.Drive = this.staticData.Drive;
    this.BodyType = this.staticData.BodyType;
    this.categories = this.staticData.categories;
    this.ExteriorOptions = this.staticData.ExteriorOptions;
    this.InteriorOptions = this.staticData.InteriorOptions;
    this.TechOptions = this.staticData.TechOptions;
    this.SafetyOptions = this.staticData.SafetyOptions;
  }

  getAllMake() {
    return this.staticData.getAllMake().subscribe(
      (res) => {
        if (res) {
          this.Make = res;
        }
      },
      (error) => {
        this.messages.toast(error.error.message, 'error');
      }
    );
  }

  getModel(id: number) {
    this.f.modelId?.reset();
    this.staticData.getModelByMake(id).subscribe((res) => {
      this.Model = res;
    });
  }

  loadCarDetails(id: number) {
    this.spinner.show();
    // Assuming carService.getCarById returns an observable of car data
    this.staticData.getCarById(id).subscribe(
      (car) => {
        this.spinner.hide();
        this.patchCarData(car);
      },
      (error) => {
        this.spinner.hide();
        this.messages.toast(error.error.message, 'error');
      }
    );
  }

  patchCarData(data: any) {
    this.carForm.patchValue(data);
    this.carForm.patchValue({
      makeId: data?.makeId,
    });
    this.getModel(data.makeId!);
    this.f.modelId?.patchValue(data.modelId!);
    this.docs = data.images;
  }

  documentsList(evt: File[]) {
    this.documentsToUpload = evt;
  }

  openModelModal() {
    this.modalRef = this.modalService.open(ModelFormComponent, {
      backdrop: 'static',
      size: 'md',
      centered: true,
    });
  }

  getEditorData({ editor }: ChangeEvent) {
    const editorData = editor.getData(); // This will have HTML content
    this.plainText = this.extractText(editorData); // Extract text from HTML
  }

  extractText(htmlContent: string): string {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;
    return tempElement.textContent || tempElement.innerText || '';
  }

  submitForm() {
    this.submit = true;
    this.spinner.show();
    let data = this.carForm.getRawValue();
    const formData = new FormData();
    formData.append('name', data.name!);
    formData.append('price', data.price!.toString());
    formData.append('regYear', data.regYear!.toString());
    formData.append('mileage', data.mileage!);
    formData.append('bodyType', data.bodyType!);

    formData.append('makeId', data.makeId!.toString());
    formData.append('modelId', data.modelId!.toString());
    formData.append('exteriorColor', data.exteriorColor!);
    formData.append('interiorColor', data.interiorColor!);
    formData.append('sold', JSON.stringify(data.sold!));
    // for (let i = 0; i < data.exteriors!.length; i++) {
    //   formData.append(`exteriors[${i}]`, data.exteriors![i]);
    // }
    // for (let i = 0; i < data.interiors!.length; i++) {
    //   formData.append(`interiors[${i}]`, data.interiors![i]);
    // }
    // for (let i = 0; i < data.teches!.length; i++) {
    //   formData.append(`teches[${i}]`, data.teches![i]);
    // }
    // for (let i = 0; i < data.safeties!.length; i++) {
    //   formData.append(`safeties[${i}]`, data.safeties![i]);
    // }
    data.exteriors?.forEach((el) => formData.append('exteriors', el));
    data.interiors?.forEach((el) => formData.append('interiors', el));
    data.teches?.forEach((el) => formData.append('teches', el));
    data.safeties?.forEach((el) => formData.append('safeties', el));

    formData.append('fuelCapacity', data.fuelCapacity!.toString());
    formData.append('weight', data.weight!.toString());
    formData.append('length', data.length!.toString());
    formData.append('width', data.width!.toString());
    formData.append('height', data.height!.toString());
    formData.append('wheelbase', data.wheelbase!.toString());
    formData.append('turningCircle', data.turningCircle!.toString());

    formData.append('power', data.power!.toString());
    formData.append('topSpeed', data.topSpeed!.toString());
    formData.append('mph', data.mph!.toString());
    formData.append('torque', data.torque!.toString());
    formData.append('emissions', data.emissions!.toString());
    formData.append('euroEmissions', data.euroEmissions!.toString());
    formData.append('miles', data.turningCircle!.toString());

    formData.append('engineSize', data.engineSize!.toString());
    formData.append('cylinders', data.cylinders!.toString());
    formData.append('valves', data.valves!.toString());
    formData.append('fuelType', data.fuelType!);
    formData.append('transmission', data.transmission!);
    formData.append('gearbox', data.gearbox!.toString());
    formData.append('drive', data.drive!);

    formData.append('doors', data.doors!);
    formData.append('seats', data.seats!);
    formData.append('luggage', data.luggage!);
    formData.append('unbraked', data.unbraked!);
    formData.append('braked', data.braked!);

    formData.append('tax', data.tax!.toString());
    formData.append('urban', data.urban!.toString());
    formData.append('extraUrban', data.extraUrban!.toString());
    formData.append('driveLayout', data.driveLayout!);
    formData.append('speed', data.speed!.toString());
    formData.append('performance', data.performance!);
    formData.append('nOX', data.nOX!.toString());
    formData.append('shortDescription', this.plainText!);
    this.documentsToUpload.forEach((el) => formData.append('images', el));

    if (this.carId) {
      formData.append('carId', data.id!.toString());
      this.staticData.updateCar(formData).subscribe(
        (res) => {
          this.submit = false;
          this.spinner.hide();
          this.messages.toast('Car is Updated successfully', 'success');
          this.resetForm();
        },
        (error) => {
          this.submit = false;
          this.messages.toast(error.error.message, 'error');
        }
      );
    } else {
      this.staticData.addCar(formData).subscribe(
        (res) => {
          this.submit = false;

          this.spinner.hide();
          this.messages.toast('Car is Added successfully', 'success');
          this.resetForm();
        },
        (error) => {
          this.submit = false;
          this.spinner.hide();
          this.messages.toast(error.error.message, 'error');
        }
      );
    }
  }
  resetForm() {
    this.carForm.reset();
  }
}
