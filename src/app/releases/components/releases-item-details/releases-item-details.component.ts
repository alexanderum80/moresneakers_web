import { Component, Input, OnInit } from '@angular/core';
import { Release } from 'src/app/home/models/release.model';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-releases-item-details',
  templateUrl: './releases-item-details.component.html',
  styleUrls: ['./releases-item-details.component.scss'],
})
export class ReleasesItemDetailsComponent implements OnInit {
  @Input() release: Release;
  categories = ['Converse', 'Lifestyle'];

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {}

  getPriceString(release: Release) {
    const prices = [];
    if (release.priceEUR) {
      prices.push('€' + release.priceEUR);
    }
    if (release.priceGBP) {
      prices.push('£' + release.priceGBP);
    }
    if (release.priceUSD) {
      prices.push('$' + release.priceUSD);
    }

    return prices.join(' | ');
  }

  getGenderString(gender: string) {
    switch (gender) {
      case 'Preschool':
        return 'Little Kids';
      case 'Toddler':
        return 'Babies and Toddlers';
      default:
        return gender ?? '';
    }
  }

  nameToSlug(name: string) {
    return this.utilsService.changeNameToSlug(name);
  }
}
