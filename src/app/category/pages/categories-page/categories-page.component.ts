import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesService } from 'src/app/category/services/categories.service';
import { HomeLayout } from 'src/app/home/models/homeLayout.model';
import { LayoutService } from 'src/app/home/services/layout.service';
import { ReleasesService } from 'src/app/home/services/release.service';
import {
  getCategories,
  getGenders,
  getHottestReleases,
} from '../../state/categories.action';
import {
  selectcategories,
  selectGenders,
  selectHottestReleases,
} from '../../state/categories.selector';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit, OnDestroy {
  categories$ = this.store.pipe(select(selectcategories));
  genders$ = this.store.pipe(select(selectGenders));
  hottestReleases$ = this.store.pipe(select(selectHottestReleases));
  layout: HomeLayout;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private categoryService: CategoriesService,
    public layoutService: LayoutService,
    private titleService: Title,
    private releaseService: ReleasesService,
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.getCategories();

    this.getLayout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  addMetadata(heading) {
    setMetaKeywords(heading?.keywords ?? '', this.metaService);
    setMetaDescription(
      heading?.meta_description
        ? heading?.meta_description
        : `Shop your best sneakers by category. All the latest releases, raffles and deals are updated everyday`,
      this.metaService
    );
    setMetaTitle(
      heading?.pageTitle ??
        heading?.title ??
        'Shop the best sneakers online by category : luxury, running...',
      this.metaService,
      this.titleService
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

  getCategories() {
    const sub = this.categoryService
      .getAllCategories()
      .pipe(
        map((response: any) => {
          this.store.dispatch(
            getGenders({ genders: response.filter(cat => cat.isGender) })
          );
          this.store.dispatch(
            getCategories({
              categories: response.filter(cat => !cat.isGender),
            })
          );
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  getLayout() {
    const sub = this.layoutService
      .getLayout('categories', '')
      .pipe(
        map(response => {
          this.layout = response.data;
          this.addMetadata(response.data.heading);
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
}
