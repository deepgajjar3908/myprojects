import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { NotifierService, NotifierOptions } from 'angular-notifier';
import { ApiService } from '../api.service';
import { UserDataService } from "../user-data.service";
import { user } from './user';
import { ConfirmedValidator } from "../ConfirmedValidator";
import { Router } from '@angular/router';
import { data } from 'jquery';
import { fileExtensionValidator } from '../fileExtensionValidator';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  formValue!: FormGroup;
  userObj: user = new user();
  private readonly notifier: NotifierService;
  checkArray!: boolean;
  submitted?: boolean;
  country = ['India', 'USA', 'Canada', 'Austrailia', 'France', 'Netharland']
  newdata: any = '';

  constructor(private Datasharing: UserDataService, private formbuilder: FormBuilder, private api: ApiService, notifireservice: NotifierService, private router: Router) {
    this.notifier = notifireservice;
    Datasharing.SharingData.subscribe((res: string) => {
      this.newdata = res;
    })
  }



  ngOnInit() {
    this.formValue = this.formbuilder.group({
      firstname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      lastname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)],),
      confirmpassword: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      countryname: new FormControl('', [Validators.required]),
      emailid: new FormControl('', [Validators.required, Validators.email]),
      check: new FormControl(false, [Validators.required, Validators.pattern('true')]),
      mobileno: new FormControl('', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      )]),
      imageInput: new FormControl('',[Validators.required,fileExtensionValidator('JPG, png,PNG,jpg')])
    },
      // CustomValidators.mustMatch('password', 'confirmPassword')
      { validator: ConfirmedValidator('password', 'confirmpassword') },
    )
    const myobj = {
      firstname: '',
      lastname: '',
      password: '',
      confirmpassword: '',
      gender: '',
      emailid: '',
      mobileno: '',
      country: '',
      check: '',
      imageInput: '',
    }
    this.formValue.setValue(myobj);

  }
  changeCountry(e: any) {
    this.countryname?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get imageInput() {
    return this.formValue.get('imageInput');
  }
  get confirmpassword() {
    return this.formValue.get('confirmpassword');
  }

  get firstname() {
    return this.formValue.get('firstname')
  };

  get lastname() {
    return this.formValue.get('lastname')
  }
  get countryname() {
    return this.formValue.get('[countryname]')
  }
  get password() {
    return this.formValue.get('password')
  }
  get emailid() {
    return this.formValue.get('emailid')
  }
  get gender() {
    return this.formValue.get('gender')
  }
  get mobileno() {
    return this.formValue.get('mobileno')
  }
  get check() {
    return this.formValue.get('check')
  }
 
  loginuser() {

    this.submitted = false
    console.log(this.formValue.value);
    
    if (this.formValue.valid) {
      this.router.navigate(['main/login']);
    }
  }
  postuserDetails() {
    if (this.formValue.valid) {
      this.userObj.firstname = this.formValue.value.firstname;
      this.userObj.lastname = this.formValue.value.lastname;
      this.userObj.emailid = this.formValue.value.emailid;
      this.userObj.gender = this.formValue.value.gender;
      this.userObj.mobileno = this.formValue.value.mobileno;
      this.userObj.countryname = this.formValue.value.countryname;
      this.userObj.password = this.formValue.value.password;
      this.userObj.check = this.formValue.value.check;
      this.userObj.imageInput = this.formValue.value.imageInput;
      // this.userObj.confirmpassword = this.formValue.value.confirmpassword;

      console.log(this.formValue.value);
      this.api.postUser(this.userObj)
        .subscribe((res: string) => {
          console.log(res);
          // let ref = document.getElementById('cancel');
          // ref?.click();
          this.formValue.reset();
          // alert("Data added successfully");
          this.showNotification('success', 'Data Added');
        },
          err => {
            this.showNotification('error', 'Error');
          })
    }
  }


  onImageChangeFromFile($event: any) {
    if ($event.target.files && $event.target.files[0]) {
      let file = $event.target.files[0];
      console.log(file);
      if (file.type == "image/jpeg") {
        console.log("correct");

      }
      else {
        //call validation
        this.formValue.controls['imageInputx`'].setValidators([Validators.required]);
        this.formValue.get('imageInput')

      }
    }
  }

  showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
}
