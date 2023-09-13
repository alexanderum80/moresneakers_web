import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { OptionSort, SORT_OPTIONS } from 'src/app/home/models/sortOptions';
import { LayoutService } from 'src/app/home/services/layout.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Release } from '../../../home/models/release.model';
import { ReleasesService } from '../../../home/services/release.service';
import { StylesService } from '../../services/styles.service';
import {
  concatReleasesByStyle,
  getReleasesByStyle,
  setCurrentPage,
  setLoading,
  setReleasesByStyleCount,
  setSortOptions,
  setStyle,
  setTotalPages,
} from '../../state/style.action';
import {
  selectCurrentPage,
  selectFiltersNames,
  selectLoading,
  selectReleasesByStyle,
  selectReleasesByStyleCount,
  selectStyle,
  selectTotalPages,
} from '../../state/style.selector';
import { ViewportScroller } from '@angular/common';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';
import { Style } from '../../../home/models/style.model';

@Component({
  selector: 'app-style-page',
  templateUrl: './style-page.component.html',
  styleUrls: ['./style-page.component.scss'],
})
export class StylePageComponent implements OnInit, OnDestroy {
  releasesByStyle$: Observable<Release[]> = this.store.pipe(
    select(selectReleasesByStyle)
  );
  style$ = this.store.pipe(select(selectStyle));
  slug: string;
  page = 1;
  limit = 15;
  styleId: string;
  loading$ = this.store.pipe(select(selectLoading));
  sortOption: OptionSort = {
    direction: 'desc',
    sortFieldName: 'createdAt',
    name: 'createdAt',
  };
  filters: any = {};
  selectReleasesByStyleCount$: Observable<number> = this.store.pipe(
    select(selectReleasesByStyleCount)
  );
  urlFilters$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  currentPage$ = this.store.pipe(select(selectCurrentPage));
  totalPages$ = this.store.pipe(select(selectTotalPages));
  filtersNames$ = this.store.pipe(select(selectFiltersNames));
  currentPage: number;
  totalPages: number;
  pageSize = 28;
  headingTitle$ = new BehaviorSubject<string>('');
  subscriptions: Subscription[] = [];
  style: Style;
  defaultFilters = false;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private releasesService: ReleasesService,
    private styleService: StylesService,
    public layoutService: LayoutService,
    private titleService: Title,
    private utilsService: UtilsService,
    private metaService: Meta,
    private viewScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    const params = this.route.snapshot.paramMap;
    const queryParams = this.route.snapshot.queryParams;

    (async () => {
      this.slug = params.get('slug');
      await this.loadStyle(this.slug);

      let page = 1;
      if (queryParams.hasOwnProperty('page')) {
        page = +queryParams.page || 1;
        if (page <= 1) {
          await this.router.navigate([this.router.url]);
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
          this.addMetadata();
        } catch (e) {}
        this.scrollToFilterResults();
        this.urlFilters$.next(filters);
      } else {
        this.defaultFilters = true;
        this.addMetadata();
        this.loadReleasesByStyle();
      }
    })();

    this.filtersNames$.subscribe(filtersNames => {
      this.changeFiltersNames(filtersNames);
    });

    this.currentPage$.subscribe(current => {
      this.currentPage = +current;
    });

