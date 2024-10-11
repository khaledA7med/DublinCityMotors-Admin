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
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CarForm } from 'src/app/shared/models/car-form';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    // this.staticData.getAllClients().subscribe((res) => console.log(res));

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

    this.initForm();
  }

  initForm() {
    this.carForm = new FormGroup<any>({
      name: new FormControl(''),
      regYear: new FormControl(),
      mileage: new FormControl(''),
      fuelType: new FormControl(''),
      transmission: new FormControl(''),
      drive: new FormControl(''),
      make: new FormControl(''),
      model: new FormControl(''),
      exteriorColor: new FormControl(''),
      interiorColor: new FormControl(''),
      description: new FormControl(''),
      bodyType: new FormControl(''),
      isSold: new FormControl(''),
      exteriors: new FormArray(
        this.ExteriorOptions.map(() => new FormControl(false))
      ),
      interiors: new FormArray([
        new FormGroup({ specs: new FormControl('Alloy wheels') }),
      ]),
      teches: new FormArray([
        new FormGroup({ specs: new FormControl('Alloy wheels') }),
      ]),
      safeties: new FormArray([
        new FormGroup({ specs: new FormControl('Alloy wheels') }),
      ]),
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

  onCheckboxChange(event: Event, group: string, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const controlArray = this.carForm.get('exteriors') as FormArray;

    if (inputElement.checked) {
      // Add to selected features
      controlArray.at(index).setValue(true);
    } else {
      // Remove from selected features
      controlArray.at(index).setValue(false);
    }
  }

  addToSelected(group: string, feature: string) {
    switch (group) {
      case 'exteriors':
        this.selectedExteriors.push({ specs: feature });
        console.log(this.selectedExteriors);

        break;
      case 'interiors':
        this.selectedInteriors.push({ specs: feature });
        break;
      case 'safeties':
        this.selectedSafeties.push({ specs: feature });
        break;
      case 'teches':
        this.selectedTeches.push({ specs: feature });
        break;
    }
  }

  removeFromSelected(group: string, feature: string) {
    switch (group) {
      case 'exteriors':
        this.selectedExteriors = this.selectedExteriors.filter(
          (f) => f.specs !== feature
        );
        break;
      case 'interiors':
        this.selectedInteriors = this.selectedInteriors.filter(
          (f) => f.specs !== feature
        );
        break;
      case 'safeties':
        this.selectedSafeties = this.selectedSafeties.filter(
          (f) => f.specs !== feature
        );
        break;
      case 'teches':
        this.selectedTeches = this.selectedTeches.filter(
          (f) => f.specs !== feature
        );
        break;
    }
  }
  submitForm() {
    this.submit = true;
    this.messages.toast('User Updated successfully', 'success');
    // this.staticData.addCar(this.carForm.value).subscribe((res) => {
    //   console.log(res);
    // });

    //   const selectedExteriors = this.carForm.controls.exteriors?.value.map((checked: boolean, i: number) => checked ? this.ExteriorOptions[i].label : null)
    //   .filter((v: string | null) => v !== null);

    // console.log('Selected Exteriors:', selectedExteriors);
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
