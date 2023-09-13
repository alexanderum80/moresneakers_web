import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Brand } from 'src/app/brand/models/brand';
import { BrandsService } from 'src/app/brand/services/brand.service';
import { HomeLayout } from 'src/app/home/models/homeLayout.model';
import { Shop } from 'src/app/home/models/shop.model';
import {
  COLORS_OPTIONS,
  OptionSort,
  SIZE_OPTIONS,
} from 'src/app/home/models/sortOptions';
import { LayoutService } from 'src/app/home/services/layout.service';
import { OffersService } from 'src/app/home/services/offers.service';
import { ReleasesService } from 'src/app/home/services/release.service';
import {
  getAllJustDroppedOffer,
  getAllRafflesOffer,
  getOffers,
  getOffersJustDropNextPage,
  getOffersNextPage,
  getOffersPinned,
  getOffersRafflesNextPage,
  setFiltersBrands,
  setFiltersCategory,
  setFiltersColor,
  setFiltersPrice,
  setFiltersShipping,
  setFiltersShops,
  setFiltersSize,
  setIsJustDropped,
  setIsRaffle,
  setStatusGroup,
  setTotalOffers,
} from 'src/app/offers/state/offer.action';

import { ShopsService } from 'src/app/shops/services/shop.service';
import {
  selectFilters,
  selectHottestReleases,
  selectIsJustDropped,
  selectIsRaffle,
  selectJustDroppedOffersList,
  selectLoading,
  selectOffersCount,
  selectOffersList,
  selectOffersPinned,
  selectRafflesOffersList,
  selectTotalOffers,
} from '../../state/offer.selector';
import {
  setFiltersStatus,
  setHottestReleases,
  setLoading,
} from '../../state/offer.action';
import { isPlatformBrowser } from '@angular/common';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';

@Component({
  selector: 'app-whats-about-drop',
  templateUrl: './whats-about-drop.component.html',
  styleUrls: ['./whats-about-drop.component.scss'],
})
export class WhatsAboutDropComponent implements OnInit, OnDestroy {
  offersPinned$ = this.store.pipe(select(selectOffersPinned));
  filters$ = this.store.pipe(select(selectFilters));
  offers$ = this.store.pipe(select(selectOffersList));
  offersJustDropped$ = this.store.pipe(select(selectJustDroppedOffersList));
  offersRaffles$ = this.store.pipe(select(selectRafflesOffersList));
  offersCount$ = this.store.pipe(select(selectOffersCount));
  totalOffers$ = this.store.pipe(select(selectTotalOffers));
  loading$ = this.store.pipe(select(selectLoading));
  isJustDropped$ = this.store.pipe(select(selectIsJustDropped));
  isRaffle$ = this.store.pipe(select(selectIsRaffle));
  statusGroup;
  collapseFilters = false;
  currentPage = 1;
  brands: Brand[];
  shops: Shop[];
  coloredOptions = COLORS_OPTIONS;
  sizeOptions = SIZE_OPTIONS;
  layout: HomeLayout;
  filters: any = {};
  status: string[] = [];
  statusString = '';
  sortOption: OptionSort = {
    direction: 'desc',
    sortFieldName: 'updatedAt',
    name: 'updatedAt',
  };
  hottestReleases$ = this.store.pipe(select(selectHottestReleases));
  subscriptions: Subscription[] = [];
  groups = ['COMING SOON', 'JUST DROPPED', 'RAFFLES'];

