import {
  clearState,
  getHottestReleases,
  setCategory,
  setFiltersName,
  setLoading,
  setStatusGroup,
} from 'src/app/releases/state/release.action';
import { OptionSort } from '../../../home/models/sortOptions';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReleasesService } from 'src/app/home/services/release.service';
import {
  selectCategory,
  selectFilters,
  selectHottestReleases,
  selectLoading,
  selectReleasesCount,
  selectReleasesList,
  selectStatusGroup,
  selectTotalReleases,
} from '../../state/release.selector';
import { filter, finalize, map } from 'rxjs/operators';
import {
  clearFilters,
  getReleases,
  getReleasesNextPage,
  setFiltersGender,
  setSortOptions,
  setTotalReleases,
} from '../../state/release.action';
import { combineLatest, Subscription } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { LayoutService } from 'src/app/home/services/layout.service';
import { Meta, Title } from '@angular/platform-browser';
import { HomeLayout } from 'src/app/home/models/homeLayout.model';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';

@Component({
  selector: 'app-releases-page',
  templateUrl: './releases-page.component.html',
  styleUrls: ['./releases-page.component.scss'],
})
export class ReleasesPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  layout: HomeLayout;

  releases$ = this.store.pipe(select(selectReleasesList));
  releasesCount$ = this.store.pipe(select(selectReleasesCount));
  totalReleases$ = this.store.pipe(select(selectTotalReleases));
  loading$ = this.store.pipe(select(selectLoading));
  currentCategory$ = this.store.pipe(select(selectCategory));
  hottestReleases$ = this.store.pipe(select(selectHottestReleases));
  filters$ = this.store.pipe(select(selectFilters));
  currentStatusGroup$ = this.store.pipe(select(selectStatusGroup));
  currentPage: number;
  searchTerm: string;
  currentCategory: string;
  currentGender: string;
  currentGenderInitial: string;
  filters: any = {};
  sortOption: OptionSort = {
    direction: 'desc',
    sortFieldName: 'updatedAt',
    name: 'updatedAt',
  };
  selectedGroup = 1;
  currentStatusGroup: string;
  slug: string;

  constructor(
    private store: Store,
    private releaseService: ReleasesService,
    private route: ActivatedRoute,
    private router: Router,
    private utilsService: UtilsService,
    public layoutService: LayoutService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.store.dispatch(clearState());
    this.slug = this.route.snapshot.paramMap.get('slug');
    if (this.slug) {
      this.currentCategory = this.slug;
      this.store.dispatch(
        setCategory({ category: this.utilsService.changeSlugToName(this.slug) })
      );
    }
    this.currentGender = this.route.snapshot.paramMap.get('gender');
    this.currentPage = 1;
    this.route.queryParams.subscribe(params => {
      this.currentGenderInitial = params.gender;

      // search by releaseName in the same component
      if (this.searchTerm && params.releaseName) {
        this.searchTerm = params.releaseName;
        this.store.dispatch(setFiltersName({ name: this.searchTerm }));
        this.changeFilters({
          filterName: this.searchTerm,
        });
      }
    });
    this.currentStatusGroup = 'in-stock';
  }

  ngOnInit(): void {
    let needGetReleases = true;
    this.store.dispatch(clearFilters());
    this.getDataFromRouter();

    // This component is rendered for many cases for example when user click in releases "default way"
    // When user search in home page in search bar
    // When user select a category in categories page
    // When user seleact a brand in brands page

    const sub = this.route.queryParams
      .pipe(
        map(queryParam => {
          this.searchTerm = queryParam.releaseName;
        })
      )
      .subscribe();
    this.subscriptions.push(sub);

    // If user makes a search in home page we load with name filter and get releases in other case
    if (this.searchTerm) {
      this.store.dispatch(setFiltersName({ name: this.searchTerm }));

      this.changeFilters({
        filterName: this.searchTerm,
      });
      needGetReleases = false;
    } else {
      // If we have a current category is because we are in category/:slug route and we load the
      // releases filter by category in changeFilter event
      if (!this.currentCategory && !this.currentGenderInitial) {
        this.filters$
          .pipe(
            map(response => {
              this.filters = this.updateFilters(response);
            })
          )
          .subscribe();
      }
    }
    if (this.currentGenderInitial) {
      this.store.dispatch(
        setFiltersGender({ gender: [this.currentGenderInitial] })
      );
      this.changeFilters({ filtersGender: this.currentGenderInitial });
      needGetReleases = false;
    }

    // if we have a brandId we need to filter by BrandId because user click a brand from Brand page
    const brandId = this.router.getCurrentNavigation()
      ? this.router.getCurrentNavigation().extras.state.brandId
      : undefined;
    if (brandId) {
      this.changeFilters({ filtersBrands: [brandId] });
      needGetReleases = false;
    }

    if (needGetReleases) {
      this.getReleases(this.filters);
    }

    this.getLayout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  addMetadata(heading) {
    const title = heading?.pageTitle ?? heading?.title ?? '';
    setMetaTitle(
      title ? `${title} | More Sneakers` : this.generateTitleText(),
      this.metaService,
      this.titleService
    );
    setMetaKeywords(heading?.keywords ?? '', this.metaService);
    setMetaDescription(
      'Moresneakers is helping you to buy the latest and upcoming sneakers all over the world by providing shop links, raffles and sales.',
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

  getDataFromRouter() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationStart))
      .subscribe(() => {
        const navigation = this.router.getCurrentNavigation();
        this.selectedGroup = navigation.extras.state?.data
          ? navigation.extras.state.data
          : 1;

        let statusGroup;
        switch (this.selectedGroup) {
          case 1:
            statusGroup = 'in-stock';
            break;
          case 2:
            statusGroup = 'coming-soon';
            break;
          case 3:
            statusGroup = 'resell-only';
            break;
          default:
            statusGroup = 'in-stock';
            break;
        }
        this.store.dispatch(setStatusGroup({ statusGroup }));
      });
  }

  getLayout() {
    const sub = this.layoutService
      .getLayout('releases', '')
      .pipe(
        map(response => {
          this.layout = response.data;
          const { heading } = this.layout;
          this.addMetadata(heading);
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
    sortColumn = 'updatedAt',
    sortDirection = 'desc'
  ) {
    this.store.dispatch(setLoading({ loading: true }));
    const sub = this.releaseService
      .getReleasesByStatusGroup(
        this.currentStatusGroup,
        filters,
        sortColumn,
        sortDirection,
        page,
        16
      )
      .pipe(
        map(response => {
          isNextPage
            ? this.store.dispatch(
                getReleasesNextPage({ releases: response.data })
              )
            : this.store.dispatch(getReleases({ releases: response.data }));

          this.store.dispatch(setTotalReleases({ total: response.dataCount }));
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
      onlyOnSale: filtersObject.onlyOnSale,
    };
  }

  changeFilters(filtersObject) {
    this.currentPage = 1;
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
      name: filtersObject.filterName,
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

  onScroll() {
    let oneTime = true;
    const sub = combineLatest([
      this.releasesCount$,
      this.totalReleases$,
    ]).subscribe(([count, total]) => {
      if (count < total && oneTime) {
        oneTime = false;
        this.currentPage++;

        this.getReleases(
          this.filters,
          this.currentPage,
          true,
          this.sortOption.sortFieldName,
          this.sortOption.direction
        );
      }
    });

    this.subscriptions.push(sub);
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

  changeGroup(group: string) {
    this.currentStatusGroup = group;
    this.currentPage = 1;
    this.getReleases(
      this.filters,
      this.currentPage,
      false,
      this.sortOption.sortFieldName,
      this.sortOption.direction
    );
  }

  generateTitleText(): string {
    let titleText = 'Releases';

    if (this.slug) {
      titleText = this.utilsService.changeSlugToName(this.slug);
    } else if (this.currentGender) {
      titleText = this.currentGender;
    }

    return titleText + ' | More Sneakers';
  }
}
