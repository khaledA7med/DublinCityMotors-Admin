import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface CarForm {
  name?: FormControl<string | null>;
  price?: FormControl<number | null>;
  regYear?: FormControl<number | null>;
  mileage?: FormControl<string | null>;
  fuelType?: FormControl<string | null>;
  transmission?: FormControl<string | null>;
  drive?: FormControl<string | null>;
  exteriorColor?: FormControl<string | null>;
  interiorColor?: FormControl<string | null>;
  description?: FormControl<string | null>;
  bodyType?: FormControl<string | null>;
  isSold?: FormControl<boolean | null>;
  exteriors?: FormControl<string | null>;
  interiorFeatures?: FormControl<string | null>;
  techFeatures?: FormControl<string | null>;
  safetyFeatures?: FormControl<string | null>;
  engineSize?: FormControl<string | null>;
  SpecsFuelType?: FormControl<string | null>;
  cylinders?: FormControl<string | null>;
  driveAxle?: FormControl<string | null>;
  bHP?: FormControl<string | null>;
  torque?: FormControl<string | null>;
  emissions?: FormControl<string | null>;
  tax?: FormControl<string | null>;
  urban?: FormControl<string | null>;
  extraUrban?: FormControl<string | null>;
  driveLayout?: FormControl<string | null>;
  speed?: FormControl<string | null>;
  performance?: FormControl<string | null>;
  nOX?: FormControl<string | null>;
  shortDescription?: FormControl<string | null>;
}
