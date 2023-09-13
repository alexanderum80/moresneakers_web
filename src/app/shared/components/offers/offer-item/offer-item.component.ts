import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/home/models/offer.model';
import { Release } from 'src/app/home/models/release.model';
import {
  changeUrlToHttps,
  getDiffFromDate,
  getRaffleEndDate,
  getReleaseDate,
  isRaffleEnded,
  isReleased,
} from '../../../utils/utils';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {
  @Input() offer: Offer;
  @Input() isJustDropped: boolean;
  @Input() showReleaseTime = true;
  @Input() margin = true;

  constructor() {}

  ngOnInit(): void {}

  getStatusStyle(offer: Offer) {
    switch (offer.status) {
      case 'available':
        return '#12D231';
      case 'on_sale':
        return '#1253D2';
      case 'restock':
        return '#A012D2';
      case 'sold_out':
        return '#D21212';
      case 'coming_soon':
        return '#F57314';
      case 'live':
        if (offer.raffle && this.isRaffleEnded()) {
          return '#D21212';
        }
        return '#12D231';
      case 'closed':
        return '#D21212';
      default:
        return '';
    }
  }

  getStatusName(offer: Offer) {
    switch (offer.status) {
      case 'available':
        return 'Available';
      case 'on_sale':
        return 'On Sale';
      case 'restock':
        return 'Restock';
      case 'sold_out':
        return 'Sold Out';
      case 'coming_soon':
        return 'Coming Soon';
      case 'live':
        if (offer.raffle) {
          return 'Raffle live';
        }
        return 'Live';
      case 'closed':
        return offer.raffle ? 'Raffle closed' : 'Closed';
      case 'resell_only':
        return 'Resell Only';
      default:
        return offer.status;
    }
  }

  getStatusNameIsDropped(offer: Offer) {
    const d = new Date();
    const nowDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const releaseTimeDate = new Date(offer.releaseTime);
    const released = nowDate.getTime() > releaseTimeDate.getTime();

    switch (offer.status) {
      case 'available':
        return 'Available';
      case 'on_sale':
        return 'On Sale';
      case 'restock':
        return 'Restock';
      case 'sold_out':
        return 'Sold Out';
      case 'coming_soon':
        return released ? 'Dropped' : 'Coming Soon';
      case 'live':
        return 'Live';
      case 'closed':
        return 'Closed';
      default:
        return offer.status;
    }
  }

  getShippingRegions(release: Release) {
    return release.shipping === 'Select Countries'
      ? release.countries
      : release.shipping;
  }

  getOldPrice(offer: Offer) {
    if (offer.salePercentage) {
      const price = offer.price;
      const salePercentage = offer.salePercentage;
      const discount = (price * salePercentage) / parseFloat('100');
      const result = price - discount;
      return result.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    }
    return '';
  }

  getRaffleStyle() {
    return '#D21212';
  }

  getDays(t) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  getSeconds(t) {
    return Math.floor((t / 1000) % 60);
  }

  isReleased = (): boolean => isReleased(this.offer);

  isRaffleEnded = (): boolean => isRaffleEnded(this.offer);

  getDiffFromDate = () =>
    getDiffFromDate(this.offer.raffleEnd, this.offer.timezone);

  getReleaseDate = (): string => getReleaseDate(this.offer);

  getRaffleEndDate = (): string => getRaffleEndDate(this.offer);

  urlToHttps = url => changeUrlToHttps(url);
}
