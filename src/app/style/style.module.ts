import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleRoutingModule } from './style-routing.module';
import { StylePageComponent } from './pages/style-page/style-page.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { styleReducer } from './state/style.reducer';
import { MainStylePageComponent } from './pages/main-style-page/main-style-page.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

export const reducers = {
  style: styleReducer,
};

@NgModule({
  declarations: [StylePageComponent, MainStylePageComponent],
  imports: [
    CommonModule,
    StyleRoutingModule,
    SharedModule,
    CarouselModule,
    StoreModule.forFeature('styleModule', reducers),
  ],
})
export class StyleModule {}
