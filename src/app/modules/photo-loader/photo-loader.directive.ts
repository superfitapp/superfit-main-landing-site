import { Directive, ElementRef, OnInit, Renderer2, Input, Inject, PLATFORM_ID } from '@angular/core';
import { SFPhotoFetcherService, ThumbnailSize } from '../../services/photo-fetcher.service';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[sfPhoto]'
})
export class PhotoLoaderDirective implements OnInit {
  constructor(
    private element: ElementRef<HTMLImageElement>,
    private photoService: SFPhotoFetcherService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  @Input('sfPhoto') photoId?: string;
  @Input('sfSize') thumbnailSize?: number;

  ngOnInit() {
    // only run lazy image loading in the browser
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        if (this.element.nativeElement.tagName.toLowerCase() != 'img') {
          console.warn(`The directive ${this} only supports an img element`);
        }

        this.renderer.setAttribute(
          this.element.nativeElement,
          'src',
          "assets/img/placeholder.png"
        );
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
          entries.forEach(async entry => {
            if (entry.isIntersecting) {
              if (this.photoId) {
                let photo = await this.photoService.getPhoto(this.photoId)
                if (photo) {

                  if (this.thumbnailSize && photo.filePath) {
                    try {
                      let thumbnailUrl = await this.photoService.fetchThumbnailPromise(this.thumbnailSize, photo.filePath)
                      if (thumbnailUrl) {
                        this.renderer.setAttribute(
                          this.element.nativeElement,
                          'src',
                          thumbnailUrl
                        );

                        return
                      }
                    } catch {
                      //
                    }
                  }

                  if (photo.masterUrl) {
                    this.renderer.setAttribute(
                      this.element.nativeElement,
                      'src',
                      photo.masterUrl
                    );
                  }
                }
              }
              observer.disconnect();
            }
          });
        });
      }
    }
  }
}