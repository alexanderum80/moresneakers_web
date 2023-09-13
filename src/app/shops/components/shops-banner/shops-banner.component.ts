import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shops-banner',
  templateUrl: './shops-banner.component.html',
  styleUrls: ['./shops-banner.component.scss'],
})
export class ShopsBannerComponent implements OnInit {
  @Input() title: string;

  bgImage = 'assets/shops-page-assets/banner.png';

  constructor() {}

  ngOnInit(): void {}
}
