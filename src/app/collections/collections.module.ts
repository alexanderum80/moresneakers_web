import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsRoutingModule } from './collections-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { collectionReducer } from './state/collection.reducer';
import { CollectionsPageComponent } from './pages/collections-page/collections-page.component';
import { styleReducer } from '../style/state/style.reducer';

export const reducers = {
  collection: collectionReducer,
};

export const reducersStyle = {
  style: styleReducer,
};

@NgModule({
  declarations: [CollectionsPageComponent],
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    SharedModule,
    StoreModule.forFeature('collectionModule', reducers),
    StoreModule.forFeature('styleModule', reducersStyle),
  ],
})
export class CollectionsModule {}
