import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CarStaticDataService {
  constructor() {}

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

  InteriorOptions = [
    { label: 'Air conditioning' },
    { label: 'Multifunction steering wheel' },
    { label: 'Adjustable /telescoping steering wheel' },
    { label: 'Adjustable /telescoping steering wheel' },
  ];

  TechOptions = [
    { label: 'Satellite Navigation System' },
    { label: 'Audi MMI' },
    { label: 'Bluetooth Interface' },
    { label: 'AUX / USB' },
    { label: 'MP3 / CD' },
    { label: 'Auto stop / start' },
  ];

  SafetyOptions = [
    { label: 'Parking assist' },
    { label: 'ISOFIX' },
    { label: 'Multiple airbags' },
    { label: 'ABS' },
    { label: 'ESP' },
    { label: 'Traction control' },
    { label: 'Hill keep assist' },
    { label: 'Alarm' },
    { label: 'Immobiliser' },
    { label: 'Keep in lane' },
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
}
