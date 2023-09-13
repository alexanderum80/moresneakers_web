import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { BrandsService } from 'src/app/brand/services/brand.service';
import { Release } from 'src/app/home/models/release.model';
import { Brand } from 'src/app/brand/models/brand';
import { combineLatest, Subscription } from 'rxjs';
import { Category } from 'src/app/home/models/category.model';
import { CategoriesService } from 'src/app/category/services/categories.service';
import { select, Store } from '@ngrx/store';
import {
  setFiltersBrands,
  setFiltersCategory,
  setFiltersColor,
  setFiltersPrice,
  setFiltersSize,
} from '../../../../releases/state/release.action';
import {
  selectCurrentPage,
  selectFilters,
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
  selector: 'app-releases-search-pagination',
  templateUrl: './releases-search-pagination.component.html',
  styleUrls: ['./releases-search-pagination.component.scss'],
})
export class ReleasesSearchPaginationComponent implements OnInit, OnDestroy {
  @Input() releases: Release[];
  @Input() releasesCount: number;
  @Input() totalReleases: number;
  @Input() ignoreFilters: string[] = [];
  @Input() totalPages = 1;
  @Output() changeFilters: EventEmitter<any> = new EventEmitter();
  @Output() changeSortOption: EventEmitter<OptionSort> = new EventEmitter();
  @Output() changeGroup: EventEmitter<any> = new EventEmitter();
  @Output() paginatorEmiter: EventEmitter<boolean | number> =
    new EventEmitter();
  currentPage$ = this.store.pipe(select(selectCurrentPage));
  totalPages$ = this.store.pipe(select(selectTotalPages));

  filters$ = this.store.pipe(select(selectFilters));
  loading$ = this.store.pipe(select(selectLoading));
  collapseFilters = false;
  currentPage = 1;
  sortOptions: OptionSort[] = SORT_OPTIONS;
  subscriptions: Subscription[] = [];
  groups = ['in stock', 'upcoming', 'resell only'];
  coloredOptions = COLORS_OPTIONS;
  sizeOptions = SIZE_OPTIONS;
  brands: Brand[];
  categories: Category[];

  constructor(
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
    private store: Store,
    public router: Router
  ) {
    this.subscribeToFilters();
    // this.subscribeToStatusGroup();
  }

  ngOnInit() {
    this.getBrands();
    this.getCategories();

    this.subscriptions.push(
      combineLatest([this.currentPage$, this.totalPages$]).subscribe(
        ([current, total]) => {
          this.totalPages = total;
          this.currentPage = +current;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  subscribeToFilters() {
    const sub = this.filters$
      .pipe(
        map(response => {
          this.changeFilters.emit(response);
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  getCategories() {
    const sub = this.categoriesService
      .getAllCategories()
      .pipe(
        map(response => {
          this.categories = response.filter(cat => !cat.isGender);
          // this.checkCategoryFilter();
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  getBrands() {
    const ignoreBrandFilter = this.ignoreFilters.indexOf('brands');
    // We dont have ignore brand filter
    if (ignoreBrandFilter === -1) {
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
  }

  setFiltersCategory($event) {
    this.store.dispatch(setFiltersCategory({ category: $event }));
  }

  setFiltersBrands($event) {
    this.store.dispatch(setFiltersBrands({ brands: $event }));
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

  changeSort($event) {
    this.changeSortOption.emit($event);
  }

  arrayLoading() {
    return new Array(32);
  }
}
