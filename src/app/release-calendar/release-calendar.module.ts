import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleaseCalendarPageComponent } from './pages/release-calendar-page/release-calendar-page.component';
import { SharedModule } from '../shared/shared.module';
import { ReleasesCalendarRoutingModule } from './releases-calendar-routing.module';
import { ReleaseCalendarGroupComponent } from './components/release-calendar-group/release-calendar-group.component';
import { ReleaseCalendarInlineListComponent } from './components/release-calendar-inline-list/release-calendar-inline-list.component';
import { ReleaseCalendarScheduledListComponent } from './components/release-calendar-scheduled-list/release-calendar-scheduled-list.component';
import { MoreUpcomingReleasesComponent } from './components/more-upcoming-releases/more-upcoming-releases.component';
import { StoreModule } from '@ngrx/store';
import { releaseCalendarReducer } from './state/release-calendar.reducer';
import { OffersPinnedModule } from '../offers-pinned/offers-pinned.module';

@NgModule({
  declarations: [
    ReleaseCalendarPageComponent,
    ReleaseCalendarGroupComponent,
    ReleaseCalendarInlineListComponent,
    ReleaseCalendarScheduledListComponent,
    MoreUpcomingReleasesComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReleasesCalendarRoutingModule,
    OffersPinnedModule,
    StoreModule.forFeature('releasesCalendarModule', releaseCalendarReducer),
  ],
})
export class ReleaseCalendarModule {}
