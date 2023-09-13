import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands-banner',
  templateUrl: './brands-banner.component.html',
  styleUrls: ['./brands-banner.component.scss'],
})
export class BrandsBannerComponent implements OnInit {
  bgImage = 'assets/brands-page-assets/banner.png';

  @Input() title: string;
  @Input() description: string;
  @Input() keywords: string;

  constructor() {}

  ngOnInit(): void {}
}
