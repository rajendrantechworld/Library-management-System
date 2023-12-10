import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted: boolean = false;
  errorMessage: boolean = true;
  message: any = "";
  apiResponse: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,

  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  onLogin(value: any) {

    if (this.loginForm.invalid) {
      this.submitted = true;
      return

    }else {

      let body = JSON.stringify({ "LoginForm": { "username": value.userName, "password": value.password } });
      console.log(body);


    }

  }

}
