import { AppState } from '../../state/app.state';
import { createSelector } from '@ngrx/store';

export const selectStyleModule = (state: AppState) => state.styleModule.style;

export const selectReleasesByStyle = createSelector(
  selectStyleModule,
  state => state.releasesByStyle
);
export const selectReleasesByStyleCount = createSelector(
  selectStyleModule,
  state => state.count
);

export const selectStyle = createSelector(
  selectStyleModule,
  state => state.style
);

export const selectLoading = createSelector(
  selectStyleModule,
  state => state.loading
);

// Pagination
export const selectCurrentPage = createSelector(
  selectStyleModule,
  state => state.currentPage
);

export const selectTotalPages = createSelector(
  selectStyleModule,
  state => state.totalPages
);

export const selectFilters = createSelector(
  selectStyleModule,
  state => state.filters
);

export const selectFilterBrands = createSelector(
  selectFilters,
  state => state.filtersBrands
);

export const selectFilterGender = createSelector(
  selectFilters,
  state => state.filtersGender
);

export const selectFilterOnlyOnSale = createSelector(
  selectFilters,
  state => state.onlyOnSale
);

export const selectFilterCategory = createSelector(
  selectFilters,
  state => state.filtersCategory
);

export const selectFilterColors = createSelector(
  selectFilters,
  state => state.filtersColors
);

export const selectFilterPrice = createSelector(
  selectFilters,
  state => state.filtersPrices
);

export const selectFiltersNames = createSelector(
  selectStyleModule,
  state => state.filtersNames
);
