import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { dealReducer } from './state/deal.reducer';
import { DealsPageComponent } from './pages/deal-page/deals-page.component';
import { DealRoutingModule } from './deal-routing.module';
import { DealsPageBodyComponent } from './components/deals-page-body/deals-page-body.component';
import { DealsGridListComponent } from './components/deals-grid-list/deals-grid-list.component';
import { StoreModule } from '@ngrx/store';
import { DealsCardComponent } from './components/deals-card/deals-card.component';

export const reducers = {
  deals: dealReducer,
};

@NgModule({
  declarations: [
    DealsPageComponent,
    DealsPageBodyComponent,
    DealsGridListComponent,
    DealsCardComponent,
  ],
  imports: [
    CommonModule,
    DealRoutingModule,
    SharedModule,
    StoreModule.forFeature('dealsModule', reducers),
  ],
})
export class DealsModule {}
