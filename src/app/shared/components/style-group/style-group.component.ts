import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Release } from '../../../home/models/release.model';
import { COLORS_OPTIONS, OptionSort } from 'src/app/home/models/sortOptions';
import { Brand } from '../../../brand/models/brand';
import { Category } from '../../../home/models/category.model';
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
} from '../../../style/state/style.action';
import {
  selectFilterBrands,
  selectFilterCategory,
  selectFilterColors,
  selectFilterGender,
  selectFilterOnlyOnSale,
  selectFilters,
  selectFiltersNames,
  selectLoading,
} from '../../../style/state/style.selector';

import { Subscription } from 'rxjs';
import { BrandsService } from '../../../brand/services/brand.service';
import { CategoriesService } from '../../../category/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-style-group',
  templateUrl: './style-group.component.html',
  styleUrls: ['./style-group.component.scss'],
})
export class StyleGroupComponent implements OnInit, OnDestroy {
  @Input() releases: Release[];
  @Input() count: number;
  @Input() loading: boolean;
  @Input() currentPage: number;
  @Input() totalPages: number;
  @Input() ignoreFilters: string[] = [];
  @Input() categoryFilterName: string;
  @Input() slug: string;
  private _urlFilters: string[] = [];
  @Input() get urlFilters(): string[] {
    return this._urlFilters;
  }

  set urlFilters(value: string[]) {
    this._urlFilters = value;
    this.getFilters();
  }

  @Output() changeSortOption: EventEmitter<OptionSort> = new EventEmitter();
  @Output() changeFilters: EventEmitter<any> = new EventEmitter();

  filtersNames$ = this.store.pipe(select(selectFiltersNames));
  selectedOnlyOnSale$ = this.store.pipe(select(selectFilterOnlyOnSale));
  selectedBrands$ = this.store.pipe(select(selectFilterBrands));
  selectedCategories$ = this.store.pipe(select(selectFilterCategory));
  selectedGenders$ = this.store.pipe(select(selectFilterGender));
  selectedColors$ = this.store.pipe(select(selectFilterColors));
  filters$ = this.store.pipe(select(selectFilters));
  loading$ = this.store.pipe(select(selectLoading));
  collapseFilters = false;
  coloredOptions = COLORS_OPTIONS;
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
  filtersNames: any = {};
  filters: {};

  subscriptions: Subscription[] = [];

  constructor(
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
    private store: Store,
    public router: Router
  ) {
    this.subscriptions.push(
      this.filters$.subscribe(filters => (this.filters = filters))
    );
  }

  ngOnInit() {
    this.filtersNames$.subscribe(
      filtersNames => (this.filtersNames = filtersNames)
    );
  }

  changeSort(sortOption: OptionSort) {
    this.loadPageBySort(sortOption);
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

  loadPageByFilter = () => {
    const url = `${this.router.url.substr(
      0,
      this.router.url.indexOf(`/${this.slug}`)
    )}/${this.slug}${this.getUrlPathFromFilters(this.filtersNames)}`;
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

  setFiltersPrice($event) {
    this.store.dispatch(setFiltersPrice({ prices: $event }));
    this.changeFilters.emit({ ...this.filters, ...{ prices: $event } });
  }

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

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
