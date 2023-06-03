import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  // You will have to click on the dropdown menu two times (Close & Open)
  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }

  // This will allow you to click anywhere on the document to close the dropdown menu
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  constructor(private elRef: ElementRef) { }
}