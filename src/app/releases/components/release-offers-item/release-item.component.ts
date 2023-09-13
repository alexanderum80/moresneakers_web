import { Component, Input, OnInit } from '@angular/core';
import { FAKE_OFFER, Offer } from 'src/app/shared/classes/offer';

@Component({
  selector: 'app-release-item',
  templateUrl: './release-item.component.html',
  styleUrls: ['./release-item.component.scss'],
})
export class ReleaseItemComponent implements OnInit {
  @Input() offer: Offer = FAKE_OFFER;

  constructor() {}

  ngOnInit(): void {}

  getStatusStyle(status: string) {
    switch (status) {
      case 'Available':
        return '#12D231';
      case 'On Sale':
        return '#1253D2';
      case 'Restock':
        return '#A012D2';
      case 'Sold Out':
        return '#D21212';
      case 'Coming Soon':
        return '#F57314';
      default:
        return '';
    }
  }
}
