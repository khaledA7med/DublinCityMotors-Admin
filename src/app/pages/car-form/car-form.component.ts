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
  isSubmit: boolean = false;
  plainText!: string;
  selectedExteriors: { specs: string }[] = [];
  selectedInteriors: { specs: string }[] = [];
  selectedSafeties: { specs: string }[] = [];
  selectedTeches: { specs: string }[] = [];
  documentsToUpload: File[] = [];
  docs: any[] = [];
  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild('cat') cat!: TemplateRef<any>;
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
    this.FuelType = this.staticData.FuelType;
    this.Transmission = this.staticData.Transmission;
    this.Drive = this.staticData.Drive;
    this.BodyType = this.staticData.BodyType;
    this.categories = this.staticData.categories;
    this.ExteriorOptions = this.staticData.ExteriorOptions;
    this.InteriorOptions = this.staticData.InteriorOptions;
    this.TechOptions = this.staticData.TechOptions;
    this.SafetyOptions = this.staticData.SafetyOptions;

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
      fuelType: new FormControl(''),
      transmission: new FormControl(''),
      drive: new FormControl(''),
      makeId: new FormControl(),
      modelId: new FormControl(),
      exteriorColor: new FormControl(''),
      interiorColor: new FormControl(''),
      // description: new FormControl(''),
      bodyType: new FormControl(''),
      isSold: new FormControl(false),
      exteriors: new FormControl([]),
      interiors: new FormControl([]),
      teches: new FormControl([]),
      safeties: new FormControl([]),
      engineSize: new FormControl(''),
      specsFuelType: new FormControl(''),
      cylinders: new FormControl(),
      driveAxle: new FormControl(''),
      bHP: new FormControl(),
      torque: new FormControl(),
      emissions: new FormControl(),
      tax: new FormControl(),
      urban: new FormControl(),
      extraUrban: new FormControl(),
      driveLayout: new FormControl(''),
      speed: new FormControl(),
      performance: new FormControl(''),
      nOX: new FormControl(),
      shortDescription: new FormControl(''),
    });
  }

  get f() {
    return this.carForm.controls;
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

  loadCarDetails(id: number) {
    this.spinner.show();
    // Assuming carService.getCarById returns an observable of car data
    this.staticData.getCarById(id).subscribe((car) => {
      this.spinner.hide();
      this.patchCarData(car);
    });
  }

  patchCarData(data: any) {
    this.carForm.patchValue(data);
    // this.docs = data.images;
    // console.log(this.docs);
  }

  openImagesModal() {
    this.modalRef = this.modalService.open(this.content, {
      backdrop: 'static',
      size: 'xl',
      centered: true,
    });
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

  getModel(id: number) {
    this.staticData.getModelByMake(id).subscribe((res) => {
      console.log(res);
      this.Model = res;
    });
  }

  extractText(htmlContent: string): string {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;
    return tempElement.textContent || tempElement.innerText || '';
  }

  submitForm() {
    this.submit = true;
    let data = this.carForm.getRawValue();
    const formData = new FormData();
    formData.append('name', data.name!);
    formData.append('price', data.price!.toString());
    formData.append('regYear', data.regYear!.toString());
    formData.append('mileage', data.mileage!);
    formData.append('bodyType', data.bodyType!);
    formData.append('fuelType', data.fuelType!);
    formData.append('transmission', data.transmission!);
    formData.append('drive', data.drive!);
    formData.append('makeId', data.makeId!.toString());
    formData.append('modelId', data.modelId!.toString());
    formData.append('exteriorColor', data.exteriorColor!);
    formData.append('interiorColor', data.interiorColor!);
    formData.append('isSold', JSON.stringify(data.isSold!));
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

    formData.append('engineSize', data.engineSize!);
    formData.append('specsFuelType', data.specsFuelType!);
    formData.append('cylinders', data.cylinders!.toString());
    formData.append('driveAxle', data.driveAxle!);
    formData.append('bHP', data.bHP!.toString());
    formData.append('torque', data.torque!.toString());
    formData.append('emissions', data.emissions!.toString());
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
      this.spinner.show();
      formData.append('carId', data.id!.toString());
      this.staticData.updateCar(formData).subscribe(
        (res) => {
          this.spinner.hide();
          this.messages.toast('Car is Updated successfully', 'success');
          this.resetForm();
        },
        (error) => {
          this.messages.toast(error.error.message, 'error');
        }
      );
    } else {
      this.spinner.show();

      this.staticData.addCar(formData).subscribe(
        (res) => {
          this.spinner.hide();
          this.messages.toast('Car is Added successfully', 'success');
          this.resetForm();
        },
        (error) => {
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
