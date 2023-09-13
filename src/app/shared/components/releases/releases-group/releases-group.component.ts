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
import { Subscription } from 'rxjs';
import { Category } from 'src/app/home/models/category.model';
import { CategoriesService } from 'src/app/category/services/categories.service';
import { select, Store } from '@ngrx/store';
import {
  setFiltersBrands,
  setFiltersCategory,
  setFiltersColor,
  setFiltersPrice,
  setFiltersSize,
  setStatusGroup,
} from '../../../../releases/state/release.action';
import {
  selectFilterBrands,
  selectFilterCategory,
  selectFilterColors,
  selectFilters,
  selectFilterStatus,
  selectLoading,
  selectStatusGroup,
} from '../../../../releases/state/release.selector';
import {
  COLORS_OPTIONS,
  OptionSort,
  SIZE_OPTIONS,
  SORT_OPTIONS,
} from 'src/app/home/models/sortOptions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-releases-group',
  templateUrl: './releases-group.component.html',
  styleUrls: ['./releases-group.component.scss'],
})
export class ReleasesGroupComponent implements OnInit, OnDestroy {
  @Input() releases: Release[];
  @Input() releasesCount: number;
  @Input() totalReleases: number;
  @Input() categoryFilterName: string;
  @Input() ignoreFilters: string[] = [];
  @Output() changeFilters: EventEmitter<any> = new EventEmitter();
  @Output() changeSortOption: EventEmitter<OptionSort> = new EventEmitter();
  @Output() changeGroup: EventEmitter<any> = new EventEmitter();

  selectedBrands$ = this.store.pipe(select(selectFilterBrands));
  selectedCategories$ = this.store.pipe(select(selectFilterCategory));
  selectedStatus$ = this.store.pipe(select(selectFilterStatus));
  selectedColors$ = this.store.pipe(select(selectFilterColors));

  filters$ = this.store.pipe(select(selectFilters));
  loading$ = this.store.pipe(select(selectLoading));

  statusGroup$ = this.store.pipe(select(selectStatusGroup));

  collapseFilters = false;

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
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscribeToFilters();
    this.subscribeToStatusGroup();
  }

  ngOnInit() {
    this.getBrands();
    this.getCategories();
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

  subscribeToStatusGroup() {
    const sub = this.statusGroup$
      .pipe(
        map(r => {
          this.changeGroup.emit(r);
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
          this.checkCategoryFilter();
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

  changeSelectedGroup(group: number) {
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
    this.store.dispatch(setStatusGroup({ statusGroup }));
    const url = this.router.url.split('?')[0];
    const urlRouter = url.split('/');
    if (urlRouter[1] !== 'releases') {
      this.router.navigate([
        urlRouter[1] + '/' + urlRouter[2] + '/' + statusGroup,
      ]);
    } else {
      this.router.navigate([this.router.url.split('/')[1] + '/' + statusGroup]);
    }
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
}
