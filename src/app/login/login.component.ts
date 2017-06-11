import { Router } from '@angular/router';
import { LoginService } from './service/login.service.ts.service';
import { Http } from '@angular/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  busy: Subscription;
  showError: boolean;
  errorMessage: string;

  constructor(private _loginService: LoginService, private _router: Router, private cd: ChangeDetectorRef) {
    this.showError = false;
  }

  ngOnInit() {
  }

  onSubmit(loginForm: any): void {
    this.showError = false;
    this.doLogin(loginForm);
  }

  public getErrorMessage(): string {
    return this.errorMessage;
  }
  private doLogin(loginForm: any): void {
    this.busy = this._loginService.doLogin(loginForm.value)
      .subscribe(
      (res) => {
        if (res.status === 200) {
          sessionStorage.setItem('authToken', res.json().authToken);
          this._router.navigateByUrl('/UserNcs');
        }
      },
      (err) => {
        this.showError = true;
        this.errorMessage = err.json().errorMessage;
        loginForm.form.reset();
      }
      );
  }
}
