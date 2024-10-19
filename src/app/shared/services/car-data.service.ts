import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CarStaticDataService {
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
    { specs: 'Alloy wheels' },
    { specs: 'Electric folding mirrors' },
    { specs: 'Fog lights' },
    { specs: 'LED' },
    { specs: 'Bi-xenon' },
    { specs: 'Headlight washers' },
    { specs: 'Daytime running lights' },
    { specs: 'Heated electric mirrors' },
  ];

  InteriorOptions = [
    { specs: 'Air conditioning' },
    { specs: 'Multifunction steering wheel' },
    { specs: 'Adjustable /telescoping steering wheel' },
    { specs: 'Adjustable /telescoping steering wheel' },
  ];

  TechOptions = [
    { specs: 'Satellite Navigation System' },
    { specs: 'Audi MMI' },
    { specs: 'Bluetooth Interface' },
    { specs: 'AUX / USB' },
    { specs: 'MP3 / CD' },
    { specs: 'Auto stop / start' },
  ];

  SafetyOptions = [
    { specs: 'Parking assist' },
    { specs: 'ISOFIX' },
    { specs: 'Multiple airbags' },
    { specs: 'ABS' },
    { specs: 'ESP' },
    { specs: 'Traction control' },
    { specs: 'Hill keep assist' },
    { specs: 'Alarm' },
    { specs: 'Immobiliser' },
    { specs: 'Keep in lane' },
  ];

  make = [
    { id: 1, name: 'Audi' },
    { id: 2, name: 'BMW' },
  ];
  model = [
    { id: 1, name: 'A1' },
    { id: 2, name: 'A2' },
    { id: 3, name: 'A3' },
    { id: 4, name: 'A4' },
    { id: 5, name: 'q1' },
    { id: 6, name: 'q2' },
    { id: 7, name: 'q3' },
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

  private readonly env: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // login(loginReq: any): Observable<any> {
  //   return this.http
  //     .post(this.apiUrl + ApiRoutes.Auth.Login, loginReq)
  //     .pipe(tap((res: LoginResponse) => {}));
  // }

  addCar(req: FormData): Observable<any> {
    return this.http.post(this.env + 'cars/add', req);
  }

  getAllCars(): Observable<any> {
    return this.http.get(this.env + 'cars/all');
  }
  getCarById(id: number): Observable<any> {
    return this.http.post(this.env + 'cars/getCarById', { car_id: id });
  }
  deleteCar(id: number): Observable<any> {
    return this.http.delete(this.env + `cars/delete/${id}`);
  }
  productFilter(data: any): Observable<any> {
    return this.http.post(this.env + `cars/filter`, data);
  }
}
