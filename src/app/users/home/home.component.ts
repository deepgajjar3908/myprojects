import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { UserDataService } from '../../user-data.service'
import { AddUserComponent } from "../../add-user/add-user.component";
import { Observable } from 'rxjs';
import { user } from "../../add-user/user";
import { HttpClient } from '@angular/common/http';
// import { ApiService } from 'src/app/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newuser!: string;
  users$!: any;
  private readonly notifier: NotifierService;
  users: any;
  data: any = 3;
  search_text:string='';
  constructor(private Datasharing: UserDataService, notifireservice: NotifierService, private api: UserDataService, private http: HttpClient) {

    this.notifier = notifireservice;
    Datasharing.SharingData.subscribe((res: any) => {
      setTimeout(() => this.newuser = res, 500);
      console.log("This Value " + this.newuser);

    })
  }

  ngOnInit() {
    this.getUsers()

    console.log(1);
    console.log(2);
    setTimeout(async () => {
      await console.log(3);
    }, 2000);
    console.log(4);
  }
  async getUsers() {
    this.Datasharing.getAll().subscribe(data => {
      this.users = data;
      console.log(this.users);
    },
      err => {
        console.log(err);
      }
    )
    const res: any = await this.http.get("https://reqres.in/api/users?page=2").toPromise();
    this.users = res.data;
    console.log(this.users);
    
  }
  on_search_change(searchValue:string){
    this.search_text=searchValue;
    console.log(this.search_text);
    
  }
}
