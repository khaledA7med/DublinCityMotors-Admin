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

  products$!: Observable<Products[]>;
  allProducts!: Products[];
  filteredProducts$!: Observable<Products[]>;
  filter = new FormControl('', { nonNullable: true });
  images!: [];
  constructor(
    private spinner: NgxSpinnerService,
    pipe: DecimalPipe,
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
          this.allProducts.filter((el) => console.log(el.images));
        }
      },
      (error) => {
        this.spinner.hide();
        this.messages.toast(error.error.message, 'error');
      }
    );
  }

  filterProducts(searchTerm: string): any[] {
    if (!searchTerm) {
      return this.allProducts;
    }
    searchTerm = searchTerm.toLowerCase();
    return this.allProducts.filter(
      (product) =>
        product.name!.toLowerCase().includes(searchTerm) ||
        product.make!.toLowerCase().includes(searchTerm) ||
        product.model!.toLowerCase().includes(searchTerm) ||
        product.price!.toString().includes(searchTerm) ||
        product.id!.toString().includes(searchTerm) ||
        product.fuelType!.toString().includes(searchTerm)
    );
  }

  openFilterOffcanvas(): void {
    this.offcanvasService.open(this.carFilter, { position: 'end' });
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
    this.spinner.show();
    this.CarStaticDataService.deleteCar(id).subscribe((res) => {
      if (res.success == true) {
        this.spinner.hide();
        this.messages.toast(`car id ${id} deleted`, 'success');
        this.getAllCars();
      }
    });
  }
}
