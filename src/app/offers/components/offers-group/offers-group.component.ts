import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  OptionSort,
  SORT_OPTIONS_OFFERS,
} from 'src/app/home/models/sortOptions';
import { Offer } from 'src/app/shared/classes/offer';

@Component({
  selector: 'app-offers-group',
  templateUrl: './offers-group.component.html',
  styleUrls: ['./offers-group.component.scss'],
})
export class OffersGroupComponent {
  @Input() offers: Offer[];
  @Input() offersCount = 0;
  @Input() totalOffers = 0;
  @Input() loading = true;
  @Output() changeSortOption: EventEmitter<OptionSort> = new EventEmitter();
  collapseFilters = false;

  sortOptions: OptionSort[] = SORT_OPTIONS_OFFERS;

  changeSort($event) {
    this.changeSortOption.emit($event);
  }
}
