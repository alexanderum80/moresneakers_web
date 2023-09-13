import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryGenderItemComponent } from './components/category-gender-item/category-gender-item.component';
import { CategoryGroupComponent } from './components/category-group/category-group.component';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { StoreModule } from '@ngrx/store';
import { categoryReducer } from './state/categories.reducer';
import { releaseReducer } from '../releases/state/release.reducer';

export const reducers = {
  releases: releaseReducer,
};

@NgModule({
  declarations: [
    CategoriesPageComponent,
    CategoryGenderItemComponent,
    CategoryGroupComponent,
    CategoryItemComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    StoreModule.forFeature('categoriesModule', categoryReducer),
    StoreModule.forFeature('releasesModule', reducers),
  ],
})
export class CategoryModule {}
