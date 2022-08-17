import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectApiService } from '../../project-api.service';
import { project } from '../project/project';
import { NotifierService } from 'angular-notifier';
import { ConfirmedValidator } from 'src/app/ConfirmedValidator';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  formValue!: FormGroup;
  projectData!: any;
  closeResult?: string;
  thisForm!: any;
  submitted!: boolean;
  showadd!: boolean;
  showupdate!: boolean;
  projectObj: project = new project();
  private readonly notifier: NotifierService;


  constructor(private formbuilder: FormBuilder, private api: ProjectApiService, notifireservice: NotifierService, private modalService: NgbModal, config: NgbModalConfig,) {
    this.notifier = notifireservice;
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      projectname: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
    }
    )
    const myobj = {
      projectname: '',
      date: '',
      duration: '',
     
    }

    this.getDetails();
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

  showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
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


  get projectname() {
    return this.formValue.get('projectname');
  }
  get date() {
    return this.formValue.get('date');
  }
  get duration() {
    return this.formValue.get('duration');
  }

  loginuser() {
    this.submitted = false;
    console.log(this.formValue.value);
  }
  
  postprojectDetails() {
    if (this.formValue.valid) {
      this.projectObj.projectname = this.formValue.value.projectname;
      this.projectObj.date = this.formValue.value.date;
      this.projectObj.duration = this.formValue.value.duration;

      console.log(this.formValue.value);
      this.api.postProject(this.projectObj)
        .subscribe((res: any) => {
          console.log(res);
          // let ref = document.getElementById('cancel');
          // ref?.click();
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

  getDetails() {
    this.api.getProject()
      .subscribe(res => {
        this.projectData = res;
      },
      err => {
        this.showNotification('error', 'Error');
      })
  }

  deleteDetails(row: any) {
    this.api.deleteProject(row.id)
      .subscribe(res => {
        // alert("Data Deleted");
        this.showNotification('warning', 'Delete Successfully');
        this.getDetails();
      })
  }

  editDetails(row: any) {
    this.showadd = false;
    this.showupdate = true;
    this.projectObj.id = row.id;
    this.formValue.reset();

    this.formValue.controls['projectname'].setValue(row.projectname),
      this.formValue.controls['date'].setValue(row.date),
      this.formValue.controls['duration'].setValue(row.duration);

  }
  updateDetails() {
    if (this.formValue.valid) {
      this.projectObj.projectname = this.formValue.value.projectname;
      this.projectObj.date = this.formValue.value.date;
      this.projectObj.duration = this.formValue.value.duration;


      this.api.updateProject(this.projectObj, this.projectObj.id)
        .subscribe(res => {
          console.log(res);
          // let ref = document.getElementById('cancel');
          // ref?.click();
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
}