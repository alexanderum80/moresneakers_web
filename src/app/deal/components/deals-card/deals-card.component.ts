import { Component, Input, OnInit } from '@angular/core';
import { getDiffFromDate } from '../../../shared/utils/utils';
import { Deal } from '../../models/deal';
import * as moment from 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
import { link as Link } from '../../../home/models/offer.model';

@Component({
  selector: 'app-deals-card',
  templateUrl: './deals-card.component.html',
  styleUrls: ['./deals-card.component.scss'],
})
export class DealsCardComponent implements OnInit {
  @Input() deal: Deal;

  constructor(private toastrService: ToastrService) {}

  ngOnInit(): void {}

  getStatusStyle() {
    if (this.isDateEnded(this.getEndDateToUtc())) {
      return '#D21212';
    }

    switch (this.deal.status) {
      case 'Coming Soon':
        return '#F57314';
      case 'Live':
        return '#12D231';
      case 'Expired':
        return '#D21212';
      default:
        return '';
    }
  }

  getImgAlt = () => {
    return `${this.deal.shop.name} Deal ${moment
      .utc(this.getEndDateToUtc())
      .format('MMMM YYYY')}`;
  };

  getEndDateToUtc = (): string => {
    return this.deal.endDate
      ? `${this.deal.endDate.substr(0, this.deal.endDate.indexOf('T'))}T${
          this.deal.endTime
        }:00.000Z`
      : '';
  };

  getDateString = (value): string => {
    return moment.utc(value).format('ddd, MMM D YYYY hh:mm A') + ' CET';
  };

  isDateEnded = (value): boolean => {
    if (value) {
      return getDiffFromDate(value, 'CET') > 0;
    }
    return false;
  };

  getLinkText = (link: string): string => link ?? 'Get It';

  getLink = (link: Link): string => link.bitlyUrl ?? link.trackedUrl;

  copyToClipBoard = () => {
    void navigator.clipboard.writeText(this.deal.promoCode);
    this.toastrService.success('Promo code has been copied to clipboard.');
  };
}
