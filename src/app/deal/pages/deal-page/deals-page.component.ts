import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { HomeLayout } from '../../../home/models/homeLayout.model';
import { select, Store } from '@ngrx/store';
import { LayoutService } from '../../../home/services/layout.service';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DealsService } from '../../services/deals.service';
import {
  concatDeals,
  setCurrentPage,
  setHottestReleases,
  setLoading,
  setTotalDeals,
  setTotalPages,
} from '../../state/deal.action';
import { selectDeals, selectHottestReleases } from '../../state/deal.selector';
import { isPlatformBrowser } from '@angular/common';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';
import { ReleasesService } from '../../../home/services/release.service';

@Component({
  selector: 'app-deals-page',
  templateUrl: './deals-page.component.html',
  styleUrls: ['./deals-page.component.scss'],
})
export class DealsPageComponent implements OnInit, OnDestroy {
  deals$ = this.store.pipe(select(selectDeals));
  hottestReleases$ = this.store.pipe(select(selectHottestReleases));
  layout: HomeLayout;
  currentPage = 1;
  subscriptions: Subscription[] = [];
  defaultTitle = 'Sneaker deals and sales';
  defaultDescription =
    'Do you want to get your sneakers under retail? Every week we update our list of deals and sales with valid promo codes. ' +
    "Don't miss the opportunity to find your sneakers from legit shops and make some savings.";

  constructor(
    private store: Store,
    private dealsService: DealsService,
    public layoutService: LayoutService,
    private titleService: Title,
    private metaService: Meta,
    private releaseService: ReleasesService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.subscriptions.push(
      this.route.queryParams
        .pipe(
          map(queryParam => {
            if (queryParam.hasOwnProperty('page')) {
              const page = +queryParam.page || 1;
              if (page <= 1) {
                const url = this.router.url.split('?')[0];
                void this.router.navigate([url]);
              }

              this.currentPage = page;
              this.store.dispatch(setCurrentPage({ current: page }));
              this.getDeals();
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getDeals();
    }
    (async () => {
      await this.getLayout();
    })();
  }

  private getDeals() {
    this.store.dispatch(setLoading({ loading: true }));
    this.subscriptions.push(
      this.dealsService
        .getDeals(this.currentPage, 28)
        .pipe(
          tap(response => {
            this.store.dispatch(concatDeals({ deals: response.data }));
            this.store.dispatch(setTotalDeals({ count: response.dataCount }));
            this.store.dispatch(setTotalPages({}));
          }),
          finalize(() => this.store.dispatch(setLoading({ loading: false })))
        )
        .subscribe()
    );
    this.store.dispatch(setTotalPages({}));
  }

  getHottestReleases() {
    const sub = this.releaseService
      .getAllHottestReleases(5)
      .pipe(
        map((response: any) => {
          this.store.dispatch(setHottestReleases({ releases: response }));
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  async getLayout() {
    const response = await this.layoutService
      .getLayout('deals', '')
      .toPromise();

    this.layout = response?.data;
    const { heading, hottest } = this.layout;
    this.addMetadata(heading);
    if (hottest.displayOnPage) {
      this.getHottestReleases();
    }
  }

  addMetadata(heading) {
    setMetaKeywords(
      heading?.keywords ??
        'sneakers on sale, sneaker bargains, sneakers under retail, hype sneakers on sale',
      this.metaService
    );
    setMetaDescription(
      heading?.meta_description ??
        'The best deals and valid promo codes available online to buy your sneakers. More Sneakers team is providing everyday the latest promotions from legit shops to get your sneakers cheaper.',
      this.metaService
    );
    setMetaTitle(
      heading?.pageTitle ??
        heading.title ??
        'Valid promo codes and deals for sneakers, streetwear and luxury items online | Moresneakers',
      this.metaService,
      this.titleService
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
}
