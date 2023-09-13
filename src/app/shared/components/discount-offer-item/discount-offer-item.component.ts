import { Component, Input, OnInit } from '@angular/core';
import { Deal } from 'src/app/home/models/deal.blog';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-discount-offer-item',
  templateUrl: './discount-offer-item.component.html',
  styleUrls: ['./discount-offer-item.component.scss'],
})
export class DiscountOfferItemComponent implements OnInit {
  @Input() item: Deal;

  constructor(private utils: UtilsService) {}

  ngOnInit(): void {}

  getAltTitle() {
    return this.utils.changeSlugToName(
      this.item.link.substring(this.item.link.lastIndexOf('/') + 1)
    );
  }
}
