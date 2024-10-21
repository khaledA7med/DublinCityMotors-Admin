import { DecimalPipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarStaticDataService } from 'src/app/shared/services/car-data.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-make',
  templateUrl: './make.component.html',
  styleUrls: ['./make.component.scss'],
})
export class MakeComponent implements OnInit {
  @ViewChild('makeFilter') makeFilter!: ElementRef;
  filterForm!: FormGroup;
  make: any;
  constructor(
    private messages: MessagesService,
    private spinner: NgxSpinnerService,
    pipe: DecimalPipe,
    private CarStaticDataService: CarStaticDataService,
    private offcanvasService: NgbOffcanvas
  ) {}
  ngOnInit(): void {
    this.getAllMake();
    this.initForm();
  }

  initForm() {
    this.filterForm = new FormGroup({
      name: new FormControl(),
    });
  }

  getAllMake() {
    console.log('zzz');

    this.spinner.show();
    return this.CarStaticDataService.getAllMake().subscribe(
      (res) => {
        if (res) {
          this.spinner.hide();
          this.make = res;
        }
      },
      (error) => {
        this.spinner.hide();
        this.messages.toast(error.error.message, 'error');
      }
    );
  }
  openFilterOffcanvas(): void {
    this.offcanvasService.open(this.makeFilter, { position: 'end' });
  }

  // submitfilter() {
  //   this.spinner.show();
  //   this.CarStaticDataService.productFilter(this.filterForm.value).subscribe(
  //     (res) => {
  //       this.spinner.hide();
  //       this.allProducts = res;
  //     }
  //   );
  // }
  // clearFilter() {
  //   this.filterForm.reset();
  //   this.getAllCars();
  // }

  // openMakeModal() {
  //   this.contentModal = this.modalService.open(this.makeContent, {
  //     centered: true,
  //     size: 'lg',
  //   });

  //   this.contentModal.hidden.subscribe(() => {});
  // }
}
