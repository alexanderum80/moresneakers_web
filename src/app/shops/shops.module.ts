import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsPageComponent } from './pages/shops-page/shops-page.component';
import { ShopsBannerComponent } from './components/shops-banner/shops-banner.component';
import { SharedModule } from '../shared/shared.module';
import { ShopsPageBodyComponent } from './components/shops-page-body/shops-page-body.component';
import { ShopsGridListComponent } from './components/shops-grid-list/shops-grid-list.component';
import { StoreModule } from '@ngrx/store';
import { shopReducer } from './state/shop.reducer';

export const reducers = {
  shops: shopReducer,
};

@NgModule({
  declarations: [
    ShopsPageComponent,
    ShopsBannerComponent,
    ShopsPageBodyComponent,
    ShopsGridListComponent,
  ],
  imports: [
    CommonModule,
    ShopsRoutingModule,
    SharedModule,
    StoreModule.forFeature('shopsModule', reducers),
  ],
})
export class ShopsModule {}
