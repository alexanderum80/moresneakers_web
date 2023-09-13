import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { CategoriesService } from 'src/app/category/services/categories.service';
import { Category } from 'src/app/home/models/category.model';
import { HomeLayout } from 'src/app/home/models/homeLayout.model';
import { LayoutService } from 'src/app/home/services/layout.service';
import { ReleasesService } from 'src/app/home/services/release.service';

import { UtilsService } from 'src/app/shared/services/utils.service';
import { OptionSort, SORT_OPTIONS } from '../../../home/models/sortOptions';
import {
  getHottestReleases,
  getReleases,
  getReleasesNextPage,
  setCategory,
  setCurrentPage,
  setFiltersGender,
  setFiltersName,
  setLoading,
  setSortOptions,
  setStatusGroup,
  setTotalPages,
  setTotalReleases,
} from '../../state/release.action';
import {
  selectCategory,
  selectCurrentPage,
  selectFiltersNames,
  selectHottestReleases,
  selectLoading,
  selectReleasesCount,
  selectReleasesList,
  selectTotalPages,
  selectTotalReleases,
} from '../../state/release.selector';
import { ViewportScroller } from '@angular/common';
import { clearState } from '../../../style/state/style.action';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';

@Component({
  selector: 'app-releases-page-pagination',
  templateUrl: './releases-page-pagination.component.html',
  styleUrls: ['./releases-page-pagination.component.scss'],
})
export class ReleasesPagePaginationComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  layout: HomeLayout;
  releases$ = this.store.pipe(select(selectReleasesList));
  releasesCount$ = this.store.pipe(select(selectReleasesCount));
  totalReleases$ = this.store.pipe(select(selectTotalReleases));
  currentPage$ = this.store.pipe(select(selectCurrentPage));
  loading$ = this.store.pipe(select(selectLoading));
  currentCategory$ = this.store.pipe(select(selectCategory));
  hottestReleases$ = this.store.pipe(select(selectHottestReleases));
  totalPages$ = this.store.pipe(select(selectTotalPages));
  urlFilters$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  filtersNames$ = this.store.pipe(select(selectFiltersNames));
  category: Category;
  currentPage = 1;
  searchTerm: string;
  currentCategory: string;
  currentGender: string;
  currentGenderInitial: string;
  filters: any = {
    filtersCategory: [],
    filtersBrands: [],
    filtersColors: [],
    filtersSize: [],
    filtersPrices: ['0', '1000'],
    filtersStatus: 'available',
    filtersGender: ['All'],
    filterName: '',
    onlyOnSale: false,
  };
  sortOption: OptionSort = {
    direction: 'desc',
    sortFieldName: 'updatedAt',
    name: 'updatedAt',
  };
  currentStatusGroup: string;
  slug: string;
  pageSize = 28;
  headingTitle$ = new BehaviorSubject<string>('');
  headingDescription$ = new BehaviorSubject<string>('');
  defaultFilters = false;

  constructor(
    private store: Store,
    private releaseService: ReleasesService,
    private route: ActivatedRoute,
    private router: Router,
    private utilsService: UtilsService,
    public layoutService: LayoutService,
    private titleService: Title,
    private metaService: Meta,
    private categoryService: CategoriesService,
    private viewScroller: ViewportScroller
  ) {
    this.store.dispatch(clearState());

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
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    const url = this.router.url.split('?')[0];
    const urlRouter = url.split('/');
    this.currentStatusGroup =
      urlRouter[1] === 'categories' ? urlRouter[3] : urlRouter[2];
    const params = this.route.snapshot.paramMap;
    const queryParams = this.route.snapshot.queryParams;

    (async () => {
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

      let page = queryParams.page;
      if (page && page === '1') {
        void this.router.navigateByUrl(this.router.url.split('?')[0]);
      }

      if (queryParams.hasOwnProperty('page')) {
        page = +queryParams.page || 1;
        if (page <= 1) {
          void this.router.navigate([url]);
        }
        this.currentPage = page;
        this.store.dispatch(setCurrentPage({ current: page }));
      }
      this.searchTerm = queryParams.releaseName;
      this.store.dispatch(
        setStatusGroup({
          statusGroup: this.currentStatusGroup || 'in-stock',
        })
      );

      this.currentGenderInitial = queryParams.gender;
      if (this.searchTerm && queryParams.releaseName) {
        this.searchTerm = queryParams.releaseName;
        this.store.dispatch(setFiltersName({ name: this.searchTerm }));
      }

      if (params.has('gender')) {
        this.currentGender = params.get('gender');
      }

      if (params.has('slug')) {
        this.slug = params.get('slug');
      }

      if (params.has('filters')) {
        let filters = [];
        try {
          filters = JSON.parse(params.get('filters'));
          this.defaultFilters = this.isDefaultFilters(filters);
        } catch (e) {}
        if (this.slug) {
          this.currentCategory = this.slug;
          filters.push(this.slug);
        }
        await this.getLayout();
        this.scrollToFilterResults();
        this.urlFilters$.next(filters);
      } else if (this.slug) {
        this.currentCategory = this.slug;
        this.store.dispatch(
          setCategory({
            category: this.utilsService.changeSlugToName(this.slug),
          })
        );

        this.defaultFilters = true;
        await this.getLayout();
        this.urlFilters$.next([this.slug]);
      } else {
        this.defaultFilters = true;
        await this.getLayout();
        this.changeFilters(this.filters);
      }

      // If user makes a search in home page we load with name filter and get releases in other case
      if (this.searchTerm) {
        this.store.dispatch(setFiltersName({ name: this.searchTerm }));
      }

      if (this.currentGenderInitial) {
        this.store.dispatch(
          setFiltersGender({ gender: [this.currentGenderInitial] })
        );
        this.changeFilters({ filtersGender: this.currentGenderInitial });
      }
    })();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  async addMetadata(heading) {
    const route = this.router.url;
    let description = '';
    const hasUrlFilters =
      this.route.snapshot.paramMap.has('filters') && !this.defaultFilters;
    if (route.includes('releases') && !hasUrlFilters) {
      setMetaKeywords(heading?.keywords ?? '', this.metaService);
      description =
        'Moresneakers is helping you to buy the latest and upcoming sneakers all over the world by providing shop links, raffles and sales.';
    }
    if (this.slug) {
      const categoryName = this.utilsService.changeSlugToName(this.slug);
      const response = await this.categoryService
        .getCategories(
          { name: categoryName.replace(/&/g, '%26') },
          'name',
          'asc',
          0,
          10
        )
        .toPromise();

      this.category = response.data?.[0];
      if (!hasUrlFilters) {
        setMetaKeywords(
          this.category?.keywords
            ? this.category?.keywords
            : `${this.category?.name}, buy, authentic, sneakers, shoes, footwear, releases, real`,
          this.metaService
        );

        setMetaDescription(
          this.category?.meta_description
            ? this.category?.meta_description
            : `Buy ${this.category.name} sneakers online. All the best ${this.category.name} releases and colorways available to buy online. Release dates, times, best prices and direct shop links | Moresneakers`,
          this.metaService
        );
        this.headingTitle$.next(this.category?.name);
        this.headingDescription$.next(this.category?.description ?? '');
      }
    } else {
      if (!hasUrlFilters) {
        setMetaDescription(
          heading?.meta_description ?? description,
          this.metaService
        );
      }
    }

    this.metaService.updateTag({
      property: 'og:image',
      content: heading?.imgUrl ?? '',
    });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'https://moresneakers.com',
    });
  }

  async getLayout() {
    const route = this.router.url;
    const isReleaseContent = route.includes('releases');

    let _layoutAlt = 'in_stock';
    if (route.includes('releases/coming-soon')) {
      _layoutAlt = 'releases_coming_soon';
    } else if (route.includes('releases/resell-only')) {
      _layoutAlt = 'resell_only';
    }
    const response = await this.layoutService
      .getLayout(isReleaseContent ? _layoutAlt : 'categories', '')
      .toPromise();

    this.layout = response.data;
    const { heading } = this.layout;
    await this.addMetadata(heading);
    if (!this.route.snapshot.paramMap.has('filters') || this.defaultFilters) {
      if (isReleaseContent) {
        const title = heading?.pageTitle ?? heading?.title ?? '';
        setMetaTitle(
          title ? `${title} | More Sneakers` : this.generateTitleText(),
          this.metaService,
          this.titleService
        );
      } else {
        const categoryName = this.utilsService.changeSlugToName(this.slug);
        setMetaTitle(
          `${categoryName} Sneakers Releases - Find your ${categoryName} sneakers today`,
          this.metaService,
          this.titleService
        );
      }
    }

    if (this.layout.hottest.displayOnPage) {
      this.getHottestReleases();
    }
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

  getReleases(
    filters = {},
    page = 1,
    isNextPage = false,
    sortColumn = 'updatedAt',
    sortDirection = 'desc'
  ) {
    this.store.dispatch(setLoading({ loading: true }));
    this.store.dispatch(getReleases({ releases: [] }));
    this.subscriptions.push(
      this.releaseService
        .getReleasesByStatusGroup(
          this.currentStatusGroup || 'in-stock',
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

            this.store.dispatch(
              setTotalReleases({ total: response.dataCount })
            );
            this.store.dispatch(setTotalPages({ pageSize: this.pageSize }));
          }),
          finalize(() => {
            this.store.dispatch(setLoading({ loading: false }));
          })
        )
        .subscribe()
    );
  }

  updateFilters(filtersObject) {
    return {
      brandId: filtersObject.filtersBrands,
      categoryId: filtersObject.filtersCategory,
      color: filtersObject.filtersColors,
      maxPriceEUR: filtersObject.filtersPrices
        ? filtersObject.filtersPrices.max
        : undefined,
      minPriceEUR: filtersObject.filtersPrices
        ? filtersObject.filtersPrices.min
        : undefined,
      name: filtersObject.filterName,
      gender: filtersObject.filtersGender,
      onlyOnSale: filtersObject.onlyOnSale,
    };
  }

  changeFilters(filters) {
    // this.store.dispatch(setCurrentPage({ current: 1 }));
    this.filters = {
      brandId: filters.filtersBrands,
      categoryId: filters.filtersCategory,
      color: filters.filtersColors,
      maxPriceEUR: filters.filtersPrices
        ? filters.filtersPrices.max
        : undefined,
      minPriceEUR: filters.filtersPrices
        ? filters.filtersPrices.min
        : undefined,
      name: filters.filterName,
      gender: filters.filtersGender,
      onlyOnSale: filters.onlyOnSale,
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
      this.headingDescription$.next(this.category?.description ?? '');
    }
    setMetaDescription(metaDescription, this.metaService);
    setMetaKeywords(metaKeywords, this.metaService);
    setMetaTitle(
      `${title} | Moresneakers`,
      this.metaService,
      this.titleService
    );
  }

  generateTitleText(): string {
    let titleText = '';

    if (this.slug) {
      titleText = this.utilsService.changeSlugToName(this.slug);
    } else if (this.currentGender) {
      titleText = this.currentGender;
    }

    return `${titleText} releases | Moresneakers`;
  }

  scrollToFilterResults = () => {
    if (document.getElementById('filterContainer')) {
      this.viewScroller.scrollToAnchor('filterContainer');
    }
  };
}