    this.totalPages$.subscribe(total => {
      this.totalPages = total;
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  addMetadata() {
    this.style$.subscribe(style => {
      this.style = style;
      this.changeFiltersNames({ gender: 'All', onSale: false });
      const hasUrlFilters =
        this.route.snapshot.paramMap.has('filters') && !this.defaultFilters;
      if (!hasUrlFilters) {
        setMetaTitle(
          style?.name
            ? `${style?.name} Sneakers Releases`
            : 'Styles Sneakers Releases',
          this.metaService,
          this.titleService
        );

        setMetaKeywords(
          Boolean(style?.keywords)
            ? style?.keywords
            : `${style?.name}, buy, authentic, sneakers, shoes, footwear, releases, real`,
          this.metaService
        );
        setMetaDescription(
          style?.meta_description
            ? style?.meta_description
            : `Buy all the ${style?.name} from the most legit shops online. Release dates, times, best prices and direct shop links | Moresneakers`,
          this.metaService
        );
        this.headingTitle$.next(style?.name ?? '');
      }

      this.metaService.updateTag({
        property: 'og:image',
        content: style?.imgUrl ?? '',
      });
      this.metaService.updateTag({
        property: 'og:site_name',
        content: 'https://moresneakers.com',
      });
    });
  }

  loadStyle = async (slug: string) => {
    const styleName = this.utilsService.changeSlugToName(slug);
    return this.styleService
      .getStyles(
        { slug: styleName.replace(/&/g, '%26') },
        undefined,
        undefined,
        undefined,
        undefined
      )
      .pipe(
        map(response => {
          if (response.data?.[0]) {
            this.styleId = response.data[0].id;
            this.store.dispatch(setStyle({ style: response.data[0] }));
          }
        })
      )
      .toPromise();
  };

  changeSort(sortOption: OptionSort) {
    this.loadPageBySort(sortOption);
  }

  loadPageBySort = sort => {
    const url = this.router.url.split('?')[0];
    void this.router.navigate([url], {
      queryParams: {
        sort: sort.id,
      },
      queryParamsHandling: 'merge',
    });
  };

  private loadReleasesByStyle(fromScroll = false) {
    this.store.dispatch(setLoading({ loading: true }));
    this.store.dispatch(getReleasesByStyle({ releasesByStyle: [] }));

    const ordering =
      this.sortOption.direction === 'desc'
        ? `-${this.sortOption.sortFieldName}`
        : `${this.sortOption.sortFieldName}`;
    const sub = this.releasesService
      .getReleasesByStyle(
        this.styleId,
        this.currentPage,
        this.pageSize,
        ordering,
        this.filters
      )
      .pipe(
        tap(response => {
          if (fromScroll) {
            this.store.dispatch(
              concatReleasesByStyle({ releasesByStyle: response.data })
            );
          } else {
            this.store.dispatch(
              getReleasesByStyle({ releasesByStyle: response.data })
            );
          }
          this.store.dispatch(
            setReleasesByStyleCount({ count: response.dataCount })
          );
          this.store.dispatch(setTotalPages({ pageSize: this.pageSize }));
        }),
        finalize(() => this.store.dispatch(setLoading({ loading: false })))
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  changeFilters(filtersObject) {
    if (this.slug) {
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

      this.loadReleasesByStyle();
    }
  }

  isDefaultFilters = filters => filters.join('').trim() === 'all';
  isDefaultFilterNames = filters =>
    Object.keys(filters)
      .map(key => filters[key])
      .join('')
      .trim() === 'Allfalse';

  changeFiltersNames(filter) {
    if (this.isDefaultFilterNames(filter) || !this.style) {
      return;
    }
    let title = '';
    let metaDescription = '';
    let metaKeywords = '';
    let filterList = '';

    filterList = ['gender', 'brand', 'color', 'category']
      .filter(key => filter.hasOwnProperty(key) && filter[key])
      .filter(key => {
        switch (key) {
          case 'gender':
            return filter[key] !== 'All';
          default:
            return filter[key];
        }
      })
      .map(key => {
        switch (key) {
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
      ? `${filterList} ${this.style?.name ?? ''} shoes`
      : `${this.style?.name ?? ''} shoes`;
    if (filter.onSale) {
      title += ' on sale';
    }

    metaDescription = `Cop the ${title}. More Sneakers presents to you the latest and upcoming sneakers all over the world. We provide shop links, raffles and sales at the most legit sneaker retailers online.`;
    metaKeywords = `${title}, releases, sneakers, cop, restock, deals, discounts, promo codes`;

    this.headingTitle$.next(title);
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
