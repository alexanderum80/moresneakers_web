import { ReleaseGroupPagination } from '../../../../home/models/release.model';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BrandsService } from 'src/app/brand/services/brand.service';
import { Release } from 'src/app/home/models/release.model';
import { Brand } from 'src/app/brand/models/brand';
import { combineLatest, Subscription } from 'rxjs';
import { Category } from 'src/app/home/models/category.model';
import { CategoriesService } from 'src/app/category/services/categories.service';
import { select, Store } from '@ngrx/store';
import {
  setFilterOnlyOnSale,
  setFilters,
  setFiltersBrands,
  setFiltersCategory,
  setFiltersColor,
  setFiltersGender,
  setFiltersNames,
  setFiltersPrice,
  setFiltersSize,
} from '../../../../releases/state/release.action';
import {
  selectCurrentPage,
  selectFilterBrands,
  selectFilterCategory,
  selectFilterColors,
  selectFilterGender,
  selectFilterOnlyOnSale,
  selectFilters,
  selectFiltersNames,
  selectLoading,
  selectTotalPages,
} from '../../../../releases/state/release.selector';
import {
  COLORS_OPTIONS,
  OptionSort,
  SIZE_OPTIONS,
  SORT_OPTIONS,
} from 'src/app/home/models/sortOptions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-releases-group-pagination',
  templateUrl: './releases-group-pagination.component.html',
  styleUrls: ['./releases-group-pagination.component.scss'],
})
export class ReleasesGroupPaginationComponent implements OnInit, OnDestroy {
  @Input() releases: Release[];
  @Input() releasesCount: number;
  @Input() totalReleases: number;
  @Input() categoryFilterName: string;
  @Input() ignoreFilters: string[] = [];
  @Input() totalPages = 1;
  @Input() releasesXPage = 28;
  private _urlFilters: string[] = [];
  @Input() get urlFilters(): string[] {
    return this._urlFilters;
  }

  set urlFilters(value: string[]) {
    this._urlFilters = value;
    this.getFilters();
  }

  @Output() changeFilters: EventEmitter<any> = new EventEmitter();
  @Output() changeSortOption: EventEmitter<OptionSort> = new EventEmitter();
  @Output() changeGroup: EventEmitter<any> = new EventEmitter();
  @Output() paginatorEmiter: EventEmitter<boolean | number> =
    new EventEmitter();

  filtersNames$ = this.store.pipe(select(selectFiltersNames));
  selectedBrands$ = this.store.pipe(select(selectFilterBrands));
  selectedCategories$ = this.store.pipe(select(selectFilterCategory));
  selectedOnlyOnSale$ = this.store.pipe(select(selectFilterOnlyOnSale));
  selectedGenders$ = this.store.pipe(select(selectFilterGender));
  selectedColors$ = this.store.pipe(select(selectFilterColors));
  currentPage$ = this.store.pipe(select(selectCurrentPage));
  totalPages$ = this.store.pipe(select(selectTotalPages));
  filters$ = this.store.pipe(select(selectFilters));
  loading$ = this.store.pipe(select(selectLoading));
  statusGroup;
  collapseFilters = false;
  currentPage = 1;
  sortOptions: OptionSort[] = SORT_OPTIONS;
  subscriptions: Subscription[] = [];
  groups: ReleaseGroupPagination[] = [];
  coloredOptions = COLORS_OPTIONS;
  sizeOptions = SIZE_OPTIONS;
  brands: Brand[];
  categories: Category[];
  genderFilters = [
    { id: 'All', name: 'All' },
    { id: 'Men', name: "Men's shoes" },
    { id: 'Women', name: "Women's shoes" },
    { id: 'Big Kids', name: "Big Kids' shoes" },
    { id: 'Preschool', name: "Little Kids' shoes" },
    { id: 'Toddler', name: "Babies and Toddlers' shoes" },
  ];
  filters = {};
  filtersNames: any = {};

  constructor(
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
    private store: Store,
    public router: Router
  ) {
    this.setGroups();
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.getStatusGroup();
    this.subscriptions.push(
      combineLatest([this.currentPage$, this.totalPages$]).subscribe(
        ([current, total]) => {
          this.totalPages = total;
          this.currentPage = +current;
        }
      )
    );
    this.filters$.subscribe(filters => (this.filters = filters));
    this.filtersNames$.subscribe(
      filtersNames => (this.filtersNames = filtersNames)
    );
  }

  getFilters = () => {
    const promiseList = [
      this.brandsService.getAllBrands().toPromise(),
      this.categoriesService.getAllCategories().toPromise(),
    ];

    Promise.all(promiseList).then(response => {
      this.brands = response[0] as Brand[];
      this.categories = (response[1] as Category[]).filter(
        category => !category.isGender
      );
      this.checkCategoryFilter();
      this.setFiltersFromUrl();
    });
  };

