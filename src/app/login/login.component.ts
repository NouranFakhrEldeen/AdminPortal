import { Component, OnInit } from "@angular/core";
// import { AngularFireAuth } from "angular/fire/auth";
import * as firebase from "firebase/app";
import { AuthService } from "../core/auth.service";
import { Router, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = "";
  loginErrorMSG: string = "";

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.createForm();
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };
  createForm() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  tryLogin(value) {
    this.authService.doLogin(value).then(
      res => {
        this.router.navigate(["/"]);
      },
      err => {
        console.log(err.message);
        this.loginErrorMSG = err.message;
      }
    );
  }

  logout() {
    this.authService.doLogout().then(
      res => {
        this.location.back();
      },
      error => {
        console.log("Logout error", error);
      }
    );
  }
}
