import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeLayout } from 'src/app/home/models/homeLayout.model';
import { OptionSort } from 'src/app/home/models/sortOptions';
import { LayoutService } from 'src/app/home/services/layout.service';
import { SettingsService } from 'src/app/home/services/settings.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Release } from '../../../home/models/release.model';
import { ReleasesService } from '../../../home/services/release.service';
import { StylesService } from '../../services/styles.service';
import { setLoading, setReleasesByStyleCount } from '../../state/style.action';
import {
  selectLoading,
  selectReleasesByStyleCount,
} from '../../state/style.selector';
import { isPlatformBrowser } from '@angular/common';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';

@Component({
  selector: 'app-main-style-page',
  templateUrl: './main-style-page.component.html',
  styleUrls: ['./main-style-page.component.scss'],
})
export class MainStylePageComponent implements OnInit, OnDestroy {
  count$: Observable<number> = this.store.pipe(
    select(selectReleasesByStyleCount)
  );

  layout: HomeLayout;
  styleName = 'Styles';
  slug: string;
  page = 1;
  limit = 15;
  styleId: string;
  loading$ = this.store.pipe(select(selectLoading));
  sortOption: OptionSort = {
    direction: 'desc',
    sortFieldName: 'releaseDate',
    name: 'releaseDate',
  };
  releases: Record<string, Release[]> = {};
  brandsName = new Set<string>();
  settingsStylesName: Record<string, { name: string; length: number }> = {};
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private releasesService: ReleasesService,
    private styleService: StylesService,
    public layoutService: LayoutService,
    private titleService: Title,
    private utilsService: UtilsService,
    private metaService: Meta,
    private readonly settingsService: SettingsService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.paramMap.subscribe(params => {
        this.slug = params.get('slug');
        this.loadStyle();
      });
    }
    this.getLayout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getLayout() {
    this.subscriptions.push(
      this.layoutService
        .getLayout('styles', '')
        .pipe(
          map(response => {
            this.layout = response.data;
            this.addMetadata(response.data.heading);
          })
        )
        .subscribe()
    );
  }

  addMetadata(heading) {
    const title = heading?.pageTitle
      ? heading?.pageTitle
      : heading?.title ?? 'Styles Sneakers Releases';
    setMetaTitle(title, this.metaService, this.titleService);
    setMetaKeywords(heading?.keywords ?? '', this.metaService);
    setMetaDescription(heading?.meta_description ?? '', this.metaService);

    this.metaService.updateTag({
      property: 'og:image',
      content: heading?.imgUrl ?? '',
    });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'https://moresneakers.com',
    });
  }

  loadStyle() {
    const promiseList = [];
    this.subscriptions.push(
      this.settingsService.getPopularStyles().subscribe(responseStyle => {
        const style = JSON.parse(responseStyle.data.value);
        Object.keys(style).forEach(styleId =>
          promiseList.push(this.loadReleasesByStyle(styleId))
        );

        this.store.dispatch(setLoading({ loading: true }));
        Promise.all(promiseList)
          .then(r => {
            r.forEach(response => {
              if (response.data.length) {
                const lastOne = response.data[0];
                const brandName = lastOne.style.BrandModel.name;
                this.brandsName.add(brandName);
                this.releases = Object.assign(this.releases, {
                  [brandName]: this.releases[brandName]
                    ? [...this.releases[brandName], lastOne]
                    : [lastOne],
                });
                this.settingsStylesName[brandName] = {
                  name: brandName,
                  length: this.releases[brandName].length,
                };
                this.store.dispatch(
                  setReleasesByStyleCount({ count: response.dataCount })
                );
              }
            });
          })
          .finally(() => {
            this.store.dispatch(setLoading({ loading: false }));
          });
      })
    );
  }

  scrolled() {
    this.count$
      .pipe(
        map(count => {
          // This avoid to call unnecesaries request when all data is loaded
          if (this.limit * this.page < count) {
            this.page++;
            // this.loadReleasesByStyle(true);
            // this.loadReleasesByStyles(true)
          }
        })
      )
      .subscribe();
  }

  private loadReleasesByStyle(styleId: string) {
    const ordering =
      this.sortOption.direction === 'desc'
        ? `-${this.sortOption.sortFieldName}`
        : `${this.sortOption.sortFieldName}`;

    return this.releasesService
      .getReleasesByStyle(styleId, this.page, this.limit, ordering)
      .toPromise();
  }
}
