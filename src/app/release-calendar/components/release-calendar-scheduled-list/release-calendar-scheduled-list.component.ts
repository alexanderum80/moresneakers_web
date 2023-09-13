import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Release } from 'src/app/home/models/release.model';
import { Past, Upcoming } from '../../models/release-calendar.models';
import {
  selectLoading,
  selectSection,
} from '../../state/release-calendar.selector';
import { setSection } from '../../state/release-calendar.action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-release-calendar-scheduled-list',
  templateUrl: './release-calendar-scheduled-list.component.html',
  styleUrls: ['./release-calendar-scheduled-list.component.scss'],
})
export class ReleaseCalendarScheduledListComponent implements OnInit {
  @Input() releases: Release[];
  @Input() month: number;

  loading$ = this.store.pipe(select(selectLoading));
  section$ = this.store.pipe(select(selectSection));

  currentMonth = new Date().getMonth() + 1;
  toDayDate = new Date();

  containParams = false;

  currentDate: NgbDate = new NgbDate(
    this.toDayDate.getFullYear(),
    this.toDayDate.getMonth() + 1,
    this.toDayDate.getDate()
  );

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParam => {
      const startdate = queryParam.startdate;
      const enddate = queryParam.enddate;

      this.containParams = Boolean(startdate && enddate);
    });
  }

  isCurrentMonth() {
    return this.currentMonth === this.month && !this.containParams;
  }

  isUpcoming() {
    return Upcoming;
  }

  isPast() {
    return Past;
  }

  changeSection(section: string) {
    this.store.dispatch(setSection({ section }));
  }
}
