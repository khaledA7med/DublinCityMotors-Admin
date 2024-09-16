import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showNavigationArrows = false;
  showNavigationIndicators = false;
  // images = [1055, 194, 368].map(
  //   (n) => `https://picsum.photos/id/${n}/1903/950`
  // );

  images = [
    '../../../assets/images/539154.jpg',
    '../../../assets/images/jaguar-car-0h4vhh2g85m0elx1.jpg',
    '../../../assets/images/shiny-hot-red-jaguar-car-6ato97yhe2zlhqi4.jpg',
  ];

  selectedCar!: number;

  cars = [{ name: 'Audi' }, { name: 'BMW' }, { name: 'Mercedes' }];

  models = [{ name: 'A4' }, { name: 'X5' }, { name: 'C-Class' }];

  years = [{ name: '2020' }, { name: '2021' }, { name: '2022' }];

  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }
}
