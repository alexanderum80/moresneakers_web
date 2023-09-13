import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  OptionSort,
  SORT_OPTIONS_OFFERS,
} from 'src/app/home/models/sortOptions';
import { Offer } from 'src/app/shared/classes/offer';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { isRaffleEnded } from '../../../shared/utils/utils';

@Component({
  selector: 'app-offers-group-about-to-drop',
  templateUrl: './offers-group-about-to-drop.component.html',
  styleUrls: ['./offers-group-about-to-drop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersGroupAboutToDropComponent implements OnInit, OnDestroy {
  @Input() offersCount = 0;
  @Input() totalOffers = 0;
  @Input() loading = true;
  @Input() isJustDropped = false;
  @Input() isRaffle = false;
  @Output() changeSortOption: EventEmitter<OptionSort> = new EventEmitter();
  collapseFilters = false;
  openRaffles$ = new BehaviorSubject<Offer[]>([]);
  closedRaffles$ = new BehaviorSubject<Offer[]>([]);
  sortOptions: OptionSort[] = SORT_OPTIONS_OFFERS;
  subs = new Subscription();

  private _offers: any[];

  @Input() get offers(): any[] {
    return this._offers;
  }

  set offers(value: any[]) {
    this._offers = value;
    this.updateOfferViewGroups();
  }

  ngOnInit(): void {
    if (!this.isJustDropped && this._offers) {
      this.subs = interval(1000).subscribe(() => {
        this.updateOfferViewGroups();
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  changeSort($event) {
    this.changeSortOption.emit($event);
  }

  updateOfferViewGroups = () => {
    if (this.isRaffle && this._offers) {
      this.openRaffles$.next([]);
      this.closedRaffles$.next([]);

      const openRaffles = [];
      const closedRaffles = [];
      this._offers.forEach(offer => {
        if (
          offer.status === 'closed' ||
          (offer.status === 'live' && isRaffleEnded(offer))
        ) {
          closedRaffles.push(offer);
        } else {
          openRaffles.push(offer);
        }
      });

      this.openRaffles$.next(openRaffles);
      this.closedRaffles$.next(
        closedRaffles.sort((first: any, second: any) => {
          const asc = false;
          const valueFirst = first.raffleEnd;
          const valueSecond = second.raffleEnd;
          return (
            0 -
            ((asc ? valueFirst > valueSecond : valueFirst < valueSecond)
              ? -1
              : 1)
          );
        })
      );
    }
  };
}
