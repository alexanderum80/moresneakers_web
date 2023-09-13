import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { HomeLayout } from 'src/app/home/models/homeLayout.model';
import { LayoutService } from 'src/app/home/services/layout.service';
import { ReleasesService } from 'src/app/home/services/release.service';
import { ShopsService } from '../../services/shop.service';
import {
  concatShops,
  getHottestReleases,
  setLoading,
  setShops,
} from '../../state/shop.action';
import {
  selectFilterLetter,
  selectHottestReleases,
  selectShopList,
} from '../../state/shop.selector';
import { isPlatformBrowser } from '@angular/common';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';

@Component({
  selector: 'app-shops-page',
  templateUrl: './shops-page.component.html',
  styleUrls: ['./shops-page.component.scss'],
})
export class ShopsPageComponent implements OnInit, OnDestroy {
  shops$ = this.store.pipe(select(selectShopList));
  filters: { init: string } = {
    init: '',
  };
  page = 0;
  subscriptions: Subscription[] = [];

  hottestReleases$ = this.store.pipe(select(selectHottestReleases));
  layout: HomeLayout;

  constructor(
    private store: Store,
    private shopsService: ShopsService,
    public layoutService: LayoutService,
    private titleService: Title,
    private releaseService: ReleasesService,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.listenFilter();
    }
    this.getLayout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  addMetadata(heading) {
    const title = heading?.pageTitle ?? heading?.title ?? '';
    setMetaTitle(
      title ? `${title} | More Sneakers` : 'Shops | More Sneakers',
      this.metaService,
      this.titleService
    );
    setMetaKeywords(heading?.keywords ?? '', this.metaService);
    setMetaDescription(
      heading?.meta_description ??
        `Buy authentic sneakers from the most legit shops around the world | Moresneakers`,
      this.metaService
    );

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
    const sub = this.layoutService
      .getLayout('shops', '')
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

  scrolled() {
    this.page++;
    this.loadShops(true);
  }

  private loadShops(fromScroll = false) {
    this.store.dispatch(setLoading({ loading: true }));
    const sub = this.shopsService
      .getShops({ ...this.filters, isParent: 1 }, 'name', 'asc', this.page, 16)
      .pipe(
        tap(response => {
          if (fromScroll) {
            this.store.dispatch(concatShops({ shops: response.data }));
          } else {
            this.store.dispatch(setShops({ shops: response.data }));
          }
        }),
        finalize(() => {
          this.store.dispatch(setLoading({ loading: false }));
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  private listenFilter() {
    this.store.pipe(select(selectFilterLetter)).subscribe(letter => {
      this.filters.init = letter;
      this.page = 0;
      this.loadShops();
    });
  }
}
