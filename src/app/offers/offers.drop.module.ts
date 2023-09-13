import { NgModule } from '@angular/core';
import { WhatsAboutDropComponent } from './pages/whats-about-drop/whats-about-drop.component';
import { OffersGroupAboutToDropComponent } from './components/offers-group-about-to-drop/offers-group-about-to-drop.component';
import { OffersGroupByDateComponent } from './components/offers-group-by-date/offers-group-by-date.component';
import { OffersCommonModule } from './offers.common.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OffersPinnedModule } from '../offers-pinned/offers-pinned.module';
import { OffersDropRoutingModule } from './offers-drop.routing.module';

@NgModule({
  declarations: [
    OffersGroupAboutToDropComponent,
    WhatsAboutDropComponent,
    OffersGroupByDateComponent,
  ],
  imports: [
    OffersCommonModule,
    OffersPinnedModule,
    CommonModule,
    SharedModule,
    OffersDropRoutingModule,
  ],
})
export class OffersDropModule {}
