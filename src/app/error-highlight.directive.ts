import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appErrorHighlight]'
})
export class ErrorHighlightDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.border = "1px solid red";
   }

}
