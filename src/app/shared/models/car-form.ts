import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface CarForm {
  id?: FormControl<number | null>;
  name?: FormControl<string | null>;
  price?: FormControl<number | null>;
  regYear?: FormControl<number | null>;
  mileage?: FormControl<string | null>;

  bodyType?: FormControl<string | null>;
  exteriorColor?: FormControl<string | null>;
  interiorColor?: FormControl<string | null>;
  sold?: FormControl<boolean | null>;
  makeId?: FormControl<number | null>;
  modelId?: FormControl<number | null>;
  exteriors?: FormControl<string[] | null>;
  interiors?: FormControl<string[] | null>;
  teches?: FormControl<string[] | null>;
  safeties?: FormControl<string[] | null>;

  fuelCapacity?: FormControl<number | null>;
  weight?: FormControl<number | null>;
  length?: FormControl<number | null>;
  width?: FormControl<number | null>;
  height?: FormControl<number | null>;
  wheelbase?: FormControl<number | null>;
  turningCircle?: FormControl<number | null>;

  power?: FormControl<number | null>;
  topSpeed?: FormControl<number | null>;
  torque?: FormControl<number | null>;
  mph?: FormControl<number | null>;
  emissions?: FormControl<number | null>;
  euroEmissions?: FormControl<number | null>;
  miles?: FormControl<number | null>;

  engineSize?: FormControl<number | null>;
  specsFuelType?: FormControl<string | null>;
  cylinders?: FormControl<number | null>;
  valves?: FormControl<number | null>;
  gearbox?: FormControl<number | null>;
  fuelType?: FormControl<string | null>;
  transmission?: FormControl<string | null>;
  drive?: FormControl<string | null>;

  doors?: FormControl<string | null>;
  seats?: FormControl<string | null>;
  luggage?: FormControl<string | null>;
  unbraked?: FormControl<string | null>;
  braked?: FormControl<string | null>;

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
