import { Component, Input, OnInit } from '@angular/core';
import { Offer } from '../../../home/models/offer.model';
import { Release } from '../../../home/models/release.model';
import { Product } from '../../../home/models/product.model';
import { changeUrlToHttps, getStatus } from '../../utils/utils';

@Component({
  selector: 'app-responsive-product-card',
  templateUrl: './responsive-product-card.component.html',
  styleUrls: ['./responsive-product-card.component.scss'],
})
export class ResponsiveProductCardComponent implements OnInit {
  @Input() offer: Offer;
  @Input() release: Release;
  @Input() showDate = false;
  product: Product;

  constructor() {}

  ngOnInit(): void {
    this.offer
      ? this.offerToProduct(this.offer)
      : this.releaseToProduct(this.release);
  }

  getStatus = (status: string) => getStatus(status);

  offerToProduct(offer: Offer) {
    this.product = {
      mainImage: offer.release.mainImage,
      releaseName: offer.release.name,
      status: offer.status,
      price: offer.price,
      currency: offer.currency,
      brandImage: offer.release.style.BrandModel.imgUrl,
      productDate: offer.offerDate,
      slug: offer.release.slug,
    };
  }

  releaseToProduct(release: Release) {
    this.product = {
      mainImage: release.mainImage,
      releaseName: release.name,
      status: release.status,
      price: this.getPriceFromRelease(release),
      currency: this.getReleaseCurrency(release),
      brandImage: release.style?.BrandModel?.imgUrl,
      productDate: release.releaseDate
        ? release.releaseDate
        : release.createdAt,
      slug: release.slug,
    };
  }

  getPriceFromRelease(release: Release) {
    return release.priceEUR
      ? release.priceEUR
      : release.priceGBP
      ? release.priceGBP
      : release.priceUSD
      ? release.priceUSD
      : null;
  }

  getReleaseCurrency(release: Release) {
    return release.priceEUR ? 'EUR' : release.priceGBP ? 'GBP' : 'USD';
  }

  urlToHttps = url => changeUrlToHttps(url);
}
