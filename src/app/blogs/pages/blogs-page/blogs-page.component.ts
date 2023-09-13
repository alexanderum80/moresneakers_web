import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { HomeLayout } from 'src/app/home/models/homeLayout.model';
import { BlogsService } from 'src/app/home/services/blog.service';
import { LayoutService } from 'src/app/home/services/layout.service';
import { ReleasesService } from 'src/app/home/services/release.service';
import {
  concatBlogs,
  getHottestReleases,
  setBlogs,
  setCurrentPage,
  setLoading,
  setTotalBlogs,
  setTotalPages,
} from '../../state/blog.action';
import {
  selectBlogsList,
  selectCurrentPage,
  selectHottestReleases,
  selectLoading,
  selectTotalPages,
} from '../../state/blog.selector';
import { ActivatedRoute } from '@angular/router';
import {
  setMetaDescription,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';

@Component({
  selector: 'app-blogs-page',
  templateUrl: './blogs-page.component.html',
  styleUrls: ['./blogs-page.component.scss'],
})
export class BlogsPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  blogs$ = this.store.pipe(select(selectBlogsList));
  loading$ = this.store.pipe(select(selectLoading));
  currentPage$ = this.store.pipe(select(selectCurrentPage));
  totalPages$ = this.store.pipe(select(selectTotalPages));

  currentPage: number;
  totalPages: number;
  hottestReleases$ = this.store.pipe(select(selectHottestReleases));
  layout: HomeLayout;
  pageSize = 28;

  constructor(
    private store: Store,
    private blogService: BlogsService,
    public layoutService: LayoutService,
    private titleService: Title,
    private releaseService: ReleasesService,
    private metaService: Meta,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([
        this.currentPage$,
        this.totalPages$,
        this.route.queryParams,
      ]).subscribe(([current, total, queryParam]) => {
        this.currentPage = +current;
        this.totalPages = total;
        this.store.dispatch(setCurrentPage({ current: queryParam.page || 1 }));
        this.getBLogs();
      })
    );

    (async () => {
      await this.getLayout();
    })();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  setMetaDescription = (description: string) => {
    this.metaService.updateTag({
      name: 'description',
      content: description,
    });
    this.metaService.updateTag({
      name: 'metaDescription',
      content: description,
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: description,
    });
  };

  setMetaKeywords = (keywords: string) => {
    this.metaService.updateTag({
      name: 'keywords',
      content: keywords,
    });
    this.metaService.updateTag({
      name: 'metaKeywords',
      content: keywords,
    });
  };

  addMetadata(heading) {
    setMetaTitle(
      heading?.pageTitle ??
        heading?.title ??
        'Sneakers Tips and News - More Sneakers Blog',
      this.metaService,
      this.titleService
    );
    setMetaDescription(
      heading?.meta_description
        ? heading?.meta_description
        : `Articles, reviews & focus sharing our own views of the sneaker game.`,
      this.metaService
    );
    this.setMetaKeywords(heading?.keywords ?? '');

    this.metaService.updateTag({
      property: 'og:image',
      content: heading?.imgUrl ?? '',
    });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'https://moresneakers.com',
    });
  }

  async getLayout() {
    const response = await this.layoutService
      .getLayout('blogs', '')
      .toPromise();

    this.layout = response.data;
    const { heading, hottest } = this.layout;
    this.addMetadata(heading);
    if (hottest.displayOnPage) {
      this.getHottestReleases();
    }
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
    this.store.dispatch(setCurrentPage({ current: this.currentPage }));
    this.getBLogs(true);
  }

  private getBLogs(fromScroll = false) {
    this.store.dispatch(setLoading({ loading: true }));
    const sub = this.blogService
      .getBlogs({}, 'updatedAt', 'desc', this.currentPage, this.pageSize)
      .pipe(
        tap(response => {
          if (fromScroll) {
            this.store.dispatch(concatBlogs({ blogs: response.data }));
          } else {
            this.store.dispatch(setBlogs({ blogs: response.data }));
          }
          this.store.dispatch(setTotalBlogs({ count: response.dataCount }));
          this.store.dispatch(setTotalPages({ pageSize: this.pageSize }));
        }),
        finalize(() => this.store.dispatch(setLoading({ loading: false })))
      )
      .subscribe();

    this.subscriptions.push(sub);
  }
}
