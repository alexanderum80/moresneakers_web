import { Component, HostListener, Input, OnInit } from '@angular/core';
import { changeUrlToHttps } from '../../utils/utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input() class: string;
  @Input() themeLogo = 'assets/images/icon/logo.png'; // App Logo
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
