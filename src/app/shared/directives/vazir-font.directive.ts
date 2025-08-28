import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appVazirFont]'
})
export class VazirFontDirective implements OnInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

ngOnInit(): void {
    this.el.nativeElement.style.fontFamily = "'Vazirmatn', sans-serif";
    this.el.nativeElement.style.setProperty('font-family', "'Vazirmatn', sans-serif", 'important');
}
}