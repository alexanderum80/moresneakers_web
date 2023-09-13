import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-only-marketplace',
  templateUrl: './only-marketplace.component.html',
  styleUrls: ['./only-marketplace.component.scss'],
})
export class OnlyMarketplaceComponent implements OnInit {
  @Input() releasesText: string;
  public isBrowser = isPlatformBrowser(this.platformId);

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {}
}
