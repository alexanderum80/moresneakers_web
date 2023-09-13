import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Release } from 'src/app/home/models/release.model';
import {
  selectCurrentMonth,
  selectNextMonth,
  selectPrevMonth,
} from '../../state/release-calendar.selector';
import { setCurrentMonth } from '../../state/release-calendar.action';
import { CalendarDate } from '../../models/release-calendar.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-release-calendar-group',
  templateUrl: './release-calendar-group.component.html',
  styleUrls: ['./release-calendar-group.component.scss'],
})
export class ReleaseCalendarGroupComponent implements OnInit, OnDestroy {
  @Input() releasesInline: Release[];

  @Input() releases: Release[];
  @Input() year: number;
  @Input() month: number;

  @Output() onChangeMonth: EventEmitter<CalendarDate> = new EventEmitter();
  @Output() onSelectRange: EventEmitter<{
    fromDate: NgbDate;
    toDate: NgbDate;
  }> = new EventEmitter();

  scheduledReleases: Release[];
  unsubscribe$: Subject<boolean> = new Subject();

  currentMonth$ = this.store.pipe(select(selectCurrentMonth));
  nextMonth$ = this.store.pipe(select(selectNextMonth));
  prevMonth$ = this.store.pipe(select(selectPrevMonth));

  model: NgbDateStruct;

  hoveredDate: NgbDate | null = null;
  currentDate = new Date();

  fromDate: NgbDate | null = null; /* new NgbDate(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth() + 1,
    this.currentDate.getDate()
  ); */
  toDate: NgbDate | null = null; /* new NgbDate(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth() + 1,
    this.currentDate.getDate() + 1
  ); */

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {}

  ngOnInit() {
    this.store.dispatch(
      setCurrentMonth({ month: this.month, year: this.year })
    );

    this.route.queryParams.subscribe(queryParam => {
      const startdate = queryParam.startdate;
      const enddate = queryParam.enddate;

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
      } else {
        this.fromDate = null;
        this.toDate = null;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  getCurrentMonth() {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    this.store.dispatch(setCurrentMonth({ month, year }));
  }

  getMonth(month: number) {
    switch (month) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
      default:
        return 'Invalid Month';
    }
  }

  changeCurrentMonth(date: CalendarDate) {
    this.store.dispatch(setCurrentMonth(date));
    this.router.navigate(['/release-calendar', date.year, date.month]);
  }

  onDateSelection(date: NgbDate, init = false) {
    if (!this.fromDate && !this.toDate && !init) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate) &&
      !init
    ) {
      this.toDate = date;
    } else if (!init) {
      this.toDate = null;
      this.fromDate = date;
    }

    if (this.fromDate && this.toDate) {
      this.router.navigate([this.router.url.split('?')[0]], {
        queryParams: {
          startdate: `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`,
          enddate: `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`,
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
