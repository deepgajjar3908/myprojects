import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustomStyle]'
})
export class CustomStyleDirective {
  constructor(private el: ElementRef) { }
  @HostListener("mouseenter") mouseEnter() {
    this.changeColor("red");
  }

  @HostListener("mouseleave") mouseLeave() {
    this.changeColor("blue");
  }

  changeColor(color: string ) {
    this.el.nativeElement.style.color = "yellow";
    this.el.nativeElement.style.backgroundColor = color;
  }

}
