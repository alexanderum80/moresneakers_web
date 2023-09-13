import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Brand } from 'src/app/brand/models/brand';
import { BrandsService } from 'src/app/brand/services/brand.service';
import { HomeLayout } from 'src/app/home/models/homeLayout.model';
import { SHIPPING_REGIONS } from 'src/app/home/models/offer.model';
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
  getOffers,
  getOffersNextPage,
  setFiltersBrands,
  setFiltersCategory,
  setFiltersColor,
  setFiltersPrice,
  setFiltersShipping,
  setFiltersShops,
  setFiltersSize,
  setTotalOffers,
} from 'src/app/offers/state/offer.action';
import { ShopsService } from 'src/app/shops/services/shop.service';
import {
  selectFilterBrands,
  selectFilterColors,
  selectFilters,
  selectFilterShipping,
  selectFilterShops,
  selectHottestReleases,
  selectLoading,
  selectOffersCount,
  selectOffersList,
  selectTotalOffers,
} from '../../state/offer.selector';
import {
  setFiltersStatus,
  setHottestReleases,
  setLoading,
  setSortOptions,
} from '../../state/offer.action';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';

@Component({
  selector: 'app-whats-new-page',
  templateUrl: './whats-new-page.component.html',
  styleUrls: ['./whats-new-page.component.scss'],
})
export class WhatsNewPageComponent implements OnInit, OnDestroy {
  filters$ = this.store.pipe(select(selectFilters));
  offers$ = this.store.pipe(select(selectOffersList));
  offersCount$ = this.store.pipe(select(selectOffersCount));
  totalOffers$ = this.store.pipe(select(selectTotalOffers));
  loading$ = this.store.pipe(select(selectLoading));
  selectedBrands$ = this.store.pipe(select(selectFilterBrands));
  selectedColors$ = this.store.pipe(select(selectFilterColors));
  selectedShops$ = this.store.pipe(select(selectFilterShops));
  selectedShipping$ = this.store.pipe(select(selectFilterShipping));

  collapseFilters = false;
  currentPage = 1;
  brands: Brand[];
  shops: Shop[];
  coloredOptions = COLORS_OPTIONS;
  sizeOptions = SIZE_OPTIONS;
  shippingRegions = SHIPPING_REGIONS;
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

  constructor(
    private brandsService: BrandsService,
    private shopService: ShopsService,
    private offersService: OffersService,
    private releaseService: ReleasesService,
    private store: Store,
    private router: Router,
    public layoutService: LayoutService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    const statusFromUrl = this.getStatusfromUrl();
    const currentStatus = this.formatStatus(statusFromUrl);
    if (currentStatus) {
      this.status = [currentStatus];
      this.statusString = this.formatStringStatus(statusFromUrl);
    }
    this.store.dispatch(setFiltersStatus({ status: this.status }));
    this.getBrands();
    this.getShops();
    this.subscribeToFilters();

    (async () => {
      await this.getLayout();
    })();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  async getLayout() {
    const statusFromUrl = this.getStatusfromUrl();
    const pageId = this.formatStatusToUrl(statusFromUrl);

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

  getStatusfromUrl() {
    return this.router.url.split('/').pop();
  }

  getBrands() {
    const sub = this.brandsService
      .getAllBrands()
      .pipe(
        map(response => {
          this.brands = response;
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  getShops() {
    const sub = this.shopService
      .getShops({ isParent: 0 }, 'name', 'asc', undefined, undefined)
      .pipe(
        map(response => {
          this.shops = response.data;
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  addMetadata(heading) {
    let description;
    const url = this.router.url;
    switch (url) {
      case '/whats-new/available':
        description =
          'Buy quickly and easily the latest sneakers online, this dedicated page is updated 24/7.';
        break;
      case '/whats-new/on-sale':
        description =
          'Buy quickly and easily the latest sneakers deals, this dedicated page is updated 24/7.';
        break;
      case '/whats-new/restock':
        description =
          'Buy quickly and easily the latest sneakers restocks, this dedicated page is updated 24/7.';
        break;
      case '/whats-new/sold-out':
        description =
          'Make sure to monitor the sneakers that just went sold out, that is how you need to follow-up the sneaker game';
        break;
      default:
        description =
          'Buy quickly and easily the latest sneakers online with this dedicated page, updated 24/7.';
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
      content: heading?.imgUrl ? heading?.imgUrl : '',
    });

    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'https://moresneakers.com',
    });
  }

  getOffers(
    status = [],
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
          ...(status.length && { status: [status] }),
          displayWhatsNew: '1',
        },
        sortColumn,
        sortDirection,
        page,
        16
      )
      .pipe(
        map(response => {
          isNextPage
            ? this.store.dispatch(getOffersNextPage({ offers: response.data }))
            : this.store.dispatch(getOffers({ offers: response.data }));
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
      case 'on-sale':
        return 'on_sale';
      case 'sold-out':
        return 'sold_out';
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
      case 'available':
        return 'available_now';
      case 'on-sale':
        return 'on_sale';
      case 'sold-out':
        return 'sold_out';
      case 'restock':
        return 'restocked';
      case 'whats-new':
        return 'whats_new';
      default:
        return status;
    }
  }

  formatStringStatus(status: string) {
    switch (status) {
      case 'on-sale':
        return 'On sale';
      case 'sold-out':
        return 'Sold out';
      case 'coming-soon':
        return 'Coming soon';
      case 'available':
        return 'Available';
      case 'restock':
        return 'Restock';
      case 'whats-new':
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
            shopId: filtersObject.filtersShops,
            brandId: filtersObject.filtersBrands,
            shipping: filtersObject.filtersShipping,
            categoryId: filtersObject.filtersCategory,
            color: filtersObject.filtersColors,
            maxPrice: filtersObject.filtersPrices
              ? filtersObject.filtersPrices.max
              : undefined,
            minPrice: filtersObject.filtersPrices
              ? filtersObject.filtersPrices.min
              : undefined,
            status: filtersObject.filtersStatus,
          };

          this.getOffers(
            this.status,
            this.filters,
            1,
            false,
            this.sortOption.sortFieldName,
            this.sortOption.direction
          );
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
    this.getOffers(
      this.status,
      this.filters,
      this.currentPage,
      true,
      this.sortOption.sortFieldName,
      this.sortOption.direction
    );
  }

  changeSort(sortOption: OptionSort) {
    this.store.dispatch(setSortOptions({ sortOption }));
    this.sortOption = sortOption;
    this.getOffers(
      this.status,
      this.filters,
      1,
      false,
      this.sortOption.sortFieldName,
      this.sortOption.direction
    );
  }
}
