import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { user } from '../../add-user/user';
import { NotifierService } from 'angular-notifier';
import { ConfirmedValidator } from 'src/app/ConfirmedValidator';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  formValue!: FormGroup;
  userObj: user = new user();

  thisForm!: any;
  submitted!: boolean;
  showadd!: boolean;
  showupdate!: boolean;
  userData!: any;
  country = ['India', 'USA', 'Canada', 'Austrailia', 'France', 'Netharland']

  closeResult?: string;
  private readonly notifier: NotifierService;

  constructor(private formbuilder: FormBuilder, private api: ApiService, notifireservice: NotifierService, private modalService: NgbModal, config: NgbModalConfig,) {
    this.notifier = notifireservice;
  }

  ngOnInit() {
    this.formValue = this.formbuilder.group({
      firstname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      lastname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      gender: new FormControl('', [Validators.required]),
      emailid: new FormControl('', [Validators.required, Validators.email]),
      mobileno: new FormControl('', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      )]),
      countryname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)],),
      confirmpassword: new FormControl('', [Validators.required]),
      check: new FormControl(false, [Validators.required, Validators.pattern('true')]),
      imageInput: new FormControl('', [Validators.required])
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

    this.getDetails();
  
    console.log(this.userObj.firstname);

    this.formValue.setValue(myobj);

  }


  
    
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  clickEvent() {
    this.showadd = true;
    this.showupdate = false;
  }
  onClose() {
    this.formValue.reset();
    this.thisForm.submitted;
    this.submitted = true;
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
    this.submitted = false;
    console.log(this.formValue.value);
  }
  postuserDetails() {
    if (this.formValue.valid) {
      this.userObj.firstname = this.formValue.value.firstname;
      this.userObj.lastname = this.formValue.value.lastname;
      this.userObj.gender = this.formValue.value.gender;
      this.userObj.emailid = this.formValue.value.emailid;
      this.userObj.mobileno = this.formValue.value.mobileno;
      this.userObj.countryname = this.formValue.value.countryname;
      this.userObj.password = this.formValue.value.password;
      this.userObj.confirmpassword = this.formValue.value.password;
      this.userObj.check = this.formValue.value.check;
      this.userObj.imageInput = this.formValue.value.imageInput;

      console.log(this.formValue.value);
      this.api.postUser(this.userObj)
        .subscribe((res: any) => {
          console.log(res);
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          // alert("Data added successfully");
          this.showNotification('success', 'Data Added');
          this.getDetails();
        },
          err => {
            this.showNotification('error', 'Error');
          })
    }
  }


  showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  getDetails() {
    this.api.getUser()
      .subscribe(res => {
        this.userData = res;
      },
      err => {
        this.showNotification('error', 'Error');
      })
  }

  deleteDetails(row: any) {
    this.api.deleteUser(row.id)
      .subscribe(res => {
        // alert("Data Deleted");
        this.showNotification('warning', 'Delete Successfully');
        this.getDetails();
      })
  }

  editDetails(row: any) {
    this.showadd = false;
    this.showupdate = true;
    this.userObj.id = row.id;
    this.formValue.reset();

    this.formValue.controls['firstname'].setValue(row.firstname),
      this.formValue.controls['lastname'].setValue(row.lastname),
      this.formValue.controls['gender'].setValue(row.gender),
      this.formValue.controls['emailid'].setValue(row.emailid),
      this.formValue.controls['mobileno'].setValue(row.mobileno),
      this.formValue.controls['countryname'].setValue(row.countryname),
      this.formValue.controls['password'].setValue(row.password);
    this.formValue.controls['confirmpassword'].setValue(row.password);
    this.formValue.controls['check'].setValue(row.check);
    this.formValue.controls['imageInput'].setValue(row.imageInput);
  }
  updateDetails() {
    if (this.formValue.valid) {
      this.userObj.firstname = this.formValue.value.firstname;
      this.userObj.lastname = this.formValue.value.lastname;
      this.userObj.gender = this.formValue.value.gender;
      this.userObj.emailid = this.formValue.value.emailid;
      this.userObj.mobileno = this.formValue.value.mobileno;
      this.userObj.countryname = this.formValue.value.countryname;
      this.userObj.password = this.formValue.value.password;
      this.userObj.check = this.formValue.value.check;
      this.userObj.imageInput = this.formValue.value.imageInput;

      this.api.updateUser(this.userObj, this.userObj.id)
        .subscribe(res => {
          console.log(res);
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          // alert("Data updated successfully");
          this.showNotification('success', 'Successfully Update ');
          this.getDetails();
        },
          err => {
            alert("Error");
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
}
