import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface CarForm {
  id?: FormControl<number | null>;
  name?: FormControl<string | null>;
  price?: FormControl<number | null>;
  regYear?: FormControl<number | null>;
  mileage?: FormControl<string | null>;
  fuelType?: FormControl<string | null>;
  transmission?: FormControl<string | null>;
  drive?: FormControl<string | null>;
  bodyType?: FormControl<string | null>;
  exteriorColor?: FormControl<string | null>;
  interiorColor?: FormControl<string | null>;
  isSold?: FormControl<boolean | null>;
  makeId?: FormControl<number | null>;
  modelId?: FormControl<number | null>;
  exteriors?: FormControl<string[] | null>;
  interiors?: FormControl<string[] | null>;
  teches?: FormControl<string[] | null>;
  safeties?: FormControl<string[] | null>;
  engineSize?: FormControl<string | null>;
  specsFuelType?: FormControl<string | null>;
  cylinders?: FormControl<number | null>;
  driveAxle?: FormControl<string | null>;
  bHP?: FormControl<number | null>;
  torque?: FormControl<number | null>;
  emissions?: FormControl<number | null>;
  tax?: FormControl<number | null>;
  urban?: FormControl<number | null>;
  extraUrban?: FormControl<number | null>;
  driveLayout?: FormControl<string | null>;
  speed?: FormControl<number | null>;
  performance?: FormControl<string | null>;
  nOX?: FormControl<number | null>;
  shortDescription?: FormControl<string | null>;
  images?: FormControl<string[] | null>;
}
