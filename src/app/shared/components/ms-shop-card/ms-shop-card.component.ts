import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setFiltersBrands } from 'src/app/releases/state/release.action';
import { Brand } from '../../../brand/models/brand';
import { Shop } from '../../../home/models/shop.model';
import { UtilsService } from '../../services/utils.service';
import { changeUrlToHttps } from '../../utils/utils';

type Item = Brand & Shop;

@Component({
  selector: 'app-ms-shop-card',
  templateUrl: './ms-shop-card.component.html',
  styleUrls: ['./ms-shop-card.component.scss'],
})
export class MsShopCardComponent implements OnInit {
  @Input() item: Item;
  date = new Date();
  @Input() isRelease = false;
  @Input() showStoreLinkBtn = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router,
    private store: Store,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {}

  navigateToUrl(item: Item) {
    if (this.showStoreLinkBtn) {
      if (isPlatformBrowser(this.platformId)) {
        window.open(item.trackingListBaseUrl, '_blank');
      }
    } else {
      const slug = this.utilsService.changeNameToSlug(item.name);
      this.store.dispatch(setFiltersBrands({ brands: [item.id] }));
      this.router.navigate([`brands/${slug}`], { state: { brandId: item.id } });
    }
  }

  generateToLink(item: Item) {
    const slug = this.utilsService.changeNameToSlug(item.name);
    const urlRouter = this.router.url.split('/');
    if (urlRouter[1] === 'brands') {
      return [`/brands/${slug}/in-stock`];
    } else {
      return [`/brands/${slug}`]; // , { state: { brandId: item.id }}];
    }
  }

  urlToHttps = () => changeUrlToHttps(this.item.mainImage || this.item.imgUrl);
}
