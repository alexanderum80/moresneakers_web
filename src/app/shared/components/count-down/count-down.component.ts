import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import * as moment from 'moment';
import 'moment-timezone';
import { getTimeZone } from '../../utils/utils';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss'],
})
export class CountDownComponent implements OnInit, OnDestroy {
  @Input() value = '';
  @Input() timeZone = 'CET';
  @Input() countDownLabel = '';
  @Input() prefix = ':';

  subs = new Subscription();
  countDown$ = new BehaviorSubject<string>('');

  constructor() {}

  ngOnInit(): void {
    this.getCountDown();
    this.subs = interval(1000).subscribe(() => {
      this.getCountDown();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getCountDown = () => {
    const tz = getTimeZone(this.timeZone);
    const mDate = moment(this.value).tz(tz).utc();
    const nowTz = moment.tz(tz);
    const utcOffset = nowTz.utcOffset() * 60;
    const nowDate = nowTz;

    const diffReleaseTime = mDate.diff(nowDate, 's') - utcOffset;
    let countdown = '';

    if (diffReleaseTime > 0) {
      const duration = moment.duration(diffReleaseTime, 's');
      const years = duration.years() ? `${duration.years()}y ` : '';
      const days = duration.days() ? `${duration.days()}d ` : '';
      const hours = duration.hours() ? `${duration.hours()}h ` : '';
      const minutes = duration.minutes() ? `${duration.minutes()}m ` : '';
      const seconds = duration.seconds() ? `${duration.seconds()}s ` : '';
      countdown = `${this.countDownLabel} ${years}${days}${hours}${minutes}${seconds}`;
    }

    this.countDown$.next(countdown);
  };
}
