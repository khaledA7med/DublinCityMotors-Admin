import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { localStorageKeys } from 'src/app/core/models/localStorageKeys';
import { AuthService } from 'src/app/core/services/auth.service';
import { ILogin, ILoginForm } from 'src/app/shared/models/login';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // Login Form
  loginForm!: FormGroup<ILoginForm>;
  submitted = false;
  subsribes: Subscription[] = [];
  returnUrl!: string;
  constructor(
    private auth: AuthService,
    private message: MessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup<ILoginForm>({
      username: new FormControl('', Validators.required),
      password: new FormControl(null, Validators.required),
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  validationChecker(): boolean {
    if (this.loginForm.invalid) {
      return false;
    }
    return true;
  }

  onSubmit() {
    this.submitted = true;
    let data: ILogin = {
      username: this.f.username.value!,
      password: this.f.password.value!,
    };
    if (!this.validationChecker()) return;
    else {
      this.spinner.show();
      let sub = this.auth.Login(data).subscribe((res: any) => {
        if (res) {
          localStorage.setItem(localStorageKeys.token, res?.token!);
          this.message.toast('Logged In Successfully', 'success');
          this.spinner.hide();
          this.router.navigate([this.returnUrl]);
        } else {
          this.spinner.hide();
          this.message.toast(res.message!, 'error');
        }
      });
      this.subsribes.push(sub);
    }
  }

  ngOnDestroy(): void {
    this.subsribes && this.subsribes.forEach((s) => s.unsubscribe());
  }
}
