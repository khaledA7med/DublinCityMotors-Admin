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

interface Category {
  name: string;
  subcategories?: Category[];
  checked?: boolean;
}

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class CarFormComponent implements OnInit {
  FuelType = [
    { name: 'Diesel' },
    { name: 'Electric' },
    { name: 'Fuel' },
    { name: 'Hybird' },
    { name: 'Petrol' },
    { name: 'Petrol/Electric' },
  ];
  Transmission = [{ name: 'Automatic' }, { name: 'Manual' }];
  Drive = [{ name: 'RWD' }, { name: 'FWD' }, { name: 'AWD' }];
  BodyType = [
    { name: 'Avant' },
    { name: 'Sedan' },
    { name: 'Saloon' },
    { name: 'Coupe' },
    { name: 'MPV' },
    { name: 'Van' },
    { name: 'Estate Car' },
  ];
  ExteriorOptions = [
    { label: 'Alloy wheels' },
    { label: 'Electric folding mirrors' },
    { label: 'Fog lights' },
    { label: 'LED' },
    { label: 'Bi-xenon' },
    { label: 'Headlight washers' },
    { label: 'Daytime running lights' },
    { label: 'Heated electric mirrors' },
  ];
  TechOptions = [
    { label: 'Satellite Navigation System' },
    { label: 'Audi MMI' },
    { label: ' Bluetooth Interface' },
    { label: 'AUX / USB' },
    { label: 'MP3 / CD' },
    { label: 'Auto stop / start' },
  ];
  categories: Category[] = [
    {
      name: 'Audi',
      subcategories: [
        { name: 'A1' },
        { name: 'A3' },
        { name: 'A4' },
        { name: 'A5' },
        { name: 'A6' },
        { name: 'Q2' },
        { name: 'Q3' },
      ],
    },
    {
      name: 'BMW',
      subcategories: [
        { name: 'Series 1' },
        { name: 'Series 2' },
        { name: 'Series 3' },
        { name: 'Series 4' },
        { name: 'Series 5' },
      ],
    },
  ];
  isExteriorCollapsed: boolean = false;
  isSafetyCollapsed: boolean = false;
  isTechCollapsed: boolean = false;
  isGalleryCollapsed: boolean = false;
  isCategoryCollapsed: boolean = false;

  modalRef!: NgbModalRef;
  public Editor = ClassicEditor;
  public editorData = '<p>Hello, CKEditor 5!</p>';

  // Custom configuration for CKEditor
  public editorConfig = {
    placeholder: 'Start typing here...',
  };

  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild('cat') cat!: TemplateRef<any>;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

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
