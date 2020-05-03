import { Directive, ElementRef, OnInit, Renderer2, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[ngxLazy]'
})
export class LazyImageDirective implements OnInit {
  constructor(
    private element: ElementRef<HTMLImageElement>,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  @Input('ngxLazy') imageSource: string;

  ngOnInit() {
    // only run lazy image loading in the browser
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        if (this.element.nativeElement.tagName.toLowerCase() != 'img') {
          console.warn(`The directive ${this} only supports an img element`);
        }
        this.renderer.addClass(this.element.nativeElement, "loading-animation")
      } else {
        // Otherwise replace image by default
        this.element.nativeElement.setAttribute('src', this.imageSource);
      }
    }
  }

  ngAfterViewInit(): void {
    // only run lazy image loading in the browser
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        const io = this.setUpObserver();
        io.observe(this.element.nativeElement);
      }
    }
  }

  setUpObserver() {
    // only run lazy image loading in the browser
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        return new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.renderer.setAttribute(
                this.element.nativeElement,
                'src',
                this.imageSource
              );
              this.renderer.removeClass(this.element.nativeElement, "loading-animation")
              observer.disconnect();
            }
          });
        });
      }
    }
  }
}