import { Component, OnInit } from '@angular/core';
import { UsdinrPipe } from "../usdinr.pipe";

@Component({
  selector: 'app-usd',
  templateUrl: './usd.component.html',
  styleUrls: ['./usd.component.css']
})
export class UsdComponent implements OnInit {

  constructor() { }
  value: number=0;
  ngOnInit(): void {
  }
  convert(data: any) {
    this.value = data;
  }
 async getdata(){
    console.log();
    
  }
}
