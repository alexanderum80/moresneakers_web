import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CollectionsService } from 'src/app/collections/services/collections.service';
import { OffersService } from 'src/app/home/services/offers.service';
import { ReleasesService } from 'src/app/home/services/release.service';
import { Slide } from 'src/app/shared/classes/slide';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [NgbCarouselConfig],
})
export class CarouselComponent implements OnDestroy {
  @ViewChild(NgbCarousel) carousel;

  @Input() slides: Slide[] = [];
  showNavigationArrows = false;
  showNavigationIndicators = true;
  width;

  subscrictions: Subscription[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    config: NgbCarouselConfig,
    private offersService: OffersService,
    private releasesService: ReleasesService,
    private collectionsService: CollectionsService,
    private router: Router
  ) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;

    if (isPlatformBrowser(this.platformId)) {
      // Client only code.
      this.width = window.innerWidth;
    }
  }

  ngOnDestroy() {
    this.subscrictions.forEach(s => s.unsubscribe());
  }

  swipe(e) {
    if (e === 'swiperight') {
      this.carousel.prev();
    } else {
      this.carousel.next();
    }
  }

  routeFromClick(slide: Slide) {
    switch (slide.entityType) {
      case 'offer':
        return `/${slide.link}`;
      case 'release':
        return `/releases/${slide.link}`;
      case 'collection':
        const slug = this.getRouterName(slide.link);
        return `/collections/${slug}`;
      default:
        break;
    }
  }

  getRouterName(name) {
    if (!name) {
      return '';
    }
    return name.toLowerCase().replace(/ /g, '-');
  }

  // @HostListener Decorator
  @HostListener('window:resize', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      // Client only code.
      this.width = window.innerWidth;
    }
  }
}
