import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

export const selectBrands = (state: AppState) => state.brandsModule.brands;

export const selectFilterLetter = (state: AppState) =>
  state.brandsModule.brands.filterLetter;

export const selectBrandList = createSelector(
  selectBrands,
  state => state.brands
);

export const selectBrandSelected = createSelector(
  selectBrands,
  state => state.brand
);

export const selectLoading = createSelector(
  selectBrands,
  state => state.loading
);

export const selectHottestReleases = createSelector(
  selectBrands,
  state => state.hottestReleases
);

export const selectTotalPages = createSelector(
  selectBrands,
  state => state.totalPages
);

export const selectCurrentPage = createSelector(
  selectBrands,
  state => state.currentPage
);

export const selectTotalBrands = createSelector(
  selectBrands,
  state => state.totalBrands
);
