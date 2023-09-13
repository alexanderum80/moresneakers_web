import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandPageComponent } from './pages/brand-page/brand-page.component';
import { BrandsBannerComponent } from './components/brands-banner/brands-banner.component';
import { SharedModule } from '../shared/shared.module';
import { BrandsPageBodyComponent } from './components/brands-page-body/brands-page-body.component';
import { BrandsGridListComponent } from './components/brands-grid-list/brands-grid-list.component';
import { StoreModule } from '@ngrx/store';
import { brandReducer } from './state/brand.reducer';
import { BrandReleasesComponent } from './pages/brand-releases/brand-releases.component';
import { releaseReducer } from '../releases/state/release.reducer';

export const reducers = {
  brands: brandReducer,
};
export const reducersRelease = {
  releases: releaseReducer,
};

@NgModule({
  declarations: [
    BrandPageComponent,
    BrandsBannerComponent,
    BrandsPageBodyComponent,
    BrandsGridListComponent,
    BrandReleasesComponent,
  ],
  imports: [
    CommonModule,
    BrandRoutingModule,
    SharedModule,
    StoreModule.forFeature('brandsModule', reducers),
    StoreModule.forFeature('releasesModule', reducersRelease),
  ],
})
export class BrandModule {}
