import { NgModule } from '@angular/core';
import { WhatsNewPageComponent } from './pages/whats-new-page/whats-new-page.component';
import { OffersCommonModule } from './offers.common.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OffersRoutingModule } from './offers-routing.module';

@NgModule({
  declarations: [WhatsNewPageComponent],
  imports: [
    OffersCommonModule,
    CommonModule,
    SharedModule,
    OffersRoutingModule,
  ],
})
export class OffersModule {}
