import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleaseDetailsComponent } from './pages/release-details/release-details.component';
import { ReleasesRoutingModule } from './releases-routing.module';
import { ReleasesItemDetailsComponent } from './components/releases-item-details/releases-item-details.component';
import { ReleaseOffersListComponent } from './components/release-offers-list/release-offers-list.component';
import { ReleaseItemComponent } from './components/release-offers-item/release-item.component';
import { ReleasesPageComponent } from './pages/releases-page/releases-page.component';
import { StoreModule } from '@ngrx/store';
import { releaseReducer } from './state/release.reducer';
import { ReleaseDetailsOfferItemComponent } from './components/release-details-offer-item/release-details-offer-item.component';
import { ReleasesPagePaginationComponent } from './pages/releases-page-pagination/releases-page-pagination.component';
import { ReleasesPageSearchComponent } from './pages/releases-page-search/releases-page-search.component';

export const reducers = {
  releases: releaseReducer,
};

@NgModule({
  declarations: [
    ReleaseDetailsComponent,
    ReleasesItemDetailsComponent,
    ReleaseOffersListComponent,
    ReleaseItemComponent,
    ReleasesPageComponent,
    ReleasesPagePaginationComponent,
    ReleasesPageSearchComponent,
    ReleaseDetailsOfferItemComponent,
  ],
  imports: [
    CommonModule,
    ReleasesRoutingModule,
    SharedModule,
    StoreModule.forFeature('releasesModule', reducers),
  ],
})
export class ReleasesModule {}
