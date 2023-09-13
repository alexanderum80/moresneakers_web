import { isPlatformBrowser, Location } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { ReleaseImage } from 'src/app/home/models/release.model';
import {
  GALLERY_CONF,
  GALLERY_IMAGE,
  NgxImageGalleryComponent,
} from 'ngx-image-gallery';

@Component({
  selector: 'app-releases-carousel',
  templateUrl: './releases-carousel.component.html',
  styleUrls: ['./releases-carousel.component.scss'],
})
export class ReleasesCarouselComponent implements OnInit, OnDestroy {
  @ViewChild(NgxImageGalleryComponent)
  ngxImageGallery: NgxImageGalleryComponent;
  @Input() images: ReleaseImage[];
  @Input() showBackButton = true;
  @Input() otherAlt = '';

  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
    thumbnailSize: 50,
    backdropColor: 'rgb(255, 255, 255)',
  };

  imagesG: GALLERY_IMAGE[] = [];

  displayImages = true;
  isBrowser: boolean;

  public ProductDetailsMainSliderConfig: OwlOptions = {
    items: 1,
    nav: false,
    dots: false,
    autoplay: false,
    mouseDrag: false,
    touchDrag: false,
    autoHeight: true,
    autoWidth: true,
    center: true,
    responsiveRefreshRate: 100,
    loop: true,
  };

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  public ProductDetailsThumbConfig: OwlOptions = {
    loop: true,
    dots: false,
    responsive: {
      0: {
        items: 4,
      },
      400: {
        items: 6,
      },
      600: {
        items: 7,
      },
    },
  };

  public activeSlide: any = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private _location: Location
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.images.forEach(d => {
      this.imagesG.push({
        url: d.imgUrl,
        thumbnailUrl: d.imgUrl,
      });
    });
    // this.keepResponseCarousel();
  }

  ngOnDestroy() {
    if (this.resizeSubscription$) {
      this.resizeSubscription$.unsubscribe();
    }
  }

  keepResponseCarousel() {
    if (this.isBrowser) {
      // Client only code.
      this.resizeObservable$ = fromEvent(window, 'resize');
      this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
        this.displayImages = false;
        setTimeout(() => {
          this.displayImages = true;
        }, 400);
      });
    }
  }

  goBack() {
    if (this.isBrowser) {
      // Client only code.
      this._location.back();
    }
  }

  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }
}
