import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sneaker } from '../models/sneaker.model';
import { BlogsService } from '../services/blog.service';
import { HomeService } from '../services/home.service';
import { OffersService } from '../services/offers.service';
import { ReleasesService } from '../services/release.service';
import { getBlogs } from '../state/blogs/blog.actions';
import { selectBlogs } from '../state/blogs/blog.selectors';
import { getHomeLayout } from '../state/home/home.actions';
import {
  selectLayoutDeals,
  selectLayoutHeader,
  selectLayoutHeading,
  selectLayoutHottestReleases,
  selectLayoutSlider,
} from '../state/home/home.selectors';

import {
  getOffersPinned,
  getOffersWhatsNew,
  getShowOffersPinned,
} from '../state/offers/offer.actions';
import {
  selectOffersPinned,
  selectShowOffersPinned,
  selectwhatsNewOffers,
} from '../state/offers/offer.selector';
import {
  getHottestReleases,
  getLatestReleases,
  getUpcomingReleases,
} from '../state/release/release.action';
import {
  selectHottestReleases,
  selectLatestReleases,
  selectUpcomingReleases,
} from '../state/release/release.selector';

// import { NgcCookieConsentService, NgcInitializeEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsletterComponent } from 'src/app/shared/components/modal/newsletter/newsletter.component';
import { isPlatformBrowser } from '@angular/common';
import { SettingsService } from '../services/settings.service';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../shared/utils/meta.utils';

