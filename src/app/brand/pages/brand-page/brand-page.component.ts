import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { HomeLayout } from 'src/app/home/models/homeLayout.model';
import { LayoutService } from 'src/app/home/services/layout.service';
import { ReleasesService } from 'src/app/home/services/release.service';
import { BrandsService } from '../../services/brand.service';
import {
  clearBrand,
  concatBrands,
  getHottestReleases,
  resetState,
  setCurrentPage,
  setLoading,
  setTotalBrands,
  setTotalPages,
} from '../../state/brand.action';
import {
  selectBrandList,
  selectFilterLetter,
  selectHottestReleases,
} from '../../state/brand.selector';
import * as moment from 'moment';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.scss'],
})
export class BrandPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  brands$ = this.store.pipe(select(selectBrandList));

  filters: { init: string } = {
    init: '',
  };
  currentPage = 1;

  hottestReleases$ = this.store.pipe(select(selectHottestReleases));
  layout: HomeLayout;

  constructor(
    private store: Store,
    private brandsService: BrandsService,
    public layoutService: LayoutService,
    private titleService: Title,
    private releaseService: ReleasesService,
    private metaService: Meta,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(resetState());
    this.getBrands();
    this.listenFilter();
    this.subscriptions.push(
      this.route.queryParams
        .pipe(
          map(queryParam => {
            if (queryParam.hasOwnProperty('page')) {
              const page = +queryParam.page || 1;

              if (page <= 1) {
                const url = this.router.url.split('?')[0];
                void this.router.navigate([url]);
              }

              this.currentPage = page;
              this.store.dispatch(setCurrentPage({ current: page }));
              this.getBrands();
            }
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
    setMetaTitle(
      heading?.pageTitle
        ? heading?.pageTitle
        : heading?.title ??
            `All the Sneakers Brands to Buy in ${moment().year()}`,
      this.metaService,
      this.titleService
    );
    setMetaKeywords(heading?.keywords ?? '', this.metaService);
    setMetaDescription(
      heading?.meta_description
        ? heading?.meta_description
        : `All the best sneaker brands in one place so you can explore and find sneakers you want to buy.`,
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

  getLayout() {
    const sub = this.layoutService
      .getLayout('brands', '')
      .pipe(
        map(response => {
          this.layout = response?.data;
          this.addMetadata(response?.data?.heading);
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

  private getBrands() {
    this.store.dispatch(clearBrand());
    this.store.dispatch(setLoading({ loading: true }));
    const sub = this.brandsService
      .getBrands(this.filters, 'name', 'asc', this.currentPage, 28)
      .pipe(
        tap(response => {
          this.store.dispatch(concatBrands({ brands: response.data }));
          this.store.dispatch(setTotalBrands({ count: response.dataCount }));
          this.store.dispatch(setTotalPages({}));
        }),
        finalize(() => this.store.dispatch(setLoading({ loading: false })))
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  private listenFilter() {
    const subFilter = this.store
      .pipe(select(selectFilterLetter))
      .subscribe(letter => {
        if (!letter) {
          return;
        }
        this.filters = letter !== '❌' ? { init: letter } : { init: '' };
        this.getBrands();
      });

    this.subscriptions.push(subFilter);
  }
}
