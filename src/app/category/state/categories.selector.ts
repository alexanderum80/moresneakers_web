import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

export const selectCategoryModule = (state: AppState) => state.categoriesModule;

export const selectcategories = createSelector(
  selectCategoryModule,
  state => state.categories
);

export const selectGenders = createSelector(
  selectCategoryModule,
  state => state.genders
);

export const selectHottestReleases = createSelector(
  selectCategoryModule,
  state => state.hottestReleases
);