  setFiltersFromUrl = () => {
    if (this._urlFilters.length) {
      const filters: any = {};
      this._urlFilters.forEach(filter => {
        if (filter === 'on-sale') {
          filters.onlyOnSale = true;
          this.setFilterName(true, 'onSale');
        } else {
          const brandId = this.brands?.find(
            brand =>
              brand.name.toLowerCase().replace(/-/g, ' ') ===
              filter.toLowerCase().replace(/-/g, ' ').replace(/_/g, ' ')
          )?.id;
          if (brandId) {
            filters.filtersBrands = [brandId];
          }

          const categoryId = this.categories?.find(
            category =>
              category.name.toLowerCase() ===
              filter.toLowerCase().replace(/-/g, ' ')
          )?.id;
          if (categoryId) {
            filters.filtersCategory = [categoryId];
          }

          const genderId = this.genderFilters.find(
            gender =>
              gender.id.toLowerCase() ===
              filter.toLowerCase().replace(/-/g, ' ')
          )?.id;
          if (genderId) {
            filters.filtersGender = [genderId];
          }

          const colorId = this.coloredOptions.find(
            color =>
              color.name.toLowerCase() ===
              filter.toLowerCase().replace(/-/g, ' ')
          )?.id;
          if (colorId) {
            filters.filtersColors = [colorId];
          }
        }
      });
      this.setFilters(filters);
    }
  };

  getStatusGroup() {
    const url = this.router.url.split('?')[0];
    const urlRouter = url.split('/');

    this.statusGroup =
      urlRouter[1] !== 'releases'
        ? urlRouter[3] || 'in-stock'
        : (this.statusGroup = urlRouter[2] || 'in-stock');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getUrlPathFromFilters = (filtersNames: any) => {
    let path = '';
    ['gender', 'brand', 'category', 'color', 'onSale'].forEach(filter => {
      if (
        filter === 'onSale' &&
        filtersNames.hasOwnProperty('onSale') &&
        Boolean(filtersNames[filter])
      ) {
        path += `/on-sale`;
      } else if (
        this.categoryFilterName !== filter &&
        filtersNames.hasOwnProperty(filter) &&
        filtersNames[filter]
      ) {
        let value = '';
        switch (filter) {
          case 'gender':
            const gender = this.genderFilters.find(
              g => g.name === filtersNames[filter]
            );
            value = gender ? gender.id : '';
            break;
          default:
            value = filtersNames[filter];
        }
        if (value) {
          path += `/${value.toLowerCase().replace(/ /g, '-')}`;
        }
      }
    });
    return path;
  };

  setFilters(filters) {
    this.store.dispatch(setFilters({ filters }));
    this.changeFilters.emit(filters);
  }

  setFilterName($event, filterName) {
    const result = { ...this.filtersNames };
    result[filterName] = $event;
    this.store.dispatch(setFiltersNames({ filtersNames: result }));
  }

  setFiltersGender($event) {
    this.store.dispatch(setFiltersGender({ gender: $event }));
    this.loadPageByFilter();
  }

  setFilterOnlyOnSale($event) {
    this.store.dispatch(
      setFilterOnlyOnSale({ onlyOnSale: $event.target.checked })
    );
    this.setFilterName($event.target.checked, 'onSale');
    this.loadPageByFilter();
  }

  setFiltersCategory($event) {
    this.store.dispatch(setFiltersCategory({ category: $event }));
    this.loadPageByFilter();
  }

  setFiltersBrands($event) {
    this.store.dispatch(setFiltersBrands({ brands: $event }));
    this.loadPageByFilter();
  }

  setFiltersColors($event) {
    this.store.dispatch(setFiltersColor({ colors: $event }));
    this.loadPageByFilter();
  }

  setFiltersSize($event) {
    this.store.dispatch(setFiltersSize({ sizes: $event }));
  }

  setFiltersPrice($event) {
    this.store.dispatch(setFiltersPrice({ prices: $event }));
    this.changeFilters.emit({ ...this.filters, ...{ prices: $event } });
  }

  changeSort($event) {
    this.loadPageBySort($event);
  }

  loadPageByFilter = () => {
    const url = `${this.router.url.substr(
      0,
      this.router.url.indexOf(`/${this.statusGroup}`)
    )}/${this.statusGroup}${this.getUrlPathFromFilters(this.filtersNames)}`;
    void this.router.navigate([url], {
      queryParamsHandling: 'merge',
    });
  };

  loadPageBySort = sort => {
    const url = this.router.url.split('?')[0];
    void this.router.navigate([url], {
      queryParams: {
        sort: sort.id,
      },
      queryParamsHandling: 'merge',
    });
  };

  checkCategoryFilter() {
    if (this.categoryFilterName) {
      const currentCategory = this.categories.find(
        category => category.name === this.categoryFilterName
      );
      if (currentCategory) {
        this.setFiltersCategory([currentCategory.id]);
      }
    }
  }

  getGroupHref(group: number): string {
    let statusGroup;
    switch (group) {
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

    const url = this.router.url.split('?')[0];
    const urlRouter = url.split('/');

    return urlRouter[1] !== 'releases'
      ? urlRouter[1] + '/' + urlRouter[2] + '/' + statusGroup
      : this.router.url.split('/')[1] + '/' + statusGroup;
  }

  getStatusNumber(status: string) {
    switch (status) {
      case 'in-stock':
        return 1;
      case 'coming-soon':
        return 2;
      case 'resell-only':
        return 3;
      default:
        break;
    }
  }

  arrayLoading() {
    return new Array(this.releasesXPage);
  }

  private setGroups() {
    ['in stock', 'upcoming', 'resell only'].forEach((group, index) => {
      this.groups.push({ name: group, href: this.getGroupHref(index + 1) });
    });
  }
}
