import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Offer } from '../home/models/offer.model';
import { Release } from '../home/models/release.model';
import { SettingsService } from '../home/services/settings.service';
import { changeUrlToHttps, getStatus } from '../shared/utils/utils';

@Component({
  selector: 'offers-pinned',
  templateUrl: './offers-pinned.component.html',
  styleUrls: ['./offers-pinned.component.scss'],
})
export class OffersPinnedComponent implements OnInit {
  showOffersPinned: {
    Home: boolean;
    ReleaseCalendar: boolean;
    AboutToDrop: boolean;
  };
  offersPinnedTitle: string;
  subscriptions: Subscription[] = [];

  @Input() offersPinned: Offer[];

  constructor(
    private readonly setingsService: SettingsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getShowOffersPinned();
    this.getOffersPinnedTitle();
  }

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

  getStatus = (status: string) => getStatus(status);

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

  getShowOffersPinned() {
    const sub = this.setingsService
      .getShowOffersPinned()
      .pipe(
        tap(response => {
          this.showOffersPinned = JSON.parse(response.data.value);
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  canShowOffersPinned() {
    if (this.showOffersPinned) {
      if (this.router.url === '/') {
        return this.showOffersPinned.Home;
      } else if (this.router.url.match('release-calendar')) {
        return this.showOffersPinned.ReleaseCalendar;
      } else if (this.router.url.match('about-to-drop')) {
        return this.showOffersPinned.AboutToDrop;
      }
    }
  }

  getOffersPinnedTitle() {
    const sub = this.setingsService
      .getOffersPinnedTitle()
      .pipe(
        tap(response => {
          this.offersPinnedTitle = response.data.value;
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  urlToHttps = url => changeUrlToHttps(url);
}
