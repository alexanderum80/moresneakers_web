import { Component, Input } from '@angular/core';
import { Offer } from 'src/app/home/models/offer.model';
import { ReleaseShopOfferGroup } from 'src/app/home/models/release.model';
import { Shop } from 'src/app/home/models/shop.model';
import {
  changeUrlToHttps,
  getRaffleEndDate,
  getReleaseDate,
  isRaffleEnded,
} from '../../../shared/utils/utils';

@Component({
  selector: 'app-release-details-offer-item',
  templateUrl: './release-details-offer-item.component.html',
  styleUrls: ['./release-details-offer-item.component.scss'],
})
export class ReleaseDetailsOfferItemComponent {
  @Input() offer: ReleaseShopOfferGroup;

  constructor() {}

  getStatusStyle(status: string) {
    switch (status) {
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
        return 'Raffle closed';
      case 'resell_only':
        return 'Resell Only';
      default:
        return status;
    }
  }

  getShippingRegions(offer: Offer) {
    return offer.shipping === 'Select Countries'
      ? offer.countries
      : offer.shipping;
  }

  getShopImage(shop: Shop) {
    return shop.smallImage
      ? shop.smallImage
      : shop.headerImage
      ? shop.headerImage
      : shop.mainImage;
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

  isRaffleEnded = (offer): boolean => isRaffleEnded(offer);

  getReleaseDate = (offer): string => getReleaseDate(offer);

  getRaffleEndDate = (offer): string => getRaffleEndDate(offer);

  urlToHttps = url => changeUrlToHttps(url);
}
