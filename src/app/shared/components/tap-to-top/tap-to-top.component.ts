import { Component, HostListener, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-tap-to-top',
  templateUrl: './tap-to-top.component.html',
  styleUrls: ['./tap-to-top.component.scss'],
})
export class TapToTopComponent implements OnInit {
  public show = false;

  constructor(private viewScroller: ViewportScroller) {}

  ngOnInit(): void {}

  // @HostListener Decorator
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const value =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.show = value > 600;
  }

  tapToTop() {
    if (document.getElementById('filterContainer')) {
      this.viewScroller.scrollToAnchor('filterContainer');
    } else {
      this.viewScroller.scrollToPosition([0, 0]);
    }
  }
}
