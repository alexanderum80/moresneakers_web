import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment-timezone';
import { KeyValue } from '@angular/common';
import { Offer } from '../../../home/models/offer.model';
import {
  getTimeZone,
  groupByParentShopDrop,
} from '../../../shared/utils/utils';

@Component({
  selector: 'app-offers-group-by-date',
  templateUrl: './offers-group-by-date.component.html',
  styleUrls: ['./offers-group-by-date.component.scss'],
})
export class OffersGroupByDateComponent implements OnChanges {
  @Input() isJustDropped: boolean;
  @Input() showReleaseTime = true;
  @Input() groupBy = 'releaseTime';
  @Input() countDownLabel = '';
  @Input() prefix = '';
  @Input() order = '';
  dateGroupsMap$ = new BehaviorSubject<Map<string, any[]>>(null);

  private _offers: Offer[] = [];

  @Input() get offers(): Offer[] {
    return this._offers;
  }

  set offers(value: Offer[]) {
    this._offers = value;
  }

  originalOrder = (
    a: KeyValue<string, any[]>,
    b: KeyValue<string, any[]>
  ): number =>
    this.order
      ? 0 -
        ((this.order === 'asc' ? +a.key > +b.key : +a.key < +b.key) ? -1 : 1)
      : 0;

  ngOnChanges(changes: SimpleChanges): void {
    const dateGroupsMap = new Map<string, any>();
    this._offers.forEach(offer => {
      const timeZone = offer?.timezone !== 'EMPTY' ? offer?.timezone : 'CET';
      let field = '';
      let countdownLabel = '';
      switch (this.groupBy) {
        case 'releaseTime':
          field = offer.releaseTime ?? '';
          countdownLabel = 'Releasing in';
          break;
        case 'raffleEnd':
          if (offer.raffleEnd) {
            field = offer.raffleEnd ?? '';
            countdownLabel = 'Ending in';
          }
          break;
      }

      const id = field ? this.getCountDown(field, timeZone).toString() : '';
      if (!dateGroupsMap.has(id)) {
        dateGroupsMap.set(id, { field, timeZone, data: [] });
      }
      const offers = [...dateGroupsMap.get(id).data, offer];
      dateGroupsMap.set(id, {
        field,
        timeZone,
        data: offers,
      });
    });
    dateGroupsMap.forEach(
      dateGroup => (dateGroup.data = groupByParentShopDrop(dateGroup.data))
    );
    this.dateGroupsMap$.next(dateGroupsMap);
  }

  getCountDown = (value: string, timeZone: string): number => {
    const tz = getTimeZone(timeZone);
    const mDate = moment.utc(value);
    const nowTz = moment.tz(tz);
    const utcOffset = nowTz.utcOffset() * 60;
    const nowDate = nowTz.utc();
    return mDate.diff(nowDate, 's') - utcOffset;
  };

  getReleaseDate = (value: string, timeZone: string): string => {
    const tz = getTimeZone(timeZone);
    const nowTz = moment.tz(tz);
    const utcOffset = nowTz.utcOffset() / 60;
    const sign = utcOffset > 0 ? '+' : '-';
    const d = value.replace(':000Z', `${sign}${Math.abs(utcOffset)}`);
    const mDate = moment(d).utc();
    const utcDate = moment.utc(value);
    const kDate = `${mDate.calendar({
      sameDay: `[${utcDate.format('[Today] [at] h[:]mmA')}]`,
      nextDay: `[${utcDate.format('[Tomorrow] [at] h[:]mmA')}]`,
      lastDay: `[${utcDate.format('[Yesterday] [at] h[:]mmA')}]`,
      nextWeek: `[${utcDate.format('dddd Do [of] MMMM YYYY [at] h[:]mmA')}]`,
      lastWeek: `[${utcDate.format(
        `[Last] dddd Do [of] MMMM YYYY [at] h[:]mmA`
      )}]`,
      sameElse: `[${utcDate.format(`DD/MM/YYYY [at] h[:]mmA`)}]`,
    })}`;

    return `${kDate} ${timeZone}`;
  };
}
