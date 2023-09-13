import { AppState } from '../../state/app.state';
import { createSelector } from '@ngrx/store';

export const dealsModule = (state: AppState) => state.dealsModule.deals;

export const selectDeals = createSelector(dealsModule, state => state.deals);

export const selectLoading = createSelector(
  dealsModule,
  state => state.loading
);

export const selectTotalPages = createSelector(
  dealsModule,
  state => state.totalPages
);

export const selectCurrentPage = createSelector(
  dealsModule,
  state => state.currentPage
);

export const selectTotalDeals = createSelector(
  dealsModule,
  state => state.totalDeals
);

export const selectHottestReleases = createSelector(
  dealsModule,
  state => state.hottestReleases
);
