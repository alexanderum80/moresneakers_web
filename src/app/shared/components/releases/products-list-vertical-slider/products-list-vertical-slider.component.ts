import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { Offer } from 'src/app/home/models/offer.model';
import { Release } from 'src/app/home/models/release.model';

@Component({
  selector: 'app-products-list-vertical-slider',
  templateUrl: './products-list-vertical-slider.component.html',
  styleUrls: ['./products-list-vertical-slider.component.scss'],
})
export class ProductsListVerticalSliderComponent {
  @Input() titleLink: '';
  @Input() showStyleName = false;
  @Input() showDate = false;
  @Input() showShop = false;
  @Input() offers: Offer[];
  @Input() releases: Release[];
  @Input() title = 'What´s new';
  @Input() subtitle =
    'New drops, restocks, new to sale sneakers offers in the game';
  @Input() urlData = {};
  @Input() seeAllLink: string;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  displayImages = true;
  public ReleasesInlineConfig: OwlOptions = {
    loop: true,
    margin: 5,
    nav: true,
    stagePadding: 5,
    autoWidth: true,
    mergeFit: false,
    navSpeed: 700,
    navText: [
      "<img src='assets/images/icon/prev.png'>",
      "<img src='assets/images/icon/next.png'>",
    ],
    dots: false,
    responsive: {
      0: {
        items: 1.3,
      },
      400: {
        items: 1.7,
      },
      540: {
        items: 2,
      },
      600: {
        items: 2.5,
      },
      780: {
        items: 3,
      },
      920: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  };

  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  keepResponseCarousel() {
    if (isPlatformBrowser(this.platformId)) {
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
}
