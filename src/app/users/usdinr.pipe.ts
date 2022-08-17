import { style } from '@angular/animations';
import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usdinr'
})
export class UsdinrPipe implements PipeTransform {

  transform(value: number, ...args: number[]): unknown {
    const [currency]=args;
    style:currency:'INR';
    return value * currency;   
  }


}

