import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import AppUtils from 'src/app/shared/models/util';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { OffersService } from 'src/app/shared/services/offers.service';

interface Offer {
  id?: number;
  active: boolean;
  validFrom: Date;
  validUntil: Date;
  description: string;
}

interface OfferForm {
  id?: FormControl<number | null>;
  validFrom: FormControl<Date | null>;
  validUntil: FormControl<Date | null>;
  description: FormControl<string | null>;
  active: FormControl<boolean | null>;
}

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent {
  subscribe: Subscription[] = [];
  offersData: Offer[] = [];
  formGroup!: FormGroup<OfferForm>;
  submitted: boolean = false;
  isEdit: boolean = false;
  @ViewChild('content') content!: TemplateRef<any>;

  state = [
    { id: true, name: 'Active' },
    { id: false, name: 'Not Active' },
  ];

  constructor(
    private messages: MessagesService,
    private spinner: NgxSpinnerService,
    private OffersService: OffersService,
    private modalService: NgbModal,
    private appUtils: AppUtils,
    private calendar: NgbCalendar
  ) {}
  ngOnInit() {
    this.getAllOffers();
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup<OfferForm>({
      id: new FormControl(),
      active: new FormControl(),
      validFrom: new FormControl(null),
      validUntil: new FormControl(null),
      description: new FormControl(''),
    });
  }

  get f() {
    return this.formGroup.controls;
  }

  getAllOffers() {
    this.spinner.show();
    return this.OffersService.getAllOffers().subscribe(
      (res) => {
        if (res) {
          this.spinner.hide();
          this.offersData = res;
        }
      },
      (error) => {
        this.spinner.hide();
        this.messages.toast(error.error.message, 'error');
      }
    );
  }

  openOfferModal(content: TemplateRef<any>) {
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
    });
  }

  setFromDate(e: any) {
    this.f.validFrom?.patchValue(this.appUtils.dateFormater(e.gon) as any);
  }
  setUntillDate(e: any) {
    this.f.validUntil?.patchValue(this.appUtils.dateFormater(e.gon) as any);
  }

  submitForm(form: FormGroup) {
    this.submitted = true;
    let data = form.getRawValue();
    if (!data.id) {
      this.OffersService.addOffers(data).subscribe(
        (res) => {
          this.messages.toast(res.message, 'success');
          this.submitted = false;
          this.getAllOffers();
          this.reset();
        },
        (err) => {
          this.submitted = false;
        }
      );
    } else {
      this.OffersService.updateOffers(data).subscribe(
        (res) => {
          this.messages.toast(res.message, 'success');
          this.submitted = false;
          this.getAllOffers();
          this.reset();
        },
        (err) => {
          this.submitted = false;
        }
      );
    }
  }

  editOffer(offer: Offer) {
    this.isEdit = true;
    this.openOfferModal(this.content);
    if (offer.id) {
      this.f.id?.patchValue(offer.id);
      this.f.active.patchValue(offer.active);
      this.f.validFrom.patchValue(offer.validFrom);
      this.f.validUntil.patchValue(offer.validUntil);
      this.f.description.patchValue(offer.description);
    }
  }

  reset() {
    this.formGroup.reset();
  }
}
