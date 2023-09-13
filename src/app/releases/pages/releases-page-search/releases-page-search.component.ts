import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { CategoriesService } from 'src/app/category/services/categories.service';
import { Category } from 'src/app/home/models/category.model';
import { HomeLayout } from 'src/app/home/models/homeLayout.model';
import { LayoutService } from 'src/app/home/services/layout.service';
import { ReleasesService } from 'src/app/home/services/release.service';
import {
  clearFilters,
  clearState,
  getHottestReleases,
  setCurrentPage,
  setLoading,
  setTotalPages,
} from 'src/app/releases/state/release.action';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OptionSort } from '../../../home/models/sortOptions';
import {
  getReleases,
  setSortOptions,
  setTotalReleases,
} from '../../state/release.action';
import {
  selectHottestReleases,
  selectLoading,
  selectReleasesList,
  selectTotalPages,
  selectTotalReleases,
} from '../../state/release.selector';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';

@Component({
  selector: 'app-releases-page-search',
  templateUrl: './releases-page-search.component.html',
  styleUrls: ['./releases-page-search.component.scss'],
})
export class ReleasesPageSearchComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  layout: HomeLayout;

  releases$ = this.store.pipe(select(selectReleasesList));
  totalReleases$ = this.store.pipe(select(selectTotalReleases));
  loading$ = this.store.pipe(select(selectLoading));
  hottestReleases$ = this.store.pipe(select(selectHottestReleases));
  totalPages$ = this.store.pipe(select(selectTotalPages));
  category: Category;

  currentPage: number;
  searchTerm: string;

  filters: any = {};
  sortOption: OptionSort = {
    direction: 'desc',
    sortFieldName: 'releaseDate',
    name: 'releaseDate',
  };
  slug: string;

  pageSize = 32;
  totalPages = 1;
  needFirstLoad = true;

  constructor(
    private store: Store,
    private releaseService: ReleasesService,
    private route: ActivatedRoute,
    private router: Router,
    private utilsService: UtilsService,
    public layoutService: LayoutService,
    private titleService: Title,
    private metaService: Meta,
    private categoryService: CategoriesService
  ) {
    this.store.dispatch(clearState());
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.totalPages$.pipe(map(resp => (this.totalPages = resp))).subscribe()
    );

    this.subscriptions.push(
      this.route.queryParams
        .pipe(
          map(queryParam => {
            this.searchTerm = queryParam.releaseName;
            this.currentPage = queryParam.page || 1;

            this.store.dispatch(
              setCurrentPage({ current: queryParam.page || 1 })
            );

            this.searchTerm = queryParam.releaseName;

            if (this.needFirstLoad || this.searchTerm !== this.filters.name) {
              this.filters = {
                name: this.searchTerm,
              };
              this.store.dispatch(clearFilters());
            }

            this.getReleases(
              this.filters,
              this.currentPage,
              true,
              this.sortOption.sortFieldName,
              this.sortOption.direction
            );

            this.needFirstLoad = false;
          })
        )
        .subscribe()
    );

    this.getLayout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  addMetadata(heading) {
    const route = this.router.url;
    let description = '';
    if (route.includes('releases')) {
      setMetaKeywords(heading?.keywords ?? '', this.metaService);
      description =
        'Moresneakers is helping you to buy the latest and upcoming sneakers all over the world by providing shop links, raffles and sales.';
    }
    if (this.slug) {
      const categoryName = this.utilsService.changeSlugToName(this.slug);
      const sub = this.categoryService
        .getCategories({ name: categoryName }, 'name', 'asc', 0, 10)
        .pipe(
          map(resp => {
            this.category = resp.data[0];
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
          })
        )
        .subscribe();
      this.subscriptions.push(sub);
    } else {
      setMetaDescription(
        heading?.meta_description ?? description,
        this.metaService
      );
    }

    this.metaService.updateTag({
      property: 'og:image',
      content: heading?.imgUrl,
    });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'https://moresneakers.com',
    });
  }

  getLayout() {
    const route = this.router.url;
    const isReleaseContent = route.includes('releases');
    const sub = this.layoutService
      .getLayout(isReleaseContent ? 'releases' : 'categories', '')
      .pipe(
        map(response => {
          this.layout = response.data;
          const { heading } = this.layout;
          this.addMetadata(heading);
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
              `${categoryName} releases | Moresneakers`,
              this.metaService,
              this.titleService
            );
          }
          if (this.layout.hottest.displayOnPage) {
            this.getHottestReleases();
          }
        })
      )
      .subscribe();

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

  getReleases(
    filters = {},
    page = 1,
    isNextPage = false,
    sortColumn = 'releaseDate',
    sortDirection = 'desc'
  ) {
    this.store.dispatch(setLoading({ loading: true }));

    const sub = this.releaseService
      .getReleasesSearch(
        this.searchTerm,
        page,
        this.pageSize,
        sortDirection,
        sortColumn
      )
      .pipe(
        map(response => {
          this.store.dispatch(getReleases({ releases: response.data }));

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
    };
  }

  changeFilters(filtersObject) {
    this.store.dispatch(setCurrentPage({ current: 1 }));

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
      name: this.searchTerm,
      gender: filtersObject.filtersGender,
      onlyOnSale: filtersObject.onlyOnSale,
    };

    if (this.currentPage === 1) {
      this.getReleases(
        this.filters,
        this.currentPage,
        false,
        this.sortOption.sortFieldName,
        this.sortOption.direction
      );
    } else {
      this.currentPage = 1;

      this.router.navigate([this.router.url.split('?')[0]], {
        queryParams: {
          page: 1,
        },
        queryParamsHandling: 'merge',
      });
    }
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

  generateTitleText(): string {
    let titleText = '';

    if (this.slug) {
      titleText = this.utilsService.changeSlugToName(this.slug);
    }

    return `${titleText} | Moresneakers`;
  }
}
