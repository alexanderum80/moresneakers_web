import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { HomeLayout } from 'src/app/home/models/homeLayout.model';
import { LayoutService } from 'src/app/home/services/layout.service';
import { OffersService } from 'src/app/home/services/offers.service';
import { ReleasesService } from 'src/app/home/services/release.service';
import { CalendarDate, Upcoming } from '../../models/release-calendar.models';
import {
  getHottestReleases,
  getOffersPinned,
  getReleases,
  getReleasesInline,
  getReleasesNextPage,
  getUpcomingReleases,
  setLoading,
} from '../../state/release-calendar.action';
import {
  selectHottestReleases,
  selectInlineReleasesList,
  selectOffersPinnedList,
  selectReleasesList,
  selectSection,
  selectUpcomingReleases,
} from '../../state/release-calendar.selector';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';

@Component({
  selector: 'app-release-calendar-page',
  templateUrl: './release-calendar-page.component.html',
  styleUrls: ['./release-calendar-page.component.scss'],
})
export class ReleaseCalendarPageComponent implements OnInit, OnDestroy {
  offersPinned$ = this.store.pipe(select(selectOffersPinnedList));
  releasesScheduled$ = this.store.pipe(select(selectReleasesList));
  releasesInline$ = this.store.pipe(select(selectInlineReleasesList));
  hottestReleases$ = this.store.pipe(select(selectHottestReleases));
  upcomingReleases$ = this.store.pipe(select(selectUpcomingReleases));
  section$ = this.store.pipe(select(selectSection));
  currentPage = 1;
  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();
  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;
  subscriptions: Subscription[] = [];
  layout: HomeLayout;
  section: string;
  isStartModule = false;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private releaseService: ReleasesService,
    public layoutService: LayoutService,
    private titleService: Title,
    private metaService: Meta,
    private offerService: OffersService
  ) {}

  ngOnInit() {
    this.loadInit();
    this.getUpcomingReleases();
    this.getOffersPinned();

    this.getLayout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getOffersPinned() {
    const sub = this.offerService
      .getOffersPinned()
      .pipe(
        map(response => {
          this.store.dispatch(getOffersPinned({ offersPinned: response.data }));
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  loadInit() {
    this.subscriptions.push(
      this.section$
        .pipe(
          map(response => {
            this.section = response;
            if (this.isStartModule) {
              this.getReleases(this.currentMonth, this.currentYear);
            }
          })
        )
        .subscribe()
    );

    combineLatest([this.route.paramMap, this.route.queryParams])
      .pipe(
        map(([params, queryParams]) => {
          this.fromDate = null;
          this.toDate = null;
          this.currentPage = 1;

          this.currentYear = +params.get('year');
          this.currentMonth = +params.get('month');

          this.getInlineReleases(this.currentMonth, this.currentYear);

          const startdate = queryParams.startdate;
          const enddate = queryParams.enddate;

          if (startdate && enddate) {
            const arrayStartDate = startdate.split('-');
            const arrayeEndDate = enddate.split('-');

            this.fromDate = new NgbDate(
              parseInt(arrayStartDate[0]),
              parseInt(arrayStartDate[1]),
              parseInt(arrayStartDate[2])
            );

            this.toDate = new NgbDate(
              parseInt(arrayeEndDate[0]),
              parseInt(arrayeEndDate[1]),
              parseInt(arrayeEndDate[2])
            );

            this.selectReleaseInRange({
              fromDate: this.fromDate,
              toDate: this.toDate,
            });
          } else {
            this.getReleases(this.currentMonth, this.currentYear);
          }
        })
      )
      .subscribe();
  }

  getLayout() {
    const sub = this.layoutService
      .getLayout('release_calendar', '')
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

  addMetadata(heading) {
    setMetaTitle(
      heading?.pageTitle ??
        heading?.title ??
        `Sneakers Release Dates ${this.currentYear} Launch Calendar updated daily`,
      this.metaService,
      this.titleService
    );
    setMetaKeywords(heading?.keywords ?? '', this.metaService);
    setMetaDescription(
      heading?.meta_description
        ? heading?.meta_description
        : `Moresneakers release calendar gathers all the upcoming sneaker releases with all the legit and trusted online shops.`,
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

  getEndDate(pyear: number = null, pmonth: number = null) {
    const month: number = pmonth || this.currentMonth;
    const year: number = pyear || this.currentYear;
    const toDate = new Date(year, month, 0);

    return `${toDate.getFullYear()}-${
      toDate.getMonth() + 1
    }-${toDate.getDate()}`;
  }

  getInlineReleases(month, year, page = 1, isNextPage = false) {
    this.store.dispatch(setLoading({ loading: true }));
    const fromDate = new Date(year, month - 1, 1);
    const toDate = new Date(year, month, 0);

    const sub = this.releaseService
      .getReleases(
        {
          fromDate: `${fromDate.getFullYear()}-${
            fromDate.getMonth() + 1
          }-${fromDate.getDate()}`,
          toDate: `${toDate.getFullYear()}-${
            toDate.getMonth() + 1
          }-${toDate.getDate()}`,
          inlineRelease: true,
        },
        'releaseDate',
        'asc',
        page,
        10000
      )
      .pipe(
        map(response => {
          this.store.dispatch(getReleasesInline({ releases: response.data }));
        }),
        finalize(() => {
          this.store.dispatch(setLoading({ loading: false }));
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  isActualMonth() {
    return this.currentMonth === new Date().getMonth() + 1;
  }

  getReleases(month, year, page = 1, isNextPage = false) {
    this.store.dispatch(setLoading({ loading: true }));
    // javascript month date start in 0
    // get first day of month
    let fromDate = new Date(year, month - 1, 1);
    // get last day of month
    let toDate = new Date(year, month, 0);

    let fromDateStr = `${fromDate.getFullYear()}-${
      fromDate.getMonth() + 1
    }-${fromDate.getDate()}`;
    let toDateStr = `${toDate.getFullYear()}-${
      toDate.getMonth() + 1
    }-${toDate.getDate()}`;

    // if in the actula moth apply, AFTER and UPCOMING
    if (this.isActualMonth()) {
      if (this.section === Upcoming) {
        fromDate = new Date();
        fromDateStr = `${fromDate.getFullYear()}-${
          fromDate.getMonth() + 1
        }-${fromDate.getDate()} 10:00:01`;
      } else {
        toDate = new Date();
        toDateStr = `${toDate.getFullYear()}-${
          toDate.getMonth() + 1
        }-${toDate.getDate()} 10:00:00`;
      }
    }

    const sub = this.releaseService
      .getReleases(
        {
          fromDate: fromDateStr,
          toDate: toDateStr,
          inlineRelease: false,
        },
        'releaseDate',
        'asc',
        page,
        15
      )
      .pipe(
        map(response => {
          isNextPage
            ? this.store.dispatch(
                getReleasesNextPage({ releases: response.data })
              )
            : this.store.dispatch(getReleases({ releases: response.data }));
        }),
        finalize(() => {
          this.store.dispatch(setLoading({ loading: false }));
          this.isStartModule = true;
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  getReleasesByRange(
    fromDate: NgbDate,
    toDate: NgbDate,
    page: number = 1,
    isNextPage = false
  ) {
    const sub = this.releaseService
      .getReleases(
        {
          fromDate: `${fromDate.year}-${fromDate.month}-${fromDate.day}`,
          toDate: `${toDate.year}-${toDate.month}-${toDate.day}`,
        },
        'releaseDate',
        'asc',
        page,
        16
      )
      .pipe(
        map(response => {
          isNextPage
            ? this.store.dispatch(
                getReleasesNextPage({ releases: response.data })
              )
            : this.store.dispatch(getReleases({ releases: response.data }));
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  changeMonth(date: CalendarDate) {
    this.fromDate = null;
    this.toDate = null;
    this.currentPage = 1;
    this.currentMonth = date.month;
    this.currentYear = date.year;
    this.getReleases(date.month, date.year, this.currentPage, false);
    this.getInlineReleases(date.month, date.year, this.currentPage, false);
  }

  selectReleaseInRange(range: { fromDate: NgbDate; toDate: NgbDate }) {
    const { fromDate, toDate } = range;
    this.currentPage = 1;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.getReleasesByRange(fromDate, toDate, this.currentPage, false);
  }

  onScroll() {
    this.currentPage++;
    this.fromDate && this.toDate
      ? this.getReleasesByRange(
          this.fromDate,
          this.toDate,
          this.currentPage,
          true
        )
      : this.getReleases(
          this.currentMonth,
          this.currentYear,
          this.currentPage,
          true
        );
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

  getUpcomingReleases() {
    const sub = this.releaseService
      .getReleases(
        { upcoming: 1, inlineRelease: false },
        'updatedAt',
        'desc',
        1,
        5
      )
      .pipe(
        map(response => {
          this.store.dispatch(getUpcomingReleases({ releases: response.data }));
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }
}
