import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Release } from 'src/app/home/models/release.model';
import { selectLoading } from '../../state/release-calendar.selector';

@Component({
  selector: 'app-release-calendar-inline-list',
  templateUrl: './release-calendar-inline-list.component.html',
  styleUrls: ['./release-calendar-inline-list.component.scss'],
})
export class ReleaseCalendarInlineListComponent {
  @Input() releases: Release[];
  loading$ = this.store.pipe(select(selectLoading));

  itemWidth = 234;
  public ReleasesInlineConfig: OwlOptions = {
    loop: false,
    nav: true,
    margin: 32,
    navSpeed: 700,
    autoWidth: true,
    navText: [
      "<img src='assets/images/icon/prev.png'>",
      "<img src='assets/images/icon/next.png'>",
    ],
    dots: false,
    responsive: {
      0: {
        items: 1.3,
      },
      400: {
        items: 1.7,
      },
      540: {
        items: 2,
      },
      600: {
        items: 2.5,
      },
      780: {
        items: 3,
      },
      920: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  };

  constructor(private store: Store) {}
}