@Component({
  selector: 'app-moresneakers',
  templateUrl: './moresneakers.component.html',
  styleUrls: ['./moresneakers.component.scss'],
})
export class MoresneakersComponent implements OnInit, OnDestroy {
  layoutHeader$ = this.store.pipe(select(selectLayoutHeader));
  layoutSlider$ = this.store.pipe(select(selectLayoutSlider));
  layoutHottestReleases$ = this.store.pipe(select(selectLayoutHottestReleases));
  layoutHeading$ = this.store.pipe(select(selectLayoutHeading));
  layoutDeals$ = this.store.pipe(select(selectLayoutDeals));
  offersPinned$ = this.store.pipe(select(selectOffersPinned));
  showOffersPinned$ = this.store.pipe(select(selectShowOffersPinned));
  whatsNewOffers$ = this.store.pipe(select(selectwhatsNewOffers));
  latestReleases$ = this.store.pipe(select(selectLatestReleases));
  upcomingReleases$ = this.store.pipe(select(selectUpcomingReleases));
  hottestReleases$ = this.store.pipe(select(selectHottestReleases));
  blogs$ = this.store.pipe(select(selectBlogs));
  sneakers$: Observable<Array<Sneaker>>;
  subscriptions: Subscription[] = [];
  showIframe = true;
  NgcInitializeEvent: Subscription;
  // cookies
  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object,
    private homeService: HomeService,
    private store: Store,
    private offerService: OffersService,
    private settingsService: SettingsService,
    private releaseService: ReleasesService,
    private blogServices: BlogsService,
    private titleService: Title,
    private metaService: Meta,
    // private ccService: NgcCookieConsentService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getHomeLayout();
    this.getSneakersSection();
    this.getWhatsNewOffers();
    this.getLatestReleases();
    this.getUpcomingReleases();
    this.getBLogs();
    this.getOffersPinned();
    this.getShowOffersPinned();
    // this.getCookies();
    if (localStorage.getItem('newsletter') !== 'true') {
      this.getNewsLetter();
    }
    localStorage.setItem('newsletter', 'true');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());

    // unsubscribe to cookieconsent observables to prevent memory leaks
    /* this.popupOpenSubscription.unsubscribe();
                                 this.popupCloseSubscription.unsubscribe();
                                 this.initializeSubscription.unsubscribe();
                                 this.statusChangeSubscription.unsubscribe();
                                 this.revokeChoiceSubscription.unsubscribe();
                                 this.noCookieLawSubscription.unsubscribe();*/
  }

  getOffersPinned() {
    const sub = this.offerService
      .getOffersPinned()
      .pipe(
        map(response => {
          this.store.dispatch(getOffersPinned({ offersPinned: response.data }));
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  getShowOffersPinned() {
    const sub = this.settingsService
      .getShowOffersPinned()
      .pipe(
        map(response => {
          this.store.dispatch(
            getShowOffersPinned({ showOffersPinned: response.data })
          );
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  getNewsLetter() {
    if (localStorage.getItem('newsletter') !== 'true') {
      if (isPlatformBrowser(this.platformId)) {
        // For SSR
        this.modalService
          .open(NewsletterComponent, {
            ariaLabelledBy: 'NewsLetter-Modal',
            centered: true,
            // windowClass: 'theme-modal newsletterm NewsLetterModal'
          })
          .result.then(
            result => {
              // this.modalOpen = true;
              `Result ${result}`;
            },
            reason => {
              // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
          );
      }
    }
  }

  /*
                getCookies() {
                   // subscribe to cookieconsent observables to react to main events
                   this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
                    () => {
            
                      // you can use this.ccService.getConfig() to do stuff...
                    });
            
                  this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
                    () => {
            
                      // you can use this.ccService.getConfig() to do stuff...
                    });
            
                  this.initializeSubscription = this.ccService.initialize$.subscribe(
                    (event: NgcInitializeEvent) => {
                      // you can use this.ccService.getConfig() to do stuff...
                    });
            
                    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
                      (event: NgcStatusChangeEvent) => {
                        if (event.status === 'allow') {
                          this.ccService.close(false); // Hide revoke button after accepting cookies
                        }
                      });
            
                  this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
                    () => {
                      // you can use this.ccService.getConfig() to do stuff...
                    });
            
                    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
                    (event: NgcNoCookieLawEvent) => {
                      // you can use this.ccService.getConfig() to do stuff...
                    });
                    if (this.ccService.hasConsented()) {
                      this.ccService.destroy();
                    }
            
                }*/

  getSneakersSection() {
    this.sneakers$ = this.homeService.getSneakersSection();
  }

  getBLogs() {
    const sub = this.blogServices
      .getBlogs({}, 'updatedAt', 'desc', 0, 3)
      .pipe(
        map(response => {
          this.store.dispatch(getBlogs({ blogs: response.data }));
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  getHomeLayout() {
    const sub = this.homeService.getHomeLayout().subscribe(response => {
      this.addMetadata(response.heading);
      if (response.hottest.displayOnPage) {
        this.getHottestReleases();
      }
      this.store.dispatch(getHomeLayout(response));
    });

    this.subscriptions.push(sub);
  }

  getHottestReleases() {
    const sub = this.releaseService
      .getAllHottestReleases(5)
      .pipe(
        map((response: any) => {
          this.store.dispatch(getHottestReleases({ releases: response }));
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  addMetadata(heading) {
    const title = heading?.pageTitle ?? heading?.title ?? '';
    setMetaTitle(
      title ? `${title} | More Sneakers` : 'Home | More Sneakers',
      this.metaService,
      this.titleService
    );
    setMetaKeywords(heading?.keywords ?? '', this.metaService);
    setMetaDescription(
      heading?.meta_description ??
        `Moresneakers assists you to find and buy all the latest sneakers at the best price online. We provide release dates, links for each pair along with raffles, deals, discount code, and more.`,
      this.metaService
    );

    this.metaService.updateTag({
      property: 'og:image',
      content: heading?.imgUrl ?? '',
    });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'https://moresneakers.com',
    });
  }

  getWhatsNewOffers() {
    const sub = this.offerService
      .getOffers(
        {
          status: [''],
          maxPrice: 1000,
          minPrice: 0,
          active: 1,
          displayWhatsNew: '1',
        },
        'updatedAt',
        'desc',
        1,
        16
      )
      .pipe(
        map(response => {
          this.store.dispatch(getOffersWhatsNew({ offers: response.data }));
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  getLatestReleases() {
    const sub = this.releaseService
      .getReleasesByStatusGroup('in-stock', {}, 'updatedAt', 'desc', 1, 16)
      .pipe(
        map(response => {
          this.store.dispatch(getLatestReleases({ releases: response.data }));
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  getUpcomingReleases() {
    const sub = this.releaseService
      .getReleasesByStatusGroup('coming-soon', {}, 'updatedAt', 'desc', 1, 16)
      .pipe(
        map(response => {
          this.store.dispatch(getUpcomingReleases({ releases: response.data }));
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  closeIframe() {
    this.showIframe = false;
  }
}
