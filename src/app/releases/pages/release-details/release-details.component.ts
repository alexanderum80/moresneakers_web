import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Offer } from 'src/app/home/models/offer.model';
import {
  Release,
  ReleaseShopOfferGroup,
} from 'src/app/home/models/release.model';
import { LayoutService } from 'src/app/home/services/layout.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import {
  setOffersOfRelease,
  setSelectedRelease,
} from '../../state/release.action';
import {
  selectOffersOfRelease,
  selectSelectedRelease,
} from '../../state/release.selector';
import { ReleasesService } from '../../../home/services/release.service';
import { groupByParentShop } from '../../../shared/utils/utils';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';

@Component({
  selector: 'app-release-details',
  templateUrl: './release-details.component.html',
  styleUrls: ['./release-details.component.scss'],
})
export class ReleaseDetailsComponent implements OnInit, OnDestroy {
  release$ = this.store.pipe(select(selectSelectedRelease));
  relatedReleases: Array<Release>;
  offers$: Observable<ReleaseShopOfferGroup[]>;
  subscriptions: Subscription[] = [];
  currentPage = 1;
  slug: string;
  displayRelease = false;
  isAllSoldOut = true;

  otherAlt: string;
  releasesText: string;
  releasesText2: string;

  constructor(
    private store: Store,
    private releaseService: ReleasesService,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private titleService: Title,
    private utilsService: UtilsService,
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.displayRelease = false;
      this.getReleaseText();
      this.getReleaseText2();
      this.getReleaseBySlug(this.slug);
    });
  }

  getReleaseText() {
    const sub = this.layoutService
      .getReleaseText('releases')
      .pipe(
        map(response => {
          if (response.data) {
            this.releasesText = response.data.releasesText;
          }
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  getReleaseText2() {
    const sub = this.layoutService
      .getReleaseText2('releases')
      .pipe(
        map(response => {
          if (response.data) {
            this.releasesText2 = response.data.releasesText2;
          }
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.displayRelease = false;
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getReleaseBySlug(slug: string) {
    const sub = this.releaseService
      .getReleaseBySlug(slug)
      .pipe(
        map(response => {
          if (response.data && response.data[0]) {
            this.addMetadata(response.data[0]);
            this.otherAlt = `${response.data[0].name
              .replace(/'/g, '')
              .replace(/"/g, '')} ${response.data[0].sku}`;
            this.store.dispatch(
              setSelectedRelease({ release: response.data[0] })
            );
            this.getRelatedReleases(response.data[0]?.styleId);
            this.store.dispatch(
              setOffersOfRelease({
                offers: groupByParentShop(response.data[0].offers),
              })
            );
            this.checkIfAllSoldOut(response.data[0].offers);
            this.displayRelease = true;
          }
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  checkIfAllSoldOut(offers: Offer[]) {
    this.isAllSoldOut = true;
    offers.forEach(o => {
      if (o.status !== 'sold_out' && !o.raffle) {
        this.isAllSoldOut = false;
      }
    });
    if (this.isAllSoldOut) {
      this.changeShipping('raffle');
    } else {
      this.changeShipping('first come first serve');
    }
  }

  getRelatedReleases(styleId) {
    const sub = this.releaseService
      .getReleases({ styleId: [styleId] }, 'updatedAt', 'desc', 1, 15)
      .pipe(
        map(res => {
          this.relatedReleases = res.data;
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  changeShipping(shipping: string) {
    if (shipping === 'raffles') {
      shipping = 'raffle';
    }

    this.offers$ = this.store.pipe(select(selectOffersOfRelease)).pipe(
      map(offers => {
        return shipping === 'all'
          ? offers
          : offers.filter(
              item => item.region?.toLowerCase() === shipping.toLowerCase()
            );
      })
    );
  }

  nameToSlug(name: string) {
    return this.utilsService.changeNameToSlug(name);
  }

  addMetadata(release: Release) {
    const title = `${release?.name.replace(/'/g, '').replace(/"/g, '')} ${
      release?.sku
    }  | More Sneakers`;
    setMetaTitle(title, this.metaService, this.titleService);
    setMetaKeywords(
      release?.keywords
        ? release?.keywords
        : `${release?.name}, ${release?.sku}, ${release?.supplierColor}`,
      this.metaService
    );
    setMetaDescription(
      release?.meta_description
        ? release?.meta_description
        : `Where to buy the ${release?.name} ${release?.sku} online. Release dates, times, best price and direct shop links`,
      this.metaService
    );

    this.metaService.updateTag({
      property: 'og:image',
      content: release?.mainImage,
    });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'https://moresneakers.com',
    });
  }
}
