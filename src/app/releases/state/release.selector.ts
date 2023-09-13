import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

export const selectReleases = (state: AppState) =>
  state.releasesModule.releases;

export const selectFilters = createSelector(
  selectReleases,
  state => state.filters
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

export const selectFilterStatus = createSelector(
  selectFilters,
  state => state.filtersStatus
);

export const selectFilterBrands = createSelector(
  selectFilters,
  state => state.filtersBrands
);

export const selectFilterName = createSelector(
  selectFilters,
  state => state.filterName
);

export const selectFilterColors = createSelector(
  selectFilters,
  state => state.filtersColors
);

export const selectFilterSize = createSelector(
  selectFilters,
  state => state.filtersSize
);

export const selectFilterPrice = createSelector(
  selectFilters,
  state => state.filtersPrices
);

export const selectReleasesList = createSelector(
  selectReleases,
  state => state.releases
);

export const selectLoading = createSelector(
  selectReleases,
  state => state.loading
);

export const selectCategory = createSelector(
  selectReleases,
  state => state.currentCategory
);

// Pagination
export const selectTotalReleases = createSelector(
  selectReleases,
  state => state.totalReleases
);

export const selectReleasesCount = createSelector(
  selectReleases,
  state => state.releases.length
);

// Release Details

export const selectSelectedRelease = createSelector(
  selectReleases,
  state => state.selectedRelease
);

export const selectOffersOfRelease = createSelector(
  selectReleases,
  state => state.offers
);

export const selectOffersFilters = createSelector(
  selectReleases,
  state => state.filtersOffers
);

export const selectLoadingOffers = createSelector(
  selectReleases,
  state => state.loadingOffers
);

export const selectHottestReleases = createSelector(
  selectReleases,
  state => state.hottestReleases
);

export const selectStatusGroup = createSelector(
  selectReleases,
  state => state.currentStatusGroup
);

export const selectTotalPages = createSelector(
  selectReleases,
  state => state.totalPages
);

export const selectCurrentPage = createSelector(
  selectReleases,
  state => state.currentPage
);

export const selectFiltersNames = createSelector(
  selectReleases,
  state => state.filtersNames
);
