import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Brand } from 'src/app/brand/models/brand';
import { OptionSort, SORT_OPTIONS } from 'src/app/home/models/sortOptions';
import { ReleasesService } from 'src/app/home/services/release.service';
import {
  clearFilters,
  getReleases,
  getReleasesNextPage,
  setCurrentPage,
  setFiltersBrands,
  setLoading,
  setSortOptions,
  setStatusGroup,
  setTotalPages,
  setTotalReleases,
} from 'src/app/releases/state/release.action';
import {
  selectCurrentPage,
  selectFiltersNames,
  selectReleasesCount,
  selectReleasesList,
  selectTotalReleases,
} from 'src/app/releases/state/release.selector';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { getBrand } from '../../state/brand.action';
import {
  selectBrandSelected,
  selectTotalPages,
} from '../../state/brand.selector';
import { BrandsService } from '../../services/brand.service';
import { ViewportScroller } from '@angular/common';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';

@Component({
  selector: 'app-brand-releases',
  templateUrl: './brand-releases.component.html',
  styleUrls: ['./brand-releases.component.scss'],
})
export class BrandReleasesComponent implements OnInit, OnDestroy {
  brand$ = this.store.pipe(select(selectBrandSelected));
  releases$ = this.store.pipe(select(selectReleasesList));
  releasesCount$ = this.store.pipe(select(selectReleasesCount));
  totalReleases$ = this.store.pipe(select(selectTotalReleases));
  totalPages$ = this.store.pipe(select(selectTotalPages));
  currentPage$ = this.store.pipe(select(selectCurrentPage));
  urlFilters$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  filtersNames$ = this.store.pipe(select(selectFiltersNames));

  brand: Brand;
  currentStatusGroup: string;
  currentPage: number;
  totalPages = 1;
  pageSize = 28;
  isLoadBrand = false;

