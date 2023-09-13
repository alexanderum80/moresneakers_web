import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SettingsService } from 'src/app/home/services/settings.service';
import { setMetaDescription, setMetaTitle } from '../../utils/meta.utils';

@Component({
  selector: 'app-about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.scss'],
})
export class AboutUsPageComponent implements OnInit, OnDestroy {
  breadcrumbName = '';
  pageName = '';
  subscriptions: Subscription[] = [];
  data;
  h1Title: string;
  metaTitle: string;

  constructor(
    private route: ActivatedRoute,
    private settingService: SettingsService,
    private titleService: Title,
    private router: Router,
    private metaService: Meta
  ) {
    const sub = this.route.data.subscribe(result => {
      this.pageName = result.pageName;
      this.breadcrumbName = result.breadcrumbName;
    });

    this.subscriptions.push(sub);
  }

  ngOnInit(): void {
    this.getData(this.pageName);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getData(pageName: string) {
    switch (pageName) {
      case 'become-partner':
        this.getBecomeAPathnerData();
        break;
      case 'privacy-policy':
        this.getPrivacyPolicyData();
        break;
      case 'who-are-we':
        this.getWhoAreWeData();
        break;

      default:
        break;
    }

    setMetaTitle(
      `${this.breadcrumbName} | Moresneakers`,
      this.metaService,
      this.titleService
    );
  }

  getBecomeAPathnerData() {
    const sub = this.settingService
      .getBecomeAPartner()
      .pipe(
        tap(response => {
          this.data = response.data.value;
          this.h1Title = response.data.h1Title;
          this.addMetadata(response?.data);
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  getPrivacyPolicyData() {
    const sub = this.settingService
      .getPrivacyPolicy()
      .pipe(
        tap(response => {
          this.data = response.data.value;
          this.h1Title = response.data.h1Title;
          this.addMetadata(response?.data);
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  getWhoAreWeData() {
    const sub = this.settingService
      .getWhoWeAre()
      .pipe(
        tap(response => {
          this.data = response.data.value;
          this.h1Title = response.data.h1Title;
          this.addMetadata(response?.data);
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  addMetadata(data) {
    let description;
    let title;
    const url = this.router.url;
    switch (url) {
      case '/who-are-we':
        title = 'Who are we?';
        description = data?.meta_description
          ? data?.meta_description
          : 'Moresneakers is passionately helping you get the latest and upcoming sneakers all over the world by providing shop links, raffles and sales.';
        break;
      case '/privacy-policy':
        title = 'Privacy Policy';
        description = data?.meta_description
          ? data?.meta_description
          : "Moresneaker's privacy policy.";
        break;
      case '/become-a-partner':
        title = 'Become a partner';
        description = data?.meta_description
          ? data?.meta_description
          : 'How to become a partner with Moresneakers.';
        break;
      default:
        title = '';
        description = '';
        break;
    }

    setMetaTitle(title, this.metaService, this.titleService);
    setMetaDescription(description, this.metaService);

    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'https://moresneakers.com',
    });
  }
}
