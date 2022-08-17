import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  SharingData= new BehaviorSubject('');
  users: any;
  constructor(private http:HttpClient) { }

  changedata(data:any)
  {
    this.SharingData.next(data.value);
  }
  public getAll():Observable<any>{
    return this.http.get<any>("http://localhost:3000/posts")
  }
  
 
}