  filters: any = { status: 'available' };
  sortOption: OptionSort = {
    direction: 'desc',
    sortFieldName: 'updatedAt',
    name: 'updatedAt',
  };
  headingTitle$ = new BehaviorSubject<string>('');
  headingDescription$ = new BehaviorSubject<string>('');
  slug: string;
  defaultFilters = false;
  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandsService,
    private utilsService: UtilsService,
    private store: Store,
    private releaseService: ReleasesService,
    private titleService: Title,
    private metaService: Meta,
    private viewScroller: ViewportScroller
  ) {
    this.currentStatusGroup = 'in-stock';
    const url = this.router.url.split('?')[0];
    this.currentStatusGroup = url.split('/')[3] || 'in-stock';
    this.store.dispatch(
      setStatusGroup({ statusGroup: this.currentStatusGroup || 'in-stock' })
    );
    const params = this.route.snapshot.paramMap;
    const queryParams = this.route.snapshot.queryParams;

    (async () => {
      this.slug = params.get('slug');
      let page = 1;
      if (queryParams.hasOwnProperty('page')) {
        page = +queryParams.page || 1;
        if (page <= 1) {
          await this.router.navigate([url]);
        }
      }
      this.currentPage = page;
      this.store.dispatch(setCurrentPage({ current: page }));

      const sort = queryParams.sort as string;
      if (sort) {
        const sortOptionFromUrl = SORT_OPTIONS.find(sO => sO.id === sort);
        if (sortOptionFromUrl) {
          this.sortOption = sortOptionFromUrl;
          this.store.dispatch(
            setSortOptions({ sortOption: sortOptionFromUrl })
          );
        }
      }

      if (params.has('filters')) {
        let filters = [];
        try {
          filters = JSON.parse(params.get('filters'));
          this.defaultFilters = this.isDefaultFilters(filters);
          await this.getBrand();
        } catch (e) {}
        filters.push(this.slug);
        this.scrollToFilterResults();
        this.urlFilters$.next(filters);
      } else {
        this.scrollToFilterResults();
        this.defaultFilters = true;
        await this.getBrand();
        this.urlFilters$.next([this.slug]);
      }
    })();

    this.subscriptions.push(
      this.filtersNames$.subscribe(filtersNames => {
        this.changeFiltersNames(filtersNames);
      })
    );
    this.subscriptions.push(
      this.currentPage$.subscribe(current => {
        this.currentPage = +current;
      })
    );
    this.subscriptions.push(
      this.totalPages$.subscribe(total => (this.totalPages = total))
    );
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.store.dispatch(clearFilters());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getBrand = async () => {
    const brandName = this.utilsService.changeSlugToName(this.slug);
    const response = await this.brandService
      .getBrands(
        { name: brandName.replace(/&/g, '%26') },
        'name',
        'asc',
        undefined,
        undefined
      )
      .toPromise();

    if (response.data) {
      this.brand = response.data?.[0];
      this.addMetadata(response.data[0] ? response.data[0] : null);
      this.store.dispatch(getBrand({ brand: response.data[0] }));
      this.store.dispatch(setFiltersBrands({ brands: [response.data[0].id] }));

      this.filters = {
        ...this.filters,
        brandId: [response.data[0].id],
      };
      this.isLoadBrand = true;
    }
  };

  addMetadata(brand: Brand) {
    const hasUrlFilters =
      this.route.snapshot.paramMap.has('filters') && !this.defaultFilters;
    if (!hasUrlFilters) {
      setMetaTitle(
        `${brand.name} Sneakers Releases - Find your ${brand.name}  sneakers today`,
        this.metaService,
        this.titleService
      );

      setMetaKeywords(brand?.keywords ?? '', this.metaService);
      const description = brand?.meta_description
        ? brand?.meta_description
        : `Find out all the ${brand?.name} latest releases and deals across the most legit shops online | Moresneakers`;

      setMetaDescription(description, this.metaService);
      this.headingTitle$.next(brand?.name ?? '');
      this.headingDescription$.next(brand?.description ?? '');
    }

    this.metaService.updateTag({
      property: 'og:image',
      content: brand?.imgUrl,
    });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'https://moresneakers.com',
    });
  }

  getReleases(
    filters = {},
    page = 1,
    isNextPage = false,
    sortColumn = 'updatedAt',
    sortDirection = 'desc'
  ) {
    this.store.dispatch(setLoading({ loading: true }));
    this.store.dispatch(getReleases({ releases: [] }));

    const sub = this.releaseService
      .getReleasesByStatusGroup(
        this.currentStatusGroup,
        filters,
        sortColumn,
        sortDirection,
        page,
        this.pageSize
      )
      .pipe(
        map(response => {
          isNextPage
            ? this.store.dispatch(
                getReleasesNextPage({ releases: response.data })
              )
            : this.store.dispatch(getReleases({ releases: response.data }));

          this.store.dispatch(setTotalReleases({ total: response.dataCount }));
          this.store.dispatch(setTotalPages({ pageSize: this.pageSize }));
        }),
        finalize(() => {
          this.store.dispatch(setLoading({ loading: false }));
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  changeFilters(filtersObject) {
    this.filters = {
      brandId: filtersObject.filtersBrands,
      categoryId: filtersObject.filtersCategory,
      color: filtersObject.filtersColors,
      maxPriceEUR: filtersObject.filtersPrices
        ? filtersObject.filtersPrices.max
        : undefined,
      minPriceEUR: filtersObject.filtersPrices
        ? filtersObject.filtersPrices.min
        : undefined,
      name: filtersObject.name,
      status: filtersObject.filtersStatus,
      gender: filtersObject.filtersGender,
      onlyOnSale: filtersObject.onlyOnSale,
    };

    this.getReleases(
      this.filters,
      this.currentPage,
      false,
      this.sortOption.sortFieldName,
      this.sortOption.direction
    );
  }

  changeSort(sortOption: OptionSort) {
    this.store.dispatch(setSortOptions({ sortOption }));
    this.sortOption = sortOption;
    this.getReleases(
      this.filters,
      1,
      false,
      this.sortOption.sortFieldName,
      this.sortOption.direction
    );
  }

  isDefaultFilters = filters => filters.join('').trim() === 'all';
  isDefaultFilterNames = filters =>
    Object.keys(filters)
      .map(key => filters[key])
      .join('')
      .trim() === 'Allfalse';

  changeFiltersNames(filter) {
    if (this.isDefaultFilterNames(filter)) {
      return;
    }
    let title = '';
    let description = '';
    let metaDescription = '';
    let metaKeywords = '';
    let filterList = '';
    const statusGroup = this.currentStatusGroup || 'in-stock';
    switch (statusGroup) {
      case 'in-stock':
        filterList = ['gender', 'brand', 'color', 'category']
          .filter(key => filter.hasOwnProperty(key))
          .filter(key => {
            switch (key) {
              case 'gender':
                return filter[key] !== 'All';
              case 'brand':
                return this.slug || filter[key];
              default:
                return filter[key];
            }
          })
          .map(key => {
            switch (key) {
              case 'brand':
                return this.slug
                  ? this.utilsService.changeSlugToName(this.slug)
                  : filter[key];
              case 'gender':
                return filter[key].endsWith(' shoes')
                  ? filter[key].substring(0, filter[key].indexOf(' shoes'))
                  : filter[key];
              default:
                return filter[key];
            }
          })
          .join(' ');
        title += filterList ? `${filterList} shoes` : 'Shoes';
        if (filter.onSale) {
          title += ' on sale';
        }
        description = `Shop the ${title}`;
        metaDescription = `Cop the ${title}. More Sneakers presents to you the latest and upcoming sneakers all over the world. We provide shop links, raffles and sales at the most legit sneaker retailers online.`;
        metaKeywords = `${title}, releases, sneakers, cop, restock, deals, discounts, promo codes`;
        break;
      case 'coming-soon':
        filterList = ['gender', 'brand', 'color', 'category']
          .filter(key => filter.hasOwnProperty(key))
          .filter(key => {
            switch (key) {
              case 'gender':
                return filter[key] !== 'All';
              case 'category':
                return this.slug || filter[key];
              default:
                return filter[key];
            }
          })
          .map(key => {
            switch (key) {
              case 'category':
                return this.slug
                  ? this.utilsService.changeSlugToName(this.slug)
                  : filter[key];
              case 'gender':
                return filter[key].endsWith(' shoes')
                  ? filter[key].substring(0, filter[key].indexOf(' shoes'))
                  : filter[key];
              default:
                return filter[key];
            }
          })
          .join(' ');
        title += filterList ? `Upcoming ${filterList} shoes` : 'Upcoming shoes';
        description = title ? `Check the upcoming ${title}` : '';
        metaDescription = `Explore the upcoming ${title}. More Sneakers presents to you the latest and upcoming sneakers all over the world. We provide shop links, raffles and sales at the most legit sneaker retailers online.`;
        metaKeywords = `${title}, upcoming releases, sneakers, cop, release dates, calendar`;
        break;
      case 'resell-only':
        filterList = ['gender', 'brand', 'color', 'category']
          .filter(key => filter.hasOwnProperty(key))
          .filter(key => {
            switch (key) {
              case 'gender':
                return filter[key] !== 'All';
              case 'category':
                return this.slug || filter[key];
              default:
                return filter[key];
            }
          })
          .map(key => {
            switch (key) {
              case 'category':
                return this.slug
                  ? this.utilsService.changeSlugToName(this.slug)
                  : filter[key];
              case 'gender':
                return filter[key].endsWith(' shoes')
                  ? filter[key].substring(0, filter[key].indexOf(' shoes'))
                  : filter[key];
              default:
                return filter[key];
            }
          })
          .join(' ');
        title += filterList
          ? `${filterList} shoes for resell`
          : 'Shoes for resell';
        description = title ? `Check the upcoming ${title}` : '';
        metaDescription = `Shop the ${title} for resell. More Sneakers presents to you the latest and upcoming sneakers all over the world. We provide shop links, raffles, sales & more at the most legit sneaker retailers and marketplaces online.`;
        metaKeywords = `${title}, marketplaces, resell, secondary market`;
        break;
    }

    this.headingTitle$.next(title);
    if (this.route.snapshot.paramMap.has('slug')) {
      this.headingDescription$.next(this.brand?.description ?? '');
    }
    setMetaDescription(metaDescription, this.metaService);
    setMetaKeywords(metaKeywords, this.metaService);
    setMetaTitle(
      `${title} | Moresneakers`,
      this.metaService,
      this.titleService
    );
  }

  scrollToFilterResults = () => {
    if (document.getElementById('filterContainer')) {
      this.viewScroller.scrollToAnchor('filterContainer');
    }
  };
}
