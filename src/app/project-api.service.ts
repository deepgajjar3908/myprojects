import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  constructor(private http:HttpClient) { }
  postProject(data: any){
    return this.http.post<any>("http://localhost:3000/project",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
  getProject(){
    return this.http.get<any>("http://localhost:3000/project")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateProject(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/project/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteProject(id: number){
    return this.http.delete<any>("http://localhost:3000/project/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
