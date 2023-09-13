import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OffersGroupComponent } from './components/offers-group/offers-group.component';
import { StoreModule } from '@ngrx/store';
import { offerReducer } from './state/offer.reducer';

export const reducers = {
  offers: offerReducer,
};

@NgModule({
  declarations: [OffersGroupComponent],
  exports: [OffersGroupComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('offersModule', reducers),
  ],
})
export class OffersCommonModule {}
