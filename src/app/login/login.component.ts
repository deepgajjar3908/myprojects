import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotifierService, NotifierOptions } from 'angular-notifier';
import { user } from "../add-user/user";
import { MatIconModule } from '@angular/material/icon';
import { UserDataService } from "../user-data.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted?: boolean;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  private readonly notifier: NotifierService;
  newvalue?: string;
  constructor(private auth: AuthService, private router: Router, notifireservice: NotifierService, private Datasharing: UserDataService) {
    this.notifier = notifireservice;
    Datasharing.SharingData.subscribe((res: string) => {
      this.newvalue = res;
      console.log("VALUE" + this.newvalue);

    })
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['users']);
    }
  }
  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  onSubmit() {

    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.submitted = false
      this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          console.log(result);
          this.router.navigate(['users']);
          this.showNotification('success', 'Login Successfully');
        },
        (err: Error) => {
          this.showNotification('error', 'Faild to Login');
        }
      );
    }
  }

  loginuser() {

    this.submitted = false
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
    }
  }

  onClick(data: any) {
    this.Datasharing.changedata(data);

    console.log(this.loginForm.value);
  }
  showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
}


