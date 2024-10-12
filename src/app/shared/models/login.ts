import { FormControl } from '@angular/forms';

export interface ILoginForm {
  username: FormControl<string | null>;
  password: FormControl<number | null>;
}
export interface ILogin {
  username: string;
  password: number;
}
