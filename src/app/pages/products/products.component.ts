import { CarStaticDataService } from './../../shared/services/car-data.service';
import { DecimalPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, Observable, of, startWith } from 'rxjs';
import { Products } from 'src/app/shared/models/products';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DecimalPipe],
})
export class ProductsComponent implements OnInit {
  @ViewChild('carFilter') carFilter!: ElementRef;
  filterForm!: FormGroup;
  make!: any;
  model!: any;
  products$!: Observable<Products[]>;
  allProducts!: Products[];
  filteredProducts$!: Observable<Products[]>;
  filter = new FormControl('', { nonNullable: true });
  images: string[] = [];
  constructor(
    private spinner: NgxSpinnerService,
    private CarStaticDataService: CarStaticDataService,
    private offcanvasService: NgbOffcanvas,
    private router: Router,
    private messages: MessagesService
  ) {}
  ngOnInit(): void {
    this.getAllCars();
    this.products$ = of(this.allProducts);
    this.products$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((searchTerm) => this.filterProducts(searchTerm))
    );
    this.initForm();
  }
  initForm() {
    this.filterForm = new FormGroup({
      makeId: new FormControl(),
      modelId: new FormControl(),
      regYear: new FormControl(),
      price: new FormControl(),
    });
  }
  getAllCars() {
    this.spinner.show();
    return this.CarStaticDataService.getAllCars().subscribe(
      (res) => {
        if (res) {
          this.spinner.hide();
          this.allProducts = res;
          this.allProducts.filter((el) => (this.images = el.images!));
        }
      },
      (error) => {
        this.spinner.hide();
        this.messages.toast(error.error.message, 'error');
      }
    );
  }
  convertPathToUrl(path: string): string {
    return path.replace('C:\\Storage\\', '/assets/');
  }
  getFirstImage() {
    return this.images?.[0];
    // return this.convertPathToUrl(this.images?.[0]);
  }

  filterProducts(searchTerm: string): any[] {
    if (!searchTerm) {
      return this.allProducts;
    }
    searchTerm = searchTerm.toLowerCase();
    return this.allProducts.filter(
      (product) =>
        product.name!.toLowerCase().includes(searchTerm) ||
        product.makeName!.toLowerCase().includes(searchTerm) ||
        product.modelName!.toLowerCase().includes(searchTerm) ||
        product.transmission!.toLowerCase().includes(searchTerm) ||
        product.price!.toString().includes(searchTerm) ||
        product.regYear!.includes(searchTerm) ||
        product.id!.toString().includes(searchTerm) ||
        product.fuelType!.toString().includes(searchTerm)
    );
  }

  openFilterOffcanvas(): void {
    this.offcanvasService.open(this.carFilter, { position: 'end' });
    this.getAllMake();
  }

  getAllMake() {
    return this.CarStaticDataService.getAllMake().subscribe(
      (res) => {
        if (res) {
          this.make = res;
        }
      },
      (error) => {
        this.messages.toast(error.error.message, 'error');
      }
    );
  }

  getModel(id: number) {
    this.CarStaticDataService.getModelByMake(id).subscribe((res) => {
      this.model = res;
    });
  }

  submitfilter() {
    this.spinner.show();
    this.CarStaticDataService.productFilter(this.filterForm.value).subscribe(
      (res) => {
        this.spinner.hide();
        this.allProducts = res;
      }
    );
  }
  clearFilter() {
    this.filterForm.reset();
    this.getAllCars();
  }

  addCar() {
    this.router.navigate(['/add-car']);
  }

  // Car table methods
  edit(id: number, edit: boolean) {
    this.router.navigate(['edit-car', id, edit]);
    this.messages.toast(`data for car id ${id} patched`, 'success');
  }
  duplicate(id: number, edit: boolean) {
    this.router.navigate(['duplicate-car', id, edit]);
    this.messages.toast(`data for car id ${id} to duplicate`, 'success');
  }
  delete(id: number) {
    this.messages
      .confirm(
        'Delete',
        'Are you sure you want to delete this car?',
        'danger',
        'question'
      )
      .then((e: SweetAlertResult) => {
        if (e.isConfirmed) {
          this.spinner.show();
          this.CarStaticDataService.deleteCar(id).subscribe((res) => {
            if (res.success == true) {
              this.spinner.hide();
              this.messages.toast(`car id ${id} deleted`, 'success');
              this.getAllCars();
            }
          });
        }
      });
  }
}
