import { Component, Input, OnInit } from '@angular/core';
import { Deal } from '../../models/deal';
import { BehaviorSubject } from 'rxjs';
import { getSameWeekThanNow } from '../../../shared/utils/utils';
import * as moment from 'moment';

@Component({
  selector: 'app-deals-page-body',
  templateUrl: './deals-page-body.component.html',
  styleUrls: ['./deals-page-body.component.scss'],
})
export class DealsPageBodyComponent implements OnInit {
  private _deals: Deal[];

  thisWeekDeals$ = new BehaviorSubject<Deal[]>([]);
  currenDeals$ = new BehaviorSubject<Deal[]>([]);

  @Input() get deals(): Deal[] {
    return this._deals;
  }

  set deals(value: Deal[]) {
    this._deals = value;
    this.thisWeekDeals$.next(
      this._deals.filter(deal => this.isEndThisWeekDate(deal))
    );
    this.currenDeals$.next(
      this._deals
        .filter(deal => !this.isEndThisWeekDate(deal))
        .sort((first: Deal, second: Deal) => {
          const valueFirst = moment(first.createdAt);
          const valueSecond = moment(second.createdAt);
          return valueFirst.diff(valueSecond) ? -1 : 1;
        })
    );
  }

  constructor() {}

  ngOnInit(): void {}

  isEndThisWeekDate = (deal: Deal): boolean => {
    if (deal.endDate) {
      return getSameWeekThanNow(this.getEndDateToUtc(deal), 'CET');
    }
    return false;
  };

  getEndDateToUtc = (deal: Deal): string => {
    return `${deal.endDate.substr(0, deal.endDate.indexOf('T'))}T${
      deal.endTime
    }:00.000Z`;
  };
}
