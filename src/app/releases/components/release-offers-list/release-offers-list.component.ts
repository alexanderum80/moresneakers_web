import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Offer } from 'src/app/shared/classes/offer';

@Component({
  selector: 'app-release-offers-list',
  templateUrl: './release-offers-list.component.html',
  styleUrls: ['./release-offers-list.component.scss'],
})
export class ReleaseOffersListComponent implements OnInit, OnChanges {
  @Input() offers: Offer[];
  @Input() loading: boolean;
  @Input() isAllSoldOut: boolean;
  @Input() releasesText: string;
  @Input() releasesText2: string;
  @Output() onChangeShipping: EventEmitter<string> = new EventEmitter();
  tabs = ['First Come First Serve', 'Raffles'];
  tabChanged = false;
  offerGrouped: OfferGroupedByRegion[];
  onlyMarketplace = false;
  marketPlaceOffers = false;
  offersAvailable = false;
  allSoldOut = true;

  constructor() {}

  ngOnInit(): void {
    this.loading = true;
    this.offerGrouped = [
      { region: '', offer: [], order: 3 },
      { region: '', offer: [], order: 3 },
      {
        region: '',
        offer: [],
        order: 3,
      },
      { region: '', offer: [], order: 3 },
    ];
    if (this.isAllSoldOut) {
      this.tabs = ['Raffles', 'First Come First Serve'];
    }
    this.getOffersByRegion();
    this.sortOfferByStatus(this.offerGrouped).then(res => {
      this.offerGrouped = res;
      this.loading = false;
    });
  }

  ngOnChanges(): void {
    if (this.tabChanged) {
      this.loading = true;
      this.clearRegions();
      this.getOffersByRegion();
      this.sortOfferByStatus(this.offerGrouped).then(res => {
        this.offerGrouped = res;
        this.loading = false;
      });
    }
    this.tabChanged = false;
  }

  getOffersByRegion() {
    let europeCount = 0;
    let usaCount = 0;
    let restOfWorldCount = 0;

    this.offers.forEach(element => {
      switch (element.showOnRegion) {
        case 'Europe':
          this.offerGrouped[0].offer.push(element);
          this.offerGrouped[0].region = 'Europe';
          if (
            element.status === 'available' ||
            element.status === 'restock' ||
            element.status === 'live' ||
            element.status === 'on_sale'
          ) {
            this.offerGrouped[0].order = 1;
            this.onlyMarketplace = false;
          }
          if (
            element.status === 'coming_soon' &&
            this.offerGrouped[0].order !== 1
          ) {
            this.offerGrouped[0].order = 2;
            this.onlyMarketplace = false;
          }
          if (element.status === 'sold_out') {
            europeCount++;
            if (europeCount === this.offerGrouped[0].offer.length) {
              this.onlyMarketplace = true;
            }
          }
          break;
        case 'USA':
          this.offerGrouped[1].offer.push(element);
          this.offerGrouped[1].region = 'USA';
          if (
            element.status === 'available' ||
            element.status === 'restock' ||
            element.status === 'live' ||
            element.status === 'on_sale'
          ) {
            this.offerGrouped[1].order = 1;
            this.onlyMarketplace = false;
          }
          if (
            element.status === 'coming_soon' &&
            this.offerGrouped[1].order !== 1
          ) {
            this.offerGrouped[1].order = 2;
            this.onlyMarketplace = false;
          }
          if (element.status === 'sold_out') {
            usaCount++;
            if (usaCount === this.offerGrouped[0].offer.length) {
              this.onlyMarketplace = true;
            }
          }
          break;
        case 'RestOfTheWord':
          this.offerGrouped[2].offer.push(element);
          this.offerGrouped[2].region = 'Rest of the world';
          if (
            element.status === 'available' ||
            element.status === 'restock' ||
            element.status === 'live' ||
            element.status === 'on_sale'
          ) {
            this.offerGrouped[2].order = 1;
            this.onlyMarketplace = false;
          }
          if (
            element.status === 'coming_soon' &&
            this.offerGrouped[2].order !== 1
          ) {
            this.offerGrouped[2].order = 2;
            this.onlyMarketplace = false;
          }
          if (element.status === 'sold_out') {
            restOfWorldCount++;
            if (restOfWorldCount === this.offerGrouped[0].offer.length) {
              this.onlyMarketplace = true;
            }
          }
          break;
        case 'Marketplaces':
          this.offerGrouped[3].offer.push(element);
          this.offerGrouped[3].region = 'Marketplaces';
          if (
            element.status === 'available' ||
            element.status === 'restock' ||
            element.status === 'live' ||
            element.status === 'on_sale'
          ) {
            this.offerGrouped[3].order = 1;
            this.onlyMarketplace = true;
          }
          if (
            element.status === 'coming_soon' &&
            this.offerGrouped[3].order !== 1
          ) {
            this.offerGrouped[3].order = 2;
            this.onlyMarketplace = true;
          }
          break;
      }
      this.marketPlaceOffers =
        this.offerGrouped.filter(
          o => o.region === 'Marketplaces' && o.offer.length > 0
        ).length > 0
          ? true
          : false;
      this.offersAvailable =
        this.offerGrouped.filter(
          o => o.region !== 'Marketplaces' && o.offer.length > 0
        ).length > 0
          ? true
          : false;

      const _notMarketPlace = this.offerGrouped.filter(
        o => o.region !== 'Marketplaces'
      );
      _notMarketPlace.filter(o => {
        o.offer.forEach(o => {
          if (o.status !== 'sold_out') {
            this.allSoldOut = false;
          }
        });
      });
    });
  }

  async sortOfferByStatus(items: OfferGroupedByRegion[]) {
    return items.sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      return 0;
    });
  }

  clearRegions() {
    this.offerGrouped = [
      { region: '', offer: [], order: 3 },
      { region: '', offer: [], order: 3 },
      {
        region: '',
        offer: [],
        order: 3,
      },
      { region: '', offer: [], order: 3 },
    ];
  }

  changeShipping(event) {
    this.tabChanged = true;
    this.onChangeShipping.emit(event.nextId);
  }
}

export interface OfferGroupedByRegion {
  region: string;
  offer: Offer[];
  order: number;
}
