import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

// Attribute directive to give hover effect to cards. Refer https://angular.io/guide/attribute-directives
// This directive applies styling to the elements. Refer note.component.html line 1
@Directive({
  selector: '[appHovereffect]'
})
export class HovereffectDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  // Setting style when mouse enters
  @HostListener('mouseenter') onmouseenter() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'cadetblue');
  }

  // Clearing out the style
  @HostListener('mouseleave') onmouseleave() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', '');
  }
}