  constructor(
    private brandsService: BrandsService,
    private shopService: ShopsService,
    private offersService: OffersService,
    private releaseService: ReleasesService,
    private store: Store,
    private router: Router,
    public layoutService: LayoutService,
    private titleService: Title,
    private metaService: Meta,
    private offerService: OffersService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    if (isPlatformBrowser(this.platformId)) {
      this.getGroup();
      const statusFromUrl = this.getStatusFromUrl();
      this.statusString = this.formatStringStatus(statusFromUrl);
      const currentStatus = this.formatStatus(statusFromUrl);
      this.status = [currentStatus];
      this.store.dispatch(setFiltersStatus({ status: this.status }));
      this.subscribeToFilters();
    }
    (async () => {
      await this.getLayout();
    })();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  async getLayout() {
    const statusFromUrl = this.getStatusFromUrl();
    const pageId = this.formatStatusToUrl(statusFromUrl);
    this.statusString = this.formatStringStatus(statusFromUrl);

    const response = await this.layoutService.getLayout(pageId, '').toPromise();
    this.layout = response.data;
    const { heading, hottest } = this.layout;
    this.addMetadata(heading);
    if (hottest.displayOnPage) {
      this.getHottestReleases();
    }
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

  getStatusFromUrl() {
    return this.router.url.split('/').pop();
  }

  addMetadata(heading) {
    let description;
    const url = this.router.url;
    switch (url) {
      case '/about-to-drop/coming-soon':
        description = 'Latest online upcoming sneaker releases.';
        break;
      case '/about-to-drop/just-dropped':
        description = 'Latest real time online sneaker releases.';
        break;
      case '/about-to-drop/raffles':
        description = 'Latest sneaker raffles online.';
        break;
      default:
        description = 'Latest online upcoming sneaker releases';
        break;
    }

    const title = heading?.pageTitle ?? heading?.title ?? '';
    setMetaTitle(
      title
        ? `${title} | More Sneakers`
        : `${this.statusString} Sneakers | More Sneakers`,
      this.metaService,
      this.titleService
    );

    setMetaKeywords(heading?.keywords ?? '', this.metaService);
    setMetaDescription(
      heading?.meta_description ?? description ?? '',
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

  getOffers(
    status = [''],
    filters = {},
    page = 1,
    isNextPage = false,
    sortColumn = 'updatedAt',
    sortDirection = 'desc'
  ) {
    this.store.dispatch(setLoading({ loading: true }));
    this.subscriptions.push(
      this.offersService
        .getOffers(
          { ...filters, status: [status] },
          sortColumn,
          sortDirection,
          page,
          undefined
        )
        .pipe(
          map(response => {
            isNextPage
              ? this.store.dispatch(
                  getOffersNextPage({ offers: response.data })
                )
              : this.store.dispatch(getOffers({ offers: response.data }));
            this.store.dispatch(setTotalOffers({ total: response.dataCount }));
          }),
          finalize(() => {
            this.store.dispatch(setLoading({ loading: false }));
          })
        )
        .subscribe()
    );
  }

  getOffersRaffles(
    filters = {},
    page = 1,
    isNextPage = false,
    sortColumn = 'updatedAt',
    sortDirection = 'desc'
  ) {
    this.store.dispatch(setLoading({ loading: true }));
    const sub = this.offersService
      .getOffers({ ...filters }, sortColumn, sortDirection, page, undefined)
      .pipe(
        map(response => {
          isNextPage
            ? this.store.dispatch(
                getOffersRafflesNextPage({ offersRaffles: response.data })
              )
            : this.store.dispatch(
                getAllRafflesOffer({ offersRaffles: response.data })
              );
          this.store.dispatch(setTotalOffers({ total: response.dataCount }));
        }),
        finalize(() => {
          this.store.dispatch(setLoading({ loading: false }));
        })
      )
      .subscribe();
    this.subscriptions.push(sub);
  }

  getJustResponseOffers(
    filters = {},
    page = 1,
    isNextPage = false,
    sortColumn = 'updatedAt',
    sortDirection = 'desc'
  ) {
    this.store.dispatch(setLoading({ loading: true }));
    const sub = this.offersService
      .getOffers(
        {
          ...filters,
          status: [
            'available',
            'on_sale',
            'restock',
            'sold_out',
            'live',
            'closed',
          ],
        },
        sortColumn,
        sortDirection,
        page,
        28
      )
      .pipe(
        map(response => {
          isNextPage
            ? this.store.dispatch(
                getOffersJustDropNextPage({ offersJustDropped: response.data })
              )
            : this.store.dispatch(
                getAllJustDroppedOffer({ offersJustDropped: response.data })
              );
          this.store.dispatch(setTotalOffers({ total: response.dataCount }));
        }),
        finalize(() => {
          this.store.dispatch(setLoading({ loading: false }));
        })
      )
      .subscribe();
    this.subscriptions.push(sub);
  }

  formatStatus(status: string) {
    switch (status) {
      case 'raffles':
        return 'raffles';
      case 'just-dropped':
        return 'just_dropped';
      case 'coming-soon':
        return 'coming_soon';
      case 'whats-new':
        return '';
      default:
        return status;
    }
  }

  formatStatusToUrl(status: string) {
    switch (status) {
      case 'raffles':
        return 'raffles';
      case 'coming-soon':
        return 'coming_soon';
      case 'just-dropped':
        return 'just_dropped';
      case 'about-to-drop':
        return ' ';
      default:
        return status;
    }
  }

  formatStringStatus(status: string) {
    switch (status) {
      case 'raffles':
        return 'Raffles';
      case 'coming-soon':
        return 'Coming soon';
      case 'just-dropped':
        return 'Just Dropped';
      case 'about-to-drop':
        return '';
      default:
        return status;
    }
  }

  subscribeToFilters() {
    const sub = this.filters$
      .pipe(
        map(filtersObject => {
          this.filters = {
            maxPrice: filtersObject.filtersPrices
              ? filtersObject.filtersPrices.max
              : undefined,
            minPrice: filtersObject.filtersPrices
              ? filtersObject.filtersPrices.min
              : undefined,
          };
          if (this.status[0] === 'coming_soon') {
            this.store.dispatch(setIsJustDropped({ isJustDropped: false }));
            this.store.dispatch(setIsRaffle({ isRaffle: false }));
            this.filters = {
              ...this.filters,
              isRaffle: false,
              hasReleaseTime: '',
              last12h: '',
            };
            this.getOffers(
              ['coming_soon'],
              this.filters,
              this.currentPage,
              false,
              'releaseTime',
              'asc'
            );
          } else if (this.status[0] === 'just_dropped') {
            this.store.dispatch(setIsJustDropped({ isJustDropped: true }));
            this.store.dispatch(setIsRaffle({ isRaffle: false }));
            this.filters = { ...this.filters, isRaffle: false };

            this.getJustResponseOffers(
              this.filters,
              this.currentPage,
              false,
              'updatedAt',
              'desc'
            );
          } else if (this.status[0] === 'raffles') {
            this.store.dispatch(setIsJustDropped({ isJustDropped: false }));
            this.store.dispatch(setIsRaffle({ isRaffle: true }));
            this.filters = {
              ...this.filters,
              isRaffle: true,
              raffleEndLastWeek: '',
              notStatus: ['coming_soon'],
            };
            this.getOffersRaffles(
              this.filters,
              this.currentPage,
              false,
              'raffleEnd',
              'asc'
            );
          }
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
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

  setFiltersCategory($event: any) {
    this.store.dispatch(setFiltersCategory({ category: $event }));
  }

  setFiltersShop($event: any) {
    this.store.dispatch(setFiltersShops({ shops: $event }));
  }

  setFiltersBrands($event) {
    this.store.dispatch(setFiltersBrands({ brands: $event }));
  }

  setFiltersShipping($event) {
    this.store.dispatch(setFiltersShipping({ shipping: $event }));
  }

  setFiltersColors($event) {
    this.store.dispatch(setFiltersColor({ colors: $event }));
  }

  setFiltersSize($event) {
    this.store.dispatch(setFiltersSize({ sizes: $event }));
  }

  setFiltersPrice($event) {
    this.store.dispatch(setFiltersPrice({ prices: $event }));
  }

  onScroll() {
    this.currentPage++;
    if (this.status[0] === 'just_dropped') {
      this.store.dispatch(setIsJustDropped({ isJustDropped: true }));
      this.store.dispatch(setIsRaffle({ isRaffle: false }));
      this.filters = { ...this.filters, isRaffle: false };
      this.getJustResponseOffers(
        this.filters,
        this.currentPage,
        true,
        'updatedAt',
        'desc'
      );
    }
  }

  changeSelectedGroup(group: number) {
    let statusGroup;
    switch (group) {
      case 1:
        statusGroup = 'coming-soon';
        break;
      case 2:
        statusGroup = 'just-dropped';
        break;
      case 3:
        statusGroup = 'raffles';
        break;
      default:
        statusGroup = 'coming-soon';
        break;
    }
    this.store.dispatch(setStatusGroup({ statusGroup }));

    const url = this.router.url.split('?')[0];
    const urlRouter = url.split('/');
    if (urlRouter[1] !== 'about-to-drop') {
      this.router.navigate([
        urlRouter[1] + '/' + urlRouter[2] + '/' + statusGroup,
      ]);
    } else {
      this.router.navigate([this.router.url.split('/')[1] + '/' + statusGroup]);
    }
  }

  getStatusNumber(status: string) {
    switch (status) {
      case 'coming-soon':
        return 1;
      case 'just-dropped':
        return 2;
      case 'raffles':
        return 3;
      default:
        break;
    }
  }

  getGroup() {
    const url = this.router.url.split('?')[0];
    const urlRouter = url.split('/');
    if (urlRouter[1] !== 'about-to-drop') {
      this.statusGroup = urlRouter[3] || 'coming-soon';
    } else {
      this.statusGroup = urlRouter[2];
    }
  }
}
