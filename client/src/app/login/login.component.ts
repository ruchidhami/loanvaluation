import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

import { LoginService } from "./login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, public snackBar: MatSnackBar) {
  }

  admin = {
    username: '',
    password: ''
  };

  ngOnInit() {
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  hide = true;

  loader: boolean;

  // getErrorMessage() {
  //   return this.username.hasError('required') ? 'You must enter a value' :
  //     this.email.hasError('username') ? 'Not a username email' :
  //       '';
  // }

  loginSubmit(isValid) {
    if (isValid) {
      this.loader = true;
      this.loginService.login(this.admin)
        .subscribe(login => {
          if (login.success)
            this.loader = false;
          this.router.navigate(['valuations']);
          this.snackBar.open('Login Successfully', '', {
            duration: 3000,
          });
        }, err => {
          this.loader = false;
          this.snackBar.open('Please enter correct Username and Password', '', {
            duration: 3000,
            extraClasses: 'error',
          });
        });
    }
  }


}
