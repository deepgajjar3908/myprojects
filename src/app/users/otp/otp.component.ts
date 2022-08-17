import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  result?: string;
  characters?: string;
  charactersLength?: number;
  
  value!: any;
  newvalue!: any;


  convert(data: any) {
    this.value = data;
    // if (this.value >= 1000 && this.value < 100000) {
     
          // Remove last digit from number
          // till only one digit is left
        

    if(this.value>0){
        this.newvalue=Math.floor((Math.random() * 9) + 1)
          this.value = Math.floor(Math.random()*Math.pow(10,this.value)+Math.pow(10,this.value)).toString()
          .slice(-this.value).replace(/[0]/, this.newvalue);
          console.log(this.value);
          
  }
  
    else if(this.value=0){
    alert('please enter more than zero')
    }
        // }

  }

  
  // makeid(data: any) {
  //   this.value=data;
  //   this.characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  //   this.charactersLength = this.characters.length;
  //   this.result = "";
  //   for ( var i = 0; i < this.value; i++ ) {
  //     this.result += this.characters.charAt(Math.floor(Math.random() * 
  // this.charactersLength));
  //  }
  //  console.log(this.result);
  //  return this.result;
      
  // }

}
