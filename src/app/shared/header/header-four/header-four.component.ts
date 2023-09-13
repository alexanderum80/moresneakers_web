import { Component, HostListener, Input, OnInit } from '@angular/core';
import { changeUrlToHttps } from '../../utils/utils';

@Component({
  selector: 'app-header-four',
  templateUrl: './header-four.component.html',
  styleUrls: ['./header-four.component.scss'],
})
export class HeaderFourComponent implements OnInit {
  @Input() class = 'header-2 header-6';
  @Input() themeLogo = 'assets/images/icon/logo.png'; // Default Logo
  @Input() topbar = true; // Default True
  @Input() sticky = false; // Default false

  public stick = false;

  constructor() {}

  ngOnInit(): void {}

  // @HostListener Decorator
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const value =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.stick = value >= 150 && window.innerWidth > 400;
  }

  urlToHttps = url => changeUrlToHttps(url);
}
