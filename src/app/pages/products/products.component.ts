import { CarStaticDataService } from './../../shared/services/car-data.service';
import { DecimalPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  PipeTransform,
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

// const PRODUCTS: Products[] = [
//   {
//     id: 1,
//     name: 'Audi A5 Sportback 40 TFSI S-Line S-T',
//     img: 'f/f3/Flag_of_Russia.svg',
//     price: 500000,
//     make: 'AUDI',
//     model: '-',
//     date: new Date(),
//   },
//   {
//     id: 2,
//     name: 'BMW G30 530e Luxury iPerformance',
//     img: 'c/cf/Flag_of_Canada.svg',
//     price: 400000,
//     make: 'BMW',
//     model: '-',
//     date: new Date(),
//   },
//   {
//     id: 3,
//     name: 'Mercedes Benz A180 AMG S',
//     img: 'a/a4/Flag_of_the_United_States.svg',
//     price: 1200000,
//     make: 'MERCEDES',
//     model: '-',
//     date: new Date(),
//   },
//   {
//     id: 4,
//     name: 'Volkswagen Golf MK 7.5 1.2 TSI DSG Comfortline',
//     img: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
//     price: 300000,
//     make: '	Volkswagen',
//     model: '-',
//     date: new Date(),
//   },
// ];

// function search(text: string, pipe: PipeTransform): Products[] {
//   return PRODUCTS.filter((product) => {
//     const term = text.toLowerCase();
//     return (
//       product.name!.toLowerCase().includes(term) ||
//       pipe.transform(product.id).includes(term) ||
//       pipe.transform(product.price).includes(term) ||
//       pipe.transform(product.category).includes(term) ||
//       pipe.transform(product.date).includes(term) ||
//       pipe.transform(product.tag).includes(term)
//     );
//   });
// }

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

  category = [{ name: 'BMW' }, { name: 'MERCEDES' }, { name: 'Volkswagen' }];

  productType = [
    { name: 'Simple Product' },
    { name: 'Grouped Product' },
    { name: 'Variable Product' },
  ];

  stockStatus = [
    { name: 'In Stock' },
    { name: 'Out of Stock' },
    { name: 'On Backorder' },
  ];

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
      category: new FormControl(null),
      productType: new FormControl(null),
      stockStatus: new FormControl(null),
    });
  }
  getAllCars() {
    this.spinner.show();
    return this.CarStaticDataService.getAllCars().subscribe((res) => {
      if (res) {
        this.spinner.hide();
        this.allProducts = res;
      }
    });
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

  submitfilter() {
    this.spinner.show();
    this.CarStaticDataService.productFilter(this.filterForm.value).subscribe(
      (res) => {
        this.spinner.hide();
        this.allProducts = res;
      }
    );
  }

  addCar() {
    this.router.navigate(['/add-car']);
  }
  openFilterOffcanvas(): void {
    this.offcanvasService.open(this.carFilter, { position: 'end' });
  }

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
