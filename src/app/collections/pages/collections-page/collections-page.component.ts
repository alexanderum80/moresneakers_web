import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { Release } from 'src/app/home/models/release.model';
import { OptionSort, SORT_OPTIONS } from 'src/app/home/models/sortOptions';
import { LayoutService } from 'src/app/home/services/layout.service';
import { ReleasesService } from 'src/app/home/services/release.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { CollectionsService } from '../../services/collections.service';
import {
  concatReleasesByCollection,
  getReleasesByCollection,
  setCollection,
  setLoading,
  setReleasesByCollectionCount,
  setSortOptions,
} from '../../state/collection.action';
import {
  selectCollection,
  selectLoading,
  selectReleasesByCollection,
  selectReleasesByCollectionCount,
} from '../../state/collection.selector';
import { ViewportScroller } from '@angular/common';
import { clearFilters } from '../../../style/state/style.action';
import {
  selectCurrentPage,
  selectTotalPages,
} from '../../../style/state/style.selector';
import { setCurrentPage } from '../../../releases/state/release.action';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';

@Component({
  selector: 'app-collections-page',
  templateUrl: './collections-page.component.html',
  styleUrls: ['./collections-page.component.scss'],
})
export class CollectionsPageComponent implements OnInit, OnDestroy {
  releasesByCollection$: Observable<Release[]> = this.store.pipe(
    select(selectReleasesByCollection)
  );
  selectReleasesByStyleCount$: Observable<number> = this.store.pipe(
    select(selectReleasesByCollectionCount)
  );
  collection$ = this.store.pipe(select(selectCollection));
  currentPage$ = this.store.pipe(select(selectCurrentPage));
  totalPages$ = this.store.pipe(select(selectTotalPages));
  urlFilters$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  collectionSlug: string;
  currentPage = 1;
  limit = 15;
  loading$ = this.store.pipe(select(selectLoading));
  sortOption: OptionSort = {
    direction: 'desc',
    sortFieldName: 'updatedAt',
    name: 'updatedAt',
  };
  collectionId: string;
  filters: any = { status: 'available' };

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private releasesService: ReleasesService,
    private collectionService: CollectionsService,
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
    const url = this.router.url.split('?')[0];
    this.store.dispatch(clearFilters());
    const params = this.route.snapshot.paramMap;
    const queryParams = this.route.snapshot.queryParams;

    (async () => {
      this.collectionSlug = params.get('slug');
      await this.loadCollection();

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
        } catch (e) {}
        this.scrollToFilterResults();
        this.urlFilters$.next(filters);
      } else {
        this.loadReleasesByCollection();
      }
      this.addMetadata();
    })();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  addMetadata() {
    this.collection$.subscribe(collection => {
      setMetaTitle(
        `${collection?.name} | Moresneakers`,
        this.metaService,
        this.titleService
      );
      setMetaKeywords(
        collection?.keywords
          ? collection?.keywords
          : `${collection?.name}, buy, authentic, sneakers, shoes, footwear, releases, real`,
        this.metaService
      );
      setMetaDescription(
        collection?.meta_description
          ? collection?.meta_description
          : `Buy all the sneakers releases from the ${collection?.name} Collection | Moresneaker`,
        this.metaService
      );

      this.metaService.updateTag({
        property: 'og:image',
        content: collection?.imgUrl,
      });
      this.metaService.updateTag({
        property: 'og:site_name',
        content: 'https://moresneakers.com',
      });
    });
  }

  loadCollection = async () => {
    const collectionName = this.utilsService.changeSlugToName(
      this.collectionSlug
    );
    setMetaTitle(
      collectionName + ' Sneakers Collection',
      this.metaService,
      this.titleService
    );
    const response = await this.collectionService
      .getCollections({ slug: collectionName }, undefined, undefined, 1, 15)
      .toPromise();

    if (response.data && response.data[0]) {
      this.collectionId = response.data[0].id;
      this.filters = {
        ...this.filters,
        ...{ collectionId: this.collectionId },
      };
      this.store.dispatch(setCollection({ collection: response.data[0] }));
    }
  };

  scrolled() {
    this.selectReleasesByStyleCount$
      .pipe(
        map(count => {
          // This avoid to call unnecesaries request when all data is loaded
          if (this.limit * this.currentPage < count) {
            this.currentPage++;
            this.loadReleasesByCollection(true);
          }
        })
      )
      .subscribe();
  }

  changeSort(sortOption: OptionSort) {
    this.currentPage = 1;
    this.store.dispatch(setSortOptions({ sortOption }));
    this.sortOption = sortOption;
    this.loadReleasesByCollection();
  }

  private loadReleasesByCollection(fromScroll = false) {
    this.store.dispatch(setLoading({ loading: true }));
    const sub = this.releasesService
      .getReleases(
        this.filters,
        this.sortOption.sortFieldName,
        this.sortOption.direction,
        this.currentPage,
        this.limit
      )
      .pipe(
        tap(response => {
          if (fromScroll) {
            this.store.dispatch(
              concatReleasesByCollection({
                releasesByCollection: response.data,
              })
            );
          } else {
            this.store.dispatch(
              getReleasesByCollection({ releasesByCollection: response.data })
            );
          }
          this.store.dispatch(
            setReleasesByCollectionCount({ count: response.dataCount })
          );
        }),
        finalize(() => this.store.dispatch(setLoading({ loading: false })))
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  changeFilters(filtersObject) {
    this.filters = {
      collectionId: this.collectionId,
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
      gender: filtersObject.filtersGender,
      onlyOnSale: filtersObject.onlyOnSale,
      status: 'available',
    };

    this.loadReleasesByCollection();
  }

  scrollToFilterResults = () => {
    if (document.getElementById('filterContainer')) {
      this.viewScroller.scrollToAnchor('filterContainer');
    }
  };
}
