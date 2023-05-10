// This is the best way to create a directive

import {
  Directive,
  OnInit,
  ElementRef,
  Renderer2,
  HostListener,
  HostBinding,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  // Custom property binding
  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlight') highlightColor: string = 'blue';

  // @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
  @HostBinding('style.backgroundColor') backgroundColor: string =
    this.defaultColor;

  // The line of code below is from the Binding to Directive Properties in the Tutorial. or some reason it did not work for me
  // @HostBinding('style.backgroundColor') backgroundColor: string;

  // Code below not working
  // @HostBinding('style.backgroundColor') backgroundColor;

  @HostBinding('style.padding') padding: string = '0';
  @HostBinding('style.color') color: string = 'black';

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-color',
    //   'blue'
    // );
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-color',
    //   'blue'
    // );
    // this.backgroundColor = 'blue';
    this.backgroundColor = this.highlightColor;

    // I added these to see if it would work
    // this.padding = '5px';
    // this.color = 'white';
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-color',
    //   'transparent'
    // );
    // this.backgroundColor = 'transparent';
    this.backgroundColor = this.defaultColor;

    // I added these to see if it would work
    // this.color = 'black';
  }
}
