import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/home/models/offer.model';
import { Product } from 'src/app/home/models/product.model';
import { Release } from 'src/app/home/models/release.model';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { changeUrlToHttps, getStatus } from '../../../utils/utils';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() offer: Offer;
  @Input() release: Release;
  @Input() showDate = false;
  @Input() showShop = false;
  @Input() showStyleName = false;

  product: Product;

  constructor(private utilsService: UtilsService) {}

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
      brandImage: offer.shop.mainImage,
      productDate: this.getDate(offer.offerDate),
      slug: offer.release.slug,
      hot: offer.release.hot,
      shopName: offer.shop ? offer.shop.name : '',
      salePercentage: offer.salePercentage,
      salePrice: this.getSalePrice(offer),
      sku: this.offer.release.sku,
      thumbnail: this.offer.release.thumbnail,
      brandName: offer.shop ? offer.shop.name : 'shop',
    };
  }

  releaseToProduct(release: Release) {
    this.product = {
      mainImage: release.mainImage,
      releaseName: !this.showStyleName
        ? release.name
        : release.style
        ? release.style.name
        : release.name,
      status: release.status,
      price: this.getPriceFromRelease(release),
      currency: this.getReleaseCurrency(release),
      brandImage: release.style.BrandModel.imgUrl,
      slug: release.slug,
      productDate: release.releaseDate
        ? this.getDate(release.releaseDate)
        : this.getDate(release.createdAt),
      hot: release.hot,
      sku: release.sku,
      thumbnail: release.thumbnail,
      brandName: this.release.style.BrandModel.name,
    };
  }

  getDate(date) {
    const nowDate = new Date(date);
    return nowDate.setMinutes(
      nowDate.getMinutes() + nowDate.getTimezoneOffset()
    );
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

  getSalePrice(offer: Offer) {
    if (offer.salePercentage) {
      const price = offer.price;
      const salePercentage = offer.salePercentage;
      const discount = (price * salePercentage) / parseFloat('100');
      const result = price - discount;
      return result.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    }
    return '';
  }

  generateNavigator() {
    const slug = this.utilsService.changeNameToSlug;

    return this.showStyleName
      ? [`/styles/${slug(this.release.style.name)}`]
      : [`/releases/${this.product.slug}`];
  }

  getSrc() {
    return this.product.thumbnail || this.product.mainImage;
  }

  urlToHttps = url => changeUrlToHttps(url);
}
