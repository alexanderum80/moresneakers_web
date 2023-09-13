import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

export const selectShops = (state: AppState) => state.shopsModule.shops;

export const selectFilterLetter = (state: AppState) =>
  state.shopsModule.shops.filterLetter;

export const selectShopList = createSelector(selectShops, state => state.shops);

export const selectLoading = createSelector(
  selectShops,
  state => state.loading
);

export const selectHottestReleases = createSelector(
  selectShops,
  state => state.hottestReleases
);
