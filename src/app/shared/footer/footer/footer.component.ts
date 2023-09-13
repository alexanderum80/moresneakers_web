import { UtilsService } from 'src/app/shared/services/utils.service';
import { Collection } from '../../../home/models/collection.model';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Style } from 'src/app/home/models/style.model';
import { FooterService } from '../service/footer.service';
import { Brand } from 'src/app/brand/models/brand';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  @Input() class = 'footer-light'; // Default class
  @Input() themeLogo = 'assets/images/icon/logo.png'; // Default Logo

  subscriptions: Subscription[] = [];

  styles: Style[];
  collections: Collection[];
  brands: Brand[];
  whoAreWe: string;
  privacityPolice: string;
  becomePartner: string;

  public today: number = Date.now();

  constructor(
    private footerService: FooterService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.getFooterItems();
    this.getFooterAboutUs();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getFooterItems() {
    const sub = this.footerService
      .getFooterItems()
      .pipe(
        map(response => {
          const data: any[] = response.data;
          this.brands = data.filter(d => d.objectType === 'Brand');
          this.collections = data.filter(d => d.objectType === 'Collection');
          this.styles = data.filter(d => d.objectType === 'Style');
        })
      )
      .subscribe();
    this.subscriptions.push(sub);
  }

  getFooterAboutUs() {
    const sub = this.footerService
      .getFooterAboutUs()
      .pipe(
        map(response => {
          const { who_are_we, privacy, become_partner } = response.data;

          this.whoAreWe = who_are_we.h1Title || 'Who are we?';
          this.privacityPolice = privacy.h1Title || 'Privacy Policy';
          this.becomePartner = become_partner.h1Title || 'Become a partner';
          // this.brands = data.filter((d) => d.objectType == 'Brand');
          // this.collections = data.filter((d) => d.objectType == 'Collection');
          // this.styles = data.filter((d) => d.objectType == 'Style');
        })
      )
      .subscribe();
    this.subscriptions.push(sub);
  }

  navigateToBrand(item) {
    const slug = this.utilsService.changeNameToSlug(item.object.name);
    // this.store.dispatch(setFiltersBrands({ brands: [item.id] }));
    return [`/brands/${slug}`];
    // this.router.navigate([`brands/${slug}`], { state: { brandId: item.id } });
  }

  navigateToCollection(item) {
    const slug = this.utilsService.changeNameToSlug(item.object.name);
    return [`/collections/${slug}`];
  }

  navigateToStyle(item) {
    const slug = this.utilsService.changeNameToSlug(item.object.name);
    return [`/styles/${slug}`];
  }

  loadSocialNetwork(socialUrl: string) {
    window.open(socialUrl, '_blanck');
  }
}
